"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goToServiceManagement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/serviceObjectList/index"
      });
    };
    const goToUserAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/userprotocol"
      });
    };
    const goToPrivacyPolicy = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/privateprotocol"
      });
    };
    const goToBasicSettings = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/setting"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_assets._imports_1,
        c: common_vendor.o(goToServiceManagement),
        d: common_assets._imports_2,
        e: common_assets._imports_0$2,
        f: common_vendor.o(goToUserAgreement),
        g: common_assets._imports_4,
        h: common_assets._imports_0$2,
        i: common_vendor.o(goToPrivacyPolicy),
        j: common_assets._imports_5,
        k: common_assets._imports_0$2,
        l: common_vendor.o(goToBasicSettings)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
