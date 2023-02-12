import mongoose from "mongoose";
import config from "./config";


export const connect = async () => {
    try {
        await mongoose.connect(config.MongoURL, config.options);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
        await mongoose.connection.close();
    }
}