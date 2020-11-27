const dbPool = require("../config/config");

const csvToDatabase = async(resultCsv, meet_index) =>{
    
    for(var k in resultCsv){
        var query = `
        INSERT INTO ${process.env.DB_DATABASE}.meet_emotion(
            meet_index,
            speaker,
            anger,
            happiness,
            neutral,
            sadness,
            time
        )
        VALUES(
            '${meet_index}',
            '${resultCsv[k].speaker}',
            '${resultCsv[k].anger}',
            '${resultCsv[k].happiness}',
            '${resultCsv[k].neutral}',
            '${resultCsv[k].sadness}',
            '${resultCsv[k].time}'
        )
        `;
    
    await dbPool(query);
    }
    return 1;
}

module.exports={
    csvToDatabase,
}