"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentTab = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      { name: "全部订单", type: "all" },
      { name: "待支付", type: "pending_payment" },
      { name: "待服务", type: "pending_service" },
      { name: "已完成", type: "completed" },
      { name: "已取消", type: "cancelled" }
    ]);
    const orders = common_vendor.ref([
      {
        id: 1,
        serviceName: "半天院内陪诊",
        hospital: "九江学院附属医院",
        appointmentTime: "10-04 08:00",
        patientName: "张三",
        status: "待支付",
        statusClass: "status-pending",
        iconSrc: "/static/func1/1.svg",
        // 使用SVG图片
        countdown: "00:29:59",
        type: "pending_payment"
      },
      {
        id: 2,
        serviceName: "半天院内陪诊",
        hospital: "九江附属医院",
        appointmentTime: "10-13 08:00",
        patientName: "张三",
        status: "待服务",
        statusClass: "status-pending",
        iconSrc: "/static/func1/1.svg",
        // 使用SVG图片
        countdown: "",
        type: "pending_service"
      },
      {
        id: 3,
        serviceName: "半天院内陪诊",
        hospital: "九江学院附属医院",
        appointmentTime: "10-13 08:00",
        patientName: "张三",
        status: "已完成",
        statusClass: "status-completed",
        iconSrc: "/static/func1/1.svg",
        // 使用SVG图片
        countdown: "",
        type: "completed"
      },
      {
        id: 4,
        serviceName: "全天院内陪诊",
        hospital: "九江学院附属医院",
        appointmentTime: "10-13 08:00",
        patientName: "张三",
        status: "已取消",
        statusClass: "status-cancelled",
        iconSrc: "/static/func1/2.svg",
        // 使用不同的SVG图片
        countdown: "",
        type: "cancelled"
      }
    ]);
    const filteredOrders = common_vendor.computed(() => {
      const currentTabType = tabs.value[currentTab.value].type;
      if (currentTabType === "all") {
        return orders.value;
      }
      return orders.value.filter((order) => order.type === currentTabType);
    });
    const switchTab = (index) => {
      currentTab.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs.value, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab.name),
            b: index,
            c: currentTab.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: common_vendor.f(filteredOrders.value, (order, index, i0) => {
          return common_vendor.e({
            a: order.iconSrc,
            b: common_vendor.t(order.serviceName),
            c: common_vendor.t(order.hospital),
            d: common_vendor.t(order.appointmentTime),
            e: common_vendor.t(order.patientName),
            f: common_vendor.t(order.status),
            g: common_vendor.n(order.statusClass),
            h: order.countdown
          }, order.countdown ? {
            i: common_vendor.t(order.countdown)
          } : {}, {
            j: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17a44f9d"]]);
wx.createPage(MiniProgramPage);
