const dbPool = require("../../config/config")

/**
 * Select
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileSelect = async (req, res) => {
    const result = await dbPool(`
        SELECT
            user_index,
            user_id,
            user_name,
            user_email
        FROM ${process.env.DB_DATABASE}.user_information
        WHERE 1=1 
            AND user_index = ${req.user[0].user_index}
    `);
    return result;
}
/**
 * Insert
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileInsert = (req, res) => {

}
/**
 * Update
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileUpdate = async (req, res, password_hash) => {
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
const pageProfileDelete = async (req, res) => {
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
const pageProfilePasswordCheck = async (req, res) => {
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
    pageProfileSelect,
    pageProfileInsert,
    pageProfileUpdate,
    pageProfileDelete,
    pageProfilePasswordCheck,
}