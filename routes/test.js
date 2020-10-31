var express = require('express');
var router = express.Router();
const db = require('../config/config.js') //DB 연결

/* GET home page. */
router.get('/test', (req, res, next) => {
  const select = async ()=>{
    try {
      console.log("await 전");
      await db.query('SELECT * from test.test', (error, rows, fields) => {
        if (error) throw error;
        console.log("실행");
        //res.json(rows);
        res.render('index',{
          id : rows[0].id,
          name : rows[0].name,
        });
      });
      console.log("await 후");
    } catch (error) {
      console.log(error);
    }
  }  
  select();
});

module.exports = router;
