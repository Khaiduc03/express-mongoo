var express = require('express');
var router = express.Router();
const productController = require('../../components/product/Controller')
const { authenAPI } = require('../../middle/Authen')

const { authenWeb } = require('../../middle/Authen');
const cloud = require('../../middle/cloud')

//http://localhost:3000/api/products/get-all
router.get('/get-all', [authenAPI], async (req, res, next) => {
    try {
        const products = await productController.getAllProducts();
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {
                products
            }
        }

        return res.status(200).json(returnData);
    } catch (error) {
        return res.status(500).json({ result: false, products: null })
    }
});

//http://localhost:3000/api/products/updateProduct
router.post('/:id/updateProduct', [authenAPI], async (req, res, next) => {
    try {
        const id = req.params.id
        const {title, image,content } = req.body;
        const products = await productController.updateProduct(id,title, image,content);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {
                products
            }
        }

        return res.status(200).json(returnData);
    } catch (error) {
        return res.status(500).json({ result: false, products: null })
    }
});


//http://localhost:3000/api/products/:id/details
router.get('/:id/details', [authenAPI], async (req, res, next) => {
    try {
        const productId = req.params.id

        const detailProduct = await productController.getProductById(productId);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {
                detailProduct
            }
        }
        return res.status(200).json(returnData);
    } catch (error) {
        return res.status(500).json({ result: false, detailProduct: null })
    }
})

//http://localhost:3000/api/products/search?name=iphone
router.get('/search',[authenAPI], async (req, res, next) => {
    try {
        const { title } = req.query;
        const products = await productController.searchProduct(title);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {
                products
            }
        }
        return res.status(200).json(returnData)
    } catch (error) {
        return res.status(500).json({ result: false, products: null })
    }
})

//http://localhost:3000/api/products/:id/delete
router.delete('/:id/delete', [authenAPI], async (req, res, next) => {
    try {
        const productId = req.params.id

        const deleteProductById = await productController.deleteProductById(productId);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            deleted: true,

            data: {
                deleteProductById
            }
        }
        return res.status(200).json(returnData);
    } catch (error) {
        return res.status(500).json({ result: false, detailProduct: null })
    }
})


//http://localhost:3000/api/products/addProduct
router.post('/addProduct', [authenAPI], async (req, res, next) => {
    try {
        // const body = {
        //     ...req.body, image: req.file.path,
        // }

        // let { title, image, content } = body;
        const { title, content, image } = req.body;
        const addProduct = await productController.addProduct(title, content, image);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {
                addProduct
            }
        }
        return res.status(200).json(returnData)
    } catch (error) {
        return res.status(500).json({ result: false, products: null })
    }
})



module.exports = router;
