<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render indicator-color="red">
      <van-swipe-item v-for="item in state.images" :key="item">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
// axios不封装直接在组件里面用？？
// 浅封装了一下
import { getBanner } from "@/request/api/home";
import { onMounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      // 这里可以回头参考一下coderwhy后台异步请求
      // axios.get("http://localhost:3000/banner?type=2").then((res) => {
      //   console.log(res.data.banners);
      //   state.images = res.data.banners;
      // });
      let res = await getBanner();
      state.images = res.data.banners;
    });
    return { state };
  },
};
</script>

<style lang="less" scoped>
#swiperTop {
  height: 3rem;
  .van-swipe {
    width: 100%;
    .van-swipe__track {
      .van-swipe-item {
        padding: 0 0.2rem;
        img {
          width: 100%;
          height: 3rem;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>
