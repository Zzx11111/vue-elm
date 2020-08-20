<template>
  <div class="navigation-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.navigation-bar {
  position:sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 40px;
  background-color: #3190e8;
  line-height: 40px;
  color: #fff;
  padding: 0 8px;
  display: flex;
  .left {
    width: 80px;
    font-size:16px;
  }
  .center {
    flex: 1;
    text-align: center;
    margin-left: 15px;
    margin-right: 15px;
    overflow: hidden;
    font-size: 16px;
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right {
    font-size: 16px;
    width: 80px;
    text-align: center;
  }
}
</style>