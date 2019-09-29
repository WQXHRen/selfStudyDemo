<template>
  <div>
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @input="suggestion"
    />

    <!-- 搜索界面 -->
    <van-cell-group v-if="searchValue==''">
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>

      <van-cell v-for=" item in history" :title="item" icon="search" @click="onSearch(item)">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" v-show="delShow" />
      </van-cell>
    </van-cell-group>

    <!-- 搜索联想 -->
    <van-cell-group v-else>
      <van-cell v-for="item in suggestionList" :title="item" icon="search">
        <template slot="title">
          <span v-html="item"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { suggestion, searchHistory} from "@/api/search.js";
export default {
  data() {
    return {
      searchValue: "",
      delShow: false,
      suggestionList: [],
      history: [],
      timerID: null
    };
  },
  methods: {
   
    //   搜索联想
    suggestion() {
      // 防抖
      if (this.timerID) {
        clearTimeout(this.timerID);
      }
      this.timerID = setTimeout(async () => {
        if (this.searchValue == "") {
          return;
        }

        let res = await suggestion(this.searchValue);
        //   console.log(res);

        //   关键字变红
        this.suggestionList = res.data.data.options.map(item => {
          let reg = new RegExp(this.searchValue, "ig");
          return item.replace(
            reg,
            `<sapn style="color:red">${this.searchValue}</sapn>`
          );
        });
      }, 500);
    },

    // 搜索事件
    async onSearch(item) {
      this.$router.push('/results/'+item)
    },

    // 点击取消
    onCancel() {
      alert("点击了取消按钮!");
    }
  },
  async created() {
    let res = await searchHistory();
    this.history = res.data.data.keywords;
  }
};
</script>

<style>
</style>