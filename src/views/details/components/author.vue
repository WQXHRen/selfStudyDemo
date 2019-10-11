<template>
  <div id="author">
    <van-cell>
      <template slot="title">
        <div class="aut_info">
          <div>
            <img class="photo" :src="art_details.aut_photo" alt />
          </div>
          <van-cell>
            <template slot="title">
              <span>{{art_details.aut_name}}</span>
              <br />
              <span>{{art_details.pubdate | relvTime}}</span>
            </template>
          </van-cell>
          <van-button
            v-if="art_details.is_followed"
            size="small"
            @click="doNoFollow(art_details.aut_id)"
          >取关</van-button>
          <van-button v-else type="danger" size="small" @click="doFollow(art_details.aut_id)">关注</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { follow, noFollow } from "@/api/user.js";
export default {
  name: "aut",
  props: ["art_details"],
  methods: {
    async doNoFollow(aut_id) {
       await noFollow(aut_id);
       this.art_details.is_followed = !this.art_details.is_followed
       
    },
   async doFollow(aut_id) {
     try {
       let res = await follow(aut_id);
       this.art_details.is_followed = !this.art_details.is_followed
     } catch (error) {
       if (error.response.data.message=="User cannot follow self.") {
         this.$toast('不要关注自己哦!');
       }
     }
    }
  }
};
</script>

<style lang="less" scoped>
#author {
  .aut_info {
    display: flex;
    align-items: center;
    .photo {
      border-radius: 25px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>