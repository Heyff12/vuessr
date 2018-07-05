const ajax = require('./ajax');

let info = async (ctx) => {
  let res = ctx.response;
  let req = ctx.request;
  // console.log(res);
  // console.log('-------------------------------------');
  // console.log(req);
  let resData = await ajax.fetchList();
  // let resData = {
  //   respcd: "0000",
  //   resperr: "",
  //   respmsg: "OK",
  //   data: [{
  //     id: 111111,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111112,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111113,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111114,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111115,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111116,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111117,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }, {
  //     id: 111118,
  //     title: "利数设利八先条器物音消相该及现等建更于"
  //   }]
  // };
  console.log('resData----------------------------------------');
  console.log(resData);
  res.body = resData;
};

module.exports = {
  info
}
