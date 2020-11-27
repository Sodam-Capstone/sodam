const pageProfileService = require('./pageProfileService');

/**
 * Controller 대신 사용
 * @param {*} req 
 * @param {*} res 
 */
const pageProfileResult = (req, res)=>{
    const result = pageProfileService.pageProfileSelect(req, res);
    
    return result;
}

const pageProfileMerge = async (req, res) =>{
    if(req.body.mode === 'update'){
        console.log("pageProfileResult update 입니다.");
        const result = await pageProfileService.pageProfileUpdate(req, res);
        return result;
    }else if(req.body.mode === 'delete'){
        console.log("pageProfileResult delete 입니다.");
        const result = await pageProfileService.pageProfileDelete(req, res);
        return result;
    }
}

module.exports = {
    pageProfileResult,
    pageProfileMerge,
}