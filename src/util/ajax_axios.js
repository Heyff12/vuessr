import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

import {
  Loading
} from 'element-ui';
Vue.use(Loading);

//loading样式
let options = {
  fullscreen: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
};
//ajax-请求--resource---get
//that--运行函数的this；url--请求连接；data--传递的数据；success_func--请求成功后的事件；error_func--请求失败后的事件；all_func--不需要请求处理的事件
let ajax_get = (
  that,
  url,
  data,
  success_func,
  error_func,
  common_func,
  all_func
) => {
  let _this = that;
  // console.log('get');
  let loadingInstance = Loading.service(options);
  _this.$http
    .get(url, {
      params: data
    })
    .then(
      function(response) {
        // console.log(response);
        // console.log('get2');
        _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        if (all_func) {
          all_func(data);
          return false;
        }
        let data_return = response.data;
        //console.log(data_return);
        if (data_return.respcd == "0000") {
          if (success_func) {
            success_func(data_return);
          }
        } else {
          if (data_return.respmsg) {
            _this.$message(data_return.respmsg);
          } else {
            _this.$message(data_return.resperr);
          }
          if (error_func) {
            error_func(data_return);
          }
        }
      },
      function(response) {
        // console.log(response);
        if (common_func) {
          common_func();
        }
        _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        _this.$message("系统问题,请稍后再试");
      }
    )
    .catch(function(response) {
      if (common_func) {
        common_func();
      }
      _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
    });
};

//ajax-请求--resource---post
let ajax_post = (
  that,
  url,
  data,
  success_func,
  error_func,
  common_func,
  all_func
) => {
  let _this = that;
  let loadingInstance = Loading.service(options);
  //console.log('post');
  _this.$http
    .post(url, data)
    .then(
      function(response) {
        //console.log('post2');
        _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        if (all_func) {
          all_func(data);
          return false;
        }
        // console.log(response);
        let data_return = response.data;
        //console.log(data_return);
        if (data_return.respcd == "0000") {
          if (success_func) {
            success_func(data_return);
          }
        } else {
          if (data_return.respmsg) {
            _this.$message(data_return.respmsg);
          } else {
            _this.$message(data_return.resperr);
          }
          if (error_func) {
            error_func(data_return);
          }
        }
      },
      function(response) {
        if (common_func) {
          common_func();
        }
        _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        _this.$message("系统问题,请稍后再试");
      }
    )
    .catch(function(response) {
      if (common_func) {
        common_func();
      }
      _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
    });
};


export default {
  ajax_get: ajax_get,
  ajax_post: ajax_post
};
