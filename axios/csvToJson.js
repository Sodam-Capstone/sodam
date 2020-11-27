const parseCsv = (result) => {
    var rows = result.toString().split("\n");
    //var time = resultCsv[0].time.replace(/\r/g, "");
    for(var row in rows){
        rows[row] = rows[row].replace(/\r/g, "");
    }
    result = [];
    for (var rowIndex in rows) {
        var row = rows[rowIndex].split(",");
        if (rowIndex === "0") {
            var columns = row;
        } else {
            var data = {};
            for (var columnIndex in columns) {
                if (columnIndex === "0") {
                    data.speaker = row[columnIndex];
                    //data.time = row[columns.length - 1];
                } else {
                    var column = columns[columnIndex];
                    var temp = row[columnIndex];
                    data[column] = temp;
                }
            }
            var tempObj = data.time;
            tempObj = String(tempObj).replace(/(\r\n\t|\n|\r\t)/gm, "");
            data.time = tempObj;
            result.push(data);
        }
    }
    result.pop();
    return result;
}

module.exports = {
    parseCsv
}