<template>
  <view class="container">
    <!-- 服务对象列表 -->
    <view class="service-object-list">
      <view class="service-object-card" v-for="(item, index) in serviceObjects" :key="index">
        <!-- 左侧信息区域 -->
        <view class="info-section">
          <!-- 姓名和标签 -->
          <view class="name-row">
            <text class="name">{{ item.name }}</text>
            <view class="tag">{{ item.relationship }}</view>
          </view>

          <!-- 详细信息 -->
          <view class="detail-row">
            <text class="detail">{{ item.gender }}</text>
            <text class="separator">|</text>
            <text class="detail">{{ item.age }}岁</text>
            <text class="id-number">{{ item.idNumber }}</text>
          </view>
        </view>

        <!-- 右侧操作按钮 -->
        <view class="action-section">
          <button class="base-btn edit-btn" @click="editServiceObject(index)">编辑</button>
          <button class="base-btn delete-btn" @click="deleteServiceObject(index)">删除</button>
        </view>
      </view>
    </view>

    <!-- 新增服务对象按钮 -->
    <view class="add-button" @click="addServiceObject">
      <text class="add-icon">+</text>
      <text class="add-text">新增服务对象</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 声明uni全局对象
declare const uni: any

// 服务对象数据
const serviceObjects = ref([
  {
    name: '张三',
    relationship: '本人',
    gender: '男',
    age: 22,
    idNumber: '1231412414141'
  },
  {
    name: '李四',
    relationship: '家属',
    gender: '女',
    age: 45,
    idNumber: '9876543210987'
  },
  {
    name: '王五',
    relationship: '朋友',
    gender: '男',
    age: 30,
    idNumber: '4567891234567'
  }
])

// 编辑服务对象
const editServiceObject = (index: number) => {
  console.log('编辑服务对象:', serviceObjects.value[index])
  // 这里可以跳转到编辑页面或显示编辑弹窗
  uni.showToast({
    title: '编辑功能待实现',
    icon: 'none'
  })
}

// 删除服务对象
const deleteServiceObject = (index: number) => {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除 ${serviceObjects.value[index].name} 吗？`,
    success: (res) => {
      if (res.confirm) {
        serviceObjects.value.splice(index, 1)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

// 新增服务对象
const addServiceObject = () => {
  console.log('新增服务对象')
  // 这里可以跳转到新增页面或显示新增弹窗
  uni.navigateTo({
    url: '/pages/chooseServiceObject/newServiceObject/index'
  })
}
</script>

<style scoped lang="scss">
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20rpx;
}

// 服务对象列表
.service-object-list {
  margin-bottom: 20rpx;
}

// 服务对象卡片
.service-object-card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 左侧信息区域
.info-section {
  flex: 1;
}

// 姓名和标签行
.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-right: 16rpx;
}

.tag {
  padding: 4rpx 12rpx;
  border: 1rpx solid #ddd;
  border-radius: 4rpx;
  font-size: 24rpx;
  color: #666;
}

// 详细信息行
.detail-row {
  display: flex;
  align-items: center;
  font-size: 28rpx;
}

.detail {
  margin-right: 16rpx;
}

.separator {
  margin-right: 16rpx;
}

.id-number {
  padding-left: 20rpx;
  font-size: 24rpx;
}

// 右侧操作按钮区域
.action-section {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

// 基础按钮样式 - 提取编辑和删除按钮的共性
.base-btn {
  width: 120rpx;
  height: 60rpx;
  color: white;
  border: none;
  border-radius: 6rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 编辑按钮 - 继承基础样式并设置特定背景色
.edit-btn {
  background-color: #1890ff;
}

// 删除按钮 - 继承基础样式并设置特定背景色
.delete-btn {
  background-color: #ff4d4f;
}

// 新增按钮
.add-button {
  background-color: white;
  border-radius: 12rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.add-icon {
  font-size: 32rpx;
  color: #1890ff;
  font-weight: bold;
}

.add-text {
  font-size: 28rpx;
  color: #1890ff;
}
</style>
