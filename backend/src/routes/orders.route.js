import { Router } from "express";

import order from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const orderRouter = Router();

orderRouter.post('/place-order',authMiddleware.authMiddleware, order.placeOrder)


export default orderRouter