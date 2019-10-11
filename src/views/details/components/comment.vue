<template>
  <div id="comment">
    <van-cell>
      <template slot="title">
        <div class="aut_info">
          <div>
            <img class="aut_photo" :src="details.aut_photo" alt />
          </div>
          <van-cell>
            <template slot="title">
              <p
                style="fontSize:14px;margin:2.5px;font-weight:550;line-height:1.3"
              >{{details.aut_name}}</p>

              <p style="fontSize:12px;margin:2.5px;line-height:1.1" v-html="details.content"></p>

              <p style="fontSize:10px;margin:3px;line-height:1;color:#ccc;">
                {{details.pubdate | relvTime}}&nbsp;&nbsp;
                <span
                  style="color:#202529;float:right" @click="showPopup"
                >回复({{details.reply_count}})</span>
              </p>
            </template>
          </van-cell>
          <van-button
            @click="doZan"
            :class="details.is_liking?'Zan':''"
            size="small"
            :icon="details.is_liking?'good-job':'good-job-o'"
          >{{details.like_count}}</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { likeCmt, unLikeCmt } from "@/api/comment.js";
export default {
  name: "cmt",
  props: ["details"],
  methods: {
    // 点击恢复评论
    showPopup(){
      this.$emit("currentCmt",{
        cmt:this.details,
        replyShow:true
      })
    },

    // 点赞评论
    async doZan() {
      if (this.details.is_liking) {
        this.details.is_liking = !this.details.is_liking;
        await unLikeCmt(this.details.com_id);
        this.details.like_count--;
      } else {
        this.details.is_liking = !this.details.is_liking;
        await likeCmt(this.details.com_id);
        this.details.like_count++;
      }
    }
  }
};
</script>

<style scoped>
.aut_photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.aut_info {
  display: flex;
  align-items: center;
}
.van-cell {
  padding: 0px 15px 2px !important;
}
.Zan {
  color: red;
}
</style>