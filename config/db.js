import { connect } from "mongoose";


export const connectDB = async () => {
    try {
        const u='mongodb://localhost:27017/'
        await connect(u);
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
        exit(1);
    }
};