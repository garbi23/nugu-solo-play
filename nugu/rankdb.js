var mysql = require('mysql')
var soil = {}
let srstat = 0
let srvalue = 0
let temp = 0
let humi = 0

var Dupli_Query = "SELECT * FROM nugudb.sensor;";

var connection = mysql.createConnection({
  host : 'mynugusql.c9utrsxn9yo6.ap-northeast-2.rds.amazonaws.com',
  user : 'root',
  password : 'xodnsqkqh233',
  database : 'nugudb'
});

connection.connect()


var revalue = setInterval(function()
{
    connection.query(Dupli_Query, function(err, rows, fields){
         if(err){
           throw err
         }
          srvalue = rows[2].srvalue
          temp = rows[0].srvalue
          humi = rows[1].srvalue
      });
},500);


soil.value = function(){

  return srvalue;
}
soil.tempvalue = function(){

  return temp;
}
soil.humivalue = function(){

  return humi;
}

soil.stat = function(){
    if(srvalue <= 30){
        srstat = '물이 부족합니다! 어서 물을 주세요!'
       }else if(srvalue > 30 && srvalue < 80){
        srstat = '물이 적당합니다!'
       }else{
        srstat = '물이 충분합니다!'
       }
      return srstat;
}


module.exports = soil;
