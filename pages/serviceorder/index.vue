<template>
    <view class="service-order-page">
        <!-- 进度条 -->
        <view class="progress-section">
            <wd-steps :active="0" direction="horizontal" align-center active-color="#43c3d9">
                <wd-step title="填写订单" />
                <wd-step title="在线支付" />
                <wd-step title="专人服务" />
                <wd-step title="服务完成" />
            </wd-steps>
        </view>

        <!-- 服务详情 -->
        <view class="service-detail-section">
            <view class="service-info">
                <view class="service-icon">
                    <wd-icon name="clock" size="24px" color="#ff9500" />
                </view>
                <view class="service-content">
                    <text class="service-title">半天院内陪诊</text>
                    <view class="service-desc">
                        <wd-icon name="info" size="16px" color="#999" />
                        <text class="service-link" @click="showServiceContent">服务内容</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 表单区域 -->
        <view class="form-section">
            <wd-form ref="form" :model="formData" :rules="rules">
                <!-- 就诊医院 -->
                <wd-cell-group>
                    <wd-form-item prop="hospital" label="就诊医院" required>
                        <wd-input v-model="formData.hospital" placeholder="请选择要就诊的医院" readonly suffix-icon="arrow-right"
                            @click="selectHospital" />
                    </wd-form-item>
                </wd-cell-group>

                <!-- 就诊时间 -->
                <wd-cell-group>
                    <wd-form-item prop="appointmentTime" label="就诊时间" required>
                        <wd-input v-model="formData.appointmentTime" placeholder="请选择就诊时间" readonly
                            suffix-icon="arrow-right" @click="selectTime" />
                    </wd-form-item>
                </wd-cell-group>

                <!-- 就诊人 -->
                <wd-cell-group>
                    <wd-form-item prop="patient" label="就诊人" required>
                        <wd-input v-model="formData.patient" placeholder="请选择就诊人" readonly suffix-icon="arrow-right"
                            @click="selectPatient" />
                    </wd-form-item>
                </wd-cell-group>

                <!-- 联系电话 -->
                <wd-cell-group>
                    <wd-form-item prop="phone" label="联系电话" required>
                        <wd-input v-model="formData.phone" placeholder="请填写您的联系电话" type="tel" />
                    </wd-form-item>
                </wd-cell-group>

                <!-- 服务需求 -->
                <wd-cell-group>
                    <wd-form-item prop="requirements" label="服务需求">
                        <wd-textarea v-model="formData.requirements" placeholder="请简单描述您要就诊的科室..." :maxlength="200"
                            show-word-limit :rows="2" class="service-requirements-textarea" />
                    </wd-form-item>
                </wd-cell-group>
            </wd-form>
        </view>

        <!-- 用户协议 -->
        <view class="agreement-section">
            <wd-checkbox v-model="agreed">
                <text class="agreement-text">
                    我已阅读并接受
                    <text class="agreement-link" @click="showUserAgreement">《用户协议》</text>
                    和
                    <text class="agreement-link" @click="showServiceAgreement">《服务协议》</text>
                </text>
            </wd-checkbox>
        </view>

        <!-- 确认按钮 -->
        <view class="confirm-section">
            <wd-button type="primary" size="large" :disabled="!canSubmit" @click="confirmOrder" block custom-style="background-color: #43c3d9; border-color: #43c3d9;">
                确认下单 (支付¥50.00)
            </wd-button>
        </view>

        <!-- 医院选择弹窗 -->
        <wd-popup v-model="showHospitalPicker" position="bottom" safe-area-inset-bottom>
            <view class="hospital-picker-popup">
                <view class="picker-header">
                    <text class="picker-title">选择就诊医院</text>
                    <wd-icon name="close" size="20px" color="#999" @click="showHospitalPicker = false" />
                </view>
                <view class="hospital-list">
                    <view 
                        v-for="(hospital, index) in hospitalOptions" 
                        :key="index"
                        class="hospital-item"
                        :class="{ 'selected': selectedHospitalIndex === index }"
                        @click="selectHospitalItem(index)"
                    >
                        <text class="hospital-name">{{ hospital }}</text>
                        <wd-icon v-if="selectedHospitalIndex === index" name="check" size="16px" color="#43c3d9" />
                    </view>
                </view>
                <view class="picker-footer">
                    <wd-button type="primary" size="large" @click="confirmHospitalSelection" block custom-style="background-color: #43c3d9; border-color: #43c3d9;">
                        确认
                    </wd-button>
                </view>
            </view>
        </wd-popup>

        <!-- 时间选择弹窗 -->
        <wd-popup v-model="showTimePicker" position="bottom" safe-area-inset-bottom>
            <view class="time-picker-popup">
                <view class="picker-header">
                    <text class="picker-title">选择就诊时间</text>
                    <wd-icon name="close" size="20px" color="#999" @click="showTimePicker = false" />
                </view>
                <wd-datetime-picker 
                    v-model="selectedDateTime" 
                    type="datetime" 
                    :min-date="minDate" 
                    :max-date="maxDate" 
                    @confirm="handleTimeConfirm" 
                    @cancel="showTimePicker = false"
                />
            </view>
        </wd-popup>

        <!-- 服务内容弹窗 -->
        <wd-popup v-model="showServiceContentPopup" position="center">
            <view class="service-content-popup">
                <view class="popup-header">
                    <text class="popup-title">服务内容</text>
                    <wd-icon name="close" @click="showServiceContentPopup = false" />
                </view>
                <view class="popup-content">
                    <view class="service-description">
                        <text>提供代替患者在医院内就医过程中跑腿服务。如:进行排队,楼上楼下缴费,提取化验结果等服务。</text>
                    </view>
                    <wd-button type="primary" size="large" @click="showServiceContentPopup = false" block custom-style="background-color: #43c3d9; border-color: #43c3d9;">
                        我知道了,开始预约
                    </wd-button>
                </view>
            </view>
        </wd-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'

// 声明uni全局对象
declare const uni: any

// 表单数据
const formData = reactive({
    hospital: '', // 就诊医院
    appointmentTime: '', // 就诊时间
    patient: '', // 就诊人
    phone: '', // 联系电话
    requirements: '' // 服务需求
})

// 表单验证规则
const rules = reactive({
    hospital: [
        { required: true, message: '请选择就诊医院' }
    ],
    appointmentTime: [
        { required: true, message: '请选择就诊时间' }
    ],
    patient: [
        { required: true, message: '请选择就诊人' }
    ],
    phone: [
        { required: true, message: '请填写联系电话' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
    ]
})

// 用户协议状态
const agreed = ref(false)

// 弹窗控制
const showHospitalPicker = ref(false)
const showTimePicker = ref(false)
const showServiceContentPopup = ref(false)


// 医院选项列表（九江地区医院）
const hospitalOptions = ref([
    '九江学院附属医院',
    '九江市第一人民医院', 
    '九江市第五人民医院'
])

// 选中的医院索引
const selectedHospitalIndex = ref(-1)

// 计算属性 - 是否可以提交订单
const canSubmit = computed(() => {
    return agreed.value &&
        formData.hospital &&
        formData.appointmentTime &&
        formData.patient &&
        formData.phone
})

// 生命周期钩子
onMounted(() => {
    // 页面加载完成后自动显示服务内容弹窗
    nextTick(() => {
        setTimeout(() => {
            showServiceContentPopup.value = true
        }, 500) // 延迟500ms显示，确保页面完全加载
    })
})


// 选择医院
const selectHospital = () => {
    showHospitalPicker.value = true
}

// 选择医院项
const selectHospitalItem = (index: number) => {
    selectedHospitalIndex.value = index
}

// 确认选择医院
const confirmHospitalSelection = () => {
    if (selectedHospitalIndex.value >= 0) {
        formData.hospital = hospitalOptions.value[selectedHospitalIndex.value]
        showHospitalPicker.value = false
    }
}

// 时间选择相关数据
// 获取当前时间作为默认值
const now = new Date()
const selectedDateTime = ref(now)

// 设置最小日期为今天
const today = new Date()
today.setHours(0, 0, 0, 0)
const minDate = ref(today)

// 设置最大日期为30天后
const maxDate = ref(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))

// 选择时间 - 显示时间选择器
const selectTime = () => {
    showTimePicker.value = true
}

// 处理时间选择确认
const handleTimeConfirm = (value: Date) => {
    console.log('选择的时间:', value)
    
    // 格式化选择的日期时间
    const year = value.getFullYear()
    const month = value.getMonth() + 1
    const day = value.getDate()
    const hours = value.getHours()
    const minutes = value.getMinutes()
    
    // 格式化显示文本
    const formattedTime = `${month}月${day}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    
    // 更新表单数据
    formData.appointmentTime = formattedTime
    
    // 关闭时间选择器
    showTimePicker.value = false
    
    console.log('格式化后的时间:', formattedTime)
}

// 选择就诊人
const selectPatient = () => {
    // 跳转到选择服务对象页面
    uni.navigateTo({
        url: '/pages/serviceObjectList/index'
    })
}

// 显示服务内容
const showServiceContent = () => {
    showServiceContentPopup.value = true
}

// 显示用户协议
const showUserAgreement = () => {
    uni.navigateTo({
        url: '/pages/user-agreement/index'
    })
}

// 显示服务协议
const showServiceAgreement = () => {
    uni.navigateTo({
        url: '/pages/service-agreement/index'
    })
}

// 确认下单
const confirmOrder = async () => {
    if (!canSubmit.value) {
        uni.showToast({
            title: '请完善订单信息',
            icon: 'none'
        })
        return
    }

    try {
        // 表单验证
        // await formRef.value.validate()

        // 显示加载提示
        uni.showLoading({
            title: '提交中...'
        })

        // 模拟提交订单
        setTimeout(() => {
            uni.hideLoading()
            uni.showToast({
                title: '订单提交成功',
                icon: 'success'
            })

            // 跳转到支付页面
            setTimeout(() => {
                uni.navigateTo({
                    url: '/pages/payment/index'
                })
            }, 1500)
        }, 2000)

    } catch (error) {
        uni.hideLoading()
        console.error('表单验证失败:', error)
    }
}

</script>

<style lang="scss" scoped>
.service-order-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 120rpx; // 为底部按钮留出空间
}

// 进度条区域
.progress-section {
    background-color: #fff;
    padding: 40rpx 30rpx;
    margin-bottom: 20rpx;
}

// 服务详情区域
.service-detail-section {
    padding: 16rpx 32rpx;
    margin-bottom: 20rpx;

    .service-info {
        background-color: #fff;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        padding: 30rpx 0;

        .service-icon {
            margin-left: 24rpx;
            margin-right: 20rpx;
        }

        .service-content {
            display: flex;
            justify-content: space-around;
            flex: 1;

            .service-title {
                font-size: 32rpx;
                font-weight: bold;
                color: #333;
                display: block;
                margin-bottom: 10rpx;
            }

            .service-desc {
                display: flex;
                align-items: center;

                .service-link {
                    color: #999;
                    font-size: 28rpx;
                    margin-left: 8rpx;
                }
            }
        }
    }
}

// 表单区域
.form-section {
    padding: 0 30rpx;

    :deep(.wd-cell-group) {
        margin-bottom: 20rpx;
        border-radius: 12rpx;
        overflow: hidden;
    }

    :deep(.wd-form-item) {

        .wd-input,
        .wd-textarea {
            background-color: transparent;
        }
    }
}

// 用户协议区域
.agreement-section {
    padding: 30rpx;

    .agreement-text {
        font-size: 28rpx;
        color: #666;
        line-height: 1.5;

        .agreement-link {
            color: #43c3d9;
        }
    }
}

// 确认按钮区域
.confirm-section {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    z-index: 2;
}

// 医院选择弹窗和时间选择弹窗
.hospital-picker-popup,
.time-picker-popup {
    background-color: #fff;
    border-radius: 16rpx 16rpx 0 0;
    
    .picker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        border-bottom: 1rpx solid #eee;
        
        .picker-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
        }
        &::before {
            content: '';
            width: 20rpx;
            height: 20rpx;
        }
    }
    
    .hospital-list {
        max-height: 600rpx;
        
        .hospital-item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30rpx;
            border-bottom: 1rpx solid #f0f0f0;
            
            &:last-child {
                border-bottom: none;
            }
            
            &.selected {
                background-color: #f0fbfc;
                
                .hospital-name {
                    color: #43c3d9;
                    font-weight: bold;
                }
            }
            
            .hospital-name {
                font-size: 28rpx;
                color: #333;
            }
        }
    }
    
    .picker-footer {
        padding: 20rpx 30rpx;
        border-top: 1rpx solid #eee;
    }
}


// 服务内容弹窗
.service-content-popup {
    width: 600rpx;
    background-color: #fff;
    border-radius: 16rpx;

    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        border-bottom: 1rpx solid #eee;

        .popup-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
        }
    }

    .popup-content {
        padding: 30rpx;

        .service-description {
            margin-bottom: 30rpx;
            
            text {
                display: block;
                font-size: 28rpx;
                color: #666;
                line-height: 1.8;
                padding: 20rpx;
                border: 2rpx solid #43c3d9;
                border-radius: 8rpx;
                background-color: #f0fbfc;
            }
        }
    }
}

// 服务需求输入框样式
.service-requirements-textarea {
    width: 80%; // 设置宽度为80%
    max-width: 500rpx; // 最大宽度限制
}
</style>
