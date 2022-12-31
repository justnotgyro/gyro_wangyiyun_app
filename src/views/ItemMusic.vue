<template>
  <div class="itemMusic">
    <ItemMusicTop />
    <ItemMusicList />
  </div>
</template>

<script>
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
import { useRoute, useRouter } from "vue-router";
import { getPlayList } from "@/request/api/item";
import { onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
  setup() {
    const store = useStore();
    onBeforeMount(async () => {
      let id = useRoute().query.id;
      let res = await getPlayList(id);
      store.dispatch("getPlayListAction", res.data.playlist);
      store.dispatch("getItemListAction", res.data.playlist.tracks);
    });
    return {};
  },
};
</script>
