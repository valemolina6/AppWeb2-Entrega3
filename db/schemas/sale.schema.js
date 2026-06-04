import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
    productos: { type: Array, required: true }, 
    total: { type: Number, required: true },
    usuario: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.sales || mongoose.model('sales', SalesSchema);