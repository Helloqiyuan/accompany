<template>
    <view class="personal-profile-page">
        <!-- 个人信息设置区域 -->
        <view class="profile-section">
            <!-- 头像设置 -->
            <view class="profile-item" @click="changeAvatar">
                <view class="profile-label">头像</view>
                <view class="profile-content">
                    <image :src="userInfo.avatar || '/static/mine/avatar.svg'" class="avatar-img" mode="aspectFill" />
                    <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
                </view>
            </view>

            <!-- 昵称设置 -->
            <view class="profile-item" @click="editNickname">
                <view class="profile-label">昵称</view>
                <view class="profile-content">
                    <view class="profile-value">{{ userInfo.nickname || '未设置' }}</view>
                    <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
                </view>
            </view>

            <!-- 性别设置 -->
            <view class="profile-item" @click="selectGender">
                <view class="profile-label">性别</view>
                <view class="profile-content">
                    <view class="profile-value">{{ userInfo.gender || '未设置' }}</view>
                    <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
                </view>
            </view>

            <!-- 手机号设置 -->
            <view class="profile-item" @click="editPhone">
                <view class="profile-label">手机号</view>
                <view class="profile-content">
                    <view class="profile-value">{{ userInfo.phone || '未设置' }}</view>
                    <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
                </view>
            </view>

            <!-- 生日设置 -->
            <view class="profile-item" @click="selectBirthday">
                <view class="profile-label">生日</view>
                <view class="profile-content">
                    <view class="profile-value">{{ userInfo.birthday || '未设置' }}</view>
                    <image src="/static/mine/rightrow.svg" class="arrow-icon" mode="aspectFit" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 声明 uni 全局对象
declare const uni: any

// 用户信息数据
const userInfo = reactive({
    avatar: '', // 头像
    nickname: '', // 昵称
    gender: '', // 性别
    phone: '', // 手机号
    birthday: '' // 生日
})

// 页面加载时获取用户信息
onMounted(() => {
    loadUserInfo()
    // 监听刷新用户信息事件
    uni.$on('refreshUserInfo', () => {
        loadUserInfo()
    })
})

// 页面销毁时清理事件监听器
onUnmounted(() => {
    uni.$off('refreshUserInfo')
})

// 加载用户信息
const loadUserInfo = () => {
    // 从本地存储获取用户信息
    const storedUserInfo = uni.getStorageSync('userInfo')
    if (storedUserInfo) {
        Object.assign(userInfo, storedUserInfo)
    }
}

// 保存用户信息到本地存储
const saveUserInfo = () => {
    uni.setStorageSync('userInfo', userInfo)
}

// 更换头像
const changeAvatar = () => {
    uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            const tempFilePath = res.tempFilePaths[0]
            userInfo.avatar = tempFilePath
            saveUserInfo()

            uni.showToast({
                title: '头像更新成功',
                icon: 'success',
                duration: 1500
            })
        },
        fail: (err) => {
            console.error('选择头像失败:', err)
            uni.showToast({
                title: '选择头像失败',
                icon: 'none',
                duration: 1500
            })
        }
    })
}

// 编辑昵称
const editNickname = () => {
    uni.showModal({
        title: '编辑昵称',
        editable: true,
        placeholderText: '请输入昵称',
        content: userInfo.nickname || '',
        success: (res) => {
            if (res.confirm && res.content) {
                userInfo.nickname = res.content.trim()
                saveUserInfo()

                uni.showToast({
                    title: '昵称更新成功',
                    icon: 'success',
                    duration: 1500
                })
            }
        }
    })
}

// 选择性别
const selectGender = () => {
    uni.showActionSheet({
        itemList: ['男', '女'],
        success: (res) => {
            const genderOptions = ['男', '女']
            userInfo.gender = genderOptions[res.tapIndex]
            saveUserInfo()

            uni.showToast({
                title: '性别更新成功',
                icon: 'success',
                duration: 1500
            })
        }
    })
}

// 编辑手机号 - 跳转到更新手机号页面
const editPhone = () => {
    uni.navigateTo({
        url: '/pages/mine/updatePhoneNumber'
    })
}

// 选择生日
const selectBirthday = () => {
    uni.showModal({
        title: '选择生日',
        editable: true,
        placeholderText: '请输入生日，格式：1991-10-10',
        content: userInfo.birthday || '',
        success: (res) => {
            if (res.confirm && res.content) {
                const birthday = res.content.trim()
                // 简单的日期格式验证
                if (/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
                    userInfo.birthday = birthday
                    saveUserInfo()

                    uni.showToast({
                        title: '生日更新成功',
                        icon: 'success',
                        duration: 1500
                    })
                } else {
                    uni.showToast({
                        title: '请输入正确的日期格式',
                        icon: 'none',
                        duration: 1500
                    })
                }
            }
        }
    })
}
</script>

<style scoped lang="scss">
.personal-profile-page {
    background-color: #f5f5f5;
    min-height: 100vh;
}

// 个人信息设置区域样式
.profile-section {
    background-color: #ffffff;
    border-radius: 16rpx;
    margin: 20rpx;
    margin-top: 0;
    overflow: hidden;
}

.profile-item {
    display: flex;
    align-items: center;
    //   justify-content: space-between;
    padding: 0 30rpx;
    min-height: 100rpx;

    &:not(:last-child) {
        border-bottom: 1rpx solid #f0f0f0;
    }
}

.profile-label {
    font-size: 28rpx;
    color: #333333;
    font-weight: 400;
    width: 120rpx;
    flex-shrink: 0;
}

.profile-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    margin-left: 30rpx;
}

.profile-value {
    font-size: 28rpx;
    color: #666666;
    //   flex: 1;
}

// 头像样式
.avatar-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
}

// 箭头图标样式
.arrow-icon {
    margin-left: 20rpx;
    width: 24rpx;
    height: 24rpx;
    opacity: 0.6;
}
</style>
