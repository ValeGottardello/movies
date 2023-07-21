import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config as dotenvConfig } from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.join(__dirname, "..", ".env");
dotenvConfig({ path: envPath });

const MONGODB_URI = process.env.REACT_APP_MONGO;

mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error.message));





