<template>
  <div class="shop-info">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
    </navigation-bar>
    <div class="shop-detail">
      <div class="left">
        <img :src="imgBaseUrl+shopInfo.image_path" alt />
      </div>
      <div class="center">
        <div class="shop-name">{{shopInfo.name}}</div>
        <div class="distribution">商家配送/分钟送达/配送费{{shopInfo.float_delivery_fee}}</div>
        <div class="notice">公告:{{shopInfo.promotion_info}}</div>
      </div>
      <div class="right">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 食品和评论tabbar -->
    <section class="bar">
      <div class="food" @click="selectBar(1)" :class="[activeBar == 1 ? 'active':'']">食品</div>
      <div class="comment" @click="selectBar(2)" :class="[activeBar == 2 ? 'active':'']">评论</div>
    </section>
    <!-- 食品列表 -->
    <food-list
      :menuList="menuList"
      v-if="menuList.length != '0' && activeBar === 1"
      @chooseSpecifications="chooseSpecifications"
      @addCart="addCart"
    ></food-list>
    <!-- 选择规格对话框 -->
    <section class="dialog" v-if="isChooseFood">
      <header>
        <span>{{chooseFood.name}}</span>
        <span @click="closeChooseFood">×</span>
      </header>
      <section class="choose-main" v-if="chooseFood.specifications">
        <div
          v-for="specfoodsItem in chooseFood.specfoods"
          :key="specfoodsItem.food_id"
          @click="chooseFoodSpecifications(specfoodsItem)"
          :class="[specfood.food_id === specfoodsItem.food_id?'active-specfood':'','choose-item']"
        >{{specfoodsItem.specs_name}}</div>
      </section>
      <footer>
        <span>￥{{specfood.price}}</span>
        <span @click="addCart(specfood)">加入购物车</span>
      </footer>
    </section>
    <!-- 加入购物车tabbar -->
    <section class="cart" v-if="activeBar === 1">
      <van-icon
        name="shopping-cart-o"
        color="white"
        size="25px"
        :badge="badge"
        class="cart-icon"
        @click="showCart"
      />
      <div class="total-price">
        <p>￥{{totalPrice}}</p>
        <p>配送费{{shopInfo.float_delivery_fee}}</p>
      </div>
      <div class="settlement" :class="[showSettlement == true ? 'show-settlement':'']">
        <p v-if="showSettlement == true" @click="confirmOrder">去结算</p>
        <p v-if="showSettlement == false">还差{{shopInfo.float_minimum_order_amount - totalPrice}}元</p>
      </div>
    </section>
    <!--  购物车列表 -->
    <section class="cart-list" v-show="isShowCart">
      <div class="cart-header">
        <span style="flex:1;">购物车</span>
        <van-icon name="delete" color="black" size="14px" @click="clearCart" />
      </div>
      <div class="cart-list-item" v-for="(item,index) in cartList" :key="index">
        <span style="flex:2;">{{item.name}}</span>
        <span style="flex：1;">￥{{item.price}}</span>
        <span style="flex:1;text-align: center;">
          <span @click="rmAmount(item)">-</span>
          {{item.amount}}
          <span @click="addAmount(item)">+</span>
        </span>
      </div>
    </section>
    <!-- 商店评论页 -->
    <shop-comment :id="shopInfo.id" v-if="activeBar === 2"></shop-comment>
  </div>
</template>

<script>
import { getRestaurantsInfo, getFoodMenu } from "@/network/shop";
import navigationBar from "@/components/navigationBar/navigationBar";
import foodList from "./chlid/foodList";
import shopComment from './chlid/shopComment'
export default {
  components: {
    navigationBar,
    foodList,
    shopComment
  },
  data() {
    return {
      shopInfo: {},
      imgBaseUrl: "http://cangdu.org:8001/img/",
      activeBar: 1,
      menuList: [],
      chooseFood: {},
      isChooseFood: false,
      specfood: {},
      shopCart: [],
      //购物车数量
      badge: 0,
      //购物车的总价格
      totalPrice: 0,
      cartList: [],
      isShowCart: false,
    };
  },
  created() {
    console.log(this.$route.query.id);
    getRestaurantsInfo(this.$route.query.id).then((res) => {
      console.log(res.data);
      this.shopInfo = res.data;
    });
    getFoodMenu(this.$route.query.id).then((res) => {
      this.menuList = res.data;
    });
  },
  mounted() {
    var specfoods = JSON.parse(window.localStorage.getItem("specfood"));
    specfoods.filter((item) => {
      if (item.restaurant_id == this.$route.query.id) {
        this.totalPrice += item.price * item.amount;
        this.cartList.push(item);
        this.badge += item.amount;
      }
    });
  },
  methods: {
    //跳转到商店详情页面
    goShopDetail(){
      this.$router.push(`/shopDetail/${this.$route.query.id}`)
    },
    //增加购物车商品的数量
    addAmount(specfood) {
      var specfoods = JSON.parse(window.localStorage.getItem("specfood"));
      specfood.amount = specfood.amount + 1;
      specfoods.filter((item) => {
        if (item.food_id == specfood.food_id) {
          item.amount = specfood.amount;
        }
      });
      this.badge = 0;
      this.totalPrice = 0;
      this.cartList = [];
      specfoods.filter((item) => {
        if (item.restaurant_id === specfood.restaurant_id) {
          this.badge += item.amount;
          this.totalPrice += item.amount * item.price;
          this.cartList.push(item);
        }
      });
      window.localStorage.setItem("specfood", JSON.stringify(specfoods));
    },
    //减少购物车商品的数量
    rmAmount(specfood) {
      var specfoods = JSON.parse(window.localStorage.getItem("specfood"));
      if (specfood.amount > 1) {
        specfood.amount = specfood.amount - 1;
        specfoods.filter((item) => {
          if (item.food_id == specfood.food_id) {
            item.amount = specfood.amount;
          }
        });
      } else {
        for (var i = 0; i < specfoods.length; i++) {
          if (specfoods[i].food_id === specfood.food_id) {
            specfoods.splice(i, 1);
          }
        }
      }
      this.badge = 0;
      this.totalPrice = 0;
      this.cartList = [];
      specfoods.filter((item) => {
        if (item.restaurant_id == specfood.restaurant_id) {
          this.badge += item.amount;
          this.totalPrice += item.amount * item.price;
          this.cartList.push(item);
        }
      });
      window.localStorage.setItem("specfood", JSON.stringify(specfoods));
    },
    //清空购物车
    clearCart() {
      window.localStorage.removeItem("specfood");
      this.badge = 0;
      this.totalPrice = 0;
      this.cartList = [];
    },
    showCart() {
      this.isShowCart = !this.isShowCart;
    },
    //添加到购物车
    addCart(specfood) {
      var specfoods = [];
      specfoods = JSON.parse(window.localStorage.getItem("specfood"));
      if (specfoods) {
        var checkRepeat = false;
        specfoods.filter((item) => {
          if (item.food_id == specfood.food_id) {
            item.amount += 1;
            checkRepeat = true;
          }
        });
        if (!checkRepeat) {
          specfood.amount = 1;
          specfoods.push(specfood);
        }
      } else {
        specfoods = [];
        specfood.amount = 1;
        specfoods.push(specfood);
      }
      this.badge = specfoods.length;
      window.localStorage.setItem("specfood", JSON.stringify(specfoods));
      this.totalPrice = 0;
      this.cartList = [];
      this.badge = 0;
      specfoods.filter((item) => {
        if (item.restaurant_id === this.shopInfo.id) {
          this.totalPrice += item.price * item.amount;
          this.cartList.push(item);
          this.badge += item.amount;
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    selectBar(index) {
      this.activeBar = index;
    },
    //选择规格
    chooseSpecifications(foodInfo) {
      this.chooseFood = foodInfo;
      this.specfood = this.chooseFood.specfoods[0];
      this.isChooseFood = true;
    },
    closeChooseFood() {
      this.isChooseFood = false;
    },
    chooseFoodSpecifications(specfoodsItem) {
      this.specfood = specfoodsItem;
    },
    /* 去结算 */
    confirmOrder(){
      this.$router.push({path:'/confirmOrder',query:{shopId:this.shopInfo.id,geohash:`${this.shopInfo.latitude},${this.shopInfo.longitude}`}})
    }
  },
  computed: {
    showSettlement() {
      return this.totalPrice >= this.shopInfo.float_minimum_order_amount;
    },
  },
};
</script>

<style lang="less" scoped>
.shop-info {
  .shop-detail {
    background-color: #eee;
    display: flex;
    .left {
      width: 20%;
      padding: 10px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .center {
      width: 70%;
      margin-top: 10px;
      .distribution {
        font-size: 12px;
        margin: 8px 0;
      }
      .notice {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right {
      width: 100px;
      margin-right: 10px;
      margin-top: 10px;
      display: flex;
      align-items: center;
    }
  }
  .bar {
    display: flex;
    .food,
    .comment {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #eeeeee;
    }
    .active {
      color: cornflowerblue;
    }
  }
  //bar结束
  .dialog {
    min-height: 150px;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #eeeeee;
    header {
      margin: 3px;
      display: flex;
      :nth-child(1) {
        flex: 1;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :nth-child(2) {
        width: 30px;
        text-align: center;
      }
    }
    .choose-main {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 30px;
      .choose-item {
        margin: 10px;
        width: 30%;
        overflow: hidden;
        text-align: center;
        padding: 5px 0;
        color: #333;
        border: 1px solid #eee;
        border-radius: 6px;
      }
      .active-specfood {
        color: #3190e8;
        border: 1px solid #3190e8;
      }
    }
    footer {
      position: absolute;
      background-color: #eee;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      display: flex;
      :nth-child(1) {
        flex: 1;
      }
      :nth-child(2) {
        flex: 1;
        font-size: 12px;
        background-color: #3190e8;
        color: #fff;
        text-align: center;
      }
    }
  }
  //对话框结束
  .cart {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #3d3d3f;
    height: 40px;
    display: flex;
    color: white;
    text-align: center;
    .cart-icon {
      position: relative;
      bottom: -10px;
      margin-left: 10px;
      height: 30px;
    }
    .total-price {
      font-size: 14px;
      flex: 1;
      margin-top: 10px;
    }
    .settlement {
      font-size: 14px;
      padding-top: 10px;
      flex: 1;
    }
    .show-settlement {
      background-color: skyblue;
    }
  }
  //购物结算tabbar
  .cart-list {
    width: 100%;
    background-color: #eee;
    position: absolute;
    bottom: 40px;
    .cart-header {
      display: flex;
      margin: 10px;
      font-size: 14px;
      vertical-align: top;
    }
    .cart-list-item {
      background-color: #fff;
      padding: 5px 10px;
      display: flex;
    }
  }
  //购物车列表
}
</style>