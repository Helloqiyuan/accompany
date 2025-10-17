"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const formItemProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  prop: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  rules: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  required: Boolean,
  center: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  label: String,
  labelWidth: uni_modules_wotDesignUni_components_common_props.makeStringProp("100px"),
  isLink: Boolean
};
exports.formItemProps = formItemProps;
