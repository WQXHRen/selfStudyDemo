<template>
  <div id="mine">
    <!-- 上半部分 -->
    <div class="top">
      <!-- 上上 -->
      <div class="top_top">
        <div>
          <img class="photo" src="../../../../../vscode插件描述.jpg" alt />
        </div>
        <div class="userName">
          <div>黑马小工具</div>
          <van-button class="V-btn" round size="mini">认证工具</van-button>
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
          <div>8</div>
          <div>动态</div>
        </div>
        <div class="t_b">
          <div>8</div>
          <div>动态</div>
        </div>
        <div class="t_b">
          <div>8</div>
          <div>动态</div>
        </div>
      </div>
    </div>
    <van-divider :style="{ borderColor: '#202529', padding: '0px' ,margin:'0px' }"/>
    <!-- 下半部分 -->
    <div class="bottom">
      <div class="bottom_top">
        <div class="b_t">
          <div>图片</div>
          <div>文字</div>
        </div>
        <div class="b_t">
          <div>图片</div>
          <div>文字</div>
        </div>
        <div class="b_t">
          <div>图片</div>
          <div>文字</div>
        </div>
      </div>
      <div class="bottom_bottom">
        <van-cell-group>
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
export default {};
</script>

<style lang="less" scoped>
#mine {
  font-size: 14px;
  .top {
    // background-color: #ccc;
    padding: 10px;
    .top_top {
      display: flex;
      align-items: center;
      .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .userName {
        margin-left: 15px;
        div {
          margin-bottom: 5px;
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
        background-color: rgba(32, 37, 41,.8);
        color: white;
        padding-right: 20px;
        text-align: right;
      }
    }
    .top_bottom {
      margin: 30px 0px 20px;
      display: flex;
      justify-content: space-around;
      .t_b {
        text-align: center;
      }
    }
  }
  .bottom {
    padding: 10px;
    // background-color: aquamarine;
    .bottom_top {
      margin: 20px 0px 10px;
      display: flex;
      justify-content: space-around;
      .b_t {
        text-align: center;
      }
    }
    .mineCell{
        padding-left: 0px;
        padding-right: 0px;

    }
  }
}
</style>