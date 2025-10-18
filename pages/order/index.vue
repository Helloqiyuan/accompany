<template>
  <view class="order-center">
    <!-- 订单状态标签页 -->
    <view class="tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 订单列表 -->
    <scroll-view class="order-list" scroll-y>
      <view 
        v-for="(order, index) in filteredOrders" 
        :key="index"
        class="order-card"
      >
        <view class="order-left">
          <image class="service-icon" :src="order.iconSrc" mode="aspectFit"></image>
        </view>
        
        <view class="order-content">
          <view class="service-name">{{ order.serviceName }}</view>
          <view class="hospital">{{ order.hospital }}</view>
          <view class="appointment-time">预约时间: {{ order.appointmentTime }}</view>
          <view class="patient-name">就诊人: {{ order.patientName }}</view>
        </view>
        
        <view class="order-right">
          <view class="order-status" :class="order.statusClass">{{ order.status }}</view>
          <view v-if="order.countdown" class="countdown">{{ order.countdown }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前选中的标签页
const currentTab = ref(0)

// 标签页数据
const tabs = ref([
  { name: '全部订单', type: 'all' },
  { name: '待支付', type: 'pending_payment' },
  { name: '待服务', type: 'pending_service' },
  { name: '已完成', type: 'completed' },
  { name: '已取消', type: 'cancelled' }
])

// 订单数据
const orders = ref([
  {
    id: 1,
    serviceName: '半天院内陪诊',
    hospital: '九江学院附属医院',
    appointmentTime: '10-04 08:00',
    patientName: '张三',
    status: '待支付',
    statusClass: 'status-pending',
    iconSrc: '/static/func1/1.svg', // 使用SVG图片
    countdown: '00:29:59',
    type: 'pending_payment'
  },
  {
    id: 2,
    serviceName: '半天院内陪诊',
    hospital: '九江附属医院',
    appointmentTime: '10-13 08:00',
    patientName: '张三',
    status: '待服务',
    statusClass: 'status-pending',
    iconSrc: '/static/func1/1.svg', // 使用SVG图片
    countdown: '',
    type: 'pending_service'
  },
  {
    id: 3,
    serviceName: '半天院内陪诊',
    hospital: '九江学院附属医院',
    appointmentTime: '10-13 08:00',
    patientName: '张三',
    status: '已完成',
    statusClass: 'status-completed',
    iconSrc: '/static/func1/1.svg', // 使用SVG图片
    countdown: '',
    type: 'completed'
  },
  {
    id: 4,
    serviceName: '全天院内陪诊',
    hospital: '九江学院附属医院',
    appointmentTime: '10-13 08:00',
    patientName: '张三',
    status: '已取消',
    statusClass: 'status-cancelled',
    iconSrc: '/static/func1/2.svg', // 使用不同的SVG图片
    countdown: '',
    type: 'cancelled'
  }
])

// 根据当前标签页过滤订单
const filteredOrders = computed(() => {
  const currentTabType = tabs.value[currentTab.value].type
  if (currentTabType === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.type === currentTabType)
})

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
}

</script>

<style scoped>
.order-center {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 标签页样式 */
.tabs {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  padding: 30rpx 0;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #007aff;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background-color: #007aff;
  border-radius: 2rpx;
}

/* 订单列表样式 */
.order-list {
  box-sizing: border-box;
  padding: 20rpx;
  height: calc(100vh - 120rpx);
}

.order-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.order-left {
  margin-right: 20rpx;
}

.service-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-content {
  flex: 1;
  margin-right: 20rpx;
}

.service-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.hospital {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.appointment-time {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.patient-name {
  font-size: 24rpx;
  color: #999;
}

.order-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.order-status {
  font-size: 26rpx;
  margin-bottom: 8rpx;
}

.status-pending {
  color: #007aff;
}

.status-completed {
  color: #999;
}

.status-cancelled {
  color: #999;
}

.countdown {
  font-size: 24rpx;
  color: #007aff;
}
</style>
