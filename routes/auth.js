var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const bcrypt = require('bcrypt');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('./middlewares.js');

/**
 * 로그인
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.log(info);
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            console.log(info);
            res.json({
                message : '요청 실패',
            });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            res.json({
                message : '요청 성공',
            });
        });
    })(req, res, next);
});


/**
 * 로그아웃
 */
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    //delete req.session;
    res.redirect('/');
});

/**
 * 회원가입
 */
router.post('/join',isNotLoggedIn, async(req, res)=>{
    const password_hash = await bcrypt.hash(req.body.password_join, 12);
    var query = `
    INSERT INTO ${process.env.DB_DATABASE}.user_information (
        user_id, 
        user_pw, 
        user_name, 
        user_email) 
    VALUES (
        '${req.body.id_join}', 
        '${password_hash}', 
        '${req.body.name_join}', 
        '${req.body.email_join}'
        );`;
    await dbPool(query);
    res.render('join');
});

/**
 * 아이디 중복체크
 */
router.post('/duplicate_id',isNotLoggedIn, async(req,res)=>{
    var temp = await dbPool(`SELECT user_id FROM ${process.env.DB_DATABASE}.user_information WHERE user_id = '${req.body.id_join}'`)
    console.log(`SELECT user_id FROM ${process.env.DB_DATABASE}.user_information WHERE user_id = '${req.body.id_join}'`);
    if(temp[0] == undefined){
        res.json({
            duplicate_id_check : false
        })
    }else{
        res.json({
            duplicate_id_check : true
        });
    }
});

/**
 * 이메일 중복체크
 */
router.post('/duplicate_email',isNotLoggedIn, async(req,res)=>{
    var temp = await dbPool(`SELECT user_email FROM ${process.env.DB_DATABASE}.user_information WHERE user_email = '${req.body.email_join}'`)
    console.log(`SELECT user_email FROM ${process.env.DB_DATABASE}.user_information WHERE user_email = '${req.body.email_join}'`);
    if(temp[0] == undefined){
        res.json({
            duplicate_email_check : false
        })
    }else{
        res.json({
            duplicate_email_check : true
        });
    }
});

module.exports = router;