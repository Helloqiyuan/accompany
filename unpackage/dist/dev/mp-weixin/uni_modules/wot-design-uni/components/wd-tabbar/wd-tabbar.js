"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdTabbar_types = require("./types.js");
const __default__ = {
  name: "wd-tabbar",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTabbar_types.tabbarProps,
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const height = common_vendor.ref("");
    const { proxy } = common_vendor.getCurrentInstance();
    const { linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdTabbar_types.TABBAR_KEY);
    linkChildren({
      props,
      setChange
    });
    const rootStyle = common_vendor.computed(() => {
      const style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.zIndex)) {
        style["z-index"] = props.zIndex;
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}${props.customStyle}`;
    });
    common_vendor.watch(
      [() => props.fixed, () => props.placeholder],
      () => {
        setPlaceholderHeight();
      },
      { deep: true, immediate: false }
    );
    common_vendor.onMounted(() => {
      if (props.fixed && props.placeholder) {
        common_vendor.nextTick$1(() => {
          setPlaceholderHeight();
        });
      }
    });
    function setChange(child) {
      let active = child.name;
      emit("update:modelValue", active);
      emit("change", {
        value: active
      });
    }
    function setPlaceholderHeight() {
      if (!props.fixed || !props.placeholder) {
        return;
      }
      uni_modules_wotDesignUni_components_common_util.getRect(".wd-tabbar", false, proxy).then((res) => {
        height.value = Number(res.height);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-tabbar wd-tabbar--${_ctx.shape} ${_ctx.customClass} ${_ctx.fixed ? "is-fixed" : ""} ${_ctx.safeAreaInsetBottom ? "is-safe" : ""} ${_ctx.bordered ? "is-border" : ""}`),
        b: common_vendor.s(rootStyle.value),
        c: _ctx.fixed && _ctx.placeholder && _ctx.safeAreaInsetBottom && _ctx.shape === "round" ? 1 : "",
        d: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(height.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70467ab8"]]);
wx.createComponent(Component);
