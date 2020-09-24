<template>
  <div class="order">
    <navigation-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="goBack"/>
      </div>
      <div slot="center">
        订单列表
      </div>
    </navigation-bar>
    <!-- 订单列表 -->
    <div class="order-list">
      <div class="order-item" v-for="item in orderList" :key="item._id">
        <div class="restaurant_image">
          <img :src="imgBaseUrl + item.restaurant_image_url" alt="">
        </div>
        <div class="order-message">
          <div class="top">
            <p class="restaurant-info">
              <span class="restaurant-name">{{item.restaurant_name}}</span>
              <span class="pay-status">{{item.status_bar.title}}</span>
            </p>
            <p class="time">
              {{item.formatted_created_at}}
            </p>
          </div>
          <div class="center">
            <span class="foods">{{item.basket.group[0][0].name}}{{item.basket.group[0].length>1?'等'+item.basket.group[0].length+'件商品':''}}</span>
            <span class="total-money">￥{{item.total_amount}}</span>
          </div>
          <div class="bottom">
            <!-- <span v-if="item.status_bar.title === '等待支付'">剩余{{item.time_pass}}</span> -->
            <span class="come-again">再来一单</span>
          </div>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar/tabBar'
import navigationBar from "@/components/navigationBar/navigationBar";
import {getOrderList} from '@/network/order'
  export default {
    components:{
      tabBar,
      navigationBar
    },
    data() {
      return {
        userInfo:null,
        orderList:[],
        imgBaseUrl:'//elm.cangdu.org/img/'
      }
    },
    mounted(){
      this.userInfo = this.$store.state.userInfo
      this.initData()
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      initData(){
        getOrderList(this.userInfo.id).then(res => {
          this.orderList = res.data
          console.log(res)
        })
      }
    },
    computed:{
      surplus:function(time_pass){
        return 900-time_pass
      }
    }
  }
</script>

<style lang="less" scoped>
.order{
  background-color: #F5F5F5;
  min-height: 100vh;
  .order-list{
    .order-item{
      display: flex;
      margin:10px;
      background-color: #fff;
      .restaurant_image{
        margin: 10px;
        img{
          width: 50px;
          height: 50px;
        }
      }
      .order-message{
        flex: 1;
        .top{
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
          .restaurant-info{
            display: flex;
            margin-bottom: 5px;
            .pay-status{
              flex: 1;
              text-align: end;
            }
            .restaurant-name{
              flex: 1;
              font-size: 16px;
            }
          }
        }
        .center{
          display: flex;
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
          .foods{
            flex: 1;
          }
          .total-money{
            flex: 1;
            text-align: end;
          }
        }
        .bottom{
          padding: 10px;
          text-align: end;
          .come-again{
            color: #3190e8;
            padding: 2px;
            border: 1px solid #3190e8;
            border-radius: 10%;
          }
        }
      }
    }
  }
}

</style>