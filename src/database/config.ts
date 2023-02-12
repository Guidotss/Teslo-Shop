
import mongoose from "mongoose";


interface IConfig {
    MongoURL: string;
    options: object; 
}


mongoose.set('strictQuery',true);

const config: IConfig = {
    MongoURL: process.env.MONGO_URL || '',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}


export default config;
