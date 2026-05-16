import Order from "../models/order.model.js";
import OrderItem from "../models/order_item.model.js";
export const createOrder = async ({ userId, name, address, phone, cart }) => {
    try {
        // console.log(`user id ${cart}`);
        if (!userId|| !name || !address || !phone || !cart) {
            throw new Error("All fields are required");
        }
        if (cart.length === 0) {
            throw new Error("Cart cannot be empty");
        }
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      
        /*create order
        */
        const order = await Order.create({
            user_id:userId,
            customer_name:name,
            customer_address:address,
            customer_phone:phone,
            total_price:totalPrice
        })


        // create order items
        const orderItems = await cart.forEach( (i) => {
            // console.log(`item id ${i}`);
             OrderItem.create({
                orderId:order._id,
                productId:i._id,
                quantity:i.quantity,
                price:i.price
            })
        });
        return order;
        
    } catch (error) {
        throw new Error(error.message);
    }
};