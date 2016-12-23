<template>
  <div id="app">
    <up-explorer-header></up-explorer-header>
    <up-explorer-content></up-explorer-content>
  </div>
</template>

<script>
import Vue from 'vue'

import ExplorerHeader from 'components/ExplorerHeader'
import ExplorerContent from 'components/ExplorerContent'

Vue.component(ExplorerHeader.name, ExplorerHeader)
Vue.component(ExplorerContent.name, ExplorerContent)

export default {
  name: 'app'
}
</script>

<style>
  #app {
    font-family: Helvetica, 'Avenir', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
