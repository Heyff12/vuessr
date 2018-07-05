let axios = require('axios');
let baseUrl = ' https://www.easy-mock.com/mock/59ce14d5c5c4302238f55c6c/nodekoa';
//url必须写完整
let url = {
  listUrl: baseUrl + "/vuessr/v1/list/info"
};

let fetchList = () => {
  return axios.get(url.listUrl)
    .then((response) => {
      console.log('catch---------response----s------------------------server-api-ajax-------------------------');
      console.log(response);
      console.log('catch---------response----e-----------------------server-api-ajax--------------------------');
      console.log('catch---------response.data----s------------------------server-api-ajax-------------------------');
      console.log(response.data);
      console.log('catch---------response.data----e-----------------------server-api-ajax--------------------------');
      console.log('catch---------response.data.respcd----s------------------------server-api-ajax-------------------------');
      console.log(response.data.respcd);
      console.log('catch---------response.data.respcd----e-----------------------server-api-ajax--------------------------');
        let data_return = response.data;
      if (data_return.respcd == "0000") {
        return data_return;
      } else {
        if (data_return.respmsg) {
          console.log(data_return.respmsg);
        } else {
          console.log(data_return.resperr);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  fetchList
}
