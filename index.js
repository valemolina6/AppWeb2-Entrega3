import express from 'express'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'; 
import saleRouter from './routes/sale.routes.js';

const app = express()
const port = 3000

app.use(express.json())
app.use('/user', userRouter)
app.use('/productos', productRouter);
app.use('/ventas', saleRouter);

app.listen(port,()=>{
    console.log(`Servidor levantado en puerto ${port}`)
})

/*Levanta front*/
app.use(express.static('./public'))

/*Rutas end point*/
app.unsubscribe('/user', userRouter)