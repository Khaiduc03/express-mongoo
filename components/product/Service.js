

const productModel = require('./Model');

// lay danh sach san pham tu database

const getAllProducts = async () => {
  try {
    // return data

    return await productModel.find()

  } catch (error) {

    console.log("Get all product error: ", error)
    throw error;
  }
}

//xoa san pham theo id
const deleteProductById = async (id) => {
  try {
    // const index = data.findIndex(Item => Item._id.toString() == id.toString())
    // if (index !== -1) {
    //   data.splice(index, 1);
    //   return true
    // }
    // return false;

    await productModel.findByIdAndDelete(id)
    return true;
  } catch (error) {
    console.log("delete product error: ", error)
  }
  return false
}

const addProduct = async (title, content, image) => {
  try {
    // const newProdcut = {
    //   _id: data.length + 1,
    //   name, price, quantity, image, category
    // };
    // data.push(newProdcut);
    // return true;
    const newProduct = new productModel({ title,image,content })
    
    return await newProduct.save();
  } catch (error) {
    console.log("add new product error: ", error)
  }
  return false;
}



const updateProduct = async (id, title, content,  image) => {

  try {
    // const product = data.find(item => item._id.toString() == id.toString());
    // if (product) {
    //   data = data.map(item => {
    //     if (item._id.toString() == id.toString()) {
    //       item.name = name ? name : item.name;
    //       item.price = price ? price : item.price;
    //       item.quantity = quantity ? quantity : item.quantity;
    //       item.image = image ? image : item.image;
    //       item.category = category ? category : item.category;
    //     }
    //     return item;
    //   });
    //   return true;
    // }
    // return false
    const item = await productModel.findById(id);
    if (item) {
      item.title = title ? title : item.title;
    
      item.content = content ? content : item.content;
      item.image = image ? image : item.image;
     // item.category = category ? category : item.category;
      
      return await item.save();;
    }

  } catch (error) {
    console.log("Update product error: ", error)

  }
  return false;
}

const getProductById = async (id) => {
  try {
    // const product = data.find(item => item._id.toString() == id.toString());
    // return product
    // const product = dulieu.find( productModel.findById(id))
    // let product =await productModel.findById(id)
    return await productModel.findById(id)

  } catch (error) {
    console.log("get product error: ", error)

  }
}
const searchProduct = async (keyword) =>{
  try {
    let query = {
      //gt: greater than, lt: less than
      // price:{$gt:10,$lt:100},
      //$regex: regular expression
      //find all products that have name contains keyword

      title:{$regex: keyword, $options: 'i'},// tim kim tap hop con

      //name:keyword,// tim kim chinh xac
      // $or:[{quantity:{$gte:20}}, {quantity:{$lte:5}}]
    }
    let products = await productModel.find(query)
    // products =await productModel.find({price:10},'name price');
    return products;
  } catch (error) {
    console.log("Search product error: ", error)
  }
}

module.exports = { updateProduct, getAllProducts, deleteProductById, addProduct, getProductById,searchProduct }

var data =
  [{
    "_id": 1,
    "name": "Erdman, Johnson and Gaylord",
    "price": 79,
    "quantity": 82,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 38
  }, {
    "_id": 2,
    "name": "Hettinger-Johnston",
    "price": 8,
    "quantity": 31,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 9
  }, {
    "_id": 3,
    "name": "Smith-Douglas",
    "price": 23,
    "quantity": 33,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 12
  }, {
    "_id": 4,
    "name": "Lang, Wunsch and Steuber",
    "price": 38,
    "quantity": 49,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 76
  }, {
    "_id": 5,
    "name": "Bayer-Spinka",
    "price": 5,
    "quantity": 20,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 10
  }, {
    "_id": 6,
    "name": "Bauch, Anderson and Kuhlman",
    "price": 100,
    "quantity": 83,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 49
  }, {
    "_id": 7,
    "name": "O'Kon Group",
    "price": 70,
    "quantity": 35,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 49
  }, {
    "_id": 8,
    "name": "Tromp, Hagenes and Gusikowski",
    "price": 5,
    "quantity": 5,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 57
  }, {
    "_id": 9,
    "name": "Hammes LLC",
    "price": 6,
    "quantity": 27,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 91
  }, {
    "_id": 10,
    "name": "Lakin, Bosco and Shanahan",
    "price": 53,
    "quantity": 61,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 44
  }, {
    "_id": 11,
    "name": "Klein, Torp and Hahn",
    "price": 81,
    "quantity": 56,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 91
  }, {
    "_id": 12,
    "name": "Murphy LLC",
    "price": 60,
    "quantity": 2,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 6
  }, {
    "_id": 13,
    "name": "Spencer-Boyle",
    "price": 63,
    "quantity": 31,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 38
  }, {
    "_id": 14,
    "name": "Satterfield Group",
    "price": 67,
    "quantity": 90,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 43
  }, {
    "_id": 15,
    "name": "Hintz-Keeling",
    "price": 88,
    "quantity": 53,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 23
  }, {
    "_id": 16,
    "name": "Donnelly, Turcotte and D'Amore",
    "price": 6,
    "quantity": 42,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 29
  }, {
    "_id": 17,
    "name": "Stokes and Sons",
    "price": 87,
    "quantity": 97,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 46
  }, {
    "_id": 18,
    "name": "Schneider-Pacocha",
    "price": 45,
    "quantity": 51,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 14
  }, {
    "_id": 19,
    "name": "Murphy, Hessel and Jacobi",
    "price": 78,
    "quantity": 33,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 28
  }, {
    "_id": 20,
    "name": "Mitchell, Legros and Ziemann",
    "price": 5,
    "quantity": 31,
    "image": "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-600x600.jpg",
    "category": 79
  }]

