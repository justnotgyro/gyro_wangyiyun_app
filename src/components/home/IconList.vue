<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.iconList {
  width: 100%;
  height: 1.85rem;
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-around;
  .iconItem {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
