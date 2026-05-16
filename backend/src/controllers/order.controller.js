import { createOrder } from "../services/order.service.js";

async function placeOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array(),
            data: null
        });
    }
    const {name , address,phone, cart} = req.body
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

export default { placeOrder }