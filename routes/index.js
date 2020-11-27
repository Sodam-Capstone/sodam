var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');
const inputDatabase = require('../axios/toDatabase');
const bcrypt = require('bcrypt');
const python = require('./python');
const path = require('path');
/**
 * index 화면
 */

router.get('/',  (req, res, next) => {
  //python.pythonMain(req, res, path);
  if(req.user){
    res.render("index", {
      user_id: req.user[0].user_id,
    });
  }else{
    res.render('index');
  }
});

/**
 * 로그인 화면 이동시 
 */
router.get('/login',isNotLoggedIn,(req,res,next)=>{
  res.render('login');
})

module.exports = router;
