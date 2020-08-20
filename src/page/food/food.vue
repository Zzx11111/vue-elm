<template>
  <div class="food">
    <navigation-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="goBack"></van-icon>
      </div>
      <div slot="center">{{title}}</div>
    </navigation-bar>
    <!-- 下拉 -->
    <!-- <van-dropdown-menu>
      <van-dropdown-item :title="title" ref="leftItem">
        <div class="food-catrgory">
          <div class="left">
            <div v-for="item in foodCategory" :key="item.id" class="category-item" @click="selectOneCategory(item)" :class="[activeOneCategoryName === item.name ? 'active':'']">
              <div class="category-icon">
                <img :src="imgBaseUrl + getimgUrl(item.image_url)" alt="">
              </div>
              <span class="category-name">{{item.name}}</span>
              <span class="category-count">
                <span>{{item.count}}</span>
              </span>
              <van-icon name="arrow"></van-icon>
            </div>
          </div>
          <div class="right">
            <div v-for="item in twoCategory" :key="item.id" class="two-category" @click="selectTwoCategory(item)">
              <span>{{item.name}}</span>
              <span>{{item.count}}</span>
            </div>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item :options="orderOption" v-model="order_by" @change="changeOrderBy"/>
    </van-dropdown-menu>-->
    <!-- 下拉菜单 -->
    <div class="dropdown-menu">
      <div class="dropdown-menu-item" @click="openCategory">
        {{title}}
        <van-icon name="arrow-down" v-if="!isCategory"/>
        <van-icon name="arrow-up" v-if="isCategory"/>
      </div>
      <div class="dropdown-menu-item" @click="openSort">
        排序
        <van-icon name="arrow-down" v-if="!isSort"/>
        <van-icon name="arrow-up" v-if="isSort"/>
      </div>
    </div>
    <transition name="fade">
      <div class="food-catrgory" v-show="isCategory" :style="{height:foodCategory.length*40+'px'}">
        <div class="left">
          <div
            v-for="item in foodCategory"
            :key="item.id"
            class="category-item"
            @click="selectOneCategory(item)"
            :class="[activeOneCategoryName === item.name ? 'active':'']"
          >
            <div class="category-icon">
              <img :src="imgBaseUrl + getimgUrl(item.image_url)" alt />
            </div>
            <span class="category-name">{{item.name}}</span>
            <span class="category-count">
              <span>{{item.count}}</span>
            </span>
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="right">
          <div
            v-for="item in twoCategory"
            :key="item.id"
            class="two-category"
            @click="selectTwoCategory(item)"
          >
            <span>{{item.name}}</span>
            <span>{{item.count}}</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="sort" v-if="isSort">
        <div class="sort-item" v-for="(item,index) in orderOption" :key="index" @click="changeOrderBy(item.value)">{{item.text}}</div>
      </div>
    </transition>
    <!-- 下拉菜单结束 -->
    <div class="shop-list">
      <shop :shopList="shopList"></shop>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { restaurantAllCategory, getRestaurants } from "@/network/shop";
import { getLocation } from "@/network/msite";
import Shop from "@/components/shop";
export default {
  components: {
    navigationBar,
    Shop
  },
  data() {
    return {
      title: "",
      imgBaseUrl: "https://fuss10.elemecdn.com",
      foodCategory: [],
      twoCategory: [],
      activeOneCategoryName: "",
      //当前地址信息
      addressInfo: {},
      offset: 0,
      restaurant_category_id: "",
      restaurant_category_ids: "",
      order_by: 4,
      shopList: [],
      orderOption: [
        { text: "智能排序", value: 4 },
        { text: "距离最近", value: 5 },
        { text: "销量最高", value: 6 },
        { text: "起送价最低", value: 1 },
        { text: "配送速度最快", value: 2 },
        { text: "评价最高", value: 3 }
      ],
      isCategory: false,
      isSort: false
    };
  },
  created() {
    this.title = this.$route.query.title;
    this.restaurant_category_id = this.$route.query.restaurant_category_id;
  },
  mounted() {
    restaurantAllCategory().then(res => {
      this.foodCategory = res.data;
      console.log(res);
    });
    getLocation(this.$route.query.geohash).then(res => {
      console.log(res);
      this.addressInfo = res.data;
    });
  },
  methods: {
    //打开商品分类
    openCategory() {
      this.isCategory = !this.isCategory;
      this.isSort = false
    },
    openSort(){
      this.isSort = !this.isSort;
      this.isCategory = false
    },
    goBack() {
      this.$router.go(-1);
    },
    getShop() {
      getRestaurants(
        this.addressInfo.latitude,
        this.addressInfo.longitude,
        this.offset,
        this.restaurant_category_id,
        this.order_by
      ).then(res => {
        console.log(res);
        this.shopList = res.data;
      });
    },
    //获取imgurl
    getimgUrl(url) {
      let imgurl = "";
      if (url.indexOf("png") !== -1) {
        imgurl =
          "/" +
          url.substr(0, 1) +
          "/" +
          url.substr(1, 2) +
          "/" +
          url.substr(3) +
          ".png";
      } else {
        imgurl =
          "/" +
          url.substr(0, 1) +
          "/" +
          url.substr(1, 2) +
          "/" +
          url.substr(3) +
          ".jpeg";
      }
      return imgurl;
    },
    //选中第一分类
    selectOneCategory(oneCategory) {
      this.activeOneCategoryName = oneCategory.name;
      this.twoCategory = oneCategory.sub_categories;
      this.restaurant_category_id = oneCategory.id;
    },
    //选择第二类分类
    selectTwoCategory(twoCategory) {
      this.title = twoCategory.name;
      this.restaurant_category_ids = twoCategory.id;
      getRestaurants(
        this.addressInfo.latitude,
        this.addressInfo.longitude,
        this.offset,
        "",
        this.order_by,
        this.restaurant_category_ids
      ).then(res => {
        console.log(res);
        this.shopList = res.data;
      });
      /* this.$refs.leftItem.toggle(); */
      this.isCategory = false;
    },
    changeOrderBy(index) {
      this.order_by = index
      getRestaurants(
        this.addressInfo.latitude,
        this.addressInfo.longitude,
        this.offset,
        "",
        this.order_by,
        this.restaurant_category_ids
      ).then(res => {
        console.log(res);
        this.shopList = res.data;
      });
      this.isSort =false
    }
  },
  watch: {
    addressInfo: function() {
      this.getShop();
    }
  }
};
</script>

<style lang="less" scoped>
.food {
  .dropdown-menu {
    position: fixed;
    top: 40px;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    padding: 8px 0;
    .dropdown-menu-item {
      flex: 1;
      text-align: center;
    }
  }
  /*  .van-dropdown-menu {
    position: sticky;
    top: 40px;
    width: 100%;
    overflow: hidden;
  } */
  .sort {
    position: absolute;
    top:73px;
    background-color: #fff;
    width: 100%;
    .sort-item{
      margin:10px 10px;
    }
  }
  .food-catrgory {
    display: flex;
    width: 100%;
    position: absolute;
    overflow-y: auto;
    top: 73px;
    .left {
      flex: 1;
      background-color: #f5f5f5;
      .active {
        background-color: #fff;
      }
      .category-item {
        height: 30px;
        font-size: 12px;
        padding: 5px 10px;
        .category-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          img {
            width: 16px;
            height: 16px;
          }
        }
        .category-name {
          vertical-align: text-top;
          margin-left: 8px;
        }
        .category-count {
          vertical-align: text-top;
          background-color: #ccc;
          border-radius: 10px;
          padding: 2px;
          color: #fff;
          margin-left: 10px;
        }
        .van-icon-arrow {
          float: right;
        }
      }
    }
    .right {
      flex: 1;
      background-color: #fff;
      height: 100%;
      overflow-y: auto;
      .two-category {
        display: flex;
        height: 40px;
        line-height: 30px;
        border-bottom: 1px solid #e4e4e4;
        padding: 5px;
        box-sizing: border-box;
        :nth-child(1) {
          flex: 2;
          text-align: center;
        }
        :nth-child(2) {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
  .shop-list {
    margin-top: 40px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>