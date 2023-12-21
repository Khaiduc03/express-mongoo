
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchma = new Schema({
    id:{type:ObjectId} // khoa chinh
    ,name:{
        type:String, // kieu du lieu
        require: true, // bat buoc co
        unique: true, // khong trung
        trim: true, // xoa khoang trang
        minlength:3, // do dai toi thieu
        default: 'No name'
    }
});

module.exports = mongoose.model('category',categorySchma);

