

const productService = require('./Service');


const getAllProducts = async (page, size) => {
    try {
        return await productService.getAllProducts();
    } catch (error) {
        console.log('gett all product error', error)
        throw error;
    }
}

const deleteProductById = async (id) => {
    try {
        return await productService.deleteProductById(id);
    } catch (error) {
        console.log('gett all product error', error)
        return false

    }
}

const addProduct = async (title, content, image) => {
    try {
        return await productService.addProduct(title,content,image)
    } catch (error) {
        console.log('add product error', error)
        return false;
    
    }
}


const updateProduct = async (id, title,  image, content) => {
    try {
        // return await productService.updateProduct(id, name, price, quantity, image, category)
        return await productService.updateProduct(id, title,  image, content)
    } catch (error) {
        console.log('update product error', error)
    }
}
const getProductById = async (id) => {
    try {
        return await productService.getProductById(id);
    } catch (error) {
        console.log('get product error', error)
    }
}

const searchProduct = async (title) =>{
    try {
        return await productService.searchProduct(title)
    } catch (error) {
        console.log('search product error: ', error);
    }
    return null;
}

module.exports = { getAllProducts, deleteProductById, addProduct, getProductById, updateProduct, searchProduct }