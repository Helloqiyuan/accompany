"use strict";
const common_vendor = require("../../common/vendor.js");
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
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  (_easycom_wd_step2 + _easycom_wd_steps2 + _easycom_wd_icon2 + _easycom_wd_input2 + _easycom_wd_form_item2 + _easycom_wd_cell_group2 + _easycom_wd_textarea2 + _easycom_wd_form2 + _easycom_wd_checkbox2 + _easycom_wd_button2 + _easycom_wd_popup2 + _easycom_wd_datetime_picker2)();
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
const _easycom_wd_datetime_picker = () => "../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
if (!Math) {
  (_easycom_wd_step + _easycom_wd_steps + _easycom_wd_icon + _easycom_wd_input + _easycom_wd_form_item + _easycom_wd_cell_group + _easycom_wd_textarea + _easycom_wd_form + _easycom_wd_checkbox + _easycom_wd_button + _easycom_wd_popup + _easycom_wd_datetime_picker)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const formData = common_vendor.reactive({
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
    });
    const rules = common_vendor.reactive({
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
    });
    const agreed = common_vendor.ref(false);
    const showHospitalPicker = common_vendor.ref(false);
    const showTimePicker = common_vendor.ref(false);
    const showServiceContentPopup = common_vendor.ref(false);
    const hospitalOptions = common_vendor.ref([
      "九江学院附属医院",
      "九江市第一人民医院",
      "九江市第五人民医院"
    ]);
    const selectedHospitalIndex = common_vendor.ref(-1);
    const canSubmit = common_vendor.computed(() => {
      return agreed.value && formData.hospital && formData.appointmentTime && formData.patient && formData.phone;
    });
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        setTimeout(() => {
          showServiceContentPopup.value = true;
        }, 500);
      });
    });
    const selectHospital = () => {
      showHospitalPicker.value = true;
    };
    const selectHospitalItem = (index) => {
      selectedHospitalIndex.value = index;
    };
    const confirmHospitalSelection = () => {
      if (selectedHospitalIndex.value >= 0) {
        formData.hospital = hospitalOptions.value[selectedHospitalIndex.value];
        showHospitalPicker.value = false;
      }
    };
    const now = /* @__PURE__ */ new Date();
    const selectedDateTime = common_vendor.ref(now);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = common_vendor.ref(today);
    const maxDate = common_vendor.ref(new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3));
    const selectTime = () => {
      showTimePicker.value = true;
    };
    const handleTimeConfirm = (value) => {
      console.log("选择的时间:", value);
      value.getFullYear();
      const month = value.getMonth() + 1;
      const day = value.getDate();
      const hours = value.getHours();
      const minutes = value.getMinutes();
      const formattedTime = `${month}月${day}日 ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      formData.appointmentTime = formattedTime;
      showTimePicker.value = false;
      console.log("格式化后的时间:", formattedTime);
    };
    const selectPatient = () => {
      common_vendor.index.navigateTo({
        url: "/pages/serviceObjectList/index"
      });
    };
    const showServiceContent = () => {
      showServiceContentPopup.value = true;
    };
    const showUserAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user-agreement/index"
      });
    };
    const showServiceAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/service-agreement/index"
      });
    };
    const confirmOrder = async () => {
      if (!canSubmit.value) {
        common_vendor.index.showToast({
          title: "请完善订单信息",
          icon: "none"
        });
        return;
      }
      try {
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
    };
    return (_ctx, _cache) => {
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
          ["align-center"]: true,
          ["active-color"]: "#43c3d9"
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
        h: common_vendor.o(showServiceContent),
        i: common_vendor.o(selectHospital),
        j: common_vendor.o(($event) => formData.hospital = $event),
        k: common_vendor.p({
          placeholder: "请选择要就诊的医院",
          readonly: true,
          ["suffix-icon"]: "arrow-right",
          modelValue: formData.hospital
        }),
        l: common_vendor.p({
          prop: "hospital",
          label: "就诊医院",
          required: true
        }),
        m: common_vendor.o(selectTime),
        n: common_vendor.o(($event) => formData.appointmentTime = $event),
        o: common_vendor.p({
          placeholder: "请选择就诊时间",
          readonly: true,
          ["suffix-icon"]: "arrow-right",
          modelValue: formData.appointmentTime
        }),
        p: common_vendor.p({
          prop: "appointmentTime",
          label: "就诊时间",
          required: true
        }),
        q: common_vendor.o(selectPatient),
        r: common_vendor.o(($event) => formData.patient = $event),
        s: common_vendor.p({
          placeholder: "请选择就诊人",
          readonly: true,
          ["suffix-icon"]: "arrow-right",
          modelValue: formData.patient
        }),
        t: common_vendor.p({
          prop: "patient",
          label: "就诊人",
          required: true
        }),
        v: common_vendor.o(($event) => formData.phone = $event),
        w: common_vendor.p({
          placeholder: "请填写您的联系电话",
          type: "tel",
          modelValue: formData.phone
        }),
        x: common_vendor.p({
          prop: "phone",
          label: "联系电话",
          required: true
        }),
        y: common_vendor.o(($event) => formData.requirements = $event),
        z: common_vendor.p({
          placeholder: "请简单描述您要就诊的科室...",
          maxlength: 200,
          ["show-word-limit"]: true,
          rows: 2,
          modelValue: formData.requirements
        }),
        A: common_vendor.p({
          prop: "requirements",
          label: "服务需求"
        }),
        B: common_vendor.sr("form", "c618ea27-7"),
        C: common_vendor.p({
          model: formData,
          rules
        }),
        D: common_vendor.o(showUserAgreement),
        E: common_vendor.o(showServiceAgreement),
        F: common_vendor.o(($event) => agreed.value = $event),
        G: common_vendor.p({
          modelValue: agreed.value
        }),
        H: common_vendor.o(confirmOrder),
        I: common_vendor.p({
          type: "primary",
          size: "large",
          disabled: !canSubmit.value,
          block: true,
          ["custom-style"]: "background-color: #43c3d9; border-color: #43c3d9;"
        }),
        J: common_vendor.o(($event) => showHospitalPicker.value = false),
        K: common_vendor.p({
          name: "close",
          size: "20px",
          color: "#999"
        }),
        L: common_vendor.f(hospitalOptions.value, (hospital, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(hospital),
            b: selectedHospitalIndex.value === index
          }, selectedHospitalIndex.value === index ? {
            c: "c618ea27-27-" + i0 + ",c618ea27-25",
            d: common_vendor.p({
              name: "check",
              size: "16px",
              color: "#43c3d9"
            })
          } : {}, {
            e: index,
            f: selectedHospitalIndex.value === index ? 1 : "",
            g: common_vendor.o(($event) => selectHospitalItem(index), index)
          });
        }),
        M: common_vendor.o(confirmHospitalSelection),
        N: common_vendor.p({
          type: "primary",
          size: "large",
          block: true,
          ["custom-style"]: "background-color: #43c3d9; border-color: #43c3d9;"
        }),
        O: common_vendor.o(($event) => showHospitalPicker.value = $event),
        P: common_vendor.p({
          position: "bottom",
          ["safe-area-inset-bottom"]: true,
          modelValue: showHospitalPicker.value
        }),
        Q: common_vendor.o(($event) => showTimePicker.value = false),
        R: common_vendor.p({
          name: "close",
          size: "20px",
          color: "#999"
        }),
        S: common_vendor.o(handleTimeConfirm),
        T: common_vendor.o(($event) => showTimePicker.value = false),
        U: common_vendor.o(($event) => selectedDateTime.value = $event),
        V: common_vendor.p({
          type: "datetime",
          ["min-date"]: minDate.value,
          ["max-date"]: maxDate.value,
          modelValue: selectedDateTime.value
        }),
        W: common_vendor.o(($event) => showTimePicker.value = $event),
        X: common_vendor.p({
          position: "bottom",
          ["safe-area-inset-bottom"]: true,
          modelValue: showTimePicker.value
        }),
        Y: common_vendor.o(($event) => showServiceContentPopup.value = false),
        Z: common_vendor.p({
          name: "close"
        }),
        aa: common_vendor.o(($event) => showServiceContentPopup.value = false),
        ab: common_vendor.p({
          type: "primary",
          size: "large",
          block: true,
          ["custom-style"]: "background-color: #43c3d9; border-color: #43c3d9;"
        }),
        ac: common_vendor.o(($event) => showServiceContentPopup.value = $event),
        ad: common_vendor.p({
          position: "center",
          modelValue: showServiceContentPopup.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c618ea27"]]);
wx.createPage(MiniProgramPage);
