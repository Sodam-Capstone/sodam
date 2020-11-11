var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('./middlewares.js');


var count = 0;
router.get("/success", isLoggedIn, (req, res, next) => {
    count += 1;
    console.log("req.user :", req.user);
    res.render("index", {
        user_id: req.user[0].user_id,
        count: count,
    });
});

module.exports = router;