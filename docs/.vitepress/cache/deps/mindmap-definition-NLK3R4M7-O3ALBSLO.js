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
import "./chunk-E7WPOYWJ.js";
import "./chunk-DJ4W7BRS.js";
import "./chunk-XCU23T57.js";
import "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  darken_default,
  defaultConfig_default,
  getConfig,
  getConfig2,
  getUserDefinedConfig,
  is_dark_default,
  lighten_default,
  sanitizeText
} from "./chunk-MLEFVBYW.js";
import {
  log
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
}
var parse_default = parse;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/rng.js
var rnds8 = new Uint8Array(16);
function rng() {
  return crypto.getRandomValues(rnds8);
}

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/md5.js
function md5(bytes) {
  const words = uint8ToUint32(bytes);
  const md5Bytes = wordsToMd5(words, bytes.length * 8);
  return uint32ToUint8(md5Bytes);
}
function uint32ToUint8(input) {
  const bytes = new Uint8Array(input.length * 4);
  for (let i = 0; i < input.length * 4; i++) {
    bytes[i] = input[i >> 2] >>> i % 4 * 8 & 255;
  }
  return bytes;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  const xpad = new Uint32Array(getOutputLength(len)).fill(0);
  xpad.set(x);
  xpad[len >> 5] |= 128 << len % 32;
  xpad[xpad.length - 1] = len;
  x = xpad;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return Uint32Array.of(a, b, c, d);
}
function uint8ToUint32(input) {
  if (input.length === 0) {
    return new Uint32Array();
  }
  const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
  for (let i = 0; i < input.length; i++) {
    output[i >> 2] |= (input[i] & 255) << i % 4 * 8;
  }
  return output;
}
function safeAdd(x, y) {
  const lsw = (x & 65535) + (y & 65535);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var md5_default = md5;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(version, hash, value, namespace, buf, offset) {
  const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
  const namespaceBytes = typeof namespace === "string" ? parse_default(namespace) : namespace;
  if (typeof namespace === "string") {
    namespace = parse_default(namespace);
  }
  if ((namespace == null ? void 0 : namespace.length) !== 16) {
    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
  }
  let bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(namespaceBytes);
  bytes.set(valueBytes, namespaceBytes.length);
  bytes = hash(bytes);
  bytes[6] = bytes[6] & 15 | version;
  bytes[8] = bytes[8] & 63 | 128;
  if (buf) {
    offset ?? (offset = 0);
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return unsafeStringify(bytes);
}

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v3.js
function v3(value, namespace, buf, offset) {
  return v35(48, md5_default, value, namespace, buf, offset);
}
v3.DNS = DNS;
v3.URL = URL;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v4.js
function v4(options, buf, offset) {
  if (!buf && !options && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return _v4(options, buf, offset);
}
function _v4(options, buf, offset) {
  var _a2;
  options = options || {};
  const rnds = options.random ?? ((_a2 = options.rng) == null ? void 0 : _a2.call(options)) ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/sha1.js
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  const K = [1518500249, 1859775393, 2400959708, 3395469782];
  const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  const newBytes = new Uint8Array(bytes.length + 1);
  newBytes.set(bytes);
  newBytes[bytes.length] = 128;
  bytes = newBytes;
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);
  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);
    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / 2 ** 32;
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);
    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }
    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
var sha1_default = sha1;

// node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v5.js
function v5(value, namespace, buf, offset) {
  return v35(80, sha1_default, value, namespace, buf, offset);
}
v5.DNS = DNS;
v5.URL = URL;

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/mindmap-definition-NLK3R4M7.mjs
var parser = function() {
  var o = __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [1, 4], $V1 = [1, 13], $V2 = [1, 12], $V3 = [1, 15], $V4 = [1, 16], $V5 = [1, 20], $V6 = [1, 19], $V7 = [6, 7, 8], $V8 = [1, 26], $V9 = [1, 24], $Va = [1, 25], $Vb = [6, 7, 11], $Vc = [1, 6, 13, 15, 16, 19, 22], $Vd = [1, 33], $Ve = [1, 34], $Vf = [1, 6, 7, 11, 13, 15, 16, 19, 22];
  var parser2 = {
    trace: __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "start": 3, "mindMap": 4, "spaceLines": 5, "SPACELINE": 6, "NL": 7, "MINDMAP": 8, "document": 9, "stop": 10, "EOF": 11, "statement": 12, "SPACELIST": 13, "node": 14, "ICON": 15, "CLASS": 16, "nodeWithId": 17, "nodeWithoutId": 18, "NODE_DSTART": 19, "NODE_DESCR": 20, "NODE_DEND": 21, "NODE_ID": 22, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 6: "SPACELINE", 7: "NL", 8: "MINDMAP", 11: "EOF", 13: "SPACELIST", 15: "ICON", 16: "CLASS", 19: "NODE_DSTART", 20: "NODE_DESCR", 21: "NODE_DEND", 22: "NODE_ID" },
    productions_: [0, [3, 1], [3, 2], [5, 1], [5, 2], [5, 2], [4, 2], [4, 3], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [9, 3], [9, 2], [12, 2], [12, 2], [12, 2], [12, 1], [12, 1], [12, 1], [12, 1], [12, 1], [14, 1], [14, 1], [18, 3], [17, 1], [17, 4]],
    performAction: __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 6:
        case 7:
          return yy;
          break;
        case 8:
          yy.getLogger().trace("Stop NL ");
          break;
        case 9:
          yy.getLogger().trace("Stop EOF ");
          break;
        case 11:
          yy.getLogger().trace("Stop NL2 ");
          break;
        case 12:
          yy.getLogger().trace("Stop EOF2 ");
          break;
        case 15:
          yy.getLogger().info("Node: ", $$[$0].id);
          yy.addNode($$[$0 - 1].length, $$[$0].id, $$[$0].descr, $$[$0].type);
          break;
        case 16:
          yy.getLogger().trace("Icon: ", $$[$0]);
          yy.decorateNode({ icon: $$[$0] });
          break;
        case 17:
        case 21:
          yy.decorateNode({ class: $$[$0] });
          break;
        case 18:
          yy.getLogger().trace("SPACELIST");
          break;
        case 19:
          yy.getLogger().trace("Node: ", $$[$0].id);
          yy.addNode(0, $$[$0].id, $$[$0].descr, $$[$0].type);
          break;
        case 20:
          yy.decorateNode({ icon: $$[$0] });
          break;
        case 25:
          yy.getLogger().trace("node found ..", $$[$0 - 2]);
          this.$ = { id: $$[$0 - 1], descr: $$[$0 - 1], type: yy.getType($$[$0 - 2], $$[$0]) };
          break;
        case 26:
          this.$ = { id: $$[$0], descr: $$[$0], type: yy.nodeType.DEFAULT };
          break;
        case 27:
          yy.getLogger().trace("node found ..", $$[$0 - 3]);
          this.$ = { id: $$[$0 - 3], descr: $$[$0 - 1], type: yy.getType($$[$0 - 2], $$[$0]) };
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 8: $V0 }, { 1: [3] }, { 1: [2, 1] }, { 4: 6, 6: [1, 7], 7: [1, 8], 8: $V0 }, { 6: $V1, 7: [1, 10], 9: 9, 12: 11, 13: $V2, 14: 14, 15: $V3, 16: $V4, 17: 17, 18: 18, 19: $V5, 22: $V6 }, o($V7, [2, 3]), { 1: [2, 2] }, o($V7, [2, 4]), o($V7, [2, 5]), { 1: [2, 6], 6: $V1, 12: 21, 13: $V2, 14: 14, 15: $V3, 16: $V4, 17: 17, 18: 18, 19: $V5, 22: $V6 }, { 6: $V1, 9: 22, 12: 11, 13: $V2, 14: 14, 15: $V3, 16: $V4, 17: 17, 18: 18, 19: $V5, 22: $V6 }, { 6: $V8, 7: $V9, 10: 23, 11: $Va }, o($Vb, [2, 22], { 17: 17, 18: 18, 14: 27, 15: [1, 28], 16: [1, 29], 19: $V5, 22: $V6 }), o($Vb, [2, 18]), o($Vb, [2, 19]), o($Vb, [2, 20]), o($Vb, [2, 21]), o($Vb, [2, 23]), o($Vb, [2, 24]), o($Vb, [2, 26], { 19: [1, 30] }), { 20: [1, 31] }, { 6: $V8, 7: $V9, 10: 32, 11: $Va }, { 1: [2, 7], 6: $V1, 12: 21, 13: $V2, 14: 14, 15: $V3, 16: $V4, 17: 17, 18: 18, 19: $V5, 22: $V6 }, o($Vc, [2, 14], { 7: $Vd, 11: $Ve }), o($Vf, [2, 8]), o($Vf, [2, 9]), o($Vf, [2, 10]), o($Vb, [2, 15]), o($Vb, [2, 16]), o($Vb, [2, 17]), { 20: [1, 35] }, { 21: [1, 36] }, o($Vc, [2, 13], { 7: $Vd, 11: $Ve }), o($Vf, [2, 11]), o($Vf, [2, 12]), { 21: [1, 37] }, o($Vb, [2, 25]), o($Vb, [2, 27])],
    defaultActions: { 2: [2, 1], 6: [2, 2] },
    parseError: __name(function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    }, "parseError"),
    parse: __name(function parse2(input) {
      var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer2 = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer2.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer2;
      sharedState.yy.parser = this;
      if (typeof lexer2.yylloc == "undefined") {
        lexer2.yylloc = {};
      }
      var yyloc = lexer2.yylloc;
      lstack.push(yyloc);
      var ranges = lexer2.options && lexer2.options.ranges;
      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      __name(popStack, "popStack");
      function lex() {
        var token;
        token = tstack.pop() || lexer2.lex() || EOF;
        if (typeof token !== "number") {
          if (token instanceof Array) {
            tstack = token;
            token = tstack.pop();
          }
          token = self.symbols_[token] || token;
        }
        return token;
      }
      __name(lex, "lex");
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
          var errStr = "";
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push("'" + this.terminals_[p] + "'");
            }
          }
          if (lexer2.showPosition) {
            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
          } else {
            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
          }
          this.parseError(errStr, {
            text: lexer2.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer2.yylineno,
            loc: yyloc,
            expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer2.yytext);
            lstack.push(lexer2.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer2.yyleng;
              yytext = lexer2.yytext;
              yylineno = lexer2.yylineno;
              yyloc = lexer2.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [
                lstack[lstack.length - (len || 1)].range[0],
                lstack[lstack.length - 1].range[1]
              ];
            }
            r = this.performAction.apply(yyval, [
              yytext,
              yyleng,
              yylineno,
              sharedState.yy,
              action[1],
              vstack,
              lstack
            ].concat(args));
            if (typeof r !== "undefined") {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  };
  var lexer = function() {
    var lexer2 = {
      EOF: 1,
      parseError: __name(function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: __name(function(input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = "";
        this.conditionStack = ["INITIAL"];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: __name(function() {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }
        this._input = this._input.slice(1);
        return ch;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: __name(function(ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);
        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);
        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;
        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };
        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: __name(function() {
        this._more = true;
        return this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: __name(function() {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
        return this;
      }, "reject"),
      // retain first n characters of the match
      less: __name(function(n) {
        this.unput(this.match.slice(n));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: __name(function() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: __name(function() {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: __name(function() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: __name(function(match, indexed_rule) {
        var token, lines, backup;
        if (this.options.backtrack_lexer) {
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }
        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: __name(function() {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }
        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = "";
          this.match = "";
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue;
              } else {
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      }, "next"),
      // return next match that has a token
      lex: __name(function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: __name(function begin(condition) {
        this.conditionStack.push(condition);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: __name(function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: __name(function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: __name(function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      }, "topState"),
      // alias for begin(condition)
      pushState: __name(function pushState(condition) {
        this.begin(condition);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: __name(function stateStackSize() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: __name(function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            yy.getLogger().trace("Found comment", yy_.yytext);
            return 6;
            break;
          case 1:
            return 8;
            break;
          case 2:
            this.begin("CLASS");
            break;
          case 3:
            this.popState();
            return 16;
            break;
          case 4:
            this.popState();
            break;
          case 5:
            yy.getLogger().trace("Begin icon");
            this.begin("ICON");
            break;
          case 6:
            yy.getLogger().trace("SPACELINE");
            return 6;
            break;
          case 7:
            return 7;
            break;
          case 8:
            return 15;
            break;
          case 9:
            yy.getLogger().trace("end icon");
            this.popState();
            break;
          case 10:
            yy.getLogger().trace("Exploding node");
            this.begin("NODE");
            return 19;
            break;
          case 11:
            yy.getLogger().trace("Cloud");
            this.begin("NODE");
            return 19;
            break;
          case 12:
            yy.getLogger().trace("Explosion Bang");
            this.begin("NODE");
            return 19;
            break;
          case 13:
            yy.getLogger().trace("Cloud Bang");
            this.begin("NODE");
            return 19;
            break;
          case 14:
            this.begin("NODE");
            return 19;
            break;
          case 15:
            this.begin("NODE");
            return 19;
            break;
          case 16:
            this.begin("NODE");
            return 19;
            break;
          case 17:
            this.begin("NODE");
            return 19;
            break;
          case 18:
            return 13;
            break;
          case 19:
            return 22;
            break;
          case 20:
            return 11;
            break;
          case 21:
            this.begin("NSTR2");
            break;
          case 22:
            return "NODE_DESCR";
            break;
          case 23:
            this.popState();
            break;
          case 24:
            yy.getLogger().trace("Starting NSTR");
            this.begin("NSTR");
            break;
          case 25:
            yy.getLogger().trace("description:", yy_.yytext);
            return "NODE_DESCR";
            break;
          case 26:
            this.popState();
            break;
          case 27:
            this.popState();
            yy.getLogger().trace("node end ))");
            return "NODE_DEND";
            break;
          case 28:
            this.popState();
            yy.getLogger().trace("node end )");
            return "NODE_DEND";
            break;
          case 29:
            this.popState();
            yy.getLogger().trace("node end ...", yy_.yytext);
            return "NODE_DEND";
            break;
          case 30:
            this.popState();
            yy.getLogger().trace("node end ((");
            return "NODE_DEND";
            break;
          case 31:
            this.popState();
            yy.getLogger().trace("node end (-");
            return "NODE_DEND";
            break;
          case 32:
            this.popState();
            yy.getLogger().trace("node end (-");
            return "NODE_DEND";
            break;
          case 33:
            this.popState();
            yy.getLogger().trace("node end ((");
            return "NODE_DEND";
            break;
          case 34:
            this.popState();
            yy.getLogger().trace("node end ((");
            return "NODE_DEND";
            break;
          case 35:
            yy.getLogger().trace("Long description:", yy_.yytext);
            return 20;
            break;
          case 36:
            yy.getLogger().trace("Long description:", yy_.yytext);
            return 20;
            break;
        }
      }, "anonymous"),
      rules: [/^(?:\s*%%.*)/i, /^(?:mindmap\b)/i, /^(?::::)/i, /^(?:.+)/i, /^(?:\n)/i, /^(?:::icon\()/i, /^(?:[\s]+[\n])/i, /^(?:[\n]+)/i, /^(?:[^\)]+)/i, /^(?:\))/i, /^(?:-\))/i, /^(?:\(-)/i, /^(?:\)\))/i, /^(?:\))/i, /^(?:\(\()/i, /^(?:\{\{)/i, /^(?:\()/i, /^(?:\[)/i, /^(?:[\s]+)/i, /^(?:[^\(\[\n\)\{\}]+)/i, /^(?:$)/i, /^(?:["][`])/i, /^(?:[^`"]+)/i, /^(?:[`]["])/i, /^(?:["])/i, /^(?:[^"]+)/i, /^(?:["])/i, /^(?:[\)]\))/i, /^(?:[\)])/i, /^(?:[\]])/i, /^(?:\}\})/i, /^(?:\(-)/i, /^(?:-\))/i, /^(?:\(\()/i, /^(?:\()/i, /^(?:[^\)\]\(\}]+)/i, /^(?:.+(?!\(\())/i],
      conditions: { "CLASS": { "rules": [3, 4], "inclusive": false }, "ICON": { "rules": [8, 9], "inclusive": false }, "NSTR2": { "rules": [22, 23], "inclusive": false }, "NSTR": { "rules": [25, 26], "inclusive": false }, "NODE": { "rules": [21, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], "inclusive": false }, "INITIAL": { "rules": [0, 1, 2, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], "inclusive": true } }
    };
    return lexer2;
  }();
  parser2.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  __name(Parser, "Parser");
  Parser.prototype = parser2;
  parser2.Parser = Parser;
  return new Parser();
}();
parser.parser = parser;
var mindmap_default = parser;
var MAX_SECTIONS = 12;
var nodeType = {
  DEFAULT: 0,
  NO_BORDER: 0,
  ROUNDED_RECT: 1,
  RECT: 2,
  CIRCLE: 3,
  CLOUD: 4,
  BANG: 5,
  HEXAGON: 6
};
var _a;
var MindmapDB = (_a = class {
  constructor() {
    this.nodes = [];
    this.count = 0;
    this.elements = {};
    this.getLogger = this.getLogger.bind(this);
    this.nodeType = nodeType;
    this.clear();
    this.getType = this.getType.bind(this);
    this.getElementById = this.getElementById.bind(this);
    this.getParent = this.getParent.bind(this);
    this.getMindmap = this.getMindmap.bind(this);
    this.addNode = this.addNode.bind(this);
    this.decorateNode = this.decorateNode.bind(this);
  }
  clear() {
    this.nodes = [];
    this.count = 0;
    this.elements = {};
    this.baseLevel = void 0;
  }
  getParent(level) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].level < level) {
        return this.nodes[i];
      }
    }
    return null;
  }
  getMindmap() {
    return this.nodes.length > 0 ? this.nodes[0] : null;
  }
  addNode(level, id, descr, type) {
    var _a2, _b;
    log.info("addNode", level, id, descr, type);
    let isRoot = false;
    if (this.nodes.length === 0) {
      this.baseLevel = level;
      level = 0;
      isRoot = true;
    } else if (this.baseLevel !== void 0) {
      level = level - this.baseLevel;
      isRoot = false;
    }
    const conf = getConfig2();
    let padding = ((_a2 = conf.mindmap) == null ? void 0 : _a2.padding) ?? defaultConfig_default.mindmap.padding;
    switch (type) {
      case this.nodeType.ROUNDED_RECT:
      case this.nodeType.RECT:
      case this.nodeType.HEXAGON:
        padding *= 2;
        break;
    }
    const node = {
      id: this.count++,
      nodeId: sanitizeText(id, conf),
      level,
      descr: sanitizeText(descr, conf),
      type,
      children: [],
      width: ((_b = conf.mindmap) == null ? void 0 : _b.maxNodeWidth) ?? defaultConfig_default.mindmap.maxNodeWidth,
      padding,
      isRoot
    };
    const parent = this.getParent(level);
    if (parent) {
      parent.children.push(node);
      this.nodes.push(node);
    } else {
      if (isRoot) {
        this.nodes.push(node);
      } else {
        throw new Error(
          `There can be only one root. No parent could be found for ("${node.descr}")`
        );
      }
    }
  }
  getType(startStr, endStr) {
    log.debug("In get type", startStr, endStr);
    switch (startStr) {
      case "[":
        return this.nodeType.RECT;
      case "(":
        return endStr === ")" ? this.nodeType.ROUNDED_RECT : this.nodeType.CLOUD;
      case "((":
        return this.nodeType.CIRCLE;
      case ")":
        return this.nodeType.CLOUD;
      case "))":
        return this.nodeType.BANG;
      case "{{":
        return this.nodeType.HEXAGON;
      default:
        return this.nodeType.DEFAULT;
    }
  }
  setElementForId(id, element) {
    this.elements[id] = element;
  }
  getElementById(id) {
    return this.elements[id];
  }
  decorateNode(decoration) {
    if (!decoration) {
      return;
    }
    const config = getConfig2();
    const node = this.nodes[this.nodes.length - 1];
    if (decoration.icon) {
      node.icon = sanitizeText(decoration.icon, config);
    }
    if (decoration.class) {
      node.class = sanitizeText(decoration.class, config);
    }
  }
  type2Str(type) {
    switch (type) {
      case this.nodeType.DEFAULT:
        return "no-border";
      case this.nodeType.RECT:
        return "rect";
      case this.nodeType.ROUNDED_RECT:
        return "rounded-rect";
      case this.nodeType.CIRCLE:
        return "circle";
      case this.nodeType.CLOUD:
        return "cloud";
      case this.nodeType.BANG:
        return "bang";
      case this.nodeType.HEXAGON:
        return "hexgon";
      default:
        return "no-border";
    }
  }
  /**
   * Assign section numbers to nodes based on their position relative to root
   * @param node - The mindmap node to process
   * @param sectionNumber - The section number to assign (undefined for root)
   */
  assignSections(node, sectionNumber) {
    if (node.level === 0) {
      node.section = void 0;
    } else {
      node.section = sectionNumber;
    }
    if (node.children) {
      for (const [index, child] of node.children.entries()) {
        const childSectionNumber = node.level === 0 ? index % (MAX_SECTIONS - 1) : sectionNumber;
        this.assignSections(child, childSectionNumber);
      }
    }
  }
  /**
   * Convert mindmap tree structure to flat array of nodes
   * @param node - The mindmap node to process
   * @param processedNodes - Array to collect processed nodes
   */
  flattenNodes(node, processedNodes) {
    const conf = getConfig2();
    const cssClasses = ["mindmap-node"];
    if (node.isRoot === true) {
      cssClasses.push("section-root", "section--1");
    } else if (node.section !== void 0) {
      cssClasses.push(`section-${node.section}`);
    }
    if (node.class) {
      cssClasses.push(node.class);
    }
    const classes = cssClasses.join(" ");
    const getShapeFromType = __name((type) => {
      var _a2;
      const theme = ((_a2 = conf.theme) == null ? void 0 : _a2.toLowerCase()) ?? "";
      const isReduxTheme = theme.includes("redux");
      switch (type) {
        case nodeType.CIRCLE:
          return "mindmapCircle";
        case nodeType.RECT:
          return "rect";
        case nodeType.ROUNDED_RECT:
          return "rounded";
        case nodeType.CLOUD:
          return "cloud";
        case nodeType.BANG:
          return "bang";
        case nodeType.HEXAGON:
          return "hexagon";
        case nodeType.DEFAULT:
          return isReduxTheme ? "rounded" : "defaultMindmapNode";
        case nodeType.NO_BORDER:
        default:
          return "rect";
      }
    }, "getShapeFromType");
    const processedNode = {
      id: node.id.toString(),
      domId: "node_" + node.id.toString(),
      label: node.descr,
      labelType: "markdown",
      isGroup: false,
      shape: getShapeFromType(node.type),
      width: node.width,
      height: node.height ?? 0,
      padding: node.padding,
      cssClasses: classes,
      cssStyles: [],
      look: conf.look,
      icon: node.icon,
      x: node.x,
      y: node.y,
      // Mindmap-specific properties
      level: node.level,
      nodeId: node.nodeId,
      type: node.type,
      section: node.section
    };
    processedNodes.push(processedNode);
    if (node.children) {
      for (const child of node.children) {
        this.flattenNodes(child, processedNodes);
      }
    }
  }
  /**
   * Generate edges from parent-child relationships in mindmap tree
   * @param node - The mindmap node to process
   * @param edges - Array to collect edges
   */
  generateEdges(node, edges) {
    if (!node.children) {
      return;
    }
    const conf = getConfig2();
    for (const child of node.children) {
      let edgeClasses = "edge";
      if (child.section !== void 0) {
        edgeClasses += ` section-edge-${child.section}`;
      }
      const edgeDepth = node.level + 1;
      edgeClasses += ` edge-depth-${edgeDepth}`;
      const edge = {
        id: `edge_${node.id}_${child.id}`,
        start: node.id.toString(),
        end: child.id.toString(),
        type: "normal",
        curve: "basis",
        thickness: "normal",
        look: conf.look,
        classes: edgeClasses,
        // Store mindmap-specific data
        depth: node.level,
        section: child.section
      };
      edges.push(edge);
      this.generateEdges(child, edges);
    }
  }
  /**
   * Get structured data for layout algorithms
   * Following the pattern established by ER diagrams
   * @returns Structured data containing nodes, edges, and config
   */
  getData() {
    const mindmapRoot = this.getMindmap();
    const config = getConfig2();
    const userDefinedConfig = getUserDefinedConfig();
    const hasUserDefinedLayout = userDefinedConfig.layout !== void 0;
    const finalConfig = config;
    if (!hasUserDefinedLayout) {
      finalConfig.layout = "cose-bilkent";
    }
    if (!mindmapRoot) {
      return {
        nodes: [],
        edges: [],
        config: finalConfig
      };
    }
    log.debug("getData: mindmapRoot", mindmapRoot, config);
    this.assignSections(mindmapRoot);
    const processedNodes = [];
    const processedEdges = [];
    this.flattenNodes(mindmapRoot, processedNodes);
    this.generateEdges(mindmapRoot, processedEdges);
    log.debug(
      `getData: processed ${processedNodes.length} nodes and ${processedEdges.length} edges`
    );
    const shapes = /* @__PURE__ */ new Map();
    for (const node of processedNodes) {
      shapes.set(node.id, {
        shape: node.shape,
        width: node.width,
        height: node.height,
        padding: node.padding
      });
    }
    return {
      nodes: processedNodes,
      edges: processedEdges,
      config: finalConfig,
      // Store the root node for mindmap-specific layout algorithms
      rootNode: mindmapRoot,
      // Properties required by dagre layout algorithm
      markers: ["point"],
      // Mindmaps don't use markers
      direction: "TB",
      // Top-to-bottom direction for mindmaps
      nodeSpacing: 50,
      // Default spacing between nodes
      rankSpacing: 50,
      // Default spacing between ranks
      // Add shapes for ELK compatibility
      shapes: Object.fromEntries(shapes),
      // Additional properties that layout algorithms might expect
      type: "mindmap",
      diagramId: "mindmap-" + v4_default()
    };
  }
  // Expose logger to grammar
  getLogger() {
    return log;
  }
}, __name(_a, "MindmapDB"), _a);
var draw = __name(async (text, id, _version, diagObj) => {
  var _a2, _b;
  log.debug("Rendering mindmap diagram\n" + text);
  const db = diagObj.db;
  const data4Layout = db.getData();
  const svg = getDiagramElement(id, data4Layout.config.securityLevel);
  data4Layout.type = diagObj.type;
  data4Layout.layoutAlgorithm = getRegisteredLayoutAlgorithm(data4Layout.config.layout, {
    fallback: "cose-bilkent"
  });
  data4Layout.diagramId = id;
  const mm = db.getMindmap();
  if (!mm) {
    return;
  }
  data4Layout.nodes.forEach((node) => {
    if (node.shape === "rounded") {
      node.radius = 15;
      node.taper = 15;
      node.stroke = "none";
      node.width = 0;
      node.padding = 15;
    } else if (node.shape === "circle") {
      node.padding = 10;
    } else if (node.shape === "rect") {
      node.width = 0;
      node.padding = 10;
    } else if (node.shape === "hexagon") {
      node.width = 0;
      node.height = 0;
    }
  });
  await render(data4Layout, svg);
  const { themeVariables } = getConfig();
  const { useGradient, gradientStart, gradientStop } = themeVariables;
  if (useGradient && gradientStart && gradientStop) {
    const svgId = svg.attr("id");
    const gradient = svg.append("defs").append("linearGradient").attr("id", `${svgId}-gradient`).attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", gradientStart).attr("stop-opacity", 1);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", gradientStop).attr("stop-opacity", 1);
  }
  setupViewPortForSVG(
    svg,
    ((_a2 = data4Layout.config.mindmap) == null ? void 0 : _a2.padding) ?? defaultConfig_default.mindmap.padding,
    "mindmapDiagram",
    ((_b = data4Layout.config.mindmap) == null ? void 0 : _b.useMaxWidth) ?? defaultConfig_default.mindmap.useMaxWidth
  );
}, "draw");
var mindmapRenderer_default = {
  draw
};
var genSections = __name((options) => {
  const { theme, look } = options;
  let sections = "";
  for (let i = 0; i < options.THEME_COLOR_LIMIT; i++) {
    options["lineColor" + i] = options["lineColor" + i] || options["cScaleInv" + i];
    if (is_dark_default(options["lineColor" + i])) {
      options["lineColor" + i] = lighten_default(options["lineColor" + i], 20);
    } else {
      options["lineColor" + i] = darken_default(options["lineColor" + i], 20);
    }
  }
  for (let i = 0; i < options.THEME_COLOR_LIMIT; i++) {
    const sw = "" + (look === "neo" ? Math.max(10 - (i - 1) * 2, 2) : 17 - 3 * i);
    sections += `
    .section-${i - 1} rect, .section-${i - 1} path, .section-${i - 1} circle, .section-${i - 1} polygon, .section-${i - 1} path  {
      fill: ${options["cScale" + i]};
    }
    .section-${i - 1} text {
     fill: ${options["cScaleLabel" + i]};
    }
     .section-${i - 1} span {
     color: ${options["cScaleLabel" + i]};
    }
    .node-icon-${i - 1} {
      font-size: 40px;
      color: ${options["cScaleLabel" + i]};
    }
    .section-edge-${i - 1}{
      stroke: ${options["cScale" + i]};
    }
    .edge-depth-${i - 1}{
      stroke-width: ${sw};
    }
    .section-${i - 1} line {
      stroke: ${options["cScaleInv" + i]} ;
      stroke-width: 3;
    }

    .disabled, .disabled circle, .disabled text {
      fill: lightgray;
    }
    .disabled text {
      fill: #efefef;
    }
    [data-look="neo"].mindmap-node.section-${i - 1} rect, [data-look="neo"].mindmap-node.section-${i - 1} path, [data-look="neo"].mindmap-node.section-${i - 1} circle, [data-look="neo"].mindmap-node.section-${i - 1} polygon {
      fill: ${theme === "redux" || theme === "redux-dark" || theme === "neutral" ? options.mainBkg : options["cScale" + i]};
      stroke: ${theme === "redux" || theme === "redux-dark" ? options.nodeBorder : options["cScale" + i]};
      stroke-width: ${options.strokeWidth ?? 2}px;
    }
    [data-look="neo"].section-edge-${i - 1}{
      stroke: ${(theme == null ? void 0 : theme.includes("redux")) || theme === "neo-dark" ? options.nodeBorder : options["cScale" + i]};
    }
    [data-look="neo"].mindmap-node.section-${i - 1} text {
     fill: ${theme === "redux" || theme === "redux-dark" ? options.nodeBorder : options["cScaleLabel" + (theme === "neutral" ? 1 : i)]};
    }
    `;
  }
  return sections;
}, "genSections");
var genGradient = __name((THEME_COLOR_LIMIT, svgId, mainBkg) => {
  let sections = "";
  for (let i = 0; i < THEME_COLOR_LIMIT; i++) {
    sections += `
    [data-look="neo"].mindmap-node.section-${i - 1} rect, [data-look="neo"].mindmap-node.section-${i - 1} path, [data-look="neo"].mindmap-node.section-${i - 1} circle, [data-look="neo"].mindmap-node.section-${i - 1} polygon {
      stroke: url(${svgId}-gradient);
      fill: ${mainBkg};
    }
    .section-${i - 1} line {
      stroke-width: 0;
    }`;
  }
  return sections;
}, "genGradient");
var getStyles = __name((options) => {
  const { theme } = options;
  const svgId = options.svgId;
  const scopedDropShadow = options.dropShadow ? options.dropShadow.replace("url(#drop-shadow)", `url(${svgId}-drop-shadow)`) : "none";
  return `
  .edge {
    stroke-width: 3;
  }
  ${genSections(options)}
  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {
    fill: ${options.git0};
  }
  .section-root text {
    fill: ${options.gitBranchLabel0};
  }
  .section-root span {
    color: ${(theme == null ? void 0 : theme.includes("redux")) ? options.nodeBorder : options.gitBranchLabel0};
  }
  .icon-container {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edge {
    fill: none;
  }
  .mindmap-node-label {
    dy: 1em;
    alignment-baseline: middle;
    text-anchor: middle;
    dominant-baseline: middle;
    text-align: center;
  }
  [data-look="neo"].mindmap-node  {
    filter: ${scopedDropShadow};
  }
  [data-look="neo"].mindmap-node.section-root rect, [data-look="neo"].mindmap-node.section-root path, [data-look="neo"].mindmap-node.section-root circle, [data-look="neo"].mindmap-node.section-root polygon  {
    fill: ${(theme == null ? void 0 : theme.includes("redux")) ? options.mainBkg : options.git0};
  }
  [data-look="neo"].mindmap-node.section-root .text-inner-tspan {
    fill:  ${(theme == null ? void 0 : theme.includes("redux")) ? options.nodeBorder : options["cScaleLabel" + (theme === "neutral" ? 1 : 0)]};
  }
  ${options.useGradient && svgId && options.mainBkg ? genGradient(options.THEME_COLOR_LIMIT, svgId, options.mainBkg) : ""}
`;
}, "getStyles");
var styles_default = getStyles;
var diagram = {
  get db() {
    return new MindmapDB();
  },
  renderer: mindmapRenderer_default,
  parser: mindmap_default,
  styles: styles_default
};
export {
  diagram
};
//# sourceMappingURL=mindmap-definition-NLK3R4M7-O3ALBSLO.js.map
