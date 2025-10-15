"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const tabbarItemProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 标签页的标题
   */
  title: String,
  /**
   * 唯一标识符
   */
  name: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 图标
   */
  icon: String,
  /**
   * 徽标显示值
   */
  value: {
    type: [Number, String, null],
    default: null
  },
  /**
   * 是否点状徽标
   */
  isDot: {
    type: Boolean,
    default: void 0
  },
  /**
   * 徽标最大值
   */
  max: Number,
  /**
   * 徽标属性，透传给 Badge 组件
   */
  badgeProps: Object
};
exports.tabbarItemProps = tabbarItemProps;
