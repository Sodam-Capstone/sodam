const pageProfileDao = require('./pageProfileDao');

/**
 * Select
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileSelect = async (req, res) =>{
   const result = await pageProfileDao.pageProfileSelect(req, res);
   return result;
}

/**
 * Insert
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileInsert = async (req, res) =>{
    const result = await pageProfileDao.pageProfileInsert(req, res);
    return result;
 }

 /**
  * Update
  * @param {*} req 
  * @param {*} res 
  */
const pageProfileUpdate = async (req, res) =>{
    const result = await pageProfileDao.pageProfileUpdate(req, res);
    
    return result;
}

/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileDelete = async (req, res) =>{
    const result = await pageProfileDao.pageProfileDelete(req, res);
    return result;
}

module.exports = {
    pageProfileSelect,
    pageProfileInsert,
    pageProfileUpdate,
    pageProfileDelete,
}