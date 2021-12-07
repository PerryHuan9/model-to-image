<script setup lang="ts">
import { config } from './config'
import ImgItemComp from "../../components/ImgItem.vue"
</script>

<template>
  <div>
    <template v-for="item in config">
      <ImgItemComp :title="item.title" :model="item.model" />
    </template>
  </div>
</template>
