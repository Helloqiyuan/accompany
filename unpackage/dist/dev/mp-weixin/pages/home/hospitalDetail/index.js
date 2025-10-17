"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  _easycom_wd_img2();
}
const _easycom_wd_img = () => "../../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
if (!Math) {
  _easycom_wd_img();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const hospitalInfo = common_vendor.ref({
      id: 1,
      name: "九江学院附属医院",
      level: "三甲",
      type: "综合医院",
      img: "/static/list/1.svg",
      address: "九江市浔阳东路57号/庐峰路17号"
    });
    const serviceList = common_vendor.ref([
      {
        id: 1,
        title: "半天院内陪诊",
        description: "半天就医陪同服务,院内手续代办代跑服务",
        price: "50元/次",
        icon: "/static/list/2.svg",
        iconText: "12",
        iconClass: "icon-orange"
      },
      {
        id: 2,
        title: "全天院内陪诊",
        description: "全程就医陪同服务,院内手续代办代跑服务",
        price: "100元/次",
        icon: "/static/list/1.svg",
        iconText: "24",
        iconClass: "icon-blue"
      }
    ]);
    const handleNavigate = () => {
      console.log("导航到医院:", hospitalInfo.value.name);
      common_vendor.index.showToast({
        title: "正在打开地图导航",
        icon: "none"
      });
    };
    const handleBook = (service) => {
      console.log("预约服务:", service.title);
      common_vendor.index.navigateTo({
        url: "/pages/serviceOrder/index"
      });
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      console.log("路由参数:", options);
      console.log("医院ID:", options.hospitalId);
      console.log("医院名称:", decodeURIComponent(options.name || ""));
      if (options.hospitalId && options.name) {
        hospitalInfo.value.id = parseInt(options.hospitalId);
        hospitalInfo.value.name = decodeURIComponent(options.name);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(hospitalInfo.value.name),
        b: hospitalInfo.value.img,
        c: common_vendor.t(hospitalInfo.value.level),
        d: common_vendor.t(hospitalInfo.value.type),
        e: common_vendor.p({
          width: "20",
          height: "20",
          src: "/static/hospitalDetail/location.png"
        }),
        f: common_vendor.t(hospitalInfo.value.address),
        g: common_vendor.o(handleNavigate),
        h: common_vendor.f(serviceList.value, (service, index, i0) => {
          return {
            a: common_vendor.t(service.iconText),
            b: common_vendor.n(service.iconClass),
            c: common_vendor.t(service.title),
            d: common_vendor.t(service.description),
            e: common_vendor.t(service.price),
            f: common_vendor.o(($event) => handleBook(service), service.id),
            g: service.id
          };
        }),
        i: common_assets._imports_0
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e20bf5ee"]]);
wx.createPage(MiniProgramPage);
