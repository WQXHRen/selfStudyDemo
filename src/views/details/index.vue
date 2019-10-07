<template>
  <div id="details">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell>
        <template slot="title">
          <h3>123</h3>
        </template>
      </van-cell>

      <!-- 作者信息 -->
      <author></author>

      <!-- 正文 -->
      <van-cell>
        <template slot="title">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis rerum sequi maiores aliquam ex! Culpa odio dolorem rem aspernatur dignissimos, dicta tempore optio corporis excepturi sunt ea pariatur perspiciatis impedit?
            Exercitationem, obcaecati, rem corrupti optio explicabo blanditiis voluptates itaque reiciendis nisi atque, minus accusamus! Quasi accusantium, atque nihil minima autem et at laudantium doloribus fugiat vel, voluptates laboriosam amet culpa.
            Explicabo quia quas architecto unde. Eveniet dolore hic voluptate temporibus eius optio sapiente mollitia officia odit nam, perferendis modi iusto officiis maiores veritatis voluptatem ut dicta similique in dolor ad.
            Obcaecati quos libero fugit modi, facilis officiis assumenda, ipsa voluptatibus natus laboriosam repellendus commodi ratione! Doloremque iure voluptatum facere ut distinctio sapiente minus, possimus dolorum quaerat illum ab. Odit, voluptatibus?
          </div>
        </template>
      </van-cell>

      <!-- 点赞,喜欢 -->
      <van-cell>
        <template slot="title">
          <van-button size="small" icon="star-o" type="danger">点赞</van-button>
          <van-button size="small" icon="like-o">不喜欢</van-button>
        </template>
      </van-cell>

      <!-- 用户评论 -->
      <van-cell>
        <template slot="title">
          <div class="aut_info">
            <div>
              <img src alt />
            </div>
            <van-cell>
              <template slot="title">
                <span>匿名用户</span>
                <br />
                <span>评论的内容</span>
                <br />
                <span>
                  1个月前&nbsp;&nbsp;
                  <span>回复</span>
                </span>
              </template>
            </van-cell>
            <van-button size="small" icon="good-job-o">666</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 写评论 -->
      <van-cell>
        <div class="commentBox">
          <van-field class="commentIpt" autosize  left-icon="edit" placeholder="写评论" />
          <van-button type="danger" size="small">发送</van-button>
          <van-button icon="star-o" size="small"></van-button>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getDetails } from "@/api/getArticle.js";
import author from "./components/author.vue";
export default {
  name: "Details",
  components: { author },
  data() {
    return {
      art_id: this.$route.params.art_id,
      art_details: ""
    };
  },
  async created() {
    let res = await getDetails(this.art_id);
    console.log(res);
    this.art_details = res.data.data;
  }
};
</script>

<style lang="less" scoped>
#details {
  margin-top: 46px;
  .van-icon-arrow-left {
    color: white;
  }
  .commentBox {
    display: flex;
    align-items: center;
    .commentIpt {
      background-color: #eee;
      border-radius: 22px;
      margin-right: 10px;
      padding: 5px 8px;
    }
  }
}
</style>