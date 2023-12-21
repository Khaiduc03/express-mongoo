var express = require('express');
var router = express.Router();
const userController = require('../../components/user/Controller')
const { checkRegister } = require('../../middle/Validation')
const jwt = require('jsonwebtoken')


/* GET users listing. */

// http://localhost:3000/api/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userController.login(email, password);
    if (user) {
      const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
      const returnData ={
        error: false,
        responseTimestamp: new Date(),
        statusCode:200,
        data:{
          token:token,
          user:user
        }
      }
      return res.status(200).json(returnData);
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

// http://localhost:3000/api/users/register
router.post('/register', [checkRegister], async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await userController.register(email, password, name);
    if (user) {
      res.status(200).json({ result: true, user });
    } else {
      res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    res.status(500).json({ result: false, user: null });
  }
});

module.exports = router;
