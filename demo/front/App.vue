<template>
  <main class="root">
    <Menu class="root-aside" />
    <div class="root-right">
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import Menu from './Menu.vue'
</script>
<style lang="less">
.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  &-aside {
    width: 250px !important;
  }

  &-right {
    flex: 1;
    margin: 20px;
    overflow-y: auto;
  }
}
</style>



