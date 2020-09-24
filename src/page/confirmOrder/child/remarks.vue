<template>
  <div class="remarks">
    <navigation-bar>
      <div slot="left" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">订单备注</div>
    </navigation-bar>
    <div class="fast-remark">
      <p>快速备注</p>
      <span class="fast-remark-list" v-for="(item,index) in remarks" :key="index">
        <span
          v-for="(item1,remarkIndex) in item"
          :key="remarkIndex"
          :class="[remarkIndex===item.length-1?'last':'','fast-remark-item',fastRemarks[index] && (fastRemarks[index][0] === remarkIndex)?'select':'']"
          @click="selectRemark(item1,index,remarkIndex)"
        >{{item1}}</span>
      </span>
    </div>
    <div class="other-remark">
      <p>其他备注</p>
      <textarea placeholder="请输入备注内容(可不填)" class="other-remark-info" v-model="ohterRemark"></textarea>
    </div>
    <div class="confirm">
      <van-button type="primary" @click="confirmRemark">确定</van-button>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar/navigationBar";
import { getRemarks } from "@/network/order";
import {SAVE_REMARK} from '@/store/mutation-types'
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      remarks: null,
      ohterRemark:'',
      fastRemarks:{},
      
    };
  },
  mounted() {
    getRemarks(this.$route.query.cart_id).then((res) => {
      this.remarks = res.data.remarks;
      console.log(res);
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    selectRemark(remark,index,remarkIndex){
      this.fastRemarks[index] = [remarkIndex,remark]
      this.fastRemarks = Object.assign({},this.fastRemarks)
    },
    confirmRemark(){
      let remark = '';
      for(let i in this.fastRemarks){
        remark += this.fastRemarks[i][1]+'、'
        
      }
      if(this.ohterRemark){
        remark += this.ohterRemark
      }
      console.log(remark)
      this.$store.commit(SAVE_REMARK,remark)
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
.remarks {
  .fast-remark {
    border-top: 8px solid #f1f1f1;
    font-size: 14px;
    p {
      margin: 10px;
    }
    .fast-remark-list {
      display: inline-block;
      margin: 5px;
      border: 1px solid #3190e8;
      border-radius: 5px;
      .fast-remark-item {
        display: inline-block;
        padding: 10px;
        border-right: 1px solid #3190e8;
      }
      .last {
        border-right: 0px;
      }
      .select{
        background-color: #3190e8;
        color:#fff;
      }
    }
  }
  .other-remark {
    border-top: 8px solid #f1f1f1;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    p {
      margin: 20px;
    }
    .other-remark-info {
      width: 80%;
      height: 100px;
      text-indent: 2em;
      padding-top: 10px;
      background-color: #f9f9f9;
      border: 1px solid #eee;
      resize: none;
      margin: 0 auto;
    }
  }
  .confirm {
    width: 100%;
    margin-top: 30px;
    text-align: center;
    .van-button {
      margin: 0;
      width: 80%;
    }
  }
}
</style>