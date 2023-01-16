import 'express-async-errors';
import express from 'express';
import bodyParser from 'body-parser';
import laptopsRoute from './routes/laptopsRoute.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });
  
  app.listen(PORT, () => {
    console.log('Online');
  });

app.use('/laptops', laptopsRoute);

app.use(errorMiddleware);