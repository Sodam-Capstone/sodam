var express = require('express');
var router = express.Router();
const path = require('path');
const python = require('./python');
const fs = require('fs');
const AWS = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
const path_now = path.join(__dirname, "../");

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new AWS.S3();
json_path = path.join(__dirname, "../");

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "speech.to.text",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, file.originalname)
    },
    acl: 'public-read-write',
  })
});

let local_upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,  path_now + '/python/content');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.post('/upload', upload.single("wavFile"),async function (req, res, next) {
  try {
    console.log("파일 정보 : ", req.file);
    python.pythonRunAws(req, res, path); 
  } catch (error) {
    console.error(error);
  }
  res.redirect('/');
})

module.exports = router;

