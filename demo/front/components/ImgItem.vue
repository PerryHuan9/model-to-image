<template>
  <div style="margin: 20px 0;">
    <h2 v-if="!!props.title">{{ props.title }}</h2>
    <div class="img-item">
      <div class="img-item-left">
        <img :src="imgRef"  />
        <br />
      </div>
      <hr class="img-item-hr" />
      <div class="img-item-right">
        <img :src="serviceImgRef" />
        <br />
      </div>
    </div>
    <div class="expand-btn" @click="onExpand">{{isExpand ? '收起': '展开'}}</div>
    <div class="code-container"  :style="{height: isExpand ? 'auto' : '0'}">
      <pre><code class="json" spellcheck="false" ref="codeRef">{{props.model}}</code></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, h, ref, onMounted } from 'vue';
import { modelToImage } from 'model-to-image'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';


const props = defineProps({
  title: String,
  model: Object
});

const imgRef = ref('');
const serviceImgRef = ref('');
const codeRef = ref<HTMLElement>();
const isExpand =ref(false);

onMounted(() => {
 hljs.highlightBlock(codeRef.value)
})

function onExpand() {
  isExpand.value = !isExpand.value;
}

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

</script>
<style lang="less">
.code-container {
  overflow: hidden;
}
.expand-btn {
    height: 30px;
    background-color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
    user-select: none;
  }
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
