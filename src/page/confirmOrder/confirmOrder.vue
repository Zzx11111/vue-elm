<template>
  <div class="confirm-order">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">确认订单</div>
      <div slot="right">
        <van-icon name="contact" v-if="userInfo" @click="goProfile" />
        <span v-else @click="goLogin">登陆|注册</span>
      </div>
    </navigation-bar>
    <!-- 选择地址 -->
    <div class="address" @click="selectAddress">
      <div class="address-icon" style="color:#3190e8;">
        <van-icon name="location-o" />
      </div>
      <div class="address-content" v-if="!addressContent">请添加一个收货地址</div>
      <!-- 收地地址详情 -->
      <div class="address-info" v-else>
        <div class="address-list-item">
          <div class="right">
            <p class="user-info">
              <span class="name">{{addressContent.name}}</span>
              <span class="sex">{{addressContent.sex === 1?'先生':'女士'}}</span>
              <span class="phone">{{addressContent.phone}}</span>
            </p>
            <p class="address-tag">
              <span class="tag">{{addressContent.tag}}</span>
              <span class="address-detail">{{addressContent.address_detail}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="address-select">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 送达时间 -->
    <div class="service-time">
      <div class="service-time-left">送达时间</div>
      <div class="service-time-right">
        <div class="time">尽快送达|预计{{checkoutData.delivery_reach_time}}</div>
        <span class="special-delivery">蜂鸟专送</span>
      </div>
    </div>
    <!-- 订单详情 -->
    <div class="order-detail" v-if="checkoutData.cart">
      <div class="shop-name">{{checkoutData.cart.restaurant_info.name}}</div>
      <div class="food-list" v-if="checkoutData.cart">
        <div class="food-item" v-for="(item,index) in checkoutData.cart.groups[0]" :key="index">
          <span class="food-name">{{item.name}}</span>
          <span class="quantity">X{{item.quantity}}</span>
          <span class="price">￥{{item.price}}</span>
        </div>
      </div>
      <div class="extra" v-if="checkoutData.cart">
        <div class="extra-name">
          <span>{{checkoutData.cart.extra[0].name}}</span>
        </div>
        <div class="extra-price">
          <span>￥{{checkoutData.cart.extra[0].price}}</span>
        </div>
      </div>
      <div class="deliver-amount" v-if="checkoutData.cart">
        <span class="deliver-name">配送费</span>
        <span class="deliver-price">￥{{checkoutData.cart.deliver_amount || 0}}</span>
      </div>
    </div>
    <!-- 备注 -->
    <div class="remarks">
      <span class="remarks-name">订单备注</span>
      <span class="remarks-info" @click="goRemarks" v-if="!remarks">口味、偏好等></span>
      <span class="remarks-info" @click="goRemarks" v-if="remarks">{{remarks}}</span>
    </div>
    <!-- tabbar -->
    <div class="tab-bar">
      <div class="tab-bar-left" v-if="checkoutData.cart">待支付￥{{checkoutData.cart.total}}</div>
      <div class="tab-bar-right" @click="confirmOrder">确认下单</div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { getRestaurantsInfo } from "@/network/shop";
import { checkout, getAddress,confirmOrder } from "@/network/order";
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      addressContent: null,
      shopId: "",
      geohash: "",
      checkoutData: {},
      remarks: "",
      userInfo: null,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.shopId = this.$route.query.shopId;
      this.geohash = this.$route.query.geohash;
      getRestaurantsInfo(this.shopId).then((res) => {
        console.log(res);
      });
      var specFood = JSON.parse(window.localStorage.getItem("specfood"));
      var cartList = [];
      specFood.filter((item) => {
        if (item.restaurant_id == this.shopId) {
          cartList.push({
            attrs: [],
            extra: {},
            id: item.item_id,
            name: item.name,
            packing_fee: item.packing_fee,
            price: item.price,
            quantity: item.amount,
            sku_id: item.sku_id,
            specs: item.specs,
            stock: item.stock,
          });
        }
      });
      if (cartList) {
        checkout(this.shopId, this.geohash, [cartList]).then((res) => {
          console.log(res)
          this.checkoutData = res.data;
        });
      }
      this.remarks = this.$store.state.remark;
      this.userInfo = this.$store.state.userInfo;
      if (this.$store.state.chooseAddress !== null) {
        this.addressContent = this.$store.state.chooseAddress;
      } else {
        getAddress(this.userInfo.id).then((res) => {
          this.addressContent = res.data[0];
        });
      }
    },
    //返回上一页
    goback() {
      this.$router.go(-1);
    },
    //去我的页面
    goProfile() {
      this.$router.push("/profile");
    },
    goRemarks() {
      this.$router.push({
        path: "/remarks",
        query: { cart_id: this.checkoutData.cart.id },
      });
    },
    selectAddress() {
      console.log(this.$store.state.userInfo);
      if (this.userInfo === null) {
        this.$toast("请登录");
      } else {
        this.$router.push("/shippingAddress");
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    //下单
    confirmOrder(){
    if(this.userInfo == null) {
      this.$toast('请登录')
      return 0;
    }
      confirmOrder(this.userInfo.id,this.checkoutData.cart.id,this.addressContent.id,this.checkoutData.cart.restaurant_id,this.addressContent.geohash,this.remarks,this.checkoutData.cart.groups).then(res => {
        this.$toast(res.data.success)
        this.$router.push('/order')
      })
    }
  },
};
</script>

<style lang="less" scoped>
.confirm-order {
  background-color: #f1f1f1;
  min-height: 100vh;
  .address {
    display: flex;
    background-color: #fff;
    padding: 20px 10px;
    border-bottom: 3px dashed black;
    .address-icon {
      display: flex;
      align-items: center;
      width: 20px;
    }
    .address-content {
      flex: 1;
    }
    .address-info {
      flex: 1;
      .address-list-item {
        display: flex;
        .right {
          .user-info {
            font-size: 16px;
            margin: 8px;
            .name {
              font-weight: 800;
              font-size: 20px;
            }
          }
          .address-tag {
            margin: 8px;
            .tag {
              background-color: #ff5722;
              color: #fff;
              border-radius: 20%;
              padding: 0 2px;
            }
            .address-detail {
              color: #777;
            }
          }
        }
      }
    }
    .address-select {
      width: 20px;
      display: flex;
      align-items: center;
    }
  }
  .service-time {
    background-color: #fff;
    margin: 10px 0px;
    border-left: 4px solid #298eeb;
    padding: 20px;
    display: flex;
    .service-time-left {
      flex: 1;
      font-weight: 900;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .service-time-right {
      flex: 1;
      text-align: end;
      .time {
        color: #419aee;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .special-delivery {
        color: #fff;
        background-color: #298eeb;
        font-size: 12px;
        padding: 2px;
        border-radius: 5px;
      }
    }
  }
  .order-detail {
    margin-top: 10px;
    background-color: #fff;
    .shop-name {
      padding: 10px;
      border-bottom: 1px solid #f1f1f1;
    }
    .food-list {
      .food-item {
        display: flex;
        margin: 15px 5px;
        .quantity,
        .price {
          flex: 1;
          text-align: center;
        }
        .food-name {
          flex: 3;
        }
      }
    }
    .extra {
      display: flex;
      margin: 15px 5px;
      .extra-name {
        flex: 4;
      }
      .extra-price {
        flex: 1;
        text-align: center;
      }
    }
    .deliver-amount {
      display: flex;
      padding: 0px 5px 15px 5px;
      border-bottom: 1px solid #f1f1f1;
      .deliver-name {
        flex: 4;
      }
      .deliver-price {
        flex: 1;
        text-align: center;
      }
    }
  }
  .remarks {
    display: flex;
    margin-top: 15px;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    .remarks-name {
      flex: 1;
      padding: 10px;
    }
    .remarks-info {
      flex: 1;
      padding: 10px;
      color: #aaa;
      text-align: end;
    }
  }
  .tab-bar {
    height: 44px;
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    .tab-bar-left {
      height: 100%;
      flex: 2;
      background-color: #3c3c3c;
      color: #fff;
      padding-left: 20px;
      line-height: 44px;
    }
    .tab-bar-right {
      height: 100%;
      flex: 1;
      text-align: center;
      line-height: 44px;
      color: #fff;
      background-color: #56d176;
    }
  }
}
</style>