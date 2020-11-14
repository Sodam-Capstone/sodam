var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');


/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.user){
    res.render("index", {
      user_id: req.user[0].user_id,
    });
  }else{
    res.render('index');
  }
});

router.get('/login',isNotLoggedIn,(req,res,next)=>{
  res.render('login');
})

module.exports = router;
