<template>
  <div class="shop-comment">
    <!-- 商店评分 -->
    <div class="rating-score" v-if="ratingScores">
      <div class="rating-score-left">
        <p class="service_score">{{ratingScores.service_score.toFixed(1)}}</p>
        <p>综合评价</p>
        <p class="compare_rating">高于周边商家{{(ratingScores.compare_rating*100).toFixed(1)}}%</p>
      </div>
      <div class="rating-score-right">
        <p>服务态度:{{ratingScores.service_score.toFixed(1)}}</p>
        <p class="food-score">菜品评价:{{ratingScores.food_score.toFixed(1)}}</p>
        <p>送达时间{{ratingScores.deliver_time}}分钟</p>
      </div>
    </div>
    <!-- 评价分类 -->
    <div class="rating-tag">
      <div
        class="rating-tag-item"
        v-for="(item,index) in ratingTag"
        :key="index"
      >{{item.name}}({{item.count}})</div>
    </div>
    <!-- 评价 -->
    <div class="rating" v-for="(item,index) in rating" :key="index">
      <div class="rating-header">
        <span>{{item.username}}</span>
        <span>{{item.rated_at}}</span>
      </div>
      <div class="rating-center">
        <span>评分：{{item.rating_star}}</span>
        <span>{{item.time_spent_desc}}</span>
      </div>
      <div class="rating-footer">
        <div class="rating-footer-item" v-for="(item1,index1) in item.item_ratings" :key="index1">
          {{item1.food_name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings, getRatingsScores, getRatingTag } from "@/network/shop";
export default {
  props: {
    id: Number,
  },
  created() {
    console.log(this.id);
  },
  data() {
    return {
      ratingScores: null,
      rating: [],
      ratingTag: [],
    };
  },
  mounted() {
    getRatings(this.id).then((res) => {
      console.log(res);
      this.rating = res.data;
    });
    getRatingsScores(this.id).then((res) => {
      console.log(res);
      this.ratingScores = res.data;
    });
    getRatingTag(this.id).then((res) => {
      console.log(res);
      this.ratingTag = res.data;
    });
  },
  computed: {
    keepPoint(num) {
      return num.toFixed(1);
    },
  },
};
</script>

<style lang="less" scoped>
.shop-comment {
  .rating-score {
    display: flex;
    text-align: center;
    padding: 10px;
    border-bottom: 8px solid #eee;
    .rating-score-left {
      flex: 1;
      .service_score {
        font-size: 25px;
        color: #f60;
        margin-bottom: 5px;
      }
      .compare_rating {
        margin-top: 5px;
        color: #9999;
      }
    }
    .rating-score-right {
      flex: 1;
      .food-score {
        margin: 5px 0;
      }
    }
  }
  .rating-tag {
    display: flex;
    flex-wrap: wrap;
    margin: 10px;
    font-size: 12px;
    .rating-tag-item {
      margin: 5px;
      padding: 3px;
      border: 1px solid black;
      border-radius: 5px;
    }
  }
  .rating{
    margin: 10px;
    border-top: 1px solid #eeee;
    .rating-header{
      margin:5px 0;
      display: flex;
      :nth-child(1){
        flex: 1;
      }
    }
    .rating-center{
      margin:5px 0;
      display: flex;
      :nth-child(1){
        flex: 1;
      }
    }
    .rating-footer{
      display: flex;
      font-size: 12px;
      .rating-footer-item{
        margin-right: 5px;
        padding: 3px;
        border:1px solid #999;
        border-radius: 5px;
      }
    }
  }
}
</style>