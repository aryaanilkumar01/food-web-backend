import express from "express"
import cors from "cors"
import foodRouter from "./routes/foodRoute.js";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paypal from "paypal-rest-sdk"


// app config
const app = express()
const port = 3000  || process.env.PORT
  
// middleware
app.use(express.json())
app.use(cors())

paypal.configure({
    "mode":'sandbox',
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
})

// db connection
connectDB()



// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

// for run
app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`);
})

