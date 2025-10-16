"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdRow_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const __default__ = {
  name: "wd-row",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdRow_types.rowProps,
  setup(__props) {
    const props = __props;
    const { linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdRow_types.ROW_KEY);
    linkChildren({ props });
    const rowStyle = common_vendor.computed(() => {
      const style = {};
      const { gutter } = props;
      if (gutter < 0) {
        console.error("[wot ui] warning(wd-row): attribute gutter must be greater than or equal to 0");
      } else if (gutter) {
        style.marginLeft = uni_modules_wotDesignUni_components_common_util.addUnit(gutter / 2);
        style.marginRight = uni_modules_wotDesignUni_components_common_util.addUnit(gutter / 2);
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}${props.customStyle}`;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-row ${_ctx.customClass}`),
        b: common_vendor.s(rowStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-88acc730"]]);
wx.createComponent(Component);
