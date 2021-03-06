
![소담 아이콘](https://user-images.githubusercontent.com/63000843/99904801-aff92700-2d10-11eb-9cd3-b9606e8f71c3.png)

# 사용방법
1) npm i 를 터미널에서 실행하여 npm 들을 설치해줍니다.
2) DB와 연동하기 위하여 .env에 다음과 같이 입력합니다.

```
DB_HOST = "호스트"
DB_USER = "계정"
DB_PASSWORD = "비밀번호"
DB_DATABASE = "스키마"
COOKIE_SECRET = ""
```
3) config 폴더를 만들어 awsconfig.json을 다음과 같이 입력합니다. 꼭 .gitignore 처리를 해주세요.

```
{
    "accessKeyId": "aws accesskey를 넣어주세요.",
    "secretAccessKey": "aws accesskey를 넣어주세요.",
    "region": "ap-northeast-2" //본인 지역을 넣어주세요. 
  }
```
4) npm start을 터미널에 입력하여 실행시켜줍니다.

[sodam에 사용된 주요 모듈 설명](https://github.com/kingbj940429/Node.JS_Tips_for_me/blob/main/README.md)

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

### 2020-11-15
1) **aws-sdk** 를 사용하여 AWS 와 연결시켜줌

2) 회의등록에서 제출을 하면 s3 파일을 저장해주고 **aws 파이썬 api** 를 실행시킴

3) 제출한 음성파일에 대해 DB에 저장

### 2020-11-18
1) 새로운 웹 브라우저로 접속하지않는 이상 동일한 웹 브라우저에선 세션이 끊기지 않게 함

### 2020-11-18
1) reformat.py 수정

### 2020-11-21
1) __**bcrypt**__ 로 비밀번호 암호화
2) profile-page 세분화

### 2020-11-22
1) MVC 패턴으로 profile-page 코드 구현
2) 회원정보 수정과 탈퇴 기능 구현

  => 모든 예외처리 완료(__**bcrypt**__ 으로 비교)
