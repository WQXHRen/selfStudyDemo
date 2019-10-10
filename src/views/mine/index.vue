<template>
  <div id="mine">
    <!-- 上半部分 -->
    <div class="top">
      <div class="topBg">
        <!-- 上上 -->
        <div class="top_top" @click="$router.push('/profile')">
          <div>
            <img class="photo" :src="user.photo" alt />
          </div>
          <div class="userName">
            <div>{{user.name}}</div>
            <van-button class="V-btn" color="black" plain round size="mini">认证工具</van-button>
          </div>
          <div class="read">
            <van-icon class="resdIcon" size="25px" color="white" name="todo-list-o" />
            <div>今日阅读</div>
            <div>5分钟</div>
          </div>
        </div>
        <!-- 上下 -->
        <div class="top_bottom">
          <div class="t_b">
            <div>{{user.art_count}}</div>
            <div>动态</div>
          </div>
          <div class="t_b">
            <div>{{user.follow_count}}</div>
            <div>关注</div>
          </div>
          <div class="t_b">
            <div>{{user.fans_count}}</div>
            <div>粉丝</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-divider :style="{ borderColor: '#202529', padding: '0px' ,margin:'0px' }" /> -->
    <!-- 下半部分 -->
    <div class="bottom">
      <div class="bottom_top">
        <div class="b_t">
          <div><van-icon size="20px" name="star-o" /></div>
          <div>收藏</div>
        </div>
        <div class="b_t">
          <div><van-icon size="20px" name="clock-o" /></div>
          <div>历史</div>
        </div>
        <div class="b_t">
          <div><van-icon size="20px" name="edit" /></div>
          <div>作品</div>
        </div>
      </div>
      <div class="bottom_bottom">
        <van-cell-group class="my-cell-group">
          <van-cell class="mineCell" title="消息通知" is-link />
          <van-cell class="mineCell" title="实名认证" is-link />
          <van-cell class="mineCell" title="用户反馈" is-link />
          <van-cell class="mineCell" title="小智同学" is-link />
          <van-cell class="mineCell" title="系统设置" is-link />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from "@/api/user.js"
export default {
  name:"mine",
  data(){
    return {
      user:{}
    }
  },
  methods:{

  },
  async created(){
    let res = await getUser()
    this.user = res.data.data;
    console.log(res);
  }
};
</script>

<style lang="less" scoped>
#mine {
  font-size: 14px;
  background-color: #eeeded;
  .top {
    .topBg {
      background-color: rgba(255, 255, 255, 0.8);
      
    }
    background: url("./images/报纸.jpg") no-repeat;
    background-size: cover;
    background-position: -20px -140px;
    // background-color: #ccc;
    .top_top {
      display: flex;
      align-items: center;
      padding: 30px 15px 0px;
      .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .userName {
        margin-left: 15px;
        div {
          margin-bottom: 5px;
          font-weight: 700;
          font-size: 16px;
        }
        .V-btn {
          font-size: 8px;
          padding: 0px 15px;
          height: 18px;
          line-height: 1;
        }
      }
      .read {
        .resdIcon {
          position: absolute;
          left: 15px;
          top: 8px;
        }
        position: absolute;
        right: 0px;
        width: 110px;
        height: 40px;
        border-radius: 20px 0px 0px 20px;
        background-color: rgba(32, 37, 41, 0.5);
        color: white;
        padding-right: 20px;
        text-align: right;
      }
    }
    .top_bottom {
      margin: 30px 0px 5px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-around;
      .t_b {
        text-align: center;
      }
    }
  }
  .bottom {
    // background-color: aquamarine;
    .bottom_top {
      margin: 8px 0px 8px;
      padding: 10px 0px 10px;
      display: flex;
      background-color: #ffffff;
      justify-content: space-around;
      .b_t {
        text-align: center;
      }
    }
    .bottom_bottom {
    
    }
   
  }
}
</style>