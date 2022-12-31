<template>
  <div class="itemMusicList">
    <header>
      <span class="headerLeft">
        <van-icon name="play-circle-o" />
        <span class="playAll">播放全部</span>
        <span class="trackCount">(共{{ playList.trackCount }}首)</span>
      </span>
      <span class="headerRight">
        <van-icon name="plus" />
        收藏({{ playList.subscribedCount }})
      </span>
    </header>
    <main>
      <div class="song" v-for="(item, index) of itemList">
        <div class="songLeft" @click="playTheSong(index)">
          <span class="index">{{ index + 1 }}</span>
          <span class="songInfo"
            ><p class="songName">{{ item.name }}</p>
            <p class="singerName">{{ item.ar[0].name }}</p></span
          >
        </div>
        <div class="songRight">
          <span v-if="item.mv">
            <svg class="icon bofang" aria-hidden="true">
              <use xlink:href="#icon-shipin"></use>
            </svg>
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const songIndex = computed(() => store.state.songIndex);
    const playList = computed(() => store.state.playList);
    const itemList = computed(() => store.state.itemList);

    const playTheSong = (index) => {
      const targetSong = itemList.value[index];
      store.dispatch("changeSongIndexAction", index);
      store.dispatch("playTheSongAction", {
        id: targetSong.id,
        songName: targetSong.name,
        singer: targetSong.ar[0].name,
        picUrl: targetSong.al.picUrl,
      });
    };

    watch(songIndex, () => {
      playTheSong(songIndex.value);
    });

    return {
      playTheSong,
      playList,
      itemList,
    };
  },
};
</script>

<style lang="less" scoped>
.itemMusicList {
  background-color: #fff;
  margin-top: 0.3rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0.2rem;
  margin-bottom: 1.3rem;
  header {
    display: flex;
    justify-content: space-between;
    font-size: 0.32rem;

    .headerLeft {
      display: flex;
      align-items: center;
      .van-icon-play-circle-o:before {
        font-size: 0.5rem;
        padding-right: 0.2rem;
        padding-top: 0.05rem;
      }
      .playAll {
        font-weight: 700;
        font-size: 18px;
      }
      .trackCount {
        color: #ccc;
      }
    }
    .headerRight {
      background-color: #ee0a24;
      color: #fff;
      padding: 0.2rem 0.1rem;
      border-radius: 1rem;
      display: flex;
      align-items: baseline;
    }
  }
  main {
    padding-top: 0.2rem;
    .song {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .songLeft {
        display: flex;
        align-items: center;
        .index {
          color: #969799;
          padding-right: 0.2rem;
          width: 0.5rem;
          text-align: center;
        }
        .songInfo {
          display: flex;
          flex-direction: column;
          padding: 0.2rem 0.1rem;
          .songName {
            font-weight: 700;
            margin-bottom: 5px;
            overflow: hidden;
            white-space: nowrap;
            width: 5rem;
            text-overflow: ellipsis;
          }
          .singerName {
            color: #969799;
          }
        }
      }
      .songRight {
        .icon {
          fill: #969799;
        }
        .bofang {
          padding-right: 0.2rem;
          width: 30px;
        }
      }
    }
  }
}
</style>
