import { Router } from 'express';
import { readFile, writeFile } from 'node:fs/promises';
const router = Router();

router.post('/checkout', async (req, res) => {
    try {
        const data = await readFile('./data/ventas.json', 'utf-8');
        const ventas = JSON.parse(data);
        const nuevaVenta = { id: ventas.length + 1, fecha: new Date(), ...req.body };
        ventas.push(nuevaVenta);
        await writeFile('./data/ventas.json', JSON.stringify(ventas, null, 2));
        res.status(201).json({ message: "OK" });
    } catch (e) { res.status(500).json({ message: "Error" }); }
});
export default router;