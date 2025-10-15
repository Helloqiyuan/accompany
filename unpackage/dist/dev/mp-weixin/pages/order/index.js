"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  (_easycom_wd_swiper2 + _easycom_wd_button2)();
}
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
if (!Math) {
  (_easycom_wd_swiper + _easycom_wd_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const buttomin = () => {
      console.log("点击了按钮");
      common_vendor.index.switchTab({
        url: "/pages/home/index",
        success: function(res) {
          console.log("跳转成功", res);
        },
        fail: function(err) {
          console.error("跳转失败", err);
        }
      });
    };
    common_vendor.ref("Hello World");
    const current = common_vendor.ref(0);
    const list = common_vendor.ref([
      "https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/c4a5924c-efcc-4e06-80a3-71eb1d0440e2.png",
      "https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/f7d5f39e-3f93-4a26-a6e9-2e225ece9ee7.png",
      "https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/fa5da578-c4a1-48c2-af49-d8bccfd7451f.png",
      "https://java-helloqiyuan.oss-cn-guangzhou.aliyuncs.com/2025/07/d60f8656-f5e4-457f-81b3-a3dc99ac12a8.png"
    ]);
    function handleClick(e) {
      console.log(e);
    }
    function onChange(e) {
      console.log(e);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClick),
        b: common_vendor.o(onChange),
        c: common_vendor.o(($event) => current.value = $event),
        d: common_vendor.p({
          list: list.value,
          current: current.value
        }),
        e: _ctx.indicatorDots,
        f: _ctx.autoplay,
        g: _ctx.interval,
        h: _ctx.duration,
        i: common_vendor.o(buttomin)
      };
    };
  }
};
wx.createPage(_sfc_main);
