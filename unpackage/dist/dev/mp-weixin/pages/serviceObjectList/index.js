"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const serviceObjects = common_vendor.ref([
      {
        name: "张三",
        relationship: "本人",
        gender: "男",
        age: 22,
        idNumber: "1231412414141"
      },
      {
        name: "李四",
        relationship: "家属",
        gender: "女",
        age: 45,
        idNumber: "9876543210987"
      },
      {
        name: "王五",
        relationship: "朋友",
        gender: "男",
        age: 30,
        idNumber: "4567891234567"
      }
    ]);
    const editServiceObject = (index) => {
      console.log("编辑服务对象:", serviceObjects.value[index]);
      common_vendor.index.showToast({
        title: "编辑功能待实现",
        icon: "none"
      });
    };
    const deleteServiceObject = (index) => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: `确定要删除 ${serviceObjects.value[index].name} 吗？`,
        success: (res) => {
          if (res.confirm) {
            serviceObjects.value.splice(index, 1);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    };
    const addServiceObject = () => {
      console.log("新增服务对象");
      common_vendor.index.navigateTo({
        url: "/pages/serviceObjectList/newServiceObject"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(serviceObjects.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.relationship),
            c: common_vendor.t(item.gender),
            d: common_vendor.t(item.age),
            e: common_vendor.t(item.idNumber),
            f: common_vendor.o(($event) => editServiceObject(index), index),
            g: common_vendor.o(($event) => deleteServiceObject(index), index),
            h: index
          };
        }),
        b: common_vendor.o(addServiceObject)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28d7162c"]]);
wx.createPage(MiniProgramPage);
