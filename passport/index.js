const local = require("./localStrategy");
const dbPool = require('../config/config.js') //DB 연결

module.exports = passport => {
  passport.serializeUser((user, done) => {   // req.login()에서 넘겨준 user값
    done(null, user.email);                     // user에서 id만 세션에 저장
    console.log("시리얼라이즈유저" , user.email);
    
  });

  // 메모리에 한번만 저장
  passport.deserializeUser(async(email, done) => {  // 매개변수 id는 세션에 저장됨 값(req.session.passport.user)
    try {
      let user = await dbPool(`select * from test.auth where email='${email}'`);
      console.log(email);
      console.log("디시리얼라이즈",user);
      user = done(null, user);
    } catch (error) {
      done(error);
    }
  });

  local(passport);
};
