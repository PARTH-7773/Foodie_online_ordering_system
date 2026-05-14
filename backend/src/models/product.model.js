import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:'other'
    }
},{timestamps:true})

const productModel = mongoose.model('product', productSchema);

export default productModel;
