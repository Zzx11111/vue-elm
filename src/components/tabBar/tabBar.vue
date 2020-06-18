<template>
  <div class="tab-bar">
    <div class="tab-bar-item" v-for="(item,index) in tabBar" :key="index" @click="activePath(item.path)" :class="[currentPath === item.path ? 'active' :'']">
        <van-icon :name="item.icon"/>
        <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabBar: [
        {
          icon:'logistics',
          title:'外卖',
          path:'/msite'
        },
        {
          icon:'search',
          title:'搜索',
          path:'/search'
        },
        {
          icon:'cart-o',
          title:'订单',
          path:'/order'
        },
        {
          icon:'contact',
          title:'我的',
          path:'/profile'
        }
      ],
      currentPath:'',
      
    };
  },
  created(){
    this.currentPath = this.$route.path
  },
  methods:{
    activePath(path){
      this.currentPath = path
      if(path === '/msite' || path === '/search'){
        this.$router.push({path:path,query:{geohash:this.$store.state.geohash}})
      }else{
        this.$router.push(path)
      }
    }
  },
  
};
</script>

<style lang="less" scoped>
.tab-bar {
  height: 35px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  display: flex;
  .tab-bar-item {
    padding-top:5px;
    flex: 1;
    font-size: 12px;
    text-align: center;
  }
  .active{
    color: blue;
  }
}
</style>