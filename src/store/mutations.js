// import Vue from 'vue'
const mutations = {
  setList(state,data) {
    console.log('---mutations-----')
    console.log('--------asyncData触发数据获取---------mutations-------------');
    console.log(data);
    state.list = data;
    // Vue.set(state.list, data)
  },
}

export default mutations
