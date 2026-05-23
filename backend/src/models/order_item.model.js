import mongoose from "mongoose";


const itemSchema =  new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"order"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"product"
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:mongoose.Types.Decimal128,
        required:true
    }
},{timestamps:true})


const orderItemModel = mongoose.model("order_Item", itemSchema)

export default orderItemModel;