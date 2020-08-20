<template>
  <div class="reset">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">重置密码</div>
    </navigation-bar>
    <van-form @submit="reset">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="oldPassword"
        type="password"
        name="旧密码"
        label="旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="newPassword"
        type="password"
        name="新密码"
        label="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
        v-model="confirmNewPassword"
        type="password"
        name="确认新密码"
        label="确认新密码"
        :rules="[{ required: true, message: '请填写确认新密码' }]"
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
        <van-button round block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { getCaptchas,changePassword } from "@/network/user";
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      username: "",
      oldPassword: "",
      confirmNewPassword: "",
      newPassword: "",
      captcha_code: "",
      captchaUrl: "",
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
    reset() {
      changePassword(this.username,this.oldPassword,this.newPassword,this.confirmNewPassword,this.captcha_code).then(res => {
        console.log(res)
        if(res.data.status !== 1){
          return this.$toast(res.data.message);
        
        }
         this.$toast(res.data.success);
      })
    },
    changeImg() {
      getCaptchas().then((res) => {
        this.captchaUrl = res.data.code;
        
      });
    },
  },
};
</script>

<style lang="less" scoped>

</style>