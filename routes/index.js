var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');

var {PythonShell} = require('python-shell');
const path = require('path');

/**
 * AWS-SDK 관련 부분
 */
const AWS = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "speech.to.text",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);//확장자
      cb(null, file.originalname)
    },
    acl: 'public-read-write',
  })
})

router.get('/upload', function(req, res, next) {
  res.render('aws_test');
});

router.post('/upload', upload.single("wav"), function(req, res, next){
  // req.file 은 `wav` 라는 필드의 파일 정보입니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
  res.redirect('/');
})
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
