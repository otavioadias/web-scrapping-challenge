import { readLenovoLaptops, findByDescription } from '../services/laptopsService.js';

export const getAll = async (req, res) => {
    const laptops = await readLenovoLaptops();
    return res.status(200).json(laptops);
}

export const getByDescription = async (req, res) => {
    const { q } = req.query;
    const laptop = await findByDescription(q);
    return res.status(200).json(laptop);
}