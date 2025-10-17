"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ServiceOrder",
  data() {
    return {
      // 表单数据
      formData: {
        hospital: "",
        // 就诊医院
        appointmentTime: "",
        // 就诊时间
        patient: "",
        // 就诊人
        phone: "",
        // 联系电话
        requirements: ""
        // 服务需求
      },
      // 表单验证规则
      rules: {
        hospital: [
          { required: true, message: "请选择就诊医院" }
        ],
        appointmentTime: [
          { required: true, message: "请选择就诊时间" }
        ],
        patient: [
          { required: true, message: "请选择就诊人" }
        ],
        phone: [
          { required: true, message: "请填写联系电话" },
          { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码" }
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
        "九江学院附属医院",
        "九江市第一人民医院",
        "九江市第五人民医院"
      ],
      // 选中的医院索引
      selectedHospitalIndex: -1,
      // 日期选项
      dateOptions: [],
      // 小时选项
      hourOptions: ["08", "09", "10", "11", "14", "15", "16", "17"],
      // 分钟选项
      minuteOptions: ["00", "15", "30", "45"],
      // 选中的时间索引
      selectedDateIndex: 1,
      // 默认选中明天
      selectedHourIndex: 1,
      // 默认选中10点
      selectedMinuteIndex: 2,
      // 默认选中30分
      // 就诊人列表
      patientList: [
        ["张三", "李四", "王五", "赵六"]
      ]
    };
  },
  computed: {
    // 是否可以提交订单
    canSubmit() {
      return this.agreed && this.formData.hospital && this.formData.appointmentTime && this.formData.patient && this.formData.phone;
    }
  },
  mounted() {
    this.initDateOptions();
    this.$nextTick(() => {
      setTimeout(() => {
        this.showServiceContentPopup = true;
      }, 500);
    });
  },
  methods: {
    // 初始化日期选项
    initDateOptions() {
      const today = /* @__PURE__ */ new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);
      const formatDate = (date, label) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}月${day}日 (${label})`;
      };
      this.dateOptions = [
        formatDate(today, "今天"),
        formatDate(tomorrow, "明天"),
        formatDate(dayAfterTomorrow, "后天")
      ];
    },
    // 选择医院
    selectHospital() {
      this.showHospitalPicker = true;
    },
    // 选择医院项
    selectHospitalItem(index) {
      this.selectedHospitalIndex = index;
    },
    // 确认选择医院
    confirmHospitalSelection() {
      if (this.selectedHospitalIndex >= 0) {
        this.formData.hospital = this.hospitalOptions[this.selectedHospitalIndex];
        this.showHospitalPicker = false;
      }
    },
    // 选择时间
    selectTime() {
      this.showTimePicker = true;
    },
    // 选择日期
    selectDate(index) {
      this.selectedDateIndex = index;
    },
    // 选择小时
    selectHour(index) {
      this.selectedHourIndex = index;
    },
    // 选择分钟
    selectMinute(index) {
      this.selectedMinuteIndex = index;
    },
    // 确认选择时间
    confirmTimeSelection() {
      const selectedDate = this.dateOptions[this.selectedDateIndex];
      const selectedHour = this.hourOptions[this.selectedHourIndex];
      const selectedMinute = this.minuteOptions[this.selectedMinuteIndex];
      this.formData.appointmentTime = `${selectedDate} ${selectedHour}:${selectedMinute}`;
      this.showTimePicker = false;
    },
    // 选择就诊人
    selectPatient() {
      this.showPatientPicker = true;
    },
    // 确认选择就诊人
    onPatientConfirm(value) {
      this.formData.patient = value[0];
      this.showPatientPicker = false;
    },
    // 用户协议状态改变
    onAgreementChange(value) {
      this.agreed = value;
    },
    // 显示服务内容
    showServiceContent() {
      this.showServiceContentPopup = true;
    },
    // 显示用户协议
    showUserAgreement() {
      common_vendor.index.navigateTo({
        url: "/pages/user-agreement/index"
      });
    },
    // 显示服务协议
    showServiceAgreement() {
      common_vendor.index.navigateTo({
        url: "/pages/service-agreement/index"
      });
    },
    // 确认下单
    async confirmOrder() {
      if (!this.canSubmit) {
        common_vendor.index.showToast({
          title: "请完善订单信息",
          icon: "none"
        });
        return;
      }
      try {
        await this.$refs.form.validate();
        common_vendor.index.showLoading({
          title: "提交中..."
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "订单提交成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/payment/index"
            });
          }, 1500);
        }, 2e3);
      } catch (error) {
        common_vendor.index.hideLoading();
        console.error("表单验证失败:", error);
      }
    },
    // 格式化日期时间
    formatDateTime(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }
};
if (!Array) {
  const _easycom_wd_step2 = common_vendor.resolveComponent("wd-step");
  const _easycom_wd_steps2 = common_vendor.resolveComponent("wd-steps");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_form_item2 = common_vendor.resolveComponent("wd-form-item");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_wd_checkbox2 = common_vendor.resolveComponent("wd-checkbox");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_popup2 = common_vendor.resolveComponent("wd-popup");
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  (_easycom_wd_step2 + _easycom_wd_steps2 + _easycom_wd_icon2 + _easycom_wd_input2 + _easycom_wd_form_item2 + _easycom_wd_cell_group2 + _easycom_wd_textarea2 + _easycom_wd_form2 + _easycom_wd_checkbox2 + _easycom_wd_button2 + _easycom_wd_popup2 + _easycom_wd_picker2)();
}
const _easycom_wd_step = () => "../../uni_modules/wot-design-uni/components/wd-step/wd-step.js";
const _easycom_wd_steps = () => "../../uni_modules/wot-design-uni/components/wd-steps/wd-steps.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_form_item = () => "../../uni_modules/wot-design-uni/components/wd-form-item/wd-form-item.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_wd_checkbox = () => "../../uni_modules/wot-design-uni/components/wd-checkbox/wd-checkbox.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_popup = () => "../../uni_modules/wot-design-uni/components/wd-popup/wd-popup.js";
const _easycom_wd_picker = () => "../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
if (!Math) {
  (_easycom_wd_step + _easycom_wd_steps + _easycom_wd_icon + _easycom_wd_input + _easycom_wd_form_item + _easycom_wd_cell_group + _easycom_wd_textarea + _easycom_wd_form + _easycom_wd_checkbox + _easycom_wd_button + _easycom_wd_popup + _easycom_wd_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "填写订单"
    }),
    b: common_vendor.p({
      title: "在线支付"
    }),
    c: common_vendor.p({
      title: "专人服务"
    }),
    d: common_vendor.p({
      title: "服务完成"
    }),
    e: common_vendor.p({
      active: 0,
      direction: "horizontal",
      ["align-center"]: true
    }),
    f: common_vendor.p({
      name: "clock",
      size: "24px",
      color: "#ff9500"
    }),
    g: common_vendor.p({
      name: "info",
      size: "16px",
      color: "#999"
    }),
    h: common_vendor.o((...args) => $options.showServiceContent && $options.showServiceContent(...args)),
    i: common_vendor.o($options.selectHospital),
    j: common_vendor.o(($event) => $data.formData.hospital = $event),
    k: common_vendor.p({
      placeholder: "请选择要就诊的医院",
      readonly: true,
      ["suffix-icon"]: "arrow-right",
      modelValue: $data.formData.hospital
    }),
    l: common_vendor.p({
      prop: "hospital",
      label: "就诊医院",
      required: true
    }),
    m: common_vendor.o($options.selectTime),
    n: common_vendor.o(($event) => $data.formData.appointmentTime = $event),
    o: common_vendor.p({
      placeholder: "请选择就诊时间",
      readonly: true,
      ["suffix-icon"]: "arrow-right",
      modelValue: $data.formData.appointmentTime
    }),
    p: common_vendor.p({
      prop: "appointmentTime",
      label: "就诊时间",
      required: true
    }),
    q: common_vendor.o($options.selectPatient),
    r: common_vendor.o(($event) => $data.formData.patient = $event),
    s: common_vendor.p({
      placeholder: "请选择就诊人",
      readonly: true,
      ["suffix-icon"]: "arrow-right",
      modelValue: $data.formData.patient
    }),
    t: common_vendor.p({
      prop: "patient",
      label: "就诊人",
      required: true
    }),
    v: common_vendor.o(($event) => $data.formData.phone = $event),
    w: common_vendor.p({
      placeholder: "请填写您的联系电话",
      type: "tel",
      modelValue: $data.formData.phone
    }),
    x: common_vendor.p({
      prop: "phone",
      label: "联系电话",
      required: true
    }),
    y: common_vendor.o(($event) => $data.formData.requirements = $event),
    z: common_vendor.p({
      placeholder: "请简单描述您要就诊的科室...",
      maxlength: 200,
      ["show-word-limit"]: true,
      rows: 4,
      modelValue: $data.formData.requirements
    }),
    A: common_vendor.p({
      prop: "requirements",
      label: "服务需求"
    }),
    B: common_vendor.sr("form", "381d5e08-7"),
    C: common_vendor.p({
      model: $data.formData,
      rules: $data.rules
    }),
    D: common_vendor.o((...args) => $options.showUserAgreement && $options.showUserAgreement(...args)),
    E: common_vendor.o((...args) => $options.showServiceAgreement && $options.showServiceAgreement(...args)),
    F: common_vendor.o($options.onAgreementChange),
    G: common_vendor.o(($event) => $data.agreed = $event),
    H: common_vendor.p({
      modelValue: $data.agreed
    }),
    I: common_vendor.o($options.confirmOrder),
    J: common_vendor.p({
      type: "primary",
      size: "large",
      disabled: !$options.canSubmit,
      block: true
    }),
    K: common_vendor.o(($event) => $data.showHospitalPicker = false),
    L: common_vendor.p({
      name: "close",
      size: "20px",
      color: "#999"
    }),
    M: common_vendor.f($data.hospitalOptions, (hospital, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(hospital),
        b: $data.selectedHospitalIndex === index
      }, $data.selectedHospitalIndex === index ? {
        c: "381d5e08-27-" + i0 + ",381d5e08-25",
        d: common_vendor.p({
          name: "check",
          size: "16px",
          color: "#4d80f0"
        })
      } : {}, {
        e: index,
        f: $data.selectedHospitalIndex === index ? 1 : "",
        g: common_vendor.o(($event) => $options.selectHospitalItem(index), index)
      });
    }),
    N: common_vendor.o($options.confirmHospitalSelection),
    O: common_vendor.p({
      type: "primary",
      size: "large",
      block: true
    }),
    P: common_vendor.o(($event) => $data.showHospitalPicker = $event),
    Q: common_vendor.p({
      position: "bottom",
      ["safe-area-inset-bottom"]: true,
      modelValue: $data.showHospitalPicker
    }),
    R: common_vendor.o(($event) => $data.showTimePicker = false),
    S: common_vendor.p({
      name: "close",
      size: "20px",
      color: "#999"
    }),
    T: common_vendor.f($data.dateOptions, (date, index, i0) => {
      return {
        a: common_vendor.t(date),
        b: index,
        c: $data.selectedDateIndex === index ? 1 : "",
        d: common_vendor.o(($event) => $options.selectDate(index), index)
      };
    }),
    U: common_vendor.f($data.hourOptions, (hour, index, i0) => {
      return {
        a: common_vendor.t(hour),
        b: index,
        c: $data.selectedHourIndex === index ? 1 : "",
        d: common_vendor.o(($event) => $options.selectHour(index), index)
      };
    }),
    V: common_vendor.f($data.minuteOptions, (minute, index, i0) => {
      return {
        a: common_vendor.t(minute),
        b: index,
        c: $data.selectedMinuteIndex === index ? 1 : "",
        d: common_vendor.o(($event) => $options.selectMinute(index), index)
      };
    }),
    W: common_vendor.o($options.confirmTimeSelection),
    X: common_vendor.p({
      type: "primary",
      size: "large",
      block: true
    }),
    Y: common_vendor.o(($event) => $data.showTimePicker = $event),
    Z: common_vendor.p({
      position: "bottom",
      ["safe-area-inset-bottom"]: true,
      modelValue: $data.showTimePicker
    }),
    aa: common_vendor.o($options.onPatientConfirm),
    ab: common_vendor.o(($event) => $data.showPatientPicker = false),
    ac: common_vendor.o(($event) => $data.selectedPatient = $event),
    ad: common_vendor.p({
      columns: $data.patientList,
      title: "选择就诊人",
      modelValue: $data.selectedPatient
    }),
    ae: common_vendor.o(($event) => $data.showPatientPicker = $event),
    af: common_vendor.p({
      position: "bottom",
      ["safe-area-inset-bottom"]: true,
      modelValue: $data.showPatientPicker
    }),
    ag: common_vendor.o(($event) => $data.showServiceContentPopup = false),
    ah: common_vendor.p({
      name: "close"
    }),
    ai: common_vendor.o(($event) => $data.showServiceContentPopup = false),
    aj: common_vendor.p({
      type: "primary",
      size: "large",
      block: true
    }),
    ak: common_vendor.o(($event) => $data.showServiceContentPopup = $event),
    al: common_vendor.p({
      position: "center",
      modelValue: $data.showServiceContentPopup
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-381d5e08"]]);
wx.createPage(MiniProgramPage);
