const {PythonShell} = require('python-shell');
const util = require('util');
const inputDatabase = require('../axios/toDatabase');
const toDatabaseSync = util.promisify(inputDatabase.toDatabase)
const dbPool = require('../config/config');
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
    console.log("인포쿼리");

    //meet_share 추가
    var findindex = await dbPool(`SELECT * FROM ${schema}.meet_information WHERE meet_name = '${req.body.meet_title}'`);

    console.log(findindex[0].meet_index);

    var meet_share_query = `
    INSERT INTO
        ${schema}.meet_share(user1_index, meet_index)
    VALUES('${req.user[0].user_index}','${findindex[0].meet_index}')
    `
    await dbPool(meet_share_query);
    console.log("쉐어쿼리");

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

module.exports = {
    pythonRunAws,
    pythonRunReformat,
}
