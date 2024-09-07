import mongoose from "mongoose";
import dotenv from 'dotenv';

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connected successfully!")
        
    }
    catch(err){
        console.log(err)
    }
}

dotenv.config();

export default connectDB;