
const checkRegister = (req, res, next) =>{
    const{name, email, password, confirm_password} = req.body
    if(!name || !email || !password || !confirm_password){
        return res.status(400).json({
            status:false,
            message: 'Tat ca cac truong deu la bat buoc'
        })
    
    }else{
        let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if(!regex.test(email)){
            return res.status(400).json({
                status:false,
                message:"email ko dung dinh dang"
            })
        }
        regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if(!regex.test(password)){
            return res.status(400).json({
                status:false,
                message:'mat khau phai co it nhat 8 ky tu, chu hoa, chu thuong, so va ky tu dat biet'
            })
        }
        if(password !== confirm_password){
            return res.status(400).json({
                status:false,
                message:'mat khau ko khop'
            })
        }


        
    }
    return next()

}

module.exports ={checkRegister}

