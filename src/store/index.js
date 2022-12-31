import { createStore } from "vuex";
import { getDefaultLyrics } from "@/request/api/item";

export default createStore({
  state() {
    return {
      defaultSong: {
        id: "1907443034",
        songName: "预言石",
        singer: "詹雯婷",
        picUrl:
          "https://p1.music.126.net/2_uws_ITAiwnb77mvHzHKQ==/109951166863410984.jpg",
      },
      playList: [],
      itemList: [],
      musicList: [],
      isShowDetails: false,
      isShowLyrics: false,
      lyrics: null,
      currentTime: 0,
      songIndex: 0,
      duration: 0,
    };
  },
  getters: {},
  mutations: {
    playTheSong(state, payload) {
      state.defaultSong = payload;
    },
    changeShowDetails(state) {
      state.isShowDetails = !state.isShowDetails;
      state.isShowLyrics = false;
      // console.log(state.isShowDetails);
    },
    changeIsShowLyrics(state) {
      state.isShowLyrics = !state.isShowLyrics;
      // console.log(state.isShowLyrics);
    },
    getSongLyrics(state, payload) {
      // console.log(111);
      state.lyrics = payload.lyrics.data.lrc.lyric;
      // console.log("mutation", state.lyrics);
    },
    changeCurrentTime(state, payload) {
      state.currentTime = payload;
    },
    changeSongIndex(state, payload) {
      state.songIndex = payload;
    },
    getPlayList(state, payload) {
      state.playList = payload;
    },
    getItemList(state, payload) {
      state.itemList = payload;
    },
    getMusicList(state, payload) {
      state.musicList = payload;
    },
    getDuration(state, payload) {
      state.duration = payload;
    },
  },
  actions: {
    playTheSongAction({ commit }, payload) {
      commit("playTheSong", payload);
    },
    changeShowDetailsAction({ commit }) {
      commit("changeShowDetails");
    },
    changeIsShowLyricsAction({ commit }) {
      commit("changeIsShowLyrics");
    },
    async getSongLyricsAction({ state, commit }, payload) {
      let lyrics = await getDefaultLyrics(payload.id);
      // console.log("actions", lyrics.data.lrc.lyric);
      commit("getSongLyrics", { lyrics });
    },
    changeCurrentTimeAction({ commit }, payload) {
      commit("changeCurrentTime", payload);
    },
    changeSongIndexAction({ commit }, payload) {
      commit("changeSongIndex", payload);
    },
    getPlayListAction({ commit }, payload) {
      commit("getPlayList", payload);
    },
    getItemListAction({ commit }, payload) {
      commit("getItemList", payload);
    },
    getMusicListAction({ commit }, payload) {
      commit("getMusicList", payload);
    },
    getDurationAction({ commit }, payload) {
      commit("getDuration", payload);
    },
  },
  modules: {},
});
