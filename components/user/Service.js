
//kiem tra email, password
//kiem tra email co trong database
//neu co, kiem tra password
// neu password dung, tra ve thong tin user
//neu password sai, tra ve null
const userModel = require('./Model');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
    try {
        const user = await userModel.findOne({email});
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password);
            return isMatch ? user :false;
        }

    } catch (error) {
        console.log('User service login error: ', error)
        
    }
    return false

}

const register = async (email, password, name) => {
    try {
        let user = await userModel.findOne({ email })
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            await userModel.create({
                email: email,
                password: hash,
                name: name,
            })
            return true;
        }
    } catch (error) {
        console.log("User service register error: ", error);
    }
    return false;
}

module.exports = { login,register };

var data = [
    { _id: 1, email: 'p3nhox99@gmail.com', password: '1', name: 'khai' },
    { _id: 2, email: 'p3nhox97@gmail.com', password: '1', name: 'khai' },
    { _id: 3, email: 'p3nhox98@gmail.com', password: '1', name: 'khai' },
]
