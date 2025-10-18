"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      phoneNumber: "",
      // 手机号
      verificationCode: "",
      // 验证码
      countdown: 0,
      // 倒计时
      timer: null,
      // 定时器
      isSending: false
      // 是否正在发送验证码
    };
  },
  computed: {
    // 是否可以发送验证码
    canSendCode() {
      return this.isValidPhone(this.phoneNumber) && this.countdown === 0 && !this.isSending;
    },
    // 是否可以保存
    canSave() {
      return this.isValidPhone(this.phoneNumber) && this.verificationCode.length === 6;
    },
    // 发送验证码按钮文本
    sendCodeText() {
      if (this.isSending) {
        return "发送中...";
      }
      if (this.countdown > 0) {
        return `${this.countdown}s`;
      }
      return "发送验证码";
    }
  },
  methods: {
    // 手机号输入处理
    onPhoneInput(e) {
      this.phoneNumber = e.detail.value;
    },
    // 验证码输入处理
    onCodeInput(e) {
      this.verificationCode = e.detail.value;
    },
    // 验证手机号格式
    isValidPhone(phone) {
      const phoneReg = /^1[3-9]\d{9}$/;
      return phoneReg.test(phone);
    },
    // 发送验证码
    async sendVerificationCode() {
      if (!this.canSendCode)
        return;
      try {
        this.isSending = true;
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        common_vendor.index.showToast({
          title: "验证码已发送",
          icon: "success"
        });
        this.startCountdown();
      } catch (error) {
        console.error("发送验证码失败:", error);
        common_vendor.index.showToast({
          title: "发送失败，请重试",
          icon: "error"
        });
      } finally {
        this.isSending = false;
      }
    },
    // 开始倒计时
    startCountdown() {
      this.countdown = 60;
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1e3);
    },
    // 保存手机号
    async savePhoneNumber() {
      if (!this.canSave)
        return;
      try {
        common_vendor.index.showLoading({
          title: "保存中..."
        });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "手机号更新成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.$emit("refreshUserInfo");
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.hideLoading();
        console.error("更新手机号失败:", error);
        common_vendor.index.showToast({
          title: "更新失败，请重试",
          icon: "error"
        });
      }
    }
  },
  // 页面销毁时清理定时器
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.phoneNumber = $event.detail.value, (...args) => $options.onPhoneInput && $options.onPhoneInput(...args)]),
    b: $data.phoneNumber,
    c: common_vendor.o([($event) => $data.verificationCode = $event.detail.value, (...args) => $options.onCodeInput && $options.onCodeInput(...args)]),
    d: $data.verificationCode,
    e: common_vendor.t($options.sendCodeText),
    f: !$options.canSendCode,
    g: common_vendor.o((...args) => $options.sendVerificationCode && $options.sendVerificationCode(...args)),
    h: !$options.canSave,
    i: common_vendor.o((...args) => $options.savePhoneNumber && $options.savePhoneNumber(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5363923"]]);
wx.createPage(MiniProgramPage);
