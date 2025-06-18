import AppDataSource from "../db/database";
import { Box } from "../entities/Box";

const boxRepo = AppDataSource.getRepository(Box);

interface Location {
  lon: number;
  lat: number;
}

export const findNearBoxesByLocation = async (
  location: Location,
  page: number = 1,
  pageSize: number = 20
) => {
  const { lon, lat } = location;
  const offset = (page - 1) * pageSize;
  const pointWkt = `ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)`;
  const boxes = await boxRepo
    .createQueryBuilder("box")
    .addSelect(
      `ST_Distance(box.location::geography, ${pointWkt}::geography)`,
      "distance_meters"
    )
    .orderBy("distance_meters")
    .limit(pageSize)
    .getRawAndEntities();

  return {
    data: boxes.raw.map((entity) => ({
      id: entity.box_box_name,
      distance_meters: entity.distance_meters,
    })),
    page,
    pageSize,
  };
};

export const findBoxByName = async (
  box_name: string,
  location: Location = { lon: 0, lat: 0 }
) => {
  const { lon, lat } = location;
  const point = `ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)`;

  const result = await boxRepo
    .createQueryBuilder("box")
    .addSelect(
      `ST_Distance(box.location::geography, ${point}::geography)`,
      "distance_meters"
    )
    .where(`box.box_name = '${box_name}'`)
    .getRawAndEntities();

  if (result.entities.length === 0) {
    throw Error;
  }

  if (!lon && !lat) {
    return result.entities[0];
  }

  return {
    identificator: result.raw[0].box_box_name,
    box_location: {
      lat: result.raw[0].box_location.coordinates[1],
      lon: result.raw[0].box_location.coordinates[0],
    },
    distance_meters: result.raw[0].distance_meters,
  };
};
