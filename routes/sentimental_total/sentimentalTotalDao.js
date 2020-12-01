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

}
/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalDelete = async (req, res) => {
  
}

module.exports = {
    sentimentalTotalSelect,
    sentimentalTotalInsert,
    sentimentalTotalUpdate,
    sentimentalTotalDelete,
    sentimentalTotalMeetEmotionSelect,
}