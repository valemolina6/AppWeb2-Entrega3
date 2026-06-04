import { Router } from 'express';
import { loginUser, registerUser } from '../db/actions/user.actions.js';
const router = Router();

router.post('/login', async (req, res) => {
    try {
        const result = await loginUser(req.body);
        res.status(200).json(result); 
    } catch (e) { 
        res.status(400).json({ message: e.message }); 
    }
});


router.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (e) { res.status(400).json({ error: "Error al crear" }); }
});

export default router;