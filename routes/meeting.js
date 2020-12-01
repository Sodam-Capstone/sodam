var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const pageProfile = require('./page_profile/pageProfile');
const sentimentalTotal = require('./sentimental_total/sentimentalTotal');
const python = require('./python');
const path = require('path');
const {
  isLoggedIn,
  isNotLoggedIn
} = require('./middlewares.js');
const {
  Console, time
} = require('console');

router.get('/enrollment', isLoggedIn, async (req, res, next) => {
  var meeting_list = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share as m_s join ${process.env.DB_DATABASE}.meet_information as m_i ON (m_s.meet_index = m_i.meet_index) left join ${process.env.DB_DATABASE}.meet_hashing as m_h ON (m_s.meet_index = m_h.meet_index) WHERE m_s.user1_index = ${req.user[0].user_index}`);
  var i;
  for (i = 0; meeting_list[i] != undefined; i++)
    console.log('rows : ' + i);
  console.log(i);

  res.render('enrollment', {
    user_id: req.user[0].user_id,
    meeting_data: meeting_list,
    row: i,
  });
})

router.get('/meeting-list', isLoggedIn, async (req, res, next) => {
  var meeting_list = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share as m_s join ${process.env.DB_DATABASE}.meet_information as m_i ON (m_s.meet_index = m_i.meet_index) left join ${process.env.DB_DATABASE}.meet_hashing as m_h ON (m_s.meet_index = m_h.meet_index) WHERE m_s.user1_index = ${req.user[0].user_index}`);
  console.log(meeting_list);
  var i;
  for (i = 0; meeting_list[i] != undefined; i++)
    console.log('rows : ' + i);
  console.log(i);
  res.render('meeting-list', {
    user_id: req.user[0].user_id,
    meeting_data: meeting_list,
    row: i,
  });
})

router.post('/meeting-list', isLoggedIn, async (req, res) => {
  console.log("받음");
  console.log(`${req.body.send_data}`);

  var meeting_list = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share as m_s join ${process.env.DB_DATABASE}.meet_information as m_i ON (m_s.meet_index = m_i.meet_index) left join ${process.env.DB_DATABASE}.meet_hashing as m_h ON (m_s.meet_index = m_h.meet_index) WHERE m_s.user1_index = ${req.user[0].user_index}`);
  console.log(meeting_list);

  var list = req.body.send_data;
  var len = req.body.send_data.length;

  for (var i = 0; i < len; i++) {
    if (list[i] == ',') {
      continue;
    }
    var del_index = list[i];
    var delete_list_query = `
    DELETE FROM
        ${process.env.DB_DATABASE}.meet_share
    WHERE share_index = ${meeting_list[del_index].share_index};
    `
    await dbPool(delete_list_query);
  }


  var meeting_list = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_share as m_s join ${process.env.DB_DATABASE}.meet_information as m_i ON (m_s.meet_index = m_i.meet_index) left join ${process.env.DB_DATABASE}.meet_hashing as m_h ON (m_s.meet_index = m_h.meet_index) WHERE m_s.user1_index = ${req.user[0].user_index}`);
  console.log(meeting_list);

  var i;
  for (i = 0; meeting_list[i] != undefined; i++)
    console.log('rows : ' + i);
  console.log(i);
  res.render('meeting-list', {
    user_id: req.user[0].user_id,
    meeting_data: meeting_list,
    row: i,
  });
});

router.get('/page-lockscreen', isLoggedIn, (req, res, next) => {
  res.render('page-lockscreen', {
    user_id: req.user[0].user_id,
  });
})

router.get('/page-profile', isLoggedIn, async (req, res, next) => {
  const result = await pageProfile.pageProfileResult(req, res);
  res.render('page-profile', {
    user_id: result[0].user_id,
    user_name: result[0].user_name,
    user_email: result[0].user_email,
  });
})

router.post('/page-profile/update', isLoggedIn, async (req, res, next) => {
  const result = await pageProfile.pageProfileMerge(req, res);
  res.json({
    result,
  });
})

router.post('/sentimental_total', isLoggedIn, async (req, res, next) => {
  var meet_name = req.body.meet_name;
  const duplicate_check = await sentimentalTotal.sentimentalTotalResult(req, res);

  var emotion_result = async (req, res) => {
    //user id의 목록에서만 select 해서 회의이름 중복 예외처리
    var textdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_texts WHERE meet_title = '${req.body.meet_name}' && reg_mber = '${req.user[0].user_id}'`);

    //user index의 목록에서만 select 해서 회의이름 중복 예외처리
    var getindex = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_information as m_i join ${process.env.DB_DATABASE}.meet_share 
  as m_s ON (m_i.meet_index = m_s.meet_index) WHERE user1_index = '${req.user[0].user_index}' and meet_name = '${req.body.meet_name}'`);

    var hashdata = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_hashing WHERE meet_index = ${getindex[0].meet_index}`);
    //console.log(getindex[0].meet_index);
    console.log(`${req.body.meet_name}`);
    var speakerdata = await dbPool(`SELECT DISTINCT speaker_label FROM ${process.env.DB_DATABASE}.meet_texts where meet_title = '${req.body.meet_name}'`);
    var speakerlist = await dbPool(`SELECT speaker_label FROM ${process.env.DB_DATABASE}.meet_texts where meet_title = '${req.body.meet_name}'`);
    var emotion = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_emotion where meet_index= '${getindex[0].meet_index}'`)

    var i;
    var total_anger = 0;
    var total_happy = 0;
    var total_neutral = 0;
    var total_sad = 0;
    var total_time = 0;
    var score = 0;
    var em = new Array();
    var emsplit = new Array();
    var tt = 0;
    for (i = 0; emotion[i] != undefined; i++) {
      total_anger += emotion[i].anger *= 1;
      total_happy += emotion[i].happiness *= 1;
      total_neutral += emotion[i].neutral *= 1;
      total_sad += emotion[i].sadness *= 1;
      total_time += emotion[i].time *= 1;
      em[i] = (emotion[i].anger / emotion[i].time * 100).toFixed(1) + ',' + (emotion[i].neutral / emotion[i].time * 100).toFixed(1) + ',' + (emotion[i].sadness / emotion[i].time * 100).toFixed(1) + ',' + (emotion[i].happiness / emotion[i].time * 100).toFixed(1)
    }
    var people = new Array(i);
    var num = 100 / i;
    var avg_time = total_time / i;
    var time_percent = new Array(i);
    var personal_score = new Array(i);
    var v = 0;
    var total = (total_anger / total_time * 100).toFixed(1) + ',' + (total_neutral / total_time * 100).toFixed(1) + ',' + (total_sad / total_time * 100).toFixed(1) + ',' + (total_happy / total_time * 100).toFixed(1);
    var total_emotion = new Array();
    total_emotion[0] = (total_anger / total_time * 100).toFixed(1);
    total_emotion[1] = (total_neutral / total_time * 100).toFixed(1);
    total_emotion[2] = (total_sad / total_time * 100).toFixed(1);
    total_emotion[3] = (total_happy / total_time * 100).toFixed(1);
    var timedata = new Array();
    var personal_emotion = new Array(i);
    for (i = 0; emotion[i] != undefined; i++) {
      personal_emotion[i] = new Array();
      personal_emotion[i][0] = (emotion[i].anger / emotion[i].time * 100).toFixed(1);
      personal_emotion[i][1] = (emotion[i].neutral / emotion[i].time * 100).toFixed(1);
      personal_emotion[i][2] = (emotion[i].sadness / emotion[i].time * 100).toFixed(1);
      personal_emotion[i][3] = (emotion[i].happiness / emotion[i].time * 100).toFixed(1);
      timedata[i] = emotion[i].time;
      time_percent[i] = emotion[i].time / total_time * 100;
      v += (time_percent[i] - num) * (time_percent[i] - num);
      personal_score[i] = ((emotion[i].happiness / emotion[i].time * 1.0) + (emotion[i].neutral / emotion[i].time * 0.67) + (emotion[i].sadness / emotion[i].time * 0.33)) * 100;
      personal_score[i] = personal_score[i].toFixed(1);
    }
    var spk_num = speakerdata.length;
    for (i = 0; i < spk_num; i++) {
      people[i] = speakerdata[i].speaker_label;
    }
    for (i = 0; i < spk_num; i++) {
      tt += emotion[i].time;
    }
    var spklist = new Array(i);
    for (i = 0; i < speakerlist.length; i++) {
      spklist[i] = speakerlist[i].speaker_label;
    }

    v /= i;
    time_score = 100 - (Math.sqrt(v) * 2);
    time_score = time_score.toFixed(0);
    console.log(time_score);
    emotion_score = ((total_happy / total_time * 1.0) + (total_neutral / total_time * 0.67) + (total_sad / total_time * 0.33)) * 100;
    emotion_score = emotion_score.toFixed(1);
    var emotion_score_text = "";
    if(80<=emotion_score && emotion_score <=100)emotion_score_text='아주 좋음';
    else if(60<=emotion_score && emotion_score <80)emotion_score_text='좋음';
    else if(40<=emotion_score && emotion_score <60)emotion_score_text='보통';
    else if(20<=emotion_score && emotion_score <40)emotion_score_text='나쁨';
    else if(0<=emotion_score && emotion_score <20)emotion_score_text='아주 나쁨';
    var time_score_text = "";
    if(80<=time_score && time_score <=100)time_score_text='아주 좋음'
    else if(60<=time_score && time_score <80)time_score_text='좋음'
    else if(40<=time_score && time_score <60)time_score_text='보통'
    else if(20<=time_score && time_score <40)time_score_text='나쁨'
    else if(0<=time_score && time_score <20)time_score_text='아주 나쁨'
    res.render('sentimental_total', {
      user_id: req.user[0].user_id,
      user1_score: personal_score[0],
      user2_score: personal_score[1],
      user3_score: personal_score[2],
      user4_score: personal_score[3],
      emotion: em,
      total_emotion: total_emotion,
      total: total,
      timedata: timedata,
      personal_emotion: personal_emotion,
      avg_time: avg_time,
      text_title: req.body.meet_name,
      total_time: tt,
      emotion_score_text,
      time_score_text,
      hashdata: hashdata[0],
      testdata: textdata,
      speakerdata: people,
      speakerlist: spklist,
      emotion_score: emotion_score,
      time_score: time_score,
      spk_num: spk_num,
      file_path: 'https://s3.ap-northeast-2.amazonaws.com/speech.to.text/' + getindex[0].meet_voice,
    });
  }
  if (duplicate_check === false) {
    await python.pythonMain(req, res, meet_name);
    const timeout = setTimeout(()=>{
      emotion_result(req,res);
    }, 7000);
  }else{
    emotion_result(req, res);
  }
})
router.post('/sentimental_total/real-time', isLoggedIn, async (req, res, next) => {
  var dd = await dbPool(`UPDATE ${process.env.DB_DATABASE}.meet_texts SET speaker_label='${req.body.new_spk}' WHERE speaker_label='${req.body.old_spk}' and meet_title='${req.body.meet_title}'`);

  return false;
})


router.get('/login-findid', isNotLoggedIn, (req, res, next) => {
  res.render('login-findid', {});
})

router.get('/login-findpw', isNotLoggedIn, (req, res, next) => {
  res.render('login-findpw', {});
})

module.exports = router;