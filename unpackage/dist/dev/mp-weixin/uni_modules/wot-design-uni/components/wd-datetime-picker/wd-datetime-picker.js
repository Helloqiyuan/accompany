"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdDatetimePicker_types = require("./types.js");
const uni_modules_wotDesignUni_dayjs_index = require("../../dayjs/index.js");
const uni_modules_wotDesignUni_components_wdDatetimePickerView_util = require("../wd-datetime-picker-view/util.js");
if (!Math) {
  (wdIcon + wdCell + wdDatetimePickerView + wdPopup)();
}
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdDatetimePickerView = () => "../wd-datetime-picker-view/wd-datetime-picker-view.js";
const wdCell = () => "../wd-cell/wd-cell.js";
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-datetime-picker",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdDatetimePicker_types.datetimePickerProps,
  emits: ["change", "open", "toggle", "cancel", "confirm", "clear", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("datetime-picker");
    const datetimePickerView = common_vendor.ref();
    const datetimePickerView1 = common_vendor.ref();
    const showValue = common_vendor.ref("");
    const popupShow = common_vendor.ref(false);
    const showStart = common_vendor.ref(true);
    const region = common_vendor.ref(false);
    const showTabLabel = common_vendor.ref([]);
    const innerValue = common_vendor.ref("");
    const endInnerValue = common_vendor.ref("");
    const isPicking = common_vendor.ref(false);
    const hasConfirmed = common_vendor.ref(false);
    const isLoading = common_vendor.ref(false);
    const { proxy } = common_vendor.getCurrentInstance();
    const cellClass = common_vendor.computed(() => {
      const classes = ["wd-datetime-picker__cell"];
      if (props.disabled)
        classes.push("is-disabled");
      if (props.readonly)
        classes.push("is-readonly");
      if (props.error)
        classes.push("is-error");
      return classes.join(" ");
    });
    common_vendor.watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (uni_modules_wotDesignUni_components_common_util.isEqual(val, oldVal))
          return;
        if (uni_modules_wotDesignUni_components_common_util.isArray(val)) {
          region.value = true;
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
          endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
        } else {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
        }
        common_vendor.nextTick$1(() => {
          setShowValue(false, false, true);
        });
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.displayFormat,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of displayFormat must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.filter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of filter must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.formatter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of formatter must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.beforeConfirm,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of beforeConfirm must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.displayFormatTabLabel,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of displayFormatTabLabel must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.defaultValue,
      (val) => {
        if (uni_modules_wotDesignUni_components_common_util.isArray(val) || region.value) {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
          endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
        } else {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const showClear = common_vendor.computed(() => {
      return props.clearable && !props.disabled && !props.readonly && (!uni_modules_wotDesignUni_components_common_util.isArray(showValue.value) && showValue.value || uni_modules_wotDesignUni_components_common_util.isArray(showValue.value) && (showValue.value[0] || showValue.value[1]));
    });
    const showArrow = common_vendor.computed(() => {
      return !props.disabled && !props.readonly && !showClear.value;
    });
    function handleBoundaryValue(isStart, columnType, value, currentArray, boundary) {
      const { type, useSecond } = props;
      switch (type) {
        case "datetime": {
          const [year, month, date, hour, minute, second] = boundary;
          if (columnType === "year") {
            return isStart ? value > year : value < year;
          }
          if (columnType === "month" && currentArray[0] === year) {
            return isStart ? value > month : value < month;
          }
          if (columnType === "date" && currentArray[0] === year && currentArray[1] === month) {
            return isStart ? value > date : value < date;
          }
          if (columnType === "hour" && currentArray[0] === year && currentArray[1] === month && currentArray[2] === date) {
            return isStart ? value > hour : value < hour;
          }
          if (columnType === "minute" && currentArray[0] === year && currentArray[1] === month && currentArray[2] === date && currentArray[3] === hour) {
            return isStart ? value > minute : value < minute;
          }
          if (useSecond && columnType === "second" && currentArray[0] === year && currentArray[1] === month && currentArray[2] === date && currentArray[3] === hour && currentArray[4] === minute) {
            return isStart ? value > second : value < second;
          }
          break;
        }
        case "year-month": {
          const [year, month] = boundary;
          if (columnType === "year") {
            return isStart ? value > year : value < year;
          }
          if (columnType === "month" && currentArray[0] === year) {
            return isStart ? value > month : value < month;
          }
          break;
        }
        case "year": {
          const [year] = boundary;
          if (columnType === "year") {
            return isStart ? value > year : value < year;
          }
          break;
        }
        case "date": {
          const [year, month, date] = boundary;
          if (columnType === "year") {
            return isStart ? value > year : value < year;
          }
          if (columnType === "month" && currentArray[0] === year) {
            return isStart ? value > month : value < month;
          }
          if (columnType === "date" && currentArray[0] === year && currentArray[1] === month) {
            return isStart ? value > date : value < date;
          }
          break;
        }
        case "time": {
          const [hour, minute, second] = boundary;
          if (columnType === "hour") {
            return isStart ? value > hour : value < hour;
          }
          if (columnType === "minute" && currentArray[0] === hour) {
            return isStart ? value > minute : value < minute;
          }
          if (useSecond && columnType === "second" && currentArray[0] === hour && currentArray[1] === minute) {
            return isStart ? value > second : value < second;
          }
          break;
        }
      }
      return false;
    }
    function startColumnFormatter(picker) {
      return customColumnFormatter(picker, "start");
    }
    function endColumnFormatter(picker) {
      return customColumnFormatter(picker, "end");
    }
    const customColumnFormatter = (picker, pickerType) => {
      if (!picker)
        return [];
      const { type } = props;
      const startSymbol = pickerType === "start";
      const { formatter } = props;
      const start = picker.correctValue(innerValue.value);
      const end = picker.correctValue(endInnerValue.value);
      const currentValue = startSymbol ? uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(start, type, props.useSecond) : uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(end, type, props.useSecond);
      const boundary = startSymbol ? uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(end, type, props.useSecond) : uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(start, type, props.useSecond);
      const columns = picker.getOriginColumns();
      return columns.map((column, _) => {
        return column.values.map((value) => {
          const disabled = handleBoundaryValue(startSymbol, column.type, value, currentValue, boundary);
          return {
            label: formatter ? formatter(column.type, uni_modules_wotDesignUni_components_common_util.padZero(value)) : uni_modules_wotDesignUni_components_common_util.padZero(value),
            value,
            disabled
          };
        });
      });
    };
    common_vendor.onBeforeMount(() => {
      const { modelValue: value } = props;
      if (uni_modules_wotDesignUni_components_common_util.isArray(value)) {
        region.value = true;
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
        endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
      } else {
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
      }
    });
    common_vendor.onMounted(() => {
      setShowValue(false, false, true);
    });
    function getSelects(picker) {
      let value = picker === "before" ? innerValue.value : endInnerValue.value;
      let selected = [];
      if (value) {
        selected = uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(value, props.type, props.useSecond);
      }
      let selects = selected.map((value2) => {
        return {
          [props.labelKey]: uni_modules_wotDesignUni_components_common_util.padZero(value2),
          [props.valueKey]: value2
        };
      });
      return selects;
    }
    function noop() {
    }
    function getDefaultInnerValue(isRegion, isEnd) {
      const { modelValue: value, defaultValue, maxDate, minDate, type } = props;
      if (isRegion) {
        const index = isEnd ? 1 : 0;
        const targetValue = uni_modules_wotDesignUni_components_common_util.isArray(value) ? value[index] : "";
        const targetDefault = uni_modules_wotDesignUni_components_common_util.isArray(defaultValue) ? defaultValue[index] : "";
        const maxValue = type === "time" ? uni_modules_wotDesignUni_dayjs_index.dayjs(maxDate).format("HH:mm") : maxDate;
        const minValue = type === "time" ? uni_modules_wotDesignUni_dayjs_index.dayjs(minDate).format("HH:mm") : minDate;
        return targetValue || targetDefault || (isEnd ? maxValue : minValue);
      } else {
        return uni_modules_wotDesignUni_components_common_util.isDef(value || defaultValue) ? value || defaultValue : "";
      }
    }
    function open() {
      showPopup();
    }
    function close() {
      onCancel();
    }
    function showPopup() {
      if (props.disabled || props.readonly)
        return;
      emit("open");
      if (region.value) {
        popupShow.value = true;
        showStart.value = true;
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, false));
        endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
      } else {
        popupShow.value = true;
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
      }
      setShowValue(true, false, true);
    }
    function tabChange() {
      showStart.value = !showStart.value;
      const picker = showStart.value ? datetimePickerView.value : datetimePickerView1.value;
      picker.setColumns(picker.updateColumns());
      emit("toggle", showStart.value ? innerValue.value : endInnerValue.value);
    }
    function onChangeStart({ value }) {
      if (!datetimePickerView.value)
        return;
      if (region.value && !datetimePickerView1.value)
        return;
      if (region.value) {
        const currentArray = uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(value, props.type, props.useSecond);
        const boundaryArray = uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(endInnerValue.value, props.type, props.useSecond);
        const columns = datetimePickerView.value.getOriginColumns();
        const needsAdjust = columns.some((column, index) => {
          return handleBoundaryValue(true, column.type, currentArray[index], currentArray, boundaryArray);
        });
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(needsAdjust ? endInnerValue.value : value);
        common_vendor.nextTick$1(() => {
          showTabLabel.value = [setTabLabel(), uni_modules_wotDesignUni_components_common_util.deepClone(showTabLabel.value[1])];
          emit("change", {
            value: [innerValue.value, endInnerValue.value]
          });
          datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns());
          datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns());
        });
      } else {
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(value);
        emit("change", {
          value: innerValue.value
        });
      }
    }
    function onChangeEnd({ value }) {
      if (!datetimePickerView.value || !datetimePickerView1.value)
        return;
      const currentArray = uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(value, props.type);
      const boundaryArray = uni_modules_wotDesignUni_components_wdDatetimePickerView_util.getPickerValue(innerValue.value, props.type);
      const columns = datetimePickerView1.value.getOriginColumns();
      const needsAdjust = columns.some((column, index) => {
        return handleBoundaryValue(false, column.type, currentArray[index], currentArray, boundaryArray);
      });
      endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(needsAdjust ? innerValue.value : value);
      common_vendor.nextTick$1(() => {
        showTabLabel.value = [uni_modules_wotDesignUni_components_common_util.deepClone(showTabLabel.value[0]), setTabLabel(1)];
        emit("change", {
          value: [innerValue.value, endInnerValue.value]
        });
        datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns());
        datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns());
      });
    }
    function onCancel() {
      popupShow.value = false;
      setTimeout(() => {
        if (region.value) {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
          endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
        } else {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
        }
      }, 200);
      emit("cancel");
    }
    function onConfirm() {
      if (props.loading || isLoading.value)
        return;
      if (isPicking.value) {
        hasConfirmed.value = true;
        return;
      }
      const { beforeConfirm } = props;
      if (beforeConfirm) {
        beforeConfirm(
          region.value ? [innerValue.value, endInnerValue.value] : innerValue.value,
          (isPass) => {
            isPass && handleConfirm();
          },
          proxy.$.exposed
        );
      } else {
        handleConfirm();
      }
    }
    function onPickStart() {
      isPicking.value = true;
    }
    function onPickEnd() {
      isPicking.value = false;
      setTimeout(() => {
        if (hasConfirmed.value) {
          hasConfirmed.value = false;
          onConfirm();
        }
      }, 50);
    }
    function handleConfirm() {
      if (props.loading || isLoading.value || props.disabled) {
        popupShow.value = false;
        return;
      }
      const value = region.value ? [innerValue.value, endInnerValue.value] : innerValue.value;
      popupShow.value = false;
      emit("update:modelValue", value);
      emit("confirm", {
        value
      });
      setShowValue(false, true);
    }
    function setTabLabel(index = 0) {
      if (region.value) {
        let items = [];
        if (index === 0) {
          items = (datetimePickerView.value ? datetimePickerView.value.getSelects() : void 0) || innerValue.value && getSelects("before");
        } else {
          items = (datetimePickerView1.value ? datetimePickerView1.value.getSelects() : void 0) || endInnerValue.value && getSelects("after");
        }
        return defaultDisplayFormat(items, true);
      } else {
        return "";
      }
    }
    function setShowValue(tab = false, isConfirm = false, beforeMount = false) {
      if (region.value) {
        const items = beforeMount ? innerValue.value && getSelects("before") || [] : datetimePickerView.value && datetimePickerView.value.getSelects && datetimePickerView.value.getSelects() || [];
        const endItems = beforeMount ? endInnerValue.value && getSelects("after") || [] : datetimePickerView1.value && datetimePickerView1.value.getSelects && datetimePickerView1.value.getSelects() || [];
        showValue.value = tab ? showValue.value : [
          props.modelValue[0] || isConfirm ? defaultDisplayFormat(items) : "",
          props.modelValue[1] || isConfirm ? defaultDisplayFormat(endItems) : ""
        ];
        showTabLabel.value = [defaultDisplayFormat(items, true), defaultDisplayFormat(endItems, true)];
      } else {
        const items = beforeMount ? innerValue.value && getSelects("before") || [] : datetimePickerView.value && datetimePickerView.value.getSelects && datetimePickerView.value.getSelects() || [];
        showValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(props.modelValue || isConfirm ? defaultDisplayFormat(items) : "");
      }
    }
    function defaultDisplayFormat(items, tabLabel = false) {
      if (items.length === 0)
        return "";
      if (tabLabel && props.displayFormatTabLabel) {
        return props.displayFormatTabLabel(items);
      }
      if (props.displayFormat) {
        return props.displayFormat(items);
      }
      if (props.formatter) {
        const typeMaps = {
          year: ["year"],
          datetime: props.useSecond ? ["year", "month", "date", "hour", "minute", "second"] : ["year", "month", "date", "hour", "minute"],
          date: ["year", "month", "date"],
          time: props.useSecond ? ["hour", "minute", "second"] : ["hour", "minute"],
          "year-month": ["year", "month"]
        };
        return items.map((item, index) => {
          return props.formatter(typeMaps[props.type][index], item.value);
        }).join("");
      }
      switch (props.type) {
        case "year":
          return items[0].label;
        case "date":
          return `${items[0].label}-${items[1].label}-${items[2].label}`;
        case "year-month":
          return `${items[0].label}-${items[1].label}`;
        case "time":
          return props.useSecond ? `${items[0].label}:${items[1].label}:${items[2].label}` : `${items[0].label}:${items[1].label}`;
        case "datetime":
          return props.useSecond ? `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}:${items[5].label}` : `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`;
      }
    }
    function setLoading(loading) {
      isLoading.value = loading;
    }
    function handleClear() {
      emit("clear");
      emit("update:modelValue", "");
      setShowValue(false, true);
    }
    __expose({
      open,
      close,
      setLoading
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.$slots.default
      }, !_ctx.$slots.default ? common_vendor.e({
        b: _ctx.$slots.label
      }, _ctx.$slots.label ? {} : {}, {
        c: region.value
      }, region.value ? common_vendor.e({
        d: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(showValue.value)
      }, common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(showValue.value) ? {
        e: common_vendor.t(showValue.value[0] ? showValue.value[0] : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        f: common_vendor.n(showValue.value[0] ? "" : "wd-datetime-picker__placeholder"),
        g: common_vendor.t(common_vendor.unref(translate)("to")),
        h: common_vendor.t(showValue.value[1] ? showValue.value[1] : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        i: common_vendor.n(showValue.value[1] ? "" : "wd-datetime-picker__placeholder")
      } : {
        j: common_vendor.t(_ctx.placeholder || common_vendor.unref(translate)("placeholder"))
      }) : {
        k: common_vendor.t(showValue.value ? showValue.value : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        l: common_vendor.n(showValue.value ? "" : "wd-datetime-picker__placeholder")
      }, {
        m: showArrow.value
      }, showArrow.value ? {
        n: common_vendor.p({
          ["custom-class"]: "wd-datetime-picker__arrow",
          name: "arrow-right"
        })
      } : showClear.value ? {
        p: common_vendor.p({
          ["custom-class"]: "wd-datetime-picker__clear",
          name: "error-fill"
        }),
        q: common_vendor.o(handleClear)
      } : {}, {
        o: showClear.value,
        r: common_vendor.o(showPopup),
        s: common_vendor.p({
          title: _ctx.label,
          required: _ctx.required,
          size: _ctx.size,
          ["title-width"]: _ctx.labelWidth,
          prop: _ctx.prop,
          rules: _ctx.rules,
          clickable: !_ctx.disabled && !_ctx.readonly,
          ["value-align"]: _ctx.alignRight ? "right" : "left",
          ["custom-class"]: cellClass.value,
          ["custom-style"]: _ctx.customStyle,
          ["custom-title-class"]: _ctx.customLabelClass,
          ["custom-value-class"]: _ctx.customValueClass,
          ellipsis: _ctx.ellipsis,
          ["use-title-slot"]: !!_ctx.$slots.label,
          ["marker-side"]: _ctx.markerSide
        })
      }) : {
        t: common_vendor.o(showPopup)
      }, {
        v: common_vendor.t(_ctx.cancelButtonText || common_vendor.unref(translate)("cancel")),
        w: common_vendor.o(onCancel),
        x: _ctx.title
      }, _ctx.title ? {
        y: common_vendor.t(_ctx.title)
      } : {}, {
        z: common_vendor.t(_ctx.confirmButtonText || common_vendor.unref(translate)("confirm")),
        A: common_vendor.n(`wd-datetime-picker__action ${_ctx.loading || isLoading.value ? "is-loading" : ""}`),
        B: common_vendor.o(onConfirm),
        C: common_vendor.o(noop),
        D: region.value
      }, region.value ? {
        E: common_vendor.t(common_vendor.unref(translate)("start")),
        F: common_vendor.t(showTabLabel.value[0]),
        G: common_vendor.n(`wd-datetime-picker__region ${showStart.value ? "is-active" : ""} `),
        H: common_vendor.o(tabChange),
        I: common_vendor.t(common_vendor.unref(translate)("end")),
        J: common_vendor.t(showTabLabel.value[1]),
        K: common_vendor.n(`wd-datetime-picker__region ${showStart.value ? "" : "is-active"}`),
        L: common_vendor.o(tabChange)
      } : {}, {
        M: common_vendor.sr(datetimePickerView, "2a8ca3bd-4,2a8ca3bd-3", {
          "k": "datetimePickerView"
        }),
        N: common_vendor.o(onChangeStart),
        O: common_vendor.o(onPickStart),
        P: common_vendor.o(onPickEnd),
        Q: common_vendor.o(($event) => innerValue.value = $event),
        R: common_vendor.p({
          ["custom-class"]: _ctx.customViewClass,
          type: _ctx.type,
          loading: _ctx.loading || isLoading.value,
          ["loading-color"]: _ctx.loadingColor,
          ["columns-height"]: _ctx.columnsHeight,
          ["value-key"]: _ctx.valueKey,
          ["label-key"]: _ctx.labelKey,
          formatter: _ctx.formatter,
          filter: _ctx.filter,
          ["column-formatter"]: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(_ctx.modelValue) ? startColumnFormatter : void 0,
          ["max-hour"]: _ctx.maxHour,
          ["min-hour"]: _ctx.minHour,
          ["max-date"]: _ctx.maxDate,
          ["min-date"]: _ctx.minDate,
          ["max-minute"]: _ctx.maxMinute,
          ["min-minute"]: _ctx.minMinute,
          ["use-second"]: _ctx.useSecond,
          ["min-second"]: _ctx.minSecond,
          ["max-second"]: _ctx.maxSecond,
          ["immediate-change"]: _ctx.immediateChange,
          modelValue: innerValue.value
        }),
        S: common_vendor.n(showStart.value ? "wd-datetime-picker__show" : "wd-datetime-picker__hidden"),
        T: common_vendor.sr(datetimePickerView1, "2a8ca3bd-5,2a8ca3bd-3", {
          "k": "datetimePickerView1"
        }),
        U: common_vendor.o(onChangeEnd),
        V: common_vendor.o(onPickStart),
        W: common_vendor.o(onPickEnd),
        X: common_vendor.o(($event) => endInnerValue.value = $event),
        Y: common_vendor.p({
          ["custom-class"]: _ctx.customViewClass,
          type: _ctx.type,
          loading: _ctx.loading || isLoading.value,
          ["loading-color"]: _ctx.loadingColor,
          ["columns-height"]: _ctx.columnsHeight,
          ["value-key"]: _ctx.valueKey,
          ["label-key"]: _ctx.labelKey,
          formatter: _ctx.formatter,
          filter: _ctx.filter,
          ["column-formatter"]: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(_ctx.modelValue) ? endColumnFormatter : void 0,
          ["max-hour"]: _ctx.maxHour,
          ["min-hour"]: _ctx.minHour,
          ["max-date"]: _ctx.maxDate,
          ["min-date"]: _ctx.minDate,
          ["max-minute"]: _ctx.maxMinute,
          ["min-minute"]: _ctx.minMinute,
          ["use-second"]: _ctx.useSecond,
          ["min-second"]: _ctx.minSecond,
          ["max-second"]: _ctx.maxSecond,
          ["immediate-change"]: _ctx.immediateChange,
          modelValue: endInnerValue.value
        }),
        Z: common_vendor.n(showStart.value ? "wd-datetime-picker__hidden" : "wd-datetime-picker__show"),
        aa: common_vendor.o(onCancel),
        ab: common_vendor.o(($event) => popupShow.value = $event),
        ac: common_vendor.p({
          position: "bottom",
          ["hide-when-close"]: false,
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["z-index"]: _ctx.zIndex,
          ["root-portal"]: _ctx.rootPortal,
          ["custom-class"]: "wd-datetime-picker__popup",
          modelValue: popupShow.value
        }),
        ad: common_vendor.n(`wd-datetime-picker ${_ctx.customClass}`),
        ae: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a8ca3bd"]]);
wx.createComponent(Component);
