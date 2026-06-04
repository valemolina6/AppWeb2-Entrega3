import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    desc: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    categoria: { type: String, required: true } 
});

export default mongoose.models.product || mongoose.model('product', ProductSchema);