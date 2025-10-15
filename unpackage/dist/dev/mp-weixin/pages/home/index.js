"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_text2 = common_vendor.resolveComponent("wd-text");
  (_easycom_wd_swiper2 + _easycom_wd_text2)();
}
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_text = () => "../../uni_modules/wot-design-uni/components/wd-text/wd-text.js";
if (!Math) {
  (_easycom_wd_swiper + _easycom_wd_text)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const current = common_vendor.ref(0);
    common_vendor.ref([]);
    const swiperList = common_vendor.ref([
      "/static/swiper/1.svg",
      "/static/swiper/2.svg",
      "/static/swiper/3.png"
    ]);
    const g = () => {
      console.log("点击了按钮");
    };
    function handleClick(e) {
      console.log(e);
    }
    function onChange(e) {
    }
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClick),
        b: common_vendor.o(onChange),
        c: common_vendor.o(($event) => current.value = $event),
        d: common_vendor.p({
          list: swiperList.value,
          ["value-key"]: "path",
          current: current.value
        }),
        e: common_vendor.o(g),
        f: common_vendor.o(g)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
