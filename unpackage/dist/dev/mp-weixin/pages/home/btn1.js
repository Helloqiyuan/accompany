"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "btn1",
  setup(__props) {
    const serviceList = common_vendor.ref([
      {
        id: 1,
        title: "半天院内陪诊",
        description: "半天就医陪同服务，院内手续代办代跑服务",
        icon: "/static/func1/1.svg"
      },
      {
        id: 2,
        title: "全天院内陪诊",
        description: "全程就医陪同服务，院内手续代办代跑服务",
        icon: "/static/func1/2.svg"
      }
    ]);
    const handleBook = (service) => {
      console.log("预约服务:", service.title);
      common_vendor.index.showToast({
        title: `预约${service.title}`,
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(serviceList.value, (service, index, i0) => {
          return {
            a: service.icon,
            b: common_vendor.t(service.title),
            c: common_vendor.t(service.description),
            d: common_vendor.o(($event) => handleBook(service), service.id),
            e: service.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09624a32"]]);
wx.createPage(MiniProgramPage);
