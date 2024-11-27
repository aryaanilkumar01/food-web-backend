//logic: we can connect with the db
import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://arya:22334455@cluster0.59ba0.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}