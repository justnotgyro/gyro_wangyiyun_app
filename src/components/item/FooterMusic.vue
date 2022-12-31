<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="changeShowDetails">
      <img :src="defaultSong.picUrl" alt="" />
      <span class="songName">{{ defaultSong.songName }}</span>
      <span class="singer"> -{{ defaultSong.singer }}</span>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isPlay" @click="goPause">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="goPlay">
        <use xlink:href="#icon-bofang1"></use>
      </svg>

      <svg class="icon openList" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${defaultSong.id}.mp3`"
      @ended="changeIcon"
      @timeupdate="getTimeUpdate"
      @canplay="getDuration"
    ></audio>
    <van-popup
      v-model:show="isShowDetails"
      position="bottom"
      :style="{ height: '100%' }"
      :overlay="false"
    >
      <MusicDetails
        :isPlay="isPlay"
        @sonGoPlay="goPlay"
        @sonGoPause="goPause"
      />
    </van-popup>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted, onUpdated } from "vue";
import { mapState, useStore } from "vuex";
import MusicDetails from "@/components/item/MusicDetails.vue";

export default {
  setup() {
    const store = useStore();
    const audio = ref(null);
    const defaultSong = computed(() => store.state.defaultSong);
    const isShowDetails = computed(() => store.state.isShowDetails);

    const changeShowDetails = () => {
      store.dispatch("changeShowDetailsAction");
    };

    const getDuration = () => {
      store.dispatch("getDurationAction", audio.value.duration);
      console.log(audio.value.duration);
    };

    let isPlay = ref(false);

    const getTimeUpdate = () => {
      // 每一句歌词都会对应一个时间，如果currentTime处于两句歌词的时间之中就显示第一句歌词
      // console.log(audio.value.currentTime);
      store.dispatch("changeCurrentTimeAction", audio.value.currentTime);
    };

    const goPlay = () => {
      // 切换图标
      isPlay.value = !isPlay.value;
      // 播放音乐
      audio.value.play();
    };

    // 调用play才能放歌
    // 现在需要歌单里的歌之后调用goplay

    const goPause = () => {
      isPlay.value = !isPlay.value;
      audio.value.pause();
    };

    const changeIcon = () => {
      isPlay.value = !isPlay.value;
    };

    watch(defaultSong, () => {
      // 监听播放歌曲的改变，一旦改变也就是点击了某歌曲
      audio.value.autoplay = true;
      // 就自动播放同时更改图标
      isPlay.value = true;
    });

    return {
      defaultSong,
      isPlay,
      audio,
      goPlay,
      goPause,
      isShowDetails,
      changeShowDetails,
      changeIcon,
      getTimeUpdate,
      getDuration,
    };
  },
};
</script>

<style lang="less" scoped>
.footerMusic {
  position: fixed;
  bottom: 0;
  background-color: rgb(255 255 255 / 90%);
  width: 100%;
  height: 1.3rem;
  border-top: #ebedf0 solid 0.01rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footerLeft {
    display: flex;
    align-items: center;
    font-size: 0.35rem;
    width: 80%;
    padding: 0 0.2rem;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
  }
  .footerRight {
    display: flex;
    padding: 0 0.2rem;
    .icon {
      width: 0.65rem;
      height: 0.65rem;
    }
    .openList {
      margin-left: 0.3rem;
    }
  }
}
</style>
