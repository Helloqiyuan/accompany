<template>
    <view class="container">

        <!-- 医院信息卡片 -->
        <view class="hospital-card">
            <view class="hospital-info">
                <view class="hospital-name">{{ hospitalInfo.name }}</view>
                <view class="hospital-type">{{ hospitalInfo.level }} {{ hospitalInfo.type }}</view>
                <view class="hospital-address">
                    <text class="address-text">{{ hospitalInfo.address }}</text>
                </view>
                <view class="navigate-btn" @click="handleNavigate">导航</view>
            </view>
            <view class="hospital-image">
                <image class="building-img" :src="hospitalInfo.img" mode="aspectFill" />
            </view>
        </view>

        <!-- 服务标题 -->
        <view class="service-title">在线预约您需要的服务</view>


        <!-- 服务卡片列表 -->
        <view class="service-list">
            <view 
                class="service-card" 
                v-for="(service, index) in serviceList" 
                :key="service.id"
            >
                <!-- 左侧图标区域 -->
                <view class="icon-wrap" :class="service.iconClass">
                    <image class="service-icon" :src="service.icon" mode="aspectFit" />
                    <text class="icon-text">{{ service.iconText }}</text>
                </view>
                
                <!-- 中部信息区域 -->
                <view class="service-info">
                    <view class="service-title-text">{{ service.title }}</view>
                    <view class="service-desc">{{ service.description }}</view>
                    <view class="service-price">{{ service.price }}</view>
                </view>
                
                <!-- 右侧预约按钮 -->
                <view class="book-btn" @click="handleBook(service)">预约</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 定义医院信息数据类型
interface HospitalInfo {
    id: number;
    name: string;
    level: string;
    type: string;
    img: string;
    address: string;
}

// 定义服务数据类型
interface ServiceItem {
    id: number;
    title: string;
    description: string;
    price: string;
    icon: string;
    iconText: string;
    iconClass: string;
}

// 医院信息数据
const hospitalInfo = ref<HospitalInfo>({
    id: 1,
    name: '九江学院附属医院666',
    level: '三甲',
    type: '综合医院',
    img: '/static/list/1.svg',
    address: '九江市浔阳东路57号/庐峰路17号'
});

// 服务列表数据
const serviceList = ref<ServiceItem[]>([
    {
        id: 1,
        title: '半天院内陪诊',
        description: '半天就医陪同服务,院内手续代办代跑服务',
        price: '50元/次',
        icon: '/static/list/2.svg',
        iconText: '12',
        iconClass: 'icon-orange'
    },
    {
        id: 2,
        title: '全天院内陪诊',
        description: '全程就医陪同服务,院内手续代办代跑服务',
        price: '100元/次',
        icon: '/static/list/1.svg',
        iconText: '24',
        iconClass: 'icon-blue'
    }
]);

// 处理导航按钮点击事件
const handleNavigate = () => {
    console.log('导航到医院:', hospitalInfo.value.name);
    // 这里可以调用地图API进行导航
    // @ts-ignore
    uni.showToast({
        title: '正在打开地图导航',
        icon: 'none'
    });
};

// 处理预约按钮点击事件
const handleBook = (service: ServiceItem) => {
    console.log('预约服务:', service.title);
    // @ts-ignore
    uni.showToast({
        title: `预约${service.title}`,
        icon: 'none'
    });
};

// 页面加载时获取路由参数
onMounted(() => {
    // @ts-ignore
    const pages = getCurrentPages();
    // @ts-ignore
    const currentPage = pages[pages.length - 1];
    // @ts-ignore
    const options = currentPage.options;
    
    console.log('路由参数:', options);
    console.log('医院ID:', options.hospitalId);
    console.log('医院名称:', decodeURIComponent(options.name || ''));
    
    // 如果有传递参数，更新医院信息
    if (options.hospitalId && options.name) {
        hospitalInfo.value.id = parseInt(options.hospitalId);
        hospitalInfo.value.name = decodeURIComponent(options.name);
    }
});
</script>

<style scoped lang="scss">
.container {
    background: #f5f5f5;
    min-height: 100vh;
}

/* 顶部导航栏样式 */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 32rpx;
    background: #fff;
    border-bottom: 1rpx solid #eee;
}

.header-left {
    width: 80rpx;
}

.back-btn {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back-icon {
    width: 40rpx;
    height: 40rpx;
}

.header-center {
    flex: 1;
    text-align: center;
}

.header-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 24rpx;
    width: 80rpx;
    justify-content: flex-end;
}

.more-btn, .eye-btn {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.more-icon, .eye-icon {
    width: 40rpx;
    height: 40rpx;
}

/* 医院信息卡片样式 */
.hospital-card {
    background: #fff;
    margin: 0 32rpx 24rpx 32rpx;
    border-radius: 16rpx;
    padding: 32rpx;
    display: flex;
    align-items: center;
    gap: 24rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.hospital-info {
    flex: 1;
}

.hospital-name {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 12rpx;
}

.hospital-type {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 16rpx;
}

.hospital-address {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 20rpx;
}

.location-icon {
    width: 32rpx;
    height: 32rpx;
}

.address-text {
    font-size: 26rpx;
    color: #666;
    flex: 1;
}

.navigate-btn {
    background: #27c1c3;
    color: #fff;
    padding: 12rpx 24rpx;
    border-radius: 8rpx;
    font-size: 26rpx;
    text-align: center;
    width: fit-content;
}

.hospital-image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 12rpx;
    overflow: hidden;
}

.building-img {
    width: 100%;
    height: 100%;
}

/* 服务标题样式 */
.service-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    padding: 32rpx 32rpx 24rpx;
    background: #fff;
    margin: 0 32rpx 24rpx;
    border-radius: 16rpx 16rpx 0 0;
}

/* 服务列表样式 */
.service-list {
    margin: 0 32rpx;
}

.service-card {
    background: #fff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    gap: 24rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

/* 图标区域样式 */
.icon-wrap {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.icon-orange {
    background: #ff8c42;
}

.icon-blue {
    background: #4a90e2;
}

.service-icon {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top: 20rpx;
}

.icon-text {
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 40rpx;
}

/* 服务信息区域样式 */
.service-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

.service-title-text {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
}

.service-desc {
    font-size: 26rpx;
    color: #666;
    line-height: 1.5;
}

.service-price {
    font-size: 28rpx;
    color: #27c1c3;
    font-weight: 500;
}

/* 预约按钮样式 */
.book-btn {
    background: #27c1c3;
    color: #fff;
    padding: 16rpx 32rpx;
    border-radius: 12rpx;
    font-size: 28rpx;
    font-weight: 500;
    text-align: center;
    min-width: 120rpx;
}
</style>
