<template>
  <div>
    dasdadas
  </div>
</template>

<script>
import {getRestaurantsInfo} from '@/network/shop'
  export default {
    created(){
      console.log(this.$route.query.id)
      getRestaurantsInfo(this.$route.query.id).then(res => {
        console.log(res)
      })
    }
  }
</script>

<style lang="less" scoped>

</style>