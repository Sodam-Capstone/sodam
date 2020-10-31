var express = require('express');
var router = express.Router();
const db = require('../config/config.js') //DB 연결
const passport = require('passport');
const { isLoggedIn } = require('./middlewares.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  const select = async () => {
    try {
      await db.query('SELECT * from test.test', (error, rows, fields) => {
        if (error) throw error;
        //res.json(rows);
        res.render('index', {
          id: rows[0].id,
          name: rows[0].name,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  select();
});

router.post("/login", (req, res, next) => {
  console.log("/login 받음");
  passport.authenticate("local", (authError, user, info) => { // passport/localStrategy.js를 실행시킵니다.  (1)

    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
      }
    });
  })(req, res, next);

  res.redirect("/success");
});
var count = 0;
router.get("/success", isLoggedIn,(req, res, next) => {
  count += 1;
 
  res.render("success", {
    user: req.user,
    count: count,
  });
});
router.get("/test", isLoggedIn,(req, res, next) => {
  count += 1;
  res.render("test", {
    user: req.user,
    count: count,
  });
});


module.exports = router;
