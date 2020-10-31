const localStrategy = require("passport-local").Strategy;

module.exports = passport => {
    passport.use(
        new localStrategy({
                usernameField: "id", // 여기서 id,pw의 값은 index.html의 form에서 해당하는 name값이여야 합니다.  
                passwordField: "pw"
            },
            (id, pw, done) => { // id, pw는 위에서 받은 값 입니다.
                try {
                    const user = { // 테스트 사용자정보 객체
                        id: "test",
                        pw: "1234"
                    };
                    // db.query('SELECT * from test.test', (error, rows, fields) => {
                    //     if (error) throw error;
                    //     console.log("실행");
                    //   });
                    if (id === user.id && pw === user.pw) { // id,pw를 사용하여 db에서 사용자를 조회하는 로직이 들어가야 합니다.
                        console.log("localStrategy에서 id,pw 조회 성공");
                        done(null, user); // 콜백부분은 아래에서 자세히 설명하겠습니다.
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )
    );
};
