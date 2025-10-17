"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_dayjs_index = require("../../dayjs/index.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("calendar-view");
const weeks = common_vendor.computed(() => {
  return [
    translate("weeks.sun"),
    translate("weeks.mon"),
    translate("weeks.tue"),
    translate("weeks.wed"),
    translate("weeks.thu"),
    translate("weeks.fri"),
    translate("weeks.sat")
  ];
});
function compareDate(date1, date2) {
  const dateValue1 = new Date(date1);
  const dateValue2 = new Date(date2 || "");
  const year1 = dateValue1.getFullYear();
  const year2 = dateValue2.getFullYear();
  const month1 = dateValue1.getMonth();
  const month2 = dateValue2.getMonth();
  const day1 = dateValue1.getDate();
  const day2 = dateValue2.getDate();
  if (year1 === year2) {
    if (month1 === month2) {
      return day1 === day2 ? 0 : day1 > day2 ? 1 : -1;
    }
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function isRange(type) {
  return type.indexOf("range") > -1;
}
function compareMonth(date1, date2) {
  const dateValue1 = new Date(date1);
  const dateValue2 = new Date(date2);
  const year1 = dateValue1.getFullYear();
  const year2 = dateValue2.getFullYear();
  const month1 = dateValue1.getMonth();
  const month2 = dateValue2.getMonth();
  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareYear(date1, date2) {
  const dateValue1 = new Date(date1);
  const dateValue2 = new Date(date2);
  const year1 = dateValue1.getFullYear();
  const year2 = dateValue2.getFullYear();
  return year1 === year2 ? 0 : year1 > year2 ? 1 : -1;
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
function formatMonthTitle(date) {
  return uni_modules_wotDesignUni_dayjs_index.dayjs(date).format(translate("monthTitle"));
}
function getWeekLabel(index) {
  if (index >= 7) {
    index = index % 7;
  }
  return weeks.value[index];
}
function formatYearTitle(date) {
  return uni_modules_wotDesignUni_dayjs_index.dayjs(date).format(translate("yearTitle"));
}
function getMonths(minDate, maxDate) {
  const months = [];
  const month = new Date(minDate);
  month.setDate(1);
  while (compareMonth(month.getTime(), maxDate) < 1) {
    months.push(month.getTime());
    month.setMonth(month.getMonth() + 1);
  }
  return months;
}
function getYears(minDate, maxDate) {
  const years = [];
  const year = new Date(minDate);
  year.setMonth(0);
  year.setDate(1);
  while (compareYear(year.getTime(), maxDate) < 1) {
    years.push(year.getTime());
    year.setFullYear(year.getFullYear() + 1);
  }
  return years;
}
function getWeekRange(date, firstDayOfWeek) {
  if (firstDayOfWeek >= 7) {
    firstDayOfWeek = firstDayOfWeek % 7;
  }
  const dateValue = new Date(date);
  dateValue.setHours(0, 0, 0, 0);
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth();
  const day = dateValue.getDate();
  const week = dateValue.getDay();
  const weekStart = new Date(year, month, day - (7 + week - firstDayOfWeek) % 7);
  const weekEnd = new Date(year, month, day + 6 - (7 + week - firstDayOfWeek) % 7);
  return [weekStart.getTime(), weekEnd.getTime()];
}
function getDayOffset(date1, date2) {
  return (date1 - date2) / (24 * 60 * 60 * 1e3) + 1;
}
function getDayByOffset(date, offset) {
  const dateValue = new Date(date);
  dateValue.setDate(dateValue.getDate() + offset);
  return dateValue.getTime();
}
const getPrevDay = (date) => getDayByOffset(date, -1);
const getNextDay = (date) => getDayByOffset(date, 1);
function getMonthOffset(date1, date2) {
  const dateValue1 = new Date(date1);
  const dateValue2 = new Date(date2);
  const year1 = dateValue1.getFullYear();
  const year2 = dateValue2.getFullYear();
  let month1 = dateValue1.getMonth();
  const month2 = dateValue2.getMonth();
  month1 = (year1 - year2) * 12 + month1;
  return month1 - month2 + 1;
}
function getMonthByOffset(date, offset) {
  const dateValue = new Date(date);
  dateValue.setMonth(dateValue.getMonth() + offset);
  return dateValue.getTime();
}
function getDefaultTime(defaultTime) {
  if (uni_modules_wotDesignUni_components_common_util.isArray(defaultTime)) {
    const startTime = (defaultTime[0] || "00:00:00").split(":").map((item) => {
      return parseInt(item);
    });
    const endTime = (defaultTime[1] || "00:00:00").split(":").map((item) => {
      return parseInt(item);
    });
    return [startTime, endTime];
  } else {
    const time = (defaultTime || "00:00:00").split(":").map((item) => {
      return parseInt(item);
    });
    return [time, time];
  }
}
function getDateByDefaultTime(date, defaultTime) {
  const dateValue = new Date(date);
  dateValue.setHours(defaultTime[0]);
  dateValue.setMinutes(defaultTime[1]);
  dateValue.setSeconds(defaultTime[2]);
  return dateValue.getTime();
}
const times = (n, iteratee) => {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
};
const getTime = (date) => {
  const dateValue = new Date(date);
  return [dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()];
};
function getTimeData({
  date,
  minDate,
  maxDate,
  isHideSecond,
  filter
}) {
  const compareMin = compareDate(date, minDate);
  const compareMax = compareDate(date, maxDate);
  let minHour = 0;
  let maxHour = 23;
  let minMinute = 0;
  let maxMinute = 59;
  let minSecond = 0;
  let maxSecond = 59;
  if (compareMin === 0) {
    const minTime = getTime(minDate);
    const currentTime = getTime(date);
    minHour = minTime[0];
    if (minTime[0] === currentTime[0]) {
      minMinute = minTime[1];
      if (minTime[1] === currentTime[1]) {
        minSecond = minTime[2];
      }
    }
  }
  if (compareMax === 0) {
    const maxTime = getTime(maxDate);
    const currentTime = getTime(date);
    maxHour = maxTime[0];
    if (maxTime[0] === currentTime[0]) {
      maxMinute = maxTime[1];
      if (maxTime[1] === currentTime[1]) {
        maxSecond = maxTime[2];
      }
    }
  }
  let columns = [];
  let hours = times(24, (index) => {
    return {
      label: translate("hour", uni_modules_wotDesignUni_components_common_util.padZero(index)),
      value: index,
      disabled: index < minHour || index > maxHour
    };
  });
  let minutes = times(60, (index) => {
    return {
      label: translate("minute", uni_modules_wotDesignUni_components_common_util.padZero(index)),
      value: index,
      disabled: index < minMinute || index > maxMinute
    };
  });
  let seconds = [];
  if (filter && uni_modules_wotDesignUni_components_common_util.isFunction(filter)) {
    hours = filter({
      type: "hour",
      values: hours
    });
    minutes = filter({
      type: "minute",
      values: minutes
    });
  }
  if (!isHideSecond) {
    seconds = times(60, (index) => {
      return {
        label: translate("second", uni_modules_wotDesignUni_components_common_util.padZero(index)),
        value: index,
        disabled: index < minSecond || index > maxSecond
      };
    });
    if (filter && uni_modules_wotDesignUni_components_common_util.isFunction(filter)) {
      seconds = filter({
        type: "second",
        values: seconds
      });
    }
  }
  columns = isHideSecond ? [hours, minutes] : [hours, minutes, seconds];
  return columns;
}
function getWeekNumber(date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week.getTime()) / 864e5 - 3 + (week.getDay() + 6) % 7) / 7);
}
function getItemClass(monthType, value, type) {
  const classList = ["is-" + monthType];
  if (type.indexOf("range") > -1 && uni_modules_wotDesignUni_components_common_util.isArray(value)) {
    if (!value || !value[1]) {
      classList.push("is-without-end");
    }
  }
  return classList.join(" ");
}
exports.compareDate = compareDate;
exports.compareMonth = compareMonth;
exports.compareYear = compareYear;
exports.formatMonthTitle = formatMonthTitle;
exports.formatYearTitle = formatYearTitle;
exports.getDateByDefaultTime = getDateByDefaultTime;
exports.getDayByOffset = getDayByOffset;
exports.getDayOffset = getDayOffset;
exports.getDefaultTime = getDefaultTime;
exports.getItemClass = getItemClass;
exports.getMonthByOffset = getMonthByOffset;
exports.getMonthEndDay = getMonthEndDay;
exports.getMonthOffset = getMonthOffset;
exports.getMonths = getMonths;
exports.getNextDay = getNextDay;
exports.getPrevDay = getPrevDay;
exports.getTimeData = getTimeData;
exports.getWeekLabel = getWeekLabel;
exports.getWeekNumber = getWeekNumber;
exports.getWeekRange = getWeekRange;
exports.getYears = getYears;
exports.isRange = isRange;
