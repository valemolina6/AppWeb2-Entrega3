import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true } 
});

export default mongoose.models.user || mongoose.model('user', UserSchema);