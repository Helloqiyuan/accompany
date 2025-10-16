"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const hospitalInfo = common_vendor.ref({
      id: 1,
      name: "九江学院附属医院666",
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
      common_vendor.index.showToast({
        title: `预约${service.title}`,
        icon: "none"
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
        b: common_vendor.t(hospitalInfo.value.level),
        c: common_vendor.t(hospitalInfo.value.type),
        d: common_vendor.t(hospitalInfo.value.address),
        e: common_vendor.o(handleNavigate),
        f: hospitalInfo.value.img,
        g: common_vendor.f(serviceList.value, (service, index, i0) => {
          return {
            a: service.icon,
            b: common_vendor.t(service.iconText),
            c: common_vendor.n(service.iconClass),
            d: common_vendor.t(service.title),
            e: common_vendor.t(service.description),
            f: common_vendor.t(service.price),
            g: common_vendor.o(($event) => handleBook(service), service.id),
            h: service.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e20bf5ee"]]);
wx.createPage(MiniProgramPage);
