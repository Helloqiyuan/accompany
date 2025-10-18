<template>
  <view class="personal-center">
    <!-- 用户资料区域 -->
    <view class="radius user-profile">
      <view class="avatar">
        <image src="/static/mine/avatar.svg" class="avatar-img" mode="aspectFill" />
      </view>
      <view class="user-info">
        <view class="login-text">登录/注册</view>
        <view class="login-subtitle">登录享更多功能</view>
      </view>
    </view>

    <!-- 我的服务区域 -->
    <view class="radius my-services">
      <view class="section-title">我的服务</view>
      <view class="service-item" @click="goToServiceManagement">
        <view class="service-item-content">
          <image src="/static/mine/serviceobjectmanagement.svg" class="service-icon" mode="aspectFit" />
          <view class="service-text">服务对象管理</view>
        </view>
      </view>
    </view>

    <!-- 法律条款和设置区域 -->
    <view class="radius legal-settings">
      <view class="setting-item" @click="goToUserAgreement">
        <image src="/static/mine/userprotocol.svg" class="setting-icon" mode="aspectFit" />
        <view class="setting-text">用户协议</view>
        <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
      </view>
      <view class="setting-item" @click="goToPrivacyPolicy">
        <image src="/static/mine/privateprotocol.svg" class="setting-icon" mode="aspectFit" />
        <view class="setting-text">隐私协议</view>
        <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
      </view>
      <view class="setting-item" @click="goToBasicSettings">
        <image src="/static/mine/basesetiings.svg" class="setting-icon" mode="aspectFit" />
        <view class="setting-text">基本设置</view>
        <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 跳转到服务对象管理页面
const goToServiceManagement = () => {
  uni.navigateTo({
    url: '/pages/serviceObjectList/index'
  })
}

// 跳转到用户协议页面
const goToUserAgreement = () => {
  uni.navigateTo({
    url: '/pages/mine/userprotocol'
  })
}

// 跳转到隐私协议页面
const goToPrivacyPolicy = () => {
  uni.navigateTo({
    url: '/pages/mine/privateprotocol'
  })
}

// 跳转到基本设置页面
const goToBasicSettings = () => {
  uni.navigateTo({
    url: '/pages/mine/setting'
  })
}
</script>

<style scoped lang="scss">
.personal-center {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.radius {
  border-radius: 16rpx;
  margin:0 16rpx 16rpx 16rpx;
}
// 用户资料区域样式
.user-profile {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  
  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    overflow: hidden;
    margin-right: 30rpx;
    // TODO:图片加阴影
    
    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }
  
  .user-info {
    flex: 1;
    
    .login-text {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 10rpx;
    }
    
    .login-subtitle {
      font-size: 24rpx;
      color: #999999;
    }
  }
}

// 我的服务区域样式
.my-services {
  padding: 30rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
  
  .section-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 30rpx;
  }
  
  .service-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    justify-content: flex-start;
    .service-item-content{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 10rpx;
    }
    
    .service-icon {
      width: 80rpx;
      height: 80rpx;
      margin-right: 20rpx;
      color: #20B2AA;
    }
    
    .service-text {
      font-size: 24rpx;
      color: #333333;
    }
  }
}

// 法律条款和设置区域样式
.legal-settings {
  padding: 30rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
  
  .setting-item {
    display: flex;
    align-items: center;
    padding: 25rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
     .setting-icon {
       width: 36rpx;
       height: 36rpx;
       margin-right: 40rpx;
     }
    
    .setting-text {
      flex: 1;
      font-size: 28rpx;
      color: #333333;
    }
    
     .arrow-icon {
       width: 24rpx;
       height: 24rpx;
     }
  }
}
</style>
