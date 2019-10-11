<template>
  <div id="details">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell>
        <template slot="title">
          <h2>{{art_details.title}}</h2>
        </template>
      </van-cell>

      <!-- 作者信息 -->
      <author :art_details="art_details"></author>

      <!-- 正文 -->
      <van-cell>
        <template slot="title">
          <div class="content" v-html="art_details.content"></div>
        </template>
      </van-cell>

      <!-- 点赞文章 -->
      <van-cell :border="false">
        <template slot="title">
          <div class="zanORcai">
            <div class="artZan" @click="islike">
              <van-icon
                :name="this.art_details.attitude==1?'good-job':'good-job-o'"
                size="20px"
                :color="this.art_details.attitude==1?'red':'inherit'"
              />
              <span :class="{DZan:this.art_details.attitude==1}">&nbsp;{{this.art_details.attitude==1?'取消赞':'点赞'}}</span>
            </div>

            <!-- 踩 -->
            <div class="artCai" @click="doTrample">
              <van-icon class="iconCai" :name="this.art_details.attitude==0?'good-job':'good-job-o'" size="20px" />
              <span>&nbsp;{{this.art_details.attitude==0?'算了吧':'踩'}}</span>
            </div>
          </div>
        </template>
      </van-cell>

      <!-- 用户评论 -->
      <van-list v-model="isLoading" :finished="isfinished" finished-text="没有更多了" @load="onLoad">
        <comment v-for="item in commentList" :details="item" @currentCmt="currentCmt = $event"></comment>
      </van-list>

      <!-- 发表评论 -->
      <sendCmt :id="art_details.art_id" :art_id="undefined" @add="commentList.unshift($event)"></sendCmt>

      <!-- 回复评论 -->
      <replyCmt :details="currentCmt" :art_id="art_id"></replyCmt>
    </van-cell-group>
  </div>
</template>

<script>
import { getDetails } from "@/api/getArticle.js";
import { likeArt, unLikeArt, trample, unTrample } from "@/api/user.js";
import { getCmt } from "@/api/comment.js";
import author from "./components/author";
import comment from "./components/comment";
import sendCmt from "./components/sendCmt";
import replyCmt from "./components/replyCmt";
export default {
  name: "Details",
  components: { author, comment, sendCmt, replyCmt },
  data() {
    return {
      currentCmt: {},
      art_id: this.$route.params.art_id,
      art_details: "",
      isLoading: false,
      isfinished: false,
      commentList: [],
      query: {
        type: "a",
        source: this.$route.params.art_id,
        offset: undefined,
        limit: 10
      }
    };
  },
  methods: {
    // 点赞文章
    async islike() {
      if (this.art_details.attitude == 1) {
        await unLikeArt(this.art_id.toString());
        this.art_details.attitude = -1;
      } else if (this.art_details.attitude != 1) {
        await likeArt(this.art_id.toString());
        this.art_details.attitude = 1;
      }
    },
    // 踩这篇文章
    async doTrample() {
      if (this.art_details.attitude != 0) {
        let res = await trample(this.art_id);
        this.art_details.attitude = 0;
      } else {
        let res = await unTrample(this.art_id);
        this.art_details.attitude = -1;
      }
    },

    // 评论列表
    async onLoad() {
      let res = await getCmt(this.query);
      // console.log(res);
      this.query.offset = res.data.data.last_id;
      this.commentList.push(...res.data.data.results);
      if (res.data.data.last_id == res.data.data.end_id) {
        this.isfinished = true;
      }
      this.isLoading = false;
    }
  },
  async created() {
    let res = await getDetails(this.art_id);
    this.art_details = res.data.data;
  }
};
</script>

<style lang="less" scoped>
#details {
  margin-top: 46px;
  margin-bottom: 54px;
  .van-icon-arrow-left {
    color: white;
  }
  /deep/ .content {
    word-break: break-all;
    img {
      max-width: 100%;
    }
  }
  .zanORcai {
     display: flex;
      // align-items: center;
      justify-content: center;
    .artZan,
    .artCai {
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .DZan {
        color: red;
      }
    }
    .artCai .iconCai {
      transform: rotate(180deg);
    }
  }
}
</style>