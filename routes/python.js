const {PythonShell} = require('python-shell');
const util = require('util');
const inputDatabase = require('../axios/toDatabase');
const toDatabaseSync = util.promisify(inputDatabase.toDatabase)//프로미스화
  /**
   * 
   * @param {*} req req.file
   * @param {*} res 
   * @param {*} path 
   */
const pythonRunAws = async (req, res, path) => {
    var options = {
        mode: 'text',
        scriptPath: path.join(__dirname, "../python/"),
        args: [`${req.file.originalname}`]
    };
    console.log("pythonRunAws - options : ",options);
    PythonShell.run('aws.py', options, function (err, results) {
        if (err){
            throw err; 
        } 
        console.log("----------파이썬 pythonRunAws 실행 완료---------");
        console.log(results);
        pythonRunReformat(req, res, path);
    });
    return true;
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
        console.log(results);
        await toDatabaseSync(req, res);
    });
}

module.exports = {
    pythonRunAws,
    pythonRunReformat,
}