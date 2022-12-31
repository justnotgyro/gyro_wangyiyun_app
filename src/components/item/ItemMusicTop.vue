<template>
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="" class="bgImg" />
    <header>
      <div class="headerLeft">
        <!-- template里面是可以直接用$router获取路由的 -->
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        歌单
      </div>
      <div class="headerRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </header>
    <main>
      <p class="imgLeft">
        <img :src="playList.coverImgUrl" alt="" />
        <span class="playCount">
          <van-icon name="play-circle-o" />
          {{ formatCount(playList.playCount) }}
        </span>
      </p>
      <div class="infoRight">
        <p class="title">{{ playList.name }}</p>
        <div class="creator">
          <!-- 这里直接写会报错，由于先渲染了但是还仍未获取到值，所以用了生命周期函数并判断creator是否存在 -->
          <img :src="playList.creator?.avatarUrl" alt="" />
          <span>{{ playList.creator?.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="message">
          <p>{{ playList.description }}</p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
    </main>
    <footer>
      <div class="option">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{ playList.commentCount }}</span>
      </div>
      <div class="option">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playList.shareCount }}</span>
      </div>
      <div class="option">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="option">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const playList = computed(() => store.state.playList);
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
      playList,
    };
  },
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  .bgImg {
    width: 100%;
    z-index: -1;
    position: fixed;
    filter: blur(0.6rem);
  }

  header {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.4rem;
    color: #fff;
    .headerLeft,
    .headerRight {
      width: 25%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .icon {
      fill: #fff;
    }
  }
  main {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;

    .imgLeft {
      position: relative;
      width: 35%;
      height: 2.6rem;
      .playCount {
        position: absolute;
        right: 0.12rem;
        top: 0.06rem;
        color: white;
      }
      img {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.2rem;
      }
    }
    .infoRight {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 0.35rem;
        color: #fff;
        font-weight: 700;
      }
      .creator {
        height: 0.7rem;
        line-height: 0.7rem;
        display: flex;
        align-items: center;
        img {
          width: 0.7rem;
          border-radius: 50%;
          margin-right: 0.1rem;
        }
        span {
          height: 0.7rem;
          line-height: 0.7rem;
          color: #f5f5f5;
          font-size: 16px;
        }
        .icon {
          width: 0.3rem;
        }
      }

      .message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          width: 4rem;
          /* 溢出隐藏 */

          overflow: hidden;

          /* 限制一行显示 */

          white-space: nowrap;

          /* 显示不下省略号显示 */

          text-overflow: ellipsis;

          color: #f5f5f5;
        }
        .icon {
          width: 0.3rem;
        }
      }
    }
  }
  footer {
    color: #fff;
    display: flex;
    justify-content: space-around;
    .icon {
      fill: #fff;
      margin: 0.16rem;
    }
    .option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
