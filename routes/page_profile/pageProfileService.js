const pageProfileDao = require('./pageProfileDao');
const bcrypt = require('bcrypt');

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
    const old_pw = await pageProfileDao.pageProfilePasswordCheck(req, res);
    const password_key = await bcrypt.compare(req.body.old_pw, old_pw);
    if(password_key){
        const new_pw = await bcrypt.hash(req.body.new_pw, 12);
        await pageProfileDao.pageProfileUpdate(req, res, new_pw);
        return 1;
    }else{
        return 0;
    }
}

/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileDelete = async (req, res) =>{
    const pwCheck = await pageProfileDao.pageProfilePasswordCheck(req, res);
    const password_key = await bcrypt.compare(req.body.user_pw, pwCheck);

    if(password_key){
        await pageProfileDao.pageProfileDelete(req, res);
        req.logout();
        req.session.destroy();
        return 1;
    }else{
        return 0;
    }
}

module.exports = {
    pageProfileSelect,
    pageProfileInsert,
    pageProfileUpdate,
    pageProfileDelete,
}