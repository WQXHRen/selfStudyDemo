<template>
  <div>
    <van-dialog
      :value="showDialog"
      :showConfirmButton="false"
      :beforeClose="close"
      :closeOnClickOverlay="true"
    >
      <van-cell-group v-if="noLike">
        <van-cell title="不喜欢此文章" icon="location-o" @click="dislikes" />
        <van-cell title="举报" is-link icon="location-o" @click="noLike=false" />
        <van-cell title="拉黑" icon="location-o" @click="pullBlack" />
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="noLike=true" />
        <van-cell
          v-for="(item,index) in informList"
          :title="item"
          icon="location-o"
          @click="reports(index)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { dislikes, pullBlack, reportsArt } from "@/api/getArticle.js";
export default {
  name: "inform",
  props: ["showDialog", "item", "artList"],
  data() {
    return {
      noLike: true,
      informList: [
        "其他问题",
        "标题夸张",
        "低俗色情",
        "错别字多",
        "旧闻重复",
        "广告软文",
        "内容不实",
        "涉嫌违法犯罪",
        "侵权"
      ],
      remark: ""
    };
  },
  methods: {
    //   举报文章
    async reports(type) {
      let params = {
        target: this.item.art_id,
        type,
        remark: this.remark
      };
      let res = await reportsArt(params);
      
      this.artList.forEach((item,index)=>{
        if (item.art_id==this.item.art_id) {
           this.artList.splice(index,1)
        }
      })
      this.$emit("update:showDialog", false);
      if (res.status == 201) {
        this.$toast("举报成功!");
      }
    },

    //   拉黑用户
    async pullBlack() {
      let res = await pullBlack(this.item.aut_id);
      for (var i = 0; i < this.artList.length; i++) {
        if (this.artList[i].aut_id == this.item.aut_id) {
          this.artList.splice(i, 1);
          i--;
        }
      }

      if (res.status == 201) {
        this.$toast("拉黑成功!");
      } else {
        this.$toast("拉黑失败!");
      }
      this.$emit("update:showDialog", false);
    },
    //   不感兴趣
    async dislikes() {
      let res = await dislikes(this.item.art_id);
      //  console.log(res);
      this.$emit("update:showDialog", false);
      this.artList.forEach((item, index) => {
        if (item.art_id == this.item.art_id) {
          this.artList.splice(index, 1);
        }
      });
    },
    //   关闭弹窗
    close(action, done) {
      this.$emit("update:showDialog", false);
      done();
    }
  }
};
</script>

<style>
</style>