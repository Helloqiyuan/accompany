"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../../common/util.js");
const uni_modules_wotDesignUni_components_wdCalendarView_utils = require("../utils.js");
const uni_modules_wotDesignUni_components_wdCalendarView_monthPanel_types = require("./types.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../../composables/useTranslate.js");
if (!Math) {
  (Month + wdPickerView)();
}
const wdPickerView = () => "../../wd-picker-view/wd-picker-view.js";
const Month = () => "../month/month.js";
const __default__ = {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "month-panel",
  props: uni_modules_wotDesignUni_components_wdCalendarView_monthPanel_types.monthPanelProps,
  emits: ["change", "pickstart", "pickend"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("calendar-view");
    const scrollTop = common_vendor.ref(0);
    const scrollIndex = common_vendor.ref(0);
    const timeValue = common_vendor.ref([]);
    const timeType = common_vendor.ref("");
    const innerValue = common_vendor.ref("");
    const handleChange = uni_modules_wotDesignUni_components_common_util.debounce((value) => {
      emit("change", {
        value
      });
    }, 50);
    const timeData = common_vendor.computed(() => {
      let timeColumns = [];
      if (props.type === "datetime" && uni_modules_wotDesignUni_components_common_util.isNumber(props.value)) {
        const date = new Date(props.value);
        date.setHours(timeValue.value[0]);
        date.setMinutes(timeValue.value[1]);
        date.setSeconds(props.hideSecond ? 0 : timeValue.value[2]);
        const dateTime = date.getTime();
        timeColumns = getTime(dateTime) || [];
      } else if (uni_modules_wotDesignUni_components_common_util.isArray(props.value) && props.type === "datetimerange") {
        const [start, end] = props.value;
        const dataValue = timeType.value === "start" ? start : end;
        const date = new Date(dataValue || "");
        date.setHours(timeValue.value[0]);
        date.setMinutes(timeValue.value[1]);
        date.setSeconds(props.hideSecond ? 0 : timeValue.value[2]);
        const dateTime = date.getTime();
        const finalValue = [start, end];
        if (timeType.value === "start") {
          finalValue[0] = dateTime;
        } else {
          finalValue[1] = dateTime;
        }
        timeColumns = getTime(finalValue, timeType.value) || [];
      }
      return timeColumns;
    });
    const title = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_wdCalendarView_utils.formatMonthTitle(months.value[scrollIndex.value].date);
    });
    const weekLabel = common_vendor.computed(() => {
      return (index) => {
        return uni_modules_wotDesignUni_components_wdCalendarView_utils.getWeekLabel(index - 1);
      };
    });
    const scrollHeight = common_vendor.computed(() => {
      const scrollHeight2 = timeType.value ? props.panelHeight - 125 : props.panelHeight;
      return scrollHeight2;
    });
    const months = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_wdCalendarView_utils.getMonths(props.minDate, props.maxDate).map((month, index) => {
        const offset = (7 + new Date(month).getDay() - props.firstDayOfWeek) % 7;
        const totalDay = uni_modules_wotDesignUni_components_wdCalendarView_utils.getMonthEndDay(new Date(month).getFullYear(), new Date(month).getMonth() + 1);
        const rows = Math.ceil((offset + totalDay) / 7);
        return {
          height: rows * 64 + (rows - 1) * 4 + (index === 0 ? 0 : 45),
          // 每行64px高度,除最后一行外每行加4px margin,加上标题45px
          date: month
        };
      });
    });
    common_vendor.watch(
      () => props.type,
      (val) => {
        if (val === "datetime" && props.value || val === "datetimerange" && uni_modules_wotDesignUni_components_common_util.isArray(props.value) && props.value && props.value.length > 0 && props.value[0]) {
          setTime(props.value, "start");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.value,
      (val) => {
        if (uni_modules_wotDesignUni_components_common_util.isEqual(val, innerValue.value))
          return;
        if (props.type === "datetime" && val || props.type === "datetimerange" && val && uni_modules_wotDesignUni_components_common_util.isArray(val) && val.length > 0 && val[0]) {
          setTime(val, "start");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.onMounted(() => {
      scrollIntoView();
    });
    async function scrollIntoView() {
      await uni_modules_wotDesignUni_components_common_util.pause();
      let activeDate = 0;
      if (uni_modules_wotDesignUni_components_common_util.isArray(props.value)) {
        const sortedValue = [...props.value].sort((a, b) => (a || 0) - (b || 0));
        activeDate = sortedValue[0];
      } else if (uni_modules_wotDesignUni_components_common_util.isNumber(props.value)) {
        activeDate = props.value;
      }
      if (!activeDate) {
        activeDate = Date.now();
      }
      let top = 0;
      let activeMonthIndex = -1;
      for (let index = 0; index < months.value.length; index++) {
        if (uni_modules_wotDesignUni_components_wdCalendarView_utils.compareMonth(months.value[index].date, activeDate) === 0) {
          activeMonthIndex = index;
          const date = new Date(activeDate);
          const day = date.getDate();
          const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          const offset = (7 + firstDay.getDay() - props.firstDayOfWeek) % 7;
          const row = Math.floor((offset + day - 1) / 7);
          top += row * 64 + row * 4;
          break;
        }
        top += months.value[index] ? Number(months.value[index].height) : 0;
      }
      scrollTop.value = 0;
      if (top > 0) {
        await uni_modules_wotDesignUni_components_common_util.pause();
        scrollTop.value = top + (activeMonthIndex > 0 ? 45 : 0);
      }
    }
    function getTime(value, type) {
      if (props.type === "datetime") {
        return uni_modules_wotDesignUni_components_wdCalendarView_utils.getTimeData({
          date: value,
          minDate: props.minDate,
          maxDate: props.maxDate,
          filter: props.timeFilter,
          isHideSecond: props.hideSecond
        });
      } else {
        if (type === "start" && uni_modules_wotDesignUni_components_common_util.isArray(props.value)) {
          return uni_modules_wotDesignUni_components_wdCalendarView_utils.getTimeData({
            date: value[0],
            minDate: props.minDate,
            maxDate: props.value[1] ? props.value[1] : props.maxDate,
            filter: props.timeFilter,
            isHideSecond: props.hideSecond
          });
        } else {
          return uni_modules_wotDesignUni_components_wdCalendarView_utils.getTimeData({
            date: value[1],
            minDate: value[0],
            maxDate: props.maxDate,
            filter: props.timeFilter,
            isHideSecond: props.hideSecond
          });
        }
      }
    }
    function getTimeValue(date, type) {
      let dateValue = /* @__PURE__ */ new Date();
      if (props.type === "datetime") {
        dateValue = new Date(date);
      } else if (uni_modules_wotDesignUni_components_common_util.isArray(date)) {
        if (type === "start") {
          dateValue = new Date(date[0] || "");
        } else {
          dateValue = new Date(date[1] || "");
        }
      }
      const hour = dateValue.getHours();
      const minute = dateValue.getMinutes();
      const second = dateValue.getSeconds();
      return props.hideSecond ? [hour, minute] : [hour, minute, second];
    }
    function setTime(value, type) {
      if (uni_modules_wotDesignUni_components_common_util.isArray(value) && value[0] && value[1] && type === "start" && timeType.value === "start") {
        type = "end";
      }
      timeType.value = type || "";
      timeValue.value = getTimeValue(value, type || "");
    }
    function handleDateChange({ value, type }) {
      if (!uni_modules_wotDesignUni_components_common_util.isEqual(value, props.value)) {
        innerValue.value = value;
        handleChange(value);
      }
      if (props.type.indexOf("time") > -1) {
        setTime(value, type);
      }
    }
    function handleTimeChange({ value }) {
      if (!props.value) {
        return;
      }
      if (props.type === "datetime" && uni_modules_wotDesignUni_components_common_util.isNumber(props.value)) {
        const date = new Date(props.value);
        date.setHours(value[0]);
        date.setMinutes(value[1]);
        date.setSeconds(props.hideSecond ? 0 : value[2]);
        const dateTime = date.getTime();
        handleChange(dateTime);
      } else if (uni_modules_wotDesignUni_components_common_util.isArray(props.value) && props.type === "datetimerange") {
        const [start, end] = props.value;
        const dataValue = timeType.value === "start" ? start : end;
        const date = new Date(dataValue || "");
        date.setHours(value[0]);
        date.setMinutes(value[1]);
        date.setSeconds(props.hideSecond ? 0 : value[2]);
        const dateTime = date.getTime();
        if (dateTime === dataValue)
          return;
        const finalValue = [start, end];
        if (timeType.value === "start") {
          finalValue[0] = dateTime;
        } else {
          finalValue[1] = dateTime;
        }
        innerValue.value = finalValue;
        handleChange(finalValue);
      }
    }
    function handlePickStart() {
      emit("pickstart");
    }
    function handlePickEnd() {
      emit("pickend");
    }
    const monthScroll = (event) => {
      if (months.value.length <= 1) {
        return;
      }
      const scrollTop2 = Math.max(0, event.detail.scrollTop);
      doSetSubtitle(scrollTop2);
    };
    function doSetSubtitle(scrollTop2) {
      let height = 0;
      for (let index = 0; index < months.value.length; index++) {
        height = height + months.value[index].height;
        if (scrollTop2 < height) {
          scrollIndex.value = index;
          return;
        }
      }
    }
    __expose({
      scrollIntoView
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showPanelTitle
      }, _ctx.showPanelTitle ? {
        b: common_vendor.t(title.value)
      } : {}, {
        c: common_vendor.f(7, (item, k0, i0) => {
          return {
            a: common_vendor.t(weekLabel.value(item + _ctx.firstDayOfWeek)),
            b: item
          };
        }),
        d: common_vendor.f(months.value, (item, index, i0) => {
          return {
            a: common_vendor.o(handleDateChange, index),
            b: "aca78768-0-" + i0,
            c: common_vendor.p({
              type: _ctx.type,
              date: item.date,
              value: _ctx.value,
              ["min-date"]: _ctx.minDate,
              ["max-date"]: _ctx.maxDate,
              ["first-day-of-week"]: _ctx.firstDayOfWeek,
              formatter: _ctx.formatter,
              ["max-range"]: _ctx.maxRange,
              ["range-prompt"]: _ctx.rangePrompt,
              ["allow-same-day"]: _ctx.allowSameDay,
              ["default-time"]: _ctx.defaultTime,
              showTitle: index !== 0
            }),
            d: index,
            e: `month${index}`
          };
        }),
        e: common_vendor.n(`wd-month-panel__container ${!!timeType.value ? "wd-month-panel__container--time" : ""}`),
        f: common_vendor.s(`height: ${scrollHeight.value}px`),
        g: common_vendor.o(monthScroll),
        h: scrollTop.value,
        i: timeType.value
      }, timeType.value ? common_vendor.e({
        j: _ctx.type === "datetimerange"
      }, _ctx.type === "datetimerange" ? {
        k: common_vendor.t(timeType.value === "start" ? common_vendor.unref(translate)("startTime") : common_vendor.unref(translate)("endTime"))
      } : {}, {
        l: timeData.value.length
      }, timeData.value.length ? {
        m: common_vendor.o(handleTimeChange),
        n: common_vendor.o(handlePickStart),
        o: common_vendor.o(handlePickEnd),
        p: common_vendor.o(($event) => timeValue.value = $event),
        q: common_vendor.p({
          columns: timeData.value,
          ["columns-height"]: 125,
          ["immediate-change"]: _ctx.immediateChange,
          modelValue: timeValue.value
        })
      } : {}) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aca78768"]]);
wx.createComponent(Component);
