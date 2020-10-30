var express = require('express');
var router = express.Router();
const db = require('../config/config.js') //DB 연결

/* GET home page. */
router.get('/', (req, res, next) => {
  db.query('SELECT * from test.test', (error, rows, fields) => {
    if (error) throw error;
    res.json(rows);
  });
});

module.exports = router;
