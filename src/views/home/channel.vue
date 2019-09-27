<template>
  <div>
    <van-popup
      v-model="show"
      round
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '95%' }"
    >
      <van-row class="cross_row">
        <van-icon name="cross" @click="$emit('update:show',false)" />
      </van-row>
      <van-row class="my_row">
        <van-col span="12">我的频道</van-col>
        <van-col class="editBtn" span="12">
          <van-button color="red" round size="mini" plain @click="clickEdit">{{editText}}</van-button>
        </van-col>
      </van-row>

      <van-row gutter="7">
        <van-col span="6" v-for="(item,index) in channels">
          <van-button
            size="small"
            :color="active==index?'#F00':'#000'"
            plain
            @click="$emit('update:active', index)"
          >
            {{item.name}}
            <van-icon
              class="close-icon"
              name="clear"
              v-show="isEdit&&item.name!='推荐'"
              @click="doDel(item)"
            />
          </van-button>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">频道推荐</van-col>
      </van-row>

      <van-row gutter="7">
        <van-col span="6" v-for="(item,index) in otherChannel">
          <van-button
            size="small"
            color="#000"
            :disabled="!isEdit"
            plain
            @click="addChannel(item)"
          >{{item.name}}</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannel, setChannel } from "@/api/channel.js";
export default {
  name: "channel",

  props: ["show", "channels", "active"],

  data() {
    return {
      AllChannel: [],
      isEdit: false,
      editText: "编辑"
    };
  },

  methods: {
    //   删除频道
    doDel(item) {
      this.channels.splice(this.channels.indexOf(item), 1);
    },

    async clickEdit() {
      if (this.isEdit) {
        let channels = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 1
          };
        });

        let res = await setChannel(channels);
      }
      this.isEdit = !this.isEdit;
      this.editText = this.isEdit ? "完成" : "编辑";
    },

    addChannel(ele) {
      this.channels.push(ele);
    }
  },

  async created() {
    let res = await getAllChannel();
    // console.log(res);
    this.AllChannel = res.data.data.channels;
  },

  computed: {
    otherChannel() {
      // let otherChannel = [];
      // for (var i = 0; i < this.AllChannel.length; i++) {
      //   let flag = true;
      //   for (var j = 0; j < this.channels.length; j++) {
      //     if (this.AllChannel[i].id == this.channels[j].id) {
      //       flag = false;
      //     }
      //   }
      //   if (flag) {
      //     otherChannel.push(this.AllChannel[i]);
      //   }
      // }
      // return otherChannel;
      // 取得我的频道的id数组
      let ids = this.channels.map(item => item.id);

      //filter 返回 一个新数组 包含了满足条件的true 的所有元素
      let otherChannel = this.AllChannel.filter(item => !ids.includes(item.id));
      
      return otherChannel
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  padding: 20px;
  box-sizing: border-box;
  .cross_row.van-row {
    text-align: right;
    font-size: 20px;
    margin: 0;
  }
  .van-row {
    margin-top: 15px;
    font-size: 14px;
    .van-col {
      margin-top: 10px;
      .close-icon {
        position: absolute;
        top: -8px;
        right: -8px;
      }
      .van-button--round .van-button__text {
        color: red;
      }
    }
  }
  .my_row {
    margin-top: 5px;
    .editBtn {
      text-align: right;
    }
  }
}
</style>