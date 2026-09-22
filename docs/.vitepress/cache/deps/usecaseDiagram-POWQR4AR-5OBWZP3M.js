import {
  getDiagramElement
} from "./chunk-ERF4FMIM.js";
import {
  setupViewPortForSVG
} from "./chunk-GIPUZ2JZ.js";
import {
  getRegisteredLayoutAlgorithm,
  render
} from "./chunk-PHTJAK3Q.js";
import "./chunk-O7QQEWBF.js";
import "./chunk-QIPQ2JAZ.js";
import "./chunk-5ITZU7CU.js";
import "./chunk-33QER2HL.js";
import "./chunk-H2RFP4YG.js";
import "./chunk-B7KO5YQV.js";
import "./chunk-ADFWXOGL.js";
import {
  hasPalette,
  isColorTheme,
  paletteSlotCount,
  safeLook
} from "./chunk-E7WPOYWJ.js";
import {
  markdownToLines
} from "./chunk-DJ4W7BRS.js";
import "./chunk-XCU23T57.js";
import {
  utils_default
} from "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  clear,
  defaultConfig_default,
  getAccDescription,
  getAccTitle,
  getConfig,
  getConfig2,
  getDiagramTitle,
  sanitizeText,
  setAccDescription,
  setAccTitle,
  setDiagramTitle
} from "./chunk-MLEFVBYW.js";
import {
  log,
  select_default
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Symbol.js
var Symbol = root_default.Symbol;
var Symbol_default = Symbol;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result2 = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result2;
}
var getRawTag_default = getRawTag;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseToNumber.js
var NAN = 0 / 0;
function baseToNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  return +value;
}
var baseToNumber_default = baseToNumber;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee2) {
  var index = -1, length = array == null ? 0 : array.length, result2 = Array(length);
  while (++index < length) {
    result2[index] = iteratee2(array[index], index, array);
  }
  return result2;
}
var arrayMap_default = arrayMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result2 = value + "";
  return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
}
var baseToString_default = baseToString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createMathOperation.js
function createMathOperation(operator, defaultValue) {
  return function(value, other) {
    var result2;
    if (value === void 0 && other === void 0) {
      return defaultValue;
    }
    if (value !== void 0) {
      result2 = value;
    }
    if (other !== void 0) {
      if (result2 === void 0) {
        return other;
      }
      if (typeof value == "string" || typeof other == "string") {
        value = baseToString_default(value);
        other = baseToString_default(other);
      } else {
        value = baseToNumber_default(value);
        other = baseToNumber_default(other);
      }
      result2 = operator(value, other);
    }
    return result2;
  };
}
var createMathOperation_default = createMathOperation;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/add.js
var add = createMathOperation_default(function(augend, addend) {
  return augend + addend;
}, 0);
var add_default = add;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toNumber.js
var NAN2 = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN2;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN2 : +value;
}
var toNumber_default = toNumber;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result2 = toFinite_default(value), remainder = result2 % 1;
  return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
}
var toInteger_default = toInteger;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/after.js
var FUNC_ERROR_TEXT = "Expected a function";
function after(n, func) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger_default(n);
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}
var after_default = after;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_metaMap.js
var metaMap = WeakMap_default && new WeakMap_default();
var metaMap_default = metaMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSetData.js
var baseSetData = !metaMap_default ? identity_default : function(func, data) {
  metaMap_default.set(func, data);
  return func;
};
var baseSetData_default = baseSetData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result2 = new object();
    object.prototype = void 0;
    return result2;
  };
}();
var baseCreate_default = baseCreate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createCtor.js
function createCtor(Ctor) {
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor(args[0]);
      case 2:
        return new Ctor(args[0], args[1]);
      case 3:
        return new Ctor(args[0], args[1], args[2]);
      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);
      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate_default(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
    return isObject_default(result2) ? result2 : thisBinding;
  };
}
var createCtor_default = createCtor;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createBind.js
var WRAP_BIND_FLAG = 1;
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor_default(func);
  function wrapper() {
    var fn = this && this !== root_default && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}
var createBind_default = createBind;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_apply.js
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var apply_default = apply;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_composeArgs.js
var nativeMax = Math.max;
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array(leftLength + rangeLength), isUncurried = !isCurried;
  while (++leftIndex < leftLength) {
    result2[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result2[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result2[leftIndex++] = args[argsIndex++];
  }
  return result2;
}
var composeArgs_default = composeArgs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_composeArgsRight.js
var nativeMax2 = Math.max;
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array(rangeLength + rightLength), isUncurried = !isCurried;
  while (++argsIndex < rangeLength) {
    result2[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result2[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result2[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result2;
}
var composeArgsRight_default = composeArgsRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_countHolders.js
function countHolders(array, placeholder) {
  var length = array.length, result2 = 0;
  while (length--) {
    if (array[length] === placeholder) {
      ++result2;
    }
  }
  return result2;
}
var countHolders_default = countHolders;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseLodash.js
function baseLodash() {
}
var baseLodash_default = baseLodash;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_LazyWrapper.js
var MAX_ARRAY_LENGTH = 4294967295;
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}
LazyWrapper.prototype = baseCreate_default(baseLodash_default.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
var LazyWrapper_default = LazyWrapper;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/noop.js
function noop() {
}
var noop_default = noop;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getData.js
var getData = !metaMap_default ? noop_default : function(func) {
  return metaMap_default.get(func);
};
var getData_default = getData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_realNames.js
var realNames = {};
var realNames_default = realNames;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getFuncName.js
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function getFuncName(func) {
  var result2 = func.name + "", array = realNames_default[result2], length = hasOwnProperty3.call(realNames_default, result2) ? array.length : 0;
  while (length--) {
    var data = array[length], otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result2;
}
var getFuncName_default = getFuncName;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_LodashWrapper.js
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = void 0;
}
LodashWrapper.prototype = baseCreate_default(baseLodash_default.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
var LodashWrapper_default = LodashWrapper;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default = copyArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_wrapperClone.js
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper_default) {
    return wrapper.clone();
  }
  var result2 = new LodashWrapper_default(wrapper.__wrapped__, wrapper.__chain__);
  result2.__actions__ = copyArray_default(wrapper.__actions__);
  result2.__index__ = wrapper.__index__;
  result2.__values__ = wrapper.__values__;
  return result2;
}
var wrapperClone_default = wrapperClone;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/wrapperLodash.js
var objectProto5 = Object.prototype;
var hasOwnProperty4 = objectProto5.hasOwnProperty;
function lodash(value) {
  if (isObjectLike_default(value) && !isArray_default(value) && !(value instanceof LazyWrapper_default)) {
    if (value instanceof LodashWrapper_default) {
      return value;
    }
    if (hasOwnProperty4.call(value, "__wrapped__")) {
      return wrapperClone_default(value);
    }
  }
  return new LodashWrapper_default(value);
}
lodash.prototype = baseLodash_default.prototype;
lodash.prototype.constructor = lodash;
var wrapperLodash_default = lodash;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isLaziable.js
function isLaziable(func) {
  var funcName = getFuncName_default(func), other = wrapperLodash_default[funcName];
  if (typeof other != "function" || !(funcName in LazyWrapper_default.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData_default(other);
  return !!data && func === data[0];
}
var isLaziable_default = isLaziable;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_shortOut.js
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var shortOut_default = shortOut;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setData.js
var setData = shortOut_default(baseSetData_default);
var setData_default = setData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getWrapDetails.js
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/;
var reSplitDetails = /,? & /;
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}
var getWrapDetails_default = getWrapDetails;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_insertWrapDetails.js
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
  details = details.join(length > 2 ? ", " : " ");
  return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
}
var insertWrapDetails_default = insertWrapDetails;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/constant.js
function constant(value) {
  return function() {
    return value;
  };
}
var constant_default = constant;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSetToString.js
var baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
  return defineProperty_default(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_default(string),
    "writable": true
  });
};
var baseSetToString_default = baseSetToString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setToString.js
var setToString = shortOut_default(baseSetToString_default);
var setToString_default = setToString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee2) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee2(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEach_default = arrayEach;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default = baseIsNaN;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var strictIndexOf_default = strictIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default = baseIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default = arrayIncludes;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_updateWrapDetails.js
var WRAP_BIND_FLAG2 = 1;
var WRAP_BIND_KEY_FLAG = 2;
var WRAP_CURRY_FLAG = 8;
var WRAP_CURRY_RIGHT_FLAG = 16;
var WRAP_PARTIAL_FLAG = 32;
var WRAP_PARTIAL_RIGHT_FLAG = 64;
var WRAP_ARY_FLAG = 128;
var WRAP_REARG_FLAG = 256;
var WRAP_FLIP_FLAG = 512;
var wrapFlags = [
  ["ary", WRAP_ARY_FLAG],
  ["bind", WRAP_BIND_FLAG2],
  ["bindKey", WRAP_BIND_KEY_FLAG],
  ["curry", WRAP_CURRY_FLAG],
  ["curryRight", WRAP_CURRY_RIGHT_FLAG],
  ["flip", WRAP_FLIP_FLAG],
  ["partial", WRAP_PARTIAL_FLAG],
  ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
  ["rearg", WRAP_REARG_FLAG]
];
function updateWrapDetails(details, bitmask) {
  arrayEach_default(wrapFlags, function(pair) {
    var value = "_." + pair[0];
    if (bitmask & pair[1] && !arrayIncludes_default(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}
var updateWrapDetails_default = updateWrapDetails;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setWrapToString.js
function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + "";
  return setToString_default(wrapper, insertWrapDetails_default(source, updateWrapDetails_default(getWrapDetails_default(source), bitmask)));
}
var setWrapToString_default = setWrapToString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createRecurry.js
var WRAP_BIND_FLAG3 = 1;
var WRAP_BIND_KEY_FLAG2 = 2;
var WRAP_CURRY_BOUND_FLAG = 4;
var WRAP_CURRY_FLAG2 = 8;
var WRAP_PARTIAL_FLAG2 = 32;
var WRAP_PARTIAL_RIGHT_FLAG2 = 64;
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG2, newHolders = isCurry ? holders : void 0, newHoldersRight = isCurry ? void 0 : holders, newPartials = isCurry ? partials : void 0, newPartialsRight = isCurry ? void 0 : partials;
  bitmask |= isCurry ? WRAP_PARTIAL_FLAG2 : WRAP_PARTIAL_RIGHT_FLAG2;
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG2 : WRAP_PARTIAL_FLAG2);
  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG3 | WRAP_BIND_KEY_FLAG2);
  }
  var newData = [
    func,
    bitmask,
    thisArg,
    newPartials,
    newHolders,
    newPartialsRight,
    newHoldersRight,
    argPos,
    ary2,
    arity
  ];
  var result2 = wrapFunc.apply(void 0, newData);
  if (isLaziable_default(func)) {
    setData_default(result2, newData);
  }
  result2.placeholder = placeholder;
  return setWrapToString_default(result2, func, bitmask);
}
var createRecurry_default = createRecurry;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getHolder.js
function getHolder(func) {
  var object = func;
  return object.placeholder;
}
var getHolder_default = getHolder;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_reorder.js
var nativeMin = Math.min;
function reorder(array, indexes) {
  var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray_default(array);
  while (length--) {
    var index = indexes[length];
    array[length] = isIndex_default(index, arrLength) ? oldArray[index] : void 0;
  }
  return array;
}
var reorder_default = reorder;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_replaceHolders.js
var PLACEHOLDER = "__lodash_placeholder__";
function replaceHolders(array, placeholder) {
  var index = -1, length = array.length, resIndex = 0, result2 = [];
  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result2[resIndex++] = index;
    }
  }
  return result2;
}
var replaceHolders_default = replaceHolders;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createHybrid.js
var WRAP_BIND_FLAG4 = 1;
var WRAP_BIND_KEY_FLAG3 = 2;
var WRAP_CURRY_FLAG3 = 8;
var WRAP_CURRY_RIGHT_FLAG2 = 16;
var WRAP_ARY_FLAG2 = 128;
var WRAP_FLIP_FLAG2 = 512;
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG2, isBind = bitmask & WRAP_BIND_FLAG4, isBindKey = bitmask & WRAP_BIND_KEY_FLAG3, isCurried = bitmask & (WRAP_CURRY_FLAG3 | WRAP_CURRY_RIGHT_FLAG2), isFlip = bitmask & WRAP_FLIP_FLAG2, Ctor = isBindKey ? void 0 : createCtor_default(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index = length;
    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder_default(wrapper), holdersCount = countHolders_default(args, placeholder);
    }
    if (partials) {
      args = composeArgs_default(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight_default(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders_default(args, placeholder);
      return createRecurry_default(
        func,
        bitmask,
        createHybrid,
        wrapper.placeholder,
        thisArg,
        args,
        newHolders,
        argPos,
        ary2,
        arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
    length = args.length;
    if (argPos) {
      args = reorder_default(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary2 < length) {
      args.length = ary2;
    }
    if (this && this !== root_default && this instanceof wrapper) {
      fn = Ctor || createCtor_default(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}
var createHybrid_default = createHybrid;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createCurry.js
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor_default(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index = length, placeholder = getHolder_default(wrapper);
    while (index--) {
      args[index] = arguments[index];
    }
    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders_default(args, placeholder);
    length -= holders.length;
    if (length < arity) {
      return createRecurry_default(
        func,
        bitmask,
        createHybrid_default,
        wrapper.placeholder,
        void 0,
        args,
        holders,
        void 0,
        void 0,
        arity - length
      );
    }
    var fn = this && this !== root_default && this instanceof wrapper ? Ctor : func;
    return apply_default(fn, this, args);
  }
  return wrapper;
}
var createCurry_default = createCurry;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createPartial.js
var WRAP_BIND_FLAG5 = 1;
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG5, Ctor = createCtor_default(func);
  function wrapper() {
    var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root_default && this instanceof wrapper ? Ctor : func;
    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply_default(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}
var createPartial_default = createPartial;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mergeData.js
var PLACEHOLDER2 = "__lodash_placeholder__";
var WRAP_BIND_FLAG6 = 1;
var WRAP_BIND_KEY_FLAG4 = 2;
var WRAP_CURRY_BOUND_FLAG2 = 4;
var WRAP_CURRY_FLAG4 = 8;
var WRAP_ARY_FLAG3 = 128;
var WRAP_REARG_FLAG2 = 256;
var nativeMin2 = Math.min;
function mergeData(data, source) {
  var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG6 | WRAP_BIND_KEY_FLAG4 | WRAP_ARY_FLAG3);
  var isCombo = srcBitmask == WRAP_ARY_FLAG3 && bitmask == WRAP_CURRY_FLAG4 || srcBitmask == WRAP_ARY_FLAG3 && bitmask == WRAP_REARG_FLAG2 && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG3 | WRAP_REARG_FLAG2) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG4;
  if (!(isCommon || isCombo)) {
    return data;
  }
  if (srcBitmask & WRAP_BIND_FLAG6) {
    data[2] = source[2];
    newBitmask |= bitmask & WRAP_BIND_FLAG6 ? 0 : WRAP_CURRY_BOUND_FLAG2;
  }
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs_default(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders_default(data[3], PLACEHOLDER2) : source[4];
  }
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight_default(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders_default(data[5], PLACEHOLDER2) : source[6];
  }
  value = source[7];
  if (value) {
    data[7] = value;
  }
  if (srcBitmask & WRAP_ARY_FLAG3) {
    data[8] = data[8] == null ? source[8] : nativeMin2(data[8], source[8]);
  }
  if (data[9] == null) {
    data[9] = source[9];
  }
  data[0] = source[0];
  data[1] = newBitmask;
  return data;
}
var mergeData_default = mergeData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createWrap.js
var FUNC_ERROR_TEXT2 = "Expected a function";
var WRAP_BIND_FLAG7 = 1;
var WRAP_BIND_KEY_FLAG5 = 2;
var WRAP_CURRY_FLAG5 = 8;
var WRAP_CURRY_RIGHT_FLAG3 = 16;
var WRAP_PARTIAL_FLAG3 = 32;
var WRAP_PARTIAL_RIGHT_FLAG3 = 64;
var nativeMax3 = Math.max;
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG5;
  if (!isBindKey && typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG3 | WRAP_PARTIAL_RIGHT_FLAG3);
    partials = holders = void 0;
  }
  ary2 = ary2 === void 0 ? ary2 : nativeMax3(toInteger_default(ary2), 0);
  arity = arity === void 0 ? arity : toInteger_default(arity);
  length -= holders ? holders.length : 0;
  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG3) {
    var partialsRight = partials, holdersRight = holders;
    partials = holders = void 0;
  }
  var data = isBindKey ? void 0 : getData_default(func);
  var newData = [
    func,
    bitmask,
    thisArg,
    partials,
    holders,
    partialsRight,
    holdersRight,
    argPos,
    ary2,
    arity
  ];
  if (data) {
    mergeData_default(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === void 0 ? isBindKey ? 0 : func.length : nativeMax3(newData[9] - length, 0);
  if (!arity && bitmask & (WRAP_CURRY_FLAG5 | WRAP_CURRY_RIGHT_FLAG3)) {
    bitmask &= ~(WRAP_CURRY_FLAG5 | WRAP_CURRY_RIGHT_FLAG3);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG7) {
    var result2 = createBind_default(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG5 || bitmask == WRAP_CURRY_RIGHT_FLAG3) {
    result2 = createCurry_default(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG3 || bitmask == (WRAP_BIND_FLAG7 | WRAP_PARTIAL_FLAG3)) && !holders.length) {
    result2 = createPartial_default(func, bitmask, thisArg, partials);
  } else {
    result2 = createHybrid_default.apply(void 0, newData);
  }
  var setter = data ? baseSetData_default : setData_default;
  return setWrapToString_default(setter(result2, newData), func, bitmask);
}
var createWrap_default = createWrap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/ary.js
var WRAP_ARY_FLAG4 = 128;
function ary(func, n, guard) {
  n = guard ? void 0 : n;
  n = func && n == null ? func.length : n;
  return createWrap_default(func, WRAP_ARY_FLAG4, void 0, void 0, void 0, void 0, n);
}
var ary_default = ary;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_assignValue.js
var objectProto6 = Object.prototype;
var hasOwnProperty5 = objectProto6.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty5.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_overRest.js
var nativeMax4 = Math.max;
function overRest(func, start, transform2) {
  start = nativeMax4(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax4(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform2(array);
    return apply_default(func, this, otherArgs);
  };
}
var overRest_default = overRest;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default = baseRest;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
    return eq_default(object[index], value);
  }
  return false;
}
var isIterateeCall_default = isIterateeCall;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createAssigner.js
function createAssigner(assigner) {
  return baseRest_default(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var createAssigner_default = createAssigner;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isPrototype.js
var objectProto7 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto7;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee2) {
  var index = -1, result2 = Array(n);
  while (++index < n) {
    result2[index] = iteratee2(index);
  }
  return result2;
}
var baseTimes_default = baseTimes;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isArguments.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
var propertyIsEnumerable = objectProto8.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty6.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayLikeKeys.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes_default(value.length, String) : [], length = result2.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result2.push(key);
    }
  }
  return result2;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_overArg.js
function overArg(func, transform2) {
  return function(arg) {
    return func(transform2(arg));
  };
}
var overArg_default = overArg;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseKeys.js
var objectProto10 = Object.prototype;
var hasOwnProperty8 = objectProto10.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result2 = [];
  for (var key in Object(object)) {
    if (hasOwnProperty8.call(object, key) && key != "constructor") {
      result2.push(key);
    }
  }
  return result2;
}
var baseKeys_default = baseKeys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/assign.js
var objectProto11 = Object.prototype;
var hasOwnProperty9 = objectProto11.hasOwnProperty;
var assign = createAssigner_default(function(object, source) {
  if (isPrototype_default(source) || isArrayLike_default(source)) {
    copyObject_default(source, keys_default(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty9.call(source, key)) {
      assignValue_default(object, key, source[key]);
    }
  }
});
var assign_default = assign;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result2 = [];
  if (object != null) {
    for (var key in Object(object)) {
      result2.push(key);
    }
  }
  return result2;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseKeysIn.js
var objectProto12 = Object.prototype;
var hasOwnProperty10 = objectProto12.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result2 = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty10.call(object, key)))) {
      result2.push(key);
    }
  }
  return result2;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/assignIn.js
var assignIn = createAssigner_default(function(object, source) {
  copyObject_default(source, keysIn_default(source), object);
});
var assignIn_default = assignIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/assignInWith.js
var assignInWith = createAssigner_default(function(object, source, srcIndex, customizer) {
  copyObject_default(source, keysIn_default(source), object, customizer);
});
var assignInWith_default = assignInWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/assignWith.js
var assignWith = createAssigner_default(function(object, source, srcIndex, customizer) {
  copyObject_default(source, keys_default(source), object, customizer);
});
var assignWith_default = assignWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result2 = this.has(key) && delete this.__data__[key];
  this.size -= result2 ? 1 : 0;
  return result2;
}
var hashDelete_default = hashDelete;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto13 = Object.prototype;
var hasOwnProperty11 = objectProto13.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result2 = data[key];
    return result2 === HASH_UNDEFINED ? void 0 : result2;
  }
  return hasOwnProperty11.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hashHas.js
var objectProto14 = Object.prototype;
var hasOwnProperty12 = objectProto14.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty12.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getMapData.js
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result2 = getMapData_default(this, key)["delete"](key);
  this.size -= result2 ? 1 : 0;
  return result2;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size2 = data.size;
  data.set(key, value);
  this.size += data.size == size2 ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT3 = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT3);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result2 = func.apply(this, args);
    memoized.cache = cache.set(key, result2) || cache;
    return result2;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result2 = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result2.cache;
  return result2;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result2 = [];
  if (string.charCodeAt(0) === 46) {
    result2.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result2;
});
var stringToPath_default = stringToPath;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result2 = value + "";
  return result2 == "0" && 1 / value == -INFINITY3 ? "-0" : result2;
}
var toKey_default = toKey;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey_default(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result2 = object == null ? void 0 : baseGet_default(object, path);
  return result2 === void 0 ? defaultValue : result2;
}
var get_default = get;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseAt.js
function baseAt(object, paths) {
  var index = -1, length = paths.length, result2 = Array(length), skip = object == null;
  while (++index < length) {
    result2[index] = skip ? void 0 : get_default(object, paths[index]);
  }
  return result2;
}
var baseAt_default = baseAt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var isFlattenable_default = isFlattenable;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result2) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result2 || (result2 = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result2);
      } else {
        arrayPush_default(result2, value);
      }
    } else if (!isStrict) {
      result2[result2.length] = value;
    }
  }
  return result2;
}
var baseFlatten_default = baseFlatten;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flatten.js
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, 1) : [];
}
var flatten_default = flatten;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_flatRest.js
function flatRest(func) {
  return setToString_default(overRest_default(func, void 0, flatten_default), func + "");
}
var flatRest_default = flatRest;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/at.js
var at = flatRest_default(baseAt_default);
var at_default = at;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isPlainObject.js
var objectTag2 = "[object Object]";
var funcProto3 = Function.prototype;
var objectProto15 = Object.prototype;
var funcToString3 = funcProto3.toString;
var hasOwnProperty13 = objectProto15.hasOwnProperty;
var objectCtorString = funcToString3.call(Object);
function isPlainObject(value) {
  if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag2) {
    return false;
  }
  var proto = getPrototype_default(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty13.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString3.call(Ctor) == objectCtorString;
}
var isPlainObject_default = isPlainObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isError.js
var domExcTag = "[object DOMException]";
var errorTag2 = "[object Error]";
function isError(value) {
  if (!isObjectLike_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == errorTag2 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject_default(value);
}
var isError_default = isError;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/attempt.js
var attempt = baseRest_default(function(func, args) {
  try {
    return apply_default(func, void 0, args);
  } catch (e) {
    return isError_default(e) ? e : new Error(e);
  }
});
var attempt_default = attempt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/before.js
var FUNC_ERROR_TEXT4 = "Expected a function";
function before(n, func) {
  var result2;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT4);
  }
  n = toInteger_default(n);
  return function() {
    if (--n > 0) {
      result2 = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = void 0;
    }
    return result2;
  };
}
var before_default = before;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/bind.js
var WRAP_BIND_FLAG8 = 1;
var WRAP_PARTIAL_FLAG4 = 32;
var bind = baseRest_default(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG8;
  if (partials.length) {
    var holders = replaceHolders_default(partials, getHolder_default(bind));
    bitmask |= WRAP_PARTIAL_FLAG4;
  }
  return createWrap_default(func, bitmask, thisArg, partials, holders);
});
bind.placeholder = {};
var bind_default = bind;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/bindAll.js
var bindAll = flatRest_default(function(object, methodNames) {
  arrayEach_default(methodNames, function(key) {
    key = toKey_default(key);
    baseAssignValue_default(object, key, bind_default(object[key], object));
  });
  return object;
});
var bindAll_default = bindAll;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/bindKey.js
var WRAP_BIND_FLAG9 = 1;
var WRAP_BIND_KEY_FLAG6 = 2;
var WRAP_PARTIAL_FLAG5 = 32;
var bindKey = baseRest_default(function(object, key, partials) {
  var bitmask = WRAP_BIND_FLAG9 | WRAP_BIND_KEY_FLAG6;
  if (partials.length) {
    var holders = replaceHolders_default(partials, getHolder_default(bindKey));
    bitmask |= WRAP_PARTIAL_FLAG5;
  }
  return createWrap_default(key, bitmask, object, partials, holders);
});
bindKey.placeholder = {};
var bindKey_default = bindKey;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result2 = Array(length);
  while (++index < length) {
    result2[index] = array[index + start];
  }
  return result2;
}
var baseSlice_default = baseSlice;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_castSlice.js
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice_default(array, start, end);
}
var castSlice_default = castSlice;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hasUnicode.js
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = "\\ufe0e\\ufe0f";
var rsZWJ = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
var hasUnicode_default = hasUnicode;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_asciiToArray.js
function asciiToArray(string) {
  return string.split("");
}
var asciiToArray_default = asciiToArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_unicodeToArray.js
var rsAstralRange2 = "\\ud800-\\udfff";
var rsComboMarksRange2 = "\\u0300-\\u036f";
var reComboHalfMarksRange2 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange2 = "\\u20d0-\\u20ff";
var rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2;
var rsVarRange2 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange2 + "]";
var rsCombo = "[" + rsComboRange2 + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange2 + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ2 = "\\u200d";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange2 + "]?";
var rsOptJoin = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
var unicodeToArray_default = unicodeToArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stringToArray.js
function stringToArray(string) {
  return hasUnicode_default(string) ? unicodeToArray_default(string) : asciiToArray_default(string);
}
var stringToArray_default = stringToArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createCaseFirst.js
function createCaseFirst(methodName) {
  return function(string) {
    string = toString_default(string);
    var strSymbols = hasUnicode_default(string) ? stringToArray_default(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice_default(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var createCaseFirst_default = createCaseFirst;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/upperFirst.js
var upperFirst = createCaseFirst_default("toUpperCase");
var upperFirst_default = upperFirst;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/capitalize.js
function capitalize(string) {
  return upperFirst_default(toString_default(string).toLowerCase());
}
var capitalize_default = capitalize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayReduce.js
function arrayReduce(array, iteratee2, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee2(accumulator, array[index], index, array);
  }
  return accumulator;
}
var arrayReduce_default = arrayReduce;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_basePropertyOf.js
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var basePropertyOf_default = basePropertyOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_deburrLetter.js
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter = basePropertyOf_default(deburredLetters);
var deburrLetter_default = deburrLetter;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/deburr.js
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange3 = "\\u0300-\\u036f";
var reComboHalfMarksRange3 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange3 = "\\u20d0-\\u20ff";
var rsComboRange3 = rsComboMarksRange3 + reComboHalfMarksRange3 + rsComboSymbolsRange3;
var rsCombo2 = "[" + rsComboRange3 + "]";
var reComboMark = RegExp(rsCombo2, "g");
function deburr(string) {
  string = toString_default(string);
  return string && string.replace(reLatin, deburrLetter_default).replace(reComboMark, "");
}
var deburr_default = deburr;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_asciiWords.js
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
var asciiWords_default = asciiWords;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hasUnicodeWord.js
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
var hasUnicodeWord_default = hasUnicodeWord;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_unicodeWords.js
var rsAstralRange3 = "\\ud800-\\udfff";
var rsComboMarksRange4 = "\\u0300-\\u036f";
var reComboHalfMarksRange4 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange4 = "\\u20d0-\\u20ff";
var rsComboRange4 = rsComboMarksRange4 + reComboHalfMarksRange4 + rsComboSymbolsRange4;
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
var rsVarRange3 = "\\ufe0e\\ufe0f";
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['’]";
var rsBreak = "[" + rsBreakRange + "]";
var rsCombo3 = "[" + rsComboRange4 + "]";
var rsDigits = "\\d+";
var rsDingbat = "[" + rsDingbatRange + "]";
var rsLower = "[" + rsLowerRange + "]";
var rsMisc = "[^" + rsAstralRange3 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
var rsFitz2 = "\\ud83c[\\udffb-\\udfff]";
var rsModifier2 = "(?:" + rsCombo3 + "|" + rsFitz2 + ")";
var rsNonAstral2 = "[^" + rsAstralRange3 + "]";
var rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsUpper = "[" + rsUpperRange + "]";
var rsZWJ3 = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
var reOptMod2 = rsModifier2 + "?";
var rsOptVar2 = "[" + rsVarRange3 + "]?";
var rsOptJoin2 = "(?:" + rsZWJ3 + "(?:" + [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") + ")" + rsOptVar2 + reOptMod2 + ")*";
var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
var rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2;
var rsEmoji = "(?:" + [rsDingbat, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
var unicodeWords_default = unicodeWords;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/words.js
function words(string, pattern, guard) {
  string = toString_default(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord_default(string) ? unicodeWords_default(string) : asciiWords_default(string);
  }
  return string.match(pattern) || [];
}
var words_default = words;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createCompounder.js
var rsApos2 = "['’]";
var reApos = RegExp(rsApos2, "g");
function createCompounder(callback) {
  return function(string) {
    return arrayReduce_default(words_default(deburr_default(string).replace(reApos, "")), callback, "");
  };
}
var createCompounder_default = createCompounder;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/camelCase.js
var camelCase = createCompounder_default(function(result2, word, index) {
  word = word.toLowerCase();
  return result2 + (index ? capitalize_default(word) : word);
});
var camelCase_default = camelCase;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/castArray.js
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_default(value) ? value : [value];
}
var castArray_default = castArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createRound.js
var nativeIsFinite = root_default.isFinite;
var nativeMin3 = Math.min;
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    number = toNumber_default(number);
    precision = precision == null ? 0 : nativeMin3(toInteger_default(precision), 292);
    if (precision && nativeIsFinite(number)) {
      var pair = (toString_default(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
      pair = (toString_default(value) + "e").split("e");
      return +(pair[0] + "e" + (+pair[1] - precision));
    }
    return func(number);
  };
}
var createRound_default = createRound;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/ceil.js
var ceil = createRound_default("ceil");
var ceil_default = ceil;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/chain.js
function chain(value) {
  var result2 = wrapperLodash_default(value);
  result2.__chain__ = true;
  return result2;
}
var chain_default = chain;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/chunk.js
var nativeCeil = Math.ceil;
var nativeMax5 = Math.max;
function chunk(array, size2, guard) {
  if (guard ? isIterateeCall_default(array, size2, guard) : size2 === void 0) {
    size2 = 1;
  } else {
    size2 = nativeMax5(toInteger_default(size2), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size2 < 1) {
    return [];
  }
  var index = 0, resIndex = 0, result2 = Array(nativeCeil(length / size2));
  while (index < length) {
    result2[resIndex++] = baseSlice_default(array, index, index += size2);
  }
  return result2;
}
var chunk_default = chunk;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseClamp.js
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== void 0) {
      number = number <= upper ? number : upper;
    }
    if (lower !== void 0) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
var baseClamp_default = baseClamp;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/clamp.js
function clamp(number, lower, upper) {
  if (upper === void 0) {
    upper = lower;
    lower = void 0;
  }
  if (upper !== void 0) {
    upper = toNumber_default(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== void 0) {
    lower = toNumber_default(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp_default(toNumber_default(number), lower, upper);
}
var clamp_default = clamp;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result2 = data["delete"](key);
  this.size = data.size;
  return result2;
}
var stackDelete_default = stackDelete;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default = baseAssign;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default = baseAssignIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cloneBuffer.js
var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
var Buffer2 = moduleExports3 ? root_default.Buffer : void 0;
var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result2);
  return result2;
}
var cloneBuffer_default = cloneBuffer;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result2[resIndex++] = value;
    }
  }
  return result2;
}
var arrayFilter_default = arrayFilter;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getSymbols.js
var objectProto16 = Object.prototype;
var propertyIsEnumerable2 = objectProto16.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default = copySymbols;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
  var result2 = [];
  while (object) {
    arrayPush_default(result2, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result2;
};
var getSymbolsIn_default = getSymbolsIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default = copySymbolsIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result2 = keysFunc(object);
  return isArray_default(object) ? result2 : arrayPush_default(result2, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag3 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result2 = baseGetTag_default(value), Ctor = result2 == objectTag3 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result2;
  };
}
var getTag_default = getTag;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_initCloneArray.js
var objectProto17 = Object.prototype;
var hasOwnProperty14 = objectProto17.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result2 = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty14.call(array, "index")) {
    result2.index = array.index;
    result2.input = array.input;
  }
  return result2;
}
var initCloneArray_default = initCloneArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_Uint8Array.js
var Uint8Array = root_default.Uint8Array;
var Uint8Array_default = Uint8Array;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result2).set(new Uint8Array_default(arrayBuffer));
  return result2;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default = cloneDataView;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result2.lastIndex = regexp.lastIndex;
  return result2;
}
var cloneRegExp_default = cloneRegExp;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cloneSymbol.js
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var cloneSymbol_default = cloneSymbol;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_initCloneByTag.js
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer_default(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag3:
      return cloneDataView_default(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep);
    case mapTag3:
      return new Ctor();
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp_default(object);
    case setTag3:
      return new Ctor();
    case symbolTag2:
      return cloneSymbol_default(object);
  }
}
var initCloneByTag_default = initCloneByTag;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsMap.js
var mapTag4 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag4;
}
var baseIsMap_default = baseIsMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
var isMap_default = isMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsSet.js
var setTag4 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag4;
}
var baseIsSet_default = baseIsSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
var isSet_default = isSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var boolTag3 = "[object Boolean]";
var dateTag3 = "[object Date]";
var errorTag3 = "[object Error]";
var funcTag3 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag5 = "[object Map]";
var numberTag3 = "[object Number]";
var objectTag4 = "[object Object]";
var regexpTag3 = "[object RegExp]";
var setTag5 = "[object Set]";
var stringTag3 = "[object String]";
var symbolTag3 = "[object Symbol]";
var weakMapTag3 = "[object WeakMap]";
var arrayBufferTag3 = "[object ArrayBuffer]";
var dataViewTag4 = "[object DataView]";
var float32Tag3 = "[object Float32Array]";
var float64Tag3 = "[object Float64Array]";
var int8Tag3 = "[object Int8Array]";
var int16Tag3 = "[object Int16Array]";
var int32Tag3 = "[object Int32Array]";
var uint8Tag3 = "[object Uint8Array]";
var uint8ClampedTag3 = "[object Uint8ClampedArray]";
var uint16Tag3 = "[object Uint16Array]";
var uint32Tag3 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag4] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag3] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
cloneableTags[errorTag3] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result2 = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result2 !== void 0) {
    return result2;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result2 = initCloneArray_default(value);
    if (!isDeep) {
      return copyArray_default(value, result2);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep);
    }
    if (tag == objectTag4 || tag == argsTag3 || isFunc && !object) {
      result2 = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result2, value)) : copySymbols_default(value, baseAssign_default(result2, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result2 = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result2);
  if (isSet_default(value)) {
    value.forEach(function(subValue) {
      result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function(subValue, key2) {
      result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result2;
}
var baseClone_default = baseClone;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/clone.js
var CLONE_SYMBOLS_FLAG2 = 4;
function clone(value) {
  return baseClone_default(value, CLONE_SYMBOLS_FLAG2);
}
var clone_default = clone;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/cloneDeep.js
var CLONE_DEEP_FLAG2 = 1;
var CLONE_SYMBOLS_FLAG3 = 4;
function cloneDeep(value) {
  return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG3);
}
var cloneDeep_default = cloneDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/cloneDeepWith.js
var CLONE_DEEP_FLAG3 = 1;
var CLONE_SYMBOLS_FLAG4 = 4;
function cloneDeepWith(value, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return baseClone_default(value, CLONE_DEEP_FLAG3 | CLONE_SYMBOLS_FLAG4, customizer);
}
var cloneDeepWith_default = cloneDeepWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/cloneWith.js
var CLONE_SYMBOLS_FLAG5 = 4;
function cloneWith(value, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return baseClone_default(value, CLONE_SYMBOLS_FLAG5, customizer);
}
var cloneWith_default = cloneWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/commit.js
function wrapperCommit() {
  return new LodashWrapper_default(this.value(), this.__chain__);
}
var commit_default = wrapperCommit;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/compact.js
function compact(array) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
  while (++index < length) {
    var value = array[index];
    if (value) {
      result2[resIndex++] = value;
    }
  }
  return result2;
}
var compact_default = compact;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/concat.js
function concat() {
  var length = arguments.length;
  if (!length) {
    return [];
  }
  var args = Array(length - 1), array = arguments[0], index = length;
  while (index--) {
    args[index - 1] = arguments[index];
  }
  return arrayPush_default(isArray_default(array) ? copyArray_default(array) : [array], baseFlatten_default(args, 1));
}
var concat_default = concat;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_SetCache.js
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result2 = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result2 = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result2 = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result2;
}
var equalArrays_default = equalArrays;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_mapToArray.js
function mapToArray(map2) {
  var index = -1, result2 = Array(map2.size);
  map2.forEach(function(value, key) {
    result2[++index] = [key, value];
  });
  return result2;
}
var mapToArray_default = mapToArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setToArray.js
function setToArray(set2) {
  var index = -1, result2 = Array(set2.size);
  set2.forEach(function(value) {
    result2[++index] = value;
  });
  return result2;
}
var setToArray_default = setToArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag4 = "[object Boolean]";
var dateTag4 = "[object Date]";
var errorTag4 = "[object Error]";
var mapTag6 = "[object Map]";
var numberTag4 = "[object Number]";
var regexpTag4 = "[object RegExp]";
var setTag6 = "[object Set]";
var stringTag4 = "[object String]";
var symbolTag4 = "[object Symbol]";
var arrayBufferTag4 = "[object ArrayBuffer]";
var dataViewTag5 = "[object DataView]";
var symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag5:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag4:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag4:
    case dateTag4:
    case numberTag4:
      return eq_default(+object, +other);
    case errorTag4:
      return object.name == other.name && object.message == other.message;
    case regexpTag4:
    case stringTag4:
      return object == other + "";
    case mapTag6:
      var convert = mapToArray_default;
    case setTag6:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result2 = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result2;
    case symbolTag4:
      if (symbolValueOf2) {
        return symbolValueOf2.call(object) == symbolValueOf2.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto18 = Object.prototype;
var hasOwnProperty15 = objectProto18.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty15.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result2 = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result2 = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result2 && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result2 = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result2;
}
var equalObjects_default = equalObjects;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag4 = "[object Arguments]";
var arrayTag3 = "[object Array]";
var objectTag5 = "[object Object]";
var objectProto19 = Object.prototype;
var hasOwnProperty16 = objectProto19.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
  objTag = objTag == argsTag4 ? objectTag5 : objTag;
  othTag = othTag == argsTag4 ? objectTag5 : othTag;
  var objIsObj = objTag == objectTag5, othIsObj = othTag == objectTag5, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty16.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty16.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result2 = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result2 === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result2)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result2 = keys_default(object), length = result2.length;
  while (length--) {
    var key = result2[length], value = object[key];
    result2[length] = [key, value, isStrictComparable_default(value)];
  }
  return result2;
}
var getMatchData_default = getMatchData;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index = -1, length = path.length, result2 = false;
  while (++index < length) {
    var key = toKey_default(path[index]);
    if (!(result2 = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result2 || ++index != length) {
    return result2;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
var property_default = property;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/cond.js
var FUNC_ERROR_TEXT5 = "Expected a function";
function cond(pairs) {
  var length = pairs == null ? 0 : pairs.length, toIteratee = baseIteratee_default;
  pairs = !length ? [] : arrayMap_default(pairs, function(pair) {
    if (typeof pair[1] != "function") {
      throw new TypeError(FUNC_ERROR_TEXT5);
    }
    return [toIteratee(pair[0]), pair[1]];
  });
  return baseRest_default(function(args) {
    var index = -1;
    while (++index < length) {
      var pair = pairs[index];
      if (apply_default(pair[0], this, args)) {
        return apply_default(pair[1], this, args);
      }
    }
  });
}
var cond_default = cond;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseConformsTo.js
function baseConformsTo(object, source, props) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (length--) {
    var key = props[length], predicate = source[key], value = object[key];
    if (value === void 0 && !(key in object) || !predicate(value)) {
      return false;
    }
  }
  return true;
}
var baseConformsTo_default = baseConformsTo;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseConforms.js
function baseConforms(source) {
  var props = keys_default(source);
  return function(object) {
    return baseConformsTo_default(object, source, props);
  };
}
var baseConforms_default = baseConforms;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/conforms.js
var CLONE_DEEP_FLAG4 = 1;
function conforms(source) {
  return baseConforms_default(baseClone_default(source, CLONE_DEEP_FLAG4));
}
var conforms_default = conforms;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/conformsTo.js
function conformsTo(object, source) {
  return source == null || baseConformsTo_default(object, source, keys_default(source));
}
var conformsTo_default = conformsTo;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayAggregator.js
function arrayAggregator(array, setter, iteratee2, accumulator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee2(value), array);
  }
  return accumulator;
}
var arrayAggregator_default = arrayAggregator;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee2, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee2(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee2) {
  return object && baseFor_default(object, iteratee2, keys_default);
}
var baseForOwn_default = baseForOwn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee2) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee2);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee2(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default = createBaseEach;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseAggregator.js
function baseAggregator(collection, setter, iteratee2, accumulator) {
  baseEach_default(collection, function(value, key, collection2) {
    setter(accumulator, value, iteratee2(value), collection2);
  });
  return accumulator;
}
var baseAggregator_default = baseAggregator;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createAggregator.js
function createAggregator(setter, initializer) {
  return function(collection, iteratee2) {
    var func = isArray_default(collection) ? arrayAggregator_default : baseAggregator_default, accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee_default(iteratee2, 2), accumulator);
  };
}
var createAggregator_default = createAggregator;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/countBy.js
var objectProto20 = Object.prototype;
var hasOwnProperty17 = objectProto20.hasOwnProperty;
var countBy = createAggregator_default(function(result2, value, key) {
  if (hasOwnProperty17.call(result2, key)) {
    ++result2[key];
  } else {
    baseAssignValue_default(result2, key, 1);
  }
});
var countBy_default = countBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/create.js
function create(prototype, properties) {
  var result2 = baseCreate_default(prototype);
  return properties == null ? result2 : baseAssign_default(result2, properties);
}
var create_default = create;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/curry.js
var WRAP_CURRY_FLAG6 = 8;
function curry(func, arity, guard) {
  arity = guard ? void 0 : arity;
  var result2 = createWrap_default(func, WRAP_CURRY_FLAG6, void 0, void 0, void 0, void 0, void 0, arity);
  result2.placeholder = curry.placeholder;
  return result2;
}
curry.placeholder = {};
var curry_default = curry;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/curryRight.js
var WRAP_CURRY_RIGHT_FLAG4 = 16;
function curryRight(func, arity, guard) {
  arity = guard ? void 0 : arity;
  var result2 = createWrap_default(func, WRAP_CURRY_RIGHT_FLAG4, void 0, void 0, void 0, void 0, void 0, arity);
  result2.placeholder = curryRight.placeholder;
  return result2;
}
curryRight.placeholder = {};
var curryRight_default = curryRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/now.js
var now = function() {
  return root_default.Date.now();
};
var now_default = now;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/debounce.js
var FUNC_ERROR_TEXT6 = "Expected a function";
var nativeMax6 = Math.max;
var nativeMin4 = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT6);
  }
  wait = toNumber_default(wait) || 0;
  if (isObject_default(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax6(toNumber_default(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result2 = func.apply(thisArg, args);
    return result2;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result2;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin4(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now_default();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result2;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result2 : trailingEdge(now_default());
  }
  function debounced() {
    var time = now_default(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result2;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_default = debounce;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/defaultTo.js
function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value;
}
var defaultTo_default = defaultTo;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/defaults.js
var objectProto21 = Object.prototype;
var hasOwnProperty18 = objectProto21.hasOwnProperty;
var defaults = baseRest_default(function(object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn_default(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq_default(value, objectProto21[key]) && !hasOwnProperty18.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_default = defaults;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_assignMergeValue.js
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq_default(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignMergeValue_default = assignMergeValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isArrayLikeObject.js
function isArrayLikeObject(value) {
  return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default = isArrayLikeObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_safeGet.js
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var safeGet_default = safeGet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toPlainObject.js
function toPlainObject(value) {
  return copyObject_default(value, keysIn_default(value));
}
var toPlainObject_default = toPlainObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseMergeDeep.js
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet_default(object, key), srcValue = safeGet_default(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue_default(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray_default(srcValue), isBuff = !isArr && isBuffer_default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_default(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject_default(objValue)) {
        newValue = copyArray_default(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer_default(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray_default(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject_default(srcValue) || isArguments_default(srcValue)) {
      newValue = objValue;
      if (isArguments_default(objValue)) {
        newValue = toPlainObject_default(objValue);
      } else if (!isObject_default(objValue) || isFunction_default(objValue)) {
        newValue = initCloneObject_default(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue_default(object, key, newValue);
}
var baseMergeDeep_default = baseMergeDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseMerge.js
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor_default(source, function(srcValue, key) {
    stack || (stack = new Stack_default());
    if (isObject_default(srcValue)) {
      baseMergeDeep_default(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet_default(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue_default(object, key, newValue);
    }
  }, keysIn_default);
}
var baseMerge_default = baseMerge;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_customDefaultsMerge.js
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject_default(objValue) && isObject_default(srcValue)) {
    stack.set(srcValue, objValue);
    baseMerge_default(objValue, srcValue, void 0, customDefaultsMerge, stack);
    stack["delete"](srcValue);
  }
  return objValue;
}
var customDefaultsMerge_default = customDefaultsMerge;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/mergeWith.js
var mergeWith = createAssigner_default(function(object, source, srcIndex, customizer) {
  baseMerge_default(object, source, srcIndex, customizer);
});
var mergeWith_default = mergeWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/defaultsDeep.js
var defaultsDeep = baseRest_default(function(args) {
  args.push(void 0, customDefaultsMerge_default);
  return apply_default(mergeWith_default, void 0, args);
});
var defaultsDeep_default = defaultsDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseDelay.js
var FUNC_ERROR_TEXT7 = "Expected a function";
function baseDelay(func, wait, args) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT7);
  }
  return setTimeout(function() {
    func.apply(void 0, args);
  }, wait);
}
var baseDelay_default = baseDelay;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/defer.js
var defer = baseRest_default(function(func, args) {
  return baseDelay_default(func, 1, args);
});
var defer_default = defer;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/delay.js
var delay = baseRest_default(function(func, wait, args) {
  return baseDelay_default(func, toNumber_default(wait) || 0, args);
});
var delay_default = delay;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default = arrayIncludesWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseDifference.js
var LARGE_ARRAY_SIZE2 = 200;
function baseDifference(array, values2, iteratee2, comparator) {
  var index = -1, includes2 = arrayIncludes_default, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
  if (!length) {
    return result2;
  }
  if (iteratee2) {
    values2 = arrayMap_default(values2, baseUnary_default(iteratee2));
  }
  if (comparator) {
    includes2 = arrayIncludesWith_default;
    isCommon = false;
  } else if (values2.length >= LARGE_ARRAY_SIZE2) {
    includes2 = cacheHas_default;
    isCommon = false;
    values2 = new SetCache_default(values2);
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values2[valuesIndex] === computed) {
            continue outer;
          }
        }
        result2.push(value);
      } else if (!includes2(values2, computed, comparator)) {
        result2.push(value);
      }
    }
  return result2;
}
var baseDifference_default = baseDifference;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/difference.js
var difference = baseRest_default(function(array, values2) {
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true)) : [];
});
var difference_default = difference;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_default = last;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/differenceBy.js
var differenceBy = baseRest_default(function(array, values2) {
  var iteratee2 = last_default(values2);
  if (isArrayLikeObject_default(iteratee2)) {
    iteratee2 = void 0;
  }
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true), baseIteratee_default(iteratee2, 2)) : [];
});
var differenceBy_default = differenceBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/differenceWith.js
var differenceWith = baseRest_default(function(array, values2) {
  var comparator = last_default(values2);
  if (isArrayLikeObject_default(comparator)) {
    comparator = void 0;
  }
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true), void 0, comparator) : [];
});
var differenceWith_default = differenceWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/divide.js
var divide = createMathOperation_default(function(dividend, divisor) {
  return dividend / divisor;
}, 1);
var divide_default = divide;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/drop.js
function drop(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  return baseSlice_default(array, n < 0 ? 0 : n, length);
}
var drop_default = drop;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/dropRight.js
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  n = length - n;
  return baseSlice_default(array, 0, n < 0 ? 0 : n);
}
var dropRight_default = dropRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseWhile.js
function baseWhile(array, predicate, isDrop, fromRight) {
  var length = array.length, index = fromRight ? length : -1;
  while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
  }
  return isDrop ? baseSlice_default(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice_default(array, fromRight ? index + 1 : 0, fromRight ? length : index);
}
var baseWhile_default = baseWhile;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/dropRightWhile.js
function dropRightWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3), true, true) : [];
}
var dropRightWhile_default = dropRightWhile;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/dropWhile.js
function dropWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3), true) : [];
}
var dropWhile_default = dropWhile;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_castFunction.js
function castFunction(value) {
  return typeof value == "function" ? value : identity_default;
}
var castFunction_default = castFunction;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/forEach.js
function forEach(collection, iteratee2) {
  var func = isArray_default(collection) ? arrayEach_default : baseEach_default;
  return func(collection, castFunction_default(iteratee2));
}
var forEach_default = forEach;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayEachRight.js
function arrayEachRight(array, iteratee2) {
  var length = array == null ? 0 : array.length;
  while (length--) {
    if (iteratee2(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEachRight_default = arrayEachRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseForRight.js
var baseForRight = createBaseFor_default(true);
var baseForRight_default = baseForRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseForOwnRight.js
function baseForOwnRight(object, iteratee2) {
  return object && baseForRight_default(object, iteratee2, keys_default);
}
var baseForOwnRight_default = baseForOwnRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseEachRight.js
var baseEachRight = createBaseEach_default(baseForOwnRight_default, true);
var baseEachRight_default = baseEachRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/forEachRight.js
function forEachRight(collection, iteratee2) {
  var func = isArray_default(collection) ? arrayEachRight_default : baseEachRight_default;
  return func(collection, castFunction_default(iteratee2));
}
var forEachRight_default = forEachRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/endsWith.js
function endsWith(string, target, position) {
  string = toString_default(string);
  target = baseToString_default(target);
  var length = string.length;
  position = position === void 0 ? length : baseClamp_default(toInteger_default(position), 0, length);
  var end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}
var endsWith_default = endsWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseToPairs.js
function baseToPairs(object, props) {
  return arrayMap_default(props, function(key) {
    return [key, object[key]];
  });
}
var baseToPairs_default = baseToPairs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_setToPairs.js
function setToPairs(set2) {
  var index = -1, result2 = Array(set2.size);
  set2.forEach(function(value) {
    result2[++index] = [value, value];
  });
  return result2;
}
var setToPairs_default = setToPairs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createToPairs.js
var mapTag7 = "[object Map]";
var setTag7 = "[object Set]";
function createToPairs(keysFunc) {
  return function(object) {
    var tag = getTag_default(object);
    if (tag == mapTag7) {
      return mapToArray_default(object);
    }
    if (tag == setTag7) {
      return setToPairs_default(object);
    }
    return baseToPairs_default(object, keysFunc(object));
  };
}
var createToPairs_default = createToPairs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toPairs.js
var toPairs = createToPairs_default(keys_default);
var toPairs_default = toPairs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toPairsIn.js
var toPairsIn = createToPairs_default(keysIn_default);
var toPairsIn_default = toPairsIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_escapeHtmlChar.js
var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var escapeHtmlChar = basePropertyOf_default(htmlEscapes);
var escapeHtmlChar_default = escapeHtmlChar;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/escape.js
var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(string) {
  string = toString_default(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar_default) : string;
}
var escape_default = escape;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/escapeRegExp.js
var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar2.source);
function escapeRegExp(string) {
  string = toString_default(string);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar2, "\\$&") : string;
}
var escapeRegExp_default = escapeRegExp;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayEvery.js
function arrayEvery(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}
var arrayEvery_default = arrayEvery;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseEvery.js
function baseEvery(collection, predicate) {
  var result2 = true;
  baseEach_default(collection, function(value, index, collection2) {
    result2 = !!predicate(value, index, collection2);
    return result2;
  });
  return result2;
}
var baseEvery_default = baseEvery;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/every.js
function every(collection, predicate, guard) {
  var func = isArray_default(collection) ? arrayEvery_default : baseEvery_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var every_default = every;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toLength.js
var MAX_ARRAY_LENGTH2 = 4294967295;
function toLength(value) {
  return value ? baseClamp_default(toInteger_default(value), 0, MAX_ARRAY_LENGTH2) : 0;
}
var toLength_default = toLength;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFill.js
function baseFill(array, value, start, end) {
  var length = array.length;
  start = toInteger_default(start);
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end === void 0 || end > length ? length : toInteger_default(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength_default(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
var baseFill_default = baseFill;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/fill.js
function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != "number" && isIterateeCall_default(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill_default(array, value, start, end);
}
var fill_default = fill;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFilter.js
function baseFilter(collection, predicate) {
  var result2 = [];
  baseEach_default(collection, function(value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result2.push(value);
    }
  });
  return result2;
}
var baseFilter_default = baseFilter;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/filter.js
function filter(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, baseIteratee_default(predicate, 3));
}
var filter_default = filter;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createFind.js
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike_default(collection)) {
      var iteratee2 = baseIteratee_default(predicate, 3);
      collection = keys_default(collection);
      predicate = function(key) {
        return iteratee2(iterable[key], key, iterable);
      };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee2 ? collection[index] : index] : void 0;
  };
}
var createFind_default = createFind;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/findIndex.js
var nativeMax7 = Math.max;
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax7(length + index, 0);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index);
}
var findIndex_default = findIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/find.js
var find = createFind_default(findIndex_default);
var find_default = find;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFindKey.js
function baseFindKey(collection, predicate, eachFunc) {
  var result2;
  eachFunc(collection, function(value, key, collection2) {
    if (predicate(value, key, collection2)) {
      result2 = key;
      return false;
    }
  });
  return result2;
}
var baseFindKey_default = baseFindKey;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/findKey.js
function findKey(object, predicate) {
  return baseFindKey_default(object, baseIteratee_default(predicate, 3), baseForOwn_default);
}
var findKey_default = findKey;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/findLastIndex.js
var nativeMax8 = Math.max;
var nativeMin5 = Math.min;
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== void 0) {
    index = toInteger_default(fromIndex);
    index = fromIndex < 0 ? nativeMax8(length + index, 0) : nativeMin5(index, length - 1);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index, true);
}
var findLastIndex_default = findLastIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/findLast.js
var findLast = createFind_default(findLastIndex_default);
var findLast_default = findLast;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/findLastKey.js
function findLastKey(object, predicate) {
  return baseFindKey_default(object, baseIteratee_default(predicate, 3), baseForOwnRight_default);
}
var findLastKey_default = findLastKey;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/head.js
function head(array) {
  return array && array.length ? array[0] : void 0;
}
var head_default = head;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee2) {
  var index = -1, result2 = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value, key, collection2) {
    result2[++index] = iteratee2(value, key, collection2);
  });
  return result2;
}
var baseMap_default = baseMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/map.js
function map(collection, iteratee2) {
  var func = isArray_default(collection) ? arrayMap_default : baseMap_default;
  return func(collection, baseIteratee_default(iteratee2, 3));
}
var map_default = map;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flatMap.js
function flatMap(collection, iteratee2) {
  return baseFlatten_default(map_default(collection, iteratee2), 1);
}
var flatMap_default = flatMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flatMapDeep.js
var INFINITY4 = 1 / 0;
function flatMapDeep(collection, iteratee2) {
  return baseFlatten_default(map_default(collection, iteratee2), INFINITY4);
}
var flatMapDeep_default = flatMapDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flatMapDepth.js
function flatMapDepth(collection, iteratee2, depth) {
  depth = depth === void 0 ? 1 : toInteger_default(depth);
  return baseFlatten_default(map_default(collection, iteratee2), depth);
}
var flatMapDepth_default = flatMapDepth;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flattenDeep.js
var INFINITY5 = 1 / 0;
function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, INFINITY5) : [];
}
var flattenDeep_default = flattenDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flattenDepth.js
function flattenDepth(array, depth) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  depth = depth === void 0 ? 1 : toInteger_default(depth);
  return baseFlatten_default(array, depth);
}
var flattenDepth_default = flattenDepth;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flip.js
var WRAP_FLIP_FLAG3 = 512;
function flip(func) {
  return createWrap_default(func, WRAP_FLIP_FLAG3);
}
var flip_default = flip;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/floor.js
var floor = createRound_default("floor");
var floor_default = floor;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createFlow.js
var FUNC_ERROR_TEXT8 = "Expected a function";
var WRAP_CURRY_FLAG7 = 8;
var WRAP_PARTIAL_FLAG6 = 32;
var WRAP_ARY_FLAG5 = 128;
var WRAP_REARG_FLAG3 = 256;
function createFlow(fromRight) {
  return flatRest_default(function(funcs) {
    var length = funcs.length, index = length, prereq = LodashWrapper_default.prototype.thru;
    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      var func = funcs[index];
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT8);
      }
      if (prereq && !wrapper && getFuncName_default(func) == "wrapper") {
        var wrapper = new LodashWrapper_default([], true);
      }
    }
    index = wrapper ? index : length;
    while (++index < length) {
      func = funcs[index];
      var funcName = getFuncName_default(func), data = funcName == "wrapper" ? getData_default(func) : void 0;
      if (data && isLaziable_default(data[0]) && data[1] == (WRAP_ARY_FLAG5 | WRAP_CURRY_FLAG7 | WRAP_PARTIAL_FLAG6 | WRAP_REARG_FLAG3) && !data[4].length && data[9] == 1) {
        wrapper = wrapper[getFuncName_default(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = func.length == 1 && isLaziable_default(func) ? wrapper[funcName]() : wrapper.thru(func);
      }
    }
    return function() {
      var args = arguments, value = args[0];
      if (wrapper && args.length == 1 && isArray_default(value)) {
        return wrapper.plant(value).value();
      }
      var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
      while (++index2 < length) {
        result2 = funcs[index2].call(this, result2);
      }
      return result2;
    };
  });
}
var createFlow_default = createFlow;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flow.js
var flow = createFlow_default();
var flow_default = flow;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/flowRight.js
var flowRight = createFlow_default(true);
var flowRight_default = flowRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/forIn.js
function forIn(object, iteratee2) {
  return object == null ? object : baseFor_default(object, castFunction_default(iteratee2), keysIn_default);
}
var forIn_default = forIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/forInRight.js
function forInRight(object, iteratee2) {
  return object == null ? object : baseForRight_default(object, castFunction_default(iteratee2), keysIn_default);
}
var forInRight_default = forInRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/forOwn.js
function forOwn(object, iteratee2) {
  return object && baseForOwn_default(object, castFunction_default(iteratee2));
}
var forOwn_default = forOwn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/forOwnRight.js
function forOwnRight(object, iteratee2) {
  return object && baseForOwnRight_default(object, castFunction_default(iteratee2));
}
var forOwnRight_default = forOwnRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/fromPairs.js
function fromPairs(pairs) {
  var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
  while (++index < length) {
    var pair = pairs[index];
    result2[pair[0]] = pair[1];
  }
  return result2;
}
var fromPairs_default = fromPairs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseFunctions.js
function baseFunctions(object, props) {
  return arrayFilter_default(props, function(key) {
    return isFunction_default(object[key]);
  });
}
var baseFunctions_default = baseFunctions;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/functions.js
function functions(object) {
  return object == null ? [] : baseFunctions_default(object, keys_default(object));
}
var functions_default = functions;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/functionsIn.js
function functionsIn(object) {
  return object == null ? [] : baseFunctions_default(object, keysIn_default(object));
}
var functionsIn_default = functionsIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/groupBy.js
var objectProto22 = Object.prototype;
var hasOwnProperty19 = objectProto22.hasOwnProperty;
var groupBy = createAggregator_default(function(result2, value, key) {
  if (hasOwnProperty19.call(result2, key)) {
    result2[key].push(value);
  } else {
    baseAssignValue_default(result2, key, [value]);
  }
});
var groupBy_default = groupBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseGt.js
function baseGt(value, other) {
  return value > other;
}
var baseGt_default = baseGt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createRelationalOperation.js
function createRelationalOperation(operator) {
  return function(value, other) {
    if (!(typeof value == "string" && typeof other == "string")) {
      value = toNumber_default(value);
      other = toNumber_default(other);
    }
    return operator(value, other);
  };
}
var createRelationalOperation_default = createRelationalOperation;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/gt.js
var gt = createRelationalOperation_default(baseGt_default);
var gt_default = gt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/gte.js
var gte = createRelationalOperation_default(function(value, other) {
  return value >= other;
});
var gte_default = gte;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseHas.js
var objectProto23 = Object.prototype;
var hasOwnProperty20 = objectProto23.hasOwnProperty;
function baseHas(object, key) {
  return object != null && hasOwnProperty20.call(object, key);
}
var baseHas_default = baseHas;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/has.js
function has(object, path) {
  return object != null && hasPath_default(object, path, baseHas_default);
}
var has_default = has;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseInRange.js
var nativeMax9 = Math.max;
var nativeMin6 = Math.min;
function baseInRange(number, start, end) {
  return number >= nativeMin6(start, end) && number < nativeMax9(start, end);
}
var baseInRange_default = baseInRange;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/inRange.js
function inRange(number, start, end) {
  start = toFinite_default(start);
  if (end === void 0) {
    end = start;
    start = 0;
  } else {
    end = toFinite_default(end);
  }
  number = toNumber_default(number);
  return baseInRange_default(number, start, end);
}
var inRange_default = inRange;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isString.js
var stringTag5 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && baseGetTag_default(value) == stringTag5;
}
var isString_default = isString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseValues.js
function baseValues(object, props) {
  return arrayMap_default(props, function(key) {
    return object[key];
  });
}
var baseValues_default = baseValues;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/values.js
function values(object) {
  return object == null ? [] : baseValues_default(object, keys_default(object));
}
var values_default = values;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/includes.js
var nativeMax10 = Math.max;
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike_default(collection) ? collection : values_default(collection);
  fromIndex = fromIndex && !guard ? toInteger_default(fromIndex) : 0;
  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax10(length + fromIndex, 0);
  }
  return isString_default(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf_default(collection, value, fromIndex) > -1;
}
var includes_default = includes;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/indexOf.js
var nativeMax11 = Math.max;
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax11(length + index, 0);
  }
  return baseIndexOf_default(array, value, index);
}
var indexOf_default = indexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/initial.js
function initial(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice_default(array, 0, -1) : [];
}
var initial_default = initial;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIntersection.js
var nativeMin7 = Math.min;
function baseIntersection(arrays, iteratee2, comparator) {
  var includes2 = comparator ? arrayIncludesWith_default : arrayIncludes_default, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result2 = [];
  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee2) {
      array = arrayMap_default(array, baseUnary_default(iteratee2));
    }
    maxLength = nativeMin7(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache_default(othIndex && array) : void 0;
  }
  array = arrays[0];
  var index = -1, seen = caches[0];
  outer:
    while (++index < length && result2.length < maxLength) {
      var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (!(seen ? cacheHas_default(seen, computed) : includes2(result2, computed, comparator))) {
        othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if (!(cache ? cacheHas_default(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(computed);
        }
        result2.push(value);
      }
    }
  return result2;
}
var baseIntersection_default = baseIntersection;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_castArrayLikeObject.js
function castArrayLikeObject(value) {
  return isArrayLikeObject_default(value) ? value : [];
}
var castArrayLikeObject_default = castArrayLikeObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/intersection.js
var intersection = baseRest_default(function(arrays) {
  var mapped = arrayMap_default(arrays, castArrayLikeObject_default);
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection_default(mapped) : [];
});
var intersection_default = intersection;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/intersectionBy.js
var intersectionBy = baseRest_default(function(arrays) {
  var iteratee2 = last_default(arrays), mapped = arrayMap_default(arrays, castArrayLikeObject_default);
  if (iteratee2 === last_default(mapped)) {
    iteratee2 = void 0;
  } else {
    mapped.pop();
  }
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection_default(mapped, baseIteratee_default(iteratee2, 2)) : [];
});
var intersectionBy_default = intersectionBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/intersectionWith.js
var intersectionWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays), mapped = arrayMap_default(arrays, castArrayLikeObject_default);
  comparator = typeof comparator == "function" ? comparator : void 0;
  if (comparator) {
    mapped.pop();
  }
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection_default(mapped, void 0, comparator) : [];
});
var intersectionWith_default = intersectionWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseInverter.js
function baseInverter(object, setter, iteratee2, accumulator) {
  baseForOwn_default(object, function(value, key, object2) {
    setter(accumulator, iteratee2(value), key, object2);
  });
  return accumulator;
}
var baseInverter_default = baseInverter;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createInverter.js
function createInverter(setter, toIteratee) {
  return function(object, iteratee2) {
    return baseInverter_default(object, setter, toIteratee(iteratee2), {});
  };
}
var createInverter_default = createInverter;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/invert.js
var objectProto24 = Object.prototype;
var nativeObjectToString3 = objectProto24.toString;
var invert = createInverter_default(function(result2, value, key) {
  if (value != null && typeof value.toString != "function") {
    value = nativeObjectToString3.call(value);
  }
  result2[value] = key;
}, constant_default(identity_default));
var invert_default = invert;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/invertBy.js
var objectProto25 = Object.prototype;
var hasOwnProperty21 = objectProto25.hasOwnProperty;
var nativeObjectToString4 = objectProto25.toString;
var invertBy = createInverter_default(function(result2, value, key) {
  if (value != null && typeof value.toString != "function") {
    value = nativeObjectToString4.call(value);
  }
  if (hasOwnProperty21.call(result2, value)) {
    result2[value].push(key);
  } else {
    result2[value] = [key];
  }
}, baseIteratee_default);
var invertBy_default = invertBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_parent.js
function parent(object, path) {
  return path.length < 2 ? object : baseGet_default(object, baseSlice_default(path, 0, -1));
}
var parent_default = parent;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseInvoke.js
function baseInvoke(object, path, args) {
  path = castPath_default(path, object);
  object = parent_default(object, path);
  var func = object == null ? object : object[toKey_default(last_default(path))];
  return func == null ? void 0 : apply_default(func, object, args);
}
var baseInvoke_default = baseInvoke;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/invoke.js
var invoke = baseRest_default(baseInvoke_default);
var invoke_default = invoke;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/invokeMap.js
var invokeMap = baseRest_default(function(collection, path, args) {
  var index = -1, isFunc = typeof path == "function", result2 = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value) {
    result2[++index] = isFunc ? apply_default(path, value, args) : baseInvoke_default(value, path, args);
  });
  return result2;
});
var invokeMap_default = invokeMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsArrayBuffer.js
var arrayBufferTag5 = "[object ArrayBuffer]";
function baseIsArrayBuffer(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == arrayBufferTag5;
}
var baseIsArrayBuffer_default = baseIsArrayBuffer;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isArrayBuffer.js
var nodeIsArrayBuffer = nodeUtil_default && nodeUtil_default.isArrayBuffer;
var isArrayBuffer = nodeIsArrayBuffer ? baseUnary_default(nodeIsArrayBuffer) : baseIsArrayBuffer_default;
var isArrayBuffer_default = isArrayBuffer;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isBoolean.js
var boolTag5 = "[object Boolean]";
function isBoolean(value) {
  return value === true || value === false || isObjectLike_default(value) && baseGetTag_default(value) == boolTag5;
}
var isBoolean_default = isBoolean;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsDate.js
var dateTag5 = "[object Date]";
function baseIsDate(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == dateTag5;
}
var baseIsDate_default = baseIsDate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isDate.js
var nodeIsDate = nodeUtil_default && nodeUtil_default.isDate;
var isDate = nodeIsDate ? baseUnary_default(nodeIsDate) : baseIsDate_default;
var isDate_default = isDate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isElement.js
function isElement(value) {
  return isObjectLike_default(value) && value.nodeType === 1 && !isPlainObject_default(value);
}
var isElement_default = isElement;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isEmpty.js
var mapTag8 = "[object Map]";
var setTag8 = "[object Set]";
var objectProto26 = Object.prototype;
var hasOwnProperty22 = objectProto26.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_default(value) && (isArray_default(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer_default(value) || isTypedArray_default(value) || isArguments_default(value))) {
    return !value.length;
  }
  var tag = getTag_default(value);
  if (tag == mapTag8 || tag == setTag8) {
    return !value.size;
  }
  if (isPrototype_default(value)) {
    return !baseKeys_default(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty22.call(value, key)) {
      return false;
    }
  }
  return true;
}
var isEmpty_default = isEmpty;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isEqualWith.js
function isEqualWith(value, other, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  var result2 = customizer ? customizer(value, other) : void 0;
  return result2 === void 0 ? baseIsEqual_default(value, other, void 0, customizer) : !!result2;
}
var isEqualWith_default = isEqualWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isFinite.js
var nativeIsFinite2 = root_default.isFinite;
function isFinite(value) {
  return typeof value == "number" && nativeIsFinite2(value);
}
var isFinite_default = isFinite;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isInteger.js
function isInteger(value) {
  return typeof value == "number" && value == toInteger_default(value);
}
var isInteger_default = isInteger;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isMatch.js
function isMatch(object, source) {
  return object === source || baseIsMatch_default(object, source, getMatchData_default(source));
}
var isMatch_default = isMatch;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isMatchWith.js
function isMatchWith(object, source, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return baseIsMatch_default(object, source, getMatchData_default(source), customizer);
}
var isMatchWith_default = isMatchWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isNumber.js
var numberTag5 = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike_default(value) && baseGetTag_default(value) == numberTag5;
}
var isNumber_default = isNumber;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isNaN.js
function isNaN2(value) {
  return isNumber_default(value) && value != +value;
}
var isNaN_default = isNaN2;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_isMaskable.js
var isMaskable = coreJsData_default ? isFunction_default : stubFalse_default;
var isMaskable_default = isMaskable;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isNative.js
var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.";
function isNative(value) {
  if (isMaskable_default(value)) {
    throw new Error(CORE_ERROR_TEXT);
  }
  return baseIsNative_default(value);
}
var isNative_default = isNative;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isNil.js
function isNil(value) {
  return value == null;
}
var isNil_default = isNil;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isNull.js
function isNull(value) {
  return value === null;
}
var isNull_default = isNull;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIsRegExp.js
var regexpTag5 = "[object RegExp]";
function baseIsRegExp(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == regexpTag5;
}
var baseIsRegExp_default = baseIsRegExp;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isRegExp.js
var nodeIsRegExp = nodeUtil_default && nodeUtil_default.isRegExp;
var isRegExp = nodeIsRegExp ? baseUnary_default(nodeIsRegExp) : baseIsRegExp_default;
var isRegExp_default = isRegExp;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isSafeInteger.js
var MAX_SAFE_INTEGER3 = 9007199254740991;
function isSafeInteger(value) {
  return isInteger_default(value) && value >= -MAX_SAFE_INTEGER3 && value <= MAX_SAFE_INTEGER3;
}
var isSafeInteger_default = isSafeInteger;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isUndefined.js
function isUndefined(value) {
  return value === void 0;
}
var isUndefined_default = isUndefined;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isWeakMap.js
var weakMapTag4 = "[object WeakMap]";
function isWeakMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == weakMapTag4;
}
var isWeakMap_default = isWeakMap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/isWeakSet.js
var weakSetTag = "[object WeakSet]";
function isWeakSet(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == weakSetTag;
}
var isWeakSet_default = isWeakSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/iteratee.js
var CLONE_DEEP_FLAG5 = 1;
function iteratee(func) {
  return baseIteratee_default(typeof func == "function" ? func : baseClone_default(func, CLONE_DEEP_FLAG5));
}
var iteratee_default = iteratee;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/join.js
var arrayProto2 = Array.prototype;
var nativeJoin = arrayProto2.join;
function join(array, separator) {
  return array == null ? "" : nativeJoin.call(array, separator);
}
var join_default = join;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/kebabCase.js
var kebabCase = createCompounder_default(function(result2, word, index) {
  return result2 + (index ? "-" : "") + word.toLowerCase();
});
var kebabCase_default = kebabCase;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/keyBy.js
var keyBy = createAggregator_default(function(result2, value, key) {
  baseAssignValue_default(result2, key, value);
});
var keyBy_default = keyBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_strictLastIndexOf.js
function strictLastIndexOf(array, value, fromIndex) {
  var index = fromIndex + 1;
  while (index--) {
    if (array[index] === value) {
      return index;
    }
  }
  return index;
}
var strictLastIndexOf_default = strictLastIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lastIndexOf.js
var nativeMax12 = Math.max;
var nativeMin8 = Math.min;
function lastIndexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length;
  if (fromIndex !== void 0) {
    index = toInteger_default(fromIndex);
    index = index < 0 ? nativeMax12(length + index, 0) : nativeMin8(index, length - 1);
  }
  return value === value ? strictLastIndexOf_default(array, value, index) : baseFindIndex_default(array, baseIsNaN_default, index, true);
}
var lastIndexOf_default = lastIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lowerCase.js
var lowerCase = createCompounder_default(function(result2, word, index) {
  return result2 + (index ? " " : "") + word.toLowerCase();
});
var lowerCase_default = lowerCase;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lowerFirst.js
var lowerFirst = createCaseFirst_default("toLowerCase");
var lowerFirst_default = lowerFirst;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseLt.js
function baseLt(value, other) {
  return value < other;
}
var baseLt_default = baseLt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lt.js
var lt = createRelationalOperation_default(baseLt_default);
var lt_default = lt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lte.js
var lte = createRelationalOperation_default(function(value, other) {
  return value <= other;
});
var lte_default = lte;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/mapKeys.js
function mapKeys(object, iteratee2) {
  var result2 = {};
  iteratee2 = baseIteratee_default(iteratee2, 3);
  baseForOwn_default(object, function(value, key, object2) {
    baseAssignValue_default(result2, iteratee2(value, key, object2), value);
  });
  return result2;
}
var mapKeys_default = mapKeys;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/mapValues.js
function mapValues(object, iteratee2) {
  var result2 = {};
  iteratee2 = baseIteratee_default(iteratee2, 3);
  baseForOwn_default(object, function(value, key, object2) {
    baseAssignValue_default(result2, key, iteratee2(value, key, object2));
  });
  return result2;
}
var mapValues_default = mapValues;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/matches.js
var CLONE_DEEP_FLAG6 = 1;
function matches(source) {
  return baseMatches_default(baseClone_default(source, CLONE_DEEP_FLAG6));
}
var matches_default = matches;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/matchesProperty.js
var CLONE_DEEP_FLAG7 = 1;
function matchesProperty(path, srcValue) {
  return baseMatchesProperty_default(path, baseClone_default(srcValue, CLONE_DEEP_FLAG7));
}
var matchesProperty_default = matchesProperty;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseExtremum.js
function baseExtremum(array, iteratee2, comparator) {
  var index = -1, length = array.length;
  while (++index < length) {
    var value = array[index], current = iteratee2(value);
    if (current != null && (computed === void 0 ? current === current && !isSymbol_default(current) : comparator(current, computed))) {
      var computed = current, result2 = value;
    }
  }
  return result2;
}
var baseExtremum_default = baseExtremum;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/max.js
function max(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseGt_default) : void 0;
}
var max_default = max;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/maxBy.js
function maxBy(array, iteratee2) {
  return array && array.length ? baseExtremum_default(array, baseIteratee_default(iteratee2, 2), baseGt_default) : void 0;
}
var maxBy_default = maxBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSum.js
function baseSum(array, iteratee2) {
  var result2, index = -1, length = array.length;
  while (++index < length) {
    var current = iteratee2(array[index]);
    if (current !== void 0) {
      result2 = result2 === void 0 ? current : result2 + current;
    }
  }
  return result2;
}
var baseSum_default = baseSum;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseMean.js
var NAN3 = 0 / 0;
function baseMean(array, iteratee2) {
  var length = array == null ? 0 : array.length;
  return length ? baseSum_default(array, iteratee2) / length : NAN3;
}
var baseMean_default = baseMean;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/mean.js
function mean(array) {
  return baseMean_default(array, identity_default);
}
var mean_default = mean;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/meanBy.js
function meanBy(array, iteratee2) {
  return baseMean_default(array, baseIteratee_default(iteratee2, 2));
}
var meanBy_default = meanBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/merge.js
var merge = createAssigner_default(function(object, source, srcIndex) {
  baseMerge_default(object, source, srcIndex);
});
var merge_default = merge;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/method.js
var method = baseRest_default(function(path, args) {
  return function(object) {
    return baseInvoke_default(object, path, args);
  };
});
var method_default = method;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/methodOf.js
var methodOf = baseRest_default(function(object, args) {
  return function(path) {
    return baseInvoke_default(object, path, args);
  };
});
var methodOf_default = methodOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/min.js
function min(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseLt_default) : void 0;
}
var min_default = min;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/minBy.js
function minBy(array, iteratee2) {
  return array && array.length ? baseExtremum_default(array, baseIteratee_default(iteratee2, 2), baseLt_default) : void 0;
}
var minBy_default = minBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/mixin.js
function mixin(object, source, options) {
  var props = keys_default(source), methodNames = baseFunctions_default(source, props);
  var chain2 = !(isObject_default(options) && "chain" in options) || !!options.chain, isFunc = isFunction_default(object);
  arrayEach_default(methodNames, function(methodName) {
    var func = source[methodName];
    object[methodName] = func;
    if (isFunc) {
      object.prototype[methodName] = function() {
        var chainAll = this.__chain__;
        if (chain2 || chainAll) {
          var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray_default(this.__actions__);
          actions.push({ "func": func, "args": arguments, "thisArg": object });
          result2.__chain__ = chainAll;
          return result2;
        }
        return func.apply(object, arrayPush_default([this.value()], arguments));
      };
    }
  });
  return object;
}
var mixin_default = mixin;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/multiply.js
var multiply = createMathOperation_default(function(multiplier, multiplicand) {
  return multiplier * multiplicand;
}, 1);
var multiply_default = multiply;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/negate.js
var FUNC_ERROR_TEXT9 = "Expected a function";
function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT9);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args[0]);
      case 2:
        return !predicate.call(this, args[0], args[1]);
      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}
var negate_default = negate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_iteratorToArray.js
function iteratorToArray(iterator) {
  var data, result2 = [];
  while (!(data = iterator.next()).done) {
    result2.push(data.value);
  }
  return result2;
}
var iteratorToArray_default = iteratorToArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toArray.js
var mapTag9 = "[object Map]";
var setTag9 = "[object Set]";
var symIterator = Symbol_default ? Symbol_default.iterator : void 0;
function toArray(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike_default(value)) {
    return isString_default(value) ? stringToArray_default(value) : copyArray_default(value);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray_default(value[symIterator]());
  }
  var tag = getTag_default(value), func = tag == mapTag9 ? mapToArray_default : tag == setTag9 ? setToArray_default : values_default;
  return func(value);
}
var toArray_default = toArray;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/next.js
function wrapperNext() {
  if (this.__values__ === void 0) {
    this.__values__ = toArray_default(this.value());
  }
  var done = this.__index__ >= this.__values__.length, value = done ? void 0 : this.__values__[this.__index__++];
  return { "done": done, "value": value };
}
var next_default = wrapperNext;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseNth.js
function baseNth(array, n) {
  var length = array.length;
  if (!length) {
    return;
  }
  n += n < 0 ? length : 0;
  return isIndex_default(n, length) ? array[n] : void 0;
}
var baseNth_default = baseNth;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/nth.js
function nth(array, n) {
  return array && array.length ? baseNth_default(array, toInteger_default(n)) : void 0;
}
var nth_default = nth;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/nthArg.js
function nthArg(n) {
  n = toInteger_default(n);
  return baseRest_default(function(args) {
    return baseNth_default(args, n);
  });
}
var nthArg_default = nthArg;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseUnset.js
var objectProto27 = Object.prototype;
var hasOwnProperty23 = objectProto27.hasOwnProperty;
function baseUnset(object, path) {
  path = castPath_default(path, object);
  var index = -1, length = path.length;
  if (!length) {
    return true;
  }
  var isRootPrimitive = object == null || typeof object !== "object" && typeof object !== "function";
  while (++index < length) {
    var key = path[index];
    if (typeof key !== "string") {
      continue;
    }
    if (key === "__proto__" && !hasOwnProperty23.call(object, "__proto__")) {
      return false;
    }
    if (key === "constructor" && index + 1 < length && typeof path[index + 1] === "string" && path[index + 1] === "prototype") {
      if (isRootPrimitive && index === 0) {
        continue;
      }
      return false;
    }
  }
  var obj = parent_default(object, path);
  return obj == null || delete obj[toKey_default(last_default(path))];
}
var baseUnset_default = baseUnset;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_customOmitClone.js
function customOmitClone(value) {
  return isPlainObject_default(value) ? void 0 : value;
}
var customOmitClone_default = customOmitClone;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/omit.js
var CLONE_DEEP_FLAG8 = 1;
var CLONE_FLAT_FLAG2 = 2;
var CLONE_SYMBOLS_FLAG6 = 4;
var omit = flatRest_default(function(object, paths) {
  var result2 = {};
  if (object == null) {
    return result2;
  }
  var isDeep = false;
  paths = arrayMap_default(paths, function(path) {
    path = castPath_default(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject_default(object, getAllKeysIn_default(object), result2);
  if (isDeep) {
    result2 = baseClone_default(result2, CLONE_DEEP_FLAG8 | CLONE_FLAT_FLAG2 | CLONE_SYMBOLS_FLAG6, customOmitClone_default);
  }
  var length = paths.length;
  while (length--) {
    baseUnset_default(result2, paths[length]);
  }
  return result2;
});
var omit_default = omit;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSet.js
function baseSet(object, path, value, customizer) {
  if (!isObject_default(object)) {
    return object;
  }
  path = castPath_default(path, object);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = toKey_default(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject_default(objValue) ? objValue : isIndex_default(path[index + 1]) ? [] : {};
      }
    }
    assignValue_default(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var baseSet_default = baseSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_basePickBy.js
function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result2 = {};
  while (++index < length) {
    var path = paths[index], value = baseGet_default(object, path);
    if (predicate(value, path)) {
      baseSet_default(result2, castPath_default(path, object), value);
    }
  }
  return result2;
}
var basePickBy_default = basePickBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pickBy.js
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap_default(getAllKeysIn_default(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee_default(predicate);
  return basePickBy_default(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
var pickBy_default = pickBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/omitBy.js
function omitBy(object, predicate) {
  return pickBy_default(object, negate_default(baseIteratee_default(predicate)));
}
var omitBy_default = omitBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/once.js
function once(func) {
  return before_default(2, func);
}
var once_default = once;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSortBy.js
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}
var baseSortBy_default = baseSortBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_compareAscending.js
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol_default(value);
    var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol_default(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
var compareAscending_default = compareAscending;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_compareMultiple.js
function compareMultiple(object, other, orders) {
  var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
  while (++index < length) {
    var result2 = compareAscending_default(objCriteria[index], othCriteria[index]);
    if (result2) {
      if (index >= ordersLength) {
        return result2;
      }
      var order = orders[index];
      return result2 * (order == "desc" ? -1 : 1);
    }
  }
  return object.index - other.index;
}
var compareMultiple_default = compareMultiple;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseOrderBy.js
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap_default(iteratees, function(iteratee2) {
      if (isArray_default(iteratee2)) {
        return function(value) {
          return baseGet_default(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
        };
      }
      return iteratee2;
    });
  } else {
    iteratees = [identity_default];
  }
  var index = -1;
  iteratees = arrayMap_default(iteratees, baseUnary_default(baseIteratee_default));
  var result2 = baseMap_default(collection, function(value, key, collection2) {
    var criteria = arrayMap_default(iteratees, function(iteratee2) {
      return iteratee2(value);
    });
    return { "criteria": criteria, "index": ++index, "value": value };
  });
  return baseSortBy_default(result2, function(object, other) {
    return compareMultiple_default(object, other, orders);
  });
}
var baseOrderBy_default = baseOrderBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/orderBy.js
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray_default(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? void 0 : orders;
  if (!isArray_default(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy_default(collection, iteratees, orders);
}
var orderBy_default = orderBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createOver.js
function createOver(arrayFunc) {
  return flatRest_default(function(iteratees) {
    iteratees = arrayMap_default(iteratees, baseUnary_default(baseIteratee_default));
    return baseRest_default(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee2) {
        return apply_default(iteratee2, thisArg, args);
      });
    });
  });
}
var createOver_default = createOver;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/over.js
var over = createOver_default(arrayMap_default);
var over_default = over;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_castRest.js
var castRest = baseRest_default;
var castRest_default = castRest;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/overArgs.js
var nativeMin9 = Math.min;
var overArgs = castRest_default(function(func, transforms) {
  transforms = transforms.length == 1 && isArray_default(transforms[0]) ? arrayMap_default(transforms[0], baseUnary_default(baseIteratee_default)) : arrayMap_default(baseFlatten_default(transforms, 1), baseUnary_default(baseIteratee_default));
  var funcsLength = transforms.length;
  return baseRest_default(function(args) {
    var index = -1, length = nativeMin9(args.length, funcsLength);
    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }
    return apply_default(func, this, args);
  });
});
var overArgs_default = overArgs;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/overEvery.js
var overEvery = createOver_default(arrayEvery_default);
var overEvery_default = overEvery;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/overSome.js
var overSome = createOver_default(arraySome_default);
var overSome_default = overSome;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseRepeat.js
var MAX_SAFE_INTEGER4 = 9007199254740991;
var nativeFloor = Math.floor;
function baseRepeat(string, n) {
  var result2 = "";
  if (!string || n < 1 || n > MAX_SAFE_INTEGER4) {
    return result2;
  }
  do {
    if (n % 2) {
      result2 += string;
    }
    n = nativeFloor(n / 2);
    if (n) {
      string += string;
    }
  } while (n);
  return result2;
}
var baseRepeat_default = baseRepeat;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_asciiSize.js
var asciiSize = baseProperty_default("length");
var asciiSize_default = asciiSize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_unicodeSize.js
var rsAstralRange4 = "\\ud800-\\udfff";
var rsComboMarksRange5 = "\\u0300-\\u036f";
var reComboHalfMarksRange5 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange5 = "\\u20d0-\\u20ff";
var rsComboRange5 = rsComboMarksRange5 + reComboHalfMarksRange5 + rsComboSymbolsRange5;
var rsVarRange4 = "\\ufe0e\\ufe0f";
var rsAstral2 = "[" + rsAstralRange4 + "]";
var rsCombo4 = "[" + rsComboRange5 + "]";
var rsFitz3 = "\\ud83c[\\udffb-\\udfff]";
var rsModifier3 = "(?:" + rsCombo4 + "|" + rsFitz3 + ")";
var rsNonAstral3 = "[^" + rsAstralRange4 + "]";
var rsRegional3 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair3 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ4 = "\\u200d";
var reOptMod3 = rsModifier3 + "?";
var rsOptVar3 = "[" + rsVarRange4 + "]?";
var rsOptJoin3 = "(?:" + rsZWJ4 + "(?:" + [rsNonAstral3, rsRegional3, rsSurrPair3].join("|") + ")" + rsOptVar3 + reOptMod3 + ")*";
var rsSeq3 = rsOptVar3 + reOptMod3 + rsOptJoin3;
var rsSymbol2 = "(?:" + [rsNonAstral3 + rsCombo4 + "?", rsCombo4, rsRegional3, rsSurrPair3, rsAstral2].join("|") + ")";
var reUnicode2 = RegExp(rsFitz3 + "(?=" + rsFitz3 + ")|" + rsSymbol2 + rsSeq3, "g");
function unicodeSize(string) {
  var result2 = reUnicode2.lastIndex = 0;
  while (reUnicode2.test(string)) {
    ++result2;
  }
  return result2;
}
var unicodeSize_default = unicodeSize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_stringSize.js
function stringSize(string) {
  return hasUnicode_default(string) ? unicodeSize_default(string) : asciiSize_default(string);
}
var stringSize_default = stringSize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createPadding.js
var nativeCeil2 = Math.ceil;
function createPadding(length, chars) {
  chars = chars === void 0 ? " " : baseToString_default(chars);
  var charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat_default(chars, length) : chars;
  }
  var result2 = baseRepeat_default(chars, nativeCeil2(length / stringSize_default(chars)));
  return hasUnicode_default(chars) ? castSlice_default(stringToArray_default(result2), 0, length).join("") : result2.slice(0, length);
}
var createPadding_default = createPadding;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pad.js
var nativeCeil3 = Math.ceil;
var nativeFloor2 = Math.floor;
function pad(string, length, chars) {
  string = toString_default(string);
  length = toInteger_default(length);
  var strLength = length ? stringSize_default(string) : 0;
  if (!length || strLength >= length) {
    return string;
  }
  var mid = (length - strLength) / 2;
  return createPadding_default(nativeFloor2(mid), chars) + string + createPadding_default(nativeCeil3(mid), chars);
}
var pad_default = pad;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/padEnd.js
function padEnd(string, length, chars) {
  string = toString_default(string);
  length = toInteger_default(length);
  var strLength = length ? stringSize_default(string) : 0;
  return length && strLength < length ? string + createPadding_default(length - strLength, chars) : string;
}
var padEnd_default = padEnd;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/padStart.js
function padStart(string, length, chars) {
  string = toString_default(string);
  length = toInteger_default(length);
  var strLength = length ? stringSize_default(string) : 0;
  return length && strLength < length ? createPadding_default(length - strLength, chars) + string : string;
}
var padStart_default = padStart;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/parseInt.js
var reTrimStart2 = /^\s+/;
var nativeParseInt = root_default.parseInt;
function parseInt2(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }
  return nativeParseInt(toString_default(string).replace(reTrimStart2, ""), radix || 0);
}
var parseInt_default = parseInt2;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/partial.js
var WRAP_PARTIAL_FLAG7 = 32;
var partial = baseRest_default(function(func, partials) {
  var holders = replaceHolders_default(partials, getHolder_default(partial));
  return createWrap_default(func, WRAP_PARTIAL_FLAG7, void 0, partials, holders);
});
partial.placeholder = {};
var partial_default = partial;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/partialRight.js
var WRAP_PARTIAL_RIGHT_FLAG4 = 64;
var partialRight = baseRest_default(function(func, partials) {
  var holders = replaceHolders_default(partials, getHolder_default(partialRight));
  return createWrap_default(func, WRAP_PARTIAL_RIGHT_FLAG4, void 0, partials, holders);
});
partialRight.placeholder = {};
var partialRight_default = partialRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/partition.js
var partition = createAggregator_default(function(result2, value, key) {
  result2[key ? 0 : 1].push(value);
}, function() {
  return [[], []];
});
var partition_default = partition;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_basePick.js
function basePick(object, paths) {
  return basePickBy_default(object, paths, function(value, path) {
    return hasIn_default(object, path);
  });
}
var basePick_default = basePick;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pick.js
var pick = flatRest_default(function(object, paths) {
  return object == null ? {} : basePick_default(object, paths);
});
var pick_default = pick;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/plant.js
function wrapperPlant(value) {
  var result2, parent2 = this;
  while (parent2 instanceof baseLodash_default) {
    var clone2 = wrapperClone_default(parent2);
    clone2.__index__ = 0;
    clone2.__values__ = void 0;
    if (result2) {
      previous.__wrapped__ = clone2;
    } else {
      result2 = clone2;
    }
    var previous = clone2;
    parent2 = parent2.__wrapped__;
  }
  previous.__wrapped__ = value;
  return result2;
}
var plant_default = wrapperPlant;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/propertyOf.js
function propertyOf(object) {
  return function(path) {
    return object == null ? void 0 : baseGet_default(object, path);
  };
}
var propertyOf_default = propertyOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseIndexOfWith.js
function baseIndexOfWith(array, value, fromIndex, comparator) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (comparator(array[index], value)) {
      return index;
    }
  }
  return -1;
}
var baseIndexOfWith_default = baseIndexOfWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_basePullAll.js
var arrayProto3 = Array.prototype;
var splice2 = arrayProto3.splice;
function basePullAll(array, values2, iteratee2, comparator) {
  var indexOf2 = comparator ? baseIndexOfWith_default : baseIndexOf_default, index = -1, length = values2.length, seen = array;
  if (array === values2) {
    values2 = copyArray_default(values2);
  }
  if (iteratee2) {
    seen = arrayMap_default(array, baseUnary_default(iteratee2));
  }
  while (++index < length) {
    var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
    while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        splice2.call(seen, fromIndex, 1);
      }
      splice2.call(array, fromIndex, 1);
    }
  }
  return array;
}
var basePullAll_default = basePullAll;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pullAll.js
function pullAll(array, values2) {
  return array && array.length && values2 && values2.length ? basePullAll_default(array, values2) : array;
}
var pullAll_default = pullAll;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pull.js
var pull = baseRest_default(pullAll_default);
var pull_default = pull;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pullAllBy.js
function pullAllBy(array, values2, iteratee2) {
  return array && array.length && values2 && values2.length ? basePullAll_default(array, values2, baseIteratee_default(iteratee2, 2)) : array;
}
var pullAllBy_default = pullAllBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pullAllWith.js
function pullAllWith(array, values2, comparator) {
  return array && array.length && values2 && values2.length ? basePullAll_default(array, values2, void 0, comparator) : array;
}
var pullAllWith_default = pullAllWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_basePullAt.js
var arrayProto4 = Array.prototype;
var splice3 = arrayProto4.splice;
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0, lastIndex = length - 1;
  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex_default(index)) {
        splice3.call(array, index, 1);
      } else {
        baseUnset_default(array, index);
      }
    }
  }
  return array;
}
var basePullAt_default = basePullAt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/pullAt.js
var pullAt = flatRest_default(function(array, indexes) {
  var length = array == null ? 0 : array.length, result2 = baseAt_default(array, indexes);
  basePullAt_default(array, arrayMap_default(indexes, function(index) {
    return isIndex_default(index, length) ? +index : index;
  }).sort(compareAscending_default));
  return result2;
});
var pullAt_default = pullAt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseRandom.js
var nativeFloor3 = Math.floor;
var nativeRandom = Math.random;
function baseRandom(lower, upper) {
  return lower + nativeFloor3(nativeRandom() * (upper - lower + 1));
}
var baseRandom_default = baseRandom;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/random.js
var freeParseFloat = parseFloat;
var nativeMin10 = Math.min;
var nativeRandom2 = Math.random;
function random(lower, upper, floating) {
  if (floating && typeof floating != "boolean" && isIterateeCall_default(lower, upper, floating)) {
    upper = floating = void 0;
  }
  if (floating === void 0) {
    if (typeof upper == "boolean") {
      floating = upper;
      upper = void 0;
    } else if (typeof lower == "boolean") {
      floating = lower;
      lower = void 0;
    }
  }
  if (lower === void 0 && upper === void 0) {
    lower = 0;
    upper = 1;
  } else {
    lower = toFinite_default(lower);
    if (upper === void 0) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite_default(upper);
    }
  }
  if (lower > upper) {
    var temp = lower;
    lower = upper;
    upper = temp;
  }
  if (floating || lower % 1 || upper % 1) {
    var rand = nativeRandom2();
    return nativeMin10(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
  }
  return baseRandom_default(lower, upper);
}
var random_default = random;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseRange.js
var nativeCeil4 = Math.ceil;
var nativeMax13 = Math.max;
function baseRange(start, end, step, fromRight) {
  var index = -1, length = nativeMax13(nativeCeil4((end - start) / (step || 1)), 0), result2 = Array(length);
  while (length--) {
    result2[fromRight ? length : ++index] = start;
    start += step;
  }
  return result2;
}
var baseRange_default = baseRange;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createRange.js
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall_default(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite_default(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite_default(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite_default(step);
    return baseRange_default(start, end, step, fromRight);
  };
}
var createRange_default = createRange;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/range.js
var range = createRange_default();
var range_default = range;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/rangeRight.js
var rangeRight = createRange_default(true);
var rangeRight_default = rangeRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/rearg.js
var WRAP_REARG_FLAG4 = 256;
var rearg = flatRest_default(function(func, indexes) {
  return createWrap_default(func, WRAP_REARG_FLAG4, void 0, void 0, void 0, indexes);
});
var rearg_default = rearg;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseReduce.js
function baseReduce(collection, iteratee2, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection2) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee2(accumulator, value, index, collection2);
  });
  return accumulator;
}
var baseReduce_default = baseReduce;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/reduce.js
function reduce(collection, iteratee2, accumulator) {
  var func = isArray_default(collection) ? arrayReduce_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee2, 4), accumulator, initAccum, baseEach_default);
}
var reduce_default = reduce;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayReduceRight.js
function arrayReduceRight(array, iteratee2, accumulator, initAccum) {
  var length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[--length];
  }
  while (length--) {
    accumulator = iteratee2(accumulator, array[length], length, array);
  }
  return accumulator;
}
var arrayReduceRight_default = arrayReduceRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/reduceRight.js
function reduceRight(collection, iteratee2, accumulator) {
  var func = isArray_default(collection) ? arrayReduceRight_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee2, 4), accumulator, initAccum, baseEachRight_default);
}
var reduceRight_default = reduceRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/reject.js
function reject(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, negate_default(baseIteratee_default(predicate, 3)));
}
var reject_default = reject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/remove.js
function remove(array, predicate) {
  var result2 = [];
  if (!(array && array.length)) {
    return result2;
  }
  var index = -1, indexes = [], length = array.length;
  predicate = baseIteratee_default(predicate, 3);
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result2.push(value);
      indexes.push(index);
    }
  }
  basePullAt_default(array, indexes);
  return result2;
}
var remove_default = remove;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/repeat.js
function repeat(string, n, guard) {
  if (guard ? isIterateeCall_default(string, n, guard) : n === void 0) {
    n = 1;
  } else {
    n = toInteger_default(n);
  }
  return baseRepeat_default(toString_default(string), n);
}
var repeat_default = repeat;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/replace.js
function replace() {
  var args = arguments, string = toString_default(args[0]);
  return args.length < 3 ? string : string.replace(args[1], args[2]);
}
var replace_default = replace;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/rest.js
var FUNC_ERROR_TEXT10 = "Expected a function";
function rest(func, start) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT10);
  }
  start = start === void 0 ? start : toInteger_default(start);
  return baseRest_default(func, start);
}
var rest_default = rest;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/result.js
function result(object, path, defaultValue) {
  path = castPath_default(path, object);
  var index = -1, length = path.length;
  if (!length) {
    length = 1;
    object = void 0;
  }
  while (++index < length) {
    var value = object == null ? void 0 : object[toKey_default(path[index])];
    if (value === void 0) {
      index = length;
      value = defaultValue;
    }
    object = isFunction_default(value) ? value.call(object) : value;
  }
  return object;
}
var result_default = result;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/reverse.js
var arrayProto5 = Array.prototype;
var nativeReverse = arrayProto5.reverse;
function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}
var reverse_default = reverse;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/round.js
var round = createRound_default("round");
var round_default = round;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arraySample.js
function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom_default(0, length - 1)] : void 0;
}
var arraySample_default = arraySample;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSample.js
function baseSample(collection) {
  return arraySample_default(values_default(collection));
}
var baseSample_default = baseSample;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sample.js
function sample(collection) {
  var func = isArray_default(collection) ? arraySample_default : baseSample_default;
  return func(collection);
}
var sample_default = sample;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_shuffleSelf.js
function shuffleSelf(array, size2) {
  var index = -1, length = array.length, lastIndex = length - 1;
  size2 = size2 === void 0 ? length : size2;
  while (++index < size2) {
    var rand = baseRandom_default(index, lastIndex), value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size2;
  return array;
}
var shuffleSelf_default = shuffleSelf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arraySampleSize.js
function arraySampleSize(array, n) {
  return shuffleSelf_default(copyArray_default(array), baseClamp_default(n, 0, array.length));
}
var arraySampleSize_default = arraySampleSize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSampleSize.js
function baseSampleSize(collection, n) {
  var array = values_default(collection);
  return shuffleSelf_default(array, baseClamp_default(n, 0, array.length));
}
var baseSampleSize_default = baseSampleSize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sampleSize.js
function sampleSize(collection, n, guard) {
  if (guard ? isIterateeCall_default(collection, n, guard) : n === void 0) {
    n = 1;
  } else {
    n = toInteger_default(n);
  }
  var func = isArray_default(collection) ? arraySampleSize_default : baseSampleSize_default;
  return func(collection, n);
}
var sampleSize_default = sampleSize;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/set.js
function set(object, path, value) {
  return object == null ? object : baseSet_default(object, path, value);
}
var set_default = set;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/setWith.js
function setWith(object, path, value, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return object == null ? object : baseSet_default(object, path, value, customizer);
}
var setWith_default = setWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_arrayShuffle.js
function arrayShuffle(array) {
  return shuffleSelf_default(copyArray_default(array));
}
var arrayShuffle_default = arrayShuffle;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseShuffle.js
function baseShuffle(collection) {
  return shuffleSelf_default(values_default(collection));
}
var baseShuffle_default = baseShuffle;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/shuffle.js
function shuffle(collection) {
  var func = isArray_default(collection) ? arrayShuffle_default : baseShuffle_default;
  return func(collection);
}
var shuffle_default = shuffle;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/size.js
var mapTag10 = "[object Map]";
var setTag10 = "[object Set]";
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike_default(collection)) {
    return isString_default(collection) ? stringSize_default(collection) : collection.length;
  }
  var tag = getTag_default(collection);
  if (tag == mapTag10 || tag == setTag10) {
    return collection.size;
  }
  return baseKeys_default(collection).length;
}
var size_default = size;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/slice.js
function slice(array, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (end && typeof end != "number" && isIterateeCall_default(array, start, end)) {
    start = 0;
    end = length;
  } else {
    start = start == null ? 0 : toInteger_default(start);
    end = end === void 0 ? length : toInteger_default(end);
  }
  return baseSlice_default(array, start, end);
}
var slice_default = slice;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/snakeCase.js
var snakeCase = createCompounder_default(function(result2, word, index) {
  return result2 + (index ? "_" : "") + word.toLowerCase();
});
var snakeCase_default = snakeCase;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSome.js
function baseSome(collection, predicate) {
  var result2;
  baseEach_default(collection, function(value, index, collection2) {
    result2 = predicate(value, index, collection2);
    return !result2;
  });
  return !!result2;
}
var baseSome_default = baseSome;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/some.js
function some(collection, predicate, guard) {
  var func = isArray_default(collection) ? arraySome_default : baseSome_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var some_default = some;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortBy.js
var sortBy = baseRest_default(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall_default(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall_default(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy_default(collection, baseFlatten_default(iteratees, 1), []);
});
var sortBy_default = sortBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSortedIndexBy.js
var MAX_ARRAY_LENGTH3 = 4294967295;
var MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH3 - 1;
var nativeFloor4 = Math.floor;
var nativeMin11 = Math.min;
function baseSortedIndexBy(array, value, iteratee2, retHighest) {
  var low = 0, high = array == null ? 0 : array.length;
  if (high === 0) {
    return 0;
  }
  value = iteratee2(value);
  var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol_default(value), valIsUndefined = value === void 0;
  while (low < high) {
    var mid = nativeFloor4((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== void 0, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol_default(computed);
    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? computed <= value : computed < value;
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin11(high, MAX_ARRAY_INDEX);
}
var baseSortedIndexBy_default = baseSortedIndexBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSortedIndex.js
var MAX_ARRAY_LENGTH4 = 4294967295;
var HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH4 >>> 1;
function baseSortedIndex(array, value, retHighest) {
  var low = 0, high = array == null ? low : array.length;
  if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = low + high >>> 1, computed = array[mid];
      if (computed !== null && !isSymbol_default(computed) && (retHighest ? computed <= value : computed < value)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return baseSortedIndexBy_default(array, value, identity_default, retHighest);
}
var baseSortedIndex_default = baseSortedIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedIndex.js
function sortedIndex(array, value) {
  return baseSortedIndex_default(array, value);
}
var sortedIndex_default = sortedIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedIndexBy.js
function sortedIndexBy(array, value, iteratee2) {
  return baseSortedIndexBy_default(array, value, baseIteratee_default(iteratee2, 2));
}
var sortedIndexBy_default = sortedIndexBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedIndexOf.js
function sortedIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index = baseSortedIndex_default(array, value);
    if (index < length && eq_default(array[index], value)) {
      return index;
    }
  }
  return -1;
}
var sortedIndexOf_default = sortedIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedLastIndex.js
function sortedLastIndex(array, value) {
  return baseSortedIndex_default(array, value, true);
}
var sortedLastIndex_default = sortedLastIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedLastIndexBy.js
function sortedLastIndexBy(array, value, iteratee2) {
  return baseSortedIndexBy_default(array, value, baseIteratee_default(iteratee2, 2), true);
}
var sortedLastIndexBy_default = sortedLastIndexBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedLastIndexOf.js
function sortedLastIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index = baseSortedIndex_default(array, value, true) - 1;
    if (eq_default(array[index], value)) {
      return index;
    }
  }
  return -1;
}
var sortedLastIndexOf_default = sortedLastIndexOf;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseSortedUniq.js
function baseSortedUniq(array, iteratee2) {
  var index = -1, length = array.length, resIndex = 0, result2 = [];
  while (++index < length) {
    var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
    if (!index || !eq_default(computed, seen)) {
      var seen = computed;
      result2[resIndex++] = value === 0 ? 0 : value;
    }
  }
  return result2;
}
var baseSortedUniq_default = baseSortedUniq;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedUniq.js
function sortedUniq(array) {
  return array && array.length ? baseSortedUniq_default(array) : [];
}
var sortedUniq_default = sortedUniq;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sortedUniqBy.js
function sortedUniqBy(array, iteratee2) {
  return array && array.length ? baseSortedUniq_default(array, baseIteratee_default(iteratee2, 2)) : [];
}
var sortedUniqBy_default = sortedUniqBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/split.js
var MAX_ARRAY_LENGTH5 = 4294967295;
function split(string, separator, limit) {
  if (limit && typeof limit != "number" && isIterateeCall_default(string, separator, limit)) {
    separator = limit = void 0;
  }
  limit = limit === void 0 ? MAX_ARRAY_LENGTH5 : limit >>> 0;
  if (!limit) {
    return [];
  }
  string = toString_default(string);
  if (string && (typeof separator == "string" || separator != null && !isRegExp_default(separator))) {
    separator = baseToString_default(separator);
    if (!separator && hasUnicode_default(string)) {
      return castSlice_default(stringToArray_default(string), 0, limit);
    }
  }
  return string.split(separator, limit);
}
var split_default = split;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/spread.js
var FUNC_ERROR_TEXT11 = "Expected a function";
var nativeMax14 = Math.max;
function spread(func, start) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT11);
  }
  start = start == null ? 0 : nativeMax14(toInteger_default(start), 0);
  return baseRest_default(function(args) {
    var array = args[start], otherArgs = castSlice_default(args, 0, start);
    if (array) {
      arrayPush_default(otherArgs, array);
    }
    return apply_default(func, this, otherArgs);
  });
}
var spread_default = spread;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/startCase.js
var startCase = createCompounder_default(function(result2, word, index) {
  return result2 + (index ? " " : "") + upperFirst_default(word);
});
var startCase_default = startCase;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/startsWith.js
function startsWith(string, target, position) {
  string = toString_default(string);
  position = position == null ? 0 : baseClamp_default(toInteger_default(position), 0, string.length);
  target = baseToString_default(target);
  return string.slice(position, position + target.length) == target;
}
var startsWith_default = startsWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/stubObject.js
function stubObject() {
  return {};
}
var stubObject_default = stubObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/stubString.js
function stubString() {
  return "";
}
var stubString_default = stubString;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/stubTrue.js
function stubTrue() {
  return true;
}
var stubTrue_default = stubTrue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/subtract.js
var subtract = createMathOperation_default(function(minuend, subtrahend) {
  return minuend - subtrahend;
}, 0);
var subtract_default = subtract;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sum.js
function sum(array) {
  return array && array.length ? baseSum_default(array, identity_default) : 0;
}
var sum_default = sum;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/sumBy.js
function sumBy(array, iteratee2) {
  return array && array.length ? baseSum_default(array, baseIteratee_default(iteratee2, 2)) : 0;
}
var sumBy_default = sumBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/tail.js
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice_default(array, 1, length) : [];
}
var tail_default = tail;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/take.js
function take(array, n, guard) {
  if (!(array && array.length)) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  return baseSlice_default(array, 0, n < 0 ? 0 : n);
}
var take_default = take;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/takeRight.js
function takeRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  n = length - n;
  return baseSlice_default(array, n < 0 ? 0 : n, length);
}
var takeRight_default = takeRight;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/takeRightWhile.js
function takeRightWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3), false, true) : [];
}
var takeRightWhile_default = takeRightWhile;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/takeWhile.js
function takeWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3)) : [];
}
var takeWhile_default = takeWhile;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/tap.js
function tap(value, interceptor) {
  interceptor(value);
  return value;
}
var tap_default = tap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_customDefaultsAssignIn.js
var objectProto28 = Object.prototype;
var hasOwnProperty24 = objectProto28.hasOwnProperty;
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === void 0 || eq_default(objValue, objectProto28[key]) && !hasOwnProperty24.call(object, key)) {
    return srcValue;
  }
  return objValue;
}
var customDefaultsAssignIn_default = customDefaultsAssignIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_escapeStringChar.js
var stringEscapes = {
  "\\": "\\",
  "'": "'",
  "\n": "n",
  "\r": "r",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
function escapeStringChar(chr) {
  return "\\" + stringEscapes[chr];
}
var escapeStringChar_default = escapeStringChar;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_reInterpolate.js
var reInterpolate = /<%=([\s\S]+?)%>/g;
var reInterpolate_default = reInterpolate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_reEscape.js
var reEscape = /<%-([\s\S]+?)%>/g;
var reEscape_default = reEscape;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_reEvaluate.js
var reEvaluate = /<%([\s\S]+?)%>/g;
var reEvaluate_default = reEvaluate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/templateSettings.js
var templateSettings = {
  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  "escape": reEscape_default,
  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  "evaluate": reEvaluate_default,
  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  "interpolate": reInterpolate_default,
  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type {string}
   */
  "variable": "",
  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type {Object}
   */
  "imports": {
    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type {Function}
     */
    "_": { "escape": escape_default }
  }
};
var templateSettings_default = templateSettings;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/template.js
var INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
var reEmptyStringLeading = /\b__p \+= '';/g;
var reEmptyStringMiddle = /\b(__p \+=) '' \+/g;
var reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reNoMatch = /($^)/;
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
var objectProto29 = Object.prototype;
var hasOwnProperty25 = objectProto29.hasOwnProperty;
function template(string, options, guard) {
  var settings = templateSettings_default.imports._.templateSettings || templateSettings_default;
  if (guard && isIterateeCall_default(string, options, guard)) {
    options = void 0;
  }
  string = toString_default(string);
  options = assignInWith_default({}, options, settings, customDefaultsAssignIn_default);
  var imports = assignInWith_default({}, options.imports, settings.imports, customDefaultsAssignIn_default), importsKeys = keys_default(imports), importsValues = baseValues_default(imports, importsKeys);
  var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate_default ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
    "g"
  );
  var sourceURL = hasOwnProperty25.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/\s/g, " ") + "\n" : "";
  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar_default);
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;
    return match;
  });
  source += "';\n";
  var variable = hasOwnProperty25.call(options, "variable") && options.variable;
  if (!variable) {
    source = "with (obj) {\n" + source + "\n}\n";
  } else if (reForbiddenIdentifierChars.test(variable)) {
    throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
  }
  source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
  source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
  var result2 = attempt_default(function() {
    return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
  });
  result2.source = source;
  if (isError_default(result2)) {
    throw result2;
  }
  return result2;
}
var template_default = template;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/throttle.js
var FUNC_ERROR_TEXT12 = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT12);
  }
  if (isObject_default(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce_default(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var throttle_default = throttle;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/thru.js
function thru(value, interceptor) {
  return interceptor(value);
}
var thru_default = thru;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/times.js
var MAX_SAFE_INTEGER5 = 9007199254740991;
var MAX_ARRAY_LENGTH6 = 4294967295;
var nativeMin12 = Math.min;
function times(n, iteratee2) {
  n = toInteger_default(n);
  if (n < 1 || n > MAX_SAFE_INTEGER5) {
    return [];
  }
  var index = MAX_ARRAY_LENGTH6, length = nativeMin12(n, MAX_ARRAY_LENGTH6);
  iteratee2 = castFunction_default(iteratee2);
  n -= MAX_ARRAY_LENGTH6;
  var result2 = baseTimes_default(length, iteratee2);
  while (++index < n) {
    iteratee2(index);
  }
  return result2;
}
var times_default = times;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toIterator.js
function wrapperToIterator() {
  return this;
}
var toIterator_default = wrapperToIterator;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseWrapperValue.js
function baseWrapperValue(value, actions) {
  var result2 = value;
  if (result2 instanceof LazyWrapper_default) {
    result2 = result2.value();
  }
  return arrayReduce_default(actions, function(result3, action) {
    return action.func.apply(action.thisArg, arrayPush_default([result3], action.args));
  }, result2);
}
var baseWrapperValue_default = baseWrapperValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/wrapperValue.js
function wrapperValue() {
  return baseWrapperValue_default(this.__wrapped__, this.__actions__);
}
var wrapperValue_default = wrapperValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toLower.js
function toLower(value) {
  return toString_default(value).toLowerCase();
}
var toLower_default = toLower;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toPath.js
function toPath(value) {
  if (isArray_default(value)) {
    return arrayMap_default(value, toKey_default);
  }
  return isSymbol_default(value) ? [value] : copyArray_default(stringToPath_default(toString_default(value)));
}
var toPath_default = toPath;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toSafeInteger.js
var MAX_SAFE_INTEGER6 = 9007199254740991;
function toSafeInteger(value) {
  return value ? baseClamp_default(toInteger_default(value), -MAX_SAFE_INTEGER6, MAX_SAFE_INTEGER6) : value === 0 ? value : 0;
}
var toSafeInteger_default = toSafeInteger;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/toUpper.js
function toUpper(value) {
  return toString_default(value).toUpperCase();
}
var toUpper_default = toUpper;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/transform.js
function transform(object, iteratee2, accumulator) {
  var isArr = isArray_default(object), isArrLike = isArr || isBuffer_default(object) || isTypedArray_default(object);
  iteratee2 = baseIteratee_default(iteratee2, 4);
  if (accumulator == null) {
    var Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor() : [];
    } else if (isObject_default(object)) {
      accumulator = isFunction_default(Ctor) ? baseCreate_default(getPrototype_default(object)) : {};
    } else {
      accumulator = {};
    }
  }
  (isArrLike ? arrayEach_default : baseForOwn_default)(object, function(value, index, object2) {
    return iteratee2(accumulator, value, index, object2);
  });
  return accumulator;
}
var transform_default = transform;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_charsEndIndex.js
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;
  while (index-- && baseIndexOf_default(chrSymbols, strSymbols[index], 0) > -1) {
  }
  return index;
}
var charsEndIndex_default = charsEndIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_charsStartIndex.js
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1, length = strSymbols.length;
  while (++index < length && baseIndexOf_default(chrSymbols, strSymbols[index], 0) > -1) {
  }
  return index;
}
var charsStartIndex_default = charsStartIndex;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/trim.js
function trim(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return baseTrim_default(string);
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), chrSymbols = stringToArray_default(chars), start = charsStartIndex_default(strSymbols, chrSymbols), end = charsEndIndex_default(strSymbols, chrSymbols) + 1;
  return castSlice_default(strSymbols, start, end).join("");
}
var trim_default = trim;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/trimEnd.js
function trimEnd(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return string.slice(0, trimmedEndIndex_default(string) + 1);
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), end = charsEndIndex_default(strSymbols, stringToArray_default(chars)) + 1;
  return castSlice_default(strSymbols, 0, end).join("");
}
var trimEnd_default = trimEnd;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/trimStart.js
var reTrimStart3 = /^\s+/;
function trimStart(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return string.replace(reTrimStart3, "");
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), start = charsStartIndex_default(strSymbols, stringToArray_default(chars));
  return castSlice_default(strSymbols, start).join("");
}
var trimStart_default = trimStart;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/truncate.js
var DEFAULT_TRUNC_LENGTH = 30;
var DEFAULT_TRUNC_OMISSION = "...";
var reFlags2 = /\w*$/;
function truncate(string, options) {
  var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
  if (isObject_default(options)) {
    var separator = "separator" in options ? options.separator : separator;
    length = "length" in options ? toInteger_default(options.length) : length;
    omission = "omission" in options ? baseToString_default(options.omission) : omission;
  }
  string = toString_default(string);
  var strLength = string.length;
  if (hasUnicode_default(string)) {
    var strSymbols = stringToArray_default(string);
    strLength = strSymbols.length;
  }
  if (length >= strLength) {
    return string;
  }
  var end = length - stringSize_default(omission);
  if (end < 1) {
    return omission;
  }
  var result2 = strSymbols ? castSlice_default(strSymbols, 0, end).join("") : string.slice(0, end);
  if (separator === void 0) {
    return result2 + omission;
  }
  if (strSymbols) {
    end += result2.length - end;
  }
  if (isRegExp_default(separator)) {
    if (string.slice(end).search(separator)) {
      var match, substring = result2;
      if (!separator.global) {
        separator = RegExp(separator.source, toString_default(reFlags2.exec(separator)) + "g");
      }
      separator.lastIndex = 0;
      while (match = separator.exec(substring)) {
        var newEnd = match.index;
      }
      result2 = result2.slice(0, newEnd === void 0 ? end : newEnd);
    }
  } else if (string.indexOf(baseToString_default(separator), end) != end) {
    var index = result2.lastIndexOf(separator);
    if (index > -1) {
      result2 = result2.slice(0, index);
    }
  }
  return result2 + omission;
}
var truncate_default = truncate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unary.js
function unary(func) {
  return ary_default(func, 1);
}
var unary_default = unary;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_unescapeHtmlChar.js
var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var unescapeHtmlChar = basePropertyOf_default(htmlUnescapes);
var unescapeHtmlChar_default = unescapeHtmlChar;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unescape.js
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
var reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape(string) {
  string = toString_default(string);
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar_default) : string;
}
var unescape_default = unescape;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_createSet.js
var INFINITY6 = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY6) ? noop_default : function(values2) {
  return new Set_default(values2);
};
var createSet_default = createSet;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE3 = 200;
function baseUniq(array, iteratee2, comparator) {
  var index = -1, includes2 = arrayIncludes_default, length = array.length, isCommon = true, result2 = [], seen = result2;
  if (comparator) {
    isCommon = false;
    includes2 = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE3) {
    var set2 = iteratee2 ? null : createSet_default(array);
    if (set2) {
      return setToArray_default(set2);
    }
    isCommon = false;
    includes2 = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee2 ? [] : result2;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee2) {
          seen.push(computed);
        }
        result2.push(value);
      } else if (!includes2(seen, computed, comparator)) {
        if (seen !== result2) {
          seen.push(computed);
        }
        result2.push(value);
      }
    }
  return result2;
}
var baseUniq_default = baseUniq;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/union.js
var union = baseRest_default(function(arrays) {
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true));
});
var union_default = union;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unionBy.js
var unionBy = baseRest_default(function(arrays) {
  var iteratee2 = last_default(arrays);
  if (isArrayLikeObject_default(iteratee2)) {
    iteratee2 = void 0;
  }
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true), baseIteratee_default(iteratee2, 2));
});
var unionBy_default = unionBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unionWith.js
var unionWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays);
  comparator = typeof comparator == "function" ? comparator : void 0;
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true), void 0, comparator);
});
var unionWith_default = unionWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/uniq.js
function uniq(array) {
  return array && array.length ? baseUniq_default(array) : [];
}
var uniq_default = uniq;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/uniqBy.js
function uniqBy(array, iteratee2) {
  return array && array.length ? baseUniq_default(array, baseIteratee_default(iteratee2, 2)) : [];
}
var uniqBy_default = uniqBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/uniqWith.js
function uniqWith(array, comparator) {
  comparator = typeof comparator == "function" ? comparator : void 0;
  return array && array.length ? baseUniq_default(array, void 0, comparator) : [];
}
var uniqWith_default = uniqWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/uniqueId.js
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString_default(prefix) + id;
}
var uniqueId_default = uniqueId;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unset.js
function unset(object, path) {
  return object == null ? true : baseUnset_default(object, path);
}
var unset_default = unset;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unzip.js
var nativeMax15 = Math.max;
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  var length = 0;
  array = arrayFilter_default(array, function(group) {
    if (isArrayLikeObject_default(group)) {
      length = nativeMax15(group.length, length);
      return true;
    }
  });
  return baseTimes_default(length, function(index) {
    return arrayMap_default(array, baseProperty_default(index));
  });
}
var unzip_default = unzip;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/unzipWith.js
function unzipWith(array, iteratee2) {
  if (!(array && array.length)) {
    return [];
  }
  var result2 = unzip_default(array);
  if (iteratee2 == null) {
    return result2;
  }
  return arrayMap_default(result2, function(group) {
    return apply_default(iteratee2, void 0, group);
  });
}
var unzipWith_default = unzipWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseUpdate.js
function baseUpdate(object, path, updater, customizer) {
  return baseSet_default(object, path, updater(baseGet_default(object, path)), customizer);
}
var baseUpdate_default = baseUpdate;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/update.js
function update(object, path, updater) {
  return object == null ? object : baseUpdate_default(object, path, castFunction_default(updater));
}
var update_default = update;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/updateWith.js
function updateWith(object, path, updater, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return object == null ? object : baseUpdate_default(object, path, castFunction_default(updater), customizer);
}
var updateWith_default = updateWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/upperCase.js
var upperCase = createCompounder_default(function(result2, word, index) {
  return result2 + (index ? " " : "") + word.toUpperCase();
});
var upperCase_default = upperCase;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/valuesIn.js
function valuesIn(object) {
  return object == null ? [] : baseValues_default(object, keysIn_default(object));
}
var valuesIn_default = valuesIn;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/without.js
var without = baseRest_default(function(array, values2) {
  return isArrayLikeObject_default(array) ? baseDifference_default(array, values2) : [];
});
var without_default = without;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/wrap.js
function wrap(value, wrapper) {
  return partial_default(castFunction_default(wrapper), value);
}
var wrap_default = wrap;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/wrapperAt.js
var wrapperAt = flatRest_default(function(paths) {
  var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
    return baseAt_default(object, paths);
  };
  if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper_default) || !isIndex_default(start)) {
    return this.thru(interceptor);
  }
  value = value.slice(start, +start + (length ? 1 : 0));
  value.__actions__.push({
    "func": thru_default,
    "args": [interceptor],
    "thisArg": void 0
  });
  return new LodashWrapper_default(value, this.__chain__).thru(function(array) {
    if (length && !array.length) {
      array.push(void 0);
    }
    return array;
  });
});
var wrapperAt_default = wrapperAt;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/wrapperChain.js
function wrapperChain() {
  return chain_default(this);
}
var wrapperChain_default = wrapperChain;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/wrapperReverse.js
function wrapperReverse() {
  var value = this.__wrapped__;
  if (value instanceof LazyWrapper_default) {
    var wrapped = value;
    if (this.__actions__.length) {
      wrapped = new LazyWrapper_default(this);
    }
    wrapped = wrapped.reverse();
    wrapped.__actions__.push({
      "func": thru_default,
      "args": [reverse_default],
      "thisArg": void 0
    });
    return new LodashWrapper_default(wrapped, this.__chain__);
  }
  return this.thru(reverse_default);
}
var wrapperReverse_default = wrapperReverse;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseXor.js
function baseXor(arrays, iteratee2, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq_default(arrays[0]) : [];
  }
  var index = -1, result2 = Array(length);
  while (++index < length) {
    var array = arrays[index], othIndex = -1;
    while (++othIndex < length) {
      if (othIndex != index) {
        result2[index] = baseDifference_default(result2[index] || array, arrays[othIndex], iteratee2, comparator);
      }
    }
  }
  return baseUniq_default(baseFlatten_default(result2, 1), iteratee2, comparator);
}
var baseXor_default = baseXor;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/xor.js
var xor = baseRest_default(function(arrays) {
  return baseXor_default(arrayFilter_default(arrays, isArrayLikeObject_default));
});
var xor_default = xor;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/xorBy.js
var xorBy = baseRest_default(function(arrays) {
  var iteratee2 = last_default(arrays);
  if (isArrayLikeObject_default(iteratee2)) {
    iteratee2 = void 0;
  }
  return baseXor_default(arrayFilter_default(arrays, isArrayLikeObject_default), baseIteratee_default(iteratee2, 2));
});
var xorBy_default = xorBy;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/xorWith.js
var xorWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays);
  comparator = typeof comparator == "function" ? comparator : void 0;
  return baseXor_default(arrayFilter_default(arrays, isArrayLikeObject_default), void 0, comparator);
});
var xorWith_default = xorWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/zip.js
var zip = baseRest_default(unzip_default);
var zip_default = zip;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_baseZipObject.js
function baseZipObject(props, values2, assignFunc) {
  var index = -1, length = props.length, valsLength = values2.length, result2 = {};
  while (++index < length) {
    var value = index < valsLength ? values2[index] : void 0;
    assignFunc(result2, props[index], value);
  }
  return result2;
}
var baseZipObject_default = baseZipObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/zipObject.js
function zipObject(props, values2) {
  return baseZipObject_default(props || [], values2 || [], assignValue_default);
}
var zipObject_default = zipObject;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/zipObjectDeep.js
function zipObjectDeep(props, values2) {
  return baseZipObject_default(props || [], values2 || [], baseSet_default);
}
var zipObjectDeep_default = zipObjectDeep;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/zipWith.js
var zipWith = baseRest_default(function(arrays) {
  var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : void 0;
  iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : void 0;
  return unzipWith_default(arrays, iteratee2);
});
var zipWith_default = zipWith;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/array.default.js
var array_default_default = {
  chunk: chunk_default,
  compact: compact_default,
  concat: concat_default,
  difference: difference_default,
  differenceBy: differenceBy_default,
  differenceWith: differenceWith_default,
  drop: drop_default,
  dropRight: dropRight_default,
  dropRightWhile: dropRightWhile_default,
  dropWhile: dropWhile_default,
  fill: fill_default,
  findIndex: findIndex_default,
  findLastIndex: findLastIndex_default,
  first: head_default,
  flatten: flatten_default,
  flattenDeep: flattenDeep_default,
  flattenDepth: flattenDepth_default,
  fromPairs: fromPairs_default,
  head: head_default,
  indexOf: indexOf_default,
  initial: initial_default,
  intersection: intersection_default,
  intersectionBy: intersectionBy_default,
  intersectionWith: intersectionWith_default,
  join: join_default,
  last: last_default,
  lastIndexOf: lastIndexOf_default,
  nth: nth_default,
  pull: pull_default,
  pullAll: pullAll_default,
  pullAllBy: pullAllBy_default,
  pullAllWith: pullAllWith_default,
  pullAt: pullAt_default,
  remove: remove_default,
  reverse: reverse_default,
  slice: slice_default,
  sortedIndex: sortedIndex_default,
  sortedIndexBy: sortedIndexBy_default,
  sortedIndexOf: sortedIndexOf_default,
  sortedLastIndex: sortedLastIndex_default,
  sortedLastIndexBy: sortedLastIndexBy_default,
  sortedLastIndexOf: sortedLastIndexOf_default,
  sortedUniq: sortedUniq_default,
  sortedUniqBy: sortedUniqBy_default,
  tail: tail_default,
  take: take_default,
  takeRight: takeRight_default,
  takeRightWhile: takeRightWhile_default,
  takeWhile: takeWhile_default,
  union: union_default,
  unionBy: unionBy_default,
  unionWith: unionWith_default,
  uniq: uniq_default,
  uniqBy: uniqBy_default,
  uniqWith: uniqWith_default,
  unzip: unzip_default,
  unzipWith: unzipWith_default,
  without: without_default,
  xor: xor_default,
  xorBy: xorBy_default,
  xorWith: xorWith_default,
  zip: zip_default,
  zipObject: zipObject_default,
  zipObjectDeep: zipObjectDeep_default,
  zipWith: zipWith_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/collection.default.js
var collection_default_default = {
  countBy: countBy_default,
  each: forEach_default,
  eachRight: forEachRight_default,
  every: every_default,
  filter: filter_default,
  find: find_default,
  findLast: findLast_default,
  flatMap: flatMap_default,
  flatMapDeep: flatMapDeep_default,
  flatMapDepth: flatMapDepth_default,
  forEach: forEach_default,
  forEachRight: forEachRight_default,
  groupBy: groupBy_default,
  includes: includes_default,
  invokeMap: invokeMap_default,
  keyBy: keyBy_default,
  map: map_default,
  orderBy: orderBy_default,
  partition: partition_default,
  reduce: reduce_default,
  reduceRight: reduceRight_default,
  reject: reject_default,
  sample: sample_default,
  sampleSize: sampleSize_default,
  shuffle: shuffle_default,
  size: size_default,
  some: some_default,
  sortBy: sortBy_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/date.default.js
var date_default_default = {
  now: now_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/function.default.js
var function_default_default = {
  after: after_default,
  ary: ary_default,
  before: before_default,
  bind: bind_default,
  bindKey: bindKey_default,
  curry: curry_default,
  curryRight: curryRight_default,
  debounce: debounce_default,
  defer: defer_default,
  delay: delay_default,
  flip: flip_default,
  memoize: memoize_default,
  negate: negate_default,
  once: once_default,
  overArgs: overArgs_default,
  partial: partial_default,
  partialRight: partialRight_default,
  rearg: rearg_default,
  rest: rest_default,
  spread: spread_default,
  throttle: throttle_default,
  unary: unary_default,
  wrap: wrap_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lang.default.js
var lang_default_default = {
  castArray: castArray_default,
  clone: clone_default,
  cloneDeep: cloneDeep_default,
  cloneDeepWith: cloneDeepWith_default,
  cloneWith: cloneWith_default,
  conformsTo: conformsTo_default,
  eq: eq_default,
  gt: gt_default,
  gte: gte_default,
  isArguments: isArguments_default,
  isArray: isArray_default,
  isArrayBuffer: isArrayBuffer_default,
  isArrayLike: isArrayLike_default,
  isArrayLikeObject: isArrayLikeObject_default,
  isBoolean: isBoolean_default,
  isBuffer: isBuffer_default,
  isDate: isDate_default,
  isElement: isElement_default,
  isEmpty: isEmpty_default,
  isEqual: isEqual_default,
  isEqualWith: isEqualWith_default,
  isError: isError_default,
  isFinite: isFinite_default,
  isFunction: isFunction_default,
  isInteger: isInteger_default,
  isLength: isLength_default,
  isMap: isMap_default,
  isMatch: isMatch_default,
  isMatchWith: isMatchWith_default,
  isNaN: isNaN_default,
  isNative: isNative_default,
  isNil: isNil_default,
  isNull: isNull_default,
  isNumber: isNumber_default,
  isObject: isObject_default,
  isObjectLike: isObjectLike_default,
  isPlainObject: isPlainObject_default,
  isRegExp: isRegExp_default,
  isSafeInteger: isSafeInteger_default,
  isSet: isSet_default,
  isString: isString_default,
  isSymbol: isSymbol_default,
  isTypedArray: isTypedArray_default,
  isUndefined: isUndefined_default,
  isWeakMap: isWeakMap_default,
  isWeakSet: isWeakSet_default,
  lt: lt_default,
  lte: lte_default,
  toArray: toArray_default,
  toFinite: toFinite_default,
  toInteger: toInteger_default,
  toLength: toLength_default,
  toNumber: toNumber_default,
  toPlainObject: toPlainObject_default,
  toSafeInteger: toSafeInteger_default,
  toString: toString_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/math.default.js
var math_default_default = {
  add: add_default,
  ceil: ceil_default,
  divide: divide_default,
  floor: floor_default,
  max: max_default,
  maxBy: maxBy_default,
  mean: mean_default,
  meanBy: meanBy_default,
  min: min_default,
  minBy: minBy_default,
  multiply: multiply_default,
  round: round_default,
  subtract: subtract_default,
  sum: sum_default,
  sumBy: sumBy_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/number.default.js
var number_default_default = {
  clamp: clamp_default,
  inRange: inRange_default,
  random: random_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/object.default.js
var object_default_default = {
  assign: assign_default,
  assignIn: assignIn_default,
  assignInWith: assignInWith_default,
  assignWith: assignWith_default,
  at: at_default,
  create: create_default,
  defaults: defaults_default,
  defaultsDeep: defaultsDeep_default,
  entries: toPairs_default,
  entriesIn: toPairsIn_default,
  extend: assignIn_default,
  extendWith: assignInWith_default,
  findKey: findKey_default,
  findLastKey: findLastKey_default,
  forIn: forIn_default,
  forInRight: forInRight_default,
  forOwn: forOwn_default,
  forOwnRight: forOwnRight_default,
  functions: functions_default,
  functionsIn: functionsIn_default,
  get: get_default,
  has: has_default,
  hasIn: hasIn_default,
  invert: invert_default,
  invertBy: invertBy_default,
  invoke: invoke_default,
  keys: keys_default,
  keysIn: keysIn_default,
  mapKeys: mapKeys_default,
  mapValues: mapValues_default,
  merge: merge_default,
  mergeWith: mergeWith_default,
  omit: omit_default,
  omitBy: omitBy_default,
  pick: pick_default,
  pickBy: pickBy_default,
  result: result_default,
  set: set_default,
  setWith: setWith_default,
  toPairs: toPairs_default,
  toPairsIn: toPairsIn_default,
  transform: transform_default,
  unset: unset_default,
  update: update_default,
  updateWith: updateWith_default,
  values: values_default,
  valuesIn: valuesIn_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/seq.default.js
var seq_default_default = {
  at: wrapperAt_default,
  chain: chain_default,
  commit: commit_default,
  lodash: wrapperLodash_default,
  next: next_default,
  plant: plant_default,
  reverse: wrapperReverse_default,
  tap: tap_default,
  thru: thru_default,
  toIterator: toIterator_default,
  toJSON: wrapperValue_default,
  value: wrapperValue_default,
  valueOf: wrapperValue_default,
  wrapperChain: wrapperChain_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/string.default.js
var string_default_default = {
  camelCase: camelCase_default,
  capitalize: capitalize_default,
  deburr: deburr_default,
  endsWith: endsWith_default,
  escape: escape_default,
  escapeRegExp: escapeRegExp_default,
  kebabCase: kebabCase_default,
  lowerCase: lowerCase_default,
  lowerFirst: lowerFirst_default,
  pad: pad_default,
  padEnd: padEnd_default,
  padStart: padStart_default,
  parseInt: parseInt_default,
  repeat: repeat_default,
  replace: replace_default,
  snakeCase: snakeCase_default,
  split: split_default,
  startCase: startCase_default,
  startsWith: startsWith_default,
  template: template_default,
  templateSettings: templateSettings_default,
  toLower: toLower_default,
  toUpper: toUpper_default,
  trim: trim_default,
  trimEnd: trimEnd_default,
  trimStart: trimStart_default,
  truncate: truncate_default,
  unescape: unescape_default,
  upperCase: upperCase_default,
  upperFirst: upperFirst_default,
  words: words_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/util.default.js
var util_default_default = {
  attempt: attempt_default,
  bindAll: bindAll_default,
  cond: cond_default,
  conforms: conforms_default,
  constant: constant_default,
  defaultTo: defaultTo_default,
  flow: flow_default,
  flowRight: flowRight_default,
  identity: identity_default,
  iteratee: iteratee_default,
  matches: matches_default,
  matchesProperty: matchesProperty_default,
  method: method_default,
  methodOf: methodOf_default,
  mixin: mixin_default,
  noop: noop_default,
  nthArg: nthArg_default,
  over: over_default,
  overEvery: overEvery_default,
  overSome: overSome_default,
  property: property_default,
  propertyOf: propertyOf_default,
  range: range_default,
  rangeRight: rangeRight_default,
  stubArray: stubArray_default,
  stubFalse: stubFalse_default,
  stubObject: stubObject_default,
  stubString: stubString_default,
  stubTrue: stubTrue_default,
  times: times_default,
  toPath: toPath_default,
  uniqueId: uniqueId_default
};

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_lazyClone.js
function lazyClone() {
  var result2 = new LazyWrapper_default(this.__wrapped__);
  result2.__actions__ = copyArray_default(this.__actions__);
  result2.__dir__ = this.__dir__;
  result2.__filtered__ = this.__filtered__;
  result2.__iteratees__ = copyArray_default(this.__iteratees__);
  result2.__takeCount__ = this.__takeCount__;
  result2.__views__ = copyArray_default(this.__views__);
  return result2;
}
var lazyClone_default = lazyClone;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_lazyReverse.js
function lazyReverse() {
  if (this.__filtered__) {
    var result2 = new LazyWrapper_default(this);
    result2.__dir__ = -1;
    result2.__filtered__ = true;
  } else {
    result2 = this.clone();
    result2.__dir__ *= -1;
  }
  return result2;
}
var lazyReverse_default = lazyReverse;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_getView.js
var nativeMax16 = Math.max;
var nativeMin13 = Math.min;
function getView(start, end, transforms) {
  var index = -1, length = transforms.length;
  while (++index < length) {
    var data = transforms[index], size2 = data.size;
    switch (data.type) {
      case "drop":
        start += size2;
        break;
      case "dropRight":
        end -= size2;
        break;
      case "take":
        end = nativeMin13(end, start + size2);
        break;
      case "takeRight":
        start = nativeMax16(start, end - size2);
        break;
    }
  }
  return { "start": start, "end": end };
}
var getView_default = getView;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/_lazyValue.js
var LAZY_FILTER_FLAG = 1;
var LAZY_MAP_FLAG = 2;
var nativeMin14 = Math.min;
function lazyValue() {
  var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray_default(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView_default(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin14(length, this.__takeCount__);
  if (!isArr || !isRight && arrLength == length && takeCount == length) {
    return baseWrapperValue_default(array, this.__actions__);
  }
  var result2 = [];
  outer:
    while (length-- && resIndex < takeCount) {
      index += dir;
      var iterIndex = -1, value = array[index];
      while (++iterIndex < iterLength) {
        var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
        if (type == LAZY_MAP_FLAG) {
          value = computed;
        } else if (!computed) {
          if (type == LAZY_FILTER_FLAG) {
            continue outer;
          } else {
            break outer;
          }
        }
      }
      result2[resIndex++] = value;
    }
  return result2;
}
var lazyValue_default = lazyValue;

// node_modules/.pnpm/lodash-es@4.17.23/node_modules/lodash-es/lodash.default.js
var VERSION = "4.17.23";
var WRAP_BIND_KEY_FLAG7 = 2;
var LAZY_FILTER_FLAG2 = 1;
var LAZY_WHILE_FLAG = 3;
var MAX_ARRAY_LENGTH7 = 4294967295;
var arrayProto6 = Array.prototype;
var objectProto30 = Object.prototype;
var hasOwnProperty26 = objectProto30.hasOwnProperty;
var symIterator2 = Symbol_default ? Symbol_default.iterator : void 0;
var nativeMax17 = Math.max;
var nativeMin15 = Math.min;
var mixin2 = /* @__PURE__ */ function(func) {
  return function(object, source, options) {
    if (options == null) {
      var isObj = isObject_default(source), props = isObj && keys_default(source), methodNames = props && props.length && baseFunctions_default(source, props);
      if (!(methodNames ? methodNames.length : isObj)) {
        options = source;
        source = object;
        object = this;
      }
    }
    return func(object, source, options);
  };
}(mixin_default);
wrapperLodash_default.after = function_default_default.after;
wrapperLodash_default.ary = function_default_default.ary;
wrapperLodash_default.assign = object_default_default.assign;
wrapperLodash_default.assignIn = object_default_default.assignIn;
wrapperLodash_default.assignInWith = object_default_default.assignInWith;
wrapperLodash_default.assignWith = object_default_default.assignWith;
wrapperLodash_default.at = object_default_default.at;
wrapperLodash_default.before = function_default_default.before;
wrapperLodash_default.bind = function_default_default.bind;
wrapperLodash_default.bindAll = util_default_default.bindAll;
wrapperLodash_default.bindKey = function_default_default.bindKey;
wrapperLodash_default.castArray = lang_default_default.castArray;
wrapperLodash_default.chain = seq_default_default.chain;
wrapperLodash_default.chunk = array_default_default.chunk;
wrapperLodash_default.compact = array_default_default.compact;
wrapperLodash_default.concat = array_default_default.concat;
wrapperLodash_default.cond = util_default_default.cond;
wrapperLodash_default.conforms = util_default_default.conforms;
wrapperLodash_default.constant = util_default_default.constant;
wrapperLodash_default.countBy = collection_default_default.countBy;
wrapperLodash_default.create = object_default_default.create;
wrapperLodash_default.curry = function_default_default.curry;
wrapperLodash_default.curryRight = function_default_default.curryRight;
wrapperLodash_default.debounce = function_default_default.debounce;
wrapperLodash_default.defaults = object_default_default.defaults;
wrapperLodash_default.defaultsDeep = object_default_default.defaultsDeep;
wrapperLodash_default.defer = function_default_default.defer;
wrapperLodash_default.delay = function_default_default.delay;
wrapperLodash_default.difference = array_default_default.difference;
wrapperLodash_default.differenceBy = array_default_default.differenceBy;
wrapperLodash_default.differenceWith = array_default_default.differenceWith;
wrapperLodash_default.drop = array_default_default.drop;
wrapperLodash_default.dropRight = array_default_default.dropRight;
wrapperLodash_default.dropRightWhile = array_default_default.dropRightWhile;
wrapperLodash_default.dropWhile = array_default_default.dropWhile;
wrapperLodash_default.fill = array_default_default.fill;
wrapperLodash_default.filter = collection_default_default.filter;
wrapperLodash_default.flatMap = collection_default_default.flatMap;
wrapperLodash_default.flatMapDeep = collection_default_default.flatMapDeep;
wrapperLodash_default.flatMapDepth = collection_default_default.flatMapDepth;
wrapperLodash_default.flatten = array_default_default.flatten;
wrapperLodash_default.flattenDeep = array_default_default.flattenDeep;
wrapperLodash_default.flattenDepth = array_default_default.flattenDepth;
wrapperLodash_default.flip = function_default_default.flip;
wrapperLodash_default.flow = util_default_default.flow;
wrapperLodash_default.flowRight = util_default_default.flowRight;
wrapperLodash_default.fromPairs = array_default_default.fromPairs;
wrapperLodash_default.functions = object_default_default.functions;
wrapperLodash_default.functionsIn = object_default_default.functionsIn;
wrapperLodash_default.groupBy = collection_default_default.groupBy;
wrapperLodash_default.initial = array_default_default.initial;
wrapperLodash_default.intersection = array_default_default.intersection;
wrapperLodash_default.intersectionBy = array_default_default.intersectionBy;
wrapperLodash_default.intersectionWith = array_default_default.intersectionWith;
wrapperLodash_default.invert = object_default_default.invert;
wrapperLodash_default.invertBy = object_default_default.invertBy;
wrapperLodash_default.invokeMap = collection_default_default.invokeMap;
wrapperLodash_default.iteratee = util_default_default.iteratee;
wrapperLodash_default.keyBy = collection_default_default.keyBy;
wrapperLodash_default.keys = keys_default;
wrapperLodash_default.keysIn = object_default_default.keysIn;
wrapperLodash_default.map = collection_default_default.map;
wrapperLodash_default.mapKeys = object_default_default.mapKeys;
wrapperLodash_default.mapValues = object_default_default.mapValues;
wrapperLodash_default.matches = util_default_default.matches;
wrapperLodash_default.matchesProperty = util_default_default.matchesProperty;
wrapperLodash_default.memoize = function_default_default.memoize;
wrapperLodash_default.merge = object_default_default.merge;
wrapperLodash_default.mergeWith = object_default_default.mergeWith;
wrapperLodash_default.method = util_default_default.method;
wrapperLodash_default.methodOf = util_default_default.methodOf;
wrapperLodash_default.mixin = mixin2;
wrapperLodash_default.negate = negate_default;
wrapperLodash_default.nthArg = util_default_default.nthArg;
wrapperLodash_default.omit = object_default_default.omit;
wrapperLodash_default.omitBy = object_default_default.omitBy;
wrapperLodash_default.once = function_default_default.once;
wrapperLodash_default.orderBy = collection_default_default.orderBy;
wrapperLodash_default.over = util_default_default.over;
wrapperLodash_default.overArgs = function_default_default.overArgs;
wrapperLodash_default.overEvery = util_default_default.overEvery;
wrapperLodash_default.overSome = util_default_default.overSome;
wrapperLodash_default.partial = function_default_default.partial;
wrapperLodash_default.partialRight = function_default_default.partialRight;
wrapperLodash_default.partition = collection_default_default.partition;
wrapperLodash_default.pick = object_default_default.pick;
wrapperLodash_default.pickBy = object_default_default.pickBy;
wrapperLodash_default.property = util_default_default.property;
wrapperLodash_default.propertyOf = util_default_default.propertyOf;
wrapperLodash_default.pull = array_default_default.pull;
wrapperLodash_default.pullAll = array_default_default.pullAll;
wrapperLodash_default.pullAllBy = array_default_default.pullAllBy;
wrapperLodash_default.pullAllWith = array_default_default.pullAllWith;
wrapperLodash_default.pullAt = array_default_default.pullAt;
wrapperLodash_default.range = util_default_default.range;
wrapperLodash_default.rangeRight = util_default_default.rangeRight;
wrapperLodash_default.rearg = function_default_default.rearg;
wrapperLodash_default.reject = collection_default_default.reject;
wrapperLodash_default.remove = array_default_default.remove;
wrapperLodash_default.rest = function_default_default.rest;
wrapperLodash_default.reverse = array_default_default.reverse;
wrapperLodash_default.sampleSize = collection_default_default.sampleSize;
wrapperLodash_default.set = object_default_default.set;
wrapperLodash_default.setWith = object_default_default.setWith;
wrapperLodash_default.shuffle = collection_default_default.shuffle;
wrapperLodash_default.slice = array_default_default.slice;
wrapperLodash_default.sortBy = collection_default_default.sortBy;
wrapperLodash_default.sortedUniq = array_default_default.sortedUniq;
wrapperLodash_default.sortedUniqBy = array_default_default.sortedUniqBy;
wrapperLodash_default.split = string_default_default.split;
wrapperLodash_default.spread = function_default_default.spread;
wrapperLodash_default.tail = array_default_default.tail;
wrapperLodash_default.take = array_default_default.take;
wrapperLodash_default.takeRight = array_default_default.takeRight;
wrapperLodash_default.takeRightWhile = array_default_default.takeRightWhile;
wrapperLodash_default.takeWhile = array_default_default.takeWhile;
wrapperLodash_default.tap = seq_default_default.tap;
wrapperLodash_default.throttle = function_default_default.throttle;
wrapperLodash_default.thru = thru_default;
wrapperLodash_default.toArray = lang_default_default.toArray;
wrapperLodash_default.toPairs = object_default_default.toPairs;
wrapperLodash_default.toPairsIn = object_default_default.toPairsIn;
wrapperLodash_default.toPath = util_default_default.toPath;
wrapperLodash_default.toPlainObject = lang_default_default.toPlainObject;
wrapperLodash_default.transform = object_default_default.transform;
wrapperLodash_default.unary = function_default_default.unary;
wrapperLodash_default.union = array_default_default.union;
wrapperLodash_default.unionBy = array_default_default.unionBy;
wrapperLodash_default.unionWith = array_default_default.unionWith;
wrapperLodash_default.uniq = array_default_default.uniq;
wrapperLodash_default.uniqBy = array_default_default.uniqBy;
wrapperLodash_default.uniqWith = array_default_default.uniqWith;
wrapperLodash_default.unset = object_default_default.unset;
wrapperLodash_default.unzip = array_default_default.unzip;
wrapperLodash_default.unzipWith = array_default_default.unzipWith;
wrapperLodash_default.update = object_default_default.update;
wrapperLodash_default.updateWith = object_default_default.updateWith;
wrapperLodash_default.values = object_default_default.values;
wrapperLodash_default.valuesIn = object_default_default.valuesIn;
wrapperLodash_default.without = array_default_default.without;
wrapperLodash_default.words = string_default_default.words;
wrapperLodash_default.wrap = function_default_default.wrap;
wrapperLodash_default.xor = array_default_default.xor;
wrapperLodash_default.xorBy = array_default_default.xorBy;
wrapperLodash_default.xorWith = array_default_default.xorWith;
wrapperLodash_default.zip = array_default_default.zip;
wrapperLodash_default.zipObject = array_default_default.zipObject;
wrapperLodash_default.zipObjectDeep = array_default_default.zipObjectDeep;
wrapperLodash_default.zipWith = array_default_default.zipWith;
wrapperLodash_default.entries = object_default_default.toPairs;
wrapperLodash_default.entriesIn = object_default_default.toPairsIn;
wrapperLodash_default.extend = object_default_default.assignIn;
wrapperLodash_default.extendWith = object_default_default.assignInWith;
mixin2(wrapperLodash_default, wrapperLodash_default);
wrapperLodash_default.add = math_default_default.add;
wrapperLodash_default.attempt = util_default_default.attempt;
wrapperLodash_default.camelCase = string_default_default.camelCase;
wrapperLodash_default.capitalize = string_default_default.capitalize;
wrapperLodash_default.ceil = math_default_default.ceil;
wrapperLodash_default.clamp = number_default_default.clamp;
wrapperLodash_default.clone = lang_default_default.clone;
wrapperLodash_default.cloneDeep = lang_default_default.cloneDeep;
wrapperLodash_default.cloneDeepWith = lang_default_default.cloneDeepWith;
wrapperLodash_default.cloneWith = lang_default_default.cloneWith;
wrapperLodash_default.conformsTo = lang_default_default.conformsTo;
wrapperLodash_default.deburr = string_default_default.deburr;
wrapperLodash_default.defaultTo = util_default_default.defaultTo;
wrapperLodash_default.divide = math_default_default.divide;
wrapperLodash_default.endsWith = string_default_default.endsWith;
wrapperLodash_default.eq = lang_default_default.eq;
wrapperLodash_default.escape = string_default_default.escape;
wrapperLodash_default.escapeRegExp = string_default_default.escapeRegExp;
wrapperLodash_default.every = collection_default_default.every;
wrapperLodash_default.find = collection_default_default.find;
wrapperLodash_default.findIndex = array_default_default.findIndex;
wrapperLodash_default.findKey = object_default_default.findKey;
wrapperLodash_default.findLast = collection_default_default.findLast;
wrapperLodash_default.findLastIndex = array_default_default.findLastIndex;
wrapperLodash_default.findLastKey = object_default_default.findLastKey;
wrapperLodash_default.floor = math_default_default.floor;
wrapperLodash_default.forEach = collection_default_default.forEach;
wrapperLodash_default.forEachRight = collection_default_default.forEachRight;
wrapperLodash_default.forIn = object_default_default.forIn;
wrapperLodash_default.forInRight = object_default_default.forInRight;
wrapperLodash_default.forOwn = object_default_default.forOwn;
wrapperLodash_default.forOwnRight = object_default_default.forOwnRight;
wrapperLodash_default.get = object_default_default.get;
wrapperLodash_default.gt = lang_default_default.gt;
wrapperLodash_default.gte = lang_default_default.gte;
wrapperLodash_default.has = object_default_default.has;
wrapperLodash_default.hasIn = object_default_default.hasIn;
wrapperLodash_default.head = array_default_default.head;
wrapperLodash_default.identity = identity_default;
wrapperLodash_default.includes = collection_default_default.includes;
wrapperLodash_default.indexOf = array_default_default.indexOf;
wrapperLodash_default.inRange = number_default_default.inRange;
wrapperLodash_default.invoke = object_default_default.invoke;
wrapperLodash_default.isArguments = lang_default_default.isArguments;
wrapperLodash_default.isArray = isArray_default;
wrapperLodash_default.isArrayBuffer = lang_default_default.isArrayBuffer;
wrapperLodash_default.isArrayLike = lang_default_default.isArrayLike;
wrapperLodash_default.isArrayLikeObject = lang_default_default.isArrayLikeObject;
wrapperLodash_default.isBoolean = lang_default_default.isBoolean;
wrapperLodash_default.isBuffer = lang_default_default.isBuffer;
wrapperLodash_default.isDate = lang_default_default.isDate;
wrapperLodash_default.isElement = lang_default_default.isElement;
wrapperLodash_default.isEmpty = lang_default_default.isEmpty;
wrapperLodash_default.isEqual = lang_default_default.isEqual;
wrapperLodash_default.isEqualWith = lang_default_default.isEqualWith;
wrapperLodash_default.isError = lang_default_default.isError;
wrapperLodash_default.isFinite = lang_default_default.isFinite;
wrapperLodash_default.isFunction = lang_default_default.isFunction;
wrapperLodash_default.isInteger = lang_default_default.isInteger;
wrapperLodash_default.isLength = lang_default_default.isLength;
wrapperLodash_default.isMap = lang_default_default.isMap;
wrapperLodash_default.isMatch = lang_default_default.isMatch;
wrapperLodash_default.isMatchWith = lang_default_default.isMatchWith;
wrapperLodash_default.isNaN = lang_default_default.isNaN;
wrapperLodash_default.isNative = lang_default_default.isNative;
wrapperLodash_default.isNil = lang_default_default.isNil;
wrapperLodash_default.isNull = lang_default_default.isNull;
wrapperLodash_default.isNumber = lang_default_default.isNumber;
wrapperLodash_default.isObject = isObject_default;
wrapperLodash_default.isObjectLike = lang_default_default.isObjectLike;
wrapperLodash_default.isPlainObject = lang_default_default.isPlainObject;
wrapperLodash_default.isRegExp = lang_default_default.isRegExp;
wrapperLodash_default.isSafeInteger = lang_default_default.isSafeInteger;
wrapperLodash_default.isSet = lang_default_default.isSet;
wrapperLodash_default.isString = lang_default_default.isString;
wrapperLodash_default.isSymbol = lang_default_default.isSymbol;
wrapperLodash_default.isTypedArray = lang_default_default.isTypedArray;
wrapperLodash_default.isUndefined = lang_default_default.isUndefined;
wrapperLodash_default.isWeakMap = lang_default_default.isWeakMap;
wrapperLodash_default.isWeakSet = lang_default_default.isWeakSet;
wrapperLodash_default.join = array_default_default.join;
wrapperLodash_default.kebabCase = string_default_default.kebabCase;
wrapperLodash_default.last = last_default;
wrapperLodash_default.lastIndexOf = array_default_default.lastIndexOf;
wrapperLodash_default.lowerCase = string_default_default.lowerCase;
wrapperLodash_default.lowerFirst = string_default_default.lowerFirst;
wrapperLodash_default.lt = lang_default_default.lt;
wrapperLodash_default.lte = lang_default_default.lte;
wrapperLodash_default.max = math_default_default.max;
wrapperLodash_default.maxBy = math_default_default.maxBy;
wrapperLodash_default.mean = math_default_default.mean;
wrapperLodash_default.meanBy = math_default_default.meanBy;
wrapperLodash_default.min = math_default_default.min;
wrapperLodash_default.minBy = math_default_default.minBy;
wrapperLodash_default.stubArray = util_default_default.stubArray;
wrapperLodash_default.stubFalse = util_default_default.stubFalse;
wrapperLodash_default.stubObject = util_default_default.stubObject;
wrapperLodash_default.stubString = util_default_default.stubString;
wrapperLodash_default.stubTrue = util_default_default.stubTrue;
wrapperLodash_default.multiply = math_default_default.multiply;
wrapperLodash_default.nth = array_default_default.nth;
wrapperLodash_default.noop = util_default_default.noop;
wrapperLodash_default.now = date_default_default.now;
wrapperLodash_default.pad = string_default_default.pad;
wrapperLodash_default.padEnd = string_default_default.padEnd;
wrapperLodash_default.padStart = string_default_default.padStart;
wrapperLodash_default.parseInt = string_default_default.parseInt;
wrapperLodash_default.random = number_default_default.random;
wrapperLodash_default.reduce = collection_default_default.reduce;
wrapperLodash_default.reduceRight = collection_default_default.reduceRight;
wrapperLodash_default.repeat = string_default_default.repeat;
wrapperLodash_default.replace = string_default_default.replace;
wrapperLodash_default.result = object_default_default.result;
wrapperLodash_default.round = math_default_default.round;
wrapperLodash_default.sample = collection_default_default.sample;
wrapperLodash_default.size = collection_default_default.size;
wrapperLodash_default.snakeCase = string_default_default.snakeCase;
wrapperLodash_default.some = collection_default_default.some;
wrapperLodash_default.sortedIndex = array_default_default.sortedIndex;
wrapperLodash_default.sortedIndexBy = array_default_default.sortedIndexBy;
wrapperLodash_default.sortedIndexOf = array_default_default.sortedIndexOf;
wrapperLodash_default.sortedLastIndex = array_default_default.sortedLastIndex;
wrapperLodash_default.sortedLastIndexBy = array_default_default.sortedLastIndexBy;
wrapperLodash_default.sortedLastIndexOf = array_default_default.sortedLastIndexOf;
wrapperLodash_default.startCase = string_default_default.startCase;
wrapperLodash_default.startsWith = string_default_default.startsWith;
wrapperLodash_default.subtract = math_default_default.subtract;
wrapperLodash_default.sum = math_default_default.sum;
wrapperLodash_default.sumBy = math_default_default.sumBy;
wrapperLodash_default.template = string_default_default.template;
wrapperLodash_default.times = util_default_default.times;
wrapperLodash_default.toFinite = lang_default_default.toFinite;
wrapperLodash_default.toInteger = toInteger_default;
wrapperLodash_default.toLength = lang_default_default.toLength;
wrapperLodash_default.toLower = string_default_default.toLower;
wrapperLodash_default.toNumber = lang_default_default.toNumber;
wrapperLodash_default.toSafeInteger = lang_default_default.toSafeInteger;
wrapperLodash_default.toString = lang_default_default.toString;
wrapperLodash_default.toUpper = string_default_default.toUpper;
wrapperLodash_default.trim = string_default_default.trim;
wrapperLodash_default.trimEnd = string_default_default.trimEnd;
wrapperLodash_default.trimStart = string_default_default.trimStart;
wrapperLodash_default.truncate = string_default_default.truncate;
wrapperLodash_default.unescape = string_default_default.unescape;
wrapperLodash_default.uniqueId = util_default_default.uniqueId;
wrapperLodash_default.upperCase = string_default_default.upperCase;
wrapperLodash_default.upperFirst = string_default_default.upperFirst;
wrapperLodash_default.each = collection_default_default.forEach;
wrapperLodash_default.eachRight = collection_default_default.forEachRight;
wrapperLodash_default.first = array_default_default.head;
mixin2(wrapperLodash_default, function() {
  var source = {};
  baseForOwn_default(wrapperLodash_default, function(func, methodName) {
    if (!hasOwnProperty26.call(wrapperLodash_default.prototype, methodName)) {
      source[methodName] = func;
    }
  });
  return source;
}(), { "chain": false });
wrapperLodash_default.VERSION = VERSION;
(wrapperLodash_default.templateSettings = string_default_default.templateSettings).imports._ = wrapperLodash_default;
arrayEach_default(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
  wrapperLodash_default[methodName].placeholder = wrapperLodash_default;
});
arrayEach_default(["drop", "take"], function(methodName, index) {
  LazyWrapper_default.prototype[methodName] = function(n) {
    n = n === void 0 ? 1 : nativeMax17(toInteger_default(n), 0);
    var result2 = this.__filtered__ && !index ? new LazyWrapper_default(this) : this.clone();
    if (result2.__filtered__) {
      result2.__takeCount__ = nativeMin15(n, result2.__takeCount__);
    } else {
      result2.__views__.push({
        "size": nativeMin15(n, MAX_ARRAY_LENGTH7),
        "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
      });
    }
    return result2;
  };
  LazyWrapper_default.prototype[methodName + "Right"] = function(n) {
    return this.reverse()[methodName](n).reverse();
  };
});
arrayEach_default(["filter", "map", "takeWhile"], function(methodName, index) {
  var type = index + 1, isFilter = type == LAZY_FILTER_FLAG2 || type == LAZY_WHILE_FLAG;
  LazyWrapper_default.prototype[methodName] = function(iteratee2) {
    var result2 = this.clone();
    result2.__iteratees__.push({
      "iteratee": baseIteratee_default(iteratee2, 3),
      "type": type
    });
    result2.__filtered__ = result2.__filtered__ || isFilter;
    return result2;
  };
});
arrayEach_default(["head", "last"], function(methodName, index) {
  var takeName = "take" + (index ? "Right" : "");
  LazyWrapper_default.prototype[methodName] = function() {
    return this[takeName](1).value()[0];
  };
});
arrayEach_default(["initial", "tail"], function(methodName, index) {
  var dropName = "drop" + (index ? "" : "Right");
  LazyWrapper_default.prototype[methodName] = function() {
    return this.__filtered__ ? new LazyWrapper_default(this) : this[dropName](1);
  };
});
LazyWrapper_default.prototype.compact = function() {
  return this.filter(identity_default);
};
LazyWrapper_default.prototype.find = function(predicate) {
  return this.filter(predicate).head();
};
LazyWrapper_default.prototype.findLast = function(predicate) {
  return this.reverse().find(predicate);
};
LazyWrapper_default.prototype.invokeMap = baseRest_default(function(path, args) {
  if (typeof path == "function") {
    return new LazyWrapper_default(this);
  }
  return this.map(function(value) {
    return baseInvoke_default(value, path, args);
  });
});
LazyWrapper_default.prototype.reject = function(predicate) {
  return this.filter(negate_default(baseIteratee_default(predicate)));
};
LazyWrapper_default.prototype.slice = function(start, end) {
  start = toInteger_default(start);
  var result2 = this;
  if (result2.__filtered__ && (start > 0 || end < 0)) {
    return new LazyWrapper_default(result2);
  }
  if (start < 0) {
    result2 = result2.takeRight(-start);
  } else if (start) {
    result2 = result2.drop(start);
  }
  if (end !== void 0) {
    end = toInteger_default(end);
    result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
  }
  return result2;
};
LazyWrapper_default.prototype.takeRightWhile = function(predicate) {
  return this.reverse().takeWhile(predicate).reverse();
};
LazyWrapper_default.prototype.toArray = function() {
  return this.take(MAX_ARRAY_LENGTH7);
};
baseForOwn_default(LazyWrapper_default.prototype, function(func, methodName) {
  var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = wrapperLodash_default[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
  if (!lodashFunc) {
    return;
  }
  wrapperLodash_default.prototype[methodName] = function() {
    var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper_default, iteratee2 = args[0], useLazy = isLazy || isArray_default(value);
    var interceptor = function(value2) {
      var result3 = lodashFunc.apply(wrapperLodash_default, arrayPush_default([value2], args));
      return isTaker && chainAll ? result3[0] : result3;
    };
    if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
      isLazy = useLazy = false;
    }
    var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
    if (!retUnwrapped && useLazy) {
      value = onlyLazy ? value : new LazyWrapper_default(this);
      var result2 = func.apply(value, args);
      result2.__actions__.push({ "func": thru_default, "args": [interceptor], "thisArg": void 0 });
      return new LodashWrapper_default(result2, chainAll);
    }
    if (isUnwrapped && onlyLazy) {
      return func.apply(this, args);
    }
    result2 = this.thru(interceptor);
    return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
  };
});
arrayEach_default(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
  var func = arrayProto6[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
  wrapperLodash_default.prototype[methodName] = function() {
    var args = arguments;
    if (retUnwrapped && !this.__chain__) {
      var value = this.value();
      return func.apply(isArray_default(value) ? value : [], args);
    }
    return this[chainName](function(value2) {
      return func.apply(isArray_default(value2) ? value2 : [], args);
    });
  };
});
baseForOwn_default(LazyWrapper_default.prototype, function(func, methodName) {
  var lodashFunc = wrapperLodash_default[methodName];
  if (lodashFunc) {
    var key = lodashFunc.name + "";
    if (!hasOwnProperty26.call(realNames_default, key)) {
      realNames_default[key] = [];
    }
    realNames_default[key].push({ "name": methodName, "func": lodashFunc });
  }
});
realNames_default[createHybrid_default(void 0, WRAP_BIND_KEY_FLAG7).name] = [{
  "name": "wrapper",
  "func": void 0
}];
LazyWrapper_default.prototype.clone = lazyClone_default;
LazyWrapper_default.prototype.reverse = lazyReverse_default;
LazyWrapper_default.prototype.value = lazyValue_default;
wrapperLodash_default.prototype.at = seq_default_default.at;
wrapperLodash_default.prototype.chain = seq_default_default.wrapperChain;
wrapperLodash_default.prototype.commit = seq_default_default.commit;
wrapperLodash_default.prototype.next = seq_default_default.next;
wrapperLodash_default.prototype.plant = seq_default_default.plant;
wrapperLodash_default.prototype.reverse = seq_default_default.reverse;
wrapperLodash_default.prototype.toJSON = wrapperLodash_default.prototype.valueOf = wrapperLodash_default.prototype.value = seq_default_default.value;
wrapperLodash_default.prototype.first = wrapperLodash_default.prototype.head;
if (symIterator2) {
  wrapperLodash_default.prototype[symIterator2] = seq_default_default.toIterator;
}

// node_modules/.pnpm/@chevrotain+utils@11.1.2/node_modules/@chevrotain/utils/lib/src/print.js
function PRINT_ERROR(msg) {
  if (console && console.error) {
    console.error(`Error: ${msg}`);
  }
}
function PRINT_WARNING(msg) {
  if (console && console.warn) {
    console.warn(`Warning: ${msg}`);
  }
}

// node_modules/.pnpm/@chevrotain+utils@11.1.2/node_modules/@chevrotain/utils/lib/src/timer.js
function timer(func) {
  const start = (/* @__PURE__ */ new Date()).getTime();
  const val = func();
  const end = (/* @__PURE__ */ new Date()).getTime();
  const total = end - start;
  return { time: total, value: val };
}

// node_modules/.pnpm/@chevrotain+utils@11.1.2/node_modules/@chevrotain/utils/lib/src/to-fast-properties.js
function toFastProperties(toBecomeFast) {
  function FakeConstructor() {
  }
  FakeConstructor.prototype = toBecomeFast;
  const fakeInstance = new FakeConstructor();
  function fakeAccess() {
    return typeof fakeInstance.bar;
  }
  fakeAccess();
  fakeAccess();
  if (1)
    return toBecomeFast;
  (0, eval)(toBecomeFast);
}

// node_modules/.pnpm/@chevrotain+gast@11.1.2/node_modules/@chevrotain/gast/lib/src/model.js
function tokenLabel(tokType) {
  if (hasTokenLabel(tokType)) {
    return tokType.LABEL;
  } else {
    return tokType.name;
  }
}
function hasTokenLabel(obj) {
  return isString_default(obj.LABEL) && obj.LABEL !== "";
}
var AbstractProduction = class {
  get definition() {
    return this._definition;
  }
  set definition(value) {
    this._definition = value;
  }
  constructor(_definition) {
    this._definition = _definition;
  }
  accept(visitor) {
    visitor.visit(this);
    forEach_default(this.definition, (prod) => {
      prod.accept(visitor);
    });
  }
};
var NonTerminal = class extends AbstractProduction {
  constructor(options) {
    super([]);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
  set definition(definition) {
  }
  get definition() {
    if (this.referencedRule !== void 0) {
      return this.referencedRule.definition;
    }
    return [];
  }
  accept(visitor) {
    visitor.visit(this);
  }
};
var Rule = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.orgText = "";
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Alternative = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.ignoreAmbiguities = false;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Option = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var RepetitionMandatory = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var RepetitionMandatoryWithSeparator = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Repetition = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var RepetitionWithSeparator = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Alternation = class extends AbstractProduction {
  get definition() {
    return this._definition;
  }
  set definition(value) {
    this._definition = value;
  }
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    this.ignoreAmbiguities = false;
    this.hasPredicates = false;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Terminal = class {
  constructor(options) {
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
  accept(visitor) {
    visitor.visit(this);
  }
};
function serializeGrammar(topRules) {
  return map_default(topRules, serializeProduction);
}
function serializeProduction(node) {
  function convertDefinition(definition) {
    return map_default(definition, serializeProduction);
  }
  if (node instanceof NonTerminal) {
    const serializedNonTerminal = {
      type: "NonTerminal",
      name: node.nonTerminalName,
      idx: node.idx
    };
    if (isString_default(node.label)) {
      serializedNonTerminal.label = node.label;
    }
    return serializedNonTerminal;
  } else if (node instanceof Alternative) {
    return {
      type: "Alternative",
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Option) {
    return {
      type: "Option",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionMandatory) {
    return {
      type: "RepetitionMandatory",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionMandatoryWithSeparator) {
    return {
      type: "RepetitionMandatoryWithSeparator",
      idx: node.idx,
      separator: serializeProduction(new Terminal({ terminalType: node.separator })),
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionWithSeparator) {
    return {
      type: "RepetitionWithSeparator",
      idx: node.idx,
      separator: serializeProduction(new Terminal({ terminalType: node.separator })),
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Repetition) {
    return {
      type: "Repetition",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Alternation) {
    return {
      type: "Alternation",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Terminal) {
    const serializedTerminal = {
      type: "Terminal",
      name: node.terminalType.name,
      label: tokenLabel(node.terminalType),
      idx: node.idx
    };
    if (isString_default(node.label)) {
      serializedTerminal.terminalLabel = node.label;
    }
    const pattern = node.terminalType.PATTERN;
    if (node.terminalType.PATTERN) {
      serializedTerminal.pattern = isRegExp_default(pattern) ? pattern.source : pattern;
    }
    return serializedTerminal;
  } else if (node instanceof Rule) {
    return {
      type: "Rule",
      name: node.name,
      orgText: node.orgText,
      definition: convertDefinition(node.definition)
    };
  } else {
    throw Error("non exhaustive match");
  }
}

// node_modules/.pnpm/@chevrotain+gast@11.1.2/node_modules/@chevrotain/gast/lib/src/visitor.js
var GAstVisitor = class {
  visit(node) {
    const nodeAny = node;
    switch (nodeAny.constructor) {
      case NonTerminal:
        return this.visitNonTerminal(nodeAny);
      case Alternative:
        return this.visitAlternative(nodeAny);
      case Option:
        return this.visitOption(nodeAny);
      case RepetitionMandatory:
        return this.visitRepetitionMandatory(nodeAny);
      case RepetitionMandatoryWithSeparator:
        return this.visitRepetitionMandatoryWithSeparator(nodeAny);
      case RepetitionWithSeparator:
        return this.visitRepetitionWithSeparator(nodeAny);
      case Repetition:
        return this.visitRepetition(nodeAny);
      case Alternation:
        return this.visitAlternation(nodeAny);
      case Terminal:
        return this.visitTerminal(nodeAny);
      case Rule:
        return this.visitRule(nodeAny);
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(node) {
  }
  /* c8 ignore next */
  visitAlternative(node) {
  }
  /* c8 ignore next */
  visitOption(node) {
  }
  /* c8 ignore next */
  visitRepetition(node) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(node) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(node) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(node) {
  }
  /* c8 ignore next */
  visitAlternation(node) {
  }
  /* c8 ignore next */
  visitTerminal(node) {
  }
  /* c8 ignore next */
  visitRule(node) {
  }
};

// node_modules/.pnpm/@chevrotain+gast@11.1.2/node_modules/@chevrotain/gast/lib/src/helpers.js
function isSequenceProd(prod) {
  return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
}
function isOptionalProd(prod, alreadyVisited = []) {
  const isDirectlyOptional = prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator;
  if (isDirectlyOptional) {
    return true;
  }
  if (prod instanceof Alternation) {
    return some_default(prod.definition, (subProd) => {
      return isOptionalProd(subProd, alreadyVisited);
    });
  } else if (prod instanceof NonTerminal && includes_default(alreadyVisited, prod)) {
    return false;
  } else if (prod instanceof AbstractProduction) {
    if (prod instanceof NonTerminal) {
      alreadyVisited.push(prod);
    }
    return every_default(prod.definition, (subProd) => {
      return isOptionalProd(subProd, alreadyVisited);
    });
  } else {
    return false;
  }
}
function isBranchingProd(prod) {
  return prod instanceof Alternation;
}
function getProductionDslName(prod) {
  if (prod instanceof NonTerminal) {
    return "SUBRULE";
  } else if (prod instanceof Option) {
    return "OPTION";
  } else if (prod instanceof Alternation) {
    return "OR";
  } else if (prod instanceof RepetitionMandatory) {
    return "AT_LEAST_ONE";
  } else if (prod instanceof RepetitionMandatoryWithSeparator) {
    return "AT_LEAST_ONE_SEP";
  } else if (prod instanceof RepetitionWithSeparator) {
    return "MANY_SEP";
  } else if (prod instanceof Repetition) {
    return "MANY";
  } else if (prod instanceof Terminal) {
    return "CONSUME";
  } else {
    throw Error("non exhaustive match");
  }
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/rest.js
var RestWalker = class {
  walk(prod, prevRest = []) {
    forEach_default(prod.definition, (subProd, index) => {
      const currRest = drop_default(prod.definition, index + 1);
      if (subProd instanceof NonTerminal) {
        this.walkProdRef(subProd, currRest, prevRest);
      } else if (subProd instanceof Terminal) {
        this.walkTerminal(subProd, currRest, prevRest);
      } else if (subProd instanceof Alternative) {
        this.walkFlat(subProd, currRest, prevRest);
      } else if (subProd instanceof Option) {
        this.walkOption(subProd, currRest, prevRest);
      } else if (subProd instanceof RepetitionMandatory) {
        this.walkAtLeastOne(subProd, currRest, prevRest);
      } else if (subProd instanceof RepetitionMandatoryWithSeparator) {
        this.walkAtLeastOneSep(subProd, currRest, prevRest);
      } else if (subProd instanceof RepetitionWithSeparator) {
        this.walkManySep(subProd, currRest, prevRest);
      } else if (subProd instanceof Repetition) {
        this.walkMany(subProd, currRest, prevRest);
      } else if (subProd instanceof Alternation) {
        this.walkOr(subProd, currRest, prevRest);
      } else {
        throw Error("non exhaustive match");
      }
    });
  }
  walkTerminal(terminal, currRest, prevRest) {
  }
  walkProdRef(refProd, currRest, prevRest) {
  }
  walkFlat(flatProd, currRest, prevRest) {
    const fullOrRest = currRest.concat(prevRest);
    this.walk(flatProd, fullOrRest);
  }
  walkOption(optionProd, currRest, prevRest) {
    const fullOrRest = currRest.concat(prevRest);
    this.walk(optionProd, fullOrRest);
  }
  walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
    const fullAtLeastOneRest = [
      new Option({ definition: atLeastOneProd.definition })
    ].concat(currRest, prevRest);
    this.walk(atLeastOneProd, fullAtLeastOneRest);
  }
  walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
    const fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
    this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
  }
  walkMany(manyProd, currRest, prevRest) {
    const fullManyRest = [
      new Option({ definition: manyProd.definition })
    ].concat(currRest, prevRest);
    this.walk(manyProd, fullManyRest);
  }
  walkManySep(manySepProd, currRest, prevRest) {
    const fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
    this.walk(manySepProd, fullManySepRest);
  }
  walkOr(orProd, currRest, prevRest) {
    const fullOrRest = currRest.concat(prevRest);
    forEach_default(orProd.definition, (alt) => {
      const prodWrapper = new Alternative({ definition: [alt] });
      this.walk(prodWrapper, fullOrRest);
    });
  }
};
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
  const repSepRest = [
    new Option({
      definition: [
        new Terminal({ terminalType: repSepProd.separator })
      ].concat(repSepProd.definition)
    })
  ];
  const fullRepSepRest = repSepRest.concat(currRest, prevRest);
  return fullRepSepRest;
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/first.js
function first(prod) {
  if (prod instanceof NonTerminal) {
    return first(prod.referencedRule);
  } else if (prod instanceof Terminal) {
    return firstForTerminal(prod);
  } else if (isSequenceProd(prod)) {
    return firstForSequence(prod);
  } else if (isBranchingProd(prod)) {
    return firstForBranching(prod);
  } else {
    throw Error("non exhaustive match");
  }
}
function firstForSequence(prod) {
  let firstSet = [];
  const seq = prod.definition;
  let nextSubProdIdx = 0;
  let hasInnerProdsRemaining = seq.length > nextSubProdIdx;
  let currSubProd;
  let isLastInnerProdOptional = true;
  while (hasInnerProdsRemaining && isLastInnerProdOptional) {
    currSubProd = seq[nextSubProdIdx];
    isLastInnerProdOptional = isOptionalProd(currSubProd);
    firstSet = firstSet.concat(first(currSubProd));
    nextSubProdIdx = nextSubProdIdx + 1;
    hasInnerProdsRemaining = seq.length > nextSubProdIdx;
  }
  return uniq_default(firstSet);
}
function firstForBranching(prod) {
  const allAlternativesFirsts = map_default(prod.definition, (innerProd) => {
    return first(innerProd);
  });
  return uniq_default(flatten_default(allAlternativesFirsts));
}
function firstForTerminal(terminal) {
  return [terminal.terminalType];
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/constants.js
var IN = "_~IN~_";

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/follow.js
var ResyncFollowsWalker = class extends RestWalker {
  constructor(topProd) {
    super();
    this.topProd = topProd;
    this.follows = {};
  }
  startWalking() {
    this.walk(this.topProd);
    return this.follows;
  }
  walkTerminal(terminal, currRest, prevRest) {
  }
  walkProdRef(refProd, currRest, prevRest) {
    const followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
    const fullRest = currRest.concat(prevRest);
    const restProd = new Alternative({ definition: fullRest });
    const t_in_topProd_follows = first(restProd);
    this.follows[followName] = t_in_topProd_follows;
  }
};
function computeAllProdsFollows(topProductions) {
  const reSyncFollows = {};
  forEach_default(topProductions, (topProd) => {
    const currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
    assign_default(reSyncFollows, currRefsFollow);
  });
  return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
  return inner.name + occurenceInParent + IN;
}

// node_modules/.pnpm/@chevrotain+regexp-to-ast@11.1.2/node_modules/@chevrotain/regexp-to-ast/lib/src/utils.js
function cc(char) {
  return char.charCodeAt(0);
}
function insertToSet(item, set2) {
  if (Array.isArray(item)) {
    item.forEach(function(subItem) {
      set2.push(subItem);
    });
  } else {
    set2.push(item);
  }
}
function addFlag(flagObj, flagKey) {
  if (flagObj[flagKey] === true) {
    throw "duplicate flag " + flagKey;
  }
  const x = flagObj[flagKey];
  flagObj[flagKey] = true;
}
function ASSERT_EXISTS(obj) {
  if (obj === void 0) {
    throw Error("Internal Error - Should never get here!");
  }
  return true;
}
function ASSERT_NEVER_REACH_HERE() {
  throw Error("Internal Error - Should never get here!");
}
function isCharacter(obj) {
  return obj["type"] === "Character";
}

// node_modules/.pnpm/@chevrotain+regexp-to-ast@11.1.2/node_modules/@chevrotain/regexp-to-ast/lib/src/character-classes.js
var digitsCharCodes = [];
for (let i = cc("0"); i <= cc("9"); i++) {
  digitsCharCodes.push(i);
}
var wordCharCodes = [cc("_")].concat(digitsCharCodes);
for (let i = cc("a"); i <= cc("z"); i++) {
  wordCharCodes.push(i);
}
for (let i = cc("A"); i <= cc("Z"); i++) {
  wordCharCodes.push(i);
}
var whitespaceCodes = [
  cc(" "),
  cc("\f"),
  cc("\n"),
  cc("\r"),
  cc("	"),
  cc("\v"),
  cc("	"),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc(" "),
  cc("\u2028"),
  cc("\u2029"),
  cc(" "),
  cc(" "),
  cc("　"),
  cc("\uFEFF")
];

// node_modules/.pnpm/@chevrotain+regexp-to-ast@11.1.2/node_modules/@chevrotain/regexp-to-ast/lib/src/regexp-parser.js
var hexDigitPattern = /[0-9a-fA-F]/;
var decimalPattern = /[0-9]/;
var decimalPatternNoZero = /[1-9]/;
var RegExpParser = class {
  constructor() {
    this.idx = 0;
    this.input = "";
    this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(newState) {
    this.idx = newState.idx;
    this.input = newState.input;
    this.groupIdx = newState.groupIdx;
  }
  pattern(input) {
    this.idx = 0;
    this.input = input;
    this.groupIdx = 0;
    this.consumeChar("/");
    const value = this.disjunction();
    this.consumeChar("/");
    const flags = {
      type: "Flags",
      loc: { begin: this.idx, end: input.length },
      global: false,
      ignoreCase: false,
      multiLine: false,
      unicode: false,
      sticky: false
    };
    while (this.isRegExpFlag()) {
      switch (this.popChar()) {
        case "g":
          addFlag(flags, "global");
          break;
        case "i":
          addFlag(flags, "ignoreCase");
          break;
        case "m":
          addFlag(flags, "multiLine");
          break;
        case "u":
          addFlag(flags, "unicode");
          break;
        case "y":
          addFlag(flags, "sticky");
          break;
      }
    }
    if (this.idx !== this.input.length) {
      throw Error("Redundant input: " + this.input.substring(this.idx));
    }
    return {
      type: "Pattern",
      flags,
      value,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const alts = [];
    const begin = this.idx;
    alts.push(this.alternative());
    while (this.peekChar() === "|") {
      this.consumeChar("|");
      alts.push(this.alternative());
    }
    return { type: "Disjunction", value: alts, loc: this.loc(begin) };
  }
  alternative() {
    const terms = [];
    const begin = this.idx;
    while (this.isTerm()) {
      terms.push(this.term());
    }
    return { type: "Alternative", value: terms, loc: this.loc(begin) };
  }
  term() {
    if (this.isAssertion()) {
      return this.assertion();
    } else {
      return this.atom();
    }
  }
  assertion() {
    const begin = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(begin)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(begin) };
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(begin)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(begin)
            };
        }
        throw Error("Invalid Assertion Escape");
      case "(":
        this.consumeChar("?");
        let type;
        switch (this.popChar()) {
          case "=":
            type = "Lookahead";
            break;
          case "!":
            type = "NegativeLookahead";
            break;
          case "<": {
            switch (this.popChar()) {
              case "=":
                type = "Lookbehind";
                break;
              case "!":
                type = "NegativeLookbehind";
            }
            break;
          }
        }
        ASSERT_EXISTS(type);
        const disjunction = this.disjunction();
        this.consumeChar(")");
        return {
          type,
          value: disjunction,
          loc: this.loc(begin)
        };
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  quantifier(isBacktracking = false) {
    let range2 = void 0;
    const begin = this.idx;
    switch (this.popChar()) {
      case "*":
        range2 = {
          atLeast: 0,
          atMost: Infinity
        };
        break;
      case "+":
        range2 = {
          atLeast: 1,
          atMost: Infinity
        };
        break;
      case "?":
        range2 = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const atLeast = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            range2 = {
              atLeast,
              atMost: atLeast
            };
            break;
          case ",":
            let atMost;
            if (this.isDigit()) {
              atMost = this.integerIncludingZero();
              range2 = {
                atLeast,
                atMost
              };
            } else {
              range2 = {
                atLeast,
                atMost: Infinity
              };
            }
            this.consumeChar("}");
            break;
        }
        if (isBacktracking === true && range2 === void 0) {
          return void 0;
        }
        ASSERT_EXISTS(range2);
        break;
    }
    if (isBacktracking === true && range2 === void 0) {
      return void 0;
    }
    if (ASSERT_EXISTS(range2)) {
      if (this.peekChar(0) === "?") {
        this.consumeChar("?");
        range2.greedy = false;
      } else {
        range2.greedy = true;
      }
      range2.type = "Quantifier";
      range2.loc = this.loc(begin);
      return range2;
    }
  }
  atom() {
    let atom;
    const begin = this.idx;
    switch (this.peekChar()) {
      case ".":
        atom = this.dotAll();
        break;
      case "\\":
        atom = this.atomEscape();
        break;
      case "[":
        atom = this.characterClass();
        break;
      case "(":
        atom = this.group();
        break;
    }
    if (atom === void 0 && this.isPatternCharacter()) {
      atom = this.patternCharacter();
    }
    if (ASSERT_EXISTS(atom)) {
      atom.loc = this.loc(begin);
      if (this.isQuantifier()) {
        atom.quantifier = this.quantifier();
      }
      return atom;
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  dotAll() {
    this.consumeChar(".");
    return {
      type: "Set",
      complement: true,
      value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
    };
  }
  atomEscape() {
    this.consumeChar("\\");
    switch (this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    const value = this.positiveInteger();
    return { type: "GroupBackReference", value };
  }
  characterClassEscape() {
    let set2;
    let complement = false;
    switch (this.popChar()) {
      case "d":
        set2 = digitsCharCodes;
        break;
      case "D":
        set2 = digitsCharCodes;
        complement = true;
        break;
      case "s":
        set2 = whitespaceCodes;
        break;
      case "S":
        set2 = whitespaceCodes;
        complement = true;
        break;
      case "w":
        set2 = wordCharCodes;
        break;
      case "W":
        set2 = wordCharCodes;
        complement = true;
        break;
    }
    if (ASSERT_EXISTS(set2)) {
      return { type: "Set", value: set2, complement };
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  controlEscapeAtom() {
    let escapeCode;
    switch (this.popChar()) {
      case "f":
        escapeCode = cc("\f");
        break;
      case "n":
        escapeCode = cc("\n");
        break;
      case "r":
        escapeCode = cc("\r");
        break;
      case "t":
        escapeCode = cc("	");
        break;
      case "v":
        escapeCode = cc("\v");
        break;
    }
    if (ASSERT_EXISTS(escapeCode)) {
      return { type: "Character", value: escapeCode };
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const letter = this.popChar();
    if (/[a-zA-Z]/.test(letter) === false) {
      throw Error("Invalid ");
    }
    const letterCode = letter.toUpperCase().charCodeAt(0) - 64;
    return { type: "Character", value: letterCode };
  }
  nulCharacterAtom() {
    this.consumeChar("0");
    return { type: "Character", value: cc("\0") };
  }
  hexEscapeSequenceAtom() {
    this.consumeChar("x");
    return this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    this.consumeChar("u");
    return this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const escapedChar = this.popChar();
    return { type: "Character", value: cc(escapedChar) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
      case "\\":
      case "]":
        throw Error("TBD");
      default:
        const nextChar = this.popChar();
        return { type: "Character", value: cc(nextChar) };
    }
  }
  characterClass() {
    const set2 = [];
    let complement = false;
    this.consumeChar("[");
    if (this.peekChar(0) === "^") {
      this.consumeChar("^");
      complement = true;
    }
    while (this.isClassAtom()) {
      const from = this.classAtom();
      const isFromSingleChar = from.type === "Character";
      if (isCharacter(from) && this.isRangeDash()) {
        this.consumeChar("-");
        const to = this.classAtom();
        const isToSingleChar = to.type === "Character";
        if (isCharacter(to)) {
          if (to.value < from.value) {
            throw Error("Range out of order in character class");
          }
          set2.push({ from: from.value, to: to.value });
        } else {
          insertToSet(from.value, set2);
          set2.push(cc("-"));
          insertToSet(to.value, set2);
        }
      } else {
        insertToSet(from.value, set2);
      }
    }
    this.consumeChar("]");
    return { type: "Set", complement, value: set2 };
  }
  classAtom() {
    switch (this.peekChar()) {
      case "]":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    this.consumeChar("\\");
    switch (this.peekChar()) {
      case "b":
        this.consumeChar("b");
        return { type: "Character", value: cc("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let capturing = true;
    this.consumeChar("(");
    switch (this.peekChar(0)) {
      case "?":
        this.consumeChar("?");
        this.consumeChar(":");
        capturing = false;
        break;
      default:
        this.groupIdx++;
        break;
    }
    const value = this.disjunction();
    this.consumeChar(")");
    const groupAst = {
      type: "Group",
      capturing,
      value
    };
    if (capturing) {
      groupAst["idx"] = this.groupIdx;
    }
    return groupAst;
  }
  positiveInteger() {
    let number = this.popChar();
    if (decimalPatternNoZero.test(number) === false) {
      throw Error("Expecting a positive integer");
    }
    while (decimalPattern.test(this.peekChar(0))) {
      number += this.popChar();
    }
    return parseInt(number, 10);
  }
  integerIncludingZero() {
    let number = this.popChar();
    if (decimalPattern.test(number) === false) {
      throw Error("Expecting an integer");
    }
    while (decimalPattern.test(this.peekChar(0))) {
      number += this.popChar();
    }
    return parseInt(number, 10);
  }
  patternCharacter() {
    const nextChar = this.popChar();
    switch (nextChar) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: cc(nextChar) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return true;
      default:
        return false;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return decimalPattern.test(this.peekChar(0));
  }
  isClassAtom(howMuch = 0) {
    switch (this.peekChar(howMuch)) {
      case "]":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter()) {
      return true;
    }
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      case "[":
      case "(":
        return true;
      default:
        return false;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return true;
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return true;
          default:
            return false;
        }
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
      default:
        return false;
    }
  }
  isQuantifier() {
    const prevState = this.saveState();
    try {
      return this.quantifier(true) !== void 0;
    } catch (e) {
      return false;
    } finally {
      this.restoreState(prevState);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  parseHexDigits(howMany) {
    let hexString = "";
    for (let i = 0; i < howMany; i++) {
      const hexChar = this.popChar();
      if (hexDigitPattern.test(hexChar) === false) {
        throw Error("Expecting a HexDecimal digits");
      }
      hexString += hexChar;
    }
    const charCode = parseInt(hexString, 16);
    return { type: "Character", value: charCode };
  }
  peekChar(howMuch = 0) {
    return this.input[this.idx + howMuch];
  }
  popChar() {
    const nextChar = this.peekChar(0);
    this.consumeChar(void 0);
    return nextChar;
  }
  consumeChar(char) {
    if (char !== void 0 && this.input[this.idx] !== char) {
      throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    }
    if (this.idx >= this.input.length) {
      throw Error("Unexpected end of input");
    }
    this.idx++;
  }
  loc(begin) {
    return { begin, end: this.idx };
  }
};

// node_modules/.pnpm/@chevrotain+regexp-to-ast@11.1.2/node_modules/@chevrotain/regexp-to-ast/lib/src/base-regexp-visitor.js
var BaseRegExpVisitor = class {
  visitChildren(node) {
    for (const key in node) {
      const child = node[key];
      if (node.hasOwnProperty(key)) {
        if (child.type !== void 0) {
          this.visit(child);
        } else if (Array.isArray(child)) {
          child.forEach((subChild) => {
            this.visit(subChild);
          }, this);
        }
      }
    }
  }
  visit(node) {
    switch (node.type) {
      case "Pattern":
        this.visitPattern(node);
        break;
      case "Flags":
        this.visitFlags(node);
        break;
      case "Disjunction":
        this.visitDisjunction(node);
        break;
      case "Alternative":
        this.visitAlternative(node);
        break;
      case "StartAnchor":
        this.visitStartAnchor(node);
        break;
      case "EndAnchor":
        this.visitEndAnchor(node);
        break;
      case "WordBoundary":
        this.visitWordBoundary(node);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(node);
        break;
      case "Lookahead":
        this.visitLookahead(node);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(node);
        break;
      case "Lookbehind":
        this.visitLookbehind(node);
        break;
      case "NegativeLookbehind":
        this.visitNegativeLookbehind(node);
        break;
      case "Character":
        this.visitCharacter(node);
        break;
      case "Set":
        this.visitSet(node);
        break;
      case "Group":
        this.visitGroup(node);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(node);
        break;
      case "Quantifier":
        this.visitQuantifier(node);
        break;
    }
    this.visitChildren(node);
  }
  visitPattern(node) {
  }
  visitFlags(node) {
  }
  visitDisjunction(node) {
  }
  visitAlternative(node) {
  }
  // Assertion
  visitStartAnchor(node) {
  }
  visitEndAnchor(node) {
  }
  visitWordBoundary(node) {
  }
  visitNonWordBoundary(node) {
  }
  visitLookahead(node) {
  }
  visitNegativeLookahead(node) {
  }
  visitLookbehind(node) {
  }
  visitNegativeLookbehind(node) {
  }
  // atoms
  visitCharacter(node) {
  }
  visitSet(node) {
  }
  visitGroup(node) {
  }
  visitGroupBackReference(node) {
  }
  visitQuantifier(node) {
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/reg_exp_parser.js
var regExpAstCache = {};
var regExpParser = new RegExpParser();
function getRegExpAst(regExp) {
  const regExpStr = regExp.toString();
  if (regExpAstCache.hasOwnProperty(regExpStr)) {
    return regExpAstCache[regExpStr];
  } else {
    const regExpAst = regExpParser.pattern(regExpStr);
    regExpAstCache[regExpStr] = regExpAst;
    return regExpAst;
  }
}
function clearRegExpParserCache() {
  regExpAstCache = {};
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/reg_exp.js
var complementErrorMessage = "Complement Sets are not supported for first char optimization";
var failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
function getOptimizedStartCodesIndices(regExp, ensureOptimizations = false) {
  try {
    const ast = getRegExpAst(regExp);
    const firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
    return firstChars;
  } catch (e) {
    if (e.message === complementErrorMessage) {
      if (ensureOptimizations) {
        PRINT_WARNING(`${failedOptimizationPrefixMsg}	Unable to optimize: < ${regExp.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
      }
    } else {
      let msgSuffix = "";
      if (ensureOptimizations) {
        msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
      }
      PRINT_ERROR(`${failedOptimizationPrefixMsg}
	Failed parsing: < ${regExp.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + msgSuffix);
    }
  }
  return [];
}
function firstCharOptimizedIndices(ast, result2, ignoreCase) {
  switch (ast.type) {
    case "Disjunction":
      for (let i = 0; i < ast.value.length; i++) {
        firstCharOptimizedIndices(ast.value[i], result2, ignoreCase);
      }
      break;
    case "Alternative":
      const terms = ast.value;
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        switch (term.type) {
          case "EndAnchor":
          case "GroupBackReference":
          case "Lookahead":
          case "NegativeLookahead":
          case "Lookbehind":
          case "NegativeLookbehind":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const atom = term;
        switch (atom.type) {
          case "Character":
            addOptimizedIdxToResult(atom.value, result2, ignoreCase);
            break;
          case "Set":
            if (atom.complement === true) {
              throw Error(complementErrorMessage);
            }
            forEach_default(atom.value, (code) => {
              if (typeof code === "number") {
                addOptimizedIdxToResult(code, result2, ignoreCase);
              } else {
                const range2 = code;
                if (ignoreCase === true) {
                  for (let rangeCode = range2.from; rangeCode <= range2.to; rangeCode++) {
                    addOptimizedIdxToResult(rangeCode, result2, ignoreCase);
                  }
                } else {
                  for (let rangeCode = range2.from; rangeCode <= range2.to && rangeCode < minOptimizationVal; rangeCode++) {
                    addOptimizedIdxToResult(rangeCode, result2, ignoreCase);
                  }
                  if (range2.to >= minOptimizationVal) {
                    const minUnOptVal = range2.from >= minOptimizationVal ? range2.from : minOptimizationVal;
                    const maxUnOptVal = range2.to;
                    const minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
                    const maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
                    for (let currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                      result2[currOptIdx] = currOptIdx;
                    }
                  }
                }
              }
            });
            break;
          case "Group":
            firstCharOptimizedIndices(atom.value, result2, ignoreCase);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          atom.type === "Group" && isWholeOptional(atom) === false || // If this term is not a group it may only be optional if it has an optional quantifier
          atom.type !== "Group" && isOptionalQuantifier === false
        ) {
          break;
        }
      }
      break;
    default:
      throw Error("non exhaustive match!");
  }
  return values_default(result2);
}
function addOptimizedIdxToResult(code, result2, ignoreCase) {
  const optimizedCharIdx = charCodeToOptimizedIndex(code);
  result2[optimizedCharIdx] = optimizedCharIdx;
  if (ignoreCase === true) {
    handleIgnoreCase(code, result2);
  }
}
function handleIgnoreCase(code, result2) {
  const char = String.fromCharCode(code);
  const upperChar = char.toUpperCase();
  if (upperChar !== char) {
    const optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
    result2[optimizedCharIdx] = optimizedCharIdx;
  } else {
    const lowerChar = char.toLowerCase();
    if (lowerChar !== char) {
      const optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
      result2[optimizedCharIdx] = optimizedCharIdx;
    }
  }
}
function findCode(setNode, targetCharCodes) {
  return find_default(setNode.value, (codeOrRange) => {
    if (typeof codeOrRange === "number") {
      return includes_default(targetCharCodes, codeOrRange);
    } else {
      const range2 = codeOrRange;
      return find_default(targetCharCodes, (targetCode) => range2.from <= targetCode && targetCode <= range2.to) !== void 0;
    }
  });
}
function isWholeOptional(ast) {
  const quantifier = ast.quantifier;
  if (quantifier && quantifier.atLeast === 0) {
    return true;
  }
  if (!ast.value) {
    return false;
  }
  return isArray_default(ast.value) ? every_default(ast.value, isWholeOptional) : isWholeOptional(ast.value);
}
var CharCodeFinder = class extends BaseRegExpVisitor {
  constructor(targetCharCodes) {
    super();
    this.targetCharCodes = targetCharCodes;
    this.found = false;
  }
  visitChildren(node) {
    if (this.found === true) {
      return;
    }
    switch (node.type) {
      case "Lookahead":
        this.visitLookahead(node);
        return;
      case "NegativeLookahead":
        this.visitNegativeLookahead(node);
        return;
      case "Lookbehind":
        this.visitLookbehind(node);
        return;
      case "NegativeLookbehind":
        this.visitNegativeLookbehind(node);
        return;
    }
    super.visitChildren(node);
  }
  visitCharacter(node) {
    if (includes_default(this.targetCharCodes, node.value)) {
      this.found = true;
    }
  }
  visitSet(node) {
    if (node.complement) {
      if (findCode(node, this.targetCharCodes) === void 0) {
        this.found = true;
      }
    } else {
      if (findCode(node, this.targetCharCodes) !== void 0) {
        this.found = true;
      }
    }
  }
};
function canMatchCharCode(charCodes, pattern) {
  if (pattern instanceof RegExp) {
    const ast = getRegExpAst(pattern);
    const charCodeFinder = new CharCodeFinder(charCodes);
    charCodeFinder.visit(ast);
    return charCodeFinder.found;
  } else {
    return find_default(pattern, (char) => {
      return includes_default(charCodes, char.charCodeAt(0));
    }) !== void 0;
  }
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/lexer.js
var PATTERN = "PATTERN";
var DEFAULT_MODE = "defaultMode";
var MODES = "modes";
function analyzeTokenTypes(tokenTypes, options) {
  options = defaults_default(options, {
    debug: false,
    safeMode: false,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", "\n"],
    tracer: (msg, action) => action()
  });
  const tracer = options.tracer;
  tracer("initCharCodeToOptimizedIndexMap", () => {
    initCharCodeToOptimizedIndexMap();
  });
  let onlyRelevantTypes;
  tracer("Reject Lexer.NA", () => {
    onlyRelevantTypes = reject_default(tokenTypes, (currType) => {
      return currType[PATTERN] === Lexer.NA;
    });
  });
  let hasCustom = false;
  let allTransformedPatterns;
  tracer("Transform Patterns", () => {
    hasCustom = false;
    allTransformedPatterns = map_default(onlyRelevantTypes, (currType) => {
      const currPattern = currType[PATTERN];
      if (isRegExp_default(currPattern)) {
        const regExpSource = currPattern.source;
        if (regExpSource.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
          return regExpSource;
        } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && // not a meta character
        !includes_default([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], regExpSource[1])) {
          return regExpSource[1];
        } else {
          return addStickyFlag(currPattern);
        }
      } else if (isFunction_default(currPattern)) {
        hasCustom = true;
        return { exec: currPattern };
      } else if (typeof currPattern === "object") {
        hasCustom = true;
        return currPattern;
      } else if (typeof currPattern === "string") {
        if (currPattern.length === 1) {
          return currPattern;
        } else {
          const escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
          const wrappedRegExp = new RegExp(escapedRegExpString);
          return addStickyFlag(wrappedRegExp);
        }
      } else {
        throw Error("non exhaustive match");
      }
    });
  });
  let patternIdxToType;
  let patternIdxToGroup;
  let patternIdxToLongerAltIdxArr;
  let patternIdxToPushMode;
  let patternIdxToPopMode;
  tracer("misc mapping", () => {
    patternIdxToType = map_default(onlyRelevantTypes, (currType) => currType.tokenTypeIdx);
    patternIdxToGroup = map_default(onlyRelevantTypes, (clazz) => {
      const groupName = clazz.GROUP;
      if (groupName === Lexer.SKIPPED) {
        return void 0;
      } else if (isString_default(groupName)) {
        return groupName;
      } else if (isUndefined_default(groupName)) {
        return false;
      } else {
        throw Error("non exhaustive match");
      }
    });
    patternIdxToLongerAltIdxArr = map_default(onlyRelevantTypes, (clazz) => {
      const longerAltType = clazz.LONGER_ALT;
      if (longerAltType) {
        const longerAltIdxArr = isArray_default(longerAltType) ? map_default(longerAltType, (type) => indexOf_default(onlyRelevantTypes, type)) : [indexOf_default(onlyRelevantTypes, longerAltType)];
        return longerAltIdxArr;
      }
    });
    patternIdxToPushMode = map_default(onlyRelevantTypes, (clazz) => clazz.PUSH_MODE);
    patternIdxToPopMode = map_default(onlyRelevantTypes, (clazz) => has_default(clazz, "POP_MODE"));
  });
  let patternIdxToCanLineTerminator;
  tracer("Line Terminator Handling", () => {
    const lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
    patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => false);
    if (options.positionTracking !== "onlyOffset") {
      patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => {
        if (has_default(tokType, "LINE_BREAKS")) {
          return !!tokType.LINE_BREAKS;
        } else {
          return checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false && canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
        }
      });
    }
  });
  let patternIdxToIsCustom;
  let patternIdxToShort;
  let emptyGroups;
  let patternIdxToConfig;
  tracer("Misc Mapping #2", () => {
    patternIdxToIsCustom = map_default(onlyRelevantTypes, isCustomPattern);
    patternIdxToShort = map_default(allTransformedPatterns, isShortPattern);
    emptyGroups = reduce_default(onlyRelevantTypes, (acc, clazz) => {
      const groupName = clazz.GROUP;
      if (isString_default(groupName) && !(groupName === Lexer.SKIPPED)) {
        acc[groupName] = [];
      }
      return acc;
    }, {});
    patternIdxToConfig = map_default(allTransformedPatterns, (x, idx) => {
      return {
        pattern: allTransformedPatterns[idx],
        longerAlt: patternIdxToLongerAltIdxArr[idx],
        canLineTerminator: patternIdxToCanLineTerminator[idx],
        isCustom: patternIdxToIsCustom[idx],
        short: patternIdxToShort[idx],
        group: patternIdxToGroup[idx],
        push: patternIdxToPushMode[idx],
        pop: patternIdxToPopMode[idx],
        tokenTypeIdx: patternIdxToType[idx],
        tokenType: onlyRelevantTypes[idx]
      };
    });
  });
  let canBeOptimized = true;
  let charCodeToPatternIdxToConfig = [];
  if (!options.safeMode) {
    tracer("First Char Optimization", () => {
      charCodeToPatternIdxToConfig = reduce_default(onlyRelevantTypes, (result2, currTokType, idx) => {
        if (typeof currTokType.PATTERN === "string") {
          const charCode = currTokType.PATTERN.charCodeAt(0);
          const optimizedIdx = charCodeToOptimizedIndex(charCode);
          addToMapOfArrays(result2, optimizedIdx, patternIdxToConfig[idx]);
        } else if (isArray_default(currTokType.START_CHARS_HINT)) {
          let lastOptimizedIdx;
          forEach_default(currTokType.START_CHARS_HINT, (charOrInt) => {
            const charCode = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
            const currOptimizedIdx = charCodeToOptimizedIndex(charCode);
            if (lastOptimizedIdx !== currOptimizedIdx) {
              lastOptimizedIdx = currOptimizedIdx;
              addToMapOfArrays(result2, currOptimizedIdx, patternIdxToConfig[idx]);
            }
          });
        } else if (isRegExp_default(currTokType.PATTERN)) {
          if (currTokType.PATTERN.unicode) {
            canBeOptimized = false;
            if (options.ensureOptimizations) {
              PRINT_ERROR(`${failedOptimizationPrefixMsg}	Unable to analyze < ${currTokType.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
            }
          } else {
            const optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
            if (isEmpty_default(optimizedCodes)) {
              canBeOptimized = false;
            }
            forEach_default(optimizedCodes, (code) => {
              addToMapOfArrays(result2, code, patternIdxToConfig[idx]);
            });
          }
        } else {
          if (options.ensureOptimizations) {
            PRINT_ERROR(`${failedOptimizationPrefixMsg}	TokenType: <${currTokType.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`);
          }
          canBeOptimized = false;
        }
        return result2;
      }, []);
    });
  }
  return {
    emptyGroups,
    patternIdxToConfig,
    charCodeToPatternIdxToConfig,
    hasCustom,
    canBeOptimized
  };
}
function validatePatterns(tokenTypes, validModesNames) {
  let errors = [];
  const missingResult = findMissingPatterns(tokenTypes);
  errors = errors.concat(missingResult.errors);
  const invalidResult = findInvalidPatterns(missingResult.valid);
  const validTokenTypes = invalidResult.valid;
  errors = errors.concat(invalidResult.errors);
  errors = errors.concat(validateRegExpPattern(validTokenTypes));
  errors = errors.concat(findInvalidGroupType(validTokenTypes));
  errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
  errors = errors.concat(findUnreachablePatterns(validTokenTypes));
  return errors;
}
function validateRegExpPattern(tokenTypes) {
  let errors = [];
  const withRegExpPatterns = filter_default(tokenTypes, (currTokType) => isRegExp_default(currTokType[PATTERN]));
  errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
  errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
  errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
  errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
  errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
  return errors;
}
function findMissingPatterns(tokenTypes) {
  const tokenTypesWithMissingPattern = filter_default(tokenTypes, (currType) => {
    return !has_default(currType, PATTERN);
  });
  const errors = map_default(tokenTypesWithMissingPattern, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
      type: LexerDefinitionErrorType.MISSING_PATTERN,
      tokenTypes: [currType]
    };
  });
  const valid = difference_default(tokenTypes, tokenTypesWithMissingPattern);
  return { errors, valid };
}
function findInvalidPatterns(tokenTypes) {
  const tokenTypesWithInvalidPattern = filter_default(tokenTypes, (currType) => {
    const pattern = currType[PATTERN];
    return !isRegExp_default(pattern) && !isFunction_default(pattern) && !has_default(pattern, "exec") && !isString_default(pattern);
  });
  const errors = map_default(tokenTypesWithInvalidPattern, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
      type: LexerDefinitionErrorType.INVALID_PATTERN,
      tokenTypes: [currType]
    };
  });
  const valid = difference_default(tokenTypes, tokenTypesWithInvalidPattern);
  return { errors, valid };
}
var end_of_input = /[^\\][$]/;
function findEndOfInputAnchor(tokenTypes) {
  class EndAnchorFinder extends BaseRegExpVisitor {
    constructor() {
      super(...arguments);
      this.found = false;
    }
    visitEndAnchor(node) {
      this.found = true;
    }
  }
  const invalidRegex = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    try {
      const regexpAst = getRegExpAst(pattern);
      const endAnchorVisitor = new EndAnchorFinder();
      endAnchorVisitor.visit(regexpAst);
      return endAnchorVisitor.found;
    } catch (e) {
      return end_of_input.test(pattern.source);
    }
  });
  const errors = map_default(invalidRegex, (currType) => {
    return {
      message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
      type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findEmptyMatchRegExps(tokenTypes) {
  const matchesEmptyString = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    return pattern.test("");
  });
  const errors = map_default(matchesEmptyString, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
      type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
      tokenTypes: [currType]
    };
  });
  return errors;
}
var start_of_input = /[^\\[][\^]|^\^/;
function findStartOfInputAnchor(tokenTypes) {
  class StartAnchorFinder extends BaseRegExpVisitor {
    constructor() {
      super(...arguments);
      this.found = false;
    }
    visitStartAnchor(node) {
      this.found = true;
    }
  }
  const invalidRegex = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    try {
      const regexpAst = getRegExpAst(pattern);
      const startAnchorVisitor = new StartAnchorFinder();
      startAnchorVisitor.visit(regexpAst);
      return startAnchorVisitor.found;
    } catch (e) {
      return start_of_input.test(pattern.source);
    }
  });
  const errors = map_default(invalidRegex, (currType) => {
    return {
      message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
      type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findUnsupportedFlags(tokenTypes) {
  const invalidFlags = filter_default(tokenTypes, (currType) => {
    const pattern = currType[PATTERN];
    return pattern instanceof RegExp && (pattern.multiline || pattern.global);
  });
  const errors = map_default(invalidFlags, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
      type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findDuplicatePatterns(tokenTypes) {
  const found = [];
  let identicalPatterns = map_default(tokenTypes, (outerType) => {
    return reduce_default(tokenTypes, (result2, innerType) => {
      if (outerType.PATTERN.source === innerType.PATTERN.source && !includes_default(found, innerType) && innerType.PATTERN !== Lexer.NA) {
        found.push(innerType);
        result2.push(innerType);
        return result2;
      }
      return result2;
    }, []);
  });
  identicalPatterns = compact_default(identicalPatterns);
  const duplicatePatterns = filter_default(identicalPatterns, (currIdenticalSet) => {
    return currIdenticalSet.length > 1;
  });
  const errors = map_default(duplicatePatterns, (setOfIdentical) => {
    const tokenTypeNames = map_default(setOfIdentical, (currType) => {
      return currType.name;
    });
    const dupPatternSrc = head_default(setOfIdentical).PATTERN;
    return {
      message: `The same RegExp pattern ->${dupPatternSrc}<-has been used in all of the following Token Types: ${tokenTypeNames.join(", ")} <-`,
      type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: setOfIdentical
    };
  });
  return errors;
}
function findInvalidGroupType(tokenTypes) {
  const invalidTypes = filter_default(tokenTypes, (clazz) => {
    if (!has_default(clazz, "GROUP")) {
      return false;
    }
    const group = clazz.GROUP;
    return group !== Lexer.SKIPPED && group !== Lexer.NA && !isString_default(group);
  });
  const errors = map_default(invalidTypes, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
      type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findModesThatDoNotExist(tokenTypes, validModes) {
  const invalidModes = filter_default(tokenTypes, (clazz) => {
    return clazz.PUSH_MODE !== void 0 && !includes_default(validModes, clazz.PUSH_MODE);
  });
  const errors = map_default(invalidModes, (tokType) => {
    const msg = `Token Type: ->${tokType.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${tokType.PUSH_MODE}<-which does not exist`;
    return {
      message: msg,
      type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
      tokenTypes: [tokType]
    };
  });
  return errors;
}
function findUnreachablePatterns(tokenTypes) {
  const errors = [];
  const canBeTested = reduce_default(tokenTypes, (result2, tokType, idx) => {
    const pattern = tokType.PATTERN;
    if (pattern === Lexer.NA) {
      return result2;
    }
    if (isString_default(pattern)) {
      result2.push({ str: pattern, idx, tokenType: tokType });
    } else if (isRegExp_default(pattern) && noMetaChar(pattern)) {
      result2.push({ str: pattern.source, idx, tokenType: tokType });
    }
    return result2;
  }, []);
  forEach_default(tokenTypes, (aTokType, aIdx) => {
    forEach_default(canBeTested, ({ str: bStr, idx: bIdx, tokenType: bTokType }) => {
      if (aIdx < bIdx && tryToMatchStrToPattern(bStr, aTokType.PATTERN)) {
        const msg = `Token: ->${bTokType.name}<- can never be matched.
Because it appears AFTER the Token Type ->${aTokType.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        errors.push({
          message: msg,
          type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
          tokenTypes: [aTokType, bTokType]
        });
      }
    });
  });
  return errors;
}
function tryToMatchStrToPattern(str, pattern) {
  if (isRegExp_default(pattern)) {
    if (usesLookAheadOrBehind(pattern)) {
      return false;
    }
    const regExpArray = pattern.exec(str);
    return regExpArray !== null && regExpArray.index === 0;
  } else if (isFunction_default(pattern)) {
    return pattern(str, 0, [], {});
  } else if (has_default(pattern, "exec")) {
    return pattern.exec(str, 0, [], {});
  } else if (typeof pattern === "string") {
    return pattern === str;
  } else {
    throw Error("non exhaustive match");
  }
}
function noMetaChar(regExp) {
  const metaChars = [
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ];
  return find_default(metaChars, (char) => regExp.source.indexOf(char) !== -1) === void 0;
}
function usesLookAheadOrBehind(regExp) {
  return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(regExp.source);
}
function addStickyFlag(pattern) {
  const flags = pattern.ignoreCase ? "iy" : "y";
  return new RegExp(`${pattern.source}`, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
  const errors = [];
  if (!has_default(lexerDefinition, DEFAULT_MODE)) {
    errors.push({
      message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
    });
  }
  if (!has_default(lexerDefinition, MODES)) {
    errors.push({
      message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
    });
  }
  if (has_default(lexerDefinition, MODES) && has_default(lexerDefinition, DEFAULT_MODE) && !has_default(lexerDefinition.modes, lexerDefinition.defaultMode)) {
    errors.push({
      message: `A MultiMode Lexer cannot be initialized with a ${DEFAULT_MODE}: <${lexerDefinition.defaultMode}>which does not exist
`,
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
    });
  }
  if (has_default(lexerDefinition, MODES)) {
    forEach_default(lexerDefinition.modes, (currModeValue, currModeName) => {
      forEach_default(currModeValue, (currTokType, currIdx) => {
        if (isUndefined_default(currTokType)) {
          errors.push({
            message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${currModeName}> at index: <${currIdx}>
`,
            type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
          });
        } else if (has_default(currTokType, "LONGER_ALT")) {
          const longerAlt = isArray_default(currTokType.LONGER_ALT) ? currTokType.LONGER_ALT : [currTokType.LONGER_ALT];
          forEach_default(longerAlt, (currLongerAlt) => {
            if (!isUndefined_default(currLongerAlt) && !includes_default(currModeValue, currLongerAlt)) {
              errors.push({
                message: `A MultiMode Lexer cannot be initialized with a longer_alt <${currLongerAlt.name}> on token <${currTokType.name}> outside of mode <${currModeName}>
`,
                type: LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
              });
            }
          });
        }
      });
    });
  }
  return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
  const warnings = [];
  let hasAnyLineBreak = false;
  const allTokenTypes = compact_default(flatten_default(values_default(lexerDefinition.modes)));
  const concreteTokenTypes = reject_default(allTokenTypes, (currType) => currType[PATTERN] === Lexer.NA);
  const terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
  if (trackLines) {
    forEach_default(concreteTokenTypes, (tokType) => {
      const currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
      if (currIssue !== false) {
        const message = buildLineBreakIssueMessage(tokType, currIssue);
        const warningDescriptor = {
          message,
          type: currIssue.issue,
          tokenType: tokType
        };
        warnings.push(warningDescriptor);
      } else {
        if (has_default(tokType, "LINE_BREAKS")) {
          if (tokType.LINE_BREAKS === true) {
            hasAnyLineBreak = true;
          }
        } else {
          if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
            hasAnyLineBreak = true;
          }
        }
      }
    });
  }
  if (trackLines && !hasAnyLineBreak) {
    warnings.push({
      message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
      type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
    });
  }
  return warnings;
}
function cloneEmptyGroups(emptyGroups) {
  const clonedResult = {};
  const groupKeys = keys_default(emptyGroups);
  forEach_default(groupKeys, (currKey) => {
    const currGroupValue = emptyGroups[currKey];
    if (isArray_default(currGroupValue)) {
      clonedResult[currKey] = [];
    } else {
      throw Error("non exhaustive match");
    }
  });
  return clonedResult;
}
function isCustomPattern(tokenType) {
  const pattern = tokenType.PATTERN;
  if (isRegExp_default(pattern)) {
    return false;
  } else if (isFunction_default(pattern)) {
    return true;
  } else if (has_default(pattern, "exec")) {
    return true;
  } else if (isString_default(pattern)) {
    return false;
  } else {
    throw Error("non exhaustive match");
  }
}
function isShortPattern(pattern) {
  if (isString_default(pattern) && pattern.length === 1) {
    return pattern.charCodeAt(0);
  } else {
    return false;
  }
}
var LineTerminatorOptimizedTester = {
  // implements /\n|\r\n?/g.test
  test: function(text) {
    const len = text.length;
    for (let i = this.lastIndex; i < len; i++) {
      const c = text.charCodeAt(i);
      if (c === 10) {
        this.lastIndex = i + 1;
        return true;
      } else if (c === 13) {
        if (text.charCodeAt(i + 1) === 10) {
          this.lastIndex = i + 2;
        } else {
          this.lastIndex = i + 1;
        }
        return true;
      }
    }
    return false;
  },
  lastIndex: 0
};
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
  if (has_default(tokType, "LINE_BREAKS")) {
    return false;
  } else {
    if (isRegExp_default(tokType.PATTERN)) {
      try {
        canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
      } catch (e) {
        return {
          issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
          errMsg: e.message
        };
      }
      return false;
    } else if (isString_default(tokType.PATTERN)) {
      return false;
    } else if (isCustomPattern(tokType)) {
      return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
    } else {
      throw Error("non exhaustive match");
    }
  }
}
function buildLineBreakIssueMessage(tokType, details) {
  if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${tokType.name}> Token Type
	 Root cause: ${details.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  } else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${tokType.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  } else {
    throw Error("non exhaustive match");
  }
}
function getCharCodes(charsOrCodes) {
  const charCodes = map_default(charsOrCodes, (numOrString) => {
    if (isString_default(numOrString)) {
      return numOrString.charCodeAt(0);
    } else {
      return numOrString;
    }
  });
  return charCodes;
}
function addToMapOfArrays(map2, key, value) {
  if (map2[key] === void 0) {
    map2[key] = [value];
  } else {
    map2[key].push(value);
  }
}
var minOptimizationVal = 256;
var charCodeToOptimizedIdxMap = [];
function charCodeToOptimizedIndex(charCode) {
  return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
}
function initCharCodeToOptimizedIndexMap() {
  if (isEmpty_default(charCodeToOptimizedIdxMap)) {
    charCodeToOptimizedIdxMap = new Array(65536);
    for (let i = 0; i < 65536; i++) {
      charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
    }
  }
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/tokens.js
function tokenStructuredMatcher(tokInstance, tokConstructor) {
  const instanceType = tokInstance.tokenTypeIdx;
  if (instanceType === tokConstructor.tokenTypeIdx) {
    return true;
  } else {
    return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
  }
}
function tokenStructuredMatcherNoCategories(token, tokType) {
  return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
var tokenShortNameIdx = 1;
var tokenIdxToClass = {};
function augmentTokenTypes(tokenTypes) {
  const tokenTypesAndParents = expandCategories(tokenTypes);
  assignTokenDefaultProps(tokenTypesAndParents);
  assignCategoriesMapProp(tokenTypesAndParents);
  assignCategoriesTokensProp(tokenTypesAndParents);
  forEach_default(tokenTypesAndParents, (tokType) => {
    tokType.isParent = tokType.categoryMatches.length > 0;
  });
}
function expandCategories(tokenTypes) {
  let result2 = clone_default(tokenTypes);
  let categories = tokenTypes;
  let searching = true;
  while (searching) {
    categories = compact_default(flatten_default(map_default(categories, (currTokType) => currTokType.CATEGORIES)));
    const newCategories = difference_default(categories, result2);
    result2 = result2.concat(newCategories);
    if (isEmpty_default(newCategories)) {
      searching = false;
    } else {
      categories = newCategories;
    }
  }
  return result2;
}
function assignTokenDefaultProps(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    if (!hasShortKeyProperty(currTokType)) {
      tokenIdxToClass[tokenShortNameIdx] = currTokType;
      currTokType.tokenTypeIdx = tokenShortNameIdx++;
    }
    if (hasCategoriesProperty(currTokType) && !isArray_default(currTokType.CATEGORIES)) {
      currTokType.CATEGORIES = [currTokType.CATEGORIES];
    }
    if (!hasCategoriesProperty(currTokType)) {
      currTokType.CATEGORIES = [];
    }
    if (!hasExtendingTokensTypesProperty(currTokType)) {
      currTokType.categoryMatches = [];
    }
    if (!hasExtendingTokensTypesMapProperty(currTokType)) {
      currTokType.categoryMatchesMap = {};
    }
  });
}
function assignCategoriesTokensProp(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    currTokType.categoryMatches = [];
    forEach_default(currTokType.categoryMatchesMap, (val, key) => {
      currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
    });
  });
}
function assignCategoriesMapProp(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    singleAssignCategoriesToksMap([], currTokType);
  });
}
function singleAssignCategoriesToksMap(path, nextNode) {
  forEach_default(path, (pathNode) => {
    nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
  });
  forEach_default(nextNode.CATEGORIES, (nextCategory) => {
    const newPath = path.concat(nextNode);
    if (!includes_default(newPath, nextCategory)) {
      singleAssignCategoriesToksMap(newPath, nextCategory);
    }
  });
}
function hasShortKeyProperty(tokType) {
  return has_default(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
  return has_default(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
  return has_default(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
  return has_default(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
  return has_default(tokType, "tokenTypeIdx");
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/lexer_errors_public.js
var defaultLexerErrorProvider = {
  buildUnableToPopLexerModeMessage(token) {
    return `Unable to pop Lexer Mode after encountering Token ->${token.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column, mode) {
    return `unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset}, skipped ${length} characters.`;
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/lexer_public.js
var LexerDefinitionErrorType;
(function(LexerDefinitionErrorType2) {
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"] = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
var DEFAULT_LEXER_CONFIG = {
  deferDefinitionErrorsHandling: false,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: ["\n", "\r"],
  ensureOptimizations: false,
  safeMode: false,
  errorMessageProvider: defaultLexerErrorProvider,
  traceInitPerf: false,
  skipValidations: false,
  recoveryEnabled: true
};
Object.freeze(DEFAULT_LEXER_CONFIG);
var Lexer = class {
  constructor(lexerDefinition, config = DEFAULT_LEXER_CONFIG) {
    this.lexerDefinition = lexerDefinition;
    this.lexerDefinitionErrors = [];
    this.lexerDefinitionWarning = [];
    this.patternIdxToConfig = {};
    this.charCodeToPatternIdxToConfig = {};
    this.modes = [];
    this.emptyGroups = {};
    this.trackStartLines = true;
    this.trackEndLines = true;
    this.hasCustom = false;
    this.canModeBeOptimized = {};
    this.TRACE_INIT = (phaseDesc, phaseImpl) => {
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        const indent = new Array(this.traceInitIndent + 1).join("	");
        if (this.traceInitIndent < this.traceInitMaxIdent) {
          console.log(`${indent}--> <${phaseDesc}>`);
        }
        const { time, value } = timer(phaseImpl);
        const traceMethod = time > 10 ? console.warn : console.log;
        if (this.traceInitIndent < this.traceInitMaxIdent) {
          traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
        }
        this.traceInitIndent--;
        return value;
      } else {
        return phaseImpl();
      }
    };
    if (typeof config === "boolean") {
      throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
    }
    this.config = assign_default({}, DEFAULT_LEXER_CONFIG, config);
    const traceInitVal = this.config.traceInitPerf;
    if (traceInitVal === true) {
      this.traceInitMaxIdent = Infinity;
      this.traceInitPerf = true;
    } else if (typeof traceInitVal === "number") {
      this.traceInitMaxIdent = traceInitVal;
      this.traceInitPerf = true;
    }
    this.traceInitIndent = -1;
    this.TRACE_INIT("Lexer Constructor", () => {
      let actualDefinition;
      let hasOnlySingleMode = true;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
          this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
        } else {
          if (this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
            throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
          }
        }
        if (config.safeMode && config.ensureOptimizations) {
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        }
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking);
        this.trackEndLines = /full/i.test(this.config.positionTracking);
        if (isArray_default(lexerDefinition)) {
          actualDefinition = {
            modes: { defaultMode: clone_default(lexerDefinition) },
            defaultMode: DEFAULT_MODE
          };
        } else {
          hasOnlySingleMode = false;
          actualDefinition = clone_default(lexerDefinition);
        }
      });
      if (this.config.skipValidations === false) {
        this.TRACE_INIT("performRuntimeChecks", () => {
          this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
        });
        this.TRACE_INIT("performWarningRuntimeChecks", () => {
          this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
        });
      }
      actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
      forEach_default(actualDefinition.modes, (currModeValue, currModeName) => {
        actualDefinition.modes[currModeName] = reject_default(currModeValue, (currTokType) => isUndefined_default(currTokType));
      });
      const allModeNames = keys_default(actualDefinition.modes);
      forEach_default(actualDefinition.modes, (currModDef, currModName) => {
        this.TRACE_INIT(`Mode: <${currModName}> processing`, () => {
          this.modes.push(currModName);
          if (this.config.skipValidations === false) {
            this.TRACE_INIT(`validatePatterns`, () => {
              this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
            });
          }
          if (isEmpty_default(this.lexerDefinitionErrors)) {
            augmentTokenTypes(currModDef);
            let currAnalyzeResult;
            this.TRACE_INIT(`analyzeTokenTypes`, () => {
              currAnalyzeResult = analyzeTokenTypes(currModDef, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: config.positionTracking,
                ensureOptimizations: config.ensureOptimizations,
                safeMode: config.safeMode,
                tracer: this.TRACE_INIT
              });
            });
            this.patternIdxToConfig[currModName] = currAnalyzeResult.patternIdxToConfig;
            this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult.charCodeToPatternIdxToConfig;
            this.emptyGroups = assign_default({}, this.emptyGroups, currAnalyzeResult.emptyGroups);
            this.hasCustom = currAnalyzeResult.hasCustom || this.hasCustom;
            this.canModeBeOptimized[currModName] = currAnalyzeResult.canBeOptimized;
          }
        });
      });
      this.defaultMode = actualDefinition.defaultMode;
      if (!isEmpty_default(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const allErrMessages = map_default(this.lexerDefinitionErrors, (error) => {
          return error.message;
        });
        const allErrMessagesString = allErrMessages.join("-----------------------\n");
        throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
      }
      forEach_default(this.lexerDefinitionWarning, (warningDescriptor) => {
        PRINT_WARNING(warningDescriptor.message);
      });
      this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (hasOnlySingleMode) {
          this.handleModes = noop_default;
        }
        if (this.trackStartLines === false) {
          this.computeNewColumn = identity_default;
        }
        if (this.trackEndLines === false) {
          this.updateTokenEndLineColumnLocation = noop_default;
        }
        if (/full/i.test(this.config.positionTracking)) {
          this.createTokenInstance = this.createFullToken;
        } else if (/onlyStart/i.test(this.config.positionTracking)) {
          this.createTokenInstance = this.createStartOnlyToken;
        } else if (/onlyOffset/i.test(this.config.positionTracking)) {
          this.createTokenInstance = this.createOffsetOnlyToken;
        } else {
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        }
        if (this.hasCustom) {
          this.addToken = this.addTokenUsingPush;
          this.handlePayload = this.handlePayloadWithCustom;
        } else {
          this.addToken = this.addTokenUsingMemberAccess;
          this.handlePayload = this.handlePayloadNoCustom;
        }
      });
      this.TRACE_INIT("Failed Optimization Warnings", () => {
        const unOptimizedModes = reduce_default(this.canModeBeOptimized, (cannotBeOptimized, canBeOptimized, modeName) => {
          if (canBeOptimized === false) {
            cannotBeOptimized.push(modeName);
          }
          return cannotBeOptimized;
        }, []);
        if (config.ensureOptimizations && !isEmpty_default(unOptimizedModes)) {
          throw Error(`Lexer Modes: < ${unOptimizedModes.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
        }
      });
      this.TRACE_INIT("clearRegExpParserCache", () => {
        clearRegExpParserCache();
      });
      this.TRACE_INIT("toFastProperties", () => {
        toFastProperties(this);
      });
    });
  }
  tokenize(text, initialMode = this.defaultMode) {
    if (!isEmpty_default(this.lexerDefinitionErrors)) {
      const allErrMessages = map_default(this.lexerDefinitionErrors, (error) => {
        return error.message;
      });
      const allErrMessagesString = allErrMessages.join("-----------------------\n");
      throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
    }
    return this.tokenizeInternal(text, initialMode);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(text, initialMode) {
    let i, j, k, matchAltImage, longerAlt, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match;
    const orgText = text;
    const orgLength = orgText.length;
    let offset = 0;
    let matchedTokensIndex = 0;
    const guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
    const matchedTokens = new Array(guessedNumberOfTokens);
    const errors = [];
    let line = this.trackStartLines ? 1 : void 0;
    let column = this.trackStartLines ? 1 : void 0;
    const groups = cloneEmptyGroups(this.emptyGroups);
    const trackLines = this.trackStartLines;
    const lineTerminatorPattern = this.config.lineTerminatorsPattern;
    let currModePatternsLength = 0;
    let patternIdxToConfig = [];
    let currCharCodeToPatternIdxToConfig = [];
    const modeStack = [];
    const emptyArray = [];
    Object.freeze(emptyArray);
    let isOptimizedMode = false;
    const pop_mode = (popToken) => {
      if (modeStack.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      popToken.tokenType.PUSH_MODE === void 0) {
        const msg2 = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
        errors.push({
          offset: popToken.startOffset,
          line: popToken.startLine,
          column: popToken.startColumn,
          length: popToken.image.length,
          message: msg2
        });
      } else {
        modeStack.pop();
        const newMode = last_default(modeStack);
        patternIdxToConfig = this.patternIdxToConfig[newMode];
        currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
        currModePatternsLength = patternIdxToConfig.length;
        const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
        if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
          isOptimizedMode = true;
        } else {
          isOptimizedMode = false;
        }
      }
    };
    function push_mode(newMode) {
      modeStack.push(newMode);
      currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
      patternIdxToConfig = this.patternIdxToConfig[newMode];
      currModePatternsLength = patternIdxToConfig.length;
      currModePatternsLength = patternIdxToConfig.length;
      const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
      if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
        isOptimizedMode = true;
      } else {
        isOptimizedMode = false;
      }
    }
    push_mode.call(this, initialMode);
    let currConfig;
    const recoveryEnabled = this.config.recoveryEnabled;
    while (offset < orgLength) {
      matchedImage = null;
      imageLength = -1;
      const nextCharCode = orgText.charCodeAt(offset);
      let chosenPatternIdxToConfig;
      if (isOptimizedMode) {
        const optimizedCharIdx = charCodeToOptimizedIndex(nextCharCode);
        const possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
        chosenPatternIdxToConfig = possiblePatterns !== void 0 ? possiblePatterns : emptyArray;
      } else {
        chosenPatternIdxToConfig = patternIdxToConfig;
      }
      const chosenPatternsLength = chosenPatternIdxToConfig.length;
      for (i = 0; i < chosenPatternsLength; i++) {
        currConfig = chosenPatternIdxToConfig[i];
        const currPattern = currConfig.pattern;
        payload = null;
        const singleCharCode = currConfig.short;
        if (singleCharCode !== false) {
          if (nextCharCode === singleCharCode) {
            imageLength = 1;
            matchedImage = currPattern;
          }
        } else if (currConfig.isCustom === true) {
          match = currPattern.exec(orgText, offset, matchedTokens, groups);
          if (match !== null) {
            matchedImage = match[0];
            imageLength = matchedImage.length;
            if (match.payload !== void 0) {
              payload = match.payload;
            }
          } else {
            matchedImage = null;
          }
        } else {
          currPattern.lastIndex = offset;
          imageLength = this.matchLength(currPattern, text, offset);
        }
        if (imageLength !== -1) {
          longerAlt = currConfig.longerAlt;
          if (longerAlt !== void 0) {
            matchedImage = text.substring(offset, offset + imageLength);
            const longerAltLength = longerAlt.length;
            for (k = 0; k < longerAltLength; k++) {
              const longerAltConfig = patternIdxToConfig[longerAlt[k]];
              const longerAltPattern = longerAltConfig.pattern;
              altPayload = null;
              if (longerAltConfig.isCustom === true) {
                match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                if (match !== null) {
                  matchAltImage = match[0];
                  if (match.payload !== void 0) {
                    altPayload = match.payload;
                  }
                } else {
                  matchAltImage = null;
                }
              } else {
                longerAltPattern.lastIndex = offset;
                matchAltImage = this.match(longerAltPattern, text, offset);
              }
              if (matchAltImage && matchAltImage.length > matchedImage.length) {
                matchedImage = matchAltImage;
                imageLength = matchAltImage.length;
                payload = altPayload;
                currConfig = longerAltConfig;
                break;
              }
            }
          }
          break;
        }
      }
      if (imageLength !== -1) {
        group = currConfig.group;
        if (group !== void 0) {
          matchedImage = matchedImage !== null ? matchedImage : text.substring(offset, offset + imageLength);
          tokType = currConfig.tokenTypeIdx;
          newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
          this.handlePayload(newToken, payload);
          if (group === false) {
            matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
          } else {
            groups[group].push(newToken);
          }
        }
        if (trackLines === true && currConfig.canLineTerminator === true) {
          let numOfLTsInMatch = 0;
          let foundTerminator;
          let lastLTEndOffset;
          lineTerminatorPattern.lastIndex = 0;
          do {
            matchedImage = matchedImage !== null ? matchedImage : text.substring(offset, offset + imageLength);
            foundTerminator = lineTerminatorPattern.test(matchedImage);
            if (foundTerminator === true) {
              lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
              numOfLTsInMatch++;
            }
          } while (foundTerminator === true);
          if (numOfLTsInMatch !== 0) {
            line = line + numOfLTsInMatch;
            column = imageLength - lastLTEndOffset;
            this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
          } else {
            column = this.computeNewColumn(column, imageLength);
          }
        } else {
          column = this.computeNewColumn(column, imageLength);
        }
        offset = offset + imageLength;
        this.handleModes(currConfig, pop_mode, push_mode, newToken);
      } else {
        const errorStartOffset = offset;
        const errorLine = line;
        const errorColumn = column;
        let foundResyncPoint = recoveryEnabled === false;
        while (foundResyncPoint === false && offset < orgLength) {
          offset++;
          for (j = 0; j < currModePatternsLength; j++) {
            const currConfig2 = patternIdxToConfig[j];
            const currPattern = currConfig2.pattern;
            const singleCharCode = currConfig2.short;
            if (singleCharCode !== false) {
              if (orgText.charCodeAt(offset) === singleCharCode) {
                foundResyncPoint = true;
              }
            } else if (currConfig2.isCustom === true) {
              foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
            } else {
              currPattern.lastIndex = offset;
              foundResyncPoint = currPattern.exec(text) !== null;
            }
            if (foundResyncPoint === true) {
              break;
            }
          }
        }
        errLength = offset - errorStartOffset;
        column = this.computeNewColumn(column, errLength);
        msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn, last_default(modeStack));
        errors.push({
          offset: errorStartOffset,
          line: errorLine,
          column: errorColumn,
          length: errLength,
          message: msg
        });
        if (recoveryEnabled === false) {
          break;
        }
      }
    }
    if (!this.hasCustom) {
      matchedTokens.length = matchedTokensIndex;
    }
    return {
      tokens: matchedTokens,
      groups,
      errors
    };
  }
  handleModes(config, pop_mode, push_mode, newToken) {
    if (config.pop === true) {
      const pushMode = config.push;
      pop_mode(newToken);
      if (pushMode !== void 0) {
        push_mode.call(this, pushMode);
      }
    } else if (config.push !== void 0) {
      push_mode.call(this, config.push);
    }
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
    let lastCharIsLT, fixForEndingInLT;
    if (group !== void 0) {
      lastCharIsLT = lastLTIdx === imageLength - 1;
      fixForEndingInLT = lastCharIsLT ? -1 : 0;
      if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
        newToken.endLine = line + fixForEndingInLT;
        newToken.endColumn = column - 1 + -fixForEndingInLT;
      }
    }
  }
  computeNewColumn(oldColumn, imageLength) {
    return oldColumn + imageLength;
  }
  createOffsetOnlyToken(image, startOffset, tokenTypeIdx, tokenType) {
    return {
      image,
      startOffset,
      tokenTypeIdx,
      tokenType
    };
  }
  createStartOnlyToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
    return {
      image,
      startOffset,
      startLine,
      startColumn,
      tokenTypeIdx,
      tokenType
    };
  }
  createFullToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
    return {
      image,
      startOffset,
      endOffset: startOffset + imageLength - 1,
      startLine,
      endLine: startLine,
      startColumn,
      endColumn: startColumn + imageLength - 1,
      tokenTypeIdx,
      tokenType
    };
  }
  addTokenUsingPush(tokenVector, index, tokenToAdd) {
    tokenVector.push(tokenToAdd);
    return index;
  }
  addTokenUsingMemberAccess(tokenVector, index, tokenToAdd) {
    tokenVector[index] = tokenToAdd;
    index++;
    return index;
  }
  handlePayloadNoCustom(token, payload) {
  }
  handlePayloadWithCustom(token, payload) {
    if (payload !== null) {
      token.payload = payload;
    }
  }
  match(pattern, text, offset) {
    const found = pattern.test(text);
    if (found === true) {
      return text.substring(offset, pattern.lastIndex);
    }
    return null;
  }
  matchLength(pattern, text, offset) {
    const found = pattern.test(text);
    if (found === true) {
      return pattern.lastIndex - offset;
    }
    return -1;
  }
};
Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
Lexer.NA = /NOT_APPLICABLE/;

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/scan/tokens_public.js
function tokenLabel2(tokType) {
  if (hasTokenLabel2(tokType)) {
    return tokType.LABEL;
  } else {
    return tokType.name;
  }
}
function hasTokenLabel2(obj) {
  return isString_default(obj.LABEL) && obj.LABEL !== "";
}
var PARENT = "parent";
var CATEGORIES = "categories";
var LABEL = "label";
var GROUP = "group";
var PUSH_MODE = "push_mode";
var POP_MODE = "pop_mode";
var LONGER_ALT = "longer_alt";
var LINE_BREAKS = "line_breaks";
var START_CHARS_HINT = "start_chars_hint";
function createToken(config) {
  return createTokenInternal(config);
}
function createTokenInternal(config) {
  const pattern = config.pattern;
  const tokenType = {};
  tokenType.name = config.name;
  if (!isUndefined_default(pattern)) {
    tokenType.PATTERN = pattern;
  }
  if (has_default(config, PARENT)) {
    throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
  }
  if (has_default(config, CATEGORIES)) {
    tokenType.CATEGORIES = config[CATEGORIES];
  }
  augmentTokenTypes([tokenType]);
  if (has_default(config, LABEL)) {
    tokenType.LABEL = config[LABEL];
  }
  if (has_default(config, GROUP)) {
    tokenType.GROUP = config[GROUP];
  }
  if (has_default(config, POP_MODE)) {
    tokenType.POP_MODE = config[POP_MODE];
  }
  if (has_default(config, PUSH_MODE)) {
    tokenType.PUSH_MODE = config[PUSH_MODE];
  }
  if (has_default(config, LONGER_ALT)) {
    tokenType.LONGER_ALT = config[LONGER_ALT];
  }
  if (has_default(config, LINE_BREAKS)) {
    tokenType.LINE_BREAKS = config[LINE_BREAKS];
  }
  if (has_default(config, START_CHARS_HINT)) {
    tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
  }
  return tokenType;
}
var EOF = createToken({ name: "EOF", pattern: Lexer.NA });
augmentTokenTypes([EOF]);
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
  return {
    image,
    startOffset,
    endOffset,
    startLine,
    endLine,
    startColumn,
    endColumn,
    tokenTypeIdx: tokType.tokenTypeIdx,
    tokenType: tokType
  };
}
function tokenMatcher(token, tokType) {
  return tokenStructuredMatcher(token, tokType);
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/errors_public.js
var defaultParserErrorProvider = {
  buildMismatchTokenMessage({ expected, actual, previous, ruleName }) {
    const hasLabel = hasTokenLabel2(expected);
    const expectedMsg = hasLabel ? `--> ${tokenLabel2(expected)} <--` : `token of type --> ${expected.name} <--`;
    const msg = `Expecting ${expectedMsg} but found --> '${actual.image}' <--`;
    return msg;
  },
  buildNotAllInputParsedMessage({ firstRedundant, ruleName }) {
    return "Redundant input, expecting EOF but found: " + firstRedundant.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt, actual, previous, customUserDescription, ruleName }) {
    const errPrefix = "Expecting: ";
    const actualText = head_default(actual).image;
    const errSuffix = "\nbut found: '" + actualText + "'";
    if (customUserDescription) {
      return errPrefix + customUserDescription + errSuffix;
    } else {
      const allLookAheadPaths = reduce_default(expectedPathsPerAlt, (result2, currAltPaths) => result2.concat(currAltPaths), []);
      const nextValidTokenSequences = map_default(allLookAheadPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel2(currTokenType)).join(", ")}]`);
      const nextValidSequenceItems = map_default(nextValidTokenSequences, (itemMsg, idx) => `  ${idx + 1}. ${itemMsg}`);
      const calculatedDescription = `one of these possible Token sequences:
${nextValidSequenceItems.join("\n")}`;
      return errPrefix + calculatedDescription + errSuffix;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths, actual, customUserDescription, ruleName }) {
    const errPrefix = "Expecting: ";
    const actualText = head_default(actual).image;
    const errSuffix = "\nbut found: '" + actualText + "'";
    if (customUserDescription) {
      return errPrefix + customUserDescription + errSuffix;
    } else {
      const nextValidTokenSequences = map_default(expectedIterationPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel2(currTokenType)).join(",")}]`);
      const calculatedDescription = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${nextValidTokenSequences.join(" ,")}>`;
      return errPrefix + calculatedDescription + errSuffix;
    }
  }
};
Object.freeze(defaultParserErrorProvider);
var defaultGrammarResolverErrorProvider = {
  buildRuleNotFoundError(topLevelRule, undefinedRule) {
    const msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
    return msg;
  }
};
var defaultGrammarValidatorErrorProvider = {
  buildDuplicateFoundError(topLevelRule, duplicateProds) {
    function getExtraProductionArgument2(prod) {
      if (prod instanceof Terminal) {
        return prod.terminalType.name;
      } else if (prod instanceof NonTerminal) {
        return prod.nonTerminalName;
      } else {
        return "";
      }
    }
    const topLevelName = topLevelRule.name;
    const duplicateProd = head_default(duplicateProds);
    const index = duplicateProd.idx;
    const dslName = getProductionDslName(duplicateProd);
    const extraArgument = getExtraProductionArgument2(duplicateProd);
    const hasExplicitIndex = index > 0;
    let msg = `->${dslName}${hasExplicitIndex ? index : ""}<- ${extraArgument ? `with argument: ->${extraArgument}<-` : ""}
                  appears more than once (${duplicateProds.length} times) in the top level rule: ->${topLevelName}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    msg = msg.replace(/[ \t]+/g, " ");
    msg = msg.replace(/\s\s+/g, "\n");
    return msg;
  },
  buildNamespaceConflictError(rule) {
    const errMsg = `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${rule.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
    return errMsg;
  },
  buildAlternationPrefixAmbiguityError(options) {
    const pathMsg = map_default(options.prefixPath, (currTok) => tokenLabel2(currTok)).join(", ");
    const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
    const errMsg = `Ambiguous alternatives: <${options.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,
<${pathMsg}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
    return errMsg;
  },
  buildAlternationAmbiguityError(options) {
    const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
    const isEmptyPath = options.prefixPath.length === 0;
    let currMessage = `Ambiguous Alternatives Detected: <${options.ambiguityIndices.join(" ,")}> in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,
`;
    if (isEmptyPath) {
      currMessage += `These alternatives are all empty (match no tokens), making them indistinguishable.
Only the last alternative may be empty.
`;
    } else {
      const pathMsg = map_default(options.prefixPath, (currtok) => tokenLabel2(currtok)).join(", ");
      currMessage += `<${pathMsg}> may appears as a prefix path in all these alternatives.
`;
    }
    currMessage += `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`;
    return currMessage;
  },
  buildEmptyRepetitionError(options) {
    let dslName = getProductionDslName(options.repetition);
    if (options.repetition.idx !== 0) {
      dslName += options.repetition.idx;
    }
    const errMsg = `The repetition <${dslName}> within Rule <${options.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
    return errMsg;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(options) {
    return "deprecated";
  },
  buildEmptyAlternationError(options) {
    const errMsg = `Ambiguous empty alternative: <${options.emptyChoiceIdx + 1}> in <OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
    return errMsg;
  },
  buildTooManyAlternativesError(options) {
    const errMsg = `An Alternation cannot have more than 256 alternatives:
<OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.
 has ${options.alternation.definition.length + 1} alternatives.`;
    return errMsg;
  },
  buildLeftRecursionError(options) {
    const ruleName = options.topLevelRule.name;
    const pathNames = map_default(options.leftRecursionPath, (currRule) => currRule.name);
    const leftRecursivePath = `${ruleName} --> ${pathNames.concat([ruleName]).join(" --> ")}`;
    const errMsg = `Left Recursion found in grammar.
rule: <${ruleName}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${leftRecursivePath}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
    return errMsg;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildInvalidRuleNameError(options) {
    return "deprecated";
  },
  buildDuplicateRuleNameError(options) {
    let ruleName;
    if (options.topLevelRule instanceof Rule) {
      ruleName = options.topLevelRule.name;
    } else {
      ruleName = options.topLevelRule;
    }
    const errMsg = `Duplicate definition, rule: ->${ruleName}<- is already defined in the grammar: ->${options.grammarName}<-`;
    return errMsg;
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/resolver.js
function resolveGrammar(topLevels, errMsgProvider) {
  const refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
  refResolver.resolveRefs();
  return refResolver.errors;
}
var GastRefResolverVisitor = class extends GAstVisitor {
  constructor(nameToTopRule, errMsgProvider) {
    super();
    this.nameToTopRule = nameToTopRule;
    this.errMsgProvider = errMsgProvider;
    this.errors = [];
  }
  resolveRefs() {
    forEach_default(values_default(this.nameToTopRule), (prod) => {
      this.currTopLevel = prod;
      prod.accept(this);
    });
  }
  visitNonTerminal(node) {
    const ref = this.nameToTopRule[node.nonTerminalName];
    if (!ref) {
      const msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
      this.errors.push({
        message: msg,
        type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
        ruleName: this.currTopLevel.name,
        unresolvedRefName: node.nonTerminalName
      });
    } else {
      node.referencedRule = ref;
    }
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/interpreter.js
var AbstractNextPossibleTokensWalker = class extends RestWalker {
  constructor(topProd, path) {
    super();
    this.topProd = topProd;
    this.path = path;
    this.possibleTokTypes = [];
    this.nextProductionName = "";
    this.nextProductionOccurrence = 0;
    this.found = false;
    this.isAtEndOfPath = false;
  }
  startWalking() {
    this.found = false;
    if (this.path.ruleStack[0] !== this.topProd.name) {
      throw Error("The path does not start with the walker's top Rule!");
    }
    this.ruleStack = clone_default(this.path.ruleStack).reverse();
    this.occurrenceStack = clone_default(this.path.occurrenceStack).reverse();
    this.ruleStack.pop();
    this.occurrenceStack.pop();
    this.updateExpectedNext();
    this.walk(this.topProd);
    return this.possibleTokTypes;
  }
  walk(prod, prevRest = []) {
    if (!this.found) {
      super.walk(prod, prevRest);
    }
  }
  walkProdRef(refProd, currRest, prevRest) {
    if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
      const fullRest = currRest.concat(prevRest);
      this.updateExpectedNext();
      this.walk(refProd.referencedRule, fullRest);
    }
  }
  updateExpectedNext() {
    if (isEmpty_default(this.ruleStack)) {
      this.nextProductionName = "";
      this.nextProductionOccurrence = 0;
      this.isAtEndOfPath = true;
    } else {
      this.nextProductionName = this.ruleStack.pop();
      this.nextProductionOccurrence = this.occurrenceStack.pop();
    }
  }
};
var NextAfterTokenWalker = class extends AbstractNextPossibleTokensWalker {
  constructor(topProd, path) {
    super(topProd, path);
    this.path = path;
    this.nextTerminalName = "";
    this.nextTerminalOccurrence = 0;
    this.nextTerminalName = this.path.lastTok.name;
    this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(terminal, currRest, prevRest) {
    if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
      const fullRest = currRest.concat(prevRest);
      const restProd = new Alternative({ definition: fullRest });
      this.possibleTokTypes = first(restProd);
      this.found = true;
    }
  }
};
var AbstractNextTerminalAfterProductionWalker = class extends RestWalker {
  constructor(topRule, occurrence) {
    super();
    this.topRule = topRule;
    this.occurrence = occurrence;
    this.result = {
      token: void 0,
      occurrence: void 0,
      isEndOfRule: void 0
    };
  }
  startWalking() {
    this.walk(this.topRule);
    return this.result;
  }
};
var NextTerminalAfterManyWalker = class extends AbstractNextTerminalAfterProductionWalker {
  walkMany(manyProd, currRest, prevRest) {
    if (manyProd.idx === this.occurrence) {
      const firstAfterMany = head_default(currRest.concat(prevRest));
      this.result.isEndOfRule = firstAfterMany === void 0;
      if (firstAfterMany instanceof Terminal) {
        this.result.token = firstAfterMany.terminalType;
        this.result.occurrence = firstAfterMany.idx;
      }
    } else {
      super.walkMany(manyProd, currRest, prevRest);
    }
  }
};
var NextTerminalAfterManySepWalker = class extends AbstractNextTerminalAfterProductionWalker {
  walkManySep(manySepProd, currRest, prevRest) {
    if (manySepProd.idx === this.occurrence) {
      const firstAfterManySep = head_default(currRest.concat(prevRest));
      this.result.isEndOfRule = firstAfterManySep === void 0;
      if (firstAfterManySep instanceof Terminal) {
        this.result.token = firstAfterManySep.terminalType;
        this.result.occurrence = firstAfterManySep.idx;
      }
    } else {
      super.walkManySep(manySepProd, currRest, prevRest);
    }
  }
};
var NextTerminalAfterAtLeastOneWalker = class extends AbstractNextTerminalAfterProductionWalker {
  walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
    if (atLeastOneProd.idx === this.occurrence) {
      const firstAfterAtLeastOne = head_default(currRest.concat(prevRest));
      this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
      if (firstAfterAtLeastOne instanceof Terminal) {
        this.result.token = firstAfterAtLeastOne.terminalType;
        this.result.occurrence = firstAfterAtLeastOne.idx;
      }
    } else {
      super.walkAtLeastOne(atLeastOneProd, currRest, prevRest);
    }
  }
};
var NextTerminalAfterAtLeastOneSepWalker = class extends AbstractNextTerminalAfterProductionWalker {
  walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest) {
    if (atleastOneSepProd.idx === this.occurrence) {
      const firstAfterfirstAfterAtLeastOneSep = head_default(currRest.concat(prevRest));
      this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
      if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
        this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
        this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
      }
    } else {
      super.walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest);
    }
  }
};
function possiblePathsFrom(targetDef, maxLength, currPath = []) {
  currPath = clone_default(currPath);
  let result2 = [];
  let i = 0;
  function remainingPathWith(nextDef) {
    return nextDef.concat(drop_default(targetDef, i + 1));
  }
  function getAlternativesForProd(definition) {
    const alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
    return result2.concat(alternatives);
  }
  while (currPath.length < maxLength && i < targetDef.length) {
    const prod = targetDef[i];
    if (prod instanceof Alternative) {
      return getAlternativesForProd(prod.definition);
    } else if (prod instanceof NonTerminal) {
      return getAlternativesForProd(prod.definition);
    } else if (prod instanceof Option) {
      result2 = getAlternativesForProd(prod.definition);
    } else if (prod instanceof RepetitionMandatory) {
      const newDef = prod.definition.concat([
        new Repetition({
          definition: prod.definition
        })
      ]);
      return getAlternativesForProd(newDef);
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      const newDef = [
        new Alternative({ definition: prod.definition }),
        new Repetition({
          definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
        })
      ];
      return getAlternativesForProd(newDef);
    } else if (prod instanceof RepetitionWithSeparator) {
      const newDef = prod.definition.concat([
        new Repetition({
          definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
        })
      ]);
      result2 = getAlternativesForProd(newDef);
    } else if (prod instanceof Repetition) {
      const newDef = prod.definition.concat([
        new Repetition({
          definition: prod.definition
        })
      ]);
      result2 = getAlternativesForProd(newDef);
    } else if (prod instanceof Alternation) {
      forEach_default(prod.definition, (currAlt) => {
        if (isEmpty_default(currAlt.definition) === false) {
          result2 = getAlternativesForProd(currAlt.definition);
        }
      });
      return result2;
    } else if (prod instanceof Terminal) {
      currPath.push(prod.terminalType);
    } else {
      throw Error("non exhaustive match");
    }
    i++;
  }
  result2.push({
    partialPath: currPath,
    suffixDef: drop_default(targetDef, i)
  });
  return result2;
}
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
  const EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
  const EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
  const EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
  let foundCompletePath = false;
  const tokenVectorLength = tokenVector.length;
  const minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
  const result2 = [];
  const possiblePaths = [];
  possiblePaths.push({
    idx: -1,
    def: initialDef,
    ruleStack: [],
    occurrenceStack: []
  });
  while (!isEmpty_default(possiblePaths)) {
    const currPath = possiblePaths.pop();
    if (currPath === EXIT_ALTERNATIVE) {
      if (foundCompletePath && last_default(possiblePaths).idx <= minimalAlternativesIndex) {
        possiblePaths.pop();
      }
      continue;
    }
    const currDef = currPath.def;
    const currIdx = currPath.idx;
    const currRuleStack = currPath.ruleStack;
    const currOccurrenceStack = currPath.occurrenceStack;
    if (isEmpty_default(currDef)) {
      continue;
    }
    const prod = currDef[0];
    if (prod === EXIT_NON_TERMINAL) {
      const nextPath = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: dropRight_default(currRuleStack),
        occurrenceStack: dropRight_default(currOccurrenceStack)
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof Terminal) {
      if (currIdx < tokenVectorLength - 1) {
        const nextIdx = currIdx + 1;
        const actualToken = tokenVector[nextIdx];
        if (tokMatcher(actualToken, prod.terminalType)) {
          const nextPath = {
            idx: nextIdx,
            def: drop_default(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPath);
        }
      } else if (currIdx === tokenVectorLength - 1) {
        result2.push({
          nextTokenType: prod.terminalType,
          nextTokenOccurrence: prod.idx,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        });
        foundCompletePath = true;
      } else {
        throw Error("non exhaustive match");
      }
    } else if (prod instanceof NonTerminal) {
      const newRuleStack = clone_default(currRuleStack);
      newRuleStack.push(prod.nonTerminalName);
      const newOccurrenceStack = clone_default(currOccurrenceStack);
      newOccurrenceStack.push(prod.idx);
      const nextPath = {
        idx: currIdx,
        def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop_default(currDef)),
        ruleStack: newRuleStack,
        occurrenceStack: newOccurrenceStack
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof Option) {
      const nextPathWithout = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWithout);
      possiblePaths.push(EXIT_ALTERNATIVE);
      const nextPathWith = {
        idx: currIdx,
        def: prod.definition.concat(drop_default(currDef)),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWith);
    } else if (prod instanceof RepetitionMandatory) {
      const secondIteration = new Repetition({
        definition: prod.definition,
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([secondIteration], drop_default(currDef));
      const nextPath = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      const separatorGast = new Terminal({
        terminalType: prod.separator
      });
      const secondIteration = new Repetition({
        definition: [separatorGast].concat(prod.definition),
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([secondIteration], drop_default(currDef));
      const nextPath = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof RepetitionWithSeparator) {
      const nextPathWithout = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWithout);
      possiblePaths.push(EXIT_ALTERNATIVE);
      const separatorGast = new Terminal({
        terminalType: prod.separator
      });
      const nthRepetition = new Repetition({
        definition: [separatorGast].concat(prod.definition),
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([nthRepetition], drop_default(currDef));
      const nextPathWith = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWith);
    } else if (prod instanceof Repetition) {
      const nextPathWithout = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWithout);
      possiblePaths.push(EXIT_ALTERNATIVE);
      const nthRepetition = new Repetition({
        definition: prod.definition,
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([nthRepetition], drop_default(currDef));
      const nextPathWith = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWith);
    } else if (prod instanceof Alternation) {
      for (let i = prod.definition.length - 1; i >= 0; i--) {
        const currAlt = prod.definition[i];
        const currAltPath = {
          idx: currIdx,
          def: currAlt.definition.concat(drop_default(currDef)),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(currAltPath);
        possiblePaths.push(EXIT_ALTERNATIVE);
      }
    } else if (prod instanceof Alternative) {
      possiblePaths.push({
        idx: currIdx,
        def: prod.definition.concat(drop_default(currDef)),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      });
    } else if (prod instanceof Rule) {
      possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
    } else {
      throw Error("non exhaustive match");
    }
  }
  return result2;
}
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
  const newRuleStack = clone_default(currRuleStack);
  newRuleStack.push(topRule.name);
  const newCurrOccurrenceStack = clone_default(currOccurrenceStack);
  newCurrOccurrenceStack.push(1);
  return {
    idx: currIdx,
    def: topRule.definition,
    ruleStack: newRuleStack,
    occurrenceStack: newCurrOccurrenceStack
  };
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/lookahead.js
var PROD_TYPE;
(function(PROD_TYPE2) {
  PROD_TYPE2[PROD_TYPE2["OPTION"] = 0] = "OPTION";
  PROD_TYPE2[PROD_TYPE2["REPETITION"] = 1] = "REPETITION";
  PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
  PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
  PROD_TYPE2[PROD_TYPE2["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
  PROD_TYPE2[PROD_TYPE2["ALTERNATION"] = 5] = "ALTERNATION";
})(PROD_TYPE || (PROD_TYPE = {}));
function getProdType(prod) {
  if (prod instanceof Option || prod === "Option") {
    return PROD_TYPE.OPTION;
  } else if (prod instanceof Repetition || prod === "Repetition") {
    return PROD_TYPE.REPETITION;
  } else if (prod instanceof RepetitionMandatory || prod === "RepetitionMandatory") {
    return PROD_TYPE.REPETITION_MANDATORY;
  } else if (prod instanceof RepetitionMandatoryWithSeparator || prod === "RepetitionMandatoryWithSeparator") {
    return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
  } else if (prod instanceof RepetitionWithSeparator || prod === "RepetitionWithSeparator") {
    return PROD_TYPE.REPETITION_WITH_SEPARATOR;
  } else if (prod instanceof Alternation || prod === "Alternation") {
    return PROD_TYPE.ALTERNATION;
  } else {
    throw Error("non exhaustive match");
  }
}
function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
  const lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
  const tokenMatcher2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
  return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher2, dynamicTokensEnabled);
}
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
  const lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
  const tokenMatcher2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
  return lookaheadBuilder(lookAheadPaths[0], tokenMatcher2, dynamicTokensEnabled);
}
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher2, dynamicTokensEnabled) {
  const numOfAlts = alts.length;
  const areAllOneTokenLookahead = every_default(alts, (currAlt) => {
    return every_default(currAlt, (currPath) => {
      return currPath.length === 1;
    });
  });
  if (hasPredicates) {
    return function(orAlts) {
      const predicates = map_default(orAlts, (currAlt) => currAlt.GATE);
      for (let t = 0; t < numOfAlts; t++) {
        const currAlt = alts[t];
        const currNumOfPaths = currAlt.length;
        const currPredicate = predicates[t];
        if (currPredicate !== void 0 && currPredicate.call(this) === false) {
          continue;
        }
        nextPath: for (let j = 0; j < currNumOfPaths; j++) {
          const currPath = currAlt[j];
          const currPathLength = currPath.length;
          for (let i = 0; i < currPathLength; i++) {
            const nextToken = this.LA(i + 1);
            if (tokenMatcher2(nextToken, currPath[i]) === false) {
              continue nextPath;
            }
          }
          return t;
        }
      }
      return void 0;
    };
  } else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
    const singleTokenAlts = map_default(alts, (currAlt) => {
      return flatten_default(currAlt);
    });
    const choiceToAlt = reduce_default(singleTokenAlts, (result2, currAlt, idx) => {
      forEach_default(currAlt, (currTokType) => {
        if (!has_default(result2, currTokType.tokenTypeIdx)) {
          result2[currTokType.tokenTypeIdx] = idx;
        }
        forEach_default(currTokType.categoryMatches, (currExtendingType) => {
          if (!has_default(result2, currExtendingType)) {
            result2[currExtendingType] = idx;
          }
        });
      });
      return result2;
    }, {});
    return function() {
      const nextToken = this.LA(1);
      return choiceToAlt[nextToken.tokenTypeIdx];
    };
  } else {
    return function() {
      for (let t = 0; t < numOfAlts; t++) {
        const currAlt = alts[t];
        const currNumOfPaths = currAlt.length;
        nextPath: for (let j = 0; j < currNumOfPaths; j++) {
          const currPath = currAlt[j];
          const currPathLength = currPath.length;
          for (let i = 0; i < currPathLength; i++) {
            const nextToken = this.LA(i + 1);
            if (tokenMatcher2(nextToken, currPath[i]) === false) {
              continue nextPath;
            }
          }
          return t;
        }
      }
      return void 0;
    };
  }
}
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher2, dynamicTokensEnabled) {
  const areAllOneTokenLookahead = every_default(alt, (currPath) => {
    return currPath.length === 1;
  });
  const numOfPaths = alt.length;
  if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
    const singleTokensTypes = flatten_default(alt);
    if (singleTokensTypes.length === 1 && isEmpty_default(singleTokensTypes[0].categoryMatches)) {
      const expectedTokenType = singleTokensTypes[0];
      const expectedTokenUniqueKey = expectedTokenType.tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey;
      };
    } else {
      const choiceToAlt = reduce_default(singleTokensTypes, (result2, currTokType, idx) => {
        result2[currTokType.tokenTypeIdx] = true;
        forEach_default(currTokType.categoryMatches, (currExtendingType) => {
          result2[currExtendingType] = true;
        });
        return result2;
      }, []);
      return function() {
        const nextToken = this.LA(1);
        return choiceToAlt[nextToken.tokenTypeIdx] === true;
      };
    }
  } else {
    return function() {
      nextPath: for (let j = 0; j < numOfPaths; j++) {
        const currPath = alt[j];
        const currPathLength = currPath.length;
        for (let i = 0; i < currPathLength; i++) {
          const nextToken = this.LA(i + 1);
          if (tokenMatcher2(nextToken, currPath[i]) === false) {
            continue nextPath;
          }
        }
        return true;
      }
      return false;
    };
  }
}
var RestDefinitionFinderWalker = class extends RestWalker {
  constructor(topProd, targetOccurrence, targetProdType) {
    super();
    this.topProd = topProd;
    this.targetOccurrence = targetOccurrence;
    this.targetProdType = targetProdType;
  }
  startWalking() {
    this.walk(this.topProd);
    return this.restDef;
  }
  checkIsTarget(node, expectedProdType, currRest, prevRest) {
    if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
      this.restDef = currRest.concat(prevRest);
      return true;
    }
    return false;
  }
  walkOption(optionProd, currRest, prevRest) {
    if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
      super.walkOption(optionProd, currRest, prevRest);
    }
  }
  walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
    if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
      super.walkOption(atLeastOneProd, currRest, prevRest);
    }
  }
  walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
    if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
      super.walkOption(atLeastOneSepProd, currRest, prevRest);
    }
  }
  walkMany(manyProd, currRest, prevRest) {
    if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
      super.walkOption(manyProd, currRest, prevRest);
    }
  }
  walkManySep(manySepProd, currRest, prevRest) {
    if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
      super.walkOption(manySepProd, currRest, prevRest);
    }
  }
};
var InsideDefinitionFinderVisitor = class extends GAstVisitor {
  constructor(targetOccurrence, targetProdType, targetRef) {
    super();
    this.targetOccurrence = targetOccurrence;
    this.targetProdType = targetProdType;
    this.targetRef = targetRef;
    this.result = [];
  }
  checkIsTarget(node, expectedProdName) {
    if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) {
      this.result = node.definition;
    }
  }
  visitOption(node) {
    this.checkIsTarget(node, PROD_TYPE.OPTION);
  }
  visitRepetition(node) {
    this.checkIsTarget(node, PROD_TYPE.REPETITION);
  }
  visitRepetitionMandatory(node) {
    this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(node) {
    this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(node) {
    this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(node) {
    this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
  }
};
function initializeArrayOfArrays(size2) {
  const result2 = new Array(size2);
  for (let i = 0; i < size2; i++) {
    result2[i] = [];
  }
  return result2;
}
function pathToHashKeys(path) {
  let keys2 = [""];
  for (let i = 0; i < path.length; i++) {
    const tokType = path[i];
    const longerKeys = [];
    for (let j = 0; j < keys2.length; j++) {
      const currShorterKey = keys2[j];
      longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
      for (let t = 0; t < tokType.categoryMatches.length; t++) {
        const categoriesKeySuffix = "_" + tokType.categoryMatches[t];
        longerKeys.push(currShorterKey + categoriesKeySuffix);
      }
    }
    keys2 = longerKeys;
  }
  return keys2;
}
function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
  for (let currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
    if (currAltIdx === idx) {
      continue;
    }
    const otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
    for (let searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
      const searchKey = searchPathKeys[searchIdx];
      if (otherAltKnownPathsKeys[searchKey] === true) {
        return false;
      }
    }
  }
  return true;
}
function lookAheadSequenceFromAlternatives(altsDefs, k) {
  const partialAlts = map_default(altsDefs, (currAlt) => possiblePathsFrom([currAlt], 1));
  const finalResult = initializeArrayOfArrays(partialAlts.length);
  const altsHashes = map_default(partialAlts, (currAltPaths) => {
    const dict = {};
    forEach_default(currAltPaths, (item) => {
      const keys2 = pathToHashKeys(item.partialPath);
      forEach_default(keys2, (currKey) => {
        dict[currKey] = true;
      });
    });
    return dict;
  });
  let newData = partialAlts;
  for (let pathLength = 1; pathLength <= k; pathLength++) {
    const currDataset = newData;
    newData = initializeArrayOfArrays(currDataset.length);
    for (let altIdx = 0; altIdx < currDataset.length; altIdx++) {
      const currAltPathsAndSuffixes = currDataset[altIdx];
      for (let currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
        const currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
        const suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
        const prefixKeys = pathToHashKeys(currPathPrefix);
        const isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx);
        if (isUnique || isEmpty_default(suffixDef) || currPathPrefix.length === k) {
          const currAltResult = finalResult[altIdx];
          if (containsPath(currAltResult, currPathPrefix) === false) {
            currAltResult.push(currPathPrefix);
            for (let j = 0; j < prefixKeys.length; j++) {
              const currKey = prefixKeys[j];
              altsHashes[altIdx][currKey] = true;
            }
          }
        } else {
          const newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
          newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes);
          forEach_default(newPartialPathsAndSuffixes, (item) => {
            const prefixKeys2 = pathToHashKeys(item.partialPath);
            forEach_default(prefixKeys2, (key) => {
              altsHashes[altIdx][key] = true;
            });
          });
        }
      }
    }
  }
  return finalResult;
}
function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
  const visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
  ruleGrammar.accept(visitor);
  return lookAheadSequenceFromAlternatives(visitor.result, k);
}
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
  const insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
  ruleGrammar.accept(insideDefVisitor);
  const insideDef = insideDefVisitor.result;
  const afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
  const afterDef = afterDefWalker.startWalking();
  const insideFlat = new Alternative({ definition: insideDef });
  const afterFlat = new Alternative({ definition: afterDef });
  return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
}
function containsPath(alternative, searchPath) {
  compareOtherPath: for (let i = 0; i < alternative.length; i++) {
    const otherPath = alternative[i];
    if (otherPath.length !== searchPath.length) {
      continue;
    }
    for (let j = 0; j < otherPath.length; j++) {
      const searchTok = searchPath[j];
      const otherTok = otherPath[j];
      const matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0;
      if (matchingTokens === false) {
        continue compareOtherPath;
      }
    }
    return true;
  }
  return false;
}
function isStrictPrefixOfPath(prefix, other) {
  return prefix.length < other.length && every_default(prefix, (tokType, idx) => {
    const otherTokType = other[idx];
    return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
  });
}
function areTokenCategoriesNotUsed(lookAheadPaths) {
  return every_default(lookAheadPaths, (singleAltPaths) => every_default(singleAltPaths, (singlePath) => every_default(singlePath, (token) => isEmpty_default(token.categoryMatches))));
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/checks.js
function validateLookahead(options) {
  const lookaheadValidationErrorMessages = options.lookaheadStrategy.validate({
    rules: options.rules,
    tokenTypes: options.tokenTypes,
    grammarName: options.grammarName
  });
  return map_default(lookaheadValidationErrorMessages, (errorMessage) => Object.assign({ type: ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION }, errorMessage));
}
function validateGrammar(topLevels, tokenTypes, errMsgProvider, grammarName) {
  const duplicateErrors = flatMap_default(topLevels, (currTopLevel) => validateDuplicateProductions(currTopLevel, errMsgProvider));
  const termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
  const tooManyAltsErrors = flatMap_default(topLevels, (curRule) => validateTooManyAlts(curRule, errMsgProvider));
  const duplicateRulesError = flatMap_default(topLevels, (curRule) => validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider));
  return duplicateErrors.concat(termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError);
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
  const collectorVisitor2 = new OccurrenceValidationCollector();
  topLevelRule.accept(collectorVisitor2);
  const allRuleProductions = collectorVisitor2.allProductions;
  const productionGroups = groupBy_default(allRuleProductions, identifyProductionForDuplicates);
  const duplicates = pickBy_default(productionGroups, (currGroup) => {
    return currGroup.length > 1;
  });
  const errors = map_default(values_default(duplicates), (currDuplicates) => {
    const firstProd = head_default(currDuplicates);
    const msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
    const dslName = getProductionDslName(firstProd);
    const defError = {
      message: msg,
      type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
      ruleName: topLevelRule.name,
      dslName,
      occurrence: firstProd.idx
    };
    const param = getExtraProductionArgument(firstProd);
    if (param) {
      defError.parameter = param;
    }
    return defError;
  });
  return errors;
}
function identifyProductionForDuplicates(prod) {
  return `${getProductionDslName(prod)}_#_${prod.idx}_#_${getExtraProductionArgument(prod)}`;
}
function getExtraProductionArgument(prod) {
  if (prod instanceof Terminal) {
    return prod.terminalType.name;
  } else if (prod instanceof NonTerminal) {
    return prod.nonTerminalName;
  } else {
    return "";
  }
}
var OccurrenceValidationCollector = class extends GAstVisitor {
  constructor() {
    super(...arguments);
    this.allProductions = [];
  }
  visitNonTerminal(subrule) {
    this.allProductions.push(subrule);
  }
  visitOption(option) {
    this.allProductions.push(option);
  }
  visitRepetitionWithSeparator(manySep) {
    this.allProductions.push(manySep);
  }
  visitRepetitionMandatory(atLeastOne) {
    this.allProductions.push(atLeastOne);
  }
  visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
    this.allProductions.push(atLeastOneSep);
  }
  visitRepetition(many) {
    this.allProductions.push(many);
  }
  visitAlternation(or) {
    this.allProductions.push(or);
  }
  visitTerminal(terminal) {
    this.allProductions.push(terminal);
  }
};
function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
  const errors = [];
  const occurrences = reduce_default(allRules, (result2, curRule) => {
    if (curRule.name === rule.name) {
      return result2 + 1;
    }
    return result2;
  }, 0);
  if (occurrences > 1) {
    const errMsg = errMsgProvider.buildDuplicateRuleNameError({
      topLevelRule: rule,
      grammarName: className
    });
    errors.push({
      message: errMsg,
      type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
      ruleName: rule.name
    });
  }
  return errors;
}
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
  const errors = [];
  let errMsg;
  if (!includes_default(definedRulesNames, ruleName)) {
    errMsg = `Invalid rule override, rule: ->${ruleName}<- cannot be overridden in the grammar: ->${className}<-as it is not defined in any of the super grammars `;
    errors.push({
      message: errMsg,
      type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
      ruleName
    });
  }
  return errors;
}
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path = []) {
  const errors = [];
  const nextNonTerminals = getFirstNoneTerminal(currRule.definition);
  if (isEmpty_default(nextNonTerminals)) {
    return [];
  } else {
    const ruleName = topRule.name;
    const foundLeftRecursion = includes_default(nextNonTerminals, topRule);
    if (foundLeftRecursion) {
      errors.push({
        message: errMsgProvider.buildLeftRecursionError({
          topLevelRule: topRule,
          leftRecursionPath: path
        }),
        type: ParserDefinitionErrorType.LEFT_RECURSION,
        ruleName
      });
    }
    const validNextSteps = difference_default(nextNonTerminals, path.concat([topRule]));
    const errorsFromNextSteps = flatMap_default(validNextSteps, (currRefRule) => {
      const newPath = clone_default(path);
      newPath.push(currRefRule);
      return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
    });
    return errors.concat(errorsFromNextSteps);
  }
}
function getFirstNoneTerminal(definition) {
  let result2 = [];
  if (isEmpty_default(definition)) {
    return result2;
  }
  const firstProd = head_default(definition);
  if (firstProd instanceof NonTerminal) {
    result2.push(firstProd.referencedRule);
  } else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) {
    result2 = result2.concat(getFirstNoneTerminal(firstProd.definition));
  } else if (firstProd instanceof Alternation) {
    result2 = flatten_default(map_default(firstProd.definition, (currSubDef) => getFirstNoneTerminal(currSubDef.definition)));
  } else if (firstProd instanceof Terminal) {
  } else {
    throw Error("non exhaustive match");
  }
  const isFirstOptional = isOptionalProd(firstProd);
  const hasMore = definition.length > 1;
  if (isFirstOptional && hasMore) {
    const rest2 = drop_default(definition);
    return result2.concat(getFirstNoneTerminal(rest2));
  } else {
    return result2;
  }
}
var OrCollector = class extends GAstVisitor {
  constructor() {
    super(...arguments);
    this.alternations = [];
  }
  visitAlternation(node) {
    this.alternations.push(node);
  }
};
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
  const orCollector = new OrCollector();
  topLevelRule.accept(orCollector);
  const ors = orCollector.alternations;
  const errors = flatMap_default(ors, (currOr) => {
    const exceptLast = dropRight_default(currOr.definition);
    return flatMap_default(exceptLast, (currAlternative, currAltIdx) => {
      const possibleFirstInAlt = nextPossibleTokensAfter([currAlternative], [], tokenStructuredMatcher, 1);
      if (isEmpty_default(possibleFirstInAlt)) {
        return [
          {
            message: errMsgProvider.buildEmptyAlternationError({
              topLevelRule,
              alternation: currOr,
              emptyChoiceIdx: currAltIdx
            }),
            type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
            ruleName: topLevelRule.name,
            occurrence: currOr.idx,
            alternative: currAltIdx + 1
          }
        ];
      } else {
        return [];
      }
    });
  });
  return errors;
}
function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
  const orCollector = new OrCollector();
  topLevelRule.accept(orCollector);
  let ors = orCollector.alternations;
  ors = reject_default(ors, (currOr) => currOr.ignoreAmbiguities === true);
  const errors = flatMap_default(ors, (currOr) => {
    const currOccurrence = currOr.idx;
    const actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
    const alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
    const altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
    const altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
    return altsAmbiguityErrors.concat(altsPrefixAmbiguityErrors);
  });
  return errors;
}
var RepetitionCollector = class extends GAstVisitor {
  constructor() {
    super(...arguments);
    this.allProductions = [];
  }
  visitRepetitionWithSeparator(manySep) {
    this.allProductions.push(manySep);
  }
  visitRepetitionMandatory(atLeastOne) {
    this.allProductions.push(atLeastOne);
  }
  visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
    this.allProductions.push(atLeastOneSep);
  }
  visitRepetition(many) {
    this.allProductions.push(many);
  }
};
function validateTooManyAlts(topLevelRule, errMsgProvider) {
  const orCollector = new OrCollector();
  topLevelRule.accept(orCollector);
  const ors = orCollector.alternations;
  const errors = flatMap_default(ors, (currOr) => {
    if (currOr.definition.length > 255) {
      return [
        {
          message: errMsgProvider.buildTooManyAlternativesError({
            topLevelRule,
            alternation: currOr
          }),
          type: ParserDefinitionErrorType.TOO_MANY_ALTS,
          ruleName: topLevelRule.name,
          occurrence: currOr.idx
        }
      ];
    } else {
      return [];
    }
  });
  return errors;
}
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
  const errors = [];
  forEach_default(topLevelRules, (currTopRule) => {
    const collectorVisitor2 = new RepetitionCollector();
    currTopRule.accept(collectorVisitor2);
    const allRuleProductions = collectorVisitor2.allProductions;
    forEach_default(allRuleProductions, (currProd) => {
      const prodType = getProdType(currProd);
      const actualMaxLookahead = currProd.maxLookahead || maxLookahead;
      const currOccurrence = currProd.idx;
      const paths = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
      const pathsInsideProduction = paths[0];
      if (isEmpty_default(flatten_default(pathsInsideProduction))) {
        const errMsg = errMsgProvider.buildEmptyRepetitionError({
          topLevelRule: currTopRule,
          repetition: currProd
        });
        errors.push({
          message: errMsg,
          type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: currTopRule.name
        });
      }
    });
  });
  return errors;
}
function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
  const foundAmbiguousPaths = [];
  const identicalAmbiguities = reduce_default(alternatives, (result2, currAlt, currAltIdx) => {
    if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
      return result2;
    }
    forEach_default(currAlt, (currPath) => {
      const altsCurrPathAppearsIn = [currAltIdx];
      forEach_default(alternatives, (currOtherAlt, currOtherAltIdx) => {
        if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && // ignore (skip) ambiguities with this "other" alternative
        alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
          altsCurrPathAppearsIn.push(currOtherAltIdx);
        }
      });
      if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
        foundAmbiguousPaths.push(currPath);
        result2.push({
          alts: altsCurrPathAppearsIn,
          path: currPath
        });
      }
    });
    return result2;
  }, []);
  const currErrors = map_default(identicalAmbiguities, (currAmbDescriptor) => {
    const ambgIndices = map_default(currAmbDescriptor.alts, (currAltIdx) => currAltIdx + 1);
    const currMessage = errMsgProvider.buildAlternationAmbiguityError({
      topLevelRule: rule,
      alternation,
      ambiguityIndices: ambgIndices,
      prefixPath: currAmbDescriptor.path
    });
    return {
      message: currMessage,
      type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
      ruleName: rule.name,
      occurrence: alternation.idx,
      alternatives: currAmbDescriptor.alts
    };
  });
  return currErrors;
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
  const pathsAndIndices = reduce_default(alternatives, (result2, currAlt, idx) => {
    const currPathsAndIdx = map_default(currAlt, (currPath) => {
      return { idx, path: currPath };
    });
    return result2.concat(currPathsAndIdx);
  }, []);
  const errors = compact_default(flatMap_default(pathsAndIndices, (currPathAndIdx) => {
    const alternativeGast = alternation.definition[currPathAndIdx.idx];
    if (alternativeGast.ignoreAmbiguities === true) {
      return [];
    }
    const targetIdx = currPathAndIdx.idx;
    const targetPath = currPathAndIdx.path;
    const prefixAmbiguitiesPathsAndIndices = filter_default(pathsAndIndices, (searchPathAndIdx) => {
      return (
        // ignore (skip) ambiguities with this "other" alternative
        alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && // checking for strict prefix because identical lookaheads
        // will be be detected using a different validation.
        isStrictPrefixOfPath(searchPathAndIdx.path, targetPath)
      );
    });
    const currPathPrefixErrors = map_default(prefixAmbiguitiesPathsAndIndices, (currAmbPathAndIdx) => {
      const ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
      const occurrence = alternation.idx === 0 ? "" : alternation.idx;
      const message = errMsgProvider.buildAlternationPrefixAmbiguityError({
        topLevelRule: rule,
        alternation,
        ambiguityIndices: ambgIndices,
        prefixPath: currAmbPathAndIdx.path
      });
      return {
        message,
        type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
        ruleName: rule.name,
        occurrence,
        alternatives: ambgIndices
      };
    });
    return currPathPrefixErrors;
  }));
  return errors;
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
  const errors = [];
  const tokenNames = map_default(tokenTypes, (currToken) => currToken.name);
  forEach_default(topLevels, (currRule) => {
    const currRuleName = currRule.name;
    if (includes_default(tokenNames, currRuleName)) {
      const errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
      errors.push({
        message: errMsg,
        type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: currRuleName
      });
    }
  });
  return errors;
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/gast/gast_resolver_public.js
function resolveGrammar2(options) {
  const actualOptions = defaults_default(options, {
    errMsgProvider: defaultGrammarResolverErrorProvider
  });
  const topRulesTable = {};
  forEach_default(options.rules, (rule) => {
    topRulesTable[rule.name] = rule;
  });
  return resolveGrammar(topRulesTable, actualOptions.errMsgProvider);
}
function validateGrammar2(options) {
  options = defaults_default(options, {
    errMsgProvider: defaultGrammarValidatorErrorProvider
  });
  return validateGrammar(options.rules, options.tokenTypes, options.errMsgProvider, options.grammarName);
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/exceptions_public.js
var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
var EARLY_EXIT_EXCEPTION = "EarlyExitException";
var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
var RECOGNITION_EXCEPTION_NAMES = [
  MISMATCHED_TOKEN_EXCEPTION,
  NO_VIABLE_ALT_EXCEPTION,
  EARLY_EXIT_EXCEPTION,
  NOT_ALL_INPUT_PARSED_EXCEPTION
];
Object.freeze(RECOGNITION_EXCEPTION_NAMES);
function isRecognitionException(error) {
  return includes_default(RECOGNITION_EXCEPTION_NAMES, error.name);
}
var RecognitionException = class extends Error {
  constructor(message, token) {
    super(message);
    this.token = token;
    this.resyncedTokens = [];
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var MismatchedTokenException = class extends RecognitionException {
  constructor(message, token, previousToken) {
    super(message, token);
    this.previousToken = previousToken;
    this.name = MISMATCHED_TOKEN_EXCEPTION;
  }
};
var NoViableAltException = class extends RecognitionException {
  constructor(message, token, previousToken) {
    super(message, token);
    this.previousToken = previousToken;
    this.name = NO_VIABLE_ALT_EXCEPTION;
  }
};
var NotAllInputParsedException = class extends RecognitionException {
  constructor(message, token) {
    super(message, token);
    this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
  }
};
var EarlyExitException = class extends RecognitionException {
  constructor(message, token, previousToken) {
    super(message, token);
    this.previousToken = previousToken;
    this.name = EARLY_EXIT_EXCEPTION;
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/recoverable.js
var EOF_FOLLOW_KEY = {};
var IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
var InRuleRecoveryException = class extends Error {
  constructor(message) {
    super(message);
    this.name = IN_RULE_RECOVERY_EXCEPTION;
  }
};
var Recoverable = class {
  initRecoverable(config) {
    this.firstAfterRepMap = {};
    this.resyncFollows = {};
    this.recoveryEnabled = has_default(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled;
    if (this.recoveryEnabled) {
      this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
    }
  }
  getTokenToInsert(tokType) {
    const tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
    tokToInsert.isInsertedInRecovery = true;
    return tokToInsert;
  }
  canTokenTypeBeInsertedInRecovery(tokType) {
    return true;
  }
  canTokenTypeBeDeletedInRecovery(tokType) {
    return true;
  }
  tryInRepetitionRecovery(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
    const reSyncTokType = this.findReSyncTokenType();
    const savedLexerState = this.exportLexerState();
    const resyncedTokens = [];
    let passedResyncPoint = false;
    const nextTokenWithoutResync = this.LA(1);
    let currToken = this.LA(1);
    const generateErrorMessage = () => {
      const previousToken = this.LA(0);
      const msg = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: expectedTokType,
        actual: nextTokenWithoutResync,
        previous: previousToken,
        ruleName: this.getCurrRuleFullName()
      });
      const error = new MismatchedTokenException(msg, nextTokenWithoutResync, this.LA(0));
      error.resyncedTokens = dropRight_default(resyncedTokens);
      this.SAVE_ERROR(error);
    };
    while (!passedResyncPoint) {
      if (this.tokenMatcher(currToken, expectedTokType)) {
        generateErrorMessage();
        return;
      } else if (lookAheadFunc.call(this)) {
        generateErrorMessage();
        grammarRule.apply(this, grammarRuleArgs);
        return;
      } else if (this.tokenMatcher(currToken, reSyncTokType)) {
        passedResyncPoint = true;
      } else {
        currToken = this.SKIP_TOKEN();
        this.addToResyncTokens(currToken, resyncedTokens);
      }
    }
    this.importLexerState(savedLexerState);
  }
  shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck) {
    if (notStuck === false) {
      return false;
    }
    if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
      return false;
    }
    if (this.isBackTracking()) {
      return false;
    }
    if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
      return false;
    }
    return true;
  }
  // Error Recovery functionality
  getFollowsForInRuleRecovery(tokType, tokIdxInRule) {
    const grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
    const follows = this.getNextPossibleTokenTypes(grammarPath);
    return follows;
  }
  tryInRuleRecovery(expectedTokType, follows) {
    if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
      const tokToInsert = this.getTokenToInsert(expectedTokType);
      return tokToInsert;
    }
    if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
      const nextTok = this.SKIP_TOKEN();
      this.consumeToken();
      return nextTok;
    }
    throw new InRuleRecoveryException("sad sad panda");
  }
  canPerformInRuleRecovery(expectedToken, follows) {
    return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
  }
  canRecoverWithSingleTokenInsertion(expectedTokType, follows) {
    if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
      return false;
    }
    if (isEmpty_default(follows)) {
      return false;
    }
    const mismatchedTok = this.LA(1);
    const isMisMatchedTokInFollows = find_default(follows, (possibleFollowsTokType) => {
      return this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
    }) !== void 0;
    return isMisMatchedTokInFollows;
  }
  canRecoverWithSingleTokenDeletion(expectedTokType) {
    if (!this.canTokenTypeBeDeletedInRecovery(expectedTokType)) {
      return false;
    }
    const isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
    return isNextTokenWhatIsExpected;
  }
  isInCurrentRuleReSyncSet(tokenTypeIdx) {
    const followKey = this.getCurrFollowKey();
    const currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
    return includes_default(currentRuleReSyncSet, tokenTypeIdx);
  }
  findReSyncTokenType() {
    const allPossibleReSyncTokTypes = this.flattenFollowSet();
    let nextToken = this.LA(1);
    let k = 2;
    while (true) {
      const foundMatch = find_default(allPossibleReSyncTokTypes, (resyncTokType) => {
        const canMatch = tokenMatcher(nextToken, resyncTokType);
        return canMatch;
      });
      if (foundMatch !== void 0) {
        return foundMatch;
      }
      nextToken = this.LA(k);
      k++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1) {
      return EOF_FOLLOW_KEY;
    }
    const currRuleShortName = this.getLastExplicitRuleShortName();
    const currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
    const prevRuleShortName = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(currRuleShortName),
      idxInCallingRule: currRuleIdx,
      inRule: this.shortRuleNameToFullName(prevRuleShortName)
    };
  }
  buildFullFollowKeyStack() {
    const explicitRuleStack = this.RULE_STACK;
    const explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
    return map_default(explicitRuleStack, (ruleName, idx) => {
      if (idx === 0) {
        return EOF_FOLLOW_KEY;
      }
      return {
        ruleName: this.shortRuleNameToFullName(ruleName),
        idxInCallingRule: explicitOccurrenceStack[idx],
        inRule: this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
      };
    });
  }
  flattenFollowSet() {
    const followStack = map_default(this.buildFullFollowKeyStack(), (currKey) => {
      return this.getFollowSetFromFollowKey(currKey);
    });
    return flatten_default(followStack);
  }
  getFollowSetFromFollowKey(followKey) {
    if (followKey === EOF_FOLLOW_KEY) {
      return [EOF];
    }
    const followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
    return this.resyncFollows[followName];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(token, resyncTokens) {
    if (!this.tokenMatcher(token, EOF)) {
      resyncTokens.push(token);
    }
    return resyncTokens;
  }
  reSyncTo(tokType) {
    const resyncedTokens = [];
    let nextTok = this.LA(1);
    while (this.tokenMatcher(nextTok, tokType) === false) {
      nextTok = this.SKIP_TOKEN();
      this.addToResyncTokens(nextTok, resyncedTokens);
    }
    return dropRight_default(resyncedTokens);
  }
  attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
  }
  getCurrentGrammarPath(tokType, tokIdxInRule) {
    const pathRuleStack = this.getHumanReadableRuleStack();
    const pathOccurrenceStack = clone_default(this.RULE_OCCURRENCE_STACK);
    const grammarPath = {
      ruleStack: pathRuleStack,
      occurrenceStack: pathOccurrenceStack,
      lastTok: tokType,
      lastTokOccurrence: tokIdxInRule
    };
    return grammarPath;
  }
  getHumanReadableRuleStack() {
    return map_default(this.RULE_STACK, (currShortName) => this.shortRuleNameToFullName(currShortName));
  }
};
function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
  const key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
  let firstAfterRepInfo = this.firstAfterRepMap[key];
  if (firstAfterRepInfo === void 0) {
    const currRuleName = this.getCurrRuleFullName();
    const ruleGrammar = this.getGAstProductions()[currRuleName];
    const walker = new nextToksWalker(ruleGrammar, prodOccurrence);
    firstAfterRepInfo = walker.startWalking();
    this.firstAfterRepMap[key] = firstAfterRepInfo;
  }
  let expectTokAfterLastMatch = firstAfterRepInfo.token;
  let nextTokIdx = firstAfterRepInfo.occurrence;
  const isEndOfRule = firstAfterRepInfo.isEndOfRule;
  if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
    expectTokAfterLastMatch = EOF;
    nextTokIdx = 1;
  }
  if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) {
    return;
  }
  if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
    this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
  }
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/keys.js
var BITS_FOR_METHOD_TYPE = 4;
var BITS_FOR_OCCURRENCE_IDX = 8;
var BITS_FOR_ALT_IDX = 8;
var OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
var OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
var MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
var AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
var MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
var AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
  return occurrence | dslMethodIdx | ruleIdx;
}
var BITS_START_FOR_ALT_IDX = 32 - BITS_FOR_ALT_IDX;

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/grammar/llk_lookahead.js
var LLkLookaheadStrategy = class {
  constructor(options) {
    var _a7;
    this.maxLookahead = (_a7 = options === null || options === void 0 ? void 0 : options.maxLookahead) !== null && _a7 !== void 0 ? _a7 : DEFAULT_PARSER_CONFIG.maxLookahead;
  }
  validate(options) {
    const leftRecursionErrors = this.validateNoLeftRecursion(options.rules);
    if (isEmpty_default(leftRecursionErrors)) {
      const emptyAltErrors = this.validateEmptyOrAlternatives(options.rules);
      const ambiguousAltsErrors = this.validateAmbiguousAlternationAlternatives(options.rules, this.maxLookahead);
      const emptyRepetitionErrors = this.validateSomeNonEmptyLookaheadPath(options.rules, this.maxLookahead);
      const allErrors = [
        ...leftRecursionErrors,
        ...emptyAltErrors,
        ...ambiguousAltsErrors,
        ...emptyRepetitionErrors
      ];
      return allErrors;
    }
    return leftRecursionErrors;
  }
  validateNoLeftRecursion(rules) {
    return flatMap_default(rules, (currTopRule) => validateNoLeftRecursion(currTopRule, currTopRule, defaultGrammarValidatorErrorProvider));
  }
  validateEmptyOrAlternatives(rules) {
    return flatMap_default(rules, (currTopRule) => validateEmptyOrAlternative(currTopRule, defaultGrammarValidatorErrorProvider));
  }
  validateAmbiguousAlternationAlternatives(rules, maxLookahead) {
    return flatMap_default(rules, (currTopRule) => validateAmbiguousAlternationAlternatives(currTopRule, maxLookahead, defaultGrammarValidatorErrorProvider));
  }
  validateSomeNonEmptyLookaheadPath(rules, maxLookahead) {
    return validateSomeNonEmptyLookaheadPath(rules, maxLookahead, defaultGrammarValidatorErrorProvider);
  }
  buildLookaheadForAlternation(options) {
    return buildLookaheadFuncForOr(options.prodOccurrence, options.rule, options.maxLookahead, options.hasPredicates, options.dynamicTokensEnabled, buildAlternativesLookAheadFunc);
  }
  buildLookaheadForOptional(options) {
    return buildLookaheadFuncForOptionalProd(options.prodOccurrence, options.rule, options.maxLookahead, options.dynamicTokensEnabled, getProdType(options.prodType), buildSingleAlternativeLookaheadFunction);
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/looksahead.js
var LooksAhead = class {
  initLooksAhead(config) {
    this.dynamicTokensEnabled = has_default(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
    this.maxLookahead = has_default(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
    this.lookaheadStrategy = has_default(config, "lookaheadStrategy") ? config.lookaheadStrategy : new LLkLookaheadStrategy({ maxLookahead: this.maxLookahead });
    this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(rules) {
    forEach_default(rules, (currRule) => {
      this.TRACE_INIT(`${currRule.name} Rule Lookahead`, () => {
        const { alternation, repetition, option, repetitionMandatory, repetitionMandatoryWithSeparator, repetitionWithSeparator } = collectMethods(currRule);
        forEach_default(alternation, (currProd) => {
          const prodIdx = currProd.idx === 0 ? "" : currProd.idx;
          this.TRACE_INIT(`${getProductionDslName(currProd)}${prodIdx}`, () => {
            const laFunc = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: currProd.idx,
              rule: currRule,
              maxLookahead: currProd.maxLookahead || this.maxLookahead,
              hasPredicates: currProd.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            });
            const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);
            this.setLaFuncCache(key, laFunc);
          });
        });
        forEach_default(repetition, (currProd) => {
          this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, "Repetition", currProd.maxLookahead, getProductionDslName(currProd));
        });
        forEach_default(option, (currProd) => {
          this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, "Option", currProd.maxLookahead, getProductionDslName(currProd));
        });
        forEach_default(repetitionMandatory, (currProd) => {
          this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, "RepetitionMandatory", currProd.maxLookahead, getProductionDslName(currProd));
        });
        forEach_default(repetitionMandatoryWithSeparator, (currProd) => {
          this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, "RepetitionMandatoryWithSeparator", currProd.maxLookahead, getProductionDslName(currProd));
        });
        forEach_default(repetitionWithSeparator, (currProd) => {
          this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, "RepetitionWithSeparator", currProd.maxLookahead, getProductionDslName(currProd));
        });
      });
    });
  }
  computeLookaheadFunc(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
    this.TRACE_INIT(`${dslMethodName}${prodOccurrence === 0 ? "" : prodOccurrence}`, () => {
      const laFunc = this.lookaheadStrategy.buildLookaheadForOptional({
        prodOccurrence,
        rule,
        maxLookahead: prodMaxLookahead || this.maxLookahead,
        dynamicTokensEnabled: this.dynamicTokensEnabled,
        prodType
      });
      const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
      this.setLaFuncCache(key, laFunc);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(dslMethodIdx, occurrence) {
    const currRuleShortName = this.getLastExplicitRuleShortName();
    return getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
  }
  getLaFuncFromCache(key) {
    return this.lookAheadFuncsCache.get(key);
  }
  /* istanbul ignore next */
  setLaFuncCache(key, value) {
    this.lookAheadFuncsCache.set(key, value);
  }
};
var DslMethodsCollectorVisitor = class extends GAstVisitor {
  constructor() {
    super(...arguments);
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  visitOption(option) {
    this.dslMethods.option.push(option);
  }
  visitRepetitionWithSeparator(manySep) {
    this.dslMethods.repetitionWithSeparator.push(manySep);
  }
  visitRepetitionMandatory(atLeastOne) {
    this.dslMethods.repetitionMandatory.push(atLeastOne);
  }
  visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
  }
  visitRepetition(many) {
    this.dslMethods.repetition.push(many);
  }
  visitAlternation(or) {
    this.dslMethods.alternation.push(or);
  }
};
var collectorVisitor = new DslMethodsCollectorVisitor();
function collectMethods(rule) {
  collectorVisitor.reset();
  rule.accept(collectorVisitor);
  const dslMethods = collectorVisitor.dslMethods;
  collectorVisitor.reset();
  return dslMethods;
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/cst/cst.js
function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
  if (isNaN(currNodeLocation.startOffset) === true) {
    currNodeLocation.startOffset = newLocationInfo.startOffset;
    currNodeLocation.endOffset = newLocationInfo.endOffset;
  } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
    currNodeLocation.endOffset = newLocationInfo.endOffset;
  }
}
function setNodeLocationFull(currNodeLocation, newLocationInfo) {
  if (isNaN(currNodeLocation.startOffset) === true) {
    currNodeLocation.startOffset = newLocationInfo.startOffset;
    currNodeLocation.startColumn = newLocationInfo.startColumn;
    currNodeLocation.startLine = newLocationInfo.startLine;
    currNodeLocation.endOffset = newLocationInfo.endOffset;
    currNodeLocation.endColumn = newLocationInfo.endColumn;
    currNodeLocation.endLine = newLocationInfo.endLine;
  } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
    currNodeLocation.endOffset = newLocationInfo.endOffset;
    currNodeLocation.endColumn = newLocationInfo.endColumn;
    currNodeLocation.endLine = newLocationInfo.endLine;
  }
}
function addTerminalToCst(node, token, tokenTypeName) {
  if (node.children[tokenTypeName] === void 0) {
    node.children[tokenTypeName] = [token];
  } else {
    node.children[tokenTypeName].push(token);
  }
}
function addNoneTerminalToCst(node, ruleName, ruleResult) {
  if (node.children[ruleName] === void 0) {
    node.children[ruleName] = [ruleResult];
  } else {
    node.children[ruleName].push(ruleResult);
  }
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/lang/lang_extensions.js
var NAME = "name";
function defineNameProp(obj, nameValue) {
  Object.defineProperty(obj, NAME, {
    enumerable: false,
    configurable: true,
    writable: false,
    value: nameValue
  });
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/cst/cst_visitor.js
function defaultVisit(ctx, param) {
  const childrenNames = keys_default(ctx);
  const childrenNamesLength = childrenNames.length;
  for (let i = 0; i < childrenNamesLength; i++) {
    const currChildName = childrenNames[i];
    const currChildArray = ctx[currChildName];
    const currChildArrayLength = currChildArray.length;
    for (let j = 0; j < currChildArrayLength; j++) {
      const currChild = currChildArray[j];
      if (currChild.tokenTypeIdx === void 0) {
        this[currChild.name](currChild.children, param);
      }
    }
  }
}
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
  const derivedConstructor = function() {
  };
  defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
  const semanticProto = {
    visit: function(cstNode, param) {
      if (isArray_default(cstNode)) {
        cstNode = cstNode[0];
      }
      if (isUndefined_default(cstNode)) {
        return void 0;
      }
      return this[cstNode.name](cstNode.children, param);
    },
    validateVisitor: function() {
      const semanticDefinitionErrors = validateVisitor(this, ruleNames);
      if (!isEmpty_default(semanticDefinitionErrors)) {
        const errorMessages = map_default(semanticDefinitionErrors, (currDefError) => currDefError.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${errorMessages.join("\n\n").replace(/\n/g, "\n	")}`);
      }
    }
  };
  derivedConstructor.prototype = semanticProto;
  derivedConstructor.prototype.constructor = derivedConstructor;
  derivedConstructor._RULE_NAMES = ruleNames;
  return derivedConstructor;
}
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
  const derivedConstructor = function() {
  };
  defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
  const withDefaultsProto = Object.create(baseConstructor.prototype);
  forEach_default(ruleNames, (ruleName) => {
    withDefaultsProto[ruleName] = defaultVisit;
  });
  derivedConstructor.prototype = withDefaultsProto;
  derivedConstructor.prototype.constructor = derivedConstructor;
  return derivedConstructor;
}
var CstVisitorDefinitionError;
(function(CstVisitorDefinitionError2) {
  CstVisitorDefinitionError2[CstVisitorDefinitionError2["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
  CstVisitorDefinitionError2[CstVisitorDefinitionError2["MISSING_METHOD"] = 1] = "MISSING_METHOD";
})(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
function validateVisitor(visitorInstance, ruleNames) {
  const missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
  return missingErrors;
}
function validateMissingCstMethods(visitorInstance, ruleNames) {
  const missingRuleNames = filter_default(ruleNames, (currRuleName) => {
    return isFunction_default(visitorInstance[currRuleName]) === false;
  });
  const errors = map_default(missingRuleNames, (currRuleName) => {
    return {
      msg: `Missing visitor method: <${currRuleName}> on ${visitorInstance.constructor.name} CST Visitor.`,
      type: CstVisitorDefinitionError.MISSING_METHOD,
      methodName: currRuleName
    };
  });
  return compact_default(errors);
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/tree_builder.js
var TreeBuilder = class {
  initTreeBuilder(config) {
    this.CST_STACK = [];
    this.outputCst = config.outputCst;
    this.nodeLocationTracking = has_default(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
    if (!this.outputCst) {
      this.cstInvocationStateUpdate = noop_default;
      this.cstFinallyStateUpdate = noop_default;
      this.cstPostTerminal = noop_default;
      this.cstPostNonTerminal = noop_default;
      this.cstPostRule = noop_default;
    } else {
      if (/full/i.test(this.nodeLocationTracking)) {
        if (this.recoveryEnabled) {
          this.setNodeLocationFromToken = setNodeLocationFull;
          this.setNodeLocationFromNode = setNodeLocationFull;
          this.cstPostRule = noop_default;
          this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
        } else {
          this.setNodeLocationFromToken = noop_default;
          this.setNodeLocationFromNode = noop_default;
          this.cstPostRule = this.cstPostRuleFull;
          this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
        }
      } else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
        if (this.recoveryEnabled) {
          this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
          this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
          this.cstPostRule = noop_default;
          this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
        } else {
          this.setNodeLocationFromToken = noop_default;
          this.setNodeLocationFromNode = noop_default;
          this.cstPostRule = this.cstPostRuleOnlyOffset;
          this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
        }
      } else if (/none/i.test(this.nodeLocationTracking)) {
        this.setNodeLocationFromToken = noop_default;
        this.setNodeLocationFromNode = noop_default;
        this.cstPostRule = noop_default;
        this.setInitialNodeLocation = noop_default;
      } else {
        throw Error(`Invalid <nodeLocationTracking> config option: "${config.nodeLocationTracking}"`);
      }
    }
  }
  setInitialNodeLocationOnlyOffsetRecovery(cstNode) {
    cstNode.location = {
      startOffset: NaN,
      endOffset: NaN
    };
  }
  setInitialNodeLocationOnlyOffsetRegular(cstNode) {
    cstNode.location = {
      // without error recovery the starting Location of a new CstNode is guaranteed
      // To be the next Token's startOffset (for valid inputs).
      // For invalid inputs there won't be any CSTOutput so this potential
      // inaccuracy does not matter
      startOffset: this.LA(1).startOffset,
      endOffset: NaN
    };
  }
  setInitialNodeLocationFullRecovery(cstNode) {
    cstNode.location = {
      startOffset: NaN,
      startLine: NaN,
      startColumn: NaN,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
  setInitialNodeLocationFullRegular(cstNode) {
    const nextToken = this.LA(1);
    cstNode.location = {
      startOffset: nextToken.startOffset,
      startLine: nextToken.startLine,
      startColumn: nextToken.startColumn,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  cstInvocationStateUpdate(fullRuleName) {
    const cstNode = {
      name: fullRuleName,
      children: /* @__PURE__ */ Object.create(null)
    };
    this.setInitialNodeLocation(cstNode);
    this.CST_STACK.push(cstNode);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(ruleCstNode) {
    const prevToken = this.LA(0);
    const loc = ruleCstNode.location;
    if (loc.startOffset <= prevToken.startOffset === true) {
      loc.endOffset = prevToken.endOffset;
      loc.endLine = prevToken.endLine;
      loc.endColumn = prevToken.endColumn;
    } else {
      loc.startOffset = NaN;
      loc.startLine = NaN;
      loc.startColumn = NaN;
    }
  }
  cstPostRuleOnlyOffset(ruleCstNode) {
    const prevToken = this.LA(0);
    const loc = ruleCstNode.location;
    if (loc.startOffset <= prevToken.startOffset === true) {
      loc.endOffset = prevToken.endOffset;
    } else {
      loc.startOffset = NaN;
    }
  }
  cstPostTerminal(key, consumedToken) {
    const rootCst = this.CST_STACK[this.CST_STACK.length - 1];
    addTerminalToCst(rootCst, consumedToken, key);
    this.setNodeLocationFromToken(rootCst.location, consumedToken);
  }
  cstPostNonTerminal(ruleCstResult, ruleName) {
    const preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
    addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
    this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
  }
  getBaseCstVisitorConstructor() {
    if (isUndefined_default(this.baseCstVisitorConstructor)) {
      const newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys_default(this.gastProductionsCache));
      this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
      return newBaseCstVisitorConstructor;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (isUndefined_default(this.baseCstVisitorWithDefaultsConstructor)) {
      const newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys_default(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      this.baseCstVisitorWithDefaultsConstructor = newConstructor;
      return newConstructor;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getLastExplicitRuleShortName() {
    const ruleStack = this.RULE_STACK;
    return ruleStack[ruleStack.length - 1];
  }
  getPreviousExplicitRuleShortName() {
    const ruleStack = this.RULE_STACK;
    return ruleStack[ruleStack.length - 2];
  }
  getLastExplicitRuleOccurrenceIndex() {
    const occurrenceStack = this.RULE_OCCURRENCE_STACK;
    return occurrenceStack[occurrenceStack.length - 1];
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/lexer_adapter.js
var LexerAdapter = class {
  initLexerAdapter() {
    this.tokVector = [];
    this.tokVectorLength = 0;
    this.currIdx = -1;
  }
  set input(newInput) {
    if (this.selfAnalysisDone !== true) {
      throw Error(`Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.`);
    }
    this.reset();
    this.tokVector = newInput;
    this.tokVectorLength = newInput.length;
  }
  get input() {
    return this.tokVector;
  }
  // skips a token and returns the next token
  SKIP_TOKEN() {
    if (this.currIdx <= this.tokVector.length - 2) {
      this.consumeToken();
      return this.LA(1);
    } else {
      return END_OF_FILE;
    }
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(howMuch) {
    const soughtIdx = this.currIdx + howMuch;
    if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
      return END_OF_FILE;
    } else {
      return this.tokVector[soughtIdx];
    }
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(newState) {
    this.currIdx = newState;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVector.length - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_api.js
var RecognizerApi = class {
  ACTION(impl) {
    return impl.call(this);
  }
  consume(idx, tokType, options) {
    return this.consumeInternal(tokType, idx, options);
  }
  subrule(idx, ruleToCall, options) {
    return this.subruleInternal(ruleToCall, idx, options);
  }
  option(idx, actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, idx);
  }
  or(idx, altsOrOpts) {
    return this.orInternal(altsOrOpts, idx);
  }
  many(idx, actionORMethodDef) {
    return this.manyInternal(idx, actionORMethodDef);
  }
  atLeastOne(idx, actionORMethodDef) {
    return this.atLeastOneInternal(idx, actionORMethodDef);
  }
  CONSUME(tokType, options) {
    return this.consumeInternal(tokType, 0, options);
  }
  CONSUME1(tokType, options) {
    return this.consumeInternal(tokType, 1, options);
  }
  CONSUME2(tokType, options) {
    return this.consumeInternal(tokType, 2, options);
  }
  CONSUME3(tokType, options) {
    return this.consumeInternal(tokType, 3, options);
  }
  CONSUME4(tokType, options) {
    return this.consumeInternal(tokType, 4, options);
  }
  CONSUME5(tokType, options) {
    return this.consumeInternal(tokType, 5, options);
  }
  CONSUME6(tokType, options) {
    return this.consumeInternal(tokType, 6, options);
  }
  CONSUME7(tokType, options) {
    return this.consumeInternal(tokType, 7, options);
  }
  CONSUME8(tokType, options) {
    return this.consumeInternal(tokType, 8, options);
  }
  CONSUME9(tokType, options) {
    return this.consumeInternal(tokType, 9, options);
  }
  SUBRULE(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 0, options);
  }
  SUBRULE1(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 1, options);
  }
  SUBRULE2(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 2, options);
  }
  SUBRULE3(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 3, options);
  }
  SUBRULE4(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 4, options);
  }
  SUBRULE5(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 5, options);
  }
  SUBRULE6(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 6, options);
  }
  SUBRULE7(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 7, options);
  }
  SUBRULE8(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 8, options);
  }
  SUBRULE9(ruleToCall, options) {
    return this.subruleInternal(ruleToCall, 9, options);
  }
  OPTION(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 0);
  }
  OPTION1(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 1);
  }
  OPTION2(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 2);
  }
  OPTION3(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 3);
  }
  OPTION4(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 4);
  }
  OPTION5(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 5);
  }
  OPTION6(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 6);
  }
  OPTION7(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 7);
  }
  OPTION8(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 8);
  }
  OPTION9(actionORMethodDef) {
    return this.optionInternal(actionORMethodDef, 9);
  }
  OR(altsOrOpts) {
    return this.orInternal(altsOrOpts, 0);
  }
  OR1(altsOrOpts) {
    return this.orInternal(altsOrOpts, 1);
  }
  OR2(altsOrOpts) {
    return this.orInternal(altsOrOpts, 2);
  }
  OR3(altsOrOpts) {
    return this.orInternal(altsOrOpts, 3);
  }
  OR4(altsOrOpts) {
    return this.orInternal(altsOrOpts, 4);
  }
  OR5(altsOrOpts) {
    return this.orInternal(altsOrOpts, 5);
  }
  OR6(altsOrOpts) {
    return this.orInternal(altsOrOpts, 6);
  }
  OR7(altsOrOpts) {
    return this.orInternal(altsOrOpts, 7);
  }
  OR8(altsOrOpts) {
    return this.orInternal(altsOrOpts, 8);
  }
  OR9(altsOrOpts) {
    return this.orInternal(altsOrOpts, 9);
  }
  MANY(actionORMethodDef) {
    this.manyInternal(0, actionORMethodDef);
  }
  MANY1(actionORMethodDef) {
    this.manyInternal(1, actionORMethodDef);
  }
  MANY2(actionORMethodDef) {
    this.manyInternal(2, actionORMethodDef);
  }
  MANY3(actionORMethodDef) {
    this.manyInternal(3, actionORMethodDef);
  }
  MANY4(actionORMethodDef) {
    this.manyInternal(4, actionORMethodDef);
  }
  MANY5(actionORMethodDef) {
    this.manyInternal(5, actionORMethodDef);
  }
  MANY6(actionORMethodDef) {
    this.manyInternal(6, actionORMethodDef);
  }
  MANY7(actionORMethodDef) {
    this.manyInternal(7, actionORMethodDef);
  }
  MANY8(actionORMethodDef) {
    this.manyInternal(8, actionORMethodDef);
  }
  MANY9(actionORMethodDef) {
    this.manyInternal(9, actionORMethodDef);
  }
  MANY_SEP(options) {
    this.manySepFirstInternal(0, options);
  }
  MANY_SEP1(options) {
    this.manySepFirstInternal(1, options);
  }
  MANY_SEP2(options) {
    this.manySepFirstInternal(2, options);
  }
  MANY_SEP3(options) {
    this.manySepFirstInternal(3, options);
  }
  MANY_SEP4(options) {
    this.manySepFirstInternal(4, options);
  }
  MANY_SEP5(options) {
    this.manySepFirstInternal(5, options);
  }
  MANY_SEP6(options) {
    this.manySepFirstInternal(6, options);
  }
  MANY_SEP7(options) {
    this.manySepFirstInternal(7, options);
  }
  MANY_SEP8(options) {
    this.manySepFirstInternal(8, options);
  }
  MANY_SEP9(options) {
    this.manySepFirstInternal(9, options);
  }
  AT_LEAST_ONE(actionORMethodDef) {
    this.atLeastOneInternal(0, actionORMethodDef);
  }
  AT_LEAST_ONE1(actionORMethodDef) {
    return this.atLeastOneInternal(1, actionORMethodDef);
  }
  AT_LEAST_ONE2(actionORMethodDef) {
    this.atLeastOneInternal(2, actionORMethodDef);
  }
  AT_LEAST_ONE3(actionORMethodDef) {
    this.atLeastOneInternal(3, actionORMethodDef);
  }
  AT_LEAST_ONE4(actionORMethodDef) {
    this.atLeastOneInternal(4, actionORMethodDef);
  }
  AT_LEAST_ONE5(actionORMethodDef) {
    this.atLeastOneInternal(5, actionORMethodDef);
  }
  AT_LEAST_ONE6(actionORMethodDef) {
    this.atLeastOneInternal(6, actionORMethodDef);
  }
  AT_LEAST_ONE7(actionORMethodDef) {
    this.atLeastOneInternal(7, actionORMethodDef);
  }
  AT_LEAST_ONE8(actionORMethodDef) {
    this.atLeastOneInternal(8, actionORMethodDef);
  }
  AT_LEAST_ONE9(actionORMethodDef) {
    this.atLeastOneInternal(9, actionORMethodDef);
  }
  AT_LEAST_ONE_SEP(options) {
    this.atLeastOneSepFirstInternal(0, options);
  }
  AT_LEAST_ONE_SEP1(options) {
    this.atLeastOneSepFirstInternal(1, options);
  }
  AT_LEAST_ONE_SEP2(options) {
    this.atLeastOneSepFirstInternal(2, options);
  }
  AT_LEAST_ONE_SEP3(options) {
    this.atLeastOneSepFirstInternal(3, options);
  }
  AT_LEAST_ONE_SEP4(options) {
    this.atLeastOneSepFirstInternal(4, options);
  }
  AT_LEAST_ONE_SEP5(options) {
    this.atLeastOneSepFirstInternal(5, options);
  }
  AT_LEAST_ONE_SEP6(options) {
    this.atLeastOneSepFirstInternal(6, options);
  }
  AT_LEAST_ONE_SEP7(options) {
    this.atLeastOneSepFirstInternal(7, options);
  }
  AT_LEAST_ONE_SEP8(options) {
    this.atLeastOneSepFirstInternal(8, options);
  }
  AT_LEAST_ONE_SEP9(options) {
    this.atLeastOneSepFirstInternal(9, options);
  }
  RULE(name, implementation, config = DEFAULT_RULE_CONFIG) {
    if (includes_default(this.definedRulesNames, name)) {
      const errMsg = defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
        topLevelRule: name,
        grammarName: this.className
      });
      const error = {
        message: errMsg,
        type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
        ruleName: name
      };
      this.definitionErrors.push(error);
    }
    this.definedRulesNames.push(name);
    const ruleImplementation = this.defineRule(name, implementation, config);
    this[name] = ruleImplementation;
    return ruleImplementation;
  }
  OVERRIDE_RULE(name, impl, config = DEFAULT_RULE_CONFIG) {
    const ruleErrors = validateRuleIsOverridden(name, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(ruleErrors);
    const ruleImplementation = this.defineRule(name, impl, config);
    this[name] = ruleImplementation;
    return ruleImplementation;
  }
  BACKTRACK(grammarRule, args) {
    return function() {
      this.isBackTrackingStack.push(1);
      const orgState = this.saveRecogState();
      try {
        grammarRule.apply(this, args);
        return true;
      } catch (e) {
        if (isRecognitionException(e)) {
          return false;
        } else {
          throw e;
        }
      } finally {
        this.reloadRecogState(orgState);
        this.isBackTrackingStack.pop();
      }
    };
  }
  // GAST export APIs
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return serializeGrammar(values_default(this.gastProductionsCache));
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_engine.js
var RecognizerEngine = class {
  initRecognizerEngine(tokenVocabulary, config) {
    this.className = this.constructor.name;
    this.shortRuleNameToFull = {};
    this.fullRuleNameToShort = {};
    this.ruleShortNameIdx = 256;
    this.tokenMatcher = tokenStructuredMatcherNoCategories;
    this.subruleIdx = 0;
    this.definedRulesNames = [];
    this.tokensMap = {};
    this.isBackTrackingStack = [];
    this.RULE_STACK = [];
    this.RULE_OCCURRENCE_STACK = [];
    this.gastProductionsCache = {};
    if (has_default(config, "serializedGrammar")) {
      throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
    }
    if (isArray_default(tokenVocabulary)) {
      if (isEmpty_default(tokenVocabulary)) {
        throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
      }
      if (typeof tokenVocabulary[0].startOffset === "number") {
        throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
      }
    }
    if (isArray_default(tokenVocabulary)) {
      this.tokensMap = reduce_default(tokenVocabulary, (acc, tokType) => {
        acc[tokType.name] = tokType;
        return acc;
      }, {});
    } else if (has_default(tokenVocabulary, "modes") && every_default(flatten_default(values_default(tokenVocabulary.modes)), isTokenType)) {
      const allTokenTypes2 = flatten_default(values_default(tokenVocabulary.modes));
      const uniqueTokens = uniq_default(allTokenTypes2);
      this.tokensMap = reduce_default(uniqueTokens, (acc, tokType) => {
        acc[tokType.name] = tokType;
        return acc;
      }, {});
    } else if (isObject_default(tokenVocabulary)) {
      this.tokensMap = clone_default(tokenVocabulary);
    } else {
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    }
    this.tokensMap["EOF"] = EOF;
    const allTokenTypes = has_default(tokenVocabulary, "modes") ? flatten_default(values_default(tokenVocabulary.modes)) : values_default(tokenVocabulary);
    const noTokenCategoriesUsed = every_default(allTokenTypes, (tokenConstructor) => isEmpty_default(tokenConstructor.categoryMatches));
    this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
    augmentTokenTypes(values_default(this.tokensMap));
  }
  defineRule(ruleName, impl, config) {
    if (this.selfAnalysisDone) {
      throw Error(`Grammar rule <${ruleName}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    }
    const resyncEnabled = has_default(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
    const recoveryValueFunc = has_default(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc;
    const shortName = this.ruleShortNameIdx << BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX;
    this.ruleShortNameIdx++;
    this.shortRuleNameToFull[shortName] = ruleName;
    this.fullRuleNameToShort[ruleName] = shortName;
    let invokeRuleWithTry;
    if (this.outputCst === true) {
      invokeRuleWithTry = function invokeRuleWithTry2(...args) {
        try {
          this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
          impl.apply(this, args);
          const cst = this.CST_STACK[this.CST_STACK.length - 1];
          this.cstPostRule(cst);
          return cst;
        } catch (e) {
          return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
        } finally {
          this.ruleFinallyStateUpdate();
        }
      };
    } else {
      invokeRuleWithTry = function invokeRuleWithTryCst(...args) {
        try {
          this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
          return impl.apply(this, args);
        } catch (e) {
          return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
        } finally {
          this.ruleFinallyStateUpdate();
        }
      };
    }
    const wrappedGrammarRule = Object.assign(invokeRuleWithTry, { ruleName, originalGrammarAction: impl });
    return wrappedGrammarRule;
  }
  invokeRuleCatch(e, resyncEnabledConfig, recoveryValueFunc) {
    const isFirstInvokedRule = this.RULE_STACK.length === 1;
    const reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
    if (isRecognitionException(e)) {
      const recogError = e;
      if (reSyncEnabled) {
        const reSyncTokType = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
          recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
          if (this.outputCst) {
            const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
            partialCstResult.recoveredNode = true;
            return partialCstResult;
          } else {
            return recoveryValueFunc(e);
          }
        } else {
          if (this.outputCst) {
            const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
            partialCstResult.recoveredNode = true;
            recogError.partialCstResult = partialCstResult;
          }
          throw recogError;
        }
      } else if (isFirstInvokedRule) {
        this.moveToTerminatedState();
        return recoveryValueFunc(e);
      } else {
        throw recogError;
      }
    } else {
      throw e;
    }
  }
  // Implementation of parsing DSL
  optionInternal(actionORMethodDef, occurrence) {
    const key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
    return this.optionInternalLogic(actionORMethodDef, occurrence, key);
  }
  optionInternalLogic(actionORMethodDef, occurrence, key) {
    let lookAheadFunc = this.getLaFuncFromCache(key);
    let action;
    if (typeof actionORMethodDef !== "function") {
      action = actionORMethodDef.DEF;
      const predicate = actionORMethodDef.GATE;
      if (predicate !== void 0) {
        const orgLookaheadFunction = lookAheadFunc;
        lookAheadFunc = () => {
          return predicate.call(this) && orgLookaheadFunction.call(this);
        };
      }
    } else {
      action = actionORMethodDef;
    }
    if (lookAheadFunc.call(this) === true) {
      return action.call(this);
    }
    return void 0;
  }
  atLeastOneInternal(prodOccurrence, actionORMethodDef) {
    const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
    return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
  }
  atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, key) {
    let lookAheadFunc = this.getLaFuncFromCache(key);
    let action;
    if (typeof actionORMethodDef !== "function") {
      action = actionORMethodDef.DEF;
      const predicate = actionORMethodDef.GATE;
      if (predicate !== void 0) {
        const orgLookaheadFunction = lookAheadFunc;
        lookAheadFunc = () => {
          return predicate.call(this) && orgLookaheadFunction.call(this);
        };
      }
    } else {
      action = actionORMethodDef;
    }
    if (lookAheadFunc.call(this) === true) {
      let notStuck = this.doSingleRepetition(action);
      while (lookAheadFunc.call(this) === true && notStuck === true) {
        notStuck = this.doSingleRepetition(action);
      }
    } else {
      throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
    }
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
  }
  atLeastOneSepFirstInternal(prodOccurrence, options) {
    const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
    this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
  }
  atLeastOneSepFirstInternalLogic(prodOccurrence, options, key) {
    const action = options.DEF;
    const separator = options.SEP;
    const firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
    if (firstIterationLookaheadFunc.call(this) === true) {
      action.call(this);
      const separatorLookAheadFunc = () => {
        return this.tokenMatcher(this.LA(1), separator);
      };
      while (this.tokenMatcher(this.LA(1), separator) === true) {
        this.CONSUME(separator);
        action.call(this);
      }
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        prodOccurrence,
        separator,
        separatorLookAheadFunc,
        action,
        NextTerminalAfterAtLeastOneSepWalker
      ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
    } else {
      throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
    }
  }
  manyInternal(prodOccurrence, actionORMethodDef) {
    const laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
    return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
  }
  manyInternalLogic(prodOccurrence, actionORMethodDef, key) {
    let lookaheadFunction = this.getLaFuncFromCache(key);
    let action;
    if (typeof actionORMethodDef !== "function") {
      action = actionORMethodDef.DEF;
      const predicate = actionORMethodDef.GATE;
      if (predicate !== void 0) {
        const orgLookaheadFunction = lookaheadFunction;
        lookaheadFunction = () => {
          return predicate.call(this) && orgLookaheadFunction.call(this);
        };
      }
    } else {
      action = actionORMethodDef;
    }
    let notStuck = true;
    while (lookaheadFunction.call(this) === true && notStuck === true) {
      notStuck = this.doSingleRepetition(action);
    }
    this.attemptInRepetitionRecovery(
      this.manyInternal,
      [prodOccurrence, actionORMethodDef],
      lookaheadFunction,
      MANY_IDX,
      prodOccurrence,
      NextTerminalAfterManyWalker,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      notStuck
    );
  }
  manySepFirstInternal(prodOccurrence, options) {
    const laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
    this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
  }
  manySepFirstInternalLogic(prodOccurrence, options, key) {
    const action = options.DEF;
    const separator = options.SEP;
    const firstIterationLaFunc = this.getLaFuncFromCache(key);
    if (firstIterationLaFunc.call(this) === true) {
      action.call(this);
      const separatorLookAheadFunc = () => {
        return this.tokenMatcher(this.LA(1), separator);
      };
      while (this.tokenMatcher(this.LA(1), separator) === true) {
        this.CONSUME(separator);
        action.call(this);
      }
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        prodOccurrence,
        separator,
        separatorLookAheadFunc,
        action,
        NextTerminalAfterManySepWalker
      ], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
    }
  }
  repetitionSepSecondInternal(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
    while (separatorLookAheadFunc()) {
      this.CONSUME(separator);
      action.call(this);
    }
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
      prodOccurrence,
      separator,
      separatorLookAheadFunc,
      action,
      nextTerminalAfterWalker
    ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
  }
  doSingleRepetition(action) {
    const beforeIteration = this.getLexerPosition();
    action.call(this);
    const afterIteration = this.getLexerPosition();
    return afterIteration > beforeIteration;
  }
  orInternal(altsOrOpts, occurrence) {
    const laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
    const alts = isArray_default(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
    const laFunc = this.getLaFuncFromCache(laKey);
    const altIdxToTake = laFunc.call(this, alts);
    if (altIdxToTake !== void 0) {
      const chosenAlternative = alts[altIdxToTake];
      return chosenAlternative.ALT.call(this);
    }
    this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    this.RULE_STACK.pop();
    this.RULE_OCCURRENCE_STACK.pop();
    this.cstFinallyStateUpdate();
    if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
      const firstRedundantTok = this.LA(1);
      const errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
        firstRedundant: firstRedundantTok,
        ruleName: this.getCurrRuleFullName()
      });
      this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
    }
  }
  subruleInternal(ruleToCall, idx, options) {
    let ruleResult;
    try {
      const args = options !== void 0 ? options.ARGS : void 0;
      this.subruleIdx = idx;
      ruleResult = ruleToCall.apply(this, args);
      this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
      return ruleResult;
    } catch (e) {
      throw this.subruleInternalError(e, options, ruleToCall.ruleName);
    }
  }
  subruleInternalError(e, options, ruleName) {
    if (isRecognitionException(e) && e.partialCstResult !== void 0) {
      this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
      delete e.partialCstResult;
    }
    throw e;
  }
  consumeInternal(tokType, idx, options) {
    let consumedToken;
    try {
      const nextToken = this.LA(1);
      if (this.tokenMatcher(nextToken, tokType) === true) {
        this.consumeToken();
        consumedToken = nextToken;
      } else {
        this.consumeInternalError(tokType, nextToken, options);
      }
    } catch (eFromConsumption) {
      consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
    }
    this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
    return consumedToken;
  }
  consumeInternalError(tokType, nextToken, options) {
    let msg;
    const previousToken = this.LA(0);
    if (options !== void 0 && options.ERR_MSG) {
      msg = options.ERR_MSG;
    } else {
      msg = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: tokType,
        actual: nextToken,
        previous: previousToken,
        ruleName: this.getCurrRuleFullName()
      });
    }
    throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
  }
  consumeInternalRecovery(tokType, idx, eFromConsumption) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const follows = this.getFollowsForInRuleRecovery(tokType, idx);
      try {
        return this.tryInRuleRecovery(tokType, follows);
      } catch (eFromInRuleRecovery) {
        if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) {
          throw eFromConsumption;
        } else {
          throw eFromInRuleRecovery;
        }
      }
    } else {
      throw eFromConsumption;
    }
  }
  saveRecogState() {
    const savedErrors = this.errors;
    const savedRuleStack = clone_default(this.RULE_STACK);
    return {
      errors: savedErrors,
      lexerState: this.exportLexerState(),
      RULE_STACK: savedRuleStack,
      CST_STACK: this.CST_STACK
    };
  }
  reloadRecogState(newState) {
    this.errors = newState.errors;
    this.importLexerState(newState.lexerState);
    this.RULE_STACK = newState.RULE_STACK;
  }
  ruleInvocationStateUpdate(shortName, fullName, idxInCallingRule) {
    this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
    this.RULE_STACK.push(shortName);
    this.cstInvocationStateUpdate(fullName);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    const shortName = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[shortName];
  }
  shortRuleNameToFullName(shortName) {
    return this.shortRuleNameToFull[shortName];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), EOF);
  }
  reset() {
    this.resetLexerState();
    this.subruleIdx = 0;
    this.isBackTrackingStack = [];
    this.errors = [];
    this.RULE_STACK = [];
    this.CST_STACK = [];
    this.RULE_OCCURRENCE_STACK = [];
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/error_handler.js
var ErrorHandler = class {
  initErrorHandler(config) {
    this._errors = [];
    this.errorMessageProvider = has_default(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
  }
  SAVE_ERROR(error) {
    if (isRecognitionException(error)) {
      error.context = {
        ruleStack: this.getHumanReadableRuleStack(),
        ruleOccurrenceStack: clone_default(this.RULE_OCCURRENCE_STACK)
      };
      this._errors.push(error);
      return error;
    } else {
      throw Error("Trying to save an Error which is not a RecognitionException");
    }
  }
  get errors() {
    return clone_default(this._errors);
  }
  set errors(newErrors) {
    this._errors = newErrors;
  }
  // TODO: consider caching the error message computed information
  raiseEarlyExitException(occurrence, prodType, userDefinedErrMsg) {
    const ruleName = this.getCurrRuleFullName();
    const ruleGrammar = this.getGAstProductions()[ruleName];
    const lookAheadPathsPerAlternative = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
    const insideProdPaths = lookAheadPathsPerAlternative[0];
    const actualTokens = [];
    for (let i = 1; i <= this.maxLookahead; i++) {
      actualTokens.push(this.LA(i));
    }
    const msg = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: insideProdPaths,
      actual: actualTokens,
      previous: this.LA(0),
      customUserDescription: userDefinedErrMsg,
      ruleName
    });
    throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(occurrence, errMsgTypes) {
    const ruleName = this.getCurrRuleFullName();
    const ruleGrammar = this.getGAstProductions()[ruleName];
    const lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
    const actualTokens = [];
    for (let i = 1; i <= this.maxLookahead; i++) {
      actualTokens.push(this.LA(i));
    }
    const previousToken = this.LA(0);
    const errMsg = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: lookAheadPathsPerAlternative,
      actual: actualTokens,
      previous: previousToken,
      customUserDescription: errMsgTypes,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/context_assist.js
var ContentAssist = class {
  initContentAssist() {
  }
  computeContentAssist(startRuleName, precedingInput) {
    const startRuleGast = this.gastProductionsCache[startRuleName];
    if (isUndefined_default(startRuleGast)) {
      throw Error(`Rule ->${startRuleName}<- does not exist in this grammar.`);
    }
    return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(grammarPath) {
    const topRuleName = head_default(grammarPath.ruleStack);
    const gastProductions = this.getGAstProductions();
    const topProduction = gastProductions[topRuleName];
    const nextPossibleTokenTypes = new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
    return nextPossibleTokenTypes;
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js
var RECORDING_NULL_OBJECT = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(RECORDING_NULL_OBJECT);
var HANDLE_SEPARATOR = true;
var MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
var RFT = createToken({ name: "RECORDING_PHASE_TOKEN", pattern: Lexer.NA });
augmentTokenTypes([RFT]);
var RECORDING_PHASE_TOKEN = createTokenInstance(
  RFT,
  "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
  // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(RECORDING_PHASE_TOKEN);
var RECORDING_PHASE_CSTNODE = {
  name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
  children: {}
};
var GastRecorder = class {
  initGastRecorder(config) {
    this.recordingProdStack = [];
    this.RECORDING_PHASE = false;
  }
  enableRecording() {
    this.RECORDING_PHASE = true;
    this.TRACE_INIT("Enable Recording", () => {
      for (let i = 0; i < 10; i++) {
        const idx = i > 0 ? i : "";
        this[`CONSUME${idx}`] = function(arg1, arg2) {
          return this.consumeInternalRecord(arg1, i, arg2);
        };
        this[`SUBRULE${idx}`] = function(arg1, arg2) {
          return this.subruleInternalRecord(arg1, i, arg2);
        };
        this[`OPTION${idx}`] = function(arg1) {
          return this.optionInternalRecord(arg1, i);
        };
        this[`OR${idx}`] = function(arg1) {
          return this.orInternalRecord(arg1, i);
        };
        this[`MANY${idx}`] = function(arg1) {
          this.manyInternalRecord(i, arg1);
        };
        this[`MANY_SEP${idx}`] = function(arg1) {
          this.manySepFirstInternalRecord(i, arg1);
        };
        this[`AT_LEAST_ONE${idx}`] = function(arg1) {
          this.atLeastOneInternalRecord(i, arg1);
        };
        this[`AT_LEAST_ONE_SEP${idx}`] = function(arg1) {
          this.atLeastOneSepFirstInternalRecord(i, arg1);
        };
      }
      this[`consume`] = function(idx, arg1, arg2) {
        return this.consumeInternalRecord(arg1, idx, arg2);
      };
      this[`subrule`] = function(idx, arg1, arg2) {
        return this.subruleInternalRecord(arg1, idx, arg2);
      };
      this[`option`] = function(idx, arg1) {
        return this.optionInternalRecord(arg1, idx);
      };
      this[`or`] = function(idx, arg1) {
        return this.orInternalRecord(arg1, idx);
      };
      this[`many`] = function(idx, arg1) {
        this.manyInternalRecord(idx, arg1);
      };
      this[`atLeastOne`] = function(idx, arg1) {
        this.atLeastOneInternalRecord(idx, arg1);
      };
      this.ACTION = this.ACTION_RECORD;
      this.BACKTRACK = this.BACKTRACK_RECORD;
      this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = false;
    this.TRACE_INIT("Deleting Recording methods", () => {
      const that = this;
      for (let i = 0; i < 10; i++) {
        const idx = i > 0 ? i : "";
        delete that[`CONSUME${idx}`];
        delete that[`SUBRULE${idx}`];
        delete that[`OPTION${idx}`];
        delete that[`OR${idx}`];
        delete that[`MANY${idx}`];
        delete that[`MANY_SEP${idx}`];
        delete that[`AT_LEAST_ONE${idx}`];
        delete that[`AT_LEAST_ONE_SEP${idx}`];
      }
      delete that[`consume`];
      delete that[`subrule`];
      delete that[`option`];
      delete that[`or`];
      delete that[`many`];
      delete that[`atLeastOne`];
      delete that.ACTION;
      delete that.BACKTRACK;
      delete that.LA;
    });
  }
  //   Parser methods are called inside an ACTION?
  //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
  // @ts-expect-error -- noop place holder
  ACTION_RECORD(impl) {
  }
  // Executing backtracking logic will break our recording logic assumptions
  BACKTRACK_RECORD(grammarRule, args) {
    return () => true;
  }
  // LA is part of the official API and may be used for custom lookahead logic
  // by end users who may forget to wrap it in ACTION or inside a GATE
  LA_RECORD(howMuch) {
    return END_OF_FILE;
  }
  topLevelRuleRecord(name, def) {
    try {
      const newTopLevelRule = new Rule({ definition: [], name });
      newTopLevelRule.name = name;
      this.recordingProdStack.push(newTopLevelRule);
      def.call(this);
      this.recordingProdStack.pop();
      return newTopLevelRule;
    } catch (originalError) {
      if (originalError.KNOWN_RECORDER_ERROR !== true) {
        try {
          originalError.message = originalError.message + '\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording';
        } catch (mutabilityError) {
          throw originalError;
        }
      }
      throw originalError;
    }
  }
  // Implementation of parsing DSL
  optionInternalRecord(actionORMethodDef, occurrence) {
    return recordProd.call(this, Option, actionORMethodDef, occurrence);
  }
  atLeastOneInternalRecord(occurrence, actionORMethodDef) {
    recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
  }
  atLeastOneSepFirstInternalRecord(occurrence, options) {
    recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
  }
  manyInternalRecord(occurrence, actionORMethodDef) {
    recordProd.call(this, Repetition, actionORMethodDef, occurrence);
  }
  manySepFirstInternalRecord(occurrence, options) {
    recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
  }
  orInternalRecord(altsOrOpts, occurrence) {
    return recordOrProd.call(this, altsOrOpts, occurrence);
  }
  subruleInternalRecord(ruleToCall, occurrence, options) {
    assertMethodIdxIsValid(occurrence);
    if (!ruleToCall || has_default(ruleToCall, "ruleName") === false) {
      const error = new Error(`<SUBRULE${getIdxSuffix(occurrence)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(ruleToCall)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      error.KNOWN_RECORDER_ERROR = true;
      throw error;
    }
    const prevProd = last_default(this.recordingProdStack);
    const ruleName = ruleToCall.ruleName;
    const newNoneTerminal = new NonTerminal({
      idx: occurrence,
      nonTerminalName: ruleName,
      label: options === null || options === void 0 ? void 0 : options.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    prevProd.definition.push(newNoneTerminal);
    return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
  }
  consumeInternalRecord(tokType, occurrence, options) {
    assertMethodIdxIsValid(occurrence);
    if (!hasShortKeyProperty(tokType)) {
      const error = new Error(`<CONSUME${getIdxSuffix(occurrence)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(tokType)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      error.KNOWN_RECORDER_ERROR = true;
      throw error;
    }
    const prevProd = last_default(this.recordingProdStack);
    const newNoneTerminal = new Terminal({
      idx: occurrence,
      terminalType: tokType,
      label: options === null || options === void 0 ? void 0 : options.LABEL
    });
    prevProd.definition.push(newNoneTerminal);
    return RECORDING_PHASE_TOKEN;
  }
};
function recordProd(prodConstructor, mainProdArg, occurrence, handleSep = false) {
  assertMethodIdxIsValid(occurrence);
  const prevProd = last_default(this.recordingProdStack);
  const grammarAction = isFunction_default(mainProdArg) ? mainProdArg : mainProdArg.DEF;
  const newProd = new prodConstructor({ definition: [], idx: occurrence });
  if (handleSep) {
    newProd.separator = mainProdArg.SEP;
  }
  if (has_default(mainProdArg, "MAX_LOOKAHEAD")) {
    newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
  }
  this.recordingProdStack.push(newProd);
  grammarAction.call(this);
  prevProd.definition.push(newProd);
  this.recordingProdStack.pop();
  return RECORDING_NULL_OBJECT;
}
function recordOrProd(mainProdArg, occurrence) {
  assertMethodIdxIsValid(occurrence);
  const prevProd = last_default(this.recordingProdStack);
  const hasOptions = isArray_default(mainProdArg) === false;
  const alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
  const newOrProd = new Alternation({
    definition: [],
    idx: occurrence,
    ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
  });
  if (has_default(mainProdArg, "MAX_LOOKAHEAD")) {
    newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
  }
  const hasPredicates = some_default(alts, (currAlt) => isFunction_default(currAlt.GATE));
  newOrProd.hasPredicates = hasPredicates;
  prevProd.definition.push(newOrProd);
  forEach_default(alts, (currAlt) => {
    const currAltFlat = new Alternative({ definition: [] });
    newOrProd.definition.push(currAltFlat);
    if (has_default(currAlt, "IGNORE_AMBIGUITIES")) {
      currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
    } else if (has_default(currAlt, "GATE")) {
      currAltFlat.ignoreAmbiguities = true;
    }
    this.recordingProdStack.push(currAltFlat);
    currAlt.ALT.call(this);
    this.recordingProdStack.pop();
  });
  return RECORDING_NULL_OBJECT;
}
function getIdxSuffix(idx) {
  return idx === 0 ? "" : `${idx}`;
}
function assertMethodIdxIsValid(idx) {
  if (idx < 0 || idx > MAX_METHOD_IDX) {
    const error = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${idx}>
	Idx value must be a none negative value smaller than ${MAX_METHOD_IDX + 1}`
    );
    error.KNOWN_RECORDER_ERROR = true;
    throw error;
  }
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js
var PerformanceTracer = class {
  initPerformanceTracer(config) {
    if (has_default(config, "traceInitPerf")) {
      const userTraceInitPerf = config.traceInitPerf;
      const traceIsNumber = typeof userTraceInitPerf === "number";
      this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
      this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
    } else {
      this.traceInitMaxIdent = 0;
      this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
    }
    this.traceInitIndent = -1;
  }
  TRACE_INIT(phaseDesc, phaseImpl) {
    if (this.traceInitPerf === true) {
      this.traceInitIndent++;
      const indent = new Array(this.traceInitIndent + 1).join("	");
      if (this.traceInitIndent < this.traceInitMaxIdent) {
        console.log(`${indent}--> <${phaseDesc}>`);
      }
      const { time, value } = timer(phaseImpl);
      const traceMethod = time > 10 ? console.warn : console.log;
      if (this.traceInitIndent < this.traceInitMaxIdent) {
        traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
      }
      this.traceInitIndent--;
      return value;
    } else {
      return phaseImpl();
    }
  }
};

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/utils/apply_mixins.js
function applyMixins(derivedCtor, baseCtors) {
  baseCtors.forEach((baseCtor) => {
    const baseProto = baseCtor.prototype;
    Object.getOwnPropertyNames(baseProto).forEach((propName) => {
      if (propName === "constructor") {
        return;
      }
      const basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
      if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) {
        Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
      } else {
        derivedCtor.prototype[propName] = baseCtor.prototype[propName];
      }
    });
  });
}

// node_modules/.pnpm/chevrotain@11.1.2/node_modules/chevrotain/lib/src/parse/parser/parser.js
var END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(END_OF_FILE);
var DEFAULT_PARSER_CONFIG = Object.freeze({
  recoveryEnabled: false,
  maxLookahead: 3,
  dynamicTokensEnabled: false,
  outputCst: true,
  errorMessageProvider: defaultParserErrorProvider,
  nodeLocationTracking: "none",
  traceInitPerf: false,
  skipValidations: false
});
var DEFAULT_RULE_CONFIG = Object.freeze({
  recoveryValueFunc: () => void 0,
  resyncEnabled: true
});
var ParserDefinitionErrorType;
(function(ParserDefinitionErrorType2) {
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
  ParserDefinitionErrorType2[ParserDefinitionErrorType2["CUSTOM_LOOKAHEAD_VALIDATION"] = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
var Parser = class _Parser {
  /**
   *  @deprecated use the **instance** method with the same name instead
   */
  static performSelfAnalysis(parserInstance) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let defErrorsMsgs;
      this.selfAnalysisDone = true;
      const className = this.className;
      this.TRACE_INIT("toFastProps", () => {
        toFastProperties(this);
      });
      this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording();
          forEach_default(this.definedRulesNames, (currRuleName) => {
            const wrappedRule = this[currRuleName];
            const originalGrammarAction = wrappedRule["originalGrammarAction"];
            let recordedRuleGast;
            this.TRACE_INIT(`${currRuleName} Rule`, () => {
              recordedRuleGast = this.topLevelRuleRecord(currRuleName, originalGrammarAction);
            });
            this.gastProductionsCache[currRuleName] = recordedRuleGast;
          });
        } finally {
          this.disableRecording();
        }
      });
      let resolverErrors = [];
      this.TRACE_INIT("Grammar Resolving", () => {
        resolverErrors = resolveGrammar2({
          rules: values_default(this.gastProductionsCache)
        });
        this.definitionErrors = this.definitionErrors.concat(resolverErrors);
      });
      this.TRACE_INIT("Grammar Validations", () => {
        if (isEmpty_default(resolverErrors) && this.skipValidations === false) {
          const validationErrors = validateGrammar2({
            rules: values_default(this.gastProductionsCache),
            tokenTypes: values_default(this.tokensMap),
            errMsgProvider: defaultGrammarValidatorErrorProvider,
            grammarName: className
          });
          const lookaheadValidationErrors = validateLookahead({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: values_default(this.gastProductionsCache),
            tokenTypes: values_default(this.tokensMap),
            grammarName: className
          });
          this.definitionErrors = this.definitionErrors.concat(validationErrors, lookaheadValidationErrors);
        }
      });
      if (isEmpty_default(this.definitionErrors)) {
        if (this.recoveryEnabled) {
          this.TRACE_INIT("computeAllProdsFollows", () => {
            const allFollows = computeAllProdsFollows(values_default(this.gastProductionsCache));
            this.resyncFollows = allFollows;
          });
        }
        this.TRACE_INIT("ComputeLookaheadFunctions", () => {
          var _a7, _b;
          (_b = (_a7 = this.lookaheadStrategy).initialize) === null || _b === void 0 ? void 0 : _b.call(_a7, {
            rules: values_default(this.gastProductionsCache)
          });
          this.preComputeLookaheadFunctions(values_default(this.gastProductionsCache));
        });
      }
      if (!_Parser.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty_default(this.definitionErrors)) {
        defErrorsMsgs = map_default(this.definitionErrors, (defError) => defError.message);
        throw new Error(`Parser Definition Errors detected:
 ${defErrorsMsgs.join("\n-------------------------------\n")}`);
      }
    });
  }
  constructor(tokenVocabulary, config) {
    this.definitionErrors = [];
    this.selfAnalysisDone = false;
    const that = this;
    that.initErrorHandler(config);
    that.initLexerAdapter();
    that.initLooksAhead(config);
    that.initRecognizerEngine(tokenVocabulary, config);
    that.initRecoverable(config);
    that.initTreeBuilder(config);
    that.initContentAssist();
    that.initGastRecorder(config);
    that.initPerformanceTracer(config);
    if (has_default(config, "ignoredIssues")) {
      throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
    }
    this.skipValidations = has_default(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
  }
};
Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
applyMixins(Parser, [
  Recoverable,
  LooksAhead,
  TreeBuilder,
  LexerAdapter,
  RecognizerEngine,
  RecognizerApi,
  ErrorHandler,
  ContentAssist,
  GastRecorder,
  PerformanceTracer
]);
var CstParser = class extends Parser {
  constructor(tokenVocabulary, config = DEFAULT_PARSER_CONFIG) {
    const configClone = clone_default(config);
    configClone.outputCst = true;
    super(tokenVocabulary, configClone);
  }
};

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/usecaseDiagram-POWQR4AR.mjs
function runChevrotainParse(config, input) {
  const lexResult = config.lexer.tokenize(input);
  if (lexResult.errors.length > 0) {
    const lexError = lexResult.errors[0];
    const start = Number.isFinite(lexError.offset) ? lexError.offset : input.length;
    const end = start + (Number.isFinite(lexError.length) ? lexError.length : 0);
    throw new Error(
      `Error lexing ${config.diagramType} diagram: ${lexError.message} at line ${lexError.line ?? 1}, column ${lexError.column ?? 1} [${start},${end})`
    );
  }
  config.parser.input = lexResult.tokens;
  const cst = config.entry();
  if (config.parser.errors.length > 0) {
    throw new Error(
      `Error parsing ${config.diagramType} diagram: ${config.parser.errors[0].message}`
    );
  }
  config.visit(cst);
}
__name(runChevrotainParse, "runChevrotainParse");
var ARROW_TYPE = {
  SOLID_ARROW: 0,
  BACK_ARROW: 1,
  LINE_SOLID: 2,
  CIRCLE_ARROW: 3,
  CROSS_ARROW: 4,
  CIRCLE_ARROW_REVERSED: 5,
  CROSS_ARROW_REVERSED: 6
};
var DEFAULT_DIRECTION = "LR";
var DEFAULT_USECASE_CONFIG = defaultConfig_default.usecase;
var createModel = __name(() => ({
  actors: /* @__PURE__ */ new Map(),
  useCases: /* @__PURE__ */ new Map(),
  systemBoundaries: /* @__PURE__ */ new Map(),
  relationships: [],
  notes: /* @__PURE__ */ new Map(),
  jsonNodes: /* @__PURE__ */ new Map(),
  classDefs: /* @__PURE__ */ new Map(),
  symbols: /* @__PURE__ */ new Map(),
  direction: DEFAULT_DIRECTION,
  relationshipCounter: 0,
  noteCounter: 0,
  accTitle: "",
  accDescription: "",
  ast: void 0,
  config: structuredClone(DEFAULT_USECASE_CONFIG)
}), "createModel");
var assertCompleteModel = __name((model) => {
  if (!(model.actors instanceof Map) || !(model.useCases instanceof Map) || !(model.systemBoundaries instanceof Map) || !Array.isArray(model.relationships) || !(model.notes instanceof Map) || !(model.jsonNodes instanceof Map) || !(model.classDefs instanceof Map) || !(model.symbols instanceof Map) || !["TB", "TD", "BT", "RL", "LR"].includes(model.direction) || !Number.isSafeInteger(model.relationshipCounter) || model.relationshipCounter < 0 || !Number.isSafeInteger(model.noteCounter) || model.noteCounter < 0 || typeof model.accTitle !== "string" || typeof model.accDescription !== "string" || !model.config) {
    throw new Error("Cannot commit an incomplete usecase model");
  }
}, "assertCompleteModel");
var state = createModel();
var getConfig3 = __name(() => structuredClone(state.config), "getConfig");
var getAST = __name(() => state.ast, "getAST");
var commit = __name((model) => {
  const nextState = structuredClone(model);
  assertCompleteModel(nextState);
  const previousAccTitle = getAccTitle();
  const previousAccDescription = getAccDescription();
  try {
    setAccTitle(nextState.accTitle);
    setAccDescription(nextState.accDescription);
    state = nextState;
  } catch (error) {
    setAccTitle(previousAccTitle);
    setAccDescription(previousAccDescription);
    throw error;
  }
}, "commit");
var clear2 = __name(() => {
  state = createModel();
  clear();
}, "clear");
var getActors = __name(() => state.actors, "getActors");
var getActor = __name((id) => state.actors.get(id), "getActor");
var getUseCases = __name(() => state.useCases, "getUseCases");
var getUseCase = __name((id) => state.useCases.get(id), "getUseCase");
var getSystemBoundaries = __name(() => state.systemBoundaries, "getSystemBoundaries");
var getSystemBoundary = __name((id) => state.systemBoundaries.get(id), "getSystemBoundary");
var getRelationships = __name(() => state.relationships, "getRelationships");
var getNotes = __name(() => state.notes, "getNotes");
var getNote = __name((id) => state.notes.get(id), "getNote");
var getJsonNodes = __name(() => state.jsonNodes, "getJsonNodes");
var getJsonNode = __name((id) => state.jsonNodes.get(id), "getJsonNode");
var getClassDefs = __name(() => state.classDefs, "getClassDefs");
var getClassDef = __name((id) => state.classDefs.get(id), "getClassDef");
var getDirection = __name(() => state.direction, "getDirection");
var getCompiledStyles = __name((classNames2) => {
  const compiled = /* @__PURE__ */ new Map();
  for (const className of ["default", ...classNames2]) {
    const definition = state.classDefs.get(className);
    if (!definition) {
      continue;
    }
    for (const rawStyle of definition.styles) {
      const style = rawStyle.trim();
      const separator = style.indexOf(":");
      const property2 = (separator === -1 ? style : style.slice(0, separator)).trim();
      if (property2) {
        compiled.set(property2, style);
      }
    }
  }
  return [...compiled.values()];
}, "getCompiledStyles");
var escapeJsonPointerPart = __name((part) => part.replaceAll("~", "~0").replaceAll("/", "~1"), "escapeJsonPointerPart");
var displayJsonScalar = __name((value) => typeof value === "string" ? value : value === null ? "null" : String(value), "displayJsonScalar");
var flattenJsonRows = __name((value, propertyOrder, sanitize = (cell) => cell) => {
  const rows = [];
  const append = __name((key, accessibleKey, cellValue) => {
    rows.push({
      key: sanitize(key),
      accessibleKey: sanitize(accessibleKey),
      value: sanitize(cellValue)
    });
  }, "append");
  const visit = __name((current, path, pointer) => {
    if (Array.isArray(current)) {
      if (current.length === 0) {
        append(path, path, "[]");
        return;
      }
      const scalarArray = current.every(
        (item) => item === null || ["string", "number", "boolean"].includes(typeof item)
      );
      if (scalarArray) {
        for (const [index, element] of current.entries()) {
          append(
            index === 0 ? path : "",
            path,
            displayJsonScalar(element)
          );
        }
        return;
      }
      for (const [index, element] of current.entries()) {
        visit(element, `${path}[${index}]`, `${pointer}/${index}`);
      }
      return;
    }
    if (current !== null && typeof current === "object") {
      const object = current;
      const keys2 = propertyOrder[pointer] ?? Object.keys(object);
      if (keys2.length === 0) {
        append(path, path, "{}");
        return;
      }
      for (const key of keys2) {
        const childPath = path ? `${path}.${key}` : key;
        visit(object[key], childPath, `${pointer}/${escapeJsonPointerPart(key)}`);
      }
      return;
    }
    append(path, path, displayJsonScalar(current));
  }, "visit");
  visit(value, "", "");
  return rows;
}, "flattenJsonRows");
var actorShape = __name((actor) => {
  switch (actor.type) {
    case "hollow":
      return "usecaseActorHollow";
    case "awesome":
      return "usecaseActorAwesome";
    case "icon":
      return "usecaseActorIcon";
    case "normal":
      return "usecaseActor";
  }
}, "actorShape");
var useCaseShape = __name((useCase) => {
  if (useCase.shape === "ellipse") {
    return useCase.business ? "usecaseBusiness" : "usecaseEllipse";
  }
  return useCase.shape;
}, "useCaseShape");
var associationMarkers = __name((arrowType) => {
  switch (arrowType) {
    case ARROW_TYPE.SOLID_ARROW:
      return { arrowTypeStart: "none", arrowTypeEnd: "arrow_point" };
    case ARROW_TYPE.BACK_ARROW:
      return { arrowTypeStart: "arrow_point", arrowTypeEnd: "none" };
    case ARROW_TYPE.CIRCLE_ARROW:
      return { arrowTypeStart: "none", arrowTypeEnd: "arrow_circle" };
    case ARROW_TYPE.CROSS_ARROW:
      return { arrowTypeStart: "none", arrowTypeEnd: "arrow_cross" };
    case ARROW_TYPE.CIRCLE_ARROW_REVERSED:
      return { arrowTypeStart: "arrow_circle", arrowTypeEnd: "none" };
    case ARROW_TYPE.CROSS_ARROW_REVERSED:
      return { arrowTypeStart: "arrow_cross", arrowTypeEnd: "none" };
    case ARROW_TYPE.LINE_SOLID:
      return { arrowTypeStart: "none", arrowTypeEnd: "none" };
  }
}, "associationMarkers");
var relationshipVisuals = __name((relationship) => {
  switch (relationship.type) {
    case "include":
    case "extend":
      return {
        arrowTypeStart: "none",
        arrowTypeEnd: "arrow_point",
        pattern: "dotted",
        label: relationship.type,
        labelType: "text"
      };
    case "generalization":
      return {
        arrowTypeStart: "none",
        arrowTypeEnd: "extension",
        pattern: "solid"
      };
    case "association":
      return {
        ...associationMarkers(relationship.arrowType),
        pattern: "solid",
        ...relationship.label ? { label: relationship.label } : {},
        ...relationship.labelType ? { labelType: relationship.labelType } : {}
      };
  }
}, "relationshipVisuals");
var animationClasses = __name((relationship) => relationship.animate || relationship.animation ? [`edge-animation-${relationship.animation ?? "fast"}`] : [], "animationClasses");
var classNames = __name((...names) => names.filter((name) => Boolean(name)).join(" "), "classNames");
var getData2 = __name(() => {
  var _a7, _b, _c;
  const globalConfig = getConfig2();
  const config = {
    ...state.config,
    ...globalConfig.usecase
  };
  const sanitize = __name((value) => sanitizeText(value, globalConfig), "sanitize");
  const endpointLabel = __name((id) => {
    var _a8, _b2, _c2, _d;
    return sanitize(
      ((_a8 = state.actors.get(id)) == null ? void 0 : _a8.label) ?? ((_b2 = state.useCases.get(id)) == null ? void 0 : _b2.label) ?? ((_c2 = state.jsonNodes.get(id)) == null ? void 0 : _c2.id) ?? ((_d = state.notes.get(id)) == null ? void 0 : _d.label) ?? id
    );
  }, "endpointLabel");
  const nodes = [];
  const edges = [];
  let colorIndex = 0;
  let boundaryColorIndex = 0;
  for (const actor of state.actors.values()) {
    nodes.push({
      id: actor.id,
      label: sanitize(actor.label),
      labelType: actor.labelType,
      shape: actorShape(actor),
      isGroup: false,
      padding: 10,
      look: globalConfig.look,
      colorIndex: colorIndex++,
      cssClasses: classNames(
        "default",
        "usecase-actor",
        `usecase-actor-${actor.type}`,
        actor.business && "usecase-business",
        ...actor.classes
      ),
      cssStyles: [...actor.styles],
      cssCompiledStyles: getCompiledStyles(actor.classes),
      actorType: actor.type,
      business: actor.business,
      ...actor.icon ? { icon: actor.icon } : {},
      ...actor.stereotype ? { stereotype: sanitize(actor.stereotype) } : {},
      ...actor.parentId ? { parentId: actor.parentId } : {}
    });
  }
  for (const useCase of state.useCases.values()) {
    nodes.push({
      id: useCase.id,
      label: sanitize(useCase.label),
      labelType: useCase.labelType,
      shape: useCaseShape(useCase),
      isGroup: false,
      padding: useCase.shape === "ellipse" ? 20 : 10,
      look: globalConfig.look,
      colorIndex: colorIndex++,
      cssClasses: classNames(
        "default",
        "usecase-element",
        `usecase-${useCase.shape}`,
        useCase.business && "usecase-business",
        ...useCase.classes
      ),
      cssStyles: [...useCase.styles],
      cssCompiledStyles: getCompiledStyles(useCase.classes),
      business: useCase.business,
      ...useCase.stereotype ? { stereotype: sanitize(useCase.stereotype) } : {},
      ...useCase.parentId ? { parentId: useCase.parentId } : {}
    });
  }
  for (const note of state.notes.values()) {
    nodes.push({
      id: note.id,
      label: sanitize(note.label),
      labelType: note.labelType,
      shape: "note",
      isGroup: false,
      padding: 10,
      look: globalConfig.look,
      cssClasses: "default usecase-note",
      cssStyles: [],
      cssCompiledStyles: getCompiledStyles([]),
      noteTarget: note.target,
      noteTargetLabel: sanitize(
        ((_a7 = state.actors.get(note.target)) == null ? void 0 : _a7.label) ?? ((_b = state.useCases.get(note.target)) == null ? void 0 : _b.label) ?? ((_c = state.jsonNodes.get(note.target)) == null ? void 0 : _c.id) ?? note.target
      )
    });
  }
  for (const json of state.jsonNodes.values()) {
    nodes.push({
      id: json.id,
      label: sanitize(json.id),
      labelType: "text",
      shape: "usecaseJsonTable",
      isGroup: false,
      padding: 10,
      look: globalConfig.look,
      cssClasses: classNames("default", "usecase-json-table", ...json.classes),
      cssStyles: [...json.styles],
      cssCompiledStyles: getCompiledStyles(json.classes),
      jsonRows: flattenJsonRows(json.value, json.propertyOrder, sanitize)
    });
  }
  for (const boundary of state.systemBoundaries.values()) {
    nodes.push({
      id: boundary.id,
      label: sanitize(boundary.label),
      labelType: boundary.labelType,
      shape: "usecaseSystemBoundary",
      isGroup: true,
      padding: 20,
      look: globalConfig.look,
      colorIndex: boundaryColorIndex++,
      cssClasses: classNames(
        "default",
        "system-boundary",
        `system-boundary-${boundary.type}`,
        ...boundary.classes
      ),
      cssStyles: [...boundary.styles],
      cssCompiledStyles: getCompiledStyles(boundary.classes),
      boundaryType: boundary.type
    });
  }
  for (const relationship of state.relationships) {
    const { label: rawLabel, ...visual } = relationshipVisuals(relationship);
    edges.push({
      id: relationship.id,
      start: relationship.source,
      end: relationship.target,
      source: relationship.source,
      target: relationship.target,
      sourceLabel: endpointLabel(relationship.source),
      targetLabel: endpointLabel(relationship.target),
      type: "edge",
      relationshipType: relationship.type,
      internal: false,
      ...visual,
      ...rawLabel !== void 0 ? { label: sanitize(rawLabel) } : {},
      labelpos: "c",
      classes: classNames(
        "default",
        "relationship",
        `relationship-${relationship.type}`,
        ...relationship.classes,
        ...animationClasses(relationship)
      ),
      style: [...relationship.styles],
      cssCompiledStyles: getCompiledStyles(relationship.classes),
      animate: relationship.animate,
      ...relationship.animation ? { animation: relationship.animation } : {},
      look: globalConfig.look,
      thickness: "normal",
      minlen: relationship.minlen,
      isUserDefinedId: relationship.explicitId
    });
  }
  for (const note of state.notes.values()) {
    edges.push({
      id: `${note.id}-edge`,
      start: note.id,
      end: note.target,
      source: note.id,
      target: note.target,
      type: "edge",
      relationshipType: "note",
      sourceLabel: endpointLabel(note.id),
      targetLabel: endpointLabel(note.target),
      internal: true,
      pattern: "dotted",
      arrowTypeStart: "none",
      arrowTypeEnd: "none",
      labelpos: "c",
      classes: "default relationship relationship-note",
      style: [],
      cssCompiledStyles: getCompiledStyles([]),
      animate: false,
      look: globalConfig.look,
      thickness: "normal",
      minlen: 1,
      isUserDefinedId: false
    });
  }
  for (const node of nodes) {
    node.wrappingWidth ?? (node.wrappingWidth = config.wrappingWidth);
    if (!node.isGroup && !node.shape.startsWith("usecaseActor")) {
      node.minWidth ?? (node.minWidth = config.minNodeWidth);
    }
    if (node.shape === "usecaseEllipse" || node.shape === "usecaseBusiness") {
      node.spreadPorts = true;
    }
  }
  return {
    nodes,
    edges,
    config: globalConfig,
    type: "usecase",
    layoutAlgorithm: "dagre",
    direction: getDirection(),
    nodeSpacing: config.nodeSpacing,
    rankSpacing: config.rankSpacing,
    actorFontSize: config.actorFontSize,
    actorFontFamily: config.actorFontFamily,
    actorFontWeight: config.actorFontWeight,
    usecaseFontSize: config.usecaseFontSize,
    usecaseFontFamily: config.usecaseFontFamily,
    usecaseFontWeight: config.usecaseFontWeight,
    diagramPadding: config.diagramPadding,
    useMaxWidth: config.useMaxWidth,
    markers: ["point", "circle", "cross", "extension"]
  };
}, "getData");
var db = {
  getConfig: getConfig3,
  createModel,
  commit,
  getAST,
  clear: clear2,
  setDiagramTitle,
  getDiagramTitle,
  setAccTitle,
  getAccTitle,
  setAccDescription,
  getAccDescription,
  getActors,
  getActor,
  getUseCases,
  getUseCase,
  getSystemBoundaries,
  getSystemBoundary,
  getRelationships,
  getNotes,
  getNote,
  getJsonNodes,
  getJsonNode,
  getClassDefs,
  getClassDef,
  getDirection,
  getData: getData2
};
function customMatch(text, offset, image) {
  const match = [image];
  match.index = offset;
  match.input = text;
  return match;
}
__name(customMatch, "customMatch");
var matchMarkdownString = __name((text, offset) => {
  if (text[offset] !== '"' || text[offset + 1] !== "`") {
    return null;
  }
  for (let index = offset + 2; index < text.length - 1; index++) {
    if (text[index] === "`" && text[index + 1] === '"') {
      return customMatch(text, offset, text.slice(offset, index + 2));
    }
  }
  return null;
}, "matchMarkdownString");
var matchComment = __name((text, offset) => {
  if (text[offset] !== "%" || text[offset + 1] !== "%") {
    return null;
  }
  for (let index = offset - 1; index >= 0; index--) {
    const character = text[index];
    if (character === "\n" || character === "\r") {
      break;
    }
    if (character !== " " && character !== "	") {
      return null;
    }
  }
  let end = offset + 2;
  while (end < text.length && text[end] !== "\n" && text[end] !== "\r") {
    end++;
  }
  return customMatch(text, offset, text.slice(offset, end));
}, "matchComment");
var isIndentedLineStart = __name((text, offset) => {
  for (let index = offset - 1; index >= 0; index--) {
    const character = text[index];
    if (character === "\n" || character === "\r") {
      return true;
    }
    if (character !== " " && character !== "	") {
      return false;
    }
  }
  return true;
}, "isIndentedLineStart");
var matchAccessibilityLine = __name((text, offset, pattern) => {
  if (!isIndentedLineStart(text, offset)) {
    return null;
  }
  const match = pattern.exec(text.slice(offset));
  return match ? customMatch(text, offset, match[0]) : null;
}, "matchAccessibilityLine");
var matchAccDescrBlock = __name((text, offset) => {
  if (!isIndentedLineStart(text, offset)) {
    return null;
  }
  const opening = /^accDescr[\t ]*{/.exec(text.slice(offset));
  if (!opening) {
    return null;
  }
  const end = text.indexOf("}", offset + opening[0].length);
  return end === -1 ? null : customMatch(text, offset, text.slice(offset, end + 1));
}, "matchAccDescrBlock");
var matchJsonObject = __name((text, offset) => {
  if (text[offset] !== "{") {
    return null;
  }
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = offset; index < text.length; index++) {
    const character = text[index];
    if (quoted) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        quoted = false;
      }
      continue;
    }
    if (character === '"') {
      quoted = true;
    } else if (character === "{") {
      depth++;
    } else if (character === "}" && --depth === 0) {
      return customMatch(text, offset, text.slice(offset, index + 1));
    }
  }
  return null;
}, "matchJsonObject");
var matchStereotypeText = __name((text, offset) => {
  const end = text.indexOf(">>", offset);
  if (end === -1 || /[\n\r]/.test(text.slice(offset, end))) {
    return null;
  }
  const image = text.slice(offset, end);
  return image.trim() ? customMatch(text, offset, image) : null;
}, "matchStereotypeText");
var LabelText = createToken({ name: "LABEL_TEXT", pattern: Lexer.NA });
var Word = createToken({ name: "WORD", pattern: Lexer.NA, categories: LabelText });
var NumberLiteral = createToken({
  name: "NUMBER",
  pattern: /(?:\d+\.\d+|\d+|\.\d+)(?:[A-Za-z]+)?/,
  categories: LabelText
});
var Identifier = createToken({
  name: "IDENTIFIER",
  pattern: /\w+/,
  longer_alt: NumberLiteral,
  categories: Word
});
var WhiteSpace = createToken({
  name: "HWS",
  pattern: /[\t ]+/,
  group: Lexer.SKIPPED
});
var MarkdownString = createToken({
  name: "MARKDOWN_STRING",
  pattern: matchMarkdownString,
  start_chars_hint: ['"'],
  line_breaks: true
});
var UnclosedMarkdownString = createToken({
  name: "UNCLOSED_MARKDOWN_STRING",
  pattern: /"`[^]*/,
  line_breaks: true
});
var Comment = createToken({
  name: "COMMENT",
  pattern: matchComment,
  start_chars_hint: ["%"],
  line_breaks: false
});
var NewLine = createToken({
  name: "NEWLINE",
  pattern: /\r\n|\n|\r/,
  line_breaks: true
});
var AccDescrBlock = createToken({
  name: "ACC_DESCR_BLOCK",
  pattern: matchAccDescrBlock,
  start_chars_hint: ["a"],
  line_breaks: true
});
var accTitleLinePattern = /^accTitle[\t ]*:[^\n\r]*/;
var accDescrLinePattern = /^accDescr[\t ]*:[^\n\r]*/;
var AccTitleLine = createToken({
  name: "ACC_TITLE_LINE",
  pattern: __name((text, offset) => matchAccessibilityLine(text, offset, accTitleLinePattern), "pattern"),
  start_chars_hint: ["a"],
  line_breaks: false
});
var AccDescrLine = createToken({
  name: "ACC_DESCR_LINE",
  pattern: __name((text, offset) => matchAccessibilityLine(text, offset, accDescrLinePattern), "pattern"),
  start_chars_hint: ["a"],
  line_breaks: false
});
var JsonDeclarationStart = createToken({
  name: "JSON_DECLARATION_START",
  pattern: /json[\t ]+\w+[\t ]*@[\t ]*(?={)/,
  push_mode: "jsonBody"
});
var JsonObjectLiteral = createToken({
  name: "JSON_OBJECT_LITERAL",
  pattern: matchJsonObject,
  start_chars_hint: ["{"],
  line_breaks: true,
  pop_mode: true
});
var UnclosedJsonObjectLiteral = createToken({
  name: "UNCLOSED_JSON_OBJECT_LITERAL",
  pattern: /{[^]*/,
  line_breaks: true,
  pop_mode: true
});
var keyword = __name((name, pattern) => createToken({ name, pattern, longer_alt: Identifier, categories: Word }), "keyword");
var Usecase = keyword("USECASE", /usecase-beta/);
var Actor = keyword("ACTOR", /actor/);
var SystemBoundary = keyword("SYSTEM_BOUNDARY", /systemBoundary/);
var End = keyword("END", /end/);
var Direction = keyword("DIRECTION", /direction/);
var Td = keyword("TD", /TD/);
var Tb = keyword("TB", /TB/);
var Bt = keyword("BT", /BT/);
var Lr = keyword("LR", /LR/);
var Rl = keyword("RL", /RL/);
var Note = keyword("NOTE", /note/);
var For = keyword("FOR", /for/);
var Json = keyword("JSON", /json/);
var ClassDef = keyword("CLASS_DEF", /classDef/);
var Class = keyword("CLASS", /class/);
var Style = keyword("STYLE", /style/);
var Include = keyword("INCLUDE", /include/i);
var Extend = keyword("EXTEND", /extend/i);
var True = keyword("TRUE", /true/);
var False = keyword("FALSE", /false/);
var Generalization = createToken({ name: "GENERALIZATION", pattern: /--\|>/ });
var DependencyArrow = createToken({ name: "DEPENDENCY_ARROW", pattern: /\.\.>/ });
var StereotypeStart = createToken({
  name: "STEREOTYPE_START",
  pattern: /<</,
  push_mode: "stereotype"
});
var StereotypeEnd = createToken({
  name: "STEREOTYPE_END",
  pattern: />>/,
  pop_mode: true
});
var StereotypeText = createToken({
  name: "STEREOTYPE_TEXT",
  pattern: matchStereotypeText,
  line_breaks: false
});
var UnclosedStereotypeText = createToken({
  name: "UNCLOSED_STEREOTYPE_TEXT",
  pattern: /[^\n\r]+/,
  line_breaks: false,
  pop_mode: true
});
var ClassSeparator = createToken({ name: "CLASS_SEPARATOR", pattern: /:::/ });
var ForwardSolid = createToken({ name: "FORWARD_SOLID", pattern: /--+>/ });
var BackwardSolid = createToken({ name: "BACKWARD_SOLID", pattern: /<--+/ });
var ForwardCircle = createToken({ name: "FORWARD_CIRCLE", pattern: /--o/ });
var BackwardCircle = createToken({ name: "BACKWARD_CIRCLE", pattern: /o--/ });
var ForwardCross = createToken({ name: "FORWARD_CROSS", pattern: /--x/ });
var BackwardCross = createToken({ name: "BACKWARD_CROSS", pattern: /x--/ });
var MarkerlessSolid = createToken({ name: "MARKERLESS_SOLID", pattern: /--+/ });
var MetadataStart = createToken({ name: "METADATA_START", pattern: /@{/ });
var At = createToken({ name: "AT", pattern: /@/, categories: LabelText });
var LeftBrace = createToken({ name: "LBRACE", pattern: /{/ });
var RightBrace = createToken({ name: "RBRACE", pattern: /}/ });
var LeftBracket = createToken({ name: "LBRACKET", pattern: /\[/ });
var RightBracket = createToken({ name: "RBRACKET", pattern: /]/ });
var LeftParen = createToken({ name: "LPAREN", pattern: /\(/ });
var RightParen = createToken({ name: "RPAREN", pattern: /\)/ });
var Comma = createToken({ name: "COMMA", pattern: /,/, categories: LabelText });
var Colon = createToken({ name: "COLON", pattern: /:/, categories: LabelText });
var HashColor = createToken({
  name: "HASH_COLOR",
  pattern: /#[\dA-Fa-f]+/,
  categories: LabelText
});
var PlainString = createToken({
  name: "PLAIN_STRING",
  pattern: /"[^\n\r"]*"|'[^\n\r']*'/
});
var CssIdentifier = createToken({
  name: "CSS_IDENTIFIER",
  pattern: /--[A-Z_a-z][\w-]*|[A-Z_a-z]\w*(?:-\w+)+/,
  categories: LabelText
});
var CssEscapedComma = createToken({
  name: "CSS_ESCAPED_COMMA",
  pattern: /\\,/,
  categories: LabelText
});
var Dash = createToken({ name: "DASH", pattern: /-/, categories: LabelText });
var Dot = createToken({ name: "DOT", pattern: /\./, categories: LabelText });
var Percent = createToken({ name: "PERCENT", pattern: /%/, categories: LabelText });
var CssPunctuation = createToken({
  name: "CSS_PUNCTUATION",
  pattern: /[!#$&*+/=?^_|~]/,
  categories: LabelText
});
var LabelPunctuation = createToken({
  name: "LABEL_PUNCTUATION",
  pattern: /[;<>\\`]/,
  categories: LabelText
});
var LabelSymbol = createToken({
  name: "LABEL_SYMBOL",
  pattern: /[^\t\n\r !-~]+/,
  categories: LabelText
});
var defaultModeTokens = [
  LabelText,
  Word,
  WhiteSpace,
  MarkdownString,
  UnclosedMarkdownString,
  Comment,
  NewLine,
  AccDescrBlock,
  AccTitleLine,
  AccDescrLine,
  JsonDeclarationStart,
  Usecase,
  Actor,
  SystemBoundary,
  End,
  Direction,
  Td,
  Tb,
  Bt,
  Lr,
  Rl,
  Note,
  For,
  Json,
  ClassDef,
  Class,
  Style,
  Include,
  Extend,
  True,
  False,
  Generalization,
  DependencyArrow,
  StereotypeStart,
  ClassSeparator,
  ForwardSolid,
  BackwardSolid,
  ForwardCircle,
  BackwardCircle,
  ForwardCross,
  BackwardCross,
  MarkerlessSolid,
  MetadataStart,
  At,
  LeftBrace,
  RightBrace,
  LeftBracket,
  RightBracket,
  LeftParen,
  RightParen,
  Comma,
  Colon,
  HashColor,
  PlainString,
  CssIdentifier,
  // IDENTIFIER precedes NUMBER so `1mg` lexes as one id; its longer_alt still hands
  // decimals like `1.5px` to NUMBER.
  Identifier,
  NumberLiteral,
  CssEscapedComma,
  Dash,
  Dot,
  Percent,
  CssPunctuation,
  // Both fallbacks stay last so every operator, delimiter, and string form wins first.
  LabelPunctuation,
  LabelSymbol
];
var usecaseLexerModes = {
  defaultMode: "defaultMode",
  modes: {
    defaultMode: [...defaultModeTokens],
    jsonBody: [JsonObjectLiteral, UnclosedJsonObjectLiteral],
    stereotype: [StereotypeEnd, StereotypeText, UnclosedStereotypeText]
  }
};
var usecaseTokens = [
  ...defaultModeTokens,
  JsonObjectLiteral,
  UnclosedJsonObjectLiteral,
  StereotypeEnd,
  StereotypeText,
  UnclosedStereotypeText
];
var usecaseLexer = new Lexer(usecaseLexerModes);
var isLabelToken = __name((token) => tokenMatcher(token, LabelText) || token.tokenType === PlainString || token.tokenType === MarkdownString, "isLabelToken");
var forbiddenPlantUmlStatements = {
  allowmixing: true,
  newpage: true,
  package: true,
  rectangle: true,
  skinparam: true
};
var _a;
var UsecaseParser = (_a = class extends CstParser {
  constructor() {
    super(usecaseTokens, { nodeLocationTracking: "full" });
    this.RULE("start", () => {
      this.CONSUME(Usecase);
      this.SUBRULE(this.lineEnd);
      this.MANY(() => this.SUBRULE(this.line));
    });
    this.RULE("line", () => {
      this.OR([
        { ALT: __name(() => this.SUBRULE(this.blankLine), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.commentLine), "ALT") },
        {
          GATE: __name(() => this.isStatementStart(), "GATE"),
          ALT: __name(() => this.SUBRULE(this.statement), "ALT")
        }
      ]);
    });
    this.RULE("statement", () => {
      this.OR([
        { ALT: __name(() => this.SUBRULE(this.accTitleStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.accDescrStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.directionStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.actorStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.systemBoundaryStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.noteStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.jsonStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.classDefStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.classStatement), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.styleStatement), "ALT") },
        {
          GATE: __name(() => this.isMetadataAssignment(), "GATE"),
          ALT: __name(() => this.SUBRULE(this.metadataAssignmentStatement), "ALT")
        },
        {
          GATE: __name(() => !this.isForbiddenPlantUmlStatement(), "GATE"),
          ALT: __name(() => this.SUBRULE(this.entityStatement), "ALT")
        }
      ]);
    });
    this.RULE("lineEnd", () => {
      this.OR([{ ALT: __name(() => this.CONSUME(NewLine), "ALT") }, { ALT: __name(() => this.CONSUME(EOF), "ALT") }]);
    });
    this.RULE("blankLine", () => {
      this.CONSUME(NewLine);
    });
    this.RULE("commentLine", () => {
      this.CONSUME(Comment);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("accTitleStatement", () => {
      this.CONSUME(AccTitleLine);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("accDescrStatement", () => {
      this.OR([
        { ALT: __name(() => this.CONSUME(AccDescrLine), "ALT") },
        { ALT: __name(() => this.CONSUME(AccDescrBlock), "ALT") }
      ]);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("actorStatement", () => {
      this.CONSUME(Actor);
      this.SUBRULE(this.actorItem);
      this.OPTION(() => {
        this.OR([
          {
            ALT: __name(() => this.AT_LEAST_ONE(() => {
              this.CONSUME(Comma);
              this.SUBRULE2(this.actorItem);
            }), "ALT")
          },
          { ALT: __name(() => this.SUBRULE(this.relationTail), "ALT") }
        ]);
      });
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("actorItem", () => {
      this.SUBRULE(this.actorName);
      this.OPTION(() => this.SUBRULE(this.metadata));
      this.OPTION2(() => this.SUBRULE(this.stereotype));
      this.OPTION3(() => this.SUBRULE(this.classSuffix));
    });
    this.RULE("actorName", () => {
      this.OR([
        {
          ALT: __name(() => {
            this.CONSUME(Identifier);
            this.OPTION(() => {
              this.CONSUME(LeftParen);
              this.SUBRULE(this.nodeLabel);
              this.CONSUME(RightParen);
            });
          }, "ALT")
        },
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkdownString), "ALT") }
      ]);
    });
    this.RULE("actorDeclarationOnly", () => {
      this.CONSUME(Actor);
      this.SUBRULE(this.actorItem);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE2(this.actorItem);
      });
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("entityStatement", () => {
      this.SUBRULE(this.entityName);
      this.OPTION(() => this.SUBRULE(this.relationTail));
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("entityName", () => {
      this.OR([
        {
          ALT: __name(() => {
            this.CONSUME(Identifier);
            this.OPTION(() => {
              this.OR2([
                {
                  ALT: __name(() => {
                    this.CONSUME(LeftParen);
                    this.SUBRULE(this.nodeLabel);
                    this.CONSUME(RightParen);
                  }, "ALT")
                },
                {
                  ALT: __name(() => {
                    this.CONSUME(LeftBracket);
                    this.SUBRULE2(this.nodeLabel);
                    this.CONSUME(RightBracket);
                  }, "ALT")
                }
              ]);
            });
          }, "ALT")
        },
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkdownString), "ALT") }
      ]);
      this.OPTION2(() => this.SUBRULE(this.useCaseMetadata));
      this.OPTION3(() => this.SUBRULE(this.stereotype));
      this.OPTION4(() => this.SUBRULE(this.classSuffix));
    });
    this.RULE("nodeLabel", () => {
      this.OR([
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkdownString), "ALT") },
        // Unquoted labels run until a delimiter, operator, or suffix marker, none of
        // which belong to `LabelText`. The visitor rebuilds the text from the source
        // slice, so the internal token split never reaches the model.
        { ALT: __name(() => this.AT_LEAST_ONE(() => this.CONSUME(LabelText)), "ALT") }
      ]);
    });
    this.RULE("useCaseMetadata", () => {
      this.SUBRULE(this.metadata);
    });
    this.RULE("relationTail", () => {
      this.OPTION({
        GATE: __name(() => this.LA(1).tokenType === Identifier && this.LA(2).tokenType === At, "GATE"),
        DEF: __name(() => {
          this.CONSUME(Identifier);
          this.CONSUME(At);
        }, "DEF")
      });
      this.SUBRULE(this.arrow);
      this.SUBRULE(this.entityName);
    });
    this.RULE("arrow", () => {
      this.OR([
        { ALT: __name(() => this.SUBRULE(this.semanticRelation), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.forwardSolidOperator), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.backwardSolidOperator), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.markerlessSolidOperator), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.forwardCircleOperator), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.backwardCircleOperator), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.forwardCrossOperator), "ALT") },
        { ALT: __name(() => this.SUBRULE(this.backwardCrossOperator), "ALT") }
      ]);
    });
    this.RULE("forwardSolidOperator", () => {
      this.CONSUME(ForwardSolid);
    });
    this.RULE("backwardSolidOperator", () => {
      this.CONSUME(BackwardSolid);
      this.OPTION({
        GATE: __name(() => this.LA(0).image === "<--" && this.hasLabeledRight([MarkerlessSolid]), "GATE"),
        DEF: __name(() => {
          this.SUBRULE(this.edgeLabel);
          this.CONSUME(MarkerlessSolid);
        }, "DEF")
      });
    });
    this.RULE("markerlessSolidOperator", () => {
      this.CONSUME(MarkerlessSolid);
      this.OPTION({
        GATE: __name(() => this.LA(0).image === "--" && this.hasLabeledRight([ForwardSolid, MarkerlessSolid, ForwardCircle, ForwardCross]), "GATE"),
        DEF: __name(() => {
          this.SUBRULE(this.edgeLabel);
          this.OR([
            { ALT: __name(() => this.CONSUME(ForwardSolid), "ALT") },
            { ALT: __name(() => this.CONSUME2(MarkerlessSolid), "ALT") },
            { ALT: __name(() => this.CONSUME(ForwardCircle), "ALT") },
            { ALT: __name(() => this.CONSUME(ForwardCross), "ALT") }
          ]);
        }, "DEF")
      });
    });
    this.RULE("forwardCircleOperator", () => {
      this.CONSUME(ForwardCircle);
    });
    this.RULE("backwardCircleOperator", () => {
      this.CONSUME(BackwardCircle);
      this.OPTION({
        GATE: __name(() => this.hasLabeledRight([MarkerlessSolid]), "GATE"),
        DEF: __name(() => {
          this.SUBRULE(this.edgeLabel);
          this.CONSUME(MarkerlessSolid);
        }, "DEF")
      });
    });
    this.RULE("forwardCrossOperator", () => {
      this.CONSUME(ForwardCross);
    });
    this.RULE("backwardCrossOperator", () => {
      this.CONSUME(BackwardCross);
      this.OPTION({
        GATE: __name(() => this.hasLabeledRight([MarkerlessSolid]), "GATE"),
        DEF: __name(() => {
          this.SUBRULE(this.edgeLabel);
          this.CONSUME(MarkerlessSolid);
        }, "DEF")
      });
    });
    this.RULE("edgeLabel", () => {
      this.OR([
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkdownString), "ALT") },
        { ALT: __name(() => this.AT_LEAST_ONE(() => this.CONSUME(LabelText)), "ALT") }
      ]);
    });
    this.RULE("semanticRelation", () => {
      this.OR([
        {
          ALT: __name(() => {
            this.CONSUME(DependencyArrow);
            this.CONSUME(Colon);
            this.OR2([{ ALT: __name(() => this.CONSUME(Include), "ALT") }, { ALT: __name(() => this.CONSUME(Extend), "ALT") }]);
          }, "ALT")
        },
        { ALT: __name(() => this.CONSUME(Generalization), "ALT") }
      ]);
    });
    this.RULE("metadata", () => {
      this.CONSUME(MetadataStart);
      this.MANY(() => this.CONSUME(NewLine));
      this.OPTION(() => {
        this.SUBRULE(this.metadataProperty);
        this.MANY2(() => {
          this.SUBRULE(this.metadataSeparator);
          this.SUBRULE2(this.metadataProperty);
        });
        this.OPTION2(() => this.CONSUME(Comma));
        this.MANY3(() => this.CONSUME2(NewLine));
      });
      this.CONSUME(RightBrace);
    });
    this.RULE("metadataProperty", () => {
      this.OR([{ ALT: __name(() => this.CONSUME(Identifier), "ALT") }, { ALT: __name(() => this.CONSUME(PlainString), "ALT") }]);
      this.CONSUME(Colon);
      this.OR2([
        { ALT: __name(() => this.CONSUME2(Identifier), "ALT") },
        { ALT: __name(() => this.CONSUME2(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(True), "ALT") },
        { ALT: __name(() => this.CONSUME(False), "ALT") }
      ]);
    });
    this.RULE("metadataSeparator", () => {
      this.OR([
        {
          ALT: __name(() => {
            this.CONSUME(Comma);
            this.MANY(() => this.CONSUME(NewLine));
          }, "ALT")
        },
        {
          ALT: __name(() => {
            this.AT_LEAST_ONE(() => this.CONSUME2(NewLine));
            this.OPTION(() => this.CONSUME2(Comma));
            this.MANY2(() => this.CONSUME3(NewLine));
          }, "ALT")
        }
      ]);
    });
    this.RULE("systemBoundaryStatement", () => {
      this.CONSUME(SystemBoundary);
      this.SUBRULE(this.systemBoundaryName);
      this.OPTION(() => this.SUBRULE(this.metadata));
      this.OPTION2(() => this.SUBRULE(this.classSuffix));
      this.SUBRULE(this.lineEnd);
      this.SUBRULE(this.systemBoundaryContent);
      this.CONSUME(End);
      this.SUBRULE2(this.lineEnd);
    });
    this.RULE("systemBoundaryName", () => {
      this.OR([
        {
          ALT: __name(() => {
            this.CONSUME(Identifier);
            this.OPTION(() => {
              this.OR2([
                {
                  ALT: __name(() => {
                    this.CONSUME(LeftParen);
                    this.SUBRULE(this.nodeLabel);
                    this.CONSUME(RightParen);
                  }, "ALT")
                },
                {
                  ALT: __name(() => {
                    this.CONSUME(LeftBracket);
                    this.SUBRULE2(this.nodeLabel);
                    this.CONSUME(RightBracket);
                  }, "ALT")
                }
              ]);
            });
          }, "ALT")
        },
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkdownString), "ALT") }
      ]);
    });
    this.RULE("systemBoundaryContent", () => {
      this.MANY(() => {
        this.OR([
          { ALT: __name(() => this.SUBRULE(this.blankLine), "ALT") },
          { ALT: __name(() => this.SUBRULE(this.commentLine), "ALT") },
          { ALT: __name(() => this.SUBRULE(this.boundaryElement), "ALT") }
        ]);
      });
    });
    this.RULE("boundaryElement", () => {
      this.OR([
        { ALT: __name(() => this.SUBRULE(this.actorDeclarationOnly), "ALT") },
        {
          ALT: __name(() => {
            this.SUBRULE(this.entityName);
            this.SUBRULE(this.lineEnd);
          }, "ALT")
        }
      ]);
    });
    this.RULE("metadataAssignmentStatement", () => {
      this.SUBRULE(this.metadataAssignmentTarget);
      this.SUBRULE(this.metadata);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("metadataAssignmentTarget", () => {
      this.OR([
        { ALT: __name(() => this.CONSUME(Identifier), "ALT") },
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkdownString), "ALT") }
      ]);
    });
    this.RULE("noteStatement", () => {
      this.CONSUME(Note);
      this.CONSUME(For);
      this.CONSUME(Identifier);
      this.SUBRULE(this.nodeLabel);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("stereotype", () => {
      this.CONSUME(StereotypeStart);
      this.CONSUME(StereotypeText);
      this.CONSUME(StereotypeEnd);
    });
    this.RULE("classSuffix", () => {
      this.CONSUME(ClassSeparator);
      this.CONSUME(Identifier);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.CONSUME2(Identifier);
      });
    });
    this.RULE("jsonStatement", () => {
      this.CONSUME(JsonDeclarationStart);
      this.CONSUME(JsonObjectLiteral);
      this.OPTION(() => this.SUBRULE(this.classSuffix));
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("directionStatement", () => {
      this.CONSUME(Direction);
      this.OR([
        { ALT: __name(() => this.CONSUME(Td), "ALT") },
        { ALT: __name(() => this.CONSUME(Tb), "ALT") },
        { ALT: __name(() => this.CONSUME(Bt), "ALT") },
        { ALT: __name(() => this.CONSUME(Lr), "ALT") },
        { ALT: __name(() => this.CONSUME(Rl), "ALT") }
      ]);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("classDefStatement", () => {
      this.CONSUME(ClassDef);
      this.CONSUME(Identifier);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.CONSUME2(Identifier);
      });
      this.SUBRULE(this.styles);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("classStatement", () => {
      this.CONSUME(Class);
      this.CONSUME(Identifier);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.CONSUME2(Identifier);
      });
      this.CONSUME3(Identifier);
      this.MANY2(() => {
        this.CONSUME2(Comma);
        this.CONSUME4(Identifier);
      });
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("styleStatement", () => {
      this.CONSUME(Style);
      this.CONSUME(Identifier);
      this.SUBRULE(this.styles);
      this.SUBRULE(this.lineEnd);
    });
    this.RULE("styles", () => {
      this.SUBRULE(this.styleValue);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE2(this.styleValue);
      });
    });
    this.RULE("styleValue", () => {
      this.OR([
        { ALT: __name(() => this.CONSUME(Word), "ALT") },
        { ALT: __name(() => this.CONSUME(CssIdentifier), "ALT") },
        {
          ALT: __name(() => {
            this.CONSUME(MarkerlessSolid);
            this.CONSUME2(Word);
          }, "ALT")
        }
      ]);
      this.CONSUME(Colon);
      this.AT_LEAST_ONE(() => this.SUBRULE(this.styleComponent));
    });
    this.RULE("styleComponent", () => {
      this.OR([
        { ALT: __name(() => this.CONSUME(Word), "ALT") },
        { ALT: __name(() => this.CONSUME(PlainString), "ALT") },
        { ALT: __name(() => this.CONSUME(NumberLiteral), "ALT") },
        { ALT: __name(() => this.CONSUME(HashColor), "ALT") },
        { ALT: __name(() => this.CONSUME(CssIdentifier), "ALT") },
        { ALT: __name(() => this.CONSUME(CssEscapedComma), "ALT") },
        { ALT: __name(() => this.CONSUME(Dash), "ALT") },
        { ALT: __name(() => this.CONSUME(Dot), "ALT") },
        { ALT: __name(() => this.CONSUME(Percent), "ALT") },
        { ALT: __name(() => this.CONSUME(CssPunctuation), "ALT") },
        { ALT: __name(() => this.CONSUME(Colon), "ALT") },
        { ALT: __name(() => this.CONSUME(LeftParen), "ALT") },
        { ALT: __name(() => this.CONSUME(RightParen), "ALT") },
        { ALT: __name(() => this.CONSUME(LeftBracket), "ALT") },
        { ALT: __name(() => this.CONSUME(RightBracket), "ALT") },
        { ALT: __name(() => this.CONSUME(LeftBrace), "ALT") },
        { ALT: __name(() => this.CONSUME(RightBrace), "ALT") },
        { ALT: __name(() => this.CONSUME(At), "ALT") },
        { ALT: __name(() => this.CONSUME(MarkerlessSolid), "ALT") }
      ]);
    });
    this.performSelfAnalysis();
  }
  isMetadataAssignment() {
    const target = this.LA(1).tokenType;
    return (target === Identifier || target === PlainString || target === MarkdownString) && this.LA(2).tokenType === MetadataStart;
  }
  isStatementStart() {
    const tokenType = this.LA(1).tokenType;
    return tokenType !== EOF && tokenType !== NewLine && tokenType !== Comment;
  }
  isForbiddenPlantUmlStatement() {
    return this.LA(1).tokenType === Identifier && forbiddenPlantUmlStatements[this.LA(1).image.toLowerCase()] === true;
  }
  hasLabeledRight(allowed) {
    if (!isLabelToken(this.LA(1))) {
      return false;
    }
    for (let index = 2; ; index++) {
      const token = this.LA(index);
      if (allowed.includes(token.tokenType)) {
        return true;
      }
      if (!isLabelToken(token)) {
        return false;
      }
    }
  }
}, __name(_a, "UsecaseParser"), _a);
var usecaseParser = new UsecaseParser();
var _a2;
var UsecaseJsonError = (_a2 = class extends Error {
  constructor(message, line, column) {
    super(`${message} (line ${line}, column ${column})`);
    this.line = line;
    this.column = column;
    this.name = "UsecaseJsonError";
  }
}, __name(_a2, "UsecaseJsonError"), _a2);
var locationAtOffset = __name((text, offset, startLine, startColumn) => {
  let line = startLine;
  let column = startColumn;
  const end = Math.min(Math.max(offset, 0), text.length);
  for (let index = 0; index < end; index++) {
    const character = text[index];
    if (character === "\r") {
      line++;
      column = 1;
    } else if (character === "\n") {
      if (index === 0 || text[index - 1] !== "\r") {
        line++;
        column = 1;
      }
    } else {
      column++;
    }
  }
  return { line, column };
}, "locationAtOffset");
var locationFromErrorMessage = __name((message, text, startLine, startColumn) => {
  const position = /\bposition (\d+)\b/u.exec(message);
  if (position) {
    return locationAtOffset(text, Number.parseInt(position[1], 10), startLine, startColumn);
  }
  const localLocation = /\bline (\d+) column (\d+)\b/u.exec(message);
  if (localLocation) {
    const localLine = Number.parseInt(localLocation[1], 10);
    const localColumn = Number.parseInt(localLocation[2], 10);
    return {
      line: startLine + localLine - 1,
      column: localLine === 1 ? startColumn + localColumn - 1 : localColumn
    };
  }
  if (/unexpected end|end of json input/iu.test(message)) {
    return locationAtOffset(text, text.length, startLine, startColumn);
  }
  return void 0;
}, "locationFromErrorMessage");
var _a3;
var JsonWalkError = (_a3 = class extends Error {
  constructor(offset) {
    super("Invalid JSON token");
    this.offset = offset;
  }
}, __name(_a3, "JsonWalkError"), _a3);
var _a4;
var PropertyOrderCollector = (_a4 = class {
  constructor(text) {
    this.text = text;
    this.offset = 0;
    this.propertyOrder = {};
  }
  collect() {
    this.skipWhitespace();
    this.collectValue("");
    this.skipWhitespace();
    if (this.offset !== this.text.length) {
      throw new JsonWalkError(this.offset);
    }
    return this.propertyOrder;
  }
  collectValue(pointer) {
    this.skipWhitespace();
    const character = this.text[this.offset];
    if (character === "{") {
      this.collectObject(pointer);
    } else if (character === "[") {
      this.collectArray(pointer);
    } else if (character === '"') {
      this.readString(false);
    } else if (character === "t") {
      this.consumeLiteral("true");
    } else if (character === "f") {
      this.consumeLiteral("false");
    } else if (character === "n") {
      this.consumeLiteral("null");
    } else if (character === "-" || character >= "0" && character <= "9") {
      this.consumeNumber();
    } else {
      throw new JsonWalkError(this.offset);
    }
  }
  collectObject(pointer) {
    this.offset++;
    const order = [];
    const seen = /* @__PURE__ */ new Set();
    this.propertyOrder[pointer] = order;
    this.skipWhitespace();
    if (this.text[this.offset] === "}") {
      this.offset++;
      return;
    }
    while (this.offset < this.text.length) {
      if (this.text[this.offset] !== '"') {
        throw new JsonWalkError(this.offset);
      }
      const property2 = this.readString(true);
      const propertyPointer = `${pointer}/${property2.replaceAll("~", "~0").replaceAll("/", "~1")}`;
      if (seen.has(property2)) {
        this.deletePointerSubtree(propertyPointer);
      } else {
        seen.add(property2);
        order.push(property2);
      }
      this.skipWhitespace();
      if (this.text[this.offset] !== ":") {
        throw new JsonWalkError(this.offset);
      }
      this.offset++;
      this.collectValue(propertyPointer);
      this.skipWhitespace();
      if (this.text[this.offset] === "}") {
        this.offset++;
        return;
      }
      if (this.text[this.offset] !== ",") {
        throw new JsonWalkError(this.offset);
      }
      this.offset++;
      this.skipWhitespace();
    }
    throw new JsonWalkError(this.offset);
  }
  collectArray(pointer) {
    this.offset++;
    this.skipWhitespace();
    if (this.text[this.offset] === "]") {
      this.offset++;
      return;
    }
    let index = 0;
    while (this.offset < this.text.length) {
      this.collectValue(`${pointer}/${index}`);
      index++;
      this.skipWhitespace();
      if (this.text[this.offset] === "]") {
        this.offset++;
        return;
      }
      if (this.text[this.offset] !== ",") {
        throw new JsonWalkError(this.offset);
      }
      this.offset++;
      this.skipWhitespace();
    }
    throw new JsonWalkError(this.offset);
  }
  readString(decode) {
    this.offset++;
    let value = "";
    while (this.offset < this.text.length) {
      const characterOffset = this.offset;
      const character = this.text[this.offset++];
      if (character === '"') {
        return value;
      }
      if (character.charCodeAt(0) < 32) {
        throw new JsonWalkError(characterOffset);
      }
      if (character !== "\\") {
        if (decode) {
          value += character;
        }
        continue;
      }
      const escapeOffset = this.offset;
      const escape2 = this.text[this.offset++];
      switch (escape2) {
        case '"':
        case "\\":
        case "/":
          if (decode) {
            value += escape2;
          }
          break;
        case "b":
          if (decode) {
            value += "\b";
          }
          break;
        case "f":
          if (decode) {
            value += "\f";
          }
          break;
        case "n":
          if (decode) {
            value += "\n";
          }
          break;
        case "r":
          if (decode) {
            value += "\r";
          }
          break;
        case "t":
          if (decode) {
            value += "	";
          }
          break;
        case "u": {
          const codeUnit = this.text.slice(this.offset, this.offset + 4);
          if (!/^[\dA-Fa-f]{4}$/u.test(codeUnit)) {
            throw new JsonWalkError(this.offset);
          }
          if (decode) {
            value += String.fromCharCode(Number.parseInt(codeUnit, 16));
          }
          this.offset += 4;
          break;
        }
        default:
          throw new JsonWalkError(escapeOffset);
      }
    }
    throw new JsonWalkError(this.offset);
  }
  consumeLiteral(literal) {
    let index = 0;
    for (const element of literal) {
      if (this.text[this.offset + index] !== element) {
        throw new JsonWalkError(this.offset + index);
      }
      index++;
    }
    this.offset += literal.length;
  }
  consumeNumber() {
    if (this.text[this.offset] === "-") {
      this.offset++;
    }
    if (this.text[this.offset] === "0") {
      this.offset++;
    } else if (this.text[this.offset] >= "1" && this.text[this.offset] <= "9") {
      while (this.text[this.offset] >= "0" && this.text[this.offset] <= "9") {
        this.offset++;
      }
    } else {
      throw new JsonWalkError(this.offset);
    }
    if (this.text[this.offset] === ".") {
      this.offset++;
      if (this.text[this.offset] < "0" || this.text[this.offset] > "9") {
        throw new JsonWalkError(this.offset);
      }
      while (this.text[this.offset] >= "0" && this.text[this.offset] <= "9") {
        this.offset++;
      }
    }
    if (this.text[this.offset] === "e" || this.text[this.offset] === "E") {
      this.offset++;
      if (this.text[this.offset] === "+" || this.text[this.offset] === "-") {
        this.offset++;
      }
      if (this.text[this.offset] < "0" || this.text[this.offset] > "9") {
        throw new JsonWalkError(this.offset);
      }
      while (this.text[this.offset] >= "0" && this.text[this.offset] <= "9") {
        this.offset++;
      }
    }
  }
  skipWhitespace() {
    while (this.offset < this.text.length) {
      const character = this.text[this.offset];
      if (character !== " " && character !== "	" && character !== "\n" && character !== "\r") {
        return;
      }
      this.offset++;
    }
  }
  deletePointerSubtree(pointer) {
    const descendantPrefix = `${pointer}/`;
    for (const existingPointer of Object.keys(this.propertyOrder)) {
      if (existingPointer === pointer || existingPointer.startsWith(descendantPrefix)) {
        delete this.propertyOrder[existingPointer];
      }
    }
  }
}, __name(_a4, "PropertyOrderCollector"), _a4);
function parseOrderedJsonObject(jsonText, startLine, startColumn) {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    let location = locationFromErrorMessage(message, jsonText, startLine, startColumn);
    if (!location) {
      let invalidOffset = 0;
      try {
        new PropertyOrderCollector(jsonText).collect();
      } catch (walkError) {
        if (walkError instanceof JsonWalkError) {
          invalidOffset = walkError.offset;
        }
      }
      location = locationAtOffset(jsonText, invalidOffset, startLine, startColumn);
    }
    throw new UsecaseJsonError(`Invalid JSON: ${message}`, location.line, location.column);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new UsecaseJsonError("JSON value must have an object root", startLine, startColumn);
  }
  return {
    value: parsed,
    propertyOrder: new PropertyOrderCollector(jsonText).collect()
  };
}
__name(parseOrderedJsonObject, "parseOrderedJsonObject");
var actorNode = __name((actor) => ({
  shape: actor.type === "normal" ? "actor" : actor.type === "hollow" ? "actor-hollow" : actor.type === "awesome" ? "actor-awesome" : "actor-icon",
  ...actor.label === actor.id ? {} : { label: actor.label },
  ...actor.classes.length ? { classes: [...actor.classes] } : {},
  ...actor.styles.length ? { styles: [...actor.styles] } : {},
  attrs: {
    kind: "actor",
    actorType: actor.type,
    business: actor.business,
    labelType: actor.labelType,
    ...actor.icon ? { icon: actor.icon } : {},
    ...actor.stereotype ? { stereotype: actor.stereotype } : {},
    ...actor.parentId ? { parentId: actor.parentId } : {}
  }
}), "actorNode");
var useCaseNode = __name((useCase) => ({
  shape: useCase.shape,
  ...useCase.label === useCase.id ? {} : { label: useCase.label },
  ...useCase.classes.length ? { classes: [...useCase.classes] } : {},
  ...useCase.styles.length ? { styles: [...useCase.styles] } : {},
  attrs: {
    kind: "usecase",
    useCaseShape: useCase.shape,
    business: useCase.business,
    labelType: useCase.labelType,
    ...useCase.stereotype ? { stereotype: useCase.stereotype } : {},
    ...useCase.parentId ? { parentId: useCase.parentId } : {}
  }
}), "useCaseNode");
var noteNode = __name((note) => ({
  label: note.label,
  shape: "note",
  attrs: { kind: "note", target: note.target, labelType: note.labelType }
}), "noteNode");
var jsonNode = __name((json) => ({
  label: json.id,
  shape: "json-table",
  ...json.classes.length ? { classes: [...json.classes] } : {},
  ...json.styles.length ? { styles: [...json.styles] } : {},
  attrs: { kind: "json", value: json.value, propertyOrder: json.propertyOrder, labelType: "text" }
}), "jsonNode");
var relationshipEdge = __name((relationship) => ({
  id: relationship.id,
  source: relationship.source,
  target: relationship.target,
  ...relationship.label ? { label: relationship.label } : {},
  ...relationship.classes.length ? { classes: [...relationship.classes] } : {},
  ...relationship.styles.length ? { styles: [...relationship.styles] } : {},
  attrs: {
    relationshipType: relationship.type,
    arrowType: relationship.arrowType,
    minlen: relationship.minlen,
    explicitId: relationship.explicitId,
    animate: relationship.animate,
    ...relationship.animation ? { animation: relationship.animation } : {},
    ...relationship.labelType ? { labelType: relationship.labelType } : {}
  }
}), "relationshipEdge");
var noteEdge = __name((note) => ({
  id: `${note.id}-edge`,
  source: note.id,
  target: note.target,
  attrs: {
    relationshipType: "note",
    arrowType: ARROW_TYPE.LINE_SOLID,
    pattern: "dotted",
    minlen: 1,
    explicitId: false,
    animate: false,
    internal: true
  }
}), "noteEdge");
var buildUsecaseGraphAST = __name((model, source, headerSpan, statements) => {
  const nodes = {};
  for (const actor of model.getActors().values()) {
    nodes[actor.id] = actorNode(actor);
  }
  for (const useCase of model.getUseCases().values()) {
    nodes[useCase.id] = useCaseNode(useCase);
  }
  for (const note of model.getNotes().values()) {
    nodes[note.id] = noteNode(note);
  }
  for (const json of model.getJsonNodes().values()) {
    nodes[json.id] = jsonNode(json);
  }
  const groups = {};
  for (const boundary of model.getSystemBoundaries().values()) {
    groups[boundary.id] = {
      ...boundary.label === boundary.id ? {} : { title: boundary.label },
      nodes: [...boundary.members],
      ...boundary.classes.length ? { classes: [...boundary.classes] } : {},
      ...boundary.styles.length ? { styles: [...boundary.styles] } : {},
      attrs: {
        kind: "systemBoundary",
        boundaryType: boundary.type,
        labelType: boundary.labelType
      }
    };
  }
  const classDefs = {};
  for (const definition of model.getClassDefs().values()) {
    classDefs[definition.id] = { styles: [...definition.styles] };
  }
  const direction = model.getDirection();
  return {
    version: 1,
    diagramType: "usecase",
    source,
    header: {
      keyword: "usecase",
      direction: direction === "TD" ? "TB" : direction,
      span: headerSpan
    },
    ...model.getAccTitle() ? { accTitle: model.getAccTitle() } : {},
    ...model.getAccDescription() ? { accDescr: model.getAccDescription() } : {},
    nodes,
    edges: [
      ...model.getRelationships().map(relationshipEdge),
      ...[...model.getNotes().values()].map(noteEdge)
    ],
    groups,
    classDefs,
    statements
  };
}, "buildUsecaseGraphAST");
var locationText = __name((location) => `line ${location.line}, column ${location.column} [${location.span[0]},${location.span[1]})`, "locationText");
var labelSuffix = __name((label) => label === void 0 ? "" : ` (label "${label}")`, "labelSuffix");
var generatedFrom = __name((origin) => origin.generated ? origin.label : void 0, "generatedFrom");
var pushUnique = __name((target, values2) => {
  for (const value of values2) {
    if (!target.includes(value)) {
      target.push(value);
    }
  }
}, "pushUnique");
var _a5;
var UsecaseModelBuilder = (_a5 = class {
  constructor(db2) {
    this.db = db2;
    this.source = "";
    this.statements = [];
    this.elements = [];
    this.boundaries = [];
    this.jsonDrafts = [];
    this.relationshipDrafts = [];
    this.noteDrafts = [];
    this.metadataAssignments = [];
    this.classAssignments = [];
    this.styleAssignments = [];
    this.classDefinitions = [];
    this.directions = [];
    this.model = db2.createModel();
  }
  reset(source) {
    this.model = this.db.createModel();
    this.source = source;
    this.statements = [];
    this.elements.length = 0;
    this.boundaries.length = 0;
    this.jsonDrafts.length = 0;
    this.relationshipDrafts.length = 0;
    this.noteDrafts.length = 0;
    this.metadataAssignments.length = 0;
    this.classAssignments.length = 0;
    this.styleAssignments.length = 0;
    this.classDefinitions.length = 0;
    this.directions.length = 0;
  }
  addElement(value) {
    this.elements.push(value);
  }
  addBoundary(value) {
    this.boundaries.push(value);
  }
  addJson(value) {
    this.jsonDrafts.push(value);
  }
  addRelationship(value) {
    this.relationshipDrafts.push(value);
  }
  addNote(value) {
    this.noteDrafts.push(value);
  }
  addMetadataAssignment(target, targetLocation, metadata, statement) {
    this.metadataAssignments.push({ target, targetLocation, metadata, statement });
  }
  addClassDef(ids, styles) {
    this.classDefinitions.push({ ids, styles });
  }
  addClassAssignment(targets, classes) {
    this.classAssignments.push({ targets, classes });
  }
  addStyleAssignment(target, location, styles) {
    this.styleAssignments.push({ target, location, styles });
  }
  setDirection(direction) {
    this.directions.push(direction === "TD" ? "TB" : direction);
  }
  setAccTitle(title) {
    this.model.accTitle = title;
  }
  setAccDescription(description) {
    this.model.accDescription = description;
  }
  setStatements(statements) {
    this.statements = statements;
  }
  getActors() {
    return this.model.actors;
  }
  getUseCases() {
    return this.model.useCases;
  }
  getSystemBoundaries() {
    return this.model.systemBoundaries;
  }
  getRelationships() {
    return this.model.relationships;
  }
  getNotes() {
    return this.model.notes;
  }
  getJsonNodes() {
    return this.model.jsonNodes;
  }
  getClassDefs() {
    return this.model.classDefs;
  }
  getDirection() {
    return this.model.direction;
  }
  getAccTitle() {
    return this.model.accTitle;
  }
  getAccDescription() {
    return this.model.accDescription;
  }
  finalize(headerSpan) {
    const symbols = /* @__PURE__ */ new Map();
    const elements = /* @__PURE__ */ new Map();
    const boundaries = /* @__PURE__ */ new Map();
    const first2 = /* @__PURE__ */ new Map();
    for (const relation of this.relationshipDrafts) {
      this.recordFirst(first2, relation.source.id, relation.source.location.span[0]);
      this.recordFirst(first2, relation.target.id, relation.target.location.span[0]);
    }
    for (const draft of this.elements) {
      this.recordFirst(first2, draft.id, draft.location.span[0]);
    }
    for (const draft of this.boundaries) {
      this.recordFirst(first2, draft.id, draft.location.span[0]);
    }
    for (const draft of this.jsonDrafts) {
      this.recordFirst(first2, draft.id, draft.location.span[0]);
    }
    const declarations = [
      ...this.elements.map((value) => ({
        offset: value.location.span[0],
        type: "element",
        value
      })),
      ...this.boundaries.map((value) => ({
        offset: value.location.span[0],
        type: "boundary",
        value
      })),
      ...this.jsonDrafts.map((value) => ({
        offset: value.location.span[0],
        type: "json",
        value
      })),
      ...this.relationshipDrafts.filter((value) => value.explicitId).map((value) => ({
        offset: value.explicitIdLocation.span[0],
        type: "edge",
        value
      }))
    ].sort((a, b) => a.offset - b.offset);
    for (const item of declarations) {
      if (item.type === "element") {
        this.collectElement(item.value, symbols, elements);
      } else if (item.type === "boundary") {
        this.collectBoundary(item.value, symbols, boundaries);
      } else if (item.type === "json") {
        this.registerUnique(symbols, item.value.id, "json", item.value.location, false);
      } else {
        this.registerUnique(
          symbols,
          item.value.explicitId,
          "edge",
          item.value.explicitIdLocation,
          false
        );
      }
    }
    this.materializeElements(elements, first2);
    this.materializeBoundaries(boundaries, first2);
    this.materializeJson(first2);
    const edges = this.materializeRelationships(symbols, elements, first2);
    this.reorderElements(elements, first2);
    this.applyMetadataAssignments(symbols, elements, boundaries, edges);
    this.validateAndRefreshElements(elements);
    this.refreshBoundaries(boundaries, elements);
    this.materializeNotes(symbols);
    this.applyClassDefinitions();
    this.applyClassesAndStyles(symbols, edges);
    this.model.direction = this.directions.at(-1) ?? this.model.direction;
    this.model.symbols = new Map([...symbols].map(([id, origin]) => [id, origin.kind]));
    const ast = buildUsecaseGraphAST(this, this.source, headerSpan, this.statements);
    this.model.ast = ast;
    this.db.commit(this.model);
    return ast;
  }
  collectElement(draft, symbols, states) {
    const origin = symbols.get(draft.id);
    const draftLabel = generatedFrom({ generated: draft.generated, label: draft.label.text });
    if (origin && origin.kind !== draft.kind) {
      this.conflict(
        `ID '${draft.id}' is declared as both ${origin.kind} and ${draft.kind}`,
        draft.location,
        origin.location,
        draftLabel,
        generatedFrom(origin)
      );
    }
    if (origin && (origin.generated || draft.generated)) {
      this.conflict(
        `Generated ID '${draft.id}' collides with another declaration`,
        draft.location,
        origin.location,
        draftLabel,
        generatedFrom(origin)
      );
    }
    const existing = states.get(draft.id);
    if (!existing) {
      const state2 = {
        kind: draft.kind,
        id: draft.id,
        label: draft.label,
        location: draft.location,
        generated: draft.generated,
        classes: [...draft.classes],
        ...draft.parentId ? { parentId: draft.parentId, parentLocation: draft.parentLocation } : {},
        ...draft.shape ? { shape: draft.shape } : {},
        ...draft.stereotype ? { stereotype: draft.stereotype, stereotypeLocation: draft.location } : {}
      };
      this.applyDeclarationMetadata(state2, draft.metadata);
      states.set(draft.id, state2);
      symbols.set(draft.id, {
        kind: draft.kind,
        location: draft.location,
        generated: draft.generated,
        label: draft.label.text
      });
      return;
    }
    if (existing.label.text !== draft.label.text || existing.label.type !== draft.label.type) {
      this.conflict(`ID '${draft.id}' has conflicting labels`, draft.location, existing.location);
    }
    if (draft.shape && existing.shape && draft.shape !== existing.shape) {
      this.conflict(
        `Use case '${draft.id}' has conflicting shapes`,
        draft.location,
        existing.location
      );
    }
    if (draft.parentId && existing.parentId && draft.parentId !== existing.parentId) {
      this.conflict(
        `Element '${draft.id}' belongs to more than one system boundary`,
        draft.parentLocation ?? draft.location,
        existing.parentLocation ?? existing.location
      );
    }
    if (draft.stereotype && existing.stereotype && draft.stereotype !== existing.stereotype) {
      this.conflict(
        `Element '${draft.id}' has conflicting stereotypes`,
        draft.location,
        existing.stereotypeLocation ?? existing.location
      );
    }
    existing.shape ?? (existing.shape = draft.shape);
    existing.parentId ?? (existing.parentId = draft.parentId);
    existing.parentLocation ?? (existing.parentLocation = draft.parentLocation);
    existing.stereotype ?? (existing.stereotype = draft.stereotype);
    existing.stereotypeLocation ?? (existing.stereotypeLocation = draft.stereotype ? draft.location : void 0);
    pushUnique(existing.classes, draft.classes);
    this.applyDeclarationMetadata(existing, draft.metadata);
  }
  collectBoundary(draft, symbols, states) {
    const origin = symbols.get(draft.id);
    const draftLabel = generatedFrom({ generated: draft.generated, label: draft.label.text });
    if (origin && origin.kind !== "boundary") {
      this.conflict(
        `ID '${draft.id}' is declared as both ${origin.kind} and boundary`,
        draft.location,
        origin.location,
        draftLabel,
        generatedFrom(origin)
      );
    }
    if (origin && (origin.generated || draft.generated)) {
      this.conflict(
        `Generated ID '${draft.id}' collides with another declaration`,
        draft.location,
        origin.location,
        draftLabel,
        generatedFrom(origin)
      );
    }
    const existing = states.get(draft.id);
    if (existing) {
      if (existing.label.text !== draft.label.text || existing.label.type !== draft.label.type) {
        this.conflict(
          `Boundary '${draft.id}' has conflicting titles`,
          draft.location,
          existing.location
        );
      }
      pushUnique(existing.classes, draft.classes);
      return;
    }
    states.set(draft.id, {
      id: draft.id,
      label: draft.label,
      location: draft.location,
      generated: draft.generated,
      classes: [...draft.classes],
      styles: [],
      members: []
    });
    symbols.set(draft.id, {
      kind: "boundary",
      location: draft.location,
      generated: draft.generated,
      label: draft.label.text
    });
  }
  materializeElements(states, first2) {
    for (const state2 of [...states.values()].sort(
      (a, b) => (first2.get(a.id) ?? 0) - (first2.get(b.id) ?? 0)
    )) {
      this.setElementModel(state2);
    }
  }
  materializeBoundaries(states, first2) {
    for (const state2 of [...states.values()].sort(
      (a, b) => (first2.get(a.id) ?? 0) - (first2.get(b.id) ?? 0)
    )) {
      this.model.systemBoundaries.set(state2.id, {
        id: state2.id,
        label: state2.label.text,
        labelType: state2.label.type,
        type: state2.type ?? "rect",
        members: [],
        classes: [...state2.classes],
        styles: [...state2.styles]
      });
    }
  }
  materializeJson(first2) {
    for (const draft of [...this.jsonDrafts].sort(
      (a, b) => (first2.get(a.id) ?? 0) - (first2.get(b.id) ?? 0)
    )) {
      this.model.jsonNodes.set(draft.id, {
        id: draft.id,
        value: draft.value,
        propertyOrder: draft.propertyOrder,
        classes: [...draft.classes],
        styles: []
      });
    }
  }
  materializeRelationships(symbols, states, first2) {
    const edges = /* @__PURE__ */ new Map();
    let anonymous = 0;
    for (const draft of this.relationshipDrafts) {
      const sourceKind = this.resolveEndpoint(draft.source, symbols, states, first2);
      const targetKind = this.resolveEndpoint(draft.target, symbols, states, first2);
      this.validateRelationship(draft, sourceKind, targetKind, symbols);
      const id = draft.explicitId ?? `edge-${anonymous++}`;
      const relationship = {
        id,
        explicitId: Boolean(draft.explicitId),
        source: draft.source.id,
        target: draft.target.id,
        type: draft.type,
        arrowType: draft.arrowType,
        ...draft.label ? { label: draft.label.text, labelType: draft.label.type } : {},
        minlen: draft.minlen,
        classes: [],
        styles: [],
        animate: false
      };
      this.model.relationships.push(relationship);
      edges.set(id, { draft, relationship });
    }
    this.model.relationshipCounter = anonymous;
    return edges;
  }
  resolveEndpoint(endpoint, symbols, states, first2) {
    if (endpoint.classesOnReference && !endpoint.declaration) {
      throw new Error(
        `Relationship endpoint '${endpoint.id}' uses ::: without declaring the node at ${locationText(endpoint.location)}`
      );
    }
    const origin = symbols.get(endpoint.id);
    if (origin) {
      return origin.kind;
    }
    states.set(endpoint.id, {
      kind: "usecase",
      id: endpoint.id,
      label: endpoint.label,
      location: endpoint.location,
      generated: endpoint.generated,
      shape: "ellipse",
      classes: []
    });
    symbols.set(endpoint.id, {
      kind: "usecase",
      location: endpoint.location,
      generated: endpoint.generated,
      label: endpoint.label.text
    });
    this.recordFirst(first2, endpoint.id, endpoint.location.span[0]);
    return "usecase";
  }
  reorderElements(states, first2) {
    const actors = new Map(this.model.actors);
    const useCases = new Map(this.model.useCases);
    this.model.actors.clear();
    this.model.useCases.clear();
    for (const state2 of [...states.values()].sort(
      (a, b) => (first2.get(a.id) ?? 0) - (first2.get(b.id) ?? 0)
    )) {
      if (!actors.has(state2.id) && !useCases.has(state2.id)) {
        this.setElementModel(state2);
      }
      const actor = actors.get(state2.id) ?? this.model.actors.get(state2.id);
      const useCase = useCases.get(state2.id) ?? this.model.useCases.get(state2.id);
      if (actor) {
        this.model.actors.set(state2.id, actor);
      } else if (useCase) {
        this.model.useCases.set(state2.id, useCase);
      }
    }
  }
  applyMetadataAssignments(symbols, elements, boundaries, edges) {
    for (const assignment of this.metadataAssignments) {
      const origin = symbols.get(assignment.target);
      if (!origin) {
        const inferred = this.inferMetadataKind(assignment.metadata);
        throw new Error(
          `Metadata target '${assignment.target}' is unresolved${inferred ? ` (metadata implies ${inferred})` : ""} at ${locationText(assignment.targetLocation)}`
        );
      }
      if (origin.kind === "actor" || origin.kind === "usecase") {
        this.applyStandaloneElementMetadata(elements.get(assignment.target), assignment.metadata);
      } else if (origin.kind === "boundary") {
        const boundary = boundaries.get(assignment.target);
        for (const property2 of assignment.metadata.properties) {
          if (property2.key !== "type" || property2.value !== "rect" && property2.value !== "package") {
            this.invalidMetadata(assignment.target, origin.kind, property2);
          }
          boundary.type = property2.value;
        }
      } else if (origin.kind === "edge") {
        const edge = edges.get(assignment.target);
        if (!edge) {
          throw new Error(
            `Metadata target '${assignment.target}' is not an explicit edge at ${locationText(assignment.targetLocation)}`
          );
        }
        assignment.statement.kind = "edgeMetadata";
        assignment.statement.edges = [
          {
            id: assignment.target,
            span: assignment.statement.span,
            idSpan: assignment.targetLocation.span,
            ...assignment.statement.metadata ? { metadata: assignment.statement.metadata } : {}
          }
        ];
        delete assignment.statement.nodes;
        for (const property2 of assignment.metadata.properties) {
          if (property2.key === "animate" && typeof property2.value === "boolean") {
            edge.relationship.animate = property2.value;
          } else if (property2.key === "animation" && (property2.value === "fast" || property2.value === "slow")) {
            edge.relationship.animation = property2.value;
            edge.relationship.animate = true;
          } else {
            this.invalidMetadata(assignment.target, origin.kind, property2);
          }
        }
      } else {
        for (const property2 of assignment.metadata.properties) {
          this.invalidMetadata(assignment.target, origin.kind, property2);
        }
      }
    }
    for (const { relationship } of edges.values()) {
      if (relationship.animation) {
        relationship.animate = true;
      }
    }
  }
  applyStandaloneElementMetadata(state2, metadata) {
    for (const property2 of metadata.properties) {
      if (state2.kind === "actor") {
        this.applyActorProperty(state2, property2, true);
      } else if (property2.key === "business" && typeof property2.value === "boolean") {
        state2.business = property2.value;
      } else {
        this.invalidMetadata(state2.id, state2.kind, property2);
      }
    }
  }
  applyDeclarationMetadata(state2, metadata) {
    if (!metadata) {
      return;
    }
    for (const property2 of metadata.properties) {
      if (state2.kind === "actor") {
        this.applyActorProperty(state2, property2, false);
      } else if (property2.key === "business" && typeof property2.value === "boolean") {
        if (state2.business !== void 0 && state2.business !== property2.value) {
          this.conflict(
            `Use case '${state2.id}' has conflicting business metadata`,
            property2.location,
            state2.location
          );
        }
        state2.business = property2.value;
      } else {
        this.invalidMetadata(state2.id, state2.kind, property2);
      }
    }
  }
  applyActorProperty(state2, property2, replace2) {
    if (property2.key === "type" && (property2.value === "normal" || property2.value === "hollow" || property2.value === "awesome")) {
      if (!replace2 && state2.actorType !== void 0 && state2.actorType !== property2.value) {
        this.conflict(
          `Actor '${state2.id}' has conflicting type metadata`,
          property2.location,
          state2.location
        );
      }
      state2.actorType = property2.value;
    } else if (property2.key === "icon" && typeof property2.value === "string") {
      if (!replace2 && state2.icon !== void 0 && state2.icon !== property2.value) {
        this.conflict(
          `Actor '${state2.id}' has conflicting icon metadata`,
          property2.location,
          state2.location
        );
      }
      state2.icon = property2.value;
    } else if (property2.key === "business" && typeof property2.value === "boolean") {
      if (!replace2 && state2.business !== void 0 && state2.business !== property2.value) {
        this.conflict(
          `Actor '${state2.id}' has conflicting business metadata`,
          property2.location,
          state2.location
        );
      }
      state2.business = property2.value;
    } else {
      this.invalidMetadata(state2.id, state2.kind, property2);
    }
  }
  validateAndRefreshElements(states) {
    for (const state2 of states.values()) {
      const type = state2.icon ? "icon" : state2.actorType ?? "normal";
      if (state2.kind === "actor") {
        if (state2.icon && state2.actorType && state2.actorType !== "normal") {
          throw new Error(
            `Actor '${state2.id}' cannot combine icon with type '${state2.actorType}' at ${locationText(state2.location)}`
          );
        }
        if (state2.business && (type === "icon" || type === "awesome")) {
          throw new Error(
            `Business actor '${state2.id}' must use normal or hollow geometry at ${locationText(state2.location)}`
          );
        }
      } else if ((state2.shape ?? "ellipse") === "rect" && state2.business) {
        throw new Error(
          `Rectangular use case '${state2.id}' cannot be a business use case at ${locationText(state2.location)}`
        );
      }
      this.setElementModel(state2);
    }
  }
  refreshBoundaries(boundaries, elements) {
    for (const boundary of boundaries.values()) {
      boundary.members.length = 0;
    }
    for (const draft of [...this.elements].sort(
      (a, b) => a.location.span[0] - b.location.span[0]
    )) {
      if (!draft.parentId) {
        continue;
      }
      const boundary = boundaries.get(draft.parentId);
      if (!boundary) {
        throw new Error(
          `Parent boundary '${draft.parentId}' for '${draft.id}' is unresolved at ${locationText(draft.parentLocation ?? draft.location)}`
        );
      }
      if (!boundary.members.includes(draft.id)) {
        boundary.members.push(draft.id);
      }
    }
    for (const state2 of elements.values()) {
      if (state2.parentId && !boundaries.has(state2.parentId)) {
        throw new Error(
          `Parent boundary '${state2.parentId}' for '${state2.id}' is unresolved at ${locationText(state2.parentLocation ?? state2.location)}`
        );
      }
    }
    for (const state2 of boundaries.values()) {
      const model = this.model.systemBoundaries.get(state2.id);
      model.type = state2.type ?? "rect";
      model.members = [...state2.members];
      model.classes = [...state2.classes];
      model.styles = [...state2.styles];
    }
  }
  materializeNotes(symbols) {
    let counter = 0;
    for (const draft of this.noteDrafts) {
      const origin = symbols.get(draft.target);
      if (!origin) {
        throw new Error(
          `Note target '${draft.target}' is unresolved at ${locationText(draft.targetLocation)}`
        );
      }
      if (origin.kind !== "actor" && origin.kind !== "usecase") {
        this.conflict(
          `Note target '${draft.target}' must be an actor or use case, not ${origin.kind}`,
          draft.targetLocation,
          origin.location
        );
      }
      const id = `note-${counter++}`;
      this.model.notes.set(id, {
        id,
        target: draft.target,
        label: draft.label.text,
        labelType: draft.label.type
      });
    }
    this.model.noteCounter = counter;
  }
  applyClassDefinitions() {
    for (const definition of this.classDefinitions) {
      for (const id of definition.ids) {
        this.model.classDefs.set(id, { id, styles: [...definition.styles] });
      }
    }
  }
  applyClassesAndStyles(symbols, edges) {
    for (const assignment of this.classAssignments) {
      for (const target of assignment.targets) {
        pushUnique(
          this.getStylable(target.id, symbols, edges, target.location).classes,
          assignment.classes
        );
      }
    }
    for (const assignment of this.styleAssignments) {
      this.getStylable(assignment.target, symbols, edges, assignment.location).styles.push(
        ...assignment.styles
      );
    }
  }
  getStylable(id, symbols, edges, location) {
    var _a7, _b;
    const kind = (_a7 = symbols.get(id)) == null ? void 0 : _a7.kind;
    const target = kind === "actor" ? this.model.actors.get(id) : kind === "usecase" ? this.model.useCases.get(id) : kind === "boundary" ? this.model.systemBoundaries.get(id) : kind === "json" ? this.model.jsonNodes.get(id) : kind === "edge" ? (_b = edges.get(id)) == null ? void 0 : _b.relationship : void 0;
    if (!target) {
      throw new Error(
        `Class/style target '${id}' is unresolved or anonymous at ${locationText(location)}`
      );
    }
    return target;
  }
  validateRelationship(draft, sourceKind, targetKind, symbols) {
    const allowed = __name((kind) => kind === "actor" || kind === "usecase" || kind === "json", "allowed");
    if (!allowed(sourceKind)) {
      this.conflict(
        `Relationship source '${draft.source.id}' cannot be ${sourceKind}`,
        draft.source.location,
        symbols.get(draft.source.id).location
      );
    }
    if (!allowed(targetKind)) {
      this.conflict(
        `Relationship target '${draft.target.id}' cannot be ${targetKind}`,
        draft.target.location,
        symbols.get(draft.target.id).location
      );
    }
    if ((draft.type === "include" || draft.type === "extend") && (sourceKind !== "usecase" || targetKind !== "usecase")) {
      throw new Error(
        `${draft.type} relationship requires use-case endpoints at ${locationText(draft.location)}`
      );
    }
    if (draft.type === "generalization" && (sourceKind !== "actor" && sourceKind !== "usecase" || sourceKind !== targetKind)) {
      throw new Error(
        `Generalization requires actor-to-actor or use-case-to-use-case endpoints at ${locationText(draft.location)}`
      );
    }
    if (draft.type === "association" && (sourceKind === "json" || targetKind === "json") && ![0, 1, 2].includes(draft.arrowType)) {
      throw new Error(
        `JSON relationship '${draft.source.id}' to '${draft.target.id}' permits only point, reversed-point, or markerless solid association at ${locationText(draft.location)}`
      );
    }
  }
  setElementModel(state2) {
    var _a7, _b;
    if (state2.kind === "actor") {
      const type = state2.icon ? "icon" : state2.actorType ?? "normal";
      this.model.useCases.delete(state2.id);
      this.model.actors.set(state2.id, {
        id: state2.id,
        label: state2.label.text,
        labelType: state2.label.type,
        type,
        ...state2.icon ? { icon: state2.icon } : {},
        business: state2.business ?? false,
        ...state2.stereotype ? { stereotype: state2.stereotype } : {},
        ...state2.parentId ? { parentId: state2.parentId } : {},
        classes: [...state2.classes],
        styles: ((_a7 = this.model.actors.get(state2.id)) == null ? void 0 : _a7.styles) ?? []
      });
    } else {
      this.model.actors.delete(state2.id);
      this.model.useCases.set(state2.id, {
        id: state2.id,
        label: state2.label.text,
        labelType: state2.label.type,
        shape: state2.shape ?? "ellipse",
        business: state2.business ?? false,
        ...state2.stereotype ? { stereotype: state2.stereotype } : {},
        ...state2.parentId ? { parentId: state2.parentId } : {},
        classes: [...state2.classes],
        styles: ((_b = this.model.useCases.get(state2.id)) == null ? void 0 : _b.styles) ?? []
      });
    }
  }
  inferMetadataKind(metadata) {
    const possible = /* @__PURE__ */ new Set(["actor", "usecase", "boundary", "edge"]);
    for (const property2 of metadata.properties) {
      if (property2.key === "icon") {
        possible.clear();
        possible.add("actor");
      } else if (property2.key === "animate" || property2.key === "animation") {
        possible.clear();
        possible.add("edge");
      } else if (property2.key === "type") {
        possible.clear();
        if (property2.value === "rect" || property2.value === "package") {
          possible.add("boundary");
        } else if (property2.value === "normal" || property2.value === "hollow" || property2.value === "awesome") {
          possible.add("actor");
        }
      } else if (property2.key === "business") {
        possible.delete("boundary");
        possible.delete("edge");
      } else {
        return void 0;
      }
    }
    return possible.size === 1 ? [...possible][0] : void 0;
  }
  invalidMetadata(id, kind, property2) {
    throw new Error(
      `Metadata property '${property2.key}' is invalid for ${kind} '${id}' at ${locationText(property2.location)}`
    );
  }
  registerUnique(symbols, id, kind, location, generated) {
    const previous = symbols.get(id);
    if (previous) {
      this.conflict(
        `ID '${id}' is declared more than once (${previous.kind} and ${kind})`,
        location,
        previous.location,
        void 0,
        generatedFrom(previous)
      );
    }
    symbols.set(id, { kind, location, generated });
  }
  recordFirst(map2, id, offset) {
    const previous = map2.get(id);
    if (previous === void 0 || offset < previous) {
      map2.set(id, offset);
    }
  }
  conflict(message, current, previous, currentLabel, previousLabel) {
    throw new Error(
      `${message} at ${locationText(current)}${labelSuffix(currentLabel)}; previous declaration at ${locationText(previous)}${labelSuffix(previousLabel)}`
    );
  }
}, __name(_a5, "UsecaseModelBuilder"), _a5);
var BaseVisitor = usecaseParser.getBaseCstVisitorConstructor();
var _a6;
var UsecaseVisitor = (_a6 = class extends BaseVisitor {
  constructor() {
    super();
    this.builder = new UsecaseModelBuilder(db);
    this.source = "";
    this.anonymousEdge = 0;
    this.anonymousNote = 0;
    this.validateVisitor();
  }
  build(cst, source) {
    this.source = source;
    this.parentBoundary = void 0;
    this.anonymousEdge = 0;
    this.anonymousNote = 0;
    this.builder.reset(source);
    this.visit(cst);
  }
  start(ctx) {
    const header = this.tokens(ctx, "USECASE")[0];
    const statements = [];
    for (const line of this.nodes(ctx, "line")) {
      statements.push(this.visit(line));
    }
    this.builder.setStatements(statements);
    this.builder.finalize(this.tokenSpan(header));
  }
  line(ctx) {
    const child = this.firstNode(ctx, "blankLine", "commentLine", "statement");
    return this.wrap(child, this.visit(child));
  }
  statement(ctx) {
    return this.visit(
      this.firstNode(
        ctx,
        "accTitleStatement",
        "accDescrStatement",
        "directionStatement",
        "actorStatement",
        "systemBoundaryStatement",
        "noteStatement",
        "jsonStatement",
        "classDefStatement",
        "classStatement",
        "styleStatement",
        "metadataAssignmentStatement",
        "entityStatement"
      )
    );
  }
  lineEnd(_ctx) {
    return void 0;
  }
  blankLine(ctx) {
    return { kind: "blank", span: this.tokenSpan(this.tokens(ctx, "NEWLINE")[0]) };
  }
  commentLine(ctx) {
    return { kind: "comment", span: this.tokenSpan(this.tokens(ctx, "COMMENT")[0]) };
  }
  accTitleStatement(ctx) {
    const image = this.tokens(ctx, "ACC_TITLE_LINE")[0].image;
    this.builder.setAccTitle(image.slice(image.indexOf(":") + 1).trim());
    return { kind: "accTitle", span: [0, 0] };
  }
  accDescrStatement(ctx) {
    const line = this.tokens(ctx, "ACC_DESCR_LINE")[0];
    const block = this.tokens(ctx, "ACC_DESCR_BLOCK")[0];
    const description = line ? line.image.slice(line.image.indexOf(":") + 1).trim() : block.image.slice(block.image.indexOf("{") + 1, block.image.lastIndexOf("}")).trim();
    this.builder.setAccDescription(description);
    return { kind: "accDescr", span: [0, 0] };
  }
  actorStatement(ctx) {
    const nodes = this.nodes(ctx, "actorItem");
    const items = nodes.map((node) => this.visit(node));
    const relationNode = this.nodes(ctx, "relationTail")[0];
    const occurrences = items.map((item, index) => this.actorOccurrence(nodes[index], item, true));
    for (const item of items) {
      this.builder.addElement(this.actorDraft(item));
    }
    if (!relationNode) {
      return { kind: "node", span: [0, 0], nodes: occurrences };
    }
    const relation = this.visit(relationNode);
    if (relation.target.explicitDeclaration) {
      this.builder.addElement(this.entityDraft(relation.target));
    }
    const draft = this.relationshipDraft(items[0], relation, this.nodeLocation(relationNode));
    this.builder.addRelationship(draft);
    const id = draft.explicitId ?? `edge-${this.anonymousEdge++}`;
    occurrences.push(
      this.entityOccurrence(
        this.nodes(relationNode.children, "entityName")[0],
        relation.target,
        relation.target.explicitDeclaration
      )
    );
    return {
      kind: "edge",
      span: [0, 0],
      nodes: occurrences,
      edges: [
        {
          id,
          span: [0, 0],
          ...draft.explicitIdLocation ? { idSpan: draft.explicitIdLocation.span } : {},
          ...draft.label ? { labelSpan: draft.label.span } : {}
        }
      ]
    };
  }
  actorItem(ctx) {
    const base = this.visit(this.nodes(ctx, "actorName")[0]);
    const metadataNode = this.nodes(ctx, "metadata")[0];
    const stereotypeNode = this.nodes(ctx, "stereotype")[0];
    const classNode = this.nodes(ctx, "classSuffix")[0];
    const classes = classNode ? this.visit(classNode) : { classes: [], spans: [] };
    return {
      ...base,
      ...metadataNode ? { metadata: this.visit(metadataNode) } : {},
      ...stereotypeNode ? { stereotype: this.visit(stereotypeNode) } : {},
      classes: classes.classes,
      classSpans: classes.spans
    };
  }
  actorName(ctx) {
    const identifier = this.tokens(ctx, "IDENTIFIER")[0];
    const string = this.tokens(ctx, "PLAIN_STRING")[0] ?? this.tokens(ctx, "MARKDOWN_STRING")[0];
    if (identifier) {
      const labelNode = this.nodes(ctx, "nodeLabel")[0];
      const label2 = labelNode ? this.visit(labelNode) : this.tokenLabel(identifier);
      return {
        id: identifier.image,
        label: label2,
        location: this.tokenLocation(identifier),
        generated: false,
        classes: [],
        classSpans: []
      };
    }
    const label = this.tokenLabel(string);
    return {
      id: this.generateId(label.text),
      label,
      location: this.tokenLocation(string),
      generated: true,
      classes: [],
      classSpans: []
    };
  }
  actorDeclarationOnly(ctx) {
    const nodes = this.nodes(ctx, "actorItem");
    const items = nodes.map((node) => this.visit(node));
    for (const item of items) {
      this.builder.addElement(this.actorDraft(item));
    }
    return {
      kind: "node",
      span: [0, 0],
      nodes: items.map((item, index) => this.actorOccurrence(nodes[index], item, true))
    };
  }
  entityStatement(ctx) {
    const entityNodes = this.nodes(ctx, "entityName");
    const source = this.visit(entityNodes[0]);
    const relationNode = this.nodes(ctx, "relationTail")[0];
    if (!relationNode) {
      source.explicitDeclaration = true;
      source.shape ?? (source.shape = "ellipse");
      this.builder.addElement(this.entityDraft(source));
      return {
        kind: "node",
        span: [0, 0],
        nodes: [this.entityOccurrence(entityNodes[0], source, true)]
      };
    }
    if (source.explicitDeclaration) {
      this.builder.addElement(this.entityDraft(source));
    }
    const relation = this.visit(relationNode);
    if (relation.target.explicitDeclaration) {
      this.builder.addElement(this.entityDraft(relation.target));
    }
    const draft = {
      source: this.endpoint(source),
      target: this.endpoint(relation.target),
      location: this.nodeLocation(relationNode),
      ...relation.explicitId ? { explicitId: relation.explicitId, explicitIdLocation: relation.explicitIdLocation } : {},
      ...relation.arrow
    };
    this.builder.addRelationship(draft);
    const id = draft.explicitId ?? `edge-${this.anonymousEdge++}`;
    return {
      kind: "edge",
      span: [0, 0],
      nodes: [
        this.entityOccurrence(entityNodes[0], source, source.explicitDeclaration),
        this.entityOccurrence(
          this.nodes(relationNode.children, "entityName")[0],
          relation.target,
          relation.target.explicitDeclaration
        )
      ],
      edges: [
        {
          id,
          span: [0, 0],
          ...draft.explicitIdLocation ? { idSpan: draft.explicitIdLocation.span } : {},
          ...draft.label ? { labelSpan: draft.label.span } : {}
        }
      ]
    };
  }
  entityName(ctx) {
    const identifier = this.tokens(ctx, "IDENTIFIER")[0];
    const string = this.tokens(ctx, "PLAIN_STRING")[0] ?? this.tokens(ctx, "MARKDOWN_STRING")[0];
    const labelNode = this.nodes(ctx, "nodeLabel")[0];
    const metadataNode = this.nodes(ctx, "useCaseMetadata")[0];
    const stereotypeNode = this.nodes(ctx, "stereotype")[0];
    const classNode = this.nodes(ctx, "classSuffix")[0];
    const classes = classNode ? this.visit(classNode) : { classes: [], spans: [] };
    if (identifier) {
      const label2 = labelNode ? this.visit(labelNode) : this.tokenLabel(identifier);
      const shape = labelNode ? this.tokens(ctx, "LBRACKET").length ? "rect" : "ellipse" : void 0;
      return {
        id: identifier.image,
        label: label2,
        location: this.tokenLocation(identifier),
        generated: false,
        ...shape ? { shape } : {},
        ...metadataNode ? { metadata: this.visit(metadataNode) } : {},
        ...stereotypeNode ? { stereotype: this.visit(stereotypeNode) } : {},
        classes: classes.classes,
        classSpans: classes.spans,
        explicitDeclaration: Boolean(shape || metadataNode || stereotypeNode)
      };
    }
    const label = this.tokenLabel(string);
    return {
      id: this.generateId(label.text),
      label,
      location: this.tokenLocation(string),
      generated: true,
      ...metadataNode ? { metadata: this.visit(metadataNode) } : {},
      ...stereotypeNode ? { stereotype: this.visit(stereotypeNode) } : {},
      classes: classes.classes,
      classSpans: classes.spans,
      explicitDeclaration: Boolean(metadataNode || stereotypeNode)
    };
  }
  nodeLabel(ctx) {
    const tokens = this.allTokens(ctx);
    if (tokens.length === 1 && (tokens[0].tokenType.name === "PLAIN_STRING" || tokens[0].tokenType.name === "MARKDOWN_STRING")) {
      return this.tokenLabel(tokens[0]);
    }
    const span = [
      tokens[0].startOffset,
      (tokens.at(-1).endOffset ?? tokens.at(-1).startOffset) + 1
    ];
    return { text: this.source.slice(span[0], span[1]), type: "text", span };
  }
  useCaseMetadata(ctx) {
    return this.visit(this.nodes(ctx, "metadata")[0]);
  }
  relationTail(ctx) {
    const explicitId = this.tokens(ctx, "IDENTIFIER")[0];
    return {
      ...explicitId ? { explicitId: explicitId.image, explicitIdLocation: this.tokenLocation(explicitId) } : {},
      arrow: this.visit(this.nodes(ctx, "arrow")[0]),
      target: this.visit(this.nodes(ctx, "entityName")[0])
    };
  }
  arrow(ctx) {
    return this.visit(
      this.firstNode(
        ctx,
        "semanticRelation",
        "forwardSolidOperator",
        "backwardSolidOperator",
        "markerlessSolidOperator",
        "forwardCircleOperator",
        "backwardCircleOperator",
        "forwardCrossOperator",
        "backwardCrossOperator"
      )
    );
  }
  edgeLabel(ctx) {
    return this.nodeLabel(ctx);
  }
  semanticRelation(ctx) {
    if (this.tokens(ctx, "GENERALIZATION").length) {
      return { type: "generalization", arrowType: ARROW_TYPE.SOLID_ARROW, minlen: 1 };
    }
    const type = this.tokens(ctx, "INCLUDE").length ? "include" : "extend";
    const token = this.tokens(ctx, type === "include" ? "INCLUDE" : "EXTEND")[0];
    return {
      type,
      arrowType: ARROW_TYPE.SOLID_ARROW,
      label: { text: type, type: "text", span: this.tokenSpan(token) },
      minlen: 1
    };
  }
  metadata(ctx) {
    return {
      properties: this.nodes(ctx, "metadataProperty").map(
        (node) => this.visit(node)
      ),
      location: this.ctxLocation(ctx)
    };
  }
  metadataProperty(ctx) {
    const tokens = this.allTokens(ctx).filter((token) => token.tokenType.name !== "COLON");
    const keyToken = tokens[0];
    const valueToken = tokens[1];
    const value = valueToken.tokenType.name === "TRUE" ? true : valueToken.tokenType.name === "FALSE" ? false : this.decodePlain(valueToken);
    const span = [keyToken.startOffset, (valueToken.endOffset ?? valueToken.startOffset) + 1];
    return {
      key: this.decodePlain(keyToken),
      value,
      span,
      keySpan: this.contentSpan(keyToken),
      valueSpan: this.contentSpan(valueToken),
      location: this.tokenLocation(keyToken)
    };
  }
  metadataSeparator(_ctx) {
    return void 0;
  }
  systemBoundaryStatement(ctx) {
    const boundary = this.visit(this.nodes(ctx, "systemBoundaryName")[0]);
    const classNode = this.nodes(ctx, "classSuffix")[0];
    const classes = classNode ? this.visit(classNode) : { classes: [], spans: [] };
    boundary.classes = classes.classes;
    this.builder.addBoundary(boundary);
    const previous = this.parentBoundary;
    this.parentBoundary = { id: boundary.id, location: boundary.location };
    const contentNode = this.nodes(ctx, "systemBoundaryContent")[0];
    const children = contentNode ? this.visit(contentNode) : [];
    this.parentBoundary = previous;
    const end = this.tokens(ctx, "END")[0];
    const metadataNode = this.nodes(ctx, "metadata")[0];
    const metadata = metadataNode ? this.visit(metadataNode) : void 0;
    const statement = {
      kind: "group",
      span: [0, 0],
      group: boundary.id,
      idSpan: boundary.location.span,
      titleSpan: boundary.label.span,
      endSpan: this.tokenSpan(end),
      classSpans: classes.spans,
      ...metadata ? {
        metadata: metadata.properties.map(({ key, span, keySpan, valueSpan }) => ({
          key,
          span,
          keySpan,
          valueSpan
        }))
      } : {},
      ...children.length ? { children } : {}
    };
    if (metadata) {
      this.builder.addMetadataAssignment(boundary.id, boundary.location, metadata, statement);
    }
    return statement;
  }
  systemBoundaryName(ctx) {
    const identifier = this.tokens(ctx, "IDENTIFIER")[0];
    if (identifier) {
      const labelNode = this.nodes(ctx, "nodeLabel")[0];
      return {
        id: identifier.image,
        label: labelNode ? this.visit(labelNode) : this.tokenLabel(identifier),
        location: this.tokenLocation(identifier),
        generated: false,
        classes: []
      };
    }
    const token = this.tokens(ctx, "PLAIN_STRING")[0] ?? this.tokens(ctx, "MARKDOWN_STRING")[0];
    const label = this.tokenLabel(token);
    return {
      id: this.generateId(label.text),
      label,
      location: this.tokenLocation(token),
      generated: true,
      classes: []
    };
  }
  systemBoundaryContent(ctx) {
    const children = [
      ...this.nodes(ctx, "blankLine"),
      ...this.nodes(ctx, "commentLine"),
      ...this.nodes(ctx, "boundaryElement")
    ].sort((a, b) => {
      var _a7, _b;
      return (((_a7 = a.location) == null ? void 0 : _a7.startOffset) ?? 0) - (((_b = b.location) == null ? void 0 : _b.startOffset) ?? 0);
    });
    return children.map((node) => this.wrap(node, this.visit(node)));
  }
  boundaryElement(ctx) {
    const actorNode2 = this.nodes(ctx, "actorDeclarationOnly")[0];
    if (actorNode2) {
      return this.visit(actorNode2);
    }
    const entityNode = this.nodes(ctx, "entityName")[0];
    const entity = this.visit(entityNode);
    entity.explicitDeclaration = true;
    entity.shape ?? (entity.shape = "ellipse");
    this.builder.addElement(this.entityDraft(entity));
    return { kind: "node", span: [0, 0], nodes: [this.entityOccurrence(entityNode, entity, true)] };
  }
  metadataAssignmentStatement(ctx) {
    const target = this.visit(this.nodes(ctx, "metadataAssignmentTarget")[0]);
    const metadata = this.visit(this.nodes(ctx, "metadata")[0]);
    const statement = {
      kind: "metadata",
      span: [0, 0],
      nodes: [{ id: target.id, span: target.location.span, idSpan: target.location.span }],
      metadata: metadata.properties.map(({ key, span, keySpan, valueSpan }) => ({
        key,
        span,
        keySpan,
        valueSpan
      }))
    };
    this.builder.addMetadataAssignment(target.id, target.location, metadata, statement);
    return statement;
  }
  metadataAssignmentTarget(ctx) {
    const token = this.allTokens(ctx)[0];
    const label = this.tokenLabel(token);
    return {
      id: token.tokenType.name === "IDENTIFIER" ? token.image : this.generateId(label.text),
      location: this.tokenLocation(token)
    };
  }
  noteStatement(ctx) {
    const target = this.tokens(ctx, "IDENTIFIER")[0];
    const label = this.visit(this.nodes(ctx, "nodeLabel")[0]);
    this.builder.addNote({
      target: target.image,
      targetLocation: this.tokenLocation(target),
      label,
      location: this.ctxLocation(ctx)
    });
    return {
      kind: "note",
      span: [0, 0],
      ref: `note-${this.anonymousNote++}`,
      refSpan: label.span,
      nodes: [{ id: target.image, span: this.tokenSpan(target), idSpan: this.tokenSpan(target) }]
    };
  }
  stereotype(ctx) {
    const token = this.tokens(ctx, "STEREOTYPE_TEXT")[0];
    return { value: token.image.trim(), span: this.tokenSpan(token) };
  }
  classSuffix(ctx) {
    const tokens = this.tokens(ctx, "IDENTIFIER");
    return {
      classes: tokens.map((token) => token.image),
      spans: tokens.map((token) => this.tokenSpan(token))
    };
  }
  jsonStatement(ctx) {
    const start = this.tokens(ctx, "JSON_DECLARATION_START")[0];
    const literal = this.tokens(ctx, "JSON_OBJECT_LITERAL")[0];
    const match = /^json[\t ]+(\w+)/.exec(start.image);
    const id = match[1];
    const relative = match[0].length - id.length;
    const idLocation = {
      span: [start.startOffset + relative, start.startOffset + relative + id.length],
      line: start.startLine ?? 1,
      column: (start.startColumn ?? 1) + relative
    };
    const parsed = parseOrderedJsonObject(
      literal.image,
      literal.startLine ?? 1,
      literal.startColumn ?? 1
    );
    const classNode = this.nodes(ctx, "classSuffix")[0];
    const classes = classNode ? this.visit(classNode) : { classes: [], spans: [] };
    const draft = {
      id,
      value: parsed.value,
      propertyOrder: parsed.propertyOrder,
      location: idLocation,
      classes: classes.classes
    };
    this.builder.addJson(draft);
    return {
      kind: "json",
      span: [0, 0],
      nodes: [
        {
          id,
          span: idLocation.span,
          idSpan: idLocation.span,
          defines: true,
          classSpans: classes.spans
        }
      ],
      classSpans: classes.spans
    };
  }
  directionStatement(ctx) {
    const token = this.allTokens(ctx).find(
      (value) => ["TD", "TB", "BT", "RL", "LR"].includes(value.tokenType.name)
    );
    this.builder.setDirection(token.image);
    return { kind: "direction", span: [0, 0] };
  }
  classDefStatement(ctx) {
    const ids = this.tokens(ctx, "IDENTIFIER");
    const styles = this.visit(this.nodes(ctx, "styles")[0]);
    this.builder.addClassDef(
      ids.map((token) => token.image),
      styles
    );
    return { kind: "classDef", span: [0, 0], ref: ids[0].image, refSpan: this.tokenSpan(ids[0]) };
  }
  classStatement(ctx) {
    const ids = this.tokens(ctx, "IDENTIFIER");
    let split2 = 1;
    for (; split2 < ids.length; split2++) {
      const between = this.source.slice(
        (ids[split2 - 1].endOffset ?? ids[split2 - 1].startOffset) + 1,
        ids[split2].startOffset
      );
      if (!between.includes(",")) {
        break;
      }
    }
    const targets = ids.slice(0, split2).map((token) => ({ id: token.image, location: this.tokenLocation(token) }));
    const classes = ids.slice(split2).map((token) => token.image);
    this.builder.addClassAssignment(targets, classes);
    return {
      kind: "classAssign",
      span: [0, 0],
      ref: classes[0],
      refSpan: this.tokenSpan(ids[split2]),
      nodes: targets.map(({ id, location }) => ({
        id,
        span: location.span,
        idSpan: location.span
      }))
    };
  }
  styleStatement(ctx) {
    const target = this.tokens(ctx, "IDENTIFIER")[0];
    const styles = this.visit(this.nodes(ctx, "styles")[0]);
    this.builder.addStyleAssignment(target.image, this.tokenLocation(target), styles);
    return {
      kind: "style",
      span: [0, 0],
      nodes: [{ id: target.image, span: this.tokenSpan(target), idSpan: this.tokenSpan(target) }]
    };
  }
  styles(ctx) {
    return this.nodes(ctx, "styleValue").map((node) => this.visit(node));
  }
  styleValue(ctx) {
    const tokens = this.allTokens(ctx);
    const span = [
      tokens[0].startOffset,
      (tokens.at(-1).endOffset ?? tokens.at(-1).startOffset) + 1
    ];
    return this.source.slice(span[0], span[1]).replaceAll("\\,", ",");
  }
  styleComponent(ctx) {
    return this.allTokens(ctx).map((token) => token.image).join("");
  }
  forwardSolidOperator(ctx) {
    const token = this.tokens(ctx, "FORWARD_SOLID")[0];
    return {
      type: "association",
      arrowType: ARROW_TYPE.SOLID_ARROW,
      minlen: this.solidMinlen(token)
    };
  }
  backwardSolidOperator(ctx) {
    const token = this.tokens(ctx, "BACKWARD_SOLID")[0];
    const labelNode = this.nodes(ctx, "edgeLabel")[0];
    const lengthToken = labelNode ? this.tokens(ctx, "MARKERLESS_SOLID").at(-1) : token;
    return {
      type: "association",
      arrowType: ARROW_TYPE.BACK_ARROW,
      minlen: this.solidMinlen(lengthToken),
      ...labelNode ? { label: this.visit(labelNode) } : {}
    };
  }
  markerlessSolidOperator(ctx) {
    const labelNode = this.nodes(ctx, "edgeLabel")[0];
    const tokens = this.allTokens(ctx);
    if (!labelNode) {
      return {
        type: "association",
        arrowType: ARROW_TYPE.LINE_SOLID,
        minlen: this.solidMinlen(this.tokens(ctx, "MARKERLESS_SOLID")[0])
      };
    }
    const last2 = tokens.at(-1);
    const arrowType = last2.tokenType.name === "FORWARD_SOLID" ? ARROW_TYPE.SOLID_ARROW : last2.tokenType.name === "FORWARD_CIRCLE" ? ARROW_TYPE.CIRCLE_ARROW : last2.tokenType.name === "FORWARD_CROSS" ? ARROW_TYPE.CROSS_ARROW : ARROW_TYPE.LINE_SOLID;
    return {
      type: "association",
      arrowType,
      label: this.visit(labelNode),
      minlen: arrowType === ARROW_TYPE.SOLID_ARROW || arrowType === ARROW_TYPE.LINE_SOLID ? this.solidMinlen(last2) : 1
    };
  }
  forwardCircleOperator(_ctx) {
    return { type: "association", arrowType: ARROW_TYPE.CIRCLE_ARROW, minlen: 1 };
  }
  backwardCircleOperator(ctx) {
    const labelNode = this.nodes(ctx, "edgeLabel")[0];
    return {
      type: "association",
      arrowType: ARROW_TYPE.CIRCLE_ARROW_REVERSED,
      minlen: 1,
      ...labelNode ? { label: this.visit(labelNode) } : {}
    };
  }
  forwardCrossOperator(_ctx) {
    return { type: "association", arrowType: ARROW_TYPE.CROSS_ARROW, minlen: 1 };
  }
  backwardCrossOperator(ctx) {
    const labelNode = this.nodes(ctx, "edgeLabel")[0];
    return {
      type: "association",
      arrowType: ARROW_TYPE.CROSS_ARROW_REVERSED,
      minlen: 1,
      ...labelNode ? { label: this.visit(labelNode) } : {}
    };
  }
  actorDraft(item) {
    return {
      id: item.id,
      kind: "actor",
      label: item.label,
      location: item.location,
      generated: item.generated,
      ...this.parentBoundary ? { parentId: this.parentBoundary.id, parentLocation: this.parentBoundary.location } : {},
      ...item.metadata ? { metadata: item.metadata } : {},
      ...item.stereotype ? { stereotype: item.stereotype.value, stereotypeSpan: item.stereotype.span } : {},
      classes: item.classes
    };
  }
  entityDraft(entity) {
    return {
      id: entity.id,
      kind: "usecase",
      label: entity.label,
      location: entity.location,
      generated: entity.generated,
      ...this.parentBoundary ? { parentId: this.parentBoundary.id, parentLocation: this.parentBoundary.location } : {},
      ...entity.shape ? { shape: entity.shape } : {},
      ...entity.metadata ? { metadata: entity.metadata } : {},
      ...entity.stereotype ? { stereotype: entity.stereotype.value, stereotypeSpan: entity.stereotype.span } : {},
      classes: entity.classes
    };
  }
  endpoint(entity, declaration = entity.explicitDeclaration ?? true) {
    return {
      id: entity.id,
      label: entity.label,
      location: entity.location,
      generated: entity.generated,
      declaration,
      classesOnReference: entity.classes.length > 0
    };
  }
  relationshipDraft(source, tail2, location) {
    return {
      source: this.endpoint(source, true),
      target: this.endpoint(tail2.target),
      location,
      ...tail2.explicitId ? { explicitId: tail2.explicitId, explicitIdLocation: tail2.explicitIdLocation } : {},
      ...tail2.arrow
    };
  }
  actorOccurrence(node, item, defines) {
    return {
      id: item.id,
      span: this.nodeSpan(node),
      idSpan: item.location.span,
      labelSpan: item.label.span,
      ...defines ? { defines: true } : {},
      ...item.stereotype ? { stereotypeSpan: item.stereotype.span } : {},
      ...item.metadata ? {
        metadata: item.metadata.properties.map(({ key, span, keySpan, valueSpan }) => ({
          key,
          span,
          keySpan,
          valueSpan
        }))
      } : {},
      ...item.classSpans.length ? { classSpans: item.classSpans } : {}
    };
  }
  entityOccurrence(node, item, defines) {
    return this.actorOccurrence(node, item, defines);
  }
  wrap(node, statement) {
    if (statement.kind === "blank" || statement.kind === "comment") {
      return statement;
    }
    statement.span = this.nodeSpan(node);
    for (const edge of statement.edges ?? []) {
      edge.span = statement.span;
    }
    return statement;
  }
  tokenLabel(token) {
    const type = token.tokenType.name === "MARKDOWN_STRING" ? "markdown" : "text";
    const trim2 = type === "markdown" ? 2 : token.tokenType.name === "PLAIN_STRING" ? 1 : 0;
    const span = this.tokenSpan(token, trim2);
    return { text: this.source.slice(span[0], span[1]), type, span };
  }
  decodePlain(token) {
    return token.tokenType.name === "PLAIN_STRING" ? token.image.slice(1, -1) : token.image;
  }
  contentSpan(token) {
    return this.tokenSpan(
      token,
      token.tokenType.name === "PLAIN_STRING" ? 1 : token.tokenType.name === "MARKDOWN_STRING" ? 2 : 0
    );
  }
  generateId(label) {
    return label.replace(/\W/g, "_");
  }
  solidMinlen(token) {
    var _a7;
    return Math.max(1, (((_a7 = token.image.match(/-/g)) == null ? void 0 : _a7.length) ?? 2) - 1);
  }
  nodeLocation(node) {
    const first2 = this.allTokens(node.children)[0];
    return {
      span: this.nodeSpan(node),
      line: first2.startLine ?? 1,
      column: first2.startColumn ?? 1
    };
  }
  ctxLocation(ctx) {
    const tokens = this.allTokens(ctx).filter(
      (token) => token.tokenType.name !== "NEWLINE" && token.tokenType.name !== "EOF"
    );
    const first2 = tokens[0];
    const last2 = tokens.at(-1);
    return {
      span: [
        first2.startOffset,
        Math.min(
          this.source.length,
          (last2.endOffset ?? last2.startOffset + last2.image.length - 1) + 1
        )
      ],
      line: first2.startLine ?? 1,
      column: first2.startColumn ?? 1
    };
  }
  tokenLocation(token) {
    const trim2 = token.tokenType.name === "PLAIN_STRING" ? 1 : token.tokenType.name === "MARKDOWN_STRING" ? 2 : 0;
    return {
      span: this.tokenSpan(token, trim2),
      line: token.startLine ?? 1,
      column: (token.startColumn ?? 1) + trim2
    };
  }
  nodeSpan(node) {
    const tokens = this.allTokens(node.children).filter(
      (token) => token.tokenType.name !== "NEWLINE" && token.tokenType.name !== "EOF"
    );
    const first2 = tokens[0];
    const last2 = tokens.at(-1);
    if (!first2 || !last2) {
      throw new Error("Usecase CST node has no source token");
    }
    return [
      first2.startOffset,
      Math.min(
        this.source.length,
        (last2.endOffset ?? last2.startOffset + last2.image.length - 1) + 1
      )
    ];
  }
  tokenSpan(token, trim2 = 0) {
    return [
      token.startOffset + trim2,
      Math.min(
        this.source.length,
        (token.endOffset ?? token.startOffset + token.image.length - 1) + 1 - trim2
      )
    ];
  }
  nodes(ctx, key) {
    return (ctx[key] ?? []).filter((item) => "children" in item);
  }
  tokens(ctx, key) {
    return (ctx[key] ?? []).filter((item) => "tokenTypeIdx" in item);
  }
  firstNode(ctx, ...keys2) {
    for (const key of keys2) {
      const node = this.nodes(ctx, key)[0];
      if (node) {
        return node;
      }
    }
    throw new Error(`Usecase CST is missing one of: ${keys2.join(", ")}`);
  }
  allTokens(ctx) {
    const result2 = [];
    for (const values2 of Object.values(ctx)) {
      for (const value of values2) {
        if ("tokenTypeIdx" in value) {
          result2.push(value);
        } else {
          result2.push(...this.allTokens(value.children));
        }
      }
    }
    return result2.sort((a, b) => a.startOffset - b.startOffset);
  }
}, __name(_a6, "UsecaseVisitor"), _a6);
var usecaseVisitor = new UsecaseVisitor();
var parser = {
  // eslint-disable-next-line @typescript-eslint/require-await -- normalizes synchronous parser errors into rejected promises
  parse: __name(async (input) => {
    db.clear();
    usecaseParser.input = [];
    try {
      runChevrotainParse(
        {
          diagramType: "usecase",
          lexer: usecaseLexer,
          parser: usecaseParser,
          entry: __name(() => usecaseParser.start(), "entry"),
          visit: __name((cst) => usecaseVisitor.build(cst, input), "visit")
        },
        input
      );
    } catch (error) {
      db.clear();
      const parseError = usecaseParser.errors[0];
      if (parseError) {
        const { token } = parseError;
        const start = Number.isFinite(token.startOffset) ? token.startOffset : input.length;
        const end = typeof token.endOffset === "number" && Number.isFinite(token.endOffset) ? token.endOffset + 1 : start;
        const line = token.startLine ?? input.slice(0, start).split(/\r\n|\r|\n/).length;
        const lineStart = Math.max(
          input.lastIndexOf("\n", start - 1),
          input.lastIndexOf("\r", start - 1)
        );
        const column = token.startColumn ?? start - lineStart;
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`${message} at line ${line}, column ${column} [${start},${end})`);
      }
      throw error;
    }
  }, "parse")
};
var USECASE_MARKERS = [
  "point",
  "circle",
  "cross",
  "extension"
];
var ACTOR_SHAPES = {
  usecaseActor: true,
  usecaseActorHollow: true,
  usecaseActorAwesome: true,
  usecaseActorIcon: true
};
var usecaseDomId = __name((diagramId, modelId) => {
  const [safeDiagramId, safeModelId] = [diagramId, modelId].map(
    (value) => value.replace(/[^\w-]+/g, "_").replace(/^_+|_+$/g, "") || "element"
  );
  return `usecase-${safeDiagramId}-${safeModelId}`;
}, "usecaseDomId");
var usecaseNodeDomId = __name((modelId) => `usecase-${modelId.replace(/[^\w-]+/g, "_").replace(/^_+|_+$/g, "") || "element"}`, "usecaseNodeDomId");
var getAccessibleLabel = __name((label, labelType) => {
  if (labelType !== "markdown") {
    return label;
  }
  return markdownToLines(label).map((line) => line.map((word) => word.content).join(" ")).join("\n");
}, "getAccessibleLabel");
var getUsecaseNodeAccessibleName = __name((node) => {
  const label = getAccessibleLabel(node.label ?? node.id, node.labelType);
  if (ACTOR_SHAPES[node.shape]) {
    const variant = node.actorType && node.actorType !== "normal" ? `${node.actorType} ` : "";
    const business = node.business ? "business " : "";
    const stereotype2 = node.stereotype ? `, stereotype ${node.stereotype}` : "";
    return `${business}${variant}actor ${label}${stereotype2}`;
  }
  if (node.shape === "note") {
    return `Note for ${node.noteTargetLabel ?? node.noteTarget ?? ""}: ${label}`;
  }
  if (node.shape === "usecaseJsonTable") {
    const rows = (node.jsonRows ?? []).map((row) => `${row.accessibleKey}: ${row.value}`).join("; ");
    return rows ? `${label}: ${rows}` : label;
  }
  const stereotype = node.stereotype ? `, stereotype ${node.stereotype}` : "";
  return `${node.business ? "business " : ""}use case ${label}${stereotype}`;
}, "getUsecaseNodeAccessibleName");
var getUsecaseBoundaryAccessibleName = __name((boundary) => `${boundary.boundaryType} system boundary ${getAccessibleLabel(
  boundary.label ?? boundary.id,
  boundary.labelType
)}`, "getUsecaseBoundaryAccessibleName");
var getUsecaseEdgeAccessibleName = __name((edge) => {
  if (edge.relationshipType === "note") {
    return "";
  }
  const relation = edge.relationshipType === "association" && edge.label ? `association ${getAccessibleLabel(edge.label, edge.labelType)}` : edge.relationshipType;
  return `${relation} from ${edge.sourceLabel} to ${edge.targetLabel}`;
}, "getUsecaseEdgeAccessibleName");
var escapePlainLabel = __name((label) => label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "escapePlainLabel");
var escapeMarkdownMarkers = __name((label) => label.replace(/([*[\\\]_`])/g, "\\$1"), "escapeMarkdownMarkers");
var prepareUsecaseLayoutData = __name((data, diagramId) => {
  var _a7;
  data.diagramId = diagramId;
  data.markers = [...USECASE_MARKERS];
  for (const node of data.nodes) {
    const renderingNode = node;
    renderingNode.domId = usecaseNodeDomId(node.id);
    if (node.label !== void 0 && node.labelType === "text") {
      node.label = escapePlainLabel(node.label);
    }
    if (node.stereotype) {
      node.stereotype = escapePlainLabel(node.stereotype);
    }
    if (!node.isGroup && node.shape === "usecaseJsonTable") {
      node.jsonRows = (_a7 = node.jsonRows) == null ? void 0 : _a7.map((row) => ({
        ...row,
        key: escapePlainLabel(row.key),
        value: escapePlainLabel(row.value)
      }));
    }
    if (!node.isGroup && (node.shape === "usecaseEllipse" || node.shape === "rect") && node.stereotype) {
      const label = node.label ?? escapePlainLabel(node.id);
      node.label = `«${escapeMarkdownMarkers(node.stereotype)}»<br/>${node.labelType === "text" ? escapeMarkdownMarkers(label) : label}`;
      node.labelType = "markdown";
      renderingNode.hasFoldedStereotype = true;
      delete node.stereotype;
    }
  }
  for (const edge of data.edges) {
    if (edge.label !== void 0 && edge.labelType === "text") {
      edge.label = escapePlainLabel(edge.label);
    }
  }
  return data;
}, "prepareUsecaseLayoutData");
var annotateUsecaseElements = __name((svg, data, accessibleNames) => {
  var _a7;
  for (const node of data.nodes) {
    const stableDomId = typeof node.domId === "string" ? node.domId : usecaseDomId(data.diagramId, node.id);
    const element = svg.select(`#${stableDomId}`);
    const kind = node.isGroup ? "boundary" : ACTOR_SHAPES[node.shape] ? "actor" : node.shape === "note" ? "note" : node.shape === "usecaseJsonTable" ? "json" : "usecase";
    const accessibleName = accessibleNames.nodes.get(node.id) ?? node.id;
    element.attr("data-usecase-id", node.id).attr("data-usecase-kind", kind).attr("role", "img").attr("aria-label", accessibleName);
    if (!node.isGroup && (node.shape === "usecaseEllipse" || node.shape === "rect") && "hasFoldedStereotype" in node && node.hasFoldedStereotype === true) {
      const root2 = element.node();
      const htmlLabel = root2 == null ? void 0 : root2.querySelector(".nodeLabel");
      const container = (htmlLabel == null ? void 0 : htmlLabel.querySelector("p")) ?? htmlLabel;
      const firstLabelNode = container == null ? void 0 : container.firstChild;
      if (container && (firstLabelNode == null ? void 0 : firstLabelNode.nodeType) === 3) {
        const stereotype = container.ownerDocument.createElement("span");
        stereotype.className = "usecase-stereotype";
        container.insertBefore(stereotype, firstLabelNode);
        stereotype.appendChild(firstLabelNode);
      } else {
        (_a7 = root2 == null ? void 0 : root2.querySelector(".label tspan tspan, .label tspan")) == null ? void 0 : _a7.classList.add("usecase-stereotype");
      }
    }
  }
  const edgesById = new Map(data.edges.map((edge) => [edge.id, edge]));
  svg.selectAll('path[data-et="edge"]').each(function() {
    const edge = edgesById.get(this.getAttribute("data-id") ?? "");
    if (!edge) {
      return;
    }
    const path = select_default(this);
    path.attr("id", usecaseDomId(data.diagramId, edge.id)).attr("data-usecase-id", edge.id).attr("data-usecase-kind", edge.internal ? "note-connector" : "relationship");
    if (edge.internal) {
      path.attr("aria-hidden", "true");
    } else {
      path.attr("role", "img").attr("aria-label", accessibleNames.edges.get(edge.id) ?? edge.id);
    }
  });
}, "annotateUsecaseElements");
var applyUsecaseFonts = __name((svg, data) => {
  svg.style("--mermaid-usecase-actor-font-size", `${data.actorFontSize}px`).style("--mermaid-usecase-actor-font-family", data.actorFontFamily).style("--mermaid-usecase-actor-font-weight", data.actorFontWeight).style("--mermaid-usecase-font-size", `${data.usecaseFontSize}px`).style("--mermaid-usecase-font-family", data.usecaseFontFamily).style("--mermaid-usecase-font-weight", data.usecaseFontWeight);
}, "applyUsecaseFonts");
var draw = __name(async (_text, id, _version, diag) => {
  var _a7;
  log.info("Drawing usecase diagram (unified)", id);
  const { layout } = getConfig2();
  const usecaseDb = diag.db;
  const data4Layout = usecaseDb.getData();
  const accessibleLabels = new Map(
    data4Layout.nodes.map((node) => [
      node.id,
      getAccessibleLabel(node.label ?? node.id, node.labelType)
    ])
  );
  const accessibleNames = {
    nodes: new Map(
      data4Layout.nodes.map((node) => [
        node.id,
        node.isGroup ? getUsecaseBoundaryAccessibleName(node) : getUsecaseNodeAccessibleName(
          node.shape === "note" ? { ...node, noteTargetLabel: accessibleLabels.get(node.noteTarget ?? "") } : node
        )
      ])
    ),
    edges: new Map(
      data4Layout.edges.map((edge) => [
        edge.id,
        getUsecaseEdgeAccessibleName({
          ...edge,
          sourceLabel: accessibleLabels.get(edge.source) ?? edge.sourceLabel,
          targetLabel: accessibleLabels.get(edge.target) ?? edge.targetLabel
        })
      ])
    )
  };
  const svg = getDiagramElement(id, data4Layout.config.securityLevel);
  data4Layout.layoutAlgorithm = getRegisteredLayoutAlgorithm(layout);
  prepareUsecaseLayoutData(data4Layout, id);
  applyUsecaseFonts(svg, data4Layout);
  await render(data4Layout, svg);
  annotateUsecaseElements(svg, data4Layout, accessibleNames);
  const padding = data4Layout.diagramPadding;
  utils_default.insertTitle(
    svg,
    "usecaseDiagramTitleText",
    0,
    // Default title top margin
    ((_a7 = usecaseDb.getDiagramTitle) == null ? void 0 : _a7.call(usecaseDb)) ?? ""
  );
  setupViewPortForSVG(svg, padding, "usecaseDiagram", data4Layout.useMaxWidth);
  applyUsecaseFonts(svg, data4Layout);
}, "draw");
var renderer = { draw };
var roleColors = __name((options) => ({
  actorBkg: options.usecaseActorBkg ?? options.actorBkg ?? options.mainBkg,
  actorBorder: options.usecaseActorBorder ?? options.actorBorder ?? options.primaryColor,
  bkg: options.usecaseBkg ?? options.mainBkg,
  border: options.usecaseBorder ?? options.nodeBorder ?? options.primaryColor,
  boundaryBkg: options.usecaseBoundaryBkg ?? options.clusterBkg,
  boundaryBorder: options.usecaseBoundaryBorder ?? options.clusterBorder,
  includeLine: options.usecaseIncludeLine ?? options.lineColor,
  extendLine: options.usecaseExtendLine ?? options.lineColor
}), "roleColors");
var genColor = __name((options) => {
  var _a7;
  const { theme, bkgColorArray, borderColorArray } = options;
  if (!isColorTheme(theme, borderColorArray)) {
    return "";
  }
  const rotate = ((_a7 = getConfig().usecase) == null ? void 0 : _a7.colorScheme) === "rotate";
  const look = safeLook(options.look);
  const isHandDrawn = look === "handDrawn";
  const hasBkgColors = hasPalette(bkgColorArray);
  let sections = "";
  for (let i = 0; i < paletteSlotCount(borderColorArray); i++) {
    const borderColor = borderColorArray[i];
    const fill2 = hasBkgColors ? `fill: ${bkgColorArray[i % bkgColorArray.length]};` : "";
    const slot = `[data-look="${look}"][data-color-id="color-${i}"]`;
    sections += `

    & ${slot}.system-boundary rect.boundary-body,
    & ${slot}.system-boundary rect.boundary-tab,
    & ${slot}.system-boundary .boundary-body path,
    & ${slot}.system-boundary .boundary-tab path {
      stroke: ${borderColor};
      ${fill2}
    }
    `;
    if (!rotate) {
      continue;
    }
    sections += `

    /* Use case bodies -- \`.usecase-element\` covers the ellipse form, the \`[Rect]\` form and
       the business variant.

       Element selectors only, never a bare \`path\`. Under the handDrawn look roughjs draws
       the body as a *pair* of paths, an outline stroked in the border colour and a hachure
       fill stroked in the background colour, with no class to tell them apart. Stroking
       both repaints the fill lines as border colour and the shape collapses into a solid
       block -- which is what \`.usecase-element path\` did. So handDrawn bodies keep the
       theme's uniform colours, exactly as handDrawn flowchart nodes do. */
    & ${slot}.usecase-element ellipse,
    & ${slot}.usecase-element rect {
      stroke: ${borderColor};
      ${fill2}
    }

    /* The business marker is a single classed path, so it can be reached safely by name --
       without it the marker keeps the uniform border beside a palette-coloured body. No
       \`fill\`: the marker is drawn with \`fill="none"\` and has to stay that way. */
    & ${slot}.usecase-element .usecase-business-marker {
      stroke: ${borderColor};
    }

    /* Actor glyphs, mirroring the uniform rule further down. The fill goes on the glyph
       group, never on its children, so the hollow variant's own \`fill="none"\` keeps
       winning and a hollow actor stays hollow. Same reason as above for not descending
       into the handDrawn paths. */
    & ${slot}.usecase-actor .usecase-actor-shape,
    & ${slot}.usecase-actor .usecase-actor-hollow,
    & ${slot}.usecase-actor .usecase-actor-awesome,
    & ${slot}.usecase-actor .usecase-actor-icon {
      stroke: ${borderColor};
      ${fill2}
    }
${isHandDrawn ? "" : `
    /* The group rule above reaches the glyph by inheritance, which the neo look breaks: it
       ships a \`[data-look="neo"].node path { stroke }\` rule that hits the glyph's own paths,
       and a value set directly on the child always beats one inherited from the parent,
       whatever the parent rule's specificity. So name the children too.

       Emitted for every look *except* handDrawn, where roughjs draws the glyph as an
       outline path plus a hachure fill path stroked in the fill colour, indistinguishable
       in CSS -- stroking both turns a hollow actor into a solid disc. Deliberately no
       \`fill\` either way, so the hollow variant's own \`fill="none"\` keeps winning. */
    & ${slot}.usecase-actor .usecase-actor-glyph path,
    & ${slot}.usecase-actor .usecase-actor-glyph circle {
      stroke: ${borderColor};
    }
`}
    `;
  }
  return sections;
}, "genColor");
var getStyles = __name((options) => {
  const role = roleColors(options);
  const isHandDrawn = safeLook(options.look) === "handDrawn";
  return `
  ${genColor(options)}
  & .usecase-actor {
    color: ${options.actorTextColor ?? options.primaryTextColor};
  }

  & .usecase-actor-shape,
  & .usecase-actor-hollow,
  & .usecase-actor-awesome,
  & .usecase-actor-icon {
    fill: ${role.actorBkg};
    stroke: ${role.actorBorder};
    stroke-width: 2px;
  }
${isHandDrawn ? "" : `
  /* The rule above colours the glyph group and lets its children inherit, which the neo
     look breaks: it ships a \`[data-look="neo"].node path { stroke }\` rule that lands on
     the glyph's own paths, and a value set directly on a child always beats one inherited
     from its parent, whatever the parent rule's specificity. Since neo is the default look,
     without this every actor renders in the node border colour rather than the actor
     colour the rule above asks for.

     \`.node\` is in the selector to outrank that neo rule rather than tie with it: both
     would otherwise be one attribute plus one class plus one element, leaving the winner to
     depend on which stylesheet is concatenated last.

     Stroke only: the hollow variant's own \`fill="none"\` has to keep winning. */
  & .node.usecase-actor .usecase-actor-glyph path,
  & .node.usecase-actor .usecase-actor-glyph circle {
    stroke: ${role.actorBorder};
  }
`}
  & .usecase-actor .nodeLabel,
  & .actor-label {
    color: ${options.actorTextColor ?? options.primaryTextColor};
    fill: ${options.actorTextColor ?? options.primaryTextColor};
    font-family: var(--mermaid-usecase-actor-font-family, ${options.fontFamily});
    font-size: var(--mermaid-usecase-actor-font-size, 14px);
    font-weight: var(--mermaid-usecase-actor-font-weight, normal);
  }

  & .usecase-element ellipse,
  & .usecase-element rect,
  & .usecase-business ellipse,
  & .usecase-business rect {
    fill: ${role.bkg};
    stroke: ${role.border};
    stroke-width: 2px;
  }
${isHandDrawn ? "" : `
  /* The same interception the actor glyph hits, one element down: neo ships
     \`[data-look="neo"].node rect { stroke: nodeBorder }\`, which outranks the plain
     \`.usecase-element rect\` above, so a use case written in the \`[Rect]\` form kept the node
     border colour while its ellipse siblings took the role colour. An \`<ellipse>\` has no
     equivalent neo rule and is already correct; restating it here costs nothing and means
     the two forms cannot drift apart again.

     Qualified with \`[data-look]\` *and* \`.node\` to land strictly above that rule rather than
     tie with it -- on a tie the later stylesheet would win, which is how neo took this in
     the first place. Skipped under handDrawn, where roughjs draws paths and neither element
     exists. */
  & [data-look="${safeLook(options.look)}"].node.usecase-element ellipse,
  & [data-look="${safeLook(options.look)}"].node.usecase-element rect {
    fill: ${role.bkg};
    stroke: ${role.border};
  }

  /* The business marker is a \`<path>\`, so it loses to \`[data-look="neo"].node path\` the same
     way. No \`fill\`: the marker is drawn with \`fill="none"\` and has to stay that way. */
  & [data-look="${safeLook(options.look)}"].node.usecase-element .usecase-business-marker {
    stroke: ${role.border};
  }
`}
  & .usecase-element .nodeLabel,
  & .usecase-label {
    color: ${options.primaryTextColor};
    fill: ${options.primaryTextColor};
    font-family: var(--mermaid-usecase-font-family, ${options.fontFamily});
    font-size: var(--mermaid-usecase-font-size, 12px);
    font-weight: var(--mermaid-usecase-font-weight, normal);
  }

  & .usecase-stereotype,
  & .usecase-business-marker {
    color: ${options.primaryTextColor};
    fill: ${options.primaryTextColor};
    stroke: ${role.border};
  }

  & .system-boundary rect.boundary-body,
  & .system-boundary rect.boundary-tab,
  & .system-boundary-package-tab {
    fill: ${role.boundaryBkg};
    stroke: ${role.boundaryBorder};
    stroke-width: 1px;
  }

  & .system-boundary-title text {
    fill: ${options.titleColor ?? options.primaryTextColor};
  }

  /* Only the span, never the <p> inside it: the renderer puts a user-supplied
     'color' on the span, and that has to stay inheritable by its children. */
  & .system-boundary-title span {
    color: ${options.titleColor ?? options.primaryTextColor};
  }

  & .usecase-note {
    fill: ${options.noteBkgColor};
    stroke: ${options.noteBorderColor};
    color: ${options.noteTextColor};
  }

  & .usecase-note .nodeLabel {
    color: ${options.noteTextColor};
    fill: ${options.noteTextColor};
  }

  & .usecase-json-table,
  & .usecase-json-table rect,
  & .usecase-json-cell {
    fill: ${options.mainBkg};
    stroke: ${options.nodeBorder ?? options.primaryColor};
  }

  & .usecase-json-title,
  & .usecase-json-key,
  & .usecase-json-value {
    color: ${options.primaryTextColor};
    fill: ${options.primaryTextColor};
  }

  & .relationship {
    fill: none;
    stroke: ${options.lineColor};
  }

  & .relationship-include,
  & .relationship-extend,
  & .relationship-note {
    stroke-dasharray: 3;
  }

  /* Include and extend are both dashed, which is a weak distinction at small sizes. The
     tokens default to \`lineColor\`, so a theme that does not set them is unchanged. */
  & .relationship-include {
    stroke: ${role.includeLine};
  }

  & .relationship-extend {
    stroke: ${role.extendLine};
  }

  & .relationship.edge-animation-fast,
  & .relationship.edge-animation-slow {
    stroke-linecap: round;
  }

  & .edgeLabel,
  & .edgeLabel p {
    background-color: ${options.edgeLabelBackground};
  }

  & .labelBkg {
    background-color: ${options.edgeLabelBackground};
    padding: 0 2px;
  }

  & .edgeLabel .label rect {
    fill: ${options.edgeLabelBackground};
  }

  & .relationship-label,
  & .edgeLabel {
    color: ${options.primaryTextColor};
    fill: ${options.primaryTextColor};
    font-family: ${options.fontFamily};
    font-size: 10px;
    font-weight: normal;
  }

  & .marker,
  & .marker.point,
  & .marker.circle,
  & .marker.cross {
    fill: ${options.lineColor};
    stroke: ${options.lineColor};
  }

  & .marker.extension {
    fill: ${options.mainBkg};
    stroke: ${options.lineColor};
  }
`;
}, "getStyles");
var styles_default = getStyles;
var diagram = {
  parser,
  db,
  renderer,
  styles: styles_default
};
export {
  diagram
};
/*! Bundled license information:

lodash-es/lodash.default.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=usecaseDiagram-POWQR4AR-5OBWZP3M.js.map
