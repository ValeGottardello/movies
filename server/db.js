import mongoose from "mongoose";

const MONGODB_URI = process.env.REACT_APP_MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error.message));


