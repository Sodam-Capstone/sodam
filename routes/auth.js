var express = require('express');
var router = express.Router();
const dbPool = require('../config/config.js') //DB 연결
const passport = require('passport');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('./middlewares.js');

router.post('/login', isNotLoggedIn, (req, res, next) => {
    /**
     * 로그인 전략 수행하는 로직
     */
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.log(info);
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            console.log(info);
            return res.redirect('/');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/success');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    //delete req.session;
    res.redirect('/');
})


module.exports = router;