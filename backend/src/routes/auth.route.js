import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/test", (req, res) => {
    return res.send("hello parth solanki what is doing ")
})
router.post("/signUp", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").withMessage("Password must be at least 6 characters long")
],
    signUp);

router.post("/signIn", [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
],
    signIn);

export default router;
