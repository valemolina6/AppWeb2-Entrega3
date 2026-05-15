import { Router } from 'express';
import { readFile } from 'node:fs/promises';
const router = Router();

router.get('/todos', async (req, res) => {
    try {
        const data = await readFile('./data/productos.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (e) { res.status(500).send("Error"); }
});
export default router;