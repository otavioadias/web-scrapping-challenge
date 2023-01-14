import express from 'express';
import { json } from 'body-parser';
import laptopsRoute from './routes/laptopsRoute';

const app = express();
app.use(json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });
  
  app.listen(PORT, () => {
    console.log('Online');
  });

app.use('/laptops', laptopsRoute);