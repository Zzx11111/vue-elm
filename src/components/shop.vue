<template>
  <div class="shop">
    <div v-for="item in shopList" :Key="item.id" class="shop-item" @click="goShopInfo(item.id)">
      <div class="shop_img">
        <img :src="imgBaseUrl+item.image_path" />
      </div>
      <div class="shop-new">
        <div class="top">
          <div class="title">{{item.name}}</div>
          <ul class="top-ul">
            <li v-for="(support,index1) in item.supports" :key="index1">{{support.icon_name}}</li>
          </ul>
        </div>
        <div class="center">
          <div class="score">
            <span class="fraction">评分:{{item.rating}}</span>
            <span>月销{{item.recent_order_num}}</span>
          </div>
          <div class="right">
            <span class="special-delivery" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
          </div>
        </div>
        <div class="bottom">
          <div
            class="delivery"
          >￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</div>
          <div class="time">
            <span>{{item.distance}}/</span>
            <span>{{item.order_lead_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      imgBaseUrl: "http://cangdu.org:8001/img/"
    };
  },
  methods:{
    goShopInfo(id){
      this.$router.push({path:'/shopInfo',query:{id:id}})
    }
  }
};
</script>

<style lang="less" scoped>
.shop {
  .shop-item {
    display: flex;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    .shop_img {
      margin-left: 10px;
      width: 25%;
      img {
        width: 54px;
        height: 54px;
      }
    }
    .shop-new {
      width: 75%;
      .top {
        display: flex;
        margin-bottom: 10px;
        .title {
          flex: 1;
          display: inline;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .title::before {
          content: "品牌";
          margin-right: 3px;
          background-color: #ffd930;
        }
        .top-ul {
          flex: 1;
          display: inline;
          text-align: end;
          margin-right: 8px;
          li {
            display: inline;
            font-size: 12px;
            color: #999;
            border: 0.025rem solid #f1f1f1;
            margin-left: 1px;
          }
        }
      }
      .center {
        font-size: 12px;
        display: flex;
        margin-bottom: 10px;
        .score {
          flex: 1;
          .fraction {
            color: #ff6000;
          }
        }
        .right {
          flex: 1;
          text-align: end;
          margin-right: 8px;
          .special-delivery {
            background-color: #3190e8;
            color: #fff;
            border: 0px solid #3190e8;
            border-radius: 5px;
          }
        }
      }
      .bottom {
        display: flex;
        font-size: 12px;
        .delivery{
          flex: 1;
          margin-right:5px;
        }
        .time{
          flex: 1;
        }
      }
    }
  }
}
</style>