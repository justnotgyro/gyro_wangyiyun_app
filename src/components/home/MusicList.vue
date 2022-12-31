<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">发现更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="130"
        :show-indicators="false"
        class="mySwiper"
      >
        <van-swipe-item v-for="item of musicList" :key="item">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }"
            ><div class="theList">
              <img :src="item.picUrl" alt="" />
              <span class="playCount">
                <van-icon name="play-circle-o" />
                {{ formatCount(item.playCount) }}
              </span>
              <span>{{ item.name }}</span>
            </div></router-link
          >
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const musicList = computed(() => store.state.musicList);

    onMounted(async () => {
      let res = await getMusicList();
      store.dispatch("getMusicListAction", res.data.result);
    });

    const formatCount = (num) => {
      if (num >= 100000000) {
        return (num / 10000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    };

    return {
      formatCount,
      musicList,
    };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  padding: 0 0.2rem;
  .musicTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.01rem solid #ccc;
      border-radius: 0.2rem;
      padding: 0.1rem 0.1rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .mySwiper {
      .van-swipe-item {
        padding-right: 10px;
        padding-top: 10px;
        .theList {
          position: relative;
          height: 4rem;
          font-size: 0.28rem;
          img {
            width: 100%;
            border-radius: 0.2rem;
          }
          .playCount {
            position: absolute;
            right: 0.12rem;
            top: 0.06rem;
            color: white;
            .icon {
              width: 0.3rem;
              height: 0.3rem;
            }
          }
        }
      }
    }
  }
}
</style>
