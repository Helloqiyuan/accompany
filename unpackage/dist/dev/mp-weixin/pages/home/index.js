"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_text2 = common_vendor.resolveComponent("wd-text");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  (_easycom_wd_swiper2 + _easycom_wd_text2 + _easycom_wd_button2 + _easycom_wd_img2)();
}
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_text = () => "../../uni_modules/wot-design-uni/components/wd-text/wd-text.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
if (!Math) {
  (_easycom_wd_swiper + _easycom_wd_text + _easycom_wd_button + _easycom_wd_img)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const switchtofunc1 = () => {
      common_vendor.index.navigateTo({
        url: "/pages/home/func1/index"
      });
    };
    const bannerList = common_vendor.ref([
      { path: "/static/swiper/1.svg" },
      { path: "/static/swiper/2.svg" },
      { path: "/static/swiper/3.png" }
    ]);
    const hospitals = common_vendor.ref([
      {
        name: "九江学院附属医院666",
        level: "三甲",
        type: "综合医院",
        img: "/static/list/1.svg",
        desc: '九江学院附属医院始建于1877年，前身是英国圣教会"济生医院"，集医疗、教学、科研、预防、康复为一体的三级甲等综合医院。'
      },
      {
        name: "九江学院附属医院888",
        level: "三甲",
        type: "综合医院",
        img: "/static/list/2.svg",
        desc: '九江学院附属医院始建于1877年，前身是英国圣教会"济生医院"，集医疗、教学、科研、预防、康复为一体的三级甲等综合医院。'
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          autoplay: "1000",
          ["indicator-dots"]: "true",
          circular: "true",
          list: bannerList.value,
          ["value-key"]: "path"
        }),
        b: common_vendor.p({
          text: "就医陪诊",
          color: "white",
          size: "28rpx",
          bold: true
        }),
        c: common_vendor.p({
          text: "专业陪诊 全程无忧",
          color: "white",
          size: "20rpx"
        }),
        d: common_vendor.p({
          size: "small",
          ["custom-class"]: "btn-white"
        }),
        e: common_vendor.p({
          width: "50",
          height: "30",
          src: "/static/func/right/1.svg"
        }),
        f: common_vendor.o(switchtofunc1),
        g: common_vendor.p({
          text: "上门康复",
          color: "white",
          size: "28rpx",
          bold: true
        }),
        h: common_vendor.p({
          text: "专业康复 居家无忧",
          color: "white",
          size: "20rpx"
        }),
        i: common_vendor.p({
          size: "small",
          ["custom-class"]: "btn-white"
        }),
        j: common_vendor.p({
          width: "50",
          height: "30",
          src: "/static/func/right/1.svg"
        }),
        k: common_vendor.f(hospitals.value, (item, idx, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.level),
            d: common_vendor.t(item.type),
            e: common_vendor.t(item.desc),
            f: idx
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
