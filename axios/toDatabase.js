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

    console.log("쿼리 시작");

    var meet_information_query = `
    INSERT INTO
        ${schema}.meet_information(meet_name,meet_date, meet_voice)
    VALUES('${req.body.meet_title}','${req.body.meet_date}','${req.body.wavFile}')
    `
    await dbPool(meet_information_query);
    console.log("인포 쿼리 성공");


    for(var key in datas.result){
        var temp = datas.result[key];
        var query = `
        INSERT INTO
          ${schema}.meet_texts(meet_title,start_time, speaker_label, end_time, result,reg_mber)
        VALUES('${req.body.meet_title}','${temp.start_time}','${temp.speaker_label}','${temp.end_time}','${temp.result}','${req.user[0].user_id}')
        `
        await dbPool(query);
        console.log("쿼리 성공");
    }

    var findindex = await dbPool(`SELECT * FROM ${schema}.meet_information WHERE meet_name = '${req.body.meet_title}'`);
    console.log("설렉트성공");
    console.log(findindex[0]);

    var meet_share_query = `
    INSERT INTO
        ${schema}.meet_share(user1_index, meet_index)
    VALUES('${req.user[0].user_index}','${findindex[0].meet_index}')
    `
    await dbPool(meet_share_query);
    console.log("쉐어 쿼리 성공");

    //await dbPool(`SELECT * FROM ${process.env.DB_DATABASE}.meet_text`);

}

module.exports = {
    toDatabase,
}
