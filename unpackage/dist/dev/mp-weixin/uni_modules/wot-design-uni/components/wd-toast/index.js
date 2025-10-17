"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const toastDefaultOptionKey = "__TOAST_OPTION__";
const defaultOptions = {
  duration: 2e3,
  show: false
};
const None = Symbol("None");
function useToast(selector = "") {
  const toastOptionKey = getToastOptionKey(selector);
  const toastOption = common_vendor.inject(toastOptionKey, common_vendor.ref(None));
  if (toastOption.value === None) {
    toastOption.value = defaultOptions;
    common_vendor.provide(toastOptionKey, toastOption);
  }
  let timer = null;
  const createMethod = (toastOptions) => {
    return (options) => {
      return show(uni_modules_wotDesignUni_components_common_util.deepMerge(toastOptions, typeof options === "string" ? { msg: options } : options));
    };
  };
  const show = (option) => {
    const options = uni_modules_wotDesignUni_components_common_util.deepMerge(defaultOptions, typeof option === "string" ? { msg: option } : option);
    toastOption.value = uni_modules_wotDesignUni_components_common_util.deepMerge(options, {
      show: true
    });
    timer && clearTimeout(timer);
    if (toastOption.value.duration && toastOption.value.duration > 0) {
      timer = setTimeout(() => {
        timer && clearTimeout(timer);
        close();
      }, options.duration);
    }
  };
  const loading = createMethod({
    iconName: "loading",
    duration: 0,
    cover: true
  });
  const success = createMethod({
    iconName: "success",
    duration: 1500
  });
  const error = createMethod({ iconName: "error" });
  const warning = createMethod({ iconName: "warning" });
  const info = createMethod({ iconName: "info" });
  const close = () => {
    toastOption.value = { show: false };
  };
  return {
    show,
    loading,
    success,
    error,
    warning,
    info,
    close
  };
}
const getToastOptionKey = (selector) => {
  return selector ? `${toastDefaultOptionKey}${selector}` : toastDefaultOptionKey;
};
const toastIcon = {
  success() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#34D19D" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#34D19D"/><path d="M19 24l4 4 8-8" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
  },
  warning() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#F0883A" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#F0883A"/><rect x="22.5" y="14" width="3" height="12" fill="#FFF" rx="1.5"/><circle cx="24" cy="30" r="2" fill="#FFF"/></svg>';
  },
  info() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#909CB7" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#909CB7"/><circle cx="24" cy="18" r="2" fill="#FFF"/><rect x="22.5" y="22" width="3" height="12" fill="#FFF" rx="1.5"/></svg>';
  },
  error() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#fa4350" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#fa4350"/><path d="M18 18l12 12M30 18L18 30" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/></svg>';
  }
};
exports.defaultOptions = defaultOptions;
exports.getToastOptionKey = getToastOptionKey;
exports.toastIcon = toastIcon;
exports.useToast = useToast;
