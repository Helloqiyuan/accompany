"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const TABBAR_KEY = Symbol("wd-tabbar");
const tabbarProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选中标签的索引值或者名称
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeNumericProp(0),
  /**
   * 是否固定在底部
   */
  fixed: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否显示顶部边框
   */
  bordered: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否设置底部安全距离（iPhone X 类型的机型）
   */
  safeAreaInsetBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 标签栏的形状。可选项：default/round
   */
  shape: uni_modules_wotDesignUni_components_common_props.makeStringProp("default"),
  /**
   * 激活标签的颜色
   */
  activeColor: String,
  /**
   * 未激活标签的颜色
   */
  inactiveColor: String,
  /**
   * 固定在底部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 自定义组件的层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(99)
};
exports.TABBAR_KEY = TABBAR_KEY;
exports.tabbarProps = tabbarProps;
