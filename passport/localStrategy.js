const localStrategy = require("passport-local").Strategy;
const dbPool = require('../config/config.js') //DB 연결

module.exports = passport => {
    passport.use(
        new localStrategy({
                usernameField: "email", // 여기서 id,pw의 값은 index.html의 form에서 해당하는 name값이여야 합니다.  
                passwordField: "password"
            },
            async(email, password, done) => { // id, pw는 위에서 받은 값 입니다.
                try {
                    const user = await dbPool(`select * from test.auth where email='${email}'`);
                    if(user){
                        if (email === user[0].email && password === user[0].password) { // id,pw를 사용하여 db에서 사용자를 조회하는 로직이 들어가야 합니다.
                            console.log("localStrategy에서 id,pw 조회 성공");
                            done(null, user[0]); // 콜백부분은 아래에서 자세히 설명하겠습니다.
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
