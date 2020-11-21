const localStrategy = require("passport-local").Strategy;
const dbPool = require('../config/config.js') //DB 연결
const bcrypt = require('bcrypt');

module.exports = passport => {
    passport.use(
        new localStrategy({
                usernameField: "email", // 여기서 id,pw의 값은 index.html의 form에서 해당하는 name값이여야 합니다.  
                passwordField: "password"
            },
            async(email, password, done) => { // id, pw는 위에서 받은 값 입니다.
                try {
                    const user = await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.user_information WHERE user_id ='${email}'`);
                    const password_key = await bcrypt.compare(password, user[0].user_pw); 
                    console.log(password_key);
                    console.log(user[0]);

                    if(user){
                        if (email === user[0].user_id && password_key === true) { // id,pw를 사용하여 db에서 사용자를 조회하는 로직이 들어가야 합니다.
                            console.log("localStrategy에서 id,pw 조회 성공");
                            done(null, user[0]); 
                        }else{
                            console.log("비밀번호가 일치하지 않습니다.");
                            done(null, false, {message : '비밀번호가 일치하지 않습니다.'});
                        }
                    }else{
                        console.log("가입되지 않은 회원입니다.");
                        done(null, false, {message:'가입되지 않은 회원입니다.'});
                    }
                   
                } catch (error) {
                    console.log(error);
                    done(null, false, {message:'가입되지 않은 회원입니다.'});
                }
            }
        )
    );
};
