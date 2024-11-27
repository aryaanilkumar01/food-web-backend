import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
// import stripe

const placeOrder = async (req,res)=>{
//     const frontend_url = "http://localhost:5173/"


//     const userId = req.userId; // Accessing the userId added by middleware

//     if (!userId) {
//         return res.status(400).json({ success: false, message: "User ID not found in request." });
//     }

try{
    const newOrder = new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(req.vbody.userId,{cartData:{}})

    const line_items = req.body.items.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100*80
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                 name:"Delivery Charges"
            },
           unit_amount:2*100*80
        },quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true,session_url:session_url})
}catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
}
}






export {placeOrder} 