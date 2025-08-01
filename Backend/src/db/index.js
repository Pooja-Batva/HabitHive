import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async() => {
    try {
        const connectedDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Database Connected Successfully !!!");
    } catch (error) {
        console.log("DATABASE IS NOT ABLE TO CONNECT...", error);
        process.exit(1);
    }
}

export default connectDB;