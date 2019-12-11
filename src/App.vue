<template>
  <div id="app">
    <!--<transition name="fade">-->
      <router-view></router-view>
    <!--</transition>-->
    <Loading v-if="$store.state.LOADING"></Loading>
    <ErrorRemind :options="$store.state.REMIND"></ErrorRemind>
  </div>
</template>
<script>
  import Loading from './components/Loading'
  import ErrorRemind from './components/ErrorRemind'
  export default {
    name: 'App',
    components: { Loading,ErrorRemind }
  }
</script>
<style lang="scss">
  @import "~bootstrap/scss/bootstrap";
  @import "~bootstrap-vue/src/index";
  @import "./assets/fonts/iconfont.css";
  #app {
    font-family: 'simhei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
