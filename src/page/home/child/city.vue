<template>
  <div>
    <div class="city">
      <div class="interval"></div>
      <div class="title">{{title}}</div>
      <div class="cityList">
        <div
          v-for="(item,index) in city"
          :key="index"
          class="city-item"
          :class="[(index+1)%4===0?'right':'',title==='热门城市'?'hot':'']"
          @click="selectAddress(item)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    city: Array
  },
  methods:{
    selectAddress(city){
      console.log(city)
      this.$emit('selectAddress',city)
    }
  }
};
</script>

<style lang="less" scoped>
.city {
  .interval {
    border-top: 2px solid #e4e4e4;
    background-color: #f5f5f5;
    height: 6px;
    border-bottom: 1px solid #e4e4e4;
  }
  .title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 0 8px;
  }
  .cityList {
    display: flex;
    flex-flow: wrap;
    .city-item {
      box-sizing: border-box;
      font-size: 12px;
      width: 25%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      overflow: hidden;
      text-overflow: ellipsis;
      line-clamp: 1;
      white-space: nowrap;
    }
    .right {
      border-right: 0;
    }
    .hot {
      color: #3190e8;
    }
  }
}
</style>