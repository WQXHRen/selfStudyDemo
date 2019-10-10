<template>
  <div id="profile">
    <van-nav-bar title="个人信息" right-text="保存" left-arrow @click-right="onClickRight" />
    <van-cell-group>
      <van-cell class="photoCell" title="头像" is-link value="default" @click="popShow=true;type=1">
        <template slot="default">
          <img class="photo" :src="user.photo" alt />
        </template>
      </van-cell>

      <van-cell title="名字" is-link :value="user.name" @click="popShow=true;type=2" />
      <van-cell title="性别" is-link :value="user.gender==0?'男':'女'" @click="popShow=true;type=3" />
      <van-cell title="出生日期" is-link :value="user.birthday" @click="popShow=true;type=4" />
    </van-cell-group>
    <!-- 弹出层 -->
    <van-popup class="my_pop" v-model="popShow" round position="bottom" :style="{ height: '35%' }">
      <van-uploader class="pop_photo" preview-size="120px" v-if="type==1" v-model="fileList" :max-count="1"/>

      <van-field class="pop_name" v-else-if="type==2" v-model="userName" placeholder="请输入用户名" />

      <van-picker
      class="pop_gender"
        v-else-if="type==3"
        show-toolbar
        title="选择性别"
        :default-index="user.gender"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />

      <van-datetime-picker class="pop_date" title="选择出生日期" v-else v-model="currentDate" type="date" @confirm="chooseDate"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user.js";
export default {
  name: "profile",
  data() {
    return {
      user: {},
      type: "",
      popShow: false,
      userName: "",
      columns: ["男", "女"],
      fileList: [{ url: "https://img.yzcdn.cn/vant/cat.jpeg" }],
      currentDate: new Date()
    };
  },
  methods: {
    onClickRight() {},
    onCancel() {
        this.popShow=false;
    },
    onConfirm() {
        this.popShow=false;
        
        
    },

    chooseDate(val){
        // this.currentDate = new Date(picker);
        console.log(val);
        
    }
  },
  async created() {
    let res = await getUserInfo();
    console.log(res);
    this.user = res.data.data;
    this.currentDate = new Date(res.data.data.birthday)
  }
};
</script>

<style lang="less" scoped>
#profile {
  margin-top: 46px;
  .photoCell {
    display: flex;
    align-items: center;
    .photo {
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }
  }
  .my_pop{
    .pop_photo,
    .pop_name
    {   
        position: absolute;
        left: 50%;
        top: 50%;
        transform:translate(-50%,-50%); 
    }
  }
}
</style>