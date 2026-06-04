import { Router } from 'express';
import { createSale } from '../db/actions/sales.actions.js';
import { verifyToken } from '../middlewares/auth.middleware.js'; 
const router = Router();

router.post('/create', verifyToken, async (req, res) => {
    const { productos, total, user } = req.body;
    try {
        const result = await createSale({ productos, total, user });
        res.status(200).json(result);
    } catch (e) { 
        res.status(400).json({ error: "Error al procesar venta", detalles: e.message }); 
    }
});

export default router;
