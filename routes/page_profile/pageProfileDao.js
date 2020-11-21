const dbPool = require("../../config/config")

/**
 * Select
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileSelect = async (req, res)=>{
    const result = await dbPool(`
        SELECT
            user_index,
            user_id,
            user_name,
            user_email
        FROM ${process.env.DB_DATABASE}.user_information
        WHERE user_index = ${req.user[0].user_index}
    `);
    return result;
}
/**
 * Insert
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileInsert = (req, res)=>{

}
/**
 * Update
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileUpdate = async (req, res)=>{
    const result = await dbPool(`

    `);
}
/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileDelete = (req, res) =>{

}

module.exports = {
    pageProfileSelect,
    pageProfileInsert,
    pageProfileUpdate,
    pageProfileDelete,
}