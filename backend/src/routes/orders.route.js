import { Router } from "express";
import { body } from "express-validator";

import order from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const orderRouter = Router();

orderRouter.post('/place-order',[
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('phone').isMobilePhone().isLength({min:10 ,max:12}).withMessage('Invalid phone number format'),
    body('cart').isArray({ min: 1 }).withMessage('Cart must contain at least one item or No item selected')  
], authMiddleware.authMiddleware, order.placeOrder)

orderRouter.get("/my-orders", authMiddleware.authMiddleware, order.get_my_orders)

export default orderRouter