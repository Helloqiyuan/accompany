"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdSteps_types = require("../wd-steps/types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdStep_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-step",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdStep_types.stepProps,
  setup(__props) {
    const props = __props;
    const { parent: steps, index } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdSteps_types.STEPS_KEY);
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("steps");
    const currentStatus = common_vendor.computed(() => {
      return getCurrentStatus(index.value);
    });
    const currentTitle = common_vendor.computed(() => {
      return getCurrentTitle(currentStatus.value);
    });
    const rootStyle = common_vendor.computed(() => {
      const style = {};
      if (steps) {
        const { vertical: vertical2, space } = steps.props;
        if (vertical2) {
          if (uni_modules_wotDesignUni_components_common_util.isDef(space)) {
            style["height"] = space;
          }
        } else {
          style["width"] = space || 100 / steps.children.length + "%";
        }
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}${props.customStyle}`;
    });
    const canAlignCenter = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(steps)) {
        const { vertical: vertical2, alignCenter } = steps.props;
        return Boolean(!vertical2 && alignCenter);
      } else {
        return false;
      }
    });
    const vertical = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(steps)) {
        return Boolean(steps.props.vertical);
      } else {
        return false;
      }
    });
    const dot = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(steps)) {
        return Boolean(steps.props.dot);
      } else {
        return false;
      }
    });
    const childrenLength = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(steps)) {
        return Number(steps.children.length);
      } else {
        return 0;
      }
    });
    function getCurrentStatus(index2) {
      if (props.status) {
        return props.status;
      }
      if (steps) {
        const { active } = steps.props;
        if (Number(active) > index2) {
          return "finished";
        } else if (Number(active) === index2) {
          return "process";
        } else {
          return "wait";
        }
      } else {
        return "wait";
      }
    }
    function getCurrentTitle(currentStatus2) {
      if (props.title)
        return props.title;
      switch (currentStatus2) {
        case "finished":
          return translate("finished");
        case "error":
          return translate("failed");
        case "process":
          return translate("process");
        case "wait":
        default:
          return translate("wait");
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentStatus.value
      }, currentStatus.value ? common_vendor.e({
        b: dot.value
      }, dot.value ? {} : _ctx.$slots.icon ? {} : _ctx.icon ? {
        e: common_vendor.p({
          ["custom-class"]: "wd-step__icon-inner",
          name: _ctx.icon
        })
      } : common_vendor.e({
        f: currentStatus.value === "finished"
      }, currentStatus.value === "finished" ? {
        g: common_vendor.p({
          name: "check-bold"
        })
      } : currentStatus.value === "error" ? {
        i: common_vendor.p({
          name: "close-bold"
        })
      } : {
        j: common_vendor.t(common_vendor.unref(index) + 1)
      }, {
        h: currentStatus.value === "error"
      }), {
        c: _ctx.$slots.icon,
        d: _ctx.icon,
        k: common_vendor.n(`wd-step__icon  ${dot.value ? "is-dot" : !!_ctx.icon || _ctx.$slots.icon ? "is-icon" : "is-text"}`),
        l: common_vendor.unref(index) < childrenLength.value - 1
      }, common_vendor.unref(index) < childrenLength.value - 1 ? {} : {}, {
        m: common_vendor.n(`wd-step__header  ${dot.value ? "is-dot" : ""}`),
        n: _ctx.$slots.title
      }, _ctx.$slots.title ? {} : {
        o: common_vendor.t(currentTitle.value)
      }, {
        p: common_vendor.n(`wd-step__title ${_ctx.$slots.description || _ctx.description ? "is-description" : ""}`),
        q: _ctx.$slots.description || _ctx.description
      }, _ctx.$slots.description || _ctx.description ? common_vendor.e({
        r: _ctx.$slots.description
      }, _ctx.$slots.description ? {} : {
        s: common_vendor.t(_ctx.description)
      }) : {}, {
        t: common_vendor.n(`wd-step ${_ctx.customClass} ${currentStatus.value ? "is-" + currentStatus.value : ""} ${canAlignCenter.value ? "is-center" : ""}  ${vertical.value ? "is-vertical" : ""}`),
        v: common_vendor.s(rootStyle.value)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c157cc0a"]]);
wx.createComponent(Component);
