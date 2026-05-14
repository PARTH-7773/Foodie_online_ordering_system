import { Router } from 'express'
import { createProduct, getProduct } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const productRouter = Router()

productRouter.get('/get-all-products',getProduct)
productRouter.post("/create-new-product", authMiddleware.adminMiddleware, createProduct)


export default productRouter
