<script setup lang="ts">
import {ref} from 'vue';
import { render } from '../../src';

const imgUrl = ref('');


async function setImageUrl() {
  const url = await render(document.createElement('canvas') as any, {
    width: 1000,
    height: 500,
    elements: [
      {
        top: 0,
        left: 0,
        type: 'image',
        width: 1000,
        height: 500,
        url: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63bbc0ffc919426497b74f23bbc23023~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?'
      },
      {
        top: 100,
        left: 200,
        width: 500,
        type: 'image',
        url: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29092e57c0aa49be99cfdc7c8b3f5ae8~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?'
      }
    ]
  });
  imgUrl.value = url;
}

setImageUrl();

</script>

<template>
  <img alt="Vue logo" :src="imgUrl" style="background-color:red;"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
