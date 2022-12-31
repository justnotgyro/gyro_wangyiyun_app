<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>

    <div class="topContent">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>
<script></script>
<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .topContent {
    display: flex;
    width: 65%;
    justify-content: space-around;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>
