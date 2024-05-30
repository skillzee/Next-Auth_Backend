import mongoose from "mongoose";

export async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("Mongo DB connected successfully");
            
        })

        connection.on('error', (error)=>{
            console.log("MongoDb Connection Error");
            console.log(error);
            process.exit();
        })
    } catch (error) {
        console.log("Something Went Wrong while connecting to Database");
        console.log(error);
        
        
    }
}