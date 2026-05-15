import { Router } from 'express';
import { readFile } from 'node:fs/promises';
const router = Router();

router.post('/login', async (req, res) => {
    const { username, pass } = req.body;
    try {
        const file = await readFile('./data/users.json', 'utf-8');
        const users = JSON.parse(file);
        const user = users.find(u => u.username === username && u.pass === pass);
        if (user) res.json({ status: true, username: user.username });
        else res.status(400).json({ status: false });
    } catch (e) { res.status(500).send("Error"); }
});
export default router;