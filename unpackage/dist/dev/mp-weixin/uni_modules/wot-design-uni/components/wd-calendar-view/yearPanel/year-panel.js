"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdCalendarView_utils = require("../utils.js");
const uni_modules_wotDesignUni_components_common_util = require("../../common/util.js");
const uni_modules_wotDesignUni_components_wdCalendarView_yearPanel_types = require("./types.js");
if (!Math) {
  Year();
}
const Year = () => "../year/year.js";
const __default__ = {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "year-panel",
  props: uni_modules_wotDesignUni_components_wdCalendarView_yearPanel_types.yearPanelProps,
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const scrollTop = common_vendor.ref(0);
    const scrollIndex = common_vendor.ref(0);
    const scrollHeight = common_vendor.computed(() => {
      const scrollHeight2 = props.panelHeight + (props.showPanelTitle ? 26 : 16);
      return scrollHeight2;
    });
    const years = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_wdCalendarView_utils.getYears(props.minDate, props.maxDate).map((year, index) => {
        return {
          date: year,
          height: index === 0 ? 200 : 245
        };
      });
    });
    const title = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_wdCalendarView_utils.formatYearTitle(years.value[scrollIndex.value].date);
    });
    common_vendor.onMounted(() => {
      scrollIntoView();
    });
    async function scrollIntoView() {
      await uni_modules_wotDesignUni_components_common_util.pause();
      let activeDate = null;
      if (uni_modules_wotDesignUni_components_common_util.isArray(props.value)) {
        activeDate = props.value[0];
      } else if (uni_modules_wotDesignUni_components_common_util.isNumber(props.value)) {
        activeDate = props.value;
      }
      if (!activeDate) {
        activeDate = Date.now();
      }
      let top = 0;
      for (let index = 0; index < years.value.length; index++) {
        if (uni_modules_wotDesignUni_components_wdCalendarView_utils.compareYear(years.value[index].date, activeDate) === 0) {
          break;
        }
        top += years.value[index] ? Number(years.value[index].height) : 0;
      }
      scrollTop.value = 0;
      if (top > 0) {
        await uni_modules_wotDesignUni_components_common_util.pause();
        scrollTop.value = top + 45;
      }
    }
    const yearScroll = (event) => {
      if (years.value.length <= 1) {
        return;
      }
      const scrollTop2 = Math.max(0, event.detail.scrollTop);
      doSetSubtitle(scrollTop2);
    };
    function doSetSubtitle(scrollTop2) {
      let height = 0;
      for (let index = 0; index < years.value.length; index++) {
        height = height + years.value[index].height;
        if (scrollTop2 < height) {
          scrollIndex.value = index;
          return;
        }
      }
    }
    function handleDateChange({ value }) {
      emit("change", {
        value
      });
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
        c: common_vendor.f(years.value, (item, index, i0) => {
          return {
            a: common_vendor.o(handleDateChange, index),
            b: "7f04dad8-0-" + i0,
            c: common_vendor.p({
              type: _ctx.type,
              date: item.date,
              value: _ctx.value,
              ["min-date"]: _ctx.minDate,
              ["max-date"]: _ctx.maxDate,
              ["max-range"]: _ctx.maxRange,
              formatter: _ctx.formatter,
              ["range-prompt"]: _ctx.rangePrompt,
              ["allow-same-day"]: _ctx.allowSameDay,
              ["default-time"]: _ctx.defaultTime,
              showTitle: index !== 0
            }),
            d: index,
            e: `year${index}`
          };
        }),
        d: common_vendor.s(`height: ${scrollHeight.value}px`),
        e: common_vendor.o(yearScroll),
        f: scrollTop.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f04dad8"]]);
wx.createComponent(Component);
