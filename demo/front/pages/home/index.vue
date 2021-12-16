<template>
  <ImageItem title="home" :model="model" />
</template>
<script setup lang="ts">
import ImageItem from '../../components/ImgItem.vue'
import { Layout } from '../../../../src';


const model:Layout = {
  width: 500,
  height: 800,
  elements: [
    {
      type: 'rect',
      left: 0,
      top: 0,
      width: 500,
      height: 800,
      style: 'rgb(62, 36, 19)'
    },
     {
      type: 'image',
      width: 300,
      left: 0,
      top: 0,
      url: 'https://st0.dancf.com/gaoding-material/0/images/354641/20200108-213854-NjUJI.jpg'
    },
     {
      type: 'image',
      width: 200,
      left: 300,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/023e91cb-1235-4a45-b782-eba93e4250aa14867.jpg'
    },
    {
      type: 'image',
      left: 300,
      top: 140,
      width: 200,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/8119022d-79eb-421e-9c8e-0e5e1418dee314866.png'
    },
    {
      type: 'image',
      left: 300,
      top: 300,
      width: 200,
      url: 'https://st0.dancf.com/gaoding-material/0/images/353985/20200108-213027-qjucQ.jpg'
    },
     {
      type: 'text',
      text: `登高\n杜甫\n风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。\n`,
      left: 250,
      top: 550,
      width: 500,
      textAlign: 'center',
      style: 'white',
      font: '20px Arial',
      lineHeight: 30,
    }
  ]
}
</script>

