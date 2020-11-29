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
    if(req.body.mode === 'update'){
        console.log("sentimentalTotalResult update 입니다.");
        const result = await sentimentalTotalService.sentimentalTotalUpdate(req, res);
        return result;
    }else if(req.body.mode === 'delete'){
        console.log("sentimentalTotalResult delete 입니다.");
        const result = await sentimentalTotalService.sentimentalTotalDelete(req, res);
        return result;
    }
}

module.exports = {
    sentimentalTotalResult,
    sentimentalTotalMerge,
}