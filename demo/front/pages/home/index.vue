<template>
  <ImageItem title="home" :model="model" />
</template>
<script setup lang="ts">
import ImageItem from '../../components/ImgItem.vue'
import { Layout } from '../../../../src';


const model: Layout = {
  width: 1000,
  height: 500,
  elements: [
    {
      top: 0,
      left: 0,
      type: 'image',
      width: 1000,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/75617/563b3841-1e32-4417-a2f1-45be815614ed9309403.png',
    },
    {
      top: 100,
      left: 300,
      width: 100,
      rotate: (20 * Math.PI) / 180,
      type: 'image',
      url: 'https://st-gdx.dancf.com/odyssey/571061814/24347/20191227-015907-2da2.png',
    },
    {
      type: 'text',
      left: 100,
      top: 100,
      width: 500,
      text: '东风不与周郎便，铜雀春深锁二乔',
      style: 'red',
      font: '30px Verdana',
      lineHeight: 30,
    },
  ],
}
</script>

