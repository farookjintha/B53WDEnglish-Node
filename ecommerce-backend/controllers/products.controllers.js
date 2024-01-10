const Products = require('../models/products.model')


exports.getAllProducts = async (req, res) => {
    try{
        // To get data from DB;

        let products = await Products.find();
        if(products){
            return res.status(200).send({
                message: "Products have been retrieved successfully.",
                data: products
            })
        }

        return res.status(400).send({
            message: "Error while retrieving products."
        })
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.addNewProduct = async (req, res) => {
    try{
        const payload = req.body;

        const newProduct = new Products(payload);

        newProduct.save().then((data) => {
            res.status(201).send({
                message: "Product has been added successfully.",
                productId: data._id
            })
        }).catch((error) => {
            res.status(400).send({
                message: "Error while adding a new product."
            })
        });
        
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.updateProductById = async (req, res) => {
    try{
        let productId = req.params.productId;
        let payload = req.body;


        const existingProduct = await Products.findOne({_id: productId});


        if(existingProduct){
            Products.findByIdAndUpdate(existingProduct._id, payload).then((data) => {
                res.status(200).send({
                    message: "Product has been updated successfully.",
                    productId: data._id
                })
            }).catch(error => {
                res.status(400).send({
                    message: "Error while updating product."
                })
            })
        }else{
            return res.status(400).send({
                message: 'Product with given id doesnot exist.'
            })
        }

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.deleteProductById = async (req, res) => {
    try{
        let productId = req.params.productId;

        const existingProduct = await Products.findOne({_id: productId});

        if(existingProduct){
            Products.findByIdAndDelete({_id: existingProduct._id}).then((data) => {
                return res.status(200).send({
                    message: "Product has been deleted successfully."
                })
            }).catch(error => {
                return res.status(400).send({
                    message: "Error while deleting product."
                })
            })
        }else{
            return res.status(400).send({
                message: 'Product with given id doesnot exist.'
            })
        }
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

// function getAllProducts(req, res) {
//         try{
//             res.status(200).send({
//                 message: "Products have been retrieved successfully."
//             })
//         }catch(error){
//             res.status(500).send({
//                 message: "Internal Server Error"
//             })
//         }
//     }

// function addNewProduct(req, res) {
//     try{
//         res.status(201).send({
//             message: "Product has been added successfully."
//         })
//     }catch(error){
//         res.status(500).send({
//             message: "Internal Server Error"
//         })
//     }
// }

// module.exports = {
//     getAllProducts,
//     addNewProduct
// }