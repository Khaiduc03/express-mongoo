


const categoryModel = require('./Model')

const getAllCategories = async () =>{
    try {
        return await categoryModel.find();
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllCategories}

var data =
[{
    "_id": 1,
    "name": "Devbug"
  }, {
    "_id": 2,
    "name": "Zoonder"
  }, {
    "_id": 3,
    "name": "Flashdog"
  }, {
    "_id": 4,
    "name": "Twinte"
  }, {
    "_id": 5,
    "name": "Flashdog"
  }, {
    "_id": 6,
    "name": "Dabfeed"
  }, {
    "_id": 7,
    "name": "Lajo"
  }, {
    "_id": 8,
    "name": "BlogXS"
  }, {
    "_id": 9,
    "name": "Dablist"
  }, {
    "_id": 10,
    "name": "Demimbu"
  }]