import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process"
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta(`MongoDB connected at ${url}`))
        
    } catch (error) {
        console.error(colors.red("Error connecting to MongoDB:"), error);
        exit(1);
    }

}