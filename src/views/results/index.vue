<template>
  <div id="results">
    <van-nav-bar title="搜索结果" left-arrow />
    <van-cell-group>
      <van-cell v-for="item in resultList" :title="item.title" >
        <template slot="label">
          <p>{{item.aut_name}}</p>
          <van-grid :column-num="3">
            <van-grid-item text="评论" />
            <van-grid-item text="点赞" />
            <van-grid-item text="收藏" />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { toSearch } from "@/api/search.js";
export default {
  name: "results",
  data() {
    return {
      page: 1,
      per_page: 10,
      resultList: []
    };
  },
  async created() {
    //   点击了历史搜索
    let data = {
      page: this.page,
      per_page: this.per_page,
      q: this.$route.params.key
    };
    let res = await toSearch(data);
    this.resultList = res.data.data.results;
  }
};
</script>

<style lang="less" scoped>
#results {
  margin-top: 46px;
  .van-icon-arrow-left {
    color: white;
  }
  .van-cell-group{
      background-color: #f0f3f6;
  .van-cell{
      margin-bottom: 10px;
  }}
}
</style>