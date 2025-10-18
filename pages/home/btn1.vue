<template>
    <view class="content">
        <!-- 顶部提示文案：说明服务可能因医院不同而有差异 -->
        <view class="tip-text">请选择您需要的服务(不同医院最终价格可能略有变化)</view>

        <!-- 服务卡片列表，使用v-for遍历数据 -->
        <view 
            class="service-card" 
            v-for="(service, index) in serviceList" 
            :key="service.id"
        >
            <!-- 左侧图标区域，使用本地 svg 资源 -->
            <view class="icon-wrap">
                <image class="icon" :src="service.icon" mode="aspectFit" />
            </view>
            <!-- 中部文案区域：标题 + 描述 -->
            <view class="info">
                <view class="title">{{ service.title }}</view>
                <view class="desc">{{ service.description }}</view>
            </view>
            <!-- 右侧预约按钮，用 view 而不是 button，保持全局纯 view 布局要求 -->
            <view class="book-btn" @click="handleBook(service)">预约</view>
        </view>

        <!-- 底部占位与更多服务提示 -->
        <view class="more-tip">- 更多服务即将接入，敬请期待 -</view>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// 定义服务数据类型
interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon: string;
}

// 服务列表数据
const serviceList = ref([
    {
        id: 1,
        title: '半天院内陪诊',
        description: '半天就医陪同服务，院内手续代办代跑服务',
        icon: '/static/func1/1.svg'
    },
    {
        id: 2,
        title: '全天院内陪诊',
        description: '全程就医陪同服务，院内手续代办代跑服务',
        icon: '/static/func1/2.svg'
    }
]);

// 处理预约按钮点击事件
const handleBook = (service: ServiceItem) => {
    console.log('预约服务:', service.title);
    // 这里可以添加预约逻辑，比如跳转到预约页面或弹出确认框
    // 使用uni-app的API显示提示
    // @ts-ignore
    uni.showToast({
        title: `预约${service.title}`,
        icon: 'none'
    });

};
</script>
<style scoped lang="scss">

@import "/static/css/global.scss";
.content {
    background: #f7f8fa;
    min-height: 100vh;
    padding: 16rpx;
}

/* 顶部说明文案样式 */
.tip-text {
    /* 字体大小与颜色，模拟示例中的弱提示 */
    font-size: 25rpx;
    color: #333;
    padding: 16rpx 8rpx 24rpx 8rpx;
}

/* 服务卡片通用容器样式 */
.service-card {
    /* 白色卡片 + 阴影 + 圆角 */
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
    /* 行内布局：左图标，中间信息，右按钮 */
    display: flex;
    align-items: center;
    padding: 24rpx;
    margin-bottom: 24rpx;
}

/* 左侧图标包裹，控制尺寸与居中 */
.icon-wrap {
    width: 120rpx;
    height: 120rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
}

/* 图标尺寸自适应容器 */
.icon {
    width: 100rpx;
    height: 100rpx;
}

/* 中部信息区域：占据剩余空间 */
.info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

/* 标题样式，接近示例字体权重 */
.title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
}

/* 描述文案样式 */
.desc {
    font-size: 26rpx;
    color: #666;
    line-height: 1.6;
}

/* 右侧预约按钮样式（使用 view 实现圆角块） */
.book-btn {
    /* 高亮主色，接近示例中的蓝绿色按钮 */
    background: #27c1c3;
    color: #fff;
    padding: 12rpx 28rpx;
    border-radius: 12rpx;
    font-size: 26rpx;
    font-weight: 500;
}

/* 底部更多服务提示 */
.more-tip {
    text-align: center;
    color: #b2b2b2;
    font-size: 24rpx;
    margin-top: 40rpx;
    padding-bottom: 24rpx;
}
</style>
