import express from 'express';
import { getAll, getByDescription } from '../controllers/laptopsController.js';

const routers = express.Router();

routers.get('/search', getByDescription);
routers.get('/', getAll);

export default routers;