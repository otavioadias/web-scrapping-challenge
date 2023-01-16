import path from "path";
import getLenovoLaptops from "../models/laptopsJsonWebScrapping.js";
const __dirname = path.resolve();

export const readLenovoLaptops = async () => {
  try {
    return await getLenovoLaptops();
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const findByDescription = async (params) => {
  try {
    const arrayLaptops = await getLenovoLaptops();
    const laptop = arrayLaptops.filter((cur) =>
      cur.description.includes(params)
    );
    if (laptop.length === 0) throw new Error('No notebook found with these characteristics');
    return laptop;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};