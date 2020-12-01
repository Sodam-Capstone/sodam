const sentimentalTotalDao = require('./sentimentalTotalDao');

/**
 * Select
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalSelect = async (req, res) =>{
   const result = await sentimentalTotalDao.sentimentalTotalSelect(req, res);
   const result_me = await sentimentalTotalDao.sentimentalTotalMeetEmotionSelect(req, res, result);
   
   return result_me;
}

/**
 * Insert
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalInsert = async (req, res) =>{
    
 }

 /**
  * Update
  * @param {*} req 
  * @param {*} res 
  */
const sentimentalTotalUpdate = async (req, res) =>{

}

/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalDelete = async (req, res) =>{
   
}

module.exports = {
    sentimentalTotalSelect,
    sentimentalTotalInsert,
    sentimentalTotalUpdate,
    sentimentalTotalDelete,
}