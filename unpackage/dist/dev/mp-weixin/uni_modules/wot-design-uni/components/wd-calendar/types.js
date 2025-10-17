"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const calendarProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([Number, Array, null]),
  /**
   * 日期类型，可选值：date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange
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
  /**
   * 选中日期所使用的当日内具体时刻
   */
  defaultTime: {
    type: [String, Array]
  },
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
   */
  timeFilter: Function,
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
   */
  hideSecond: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 选择器左侧文案
   */
  label: String,
  /**
   * 设置左侧标题宽度
   */
  labelWidth: uni_modules_wotDesignUni_components_common_props.makeStringProp("33%"),
  /**
   * 禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 只读
   */
  readonly: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 选择器占位符
   */
  placeholder: String,
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 选择器的值靠右展示
   */
  alignRight: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否为错误状态，错误状态时右侧内容为红色
   */
  error: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否必填
   */
  required: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置选择器大小，可选值：large
   */
  size: String,
  /**
   * 是否垂直居中
   */
  center: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 弹框层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(15),
  /**
   * 是否显示确定按钮
   */
  showConfirm: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 确定按钮文字
   */
  confirmText: String,
  /**
   * 自定义展示文案的格式化函数，返回一个字符串
   */
  displayFormat: Function,
  /**
   * 自定义范围选择类型的面板内部回显，返回一个字符串
   */
  innerDisplayFormat: Function,
  /**
   * 是否超出隐藏
   */
  ellipsis: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否显示类型切换功能
   */
  showTypeSwitch: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 快捷选项，为对象数组，其中对象的 text 必传
   */
  shortcuts: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 快捷操作点击回调
   */
  onShortcutsClick: Function,
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 确定前校验函数，接收 { value, resolve } 参数，通过 resolve 继续执行，resolve 接收 1 个 boolean 参数
   */
  beforeConfirm: Function,
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  customViewClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * label 外部自定义样式
   */
  customLabelClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * value 外部自定义样式
   */
  customValueClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否使用内置单元格
   * 默认为 true，使用内置单元格
   */
  withCell: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 必填标记位置，可选值：before、after
   */
  markerSide: uni_modules_wotDesignUni_components_common_props.makeStringProp("before"),
  /**
   * 显示清空按钮
   */
  clearable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.calendarProps = calendarProps;
