<template>
    <view class="container">
        <!-- 表单区域 -->
        <view class="form-container">
            <!-- 服务对象姓名 -->
            <view class="form-item">
                <view class="form-label">服务对象姓名</view>
                <input class="form-input" v-model="formData.name" placeholder="请填写姓名" maxlength="20" />
            </view>

            <!-- 服务对象性别 -->
            <view class="form-item">
                <view class="form-label">服务对象性别</view>
                <view class="gender-selector">
                    <view class="gender-btn" style="border-radius: 6rpx 0 0 6rpx;" :class="{ active: formData.gender === '男' }" @click="selectGender('男')">
                        男
                    </view>
                    <view class="gender-btn" style="border-radius: 0 6rpx 6rpx 0;" :class="{ active: formData.gender === '女' }" @click="selectGender('女')">
                        女
                    </view>
                </view>
            </view>

            <!-- 就诊电话 -->
            <view class="form-item">
                <view class="form-label">就诊电话</view>
                <input class="form-input" v-model="formData.phone" placeholder="请输入联系电话" type="number" maxlength="11" />
            </view>

            <!-- 身份证号 -->
            <view class="form-item">
                <view class="form-label">身份证号</view>
                <input class="form-input" v-model="formData.idNumber" placeholder="请输入身份证号" maxlength="18" />
            </view>

            <!-- 与就诊人关系 -->
            <view class="form-item">
                <view class="form-label">与就诊人关系</view>
                <view class="relationship-selector" @click="showRelationshipPicker">
                    <text class="relationship-text" :class="{ placeholder: !formData.relationship }">
                        {{ formData.relationship || '请选择关系' }}
                    </text>
                    <text class="arrow">▼</text>
                </view>
            </view>
        </view>

        <!-- 确认保存按钮 -->
        <view class="save-button" @click="saveServiceObject">
            确认保存
        </view>

        <!-- 关系选择弹窗 -->
        <view class="picker-mask" v-if="showPicker" @click="hidePicker">
            <view class="picker-container" @click.stop>
                <view class="picker-header">
                    <text class="picker-cancel" @click="hidePicker">取消</text>
                    <text class="picker-title">选择关系</text>
                    <text class="picker-confirm" @click="confirmRelationship">确认</text>
                </view>
                <picker-view class="picker-view" :value="pickerValue" @change="onPickerChange">
                    <picker-view-column>
                        <view v-for="(item, index) in relationshipOptions" :key="index" class="picker-item">
                            {{ item }}
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 声明uni全局对象
declare const uni: any

// 表单数据
const formData = reactive({
    name: '', // 姓名
    gender: '男', // 性别，默认为男
    phone: '', // 电话
    idNumber: '', // 身份证号
    relationship: '' // 关系
})

// 关系选项
const relationshipOptions = [
    '本人',
    '父母',
    '配偶',
    '子女',
    '兄弟姐妹',
    '朋友',
    '其他'
]

// 选择器相关状态
const showPicker = ref(false)
const pickerValue = ref([0])
const selectedRelationship = ref('')

// 选择性别
const selectGender = (gender: string) => {
    formData.gender = gender
}

// 显示关系选择器
const showRelationshipPicker = () => {
    showPicker.value = true
    // 如果已选择关系，设置当前值
    if (formData.relationship) {
        const index = relationshipOptions.indexOf(formData.relationship)
        if (index !== -1) {
            pickerValue.value = [index]
        }
    }
}

// 隐藏关系选择器
const hidePicker = () => {
    showPicker.value = false
}

// 选择器值改变
const onPickerChange = (e: any) => {
    const index = e.detail.value[0]
    selectedRelationship.value = relationshipOptions[index]
}

// 确认关系选择
const confirmRelationship = () => {
    formData.relationship = selectedRelationship.value
    hidePicker()
}

// 验证表单
const validateForm = () => {
    if (!formData.name.trim()) {
        uni.showToast({
            title: '请输入姓名',
            icon: 'none'
        })
        return false
    }

    if (!formData.phone.trim()) {
        uni.showToast({
            title: '请输入联系电话',
            icon: 'none'
        })
        return false
    }

    // 验证手机号格式
    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(formData.phone)) {
        uni.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
        })
        return false
    }

    if (!formData.idNumber.trim()) {
        uni.showToast({
            title: '请输入身份证号',
            icon: 'none'
        })
        return false
    }

    // 验证身份证号格式
    const idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!idReg.test(formData.idNumber)) {
        uni.showToast({
            title: '请输入正确的身份证号',
            icon: 'none'
        })
        return false
    }

    if (!formData.relationship) {
        uni.showToast({
            title: '请选择与就诊人关系',
            icon: 'none'
        })
        return false
    }

    return true
}

// 保存服务对象
const saveServiceObject = () => {
    if (!validateForm()) {
        return
    }

    // 显示加载提示
    uni.showLoading({
        title: '保存中...'
    })

    // 模拟保存操作
    setTimeout(() => {
        uni.hideLoading()

        // 这里应该调用API保存数据
        console.log('保存的服务对象信息:', formData)

        uni.showToast({
            title: '保存成功',
            icon: 'success'
        })

        // 延迟返回上一页
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    }, 1000)
}
</script>

<style scoped lang="scss">
.container {
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 20rpx;
}

// 表单容器
.form-container {
    background-color: white;
    border-radius: 12rpx;
    margin-bottom: 40rpx;
}

// 表单项
.form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx 24rpx;
    border-bottom: 1rpx solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }
}

// 表单标签
.form-label {
    width: 200rpx;
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}

// 表单输入框
.form-input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    text-align: right;

    &::placeholder {
        color: #999;
    }
}

// 性别选择器
.gender-selector {
    display: flex;
}

.gender-btn {
    padding: 12rpx 32rpx;
    font-size: 28rpx;
    color: #666;
    background-color: #f5f5f5;
    border: 1rpx solid #e0e0e0;
    transition: all 0.3s ease;

    &.active {
        background-color: #43c3d9;
        color: white;
        border-color: #43c3d9;
    }
}

// 关系选择器
.relationship-selector {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #333;
}

.relationship-text {
    &.placeholder {
        color: #999;
    }
}

.arrow {
    font-size: 20rpx;
    color: #999;
    margin-left: 16rpx;
}

// 保存按钮
.save-button {
    background-color: #43c3d9;
    color: white;
    text-align: center;
    padding: 32rpx;
    border-radius: 12rpx;
    font-size: 32rpx;
    font-weight: 500;
    box-shadow: 0 4rpx 12rpx rgba(67, 195, 217, 0.3);
    transition: all 0.3s ease;

    &:active {
        background-color: #3ab8cc;
        transform: translateY(2rpx);
    }
}

// 选择器弹窗遮罩
.picker-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: flex-end;
}

// 选择器容器
.picker-container {
    width: 100%;
    background-color: white;
    border-radius: 24rpx 24rpx 0 0;
    max-height: 60vh;
}

// 选择器头部
.picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    border-bottom: 1rpx solid #f0f0f0;
}

.picker-cancel,
.picker-confirm {
    font-size: 28rpx;
    color: #43c3d9;
}

.picker-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
}

// 选择器视图
.picker-view {
    height: 400rpx;
}

.picker-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #333;
    height: 80rpx;
}
</style>
