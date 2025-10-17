"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../../common/props.js");
const yearProps = {
  type: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  date: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  value: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([Number, Array]),
  minDate: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  maxDate: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  // 日期格式化函数
  formatter: Function,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  defaultTime: {
    type: [Array]
  },
  showTitle: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
exports.yearProps = yearProps;
