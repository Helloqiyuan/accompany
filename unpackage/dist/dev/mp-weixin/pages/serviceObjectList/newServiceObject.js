"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "newServiceObject",
  setup(__props) {
    const formData = common_vendor.reactive({
      name: "",
      // 姓名
      gender: "男",
      // 性别，默认为男
      phone: "",
      // 电话
      idNumber: "",
      // 身份证号
      relationship: ""
      // 关系
    });
    const relationshipOptions = [
      "本人",
      "父母",
      "配偶",
      "子女",
      "兄弟姐妹",
      "朋友",
      "其他"
    ];
    const showPicker = common_vendor.ref(false);
    const pickerValue = common_vendor.ref([0]);
    const selectedRelationship = common_vendor.ref("");
    const selectGender = (gender) => {
      formData.gender = gender;
    };
    const showRelationshipPicker = () => {
      showPicker.value = true;
      if (formData.relationship) {
        const index = relationshipOptions.indexOf(formData.relationship);
        if (index !== -1) {
          pickerValue.value = [index];
        }
      }
    };
    const hidePicker = () => {
      showPicker.value = false;
    };
    const onPickerChange = (e) => {
      const index = e.detail.value[0];
      selectedRelationship.value = relationshipOptions[index];
    };
    const confirmRelationship = () => {
      formData.relationship = selectedRelationship.value;
      hidePicker();
    };
    const validateForm = () => {
      if (!formData.name.trim()) {
        common_vendor.index.showToast({
          title: "请输入姓名",
          icon: "none"
        });
        return false;
      }
      if (!formData.phone.trim()) {
        common_vendor.index.showToast({
          title: "请输入联系电话",
          icon: "none"
        });
        return false;
      }
      const phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(formData.phone)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return false;
      }
      if (!formData.idNumber.trim()) {
        common_vendor.index.showToast({
          title: "请输入身份证号",
          icon: "none"
        });
        return false;
      }
      const idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!idReg.test(formData.idNumber)) {
        common_vendor.index.showToast({
          title: "请输入正确的身份证号",
          icon: "none"
        });
        return false;
      }
      if (!formData.relationship) {
        common_vendor.index.showToast({
          title: "请选择与就诊人关系",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    const saveServiceObject = () => {
      if (!validateForm()) {
        return;
      }
      common_vendor.index.showLoading({
        title: "保存中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        console.log("保存的服务对象信息:", formData);
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: formData.name,
        b: common_vendor.o(($event) => formData.name = $event.detail.value),
        c: formData.gender === "男" ? 1 : "",
        d: common_vendor.o(($event) => selectGender("男")),
        e: formData.gender === "女" ? 1 : "",
        f: common_vendor.o(($event) => selectGender("女")),
        g: formData.phone,
        h: common_vendor.o(($event) => formData.phone = $event.detail.value),
        i: formData.idNumber,
        j: common_vendor.o(($event) => formData.idNumber = $event.detail.value),
        k: common_vendor.t(formData.relationship || "请选择关系"),
        l: !formData.relationship ? 1 : "",
        m: common_vendor.o(showRelationshipPicker),
        n: common_vendor.o(saveServiceObject),
        o: showPicker.value
      }, showPicker.value ? {
        p: common_vendor.o(hidePicker),
        q: common_vendor.o(confirmRelationship),
        r: common_vendor.f(relationshipOptions, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        s: pickerValue.value,
        t: common_vendor.o(onPickerChange),
        v: common_vendor.o(() => {
        }),
        w: common_vendor.o(hidePicker)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fcdae95"]]);
wx.createPage(MiniProgramPage);
