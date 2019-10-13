<template>
  <div id="xiaoZhi" ref="xiaoZhi">
    <ul class="content">
      <li class="row" v-for="item in chatList">
        <div class="row_div">
          <template v-if="item.isMe">
            <img class="imgright" src="./img/photo.jpg" />
          </template>

          <template v-else>
            <img class="imgleft" src="./img/xzPhoto.jpg" />
          </template>

          <span :class="item.isMe?'spanright':'spanleft'">{{item.msg}}</span>
        </div>
        <div class="time">{{item.timestamp | getTime}}</div>
      </li>
    </ul>

    <!-- 顶部栏 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back();" />
    <!-- 底部栏 -->
    <div class="footer">
      <div class="footerWrap">
        <van-field class="iptContent" v-model="msg" :border="true" @keyup.enter="sendMsg" />
        <van-button size="small" type="primary" @click="sendMsg">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import dayjs from "dayjs";
export default {
  name: "xiaoZhi",
  data() {
    return {
      msg: "",
      chatList: [
        {
          isMe: false,
          msg: "随便婊哥",
          timestamp: 1570891176849
        },
        {
          isMe: true,
          msg: "婊哥随便",
          timestamp: 1570891176849
        }
      ],
      socket: ""
    };
  },
  methods: {
    sendMsg() {
      let myMSg = {
        isMe: true,
        msg: this.msg,
        timestamp: parseInt(new Date().getTime() / 1000)
      };

      this.chatList.push(myMSg);
      this.socket.emit("message", myMSg);
      this.msg = "";
    }
  },
  filters: {
    getTime(val) {
      return dayjs(val * 1000).format("HH:mm:ss");
    }
  },
  created() {
    this.socket = io("http://ttapi.research.itcast.cn", {
      query: {
        a: "sss"
      }
    });
    this.socket.on("message", data => {
      data.isMe = false;
      this.chatList.push(data);
    });
  },
  watch: {
    chatList() {
      this.$nextTick(() => {
        this.$refs.xiaoZhi.scrollTop = this.$refs.xiaoZhi.scrollHeight
      });
    }
  }
};
</script>

<style src="./css/xiaozhi.css" scoped>
</style>
