<template>
    <view class="service-order-page">
        <!-- 进度条 -->
        <view class="progress-section">
            <wd-steps :active="0" direction="horizontal" align-center>
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
                            show-word-limit :rows="4" />
                    </wd-form-item>
                </wd-cell-group>
            </wd-form>
        </view>

        <!-- 用户协议 -->
        <view class="agreement-section">
            <wd-checkbox v-model="agreed" @change="onAgreementChange">
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
            <wd-button type="primary" size="large" :disabled="!canSubmit" @click="confirmOrder" block>
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
                        <wd-icon v-if="selectedHospitalIndex === index" name="check" size="16px" color="#4d80f0" />
                    </view>
                </view>
                <view class="picker-footer">
                    <wd-button type="primary" size="large" @click="confirmHospitalSelection" block>
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
                <view class="time-picker-container">
                    <view class="picker-column">
                        <text class="column-title">日期</text>
                        <scroll-view class="picker-scroll" scroll-y="true">
                            <view 
                                v-for="(date, index) in dateOptions" 
                                :key="index"
                                class="picker-item"
                                :class="{ 'selected': selectedDateIndex === index }"
                                @click="selectDate(index)"
                            >
                                {{ date }}
                            </view>
                        </scroll-view>
                    </view>
                    <view class="picker-column">
                        <text class="column-title">时间</text>
                        <scroll-view class="picker-scroll" scroll-y="true">
                            <view 
                                v-for="(hour, index) in hourOptions" 
                                :key="index"
                                class="picker-item"
                                :class="{ 'selected': selectedHourIndex === index }"
                                @click="selectHour(index)"
                            >
                                {{ hour }}
                            </view>
                        </scroll-view>
                    </view>
                    <view class="picker-column">
                        <text class="column-title">分钟</text>
                        <scroll-view class="picker-scroll" scroll-y="true">
                            <view 
                                v-for="(minute, index) in minuteOptions" 
                                :key="index"
                                class="picker-item"
                                :class="{ 'selected': selectedMinuteIndex === index }"
                                @click="selectMinute(index)"
                            >
                                {{ minute }}
                            </view>
                        </scroll-view>
                    </view>
                </view>
                <view class="picker-footer">
                    <wd-button type="primary" size="large" @click="confirmTimeSelection" block>
                        确认
                    </wd-button>
                </view>
            </view>
        </wd-popup>

        <!-- 就诊人选择弹窗 -->
        <wd-popup v-model="showPatientPicker" position="bottom" safe-area-inset-bottom>
            <wd-picker v-model="selectedPatient" :columns="patientList" title="选择就诊人" @confirm="onPatientConfirm"
                @cancel="showPatientPicker = false" />
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
                    <wd-button type="primary" size="large" @click="showServiceContentPopup = false" block>
                        我知道了,开始预约
                    </wd-button>
                </view>
            </view>
        </wd-popup>
    </view>
</template>

<script>
export default {
    name: 'ServiceOrder',
    data() {
        return {
            // 表单数据
            formData: {
                hospital: '', // 就诊医院
                appointmentTime: '', // 就诊时间
                patient: '', // 就诊人
                phone: '', // 联系电话
                requirements: '' // 服务需求
            },

            // 表单验证规则
            rules: {
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
            },

            // 用户协议状态
            agreed: false,

            // 弹窗控制
            showHospitalPicker: false,
            showTimePicker: false,
            showPatientPicker: false,
            showServiceContentPopup: false,

            // 选择器数据
            selectedHospital: null,
            selectedTime: null,
            selectedPatient: null,

            // 医院选项列表（九江地区医院）
            hospitalOptions: [
                '九江学院附属医院',
                '九江市第一人民医院', 
                '九江市第五人民医院'
            ],
            
            // 选中的医院索引
            selectedHospitalIndex: -1,

            // 日期选项
            dateOptions: [],
            
            // 小时选项
            hourOptions: ['08', '09', '10', '11', '14', '15', '16', '17'],
            
            // 分钟选项
            minuteOptions: ['00', '15', '30', '45'],
            
            // 选中的时间索引
            selectedDateIndex: 1, // 默认选中明天
            selectedHourIndex: 1, // 默认选中10点
            selectedMinuteIndex: 2, // 默认选中30分

            // 就诊人列表
            patientList: [
                ['张三', '李四', '王五', '赵六']
            ]
        }
    },

    computed: {
        // 是否可以提交订单
        canSubmit() {
            return this.agreed &&
                this.formData.hospital &&
                this.formData.appointmentTime &&
                this.formData.patient &&
                this.formData.phone
        }
    },

    mounted() {
        // 初始化日期选项
        this.initDateOptions()
        
        // 页面加载完成后自动显示服务内容弹窗
        this.$nextTick(() => {
            setTimeout(() => {
                this.showServiceContentPopup = true
            }, 500) // 延迟500ms显示，确保页面完全加载
        })
    },

    methods: {
        // 初始化日期选项
        initDateOptions() {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(today.getDate() + 1)
            const dayAfterTomorrow = new Date(today)
            dayAfterTomorrow.setDate(today.getDate() + 2)
            
            const formatDate = (date, label) => {
                const month = date.getMonth() + 1
                const day = date.getDate()
                return `${month}月${day}日 (${label})`
            }
            
            this.dateOptions = [
                formatDate(today, '今天'),
                formatDate(tomorrow, '明天'),
                formatDate(dayAfterTomorrow, '后天')
            ]
        },
        // 选择医院
        selectHospital() {
            this.showHospitalPicker = true
        },

        // 选择医院项
        selectHospitalItem(index) {
            this.selectedHospitalIndex = index
        },
        
        // 确认选择医院
        confirmHospitalSelection() {
            if (this.selectedHospitalIndex >= 0) {
                this.formData.hospital = this.hospitalOptions[this.selectedHospitalIndex]
                this.showHospitalPicker = false
            }
        },

        // 选择时间
        selectTime() {
            this.showTimePicker = true
        },

        // 选择日期
        selectDate(index) {
            this.selectedDateIndex = index
        },
        
        // 选择小时
        selectHour(index) {
            this.selectedHourIndex = index
        },
        
        // 选择分钟
        selectMinute(index) {
            this.selectedMinuteIndex = index
        },
        
        // 确认选择时间
        confirmTimeSelection() {
            const selectedDate = this.dateOptions[this.selectedDateIndex]
            const selectedHour = this.hourOptions[this.selectedHourIndex]
            const selectedMinute = this.minuteOptions[this.selectedMinuteIndex]
            
            this.formData.appointmentTime = `${selectedDate} ${selectedHour}:${selectedMinute}`
            this.showTimePicker = false
        },

        // 选择就诊人
        selectPatient() {
            this.showPatientPicker = true
        },

        // 确认选择就诊人
        onPatientConfirm(value) {
            this.formData.patient = value[0]
            this.showPatientPicker = false
        },

        // 用户协议状态改变
        onAgreementChange(value) {
            this.agreed = value
        },

        // 显示服务内容
        showServiceContent() {
            this.showServiceContentPopup = true
        },

        // 显示用户协议
        showUserAgreement() {
            uni.navigateTo({
                url: '/pages/user-agreement/index'
            })
        },

        // 显示服务协议
        showServiceAgreement() {
            uni.navigateTo({
                url: '/pages/service-agreement/index'
            })
        },

        // 确认下单
        async confirmOrder() {
            if (!this.canSubmit) {
                uni.showToast({
                    title: '请完善订单信息',
                    icon: 'none'
                })
                return
            }

            try {
                // 表单验证
                await this.$refs.form.validate()

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
        },

        // 格式化日期时间
        formatDateTime(date) {
            const d = new Date(date)
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const day = String(d.getDate()).padStart(2, '0')
            const hours = String(d.getHours()).padStart(2, '0')
            const minutes = String(d.getMinutes()).padStart(2, '0')

            return `${year}-${month}-${day} ${hours}:${minutes}`
        }
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
            color: #4d80f0;
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

// 医院选择弹窗
.hospital-picker-popup {
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
                background-color: #f8f9ff;
                
                .hospital-name {
                    color: #4d80f0;
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

// 时间选择弹窗
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
    }
    
    .time-picker-container {
        display: flex;
        height: 400rpx;
        
        .picker-column {
            flex: 1;
            border-right: 1rpx solid #f0f0f0;
            
            &:last-child {
                border-right: none;
            }
            
            .column-title {
                display: block;
                text-align: center;
                padding: 20rpx 0;
                font-size: 24rpx;
                color: #999;
                background-color: #f8f9fa;
                border-bottom: 1rpx solid #eee;
            }
            
            .picker-scroll {
                height: 340rpx;
                
                .picker-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 68rpx;
                    font-size: 28rpx;
                    color: #333;
                    border-bottom: 1rpx solid #f8f9fa;
                    
                    &.selected {
                        background-color: #f0f8ff;
                        color: #4d80f0;
                        font-weight: bold;
                        position: relative;
                        
                        &::after {
                            content: '';
                            position: absolute;
                            top: 50%;
                            right: 20rpx;
                            width: 6rpx;
                            height: 6rpx;
                            background-color: #4d80f0;
                            border-radius: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
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
                border: 2rpx solid #ff9500;
                border-radius: 8rpx;
                background-color: #fff8f0;
            }
        }
    }
}
</style>
