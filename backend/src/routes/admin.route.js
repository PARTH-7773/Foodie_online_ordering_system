import express from "express";
import { body } from "express-validator";

import { adminSignIn } from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { adminSignOut } from "../controllers/admin.controller.js";


const adminRouter = express.Router();

/**
 * @route - POST /api/admin/admin-signIn
 * @description - Admin login route
 * @access private only admin are login
*/
adminRouter.post("/admin-signIn", [
    body('email').trim().isEmail().withMessage("Invalid email !"),
    body("password").notEmpty().withMessage("Password is required")
], adminSignIn)

/**
 * @route - POST /api/admin/admin-signIn
 * @description - Admin login route
 * @access private only admin are login
*/
adminRouter.get("/admin-signOut", authMiddleware.adminMiddleware, adminSignOut)




export default adminRouter;



