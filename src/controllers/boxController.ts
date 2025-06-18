import { Request, Response } from "express";
import { getLocation } from "../services/gpsServiceMock";
import {
  findBoxByName,
  findNearBoxesByLocation,
} from "../repositories/boxRepository";
import {
  findEmptyBoxRegal,
  updateBoxRegal,
} from "../repositories/boxRegalRepository";
import {
  findOrderByNumber,
  updateOrder,
} from "../repositories/orderRepository";
import { openBoxHardware } from "../services/boxRegalServiceMock";
import { OrderStatus } from "../entities/Order";

export const getNearBoxes = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 20;
  const location = getLocation();

  res.json(await findNearBoxesByLocation(location, page, pageSize));
};

export const getBoxByBoxName = async (req: Request, res: Response) => {
  const location = getLocation();

  res.json(await findBoxByName(req.params.name, location));
};

export const postBoxRegalToOpen = async (req: Request, res: Response) => {
  const orderId = req.body.order_id;
  const order = await findOrderByNumber(orderId);
  if (order.regal) {
    res.status(400).json({
      message: "Order already has a regal! Regal number: " + order.regal.number,
    });
    return;
  }
  const boxRegal = await findEmptyBoxRegal(order.box);
  boxRegal.open = true;
  boxRegal.order = order;
  const boxregalOpened = await updateBoxRegal(boxRegal);

  order.regal = boxregalOpened;
  await updateOrder(order);
  openBoxHardware();

  res.json({
    order_id: order.id,
    box: boxregalOpened.box,
    box_regal_number: boxregalOpened.number,
    box_regal_open: boxregalOpened.open,
  });
};

export const postBoxRegalClosed = async (req: Request, res: Response) => {
  const orderId = req.body.order_id;
  const order = await findOrderByNumber(orderId);
  const boxRegal = order.regal;
  if (!boxRegal.open) {
    res.status(400).json({
      message: `Regal ${order.regal.number} was already closed with order inside! `,
    });
    return;
  }

  order.status = OrderStatus.DELIVERED_TO_BOX;
  await updateOrder(order);
  boxRegal.open = false;
  const regal = await updateBoxRegal(boxRegal);
  res.json(regal);
};
