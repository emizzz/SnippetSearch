<!-- 

TODO: 
  - notify for limit request
  
settings: 
  - mininum number of char to consider it a snippet
  - theme: light dark
  - set number of pages
  - show question titles

MORE:
  - favorite snippets feature
  - vs code addon?
  - infinite scroll?
  

citations:
  -stackoverflow

-->


<template>
  <div id="app">
    <Home />

    <!-- TODO -->
    <Notify />
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Notify from './commons/Notify'

export default {
  name: 'App',
  components: {
    Home,
    Notify
  }
}
</script>

<style lang="scss">
  @import './assets/styles/custom.scss';
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  body{background: $primary;}
</style>
