var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');
var bodyParser = require('body-parser');


var fs = require('fs');
console.log('파일읽기프로세스시작...');
fs.readFile('./data/before.json', function (err, data) {
  if(err) throw err;
  console.log(data.toString());
});
console.log('파일읽기프로세스끝.');

module.exports = router;
