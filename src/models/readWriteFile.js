import fs from 'fs';
import { join } from 'path';
import getLenovoLaptops from '../services/laptopsService';

const readLenovoLaptops = async () => {
    try {
        await getLenovoLaptops();
        const arrayLaptops = fs.readFile(join(__dirname, '../lenovoLaptops.json'), { encoding: 'utf8' });
        return JSON.parse(arrayLaptops);
    } catch (err) {
        return [];
    }
};

const findByDescription = async (params) => {
    const arrayLaptops = await readLenovoLaptops();
    const laptop = arrayLaptops.filter((description) => description.includes(params));
    return laptop;
};

module.exports = {
    readLenovoLaptops,
    findByDescription,
};