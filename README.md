# project-sodam

# 내역
### 2020-10-15
* 터미널을 열어 npm i 명령어로 실행에 필요한 npm 들을 설치해줍니다.
* 설치한 후 npm i -D nodemon 명령어로 developer시에 nodemon을 사용할 수 있게 설치해줍니다.
* 다 하셨으면 npm start 로 시작후 브라우저에서 localhost:3000 으로 맵핑하면 됩니다.

### 2020-10-29
* 서버디비와 연결
* Node.js와 Mysql 연동
* DB connection 모듈화
* DB 정보 env에 담아서 외부에 노출 되지 않게함.
* gitignore로 env 무시

### 2020-10-30
* 세션 유지하면서 로그인 유무에 따른 접근 권한 가능 여부 수준의 로그인 구현(로그인이 제일 어려운거 같다..) 
* Nodejs는 기본적으로 비동기로 로직을 처리하기 때문에 mysql의 쿼리문을 수행하는데 있어서 문제가 있었다.
* 쿼리문 로직을 완료하기 전에 벌써 다음 로직으로 넘어가서 자꾸 출력값이 null 됨.
* 결국 mysql2 모듈로 커넥션 풀을 사용하여 async / await를 사용하여 동기처리를 할 수 있도록 모듈을 만듬.
* 비동기 관련해서 **직접** 만든 모듈 코드
```
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
const dbTest = async (queries) => {
    const connection = await pool.getConnection(async conn => conn);
    try {    
      const [rows] = await connection.query(queries);
      connection.release();
      return rows;
    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  };
module.exports = dbTest;
```
* 정상적으로 세션유지하면서 로그인 상태에서의 접근 가능여부 구현, 반대로 로그인 안하면 접근 못함
* 세션 전부 없앰으로써 로그아웃 구현

### 2020-11-08
```
1) 로그인 관련한 코드 정리
2) 로그인 로그아웃 테스트 성공
3) 프론트엔드에 입혀서 로그인 로그아웃 테스트 성공
```

### 2020-11-09
```
1) 로그인에 대한 모든 예외처리 작업
2) 회원가입 팝업 처리
3) 중복체크 및 회원가입 성공

해야할것 : 비밀번호 체크 틀렸을때 예외처리, 회원가입 눌렀을때 성공하면 모달 닫기, 비밀번호 암호화 시키기
```
### 2020-11-11
```
1) 중복 체크 틀렸을때 예외처리 완료
2) 회원가입 눌렀을 때 모달 창닫기 완료
```

### 2020-11-14
1) 중복되는 태그들 하나로 처리

2) 세션은 유지되지만 로그인 아이디는 바뀌지 않은거 수정

3) 쓸데없는 파일들 삭제

4) 로그인 부분 코드 수정 및 안정화

5) 로그인이 필요한 부분은 로그인 화면으로 이동
**=> 나중에 alert도 뜨게끔 수정**

