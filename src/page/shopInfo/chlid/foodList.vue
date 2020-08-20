<template>
  <div class="menu">
    <section class="menu-list">
      <div class="left">
        <div
          class="left-item"
          v-for="item in menuList"
          :key="item.id"
          @click="clickLeftItem(item)"
          :class="[activeLeftItem.indexOf(item.name) != -1?'active-left-item':'c']"
        >{{item.name}}</div>
      </div>
      <div class="right" ref="menuRight">
        <div v-for="item in menuList" :key="item.id">
          <div class="right-title" ref="rightTitle">
            <span>{{item.name}}</span>
            <span style="font-size:12px;color: #999">{{item.description}}</span>
          </div>
          <div v-for="item1 in item.foods" :key="item1._id" class="right-item" @click="goFoodRating(item1)">
            <div class="item-img">
              <img :src="imgBaseUrl+item1.image_path" alt="G" />
            </div>
            <div class="introduce">
              <p class="introduce-name">
                <span>{{item1.name}}</span>
                <span v-for="(att,index) in item1.attributes" :key="index">
                  <span
                    v-if="att"
                    :class="[att.icon_name.indexOf('新') != -1 ?'new':'']"
                    :style="{color: '#' + att.icon_color}"
                  >{{att.icon_name}}</span>
                </span>
              </p>
              <p class="description">{{item1.description}}</p>
              <p>月售{{item1.month_sales}}份/好评率{{item1.satisfy_rate}}%</p>
              <p v-if="item1.activity">{{item1.activity.image_text}}</p>
              <p class="price">
                <span>￥{{item1.specfoods[0].price}}起</span>
                <span v-if="item1.specifications.length" @click.stop="chooseSpecifications(item1)">选规格</span>
                <span v-else @click.stop="addCart(item1)">+</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    menuList: Array
  },
  data() {
    return {
      imgBaseUrl: "http://cangdu.org:8001/img/",
      rightTitle: [],
      activeLeftItem:""
    };
  },
  mounted() {
    this.$refs.menuRight.addEventListener("scroll", this.rightScroll);
    this.rightTitle = this.$refs.rightTitle;
    this.activeLeftItem = this.rightTitle[0].innerText
  },
  methods: {
    //跳转单个食品评论页面
    goFoodRating(foodItem){
      console.log('123')
      this.$router.push({path:'/foodRating',query:{img:foodItem.image_path,description:foodItem.description,name:foodItem.name,rating:foodItem.rating,month_sales:foodItem.month_sales,rating_count:foodItem.rating_count,satisfy_rate:foodItem.satisfy_rate}})
    },
    rightScroll(event) {
      for (let i = 0; i < this.rightTitle.length; i++) {
        let j = i + 1;
        if (this.rightTitle[i].offsetTop - 163 <= event.target.scrollTop) {
          this.activeLeftItem = this.rightTitle[i].innerText;
        }
      }
    },
    chooseSpecifications(foodInfo) {
      this.$emit("chooseSpecifications", foodInfo);
    },
    //点击左边的食物分类
    clickLeftItem(LeftItem) {
      let rightTitleItem = this.rightTitle.filter(item => {
        if (item.innerText.indexOf(LeftItem.name) == "0") return item;
      });
      this.$refs.menuRight.scrollTop =
        rightTitleItem[0].offsetTop - this.$refs.menuRight.offsetTop;
      this.activeLeftItem = rightTitleItem 
    },
    //加入购物车
    addCart(item1){
      console.log(item1)
      this.$emit('addCart',item1.specfoods[0])
    }
  }
};
</script>

<style lang="less" scoped>
.menu {
  .menu-list {
    display: flex;
    .left {
      width: 25%;
      overflow-y: auto;
      height: calc(100vh - 203px);
      background-color: #eee;
      font-size: 16px;
      .left-item {
        padding: 15px 0;
        text-align: center;
      }
      .active-left-item{
        background-color: #fff;
      }
    }
    .right {
      width: 75%;
      overflow-y: auto;
      height: calc(100vh - 203px);
      .right-title {
        background-color: #eee;
        height: 30px;
        padding-left: 10px;
        line-height: 30px;
      }
      .right-item {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #eee;
        .item-img {
          flex: 1;
          margin: 10px;
          height: 50px;
          img {
            width: 50px;
            height: 50px;
          }
        }
        .introduce {
          flex: 3;
          overflow: hidden;
          padding: 10px;
          font-size: 12px;
          .introduce-name {
            font-size: 14px;
            display: flex;
            :nth-child(1) {
              flex: 1;
            }
            :nth-child(2) {
              flex: 1;
            }
            /* .new{
              display: block;
              position: relative;
              top: 0;
              left: 0;
              border-color:transparent transparent transparent blue ;
              border-style: solid solid solid solid;
              border-width: 10px;
              width: 0;
              height: 0;
            } */
          }
          p {
            margin: 5px 0;
          }
          .description {
            color: #999999;
          }
          .price {
            display: flex;
            :nth-child(1) {
              flex: 1;
            }
            :nth-child(2) {
              padding: 3px;
              border-radius: 3px;
              text-align: right;
              color: #ffff;
              background-color: #3190e8;
            }
          }
        }
      }
    }
  }
}
</style>