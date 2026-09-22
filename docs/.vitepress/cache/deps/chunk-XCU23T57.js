import {
  getConfig,
  sanitizeText
} from "./chunk-MLEFVBYW.js";
import {
  log
} from "./chunk-3OLEAA6P.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon/defaults.js
var defaultIconDimensions = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
});
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/customisations/defaults.js
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  ...defaultIconSizeCustomisations,
  ...defaultIconTransformations
});

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon/name.js
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) return null;
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) return null;
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIconName = (icon, allowSimpleName) => {
  if (!icon) return false;
  return !!((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon/transformations.js
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
  if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) result.rotate = rotate;
  return result;
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon/merge.js
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) if (key in defaultIconTransformations) {
    if (key in parent && !(key in result)) result[key] = defaultIconTransformations[key];
  } else if (key in child) result[key] = child[key];
  else if (key in parent) result[key] = parent[key];
  return result;
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon-set/tree.js
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) return resolved[name] = [];
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) resolved[name] = [parent].concat(value);
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon-set/get-icon.js
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(icons[name2] || aliases[name2], currentProps);
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) return internalGetIconData(data, name, []);
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon-set/validate-basic.js
var optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon-set/get-icons.js
var propsToCopy = Object.keys(defaultIconDimensions).concat(["provider"]);

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/size.js
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) return size;
  precision = precision || 100;
  if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
  if (typeof size !== "string") return size;
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) return size;
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) newParts.push(code);
      else newParts.push(Math.ceil(num * ratio * precision) / precision);
    } else newParts.push(code);
    code = oldParts.shift();
    if (code === void 0) return newParts.join("");
    isNumber = !isNumber;
  }
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/defs.js
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) break;
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) break;
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/build.js
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) rotation += 2;
      else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) body = wrapSVGContent(body, '<g transform="' + transformations.join(" ") + '">', "</g>");
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) attributes[prop] = value.toString();
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [
    box.left,
    box.top,
    boxWidth,
    boxHeight
  ];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/id.js
var regex = /\sid="(\S+)"/g;
var counters = /* @__PURE__ */ new Map();
function nextID(id) {
  id = id.replace(/[0-9]+$/, "") || "a";
  const count = counters.get(id) || 0;
  counters.set(id, count + 1);
  return count ? `${id}${count}` : id;
}
function replaceIDs(body) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) ids.push(match[1]);
  if (!ids.length) return body;
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = nextID(id);
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + suffix + "$3");
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/html.js
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/colors/keywords.js
var colorKeywords = Object.assign(/* @__PURE__ */ Object.create(null), {
  transparent: { type: "transparent" },
  none: { type: "none" },
  currentcolor: { type: "current" }
});
function add(keyword, colors) {
  const type = "rgb";
  const r = colors[0];
  const length = colors.length;
  colorKeywords[keyword] = {
    type,
    r,
    g: length > 1 ? colors[1] : r,
    b: length > 2 ? colors[2] : r,
    alpha: length > 3 ? colors[3] : 1
  };
}
add("silver", [192]);
add("gray", [128]);
add("white", [255]);
add("maroon", [
  128,
  0,
  0
]);
add("red", [
  255,
  0,
  0
]);
add("purple", [128, 0]);
add("fuchsia", [255, 0]);
add("green", [0, 128]);
add("lime", [0, 255]);
add("olive", [
  128,
  128,
  0
]);
add("yellow", [
  255,
  255,
  0
]);
add("navy", [
  0,
  0,
  128
]);
add("blue", [
  0,
  0,
  255
]);
add("teal", [
  0,
  128,
  128
]);
add("aqua", [
  0,
  255,
  255
]);
add("aliceblue", [
  240,
  248,
  255
]);
add("antiquewhite", [
  250,
  235,
  215
]);
add("aqua", [
  0,
  255,
  255
]);
add("aquamarine", [
  127,
  255,
  212
]);
add("azure", [
  240,
  255,
  255
]);
add("beige", [
  245,
  245,
  220
]);
add("bisque", [
  255,
  228,
  196
]);
add("black", [0]);
add("blanchedalmond", [
  255,
  235,
  205
]);
add("blue", [
  0,
  0,
  255
]);
add("blueviolet", [
  138,
  43,
  226
]);
add("brown", [
  165,
  42,
  42
]);
add("burlywood", [
  222,
  184,
  135
]);
add("cadetblue", [
  95,
  158,
  160
]);
add("chartreuse", [
  127,
  255,
  0
]);
add("chocolate", [
  210,
  105,
  30
]);
add("coral", [
  255,
  127,
  80
]);
add("cornflowerblue", [
  100,
  149,
  237
]);
add("cornsilk", [
  255,
  248,
  220
]);
add("crimson", [
  220,
  20,
  60
]);
add("cyan", [
  0,
  255,
  255
]);
add("darkblue", [
  0,
  0,
  139
]);
add("darkcyan", [
  0,
  139,
  139
]);
add("darkgoldenrod", [
  184,
  134,
  11
]);
add("darkgray", [169]);
add("darkgreen", [0, 100]);
add("darkgrey", [169]);
add("darkkhaki", [
  189,
  183,
  107
]);
add("darkmagenta", [139, 0]);
add("darkolivegreen", [
  85,
  107,
  47
]);
add("darkorange", [
  255,
  140,
  0
]);
add("darkorchid", [
  153,
  50,
  204
]);
add("darkred", [
  139,
  0,
  0
]);
add("darksalmon", [
  233,
  150,
  122
]);
add("darkseagreen", [143, 188]);
add("darkslateblue", [
  72,
  61,
  139
]);
add("darkslategray", [
  47,
  79,
  79
]);
add("darkslategrey", [
  47,
  79,
  79
]);
add("darkturquoise", [
  0,
  206,
  209
]);
add("darkviolet", [
  148,
  0,
  211
]);
add("deeppink", [
  255,
  20,
  147
]);
add("deepskyblue", [
  0,
  191,
  255
]);
add("dimgray", [105]);
add("dimgrey", [105]);
add("dodgerblue", [
  30,
  144,
  255
]);
add("firebrick", [
  178,
  34,
  34
]);
add("floralwhite", [
  255,
  250,
  240
]);
add("forestgreen", [34, 139]);
add("fuchsia", [255, 0]);
add("gainsboro", [220]);
add("ghostwhite", [
  248,
  248,
  255
]);
add("gold", [
  255,
  215,
  0
]);
add("goldenrod", [
  218,
  165,
  32
]);
add("gray", [128]);
add("green", [0, 128]);
add("greenyellow", [
  173,
  255,
  47
]);
add("grey", [128]);
add("honeydew", [240, 255]);
add("hotpink", [
  255,
  105,
  180
]);
add("indianred", [
  205,
  92,
  92
]);
add("indigo", [
  75,
  0,
  130
]);
add("ivory", [
  255,
  255,
  240
]);
add("khaki", [
  240,
  230,
  140
]);
add("lavender", [
  230,
  230,
  250
]);
add("lavenderblush", [
  255,
  240,
  245
]);
add("lawngreen", [
  124,
  252,
  0
]);
add("lemonchiffon", [
  255,
  250,
  205
]);
add("lightblue", [
  173,
  216,
  230
]);
add("lightcoral", [
  240,
  128,
  128
]);
add("lightcyan", [
  224,
  255,
  255
]);
add("lightgoldenrodyellow", [
  250,
  250,
  210
]);
add("lightgray", [211]);
add("lightgreen", [144, 238]);
add("lightgrey", [211]);
add("lightpink", [
  255,
  182,
  193
]);
add("lightsalmon", [
  255,
  160,
  122
]);
add("lightseagreen", [
  32,
  178,
  170
]);
add("lightskyblue", [
  135,
  206,
  250
]);
add("lightslategray", [
  119,
  136,
  153
]);
add("lightslategrey", [
  119,
  136,
  153
]);
add("lightsteelblue", [
  176,
  196,
  222
]);
add("lightyellow", [
  255,
  255,
  224
]);
add("lime", [0, 255]);
add("limegreen", [50, 205]);
add("linen", [
  250,
  240,
  230
]);
add("magenta", [255, 0]);
add("maroon", [
  128,
  0,
  0
]);
add("mediumaquamarine", [
  102,
  205,
  170
]);
add("mediumblue", [
  0,
  0,
  205
]);
add("mediumorchid", [
  186,
  85,
  211
]);
add("mediumpurple", [
  147,
  112,
  219
]);
add("mediumseagreen", [
  60,
  179,
  113
]);
add("mediumslateblue", [
  123,
  104,
  238
]);
add("mediumspringgreen", [
  0,
  250,
  154
]);
add("mediumturquoise", [
  72,
  209,
  204
]);
add("mediumvioletred", [
  199,
  21,
  133
]);
add("midnightblue", [
  25,
  25,
  112
]);
add("mintcream", [
  245,
  255,
  250
]);
add("mistyrose", [
  255,
  228,
  225
]);
add("moccasin", [
  255,
  228,
  181
]);
add("navajowhite", [
  255,
  222,
  173
]);
add("navy", [
  0,
  0,
  128
]);
add("oldlace", [
  253,
  245,
  230
]);
add("olive", [
  128,
  128,
  0
]);
add("olivedrab", [
  107,
  142,
  35
]);
add("orange", [
  255,
  165,
  0
]);
add("orangered", [
  255,
  69,
  0
]);
add("orchid", [
  218,
  112,
  214
]);
add("palegoldenrod", [
  238,
  232,
  170
]);
add("palegreen", [152, 251]);
add("paleturquoise", [
  175,
  238,
  238
]);
add("palevioletred", [
  219,
  112,
  147
]);
add("papayawhip", [
  255,
  239,
  213
]);
add("peachpuff", [
  255,
  218,
  185
]);
add("peru", [
  205,
  133,
  63
]);
add("pink", [
  255,
  192,
  203
]);
add("plum", [221, 160]);
add("powderblue", [
  176,
  224,
  230
]);
add("purple", [128, 0]);
add("rebeccapurple", [
  102,
  51,
  153
]);
add("red", [
  255,
  0,
  0
]);
add("rosybrown", [
  188,
  143,
  143
]);
add("royalblue", [
  65,
  105,
  225
]);
add("saddlebrown", [
  139,
  69,
  19
]);
add("salmon", [
  250,
  128,
  114
]);
add("sandybrown", [
  244,
  164,
  96
]);
add("seagreen", [
  46,
  139,
  87
]);
add("seashell", [
  255,
  245,
  238
]);
add("sienna", [
  160,
  82,
  45
]);
add("silver", [192]);
add("skyblue", [
  135,
  206,
  235
]);
add("slateblue", [
  106,
  90,
  205
]);
add("slategray", [
  112,
  128,
  144
]);
add("slategrey", [
  112,
  128,
  144
]);
add("snow", [
  255,
  250,
  250
]);
add("springgreen", [
  0,
  255,
  127
]);
add("steelblue", [
  70,
  130,
  180
]);
add("tan", [
  210,
  180,
  140
]);
add("teal", [
  0,
  128,
  128
]);
add("thistle", [216, 191]);
add("tomato", [
  255,
  99,
  71
]);
add("turquoise", [
  64,
  224,
  208
]);
add("violet", [238, 130]);
add("wheat", [
  245,
  222,
  179
]);
add("white", [255]);
add("whitesmoke", [245]);
add("yellow", [
  255,
  255,
  0
]);
add("yellowgreen", [
  154,
  205,
  50
]);

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/css/icons.js
var commonSelector = ".icon--{prefix}";
var iconSelector = ".icon--{prefix}--{name}";
var defaultSelectors = {
  commonSelector,
  iconSelector,
  overrideSelector: commonSelector + iconSelector
};

// node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/emoji/format.js
var defaultUnicodeOptions = {
  prefix: "",
  separator: "",
  case: "lower",
  format: "utf-32",
  add0: false,
  throwOnError: true
};
var defaultSequenceOptions = {
  ...defaultUnicodeOptions,
  separator: "-"
};

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-742MDFTN.mjs
var unknownIcon = {
  body: '<g><rect width="80" height="80" style="fill: #087ebf; stroke-width: 0px;"/><text transform="translate(21.16 64.67)" style="fill: #fff; font-family: ArialMT, Arial; font-size: 67.75px;"><tspan x="0" y="0">?</tspan></text></g>',
  height: 80,
  width: 80
};
var iconsStore = /* @__PURE__ */ new Map();
var loaderStore = /* @__PURE__ */ new Map();
var registerIconPacks = __name((iconLoaders) => {
  for (const iconLoader of iconLoaders) {
    if (!iconLoader.name) {
      throw new Error(
        'Invalid icon loader. Must have a "name" property with non-empty string value.'
      );
    }
    log.debug("Registering icon pack:", iconLoader.name);
    if ("loader" in iconLoader) {
      loaderStore.set(iconLoader.name, iconLoader.loader);
    } else if ("icons" in iconLoader) {
      iconsStore.set(iconLoader.name, iconLoader.icons);
    } else {
      log.error("Invalid icon loader:", iconLoader);
      throw new Error('Invalid icon loader. Must have either "icons" or "loader" property.');
    }
  }
}, "registerIconPacks");
var getRegisteredIconData = __name(async (iconName, fallbackPrefix) => {
  const data = stringToIcon(iconName, true, fallbackPrefix !== void 0);
  if (!data) {
    throw new Error(`Invalid icon name: ${iconName}`);
  }
  const prefix = data.prefix || fallbackPrefix;
  if (!prefix) {
    throw new Error(`Icon name must contain a prefix: ${iconName}`);
  }
  let icons = iconsStore.get(prefix);
  if (!icons) {
    const loader = loaderStore.get(prefix);
    if (!loader) {
      throw new Error(`Icon set not found: ${data.prefix}`);
    }
    try {
      const loaded = await loader();
      icons = { ...loaded, prefix };
      iconsStore.set(prefix, icons);
    } catch (e) {
      log.error(e);
      throw new Error(`Failed to load icon set: ${data.prefix}`);
    }
  }
  const iconData = getIconData(icons, data.name);
  if (!iconData) {
    throw new Error(`Icon not found: ${iconName}`);
  }
  return iconData;
}, "getRegisteredIconData");
var isIconAvailable = __name(async (iconName) => {
  try {
    await getRegisteredIconData(iconName);
    return true;
  } catch {
    return false;
  }
}, "isIconAvailable");
var getIconSVG = __name(async (iconName, customisations, extraAttributes) => {
  let iconData;
  try {
    iconData = await getRegisteredIconData(iconName, customisations == null ? void 0 : customisations.fallbackPrefix);
  } catch (e) {
    log.error(e);
    iconData = unknownIcon;
  }
  const renderData = iconToSVG(iconData, customisations);
  const svg = iconToHTML(replaceIDs(renderData.body), {
    ...renderData.attributes,
    ...extraAttributes
  });
  return sanitizeText(svg, getConfig());
}, "getIconSVG");

export {
  unknownIcon,
  registerIconPacks,
  isIconAvailable,
  getIconSVG
};
//# sourceMappingURL=chunk-XCU23T57.js.map
