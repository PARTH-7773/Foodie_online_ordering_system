import { Router } from 'express'
import {
    createProduct,
    getAllProduct,
    getProductDetails,
    updateProduct 
}
from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const productRouter = Router()

productRouter.get('/get-all-products', getAllProduct)
productRouter.get("/get-product/:id", getProductDetails)
productRouter.post("/create-new-product", authMiddleware.adminMiddleware, createProduct)
productRouter.put("/update-product/:id", authMiddleware.adminMiddleware,updateProduct)

export default productRouter
