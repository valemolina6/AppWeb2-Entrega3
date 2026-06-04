import express from 'express';
import 'dotenv/config';
import { connectToDatabase } from './db/connection.js';

import productRouter from './routes/product.routes.js';
import saleRouter from './routes/sale.routes.js';
import userRouter from './routes/user.routes.js'; 

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.static('./public'));

app.use('/productos', productRouter);
app.use('/ventas', saleRouter);
app.use('/user', userRouter);

await connectToDatabase();

app.listen(port, () => {
    console.log(`Servidor levantado en http://localhost:${port}`);
});