<template>
  <div id="home">
    <van-nav-bar title="首页" />

    <van-tabs v-model="active" @change="tabChange" class="my_tabs">
      <van-tab v-for="(e,i) in channels" :key="i" :title="e.name">
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="已经到底了!" @load="onLoad">
            <van-cell v-for="(item,index) in articleList" :key="index" :title="item.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from "../../api/channel";
import { Article } from "../../api/getArticle";
export default {
  name: "home",
  data() {
    return {
      pullLoading: false,
      channels: [],
      active: 0,
      articleList: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    //   点击别的tab
    async tabChange() {
      let res = await this.getArticle();
      console.log(res);
      this.articleList = res.data.data.results;
      if (res.data.data.results.length == 0) {
        this.finished = true;
      }
    },

    //   下拉刷新
    async onRefresh() {
      let res = await this.getArticle();
      this.articleList.unshift(...res.data.data.results);
      this.pullLoading = false;
      //   console.log(res);
    },

    //   获取频道文章
    async getArticle() {
      let data = {
        channel_id: this.channels[this.active].id,
        timestamp: Date.now(),
        with_top: 1
      };
      return await Article(data);
    },

    async onLoad() {
      // 异步更新数据
      let article = await this.getArticle();
      this.articleList.push(...article.data.data.results);
      // 加载状态结束
      this.loading = false;
    }
  },
  async created() {
    let res = await getChannel();
    // console.log(res);
    this.channels = res.data.data.channels;

    // let article = await this.getArticle();
    // this.articleList.push(...article.data.data.results);
    // // console.log(article);
  }
};
</script>

<style lang="less" scoped>
#home {
  margin-top: 90px;
  margin-bottom: 44px;
  /deep/.van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>