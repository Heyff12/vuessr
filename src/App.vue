<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" class="logo">
      <ul class="menu">
          <li><router-link to="/">Go to Home</router-link></li>
          <li><router-link to="/page1">Go to page1</router-link></li>
          <li><router-link to="/page2">Go to page2</router-link></li>
      </ul>
    </header>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.logo {
  width: 60px;
  height: auto;
}
header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: purple;
  color: white;
  font-size: 18px;
  padding: 0 100px;
  box-sizing: border-box;
  .logo {
    width: 60px;
    height: auto;
  }
  .menu {
    display:inline-block;
    margin:0;
    li {
      float: left;
      width: 180px;
      text-align: center;
      a {
        color: white;
      }
    }
  }
}
</style>
