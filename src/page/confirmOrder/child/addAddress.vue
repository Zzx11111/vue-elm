<template>
  <div class="add-address">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">添加地址</div>
    </navigation-bar>
    <van-form @submit="_addAddress">
      <van-field
        v-model="name"
        name="name"
        label="联系人"
        placeholder="你的名字"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男士</van-radio>
            <van-radio name="2">女士</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="phone"
        name="phone"
        label="联系电话"
        placeholder="你的手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="address"
        name="address"
        label="送餐地址"
        placeholder="小区/写字楼/学校等"
        :rules="[{ required: true, message: '请输入地址' }]"
        @click="searchAddress"
      />
      <van-field
        v-model="address_detail"
        name="address_detail"
        label="详细地址"
        placeholder="如门牌号等"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
      <van-field
        v-model="tag"
        name="tag"
        label="标签"
        placeholder="无/家/公司/学校"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import {addAddress} from '@/network/order'
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      name: "",
      sex: 0,
      phone:"",
      address:'',
      address_detail:'',
      tag:'',
      userInfo:null,
      geohash:''
    };
  },
  mounted(){
    if(this.$store.state.address){
      this.address = this.$store.state.address.name
      this.geohash = this.$store.state.address.geohash
    }
    this.userInfo = this.$store.state.userInfo
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    searchAddress(){
      this.$router.push('/searchAddress')
    },
    _addAddress(){
      addAddress(this.userInfo.id,this.address,this.address_detail,this.geohash,this.name,this.phone,this.tag,this.sex,this.phone).then(res => {
        if(res.data.status === 1){
          this.$toast(res.data.success)
          this.$router.go(-1)
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
</style>