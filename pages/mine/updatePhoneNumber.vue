<template>
    <view class="update-phone-container">

        <!-- 主要内容区域 -->
        <view class="content-area">
            <!-- 手机号输入框 -->
            <view class="input-group">
                <input class="phone-input" type="number" placeholder="请填写手机号" v-model="phoneNumber" maxlength="11"
                    @input="onPhoneInput" />
            </view>

            <!-- 验证码输入框 -->
            <view class="input-group">
                <input class="code-input" type="number" placeholder="请填写验证码" v-model="verificationCode" maxlength="6"
                    @input="onCodeInput" />
                <button class="send-code-btn" :disabled="!canSendCode" @click="sendVerificationCode">
                    {{ sendCodeText }}
                </button>
            </view>

        </view>
        <!-- 保存按钮 -->
         <view class="logout-section">
             <button class="save-btn" :disabled="!canSave" @click="savePhoneNumber">保存</button>
         </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: '', // 手机号
            verificationCode: '', // 验证码
            countdown: 0, // 倒计时
            timer: null, // 定时器
            isSending: false, // 是否正在发送验证码
        }
    },
    computed: {
        // 是否可以发送验证码
        canSendCode() {
            return this.isValidPhone(this.phoneNumber) && this.countdown === 0 && !this.isSending
        },
        // 是否可以保存
        canSave() {
            return this.isValidPhone(this.phoneNumber) && this.verificationCode.length === 6
        },
        // 发送验证码按钮文本
        sendCodeText() {
            if (this.isSending) {
                return '发送中...'
            }
            if (this.countdown > 0) {
                return `${this.countdown}s`
            }
            return '发送验证码'
        }
    },
    methods: {

        // 手机号输入处理
        onPhoneInput(e) {
            this.phoneNumber = e.detail.value
        },

        // 验证码输入处理
        onCodeInput(e) {
            this.verificationCode = e.detail.value
        },

        // 验证手机号格式
        isValidPhone(phone) {
            const phoneReg = /^1[3-9]\d{9}$/
            return phoneReg.test(phone)
        },

        // 发送验证码
        async sendVerificationCode() {
            if (!this.canSendCode) return

            try {
                this.isSending = true

                // 这里调用发送验证码的API
                // const result = await this.sendCodeAPI(this.phoneNumber)

                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1000))

                uni.showToast({
                    title: '验证码已发送',
                    icon: 'success'
                })

                // 开始倒计时
                this.startCountdown()

            } catch (error) {
                console.error('发送验证码失败:', error)
                uni.showToast({
                    title: '发送失败，请重试',
                    icon: 'error'
                })
            } finally {
                this.isSending = false
            }
        },

        // 开始倒计时
        startCountdown() {
            this.countdown = 60
            this.timer = setInterval(() => {
                this.countdown--
                if (this.countdown <= 0) {
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 1000)
        },

        // 保存手机号
        async savePhoneNumber() {
            if (!this.canSave) return

            try {
                uni.showLoading({
                    title: '保存中...'
                })

                // 这里调用更新手机号的API
                // const result = await this.updatePhoneAPI({
                //   phoneNumber: this.phoneNumber,
                //   verificationCode: this.verificationCode
                // })

                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1500))

                uni.hideLoading()
                uni.showToast({
                    title: '手机号更新成功',
                    icon: 'success'
                })

                // 延迟返回上一页并通知刷新数据
                setTimeout(() => {
                    // 通知上一页刷新用户信息
                    uni.$emit('refreshUserInfo')
                    uni.navigateBack()
                }, 1500)

            } catch (error) {
                uni.hideLoading()
                console.error('更新手机号失败:', error)
                uni.showToast({
                    title: '更新失败，请重试',
                    icon: 'error'
                })
            }
        }
    },

    // 页面销毁时清理定时器
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }
}
</script>

<style scoped lang="scss">
.update-phone-container {
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}


/* 内容区域样式 */
.content-area {
    width: 648rpx;
    padding: 40rpx 30rpx;
    border-radius: 16rpx;
    margin: 0 32rpx;
    background-color: #fff;
}

.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    border-bottom: 1rpx solid #eee;
}

.input-group:last-child {
    margin-bottom: 0;
}

.phone-input,
.code-input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    padding: 10rpx 0;
}

.code-input {
    margin-right: 20rpx;
}

.send-code-btn {
    height: 60rpx;
    background-color: #ffffff;
    border: 1rpx solid #e0e0e0;
    border-radius: 8rpx;
    font-size: 24rpx;
    color: #333333;
    font-weight: 500;
    min-width: 140rpx;
    margin-bottom: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.send-code-btn:active {
    background-color: #f8f8f8;
    transform: scale(0.98);
}

.send-code-btn:disabled {
    background-color: #f5f5f5;
    color: #999999;
    border-color: #e0e0e0;
}

.send-code-btn::after {
    border: none;
}


// 保存按钮区域样式
.logout-section {
    margin-top: 40rpx;
    padding: 0 20rpx;
}

.save-btn {
    width: 688rpx;
    height: 88rpx;
    background-color: #ffffff !important;
    border: none;
    border-radius: 16rpx;
    font-size: 32rpx;
    color: #333333 !important;
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

/* 输入框占位符样式 */
.phone-input::placeholder,
.code-input::placeholder {
    color: #999;
    font-size: 28rpx;
}
</style>
