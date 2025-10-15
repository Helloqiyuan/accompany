<template>
  <view class="content">
    <wd-swiper class="swiper"
               :list="list"
               v-model:current="current"
               @click="handleClick"
               @change="onChange"
    ></wd-swiper>
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
            :duration="duration">
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper>
    <wd-button @click="buttomin">跳转到主页面</wd-button>
  </view>
</template>

<script setup>
import {ref} from 'vue'

const buttomin = ()=> {
  console.log('点击了按钮')
  // 使用 uni.switchTab 跳转到主页面
  uni.switchTab({
    url: '/pages/home/index',
    success: function(res) {
      console.log('跳转成功', res)
    },
    fail: function(err) {
      console.error('跳转失败', err)
    }
  });
}


const title = ref('Hello World')
const current = ref(0)

const list = ref([
  'https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/c4a5924c-efcc-4e06-80a3-71eb1d0440e2.png',
  'https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/f7d5f39e-3f93-4a26-a6e9-2e225ece9ee7.png',
  'https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/fa5da578-c4a1-48c2-af49-d8bccfd7451f.png',
  'https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/d60f8656-f5e4-457f-81b3-a3dc99ac12a8.png'
])

function handleClick(e) {
  console.log(e)
}

function onChange(e) {
  console.log(e)
}
</script>

<style scoped>
</style>
