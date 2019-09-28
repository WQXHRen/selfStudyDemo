<template>
  <div>
    <van-dialog
      :value="showDialog"
      :showConfirmButton="false"
      :beforeClose="close"
      :closeOnClickOverlay="true"
    >
      <van-cell-group v-if="noLike">
        <van-cell title="不喜欢此文章" icon="location-o" />
        <van-cell title="举报" is-link icon="location-o" @click="noLike=false" />
        <van-cell title="拉黑" icon="location-o" />
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="noLike=true"/>
        <van-cell v-for="item in informList" :title="item" icon="location-o" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ["showDialog"],
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
      ]
    };
  },
  methods: {
    close(action, done) {
      this.$emit("update:showDialog", false);
      done();
    }
  }
};
</script>

<style>
</style>