<template>
  <div>
    <router-view></router-view>
    <van-tabbar
      route
      class="menu-tabbar"
      v-model="active"
      active-color="#000"
      inactive-color="#CBCBCB"
    >
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o">视频</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
.menu-tabbar {
  border-top: 1px solid black !important;
}
</style>