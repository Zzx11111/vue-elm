<template>
  <div class="shipping-address">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">选择地址</div>
    </navigation-bar>
   <!--  添加地址 -->
    <div class="add-address" @click="addAddress">
      <van-icon name="add-o" />新增收货地址
    </div>
    <!-- 地址列表 -->
    <div class="address-list">
      <div class="address-list-item" v-for="item in addresses" :key="item.id" @click="chooseAddress(item)">
        <div :class="['left',choiceAddress && choiceAddress.id === item.id?'active':'']">
          <van-icon name="passed" size="20px"/>
        </div>
        <div class="right">
          <p class="user-info">
            <span class="name">{{item.name}}</span>
            <span class="sex">{{item.sex === 1?'先生':'女士'}}</span>
            <span class="phone">{{item.phone}}</span>
          </p>
          <p class="address-tag">
            <span class="tag">{{item.tag}}</span>
            <span class="address-detail">{{item.address_detail}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import {getAddress} from '@/network/order'
import {CHOOSE_ADDRESS} from '@/store/mutation-types'
  export default {
    components:{
      navigationBar
    },
    data() {
      return {
        addresses:[],
        userInfo:null,
        choiceAddress:{}
      }
    },
    mounted(){
      this.userInfo = this.$store.state.userInfo
      this.choiceAddress = this.$store.state.chooseAddress
      getAddress(this.userInfo.id).then(res => {
        this.addresses = res.data
      })
    },
    methods:{
      goback(){
        this.$router.go(-1)
      },
      addAddress(){
        this.$router.push('/addAddress')
      },
      chooseAddress(address){
        this.choiceAddress = address
        this.$store.commit(CHOOSE_ADDRESS,address)
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
.shipping-address{
  .add-address{
    position: absolute;
    height: 44px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content:center;
    width: 100%;
    color:#3190e8;
    font-size: 16px;
    vertical-align:text-top;
  }
  .address-list{
    .address-list-item{
      padding: 10px;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      .left{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active{
        color: blue;
      }
      .right{
        flex: 4;
        .user-info{
          font-size: 16px;
          margin:8px;
          .name{
            font-weight: 800;
            font-size: 20px;
          }
        }
        .address-tag{
          margin: 8px;
          .tag{
            background-color: #ff5722;
            color:#fff;
            border-radius: 20%;
            padding: 0 2px;
          }
          .address-detail{
            color: #777;
          }
        }
      }
    }
  }
}
</style>