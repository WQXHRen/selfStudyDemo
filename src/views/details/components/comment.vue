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
              <span>{{details.aut_name}}</span>
              <br />
              <span v-html="details.content"></span>
              <br />
              <span>
               {{details.pubdate | relvTime}}&nbsp;&nbsp;
                <span>回复</span>
              </span>
            </template>
          </van-cell>
          <van-button size="small" icon="good-job-o">666</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
    name:"cmt",
    props:['details']
};
</script>

<style>
.aut_photo{
    width: 50px;
    height: 50px;
    border-radius: 50%
}
</style>