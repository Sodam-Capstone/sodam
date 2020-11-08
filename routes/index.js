var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');


/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.session.passport){
    console.log(req.session);
    console.log(req.session.passport.user);
    console.log("session이 존재합니다.");
  }
  title = await dbPool('select * from test.test');
  res.render('index', {
    title : "소담",
    id: title[0].id,
    name: title[0].name,
  });
});

router.get('/login',isNotLoggedIn,(req,res,next)=>{
  res.render('login');
})

router.get('/info', isLoggedIn, (req, res, next)=>{
  res.render('info',{
    user_id : req.user[0].user_id
  })
});

module.exports = router;
