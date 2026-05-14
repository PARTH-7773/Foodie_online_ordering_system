import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: [true,'User ID is required for order.'],
        ref:'user'
    },
    customer_name:{
        type:String,
        required: [true,'Customer name is required for order.']
    },
    customer_address: {
        type:String,
        required:[true,'Customer name is required for order.'],
        lowercase:true
    },
    customer_phone: {
        type: Number,
        minlength:[10, 'Number must be contains 10 charactors.'],
        required:[true, 'Phone number is required for deliver order']
    },
    total_price:{
        type:Number,
        required:[true,'Price is required for order']
    }
},{timestamps:true})

const orderModel = mongoose.model('order',orderSchema);

export default orderModel;