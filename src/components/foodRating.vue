<template>
  <div class="food-rating">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">
        {{this.name}}
      </div>
    </navigation-bar>
    <div class="img">
      <img :src="imgBaseUrl+img" alt=".">
    </div>
    <p class="description">{{description}}</p>
    <p class="name">{{name}}</p>
    <p class="rating">
      评分{{rating}}
    </p>
    <p class="month_sales">月售{{month_sales}}</p>
    <div class="footer">
      <span>评论数{{rating_count}}</span>
      <span>好评率{{satisfy_rate}}%</span>
    </div>
  </div>
</template>

<script>
import navigationBar from './navigationBar/navigationBar'
  export default {
    components:{
      navigationBar
    },
    data() {
      return {
        imgBaseUrl:'http://cangdu.org:8001/img/',
        name:'',
        img:'',
        description:'',
        rating:'',
        month_sales:'',
        rating_count:'',
        satisfy_rate:''
      }
    },
    mounted(){
      console.log(this.$route)
      this.name = this.$route.query.name
      this.img = this.$route.query.img
      this.description = this.$route.query.description
      this.rating = this.$route.query.rating
      this.month_sales = this.$route.query.month_sales
      this.rating_count = this.$route.query.rating_count
      this.satisfy_rate = this.$route.query.satisfy_rate
    },
    methods:{
      goback(){
        this.$router.go(-1)
      },
      
    }
  }
</script>

<style lang="less" scoped>
.food-rating{
  .img{
    width: 100%;
    img{
      width: 100%;
    }
  }
  .description{
    margin: 10px;
    color: #666;
    font-size: 14px;
  }
  .name{
    margin: 10px;
  }
  .rating{
    margin: 10px;
  }
  .month_sales{
    margin: 10px;
    color: #666;
  }
  .footer{
    margin: 10px;
    :nth-child(1){
      margin-right: 5px;
      color: #999;
    }
  }
}
</style>