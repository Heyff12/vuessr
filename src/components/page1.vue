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
      list:[]
    };
  },
  created(){
    this.list = this.$store.state.list;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
