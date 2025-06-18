import { Box } from "../entities/Box";
import fs from "fs";
import csv from "csv-parser";
import AppDataSource from "./database";
import { registerUser } from "../services/authService";
import { BoxRegal } from "../entities/BoxRegal";
import { Order } from "../entities/Order";

async function seed() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("DB connection succesfull!");
    })
    .catch((err) => {
      throw err;
    });

  await AppDataSource.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

  const stream = fs
    .createReadStream("./src/db/seed-data/Box Task_ Box Locations - List 1.csv")
    .pipe(csv());

  for await (const row of stream) {
    const lat = parseFloat(row.lat);
    const lon = parseFloat(row.lon);
    const identifier = row.identifier;

    const geoJSONCoordinates = `[${lon}, ${lat}]`;

    const insertResult = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Box)
      .values({
        box_name: identifier,
        location: () =>
          `ST_GeomFromGeoJSON('{"type":"Point","coordinates":${geoJSONCoordinates}}')`,
      })
      .returning("*")
      .execute();

    const regals = Array.from({ length: 20 }, (_, i) => ({
      number: i,
      box: insertResult.raw[0],
    }));

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(BoxRegal)
      .values(regals)
      .execute();

    if (identifier == "B22") {
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Order)
        .values({ number: 12486, regal: regals[0], box: insertResult.raw[0] })
        .execute();
    }
  }

  await registerUser({ email: "email@email.com", password: "password" });

  console.log(`Seed complete.`);
  await AppDataSource.destroy();
}

seed().catch(console.error);
