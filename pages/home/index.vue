<template>
  <view class="content">
    <!-- Banner 轮播区域 -->
    <wd-swiper autoplay="1000" indicator-dots="true" circular="true" class="banner-swiper" :list="bannerList"
      value-key="path">
    </wd-swiper>


    <!-- 功能入口 -->
    <view class="func">
      <!-- 左边 -->
      <view class="item" @click="switchtofunc1">
        <!-- 文字和按钮部分 -->
        <view class="consist">
          <wd-text text="就医陪诊" color="white" size="28rpx" bold></wd-text>
          <wd-text text="专业陪诊 全程无忧" color="white" size="20rpx"></wd-text>
          <wd-button size="small" custom-class="btn-white">点击进入</wd-button>
        </view>
        <!-- 图标部分 -->
        <view class="icon">
          <wd-img width="50" height="30" src="/static/func/right/1.svg" />
        </view>
      </view>
      <!-- 右边 -->
      <view class="item">
        <!-- 文字和按钮部分 -->
        <view class="consist">
          <wd-text text="上门康复" color="white" size="28rpx" bold></wd-text>
          <wd-text text="专业康复 居家无忧" color="white" size="20rpx"></wd-text>
          <wd-button size="small" custom-class="btn-white">点击进入</wd-button>
        </view>
        <!-- 图标部分 -->
        <view class="icon">
          <wd-img width="50" height="30" src="/static/func/right/1.svg" />
        </view>
      </view>
    </view>

    <!-- 医院列表 -->
    <view class="hospital-list">
      <view class="hospital-card" v-for="(item, idx) in hospitals" :key="idx" @click="switchtohospitaldetail(item)">
        <!-- 左侧图片 -->
        <view class="hospital-image">
          <image :src="item.img" class="hospital-img" mode="aspectFill" />
        </view>
        
        <!-- 右侧内容 -->
        <view class="hospital-content">
          <!-- 医院名称 -->
          <view class="hospital-title">{{ item.name }}</view>
          
          <!-- 标签区域 -->
          <view class="hospital-tags">
            <view class="tag tag-success">{{ item.level }}</view>
            <view class="tag tag-primary">{{ item.type }}</view>
          </view>
          
          <!-- 医院描述 -->
          <view class="hospital-desc">{{ item.desc }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchtofunc1 = ()=>{
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/home/func1/index'
  })
}

const switchtohospitaldetail = (item: any) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/home/hospitalDetail/index?hospitalId=${item.id || 1}&name=${encodeURIComponent(item.name)}`
  })
}
// 轮播图数据 - 只包含图片路径
const bannerList = ref([
  { path: '/static/swiper/1.svg' },
  { path: '/static/swiper/2.svg' },
  { path: '/static/swiper/3.png' }
]);

// 医院列表数据
const hospitals = ref([
  {
    id: 1,
    name: '九江学院附属医院666',
    level: '三甲',
    type: '综合医院',
    img: '/static/list/1.svg',
    desc: '九江学院附属医院始建于1877年，前身是英国圣教会"济生医院"，集医疗、教学、科研、预防、康复为一体的三级甲等综合医院。',
  },
  {
    id: 2,
    name: '九江学院附属医院888',
    level: '三甲',
    type: '综合医院',
    img: '/static/list/2.svg',
    desc: '九江学院附属医院始建于1877年，前身是英国圣教会"济生医院"，集医疗、教学、科研、预防、康复为一体的三级甲等综合医院。',
  },
]);
</script>

<style scoped lang="scss">
@import "../../static/css/global.scss";

.content {
  background: #f7f8fa;
  min-height: 100vh;
  width: $w;
  padding: 16rpx;
}

// 轮播图部分
.banner-swiper {
  height: 160rpx;
  overflow: hidden;
  margin-bottom: 16rpx;
}

// 功能入口部分
.func {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // background-color: purple;
  width: $c;
}

.func .item {
  box-sizing: border-box;
  // 宽度为内容宽度减去1个内边距再除以2
  width: 336rpx;
  height: 195rpx;
  background-image: linear-gradient(-242.85031830221683deg, #70a9fe 0%, #2980fd 99.99999999999999%);
  border-radius: 20rpx;
  margin: 16rpx 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1); 

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.func .item:last-child {
  background-image: linear-gradient(-242.85031830221683deg, #999ffe 0%, #693eb8 97.99999999999999%);
}

.func .item .consist {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding: 30rpx 0 20rpx 35rpx;

  :deep() {
    .btn-white {
      width: 100rpx;
      height: 40rpx;
      font-size: 16rpx;
      background: transparent;
      border: 2rpx solid white;
      color: white;
    }
  }
}

.func .item .icon {
  padding: 60rpx 30rpx 0 0;
}

// 医院列表部分
.hospital-list{
  width: $c;
  // background-color: pink;
}
.hospital-card {
  width: $c;
  height: 300rpx;
  background-color: white; /* 白色背景模拟卡片 */
  border-radius: 12rpx; /* 圆角 */
  padding: 24rpx; /* 内边距 */
  margin-bottom: 16rpx; /* 卡片间距 */
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
  display: flex; /* 横向布局 */
  align-items: start; /* 垂直居中 */
}

/* 左侧图片区域 */
.hospital-image {
  width: 200rpx; /* 固定宽度 */
  height: 200rpx;
  margin-right: 24rpx; /* 右边距 */
  flex-shrink: 0; /* 不收缩 */
}

.hospital-img {
  width: 100%;
  height: 100%;
  border-radius: 8rpx; /* 图片圆角 */
}

/* 右侧内容区域 */
.hospital-content {
  flex: 1; /* 占据剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 300rpx; 
}

.hospital-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
  color: #333;
  line-height: 1.6;
}

.hospital-tags {
  display: flex;
  gap: 12rpx;
  margin-bottom: 12rpx;
}

/* 标签样式 */
.tag {
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  line-height: 1;
}

.tag-success {
  background-color: #e8f5e8;
  color: #52c41a;
  border: 1rpx solid #b7eb8f;
}

.tag-primary {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1rpx solid #91d5ff;
}

.hospital-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* 最多显示5行 */
  overflow: hidden;
}
</style>
