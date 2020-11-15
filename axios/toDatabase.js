const axios = require('../axios/readFileJson');
const dbPool = require('../config/config');

const toDatabase = async (req, res) => {
    var datas = await axios.readFileJson(req, res);
    const schema = process.env.DB_DATABASE;
    console.log("toDatabase", datas);
    
    for(var data in datas.result)

    //await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_text`);
    
}

module.exports = {
    toDatabase,
}