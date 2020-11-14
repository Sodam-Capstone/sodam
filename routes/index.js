var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');

var {PythonShell} = require('python-shell');
const path = require('path');


/**
 * python 실행부분
 */
// var options = {
//   mode : 'text',
//   scriptPath: path.join(__dirname, "../python/"),
//   args : ['val1', 'val2', 'val3']
// };

// PythonShell.run('aws.py', options, function (err, results) {
//   if (err) throw err;
//   console.log("실행된건가?");
// });

/**
 * index 화면
 */
router.get('/', async (req, res, next) => {
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
