<template>
  <div class="select-address">
    <navigation-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="back"></van-icon>
      </div>
      <div slot="center">{{cityInfo.name}}</div>
      <div slot="right">
        <router-link to="/home" style="color:#fff">切换城市</router-link>
      </div>
    </navigation-bar>
    <form v-on:submit.prevent class="form">
      <input type="text" name="name" placeholder="输入学校、商务楼、地址" v-model="inputValue" />
      <input type="submit" value="提交" @click="select" class="submit" />
    </form>
    <div class="history" v-if="historytitle">搜索历史</div>
    <div class="address" v-for="(item,index) in addressList" :key="index" @click="nextPage(index,item.geohash)">
      <p class="name">{{item.name}}</p>
      <p>{{item.address}}</p>
    </div>
    <div class="delete" @click="clearHistory" v-if="historytitle&&addressList">
      清空所有
    </div>
    <div v-if="placeNone" class="none">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { cityInfo, selectAddress } from "@/network/city";
import {SAVE_GEOHASH} from '@/store/mutation-types'
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      cityInfo: {},
      inputValue: "",
      addressList: [],
      historyAddress:[],
      historytitle:true,
      placeNone: false
      
    };
  },
  created() {
    this._cityInfo();
    this._getInit();
  },
  methods: {
    //初始化
    _getInit(){
      this.addressList = JSON.parse(window.localStorage.getItem('historyAddress'))
    },
    /* 获取城市信息 */
    _cityInfo() {
      let id = this.$route.params.id;
      cityInfo(id)
        .then(res => {
          if (res.status !== 200) return this.$toast.fail("失败文案");
          this.cityInfo = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索地址
    select() {
      console.log(this.cityInfo.id)
      if (this.inputValue.trim() !== "") {
        selectAddress(this.cityInfo.id, this.inputValue).then(res => {
          console.log(res)
          this.addressList = res.data;
          this.placeNone = res.data.length ? false:true;
        });
        this.historytitle = false
      } else {
        this.$toast.fail("请输入地址");
      }
    },
    /* 返回上一页 */
    back() {
      this.$router.go(-1);
    },
    nextPage(index,geohash){
      let chooseAddress = this.addressList[index]
      let historyAddress = JSON.parse(window.localStorage.getItem('historyAddress'))
      console.log(historyAddress)
      if(historyAddress){
        this.historyAddress = historyAddress
        let checkrepeat = false;
        historyAddress.find(item => {
          console.log(item)
          if(item.geohash === geohash){
            checkrepeat = true
          }
        })
        if(checkrepeat === false){
          this.historyAddress.push(chooseAddress)
        }
      }else{
        this.historyAddress.push(chooseAddress)
      }
      window.localStorage.setItem('historyAddress',JSON.stringify(this.historyAddress))
      this.$store.commit(SAVE_GEOHASH,geohash)
      this.$router.push({path:'/msite',query:{geohash:this.addressList[index].geohash}})
    },
    clearHistory(){
      console.log('aaa')
      window.localStorage.removeItem('historyAddress')
      this._getInit()
    }
  }
};
</script>

<style lang="less" scoped>
.select-address {
  height: 100vh;
  background-color: #f5f5f5;
  .form {
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 20px;
    .submit {
      background-color: #3190e8;
      border-style: none;
      color: #fff;
      height: 30px;
    }
    input {
      display: block;
      width: 100%;
      font-size: 16px;
      border-style: none;
      box-sizing: border-box;
      padding: 0px 6px;
      margin-bottom: 8px;
    }
  }
  .history {
    font-size: 12px;
    padding: 3px 8px;
    border-bottom: 2px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
  }
  .address{
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
    .name{
      font-size: 13px;
      color: #333;
    }
    p{
      padding: 10px;
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .delete{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    font-size: 16px;
  }
  .none{
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    padding-left: 10px;
    background-color: #fff;
  }
}
</style>