<template>
  <div>
    <van-popup
      v-model="show"
      @close="$emit('changeShow',false)"
      closeable
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '95%' }"
    >
      <van-row class="my_row">
        <van-col span="12">我的频道</van-col>
        <van-col class="editBtn" span="12">
          <van-button color="red" round size="mini" plain>编辑</van-button>
        </van-col>
      </van-row>

      <van-row gutter="15">
        <van-col span="6" v-for="(item,index) in channels">
          <van-button size="small" color="#7232dd">{{item.name}}</van-button>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">频道推荐</van-col>
      </van-row>

      <van-row gutter="15">
        <van-col span="6">
          <van-button size="small" color="#7232dd">单色按钮</van-button>
        </van-col>
        <van-col span="6">
          <van-button size="small" color="#7232dd">单色按钮</van-button>
        </van-col>
        <van-col span="6">
          <van-button size="small" color="#7232dd">单色按钮</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "channel",
  props: ["show","channels"],
  model: {
    prop: "show",
    event: "changeShow"
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.van-popup {
  padding: 20px;
  box-sizing: border-box;
  .van-row {
    margin-top: 15px;
    font-size: 14px;
    .van-col{
        margin-top: 10px;
    }
  }
  .my_row {
    margin-top: 40px;
    .editBtn {
      text-align: right;
    }
  }
}
</style>