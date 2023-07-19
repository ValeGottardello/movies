import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://valengottardello:Fagotti02.@clustermovies.voyckpb.mongodb.net/movies?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error.message));
    

