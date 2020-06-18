<template>
  <div class="msite" ref="msiteRef">
    <navigation-bar>
      <div slot="left">
        <router-link :to="'/search?geohash'+$store.state.geohash" style="color:#fff;">
          <van-icon name="search"></van-icon>
        </router-link>
      </div>
      <div slot="center" @click="backHome">{{addressInfo.name}}</div>
      <div slot="right">
        <router-link to="/login" style="color:#fff">登录|注册</router-link>
      </div>
    </navigation-bar>
    <!-- 食品类别轮播 -->
    <van-swipe class="my-swipe">
      <van-swipe-item v-for="(item,index) in foodType" :key="index">
        <div v-for="(item1,index1) in item" :key="index1" class="food-type">
          <router-link :to="{path: '/food', query: {geohash:geohash,title: item1.title, restaurant_category_id: getCategoryId(item1.link)}}">
            <img :src="baseImgUrl + item1.image_url" alt />
            <div>{{item1.title}}</div>
          </router-link>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="interval"></div>
    <div class="near-shop">
      <van-icon name="shop-o" />附近商家
    </div>
    <shop :shopList="shopList" v-if="isShop"></shop>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { getLocation, getIndexEntry, getShop } from "@/network/msite";
import Shop from "@/components/shop";
import tabBar from "@/components/tabBar/tabBar";
export default {
  components: {
    navigationBar,
    Shop,
    tabBar
  },
  data() {
    return {
      addressInfo: {},
      foodType: [],
      baseImgUrl: "https://fuss10.elemecdn.com",
      shopList: [],
      offset: 0,
      geohash:""
    };
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this._getLocation();
    this._getIndexEntry();
    this._getShop();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandle);
  },
  methods: {
    scrollHandle(e) {
      if (
        e.srcElement.scrollingElement.scrollTop + window.innerHeight >=
        this.$refs.msiteRef.offsetHeight
      ) {
        this.offset += 20;
        getShop(
          this.addressInfo.latitude,
          this.addressInfo.longitude,
          this.offset
        ).then(res => {
          console.log(res.data);
          this.shopList.push(...res.data);
        });
      }
    },
    //返回首页
    backHome() {
      this.$router.push("/home");
    },
    _getIndexEntry() {
      getIndexEntry().then(res => {
        let length = res.data.length;
        for (let i = 0; i < length / 8; i++) {
          let foodArr = [];
          for (let j = 0; j < 8; j++) {
            foodArr.push(res.data[i * 8 + j]);
          }
          this.foodType.push(foodArr);
        }
      });
    },
    _getLocation() {
      let geohash = this.$route.query.geohash;
      getLocation(geohash).then(res => {
        this.addressInfo = res.data;
      });
    },
    _getShop() {
      if (this.addressInfo.latitude !== "") {
        getShop(
          this.addressInfo.latitude,
          this.addressInfo.longitude,
          this.offset
        ).then(res => {
          console.log(res);
          this.shopList = res.data;
        });
      }
    },
    /* url解码 */
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  },
  computed: {
    isShop() {
      return this.shopList instanceof Array;
    }
  },
  watch: {
    addressInfo: function() {
      this._getShop();
    }
  }
};
</script>

<style lang="less" scoped>
.msite {
  .my-swipe {
    .van-swipe-item {
      display: flex;
      flex-wrap: wrap;
      .food-type {
        margin: 5px 0;
        width: 25%;
        text-align: center;
        font-size: 12px;
        img {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  .interval {
    margin-top: 5px;
    height: 5px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
  }
  .near-shop {
    font-size: 12px;
    margin: 10px;
  }
}
</style>