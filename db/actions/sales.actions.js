import SaleModel from '../schemas/sale.schema.js';

export const createSale = async ({ productos, total, user }) => {
    try {
        const newSale = await SaleModel.create({
            productos,
            total,
            usuario: user 
        });
        return newSale;
    } catch (error) {
        console.log('Error en sales.actions.js:', error.message);
        throw error; 
    }
};