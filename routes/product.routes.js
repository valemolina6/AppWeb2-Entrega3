import { Router } from 'express';
import { findAll } from '../db/actions/product.actions.js';
const router = Router();

router.get('/todos', async (req, res) => {
    try {
        const result = await findAll();
        res.status(200).json(result);
    } catch (e) { res.status(400).json(); }
});

export default router;