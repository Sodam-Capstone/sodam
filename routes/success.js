var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('./middlewares.js');


router.get("/success", isLoggedIn, (req, res, next) => {
    if(req.session.passport){
    console.log(req.session);
    console.log("session이 존재합니다.");
    }
    console.log("req.user :", req.user);
    // res.render("index", {
    //     user_id: req.user[0].user_id,
    // });
    res.redirect('/');
});

module.exports = router;