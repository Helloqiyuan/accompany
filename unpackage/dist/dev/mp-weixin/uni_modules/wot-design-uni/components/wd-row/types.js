"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const ROW_KEY = Symbol("wd-row");
const rowProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 列元素之间的间距（单位为px）
   */
  gutter: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0)
};
exports.ROW_KEY = ROW_KEY;
exports.rowProps = rowProps;
