import { fetchList } from '../api/ajax'
export default {
  async fetchItem ({ commit }) {
    // `store.dispatch()` 会返回 Promise，
    // 以便我们能够知道数据在何时更新
    // let data = await fetchList();
    // console.log(data);
    // commit('setList', data)
    console.log('--------asyncData触发数据获取---------actions-------------');
    commit('setList', await fetchList())
  }
}
