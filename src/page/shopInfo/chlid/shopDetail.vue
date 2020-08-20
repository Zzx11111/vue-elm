<template>
  <div class="shop-detail">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">
        商家详情
      </div>
    </navigation-bar>
    <div class="activities">
      <div class="activities-title">活动与属性</div>
      <div class="activities-main">
        <p class=""></p>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import {getRestaurantsInfo} from '@/network/shop'
  export default {
    components:{
      navigationBar
    },
    data() {
      return {
        shopInfo:null
      }
    },
    mounted(){
      console.log(this.$route.params.id)
      getRestaurantsInfo(this.$route.params.id).then(res => {
        this.shopInfo = res.data
      })
    },
    methods:{
      goback(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
.shop-detail{
  .activities{
    border-top:5px solid #999;
    .activities-title{
      padding: 10px;
      border-bottom: 1px solid #f1f1f1;
    }
    .activities-main{
      
    }
  }
}
</style>