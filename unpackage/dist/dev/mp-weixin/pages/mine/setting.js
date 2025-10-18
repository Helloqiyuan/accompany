"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const goToPersonalSettings = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/personalProfile"
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("userToken");
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.reLaunch({
              url: "/pages/home/index"
            });
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success",
              duration: 1500
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(goToPersonalSettings),
        c: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0bb48146"]]);
wx.createPage(MiniProgramPage);
