"use strict";
require("../../../../common/vendor.js");
function uuid() {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
function s4() {
  return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
}
function addUnit(num) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`;
}
function isObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object";
}
function getType(target) {
  const typeStr = Object.prototype.toString.call(target);
  const match = typeStr.match(/\[object (\w+)\]/);
  const type = match && match.length ? match[1].toLowerCase() : "";
  return type;
}
const isDef = (value) => value !== void 0 && value !== null;
function kebabCase(word) {
  const newWord = word.replace(/[A-Z]/g, function(match) {
    return "-" + match;
  }).toLowerCase();
  return newWord;
}
function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function isString(value) {
  return getType(value) === "string";
}
function objToStyle(styles) {
  if (isArray(styles)) {
    const result = styles.filter(function(item) {
      return item != null && item !== "";
    }).map(function(item) {
      return objToStyle(item);
    }).join(";");
    return result ? result.endsWith(";") ? result : result + ";" : "";
  }
  if (isString(styles)) {
    return styles ? styles.endsWith(";") ? styles : styles + ";" : "";
  }
  if (isObj(styles)) {
    const result = Object.keys(styles).filter(function(key) {
      return styles[key] != null && styles[key] !== "";
    }).map(function(key) {
      return [kebabCase(key), styles[key]].join(":");
    }).join(";");
    return result ? result.endsWith(";") ? result : result + ";" : "";
  }
  return "";
}
function isVideoUrl(url) {
  const videoRegex = /\.(ogm|webm|ogv|asx|m4v|mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)(?=$|[?#])/i;
  return videoRegex.test(url);
}
function isImageUrl(url) {
  const imageRegex = /\.(xbm|tif|pjp|apng|svgz|jpeg|jpg|heif|ico|tiff|heic|pjpeg|avif|gif|png|svg|webp|jfif|bmp|dpg|image)(?=$|[?#])/i;
  return imageRegex.test(url);
}
exports.addUnit = addUnit;
exports.isDef = isDef;
exports.isImageUrl = isImageUrl;
exports.isObj = isObj;
exports.isVideoUrl = isVideoUrl;
exports.objToStyle = objToStyle;
exports.uuid = uuid;
