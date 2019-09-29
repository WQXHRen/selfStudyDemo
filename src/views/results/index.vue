<template>
  <div id="results">
    <van-nav-bar title="搜索结果" left-arrow @click-left="onClickLeft"/>
    <van-cell-group>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in resultList" :title="item.title">
          <template slot="label">
            <p>{{item.aut_name}}</p>
            <van-grid :column-num="3">
              <van-grid-item text="评论" />
              <van-grid-item text="点赞" />
              <van-grid-item text="收藏" />
            </van-grid>
          </template>
        </van-cell>
      </van-list>
    </van-cell-group>
  </div>
</template>

<script>
import { toSearch } from "@/api/search.js";
export default {
  name: "results",
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 50,
      resultList: []
    };
  },
  methods: {
    //   返回
    onClickLeft(){
    this.$router.push('/search');
    },

    async onLoad() {
      //   点击了历史搜索

      let data = {
        page: this.page,
        per_page: this.per_page,
        q: this.$route.params.key
      };
      let res = await toSearch(data);
      this.page++;
        console.log(res);
      this.resultList.push(...res.data.data.results);
      this.loading = false;
      console.log(res.data.data.total_count);
      
      if (Math.ceil(res.data.data.total_count / this.per_page) < this.page) {
        console.log(11);

        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#results {
  margin-top: 46px;
  .van-icon-arrow-left {
    color: white;
  }
  .van-cell-group {
    background-color: #f0f3f6;
    .van-cell {
      margin-bottom: 10px;
    }
  }
}
</style>