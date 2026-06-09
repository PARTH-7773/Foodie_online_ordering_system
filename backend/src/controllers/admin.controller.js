import { validationResult } from "express-validator"
import userModel from "../models/auth.model.js";
import { GenerateAccessToken } from "../utils/util.js";
export const adminSignIn = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array(),
            data: null
        });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            data: null
        })
    }
    try {


        const admin = await userModel.findOne({ email }).select("+password");
        // console.log(admin);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access..!",
                data: null
            })
        }

        const isPasswordvalid = await admin.comparePassword(password);

        if (!isPasswordvalid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
                data: null
            })
        }


        if (admin.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denile..!",
                data: null
            })
        }


        const token = await GenerateAccessToken(admin._id, admin.role);
        res.cookie("token", token);
        res.status(200).json({
            success: true,
            message: "Admin signIn success",
            data: admin,
            token
        })

    } catch (error) {
        console.log("Something went wrong", error.message);
        return res.status(500).json({
            success: false,
            message: "Error in Admin signin controller.",
            data: null
        });
    }
}


export const adminSignOut = async (req,res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success:true,
        message:"Admin sign Out success.",
        data:null
    })
}