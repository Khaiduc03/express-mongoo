const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name:{type: String},
    email:{type: String, require:true, unique:true},
    password:{type:String , require:true}
   
});

module.exports =  mongoose.models.users ||
 mongoose.model('user', schema);
