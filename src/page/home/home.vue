<template>
  <div class="home">
    <navigation-bar>
      <div slot="left">elm-me</div>
      <div slot="right">
        <router-link to="/login" style="color:#fff" v-if="!userInfo">登录|注册</router-link>
        <router-link to="/profile" style="color:#fff" v-if="userInfo"><van-icon name="contact" /></router-link>
      </div>
    </navigation-bar>
    <div class="city-position">
      <div class="position-top">
        <span class="current">当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <div class="position-bottom">
        <span @click="selectAddress(guessCity)">{{guessCity.name}}</span>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
    <city title="热门城市" :city="hotCity" @selectAddress="selectAddress"></city>
    <div v-if="groupCity">
      <city
        v-for="(item,index) in groupCity"
        :key="index"
        :city="item"
        :title="index"
        @selectAddress="selectAddress"
      ></city>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { getCity } from "@/network/city";
import City from "./child/city";
export default {
  components: {
    navigationBar,
    City
  },
  data() {
    return {
      hotCity: [],
      groupCity: {},
      guessCity: {},
     /*  userInfo:null */
    };
  },
  created() {
    /* this.userInfo = this.$store.state.userInfo */
    getCity("hot").then(res => {
      this.hotCity = res.data;
    });
    getCity("group").then(res => {
      console.log(res)
      Object.keys(res.data)
        .sort()
        .map(item => {
          this.groupCity[item] = res.data[item];
        });
    });
    getCity("guess").then(res => {
      this.guessCity = res.data;
    });
  },
  methods: {
    selectAddress(city) {
      this.$router.push(`/selectAddress/${city.id}`);
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  watch: {
    guessCity: function() {
      getCity("group").then(res => {
        Object.keys(res.data)
          .sort()
          .map(item => {
            this.groupCity[item] = res.data[item];
          });
      });
      
    }
  }
};
</script>

<style lang="less" scoped>
.position-top {
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  span {
    color: #9f9f9f;
  }
  .current {
    color: black;
    margin-right: 5px;
  }
}
.position-bottom {
  border-top: 1px solid #e4e4e4;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  font-size: 16px;
  span {
    color: #3190e8;
  }
  .van-icon {
    float: right;
    line-height: 40px;
  }
}
</style>