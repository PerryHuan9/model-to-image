<script setup lang="ts">
import { ref } from 'vue';
import { render } from '../../src';
import { Layout } from '../../src/type';

const imgUrl = ref('');

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
      width: 100,
      height: 50,
      stroke: true,
      text: '东风不与周郎便，铜雀春深锁二乔',
      color: 'red',
      font: '30px Verdana',
      lineHeight: 30,
    },
  ],
};

const model2 = {
  with: 500,
  height: 500,
  elements: [
    {
      top: 0,
      left: 0,
      type: 'image',
      url: 'https://st-gdx.dancf.com/odyssey/571061814/24347/20191227-015907-2da2.png',
    },
  ],
};

async function setImageUrl() {
  const canvas = document.createElement('canvas');
  const url = await render(canvas as any, model);
  imgUrl.value = url;
}
setImageUrl();

const fetchImgUrlRef = ref('');

async function generateImg() {
  const formData = new FormData();
  formData.set('content', JSON.stringify(model));
  const res = await fetch('http://localhost:9000/generate', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json;charset=utf-8',
    // },
    body: formData,
  });
  const url = await res.text();
  fetchImgUrlRef.value = url;
}

generateImg();
</script>

<template>
  <img alt="Vue logo" :src="imgUrl" style="background-color: red" />
  <br />
  <img alt="Vue logo" :src="fetchImgUrlRef" style="background-color: green" />
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
