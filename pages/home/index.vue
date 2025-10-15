<template>
  <view class="content">
    <!--    轮播图-->
    <wd-swiper class="swiper" :list="swiperList" value-key="path" v-model:current="current" @click="handleClick"
      @change="onChange"></wd-swiper>
    <!--    功能-->
    <view class="func">
      <a class="bbtn" href="#" @click="g">
        <wd-text class="up">
          就医陪诊
        </wd-text>
        <wd-text class="introduction">
          专业陪诊 全程无忧
        </wd-text>
        <wd-text class="btn">
          点击进入
        </wd-text>
      </a>
      <a class="bbtn" href="#" @click="g">
        <wd-text class="up">
          上门康复
        </wd-text>
        <wd-text class="introduction">
          专业康复 居家无忧
        </wd-text>
        <wd-text class="btn">
          点击进入
        </wd-text>
      </a>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const current = ref(0)
const dataList = ref([])
// 从本地static/swiper文件夹读取 图片
const swiperList = ref([
  "/static/swiper/1.svg",
  "/static/swiper/2.svg",
  "/static/swiper/3.png",
])
const g = () => {
  console.log('点击了按钮')
}
function handleClick(e) {
  console.log(e)
}

function onChange(e) {
  // console.log(e)
}


const baseUrl = 'http://localhost:8080'
// const baseUrl = 'http://192.168.46.192:8080'
const getEmp = () => {

  uni.request({
    url: baseUrl + '/emp/all',
    method: 'GET',
    success: function (res) {
      console.log('请求成功:', res)
      // 检查是否有返回数据
      if (res.data.data) {
        dataList.value = res.data.data
        console.log('数据:', dataList.value)
      }
    },
    fail: function (err) {
      console.error('请求失败:', err)
      // 显示错误信息给用户
      uni.showToast({
        title: '请求失败，请检查网络或后端服务',
        icon: 'none',
        duration: 3000
      })
    }
  })
}
const getSwiper = () => {
  uni.request({
    url: baseUrl + '/pic/all',
    method: 'GET',
    success: function (res) {
      console.log('请求成功:', res)
      // 检查是否有返回数据
      if (res.data.data) {
        let xx = res.data.data
        swiperList.value = xx.map(e => e.path)
        console.log('数据:', swiperList.value)
      }
    },
    fail: function (err) {
      console.error('请求失败:', err)
    }
  })
}
onMounted(() => {
  // getSwiper()
})
</script>


<style scoped>
.swiper {
  width: 396px;
  height: 205px;
  margin: 10px;
  padding: 2px 2px 2px 2px;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
}


.bbtn {
  width: 195px;
  height: 100px;
  margin: 10px;
  padding: 2px 2px 2px 2px;
  border-radius: 5px;
  background-image: linear-gradient(-242.85031830221683deg, #70a9fe 0%, #2980fd 99.99999999999999%);
  box-sizing: border-box;
}

.up {
  width: 72px;
  height: 21px;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  font-family: "Arial-BoldMT", "Arial Bold", "Arial", sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-align: left;
  line-height: normal;
}

.introduction {
  width: 100px;
  height: 14px;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  font-family: "ArialMT", "Arial", sans-serif;
  color: #ffffff;
  text-align: left;
  line-height: normal;
}

.btn {
  width: 57px;
  height: 19px;
  padding: 2px 2px 2px 2px;
  border-radius: 15px;
  border: 1px solid #ffffff;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  font-family: "ArialMT", "Arial", sans-serif;
  color: #ffffff;
  text-align: center;
  line-height: normal;
}
</style>
