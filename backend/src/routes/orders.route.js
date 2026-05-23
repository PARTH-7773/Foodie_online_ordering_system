import { Router } from "express";
import { body } from "express-validator";

import order from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const orderRouter = Router();

orderRouter.post('/place-order', authMiddleware.authMiddleware, order.placeOrder)

orderRouter.get("/my-orders", authMiddleware.authMiddleware, order.get_my_orders)

export default orderRouter