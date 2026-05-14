import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/test",(req,res)=>{
    return res.send("hello parth solanki what is doing ")
})
router.post("/signUp", signUp);
router.post("/signIn", signIn);

export default router;
