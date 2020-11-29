const dbPool = require("../../config/config")

/**
 * Select
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalSelect = async (req, res) => {
    var meet_name = req.body.meet_name;
    const result = await dbPool(`
        SELECT
            meet_index,
            meet_name,
            meet_voice,
            reg_date
        FROM ${process.env.DB_DATABASE}.meet_information
        WHERE 1=1 
            AND meet_name = '${meet_name}'
    `);
    return result;
}

const sentimentalTotalMeetEmotionSelect = async (req, res, result) =>{
    var meet_index = result[0].meet_index;

    const result_me = await dbPool(`
        SELECT
            COUNT(emotion_index) AS cnt
        FROM ${process.env.DB_DATABASE}.meet_emotion
        WHERE 1=1 
            AND meet_index = '${meet_index}'
    `);
    return result_me;
}
/**
 * Insert
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalInsert = (req, res) => {

}
/**
 * Update
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalUpdate = async (req, res, password_hash) => {
    await dbPool(`
        UPDATE ${process.env.DB_DATABASE}.user_information ui
        SET 
            ui.user_pw = '${password_hash}',
            ui.user_name = '${req.body.user_name}',
            ui.user_email = '${req.body.user_email}'
        
        WHERE 1=1
            AND ui.user_index = ${req.user[0].user_index}
    `);

}
/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalDelete = async (req, res) => {
    await dbPool(`
        DELETE 
            FROM ${process.env.DB_DATABASE}.user_information ui
            WHERE 1=1
                AND ui.user_index = ${req.user[0].user_index}
    `);
}

/**
 * 탈퇴하기전 비밀번호 체크
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalPasswordCheck = async (req, res) => {
    const query = `
        SELECT
            user_pw
        FROM ${process.env.DB_DATABASE}.user_information
        WHERE user_index = ${req.user[0].user_index}
    `
    const result = await dbPool(query);
    return result[0].user_pw;
}

module.exports = {
    sentimentalTotalSelect,
    sentimentalTotalInsert,
    sentimentalTotalUpdate,
    sentimentalTotalDelete,
    sentimentalTotalPasswordCheck,
    sentimentalTotalMeetEmotionSelect,
}