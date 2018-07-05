// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;


//获取信息
var info_list = {
  respcd: "0000",
  respmsg: "OK",
  resperr: "",
  "data|12-20": [{
    "id|+1": 11111,
    "title": Random.ctitle(10, 30)
  }]
};

module.exports = {
  info_list
}

//不能用于服务端---该文件作废