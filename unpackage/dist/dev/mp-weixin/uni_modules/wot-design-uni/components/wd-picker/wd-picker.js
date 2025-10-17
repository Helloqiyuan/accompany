"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdPickerView_types = require("../wd-picker-view/types.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdPicker_types = require("./types.js");
if (!Math) {
  (wdIcon + wdCell + wdPickerView + wdPopup)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdPickerView = () => "../wd-picker-view/wd-picker-view.js";
const wdCell = () => "../wd-cell/wd-cell.js";
const __default__ = {
  name: "wd-picker",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdPicker_types.pickerProps,
  emits: ["confirm", "open", "cancel", "clear", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("picker");
    const props = __props;
    const emit = __emit;
    const pickerViewWd = common_vendor.ref(null);
    const innerLoading = common_vendor.ref(false);
    const popupShow = common_vendor.ref(false);
    const showValue = common_vendor.ref("");
    const pickerValue = common_vendor.ref("");
    const displayColumns = common_vendor.ref([]);
    const resetColumns = common_vendor.ref([]);
    const isPicking = common_vendor.ref(false);
    const hasConfirmed = common_vendor.ref(false);
    const isLoading = common_vendor.computed(() => {
      return props.loading || innerLoading.value;
    });
    common_vendor.watch(
      () => props.displayFormat,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of displayFormat must be Function");
        }
        if (pickerViewWd.value && pickerViewWd.value.getSelectedIndex().length !== 0) {
          handleShowValueUpdate(props.modelValue);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        pickerValue.value = newValue;
        handleShowValueUpdate(newValue);
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.columns,
      (newValue) => {
        displayColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(newValue);
        resetColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(newValue);
        if (newValue.length === 0) {
          pickerValue.value = uni_modules_wotDesignUni_components_common_util.isArray(props.modelValue) ? [] : "";
          showValue.value = "";
        } else {
          handleShowValueUpdate(props.modelValue);
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.columnChange,
      (newValue) => {
        if (newValue && !uni_modules_wotDesignUni_components_common_util.isFunction(newValue)) {
          console.error("The type of columnChange must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const showClear = common_vendor.computed(() => {
      return props.clearable && !props.disabled && !props.readonly && showValue.value.length > 0;
    });
    const showArrow = common_vendor.computed(() => {
      return !props.disabled && !props.readonly && !showClear.value;
    });
    const cellClass = common_vendor.computed(() => {
      const classes = ["wd-picker__cell"];
      if (props.disabled)
        classes.push("is-disabled");
      if (props.readonly)
        classes.push("is-readonly");
      if (props.error)
        classes.push("is-error");
      if (!showValue.value)
        classes.push("wd-picker__cell--placeholder");
      return classes.join(" ");
    });
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      handleShowValueUpdate(props.modelValue);
    });
    common_vendor.onBeforeMount(() => {
      displayColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(props.columns);
      resetColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(props.columns);
    });
    function handleShowValueUpdate(value) {
      if (uni_modules_wotDesignUni_components_common_util.isArray(value) && value.length > 0 || uni_modules_wotDesignUni_components_common_util.isDef(value) && !uni_modules_wotDesignUni_components_common_util.isArray(value) && value !== "") {
        if (pickerViewWd.value) {
          common_vendor.nextTick$1(() => {
            setShowValue(pickerViewWd.value.getSelects());
          });
        } else {
          setShowValue(getSelects(value));
        }
      } else {
        showValue.value = "";
      }
    }
    function getSelects(value) {
      const formatColumns = uni_modules_wotDesignUni_components_wdPickerView_types.formatArray(props.columns, props.valueKey, props.labelKey);
      if (props.columns.length === 0)
        return;
      if (value === "" || !uni_modules_wotDesignUni_components_common_util.isDef(value) || uni_modules_wotDesignUni_components_common_util.isArray(value) && value.length === 0) {
        return;
      }
      const valueType = uni_modules_wotDesignUni_components_common_util.getType(value);
      const type = ["string", "number", "boolean", "array"];
      if (type.indexOf(valueType) === -1)
        return [];
      value = uni_modules_wotDesignUni_components_common_util.isArray(value) ? value : [value];
      value = value.slice(0, formatColumns.length);
      if (value.length === 0) {
        value = formatColumns.map(() => 0);
      }
      let selected = [];
      value.forEach((target, col) => {
        let row = formatColumns[col].findIndex((row2) => {
          return row2[props.valueKey].toString() === target.toString();
        });
        row = row === -1 ? 0 : row;
        selected.push(row);
      });
      const selects = selected.map((row, col) => formatColumns[col][row]);
      if (selects.length === 1) {
        return selects[0];
      }
      return selects;
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
      popupShow.value = true;
      pickerValue.value = props.modelValue;
      displayColumns.value = resetColumns.value;
    }
    function onCancel() {
      popupShow.value = false;
      emit("cancel");
      let timmer = setTimeout(() => {
        clearTimeout(timmer);
        uni_modules_wotDesignUni_components_common_util.isDef(pickerViewWd.value) && pickerViewWd.value.resetColumns(resetColumns.value);
      }, 300);
    }
    function onConfirm() {
      if (isLoading.value)
        return;
      if (isPicking.value) {
        hasConfirmed.value = true;
        return;
      }
      const { beforeConfirm } = props;
      if (beforeConfirm && uni_modules_wotDesignUni_components_common_util.isFunction(beforeConfirm)) {
        beforeConfirm(
          pickerValue.value,
          (isPass) => {
            isPass && handleConfirm();
          },
          proxy.$.exposed
        );
      } else {
        handleConfirm();
      }
    }
    function handleConfirm() {
      if (isLoading.value || props.disabled) {
        popupShow.value = false;
        return;
      }
      const selects = pickerViewWd.value.getSelects();
      const values = pickerViewWd.value.getValues();
      const columns = pickerViewWd.value.getColumnsData();
      popupShow.value = false;
      resetColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(columns);
      emit("update:modelValue", values);
      setShowValue(selects);
      emit("confirm", {
        value: values,
        selectedItems: selects
      });
    }
    function pickerViewChange({ value }) {
      pickerValue.value = value;
    }
    function setShowValue(items) {
      if (uni_modules_wotDesignUni_components_common_util.isArray(items) && !items.length || !items)
        return;
      const { valueKey, labelKey } = props;
      showValue.value = (props.displayFormat || uni_modules_wotDesignUni_components_common_util.defaultDisplayFormat)(items, { valueKey, labelKey });
    }
    function noop() {
    }
    function onPickStart() {
      isPicking.value = true;
    }
    function onPickEnd() {
      isPicking.value = false;
      if (hasConfirmed.value) {
        hasConfirmed.value = false;
        onConfirm();
      }
    }
    function setLoading(loading) {
      innerLoading.value = loading;
    }
    function handleClear() {
      const clearValue = uni_modules_wotDesignUni_components_common_util.isArray(pickerValue.value) ? [] : "";
      emit("update:modelValue", clearValue);
      emit("clear");
    }
    __expose({
      close,
      open,
      setLoading
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.$slots.default
      }, !_ctx.$slots.default ? common_vendor.e({
        b: _ctx.$slots.label
      }, _ctx.$slots.label ? {} : {}, {
        c: showArrow.value
      }, showArrow.value ? {
        d: common_vendor.p({
          ["custom-class"]: "wd-picker__arrow",
          name: "arrow-right"
        })
      } : showClear.value ? {
        f: common_vendor.p({
          ["custom-class"]: "wd-picker__clear",
          name: "error-fill"
        }),
        g: common_vendor.o(handleClear)
      } : {}, {
        e: showClear.value,
        h: common_vendor.o(showPopup),
        i: common_vendor.p({
          title: _ctx.label,
          value: showValue.value ? showValue.value : _ctx.placeholder || common_vendor.unref(translate)("placeholder"),
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
        j: common_vendor.o(showPopup)
      }, {
        k: common_vendor.t(_ctx.cancelButtonText || common_vendor.unref(translate)("cancel")),
        l: common_vendor.o(onCancel),
        m: _ctx.title
      }, _ctx.title ? {
        n: common_vendor.t(_ctx.title)
      } : {}, {
        o: common_vendor.t(_ctx.confirmButtonText || common_vendor.unref(translate)("done")),
        p: common_vendor.n(`wd-picker__action ${isLoading.value ? "is-loading" : ""}`),
        q: common_vendor.o(onConfirm),
        r: common_vendor.o(noop),
        s: common_vendor.sr(pickerViewWd, "e228acd5-4,e228acd5-3", {
          "k": "pickerViewWd"
        }),
        t: common_vendor.o(pickerViewChange),
        v: common_vendor.o(onPickStart),
        w: common_vendor.o(onPickEnd),
        x: common_vendor.o(($event) => pickerValue.value = $event),
        y: common_vendor.p({
          ["custom-class"]: _ctx.customViewClass,
          columns: displayColumns.value,
          loading: isLoading.value,
          ["loading-color"]: _ctx.loadingColor,
          ["columns-height"]: _ctx.columnsHeight,
          ["value-key"]: _ctx.valueKey,
          ["label-key"]: _ctx.labelKey,
          ["immediate-change"]: _ctx.immediateChange,
          ["column-change"]: _ctx.columnChange,
          modelValue: pickerValue.value
        }),
        z: common_vendor.o(onCancel),
        A: common_vendor.o(($event) => popupShow.value = $event),
        B: common_vendor.p({
          position: "bottom",
          ["hide-when-close"]: false,
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["z-index"]: _ctx.zIndex,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["root-portal"]: _ctx.rootPortal,
          ["custom-class"]: "wd-picker__popup",
          modelValue: popupShow.value
        }),
        C: common_vendor.n(`wd-picker ${_ctx.disabled ? "is-disabled" : ""} ${_ctx.size ? "is-" + _ctx.size : ""} ${_ctx.alignRight ? "is-align-right" : ""} ${_ctx.error ? "is-error" : ""} ${_ctx.customClass}`),
        D: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e228acd5"]]);
wx.createComponent(Component);
