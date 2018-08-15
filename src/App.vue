<template>
  <div id="app">
    <m-header/>
    <tab/>
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab'
export default {
  components:{
    MHeader,
    Tab
  },
  name: 'App'
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

#app {
  color: $color-theme;
}
</style>

