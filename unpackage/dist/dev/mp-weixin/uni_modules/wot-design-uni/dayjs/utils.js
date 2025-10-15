"use strict";
const uni_modules_wotDesignUni_dayjs_constant = require("./constant.js");
var padStart = function padStart2(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length)
    return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};
var padZoneStr = function padZoneStr2(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
};
var monthDiff = function monthDiff2(a, b) {
  if (a.date() < b.date())
    return -monthDiff2(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, uni_modules_wotDesignUni_dayjs_constant.M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), uni_modules_wotDesignUni_dayjs_constant.M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};
var absFloor = function absFloor2(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};
var prettyUnit = function prettyUnit2(u) {
  var special = {
    M: uni_modules_wotDesignUni_dayjs_constant.M,
    y: uni_modules_wotDesignUni_dayjs_constant.Y,
    w: uni_modules_wotDesignUni_dayjs_constant.W,
    d: uni_modules_wotDesignUni_dayjs_constant.D,
    D: uni_modules_wotDesignUni_dayjs_constant.DATE,
    h: uni_modules_wotDesignUni_dayjs_constant.H,
    m: uni_modules_wotDesignUni_dayjs_constant.MIN,
    s: uni_modules_wotDesignUni_dayjs_constant.S,
    ms: uni_modules_wotDesignUni_dayjs_constant.MS,
    Q: uni_modules_wotDesignUni_dayjs_constant.Q
  };
  return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
};
var isUndefined = function isUndefined2(s) {
  return s === void 0;
};
const U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};
exports.U = U;
