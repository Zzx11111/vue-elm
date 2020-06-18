<template>
  <div class="search">
    <navigation-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="goBack"></van-icon>
      </div>
      <div slot="center">搜索</div>
    </navigation-bar>
    <van-search v-model="searchName" show-action placeholder="请输入商家或者美食名称" @search="onSearch" @clear="onClear">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 搜索历史 -->
    <div v-if="searchHistory.length && !restaurantList.length && !noResults">
      <div class="search-history">搜索历史</div>
      <div class="history" v-for="(item,index) in searchHistory" :key="index">
        <span @click="searchHistoryShop(item)">{{item}}</span><span @click="removeHistory(item)">✖</span>
      </div>
      <div class="clear" @click="removeAllHistory">清空搜索历史</div>
    </div>
    <!-- 搜索结果 -->
    <div class="restaurant" v-if="restaurantList.length">商家</div>
    <div v-if="restaurantList.length">
      <div class="shop" v-for="item in restaurantList" :key="item.id">
        <img :src="imgBaseUrl + item.image_path" alt class="img" />
        <div class="right">
          <div class="name">{{item.name}}</div>
          <div class="num">月售 {{item.recent_order_num}} 单</div>
          <div class="distance">{{item.float_minimum_order_amount}}元起送 / {{item.distance}}</div>
        </div>
      </div>
    </div>
    <div v-if="noResults" class="no-results">很抱歉！无搜索结果</div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar/tabBar";
import navigationBar from "@/components/navigationBar/navigationBar";
import { searchRestaurants } from "@/network/shop";
import { imgBaseUrl } from "../../config/env";
export default {
  components: {
    tabBar,
    navigationBar,
  },
  data() {
    return {
      searchName: "",
      imgBaseUrl: "http://cangdu.org:8001/img/",
      restaurantList: [],
      searchHistory:[],
      noResults:false
    };
  },
  created() {
    if(JSON.parse(window.localStorage.getItem("searchShop"))){
      this.searchHistory = JSON.parse(window.localStorage.getItem("searchShop"))
    }
  },
  methods: {
    onSearch() {
      let geohash = this.$route.query.geohash;
      let searchList = [];
      const searchShop = JSON.parse(window.localStorage.getItem("searchShop"));
      if (searchShop) {
        searchList = searchShop;
        let check = false;
        searchShop.find(item => {
          if (item === this.searchName) {
            return (check = true);
          }
        });
        if (!check) {
          searchList.push(this.searchName);
        }
      } else {
        searchList.push(this.searchName);
      }
      window.localStorage.setItem("searchShop", JSON.stringify(searchList));
      searchRestaurants(geohash, this.searchName).then(res => {
        console.log(res)
        if (res.data.status !== 0) {
          if(res.data.length){
            this.restaurantList = res.data;
          }else{
            this.restaurantList = res.data
            this.noResults = true
          }
        } else {
          console.log('参数出错')
        }
      });
    },
    onClear(){
      this.restaurantList = []
      this.searchHistory =  JSON.parse(window.localStorage.getItem("searchShop"))
      this.noResults = false
    },
    removeHistory(shop){
      let searchShop = JSON.parse(window.localStorage.getItem("searchShop"))
      searchShop = searchShop.filter(item => {
        return item !== shop
      })
      window.localStorage.setItem('searchShop',JSON.stringify(searchShop))
      this.searchHistory = searchShop
    },
    searchHistoryShop(shop){
      let geohash = this.$route.query.geohash;
      this.searchName = shop
      searchRestaurants(geohash,this.searchName).then(res => {
        console.log(res)
        if (res.data.status !== 0) {
          if(res.data.length){
            this.restaurantList = res.data;
          }else{
            this.restaurantList = res.data
            this.noResults = true
          }
        } else {
          this.noResults = true
        }
      });
    },
    removeAllHistory(){
      this.searchHistory = []
      window.localStorage.setItem('searchShop',JSON.stringify(this.searchHistory))
    },
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #f5f5f5;
  min-height: 100vh;
  .search-history,
  .restaurant {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 12px;
  }
  .shop {
    background-color: #fff;
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px solid #e4e4e4;
    .img {
      width: 34px;
      height: 34px;
      margin: 10px;
    }
    .right {
      flex: 1;
      font-size: 12px;
      .name {
        margin-top: 10px;
      }
      .num {
        margin-top: 10px;
      }
      .distance {
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
  .history{
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #e4e4e4;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    :nth-child(1){
      display: inline-block;
      margin-left: 10px;
      flex: 1;
    }
    :nth-child(2){
      display: inline-block;
      text-align: right;
      flex: 1;
      margin-right: 10px;
    }
  }
  .clear{
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    color: #3190e8;
    font-size: 14px;
    text-align: center;
  }
  .no-results{
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>