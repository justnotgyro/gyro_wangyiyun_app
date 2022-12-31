<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="陈奕迅"
        v-model="keyword"
        @keydown.enter="goSearch"
      />
    </div>
    <div class="searchHistory">
      <span class="history">历史</span>
      <span
        class="record"
        v-for="record in searchRecords"
        :key="record"
        @click="goSearchByRecord(record)"
      >
        {{ record }}
      </span>
      <svg class="icon" aria-hidden="true" @click="removeHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
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
import { getSearchResult } from "@/request/api/item";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const searchRecords = ref([]);
    const store = useStore();
    const keyword = ref("");
    const itemList = computed(() => store.state.itemList);
    const songIndex = computed(() => store.state.songIndex);

    const goSearch = async () => {
      if (searchRecords.value.length > 10) {
        searchRecords.value.splice(searchRecords.value.length - 1, 1);
      }
      searchRecords.value.unshift(keyword.value);
      searchRecords.value = [...new Set(...[searchRecords.value])];
      localStorage.setItem(
        "searchRecords",
        JSON.stringify(searchRecords.value)
      );
      let res = await getSearchResult(keyword.value);
      store.dispatch("getItemListAction", res.data.result.songs);
    };

    const goSearchByRecord = async (record) => {
      let res = await getSearchResult(record);
      // itemList.value = res.data.result.songs;
      store.dispatch("getItemListAction", res.data.result.songs);
      console.log(itemList.value);
    };

    const removeHistory = () => {
      localStorage.removeItem("searchRecords");
      searchRecords.value = [];
    };

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

    onMounted(() => {
      searchRecords.value =
        JSON.parse(localStorage.getItem("searchRecords")) || [];
      store.dispatch("getItemListAction", []);
    });

    return {
      goSearch,
      keyword,
      itemList,
      searchRecords,
      removeHistory,
      goSearchByRecord,
      playTheSong,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 1.5rem;
  padding: 0.2rem;

  .searchTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
      width: 88%;
      border: 0;
      border-bottom: 0.02rem solid #ccc;
      padding-bottom: 0.02rem;
    }
  }
  .searchHistory {
    margin: 0.2rem 0;

    .history {
      font-weight: 700;
      margin-right: 0.2rem;
    }
    .record {
      border: solid 0.02rem #ccc;
      padding: 0.1rem;
      border-radius: 1rem;
      margin-right: 0.2rem;
    }
    .icon {
      position: absolute;
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
