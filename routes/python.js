const {PythonShell} = require('python-shell');
const util = require('util');
const inputDatabase = require('../axios/toDatabase');
const toDatabaseSync = util.promisify(inputDatabase.toDatabase);
const dbPool = require('../config/config');
const axios = require('../axios/readFile');
const path = require('path');
  /**
   *
   * @param {*} req req.file
   * @param {*} res
   * @param {*} path
   */
const pythonRunAws = async(req, res, path) => {

    var options = {
        mode: 'text',
        scriptPath: path.join(__dirname, "../python/"),
        args: [`${req.file.originalname}`]
    };
    const schema = process.env.DB_DATABASE;

    //meet_information 추가
    var meet_information_query = `
    INSERT INTO
        ${schema}.meet_information(meet_name,meet_date, meet_voice)
    VALUES('${req.body.meet_title}','${req.body.meet_date}','${options.args[0]}')
    `
    await dbPool(meet_information_query);

    //meet_index 찾기
    var findindex = await dbPool(`SELECT * FROM ${schema}.meet_information WHERE meet_name = '${req.body.meet_title}'`);

    //meet_share 추가
    var meet_share_query = `
    INSERT INTO
        ${schema}.meet_share(user1_index, meet_index)
    VALUES('${req.user[0].user_index}','${findindex[0].meet_index}')
    `
    await dbPool(meet_share_query);

    // //태그 추가
    var meet_hash_query = `
    INSERT INTO
        ${schema}.meet_hashing(meet_index, meet_hashtag1, meet_hashtag2, meet_hashtag3)
    VALUES('${findindex[0].meet_index}','${req.body.tagname1}','${req.body.tagname2}','${req.body.tagname3}')
    `
    await dbPool(meet_hash_query);

    // 회의 공유 추가
    for(var i = 0; i< 3; i++){

        //공유란을 비워뒀을 때
        if(req.body.shareID[i] == ""){
            continue;
        }

        var user_index = await dbPool(`SELECT * FROM ${schema}.user_information WHERE user_id = '${req.body.shareID[i]}'`);
        console.log(user_index);

        //아아디를 잘못 입력했을 때
        if(user_index == undefined){
            console.log("잘못된 ID 입력");
            continue;
        }

        var user_share_query = `
        INSERT INTO
            ${schema}.meet_share(user1_index, meet_index)
        VALUES('${user_index[0].user_index}','${findindex[0].meet_index}')
        `
        await dbPool(user_share_query);
    }
    
    console.log("pythonRunAws - options : ",options);
    PythonShell.run('aws.py', options, function (err, results) {
        if (err){
            throw err;
        }
        console.log("----------파이썬 pythonRunAws 실행 완료---------");
        pythonRunReformat(req, res, path);
    });
}

/**
 *
 * @param {*} req req.file
 * @param {*} res
 * @param {*} path
 */
const pythonRunReformat = (req, res, path) => {
    json_path = path.join(__dirname, "../");
    var options = {
        mode: 'text',
        scriptPath: path.join(__dirname, "../python/"),
        args: [`${req.file.originalname}`, json_path]
    };
    console.log("pythonRunReformat - options : ",options);
    PythonShell.run('reformat.py', options, async function (err, results) {
        if (err){
            throw err;
        }
        console.log("----------파이썬 pythonRunReformat 실행 완료---------");
        await toDatabaseSync(req, res);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} path 
 */
const pythonMain = async (req, res, meet_name) => {
    const _path = path.join(__dirname, "../");
    var result = await dbPool(`
        SELECT 
            meet_name,
            meet_voice,
            meet_index
        FROM meet_information
        WHERE meet_name = '${meet_name}'
    `);

    var meet_voice = result[0].meet_voice;
    var meet_index = result[0].meet_index;
    var options = {
        mode: 'text',
        scriptPath: path.join(__dirname, "../python/"),
        args: [meet_voice, _path, meet_voice.replace(".wav","")]
    };
    console.log("pythonMain - options : ",options);
    PythonShell.run('main.py', options, async function (err, results) {
        if (err){
            throw err;
        }
        console.log("----------파이썬 pythonMain 실행 완료---------");
        await axios.readFileCsv(req, res, meet_voice, meet_index);
    });
}

module.exports = {
    pythonRunAws,
    pythonRunReformat,
    pythonMain,
}
