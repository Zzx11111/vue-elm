<template>
  <div class="profile">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">我的</div>
    </navigation-bar>
    <!-- 头部 -->
    <section class="profile-header" v-if="!userInfo">
      <div class="user-img">
        <img :src="imgUrl" alt />
      </div>
      <div class="header-center">
        <p class="header-center-top">登录/注册</p>
        <p>暂无绑定手机号</p>
      </div>
      <div class="header-right">
        <van-icon name="arrow" @click="goPath('/login')" />
      </div>
    </section>
    <section class="profile-header" v-if="userInfo">
      <div class="user-img">
        <img :src="imgBaseUrl+userInfo.avatar" alt />              
       </div>
      <div class="header-center">
        <p class="header-center-top">{{this.userInfo.username}}</p>
        <p>暂无绑定手机号</p>
      </div>
      <div class="header-right">
        <van-icon name="arrow" />
      </div>
    </section>
    
    <section class="profile-main">
      <div class="profile-main-left">
        <p>
          <span style="color:#f90;font-size:25px;">0.00</span>元
        </p>
        <p>我的余额</p>
      </div>
      <div class="profile-main-center">
        <p>
          <span style="color:#ff5f3e;font-size:25px;">3</span>个
        </p>
        <p>我的优惠</p>
      </div>
      <div class="profile-main-right">
        <p>
          <span style="color:#6ac20b;font-size:25px;">0</span>分
        </p>
        <p>我的积分</p>
      </div>
    </section>
    <div class="order"  @click="goPath('/order')">
      <van-icon name="coupon-o" />
      <span>我的订单</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <div class="sign-out" @click="signOut">
      退出
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import tabBar from "@/components/tabBar/tabBar";
import {signOut} from '@/network/user'
import {SIGN_OUT} from '@/store/mutation-types'
export default {
  components: {
    tabBar,
    navigationBar,
  },
  data() {
    return {
      imgUrl: "/img/1.jpg",
      userInfo:null,
      imgBaseUrl: "http://cangdu.org:8001/img/",
    };
  },
  created(){
    this.userInfo = this.$store.state.userInfo
    console.log(this.userInfo)
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goPath(path) {
      this.$router.push(path);
    },
    signOut(){
      signOut().then(res => {
        console.log(res)
        this.$toast(res.data.message)
      })
      this.$store.commit(SIGN_OUT,null)
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less" scoped>
.profile {
  .profile-header {
    display: flex;
    color: #fff;
    background-color: #3190e8;
    padding: 10px;
    .user-img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background-color: #fff;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .header-center {
      margin-left: 10px;
      flex: 1;
      .header-center-top {
        margin-bottom: 8px;
        font-size: 20px;
      }
    }
    .header-right {
      margin: auto;
    }
  }
  .profile-main {
    display: flex;
    text-align: center;
    font-size: 14px;
    border-bottom:5px solid #f5f5f5;
    .profile-main-left {
      flex: 1;
      padding: 15px;
    }
    .profile-main-center {
      flex: 1;
      border-right: 1px solid #f1f1f1;
      border-left: 1px solid #f1f1f1;
      padding: 15px;
    }
    .profile-main-right {
      flex: 1;
      padding: 15px;
    }
  }
  .order{
    padding: 10px;
    display: flex;
    font-size:14px;
    border-bottom: 1px solid #f1f1f1;
    :nth-child(2){
      flex: 1;
      margin-left: 5px;
    }
  }
  .sign-out{
    text-align: center;
    height: 34px;
    color: #fff;
    line-height: 34px;
    background-color: #ff5f3e;
  }
}
</style>