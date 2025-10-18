<template>
    <view class="user-protocol-page">
  
      <!-- 协议内容区域 -->
      <scroll-view class="content-scroll" scroll-y="true">
        <view class="protocol-content">
          <!-- 欢迎段落 -->
          <view class="welcome-section">
            <text class="welcome-text">
              欢迎您使用我们的平台服务!在您开始使用之前,请仔细阅读以下条款。当您使用我们的服务时,即表示您已阅读、理解并同意遵守本协议的所有内容。如果您不同意本协议的任何条款,请停止使用我们的服务。
            </text>
          </view>
  
          <!-- 第1节：账号注册与使用 -->
          <view class="section">
            <view class="section-title">1. 账号注册与使用</view>
            <view class="subsection">
              <view class="subsection-title">1.1</view>
              <text class="subsection-text">
                您需要注册一个账号才能使用我们的服务。注册时需要提供真实、准确、完整的个人信息,并确保及时更新这些信息。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">1.2</view>
              <text class="subsection-text">
                您的账号仅供您个人使用,不得转让、出借或授权给他人使用。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">1.3</view>
              <text class="subsection-text">
                您应当妥善保管您的账号和密码,不得将其泄露给他人,否则由此产生的责任由您承担。
              </text>
            </view>
          </view>
  
          <!-- 第2节：用户权利和义务 -->
          <view class="section">
            <view class="section-title">2. 用户权利和义务</view>
            <view class="subsection">
              <view class="subsection-title">2.1</view>
              <text class="subsection-text">
                您有权根据我们的规定使用我们提供的服务,包括浏览商品、下单购买商品等。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">2.2</view>
              <text class="subsection-text">
                您应当遵守国家法律法规、社会公共道德,不得利用我们的服务从事任何违法、侵权或损害他人利益的行为。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">2.3</view>
              <text class="subsection-text">
                您应当尊重其他用户的权利和合法利益,不得干扰、损害其他用户的正常使用。
              </text>
            </view>
          </view>
  
          <!-- 第3节：平台服务 -->
          <view class="section">
            <view class="section-title">3. 平台服务</view>
            <view class="subsection">
              <view class="subsection-title">3.1</view>
              <text class="subsection-text">
                我们将竭尽所能为您提供安全、稳定、高效的服务,但不对服务的及时性、安全性、准确性做任何承诺。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">3.2</view>
              <text class="subsection-text">
                我们有权根据业务发展和法律法规的变化,调整、改进或终止部分或全部服务,并将在平台上进行公告。
              </text>
            </view>
          </view>
  
          <!-- 第4节：用户信息保护 -->
          <view class="section">
            <view class="section-title">4. 用户信息保护</view>
            <view class="subsection">
              <view class="subsection-title">4.1</view>
              <text class="subsection-text">
                我们重视您的隐私保护,将按照相关法律法规和隐私政策的规定收集、使用、存储您的个人信息。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">4.2</view>
              <text class="subsection-text">
                我们不会向第三方出售、出租或以其他方式披露您的个人信息,除非获得您的明确同意或法律法规另有规定。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">4.3</view>
              <text class="subsection-text">
                我们将采取合理的技术和管理措施保护您的个人信息安全,防止信息泄露、丢失、损毁或被非法使用。
              </text>
            </view>
          </view>
  
          <!-- 第5节：免责声明 -->
          <view class="section">
            <view class="section-title">5. 免责声明</view>
            <view class="subsection">
              <view class="subsection-title">5.1</view>
              <text class="subsection-text">
                因不可抗力、网络故障、系统维护等原因导致的服务中断或延迟,我们不承担责任。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">5.2</view>
              <text class="subsection-text">
                您在使用服务过程中产生的任何损失,我们仅在法律规定的范围内承担责任。
              </text>
            </view>
          </view>
  
          <!-- 第6节：协议修改 -->
          <view class="section">
            <view class="section-title">6. 协议修改</view>
            <view class="subsection">
              <view class="subsection-title">6.1</view>
              <text class="subsection-text">
                我们有权根据业务发展需要和法律法规变化,随时修改本协议条款。
              </text>
            </view>
            <view class="subsection">
              <view class="subsection-title">6.2</view>
              <text class="subsection-text">
                协议修改后,我们将通过平台公告等方式通知您。如您继续使用服务,视为同意修改后的协议。
              </text>
            </view>
          </view>
  
          <!-- 结尾段落 -->
          <view class="footer-section">
            <text class="footer-text">
              本协议自您使用我们的服务之日起生效。如有疑问,请联系我们的客服团队。
            </text>
          </view>
        </view>
      </scroll-view>
    </view>
  </template>
  
  <script setup lang="ts">
  // 用户协议页面组件
  </script>
  
  <style scoped lang="scss">
  .user-protocol-page {
    background-color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  
  // 滚动内容区域
  .content-scroll {
    flex: 1;
    height: 100vh;
  }
  
  .protocol-content {
    padding: 30rpx;
    line-height: 1.6;
  }
  
  // 欢迎段落样式
  .welcome-section {
    margin-bottom: 40rpx;
  
    .welcome-text {
      font-size: 28rpx;
      color: #333333;
      line-height: 1.8;
    }
  }
  
  // 章节样式
  .section {
    margin-bottom: 40rpx;
  
    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
      padding-bottom: 10rpx;
      border-bottom: 2rpx solid #f0f0f0;
    }
  }
  
  // 子章节样式
  .subsection {
    display: flex;
    margin-bottom: 20rpx;
    align-items: flex-start;
  
    .subsection-title {
      font-size: 26rpx;
      font-weight: bold;
      color: #333333;
      margin-right: 20rpx;
      min-width: 60rpx;
      flex-shrink: 0;
    }
  
    .subsection-text {
      font-size: 26rpx;
      color: #666666;
      line-height: 1.7;
      flex: 1;
    }
  }
  
  // 结尾段落样式
  .footer-section {
    margin-top: 40rpx;
    padding-top: 30rpx;
    border-top: 1rpx solid #f0f0f0;
  
    .footer-text {
      font-size: 26rpx;
      color: #999999;
      line-height: 1.7;
      text-align: center;
    }
  }
  </style>
  