import { Router } from "express";
import {body} from "express-validator";

import order from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const orderRouter = Router();

orderRouter.post('/place-order', [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("phone").isLength({ min: 10, max: 15 }).withMessage("Invalid phone number"),
    body("cart").isArray({ min: 1 }).withMessage("Cart cannot be empty or Items not exist in cart")
],authMiddleware.authMiddleware, order.placeOrder)


export default orderRouter