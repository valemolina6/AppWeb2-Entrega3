import { connectToDatabase } from "../connection.js";
import User from "../schemas/user.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async ({ username, pass }) => {
    await connectToDatabase();
    
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    return { 
        user: { username: user.username, name: user.name, lastname: user.lastname }, 
        token 
    };
};

export const registerUser = async (userData) => {
    await connectToDatabase();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.pass, salt);
    return await User.create({ ...userData, pass: hashedPassword });
};