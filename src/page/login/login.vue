<template>
  <div class="login">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">密码登录</div>
    </navigation-bar>
    <van-form @submit="accountLogin">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="captcha_code"
        name="验证码"
        label="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #right-icon>
          <img :src="captchaUrl" alt @click="changeImg" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="reset-password" @click="goResetPassword">
      重置密码？
    </div>
    <p class="tip">
      没注册的输入账号密码自动注册，有账号的请输入正确的账号密码
    </p>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { getCaptchas,loginUser } from "@/network/user";
import {SAVE_USERINFO} from '@/store/mutation-types'
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      username: "",
      password: "",
      captcha_code: "",
      captchaUrl: "",
      userInfo:null
    };
  },
  mounted() {
    getCaptchas().then((res) => {
      this.captchaUrl = res.data.code;
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    changeImg() {
      getCaptchas().then((res) => {
        this.captchaUrl = res.data.code;
      });
    },
    accountLogin() {
      loginUser(this.username,this.password,this.captcha_code).then(res => {
        console.log(res)
        if(!res.data.user_id){
          this.$toast(res.data.message);
        }else{
          this.userInfo = res.data
          this.$store.dispatch(SAVE_USERINFO,this.userInfo)
         /*  window.localStorage.setItem('save_userInfo',JSON.stringify(this.userInfo)) */
          this.$router.go(-1)
        }
      })
    },
    goResetPassword(){
      this.$router.push('/resetPassword')
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  .reset-password{
    color:blue;
    text-align: right;
    margin-right: 10px;
  }
  .tip{
    color: red;
    margin: 10px;
    font-size: 12px;
  }
}
</style>