<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html {
    width: 100vw;
    height: 100vh;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    padding: 1rem 0;
  }

  .margin-bottom {
    margin-bottom: 1.5rem;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  [type="checkbox"]:checked:before {
    content: '\2732';
    font-size: 12px;
    margin-top: 8px;
    margin-left: 1px;
  }
</style>
