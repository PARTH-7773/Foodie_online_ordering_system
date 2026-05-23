import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
    return res.send("hello parth solanki what is doing ")
})
router.post("/signUp", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
],
    signUp);

router.post("/signIn", [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required")
],
    signIn);


router.get("/sign-out", authMiddleware.authMiddleware,(req, res) => {
    console.log("Requested user is reach in controller fuction")
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logout success",
        data: null
    })
})

export default router;
