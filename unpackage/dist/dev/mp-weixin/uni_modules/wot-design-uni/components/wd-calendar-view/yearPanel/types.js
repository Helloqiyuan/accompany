"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../../common/props.js");
const yearPanelProps = {
  type: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  value: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([Number, Array]),
  minDate: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  maxDate: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number),
  formatter: Function,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  showPanelTitle: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  defaultTime: {
    type: [Array]
  },
  panelHeight: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Number)
};
exports.yearPanelProps = yearPanelProps;
