<template>
  <h1>图片缩放</h1>
  <p>原图：</p>
  <img src="https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg" />
  <ImageItem title="放大"  :model="zoomInModel" />
  <ImageItem title="缩小"  :model="zoomOutModel" />
   <h1>拼图</h1>
   <ImageItem title="上下拼图"  :model="imageMergeModel" />
   <ImageItem title="方格拼图"  :model="tableMergeModel" />
    <h1>裁剪</h1>
    <p>原图：</p>
    <img src="https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg" />
   <ImageItem title="正常裁剪"  :model="clipImageModel" />
   <ImageItem title="裁剪放大"  :model="clipImageZoomInModel" />

</template>

<script setup lang="ts">
import { Layout } from '../../../../src';
import ImageItem from '../../components/ImgItem.vue';

const zoomInModel: Layout = {
  width:1200,
  height: 900,
  elements: [
    {
      type: 'image',
      width: 1200,
      left: 0,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg'
    }
  ]
}

const zoomOutModel:Layout = {
  width:120,
  height: 90,
  elements: [
    {
      type: 'image',
      width: 120,
      left: 0,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg'
    }
  ]
}

const imageMergeModel:Layout = {
  width: 500,
  height: 1000,
  elements: [
    {
      type: 'image',
      width: 500,
      left: 0,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg'
    },
    {
      type: 'image',
      width: 500,
      left: 0,
      top: 375,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/023e91cb-1235-4a45-b782-eba93e4250aa14867.jpg'
    },
    {
      type: 'image',
      width: 500,
      left: 0,
      top: 700,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/8119022d-79eb-421e-9c8e-0e5e1418dee314866.png'
    },
  ]
}

const tableMergeModel:Layout = {
  width: 800,
  height: 500,
  elements: [
     {
      type: 'image',
      width: 500,
      left: 0,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg'
    },
     {
      type: 'image',
      width: 300,
      left: 500,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/023e91cb-1235-4a45-b782-eba93e4250aa14867.jpg'
    },
    {
      type: 'image',
      left: 500,
      top: 180,
      width: 300,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/8119022d-79eb-421e-9c8e-0e5e1418dee314866.png'
    },
  ]
}


const clipImageModel:Layout = {
  width: 375,
  height: 210,
  elements: [
     {
      type: 'image',
      width: 375,
      left: 0,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg',
      clip: {
        startX: 85,
        startY: 150,
        width: 375,
        height: 210,
      }
    },
  ]
}

const clipImageZoomInModel:Layout = {
  width: 600,
  height: 400,
  elements: [
    {
      type: 'rect',
      left: 0,
      top: 0,
      width: 600,
      height: 600,
      style: 'red'
    },
     {
      type: 'image',
      width: 500,
      left: 0,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg',
      clip: {
        startX: 85,
        startY: 150,
        width: 375,
        height: 210,
      }
    },
  ]
}




</script>

