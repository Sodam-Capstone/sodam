var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const {
  isLoggedIn,
  isNotLoggedIn
} = require('./middlewares.js');


router.get('/enrollment', isLoggedIn, (req, res, next) => {
  res.render('enrollment', {
    user_id: req.user[0].user_id,
  });
})

router.get('/meeting-list', isLoggedIn, async(req, res, next) => {
  // 나중에 회의등록에서 넘어온 meet_title 일치하는것만 불러올 예정
  var userlist = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share WHERE user1_index = ${req.user[0].user_index}`);
  console.log(userlist);

  var meetlist = [];
  for(var i = 0 ; i < userlist.length ; i++){
    meetlist[i] = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_information WHERE meet_index = ${userlist[i].meet_index}`);
  }
  console.log(meetlist);
  res.render('meeting-list', {
    user_id: req.user[0].user_id,
    meetlist : meetlist,
    userlist : userlist,
  });
})

router.get('/page-lockscreen', isLoggedIn, (req, res, next) => {
  res.render('page-lockscreen', {
    user_id: req.user[0].user_id,
  });
})

router.get('/page-profile', isLoggedIn, (req, res, next) => {
  res.render('page-profile', {
    user_id: req.user[0].user_id,
  });
})

router.get('/test', isLoggedIn,  async(req, res, next) => {
  // 나중에 회의등록에서 넘어온 meet_title 일치하는것만 불러올 예정
  var textdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_texts WHERE meet_title = '등록자 확인중'`);
  var hashdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_hashing WHERE meet_index = 1`);
  console.log(textdata);
  console.log(hashdata);
  res.render('test', {
    user_id : req.user[0].user_id,
    text_title : textdata[0].meet_title,

    hashdata : hashdata[0],
    testdata : textdata,
  });
})

module.exports = router;
