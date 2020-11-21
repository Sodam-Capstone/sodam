const pageProfileService = require('./pageProfileService');

/**
 * Controller 대신 사용
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileResult = (req, res)=>{
    const result = pageProfileService.pageProfileSelect(req, res);
    
    if(req.query['mode'] === 'update'){
        console.log("pageProfileResult update 입니다.");
        pageProfileService.pageProfileUpdate(req, res);
    }
    return result;
}

module.exports = {
    pageProfileResult,
}