"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdRow_types = require("../wd-row/types.js");
const uni_modules_wotDesignUni_components_wdCol_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const __default__ = {
  name: "wd-col",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdCol_types.colProps,
  setup(__props) {
    const props = __props;
    const { parent: row } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdRow_types.ROW_KEY);
    const rootStyle = common_vendor.computed(() => {
      const gutter = uni_modules_wotDesignUni_components_common_util.isDef(row) ? row.props.gutter || 0 : 0;
      const padding = `${gutter / 2}px`;
      const style = gutter > 0 ? `padding-left: ${padding}; padding-right: ${padding};background-clip: content-box;` : "";
      return `${style}${props.customStyle}`;
    });
    common_vendor.watch([() => props.span, () => props.offset], () => {
      check();
    });
    function check() {
      const { span, offset } = props;
      if (span < 0 || offset < 0) {
        console.error("[wot-design] warning(wd-col): attribute span/offset must be greater than or equal to 0");
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(_ctx.span && "wd-col__" + _ctx.span),
        b: common_vendor.n(_ctx.offset && "wd-col__offset-" + _ctx.offset),
        c: common_vendor.n(_ctx.customClass),
        d: common_vendor.s(rootStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2afa91f2"]]);
wx.createComponent(Component);
