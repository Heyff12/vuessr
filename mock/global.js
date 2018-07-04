// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
// Mock.setup({
//   timeout: "200-1000"
// });


//获取信息
var info_list = {
  respcd: "0000",
  respmsg: "OK",
  resperr: "",
  "data|12-20": [{
    "id|+1": 11111,
    "title": Random.ctitle(10,30)
  }]
};
Mock.mock(/vuessr\/v1\/api\/list\/info/, "get", info_list);
