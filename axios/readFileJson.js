const fs = require('fs');
const path = require('path');
const util = require('util');


json_path = path.join(__dirname, "../");
const readFile = util.promisify(fs.readFile); 

//axios를 사용하진 않았음. 사용할 필요가 없음

/**
 * 
 * @param {json 파일 이름} req 
 * @param {*} res 
 */
const readFileJson = async (req, res) =>{
  var temp = req.file.originalname;
  temp = temp.substring(0, temp.length-4);

 var result = await readFile(`${json_path}/reformat_json/reformat_${temp}.json`, (err, data) => {
    if (err) throw err;
    data = data.toString(); 
  });
  var jsondata = JSON.parse(result);
  return jsondata;
}


module.exports = {
  readFileJson,
}