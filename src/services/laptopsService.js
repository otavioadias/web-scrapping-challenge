import fs from "fs";
import path, { join } from "path";
import getLenovoLaptops from "../models/laptopsJsonWebScrapping.js";
const __dirname = path.resolve();

export const readLenovoLaptops = async () => {
  try {
    return await getLenovoLaptops();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const findByDescription = async (params) => {
  const arrayLaptops = await getLenovoLaptops();
  const laptop = arrayLaptops.filter((cur) =>
    cur.description.includes(params)
  );
  return laptop;
};
