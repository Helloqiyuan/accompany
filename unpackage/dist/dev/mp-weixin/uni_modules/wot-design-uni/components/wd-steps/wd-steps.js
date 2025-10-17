"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdSteps_types = require("./types.js");
const __default__ = {
  name: "wd-steps",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSteps_types.stepsProps,
  setup(__props) {
    const props = __props;
    const { linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdSteps_types.STEPS_KEY);
    linkChildren({ props });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-steps ${_ctx.customClass} ${_ctx.vertical ? "is-vertical" : ""}`),
        b: common_vendor.s(_ctx.customStyle)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fc07848"]]);
wx.createComponent(Component);
