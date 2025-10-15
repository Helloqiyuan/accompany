"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_wd_text2 = common_vendor.resolveComponent("wd-text");
  _easycom_wd_text2();
}
const _easycom_wd_text = () => "../../uni_modules/wot-design-uni/components/wd-text/wd-text.js";
if (!Math) {
  _easycom_wd_text();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      text: "芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
