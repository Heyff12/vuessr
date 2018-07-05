<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{item.id}}--{{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "page1",
  title() {
    return "page1";
  },
  data() {
    return {
      msg: "page1",
      // list: [],
      // listUrl: "/vuessr/v1/list/info"
    };
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log('--------asyncData触发数据获取---------page1-------------');
    return store.dispatch('fetchItem')
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    list () {
      return this.$store.state.list
    }
  },
  created: function() {
    // this.list = this.$store.state.list;
    // this.get_info();
    console.log('created');
    console.log(this.list)
  },
  methods: {
    // //获取信息
    // get_info: function() {
    //   this.$ajax_axios.ajax_get(this, this.listUrl, "", data_return => {
    //     this.list = data_return.data;
    //   });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  rel="stylesheet/less" scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style: none;
    text-align: left;
    width: 100%;
    padding-left: 200px;
    box-sizing: border-box;
  }
</style>
