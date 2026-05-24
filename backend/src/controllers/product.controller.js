import productModel from "../models/product.model.js";

export const getProduct = async (req, res) => {

    // const products = await productModel.find()
    // return res.status(200).json({
    //     success: true,
    //     message: "All product fetch succesull",
    //     data: products
    // })

    try {
        const products = await productModel.find();
        return res.status(200).json({
            success: true,
            message: "All product fetch successful",
            data: products
        });
    } catch (error) {
        console.log("Error fetching products:", error.message);
        
        // This stops Vercel from sending the HTML crash page!
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products from the database",
            error: error.message
        });
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
