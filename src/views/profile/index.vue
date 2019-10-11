<template>
  <div id="profile">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back();"
      @click-right="onSave"
    />
    <van-cell-group>
      <van-cell class="photoCell" title="头像" is-link value="default" @click="uploType=true">
        <template slot="default">
          <img class="photo" :src="user.photo" alt />
        </template>
      </van-cell>

      <van-cell title="名字" is-link :value="user.name" @click="popShow=true;type=2" />
      <van-cell title="性别" is-link :value="user.gender==0?'男':'女'" @click="popShow=true;type=3" />
      <van-cell title="出生日期" is-link :value="user.birthday" @click="popShow=true;type=4" />
    </van-cell-group>

    <!-- 选择上传头像方式 -->
    <van-action-sheet v-model="uploType" :actions="actions" cancel-text="取消" @select="onSelect" />

    <!-- 上传图片的pop弹出层 -->
    <van-popup v-model="popup_photo" :style="{ width: '100%' }">
      <van-uploader
        :after-read="afterRead"
        class="pop_photo"
        preview-size="375px"
        v-model="fileList"
        :max-count="1"
      />
    </van-popup>

    <!-- 弹出层 -->
    <van-popup class="my_pop" v-model="popShow" round position="bottom" :style="{ height: '35%' }">
      <div v-if="type==2">
        <span class="btn" @click="onCancel">取消</span>
        <span class="btn" style="float:right;margin-top:10px;" @click="doName">确认</span>
        <van-field class="pop_name" v-model="userName" placeholder="请输入用户名" />
      </div>

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

      <van-datetime-picker
        class="pop_date"
        title="选择出生日期"
        v-else
        v-model="currentDate"
        type="date"
        @cancel="onCancel"
        @confirm="chooseDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, saveUser, savePhoto } from "@/api/user.js";
import dayjs from "dayjs";
export default {
  name: "profile",
  data() {
    return {
      user: {},
      type: "",
      actions: [
        { name: "拍照", color: "#202529" },
        { name: "选择一张图片", color: "#202529" }
      ],
      popup_photo: false,
      popShow: false,
      uploType: false,
      userName: "",
      filePhoto: {},
      columns: ["男", "女"],
      fileList: [{ url: "https://img.yzcdn.cn/vant/cat.jpeg", isImage: true }],
      currentDate: new Date()
    };
  },
  methods: {
    // 选择了一张图片后
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.user.photo = file.content;
      this.filePhoto = file.file;
      this.uploType = false;
    },

    // 选择了一个选项
    onSelect(itme, index) {
      if (index === 1) {
        this.popup_photo = true;
      }
    },

    doName() {
      this.user.name = this.userName;
      this.popShow = false;
    },
    // 点击保存
    async onSave() {
      let res = await saveUser(this.user);

      let fd = new FormData();
      fd.append("photo", this.filePhoto);
      await savePhoto(fd);
      this.$toast("修改成功!");
    },
    onCancel() {
      this.popShow = false;
    },
    onConfirm(val, index) {
      this.user.gender = index;
      this.popShow = false;
    },

    chooseDate(val) {
      this.user.birthday = dayjs(val).format("YYYY-MM-DD");
      this.popShow = false;
    }
  },
  async created() {
    let res = await getUserInfo();
    this.user = res.data.data;
    this.fileList[0].url = res.data.data.photo;
    this.currentDate = new Date(res.data.data.birthday);
  },

  // 自定义属性
  directives: {
    trigger: {
      inserted(el, binging) {
        el.click();
        //$(el).trigger('click')
      }
    }
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
  .my_pop {
    .btn {
      padding: 0 0.42667rem;
      color: #1989fa;
      font-size: 0.37333rem;
    }
    .pop_photo,
    .pop_name {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>