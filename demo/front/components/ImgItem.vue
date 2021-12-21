<template>
  <div style="margin: 20px 0;">
    <h2 v-if="!!props.title">{{ props.title }}</h2>
    <div class="img-item">
      <div class="img-item-left">
        <img :src="imgRef"  />
        <br />
        <button :onclick="onclick">下载</button>
      </div>
      <hr class="img-item-hr" />
      <div class="img-item-right">
        <img :src="serviceImgRef" />
        <br />
        <button :onclick="onclick2">下载</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { modelToImage , download } from 'model-to-image'

const props = defineProps({
  title: String,
  model: Object
});

const imgRef = ref('');
const serviceImgRef = ref('');

async function toImgByFront() {
  const start = Date.now();
  imgRef.value = await modelToImage(props.model as any);
  const end = Date.now();
  console.log("FrontGenerateTime:", end - start, props.model);
}

async function toImgByService() {
  const formData = new FormData();
  formData.set('content', JSON.stringify(props.model));
  const start = Date.now();
  const res = await fetch('http://localhost:9000/generate', {
    method: 'POST',
    body: formData,
  });
  const end = Date.now();
  const url = await res.text();
  serviceImgRef.value = url;
  console.log("ServiceGenerateTime:", end - start, props.model);
}

toImgByFront();
toImgByService();

function onclick() {
  download(imgRef.value, `front-${Date.now()}.png`)
}

function onclick2() {
  download(serviceImgRef.value, `service-${Date.now()}.png`)
}

</script>
<style lang="less">
.img-item {
  display: flex;
  &-left {
    flex: 1;
  }

  &-hr {
    height: 100%;
    margin: 5px;
    width: 1px;
    background-color: #121212;
  }

  &-right {
    flex: 1;
  }
  img {
    max-width: 100%;
  }
  &:hover {
  }
}
</style>
