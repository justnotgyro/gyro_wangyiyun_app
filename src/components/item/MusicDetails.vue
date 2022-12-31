<template>
  <div class="musicDetails">
    <img class="bgImg" :src="defaultSong.picUrl" alt="" />
    <div class="headerAndMain">
      <header>
        <van-icon name="arrow-down" @click="changeShowDetails" />
        <div class="songInfo">
          <span class="songName">
            {{ defaultSong.songName }}
          </span>
          <span class="singer">
            {{ defaultSong.singer }}
          </span>
        </div>
        <van-icon name="share-o" />
      </header>
      <main v-show="!isShowLyrics" @click="changeIsShowLyrics">
        <!-- 加一个类名覆盖掉之前的类名 -->
        <img
          class="img_needle"
          :class="{ img_needle_active: !isPlay }"
          src="@/assets/needle-ab.png"
          alt=""
        />
        <img class="img_cd" src="@/assets/cd.png" alt="" />
        <img class="img_center" :src="defaultSong.picUrl" alt="" />
      </main>
      <main
        v-show="isShowLyrics"
        @click="changeIsShowLyrics"
        class="lyrics"
        ref="activeLyrics"
      >
        <p
          v-for="item of lyricWithTime"
          key="item"
          :class="{
            active:
              currentTime * 1000 > item.timeMsec &&
              currentTime * 1000 <= item.next,
          }"
          ref="activeLyric"
        >
          {{ item.lyr }}
        </p>
      </main>
    </div>
    <footer>
      <div class="footerTop">
        <van-icon name="like-o" />
        <van-icon name="down" />
        <van-icon name="chat-o" />
        <van-icon name="volume-o" />
        <van-icon name="ellipsis" />
      </div>
      <div class="footerCenter">
        <input
          type="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footerBottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="toggleSong(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <span class="playAndPause">
          <svg
            class="icon stop"
            aria-hidden="true"
            v-if="isPlay"
            @click="goPause"
          >
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon start" aria-hidden="true" v-else @click="goPlay">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
        </span>

        <svg class="icon" aria-hidden="true" @click="toggleSong(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  computed,
  ref,
  onUpdated,
  watch,
  onBeforeMount,
  nextTick,
  onMounted,
} from "vue";
import { useStore } from "vuex";
export default {
  emits: ["sonGoPlay", "sonGoPause"],
  props: ["isPlay"],
  setup(props, { emit }) {
    const store = useStore();
    const defaultSong = computed(() => store.state.defaultSong);
    const isShowLyrics = computed(() => store.state.isShowLyrics);
    const lyrics = computed(() => store.state.lyrics);
    const currentTime = computed(() => store.state.currentTime);
    const songIndex = computed(() => store.state.songIndex);
    const itemList = computed(() => store.state.itemList);
    const duration = computed(() => store.state.duration);
    const lyricWithTime = ref(null);
    const activeLyrics = ref(null);

    const getFormatLyrics = () => {
      if (lyrics.value) {
        let arr = lyrics.value.split(/[(\r\n)\r\n]+/);
        // 将歌词按照换行符分割
        // 所有歌词构成数组arr
        // 对arr的操作：map改变数组中的每一个元素使他成为一个由时分秒歌词组成的对象
        let lyricArr = arr.map((item) => {
          let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
          let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
          let msec = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lyr = item.slice(item.indexOf("]") + 1, item.length);

          let timeMsec = min * 60 * 1000 + sec * 1000 + parseInt(msec);
          if (!timeMsec) {
            timeMsec = 0;
          }
          let next = 0;
          return { min, sec, msec, lyr, timeMsec, next };
        });
        lyricArr.forEach((item, i) => {
          // 给每一个item对象添加一个属性：值为下一句歌词对应的毫秒数
          // 如果是最后一句就让它的 item.next = 0
          if (i === lyricArr.length - 1) {
            item.next = 0;
          } else {
            item.next = lyricArr[i + 1].timeMsec;
          }
        });
        lyricWithTime.value = lyricArr;
      }
    };

    onMounted(async () => {
      await store.dispatch("getSongLyricsAction", defaultSong.value);
      getFormatLyrics();
    });
    watch(defaultSong, async () => {
      await store.dispatch("getSongLyricsAction", defaultSong.value);
      getFormatLyrics();
    });

    // 网络请求没得到时只能获取上一次的结果,要注意在使用网络请求的数据时，数据到底更改没有

    const changeShowDetails = () => {
      store.dispatch("changeShowDetailsAction");
    };
    const goPause = () => {
      emit("sonGoPause");
    };
    const goPlay = () => {
      emit("sonGoPlay");
    };
    const changeIsShowLyrics = () => {
      store.dispatch("changeIsShowLyricsAction");
    };

    const toggleSong = (num) => {
      if (songIndex.value === 0 && num === -1) {
        store.dispatch("changeSongIndexAction", itemList.value.length - 1);
      } else if (songIndex.value === itemList.value.length - 1 && num === 1) {
        store.dispatch("changeSongIndexAction", 0);
      } else {
        store.dispatch("changeSongIndexAction", songIndex.value + num);
      }
    };

    return {
      changeShowDetails,
      defaultSong,
      goPause,
      goPlay,
      isShowLyrics,
      changeIsShowLyrics,
      lyricWithTime,
      currentTime,
      activeLyrics,
      toggleSong,
      duration,
    };
  },
};
</script>

<style lang="less" scoped>
.musicDetails {
  position: absolute;
  height: 100%;
  width: 100%;
  color: #fff;
  padding: 0.2rem 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .bgImg {
    width: 100%;
    height: 100%;
    position: fixed;
    filter: blur(0.5rem) brightness(0.8);
    z-index: -1;
    right: 0;
    top: 0;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .songInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.1rem;
      font-size: 16px;
      .songName {
        font-weight: 500;
      }
      .singer {
        color: #dcdee0;
      }
    }
    i {
      font-size: 0.5rem;
    }
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding-bottom: 20%;
    position: relative;
    .img_needle {
      width: 2rem;
      margin-left: 20%;
      z-index: 1;
      transition: all 2s;
    }
    .img_needle_active {
      width: 2rem;
      margin-left: 20%;
      z-index: 1;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }
    .img_cd {
      width: 70%;
      margin-top: -20%;
    }
    .img_center {
      width: 45%;
      border-radius: 50%;
      position: absolute;
      top: 137px;
    }
  }
  .lyrics {
    padding-top: 70%;
    height: 9rem;
    overflow: scroll;
    p {
      padding-bottom: 0.4rem;
      color: #dcdee0;
      text-align: center;
    }
    .active {
      color: #fff;
      font-size: 0.35rem;
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0.2rem 0;
    input {
      width: 95%;
      height: 0.05rem;
      position: absolute;
    }
    .icon {
      fill: #fff;
    }
    .footerTop {
      display: flex;
      justify-content: space-between;
    }
    i {
      font-size: 0.5rem;
      width: 0.5rem;
      height: 0.5rem;
    }
    .footerCenter {
      padding: 0.5rem 0;
    }
    .footerBottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      .playAndPause {
        width: 0.5rem;
        height: 0.5rem;
        position: relative;
        .stop,
        .start {
          position: absolute;
          width: 1rem;
          height: 1rem;
          top: -50%;
          left: -50%;
        }
      }
    }
  }
}
</style>
