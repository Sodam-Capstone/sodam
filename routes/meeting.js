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

// router.get('/meeting-list', isLoggedIn, async(req, res, next) => {
//   // 나중에 회의등록에서 넘어온 meet_title 일치하는것만 불러올 예정
//   // user_index로 meet_index들 받아옴.
//   var userlist = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share WHERE user1_index = ${req.user[0].user_index}`);
//   console.log(userlist);
//
//   //meet_index로 제목, 날짜 받아옴
//   var meetlist = [];
//   for(var i = 0 ; i < userlist.length ; i++){
//     meetlist[i] = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_information WHERE meet_index = ${userlist[i].meet_index}`);
//   }
//   console.log(meetlist);
//
//   //meet_index로 해시태그정보 받아옴
//   var hashlist = [];
//   for(var i = 0 ; i < userlist.length ; i++){
//       hashlist[i] = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_hashing WHERE meet_index = ${userlist[i].meet_index}`);
//   }
//   console.log(hashlist);
//   res.render('meeting-list', {
//     user_id: req.user[0].user_id,
//     meetlist : meetlist,
//     userlist : userlist,
//     hashlist : hashlist,
//   });
// })

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
