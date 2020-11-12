var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');


router.get('/enrollment',isLoggedIn,(req,res,next)=>{
  res.render('enrollment');
})

router.get('/meeting-list',isLoggedIn,(req,res,next)=>{
  res.render('meeting-list');
})

router.get('/page-lockscreen',isLoggedIn,(req,res,next)=>{
  res.render('page-lockscreen');
})

router.get('/page-profile',isLoggedIn,(req,res,next)=>{
  res.render('page-profile');
})

router.get('/sentimental_total',isLoggedIn,(req,res,next)=>{
  res.render('sentimental_total');
})

module.exports = router;
