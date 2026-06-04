import { connectToDatabase } from "../connection.js"
import Product from "../schemas/product.schema.js"

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Product.find()
        return JSON.parse(JSON.stringify(res))
    }catch(error){ console.log(error) }
}