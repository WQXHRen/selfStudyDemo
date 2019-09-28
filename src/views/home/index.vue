<template>
  <div id="home">
    <van-nav-bar title="首页" />
    <van-tabs :value="tabActive" @change="tabChange" class="my_tabs">
      <van-tab v-for="(e,i) in channels" :key="i" :title="e.name">
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="已经到底了!" @load="onLoad">
            <van-cell
              v-for="(item,index) in articleList"
              :key="index"
              :title="item.title"
              label="描述信息"
            >
              <template slot="label">
                <van-grid :border="false" :column-num="3" v-if="item.cover.type>0">
                  <van-grid-item v-for="url in item.cover.images">
                    <van-image :src="url" />
                  </van-grid-item>
                </van-grid>

                <div>
                  <span class="ati_info">作者:{{item.aut_name}}</span>
                  <span class="ati_info">评论:{{item.comm_count}}</span>
                  <span class="ati_info">{{item.pubdate | relvTime}}</span>
                  <van-icon style="float:right" name="ellipsis" @click="dialogShow=true"/>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div class="tab_right_btn">
        <van-icon name="plus" @click="changeShow" />
      </div>
    </van-tabs>
    <channel :show.sync="changeShow" :channels="channels" :active.sync="tabActive"></channel>
    <inform :showDialog.sync="dialogShow"></inform>
  </div>
</template>

<script>
import { getChannel } from "../../api/channel";
import { Article } from "../../api/getArticle";
import {
  getUserInfo,
  getChannel as localChannel,
  saveChannel
} from "../../storage/";

import channel from "./channel.vue";
import inform from "./inform.vue"
export default {
  name: "home",
  components: {
    channel,
    inform
  },
  data() {
    return {
      dialogShow:false,
      changeShow: false,
      pullLoading: false,
      channels: [],
      tabActive: 0,
      articleList: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    //   点击别的tab
    async tabChange() {
      this.articleList = [];
      this.finished = false;
      let res = await this.getArticle();
      //   console.log(res);
      this.articleList.push(...res.data.data.results);
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
        channel_id: this.channels[this.tabActive].id,
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
    if (getUserInfo() || !localChannel()) {
      let res = await getChannel();
      let localList = localChannel();
      if (localList) {
        // 将本地保存的频道去重后加到频道list里
        let list = localList.filter(item => {
          let flag = true;
          res.data.data.channels.forEach(fitem => {
            if (fitem.id == item.id) {
              flag = false;
              return;
            }
          });
          return flag;
        });
        res.data.data.channels.push(...list);
      }
      this.channels = res.data.data.channels;
      saveChannel(this.channels);
    } else {
      this.channels = localChannel();
    }

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
  .ati_info {
    margin-right: 10px;
  }
  .van-nav-bar {
    height: 45.6px;
  }
  /deep/.van-tabs__wrap {
    position: fixed;
    top: 45.6px;
    left: 0;
    width: 87%;
    z-index: 998;
  }
  .tab_right_btn {
    width: 13%;
    background-color: #ffffff;
    text-align: center;
    line-height: 44px;
    position: fixed;
    top: 46px;
    right: 0;
    z-index: 999;
  }
}
</style>