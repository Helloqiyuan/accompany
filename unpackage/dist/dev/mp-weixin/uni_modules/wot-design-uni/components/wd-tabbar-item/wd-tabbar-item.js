"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdTabbar_types = require("../wd-tabbar/types.js");
const uni_modules_wotDesignUni_components_wdTabbarItem_types = require("./types.js");
if (!Math) {
  (wdIcon + wdBadge)();
}
const wdBadge = () => "../wd-badge/wd-badge.js";
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-tabbar-item",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTabbarItem_types.tabbarItemProps,
  setup(__props) {
    const props = __props;
    const { parent: tabbar, index } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdTabbar_types.TABBAR_KEY);
    const customBadgeProps = common_vendor.computed(() => {
      const badgeProps = uni_modules_wotDesignUni_components_common_util.deepAssign(
        uni_modules_wotDesignUni_components_common_util.isDef(props.badgeProps) ? uni_modules_wotDesignUni_components_common_util.omitBy(props.badgeProps, uni_modules_wotDesignUni_components_common_util.isUndefined) : {},
        uni_modules_wotDesignUni_components_common_util.omitBy(
          {
            max: props.max,
            isDot: props.isDot,
            modelValue: props.value
          },
          uni_modules_wotDesignUni_components_common_util.isUndefined
        )
      );
      if (!uni_modules_wotDesignUni_components_common_util.isDef(badgeProps.max)) {
        badgeProps.max = 99;
      }
      return badgeProps;
    });
    const textStyle = common_vendor.computed(() => {
      const style = {};
      if (tabbar) {
        if (active.value && tabbar.props.activeColor) {
          style["color"] = tabbar.props.activeColor;
        }
        if (!active.value && tabbar.props.inactiveColor) {
          style["color"] = tabbar.props.inactiveColor;
        }
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}`;
    });
    const active = common_vendor.computed(() => {
      const name = uni_modules_wotDesignUni_components_common_util.isDef(props.name) ? props.name : index.value;
      if (tabbar) {
        if (tabbar.props.modelValue === name) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    function handleClick() {
      const name = uni_modules_wotDesignUni_components_common_util.isDef(props.name) ? props.name : index.value;
      tabbar && tabbar.setChange({ name });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.r("icon", {
          active: active.value
        }),
        b: !_ctx.$slots.icon && _ctx.icon
      }, !_ctx.$slots.icon && _ctx.icon ? {
        c: common_vendor.p({
          name: _ctx.icon,
          ["custom-style"]: textStyle.value,
          ["custom-class"]: `wd-tabbar-item__body-icon ${active.value ? "is-active" : "is-inactive"}`
        })
      } : {}, {
        d: _ctx.title
      }, _ctx.title ? {
        e: common_vendor.t(_ctx.title),
        f: common_vendor.s(textStyle.value),
        g: common_vendor.n(`wd-tabbar-item__body-title ${active.value ? "is-active" : "is-inactive"}`)
      } : {}, {
        h: common_vendor.p({
          ...customBadgeProps.value
        }),
        i: common_vendor.n(`wd-tabbar-item ${_ctx.customClass}`),
        j: common_vendor.s(_ctx.customStyle),
        k: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b5379ae"]]);
wx.createComponent(Component);
