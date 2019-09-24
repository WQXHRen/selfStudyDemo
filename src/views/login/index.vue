<template>
  <div id="login">
    <van-nav-bar class="loginNav" title="登录" />
    <div class="input_wrap">
      <div class="mobile_wrap">
        <i class="iconfont icon-myphone"></i>
        <input
          type="text"
          class="mobile"
          v-model="form.mobile"
          placeholder="请输入手机号"
          @blur="moblie_verify"
        />
      </div>

      <div class="code_wrap">
        <i class="iconfont icon-yanzhengma"></i>
        <input
          type="text"
          class="code"
          v-model="form.code"
          placeholder="请输入验证码"
          @blur="code_verify"
        />
        <div class="yanzhengma">
          <van-button :disabled="isdisabled" @click="clickCode" v-model="yanzhengma">{{yanzhengma}}</van-button>
        </div>
      </div>

      <van-button @click="login" class="loginBtn" type="info" size="small">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/login";
import "vant/lib/icon/local.css";
import "./css/iconfont/iconfont.css";
import {setUserInfo} from "../../storege/index"
export default {
  name:'login',
  data() {
    return {
      form: {
        mobile: "18801185985",
        code: "246810"
      },
      isMoblie: false,
      isCode: false,
      isVerify: true,
      isdisabled: false,
      yanzhengma: "获取验证码"
    };
  },
  methods: {
    //点击获取验证码
    clickCode() {
      let sec = 60;
      this.isdisabled = true;
      let timeId = setInterval(() => {
        if (sec > 0) {
          sec--;
          this.yanzhengma = sec + "秒后在获取";
        } else {
          this.yanzhengma = "获取验证码";
          this.isdisabled = false;
          clearInterval(timeId);
        }
      }, 1000);
    },
    moblie_verify() {
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.mobile)) {
        this.$toast("请输入正确手机号!");
        this.isMoblie = false;
        return;
      } else {
        this.isMoblie = true;
      }
    },
    code_verify() {
      if (!/^\d{6}$/.test(this.form.code)) {
        this.$toast("请输入正确验证码!");
        this.isCode = false;
        return;
      } else {
        this.isCode = true;
      }
    },
    async login() {
      this.moblie_verify();
      this.code_verify();

      if (this.isMoblie == true && this.isCode == true) {
        const toast = this.$toast.loading({
          duration: 0,
          mask: true,
          message: "登录中..."
        });

          let res = await login(this.form);
          await toast.clear();
        try {
          setUserInfo('userInfo',res.data.data)
          this.$router.push('/home');
        } catch {
          this.$toast.fail({
            duration: 2000,
            mask: true,
            message: "账号或验证码错误!"
          });
        }
      }
    }
  }
};
</script>

<style src="./css/index.less" lang="less" scoped>
</style>