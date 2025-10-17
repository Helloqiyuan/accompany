"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_dayjs_index = require("../../dayjs/index.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdCalendarView_utils = require("../wd-calendar-view/utils.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdCalendar_types = require("./types.js");
if (!Array) {
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  (_easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_tag2)();
}
const _easycom_wd_tab = () => "../wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../wd-tabs/wd-tabs.js";
const _easycom_wd_tag = () => "../wd-tag/wd-tag.js";
if (!Math) {
  (wdIcon + wdCell + _easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_tag + wdCalendarView + wdButton + wdActionSheet)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdCalendarView = () => "../wd-calendar-view/wd-calendar-view.js";
const wdActionSheet = () => "../wd-action-sheet/wd-action-sheet.js";
const wdButton = () => "../wd-button/wd-button.js";
const wdCell = () => "../wd-cell/wd-cell.js";
const __default__ = {
  name: "wd-calendar",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdCalendar_types.calendarProps,
  emits: ["cancel", "change", "update:modelValue", "confirm", "open", "clear"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("calendar");
    const defaultDisplayFormat = (value, type) => {
      switch (type) {
        case "date":
          return uni_modules_wotDesignUni_dayjs_index.dayjs(value).format("YYYY-MM-DD");
        case "dates":
          return value.map((item) => {
            return uni_modules_wotDesignUni_dayjs_index.dayjs(item).format("YYYY-MM-DD");
          }).join(", ");
        case "daterange":
          return `${value[0] ? uni_modules_wotDesignUni_dayjs_index.dayjs(value[0]).format("YYYY-MM-DD") : translate("startTime")} ${translate("to")} ${value[1] ? uni_modules_wotDesignUni_dayjs_index.dayjs(value[1]).format("YYYY-MM-DD") : translate("endTime")}`;
        case "datetime":
          return uni_modules_wotDesignUni_dayjs_index.dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        case "datetimerange":
          return `${value[0] ? uni_modules_wotDesignUni_dayjs_index.dayjs(value[0]).format(translate("timeFormat")) : translate("startTime")} ${translate(
            "to"
          )}
${value[1] ? uni_modules_wotDesignUni_dayjs_index.dayjs(value[1]).format(translate("timeFormat")) : translate("endTime")}`;
        case "week": {
          const date = new Date(value);
          const year = date.getFullYear();
          const week = uni_modules_wotDesignUni_components_wdCalendarView_utils.getWeekNumber(value);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay() + 1);
          const weekEnd = new Date(date);
          weekEnd.setDate(date.getDate() + (7 - date.getDay()));
          const adjustedYear = weekEnd.getFullYear() > year ? weekEnd.getFullYear() : year;
          return translate("weekFormat", adjustedYear, uni_modules_wotDesignUni_components_common_util.padZero(week));
        }
        case "weekrange": {
          const date1 = new Date(value[0]);
          const date2 = new Date(value[1]);
          const year1 = date1.getFullYear();
          const year2 = date2.getFullYear();
          const week1 = uni_modules_wotDesignUni_components_wdCalendarView_utils.getWeekNumber(value[0]);
          const week2 = uni_modules_wotDesignUni_components_wdCalendarView_utils.getWeekNumber(value[1]);
          const weekStart1 = new Date(date1);
          weekStart1.setDate(date1.getDate() - date1.getDay() + 1);
          const weekEnd1 = new Date(date1);
          weekEnd1.setDate(date1.getDate() + (7 - date1.getDay()));
          const weekStart2 = new Date(date2);
          weekStart2.setDate(date2.getDate() - date2.getDay() + 1);
          const weekEnd2 = new Date(date2);
          weekEnd2.setDate(date2.getDate() + (7 - date2.getDay()));
          const adjustedYear1 = weekEnd1.getFullYear() > year1 ? weekEnd1.getFullYear() : year1;
          const adjustedYear2 = weekEnd2.getFullYear() > year2 ? weekEnd2.getFullYear() : year2;
          return `${value[0] ? translate("weekFormat", adjustedYear1, uni_modules_wotDesignUni_components_common_util.padZero(week1)) : translate("startWeek")} - ${value[1] ? translate("weekFormat", adjustedYear2, uni_modules_wotDesignUni_components_common_util.padZero(week2)) : translate("endWeek")}`;
        }
        case "month":
          return uni_modules_wotDesignUni_dayjs_index.dayjs(value).format("YYYY / MM");
        case "monthrange":
          return `${value[0] ? uni_modules_wotDesignUni_dayjs_index.dayjs(value[0]).format("YYYY / MM") : translate("startMonth")} ${translate("to")} ${value[1] ? uni_modules_wotDesignUni_dayjs_index.dayjs(value[1]).format("YYYY / MM") : translate("endMonth")}`;
      }
    };
    const formatRange = (value, rangeType, type) => {
      switch (type) {
        case "daterange":
          if (!value) {
            return rangeType === "end" ? translate("endTime") : translate("startTime");
          }
          return uni_modules_wotDesignUni_dayjs_index.dayjs(value).format(translate("dateFormat"));
        case "datetimerange":
          if (!value) {
            return rangeType === "end" ? translate("endTime") : translate("startTime");
          }
          return uni_modules_wotDesignUni_dayjs_index.dayjs(value).format(translate("timeFormat"));
        case "weekrange": {
          if (!value) {
            return rangeType === "end" ? translate("endWeek") : translate("startWeek");
          }
          const date = new Date(value);
          const year = date.getFullYear();
          const week = uni_modules_wotDesignUni_components_wdCalendarView_utils.getWeekNumber(value);
          return translate("weekFormat", year, uni_modules_wotDesignUni_components_common_util.padZero(week));
        }
        case "monthrange":
          if (!value) {
            return rangeType === "end" ? translate("endMonth") : translate("startMonth");
          }
          return uni_modules_wotDesignUni_dayjs_index.dayjs(value).format(translate("monthFormat"));
      }
    };
    const props = __props;
    const emit = __emit;
    const pickerShow = common_vendor.ref(false);
    const calendarValue = common_vendor.ref(null);
    const lastCalendarValue = common_vendor.ref(null);
    const panelHeight = common_vendor.ref(338);
    const confirmBtnDisabled = common_vendor.ref(true);
    const currentTab = common_vendor.ref(0);
    const lastTab = common_vendor.ref(0);
    const currentType = common_vendor.ref("date");
    const lastCurrentType = common_vendor.ref();
    const inited = common_vendor.ref(false);
    const calendarView = common_vendor.ref();
    const calendarTabs = common_vendor.ref();
    const rangeLabel = common_vendor.computed(() => {
      const [start, end] = uni_modules_wotDesignUni_components_common_util.deepClone(uni_modules_wotDesignUni_components_common_util.isArray(calendarValue.value) ? calendarValue.value : []);
      return [start, end].map((item, index) => {
        return (props.innerDisplayFormat || formatRange)(item, index === 0 ? "start" : "end", currentType.value);
      });
    });
    const showValue = common_vendor.computed(() => {
      if (!uni_modules_wotDesignUni_components_common_util.isArray(props.modelValue) && props.modelValue || uni_modules_wotDesignUni_components_common_util.isArray(props.modelValue) && props.modelValue.length) {
        return (props.displayFormat || defaultDisplayFormat)(props.modelValue, lastCurrentType.value || currentType.value);
      } else {
        return "";
      }
    });
    const cellClass = common_vendor.computed(() => {
      const classes = ["wd-calendar__cell"];
      if (props.disabled)
        classes.push("is-disabled");
      if (props.readonly)
        classes.push("is-readonly");
      if (props.error)
        classes.push("is-error");
      if (!showValue.value)
        classes.push("wd-calendar__cell--placeholder");
      return classes.join(" ");
    });
    common_vendor.watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (uni_modules_wotDesignUni_components_common_util.isEqual(val, oldVal))
          return;
        calendarValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(val);
        confirmBtnDisabled.value = getConfirmBtnStatus(val);
      },
      {
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.type,
      (newValue, oldValue) => {
        if (props.showTypeSwitch) {
          const tabs = ["date", "week", "month"];
          const rangeTabs = ["daterange", "weekrange", "monthrange"];
          const index = newValue.indexOf("range") > -1 ? rangeTabs.indexOf(newValue) || 0 : tabs.indexOf(newValue);
          currentTab.value = index;
        }
        panelHeight.value = props.showConfirm ? 338 : 400;
        currentType.value = uni_modules_wotDesignUni_components_common_util.deepClone(newValue);
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.showConfirm,
      (val) => {
        panelHeight.value = val ? 338 : 400;
      },
      {
        deep: true,
        immediate: true
      }
    );
    const range = common_vendor.computed(() => {
      return (type) => {
        return uni_modules_wotDesignUni_components_wdCalendarView_utils.isRange(type);
      };
    });
    const showClear = common_vendor.computed(() => {
      return props.clearable && !props.disabled && !props.readonly && showValue.value.length > 0;
    });
    const showArrow = common_vendor.computed(() => {
      return !props.disabled && !props.readonly && !showClear.value;
    });
    function handleClear() {
      emit("clear");
      emit("update:modelValue", null);
    }
    function scrollIntoView() {
      calendarView.value && calendarView.value && calendarView.value.$.exposed.scrollIntoView();
    }
    async function open() {
      const { disabled, readonly } = props;
      if (disabled || readonly)
        return;
      inited.value = true;
      pickerShow.value = true;
      lastCalendarValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(calendarValue.value);
      lastTab.value = currentTab.value;
      lastCurrentType.value = currentType.value;
      await uni_modules_wotDesignUni_components_common_util.pause();
      scrollIntoView();
      setTimeout(() => {
        if (props.showTypeSwitch) {
          calendarTabs.value.scrollIntoView();
          calendarTabs.value.updateLineStyle(false);
        }
      }, 250);
      emit("open");
    }
    function close() {
      pickerShow.value = false;
      setTimeout(() => {
        calendarValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(lastCalendarValue.value);
        currentTab.value = lastTab.value;
        currentType.value = lastCurrentType.value || "date";
        confirmBtnDisabled.value = getConfirmBtnStatus(lastCalendarValue.value);
      }, 250);
      emit("cancel");
    }
    function handleTypeChange({ index }) {
      const tabs = ["date", "week", "month"];
      const rangeTabs = ["daterange", "weekrange", "monthrange"];
      const type = props.type.indexOf("range") > -1 ? rangeTabs[index] : tabs[index];
      currentTab.value = index;
      currentType.value = type;
    }
    function getConfirmBtnStatus(value) {
      let confirmBtnDisabled2 = false;
      if (props.type.indexOf("range") > -1 && (!uni_modules_wotDesignUni_components_common_util.isArray(value) || !value[0] || !value[1] || !value) || props.type === "dates" && (!uni_modules_wotDesignUni_components_common_util.isArray(value) || value.length === 0 || !value) || !value) {
        confirmBtnDisabled2 = true;
      }
      return confirmBtnDisabled2;
    }
    function handleChange({ value }) {
      calendarValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(value);
      confirmBtnDisabled.value = getConfirmBtnStatus(value);
      emit("change", {
        value
      });
      if (!props.showConfirm && !confirmBtnDisabled.value) {
        handleConfirm();
      }
    }
    function handleConfirm() {
      if (props.beforeConfirm) {
        props.beforeConfirm({
          value: calendarValue.value,
          resolve: (isPass) => {
            isPass && onConfirm();
          }
        });
      } else {
        onConfirm();
      }
    }
    function onConfirm() {
      pickerShow.value = false;
      lastCurrentType.value = currentType.value;
      emit("update:modelValue", calendarValue.value);
      emit("confirm", {
        value: calendarValue.value,
        type: currentType.value
      });
    }
    function handleShortcutClick(index) {
      if (props.onShortcutsClick && typeof props.onShortcutsClick === "function") {
        calendarValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(
          props.onShortcutsClick({
            item: props.shortcuts[index],
            index
          })
        );
        confirmBtnDisabled.value = getConfirmBtnStatus(calendarValue.value);
      }
      if (!props.showConfirm) {
        handleConfirm();
      }
    }
    __expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.withCell
      }, _ctx.withCell ? common_vendor.e({
        b: !_ctx.$slots.default
      }, !_ctx.$slots.default ? common_vendor.e({
        c: _ctx.$slots.label
      }, _ctx.$slots.label ? {} : {}, {
        d: showArrow.value
      }, showArrow.value ? {
        e: common_vendor.p({
          ["custom-class"]: "wd-calendar__arrow",
          name: "arrow-right"
        })
      } : showClear.value ? {
        g: common_vendor.p({
          ["custom-class"]: "wd-calendar__clear",
          name: "error-fill"
        }),
        h: common_vendor.o(handleClear)
      } : {}, {
        f: showClear.value,
        i: common_vendor.o(open),
        j: common_vendor.p({
          title: _ctx.label,
          value: showValue.value || _ctx.placeholder || common_vendor.unref(translate)("placeholder"),
          required: _ctx.required,
          size: _ctx.size,
          ["title-width"]: _ctx.labelWidth,
          prop: _ctx.prop,
          rules: _ctx.rules,
          clickable: !_ctx.disabled && !_ctx.readonly,
          ["value-align"]: _ctx.alignRight ? "right" : "left",
          center: _ctx.center,
          ["custom-class"]: cellClass.value,
          ["custom-style"]: _ctx.customStyle,
          ["custom-title-class"]: _ctx.customLabelClass,
          ["custom-value-class"]: _ctx.customValueClass,
          ellipsis: _ctx.ellipsis,
          ["use-title-slot"]: !!_ctx.$slots.label,
          ["marker-side"]: _ctx.markerSide
        })
      }) : {
        k: common_vendor.o(open)
      }) : {}, {
        l: !_ctx.showTypeSwitch && _ctx.shortcuts.length === 0
      }, !_ctx.showTypeSwitch && _ctx.shortcuts.length === 0 ? {
        m: common_vendor.t(_ctx.title || common_vendor.unref(translate)("title"))
      } : {}, {
        n: _ctx.showTypeSwitch
      }, _ctx.showTypeSwitch ? {
        o: common_vendor.p({
          title: common_vendor.unref(translate)("day"),
          name: common_vendor.unref(translate)("day")
        }),
        p: common_vendor.p({
          title: common_vendor.unref(translate)("week"),
          name: common_vendor.unref(translate)("week")
        }),
        q: common_vendor.p({
          title: common_vendor.unref(translate)("month"),
          name: common_vendor.unref(translate)("month")
        }),
        r: common_vendor.sr(calendarTabs, "4602e815-4,4602e815-3", {
          "k": "calendarTabs"
        }),
        s: common_vendor.o(handleTypeChange),
        t: common_vendor.o(($event) => currentTab.value = $event),
        v: common_vendor.p({
          modelValue: currentTab.value
        })
      } : {}, {
        w: _ctx.shortcuts.length > 0
      }, _ctx.shortcuts.length > 0 ? {
        x: common_vendor.f(_ctx.shortcuts, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index,
            c: common_vendor.o(($event) => handleShortcutClick(index), index),
            d: "4602e815-8-" + i0 + ",4602e815-3"
          };
        }),
        y: common_vendor.p({
          ["custom-class"]: "wd-calendar__tag",
          type: "primary",
          plain: true,
          round: true
        })
      } : {}, {
        z: common_vendor.o(close),
        A: common_vendor.p({
          ["custom-class"]: "wd-calendar__close",
          name: "add"
        }),
        B: inited.value
      }, inited.value ? common_vendor.e({
        C: range.value(_ctx.type)
      }, range.value(_ctx.type) ? {
        D: common_vendor.t(rangeLabel.value[0]),
        E: common_vendor.n(`wd-calendar__range-label-item ${!calendarValue.value || !common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(calendarValue.value) || !calendarValue.value[0] ? "is-placeholder" : ""}`),
        F: common_vendor.t(rangeLabel.value[1]),
        G: common_vendor.n(`wd-calendar__range-label-item ${!calendarValue.value || !common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(calendarValue.value) || !calendarValue.value[1] ? "is-placeholder" : ""}`),
        H: common_vendor.n(`wd-calendar__range-label ${_ctx.type === "monthrange" ? "is-monthrange" : ""}`)
      } : {}, {
        I: common_vendor.sr(calendarView, "4602e815-10,4602e815-3", {
          "k": "calendarView"
        }),
        J: common_vendor.o(handleChange),
        K: common_vendor.o(($event) => calendarValue.value = $event),
        L: common_vendor.p({
          type: currentType.value,
          ["min-date"]: _ctx.minDate,
          ["max-date"]: _ctx.maxDate,
          ["first-day-of-week"]: _ctx.firstDayOfWeek,
          formatter: _ctx.formatter,
          ["panel-height"]: panelHeight.value,
          ["max-range"]: _ctx.maxRange,
          ["range-prompt"]: _ctx.rangePrompt,
          ["allow-same-day"]: _ctx.allowSameDay,
          ["default-time"]: _ctx.defaultTime,
          ["time-filter"]: _ctx.timeFilter,
          ["hide-second"]: _ctx.hideSecond,
          ["show-panel-title"]: !range.value(_ctx.type),
          ["immediate-change"]: _ctx.immediateChange,
          modelValue: calendarValue.value
        }),
        M: common_vendor.n(`wd-calendar__view  ${currentType.value.indexOf("range") > -1 ? "is-range" : ""} ${_ctx.showConfirm ? "is-show-confirm" : ""}`)
      }) : {}, {
        N: _ctx.showConfirm
      }, _ctx.showConfirm ? {
        O: common_vendor.t(_ctx.confirmText || common_vendor.unref(translate)("confirm")),
        P: common_vendor.o(handleConfirm),
        Q: common_vendor.p({
          block: true,
          disabled: confirmBtnDisabled.value
        })
      } : {}, {
        R: common_vendor.o(close),
        S: common_vendor.o(($event) => pickerShow.value = $event),
        T: common_vendor.p({
          duration: 250,
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["z-index"]: _ctx.zIndex,
          ["root-portal"]: _ctx.rootPortal,
          modelValue: pickerShow.value
        }),
        U: common_vendor.n(`wd-calendar ${_ctx.customClass}`)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4602e815"]]);
wx.createComponent(Component);
