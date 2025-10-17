"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../../common/props.js");
const monthPanelProps = {
  type: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  value: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([Number, Array, null]),
  minDate: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  maxDate: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  firstDayOfWeek: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  formatter: Function,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  showPanelTitle: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  defaultTime: {
    type: [Array]
  },
  panelHeight: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  // type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
  timeFilter: Function,
  hideSecond: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.monthPanelProps = monthPanelProps;
