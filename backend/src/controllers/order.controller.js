import { validationResult } from "express-validator";
import { createOrder } from "../services/order.service.js";
import orderModel from "../models/order.model.js";
import mongoose from "mongoose";

async function placeOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array(),
            data: null
        });
    }
    const { name, address, phone, cart } = req.body
    if (!name || !address || !phone || !cart) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (cart.length === 0) {
        return res.status(400).json({ message: "Cart cannot be empty" });
    }

    const order = await createOrder({ userId: req.user._id, name, address, phone, cart });

    return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: {
            orderId: order._id,
            name: order.customer_name,
            totalPrice: order.total_price
        }
    })
}

async function get_my_orders(req, res) {
    const user_id = new mongoose.Types.ObjectId(req.user._id);
    const userOrders = await orderModel.aggregate([{
        // step:1 - $match
        $match: { user_id: user_id }
    }, {
        /* step:2 - $lookup
        grabs the items from order collection*/
        $lookup: {
            from: "order_items",
            localField: "_id",
            foreignField: "orderId",
            as: "Orders",

            // pipeline below runs ON the order_items we just found
            pipeline: [
                {
                    // Go into products collection and match the ID
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productDetails"
                    }
                }, {
                    // $unwind changes the "product-details" field from an array to a single object
                    $unwind: "$productDetails"
                }
            ]
        },

    }, {
        /** step:3 - $sort
         * put the newest order on top
         */
        $sort: { createdAt: -1 }
    }]);

    console.log(userOrders.length);
    
    if (userOrders.length > 0) {
        return res.status(200).json({
            success: true,
            message: "Order fetch success",
            data: userOrders
        });
    }

    return res.status(200).json({
        success: true,
        message: "No Orders found.",
        data: null
    })



}

export default { placeOrder, get_my_orders }