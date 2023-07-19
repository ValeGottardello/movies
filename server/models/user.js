import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema)