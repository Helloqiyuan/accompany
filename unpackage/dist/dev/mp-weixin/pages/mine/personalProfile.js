"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "personalProfile",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      avatar: "",
      // 头像
      nickname: "",
      // 昵称
      gender: "",
      // 性别
      phone: "",
      // 手机号
      birthday: ""
      // 生日
    });
    common_vendor.onMounted(() => {
      loadUserInfo();
      common_vendor.index.$on("refreshUserInfo", () => {
        loadUserInfo();
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("refreshUserInfo");
    });
    const loadUserInfo = () => {
      const storedUserInfo = common_vendor.index.getStorageSync("userInfo");
      if (storedUserInfo) {
        Object.assign(userInfo, storedUserInfo);
      }
    };
    const saveUserInfo = () => {
      common_vendor.index.setStorageSync("userInfo", userInfo);
    };
    const changeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          userInfo.avatar = tempFilePath;
          saveUserInfo();
          common_vendor.index.showToast({
            title: "头像更新成功",
            icon: "success",
            duration: 1500
          });
        },
        fail: (err) => {
          console.error("选择头像失败:", err);
          common_vendor.index.showToast({
            title: "选择头像失败",
            icon: "none",
            duration: 1500
          });
        }
      });
    };
    const editNickname = () => {
      common_vendor.index.showModal({
        title: "编辑昵称",
        editable: true,
        placeholderText: "请输入昵称",
        content: userInfo.nickname || "",
        success: (res) => {
          if (res.confirm && res.content) {
            userInfo.nickname = res.content.trim();
            saveUserInfo();
            common_vendor.index.showToast({
              title: "昵称更新成功",
              icon: "success",
              duration: 1500
            });
          }
        }
      });
    };
    const selectGender = () => {
      common_vendor.index.showActionSheet({
        itemList: ["男", "女"],
        success: (res) => {
          const genderOptions = ["男", "女"];
          userInfo.gender = genderOptions[res.tapIndex];
          saveUserInfo();
          common_vendor.index.showToast({
            title: "性别更新成功",
            icon: "success",
            duration: 1500
          });
        }
      });
    };
    const editPhone = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/updatePhoneNumber"
      });
    };
    const selectBirthday = () => {
      common_vendor.index.showModal({
        title: "选择生日",
        editable: true,
        placeholderText: "请输入生日，格式：1991-10-10",
        content: userInfo.birthday || "",
        success: (res) => {
          if (res.confirm && res.content) {
            const birthday = res.content.trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
              userInfo.birthday = birthday;
              saveUserInfo();
              common_vendor.index.showToast({
                title: "生日更新成功",
                icon: "success",
                duration: 1500
              });
            } else {
              common_vendor.index.showToast({
                title: "请输入正确的日期格式",
                icon: "none",
                duration: 1500
              });
            }
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: userInfo.avatar || "/static/mine/avatar.svg",
        b: common_assets._imports_0$2,
        c: common_vendor.o(changeAvatar),
        d: common_vendor.t(userInfo.nickname || "未设置"),
        e: common_assets._imports_0$2,
        f: common_vendor.o(editNickname),
        g: common_vendor.t(userInfo.gender || "未设置"),
        h: common_assets._imports_0$2,
        i: common_vendor.o(selectGender),
        j: common_vendor.t(userInfo.phone || "未设置"),
        k: common_assets._imports_0$2,
        l: common_vendor.o(editPhone),
        m: common_vendor.t(userInfo.birthday || "未设置"),
        n: common_assets._imports_0$2,
        o: common_vendor.o(selectBirthday)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e10a130f"]]);
wx.createPage(MiniProgramPage);
