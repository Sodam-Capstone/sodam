exports.pythonRun = (req, path) => {
    /**
     * Python-Shell 관련
     */
    const {PythonShell} = require('python-shell');

    var options = {
        mode: 'text',
        scriptPath: path.join(__dirname, "../python/"),
        args: [`${req.file.originalname}`]
    };
    console.log("python - options : ",options);
    PythonShell.run('aws.py', options, function (err, results) {
        if (err){
            throw err; 
        } 
        console.log("----------파이썬 실행 완료---------");
        console.log(results);
    });
}
