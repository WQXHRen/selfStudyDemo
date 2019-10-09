<template>
  <van-cell class="comment">
    <div class="commentBox">
      <van-field class="commentIpt" autosize left-icon="edit" placeholder="写评论" v-model="content" />
      <van-button type="danger" size="small" @click="send">发送</van-button>
      <van-button icon="star-o" size="small"></van-button>
    </div>
  </van-cell>
</template>

<script>
import { sendCmt } from "@/api/comment.js";
export default {
  name: "sendCmt",
  props: ["details"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    //   发表评论
    async send() {
      if (!this.content) {
        this.$toast("输入点什么吧!");
        return;
      }
      let res = await sendCmt({
        target: this.details.art_id,
        content: this.content,
        art_id: undefined
      });
      this.$emit("add", res.data.data.new_obj);
      this.content = "";
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  position: fixed;
  bottom: 0;
  .commentBox {
    display: flex;
    align-items: center;
    .commentIpt {
      background-color: #eee;
      border-radius: 22px;
      margin-right: 10px;
      padding: 5px 8px;
    }
  }
}
</style>