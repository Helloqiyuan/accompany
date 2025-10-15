"use strict";
const uni_modules_wotDesignUni_dayjs_constant = require("./constant.js");
const uni_modules_wotDesignUni_dayjs_locale_en = require("./locale/en.js");
const uni_modules_wotDesignUni_dayjs_utils = require("./utils.js");
var L = "en";
var Ls = {};
Ls[L] = uni_modules_wotDesignUni_dayjs_locale_en.en;
var IS_DAYJS = "$isDayjsObject";
var isDayjs = function isDayjs2(d) {
  return d instanceof Dayjs || !!(d && d[IS_DAYJS]);
};
var parseLocale = function parseLocale2(preset, object, isLocal) {
  var l;
  if (!preset)
    return L;
  if (typeof preset === "string") {
    var presetLower = preset.toLowerCase();
    if (Ls[presetLower]) {
      l = presetLower;
    }
    if (object) {
      Ls[presetLower] = object;
      l = presetLower;
    }
    var presetSplit = preset.split("-");
    if (!l && presetSplit.length > 1) {
      return parseLocale2(presetSplit[0]);
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }
  if (!isLocal && l)
    L = l;
  return l || !isLocal && L;
};
var dayjs = function dayjs2(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }
  var cfg = typeof c === "object" ? c : {};
  cfg.date = date;
  cfg.args = arguments;
  return new Dayjs(cfg);
};
var wrapper = function wrapper2(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset
    // todo: refactor; do not use this.$offset in you code
  });
};
var Utils = uni_modules_wotDesignUni_dayjs_utils.U;
Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;
var parseDate = function parseDate2(cfg) {
  var date = cfg.date, utc = cfg.utc;
  if (date === null)
    return /* @__PURE__ */ new Date(NaN);
  if (Utils.u(date))
    return /* @__PURE__ */ new Date();
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    var d = date.match(uni_modules_wotDesignUni_dayjs_constant.REGEX_PARSE);
    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || "0").substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  return new Date(date);
};
var Dayjs = /* @__PURE__ */ function() {
  function Dayjs2(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg);
    this.$x = this.$x || cfg.x || {};
    this[IS_DAYJS] = true;
  }
  var _proto = Dayjs2.prototype;
  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.init();
  };
  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  };
  _proto.$utils = function $utils() {
    return Utils;
  };
  _proto.isValid = function isValid() {
    return !(this.$d.toString() === uni_modules_wotDesignUni_dayjs_constant.INVALID_DATE_STRING);
  };
  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };
  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };
  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };
  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input))
      return this[get];
    return this.set(set, input);
  };
  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1e3);
  };
  _proto.valueOf = function valueOf() {
    return this.$d.getTime();
  };
  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);
    var instanceFactory = function instanceFactory2(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(uni_modules_wotDesignUni_dayjs_constant.D);
    };
    var instanceFactorySet = function instanceFactorySet2(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply(
        // eslint-disable-line prefer-spread
        _this.toDate("s"),
        (isStartOf ? argumentStart : argumentEnd).slice(slice)
      ), _this);
    };
    var $W = this.$W, $M = this.$M, $D = this.$D;
    var utcPad = "set" + (this.$u ? "UTC" : "");
    switch (unit) {
      case uni_modules_wotDesignUni_dayjs_constant.Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      case uni_modules_wotDesignUni_dayjs_constant.M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      case uni_modules_wotDesignUni_dayjs_constant.W: {
        var weekStart = this.$locale().weekStart || 0;
        var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case uni_modules_wotDesignUni_dayjs_constant.D:
      case uni_modules_wotDesignUni_dayjs_constant.DATE:
        return instanceFactorySet(utcPad + "Hours", 0);
      case uni_modules_wotDesignUni_dayjs_constant.H:
        return instanceFactorySet(utcPad + "Minutes", 1);
      case uni_modules_wotDesignUni_dayjs_constant.MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);
      case uni_modules_wotDesignUni_dayjs_constant.S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);
      default:
        return this.clone();
    }
  };
  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };
  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? "UTC" : "");
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[uni_modules_wotDesignUni_dayjs_constant.MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === uni_modules_wotDesignUni_dayjs_constant.D ? this.$D + (_int - this.$W) : _int;
    if (unit === uni_modules_wotDesignUni_dayjs_constant.M || unit === uni_modules_wotDesignUni_dayjs_constant.Y) {
      var date = this.clone().set(uni_modules_wotDesignUni_dayjs_constant.DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(uni_modules_wotDesignUni_dayjs_constant.DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name)
      this.$d[name](arg);
    this.init();
    return this;
  };
  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };
  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };
  _proto.add = function add(number, units) {
    var _this2 = this, _C$MIN$C$H$C$S$unit;
    number = Number(number);
    var unit = Utils.p(units);
    var instanceFactorySet = function instanceFactorySet2(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };
    if (unit === uni_modules_wotDesignUni_dayjs_constant.M) {
      return this.set(uni_modules_wotDesignUni_dayjs_constant.M, this.$M + number);
    }
    if (unit === uni_modules_wotDesignUni_dayjs_constant.Y) {
      return this.set(uni_modules_wotDesignUni_dayjs_constant.Y, this.$y + number);
    }
    if (unit === uni_modules_wotDesignUni_dayjs_constant.D) {
      return instanceFactorySet(1);
    }
    if (unit === uni_modules_wotDesignUni_dayjs_constant.W) {
      return instanceFactorySet(7);
    }
    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[uni_modules_wotDesignUni_dayjs_constant.MIN] = uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[uni_modules_wotDesignUni_dayjs_constant.H] = uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[uni_modules_wotDesignUni_dayjs_constant.S] = uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };
  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };
  _proto.format = function format(formatStr) {
    var _this3 = this;
    var locale = this.$locale();
    if (!this.isValid())
      return locale.invalidDate || uni_modules_wotDesignUni_dayjs_constant.INVALID_DATE_STRING;
    var str = formatStr || uni_modules_wotDesignUni_dayjs_constant.FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H, $m = this.$m, $M = this.$M;
    var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
    var getShort = function getShort2(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].slice(0, length);
    };
    var get$H = function get$H2(num) {
      return Utils.s($H % 12 || 12, num, "0");
    };
    var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
      var m = hour < 12 ? "AM" : "PM";
      return isLowercase ? m.toLowerCase() : m;
    };
    var matches = function matches2(match) {
      switch (match) {
        case "YY":
          return String(_this3.$y).slice(-2);
        case "YYYY":
          return Utils.s(_this3.$y, 4, "0");
        case "M":
          return $M + 1;
        case "MM":
          return Utils.s($M + 1, 2, "0");
        case "MMM":
          return getShort(locale.monthsShort, $M, months, 3);
        case "MMMM":
          return getShort(months, $M);
        case "D":
          return _this3.$D;
        case "DD":
          return Utils.s(_this3.$D, 2, "0");
        case "d":
          return String(_this3.$W);
        case "dd":
          return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);
        case "ddd":
          return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);
        case "dddd":
          return weekdays[_this3.$W];
        case "H":
          return String($H);
        case "HH":
          return Utils.s($H, 2, "0");
        case "h":
          return get$H(1);
        case "hh":
          return get$H(2);
        case "a":
          return meridiemFunc($H, $m, true);
        case "A":
          return meridiemFunc($H, $m, false);
        case "m":
          return String($m);
        case "mm":
          return Utils.s($m, 2, "0");
        case "s":
          return String(_this3.$s);
        case "ss":
          return Utils.s(_this3.$s, 2, "0");
        case "SSS":
          return Utils.s(_this3.$ms, 3, "0");
        case "Z":
          return zoneStr;
      }
      return null;
    };
    return str.replace(uni_modules_wotDesignUni_dayjs_constant.REGEX_FORMAT, function(match, $1) {
      return $1 || matches(match) || zoneStr.replace(":", "");
    });
  };
  _proto.utcOffset = function utcOffset() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };
  _proto.diff = function diff(input, units, _float) {
    var _this4 = this;
    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_MINUTE;
    var diff2 = this - that;
    var getMonth = function getMonth2() {
      return Utils.m(_this4, that);
    };
    var result;
    switch (unit) {
      case uni_modules_wotDesignUni_dayjs_constant.Y:
        result = getMonth() / 12;
        break;
      case uni_modules_wotDesignUni_dayjs_constant.M:
        result = getMonth();
        break;
      case uni_modules_wotDesignUni_dayjs_constant.Q:
        result = getMonth() / 3;
        break;
      case uni_modules_wotDesignUni_dayjs_constant.W:
        result = (diff2 - zoneDelta) / uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_WEEK;
        break;
      case uni_modules_wotDesignUni_dayjs_constant.D:
        result = (diff2 - zoneDelta) / uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_DAY;
        break;
      case uni_modules_wotDesignUni_dayjs_constant.H:
        result = diff2 / uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_HOUR;
        break;
      case uni_modules_wotDesignUni_dayjs_constant.MIN:
        result = diff2 / uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_MINUTE;
        break;
      case uni_modules_wotDesignUni_dayjs_constant.S:
        result = diff2 / uni_modules_wotDesignUni_dayjs_constant.MILLISECONDS_A_SECOND;
        break;
      default:
        result = diff2;
        break;
    }
    return _float ? result : Utils.a(result);
  };
  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(uni_modules_wotDesignUni_dayjs_constant.M).$D;
  };
  _proto.$locale = function $locale() {
    return Ls[this.$L];
  };
  _proto.locale = function locale(preset, object) {
    if (!preset)
      return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName)
      that.$L = nextLocaleName;
    return that;
  };
  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };
  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };
  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };
  _proto.toISOString = function toISOString() {
    return this.$d.toISOString();
  };
  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };
  return Dayjs2;
}();
var proto = Dayjs.prototype;
dayjs.prototype = proto;
[["$ms", uni_modules_wotDesignUni_dayjs_constant.MS], ["$s", uni_modules_wotDesignUni_dayjs_constant.S], ["$m", uni_modules_wotDesignUni_dayjs_constant.MIN], ["$H", uni_modules_wotDesignUni_dayjs_constant.H], ["$W", uni_modules_wotDesignUni_dayjs_constant.D], ["$M", uni_modules_wotDesignUni_dayjs_constant.M], ["$y", uni_modules_wotDesignUni_dayjs_constant.Y], ["$D", uni_modules_wotDesignUni_dayjs_constant.DATE]].forEach(function(g) {
  proto[g[1]] = function(input) {
    return this.$g(input, g[0], g[1]);
  };
});
dayjs.extend = function(plugin, option) {
  if (!plugin.$i) {
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }
  return dayjs;
};
dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;
dayjs.unix = function(timestamp) {
  return dayjs(timestamp * 1e3);
};
dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};
exports.dayjs = dayjs;
