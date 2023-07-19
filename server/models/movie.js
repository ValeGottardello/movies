import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    plot: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
    },
});

export default mongoose.model('Movie', movieSchema)