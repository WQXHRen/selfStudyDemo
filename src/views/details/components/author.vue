<template>
  <div id="author">
    <van-cell>
      <template slot="title">
        <div class="aut_info">
          <div>
            <img src alt />
          </div>
          <van-cell>
            <template slot="title">
              <span>两天</span>
              <br />
              <span>1个月前</span>
            </template>
          </van-cell>
          <van-button type="danger" size="small">关注</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#author {
    .aut_info{
        display: flex;
        align-items: center;
    }
}
</style>