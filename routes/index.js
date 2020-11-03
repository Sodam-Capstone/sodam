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
router.post('/auth/login', isNotLoggedIn, (req, res, next)=>{
  /**
   * 로그인 전략 수행하는 로직
   */
  passport.authenticate('local', (authError, user, info)=>{
    if(authError){
      console.log(info);
      console.error(authError);
      return next(authError);
    }
    if(!user){
      console.log(info);
      return res.redirect('/');
    }
    return req.login(user, (loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/success');
    });
  })(req, res, next);
});

router.get('/auth/logout', isLoggedIn, (req, res)=>{
  req.logout();
  req.session.destroy();
  //delete req.session;
  res.redirect('/');
})

var count = 0;
router.get("/success", isLoggedIn,(req, res, next) => {
  count += 1;
  console.log("req.user :" ,req.user);
  res.render("success", {
    user: req.user[0].email,
    count: count,
  });
});
router.get("/test", isLoggedIn,(req, res, next) => {
  count += 1;
  res.render("test", {
    user: req.user[0].email,
    count: count,
  });
});


module.exports = router;
