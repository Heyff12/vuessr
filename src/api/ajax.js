import axios from "axios";
let url = {
  listUrl: "/vuessr/v1/api/list/info"
};
export function fetchList() {
  return axios.get(url.listUrl)
    .then((response) => {
      console.log(response);
      let data_return = response.data;
      if (data_return.respcd == "0000") {
        return data_return.data;
      } else {
        if (data_return.respmsg) {
          alert(data_return.respmsg);
        } else {
          alert(data_return.resperr);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
