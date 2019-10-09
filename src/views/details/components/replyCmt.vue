<template>
  <div>
    <van-popup
      v-model=" details.replyShow"
      position="bottom"
      :style="{ height: '80%',padding:'15px' }"
      @open="openPop"
    >
      <h5>当前评论</h5>
      <comment :details="details.cmt"></comment>
      <h6>当前评论的回复</h6>
      <van-list
        v-model="popLoading"
        :finished="popFinished"
        finished-text="没有更多了"
        @load="popOnLoad"
      >
        <comment v-for="item in replyList" :details="item"></comment>
      </van-list>
      <sendCmt :id="details.cmt.com_id.toString()" :art_id="art_id" @add="onAdd"></sendCmt>
    </van-popup>
  </div>
</template>

<script>
import comment from "../components/comment";
import sendCmt from "../components/sendCmt";
import { getCmt } from "@/api/comment";
export default {
  name: "replyCmt",
  props: ["details","art_id"],
  components: {
    comment,
    sendCmt
  },
  data() {
    return {
      popLoading: false,
      popFinished: false,
      params: {
        type: "c",
        source: "",
        offset: undefined,
        limit: 10
      },
      replyList: []
    };
  },
  methods: {
    // 增加到list
    onAdd(value){
     this.replyList.push(value);
     this.details.cmt.reply_count++
    },

    async popOnLoad() {
      this.params.source = this.details.cmt.com_id.toString();
      let res = await getCmt(this.params);
      this.params.offset = res.data.data.last_id;
      this.replyList.push(...res.data.data.results);
      if (this.params.offset == res.data.data.end_id) {
        this.popFinished = true;
      }
      this.popLoading = false;
    },
    openPop() {
      this.popFinished = false;
      this.params.offset = undefined;
      this.replyList = [];
    }
  }
};
</script>

<style>
</style>