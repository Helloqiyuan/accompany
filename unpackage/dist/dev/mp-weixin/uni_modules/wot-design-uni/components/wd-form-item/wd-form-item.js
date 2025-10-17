"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("../wd-form/types.js");
const uni_modules_wotDesignUni_components_wdFormItem_types = require("./types.js");
if (!Math) {
  WdCell();
}
const WdCell = () => "../wd-cell/wd-cell.js";
const __default__ = {
  name: "wd-form-item",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdFormItem_types.formItemProps,
  setup(__props) {
    const props = __props;
    const { parent: form, index } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdForm_types.FORM_KEY);
    const errorMessage = common_vendor.computed(() => {
      if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
        return form.errorMessages[props.prop];
      } else {
        return "";
      }
    });
    const border = common_vendor.computed(() => {
      if (index.value > 0 && form && form.props.border) {
        return true;
      } else {
        return false;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: errorMessage.value
      }, errorMessage.value ? {
        b: common_vendor.t(errorMessage.value)
      } : {}, {
        c: common_vendor.p({
          ["custom-class"]: "wd-form-item",
          required: _ctx.required,
          title: _ctx.label,
          center: _ctx.center,
          border: border.value,
          ["title-width"]: _ctx.labelWidth,
          ["is-link"]: _ctx.isLink
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71f46f5f"]]);
wx.createComponent(Component);
