"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const stepsProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 当前激活的步骤进度，以数字表示。
   * 类型: number
   * 默认值: 0
   */
  active: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 是否为垂直方向的步骤条。
   * 类型: boolean
   * 默认值: false
   */
  vertical: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否为点状步骤条样式。
   * 类型: boolean
   * 默认值: false
   */
  dot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 步骤条之间的间距，默认为自动计算。
   * 如果指定，则使用此值作为间距。
   * 类型: string
   * 默认值: 自动计算
   */
  space: String,
  /**
   * 是否将步骤条水平居中显示，只对横向步骤条有效。
   * 类型: boolean
   * 默认值: false
   */
  alignCenter: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
const STEPS_KEY = Symbol("wd-steps");
exports.STEPS_KEY = STEPS_KEY;
exports.stepsProps = stepsProps;
