"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const calendarViewProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([Number, Array, null]),
  /**
   * 日期类型
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("date"),
  /**
   * 最小日期，为 13 位时间戳
   */
  minDate: uni_modules_wotDesignUni_components_common_props.makeNumberProp(new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() - 6, (/* @__PURE__ */ new Date()).getDate()).getTime()),
  /**
   * 最大日期，为 13 位时间戳
   */
  maxDate: uni_modules_wotDesignUni_components_common_props.makeNumberProp(new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 6, (/* @__PURE__ */ new Date()).getDate(), 23, 59, 59).getTime()),
  /**
   * 周起始天
   */
  firstDayOfWeek: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 日期格式化函数
   */
  formatter: Function,
  /**
   * type 为范围选择时有效，最大日期范围
   */
  maxRange: Number,
  /**
   * type 为范围选择时有效，选择超出最大日期范围时的错误提示文案
   */
  rangePrompt: String,
  /**
   * type 为范围选择时有效，是否允许选择同一天
   */
  allowSameDay: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  // 是否展示面板标题，自动计算当前滚动的日期月份
  showPanelTitle: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 选中日期所使用的当日内具体时刻
   */
  defaultTime: {
    type: [String, Array],
    default: "00:00:00"
  },
  /**
   * 可滚动面板的高度
   */
  panelHeight: uni_modules_wotDesignUni_components_common_props.makeNumberProp(378),
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
   */
  timeFilter: Function,
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
   */
  hideSecond: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.calendarViewProps = calendarViewProps;
