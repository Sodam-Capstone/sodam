const fs = require('fs');
const path = require('path');
const util = require('util');
const csvToJson = require('./csvToJson');
const cDB = require('./csvToDatabase');
const csvjson = require('csvjson');

json_path = path.join(__dirname, "../");
const readFile = util.promisify(fs.readFile);

//axios를 사용하진 않았음. 사용할 필요가 없음

/**
 * 
 * @param {json 파일 이름} req 
 * @param {*} res 
 */
const readFileJson = async (req, res) => {
  var temp = req.file.originalname;
  temp = temp.substring(0, temp.length - 4);

  var result = await readFile(`${json_path}/reformat_json/reformat_${temp}.json`, (err, data) => {
    if (err) throw err;
    data = data.toString();
  });
  var jsondata = JSON.parse(result);
  return jsondata;
}

const readFileCsv = async (req, res , meet_voice, meet_index) => {
  meet_voice = meet_voice.replace(".wav","")
  var result = await readFile(`${json_path}/python/csv/${meet_voice}.csv`, (err, data) => {
    if (err) throw err;
  });
  const resultCsv  = csvToJson.parseCsv(result);
  cDB.csvToDatabase(resultCsv, meet_index);

  return true;
}


module.exports = {
  readFileJson,
  readFileCsv,
}