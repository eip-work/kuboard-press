import {
  require_dist
} from "./chunk-OV74MRCE.js";
import {
  assignWithDepth_default,
  common_default,
  detectType,
  directiveRegex,
  sanitizeDirective
} from "./chunk-MLEFVBYW.js";
import {
  basisClosed_default,
  basisOpen_default,
  basis_default,
  bumpX,
  bumpY,
  bundle_default,
  cardinalClosed_default,
  cardinalOpen_default,
  cardinal_default,
  catmullRomClosed_default,
  catmullRomOpen_default,
  catmullRom_default,
  linearClosed_default,
  linear_default,
  log,
  monotoneX,
  monotoneY,
  natural_default,
  select_default,
  stepAfter,
  stepBefore,
  step_default
} from "./chunk-3OLEAA6P.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import {
  __toESM
} from "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function isPrimitive(value) {
  return value == null || typeof value !== "object" && typeof value !== "function";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function getTag(value) {
  if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
  return Object.prototype.toString.call(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var regexpTag = "[object RegExp]";
var stringTag = "[object String]";
var numberTag = "[object Number]";
var booleanTag = "[object Boolean]";
var argumentsTag = "[object Arguments]";
var symbolTag = "[object Symbol]";
var dateTag = "[object Date]";
var mapTag = "[object Map]";
var setTag = "[object Set]";
var arrayTag = "[object Array]";
var functionTag = "[object Function]";
var arrayBufferTag = "[object ArrayBuffer]";
var objectTag = "[object Object]";
var errorTag = "[object Error]";
var dataViewTag = "[object DataView]";
var uint8ArrayTag = "[object Uint8Array]";
var uint8ClampedArrayTag = "[object Uint8ClampedArray]";
var uint16ArrayTag = "[object Uint16Array]";
var uint32ArrayTag = "[object Uint32Array]";
var bigUint64ArrayTag = "[object BigUint64Array]";
var int8ArrayTag = "[object Int8Array]";
var int16ArrayTag = "[object Int16Array]";
var int32ArrayTag = "[object Int32Array]";
var bigInt64ArrayTag = "[object BigInt64Array]";
var float32ArrayTag = "[object Float32Array]";
var float64ArrayTag = "[object Float64Array]";

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isArray.mjs
function isArray(value) {
  return Array.isArray(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function isTypedArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isTypedArray.mjs
function isTypedArray2(x) {
  return isTypedArray(x);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/clone.mjs
function clone(obj) {
  if (isPrimitive(obj)) return obj;
  const tag = getTag(obj);
  if (!isCloneableObject(obj)) return {};
  if (isArray(obj)) {
    const result3 = Array.from(obj);
    if (obj.length > 0 && typeof obj[0] === "string" && Object.hasOwn(obj, "index")) {
      result3.index = obj.index;
      result3.input = obj.input;
    }
    return result3;
  }
  if (isTypedArray2(obj)) {
    const typedArray = obj;
    const Ctor = typedArray.constructor;
    return new Ctor(typedArray.buffer, typedArray.byteOffset, typedArray.length);
  }
  if (tag === "[object ArrayBuffer]") return new ArrayBuffer(obj.byteLength);
  if (tag === "[object DataView]") {
    const dataView = obj;
    const buffer = dataView.buffer;
    const byteOffset = dataView.byteOffset;
    const byteLength = dataView.byteLength;
    const clonedBuffer = new ArrayBuffer(byteLength);
    const srcView = new Uint8Array(buffer, byteOffset, byteLength);
    new Uint8Array(clonedBuffer).set(srcView);
    return new DataView(clonedBuffer);
  }
  if (tag === "[object Boolean]" || tag === "[object Number]" || tag === "[object String]") {
    const Ctor = obj.constructor;
    const clone3 = new Ctor(obj.valueOf());
    if (tag === "[object String]") cloneStringObjectProperties(clone3, obj);
    else copyOwnProperties(clone3, obj);
    return clone3;
  }
  if (tag === "[object Date]") return new Date(Number(obj));
  if (tag === "[object RegExp]") {
    const regExp = obj;
    const clone3 = new RegExp(regExp.source, regExp.flags);
    clone3.lastIndex = regExp.lastIndex;
    return clone3;
  }
  if (tag === "[object Symbol]") return Object(Symbol.prototype.valueOf.call(obj));
  if (tag === "[object Map]") {
    const map2 = obj;
    const result3 = /* @__PURE__ */ new Map();
    map2.forEach((obj2, key) => {
      result3.set(key, obj2);
    });
    return result3;
  }
  if (tag === "[object Set]") {
    const set2 = obj;
    const result3 = /* @__PURE__ */ new Set();
    set2.forEach((obj2) => {
      result3.add(obj2);
    });
    return result3;
  }
  if (tag === "[object Arguments]") {
    const args = obj;
    const result3 = {};
    copyOwnProperties(result3, args);
    result3.length = args.length;
    result3[Symbol.iterator] = args[Symbol.iterator];
    return result3;
  }
  const result2 = {};
  copyPrototype(result2, obj);
  copyOwnProperties(result2, obj);
  copySymbolProperties(result2, obj);
  return result2;
}
function isCloneableObject(object) {
  switch (getTag(object)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag:
      return true;
    default:
      return false;
  }
}
function copyOwnProperties(target, source) {
  for (const key in source) if (Object.hasOwn(source, key)) target[key] = source[key];
}
function copySymbolProperties(target, source) {
  const symbols = Object.getOwnPropertySymbols(source);
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    if (Object.prototype.propertyIsEnumerable.call(source, symbol)) target[symbol] = source[symbol];
  }
}
function cloneStringObjectProperties(target, source) {
  const stringLength = source.valueOf().length;
  for (const key in source) if (Object.hasOwn(source, key) && (Number.isNaN(Number(key)) || Number(key) >= stringLength)) target[key] = source[key];
}
function copyPrototype(target, source) {
  const proto = Object.getPrototypeOf(source);
  if (proto !== null) {
    if (typeof source.constructor === "function") Object.setPrototypeOf(target, proto);
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/_internal/globalThis.mjs
var globalThis_ = typeof globalThis === "object" && globalThis || typeof window === "object" && window || typeof self === "object" && self || typeof global === "object" && global || /* @__PURE__ */ function() {
  return this;
}();

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function isBuffer(x) {
  return typeof globalThis_.Buffer !== "undefined" && globalThis_.Buffer.isBuffer(x);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isLength.mjs
function isLength(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function isArrayLike(value) {
  return value != null && typeof value !== "function" && isLength(value.length);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function isArguments(value) {
  return value !== null && typeof value === "object" && getTag(value) === "[object Arguments]";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/isPrototype.mjs
function isPrototype(value) {
  const constructor = value == null ? void 0 : value.constructor;
  return value === (typeof constructor === "function" ? constructor.prototype : Object.prototype);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isEmpty.mjs
function isEmpty(value) {
  if (value == null) return true;
  if (isArrayLike(value)) {
    if (typeof value.splice !== "function" && typeof value !== "string" && !isBuffer(value) && !isTypedArray2(value) && !isArguments(value)) return false;
    return value.length === 0;
  }
  if (typeof value === "object" || typeof value === "function") {
    if (value instanceof Map || value instanceof Set) return value.size === 0;
    const keys2 = Object.keys(value);
    if (isPrototype(value)) return keys2.filter((x) => x !== "constructor").length === 0;
    return keys2.length === 0;
  }
  return true;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isPlainObject.mjs
function isPlainObject(object) {
  var _a2;
  if (typeof object !== "object") return false;
  if (object == null) return false;
  if (Object.getPrototypeOf(object) === null) return true;
  if (Object.prototype.toString.call(object) !== "[object Object]") {
    const tag = object[Symbol.toStringTag];
    if (tag == null) return false;
    if (!((_a2 = Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)) == null ? void 0 : _a2.writable)) return false;
    return object.toString() === `[object ${tag}]`;
  }
  let proto = object;
  while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
  return Object.getPrototypeOf(object) === proto;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/eq.mjs
function eq(value, other) {
  return value === other || Number.isNaN(value) && Number.isNaN(other);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/noop.mjs
function noop() {
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function getSymbols(object) {
  return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function isPlainObject2(value) {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  if (!(proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null)) return false;
  return Object.prototype.toString.call(value) === "[object Object]";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function isEqualWith(a, b, areValuesEqual) {
  return isEqualWithImpl(a, b, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a, b, property2, aParent, bParent, stack, areValuesEqual) {
  const result2 = areValuesEqual(a, b, property2, aParent, bParent, stack);
  if (result2 !== void 0) return result2;
  if (typeof a === typeof b) switch (typeof a) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return a === b;
    case "number":
      return a === b || Object.is(a, b);
    case "function":
      return a === b;
    case "object":
      return areObjectsEqual(a, b, stack, areValuesEqual);
  }
  return areObjectsEqual(a, b, stack, areValuesEqual);
}
function areObjectsEqual(a, b, stack, areValuesEqual) {
  if (Object.is(a, b)) return true;
  let aTag = getTag(a);
  let bTag = getTag(b);
  if (aTag === "[object Arguments]") aTag = objectTag;
  if (bTag === "[object Arguments]") bTag = objectTag;
  if (aTag !== bTag) return false;
  switch (aTag) {
    case stringTag:
      return a.toString() === b.toString();
    case numberTag:
      return eq(a.valueOf(), b.valueOf());
    case booleanTag:
    case dateTag:
    case symbolTag:
      return Object.is(a.valueOf(), b.valueOf());
    case regexpTag:
      return a.source === b.source && a.flags === b.flags;
    case functionTag:
      return a === b;
  }
  stack = stack ?? /* @__PURE__ */ new Map();
  const aStack = stack.get(a);
  const bStack = stack.get(b);
  if (aStack != null && bStack != null) return aStack === b;
  stack.set(a, b);
  stack.set(b, a);
  try {
    switch (aTag) {
      case mapTag:
        if (a.size !== b.size) return false;
        for (const [key, value] of a.entries()) if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) return false;
        return true;
      case setTag: {
        if (a.size !== b.size) return false;
        const aValues = Array.from(a.values());
        const bValues = Array.from(b.values());
        for (let i = 0; i < aValues.length; i++) {
          const aValue = aValues[i];
          const index = bValues.findIndex((bValue) => {
            return isEqualWithImpl(aValue, bValue, void 0, a, b, stack, areValuesEqual);
          });
          if (index === -1) return false;
          bValues.splice(index, 1);
        }
        return true;
      }
      case arrayTag:
      case uint8ArrayTag:
      case uint8ClampedArrayTag:
      case uint16ArrayTag:
      case uint32ArrayTag:
      case bigUint64ArrayTag:
      case int8ArrayTag:
      case int16ArrayTag:
      case int32ArrayTag:
      case bigInt64ArrayTag:
      case float32ArrayTag:
      case float64ArrayTag:
        if (isBuffer(a) !== isBuffer(b)) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) return false;
        return true;
      case arrayBufferTag:
        if (a.byteLength !== b.byteLength) return false;
        return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
      case dataViewTag:
        if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) return false;
        return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
      case errorTag:
        return a.name === b.name && a.message === b.message;
      case objectTag: {
        if (!(areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) || isPlainObject2(a) && isPlainObject2(b))) return false;
        const aKeys = [...Object.keys(a), ...getSymbols(a)];
        const bKeys = [...Object.keys(b), ...getSymbols(b)];
        if (aKeys.length !== bKeys.length) return false;
        for (let i = 0; i < aKeys.length; i++) {
          const propKey = aKeys[i];
          const aProp = a[propKey];
          if (!Object.hasOwn(b, propKey)) return false;
          const bProp = b[propKey];
          if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    stack.delete(a);
    stack.delete(b);
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isEqual.mjs
function isEqual(a, b) {
  return isEqualWith(a, b, noop);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/castArray.mjs
function castArray(value) {
  if (arguments.length === 0) return [];
  return Array.isArray(value) ? value : [value];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/chunk.mjs
function chunk(arr, size2) {
  if (!Number.isInteger(size2) || size2 <= 0) throw new Error("Size must be an integer greater than zero.");
  const chunkLength = Math.ceil(arr.length / size2);
  const result2 = Array(chunkLength);
  for (let index = 0; index < chunkLength; index++) {
    const start = index * size2;
    const end = start + size2;
    result2[index] = arr.slice(start, end);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/toArray.mjs
function toArray(value) {
  return Array.isArray(value) ? value : Array.from(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/chunk.mjs
function chunk2(arr, size2 = 1) {
  size2 = Math.max(Math.floor(size2), 0);
  if (size2 === 0 || !isArrayLike(arr) || Number.isNaN(size2)) return [];
  const array = toArray(arr);
  if (array.length === 0) return [];
  if (!isFinite(size2)) return [array];
  return chunk(array, size2);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/compact.mjs
function compact(arr) {
  const result2 = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item) result2.push(item);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/compact.mjs
function compact2(arr) {
  if (!isArrayLike(arr)) return [];
  return compact(Array.from(arr));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/flatten.mjs
function flatten(arr, depth = 1) {
  const result2 = [];
  const flooredDepth = Math.floor(depth);
  const recursive = (arr2, currentDepth) => {
    for (let i = 0; i < arr2.length; i++) {
      const item = arr2[i];
      if (Array.isArray(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
      else result2.push(item);
    }
  };
  recursive(arr, 0);
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/concat.mjs
function concat(...values2) {
  return flatten(values2);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isSymbol.mjs
function isSymbol(value) {
  return typeof value === "symbol" || value instanceof Symbol;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toString.mjs
function toString(value) {
  if (value == null) return "";
  return baseToString(value);
}
function baseToString(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(baseToString).join(",");
  if (isSymbol(value)) return value.toString();
  const result2 = value + "";
  if (result2 === "0" && Object.is(Number(value), -0)) return "-0";
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/toKey.mjs
function toKey(value) {
  var _a2;
  if (typeof value === "string" || typeof value === "symbol") return value;
  if (Object.is((_a2 = value == null ? void 0 : value.valueOf) == null ? void 0 : _a2.call(value), -0)) return "-0";
  return String(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toPath.mjs
function toPath(deepKey) {
  if (Array.isArray(deepKey)) return deepKey.map(toKey);
  if (typeof deepKey === "symbol") return [deepKey];
  deepKey = toString(deepKey);
  const result2 = [];
  const length = deepKey.length;
  if (length === 0) return result2;
  let index = 0;
  let key = "";
  let quoteChar = "";
  let bracket = false;
  let bracketHadQuote = false;
  const bracketNumberRegex = /^-?\d+(?:\.\d+)?$/;
  if (deepKey.charCodeAt(0) === 46) result2.push("");
  while (index < length) {
    const char = deepKey[index];
    if (quoteChar) if (char === "\\" && index + 1 < length) {
      index++;
      key += deepKey[index];
    } else if (char === quoteChar) quoteChar = "";
    else key += char;
    else if (bracket) if (char === '"' || char === "'") {
      quoteChar = char;
      bracketHadQuote = true;
    } else if (char === "]") {
      bracket = false;
      if (!bracketHadQuote && key.includes(".") && !bracketNumberRegex.test(key)) {
        const segments = key.split(".");
        for (let i = 0; i < segments.length; i++) if (segments[i] !== "") result2.push(segments[i]);
      } else result2.push(key);
      key = "";
    } else key += char;
    else if (char === "[") {
      bracket = true;
      bracketHadQuote = false;
      if (key) {
        result2.push(key);
        key = "";
      }
    } else if (char === ".") {
      if (key) {
        result2.push(key);
        key = "";
      }
      const next = deepKey[index + 1];
      if (next === void 0 || next === ".") result2.push("");
    } else key += char;
    index++;
  }
  if (key) result2.push(key);
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function isUnsafeProperty(key) {
  return key === "__proto__";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/isDeepKey.mjs
var regexIsDeepProp = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function isDeepKey(key) {
  switch (typeof key) {
    case "number":
    case "symbol":
      return false;
    case "string":
      if (key === "" || key.startsWith(".") || key.endsWith(".")) return false;
      return regexIsDeepProp.test(key);
    default:
      return false;
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/get.mjs
function get(object, path, defaultValue) {
  if (object == null) return defaultValue;
  switch (typeof path) {
    case "string": {
      if (isUnsafeProperty(path)) return defaultValue;
      const result2 = object[path];
      if (result2 === void 0) if (isDeepKey(path) && !Object.hasOwn(object, path)) return get(object, toPath(path), defaultValue);
      else return defaultValue;
      return result2;
    }
    case "number":
    case "symbol": {
      if (typeof path === "number") path = toKey(path);
      const result2 = object[path];
      if (result2 === void 0) return defaultValue;
      return result2;
    }
    default: {
      if (Array.isArray(path)) return getWithPath(object, path, defaultValue);
      if (Object.is(path == null ? void 0 : path.valueOf(), -0)) path = "-0";
      else path = String(path);
      if (isUnsafeProperty(path)) return defaultValue;
      const result2 = object[path];
      if (result2 === void 0) return defaultValue;
      return result2;
    }
  }
}
function getWithPath(object, path, defaultValue) {
  if (path.length === 0) return defaultValue;
  let current = object;
  for (let index = 0; index < path.length; index++) {
    if (current == null) return defaultValue;
    if (isUnsafeProperty(path[index])) return defaultValue;
    current = current[path[index]];
  }
  if (current === void 0) return defaultValue;
  return current;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/property.mjs
function property(path) {
  return function(object) {
    return get(object, path);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isObject.mjs
function isObject(value) {
  return value !== null && (typeof value === "object" || typeof value === "function");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isMatchWith.mjs
function isMatchWith(target, source, compare) {
  if (typeof compare !== "function") return isMatchWith(target, source, () => void 0);
  return isMatchWithInternal(target, source, function doesMatch(objValue, srcValue, key, object, source2, stack) {
    const isEqual2 = compare(objValue, srcValue, key, object, source2, stack);
    if (isEqual2 !== void 0) return Boolean(isEqual2);
    return isMatchWithInternal(objValue, srcValue, doesMatch, stack, false);
  }, /* @__PURE__ */ new Map(), true);
}
function isMatchWithInternal(target, source, compare, stack, isRoot = false) {
  if (source === target) return true;
  switch (typeof source) {
    case "object":
      return isObjectMatch(target, source, compare, stack, isRoot);
    case "function":
      if (Object.keys(source).length > 0) return isMatchWithInternal(target, { ...source }, compare, stack, isRoot);
      return eq(target, source);
    default:
      if (!isObject(target)) return eq(target, source);
      if (isRoot) {
        if (typeof source === "string") return source === "";
        return true;
      }
      return eq(target, source);
  }
}
function isObjectMatch(target, source, compare, stack, isRoot = false) {
  if (source == null) return true;
  if (Array.isArray(source)) return isArrayMatch(target, source, compare, stack);
  if (source instanceof Map) return isMapMatch(target, source, compare, stack);
  if (source instanceof Set) return isSetMatch(target, source, compare, stack);
  const keys2 = Object.keys(source);
  if (target == null) return isRoot && keys2.length === 0;
  if (isRoot) {
    if (isPrimitive(target)) target = Object(target);
  } else {
    const tag = getTag(target);
    if (tag !== "[object Object]" && tag !== "[object Arguments]") return false;
  }
  if (keys2.length === 0) return true;
  if (stack == null ? void 0 : stack.has(source)) return stack.get(source) === target;
  stack == null ? void 0 : stack.set(source, target);
  try {
    for (let i = 0; i < keys2.length; i++) {
      const key = keys2[i];
      if (!(key in target)) return false;
      if (source[key] === void 0 && target[key] !== void 0) return false;
      if (source[key] === null && target[key] !== null) return false;
      if (!compare(target[key], source[key], key, target, source, stack)) return false;
    }
    return true;
  } finally {
    stack == null ? void 0 : stack.delete(source);
  }
}
function isMapMatch(target, source, compare, stack) {
  if (source.size === 0) return true;
  if (!(target instanceof Map)) return false;
  for (const [key, sourceValue] of source.entries()) if (compare(target.get(key), sourceValue, key, target, source, stack) === false) return false;
  return true;
}
function isArrayMatch(target, source, compare, stack) {
  if (source.length === 0) return true;
  if (!Array.isArray(target)) return false;
  const countedIndex = /* @__PURE__ */ new Set();
  for (let i = 0; i < source.length; i++) {
    const sourceItem = source[i];
    let found = false;
    for (let j = 0; j < target.length; j++) {
      if (countedIndex.has(j)) continue;
      const targetItem = target[j];
      let matches2 = false;
      if (compare(targetItem, sourceItem, i, target, source, stack)) matches2 = true;
      if (matches2) {
        countedIndex.add(j);
        found = true;
        break;
      }
    }
    if (!found) return false;
  }
  return true;
}
function isSetMatch(target, source, compare, stack) {
  if (source.size === 0) return true;
  if (!(target instanceof Set)) return false;
  return isArrayMatch([...target], [...source], compare, stack);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isMatch.mjs
function isMatch(target, source) {
  return isMatchWith(target, source, () => void 0);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function cloneDeepWith(obj, cloneValue) {
  return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
  const cloned = cloneValue == null ? void 0 : cloneValue(valueToClone, keyToClone, objectToClone, stack);
  if (cloned !== void 0) return cloned;
  if (isPrimitive(valueToClone)) return valueToClone;
  if (stack.has(valueToClone)) return stack.get(valueToClone);
  if (Array.isArray(valueToClone)) {
    const result2 = new Array(valueToClone.length);
    stack.set(valueToClone, result2);
    for (let i = 0; i < valueToClone.length; i++) result2[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
    if (Object.hasOwn(valueToClone, "index")) result2.index = valueToClone.index;
    if (Object.hasOwn(valueToClone, "input")) result2.input = valueToClone.input;
    return result2;
  }
  if (valueToClone instanceof Date) return new Date(valueToClone.getTime());
  if (valueToClone instanceof RegExp) {
    const result2 = new RegExp(valueToClone.source, valueToClone.flags);
    result2.lastIndex = valueToClone.lastIndex;
    return result2;
  }
  if (valueToClone instanceof Map) {
    const result2 = /* @__PURE__ */ new Map();
    stack.set(valueToClone, result2);
    for (const [key, value] of valueToClone) result2.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
    return result2;
  }
  if (valueToClone instanceof Set) {
    const result2 = /* @__PURE__ */ new Set();
    stack.set(valueToClone, result2);
    for (const value of valueToClone) result2.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
    return result2;
  }
  if (isBuffer(valueToClone)) return valueToClone.subarray();
  if (isTypedArray(valueToClone)) {
    const result2 = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
    stack.set(valueToClone, result2);
    for (let i = 0; i < valueToClone.length; i++) result2[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
    return result2;
  }
  if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && valueToClone instanceof SharedArrayBuffer) return valueToClone.slice(0);
  if (valueToClone instanceof DataView) {
    const result2 = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (typeof File !== "undefined" && valueToClone instanceof File) {
    const result2 = new File([valueToClone], valueToClone.name, { type: valueToClone.type });
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (typeof Blob !== "undefined" && valueToClone instanceof Blob) {
    const result2 = new Blob([valueToClone], { type: valueToClone.type });
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (valueToClone instanceof Error) {
    const result2 = structuredClone(valueToClone);
    stack.set(valueToClone, result2);
    result2.message = valueToClone.message;
    result2.name = valueToClone.name;
    result2.stack = valueToClone.stack;
    result2.cause = valueToClone.cause;
    result2.constructor = valueToClone.constructor;
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (valueToClone instanceof Boolean) {
    const result2 = new Boolean(valueToClone.valueOf());
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (valueToClone instanceof Number) {
    const result2 = new Number(valueToClone.valueOf());
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (valueToClone instanceof String) {
    const result2 = new String(valueToClone.valueOf());
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  if (typeof valueToClone === "object" && isCloneableObject2(valueToClone)) {
    const result2 = Object.create(Object.getPrototypeOf(valueToClone));
    stack.set(valueToClone, result2);
    copyProperties(result2, valueToClone, objectToClone, stack, cloneValue);
    return result2;
  }
  return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
  const keys2 = [...Object.keys(source), ...getSymbols(source)];
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    if (descriptor == null || descriptor.writable) target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
  }
}
function isCloneableObject2(object) {
  switch (getTag(object)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag:
      return true;
    default:
      return false;
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/cloneDeep.mjs
function cloneDeep(obj) {
  return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), void 0);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/matches.mjs
function matches(source) {
  source = cloneDeep(source);
  return (target) => {
    return isMatch(target, source);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function cloneDeepWith2(obj, customizer) {
  return cloneDeepWith(obj, (value, key, object, stack) => {
    const cloned = customizer == null ? void 0 : customizer(value, key, object, stack);
    if (cloned !== void 0) return cloned;
    if (typeof obj !== "object") return;
    if (getTag(obj) === "[object Object]" && typeof obj.constructor !== "function") {
      const result2 = {};
      stack.set(obj, result2);
      copyProperties(result2, obj, object, stack);
      return result2;
    }
    switch (Object.prototype.toString.call(obj)) {
      case numberTag:
      case stringTag:
      case booleanTag: {
        const result2 = new obj.constructor(obj == null ? void 0 : obj.valueOf());
        copyProperties(result2, obj);
        return result2;
      }
      case argumentsTag: {
        const result2 = {};
        copyProperties(result2, obj);
        result2.length = obj.length;
        result2[Symbol.iterator] = obj[Symbol.iterator];
        return result2;
      }
      default:
        return;
    }
  });
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function cloneDeep2(obj) {
  return cloneDeepWith2(obj);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/isIndex.mjs
var IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
  switch (typeof value) {
    case "number":
      return Number.isInteger(value) && value >= 0 && value < length;
    case "symbol":
      return false;
    case "string":
      return IS_UNSIGNED_INTEGER.test(value);
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/has.mjs
function has(object, path) {
  let resolvedPath;
  if (Array.isArray(path)) resolvedPath = path;
  else if (typeof path === "string" && isDeepKey(path) && !(path in Object(object))) resolvedPath = toPath(path);
  else resolvedPath = [path];
  if (resolvedPath.length === 0) return false;
  let current = object;
  for (let i = 0; i < resolvedPath.length; i++) {
    const key = toKey(resolvedPath[i]);
    if (current == null || !Object.hasOwn(current, key)) {
      if (!((Array.isArray(current) || isArguments(current)) && isIndex(key) && Number(key) < current.length)) return false;
    }
    current = current[key];
  }
  return true;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/matchesProperty.mjs
function matchesProperty(property2, source) {
  switch (typeof property2) {
    case "object":
      if (Object.is(property2 == null ? void 0 : property2.valueOf(), -0)) property2 = "-0";
      break;
    case "number":
      property2 = toKey(property2);
      break;
  }
  source = cloneDeep2(source);
  return function(target) {
    const result2 = get(target, property2);
    if (result2 === void 0) return has(target, property2);
    if (source === void 0) return result2 === void 0;
    return isMatch(result2, source);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/identity.mjs
function identity(x) {
  return x;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/iteratee.mjs
function iteratee(value) {
  if (value == null) return identity;
  switch (typeof value) {
    case "function":
      return value;
    case "object":
      if (Array.isArray(value) && value.length === 2) return matchesProperty(value[0], value[1]);
      return matches(value);
    default:
      return property(value);
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/countBy.mjs
function countBy(collection, iteratee$1) {
  if (collection == null) return {};
  const array = isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
  const mapper = iteratee(iteratee$1 ?? void 0);
  const result2 = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = mapper(item);
    result2[key] = (result2[key] ?? 0) + 1;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isArrayLikeObject.mjs
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/difference.mjs
function difference(firstArr, secondArr) {
  const secondSet = new Set(secondArr);
  return firstArr.filter((item) => !secondSet.has(item));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/normalizeZero.mjs
function normalizeZero(value) {
  return value === 0 ? 0 : value;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/difference.mjs
function difference2(arr, ...values2) {
  if (!isArrayLikeObject(arr)) return [];
  const arr1 = Array.from(arr);
  const arr2 = [];
  for (let i = 0; i < values2.length; i++) {
    const value = values2[i];
    if (isArrayLikeObject(value)) arr2.push(...Array.from(value));
  }
  return difference(arr1, arr2).map(normalizeZero);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/last.mjs
function last(arr) {
  return arr[arr.length - 1];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/last.mjs
function last2(array) {
  if (!isArrayLike(array) || array.length === 0) return;
  return last(toArray(array));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/differenceBy.mjs
function differenceBy(firstArr, secondArr, mapper) {
  const mappedSecondSet = new Set(secondArr.map((item) => mapper(item)));
  return firstArr.filter((item) => {
    return !mappedSecondSet.has(mapper(item));
  });
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/flattenArrayLike.mjs
function flattenArrayLike(values2) {
  const result2 = [];
  for (let i = 0; i < values2.length; i++) {
    const arrayLike = values2[i];
    if (!isArrayLikeObject(arrayLike)) continue;
    for (let j = 0; j < arrayLike.length; j++) result2.push(arrayLike[j]);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/differenceBy.mjs
function differenceBy2(array, ..._values) {
  if (!isArrayLikeObject(array)) return [];
  const iteratee$1 = last2(_values);
  const values2 = flattenArrayLike(_values);
  if (isArrayLikeObject(iteratee$1)) return difference(Array.from(array), values2).map(normalizeZero);
  return differenceBy(Array.from(array), values2, iteratee(iteratee$1)).map(normalizeZero);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/differenceWith.mjs
function differenceWith(firstArr, secondArr, areItemsEqual) {
  return firstArr.filter((firstItem) => {
    return secondArr.every((secondItem) => {
      return !areItemsEqual(firstItem, secondItem);
    });
  });
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/differenceWith.mjs
function differenceWith2(array, ...values2) {
  if (!isArrayLikeObject(array)) return [];
  const comparator = last2(values2);
  const flattenedValues = flattenArrayLike(values2);
  if (typeof comparator === "function") return differenceWith(Array.from(array), flattenedValues, comparator);
  return difference(Array.from(array), flattenedValues).map(normalizeZero);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toNumber.mjs
function toNumber(value) {
  if (isSymbol(value)) return NaN;
  return Number(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toFinite.mjs
function toFinite(value) {
  if (!value) return value === 0 ? value : 0;
  value = toNumber(value);
  if (value === Infinity || value === -Infinity) return (value < 0 ? -1 : 1) * Number.MAX_VALUE;
  return value === value ? value : 0;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toInteger.mjs
function toInteger(value) {
  const finite = toFinite(value);
  const remainder = finite % 1;
  return remainder ? finite - remainder : finite;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/drop.mjs
function drop(arr, itemsCount) {
  itemsCount = Math.max(itemsCount, 0);
  return arr.slice(itemsCount);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/drop.mjs
function drop2(array, itemsCount = 1, guard) {
  if (!isArrayLike(array)) return [];
  itemsCount = guard ? 1 : toInteger(itemsCount);
  return drop(toArray(array), itemsCount);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/dropRight.mjs
function dropRight(arr, itemsCount) {
  itemsCount = Math.min(-itemsCount, 0);
  if (itemsCount === 0) return arr.slice();
  return arr.slice(0, itemsCount);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/dropRight.mjs
function dropRight2(array, itemsCount = 1, guard) {
  if (!isArrayLike(array)) return [];
  itemsCount = guard ? 1 : toInteger(itemsCount);
  return dropRight(toArray(array), itemsCount);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/dropRightWhile.mjs
function dropRightWhile(arr, canContinueDropping) {
  for (let i = arr.length - 1; i >= 0; i--) if (!canContinueDropping(arr[i], i, arr)) return arr.slice(0, i + 1);
  return [];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/dropRightWhile.mjs
function dropRightWhile2(array, predicate = identity) {
  if (!isArrayLike(array)) return [];
  return dropRightWhileImpl(toArray(array), predicate);
}
function dropRightWhileImpl(arr, predicate) {
  switch (typeof predicate) {
    case "function":
      return dropRightWhile(arr, (item, index, arr2) => Boolean(predicate(item, index, arr2)));
    case "object":
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];
        return dropRightWhile(arr, matchesProperty(key, value));
      } else return dropRightWhile(arr, matches(predicate));
    case "symbol":
    case "number":
    case "string":
      return dropRightWhile(arr, property(predicate));
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/dropWhile.mjs
function dropWhile(arr, canContinueDropping) {
  const dropEndIndex = arr.findIndex((item, index, arr2) => !canContinueDropping(item, index, arr2));
  if (dropEndIndex === -1) return [];
  return arr.slice(dropEndIndex);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/dropWhile.mjs
function dropWhile2(array, predicate = identity) {
  if (!isArrayLike(array)) return [];
  return dropWhileImpl(toArray(array), predicate);
}
function dropWhileImpl(arr, predicate) {
  switch (typeof predicate) {
    case "function":
      return dropWhile(arr, (item, index, arr2) => Boolean(predicate(item, index, arr2)));
    case "object":
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];
        return dropWhile(arr, matchesProperty(key, value));
      } else return dropWhile(arr, matches(predicate));
    case "number":
    case "symbol":
    case "string":
      return dropWhile(arr, property(predicate));
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/math/range.mjs
function range(start, end, step = 1) {
  if (end == null) {
    end = start;
    start = 0;
  }
  if (!Number.isInteger(step) || step === 0) throw new Error(`The step value must be a non-zero integer.`);
  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result2 = new Array(length);
  for (let i = 0; i < length; i++) result2[i] = start + i * step;
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/forEach.mjs
function forEach(collection, callback = identity) {
  if (!collection) return collection;
  const keys2 = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value = collection[key];
    if (callback(value, key, collection) === false) break;
  }
  return collection;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/forEachRight.mjs
function forEachRight(collection, callback = identity) {
  if (!collection) return collection;
  const keys2 = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);
  for (let i = keys2.length - 1; i >= 0; i--) {
    const key = keys2[i];
    const value = collection[key];
    if (callback(value, key, collection) === false) break;
  }
  return collection;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/isIterateeCall.mjs
function isIterateeCall(value, index, object) {
  if (!isObject(object)) return false;
  if (typeof index === "number" && isArrayLike(object) && isIndex(index) && index < object.length || typeof index === "string" && index in object) return eq(object[index], value);
  return false;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/_virtual/_rolldown/runtime.mjs
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
  let target = {};
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
  if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
  return target;
};

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isString.mjs
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/fill.mjs
function fill(array, value, start = 0, end = array.length) {
  const length = array.length;
  const finalStart = Math.max(start >= 0 ? start : length + start, 0);
  const finalEnd = Math.min(end >= 0 ? end : length + end, length);
  for (let i = finalStart; i < finalEnd; i++) array[i] = value;
  return array;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/fill.mjs
function fill2(array, value, start = 0, end = array ? array.length : 0) {
  if (!isArrayLike(array)) return [];
  if (isString(array)) return array;
  if (start && typeof start !== "number" && isIterateeCall(array, value, start)) {
    start = 0;
    end = array.length;
  }
  start = toInteger(start);
  end = toInteger(end);
  if (!start) start = 0;
  if (!end) end = 0;
  return fill(array, value, start, end);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/filter.mjs
function filter(collection, predicate = identity) {
  if (!collection) return [];
  predicate = iteratee(predicate);
  if (!Array.isArray(collection)) {
    const result3 = [];
    const keys2 = Object.keys(collection);
    const length2 = isArrayLike(collection) ? collection.length : keys2.length;
    for (let i = 0; i < length2; i++) {
      const key = keys2[i];
      const value = collection[key];
      if (predicate(value, key, collection)) result3.push(value);
    }
    return result3;
  }
  const result2 = [];
  const length = collection.length;
  for (let i = 0; i < length; i++) {
    const value = collection[i];
    if (predicate(value, i, collection)) result2.push(value);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/find.mjs
function find(collection, _doesMatch = identity, fromIndex = 0) {
  if (!collection) return;
  const doesMatch = iteratee(_doesMatch);
  const keys2 = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);
  fromIndex = toInteger(fromIndex);
  if (!fromIndex) fromIndex = 0;
  if (fromIndex < 0) fromIndex = Math.max(keys2.length + fromIndex, 0);
  for (let i = fromIndex; i < keys2.length; i++) {
    const key = keys2[i];
    const value = collection[key];
    if (doesMatch(value, key, collection)) return value;
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/identity.mjs
function identity2(x) {
  return x;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/findIndex.mjs
function findIndex(arr, doesMatch = identity2, fromIndex = 0) {
  if (!arr) return -1;
  fromIndex = toInteger(fromIndex);
  if (fromIndex < 0) fromIndex = Math.max(arr.length + fromIndex, 0);
  const subArray = Array.from(arr).slice(fromIndex);
  const iteratee$1 = iteratee(doesMatch);
  const index = subArray.findIndex(iteratee$1);
  return index === -1 ? -1 : index + fromIndex;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/findLast.mjs
function findLast(collection, _doesMatch = identity, fromIndex) {
  if (!collection) return;
  const length = Array.isArray(collection) ? collection.length : Object.keys(collection).length;
  fromIndex = toInteger(fromIndex ?? length - 1);
  if (fromIndex < 0) fromIndex = Math.max(length + fromIndex, 0);
  else fromIndex = Math.min(fromIndex, length - 1);
  const doesMatch = iteratee(_doesMatch);
  if (!Array.isArray(collection)) {
    const keys2 = Object.keys(collection);
    for (let i = fromIndex; i >= 0; i--) {
      const key = keys2[i];
      const value = collection[key];
      if (doesMatch(value, key, collection)) return value;
    }
    return;
  }
  return collection.slice(0, fromIndex + 1).findLast(doesMatch);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/findLastIndex.mjs
function findLastIndex(arr, doesMatch = identity, fromIndex = arr ? arr.length - 1 : 0) {
  if (!arr) return -1;
  const index = toInteger(fromIndex);
  if (fromIndex < 0) fromIndex = Math.max(arr.length + index, 0);
  else fromIndex = Math.min(index, arr.length - 1);
  const subArray = toArray(arr).slice(0, fromIndex + 1);
  switch (typeof doesMatch) {
    case "function":
      return subArray.findLastIndex(doesMatch);
    case "object":
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];
        return subArray.findLastIndex(matchesProperty(key, value));
      } else return subArray.findLastIndex(matches(doesMatch));
    case "number":
    case "symbol":
    case "string":
      return subArray.findLastIndex(property(doesMatch));
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/head.mjs
function head(arr) {
  return arr[0];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/head.mjs
function head2(arr) {
  if (!isArrayLike(arr)) return;
  return head(toArray(arr));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/flattenDepth.mjs
function flattenDepth(array, depth = 1) {
  if (!isArrayLike(array)) return [];
  const result2 = [];
  const flooredDepth = Math.floor(depth);
  const recursive = (arr, currentDepth) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (isFlattenable(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
      else result2.push(item);
    }
  };
  recursive(Array.from(array), 0);
  return result2;
}
function isFlattenable(value) {
  return isArray(value) || isArguments(value) || Boolean(value && value[Symbol.isConcatSpreadable]);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/map.mjs
function map(collection, _iteratee = identity) {
  if (!collection) return [];
  const keys2 = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);
  const iteratee$1 = iteratee(_iteratee);
  const result2 = new Array(keys2.length);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value = collection[key];
    result2[i] = iteratee$1(value, key, collection);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/flatMapDepth.mjs
function flatMapDepth(collection, iteratee$1 = identity, depth = 1) {
  if (collection == null) return [];
  return flattenDepth(map(collection, iteratee(iteratee$1)), depth);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/flatMap.mjs
function flatMap(collection, iteratee2) {
  return flatMapDepth(collection, iteratee2, 1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/flatMapDeep.mjs
function flatMapDeep(collection, iteratee2) {
  return flatMapDepth(collection, iteratee2, Infinity);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/flatten.mjs
function flatten2(array) {
  return flattenDepth(array, 1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/flattenDeep.mjs
function flattenDeep(array) {
  return flattenDepth(array, Infinity);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/groupBy.mjs
function groupBy(arr, getKeyFromItem) {
  const result2 = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKeyFromItem(item, i, arr);
    if (!Object.hasOwn(result2, key)) result2[key] = [];
    result2[key].push(item);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/groupBy.mjs
function groupBy2(source, _getKeyFromItem = identity) {
  if (source == null) return {};
  return groupBy(isArrayLike(source) ? toArray(source) : Object.values(source), iteratee(_getKeyFromItem));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/includes.mjs
function includes(collection, target, fromIndex, guard) {
  if (collection == null) return false;
  if (guard || !fromIndex) fromIndex = 0;
  else fromIndex = toInteger(fromIndex);
  if (isString(collection)) {
    if (fromIndex > collection.length || target instanceof RegExp) return false;
    if (fromIndex < 0) fromIndex = Math.max(0, collection.length + fromIndex);
    return collection.includes(target, fromIndex);
  }
  if (Array.isArray(collection)) return collection.includes(target, fromIndex);
  if (isArrayLike(collection)) {
    if (fromIndex < 0) fromIndex = Math.max(0, collection.length + fromIndex);
    for (let i = fromIndex; i < collection.length; i++) if (eq(collection[i], target)) return true;
    return false;
  }
  const keys2 = Object.keys(collection);
  if (fromIndex < 0) fromIndex = Math.max(0, keys2.length + fromIndex);
  for (let i = fromIndex; i < keys2.length; i++) if (eq(Reflect.get(collection, keys2[i]), target)) return true;
  return false;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/indexOf.mjs
function indexOf(array, searchElement, fromIndex) {
  if (!isArrayLike(array)) return -1;
  if (Number.isNaN(searchElement)) {
    fromIndex = toInteger(fromIndex ?? 0);
    if (fromIndex < 0) fromIndex = Math.max(0, array.length + fromIndex);
    for (let i = fromIndex; i < array.length; i++) if (Number.isNaN(array[i])) return i;
    return -1;
  }
  return Array.from(array).indexOf(searchElement, fromIndex);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/initial.mjs
function initial(arr) {
  return arr.slice(0, -1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/initial.mjs
function initial2(arr) {
  if (!isArrayLike(arr)) return [];
  return initial(Array.from(arr));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/intersection.mjs
function intersection(firstArr, secondArr) {
  const secondSet = new Set(secondArr);
  return firstArr.filter((item) => secondSet.has(item));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/uniq.mjs
function uniq(arr) {
  return [...new Set(arr)];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/intersection.mjs
function intersection2(...arrays) {
  if (arrays.length === 0) return [];
  if (!isArrayLikeObject(arrays[0])) return [];
  let result2 = uniq(toArray(arrays[0]));
  for (let i = 1; i < arrays.length; i++) {
    const array = arrays[i];
    if (!isArrayLikeObject(array)) return [];
    result2 = intersection(result2, toArray(array));
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/intersectionBy.mjs
function intersectionBy(firstArr, secondArr, mapper) {
  const result2 = [];
  const mappedSecondSet = new Set(secondArr.map(mapper));
  for (let i = 0; i < firstArr.length; i++) {
    const item = firstArr[i];
    const mappedItem = mapper(item);
    if (mappedSecondSet.has(mappedItem)) {
      result2.push(item);
      mappedSecondSet.delete(mappedItem);
    }
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/uniqBy.mjs
function uniqBy(arr, mapper) {
  const map2 = /* @__PURE__ */ new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = mapper(item, i, arr);
    if (!map2.has(key)) map2.set(key, item);
  }
  return Array.from(map2.values());
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/intersectionBy.mjs
function intersectionBy2(array, ...values2) {
  if (!isArrayLikeObject(array)) return [];
  const lastValue = last(values2);
  const hasIteratee = !isArrayLikeObject(lastValue);
  const count = hasIteratee ? values2.length - 1 : values2.length;
  const mapper = hasIteratee ? iteratee(lastValue) : identity;
  const iteratee$1 = typeof lastValue === "function" ? (item) => mapper(item) : mapper;
  if (count <= 0) return uniqBy(toArray(array), iteratee$1);
  let result2 = uniq(toArray(array));
  for (let i = 0; i < count; ++i) {
    const value = values2[i];
    if (!isArrayLikeObject(value)) return [];
    result2 = intersectionBy(result2, toArray(value), iteratee$1);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/intersectionWith.mjs
function intersectionWith(firstArr, secondArr, areItemsEqual) {
  return firstArr.filter((firstItem) => {
    return secondArr.some((secondItem) => {
      return areItemsEqual(firstItem, secondItem);
    });
  });
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/uniqWith.mjs
function uniqWith(arr, areItemsEqual) {
  const result2 = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (result2.every((v) => !areItemsEqual(v, item))) result2.push(item);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/intersectionWith.mjs
function intersectionWith2(firstArr, ...otherArrs) {
  if (firstArr == null) return [];
  const _comparator = last2(otherArrs);
  let comparator = eq;
  let uniq$1 = uniq;
  if (typeof _comparator === "function") {
    comparator = _comparator;
    uniq$1 = (arr) => uniqWith(arr, comparator);
    otherArrs.pop();
  }
  let result2 = uniq$1(toArray(firstArr));
  for (let i = 0; i < otherArrs.length; ++i) {
    const otherArr = otherArrs[i];
    if (otherArr == null) return [];
    result2 = intersectionWith(result2, toArray(otherArr), comparator);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isFunction.mjs
function isFunction(value) {
  return typeof value === "function";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isNil.mjs
function isNil(x) {
  return x == null;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isArrayBuffer.mjs
function isArrayBuffer(value) {
  return value instanceof ArrayBuffer;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isDate.mjs
function isDate(value) {
  return value instanceof Date;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isIterable.mjs
function isIterable(value) {
  return value != null && typeof value[Symbol.iterator] === "function";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isMap.mjs
function isMap(value) {
  return value instanceof Map;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isNull.mjs
function isNull(x) {
  return x === null;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isRegExp.mjs
function isRegExp(value) {
  return value instanceof RegExp;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isSet.mjs
function isSet(value) {
  return value instanceof Set;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isSymbol.mjs
function isSymbol2(value) {
  return typeof value === "symbol";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isUndefined.mjs
function isUndefined(x) {
  return x === void 0;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isWeakMap.mjs
function isWeakMap(value) {
  return value instanceof WeakMap;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isWeakSet.mjs
function isWeakSet(value) {
  return value instanceof WeakSet;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/invokeMap.mjs
function invokeMap(collection, path, ...args) {
  if (isNil(collection)) return [];
  const values2 = isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
  const result2 = [];
  for (let i = 0; i < values2.length; i++) {
    const value = values2[i];
    if (isFunction(path)) {
      result2.push(path.apply(value, args));
      continue;
    }
    const method2 = get(value, path);
    let thisContext = value;
    const keys2 = Array.isArray(path) ? path : toPath(path);
    if (keys2.length > 1) thisContext = get(value, keys2.slice(0, -1));
    result2.push(method2 == null ? void 0 : method2.apply(thisContext, args));
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/join.mjs
function join(array, separator) {
  if (!isArrayLike(array)) return "";
  return Array.from(array).join(separator);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/reduce.mjs
function reduce(collection, iteratee2 = identity, accumulator) {
  const hasAccumulator = arguments.length >= 3;
  if (!collection) return accumulator;
  let keys2;
  let startIndex = 0;
  if (isArrayLike(collection)) {
    keys2 = range(0, collection.length);
    if (!hasAccumulator && collection.length > 0) {
      accumulator = collection[0];
      startIndex += 1;
    }
  } else {
    keys2 = Object.keys(collection);
    if (!hasAccumulator && keys2.length > 0) {
      accumulator = collection[keys2[0]];
      startIndex += 1;
    }
  }
  for (let i = startIndex; i < keys2.length; i++) {
    const key = keys2[i];
    const value = collection[key];
    accumulator = iteratee2(accumulator, value, key, collection);
  }
  return accumulator;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/keyBy.mjs
function keyBy(collection, iteratee$1) {
  if (!isArrayLike(collection) && !isObjectLike(collection)) return {};
  const keyFn = iteratee(iteratee$1 ?? identity);
  return reduce(collection, (result2, value) => {
    const key = keyFn(value);
    result2[key] = value;
    return result2;
  }, {});
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/lastIndexOf.mjs
function lastIndexOf(array, searchElement, fromIndex) {
  if (!isArrayLike(array) || array.length === 0) return -1;
  const length = array.length;
  let index = fromIndex === void 0 ? length - 1 : toInteger(fromIndex);
  if (fromIndex !== void 0) index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1);
  if (Number.isNaN(searchElement)) {
    for (let i = index; i >= 0; i--) if (Number.isNaN(array[i])) return i;
    return -1;
  }
  for (let i = index; i >= 0; i--) if (array[i] === searchElement) return i;
  return -1;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/nth.mjs
function nth(array, n = 0) {
  if (!isArrayLike(array) || array.length === 0) return;
  n = toInteger(n);
  if (n < 0) n += array.length;
  return array[n];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/compareValues.mjs
function getPriority(a) {
  if (typeof a === "symbol") return 1;
  if (a === null) return 2;
  if (a === void 0) return 3;
  if (a !== a) return 4;
  return 0;
}
var compareValues = (a, b, order) => {
  if (a !== b) {
    const aPriority = getPriority(a);
    const bPriority = getPriority(b);
    if (aPriority === bPriority && aPriority === 0) {
      if (a < b) return order === "desc" ? 1 : -1;
      if (a > b) return order === "desc" ? -1 : 1;
    }
    return order === "desc" ? bPriority - aPriority : aPriority - bPriority;
  }
  return 0;
};

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/isKey.mjs
var regexIsDeepProp2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var regexIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (Array.isArray(value)) return false;
  if (typeof value === "number" || typeof value === "boolean" || value == null || isSymbol(value)) return true;
  return typeof value === "string" && (regexIsPlainProp.test(value) || !regexIsDeepProp2.test(value)) || object != null && Object.hasOwn(object, value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/orderBy.mjs
function orderBy(collection, criteria, orders, guard) {
  if (collection == null) return [];
  orders = guard ? void 0 : orders;
  if (!Array.isArray(collection)) collection = isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
  if (!Array.isArray(criteria)) criteria = criteria == null ? [null] : [criteria];
  if (criteria.length === 0) criteria = [null];
  if (!Array.isArray(orders)) orders = orders == null ? [] : [orders];
  orders = orders.map((order) => String(order));
  const getValueByNestedPath = (object, path) => {
    let target = object;
    let index = 0;
    for (; index < path.length && target != null; ++index) target = target[path[index]];
    return index > 0 && index === path.length ? target : void 0;
  };
  const getValueByCriterion = (criterion, object) => {
    if (criterion == null) return object;
    if (object == null) return;
    if (typeof criterion === "object" && "key" in criterion) {
      if (Object.hasOwn(object, criterion.key)) return object[criterion.key];
      return getValueByNestedPath(object, criterion.path);
    }
    if (typeof criterion === "function") return criterion(object);
    if (Array.isArray(criterion)) return getValueByNestedPath(object, criterion);
    return object[criterion];
  };
  const preparedCriteria = criteria.map((criterion) => {
    if (Array.isArray(criterion) && criterion.length === 1) criterion = criterion[0];
    if (criterion == null || typeof criterion === "function" || Array.isArray(criterion) || isKey(criterion)) return criterion;
    return {
      key: criterion,
      path: toPath(criterion)
    };
  });
  return collection.map((item) => ({
    original: item,
    criteria: preparedCriteria.map((criterion) => getValueByCriterion(criterion, item))
  })).slice().sort((a, b) => {
    for (let i = 0; i < preparedCriteria.length; i++) {
      const comparedResult = compareValues(a.criteria[i], b.criteria[i], orders[i]);
      if (comparedResult !== 0) return comparedResult;
    }
    return 0;
  }).map((item) => item.original);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/partition.mjs
function partition(collection, predicate = identity) {
  if (!collection) return [[], []];
  const values2 = isArrayLike(collection) ? collection : Object.values(collection);
  predicate = iteratee(predicate);
  const matched = [];
  const unmatched = [];
  for (let i = 0; i < values2.length; i++) {
    const value = values2[i];
    if (predicate(value)) matched.push(value);
    else unmatched.push(value);
  }
  return [matched, unmatched];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/pull.mjs
function pull(arr, valuesToRemove) {
  const valuesSet = new Set(valuesToRemove);
  let resultIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (valuesSet.has(arr[i])) continue;
    if (!Object.hasOwn(arr, i)) {
      delete arr[resultIndex++];
      continue;
    }
    arr[resultIndex++] = arr[i];
  }
  arr.length = resultIndex;
  return arr;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/pull.mjs
function pull2(arr, ...valuesToRemove) {
  return pull(arr, valuesToRemove);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/pullAll.mjs
function pullAll(arr, valuesToRemove = []) {
  if (isNil(valuesToRemove)) return arr;
  return pull(arr, Array.from(valuesToRemove));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/pullAllBy.mjs
function pullAllBy(arr, valuesToRemove, _getValue) {
  const getValue = iteratee(_getValue);
  const valuesSet = new Set(Array.from(valuesToRemove).map((x) => getValue(x)));
  let resultIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    const value = getValue(arr[i]);
    if (valuesSet.has(value)) continue;
    if (!Object.hasOwn(arr, i)) {
      delete arr[resultIndex++];
      continue;
    }
    arr[resultIndex++] = arr[i];
  }
  arr.length = resultIndex;
  return arr;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/copyArray.mjs
function copyArray(source, array) {
  const length = source.length;
  if (array == null) array = Array(length);
  for (let i = 0; i < length; i++) array[i] = source[i];
  return array;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/pullAllWith.mjs
function pullAllWith(array, values2, comparator) {
  if ((array == null ? void 0 : array.length) == null || (values2 == null ? void 0 : values2.length) == null) return array;
  if (array === values2) values2 = copyArray(values2);
  let resultLength = 0;
  if (comparator == null) comparator = (a, b) => eq(a, b);
  const valuesArray = Array.isArray(values2) ? values2 : Array.from(values2);
  const hasUndefined = valuesArray.includes(void 0);
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      if (!valuesArray.some((value) => comparator(array[i], value))) array[resultLength++] = array[i];
      continue;
    }
    if (!hasUndefined) delete array[resultLength++];
  }
  array.length = resultLength;
  return array;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/at.mjs
function at(object, ...paths) {
  if (paths.length === 0) return [];
  const allPaths = [];
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (!isArrayLike(path) || isString(path)) {
      allPaths.push(path);
      continue;
    }
    for (let j = 0; j < path.length; j++) allPaths.push(path[j]);
  }
  const result2 = [];
  for (let i = 0; i < allPaths.length; i++) result2.push(get(object, allPaths[i]));
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/unset.mjs
function unset(obj, path) {
  if (obj == null) return true;
  switch (typeof path) {
    case "symbol":
    case "number":
    case "object":
      if (Array.isArray(path)) return unsetWithPath(obj, path);
      if (typeof path === "number") path = toKey(path);
      else if (typeof path === "object") if (Object.is(path == null ? void 0 : path.valueOf(), -0)) path = "-0";
      else path = String(path);
      if (isUnsafeProperty(path)) return false;
      if ((obj == null ? void 0 : obj[path]) === void 0) return true;
      try {
        delete obj[path];
        return true;
      } catch {
        return false;
      }
    case "string":
      if ((obj == null ? void 0 : obj[path]) === void 0 && isDeepKey(path) && !Object.hasOwn(obj, path)) return unsetWithPath(obj, toPath(path));
      if (isUnsafeProperty(path)) return false;
      try {
        delete obj[path];
        return true;
      } catch {
        return false;
      }
  }
}
function unsetWithPath(obj, path) {
  const parent = path.length === 1 ? obj : get(obj, path.slice(0, -1));
  const lastKey = path[path.length - 1];
  if ((parent == null ? void 0 : parent[lastKey]) === void 0) return true;
  if (isUnsafeProperty(lastKey)) return false;
  try {
    delete parent[lastKey];
    return true;
  } catch {
    return false;
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/pullAt.mjs
function pullAt(array, ..._indices) {
  const indices = flattenDepth(_indices, 1);
  if (!array) return Array(indices.length);
  const result2 = at(array, indices);
  const indicesToPull = indices.map((index) => isIndex(index, array.length) ? Number(index) : index).sort((a, b) => b - a);
  for (const index of new Set(indicesToPull)) {
    if (isIndex(index, array.length)) {
      Array.prototype.splice.call(array, index, 1);
      continue;
    }
    if (isKey(index, array)) {
      delete array[toKey(index)];
      continue;
    }
    unset(array, isArray(index) ? index : toPath(index));
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/reduceRight.mjs
function reduceRight(collection, iteratee2 = identity, accumulator) {
  const hasAccumulator = arguments.length >= 3;
  if (!collection) return accumulator;
  let keys2;
  let startIndex;
  if (isArrayLike(collection)) {
    keys2 = range(0, collection.length).reverse();
    if (!hasAccumulator && collection.length > 0) {
      accumulator = collection[collection.length - 1];
      startIndex = 1;
    } else startIndex = 0;
  } else {
    keys2 = Object.keys(collection).reverse();
    if (!hasAccumulator && keys2.length > 0) {
      accumulator = collection[keys2[0]];
      startIndex = 1;
    } else startIndex = 0;
  }
  for (let i = startIndex; i < keys2.length; i++) {
    const key = keys2[i];
    const value = collection[key];
    accumulator = iteratee2(accumulator, value, key, collection);
  }
  return accumulator;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/negate.mjs
function negate(func) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  return function(...args) {
    return !func.apply(this, args);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/reject.mjs
function reject(source, predicate = identity) {
  return filter(source, negate(iteratee(predicate)));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/remove.mjs
function remove(arr, shouldRemoveElement) {
  const originalArr = arr.slice();
  const removed = [];
  let resultIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (shouldRemoveElement(arr[i], i, originalArr)) {
      removed.push(arr[i]);
      continue;
    }
    if (!Object.hasOwn(arr, i)) {
      delete arr[resultIndex++];
      continue;
    }
    arr[resultIndex++] = arr[i];
  }
  arr.length = resultIndex;
  return removed;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/remove.mjs
function remove2(arr, shouldRemoveElement = identity) {
  return remove(arr, iteratee(shouldRemoveElement));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/reverse.mjs
function reverse(array) {
  if (array == null) return array;
  return Array.prototype.reverse.call(array);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/sample.mjs
function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sample.mjs
function sample2(collection) {
  if (collection == null) return;
  if (isArrayLike(collection)) return sample(toArray(collection));
  return sample(Object.values(collection));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/clamp.mjs
function clamp(value, bound1, bound2) {
  if (bound2 === void 0) {
    bound2 = bound1;
    bound1 = void 0;
  }
  if (bound2 !== void 0) {
    bound2 = toNumber(bound2);
    value = Math.min(value, Number.isNaN(bound2) ? 0 : bound2);
  }
  if (bound1 !== void 0) {
    bound1 = toNumber(bound1);
    value = Math.max(value, Number.isNaN(bound1) ? 0 : bound1);
  }
  return value;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isMap.mjs
function isMap2(value) {
  return isMap(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isSet.mjs
function isSet2(value) {
  return isSet(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toArray.mjs
function toArray2(value) {
  if (value == null) return [];
  if (isArrayLike(value) || isMap2(value) || isSet2(value)) return Array.from(value);
  if (typeof value === "object") {
    if (isIterable(value)) return Array.from(value);
    return Object.values(value);
  }
  return [];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/math/random.mjs
function random(minimum, maximum) {
  if (maximum == null) {
    maximum = minimum;
    minimum = 0;
  }
  if (minimum >= maximum) throw new Error("Invalid input: The maximum value must be greater than the minimum value.");
  return Math.random() * (maximum - minimum) + minimum;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/math/randomInt.mjs
function randomInt(minimum, maximum) {
  return Math.floor(random(minimum, maximum));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/sampleSize.mjs
function sampleSize(array, size2) {
  if (size2 > array.length) throw new Error("Size must be less than or equal to the length of array.");
  const result2 = new Array(size2);
  const selected = /* @__PURE__ */ new Set();
  for (let step = array.length - size2, resultIndex = 0; step < array.length; step++, resultIndex++) {
    let index = randomInt(0, step + 1);
    if (selected.has(index)) index = step;
    selected.add(index);
    result2[resultIndex] = array[index];
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sampleSize.mjs
function sampleSize2(collection, size2, guard) {
  const arrayCollection = toArray2(collection);
  if (guard ? isIterateeCall(collection, size2, guard) : size2 === void 0) size2 = 1;
  else size2 = toInteger(size2);
  size2 = clamp(size2, 0, arrayCollection.length);
  return sampleSize(arrayCollection, size2);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/times.mjs
function times(n, getValue) {
  n = toInteger(n);
  if (n < 1 || !Number.isSafeInteger(n)) return [];
  const result2 = new Array(n);
  for (let i = 0; i < n; i++) result2[i] = typeof getValue === "function" ? getValue(i) : i;
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/keys.mjs
function keys(object) {
  if (isArrayLike(object)) return arrayLikeKeys(object);
  const result2 = Object.keys(Object(object));
  if (!isPrototype(object)) return result2;
  return result2.filter((key) => key !== "constructor");
}
function arrayLikeKeys(object) {
  const indices = times(object.length, (index) => `${index}`);
  const filteredKeys = new Set(indices);
  if (isBuffer(object)) {
    filteredKeys.add("offset");
    filteredKeys.add("parent");
  }
  if (isTypedArray2(object)) {
    filteredKeys.add("buffer");
    filteredKeys.add("byteLength");
    filteredKeys.add("byteOffset");
  }
  const inheritedKeys = Object.keys(object).filter((key) => !filteredKeys.has(key));
  if (Array.isArray(object)) return [...indices, ...inheritedKeys];
  return [...indices.filter((index) => Object.hasOwn(object, index)), ...inheritedKeys];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/values.mjs
function values(object) {
  if (object == null) return [];
  const objectKeys = keys(object);
  const result2 = new Array(objectKeys.length);
  for (let i = 0; i < objectKeys.length; i++) result2[i] = object[objectKeys[i]];
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isNil.mjs
function isNil2(x) {
  return x == null;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/shuffle.mjs
function shuffle(arr) {
  const result2 = arr.slice();
  for (let i = result2.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result2[i], result2[j]] = [result2[j], result2[i]];
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/shuffle.mjs
function shuffle2(collection) {
  if (isNil2(collection)) return [];
  if (isArray(collection)) return shuffle(collection);
  if (isArrayLike(collection)) return shuffle(Array.from(collection));
  if (isObjectLike(collection)) return shuffle(values(collection));
  return [];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/regexMultiByte.mjs
var regexMultiByte = new RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/unicodeSize.mjs
var rsAstralRange = "\\ud800-\\udfff";
var rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = `[${rsAstralRange}]`;
var rsCombo = `[${rsComboRange}]`;
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = `(?:${rsCombo}|${rsFitz})`;
var rsNonAstral = `[^${rsAstralRange}]`;
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ = "\\u200d";
var reOptMod = `${rsModifier}?`;
var rsOptVar = `[${rsVarRange}]?`;
var rsOptJoin = `(?:${rsZWJ}(?:${[
  rsNonAstral,
  rsRegional,
  rsSurrPair
].join("|")})${rsOptVar}${reOptMod})*`;
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = `(?:${[
  `${rsNonAstral}${rsCombo}?`,
  rsCombo,
  rsRegional,
  rsSurrPair,
  rsAstral
].join("|")})`;
var reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, "g");
function unicodeSize(str) {
  let result2 = 0;
  reUnicode.lastIndex = 0;
  while (reUnicode.test(str)) ++result2;
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/size.mjs
function size(target) {
  if (isNil(target)) return 0;
  if (typeof target === "string") return regexMultiByte.test(target) ? unicodeSize(target) : target.length;
  if (isArrayLike(target)) return target.length;
  if (target instanceof Map || target instanceof Set) return target.size;
  return Object.keys(target).length;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/slice.mjs
function slice(array, start, end) {
  if (!isArrayLike(array)) return [];
  const length = array.length;
  if (end === void 0) end = length;
  else if (typeof end !== "number" && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  }
  start = toInteger(start);
  end = toInteger(end);
  if (start < 0) start = Math.max(length + start, 0);
  else start = Math.min(start, length);
  if (end < 0) end = Math.max(length + end, 0);
  else end = Math.min(end, length);
  const resultLength = Math.max(end - start, 0);
  const result2 = new Array(resultLength);
  for (let i = 0; i < resultLength; ++i) result2[i] = array[start + i];
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/some.mjs
function some(source, predicate, guard) {
  if (!source) return false;
  if (guard && isIterateeCall(source, predicate, guard)) predicate = void 0;
  if (predicate == null) predicate = identity;
  const values2 = Array.isArray(source) ? source : Object.values(source);
  switch (typeof predicate) {
    case "function":
      if (!Array.isArray(source)) {
        const keys2 = Object.keys(source);
        for (let i = 0; i < keys2.length; i++) {
          const key = keys2[i];
          const value = source[key];
          if (predicate(value, key, source)) return true;
        }
        return false;
      }
      for (let i = 0; i < source.length; i++) if (predicate(source[i], i, source)) return true;
      return false;
    case "object":
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];
        const matchFunc = matchesProperty(key, value);
        if (Array.isArray(source)) {
          for (let i = 0; i < source.length; i++) if (matchFunc(source[i])) return true;
          return false;
        }
        return values2.some(matchFunc);
      } else {
        const matchFunc = matches(predicate);
        if (Array.isArray(source)) {
          for (let i = 0; i < source.length; i++) if (matchFunc(source[i])) return true;
          return false;
        }
        return values2.some(matchFunc);
      }
    case "number":
    case "symbol":
    case "string": {
      const propFunc = property(predicate);
      if (Array.isArray(source)) {
        for (let i = 0; i < source.length; i++) if (propFunc(source[i])) return true;
        return false;
      }
      return values2.some(propFunc);
    }
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortBy.mjs
function sortBy(collection, ...criteria) {
  const length = criteria.length;
  if (length > 1 && isIterateeCall(collection, criteria[0], criteria[1])) criteria = [];
  else if (length > 2 && isIterateeCall(criteria[0], criteria[1], criteria[2])) criteria = [criteria[0]];
  return orderBy(collection, flatten(criteria), ["asc"]);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isNumber.mjs
function isNumber2(value) {
  return typeof value === "number" || isObjectLike(value) && getTag(value) === "[object Number]";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isNaN.mjs
function isNaN2(value) {
  return isNumber2(value) && Number.isNaN(Number(value));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortedIndexBy.mjs
var MAX_ARRAY_INDEX = 4294967294;
function sortedIndexBy(array, value, iteratee$1 = identity2, retHighest) {
  if (isNil2(array) || array.length === 0) return 0;
  let low = 0;
  let high = array.length;
  const iterateeFunction = iteratee(iteratee$1);
  const transformedValue = iterateeFunction(value);
  const valIsNaN = isNaN2(transformedValue);
  const valIsNull = isNull(transformedValue);
  const valIsSymbol = isSymbol(transformedValue);
  const valIsUndefined = isUndefined(transformedValue);
  while (low < high) {
    let setLow;
    const mid = Math.floor((low + high) / 2);
    const computed = iterateeFunction(array[mid]);
    const othIsDefined = !isUndefined(computed);
    const othIsNull = isNull(computed);
    const othIsReflexive = !isNaN2(computed);
    const othIsSymbol = isSymbol(computed);
    if (valIsNaN) setLow = retHighest || othIsReflexive;
    else if (valIsUndefined) setLow = othIsReflexive && (retHighest || othIsDefined);
    else if (valIsNull) setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    else if (valIsSymbol) setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    else if (othIsNull || othIsSymbol) setLow = false;
    else setLow = retHighest ? computed <= transformedValue : computed < transformedValue;
    if (setLow) low = mid + 1;
    else high = mid;
  }
  return Math.min(high, MAX_ARRAY_INDEX);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortedIndex.mjs
var HALF_MAX_ARRAY_LENGTH = 2147483647;
function sortedIndex(array, value) {
  if (isNil(array)) return 0;
  let low = 0;
  let high = array.length;
  if (isNumber2(value) && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      const mid = low + high >>> 1;
      const compute = array[mid];
      if (!isNull(compute) && !isSymbol2(compute) && compute < value) low = mid + 1;
      else high = mid;
    }
    return high;
  }
  return sortedIndexBy(array, value, (value2) => value2);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortedIndexOf.mjs
function sortedIndexOf(array, value) {
  if (!(array == null ? void 0 : array.length)) return -1;
  const index = sortedIndex(array, value);
  if (index < array.length && eq(array[index], value)) return index;
  return -1;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortedLastIndexBy.mjs
function sortedLastIndexBy(array, value, iteratee2) {
  return sortedIndexBy(array, value, iteratee2, true);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortedLastIndex.mjs
var HALF_MAX_ARRAY_LENGTH2 = 2147483647;
function sortedLastIndex(array, value) {
  if (isNil(array)) return 0;
  let high = array.length;
  if (!isNumber2(value) || Number.isNaN(value) || high > HALF_MAX_ARRAY_LENGTH2) return sortedLastIndexBy(array, value, (value2) => value2);
  let low = 0;
  while (low < high) {
    const mid = low + high >>> 1;
    const compute = array[mid];
    if (!isNull(compute) && !isSymbol2(compute) && compute <= value) low = mid + 1;
    else high = mid;
  }
  return high;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortedLastIndexOf.mjs
function sortedLastIndexOf(array, value) {
  if (!(array == null ? void 0 : array.length)) return -1;
  const index = sortedLastIndex(array, value) - 1;
  if (index >= 0 && eq(array[index], value)) return index;
  return -1;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/tail.mjs
function tail(arr) {
  return arr.slice(1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/tail.mjs
function tail2(arr) {
  if (!isArrayLike(arr)) return [];
  return tail(toArray(arr));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/take.mjs
function take(arr, count) {
  return arr.slice(0, count);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/take.mjs
function take2(arr, count = 1, guard) {
  count = guard || count === void 0 ? 1 : toInteger(count);
  if (count < 1 || !isArrayLike(arr)) return [];
  return take(toArray(arr), count);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/takeRight.mjs
function takeRight(arr, count) {
  if (count <= 0 || arr.length === 0) return [];
  return arr.slice(-count);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/takeRight.mjs
function takeRight2(arr, count = 1, guard) {
  count = guard ? 1 : toInteger(count);
  if (count <= 0 || !isArrayLike(arr)) return [];
  return takeRight(toArray(arr), count);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/negate.mjs
function negate2(func) {
  return (...args) => !func(...args);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/takeRightWhile.mjs
function takeRightWhile(_array, predicate) {
  if (!isArrayLike(_array)) return [];
  const array = toArray(_array);
  const index = array.findLastIndex(negate2(iteratee(predicate ?? identity)));
  return array.slice(index + 1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/takeWhile.mjs
function takeWhile(array, predicate) {
  if (!isArrayLike(array)) return [];
  const _array = toArray(array);
  const index = _array.findIndex(negate(iteratee(predicate ?? identity2)));
  return index === -1 ? _array : _array.slice(0, index);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/union.mjs
function union(...arrays) {
  return uniq(flatMapDepth(arrays.filter(isArrayLikeObject), (v) => Array.from(v), 1));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/ary.mjs
function ary(func, n) {
  return function(...args) {
    return func.apply(this, args.slice(0, n));
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/unionBy.mjs
function unionBy(...values2) {
  const lastValue = last(values2);
  const flattened = flattenArrayLike(values2);
  if (isArrayLikeObject(lastValue) || lastValue == null) return uniq(flattened);
  return uniqBy(flattened, ary(iteratee(lastValue), 1)).map(normalizeZero);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/unionWith.mjs
function unionWith(...values2) {
  const lastValue = last(values2);
  const flattened = flattenArrayLike(values2);
  if (isArrayLikeObject(lastValue) || lastValue == null) return uniq(flattened);
  return uniqWith(flattened, lastValue);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/uniq.mjs
function uniq2(arr) {
  if (!isArrayLike(arr)) return [];
  return uniq(Array.from(arr));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/uniqBy.mjs
function uniqBy2(array, iteratee$1 = identity) {
  if (!isArrayLike(array)) return [];
  return uniqBy(Array.from(array), ary(iteratee(iteratee$1), 1)).map(normalizeZero);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/uniqWith.mjs
function uniqWith2(arr, comparator) {
  if (!isArrayLike(arr)) return [];
  if (typeof comparator !== "function") return uniq2(Array.from(arr));
  return uniqWith(Array.from(arr), (kept, candidate) => comparator(candidate, kept));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/unzip.mjs
function unzip(zipped) {
  let maxLen = 0;
  for (let i = 0; i < zipped.length; i++) if (zipped[i].length > maxLen) maxLen = zipped[i].length;
  const result2 = new Array(maxLen);
  for (let i = 0; i < maxLen; i++) {
    result2[i] = new Array(zipped.length);
    for (let j = 0; j < zipped.length; j++) result2[i][j] = zipped[j][i];
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/unzip.mjs
function unzip2(array) {
  if (!isArrayLikeObject(array) || !array.length) return [];
  array = isArray(array) ? array : Array.from(array);
  array = array.filter((item) => isArrayLikeObject(item));
  return unzip(array);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/unzipWith.mjs
function unzipWith(array, iteratee2) {
  if (!isArrayLikeObject(array) || !array.length) return [];
  const unzipped = isArray(array) ? unzip(array) : unzip(Array.from(array, (value) => Array.from(value)));
  if (!iteratee2) return unzipped;
  const result2 = new Array(unzipped.length);
  for (let i = 0; i < unzipped.length; i++) {
    const value = unzipped[i];
    result2[i] = iteratee2(...value);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/without.mjs
function without(array, ...values2) {
  if (!isArrayLikeObject(array)) return [];
  const valuesSet = new Set(values2);
  const result2 = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (!valuesSet.has(value)) result2.push(normalizeZero(value));
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/xor.mjs
function xor(...arrays) {
  const itemCounts = /* @__PURE__ */ new Map();
  for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i];
    if (!isArrayLikeObject(array)) continue;
    const itemSet = new Set(toArray2(array));
    for (const item of itemSet) if (!itemCounts.has(item)) itemCounts.set(item, 1);
    else itemCounts.set(item, itemCounts.get(item) + 1);
  }
  const result2 = [];
  for (const [item, count] of itemCounts) if (count === 1) result2.push(item);
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/windowed.mjs
function windowed(arr, size2, step = 1, { partialWindows = false } = {}) {
  if (size2 <= 0 || !Number.isInteger(size2)) throw new Error("Size must be a positive integer.");
  if (step <= 0 || !Number.isInteger(step)) throw new Error("Step must be a positive integer.");
  const result2 = [];
  const end = partialWindows ? arr.length : arr.length - size2 + 1;
  for (let i = 0; i < end; i += step) result2.push(arr.slice(i, i + size2));
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/xorBy.mjs
function xorBy(...values2) {
  const lastValue = last2(values2);
  let mapper = identity;
  if (!isArrayLikeObject(lastValue) && lastValue != null) {
    mapper = iteratee(lastValue);
    values2 = values2.slice(0, -1);
  }
  const arrays = values2.filter(isArrayLikeObject);
  return differenceBy2(unionBy(...arrays, mapper), unionBy(...windowed(arrays, 2).map(([arr1, arr2]) => intersectionBy2(arr1, arr2, mapper)), mapper), mapper);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/xorWith.mjs
function xorWith(...values2) {
  const lastValue = last2(values2);
  if (typeof lastValue !== "function") return xor(...values2);
  const comparator = lastValue;
  const arrays = values2.slice(0, -1).filter(isArrayLikeObject);
  return differenceWith2(unionWith(...arrays, comparator), unionWith(...windowed(arrays, 2).map(([arr1, arr2]) => intersectionWith2(arr1, arr2, comparator)), comparator), comparator);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/array/zip.mjs
function zip(...arrs) {
  let rowCount = 0;
  for (let i = 0; i < arrs.length; i++) if (arrs[i].length > rowCount) rowCount = arrs[i].length;
  const columnCount = arrs.length;
  const result2 = Array(rowCount);
  for (let i = 0; i < rowCount; ++i) {
    const row = Array(columnCount);
    for (let j = 0; j < columnCount; ++j) row[j] = arrs[j][i];
    result2[i] = row;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/zip.mjs
function zip2(...arrays) {
  if (!arrays.length) return [];
  return zip(...arrays.filter((group) => isArrayLikeObject(group)));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/assignValue.mjs
var assignValue = (object, key, value) => {
  const objValue = object[key];
  if (!(Object.hasOwn(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) object[key] = value;
};

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/zipObject.mjs
function zipObject(keys2 = [], values2 = []) {
  keys2 = keys2 || [];
  values2 = values2 || [];
  const result2 = {};
  for (let i = 0; i < keys2.length; i++) assignValue(result2, keys2[i], values2[i]);
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/_internal/isUnsafeToWriteProperty.mjs
function isUnsafeToWriteProperty(key) {
  return key === "__proto__" || key === "constructor" || key === "prototype";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/updateWith.mjs
function updateWith(obj, path, updater, customizer) {
  if (obj == null && !isObject(obj)) return obj;
  let resolvedPath;
  if (isKey(path, obj)) resolvedPath = [path];
  else if (Array.isArray(path)) resolvedPath = path;
  else resolvedPath = toPath(path);
  const updateValue = updater(get(obj, resolvedPath));
  let current = obj;
  for (let i = 0; i < resolvedPath.length && current != null; i++) {
    const key = toKey(resolvedPath[i]);
    if (isUnsafeToWriteProperty(key)) return obj;
    let newValue;
    if (i === resolvedPath.length - 1) newValue = updateValue;
    else {
      const objValue = current[key];
      const customizerResult = customizer == null ? void 0 : customizer(objValue, key, obj);
      newValue = customizerResult !== void 0 ? customizerResult : isObject(objValue) ? objValue : isIndex(resolvedPath[i + 1]) ? [] : {};
    }
    assignValue(current, key, newValue);
    current = current[key];
  }
  return obj;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/set.mjs
function set(obj, path, value) {
  return updateWith(obj, path, () => value, () => void 0);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/zipObjectDeep.mjs
function zipObjectDeep(keys2, values2) {
  const result2 = {};
  if (!isArrayLike(keys2)) return result2;
  if (!isArrayLike(values2)) values2 = [];
  const zipped = zip(Array.from(keys2), Array.from(values2));
  for (let i = 0; i < zipped.length; i++) {
    const [key, value] = zipped[i];
    if (key != null) set(result2, key, value);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/zipWith.mjs
function zipWith(...combine) {
  let iteratee2 = combine.pop();
  if (!isFunction(iteratee2)) {
    combine.push(iteratee2);
    iteratee2 = void 0;
  }
  if (!(combine == null ? void 0 : combine.length)) return [];
  const result2 = unzip2(combine);
  if (iteratee2 == null) return result2;
  return result2.map((group) => iteratee2(...group));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/after.mjs
function after(n, func) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  n = toInteger(n);
  return function(...args) {
    if (--n < 1) return func.apply(this, args);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/ary.mjs
function ary2(func, n = func.length, guard) {
  if (guard) n = func.length;
  if (Number.isNaN(n) || n < 0) n = 0;
  return ary(func, n);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/attempt.mjs
function attempt(func, ...args) {
  try {
    return func(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/before.mjs
function before(n, func) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  let result2;
  n = toInteger(n);
  return function(...args) {
    if (--n > 0) result2 = func.apply(this, args);
    if (n <= 1 && func) func = void 0;
    return result2;
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/bind.mjs
function bind(func, thisObj, ...partialArgs) {
  const bound = function(...providedArgs) {
    const args = [];
    let startIndex = 0;
    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];
      if (arg === bind.placeholder) args.push(providedArgs[startIndex++]);
      else args.push(arg);
    }
    for (let i = startIndex; i < providedArgs.length; i++) args.push(providedArgs[i]);
    if (this instanceof bound) return new func(...args);
    return func.apply(thisObj, args);
  };
  return bound;
}
bind.placeholder = Symbol("bind.placeholder");

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/bindKey.mjs
function bindKey(object, key, ...partialArgs) {
  const bound = function(...providedArgs) {
    const args = [];
    let startIndex = 0;
    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];
      if (arg === bindKey.placeholder) args.push(providedArgs[startIndex++]);
      else args.push(arg);
    }
    for (let i = startIndex; i < providedArgs.length; i++) args.push(providedArgs[i]);
    if (this instanceof bound) return new object[key](...args);
    return object[key].apply(object, args);
  };
  return bound;
}
bindKey.placeholder = Symbol("bindKey.placeholder");

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/curry.mjs
function curry(func, arity = func.length, guard) {
  arity = guard ? func.length : arity;
  arity = Number.parseInt(arity, 10);
  if (Number.isNaN(arity) || arity < 1) arity = 0;
  const wrapper = function(...partialArgs) {
    const holders = partialArgs.filter((item) => item === curry.placeholder);
    const length = partialArgs.length - holders.length;
    if (length < arity) return makeCurry(func, arity - length, partialArgs);
    if (this instanceof wrapper) return new func(...partialArgs);
    return func.apply(this, partialArgs);
  };
  wrapper.placeholder = curryPlaceholder;
  return wrapper;
}
function makeCurry(func, arity, partialArgs) {
  function wrapper(...providedArgs) {
    const holders = providedArgs.filter((item) => item === curry.placeholder);
    const length = providedArgs.length - holders.length;
    providedArgs = composeArgs(providedArgs, partialArgs);
    if (length < arity) return makeCurry(func, arity - length, providedArgs);
    if (this instanceof wrapper) return new func(...providedArgs);
    return func.apply(this, providedArgs);
  }
  wrapper.placeholder = curryPlaceholder;
  return wrapper;
}
function composeArgs(providedArgs, partialArgs) {
  const args = [];
  let startIndex = 0;
  for (let i = 0; i < partialArgs.length; i++) {
    const arg = partialArgs[i];
    if (arg === curry.placeholder && startIndex < providedArgs.length) args.push(providedArgs[startIndex++]);
    else args.push(arg);
  }
  for (let i = startIndex; i < providedArgs.length; i++) args.push(providedArgs[i]);
  return args;
}
var curryPlaceholder = Symbol("curry.placeholder");
curry.placeholder = curryPlaceholder;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/curryRight.mjs
function curryRight(func, arity = func.length, guard) {
  arity = guard ? func.length : arity;
  arity = Number.parseInt(arity, 10);
  if (Number.isNaN(arity) || arity < 1) arity = 0;
  const wrapper = function(...partialArgs) {
    const holders = partialArgs.filter((item) => item === curryRight.placeholder);
    const length = partialArgs.length - holders.length;
    if (length < arity) return makeCurryRight(func, arity - length, partialArgs);
    if (this instanceof wrapper) return new func(...partialArgs);
    return func.apply(this, partialArgs);
  };
  wrapper.placeholder = curryRightPlaceholder;
  return wrapper;
}
function makeCurryRight(func, arity, partialArgs) {
  function wrapper(...providedArgs) {
    const holders = providedArgs.filter((item) => item === curryRight.placeholder);
    const length = providedArgs.length - holders.length;
    providedArgs = composeArgs2(providedArgs, partialArgs);
    if (length < arity) return makeCurryRight(func, arity - length, providedArgs);
    if (this instanceof wrapper) return new func(...providedArgs);
    return func.apply(this, providedArgs);
  }
  wrapper.placeholder = curryRightPlaceholder;
  return wrapper;
}
function composeArgs2(providedArgs, partialArgs) {
  const placeholderLength = partialArgs.filter((arg) => arg === curryRight.placeholder).length;
  const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
  const args = [];
  let providedIndex = 0;
  for (let i = 0; i < rangeLength; i++) args.push(providedArgs[providedIndex++]);
  for (let i = 0; i < partialArgs.length; i++) {
    const arg = partialArgs[i];
    if (arg === curryRight.placeholder) if (providedIndex < providedArgs.length) args.push(providedArgs[providedIndex++]);
    else args.push(arg);
    else args.push(arg);
  }
  return args;
}
var curryRightPlaceholder = Symbol("curryRight.placeholder");
curryRight.placeholder = curryRightPlaceholder;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/debounce.mjs
function debounce(func, debounceMs, { signal, edges } = {}) {
  let pendingThis = void 0;
  let pendingArgs = null;
  const leading = edges != null && edges.includes("leading");
  const trailing = edges == null || edges.includes("trailing");
  const invoke2 = () => {
    if (pendingArgs !== null) {
      func.apply(pendingThis, pendingArgs);
      pendingThis = void 0;
      pendingArgs = null;
    }
  };
  const onTimerEnd = () => {
    if (trailing) invoke2();
    cancel();
  };
  let timeoutId = null;
  const schedule = () => {
    if (timeoutId != null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      onTimerEnd();
    }, debounceMs);
  };
  const cancelTimer = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  const cancel = () => {
    cancelTimer();
    pendingThis = void 0;
    pendingArgs = null;
  };
  const flush = () => {
    invoke2();
  };
  const debounced = function(...args) {
    if (signal == null ? void 0 : signal.aborted) return;
    pendingThis = this;
    pendingArgs = args;
    const isFirstCall = timeoutId == null;
    schedule();
    if (leading && isFirstCall) invoke2();
  };
  debounced.schedule = schedule;
  debounced.cancel = cancel;
  debounced.flush = flush;
  signal == null ? void 0 : signal.addEventListener("abort", cancel, { once: true });
  return debounced;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/debounce.mjs
function debounce2(func, debounceMs = 0, options = {}) {
  if (typeof options !== "object") options = {};
  const { leading = false, trailing = true, maxWait } = options;
  const edges = Array(2);
  if (leading) edges[0] = "leading";
  if (trailing) edges[1] = "trailing";
  let result2 = void 0;
  let pendingAt = null;
  const _debounced = debounce(function(...args) {
    result2 = func.apply(this, args);
    pendingAt = null;
  }, debounceMs, { edges });
  const debounced = function(...args) {
    if (maxWait != null) {
      if (pendingAt === null) pendingAt = Date.now();
      if (Date.now() - pendingAt >= maxWait) {
        if (leading || trailing) result2 = func.apply(this, args);
        pendingAt = Date.now();
        _debounced.cancel();
        _debounced.schedule();
        return result2;
      }
    }
    _debounced.apply(this, args);
    return result2;
  };
  const flush = () => {
    _debounced.flush();
    return result2;
  };
  debounced.cancel = _debounced.cancel;
  debounced.flush = flush;
  return debounced;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/defer.mjs
function defer(func, ...args) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  return setTimeout(func, 1, ...args);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/delay.mjs
function delay(func, wait, ...args) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  return setTimeout(func, toNumber(wait) || 0, ...args);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/flip.mjs
function flip(func) {
  return function(...args) {
    return func.apply(this, args.reverse());
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/flow.mjs
function flow(...funcs) {
  return function(...args) {
    let result2 = funcs.length ? funcs[0].apply(this, args) : args[0];
    for (let i = 1; i < funcs.length; i++) result2 = funcs[i].call(this, result2);
    return result2;
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/flow.mjs
function flow2(...funcs) {
  const flattenFuncs = flatten(funcs, 1);
  if (flattenFuncs.some((func) => typeof func !== "function")) throw new TypeError("Expected a function");
  return flow(...flattenFuncs);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/flowRight.mjs
function flowRight(...funcs) {
  return flow(...funcs.reverse());
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/flowRight.mjs
function flowRight2(...funcs) {
  const flattenFuncs = flatten(funcs, 1);
  if (flattenFuncs.some((func) => typeof func !== "function")) throw new TypeError("Expected a function");
  return flowRight(...flattenFuncs);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/memoize.mjs
function memoize(func, resolver) {
  if (typeof func !== "function" || resolver != null && typeof resolver !== "function") throw new TypeError("Expected a function");
  const memoized = function(...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;
    if (cache.has(key)) return cache.get(key);
    const result2 = func.apply(this, args);
    memoized.cache = cache.set(key, result2) || cache;
    return result2;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}
memoize.Cache = Map;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/nthArg.mjs
function nthArg(n = 0) {
  return function(...args) {
    return args.at(toInteger(n));
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/once.mjs
function once(func) {
  let called = false;
  let cache;
  return function(...args) {
    if (!called) {
      called = true;
      cache = func(...args);
    }
    return cache;
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/once.mjs
function once2(func) {
  return once(func);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/overArgs.mjs
function overArgs(func, ..._transforms) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  const transforms = _transforms.flat();
  return function(...args) {
    const length = Math.min(args.length, transforms.length);
    const transformedArgs = [...args];
    for (let i = 0; i < length; i++) transformedArgs[i] = iteratee(transforms[i] ?? identity).call(this, args[i]);
    return func.apply(this, transformedArgs);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/partial.mjs
function partial(func, ...partialArgs) {
  return partialImpl(func, placeholderSymbol, ...partialArgs);
}
function partialImpl(func, placeholder, ...partialArgs) {
  const partialed = function(...providedArgs) {
    let providedArgsIndex = 0;
    const substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
    const remainingArgs = providedArgs.slice(providedArgsIndex);
    return func.apply(this, substitutedArgs.concat(remainingArgs));
  };
  if (func.prototype) partialed.prototype = Object.create(func.prototype);
  return partialed;
}
var placeholderSymbol = Symbol("partial.placeholder");
partial.placeholder = placeholderSymbol;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/partial.mjs
function partial2(func, ...partialArgs) {
  return partialImpl(func, partial2.placeholder, ...partialArgs);
}
partial2.placeholder = Symbol("compat.partial.placeholder");

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/partialRight.mjs
function partialRight(func, ...partialArgs) {
  return partialRightImpl(func, placeholderSymbol2, ...partialArgs);
}
function partialRightImpl(func, placeholder, ...partialArgs) {
  const partialedRight = function(...providedArgs) {
    const placeholderLength = partialArgs.filter((arg) => arg === placeholder).length;
    const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
    const remainingArgs = providedArgs.slice(0, rangeLength);
    let providedArgsIndex = rangeLength;
    const substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
    return func.apply(this, remainingArgs.concat(substitutedArgs));
  };
  if (func.prototype) partialedRight.prototype = Object.create(func.prototype);
  return partialedRight;
}
var placeholderSymbol2 = Symbol("partialRight.placeholder");
partialRight.placeholder = placeholderSymbol2;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/partialRight.mjs
function partialRight2(func, ...partialArgs) {
  return partialRightImpl(func, partialRight2.placeholder, ...partialArgs);
}
partialRight2.placeholder = Symbol("compat.partialRight.placeholder");

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/rearg.mjs
function rearg(func, ...indices) {
  const flattenIndices = flatten2(indices);
  return function(...args) {
    const reorderedArgs = flattenIndices.map((i) => args[i]).slice(0, args.length);
    for (let i = reorderedArgs.length; i < args.length; i++) reorderedArgs.push(args[i]);
    return func.apply(this, reorderedArgs);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/rest.mjs
function rest(func, startIndex = func.length - 1) {
  return function(...args) {
    const rest3 = args.slice(startIndex);
    const params = args.slice(0, startIndex);
    while (params.length < startIndex) params.push(void 0);
    return func.apply(this, [...params, rest3]);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/rest.mjs
function rest2(func, start = func.length - 1) {
  start = Number.parseInt(start, 10);
  if (Number.isNaN(start) || start < 0) start = func.length - 1;
  return rest(func, start);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/spread.mjs
function spread(func, argsIndex = 0) {
  argsIndex = Number.parseInt(argsIndex, 10);
  if (Number.isNaN(argsIndex) || argsIndex < 0) argsIndex = 0;
  return function(...args) {
    const array = args[argsIndex];
    const params = args.slice(0, argsIndex);
    if (array) params.push(...array);
    return func.apply(this, params);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/throttle.mjs
function throttle(func, throttleMs = 0, options = {}) {
  const { leading = true, trailing = true } = options;
  return debounce2(func, throttleMs, {
    leading,
    maxWait: throttleMs,
    trailing
  });
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/unary.mjs
function unary(func) {
  return ary2(func, 1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/wrap.mjs
function wrap(value, wrapper) {
  return function(...args) {
    return (isFunction(wrapper) ? wrapper : identity).apply(this, [value, ...args]);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/add.mjs
function add(value, other) {
  if (value === void 0 && other === void 0) return 0;
  if (value === void 0 || other === void 0) return value ?? other;
  if (typeof value === "string" || typeof other === "string") {
    value = toString(value);
    other = toString(other);
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value + other;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/decimalAdjust.mjs
function decimalAdjust(type, number, precision = 0) {
  number = Number(number);
  if (Object.is(number, -0)) number = "-0";
  precision = Math.min(Number.parseInt(precision, 10), 292);
  if (precision && Number.isFinite(Number(number))) {
    const [magnitude, exponent = 0] = number.toString().split("e");
    let adjustedValue = Math[type](Number(`${magnitude}e${Number(exponent) + precision}`));
    if (Object.is(adjustedValue, -0)) adjustedValue = "-0";
    const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
    return Number(`${newMagnitude}e${Number(newExponent) - precision}`);
  }
  return Math[type](Number(number));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/ceil.mjs
function ceil(number, precision = 0) {
  return decimalAdjust("ceil", number, precision);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/divide.mjs
function divide(value, other) {
  if (value === void 0 && other === void 0) return 1;
  if (value === void 0 || other === void 0) return value ?? other;
  if (typeof value === "string" || typeof other === "string") {
    value = toString(value);
    other = toString(other);
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value / other;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/floor.mjs
function floor(number, precision = 0) {
  return decimalAdjust("floor", number, precision);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/inRange.mjs
function inRange(value, minimum, maximum) {
  minimum = toFinite(minimum);
  if (maximum === void 0) {
    maximum = minimum;
    minimum = 0;
  } else maximum = toFinite(maximum);
  value = toNumber(value);
  return value >= Math.min(minimum, maximum) && value < Math.max(minimum, maximum);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/max.mjs
function max(items) {
  if (!items || items.length === 0) return;
  let maxResult = void 0;
  for (let i = 0; i < items.length; i++) {
    const current = items[i];
    if (current == null || Number.isNaN(current) || typeof current === "symbol") continue;
    if (maxResult === void 0 || current > maxResult) maxResult = current;
  }
  return maxResult;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/maxBy.mjs
function maxBy(items, iteratee$1 = identity) {
  if (items == null) return;
  const array = toArray(items);
  if (array.length === 0) return;
  const getValue = iteratee(iteratee$1);
  let maxElement;
  let max2;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const current = getValue(element, i, array);
    if (current == null || Number.isNaN(current) || typeof current === "symbol") continue;
    if (max2 === void 0 || current > max2) {
      max2 = current;
      maxElement = element;
    }
  }
  return maxElement;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/sumBy.mjs
function sumBy(array, iteratee$1) {
  if (!array || !array.length) return 0;
  if (iteratee$1 != null) iteratee$1 = iteratee(iteratee$1);
  let result2 = void 0;
  for (let i = 0; i < array.length; i++) {
    const current = iteratee$1 ? iteratee$1(array[i]) : array[i];
    if (current !== void 0) if (result2 === void 0) result2 = current;
    else result2 += current;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/sum.mjs
function sum(array) {
  return sumBy(array);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/mean.mjs
function mean(nums) {
  const length = nums ? nums.length : 0;
  return length === 0 ? NaN : sum(nums) / length;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/meanBy.mjs
function meanBy(items, iteratee$1) {
  const length = items == null ? 0 : items.length;
  if (!length) return NaN;
  return sumBy(items, iteratee(iteratee$1 ?? identity)) / length;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/min.mjs
function min(items) {
  if (!items || items.length === 0) return;
  let minResult = void 0;
  for (let i = 0; i < items.length; i++) {
    const current = items[i];
    if (current == null || Number.isNaN(current) || typeof current === "symbol") continue;
    if (minResult === void 0 || current < minResult) minResult = current;
  }
  return minResult;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/minBy.mjs
function minBy(items, iteratee$1 = identity) {
  if (items == null) return;
  const array = toArray(items);
  if (array.length === 0) return;
  const getValue = iteratee(iteratee$1);
  let minElement;
  let min2;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const current = getValue(element, i, array);
    if (current == null || Number.isNaN(current) || typeof current === "symbol") continue;
    if (min2 === void 0 || current < min2) {
      min2 = current;
      minElement = element;
    }
  }
  return minElement;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/multiply.mjs
function multiply(value, other) {
  if (value === void 0 && other === void 0) return 1;
  if (value === void 0 || other === void 0) return value ?? other;
  if (typeof value === "string" || typeof other === "string") {
    value = toString(value);
    other = toString(other);
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value * other;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/parseInt.mjs
function parseInt2(string, radix = 0, guard) {
  if (guard) radix = 0;
  return Number.parseInt(toString(string), radix);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/random.mjs
function random2(...args) {
  let minimum = 0;
  let maximum = 1;
  let floating = false;
  switch (args.length) {
    case 1:
      if (typeof args[0] === "boolean") floating = args[0];
      else maximum = args[0];
      break;
    case 2:
      if (typeof args[1] === "boolean") {
        maximum = args[0];
        floating = args[1];
        break;
      } else {
        minimum = args[0];
        maximum = args[1];
      }
    case 3:
      if (typeof args[2] === "object" && args[2] != null && args[2][args[1]] === args[0]) {
        minimum = 0;
        maximum = args[0];
        floating = false;
      } else {
        minimum = args[0];
        maximum = args[1];
        floating = args[2];
      }
  }
  if (typeof minimum !== "number") minimum = Number(minimum);
  if (typeof maximum !== "number") maximum = Number(maximum);
  if (!minimum) minimum = 0;
  if (!maximum) maximum = 0;
  if (minimum > maximum) [minimum, maximum] = [maximum, minimum];
  if (!floating && (!Number.isInteger(minimum) || !Number.isInteger(maximum))) floating = true;
  minimum = clamp(minimum, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  maximum = clamp(maximum, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  if (minimum === maximum) return minimum;
  if (floating) return random(minimum, maximum);
  else return randomInt(minimum, maximum + 1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/range.mjs
function range2(start, end, step) {
  if (step && typeof step !== "number" && isIterateeCall(start, end, step)) end = step = void 0;
  start = toFinite(start);
  if (end === void 0) {
    end = start;
    start = 0;
  } else end = toFinite(end);
  step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result2 = new Array(length);
  for (let index = 0; index < length; index++) {
    result2[index] = start;
    start += step;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/rangeRight.mjs
function rangeRight(start, end, step) {
  if (step && typeof step !== "number" && isIterateeCall(start, end, step)) end = step = void 0;
  start = toFinite(start);
  if (end === void 0) {
    end = start;
    start = 0;
  } else end = toFinite(end);
  step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result2 = new Array(length);
  for (let index = length - 1; index >= 0; index--) {
    result2[index] = start;
    start += step;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/round.mjs
function round(number, precision = 0) {
  return decimalAdjust("round", number, precision);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/math/subtract.mjs
function subtract(value, other) {
  if (value === void 0 && other === void 0) return 0;
  if (value === void 0 || other === void 0) return value ?? other;
  if (typeof value === "string" || typeof other === "string") {
    value = toString(value);
    other = toString(other);
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value - other;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/function/noop.mjs
function noop2(..._) {
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/assign.mjs
function assign(object, ...sources) {
  for (let i = 0; i < sources.length; i++) assignImpl(object, sources[i]);
  return object;
}
function assignImpl(object, source) {
  const keys$1 = keys(source);
  for (let i = 0; i < keys$1.length; i++) {
    const key = keys$1[i];
    if (!(key in object) || !eq(object[key], source[key])) object[key] = source[key];
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/keysIn.mjs
function keysIn(object) {
  if (object == null) return [];
  switch (typeof object) {
    case "object":
    case "function":
      if (isArrayLike(object)) return arrayLikeKeysIn(object);
      if (isPrototype(object)) return prototypeKeysIn(object);
      return keysInImpl(object);
    default:
      return keysInImpl(Object(object));
  }
}
function keysInImpl(object) {
  const result2 = [];
  for (const key in object) result2.push(key);
  return result2;
}
function prototypeKeysIn(object) {
  return keysInImpl(object).filter((key) => key !== "constructor");
}
function arrayLikeKeysIn(object) {
  const indices = times(object.length, (index) => `${index}`);
  const filteredKeys = new Set(indices);
  if (isBuffer(object)) {
    filteredKeys.add("offset");
    filteredKeys.add("parent");
  }
  if (isTypedArray2(object)) {
    filteredKeys.add("buffer");
    filteredKeys.add("byteLength");
    filteredKeys.add("byteOffset");
  }
  const inheritedKeys = keysInImpl(object).filter((key) => !filteredKeys.has(key));
  if (Array.isArray(object)) return [...indices, ...inheritedKeys];
  return [...indices.filter((index) => Object.hasOwn(object, index)), ...inheritedKeys];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/assignIn.mjs
function assignIn(object, ...sources) {
  for (let i = 0; i < sources.length; i++) assignInImpl(object, sources[i]);
  return object;
}
function assignInImpl(object, source) {
  const keys2 = keysIn(source);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    if (!(key in object) || !eq(object[key], source[key])) object[key] = source[key];
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/assignInWith.mjs
function assignInWith(object, ...sources) {
  let getValueToAssign = sources[sources.length - 1];
  if (typeof getValueToAssign === "function") sources.pop();
  else getValueToAssign = void 0;
  for (let i = 0; i < sources.length; i++) assignInWithImpl(object, sources[i], getValueToAssign);
  return object;
}
function assignInWithImpl(object, source, getValueToAssign) {
  const keys2 = keysIn(source);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const objValue = object[key];
    const srcValue = source[key];
    const newValue = (getValueToAssign == null ? void 0 : getValueToAssign(objValue, srcValue, key, object, source)) ?? srcValue;
    if (!(key in object) || !eq(objValue, newValue)) object[key] = newValue;
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/assignWith.mjs
function assignWith(object, ...sources) {
  let getValueToAssign = sources[sources.length - 1];
  if (typeof getValueToAssign === "function") sources.pop();
  else getValueToAssign = void 0;
  for (let i = 0; i < sources.length; i++) assignWithImpl(object, sources[i], getValueToAssign);
  return object;
}
function assignWithImpl(object, source, getValueToAssign) {
  const keys$1 = keys(source);
  for (let i = 0; i < keys$1.length; i++) {
    const key = keys$1[i];
    const objValue = object[key];
    const srcValue = source[key];
    const newValue = (getValueToAssign == null ? void 0 : getValueToAssign(objValue, srcValue, key, object, source)) ?? srcValue;
    if (!(key in object) || !eq(objValue, newValue)) object[key] = newValue;
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/cloneWith.mjs
function cloneWith(value, customizer) {
  if (!customizer) return clone(value);
  const result2 = customizer(value);
  if (result2 !== void 0) return result2;
  return clone(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/create.mjs
function create(prototype, properties) {
  const proto = isObject(prototype) ? Object.create(prototype) : {};
  if (properties != null) {
    const propsKeys = keys(properties);
    for (let i = 0; i < propsKeys.length; i++) {
      const key = propsKeys[i];
      const propsValue = properties[key];
      assignValue(proto, key, propsValue);
    }
  }
  return proto;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/defaults.mjs
function defaults(object, ...sources) {
  object = Object(object);
  const objectProto = Object.prototype;
  let length = sources.length;
  const guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall(sources[0], sources[1], guard)) length = 1;
  for (let i = 0; i < length; i++) {
    if (isNil(sources[i])) continue;
    const source = sources[i];
    const keys2 = Object.keys(source);
    for (let j = 0; j < keys2.length; j++) {
      const key = keys2[j];
      const value = object[key];
      if (value === void 0 || !Object.hasOwn(object, key) && eq(value, objectProto[key])) object[key] = source[key];
    }
  }
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/defaultsDeep.mjs
function defaultsDeep(target, ...sources) {
  target = Object(target);
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (source != null) defaultsDeepRecursive(target, source, /* @__PURE__ */ new WeakMap());
  }
  return target;
}
function defaultsDeepRecursive(target, source, stack) {
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (targetValue === void 0 || !Object.hasOwn(target, key)) {
      target[key] = handleMissingProperty(sourceValue, stack);
      continue;
    }
    if (stack.get(sourceValue) === targetValue) continue;
    handleExistingProperty(targetValue, sourceValue, stack);
  }
}
function handleMissingProperty(sourceValue, stack) {
  if (stack.has(sourceValue)) return stack.get(sourceValue);
  if (isPlainObject(sourceValue)) {
    const newObj = {};
    stack.set(sourceValue, newObj);
    defaultsDeepRecursive(newObj, sourceValue, stack);
    return newObj;
  }
  return sourceValue;
}
function handleExistingProperty(targetValue, sourceValue, stack) {
  if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
    stack.set(sourceValue, targetValue);
    defaultsDeepRecursive(targetValue, sourceValue, stack);
    return;
  }
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    stack.set(sourceValue, targetValue);
    mergeArrays(targetValue, sourceValue, stack);
  }
}
function mergeArrays(targetArray, sourceArray, stack) {
  const minLength = Math.min(sourceArray.length, targetArray.length);
  for (let i = 0; i < minLength; i++) if (isPlainObject(targetArray[i]) && isPlainObject(sourceArray[i])) defaultsDeepRecursive(targetArray[i], sourceArray[i], stack);
  for (let i = minLength; i < sourceArray.length; i++) targetArray.push(sourceArray[i]);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/mapToEntries.mjs
function mapToEntries(map2) {
  const arr = new Array(map2.size);
  const keys2 = map2.keys();
  const values2 = map2.values();
  for (let i = 0; i < arr.length; i++) arr[i] = [keys2.next().value, values2.next().value];
  return arr;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/setToEntries.mjs
function setToEntries(set2) {
  const arr = new Array(set2.size);
  const values2 = set2.values();
  for (let i = 0; i < arr.length; i++) {
    const value = values2.next().value;
    arr[i] = [value, value];
  }
  return arr;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/toPairs.mjs
function toPairs(object) {
  if (object == null) return [];
  if (object instanceof Set) return setToEntries(object);
  if (object instanceof Map) return mapToEntries(object);
  const keys$1 = keys(object);
  const result2 = new Array(keys$1.length);
  for (let i = 0; i < keys$1.length; i++) {
    const key = keys$1[i];
    result2[i] = [key, object[key]];
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/toPairsIn.mjs
function toPairsIn(object) {
  if (object == null) return [];
  if (object instanceof Set) return setToEntries(object);
  if (object instanceof Map) return mapToEntries(object);
  const keys2 = keysIn(object);
  const result2 = new Array(keys2.length);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    result2[i] = [key, object[key]];
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/findKey.mjs
function findKey(obj, predicate) {
  return Object.keys(obj).find((key) => predicate(obj[key], key, obj));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/findKey.mjs
function findKey2(obj, predicate) {
  if (!isObject(obj)) return;
  return findKey(obj, iteratee(predicate ?? identity2));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/findLastKey.mjs
function findLastKey(obj, predicate) {
  if (!isObject(obj)) return;
  const iteratee$1 = iteratee(predicate ?? identity2);
  return Object.keys(obj).findLast((key) => iteratee$1(obj[key], key, obj));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/forIn.mjs
function forIn(object, iteratee2 = identity) {
  if (object == null) return object;
  for (const key in object) if (iteratee2(object[key], key, object) === false) break;
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/forInRight.mjs
function forInRight(object, iteratee2 = identity) {
  if (object == null) return object;
  const keys2 = [];
  for (const key in object) keys2.push(key);
  for (let i = keys2.length - 1; i >= 0; i--) {
    const key = keys2[i];
    if (iteratee2(object[key], key, object) === false) break;
  }
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/forOwn.mjs
function forOwn(object, iteratee2 = identity) {
  if (object == null) return object;
  const iterable = Object(object);
  const keys$1 = keys(object);
  for (let i = 0; i < keys$1.length; ++i) {
    const key = keys$1[i];
    if (iteratee2(iterable[key], key, iterable) === false) break;
  }
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/forOwnRight.mjs
function forOwnRight(object, iteratee2 = identity) {
  if (object == null) return object;
  const iterable = Object(object);
  const keys$1 = keys(object);
  for (let i = keys$1.length - 1; i >= 0; --i) {
    const key = keys$1[i];
    if (iteratee2(iterable[key], key, iterable) === false) break;
  }
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/fromPairs.mjs
function fromPairs(pairs) {
  if (!isArrayLike(pairs)) return {};
  const result2 = {};
  for (let i = 0; i < pairs.length; i++) {
    const [key, value] = pairs[i];
    result2[key] = value;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/functions.mjs
function functions(object) {
  if (object == null) return [];
  return keys(object).filter((key) => typeof object[key] === "function");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/functionsIn.mjs
function functionsIn(object) {
  if (object == null) return [];
  const result2 = [];
  for (const key in object) if (isFunction(object[key])) result2.push(key);
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/hasIn.mjs
function hasIn(object, path) {
  if (object == null) return false;
  let resolvedPath;
  if (Array.isArray(path)) resolvedPath = path;
  else if (typeof path === "string" && isDeepKey(path) && !(path in Object(object))) resolvedPath = toPath(path);
  else resolvedPath = [path];
  if (resolvedPath.length === 0) return false;
  let current = object;
  for (let i = 0; i < resolvedPath.length; i++) {
    const key = toKey(resolvedPath[i]);
    if (current == null || !(key in Object(current))) {
      if (!((Array.isArray(current) || isArguments(current)) && isIndex(key) && Number(key) < current.length)) return false;
    }
    current = current[key];
  }
  return true;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/invert.mjs
function invert(obj) {
  const result2 = {};
  const keys2 = Object.keys(obj);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value = obj[key];
    result2[value] = key;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/invert.mjs
function invert2(obj) {
  return invert(obj);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/invertBy.mjs
function invertBy(object, iteratee$1) {
  const result2 = {};
  if (isNil(object)) return result2;
  if (iteratee$1 == null) iteratee$1 = identity;
  const keys2 = Object.keys(object);
  const getString = iteratee(iteratee$1);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value = object[key];
    const valueStr = getString(value);
    if (Array.isArray(result2[valueStr])) result2[valueStr].push(key);
    else result2[valueStr] = [key];
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/mapKeys.mjs
function mapKeys(object, getNewKey) {
  const result2 = {};
  const keys2 = Object.keys(object);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value = object[key];
    result2[getNewKey(value, key, object)] = value;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/mapKeys.mjs
function mapKeys2(object, getNewKey = identity) {
  if (object == null) return {};
  return mapKeys(object, iteratee(getNewKey));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/mapValues.mjs
function mapValues(object, getNewValue) {
  const result2 = {};
  const keys2 = Object.keys(object);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value = object[key];
    result2[key] = getNewValue(value, key, object);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/mapValues.mjs
function mapValues2(object, getNewValue = identity) {
  if (object == null) return {};
  return mapValues(object, iteratee(getNewValue));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/object/clone.mjs
function clone2(obj) {
  if (isPrimitive(obj)) return obj;
  if (Array.isArray(obj) || isTypedArray(obj) || obj instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && obj instanceof SharedArrayBuffer) return obj.slice(0);
  const prototype = Object.getPrototypeOf(obj);
  if (prototype == null) return Object.assign(Object.create(prototype), obj);
  const Constructor = prototype.constructor;
  if (obj instanceof Date || obj instanceof Map || obj instanceof Set) return new Constructor(obj);
  if (obj instanceof RegExp) {
    const newRegExp = new Constructor(obj);
    newRegExp.lastIndex = obj.lastIndex;
    return newRegExp;
  }
  if (obj instanceof DataView) return new Constructor(obj.buffer.slice(0));
  if (obj instanceof Error) {
    let newError;
    if (obj instanceof AggregateError) newError = new Constructor(obj.errors, obj.message, { cause: obj.cause });
    else newError = new Constructor(obj.message, { cause: obj.cause });
    newError.stack = obj.stack;
    Object.assign(newError, obj);
    return newError;
  }
  if (typeof File !== "undefined" && obj instanceof File) return new Constructor([obj], obj.name, {
    type: obj.type,
    lastModified: obj.lastModified
  });
  if (typeof obj === "object") return Object.assign(Object.create(prototype), obj);
  return obj;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/mergeWith.mjs
function mergeWith(object, ...otherArgs) {
  const sources = otherArgs.slice(0, -1);
  const merge2 = otherArgs[otherArgs.length - 1];
  let result2 = object;
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    result2 = mergeWithDeep(result2, source, merge2, /* @__PURE__ */ new Map());
  }
  return result2;
}
function mergeWithDeep(target, source, merge2, stack) {
  if (isPrimitive(target)) target = Object(target);
  if (source == null || typeof source !== "object") return target;
  if (stack.has(source)) return clone2(stack.get(source));
  stack.set(source, target);
  if (Array.isArray(source)) {
    source = source.slice();
    for (let i = 0; i < source.length; i++) if (!(i in source)) source[i] = void 0;
  }
  const sourceKeys = [...Object.keys(source), ...getSymbols(source)];
  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];
    if (isUnsafeProperty(key)) continue;
    let sourceValue = source[key];
    let targetValue = target[key];
    if (isArguments(sourceValue)) sourceValue = { ...sourceValue };
    if (isArguments(targetValue)) targetValue = { ...targetValue };
    if (isBuffer(sourceValue)) sourceValue = cloneDeep2(sourceValue);
    if (Array.isArray(sourceValue)) if (Array.isArray(targetValue)) {
      const cloned = [];
      const targetKeys = Reflect.ownKeys(targetValue);
      for (let i2 = 0; i2 < targetKeys.length; i2++) {
        const targetKey = targetKeys[i2];
        cloned[targetKey] = targetValue[targetKey];
      }
      targetValue = cloned;
    } else if (isArrayLikeObject(targetValue)) {
      const cloned = [];
      for (let i2 = 0; i2 < targetValue.length; i2++) cloned[i2] = targetValue[i2];
      targetValue = cloned;
    } else targetValue = [];
    const merged = merge2(targetValue, sourceValue, key, target, source, stack);
    if (merged !== void 0) target[key] = merged;
    else if (Array.isArray(sourceValue)) target[key] = mergeWithDeep(targetValue, sourceValue, merge2, stack);
    else if (isObjectLike(targetValue) && isObjectLike(sourceValue) && (isPlainObject(targetValue) || isPlainObject(sourceValue) || isTypedArray2(targetValue) || isTypedArray2(sourceValue))) target[key] = mergeWithDeep(targetValue, sourceValue, merge2, stack);
    else if (targetValue == null && isPlainObject(sourceValue)) target[key] = mergeWithDeep({}, sourceValue, merge2, stack);
    else if (targetValue == null && isTypedArray2(sourceValue)) target[key] = cloneDeep2(sourceValue);
    else if (targetValue === void 0 || sourceValue !== void 0) target[key] = sourceValue;
  }
  return target;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/merge.mjs
function merge(object, ...sources) {
  return mergeWith(object, ...sources, noop);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/getSymbolsIn.mjs
function getSymbolsIn(object) {
  const result2 = [];
  while (object) {
    result2.push(...getSymbols(object));
    object = Object.getPrototypeOf(object);
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/omit.mjs
function omit(obj, ...keysArr) {
  if (obj == null) return {};
  keysArr = flatten2(keysArr);
  const result2 = cloneInOmit(obj, keysArr);
  for (let i = 0; i < keysArr.length; i++) {
    const keys2 = keysArr[i];
    switch (typeof keys2) {
      case "object":
        if (Array.isArray(keys2)) unset(result2, keys2);
        else {
          const arrayLikeKeys2 = Array.from(keys2);
          for (let j = 0; j < arrayLikeKeys2.length; j++) unset(result2, arrayLikeKeys2[j]);
        }
        break;
      case "string":
      case "symbol":
      case "number":
        unset(result2, keys2);
        break;
    }
  }
  return result2;
}
function cloneInOmit(obj, keys2) {
  if (keys2.some((key) => Array.isArray(key) || isDeepKey(key))) return deepCloneInOmit(obj);
  return shallowCloneInOmit(obj);
}
function shallowCloneInOmit(obj) {
  const result2 = {};
  const keysToCopy = [...keysIn(obj), ...getSymbolsIn(obj)];
  for (let i = 0; i < keysToCopy.length; i++) {
    const key = keysToCopy[i];
    result2[key] = obj[key];
  }
  return result2;
}
function deepCloneInOmit(obj) {
  const result2 = {};
  const keysToCopy = [...keysIn(obj), ...getSymbolsIn(obj)];
  for (let i = 0; i < keysToCopy.length; i++) {
    const key = keysToCopy[i];
    result2[key] = cloneDeepWith2(obj[key], (valueToClone) => {
      if (isPlainObject(valueToClone)) return;
      return valueToClone;
    });
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/omitBy.mjs
function omitBy(object, shouldOmit) {
  if (object == null) return {};
  const result2 = {};
  const predicate = iteratee(shouldOmit ?? identity2);
  const keys2 = [...keysIn(object), ...getSymbolsIn(object)];
  for (let i = 0; i < keys2.length; i++) {
    const key = isSymbol(keys2[i]) ? keys2[i] : keys2[i].toString();
    const value = object[key];
    if (!predicate(value, key, object)) result2[key] = value;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/pick.mjs
function pick(object, ...keysArr) {
  if (isNil2(object)) return {};
  const result2 = {};
  for (let i = 0; i < keysArr.length; i++) {
    let keys2 = keysArr[i];
    switch (typeof keys2) {
      case "object":
        if (!Array.isArray(keys2)) if (isArrayLike(keys2)) keys2 = Array.from(keys2);
        else keys2 = [keys2];
        break;
      case "string":
      case "symbol":
      case "number":
        keys2 = [keys2];
        break;
    }
    for (const key of keys2) {
      const value = get(object, key);
      if (value === void 0 && !has(object, key)) continue;
      if (typeof key === "string" && Object.hasOwn(object, key)) result2[key] = object[key];
      else set(result2, key, value);
    }
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/pickBy.mjs
function pickBy(obj, shouldPick) {
  if (obj == null) return {};
  const predicate = iteratee(shouldPick ?? identity2);
  const result2 = {};
  const keys2 = isArrayLike(obj) ? range(0, obj.length) : [...keysIn(obj), ...getSymbolsIn(obj)];
  for (let i = 0; i < keys2.length; i++) {
    const key = isSymbol(keys2[i]) ? keys2[i] : keys2[i].toString();
    const value = obj[key];
    if (predicate(value, key, obj)) result2[key] = value;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/propertyOf.mjs
function propertyOf(object) {
  return function(path) {
    return get(object, path);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/result.mjs
function result(object, path, defaultValue) {
  if (isKey(path, object)) path = [path];
  else if (!Array.isArray(path)) path = toPath(toString(path));
  const pathLength = Math.max(path.length, 1);
  for (let index = 0; index < pathLength; index++) {
    const value = object == null ? void 0 : object[toKey(path[index])];
    if (value === void 0) return typeof defaultValue === "function" ? defaultValue.call(object) : defaultValue;
    object = typeof value === "function" ? value.call(object) : value;
  }
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/setWith.mjs
function setWith(obj, path, value, customizer) {
  let customizerFn;
  if (typeof customizer === "function") customizerFn = customizer;
  else customizerFn = () => void 0;
  return updateWith(obj, path, () => value, customizerFn);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/toDefaulted.mjs
function toDefaulted(object, ...sources) {
  return defaults(cloneDeep2(object), ...sources);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isBuffer.mjs
function isBuffer2(x) {
  return isBuffer(x);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/transform.mjs
function transform(object, iteratee$1 = identity, accumulator) {
  const isArrayOrBufferOrTypedArray = Array.isArray(object) || isBuffer2(object) || isTypedArray2(object);
  iteratee$1 = iteratee(iteratee$1);
  if (accumulator == null) if (isArrayOrBufferOrTypedArray) accumulator = [];
  else if (isObject(object) && isFunction(object.constructor)) accumulator = Object.create(Object.getPrototypeOf(object));
  else accumulator = {};
  if (object == null) return accumulator;
  forEach(object, (value, key, object2) => iteratee$1(accumulator, value, key, object2));
  return accumulator;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/update.mjs
function update(obj, path, updater) {
  return updateWith(obj, path, updater, () => void 0);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/valuesIn.mjs
function valuesIn(object) {
  const keys2 = keysIn(object);
  const result2 = new Array(keys2.length);
  for (let i = 0; i < keys2.length; i++) result2[i] = object[keys2[i]];
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isFunction.mjs
function isFunction2(value) {
  return typeof value === "function";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isLength.mjs
function isLength2(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isNative.mjs
var functionToString = Function.prototype.toString;
var IS_NATIVE_FUNCTION_REGEXP = RegExp(`^${functionToString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?")}$`);
function isNative(value) {
  if (typeof value !== "function") return false;
  if ((globalThis == null ? void 0 : globalThis["__core-js_shared__"]) != null) throw new Error("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
  return IS_NATIVE_FUNCTION_REGEXP.test(functionToString.call(value));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isNull.mjs
function isNull2(value) {
  return value === null;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isUndefined.mjs
function isUndefined2(x) {
  return isUndefined(x);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/conformsTo.mjs
function conformsTo(target, source) {
  if (source == null) return true;
  if (target == null) return Object.keys(source).length === 0;
  const keys2 = Object.keys(source);
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const predicate = source[key];
    const value = target[key];
    if (value === void 0 && !(key in target)) return false;
    if (typeof predicate === "function" && !predicate(value)) return false;
  }
  return true;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/conforms.mjs
function conforms(source) {
  source = cloneDeep(source);
  return function(object) {
    return conformsTo(object, source);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isArrayBuffer.mjs
function isArrayBuffer2(value) {
  return isArrayBuffer(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isBoolean.mjs
function isBoolean2(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isDate.mjs
function isDate2(value) {
  return isDate(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isElement.mjs
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/function/after.mjs
function after2(n, func) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`n must be a non-negative integer.`);
  let counter = 0;
  return (...args) => {
    if (++counter >= n) return func(...args);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isEqualWith.mjs
function isEqualWith2(a, b, areValuesEqual) {
  if (typeof areValuesEqual !== "function") areValuesEqual = () => void 0;
  return isEqualWith(a, b, (...args) => {
    const result2 = areValuesEqual(...args);
    if (result2 !== void 0) return Boolean(result2);
    if (a instanceof Map && b instanceof Map) return isEqualWith2(Array.from(a), Array.from(b), after2(2, areValuesEqual));
    if (a instanceof Set && b instanceof Set) return isEqualWith2(Array.from(a), Array.from(b), after2(2, areValuesEqual));
  });
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isError.mjs
function isError2(value) {
  return getTag(value) === "[object Error]";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isFinite.mjs
function isFinite2(value) {
  return Number.isFinite(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isInteger.mjs
function isInteger(value) {
  return Number.isInteger(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isRegExp.mjs
function isRegExp2(value) {
  return isRegExp(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isSafeInteger.mjs
function isSafeInteger(value) {
  return Number.isSafeInteger(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isWeakMap.mjs
function isWeakMap2(value) {
  return isWeakMap(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isWeakSet.mjs
function isWeakSet2(value) {
  return isWeakSet(value);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/capitalize.mjs
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/capitalize.mjs
function capitalize2(str) {
  return capitalize(toString(str));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/bindAll.mjs
function bindAll(object, ...methodNames) {
  if (object == null) return object;
  if (!isObject(object)) return object;
  if (isArray(object) && methodNames.length === 0) return object;
  const methods = [];
  for (let i = 0; i < methodNames.length; i++) {
    const name = methodNames[i];
    if (isArray(name)) methods.push(...name);
    else if (name && typeof name === "object" && "length" in name) methods.push(...Array.from(name));
    else methods.push(name);
  }
  if (methods.length === 0) return object;
  for (let i = 0; i < methods.length; i++) {
    const key = methods[i];
    const stringKey = toString(key);
    const func = object[stringKey];
    if (isFunction(func)) object[stringKey] = func.bind(object);
  }
  return object;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/deburr.mjs
var deburrMap = /* @__PURE__ */ new Map([
  ["Æ", "Ae"],
  ["Ð", "D"],
  ["Ø", "O"],
  ["Þ", "Th"],
  ["ß", "ss"],
  ["æ", "ae"],
  ["ð", "d"],
  ["ø", "o"],
  ["þ", "th"],
  ["Đ", "D"],
  ["đ", "d"],
  ["Ħ", "H"],
  ["ħ", "h"],
  ["ı", "i"],
  ["Ĳ", "IJ"],
  ["ĳ", "ij"],
  ["ĸ", "k"],
  ["Ŀ", "L"],
  ["ŀ", "l"],
  ["Ł", "L"],
  ["ł", "l"],
  ["ŉ", "'n"],
  ["Ŋ", "N"],
  ["ŋ", "n"],
  ["Œ", "Oe"],
  ["œ", "oe"],
  ["Ŧ", "T"],
  ["ŧ", "t"],
  ["ſ", "s"]
]);
function deburr(str) {
  str = str.normalize("NFD");
  let result2 = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char >= "̀" && char <= "ͯ" || char >= "⃐" && char <= "⃿" || char >= "︠" && char <= "︯") continue;
    result2 += deburrMap.get(char) ?? char;
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/deburr.mjs
function deburr2(str) {
  return deburr(toString(str));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/words.mjs
var rNonCharLatin = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\xd7\\xf7";
var rUnicodeUpper = "\\p{Lu}";
var rUnicodeLower = "\\p{Ll}";
var rMisc = "(?:[\\p{Lm}\\p{Lo}]\\p{M}*)";
var rNumber = "\\d";
var rUnicodeOptContrLower = "(?:['’](?:d|ll|m|re|s|t|ve))?";
var rUnicodeOptContrUpper = "(?:['’](?:D|LL|M|RE|S|T|VE))?";
var rUnicodeBreak = `[\\p{Z}\\p{P}${rNonCharLatin}]`;
var rUnicodeMiscUpper = `(?:${rUnicodeUpper}|${rMisc})`;
var rUnicodeMiscLower = `(?:${rUnicodeLower}|${rMisc})`;
var rUnicodeWord;
function getUnicodeWordPattern() {
  if (rUnicodeWord == null) rUnicodeWord = RegExp([
    `${rUnicodeUpper}?${rUnicodeLower}+${rUnicodeOptContrLower}(?=${rUnicodeBreak}|${rUnicodeUpper}|$)`,
    `${rUnicodeMiscUpper}+${rUnicodeOptContrUpper}(?=${rUnicodeBreak}|${rUnicodeUpper}${rUnicodeMiscLower}|$)`,
    `${rUnicodeUpper}?${rUnicodeMiscLower}+${rUnicodeOptContrLower}`,
    `${rUnicodeUpper}+${rUnicodeOptContrUpper}`,
    `${rNumber}*(?:1ST|2ND|3RD|(?![123])${rNumber}TH)(?=\\b|[a-z_])`,
    `${rNumber}*(?:1st|2nd|3rd|(?![123])${rNumber}th)(?=\\b|[A-Z_])`,
    `${rNumber}+`,
    "\\p{Emoji_Presentation}",
    "\\p{Extended_Pictographic}"
  ].join("|"), "gu");
  return rUnicodeWord;
}
function words(str, pattern, guard) {
  const input = toString(str);
  if (guard || pattern === void 0) pattern = getUnicodeWordPattern();
  if (typeof pattern === "number") pattern = pattern.toString();
  return Array.from(input.match(pattern) ?? []).filter((x) => x !== "");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/normalizeForCase.mjs
function normalizeForCase(str) {
  if (typeof str !== "string") str = toString(str);
  return str.replace(/['\u2019]/g, "");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/camelCase.mjs
function camelCase(str) {
  const splitWords = words(normalizeForCase(deburr2(str)));
  if (splitWords.length === 0) return "";
  const [first, ...rest3] = splitWords;
  return `${first.toLowerCase()}${rest3.map((word) => capitalize(word)).join("")}`;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/endsWith.mjs
function endsWith(str, target, position) {
  if (str == null || target == null) return false;
  if (position == null) position = str.length;
  return str.endsWith(target, position);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/escape.mjs
var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escape2(str) {
  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/escape.mjs
function escape3(string) {
  return escape2(toString(string));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/escapeRegExp.mjs
function escapeRegExp(str) {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/escapeRegExp.mjs
function escapeRegExp2(str) {
  return escapeRegExp(toString(str));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/kebabCase.mjs
function kebabCase(str) {
  return words(normalizeForCase(deburr2(str))).map((word) => word.toLowerCase()).join("-");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/lowerCase.mjs
function lowerCase(str) {
  return words(normalizeForCase(deburr2(str))).map((word) => word.toLowerCase()).join(" ");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/lowerFirst.mjs
function lowerFirst(str) {
  return str.substring(0, 1).toLowerCase() + str.substring(1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/lowerFirst.mjs
function lowerFirst2(str) {
  return lowerFirst(toString(str));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/createPadding.mjs
function stringSize(str) {
  return regexMultiByte.test(str) ? Array.from(str).length : str.length;
}
function createPadding(length, chars) {
  const charsLength = stringSize(chars);
  if (charsLength === 0 || length < 1) return "";
  const result2 = chars.repeat(Math.ceil(length / charsLength));
  return regexMultiByte.test(result2) ? Array.from(result2).slice(0, length).join("") : result2.slice(0, length);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/pad.mjs
function pad(str, length = 0, chars = " ") {
  const value = toString(str);
  const targetLength = toInteger(length);
  const strLength = stringSize(value);
  if (targetLength <= strLength) return value;
  const mid = (targetLength - strLength) / 2;
  const padChars = `${chars}`;
  return createPadding(Math.floor(mid), padChars) + value + createPadding(Math.ceil(mid), padChars);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/padEnd.mjs
function padEnd(str, length = 0, chars = " ") {
  const value = toString(str);
  const targetLength = toInteger(length);
  const strLength = stringSize(value);
  if (targetLength <= strLength) return value;
  return value + createPadding(targetLength - strLength, `${chars}`);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/padStart.mjs
function padStart(str, length = 0, chars = " ") {
  const value = toString(str);
  const targetLength = toInteger(length);
  const strLength = stringSize(value);
  if (targetLength <= strLength) return value;
  return createPadding(targetLength - strLength, `${chars}`) + value;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/MAX_SAFE_INTEGER.mjs
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/repeat.mjs
function repeat(str, n, guard) {
  if (guard ? isIterateeCall(str, n, guard) : n === void 0) n = 1;
  else n = toInteger(n);
  if (n < 1 || n > MAX_SAFE_INTEGER) return "";
  return toString(str).repeat(n);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/replace.mjs
function replace(target, pattern, replacement) {
  if (arguments.length < 3) return toString(target);
  return toString(target).replace(pattern, replacement);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/snakeCase.mjs
function snakeCase(str) {
  return words(normalizeForCase(deburr2(str))).map((word) => word.toLowerCase()).join("_");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/split.mjs
function split(string, separator, limit) {
  return toString(string).split(separator, limit);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/startCase.mjs
function startCase(str) {
  const words$1 = words(normalizeForCase(deburr2(str)).trim());
  let result2 = "";
  for (let i = 0; i < words$1.length; i++) {
    const word = words$1[i];
    if (result2) result2 += " ";
    if (word === word.toUpperCase()) result2 += word;
    else result2 += word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/startsWith.mjs
function startsWith(str, target, position) {
  if (str == null || target == null) return false;
  if (position == null) position = 0;
  return str.startsWith(target, position);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/template.mjs
var esTemplateRegExp = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var unEscapedRegExp = /['\n\r\u2028\u2029\\]/g;
var noMatchExp = /($^)/;
var escapeMap = /* @__PURE__ */ new Map([
  ["\\", "\\"],
  ["'", "'"],
  ["\n", "n"],
  ["\r", "r"],
  ["\u2028", "u2028"],
  ["\u2029", "u2029"]
]);
function escapeString(match) {
  return `\\${escapeMap.get(match)}`;
}
var defaultInterpolateRegExp = /<%=([\s\S]+?)%>/g;
var templateSettings = {
  escape: /<%-([\s\S]+?)%>/g,
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: defaultInterpolateRegExp,
  variable: "",
  imports: { _: {
    escape: escape3,
    template
  } }
};
function template(string, options, guard) {
  var _a2, _b, _c;
  string = toString(string);
  if (guard && isIterateeCall(string, options, guard)) options = templateSettings;
  options = defaults({ ...options }, templateSettings);
  const delimitersRegExp = new RegExp([
    ((_a2 = options.escape) == null ? void 0 : _a2.source) ?? noMatchExp.source,
    ((_b = options.interpolate) == null ? void 0 : _b.source) ?? noMatchExp.source,
    options.interpolate === defaultInterpolateRegExp ? esTemplateRegExp.source : noMatchExp.source,
    ((_c = options.evaluate) == null ? void 0 : _c.source) ?? noMatchExp.source,
    "$"
  ].join("|"), "g");
  let lastIndex = 0;
  let isEvaluated = false;
  let source = `__p += ''`;
  for (const match of string.matchAll(delimitersRegExp)) {
    const [fullMatch, escapeValue, interpolateValue, esTemplateValue, evaluateValue] = match;
    const { index } = match;
    source += ` + '${string.slice(lastIndex, index).replace(unEscapedRegExp, escapeString)}'`;
    if (escapeValue) source += ` + _.escape(${escapeValue})`;
    if (interpolateValue) source += ` + ((${interpolateValue}) == null ? '' : ${interpolateValue})`;
    else if (esTemplateValue) source += ` + ((${esTemplateValue}) == null ? '' : ${esTemplateValue})`;
    if (evaluateValue) {
      source += `;
${evaluateValue};
 __p += ''`;
      isEvaluated = true;
    }
    lastIndex = index + fullMatch.length;
  }
  const imports = defaults({ ...options.imports }, templateSettings.imports);
  const importsKeys = Object.keys(imports);
  const importValues = Object.values(imports);
  const sourceURL = `//# sourceURL=${options.sourceURL ? String(options.sourceURL).replace(/[\r\n]/g, " ") : `es-toolkit.templateSource[${Date.now()}]`}
`;
  const compiledFunction = `function(${options.variable || "obj"}) {
    let __p = '';
    ${options.variable ? "" : "if (obj == null) { obj = {}; }"}
    ${isEvaluated ? `function print() { __p += Array.prototype.join.call(arguments, ''); }` : ""}
    ${options.variable ? source : `with(obj) {
${source}
}`}
    return __p;
  }`;
  const result2 = attempt(() => new Function(...importsKeys, `${sourceURL}return ${compiledFunction}`)(...importValues));
  result2.source = compiledFunction;
  if (result2 instanceof Error) throw result2;
  return result2;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/templateSettings.mjs
var templateSettings2 = templateSettings;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/toLower.mjs
function toLower(value) {
  return toString(value).toLowerCase();
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/toUpper.mjs
function toUpper(value) {
  return toString(value).toUpperCase();
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/trimEnd.mjs
function trimEnd(str, chars) {
  if (chars === void 0) return str.trimEnd();
  let endIndex = str.length;
  switch (typeof chars) {
    case "string":
      if (chars.length !== 1) throw new Error(`The 'chars' parameter should be a single character string.`);
      while (endIndex > 0 && str[endIndex - 1] === chars) endIndex--;
      break;
    case "object":
      while (endIndex > 0 && chars.includes(str[endIndex - 1])) endIndex--;
  }
  return str.substring(0, endIndex);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/trimStart.mjs
function trimStart(str, chars) {
  if (chars === void 0) return str.trimStart();
  let startIndex = 0;
  switch (typeof chars) {
    case "string":
      if (chars.length !== 1) throw new Error(`The 'chars' parameter should be a single character string.`);
      while (startIndex < str.length && str[startIndex] === chars) startIndex++;
      break;
    case "object":
      while (startIndex < str.length && chars.includes(str[startIndex])) startIndex++;
  }
  return str.substring(startIndex);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/trim.mjs
function trim(str, chars) {
  if (chars === void 0) return str.trim();
  return trimStart(trimEnd(str, chars), chars);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/trim.mjs
function trim2(str, chars, guard) {
  if (str == null) return "";
  if (guard != null || chars == null) return str.toString().trim();
  switch (typeof chars) {
    case "object":
      if (Array.isArray(chars)) return trim(str, chars.flatMap((x) => x.toString().split("")));
      else return trim(str, chars.toString().split(""));
    default:
      return trim(str, chars.toString().split(""));
  }
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/trimEnd.mjs
function trimEnd2(str, chars, guard) {
  if (str == null) return "";
  if (guard != null || chars == null) return str.toString().trimEnd();
  return trimEnd(str, chars.toString().split(""));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/trimStart.mjs
function trimStart2(str, chars, guard) {
  if (str == null) return "";
  if (guard != null || chars == null) return str.toString().trimStart();
  return trimStart(str, chars.toString().split(""));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/truncate.mjs
function truncate(string, options) {
  string = string != null ? `${string}` : "";
  let length = 30;
  let omission = "...";
  if (isObject(options)) {
    length = parseLength(options.length);
    omission = "omission" in options ? `${options.omission}` : "...";
  }
  let i = string.length;
  const lengthOmission = Array.from(omission).length;
  const lengthBase = Math.max(length - lengthOmission, 0);
  let strArray = void 0;
  if (regexMultiByte.test(string)) {
    strArray = Array.from(string);
    i = strArray.length;
  }
  if (length >= i) return string;
  if (i <= lengthOmission) return omission;
  let base = strArray === void 0 ? string.slice(0, lengthBase) : strArray == null ? void 0 : strArray.slice(0, lengthBase).join("");
  const separator = options == null ? void 0 : options.separator;
  if (!separator) {
    base += omission;
    return base;
  }
  const search = separator instanceof RegExp ? separator.source : separator;
  const flags = "u" + (separator instanceof RegExp ? separator.flags.replace("u", "") : "");
  const withoutSeparator = new RegExp(`(?<result>.*(?:(?!${search}).))(?:${search})`, flags).exec(base);
  return (!(withoutSeparator == null ? void 0 : withoutSeparator.groups) ? base : withoutSeparator.groups.result) + omission;
}
function parseLength(length) {
  if (length == null) return 30;
  if (length <= 0) return 0;
  return length;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/unescape.mjs
var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
function unescape2(str) {
  return str.replace(/&(?:amp|lt|gt|quot|#(0+)?39);/g, (match) => htmlUnescapes[match] || "'");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/unescape.mjs
function unescape3(str) {
  return unescape2(toString(str));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/upperCase.mjs
function upperCase(str) {
  return words(normalizeForCase(deburr2(str))).map((word) => word.toUpperCase()).join(" ");
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/string/upperFirst.mjs
function upperFirst(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/string/upperFirst.mjs
function upperFirst2(str) {
  return upperFirst(toString(str));
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/cond.mjs
function cond(pairs) {
  const length = pairs.length;
  const processedPairs = pairs.map((pair) => {
    const predicate = pair[0];
    const func = pair[1];
    if (!isFunction(func)) throw new TypeError("Expected a function");
    return [iteratee(predicate), func];
  });
  return function(...args) {
    for (let i = 0; i < length; i++) {
      const pair = processedPairs[i];
      const predicate = pair[0];
      const func = pair[1];
      if (predicate.apply(this, args)) return func.apply(this, args);
    }
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/constant.mjs
function constant(value) {
  return () => value;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/defaultTo.mjs
function defaultTo(value, defaultValue) {
  if (value == null || Number.isNaN(value)) return defaultValue;
  return value;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/gt.mjs
function gt(value, other) {
  if (typeof value === "string" && typeof other === "string") return value > other;
  return toNumber(value) > toNumber(other);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/gte.mjs
function gte(value, other) {
  if (typeof value === "string" && typeof other === "string") return value >= other;
  return toNumber(value) >= toNumber(other);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/invoke.mjs
function invoke(object, path, ...args) {
  args = args.flat(1);
  if (object == null) return;
  switch (typeof path) {
    case "string":
      if (typeof object === "object" && Object.hasOwn(object, path)) return invokeImpl(object, [path], args);
      return invokeImpl(object, toPath(path), args);
    case "number":
    case "symbol":
      return invokeImpl(object, [path], args);
    default:
      if (Array.isArray(path)) return invokeImpl(object, path, args);
      else return invokeImpl(object, [path], args);
  }
}
function invokeImpl(object, path, args) {
  var _a2;
  const parent = get(object, path.slice(0, -1), object);
  if (parent == null) return;
  let lastKey = last2(path);
  const lastValue = lastKey == null ? void 0 : lastKey.valueOf();
  if (typeof lastValue === "number") lastKey = toKey(lastValue);
  else lastKey = String(lastKey);
  return (_a2 = get(parent, lastKey)) == null ? void 0 : _a2.apply(parent, args);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/lt.mjs
function lt(value, other) {
  if (typeof value === "string" && typeof other === "string") return value < other;
  return toNumber(value) < toNumber(other);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/lte.mjs
function lte(value, other) {
  if (typeof value === "string" && typeof other === "string") return value <= other;
  return toNumber(value) <= toNumber(other);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/method.mjs
function method(path, ...args) {
  return function(object) {
    return invoke(object, path, args);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/methodOf.mjs
function methodOf(object, ...args) {
  return function(path) {
    return invoke(object, path, args);
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/now.mjs
function now() {
  return Date.now();
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/over.mjs
function over(...iteratees) {
  if (iteratees.length === 1 && Array.isArray(iteratees[0])) iteratees = iteratees[0];
  const funcs = iteratees.map((item) => iteratee(item));
  return function(...args) {
    return funcs.map((func) => func.apply(this, args));
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/overEvery.mjs
function overEvery(...predicates) {
  return function(...values2) {
    for (let i = 0; i < predicates.length; ++i) {
      const predicate = predicates[i];
      if (!Array.isArray(predicate)) {
        if (!iteratee(predicate).apply(this, values2)) return false;
        continue;
      }
      for (let j = 0; j < predicate.length; ++j) if (!iteratee(predicate[j]).apply(this, values2)) return false;
    }
    return true;
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/overSome.mjs
function overSome(...predicates) {
  return function(...values2) {
    for (let i = 0; i < predicates.length; ++i) {
      const predicate = predicates[i];
      if (!Array.isArray(predicate)) {
        if (iteratee(predicate).apply(this, values2)) return true;
        continue;
      }
      for (let j = 0; j < predicate.length; ++j) if (iteratee(predicate[j]).apply(this, values2)) return true;
    }
    return false;
  };
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/stubArray.mjs
function stubArray() {
  return [];
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/stubFalse.mjs
function stubFalse() {
  return false;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/stubObject.mjs
function stubObject() {
  return {};
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/stubString.mjs
function stubString() {
  return "";
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/stubTrue.mjs
function stubTrue() {
  return true;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/MAX_ARRAY_LENGTH.mjs
var MAX_ARRAY_LENGTH = 4294967295;

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toLength.mjs
function toLength(value) {
  if (value == null) return 0;
  return clamp(toInteger(value), 0, MAX_ARRAY_LENGTH);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toPlainObject.mjs
function toPlainObject(value) {
  const plainObject = {};
  const valueKeys = keysIn(value);
  for (let i = 0; i < valueKeys.length; i++) {
    const key = valueKeys[i];
    const objValue = value[key];
    if (key === "__proto__") Object.defineProperty(plainObject, key, {
      configurable: true,
      enumerable: true,
      value: objValue,
      writable: true
    });
    else plainObject[key] = objValue;
  }
  return plainObject;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/toSafeInteger.mjs
function toSafeInteger(value) {
  if (value == null) return 0;
  return clamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/util/uniqueId.mjs
var idCounter = 0;
function uniqueId(prefix = "") {
  return `${prefix}${++idCounter}`;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/compat.mjs
var compat_exports = __exportAll({
  add: () => add,
  after: () => after,
  ary: () => ary2,
  assign: () => assign,
  assignIn: () => assignIn,
  assignInWith: () => assignInWith,
  assignWith: () => assignWith,
  at: () => at,
  attempt: () => attempt,
  before: () => before,
  bind: () => bind,
  bindAll: () => bindAll,
  bindKey: () => bindKey,
  camelCase: () => camelCase,
  capitalize: () => capitalize2,
  castArray: () => castArray,
  ceil: () => ceil,
  chunk: () => chunk2,
  clamp: () => clamp,
  clone: () => clone,
  cloneDeep: () => cloneDeep2,
  cloneDeepWith: () => cloneDeepWith2,
  cloneWith: () => cloneWith,
  compact: () => compact2,
  concat: () => concat,
  cond: () => cond,
  conforms: () => conforms,
  conformsTo: () => conformsTo,
  constant: () => constant,
  countBy: () => countBy,
  create: () => create,
  curry: () => curry,
  curryRight: () => curryRight,
  debounce: () => debounce2,
  deburr: () => deburr2,
  defaultTo: () => defaultTo,
  defaults: () => defaults,
  defaultsDeep: () => defaultsDeep,
  defer: () => defer,
  delay: () => delay,
  difference: () => difference2,
  differenceBy: () => differenceBy2,
  differenceWith: () => differenceWith2,
  divide: () => divide,
  drop: () => drop2,
  dropRight: () => dropRight2,
  dropRightWhile: () => dropRightWhile2,
  dropWhile: () => dropWhile2,
  each: () => forEach,
  eachRight: () => forEachRight,
  endsWith: () => endsWith,
  entries: () => toPairs,
  entriesIn: () => toPairsIn,
  eq: () => eq,
  escape: () => escape3,
  escapeRegExp: () => escapeRegExp2,
  every: () => every,
  extend: () => assignIn,
  extendWith: () => assignInWith,
  fill: () => fill2,
  filter: () => filter,
  find: () => find,
  findIndex: () => findIndex,
  findKey: () => findKey2,
  findLast: () => findLast,
  findLastIndex: () => findLastIndex,
  findLastKey: () => findLastKey,
  first: () => head2,
  flatMap: () => flatMap,
  flatMapDeep: () => flatMapDeep,
  flatMapDepth: () => flatMapDepth,
  flatten: () => flatten2,
  flattenDeep: () => flattenDeep,
  flattenDepth: () => flattenDepth,
  flip: () => flip,
  floor: () => floor,
  flow: () => flow2,
  flowRight: () => flowRight2,
  forEach: () => forEach,
  forEachRight: () => forEachRight,
  forIn: () => forIn,
  forInRight: () => forInRight,
  forOwn: () => forOwn,
  forOwnRight: () => forOwnRight,
  fromPairs: () => fromPairs,
  functions: () => functions,
  functionsIn: () => functionsIn,
  get: () => get,
  groupBy: () => groupBy2,
  gt: () => gt,
  gte: () => gte,
  has: () => has,
  hasIn: () => hasIn,
  head: () => head2,
  identity: () => identity2,
  inRange: () => inRange,
  includes: () => includes,
  indexOf: () => indexOf,
  initial: () => initial2,
  intersection: () => intersection2,
  intersectionBy: () => intersectionBy2,
  intersectionWith: () => intersectionWith2,
  invert: () => invert2,
  invertBy: () => invertBy,
  invoke: () => invoke,
  invokeMap: () => invokeMap,
  isArguments: () => isArguments,
  isArray: () => isArray,
  isArrayBuffer: () => isArrayBuffer2,
  isArrayLike: () => isArrayLike,
  isArrayLikeObject: () => isArrayLikeObject,
  isBoolean: () => isBoolean2,
  isBuffer: () => isBuffer2,
  isDate: () => isDate2,
  isElement: () => isElement,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isEqualWith: () => isEqualWith2,
  isError: () => isError2,
  isFinite: () => isFinite2,
  isFunction: () => isFunction2,
  isInteger: () => isInteger,
  isLength: () => isLength2,
  isMap: () => isMap2,
  isMatch: () => isMatch,
  isMatchWith: () => isMatchWith,
  isNaN: () => isNaN2,
  isNative: () => isNative,
  isNil: () => isNil2,
  isNull: () => isNull2,
  isNumber: () => isNumber2,
  isObject: () => isObject,
  isObjectLike: () => isObjectLike,
  isPlainObject: () => isPlainObject,
  isRegExp: () => isRegExp2,
  isSafeInteger: () => isSafeInteger,
  isSet: () => isSet2,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isTypedArray: () => isTypedArray2,
  isUndefined: () => isUndefined2,
  isWeakMap: () => isWeakMap2,
  isWeakSet: () => isWeakSet2,
  iteratee: () => iteratee,
  join: () => join,
  kebabCase: () => kebabCase,
  keyBy: () => keyBy,
  keys: () => keys,
  keysIn: () => keysIn,
  last: () => last2,
  lastIndexOf: () => lastIndexOf,
  lowerCase: () => lowerCase,
  lowerFirst: () => lowerFirst2,
  lt: () => lt,
  lte: () => lte,
  map: () => map,
  mapKeys: () => mapKeys2,
  mapValues: () => mapValues2,
  matches: () => matches,
  matchesProperty: () => matchesProperty,
  max: () => max,
  maxBy: () => maxBy,
  mean: () => mean,
  meanBy: () => meanBy,
  memoize: () => memoize,
  merge: () => merge,
  mergeWith: () => mergeWith,
  method: () => method,
  methodOf: () => methodOf,
  min: () => min,
  minBy: () => minBy,
  multiply: () => multiply,
  negate: () => negate,
  noop: () => noop2,
  now: () => now,
  nth: () => nth,
  nthArg: () => nthArg,
  omit: () => omit,
  omitBy: () => omitBy,
  once: () => once2,
  orderBy: () => orderBy,
  over: () => over,
  overArgs: () => overArgs,
  overEvery: () => overEvery,
  overSome: () => overSome,
  pad: () => pad,
  padEnd: () => padEnd,
  padStart: () => padStart,
  parseInt: () => parseInt2,
  partial: () => partial2,
  partialRight: () => partialRight2,
  partition: () => partition,
  pick: () => pick,
  pickBy: () => pickBy,
  property: () => property,
  propertyOf: () => propertyOf,
  pull: () => pull2,
  pullAll: () => pullAll,
  pullAllBy: () => pullAllBy,
  pullAllWith: () => pullAllWith,
  pullAt: () => pullAt,
  random: () => random2,
  range: () => range2,
  rangeRight: () => rangeRight,
  rearg: () => rearg,
  reduce: () => reduce,
  reduceRight: () => reduceRight,
  reject: () => reject,
  remove: () => remove2,
  repeat: () => repeat,
  replace: () => replace,
  rest: () => rest2,
  result: () => result,
  reverse: () => reverse,
  round: () => round,
  sample: () => sample2,
  sampleSize: () => sampleSize2,
  set: () => set,
  setWith: () => setWith,
  shuffle: () => shuffle2,
  size: () => size,
  slice: () => slice,
  snakeCase: () => snakeCase,
  some: () => some,
  sortBy: () => sortBy,
  sortedIndex: () => sortedIndex,
  sortedIndexBy: () => sortedIndexBy,
  sortedIndexOf: () => sortedIndexOf,
  sortedLastIndex: () => sortedLastIndex,
  sortedLastIndexBy: () => sortedLastIndexBy,
  sortedLastIndexOf: () => sortedLastIndexOf,
  split: () => split,
  spread: () => spread,
  startCase: () => startCase,
  startsWith: () => startsWith,
  stubArray: () => stubArray,
  stubFalse: () => stubFalse,
  stubObject: () => stubObject,
  stubString: () => stubString,
  stubTrue: () => stubTrue,
  subtract: () => subtract,
  sum: () => sum,
  sumBy: () => sumBy,
  tail: () => tail2,
  take: () => take2,
  takeRight: () => takeRight2,
  takeRightWhile: () => takeRightWhile,
  takeWhile: () => takeWhile,
  template: () => template,
  templateSettings: () => templateSettings2,
  throttle: () => throttle,
  times: () => times,
  toArray: () => toArray2,
  toDefaulted: () => toDefaulted,
  toFinite: () => toFinite,
  toInteger: () => toInteger,
  toLength: () => toLength,
  toLower: () => toLower,
  toNumber: () => toNumber,
  toPairs: () => toPairs,
  toPairsIn: () => toPairsIn,
  toPath: () => toPath,
  toPlainObject: () => toPlainObject,
  toSafeInteger: () => toSafeInteger,
  toString: () => toString,
  toUpper: () => toUpper,
  transform: () => transform,
  trim: () => trim2,
  trimEnd: () => trimEnd2,
  trimStart: () => trimStart2,
  truncate: () => truncate,
  unary: () => unary,
  unescape: () => unescape3,
  union: () => union,
  unionBy: () => unionBy,
  unionWith: () => unionWith,
  uniq: () => uniq2,
  uniqBy: () => uniqBy2,
  uniqWith: () => uniqWith2,
  uniqueId: () => uniqueId,
  unset: () => unset,
  unzip: () => unzip2,
  unzipWith: () => unzipWith,
  update: () => update,
  updateWith: () => updateWith,
  upperCase: () => upperCase,
  upperFirst: () => upperFirst2,
  values: () => values,
  valuesIn: () => valuesIn,
  without: () => without,
  words: () => words,
  wrap: () => wrap,
  xor: () => xor,
  xorBy: () => xorBy,
  xorWith: () => xorWith,
  zip: () => zip2,
  zipObject: () => zipObject,
  zipObjectDeep: () => zipObjectDeep,
  zipWith: () => zipWith
});

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/every.mjs
function every(collection, doesMatch, guard) {
  if (!collection) return true;
  if (guard && isIterateeCall(collection, doesMatch, guard)) doesMatch = void 0;
  const predicate = iteratee(doesMatch ?? identity);
  if (!isArrayLike(collection)) {
    const keys2 = Object.keys(collection);
    for (let i = 0; i < keys2.length; i++) {
      const key = keys2[i];
      const value = collection[key];
      if (!predicate(value, key, collection)) return false;
    }
    return true;
  }
  for (let i = 0; i < collection.length; i++) if (!predicate(collection[i], i, collection)) return false;
  return true;
}

// node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/toolkit.mjs
var toolkit = (value) => {
  return value;
};
Object.assign(toolkit, compat_exports);
toolkit.partial.placeholder = toolkit;
toolkit.partialRight.placeholder = toolkit;

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-ZIGJFQKS.mjs
var import_sanitize_url = __toESM(require_dist(), 1);
var ZERO_WIDTH_SPACE = "​";
var d3CurveTypes = {
  curveBasis: basis_default,
  curveBasisClosed: basisClosed_default,
  curveBasisOpen: basisOpen_default,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveBundle: bundle_default,
  curveCardinalClosed: cardinalClosed_default,
  curveCardinalOpen: cardinalOpen_default,
  curveCardinal: cardinal_default,
  curveCatmullRomClosed: catmullRomClosed_default,
  curveCatmullRomOpen: catmullRomOpen_default,
  curveCatmullRom: catmullRom_default,
  curveLinear: linear_default,
  curveLinearClosed: linearClosed_default,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural: natural_default,
  curveStep: step_default,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore
};
var directiveWithoutOpen = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi;
var detectInit = __name(function(text, config) {
  const inits = detectDirective(text, /(?:init\b)|(?:initialize\b)/);
  let results = {};
  if (Array.isArray(inits)) {
    const args = inits.map((init) => init.args);
    sanitizeDirective(args);
    results = assignWithDepth_default(results, [...args]);
  } else {
    results = inits.args;
  }
  if (!results) {
    return;
  }
  let type = detectType(text, config);
  const prop = "config";
  if (results[prop] !== void 0) {
    if (type === "flowchart-v2") {
      type = "flowchart";
    }
    results[type] = results[prop];
    delete results[prop];
  }
  return results;
}, "detectInit");
var detectDirective = __name(function(text, type = null) {
  var _a2, _b;
  try {
    const commentWithoutDirectives = new RegExp(
      `[%]{2}(?![{]${directiveWithoutOpen.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    text = text.trim().replace(commentWithoutDirectives, "").replace(/'/gm, '"');
    log.debug(
      `Detecting diagram directive${type !== null ? " type:" + type : ""} based on the text:${text}`
    );
    let match;
    const result2 = [];
    while ((match = directiveRegex.exec(text)) !== null) {
      if (match.index === directiveRegex.lastIndex) {
        directiveRegex.lastIndex++;
      }
      if (match && !type || type && ((_a2 = match[1]) == null ? void 0 : _a2.match(type)) || type && ((_b = match[2]) == null ? void 0 : _b.match(type))) {
        const type2 = match[1] ? match[1] : match[2];
        const args = match[3] ? match[3].trim() : match[4] ? JSON.parse(match[4].trim()) : null;
        result2.push({ type: type2, args });
      }
    }
    if (result2.length === 0) {
      return { type: text, args: null };
    }
    return result2.length === 1 ? result2[0] : result2;
  } catch (error) {
    log.error(
      `ERROR: ${error.message} - Unable to parse directive type: '${type}' based on the text: '${text}'`
    );
    return { type: void 0, args: null };
  }
}, "detectDirective");
var removeDirectives = __name(function(text) {
  return text.replace(directiveRegex, "");
}, "removeDirectives");
var isSubstringInArray = __name(function(str, arr) {
  for (const [i, element] of arr.entries()) {
    if (element.match(str)) {
      return i;
    }
  }
  return -1;
}, "isSubstringInArray");
function interpolateToCurve(interpolate, defaultCurve) {
  if (!interpolate) {
    return defaultCurve;
  }
  const curveName = `curve${interpolate.charAt(0).toUpperCase() + interpolate.slice(1)}`;
  return d3CurveTypes[curveName] ?? defaultCurve;
}
__name(interpolateToCurve, "interpolateToCurve");
function formatUrl(linkStr, config) {
  const url = linkStr.trim();
  if (!url) {
    return void 0;
  }
  if (config.securityLevel !== "loose") {
    return (0, import_sanitize_url.sanitizeUrl)(url);
  }
  return url;
}
__name(formatUrl, "formatUrl");
var runFunc = __name((functionName, ...params) => {
  const arrPaths = functionName.split(".");
  const len = arrPaths.length - 1;
  const fnName = arrPaths[len];
  let obj = window;
  for (let i = 0; i < len; i++) {
    obj = obj[arrPaths[i]];
    if (!obj) {
      log.error(`Function name: ${functionName} not found in window`);
      return;
    }
  }
  obj[fnName](...params);
}, "runFunc");
function distance(p1, p2) {
  if (!p1 || !p2) {
    return 0;
  }
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
__name(distance, "distance");
function traverseEdge(points) {
  let prevPoint;
  let totalDistance = 0;
  points.forEach((point) => {
    totalDistance += distance(point, prevPoint);
    prevPoint = point;
  });
  const remainingDistance = totalDistance / 2;
  return calculatePoint(points, remainingDistance);
}
__name(traverseEdge, "traverseEdge");
function calcLabelPosition(points) {
  if (points.length === 1) {
    return points[0];
  }
  return traverseEdge(points);
}
__name(calcLabelPosition, "calcLabelPosition");
var roundNumber = __name((num, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}, "roundNumber");
var calculatePoint = __name((points, distanceToTraverse) => {
  let prevPoint = void 0;
  let remainingDistance = distanceToTraverse;
  for (const point of points) {
    if (prevPoint) {
      const vectorDistance = distance(point, prevPoint);
      if (vectorDistance === 0) {
        return prevPoint;
      }
      if (vectorDistance < remainingDistance) {
        remainingDistance -= vectorDistance;
      } else {
        const distanceRatio = remainingDistance / vectorDistance;
        if (distanceRatio <= 0) {
          return prevPoint;
        }
        if (distanceRatio >= 1) {
          return { x: point.x, y: point.y };
        }
        if (distanceRatio > 0 && distanceRatio < 1) {
          return {
            x: roundNumber((1 - distanceRatio) * prevPoint.x + distanceRatio * point.x, 5),
            y: roundNumber((1 - distanceRatio) * prevPoint.y + distanceRatio * point.y, 5)
          };
        }
      }
    }
    prevPoint = point;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, "calculatePoint");
var calcCardinalityPosition = __name((isRelationTypePresent, points, initialPosition) => {
  log.info(`our points ${JSON.stringify(points)}`);
  if (points[0] !== initialPosition) {
    points = points.reverse();
  }
  const distanceToCardinalityPoint = 25;
  const center = calculatePoint(points, distanceToCardinalityPoint);
  const d = isRelationTypePresent ? 10 : 5;
  const angle = Math.atan2(points[0].y - center.y, points[0].x - center.x);
  const cardinalityPosition = { x: 0, y: 0 };
  cardinalityPosition.x = Math.sin(angle) * d + (points[0].x + center.x) / 2;
  cardinalityPosition.y = -Math.cos(angle) * d + (points[0].y + center.y) / 2;
  return cardinalityPosition;
}, "calcCardinalityPosition");
function calcTerminalLabelPosition(terminalMarkerSize, position, _points) {
  const points = structuredClone(_points);
  log.info("our points", points);
  if (position !== "start_left" && position !== "start_right") {
    points.reverse();
  }
  const distanceToCardinalityPoint = 25 + terminalMarkerSize;
  const center = calculatePoint(points, distanceToCardinalityPoint);
  const d = 10 + terminalMarkerSize * 0.5;
  const angle = Math.atan2(points[0].y - center.y, points[0].x - center.x);
  const cardinalityPosition = { x: 0, y: 0 };
  if (position === "start_left") {
    cardinalityPosition.x = Math.sin(angle + Math.PI) * d + (points[0].x + center.x) / 2;
    cardinalityPosition.y = -Math.cos(angle + Math.PI) * d + (points[0].y + center.y) / 2;
  } else if (position === "end_right") {
    cardinalityPosition.x = Math.sin(angle - Math.PI) * d + (points[0].x + center.x) / 2 - 5;
    cardinalityPosition.y = -Math.cos(angle - Math.PI) * d + (points[0].y + center.y) / 2 - 5;
  } else if (position === "end_left") {
    cardinalityPosition.x = Math.sin(angle) * d + (points[0].x + center.x) / 2 - 5;
    cardinalityPosition.y = -Math.cos(angle) * d + (points[0].y + center.y) / 2 - 5;
  } else {
    cardinalityPosition.x = Math.sin(angle) * d + (points[0].x + center.x) / 2;
    cardinalityPosition.y = -Math.cos(angle) * d + (points[0].y + center.y) / 2;
  }
  return cardinalityPosition;
}
__name(calcTerminalLabelPosition, "calcTerminalLabelPosition");
function getStylesFromArray(arr) {
  let style = "";
  let labelStyle = "";
  for (const element of arr) {
    if (element !== void 0) {
      if (element.startsWith("color:") || element.startsWith("text-align:")) {
        labelStyle = labelStyle + element + ";";
      } else {
        style = style + element + ";";
      }
    }
  }
  return { style, labelStyle };
}
__name(getStylesFromArray, "getStylesFromArray");
var cnt = 0;
var generateId = __name(() => {
  cnt++;
  return "id-" + Math.random().toString(36).substr(2, 12) + "-" + cnt;
}, "generateId");
function makeRandomHex(length) {
  let result2 = "";
  const characters = "0123456789abcdef";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result2 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result2;
}
__name(makeRandomHex, "makeRandomHex");
var random3 = __name((options) => {
  return makeRandomHex(options.length);
}, "random");
var getTextObj = __name(function() {
  return {
    x: 0,
    y: 0,
    fill: void 0,
    anchor: "start",
    style: "#666",
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0,
    valign: void 0,
    text: ""
  };
}, "getTextObj");
var drawSimpleText = __name(function(elem, textData) {
  const nText = textData.text.replace(common_default.lineBreakRegex, " ");
  const [, _fontSizePx] = parseFontSize(textData.fontSize);
  const textElem = elem.append("text");
  textElem.attr("x", textData.x);
  textElem.attr("y", textData.y);
  textElem.style("text-anchor", textData.anchor);
  textElem.style("font-family", textData.fontFamily);
  textElem.style("font-size", _fontSizePx);
  textElem.style("font-weight", textData.fontWeight);
  textElem.attr("fill", textData.fill);
  if (textData.class !== void 0) {
    textElem.attr("class", textData.class);
  }
  const span = textElem.append("tspan");
  span.attr("x", textData.x + textData.textMargin * 2);
  span.attr("fill", textData.fill);
  span.text(nText);
  return textElem;
}, "drawSimpleText");
var wrapLabel = memoize(
  (label, maxWidth, config) => {
    if (!label) {
      return label;
    }
    config = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      config
    );
    if (common_default.hasBreaks(label)) {
      return label;
    }
    const words2 = label.split(" ").filter(Boolean);
    const completedLines = [];
    let nextLine = "";
    words2.forEach((word, index) => {
      const wordLength = calculateTextWidth(`${word} `, config);
      const nextLineLength = calculateTextWidth(nextLine, config);
      if (wordLength > maxWidth) {
        const { hyphenatedStrings, remainingWord } = breakString(word, maxWidth, "-", config);
        completedLines.push(nextLine, ...hyphenatedStrings);
        nextLine = remainingWord;
      } else if (nextLineLength + wordLength >= maxWidth) {
        completedLines.push(nextLine);
        nextLine = word;
      } else {
        nextLine = [nextLine, word].filter(Boolean).join(" ");
      }
      const currentWord = index + 1;
      const isLastWord = currentWord === words2.length;
      if (isLastWord) {
        completedLines.push(nextLine);
      }
    });
    return completedLines.filter((line) => line !== "").join(config.joinWith);
  },
  (label, maxWidth, config) => `${label}${maxWidth}${config.fontSize}${config.fontWeight}${config.fontFamily}${config.joinWith}`
);
var breakString = memoize(
  (word, maxWidth, hyphenCharacter = "-", config) => {
    config = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      config
    );
    const characters = [...word];
    const lines = [];
    let currentLine = "";
    characters.forEach((character, index) => {
      const nextLine = `${currentLine}${character}`;
      const lineWidth = calculateTextWidth(nextLine, config);
      if (lineWidth >= maxWidth) {
        const currentCharacter = index + 1;
        const isLastLine = characters.length === currentCharacter;
        const hyphenatedNextLine = `${nextLine}${hyphenCharacter}`;
        lines.push(isLastLine ? nextLine : hyphenatedNextLine);
        currentLine = "";
      } else {
        currentLine = nextLine;
      }
    });
    return { hyphenatedStrings: lines, remainingWord: currentLine };
  },
  (word, maxWidth, hyphenCharacter = "-", config) => `${word}${maxWidth}${hyphenCharacter}${config.fontSize}${config.fontWeight}${config.fontFamily}`
);
function calculateTextHeight(text, config) {
  return calculateTextDimensions(text, config).height;
}
__name(calculateTextHeight, "calculateTextHeight");
function calculateTextWidth(text, config) {
  return calculateTextDimensions(text, config).width;
}
__name(calculateTextWidth, "calculateTextWidth");
var calculateTextDimensions = memoize(
  (text, config) => {
    const { fontSize = 12, fontFamily = "Arial", fontWeight = 400 } = config;
    if (!text) {
      return { width: 0, height: 0 };
    }
    const [, _fontSizePx] = parseFontSize(fontSize);
    const fontFamilies = ["sans-serif", fontFamily];
    const lines = text.split(common_default.lineBreakRegex);
    const dims = [];
    const body = select_default("body");
    if (!body.remove) {
      return { width: 0, height: 0, lineHeight: 0 };
    }
    const g = body.append("svg");
    for (const fontFamily2 of fontFamilies) {
      let cHeight = 0;
      const dim = { width: 0, height: 0, lineHeight: 0 };
      for (const line of lines) {
        const textObj = getTextObj();
        textObj.text = line || ZERO_WIDTH_SPACE;
        const textElem = drawSimpleText(g, textObj).style("font-size", _fontSizePx).style("font-weight", fontWeight).style("font-family", fontFamily2);
        const bBox = (textElem._groups || textElem)[0][0].getBBox();
        if (bBox.width === 0 && bBox.height === 0) {
          throw new Error("svg element not in render tree");
        }
        dim.width = Math.round(Math.max(dim.width, bBox.width));
        cHeight = Math.round(bBox.height);
        dim.height += cHeight;
        dim.lineHeight = Math.round(Math.max(dim.lineHeight, cHeight));
      }
      dims.push(dim);
    }
    g.remove();
    const index = isNaN(dims[1].height) || isNaN(dims[1].width) || isNaN(dims[1].lineHeight) || dims[0].height > dims[1].height && dims[0].width > dims[1].width && dims[0].lineHeight > dims[1].lineHeight ? 0 : 1;
    return dims[index];
  },
  (text, config) => `${text}${config.fontSize}${config.fontWeight}${config.fontFamily}`
);
var _a;
var InitIDGenerator = (_a = class {
  constructor(deterministic = false, seed) {
    this.count = 0;
    this.count = seed ? seed.length : 0;
    this.next = deterministic ? () => this.count++ : () => Date.now();
  }
}, __name(_a, "InitIDGenerator"), _a);
var decoder;
var entityDecode = __name(function(html) {
  decoder = decoder || document.createElement("div");
  html = escape(html).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";");
  decoder.innerHTML = html;
  return unescape(decoder.textContent);
}, "entityDecode");
function isDetailedError(error) {
  return "str" in error;
}
__name(isDetailedError, "isDetailedError");
var insertTitle = __name((parent, cssClass, titleTopMargin, title) => {
  var _a2;
  if (!title) {
    return;
  }
  const bounds = (_a2 = parent.node()) == null ? void 0 : _a2.getBBox();
  if (!bounds) {
    return;
  }
  parent.append("text").text(title).attr("text-anchor", "middle").attr("x", bounds.x + bounds.width / 2).attr("y", -titleTopMargin).attr("class", cssClass);
}, "insertTitle");
var parseFontSize = __name((fontSize) => {
  if (typeof fontSize === "number") {
    return [fontSize, fontSize + "px"];
  }
  const fontSizeNumber = parseInt(fontSize ?? "", 10);
  if (Number.isNaN(fontSizeNumber)) {
    return [void 0, void 0];
  } else if (fontSize === String(fontSizeNumber)) {
    return [fontSizeNumber, fontSize + "px"];
  } else {
    return [fontSizeNumber, fontSize];
  }
}, "parseFontSize");
function cleanAndMerge(defaultData, data) {
  return merge({}, defaultData, data);
}
__name(cleanAndMerge, "cleanAndMerge");
var utils_default = {
  assignWithDepth: assignWithDepth_default,
  wrapLabel,
  calculateTextHeight,
  calculateTextWidth,
  calculateTextDimensions,
  cleanAndMerge,
  detectInit,
  detectDirective,
  isSubstringInArray,
  interpolateToCurve,
  calcLabelPosition,
  calcCardinalityPosition,
  calcTerminalLabelPosition,
  formatUrl,
  getStylesFromArray,
  generateId,
  random: random3,
  runFunc,
  entityDecode,
  insertTitle,
  isLabelCoordinateInPath,
  parseFontSize,
  InitIDGenerator
};
var encodeEntities = __name(function(text) {
  let txt = text;
  txt = txt.replace(/style.*:\S*#.*;/g, function(s) {
    return s.substring(0, s.length - 1);
  });
  txt = txt.replace(/classDef.*:\S*#.*;/g, function(s) {
    return s.substring(0, s.length - 1);
  });
  txt = txt.replace(/#\w+;/g, function(s) {
    const innerTxt = s.substring(1, s.length - 1);
    const isInt = /^\+?\d+$/.test(innerTxt);
    if (isInt) {
      return "ﬂ°°" + innerTxt + "¶ß";
    } else {
      return "ﬂ°" + innerTxt + "¶ß";
    }
  });
  return txt;
}, "encodeEntities");
var decodeEntities = __name(function(text) {
  return text.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities");
var getEdgeId = __name((from, to, {
  counter = 0,
  prefix,
  suffix
}, id) => {
  if (id) {
    return id;
  }
  return `${prefix ? `${prefix}_` : ""}${from}_${to}_${counter}${suffix ? `_${suffix}` : ""}`;
}, "getEdgeId");
function handleUndefinedAttr(attrValue) {
  return attrValue ?? null;
}
__name(handleUndefinedAttr, "handleUndefinedAttr");
function isLabelCoordinateInPath(point, dAttr) {
  const roundedX = Math.round(point.x);
  const roundedY = Math.round(point.y);
  const sanitizedD = dAttr.replace(
    /(\d+\.\d+)/g,
    (match) => Math.round(parseFloat(match)).toString()
  );
  return sanitizedD.includes(roundedX.toString()) || sanitizedD.includes(roundedY.toString());
}
__name(isLabelCoordinateInPath, "isLabelCoordinateInPath");

export {
  clone,
  isEmpty,
  ZERO_WIDTH_SPACE,
  removeDirectives,
  interpolateToCurve,
  getStylesFromArray,
  generateId,
  random3 as random,
  wrapLabel,
  calculateTextHeight,
  calculateTextWidth,
  calculateTextDimensions,
  isDetailedError,
  parseFontSize,
  cleanAndMerge,
  utils_default,
  encodeEntities,
  decodeEntities,
  getEdgeId,
  handleUndefinedAttr
};
//# sourceMappingURL=chunk-OD7WKAUD.js.map
