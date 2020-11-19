const axios = require('../axios/readFileJson');
const dbPool = require('../config/config');

/**
 *
 * @param {*} req
 * @param {*} res
 */
const toDatabase = async (req, res) => {
    var datas = await axios.readFileJson(req, res);
    const schema = process.env.DB_DATABASE;

    for(var key in datas.result){
        var temp = datas.result[key];
        var query = `
        INSERT INTO
          ${schema}.meet_texts(meet_title,start_time, speaker_label, end_time, result,reg_mber)
        VALUES('${req.body.meet_title}','${temp.start_time}','${temp.speaker_label}','${temp.end_time}','${temp.result}','${req.user[0].user_id}')
        `
        await dbPool(query);
    }


    //await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_text`);

}

module.exports = {
    toDatabase,
}
