import { mongoose } from 'mongoose';

const Url = "mongodb://localhost:27017/"

export const connect = async (_req, _res) => {
    try {
        await mongoose.connect(Url);
        console.log('Connect from ' + Url);
    } catch (error) {
        console.error(error);
    }
}