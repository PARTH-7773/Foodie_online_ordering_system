import productModel from "../models/product.model.js";

export const getAllProduct = async (req, res) => {

    try {
        const products = await productModel.find().sort({ createdAt: 1 })
        return res.status(200).json({
            success: true,
            message: "All product fetch succesull",
            data: products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
            data: null
        })
    }
}

export const getProductDetails = async (req, res) => {

    const _id = req.params.id;
    if (!_id) {
        return res.status(400).json({
            success: false,
            message: "products id is not existing",
            data: null
        })
    }
    try {

        const product = await productModel.findOne({ _id: _id })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "products not found",
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product detailed fetch ",
            data: product,
        });
    } catch (error) {

        if (error instanceof Error) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
                error: error.message,
            })
        } else {

            return res.status(500).json({
                success: false,
                message: "Internal server error",
                data: null,
                error: error.message,
            })
        }
    }

}

export const createProduct = async (req, res) => {
    const { name, price, image, category } = req.body;
    if (!name || !price || !image || !category) {
        return res.status(400).json({
            success: false,
            message: "All fiedls are required for add new product",
            data: null
        })
    }

    try {
        const product = await productModel.create({
            name, price, image, category
        })

        return res.status(201).json({ success: true, message: 'Product Add successfully', data: product })
    } catch (error) {
        console.log("Something went wrong", error.message)
        if (error.name === 'MongoServerError') {
            return res.status(422).json({
                success: false,
                message: "Please enter unique product name.",
                data: null,
            })
        }
        return res.status(500).json({
            success: false,
            message: "Error in create product controller",
            data: null,
        })
    }
}

export const updateProduct = async (req, res) => {
    const _id = req.params.id;
    const { name, price, image, category } = req.body;
    console.log(name);
    if (!_id) {
        return res.status(400).json({
            success: true,
            message: "Product id not Exist",
            data: null
        })
    }

    try {

        const update = await productModel.findByIdAndUpdate(
            { _id: _id },
            {
                $set: {
                    name: name,
                    price: price,
                    image: image,
                    category: category,
                }
            },
            { new: true }
        )

        res.status(201).json({ update })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error..." + error.message,
            data: null
        })
    }
}

