import userModel from "../models/auth.model.js"
import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next) {

    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access, token is missing',
            data: null
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)


        const user = await userModel.findById(decoded._id)
        // console.log(user)
        req.user = user
        next()
    } catch (error) {
        console.log("Sothing went wrong", error.message);

        if (error instanceof Error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - token is invalid",
                data: null
            })
        }
        return res.status(500).json({
            success: false,
            message: "Error in Middleware function."
        })
    }
}

async function adminMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access - Token is missing",
            data: null
        })
    }

    try {


        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded._id)
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denile",
                data: null
            })
        }
        req.user = user
        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - Token is invalid',
                data: null
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Error in admin middleware",
                data: null
            })
        }
    }
}



export default { authMiddleware, adminMiddleware }