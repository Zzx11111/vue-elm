<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    this.$store.dispatch('getUser')
    console.log('bbbbbb');
  }
}
</script>

<style>
@import url("./assets/css/base.css");
</style>
