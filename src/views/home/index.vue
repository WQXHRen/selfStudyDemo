<template>
  <div id="home">
    <van-nav-bar title="首页" />

    <van-tabs v-model="active" class="my_tabs">
      <van-tab title="标签 1">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index) in channels" :key="index" :title="item.name" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from "../../api/channel";
export default {
  data() {
    return {
      channels: [],
      active: 0,
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  },
  async created() {
    let res = await getChannel();
    // console.log(res);
    this.channels = res.data.data.channels;
  }
};
</script>

<style lang="less" scoped>
#home {
  margin-top: 90px;

  /deep/.van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>