<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
            <li><router-link to="/">Go to Home</router-link></li>
            <li><router-link to="/page1">Go to page1</router-link></li>
            <li><router-link to="/page2">Go to page2</router-link></li>
        </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
