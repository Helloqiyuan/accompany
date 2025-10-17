"use strict";
function getPickerValue(value, type, useSecond = false) {
  const values = [];
  const date = new Date(value);
  if (type === "time") {
    const pair = String(value).split(":");
    values.push(parseInt(pair[0]), parseInt(pair[1]));
    if (useSecond && pair[2]) {
      values.push(parseInt(pair[2]));
    }
  } else {
    values.push(date.getFullYear(), date.getMonth() + 1);
    if (type === "date") {
      values.push(date.getDate());
    } else if (type === "datetime") {
      values.push(date.getDate(), date.getHours(), date.getMinutes());
      if (useSecond) {
        values.push(date.getSeconds());
      }
    }
  }
  return values;
}
exports.getPickerValue = getPickerValue;
