var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', async (req, res, next) => {
  title = await dbPool('select * from test.test');
  res.render('index', {
    title : "소담",
    id: title[0].id,
    name: title[0].name,
  });
});

// router.post("/login", (req, res, next) => {
//   console.log("/login 받음");
//   passport.authenticate("local", (authError, user, info) => { // passport/localStrategy.js를 실행시킵니다.  (1)

//     return req.login(user, loginError => {
//       if (loginError) {
//         console.error(loginError);
//       }
//     });
//   })(req, res, next);

//   res.redirect("/success");
// });
router.get('/login',isNotLoggedIn,(req,res,next)=>{
  res.render('login');
})
router.post('/auth/login', isNotLoggedIn, (req, res, next)=>{
  passport.authenticate('local', (authError, user, info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
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

// 회원가입을 위해서 추가
router.get('/join', function(req, res, next) {
  res.render("join");
  console.log("회원가입");
});

// 데이터 post 확인
router.post('/sign_up', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  res.render('sign_up', {
    name: name,
    email: email,
  });
  console.log("전송");
});


module.exports = router;
