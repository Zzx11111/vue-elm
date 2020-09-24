<template>
  <div class="search-address">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">搜索</div>
    </navigation-bar>
    <!-- 搜索地址 -->
    <van-form @submit="searchAddress">
      <van-field
        v-model="keyWord"
        type="text"
        name="keyWord"
        placeholder="请输入小区/写字楼/公司等"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">搜索</van-button>
      </div>
    </van-form>
    <!-- 显示搜索到的地址 -->
    <div class="address">
      <div class="address-item" v-for="(item,index) in address" :key="index" @click="saveAddress(item)">
        <p class="name">{{item.name}}</p>
        <p class="detail">{{item.address}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import {searchAddress} from '@/network/order'
import {SAVE_ADDRESS} from '@/store/mutation-types'
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      keyWord:'',
      address:[]
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    searchAddress(){
      searchAddress(this.keyWord).then(res => {
        console.log(res)
        this.address = res.data
      })
    },
    saveAddress(address){
      this.$store.commit(SAVE_ADDRESS,address)
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="less" scoped>
.search-address{
  .address{
    margin: 20px;
    .address-item{
      padding-bottom: 20px;
      border-bottom:1px solid #f5f5f5;
      .name{
        margin: 10px;
      }
      .detail{
        color: #999;
        margin: 10px;
      }
    }
  }
}
</style>