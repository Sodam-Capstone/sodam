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
  var meeting_list = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share as m_s join ${process.env.DB_DATABASE}.meet_information as m_i ON (m_s.meet_index = m_i.meet_index) left join ${process.env.DB_DATABASE}.meet_hashing as m_h ON (m_s.meet_index = m_h.meet_index) WHERE m_s.user1_index = ${req.user[0].user_index}`);
  console.log(meeting_list);
  var i;
  for(i=0;meeting_list[i]!=undefined;i++)
    console.log('rows : '+i);
  console.log(i);
  res.render('meeting-list', {
    user_id: req.user[0].user_id,
    meeting_data: meeting_list,
    row: i,
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

router.get('/sentimental_total', isLoggedIn,  async(req, res, next) => {
  // 나중에 회의등록에서 넘어온 meet_title 일치하는것만 불러올 예정
  var textdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_texts WHERE meet_title = '회의1'`);
  var hashdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_hashing WHERE meet_index = 1`);
  var speakerdata = await dbPool(`SELECT DISTINCT speaker_label FROM ${process.env.DB_DATABASE}.meet_texts`);
  res.render('sentimental_total', {
    user_id : req.user[0].user_id,
    text_title : textdata[0].meet_title,

    hashdata : hashdata[0],
    testdata : textdata,
    speakerdata : speakerdata,
  });
})

module.exports = router;
