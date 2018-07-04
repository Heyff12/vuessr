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
    <div class="main">
      <router-view/>
    </div>  
    
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
// @color:#41b883;
@color:#009688;
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: @color;
    color: white;
    font-size: 18px;
    padding: 0 100px;
    box-sizing: border-box;
    margin: 0;
    .logo {
      width: 60px;
      height: auto;
    }
    .menu {
      display: inline-block;
      margin: 0;
      list-style: none;
      li {
        float: left;
        width: 180px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: pink;
        }
        a {
          color: white;
          transition: all 0.6s;
          display: inline-block;
          height: 60px;
          width: 100%;
          text-decoration: none;
          &:hover {
            color: @color;
            transform: rotate(180deg);
            transform: scale(1.2, 1.2);
          }
        }
      }
    }
  }
  .main {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
