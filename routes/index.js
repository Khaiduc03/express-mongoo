var express = require('express');
var router = express.Router();
const userController = require('../components/user/Controller')
const jwt = require('jsonwebtoken');
const { authenWeb } = require('../middle/Authen');



// http://localhost:3000/
router.get('/', [authenWeb], async (req, res, next) => {
  res.render('index');
})



// http://localhost:3000/ui-color
//hien thi ui-color
router.get('/ui-color', async (req, res, next) => {
  res.render('user/ui-color');
})

// http://localhost:3000/register
//hien thi register
router.get('/register', async (req, res, next) => {
  res.render('user/register');
})
// http://localhost:3000/charts
router.get('/charts', async (req, res, next) => {
  res.render('user/charts');
})

//http://localhost:3000/forgot-password
router.get('/forgot-password', async (req, res, next) => {
  res.render('user/forgot-password');
})
// http://localhost:3000/login
//hien thi login
router.get('/login',[authenWeb], async (req, res, next) => {
  res.render('user/login');
})

// http://localhost:3000/login
//xu ly login
//kiem tra email, password
//thanh cong chuyen sang trang chu
//nguoc lai, chuyen sang login
router.post('/login', async (req, res, next) => {   
  try {
      const{email, password} = req.body;
      const result = await userController.login(email,password)
      if(result){
        // khi login thanh cong luu token
        // tao token, luu token vao session
        const token = jwt.sign({id:1 , name: 'helo'}
        , 'secret',{expiresIn:'1h'});
        req.session.token = token;
        return res.redirect('/');
      }else{
        return res,redirect('/login')
      }
  } catch (error) {
    console.log('Login error: ' ,error)
    return res.redirect('/login')
  }
})
// http://localhost:3000/logut
//xu ly logout
// xoa token trong session
//chuyen huong sang trang login

router.get('/logout', async(req,res,next)=>{
  try {
    req.session.destroy();
    return res.redirect('/login')
  } catch (error) {
    console.log('logout error: ' ,error)
    return res.redirect('/login')
  }
})


module.exports = router;


/**
 * req, res, next
 * req: request (yêu cầu gửi từ client)
 *  - req.query: query string (dữ liệu gửi lên url)
 *  http://localhost:3000/hello?name=abc&age=18
 *  - req.body: body (dữ liệu gửi lên từ form)
 *  - req.params: params (dữ liệu gửi lên từ url)
 * res: response (phản hồi từ server)
 *  - res.render: render ra view (WEB)
 *  - res.json: trả về dữ liệu dạng json (API)
 *  - res.send: trả về dữ liệu dạng text (API)
 *  - res.redirect: chuyển hướng (WEB)
 * next: hàm tiếp theo
 */


/**
 * HTTP Request Methods
 * Get: Lấy dữ liệu (url + enter)
 * Post: Tạo dữ liệu (form + submit)
 */



// const userController = require('../components/user/Controller')

// /* GET home page. */
// // http://localhost:3000/hello/
// router.get('/hello', async function (req, res, next) {
//   console.log('Get đang chạy nè');
//   res.render('index', { title: 'Express' });
// });
// // http://localhost:3000/hello
// router.post('/hello', function (req, res, next) {
//   console.log('Post đang chạy nè');
//   res.render('index', { title: 'Express' });
// });

// // http://localhost:3000/query?a=1&b=2&c=3
// router.get('/query', function (req, res, next) {
//   const { a, b, c } = req.query;
//   // giải pt bậc 2, hiện kết quả
//   const delta = b * b - 4 * a * c;
//   let kq = (a + b + c);
//   if (delta < 0) {
//     kq = 'Phương trình vô nghiệm';
//   } else if (delta === 0) {
//     kq = 'Phương trình có nghiệm kép: ' + (-b / (2 * a));
//   } else {
//     kq = 'Phương trình có 2 nghiệm phân biệt: '
//       + ((-b + Math.sqrt(delta)) / (2 * a)) + ', '
//       + ((-b - Math.sqrt(delta)) / (2 * a));
//   }
//   res.render('index', { kq });
// });

// // http://localhost:3000/body
// router.get('/body', function (req, res, next) {
//   // const { a, b, c } = req.body;
//   // let kq = a + b + c;
//   // res.render('index', { kq });
//   res.send('');
// });

// // http://localhost:3000/params/1/2/3
// router.post('/params/:a/:b/:c', function (req, res, next) {
//   try {
//     const { a, b, c } = req.params;
//     let kq = a + b + c;
//     let kq1 = kq;
//     // res.render('index', { kq });
//     res.json({ kq });

//   } catch (error) {
//     next();
//   }
// });

// router.get('/dien-tich', function (req, res, next) {
//   const { a, b, c } = req.query;
//   let kq = 1 + 2 + 3;
//   res.render('index', { kq });
// });

// router.post('/login', async (req, res, next) => {
//   res.router('user/login');
// });












// router.get('/dien-tich/:loaiHinh/', function (req, res, next) {
//   // const a = req.query.a;
//   // const b = req.query.b;
//   const { a, b } = req.query;
//   const loaiHinh = req.params.loaiHinh;
//   const kq = hinh(loaiHinh, a, b);
//   res.render('index', { loaiHinh, kq });
// });


// function hinh(loaiHinh, a, b) {
//   if (loaiHinh === 'hinh-chu-nhat') {
//     return a * b;
//   } else if (loaiHinh === 'hinh-tron') {
//     return Math.PI * Math.pow(a, 2);
//   } else {
//     return 0;
//   }
// }

// router.post('/chu-vi', function (req, res, next) {
//   const { a, b } = req.query;
//   const loaiHinh = req.body.loaiHinh;
//   var kq = 0;
//   if (loaiHinh === 'hinh-tron') {
//     kq = 2 * a * Math.PI;
//   } else if (loaiHinh === 'hinh-vuong') {
//     console.log(parseInt(a))

//     kq = 4 * parseInt(a);
//     console.log(kq)
//   } else if (loaiHinh === 'hinh-chu-nhat') {
//     kq = 2 * (a + b);
//   } else {
//     return res.status(400).json({ error: 'Loại hình không hợp lệ.' });
//   }
//   res.json({ 'chuvi': kq });
// });