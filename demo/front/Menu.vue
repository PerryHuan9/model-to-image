<template>
  <a-menu mode="inline" :openKeys="['element']" @click="onClick">
    <a-menu-item key="home">
      <span>HOME</span>
    </a-menu-item>
    <a-sub-menu key="element">
      <template #title>Element</template>
      <a-menu-item key="rect">rect</a-menu-item>
      <a-menu-item key="image">image</a-menu-item>
      <a-menu-item key="text">text</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import { router } from './router'

function onClick(item) {
  router.push({ path: `/${item.key}` })
}


</script>
