var express = require('express');
var router = express.Router();
const productController = require('../../components/product/Controller')
const categoryController = require('../../components/category/Controller')
const uploadFile = require('../../middle/UploadFile');
const CONFIG = require('../../config/Config');
const { authenWeb } = require('../../middle/Authen');
const cloud = require('../../middle/cloud')

// http://localhost:3000/cpanel/products
router.get('/',[authenWeb], async (req, res, next) => {
    const products = await productController.getAllProducts();

    res.render('product/listProduct', { products })
});

router.get('/:id/delete',[authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.deleteProductById(id)
        return res.json({ result });
    } catch (error) {
        return res.json({ result: false })
    }
})
// http://localhost:3000/cpanel/products/new
//  hien tri trang them moi sang pham
router.get("/new",[authenWeb], async (req, res, next) => {
    try {
        const categories = await categoryController.getAllCategories();
        res.render('product/new', { categories })
    } catch (error) {
        next(error)
    }
})

router.post("/new", [authenWeb,cloud.single('image'),], async (req, res, next) => {
    try {
        // let { body, file } = req;
        // if (file) {
        //     // let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`;
             
        //     body = { ...body, image: file.path }
        // }
        if(!req.file)return
        
            const body = {
                ...req.body,image:req.file.path
            }
        
        let { title,image,content } = body;
        // image = 'https://i.pinimg.com/736x/39/44/28/394428dcf049dbc614b3a34cef24c164.jpg'
        await productController
            .addProduct(title,content,image);
        return res.redirect('http://localhost:3000/cpanel/products/')

    } catch (error) {
        console.log('add new product error:', error)
        next(error)
    }
})

// http://localhost:3000/cpanel/products/:id/edit
//  hien tri trang cap nhap san pham
router.get("/:id/edit",[authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productController.getProductById(id);
        let categories = await categoryController.getAllCategories();
        for (let index = 0; index < categories.length; index++) {
            const element = categories[index];
            categories[index].selected = false;
            if (element._id.toString() == product.category.toString()) {
                categories[index].selected = true;
            }
        }
        res.render('product/edit', { product, categories })
    } catch (error) {
        
        next(error);
    }
});


router.post('/:id/edit',[authenWeb], [uploadFile.single('image'),], async (req, res, next) => {
    try {

        let { id } = req.params;
        let { body, file } = req;
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`;
            body = { ...body, image: image }
        }



        let { name, price, quantity, image, category } = body;
        // image = 'https://i.pinimg.com/736x/39/44/28/394428dcf049dbc614b3a34cef24c164.jpg'
        await productController
            .updateProduct(id,name, price, quantity, image, category);
            return res.redirect('http://localhost:3000/cpanel/products/')

    } catch (error) {
        console.log('update new product error:', error)
        next(error)
    }
})





module.exports = router;
