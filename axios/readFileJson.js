const fs = require('fs');
const path = require('path');
const util = require('util');

json_path = path.join(__dirname, "../");
const readFile = util.promisify(fs.readFile); //프로미스화 시켜주기

//axios를 사용하진 않았음. 사용할 필요가 없음

/**
 * async/await 해줄것
 * @param {json 파일 이름} req 
 * @param {*} res 
 */
const readFileJson = async (req, res) =>{
  var temp = req.file.originalname;
  temp = temp.substring(0, temp.length-4);

 var result = await readFile(`${json_path}/reformat_json/reformat_${temp}.json`, (err, data) => {//위에서 프로미스화 시켜줬기 때문에 동기식으로 사용가능케됨 fileSync를 쓸필요가 없음.
    if (err) throw err;
    data = data.toString(); //버퍼로 생성되기 때문에 꼭 toString 해줘야함
  });
  var jsondata = JSON.parse(result);//parse 인지 stringfy인지 꼭 생각해서 구분!!
  return jsondata;
}


module.exports = {
  readFileJson,
}