
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


const URL = process.env.MONGO_URI;

const connectdb = async () => {
 
    try {
        await mongoose.connect(URL)
        console.log("database is connected")
    } catch (error) {
        console.log(error)

    }
}




export default connectdb;