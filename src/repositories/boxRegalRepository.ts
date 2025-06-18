import AppDataSource from "../db/database";
import { Box } from "../entities/Box";
import { BoxRegal } from "../entities/BoxRegal";

const boxRegalRepo = AppDataSource.getRepository(BoxRegal);

export const findEmptyBoxRegal = async (box: Box) => {
  const emptyRegal = await boxRegalRepo
    .createQueryBuilder("regal")
    .leftJoinAndSelect("regal.box", "box")
    .leftJoinAndSelect("regal.order", "order")
    .where("box.id = :boxId", { boxId: box.id })
    .andWhere("order.id IS NULL")
    .getOne();

  if (!emptyRegal) {
    throw new Error("No empty regal available for this box");
  }

  return emptyRegal;
};

export const updateBoxRegal = async (boxRegal: BoxRegal) => {
  return await boxRegalRepo.save(boxRegal);
};
