const sentimentalTotalService = require('./sentimentalTotalService');

/**
 * Controller 대신 사용
 * @param {*} req 
 * @param {*} res 
 */
const sentimentalTotalResult = async (req, res)=>{
    const result = await sentimentalTotalService.sentimentalTotalSelect(req, res);
    if(parseInt(result[0].cnt) > 0){
        return true;
    }else{
        return false;
    }
}

const sentimentalTotalMerge = async (req, res) =>{
   
}

module.exports = {
    sentimentalTotalResult,
    sentimentalTotalMerge,
}