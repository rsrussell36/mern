const Product = require("../models/producdModel");
const ErrorHandler = require("../utils/errorhandler");

//Create Product
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All Product (Admin)
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}
// Get Product Details
exports.getProductDetails = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        // return res.status(404).json({
        //     success: false,
        //     message: "Oops! Product not found!"
        // });
        return next(new ErrorHandler("Oops! Product not found!", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
}

// Update Product -- Admin

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Oops! Product not found!"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product,
    });
}
// Delete Product -- Admin

exports.deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Oops! Product not deleted!"
        });
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Successfully deleted."
    })
}