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

router.get('/meeting-list', isLoggedIn, (req, res, next) => {
  res.render('meeting-list', {
    user_id: req.user[0].user_id,
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

router.get('/sentimental_total', isLoggedIn, async(req, res, next) => {
  // 나중에 회의등록에서 넘어온 meet_title 일치하는것만 불러올 예정
  var textdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_texts WHERE meet_title = '등록자 확인중'`);
  var hashdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_hashing WHERE meet_index = 1`);
  console.log(textdata);
  console.log(hashdata);
  res.render('sentimental_total', {
    user_id : req.user[0].user_id,
    text_title : textdata[0].meet_title,
    text_spk1 : textdata[0].speaker_label,
    text_result : textdata[0].result,
    text_spk2 : textdata[1].speaker_label,
    text_result2 : textdata[1].result,

    hash1 : hashdata[0].meet_hashtag1,
    hash2 : hashdata[0].meet_hashtag2,
    hash3 : hashdata[0].meet_hashtag3,
  });
})


module.exports = router;
