<template>
  <view class="setting-page">
    <!-- 个人设置区域 -->
    <view class="setting-section">
      <view class="setting-item" @click="goToPersonalSettings">
        <view class="setting-content">
          <view class="setting-text">个人设置</view>
          <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
        </view>
      </view>
      
      <!-- 版本号显示 -->
      <view class="setting-item version-item">
        <view class="setting-content">
          <view class="setting-text">版本号</view>
          <view class="version-text">1.0.1</view>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-section">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
// 跳转到个人设置页面
const goToPersonalSettings = () => {
  uni.navigateTo({
    url: '/pages/mine/personalProfile'
  })
}

// 处理退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除用户登录信息
        uni.removeStorageSync('userToken')
        uni.removeStorageSync('userInfo')
        
        // 跳转到登录页面或首页
        uni.reLaunch({
          url: '/pages/home/index'
        })
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
          duration: 1500
        })
      }
    }
  })
}
</script>

<style scoped lang="scss">
.setting-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20rpx;
}

// 设置区域样式
.setting-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 40rpx;
  overflow: hidden;
}

.setting-item {
  padding: 0 30rpx;
  
  &:not(:last-child) {
    border-bottom: 1rpx solid #f0f0f0;
  }
}

.setting-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 0;
  min-height: 40rpx;
}

.setting-text {
  font-size: 28rpx;
  color: #333333;
  font-weight: 400;
}

.arrow-icon {
  width: 24rpx;
  height: 24rpx;
  opacity: 0.6;
}

// 版本号特殊样式
.version-item {
  .setting-content {
    justify-content: space-between;
  }
  
  .version-text {
    font-size: 28rpx;
    color: #666666;
  }
}

// 退出登录区域样式
.logout-section {
  padding: 0 20rpx;
}

.logout-btn {
  width: 100%;
  height: 88rpx;
  background-color: #ffffff;
  border: none;
  border-radius: 16rpx;
  font-size: 32rpx;
  color: #333333;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // 按钮点击效果
  &:active {
    background-color: #f8f8f8;
    transform: scale(0.98);
  }
  
  // 移除默认按钮样式
  &::after {
    border: none;
  }
}
</style>
