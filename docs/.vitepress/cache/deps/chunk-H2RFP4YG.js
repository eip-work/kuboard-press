import {
  at
} from "./chunk-B7KO5YQV.js";
import {
  compileStyles,
  solidStateFill,
  styles2String,
  userNodeOverrides
} from "./chunk-ADFWXOGL.js";
import {
  stampColorSlot
} from "./chunk-E7WPOYWJ.js";
import {
  createText,
  fastdom_default2
} from "./chunk-DJ4W7BRS.js";
import {
  getIconSVG,
  isIconAvailable
} from "./chunk-XCU23T57.js";
import {
  calculateTextWidth,
  decodeEntities,
  handleUndefinedAttr,
  parseFontSize
} from "./chunk-OD7WKAUD.js";
import {
  defaultConfig_default,
  evaluate,
  getConfig,
  getConfig2,
  getEffectiveHtmlLabels,
  hasKatex,
  parseGenericTypes,
  sanitizeText,
  sanitizeText3
} from "./chunk-MLEFVBYW.js";
import {
  log,
  select_default
} from "./chunk-3OLEAA6P.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-7INBJB4K.mjs
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
async function configureLabelImages(container) {
  const images = container.getElementsByTagName("img");
  if (!images || images.length === 0) {
    return;
  }
  const noImgText = !hasTextBesidesImages(container);
  await Promise.all(
    [...images].map(
      (img) => new Promise((res) => {
        function setupImage() {
          img.style.display = "flex";
          img.style.flexDirection = "column";
          if (noImgText) {
            const bodyFontSize = getConfig2().fontSize ? getConfig2().fontSize : window.getComputedStyle(document.body).fontSize;
            const enlargingFactor = 5;
            const [parsedBodyFontSize = defaultConfig_default.fontSize] = parseFontSize(bodyFontSize);
            const width = parsedBodyFontSize * enlargingFactor + "px";
            img.style.minWidth = width;
            img.style.maxWidth = width;
          } else {
            img.style.width = "100%";
          }
          res(img);
        }
        __name(setupImage, "setupImage");
        setTimeout(() => {
          if (img.complete) {
            setupImage();
          }
        });
        img.addEventListener("error", setupImage);
        img.addEventListener("load", setupImage);
      })
    )
  );
}
__name(configureLabelImages, "configureLabelImages");
function hasTextBesidesImages(node) {
  var _a;
  if (node.nodeType === TEXT_NODE) {
    return ((_a = node.textContent) == null ? void 0 : _a.trim()) !== "";
  }
  if (node.nodeType !== ELEMENT_NODE) {
    return false;
  }
  const element = node;
  if (element.tagName.toLowerCase() === "img") {
    return false;
  }
  return [...node.childNodes].some(hasTextBesidesImages);
}
__name(hasTextBesidesImages, "hasTextBesidesImages");
var SECTION_GAP = 3;
var MIN_WRAP_WIDTH = 32;
var c4LabelHelper = __name(async (parent, node, classes) => {
  var _a, _b, _c;
  const config = getConfig2();
  const shapeSvg = parent.insert("g").attr("class", classes ?? "node default").attr("id", node.domId || node.id);
  const labelEl = shapeSvg.insert("g").attr("class", "label").attr("style", handleUndefinedAttr(node.labelStyle));
  const name = typeof node.label === "string" ? node.label : ((_a = node.label) == null ? void 0 : _a[0]) ?? "";
  const sections = [
    { text: name, cssClass: "c4-name" },
    { text: node.stereotype, cssClass: "c4-type" },
    ...(node.description ?? []).map((line) => ({ text: line, cssClass: "c4-descr" }))
  ].filter((section) => section.text);
  const wrapWidth = node.width ? Math.max(node.width - 2 * (node.padding ?? 0), MIN_WRAP_WIDTH) : ((_b = getConfig2().flowchart) == null ? void 0 : _b.wrappingWidth) ?? 200;
  const shouldWrap = ((_c = config.c4) == null ? void 0 : _c.wrap) ?? true;
  const width = shouldWrap ? wrapWidth : Number.POSITIVE_INFINITY;
  const rendered = await Promise.all(
    sections.map(async (section) => {
      const sectionEl = labelEl.append("g").attr("class", section.cssClass);
      const textEl = await createText(
        sectionEl,
        sanitizeText(decodeEntities(section.text ?? ""), config),
        {
          useHtmlLabels: false,
          markdown: false,
          isNode: true,
          width,
          style: node.labelStyle
        },
        config
      );
      select_default(textEl).selectAll("tspan.text-outer-tspan").attr("text-anchor", "middle");
      select_default(textEl).selectAll("tspan.text-inner-tspan").attr("font-weight", null).attr("font-style", null);
      return { el: sectionEl, box: sectionEl.node().getBBox() };
    })
  );
  const totalWidth = Math.max(...rendered.map(({ box }) => box.width), 0);
  let y = 0;
  for (const { el, box } of rendered) {
    el.attr("transform", `translate(${totalWidth / 2 - box.x - box.width / 2}, ${y - box.y})`);
    y += box.height + SECTION_GAP;
  }
  const totalHeight = rendered.length > 0 ? y - SECTION_GAP : 0;
  labelEl.insert("rect", ":first-child");
  labelEl.attr("transform", `translate(${-totalWidth / 2}, ${-totalHeight / 2})`);
  const bbox = labelEl.node().getBBox();
  const halfPadding = (node.padding ?? 0) / 2;
  return { shapeSvg, bbox, halfPadding, label: labelEl };
}, "c4LabelHelper");
var withMinWidth = __name((bbox, minWidth) => {
  const { x, y, width, height } = bbox;
  if (width >= minWidth) {
    return bbox;
  }
  if (!("left" in bbox)) {
    return { x: x - (minWidth - width) / 2, y, width: minWidth, height };
  }
  return {
    x,
    y,
    width: minWidth,
    height,
    top: y,
    left: x,
    bottom: y + height,
    right: x + minWidth,
    toJSON: __name(() => ({}), "toJSON")
  };
}, "withMinWidth");
var labelHelper = __name(async (parent, node, _classes) => {
  var _a, _b;
  if (node.stereotype !== void 0) {
    return c4LabelHelper(parent, node, _classes);
  }
  let cssClasses;
  const useHtmlLabels = node.useHtmlLabels || evaluate((_a = getConfig2()) == null ? void 0 : _a.htmlLabels);
  if (!_classes) {
    cssClasses = "node default";
  } else {
    cssClasses = _classes;
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const labelEl = shapeSvg.insert("g").attr("class", "label").attr("style", handleUndefinedAttr(node.labelStyle));
  let label;
  if (node.label === void 0) {
    label = "";
  } else {
    label = typeof node.label === "string" ? node.label : node.label[0];
  }
  const addBackground = !!node.icon || !!node.img;
  const isMarkdown = node.labelType === "markdown";
  const minLabelWidth = label && !node.width ? node.minWidth ?? 0 : 0;
  const text2 = await createText(
    labelEl,
    sanitizeText(decodeEntities(label), getConfig2()),
    {
      useHtmlLabels,
      width: node.width || node.wrappingWidth || ((_b = getConfig2().flowchart) == null ? void 0 : _b.wrappingWidth),
      minWidth: minLabelWidth,
      classes: isMarkdown ? "markdown-node-label" : "",
      style: node.labelStyle,
      addSvgBackground: addBackground,
      markdown: isMarkdown
    },
    getConfig2()
  );
  const halfPadding = ((node == null ? void 0 : node.padding) ?? 0) / 2;
  let bbox;
  if (useHtmlLabels) {
    const div = text2.children[0];
    const dv = select_default(text2);
    await configureLabelImages(div);
    bbox = await fastdom_default2.measure(
      () => false ? profiler.tickSync("getBoundingClientRect", () => div.getBoundingClientRect()) : div.getBoundingClientRect()
    );
    bbox = withMinWidth(bbox, minLabelWidth);
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  } else {
    bbox = await fastdom_default2.measure(
      () => false ? profiler.tickSync("getBBox", () => text2.getBBox()) : text2.getBBox()
    );
    bbox = withMinWidth(bbox, minLabelWidth);
  }
  if (useHtmlLabels) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  } else {
    labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
  }
  if (node.centerLabel) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  }
  labelEl.insert("rect", ":first-child");
  return { shapeSvg, bbox, halfPadding, label: labelEl };
}, "labelHelper");
var insertLabel = __name(async (parent, label, options) => {
  var _a, _b;
  const useHtmlLabels = options.useHtmlLabels ?? getEffectiveHtmlLabels(getConfig2());
  const labelEl = parent.insert("g").attr("class", "label").attr("style", options.labelStyle || "");
  const text2 = await createText(labelEl, sanitizeText(decodeEntities(label), getConfig2()), {
    useHtmlLabels,
    width: options.width || ((_b = (_a = getConfig2()) == null ? void 0 : _a.flowchart) == null ? void 0 : _b.wrappingWidth),
    style: options.labelStyle,
    addSvgBackground: !!options.icon || !!options.img
  });
  const halfPadding = options.padding / 2;
  let bbox;
  if (getEffectiveHtmlLabels(getConfig2())) {
    const div = text2.children[0];
    const dv = select_default(text2);
    bbox = await fastdom_default2.measure(
      () => false ? profiler.tickSync("getBoundingClientRect", () => div.getBoundingClientRect()) : div.getBoundingClientRect()
    );
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  } else {
    bbox = await fastdom_default2.measure(
      () => false ? profiler.tickSync("getBBox", () => text2.getBBox()) : text2.getBBox()
    );
  }
  if (useHtmlLabels) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  } else {
    labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
  }
  if (options.centerLabel) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  }
  labelEl.insert("rect", ":first-child");
  return { shapeSvg: parent, bbox, halfPadding, label: labelEl };
}, "insertLabel");
var updateNodeBounds = __name((node, element, knownBounds) => {
  if (knownBounds) {
    node.width = knownBounds.width;
    node.height = knownBounds.height;
    return;
  }
  const bbox = false ? profiler.tickSync("getBBox", () => element.node().getBBox()) : element.node().getBBox();
  node.width = bbox.width;
  node.height = bbox.height;
}, "updateNodeBounds");
var getNodeClasses = __name((node, extra) => (node.look === "handDrawn" ? "rough-node" : "node") + " " + node.cssClasses + " " + (extra || ""), "getNodeClasses");
function createPathFromPoints(points) {
  const pointStrings = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`);
  pointStrings.push("Z");
  return pointStrings.join(" ");
}
__name(createPathFromPoints, "createPathFromPoints");
function generateFullSineWavePoints(x1, y1, x2, y2, amplitude, numCycles) {
  const points = [];
  const steps = 50;
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const cycleLength = deltaX / numCycles;
  const frequency = 2 * Math.PI / cycleLength;
  const midY = y1 + deltaY / 2;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x1 + t * deltaX;
    const y = midY + amplitude * Math.sin(frequency * (x - x1));
    points.push({ x, y });
  }
  return points;
}
__name(generateFullSineWavePoints, "generateFullSineWavePoints");
function generateCirclePoints(centerX, centerY, radius, numPoints, startAngle, endAngle) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x: -x, y: -y });
  }
  return points;
}
__name(generateCirclePoints, "generateCirclePoints");
function mergePaths(roughElement) {
  const paths = Array.from(roughElement.childNodes).filter(
    (node) => node.tagName === "path"
  );
  const mergedPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const combinedPathData = paths.map((path) => path.getAttribute("d")).filter((d) => d !== null).join(" ");
  mergedPath.setAttribute("d", combinedPathData);
  const fillPath = paths.find((path) => path.getAttribute("fill") !== "none");
  const strokePath = paths.find((path) => path.getAttribute("stroke") !== "none");
  const getAttr = __name((element, attr) => {
    return (element == null ? void 0 : element.getAttribute(attr)) ?? void 0;
  }, "getAttr");
  if (fillPath) {
    const fillAttrs = {
      fill: getAttr(fillPath, "fill"),
      "fill-opacity": getAttr(fillPath, "fill-opacity") ?? "1"
    };
    Object.entries(fillAttrs).forEach(([attr, value]) => {
      if (value) {
        mergedPath.setAttribute(attr, value);
      }
    });
  }
  if (strokePath) {
    const strokeAttrs = {
      stroke: getAttr(strokePath, "stroke"),
      "stroke-width": getAttr(strokePath, "stroke-width") ?? "1",
      "stroke-opacity": getAttr(strokePath, "stroke-opacity") ?? "1"
    };
    Object.entries(strokeAttrs).forEach(([attr, value]) => {
      if (value) {
        mergedPath.setAttribute(attr, value);
      }
    });
  }
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.appendChild(mergedPath);
  return group;
}
__name(mergePaths, "mergePaths");
var intersectRect = __name((node, point) => {
  var x = node.x;
  var y = node.y;
  var dx = point.x - x;
  var dy = point.y - y;
  var w = node.width / 2;
  var h = node.height / 2;
  var sx, sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    if (dy < 0) {
      h = -h;
    }
    sx = dy === 0 ? 0 : h * dx / dy;
    sy = h;
  } else {
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = dx === 0 ? 0 : w * dy / dx;
  }
  return { x: x + sx, y: y + sy };
}, "intersectRect");
var intersect_rect_default = intersectRect;
function intersectNode(node, point) {
  return node.intersect(point);
}
__name(intersectNode, "intersectNode");
var intersect_node_default = intersectNode;
function intersectEllipse(node, rx, ry, point) {
  var cx = node.x;
  var cy = node.y;
  var px = cx - point.x;
  var py = cy - point.y;
  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);
  var dx = Math.abs(rx * ry * px / det);
  if (point.x < cx) {
    dx = -dx;
  }
  var dy = Math.abs(rx * ry * py / det);
  if (point.y < cy) {
    dy = -dy;
  }
  return { x: cx + dx, y: cy + dy };
}
__name(intersectEllipse, "intersectEllipse");
var intersect_ellipse_default = intersectEllipse;
function intersectCircle(node, rx, point) {
  return intersect_ellipse_default(node, rx, rx, point);
}
__name(intersectCircle, "intersectCircle");
var intersect_circle_default = intersectCircle;
function intersectLine(p1, p2, q1, q2) {
  {
    const a1 = p2.y - p1.y;
    const b1 = p1.x - p2.x;
    const c1 = p2.x * p1.y - p1.x * p2.y;
    const r3 = a1 * q1.x + b1 * q1.y + c1;
    const r4 = a1 * q2.x + b1 * q2.y + c1;
    const epsilon = 1e-6;
    if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
      return;
    }
    const a2 = q2.y - q1.y;
    const b2 = q1.x - q2.x;
    const c2 = q2.x * q1.y - q1.x * q2.y;
    const r1 = a2 * p1.x + b2 * p1.y + c2;
    const r2 = a2 * p2.x + b2 * p2.y + c2;
    if (Math.abs(r1) < epsilon && Math.abs(r2) < epsilon && sameSign(r1, r2)) {
      return;
    }
    const denom = a1 * b2 - a2 * b1;
    if (denom === 0) {
      return;
    }
    const x = (b1 * c2 - b2 * c1) / denom;
    const y = (a2 * c1 - a1 * c2) / denom;
    return { x, y };
  }
}
__name(intersectLine, "intersectLine");
function sameSign(r1, r2) {
  return r1 * r2 > 0;
}
__name(sameSign, "sameSign");
var intersect_line_default = intersectLine;
function intersectPolygon(node, polyPoints, point) {
  let x1 = node.x;
  let y1 = node.y;
  let intersections = [];
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  if (typeof polyPoints.forEach === "function") {
    polyPoints.forEach(function(entry) {
      minX = Math.min(minX, entry.x);
      minY = Math.min(minY, entry.y);
    });
  } else {
    minX = Math.min(minX, polyPoints.x);
    minY = Math.min(minY, polyPoints.y);
  }
  let left = x1 - node.width / 2 - minX;
  let top = y1 - node.height / 2 - minY;
  for (let i = 0; i < polyPoints.length; i++) {
    let p1 = polyPoints[i];
    let p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
    let intersect = intersect_line_default(
      node,
      point,
      { x: left + p1.x, y: top + p1.y },
      { x: left + p2.x, y: top + p2.y }
    );
    if (intersect) {
      intersections.push(intersect);
    }
  }
  if (!intersections.length) {
    return node;
  }
  if (intersections.length > 1) {
    intersections.sort(function(p, q) {
      let pdx = p.x - point.x;
      let pdy = p.y - point.y;
      let distp = Math.sqrt(pdx * pdx + pdy * pdy);
      let qdx = q.x - point.x;
      let qdy = q.y - point.y;
      let distq = Math.sqrt(qdx * qdx + qdy * qdy);
      return distp < distq ? -1 : distp === distq ? 0 : 1;
    });
  }
  return intersections[0];
}
__name(intersectPolygon, "intersectPolygon");
var intersect_polygon_default = intersectPolygon;
var intersect_default = {
  node: intersect_node_default,
  circle: intersect_circle_default,
  ellipse: intersect_ellipse_default,
  polygon: intersect_polygon_default,
  rect: intersect_rect_default
};
var createRoundedRectPathD = __name((x, y, totalWidth, totalHeight, radius) => [
  "M",
  x + radius,
  y,
  // Move to the first point
  "H",
  x + totalWidth - radius,
  // Draw horizontal line to the beginning of the right corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x + totalWidth,
  y + radius,
  // Draw arc to the right top corner
  "V",
  y + totalHeight - radius,
  // Draw vertical line down to the beginning of the right bottom corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x + totalWidth - radius,
  y + totalHeight,
  // Draw arc to the right bottom corner
  "H",
  x + radius,
  // Draw horizontal line to the beginning of the left bottom corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x,
  y + totalHeight - radius,
  // Draw arc to the left bottom corner
  "V",
  y + radius,
  // Draw vertical line up to the beginning of the left top corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x + radius,
  y,
  // Draw arc to the left top corner
  "Z"
  // Close the path
].join(" "), "createRoundedRectPathD");
var createLabel = __name(async (element, _vertexText, style, isTitle = false, isNode = false) => {
  let vertexText = _vertexText || "";
  if (typeof vertexText === "object") {
    vertexText = vertexText[0];
  }
  const config = getConfig2();
  const useHtmlLabels = getEffectiveHtmlLabels(config);
  return await createText(
    element,
    vertexText,
    {
      style,
      isTitle,
      useHtmlLabels,
      markdown: false,
      isNode,
      width: Number.POSITIVE_INFINITY
    },
    config
  );
}, "createLabel");
var createLabel_default = createLabel;
function anchor(parent, node) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const classes = getNodeClasses(node);
  let cssClasses = classes;
  if (!classes) {
    cssClasses = "anchor";
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const radius = 1;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "black", stroke: "none", fillStyle: "solid" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
  }
  const roughNode = rc.circle(0, 0, radius * 2, options);
  const circleElem = shapeSvg.insert(() => roughNode, ":first-child");
  circleElem.attr("class", "anchor").attr("style", handleUndefinedAttr(cssStyles));
  updateNodeBounds(node, circleElem);
  node.intersect = function(point) {
    log.info("Circle intersect", node, radius, point);
    return intersect_default.circle(node, radius, point);
  };
  return shapeSvg;
}
__name(anchor, "anchor");
function generateArcPoints(x1, y1, x2, y2, rx, ry, clockwise) {
  const numPoints = 20;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const dx = (x2 - x1) / 2;
  const dy = (y2 - y1) / 2;
  const transformedX = dx / rx;
  const transformedY = dy / ry;
  const distance = Math.sqrt(transformedX ** 2 + transformedY ** 2);
  if (distance > 1) {
    throw new Error("The given radii are too small to create an arc between the points.");
  }
  const scaledCenterDistance = Math.sqrt(1 - distance ** 2);
  const centerX = midX + scaledCenterDistance * ry * Math.sin(angle) * (clockwise ? -1 : 1);
  const centerY = midY - scaledCenterDistance * rx * Math.cos(angle) * (clockwise ? -1 : 1);
  const startAngle = Math.atan2((y1 - centerY) / ry, (x1 - centerX) / rx);
  const endAngle = Math.atan2((y2 - centerY) / ry, (x2 - centerX) / rx);
  let angleRange = endAngle - startAngle;
  if (clockwise && angleRange < 0) {
    angleRange += 2 * Math.PI;
  }
  if (!clockwise && angleRange > 0) {
    angleRange -= 2 * Math.PI;
  }
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const angle2 = startAngle + t * angleRange;
    const x = centerX + rx * Math.cos(angle2);
    const y = centerY + ry * Math.sin(angle2);
    points.push({ x, y });
  }
  return points;
}
__name(generateArcPoints, "generateArcPoints");
function calculateArcSagitta(chord, radiusX, radiusY) {
  const [semiMajorAxis, semiMinorAxis] = [radiusX, radiusY].sort((a, b) => b - a);
  return semiMinorAxis * (1 - Math.sqrt(1 - (chord / semiMajorAxis / 2) ** 2));
}
__name(calculateArcSagitta, "calculateArcSagitta");
async function bowTieRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  const calcTotalHeight = __name((labelHeight) => labelHeight + labelPaddingY, "calcTotalHeight");
  const calcEllipseRadius = __name((totalHeight2) => {
    const ry2 = totalHeight2 / 2;
    const rx2 = ry2 / (2.5 + totalHeight2 / 50);
    return [rx2, ry2];
  }, "calcEllipseRadius");
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalHeight = calcTotalHeight((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height);
  const [rx, ry] = calcEllipseRadius(totalHeight);
  const sagitta = calculateArcSagitta(totalHeight, rx, ry);
  const totalWidth = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2 + sagitta;
  const w = totalWidth - sagitta;
  const h = totalHeight;
  const { cssStyles } = node;
  const points = [
    { x: w / 2, y: -h / 2 },
    { x: -w / 2, y: -h / 2 },
    ...generateArcPoints(-w / 2, -h / 2, -w / 2, h / 2, rx, ry, false),
    { x: w / 2, y: h / 2 },
    ...generateArcPoints(w / 2, h / 2, w / 2, -h / 2, rx, ry, true)
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const bowTieRectPath = createPathFromPoints(points);
  const bowTieRectShapePath = rc.path(bowTieRectPath, options);
  const bowTieRectShape = shapeSvg.insert(() => bowTieRectShapePath, ":first-child");
  bowTieRectShape.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    bowTieRectShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    bowTieRectShape.selectAll("path").attr("style", nodeStyles);
  }
  bowTieRectShape.attr("transform", `translate(${rx / 2}, 0)`);
  updateNodeBounds(node, bowTieRectShape);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(bowTieRect, "bowTieRect");
async function bucket(parent, node, { config: { themeVariables } }) {
  var _a;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const accent = (themeVariables == null ? void 0 : themeVariables.nodeBorder) ?? (themeVariables == null ? void 0 : themeVariables.lineColor) ?? "currentColor";
  const padding = node.padding ?? 12;
  const w = Math.max(bbox.width + padding * 2, node.width ?? 0, 80);
  const rimRy = Math.max(Math.min(w * 0.08, 12), 5);
  const totalHeight = Math.max(bbox.height + padding * 2 + rimRy, node.height ?? 0);
  const topY = -totalHeight / 2 + rimRy;
  const bottomY = totalHeight / 2;
  const bottomW = w * 0.72;
  const body = [
    `M${-w / 2},${topY}`,
    `L${-bottomW / 2},${bottomY}`,
    `A${bottomW / 2},${rimRy} 0 0 0 ${bottomW / 2},${bottomY}`,
    `L${w / 2},${topY}`,
    `A${w / 2},${rimRy} 0 0 0 ${-w / 2},${topY}`,
    `Z`
  ].join(" ");
  const { cssStyles } = node;
  const group = shapeSvg.insert("g", ":first-child").attr("class", "basic label-container");
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughNode = rc.path(body, userNodeOverrides(node, {}));
    (_a = group.node()) == null ? void 0 : _a.appendChild(roughNode);
    if (cssStyles) {
      group.attr("style", cssStyles);
    }
  } else {
    group.append("path").attr("d", body).attr("style", nodeStyles);
  }
  group.append("ellipse").attr("cx", 0).attr("cy", topY).attr("rx", w / 2).attr("ry", rimRy).attr("style", `fill:none;stroke:${accent};stroke-width:1px`);
  updateNodeBounds(node, group);
  const bodyCenterY = topY + (bottomY - topY) / 2;
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${bodyCenterY - bbox.height / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  const ARC_SEGMENTS = 12;
  const arc = __name((rx, cy, ySign) => Array.from({ length: ARC_SEGMENTS + 1 }, (_, i) => {
    const theta = Math.PI - i * Math.PI / ARC_SEGMENTS;
    return { x: rx * Math.cos(theta), y: cy + ySign * rimRy * Math.sin(theta) };
  }), "arc");
  const outline = [...arc(w / 2, topY, -1), ...arc(bottomW / 2, bottomY, 1).reverse()];
  node.intersect = function(point) {
    return intersect_default.polygon(node, outline, point);
  };
  return shapeSvg;
}
__name(bucket, "bucket");
var INDICATOR_ROW_HEIGHT = 20;
var SEPARATOR_GAP = 8;
var MIN_WIDTH = 80;
var RADIUS = 8;
function getCollapsedStyle(containerType) {
  const { themeVariables } = getConfig2();
  const clusterBkg = themeVariables.clusterBkg;
  const clusterBorder = themeVariables.clusterBorder;
  switch (containerType) {
    case "flow":
      return {
        rx: 10,
        fill: "none",
        stroke: themeVariables.flowContainerStroke || themeVariables.secondaryBorderColor,
        strokeWidth: 0.75,
        cssClass: "flow-collapsed"
      };
    default:
      return {
        rx: RADIUS,
        fill: clusterBkg,
        stroke: clusterBorder,
        cssClass: "collapsed-group"
      };
  }
}
__name(getCollapsedStyle, "getCollapsedStyle");
async function collapsedGroup(parent, node) {
  var _a;
  const style = getCollapsedStyle((_a = node.metadata) == null ? void 0 : _a.containerType);
  const { fill, stroke } = style;
  const { nodeStyles } = styles2String(node);
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const { theme, themeVariables } = getConfig2();
  stampColorSlot(shapeSvg, node.colorIndex, theme, themeVariables.borderColorArray);
  const padding = node.padding ?? 8;
  const titleHeight = bbox.height;
  const totalWidth = Math.max(bbox.width + padding * 2, MIN_WIDTH, (node == null ? void 0 : node.width) ?? 0);
  const totalHeight = Math.max(
    titleHeight + SEPARATOR_GAP + INDICATOR_ROW_HEIGHT + padding * 2,
    (node == null ? void 0 : node.height) ?? 0
  );
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const labelShiftY = -(SEPARATOR_GAP + INDICATOR_ROW_HEIGHT) / 2;
  const labelEl = shapeSvg.select(".label");
  if (labelEl) {
    const useHtmlLabels = node.useHtmlLabels ?? getEffectiveHtmlLabels(getConfig2());
    if (useHtmlLabels) {
      labelEl.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2 + labelShiftY})`);
    } else {
      labelEl.attr("transform", `translate(0, ${-bbox.height / 2 + labelShiftY})`);
    }
  }
  let rect;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughOpts = userNodeOverrides(node, {
      fill,
      stroke,
      ...style.strokeWidth === void 0 ? {} : { strokeWidth: style.strokeWidth },
      ...fill === "none" ? { fillWeight: 0 } : { fillStyle: "solid" }
    });
    const roughNode = rc.path(
      createRoundedRectPathD(x, y, totalWidth, totalHeight, style.rx),
      roughOpts
    );
    rect = shapeSvg.insert(() => roughNode, ":first-child");
    rect.attr("class", "basic label-container " + style.cssClass).attr("style", handleUndefinedAttr(node.cssStyles));
  } else {
    rect = shapeSvg.insert("rect", ":first-child");
    rect.attr("class", "basic label-container " + style.cssClass).attr("style", nodeStyles).attr("rx", style.rx).attr("ry", style.rx).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight).attr("fill", fill).attr("stroke", stroke);
    if (style.strokeWidth !== void 0) {
      rect.attr("stroke-width", style.strokeWidth + "px");
    }
  }
  const separatorY = y + padding + titleHeight + SEPARATOR_GAP;
  shapeSvg.append("line").attr("class", "collapsed-separator").attr("x1", x + 8).attr("y1", separatorY).attr("x2", x + totalWidth - 8).attr("y2", separatorY).attr("stroke", stroke).attr("stroke-dasharray", "3, 3");
  const dotY = separatorY + INDICATOR_ROW_HEIGHT / 2;
  const dotRadius = 2.5;
  const dotSpacing = 10;
  for (let i = -1; i <= 1; i++) {
    shapeSvg.append("circle").attr("class", "collapsed-indicator").attr("cx", i * dotSpacing).attr("cy", dotY).attr("r", dotRadius).attr("fill", stroke);
  }
  updateNodeBounds(node, rect);
  node.calcIntersect = function(bounds, point) {
    return intersect_default.rect(bounds, point);
  };
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(collapsedGroup, "collapsedGroup");
function insertPolygonShape(parent, w, h, points) {
  return parent.insert("polygon", ":first-child").attr(
    "points",
    points.map(function(d) {
      return d.x + "," + d.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -w / 2 + "," + h / 2 + ")");
}
__name(insertPolygonShape, "insertPolygonShape");
var DIRECTION_ORDER = ["right", "left", "up", "down"];
var POINT_KEY = "point";
var expandAndDeduplicateDirections = __name((directions) => {
  const uniqueDirections = /* @__PURE__ */ new Set();
  for (const direction of directions) {
    switch (direction) {
      case "x":
        uniqueDirections.add("right");
        uniqueDirections.add("left");
        break;
      case "y":
        uniqueDirections.add("up");
        uniqueDirections.add("down");
        break;
      default:
        uniqueDirections.add(direction);
        break;
    }
  }
  return uniqueDirections;
}, "expandAndDeduplicateDirections");
var getDirectionKey = __name((directions) => DIRECTION_ORDER.filter((direction) => directions.has(direction)).join("|") || POINT_KEY, "getDirectionKey");
var arrowPointFactories = {
  "right|left|up|down": __name(({ height, midpoint, padding, width }) => [
    { x: 0, y: 0 },
    { x: midpoint, y: 0 },
    { x: width / 2, y: 2 * padding },
    { x: width - midpoint, y: 0 },
    { x: width, y: 0 },
    { x: width, y: -height / 3 },
    { x: width + 2 * padding, y: -height / 2 },
    { x: width, y: -2 * height / 3 },
    { x: width, y: -height },
    { x: width - midpoint, y: -height },
    { x: width / 2, y: -height - 2 * padding },
    { x: midpoint, y: -height },
    { x: 0, y: -height },
    { x: 0, y: -2 * height / 3 },
    { x: -2 * padding, y: -height / 2 },
    { x: 0, y: -height / 3 }
  ], "right|left|up|down"),
  "right|left|up": __name(({ height, midpoint, width }) => [
    { x: midpoint, y: 0 },
    { x: width - midpoint, y: 0 },
    { x: width, y: -height / 2 },
    { x: width - midpoint, y: -height },
    { x: midpoint, y: -height },
    { x: 0, y: -height / 2 }
  ], "right|left|up"),
  "right|left|down": __name(({ height, midpoint, width }) => [
    { x: 0, y: 0 },
    { x: midpoint, y: -height },
    { x: width - midpoint, y: -height },
    { x: width, y: 0 }
  ], "right|left|down"),
  "right|up|down": __name(({ height, midpoint, width }) => [
    { x: 0, y: 0 },
    { x: width, y: -midpoint },
    { x: width, y: -height + midpoint },
    { x: 0, y: -height }
  ], "right|up|down"),
  "left|up|down": __name(({ height, midpoint, width }) => [
    { x: width, y: 0 },
    { x: 0, y: -midpoint },
    { x: 0, y: -height + midpoint },
    { x: width, y: -height }
  ], "left|up|down"),
  "right|left": __name(({ height, midpoint, padding, width }) => [
    { x: midpoint, y: 0 },
    { x: midpoint, y: -padding },
    { x: width - midpoint, y: -padding },
    { x: width - midpoint, y: 0 },
    { x: width, y: -height / 2 },
    { x: width - midpoint, y: -height },
    { x: width - midpoint, y: -height + padding },
    { x: midpoint, y: -height + padding },
    { x: midpoint, y: -height },
    { x: 0, y: -height / 2 }
  ], "right|left"),
  "up|down": __name(({ height, midpoint, padding, width }) => [
    { x: width / 2, y: 0 },
    { x: 0, y: -padding },
    { x: midpoint, y: -padding },
    { x: midpoint, y: -height + padding },
    { x: 0, y: -height + padding },
    { x: width / 2, y: -height },
    { x: width, y: -height + padding },
    { x: width - midpoint, y: -height + padding },
    { x: width - midpoint, y: -padding },
    { x: width, y: -padding }
  ], "up|down"),
  "right|up": __name(({ height, midpoint, width }) => [
    { x: 0, y: 0 },
    { x: width, y: -midpoint },
    { x: 0, y: -height }
  ], "right|up"),
  "right|down": __name(({ height, width }) => [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: -height }
  ], "right|down"),
  "left|up": __name(({ height, midpoint, width }) => [
    { x: width, y: 0 },
    { x: 0, y: -midpoint },
    { x: width, y: -height }
  ], "left|up"),
  "left|down": __name(({ height, width }) => [
    { x: width, y: 0 },
    { x: 0, y: 0 },
    { x: width, y: -height }
  ], "left|down"),
  right: __name(({ height, midpoint, padding, width }) => [
    { x: midpoint, y: -padding },
    { x: midpoint, y: -padding },
    { x: width - midpoint, y: -padding },
    { x: width - midpoint, y: 0 },
    { x: width, y: -height / 2 },
    { x: width - midpoint, y: -height },
    { x: width - midpoint, y: -height + padding },
    { x: midpoint, y: -height + padding },
    { x: midpoint, y: -height + padding }
  ], "right"),
  left: __name(({ height, midpoint, padding, width }) => [
    { x: midpoint, y: 0 },
    { x: midpoint, y: -padding },
    { x: width - midpoint, y: -padding },
    { x: width - midpoint, y: -height + padding },
    { x: midpoint, y: -height + padding },
    { x: midpoint, y: -height },
    { x: 0, y: -height / 2 }
  ], "left"),
  up: __name(({ height, midpoint, padding, width }) => [
    { x: midpoint, y: -padding },
    { x: midpoint, y: -height + padding },
    { x: 0, y: -height + padding },
    { x: width / 2, y: -height },
    { x: width, y: -height + padding },
    { x: width - midpoint, y: -height + padding },
    { x: width - midpoint, y: -padding }
  ], "up"),
  down: __name(({ height, midpoint, padding, width }) => [
    { x: width / 2, y: 0 },
    { x: 0, y: -padding },
    { x: midpoint, y: -padding },
    { x: midpoint, y: -height + padding },
    { x: width - midpoint, y: -height + padding },
    { x: width - midpoint, y: -padding },
    { x: width, y: -padding }
  ], "down"),
  [POINT_KEY]: () => [{ x: 0, y: 0 }]
};
var getArrowPoints = __name((duplicatedDirections, bbox, node, totalWidth) => {
  const directions = expandAndDeduplicateDirections(duplicatedDirections);
  const padding = (node.padding ?? 0) / 2;
  const height = bbox.height + 4 * padding;
  const midpoint = height / 2;
  const width = totalWidth ?? bbox.width + 2 * midpoint + 2 * padding;
  const key = getDirectionKey(directions);
  const pointFactory = arrowPointFactories[key] ?? arrowPointFactories[POINT_KEY];
  return pointFactory({ height, midpoint, padding, width });
}, "getArrowPoints");
async function block_arrow(parent, node) {
  const blockNode = node;
  const { shapeSvg, bbox } = await labelHelper(parent, blockNode, getNodeClasses(blockNode));
  const nodePadding = blockNode.padding ?? 0;
  const height = bbox.height + 2 * nodePadding;
  const midpoint = height / 2;
  const naturalWidth = bbox.width + 2 * midpoint + nodePadding;
  const nodeWidth = blockNode.width ?? 0;
  const isSpanning = blockNode.positioned && (blockNode.widthInColumns ?? 1) > 1 && nodeWidth > naturalWidth;
  const width = isSpanning ? nodeWidth : naturalWidth;
  const points = getArrowPoints(blockNode.directions ?? [], bbox, blockNode, width);
  const blockArrow = insertPolygonShape(shapeSvg, width, height, points);
  blockArrow.attr("style", blockNode.style ?? null);
  updateNodeBounds(blockNode, blockArrow);
  blockNode.intersect = function(point) {
    return intersect_default.polygon(blockNode, points, point);
  };
  return shapeSvg;
}
__name(block_arrow, "block_arrow");
async function browser(parent, node, { config: { themeVariables } }) {
  var _a;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const accent = (themeVariables == null ? void 0 : themeVariables.nodeBorder) ?? (themeVariables == null ? void 0 : themeVariables.lineColor) ?? "currentColor";
  const padding = node.padding ?? 12;
  const barHeight = 18;
  const radius = 12;
  const w = Math.max(bbox.width + padding * 2, node.width ?? 0, 90);
  const h = Math.max(bbox.height + padding * 2 + barHeight, node.height ?? 0);
  const top = -h / 2;
  const { cssStyles } = node;
  const group = shapeSvg.insert("g", ":first-child").attr("class", "basic label-container");
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughNode = rc.path(
      createRoundedRectPathD(-w / 2, top, w, h, radius),
      userNodeOverrides(node, {})
    );
    (_a = group.node()) == null ? void 0 : _a.appendChild(roughNode);
    if (cssStyles) {
      group.attr("style", cssStyles);
    }
  } else {
    group.append("rect").attr("x", -w / 2).attr("y", top).attr("width", w).attr("height", h).attr("rx", radius).attr("ry", radius).attr("style", nodeStyles);
  }
  group.append("line").attr("x1", -w / 2).attr("y1", top + barHeight).attr("x2", w / 2).attr("y2", top + barHeight).attr("style", `stroke:${accent};stroke-width:1px`);
  for (let i = 0; i < 3; i++) {
    group.append("circle").attr("cx", -w / 2 + 12 + i * 9).attr("cy", top + barHeight / 2).attr("r", 2.5).attr("style", `fill:${accent};stroke:none`);
  }
  group.append("rect").attr("class", "browser-address-bar").attr("x", -w / 2 + 44).attr("y", top + 4).attr("width", Math.max(w - 56, 10)).attr("height", barHeight - 8).attr("rx", 3).attr("ry", 3).attr("style", `fill:none;stroke:${accent};stroke-width:1px;opacity:0.6`);
  updateNodeBounds(node, group);
  const bodyCenterY = top + barHeight + (h - barHeight) / 2;
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${bodyCenterY - bbox.height / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(browser, "browser");
var NOTCH_SIZE = 12;
async function card(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 28 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 24 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ?? bbox.width) + (node.look === "neo" ? labelPaddingX * 2 : labelPaddingX + NOTCH_SIZE);
  const h = ((node == null ? void 0 : node.height) ?? bbox.height) + (node.look === "neo" ? labelPaddingY * 2 : labelPaddingY);
  const left = 0;
  const right = w;
  const top = -h;
  const bottom = 0;
  const points = [
    { x: left + NOTCH_SIZE, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
    { x: left, y: top + NOTCH_SIZE },
    { x: left + NOTCH_SIZE, y: top }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(card, "card");
function choice(parent, node) {
  const { nodeStyles } = styles2String(node);
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  const s = Math.max(28, node.width ?? 0);
  const points = [
    { x: 0, y: s / 2 },
    { x: s / 2, y: 0 },
    { x: 0, y: -s / 2 },
    { x: -s / 2, y: 0 }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const choicePath = createPathFromPoints(points);
  const roughNode = rc.path(choicePath, options);
  const choiceShape = shapeSvg.insert(() => roughNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    choiceShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    choiceShape.selectAll("path").attr("style", nodeStyles);
  }
  node.width = 28;
  node.height = 28;
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(choice, "choice");
async function circle(parent, node, options) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
  const labelPadding = 16;
  const padding = (options == null ? void 0 : options.padding) ?? halfPadding;
  const labelRadius = Math.sqrt(bbox.width ** 2 + bbox.height ** 2) / 2;
  const radius = node.look === "neo" ? labelRadius + labelPadding * 2 : labelRadius + padding;
  let circleElem;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options2 = userNodeOverrides(node, {});
    const roughNode = rc.circle(0, 0, radius * 2, options2);
    circleElem = shapeSvg.insert(() => roughNode, ":first-child");
    circleElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    circleElem = shapeSvg.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("r", radius).attr("cx", 0).attr("cy", 0);
  }
  updateNodeBounds(node, circleElem);
  node.calcIntersect = function(bounds, point) {
    const radius2 = bounds.width / 2;
    return intersect_default.circle(bounds, radius2, point);
  };
  node.intersect = function(point) {
    log.info("Circle intersect", node, radius, point);
    return intersect_default.circle(node, radius, point);
  };
  return shapeSvg;
}
__name(circle, "circle");
async function composite(parent, node) {
  const compositeNode = node;
  const classes = ["node", compositeNode.cssClasses, compositeNode.class].filter(Boolean).join(" ");
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, compositeNode, classes);
  const rect = shapeSvg.insert("rect", ":first-child");
  const nodePadding = compositeNode.padding ?? 0;
  const totalWidth = compositeNode.positioned ? compositeNode.width ?? 0 : bbox.width + nodePadding;
  const totalHeight = compositeNode.positioned ? compositeNode.height ?? 0 : bbox.height + nodePadding;
  const x = compositeNode.positioned ? -totalWidth / 2 : -bbox.width / 2 - halfPadding;
  const y = compositeNode.positioned ? -totalHeight / 2 : -bbox.height / 2 - halfPadding;
  rect.attr("class", "basic cluster composite label-container").attr("style", compositeNode.style ?? null).attr("rx", compositeNode.rx ?? null).attr("ry", compositeNode.ry ?? null).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight);
  updateNodeBounds(compositeNode, rect);
  compositeNode.intersect = function(point) {
    return intersect_default.rect(compositeNode, point);
  };
  return shapeSvg;
}
__name(composite, "composite");
async function consoleWindow(parent, node, { config: { themeVariables } }) {
  var _a;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const accent = (themeVariables == null ? void 0 : themeVariables.nodeBorder) ?? (themeVariables == null ? void 0 : themeVariables.lineColor) ?? "currentColor";
  const padding = node.padding ?? 12;
  const glyphBand = 20;
  const radius = 12;
  const w = Math.max(bbox.width + padding * 2, node.width ?? 0, 90);
  const h = Math.max(bbox.height + padding * 2 + glyphBand, node.height ?? 0);
  const top = -h / 2;
  const { cssStyles } = node;
  const group = shapeSvg.insert("g", ":first-child").attr("class", "basic label-container");
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughNode = rc.path(
      createRoundedRectPathD(-w / 2, top, w, h, radius),
      userNodeOverrides(node, {})
    );
    (_a = group.node()) == null ? void 0 : _a.appendChild(roughNode);
    if (cssStyles) {
      group.attr("style", cssStyles);
    }
  } else {
    group.append("rect").attr("x", -w / 2).attr("y", top).attr("width", w).attr("height", h).attr("rx", radius).attr("ry", radius).attr("style", nodeStyles);
  }
  group.append("text").attr("x", -w / 2 + 12).attr("y", top + 16).attr("class", "console-glyph").attr("style", `font-family:monospace;font-weight:bold;font-size:14px;fill:${accent}`).text(">_");
  updateNodeBounds(node, group);
  const bodyCenterY = top + glyphBand + (h - glyphBand) / 2;
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${bodyCenterY - bbox.height / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(consoleWindow, "consoleWindow");
function createLine(r) {
  const xAxis45 = Math.cos(Math.PI / 4);
  const yAxis45 = Math.sin(Math.PI / 4);
  const lineLength = r * 2;
  const pointQ1 = { x: lineLength / 2 * xAxis45, y: lineLength / 2 * yAxis45 };
  const pointQ2 = { x: -(lineLength / 2) * xAxis45, y: lineLength / 2 * yAxis45 };
  const pointQ3 = { x: -(lineLength / 2) * xAxis45, y: -(lineLength / 2) * yAxis45 };
  const pointQ4 = { x: lineLength / 2 * xAxis45, y: -(lineLength / 2) * yAxis45 };
  return `M ${pointQ2.x},${pointQ2.y} L ${pointQ4.x},${pointQ4.y}
                   M ${pointQ1.x},${pointQ1.y} L ${pointQ3.x},${pointQ3.y}`;
}
__name(createLine, "createLine");
function crossedCircle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const radius = Math.max(30, (node == null ? void 0 : node.width) ?? 0);
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const circleNode = rc.circle(0, 0, radius * 2, options);
  const linePath = createLine(radius);
  const lineNode = rc.path(linePath, options);
  const crossedCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
  crossedCircle2.insert(() => lineNode);
  crossedCircle2.attr("class", "outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    crossedCircle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    crossedCircle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, crossedCircle2);
  node.intersect = function(point) {
    log.info("crossedCircle intersect", node, { radius, point });
    const pos = intersect_default.circle(node, radius, point);
    return pos;
  };
  return shapeSvg;
}
__name(crossedCircle, "crossedCircle");
function generateCirclePoints2(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x: -x, y: -y });
  }
  return points;
}
__name(generateCirclePoints2, "generateCirclePoints");
async function curlyBraceLeft(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const paddingX = node.look === "neo" ? 18 : node.padding ?? 0;
  const paddingY = node.look === "neo" ? 12 : node.padding ?? 0;
  const w = bbox.width + paddingX;
  const h = bbox.height + paddingY;
  const radius = Math.max(5, h * 0.1);
  const { cssStyles } = node;
  const points = [
    ...generateCirclePoints2(w / 2, -h / 2, radius, 30, -90, 0),
    { x: -w / 2 - radius, y: radius },
    ...generateCirclePoints2(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints2(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints2(w / 2, h / 2, radius, 20, 0, 90)
  ];
  const rectPoints = [
    { x: w / 2, y: -h / 2 - radius },
    { x: -w / 2, y: -h / 2 - radius },
    ...generateCirclePoints2(w / 2, -h / 2, radius, 20, -90, 0),
    { x: -w / 2 - radius, y: -radius },
    ...generateCirclePoints2(w / 2 + w * 0.1, -radius, radius, 20, -180, -270),
    ...generateCirclePoints2(w / 2 + w * 0.1, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: h / 2 },
    ...generateCirclePoints2(w / 2, h / 2, radius, 20, 0, 90),
    { x: -w / 2, y: h / 2 + radius },
    { x: w / 2, y: h / 2 + radius }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const curlyBraceLeftPath = createPathFromPoints(points);
  const newCurlyBracePath = curlyBraceLeftPath.replace("Z", "");
  const curlyBraceLeftNode = rc.path(newCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBraceLeftShape = shapeSvg.insert("g", ":first-child");
  curlyBraceLeftShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBraceLeftShape.insert(() => curlyBraceLeftNode, ":first-child");
  curlyBraceLeftShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBraceLeftShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBraceLeftShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBraceLeftShape.attr("transform", `translate(${radius}, 0)`);
  label.attr(
    "transform",
    `translate(${-w / 2 + radius - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBraceLeftShape);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, rectPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(curlyBraceLeft, "curlyBraceLeft");
function generateCirclePoints3(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}
__name(generateCirclePoints3, "generateCirclePoints");
async function curlyBraceRight(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const labelPaddingX = node.look === "neo" ? 18 : node.padding ?? 0;
  const labelPaddingY = node.look === "neo" ? 12 : node.padding ?? 0;
  const w = bbox.width + (node.look === "neo" ? labelPaddingX * 2 : labelPaddingX);
  const h = bbox.height + (node.look === "neo" ? labelPaddingY * 2 : labelPaddingY);
  const radius = Math.max(5, h * 0.1);
  const { cssStyles } = node;
  const points = [
    ...generateCirclePoints3(w / 2, -h / 2, radius, 20, -90, 0),
    { x: w / 2 + radius, y: -radius },
    ...generateCirclePoints3(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints3(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: w / 2 + radius, y: h / 2 },
    ...generateCirclePoints3(w / 2, h / 2, radius, 20, 0, 90)
  ];
  const rectPoints = [
    { x: -w / 2, y: -h / 2 - radius },
    { x: w / 2, y: -h / 2 - radius },
    ...generateCirclePoints3(w / 2, -h / 2, radius, 20, -90, 0),
    { x: w / 2 + radius, y: -radius },
    ...generateCirclePoints3(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints3(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: w / 2 + radius, y: h / 2 },
    ...generateCirclePoints3(w / 2, h / 2, radius, 20, 0, 90),
    { x: w / 2, y: h / 2 + radius },
    { x: -w / 2, y: h / 2 + radius }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const curlyBraceRightPath = createPathFromPoints(points);
  const newCurlyBracePath = curlyBraceRightPath.replace("Z", "");
  const curlyBraceRightNode = rc.path(newCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBraceRightShape = shapeSvg.insert("g", ":first-child");
  curlyBraceRightShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBraceRightShape.insert(() => curlyBraceRightNode, ":first-child");
  curlyBraceRightShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBraceRightShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBraceRightShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBraceRightShape.attr("transform", `translate(${-radius}, 0)`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBraceRightShape);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, rectPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(curlyBraceRight, "curlyBraceRight");
function generateCirclePoints4(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x: -x, y: -y });
  }
  return points;
}
__name(generateCirclePoints4, "generateCirclePoints");
async function curlyBraces(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const labelPaddingX = node.look === "neo" ? 18 : node.padding ?? 0;
  const labelPaddingY = node.look === "neo" ? 12 : node.padding ?? 0;
  const w = bbox.width + (node.look === "neo" ? labelPaddingX * 2 : labelPaddingX);
  const h = bbox.height + (node.look === "neo" ? labelPaddingY * 2 : labelPaddingY);
  const radius = Math.max(5, h * 0.1);
  const { cssStyles } = node;
  const leftCurlyBracePoints = [
    ...generateCirclePoints4(w / 2, -h / 2, radius, 30, -90, 0),
    { x: -w / 2 - radius, y: radius },
    ...generateCirclePoints4(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints4(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints4(w / 2, h / 2, radius, 20, 0, 90)
  ];
  const rightCurlyBracePoints = [
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, -h / 2, radius, 20, -90, -180),
    { x: w / 2 - radius / 2, y: radius },
    ...generateCirclePoints4(-w / 2 - radius / 2, -radius, radius, 20, 0, 90),
    ...generateCirclePoints4(-w / 2 - radius / 2, radius, radius, 20, -90, 0),
    { x: w / 2 - radius / 2, y: -radius },
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, h / 2, radius, 30, -180, -270)
  ];
  const rectPoints = [
    { x: w / 2, y: -h / 2 - radius },
    { x: -w / 2, y: -h / 2 - radius },
    ...generateCirclePoints4(w / 2, -h / 2, radius, 20, -90, 0),
    { x: -w / 2 - radius, y: -radius },
    ...generateCirclePoints4(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints4(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: h / 2 },
    ...generateCirclePoints4(w / 2, h / 2, radius, 20, 0, 90),
    { x: -w / 2, y: h / 2 + radius },
    { x: w / 2 - radius - radius / 2, y: h / 2 + radius },
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, -h / 2, radius, 20, -90, -180),
    { x: w / 2 - radius / 2, y: radius },
    ...generateCirclePoints4(-w / 2 - radius / 2, -radius, radius, 20, 0, 90),
    ...generateCirclePoints4(-w / 2 - radius / 2, radius, radius, 20, -90, 0),
    { x: w / 2 - radius / 2, y: -radius },
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, h / 2, radius, 30, -180, -270)
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const leftCurlyBracePath = createPathFromPoints(leftCurlyBracePoints);
  const newLeftCurlyBracePath = leftCurlyBracePath.replace("Z", "");
  const leftCurlyBraceNode = rc.path(newLeftCurlyBracePath, options);
  const rightCurlyBracePath = createPathFromPoints(rightCurlyBracePoints);
  const newRightCurlyBracePath = rightCurlyBracePath.replace("Z", "");
  const rightCurlyBraceNode = rc.path(newRightCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBracesShape = shapeSvg.insert("g", ":first-child");
  curlyBracesShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBracesShape.insert(() => leftCurlyBraceNode, ":first-child");
  curlyBracesShape.insert(() => rightCurlyBraceNode, ":first-child");
  curlyBracesShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBracesShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBracesShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBracesShape.attr("transform", `translate(${radius - radius / 4}, 0)`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBracesShape);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, rectPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(curlyBraces, "curlyBraces");
async function curvedTrapezoid(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  const minWidth = 20, minHeight = 5;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = Math.max(minHeight, bbox.height + labelPaddingY * 2, (node == null ? void 0 : node.height) ?? 0);
  const radius = h / 2;
  const capClearance = radius - Math.sqrt(Math.max(0, radius ** 2 - (bbox.height / 2) ** 2));
  const sideClearance = Math.max(h / 4, capClearance);
  const w = Math.max(
    minWidth,
    bbox.width + labelPaddingX * 2 + sideClearance * 2,
    (bbox.width + labelPaddingX * 2) * 1.25,
    (node == null ? void 0 : node.width) ?? 0
  );
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const totalWidth = w, totalHeight = h;
  const rw = totalWidth - radius;
  const tw = totalHeight / 4;
  const points = [
    { x: rw, y: 0 },
    { x: tw, y: 0 },
    { x: 0, y: totalHeight / 2 },
    { x: tw, y: totalHeight },
    { x: rw, y: totalHeight },
    ...generateCirclePoints(-rw, -totalHeight / 2, radius, 50, 270, 90)
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-w / 2}, ${-h / 2})`);
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(curvedTrapezoid, "curvedTrapezoid");
async function person(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const padding = node.padding ?? 20;
  const w = Math.max(bbox.width + padding * 2, node.width ?? 0, 100);
  const headRadius = Math.min(Math.max(w * 0.23, 16), 56);
  const overlap = headRadius * 0.27;
  const bodyHeight = Math.max(
    bbox.height + padding * 2,
    node.height ? node.height - (2 * headRadius - overlap) : 0
  );
  const bodyRadius = Math.min(w * 0.177, bodyHeight * 0.45);
  const totalHeight = bodyHeight + 2 * headRadius - overlap;
  const top = -totalHeight / 2;
  const bodyTop = top + 2 * headRadius - overlap;
  const group = shapeSvg.insert("g", ":first-child").attr("class", "basic label-container");
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const body = rc.path(
      createRoundedRectPathD(-w / 2, bodyTop, w, bodyHeight, bodyRadius),
      options
    );
    const head = rc.circle(0, top + headRadius, headRadius * 2, options);
    group.insert(() => head, ":first-child");
    group.insert(() => body, ":first-child");
    if (cssStyles) {
      group.attr("style", cssStyles);
    }
  } else {
    group.append("rect").attr("x", -w / 2).attr("y", bodyTop).attr("width", w).attr("height", bodyHeight).attr("rx", bodyRadius).attr("ry", bodyRadius).attr("style", nodeStyles);
    group.append("circle").attr("cx", 0).attr("cy", top + headRadius).attr("r", headRadius).attr("style", nodeStyles);
  }
  updateNodeBounds(node, group);
  const bodyCenterY = bodyTop + bodyHeight / 2;
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${bodyCenterY - bbox.height / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  const headCenterY = top + headRadius;
  const phiRightDeg = Math.asin(Math.min(1, (bodyTop - headCenterY) / headRadius)) * 180 / Math.PI;
  const HEAD_SEGMENTS = 24;
  const headArc = generateCirclePoints(
    0,
    -headCenterY,
    headRadius,
    HEAD_SEGMENTS,
    180 + phiRightDeg,
    -phiRightDeg
  );
  const outline = [
    ...headArc,
    ...generateCirclePoints(-(-w / 2 + bodyRadius), -(bodyTop + bodyRadius), bodyRadius, 12, 90, 0),
    ...generateCirclePoints(
      -(-w / 2 + bodyRadius),
      -(totalHeight / 2 - bodyRadius),
      bodyRadius,
      12,
      360,
      270
    ),
    ...generateCirclePoints(
      -(w / 2 - bodyRadius),
      -(totalHeight / 2 - bodyRadius),
      bodyRadius,
      12,
      270,
      180
    ),
    ...generateCirclePoints(
      -(w / 2 - bodyRadius),
      -(bodyTop + bodyRadius),
      bodyRadius,
      12,
      180,
      90
    )
  ];
  node.intersect = function(point) {
    return intersect_default.polygon(node, outline, point);
  };
  return shapeSvg;
}
__name(person, "person");
var createCylinderPathD = __name((x, y, width, height, rx, ry) => {
  return [
    `M${x},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`
  ].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD = __name((x, y, width, height, rx, ry) => {
  return [
    `M${x},${y + ry}`,
    `M${x + width},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD = __name((x, y, width, height, rx, ry) => {
  return [`M${x - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
var MIN_HEIGHT = 8;
var MIN_WIDTH2 = 8;
async function cylinder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 24 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 24 : nodePadding;
  const originalWidth = node.width ?? 0;
  if (node.width) {
    node.width = node.width - labelPaddingY;
    if (node.width < MIN_WIDTH2) {
      node.width = MIN_WIDTH2;
    }
  }
  if (node.height) {
    const rx2 = originalWidth / 2;
    const ry2 = rx2 / (2.5 + originalWidth / 50);
    node.height = node.height - labelPaddingX - ry2 * 3;
    if (node.height < MIN_HEIGHT) {
      node.height = MIN_HEIGHT;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(node.width ?? 0, bbox.width) + labelPaddingY;
  const rx = w / 2;
  const ry = rx / (2.5 + w / 50);
  const h = Math.max(node.height ?? 0, bbox.height) + labelPaddingX + ry;
  let cylinder2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD(0, 0, w, h, rx, ry);
    const innerPathData = createInnerCylinderPathD(0, ry, w, h, rx, ry);
    const options = userNodeOverrides(node, {});
    const outerNode = rc.path(outerPathData, options);
    const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
    cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD(0, 0, w, h, rx, ry);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container outer-path").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-y", ry);
  cylinder2.attr("transform", `translate(${-w / 2}, ${-(h / 2 + ry)})`);
  updateNodeBounds(node, cylinder2);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + (node.padding ?? 0) / 1.5 - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point) {
    const pos = intersect_default.rect(node, point);
    const x = pos.x - (node.x ?? 0);
    if (rx != 0 && (Math.abs(x) < (node.width ?? 0) / 2 || Math.abs(x) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
      let y = ry * ry * (1 - x * x / (rx * rx));
      if (y > 0) {
        y = Math.sqrt(y);
      }
      y = ry - y;
      if (point.y - (node.y ?? 0) > 0) {
        y = -y;
      }
      pos.y += y;
    }
    return pos;
  };
  return shapeSvg;
}
__name(cylinder, "cylinder");
async function drawRect(parent, node, options) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + options.labelPaddingX * 2, (node == null ? void 0 : node.width) || 0);
  const totalHeight = Math.max(bbox.height + options.labelPaddingY * 2, (node == null ? void 0 : node.height) || 0);
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  let rect;
  let { rx, ry } = node;
  const { cssStyles } = node;
  if ((options == null ? void 0 : options.rx) && options.ry) {
    rx = options.rx;
    ry = options.ry;
  }
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options2 = userNodeOverrides(node, {});
    const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x, y, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x, y, totalWidth, totalHeight, options2);
    rect = shapeSvg.insert(() => roughNode, ":first-child");
    rect.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    rect = shapeSvg.insert("rect", ":first-child");
    rect.attr("class", "basic label-container").attr("style", nodeStyles).attr("rx", handleUndefinedAttr(rx)).attr("ry", handleUndefinedAttr(ry)).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight);
  }
  updateNodeBounds(
    node,
    rect,
    node.look === "handDrawn" ? void 0 : { width: totalWidth, height: totalHeight }
  );
  node.calcIntersect = function(bounds, point) {
    return intersect_default.rect(bounds, point);
  };
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(drawRect, "drawRect");
async function datastore(parent, node) {
  const { cssClasses, labelPaddingX, labelPaddingY, padding, width, height } = node;
  const rectOptions = {
    rx: 0,
    ry: 0,
    classes: cssClasses ?? "",
    labelPaddingX: labelPaddingX ?? (padding ?? 0) * 2,
    labelPaddingY: labelPaddingY ?? padding ?? 0
  };
  const rect = await drawRect(parent, node, rectOptions);
  if (node.look === "handDrawn") {
    const rc = at.svg(rect);
    const nodeOverrideOptions = userNodeOverrides(node, {});
    const borderSelection = rect.select(".basic.label-container > path:nth-child(2)");
    const borderPath = borderSelection.node();
    if (!borderPath) {
      return rect;
    }
    let bbox = null;
    if (borderPath instanceof SVGGraphicsElement) {
      bbox = borderPath.getBBox();
    } else {
      return rect;
    }
    rect.insert(
      () => rc.line(bbox.x, bbox.y, bbox.x + bbox.width, bbox.y, nodeOverrideOptions),
      ".basic.label-container g.label"
    );
    rect.insert(
      () => rc.line(
        bbox.x,
        bbox.y + bbox.height,
        bbox.x + bbox.width,
        bbox.y + bbox.height,
        nodeOverrideOptions
      ),
      ".basic.label-container g.label"
    );
    borderSelection.remove();
    return rect;
  }
  const selection = rect.select(".basic.label-container");
  const datastoreWidth = (Number(selection.attr("width")) || width) ?? 0;
  const datastoreHeight = (Number(selection.attr("height")) || height) ?? 0;
  if (datastoreWidth > 0 && datastoreHeight > 0) {
    selection.attr("stroke-dasharray", `${datastoreWidth} ${datastoreHeight}`);
  }
  return rect;
}
__name(datastore, "datastore");
async function dividedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const paddingX = node.look === "neo" ? 16 : node.padding ?? 0;
  const paddingY = node.look === "neo" ? 16 : node.padding ?? 0;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + paddingX;
  const h = bbox.height + paddingY;
  const rectOffset2 = h * 0.2;
  const x = -w / 2;
  const y = -h / 2 - rectOffset2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pts = [
    { x, y: y + rectOffset2 },
    { x: -x, y: y + rectOffset2 },
    { x: -x, y: -y },
    { x, y: -y },
    { x, y },
    { x: -x, y },
    { x: -x, y: y + rectOffset2 }
  ];
  const poly = rc.polygon(
    pts.map((p) => [p.x, p.y]),
    options
  );
  const polygon = shapeSvg.insert(() => poly, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${x + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))}, ${y + rectOffset2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    const pos = intersect_default.rect(node, point);
    return pos;
  };
  return shapeSvg;
}
__name(dividedRectangle, "dividedRectangle");
async function doublecircle(parent, node) {
  var _a, _b;
  const { labelStyles, nodeStyles } = styles2String(node);
  const gap = node.look === "neo" ? 12 : 5;
  node.labelStyle = labelStyles;
  const padding = node.padding ?? 0;
  const labelPadding = node.look === "neo" ? 16 : padding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const labelRadius = Math.sqrt(bbox.width ** 2 + bbox.height ** 2) / 2;
  const innerRadius = ((node == null ? void 0 : node.width) ? (node == null ? void 0 : node.width) / 2 : labelRadius) + (labelPadding ?? 0);
  const outerRadius = innerRadius + gap;
  let circleGroup;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerOptions = userNodeOverrides(node, { roughness: 0.2, strokeWidth: 2.5 });
    const innerOptions = userNodeOverrides(node, { roughness: 0.2, strokeWidth: 1.5 });
    const outerRoughNode = rc.circle(0, 0, outerRadius * 2, outerOptions);
    const innerRoughNode = rc.circle(0, 0, innerRadius * 2, innerOptions);
    circleGroup = shapeSvg.insert("g", ":first-child");
    circleGroup.attr("class", handleUndefinedAttr(node.cssClasses)).attr("style", handleUndefinedAttr(cssStyles));
    (_a = circleGroup.node()) == null ? void 0 : _a.appendChild(outerRoughNode);
    (_b = circleGroup.node()) == null ? void 0 : _b.appendChild(innerRoughNode);
  } else {
    circleGroup = shapeSvg.insert("g", ":first-child");
    const outerCircle = circleGroup.insert("circle", ":first-child");
    const innerCircle = circleGroup.insert("circle");
    circleGroup.attr("class", "basic label-container").attr("style", nodeStyles);
    outerCircle.attr("class", "outer-circle").attr("style", nodeStyles).attr("r", outerRadius).attr("cx", 0).attr("cy", 0);
    innerCircle.attr("class", "inner-circle").attr("style", nodeStyles).attr("r", innerRadius).attr("cx", 0).attr("cy", 0);
  }
  updateNodeBounds(node, circleGroup);
  node.intersect = function(point) {
    log.info("DoubleCircle intersect", node, outerRadius, point);
    return intersect_default.circle(node, outerRadius, point);
  };
  return shapeSvg;
}
__name(doublecircle, "doublecircle");
async function usecaseEllipse(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
  const { theme, themeVariables } = getConfig2();
  stampColorSlot(shapeSvg, node.colorIndex, theme, themeVariables.borderColorArray);
  const padding = halfPadding ?? 10;
  const radiusX = bbox.width / 2 + padding * 2;
  const radiusY = bbox.height / 2 + padding * 2;
  let ellipseElem;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.ellipse(0, 0, radiusX * 2, radiusY * 2, options);
    ellipseElem = shapeSvg.insert(() => roughNode, ":first-child");
    ellipseElem.attr("class", "basic label-container");
    if (cssStyles) {
      ellipseElem.attr("style", cssStyles);
    }
  } else {
    ellipseElem = shapeSvg.insert("ellipse", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("rx", radiusX).attr("ry", radiusY).attr("cx", 0).attr("cy", 0);
  }
  node.width = radiusX * 2;
  node.height = radiusY * 2;
  updateNodeBounds(node, ellipseElem);
  node.calcIntersect = function(bounds, point) {
    const rx = bounds.width / 2;
    const ry = bounds.height / 2;
    return intersect_default.ellipse(bounds, rx, ry, point);
  };
  node.intersect = function(point) {
    return intersect_default.ellipse(node, radiusX, radiusY, point);
  };
  return shapeSvg;
}
__name(usecaseEllipse, "usecaseEllipse");
function filledCircle(parent, node, { config: { themeVariables } }) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const radius = 7;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const { nodeBorder } = themeVariables;
  const options = userNodeOverrides(node, { fillStyle: "solid" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
  }
  const circleNode = rc.circle(0, 0, radius * 2, options);
  const filledCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
  filledCircle2.selectAll("path").attr("style", `fill: ${nodeBorder} !important;`);
  if (cssStyles && cssStyles.length > 0 && node.look !== "handDrawn") {
    filledCircle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    filledCircle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, filledCircle2);
  node.intersect = function(point) {
    log.info("filledCircle intersect", node, { radius, point });
    const pos = intersect_default.circle(node, radius, point);
    return pos;
  };
  return shapeSvg;
}
__name(filledCircle, "filledCircle");
var MIN_HEIGHT2 = 10;
var MIN_WIDTH3 = 10;
async function flippedTriangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? nodePadding * 2 : nodePadding;
  if (node.width || node.height) {
    node.height = (node == null ? void 0 : node.height) ?? 0;
    if (node.height < MIN_HEIGHT2) {
      node.height = MIN_HEIGHT2;
    }
    node.width = ((node == null ? void 0 : node.width) ?? 0) - labelPaddingX - labelPaddingX / 2;
    if (node.width < MIN_WIDTH3) {
      node.width = MIN_WIDTH3;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + (labelPaddingX ?? 0);
  const h = (node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : w + bbox.height;
  const tw = h;
  const points = [
    { x: 0, y: -h },
    { x: tw, y: -h },
    { x: tw / 2, y: 0 }
  ];
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const flippedTriangle2 = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h / 2}, ${h / 2})`).attr("class", "outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    flippedTriangle2.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    flippedTriangle2.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, flippedTriangle2);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-h / 2 + (node.padding ?? 0) / 2 + (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point) {
    log.info("Triangle intersect", node, points, point);
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(flippedTriangle, "flippedTriangle");
async function folder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const padding = node.padding ?? 12;
  const w = Math.max(bbox.width + padding * 2, node.width ?? 0, 90);
  const contentHeight = bbox.height + padding * 2;
  const tabHeight = Math.max(Math.min(contentHeight * 0.16, 14), 8);
  const totalHeight = Math.max(contentHeight + tabHeight, node.height ?? 0);
  const bodyHeight = totalHeight - tabHeight;
  const tabWidth = Math.max(w * 0.38, 28);
  const top = -totalHeight / 2;
  const points = [
    { x: -w / 2, y: top },
    { x: -w / 2 + tabWidth, y: top },
    { x: -w / 2 + tabWidth, y: top + tabHeight },
    { x: w / 2, y: top + tabHeight },
    { x: w / 2, y: totalHeight / 2 },
    { x: -w / 2, y: totalHeight / 2 }
  ];
  const pathData = [
    `M${points[0].x},${points[0].y}`,
    ...points.slice(1).map((p) => `L${p.x},${p.y}`),
    "Z"
  ].join(" ");
  const { cssStyles } = node;
  let folderShape;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughNode = rc.path(pathData, userNodeOverrides(node, {}));
    folderShape = shapeSvg.insert(() => roughNode, ":first-child").attr("class", "basic label-container");
    if (cssStyles) {
      folderShape.attr("style", cssStyles);
    }
  } else {
    folderShape = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", nodeStyles);
  }
  if (node.look === "handDrawn") {
    updateNodeBounds(node, folderShape);
  } else {
    updateNodeBounds(node, folderShape, { width: w, height: totalHeight });
  }
  const bodyCenterY = top + tabHeight + bodyHeight / 2;
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${bodyCenterY - bbox.height / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(folder, "folder");
function forkJoin(parent, node, { dir, config: { state: state2, themeVariables } }) {
  const { nodeStyles } = styles2String(node);
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  let width = Math.max(70, (node == null ? void 0 : node.width) ?? 0);
  let height = Math.max(10, (node == null ? void 0 : node.height) ?? 0);
  if (dir === "LR" || dir === "RL") {
    width = Math.max(10, (node == null ? void 0 : node.width) ?? 0);
    height = Math.max(70, (node == null ? void 0 : node.height) ?? 0);
  }
  const x = -1 * width / 2;
  const y = -1 * height / 2;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {
    stroke: themeVariables.lineColor,
    fill: themeVariables.lineColor
  });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughNode = rc.rectangle(x, y, width, height, options);
  const shape = shapeSvg.insert(() => roughNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, shape);
  const padding = (state2 == null ? void 0 : state2.padding) ?? 0;
  if (node.width && node.height) {
    node.width += padding / 2 || 0;
    node.height += padding / 2 || 0;
  }
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(forkJoin, "forkJoin");
async function halfRoundedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const minWidth = 15, minHeight = 10;
  const paddingX = node.look === "neo" ? 16 : node.padding ?? 0;
  const paddingY = node.look === "neo" ? 12 : node.padding ?? 0;
  if (node.width || node.height) {
    node.height = ((node == null ? void 0 : node.height) ?? 0) - paddingY * 2;
    if (node.height < minHeight) {
      node.height = minHeight;
    }
    node.width = ((node == null ? void 0 : node.width) ?? 0) - paddingX * 2;
    if (node.width < minWidth) {
      node.width = minWidth;
    }
  }
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : Math.max(minHeight, bbox.height)) + paddingY * 2;
  const radius = h / 2;
  const capClearance = radius - Math.sqrt(Math.max(0, radius ** 2 - (bbox.height / 2) ** 2));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : Math.max(minWidth, bbox.width) + capClearance * 2) + paddingX * 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2, y: -h / 2 },
    { x: w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints(-w / 2 + radius, 0, radius, 50, 90, 270),
    { x: w / 2 - radius, y: h / 2 },
    { x: -w / 2, y: h / 2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    log.info("Pill intersect", node, { radius, point });
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(halfRoundedRectangle, "halfRoundedRectangle");
var createHexagonPathD = __name((x, y, width, height, m) => {
  return [
    `M${x + m},${y}`,
    `L${x + width - m},${y}`,
    `L${x + width},${y - height / 2}`,
    `L${x + width - m},${y - height}`,
    `L${x + m},${y - height}`,
    `L${x},${y - height / 2}`,
    "Z"
  ].join(" ");
}, "createHexagonPathD");
async function hexagon(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  const f = node.look === "neo" ? 3.5 : 4;
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const wa = 70;
  const ha = 32;
  const labelPaddingX = node.look === "neo" ? wa : nodePadding;
  const labelPaddingY = node.look === "neo" ? ha : nodePadding;
  if (node.width || node.height) {
    const originalHeight = node.height ?? 0;
    const m2 = originalHeight / f;
    node.width = ((node == null ? void 0 : node.width) ?? 0) - 2 * m2 - labelPaddingY;
    node.height = (node.height ?? 0) - labelPaddingX;
  }
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingX;
  const m = h / f;
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + 2 * m + labelPaddingY;
  const points = [
    { x: m, y: 0 },
    { x: w - m, y: 0 },
    { x: w, y: -h / 2 },
    { x: w - m, y: -h },
    { x: m, y: -h },
    { x: 0, y: -h / 2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createHexagonPathD(0, 0, w, h, m);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(hexagon, "hexagon");
async function hourglass(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const { shapeSvg } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(30, (node == null ? void 0 : node.width) ?? 0);
  const h = Math.max(30, (node == null ? void 0 : node.height) ?? 0);
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: 0, y: h },
    { x: w, y: h }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-w / 2}, ${-h / 2})`);
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    log.info("Pill intersect", node, { points });
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(hourglass, "hourglass");
async function icon(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
  const topLabel = node.pos === "t";
  const height = iconSize;
  const width = iconSize;
  const { nodeBorder } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x = -width / 2;
  const y = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { stroke: "none", fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const iconNode = rc.rectangle(x, y, width, height, options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point) {
    log.info("iconSquare intersect", node, point);
    if (!node.label) {
      return intersect_default.rect(node, point);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(icon, "icon");
async function iconCircle(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
  const padding = 20;
  const labelPadding = node.label ? 8 : 0;
  const topLabel = node.pos === "t";
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const fill = stylesMap.get("fill");
  options.stroke = fill ?? mainBkg;
  const iconElem = shapeSvg.append("g");
  if (node.icon) {
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
  }
  const iconBBox = iconElem.node().getBBox();
  const iconWidth = iconBBox.width;
  const iconHeight = iconBBox.height;
  const iconX = iconBBox.x;
  const iconY = iconBBox.y;
  const diameter = Math.max(iconWidth, iconHeight) * Math.SQRT2 + padding * 2;
  const iconNode = rc.circle(0, 0, diameter, options);
  const outerWidth = Math.max(diameter, bbox.width);
  const outerHeight = diameter + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  iconElem.attr(
    "transform",
    `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
  );
  iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point) {
    log.info("iconSquare intersect", node, point);
    const pos = intersect_default.rect(node, point);
    return pos;
  };
  return shapeSvg;
}
__name(iconCircle, "iconCircle");
async function iconRounded(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    "icon-shape default"
  );
  const topLabel = node.pos === "t";
  const height = iconSize + halfPadding * 2;
  const width = iconSize + halfPadding * 2;
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x = -width / 2;
  const y = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const fill = stylesMap.get("fill");
  options.stroke = fill ?? mainBkg;
  const iconNode = rc.path(createRoundedRectPathD(x, y, width, height, 5), options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child").attr("class", "icon-shape2");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point) {
    log.info("iconSquare intersect", node, point);
    if (!node.label) {
      return intersect_default.rect(node, point);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(iconRounded, "iconRounded");
async function iconSquare(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    "icon-shape default"
  );
  const topLabel = node.pos === "t";
  const height = iconSize + halfPadding * 2;
  const width = iconSize + halfPadding * 2;
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x = -width / 2;
  const y = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const fill = stylesMap.get("fill");
  options.stroke = fill ?? mainBkg;
  const iconNode = rc.path(createRoundedRectPathD(x, y, width, height, 0.1), options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point) {
    log.info("iconSquare intersect", node, point);
    if (!node.label) {
      return intersect_default.rect(node, point);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(iconSquare, "iconSquare");
async function imageSquare(parent, node, { config: { flowchart } }) {
  const img = new Image();
  img.src = (node == null ? void 0 : node.img) ?? "";
  await img.decode();
  const imageNaturalWidth = Number(img.naturalWidth.toString().replace("px", ""));
  const imageNaturalHeight = Number(img.naturalHeight.toString().replace("px", ""));
  node.imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  const imageRawWidth = Math.max(
    node.label ? defaultWidth ?? 0 : 0,
    (node == null ? void 0 : node.assetWidth) ?? imageNaturalWidth
  );
  const imageWidth = node.constraint === "on" ? (node == null ? void 0 : node.assetHeight) ? node.assetHeight * node.imageAspectRatio : imageRawWidth : imageRawWidth;
  const imageHeight = node.constraint === "on" ? imageWidth / node.imageAspectRatio : (node == null ? void 0 : node.assetHeight) ?? imageNaturalHeight;
  node.width = Math.max(imageWidth, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "image-shape default");
  const topLabel = node.pos === "t";
  const x = -imageWidth / 2;
  const y = -imageHeight / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const imageNode = rc.rectangle(x, y, imageWidth, imageHeight, options);
  const outerWidth = Math.max(imageWidth, bbox.width);
  const outerHeight = imageHeight + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "none",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => imageNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.img) {
    const image = shapeSvg.append("image");
    image.attr("href", node.img);
    image.attr("width", imageWidth);
    image.attr("height", imageHeight);
    image.attr("preserveAspectRatio", "none");
    image.attr(
      "transform",
      `translate(${-imageWidth / 2},${topLabel ? outerHeight / 2 - imageHeight : -outerHeight / 2})`
    );
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -imageHeight / 2 - bbox.height / 2 - labelPadding / 2 : imageHeight / 2 - bbox.height / 2 + labelPadding / 2})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point) {
    log.info("iconSquare intersect", node, point);
    if (!node.label) {
      return intersect_default.rect(node, point);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + imageWidth / 2, y: dy + nodeHeight / 2 },
        { x: dx - imageWidth / 2, y: dy + nodeHeight / 2 },
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 + imageHeight }
      ];
    }
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(imageSquare, "imageSquare");
async function inv_trapezoid(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingY = nodePadding;
  const labelPaddingX = node.look === "neo" ? nodePadding * 2 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = Math.max(bbox.height + labelPaddingY * 2, node.height ?? 0);
  const w = Math.max(bbox.width + labelPaddingX * 2, (node.width ?? 0) - h);
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w + 3 * h / 6, y: -h },
    { x: -3 * h / 6, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(inv_trapezoid, "inv_trapezoid");
async function labelRect(parent, node) {
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "label");
  const rect = shapeSvg.insert("rect", ":first-child");
  const totalWidth = 0.1;
  const totalHeight = 0.1;
  rect.attr("width", totalWidth).attr("height", totalHeight);
  shapeSvg.attr("class", "label edgeLabel");
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(labelRect, "labelRect");
async function lean_left(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingY = nodePadding;
  const labelPaddingX = node.look === "neo" ? nodePadding * 2 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = Math.max(bbox.height + labelPaddingY, node.height ?? 0);
  const w = Math.max(bbox.width + labelPaddingX, (node.width ?? 0) - h);
  const points = [
    { x: 0, y: 0 },
    { x: w + 3 * h / 6, y: 0 },
    { x: w, y: -h },
    { x: -(3 * h) / 6, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(lean_left, "lean_left");
async function lean_right(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingY = nodePadding;
  const labelPaddingX = node.look === "neo" ? nodePadding * 2 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = Math.max(bbox.height + labelPaddingY, node.height ?? 0);
  const w = Math.max(bbox.width + labelPaddingX, (node.width ?? 0) - h);
  const points = [
    { x: -3 * h / 6, y: 0 },
    { x: w, y: 0 },
    { x: w + 3 * h / 6, y: -h },
    { x: 0, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(lean_right, "lean_right");
function lightningBolt(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  const width = Math.max(35, (node == null ? void 0 : node.width) ?? 0);
  const height = Math.max(35, (node == null ? void 0 : node.height) ?? 0);
  const gap = 7;
  const points = [
    { x: width, y: 0 },
    { x: 0, y: height + gap / 2 },
    { x: width - 2 * gap, y: height + gap / 2 },
    { x: 0, y: 2 * height },
    { x: width, y: height - gap / 2 },
    { x: 2 * gap, y: height - gap / 2 }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const linePath = createPathFromPoints(points);
  const lineNode = rc.path(linePath, options);
  const lightningBolt2 = shapeSvg.insert(() => lineNode, ":first-child");
  lightningBolt2.attr("class", "outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    lightningBolt2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    lightningBolt2.selectAll("path").attr("style", nodeStyles);
  }
  lightningBolt2.attr("transform", `translate(-${width / 2},${-height})`);
  updateNodeBounds(node, lightningBolt2);
  node.intersect = function(point) {
    log.info("lightningBolt intersect", node, point);
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(lightningBolt, "lightningBolt");
var createCylinderPathD2 = __name((x, y, width, height, rx, ry, outerOffset) => {
  return [
    `M${x},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`,
    `M${x},${y + ry + outerOffset}`,
    `a${rx},${ry} 0,0,0 ${width},0`
  ].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD2 = __name((x, y, width, height, rx, ry, outerOffset) => {
  return [
    `M${x},${y + ry}`,
    `M${x + width},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`,
    `M${x},${y + ry + outerOffset}`,
    `a${rx},${ry} 0,0,0 ${width},0`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD2 = __name((x, y, width, height, rx, ry) => {
  return [`M${x - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
var MIN_HEIGHT3 = 10;
var MIN_WIDTH4 = 10;
async function linedCylinder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 24 : nodePadding;
  if (node.width || node.height) {
    const originalWidth = node.width ?? 0;
    node.width = (node.width ?? 0) - labelPaddingX;
    if (node.width < MIN_WIDTH4) {
      node.width = MIN_WIDTH4;
    }
    const rx2 = originalWidth / 2;
    const ry2 = rx2 / (2.5 + originalWidth / 50);
    node.height = (node.height ?? 0) - labelPaddingY - ry2 * 3;
    if (node.height < MIN_HEIGHT3) {
      node.height = MIN_HEIGHT3;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2;
  const rx = w / 2;
  const ry = rx / (2.5 + w / 50);
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + ry + labelPaddingY * 2;
  const outerOffset = h * 0.1;
  let cylinder2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD2(0, 0, w, h, rx, ry, outerOffset);
    const innerPathData = createInnerCylinderPathD2(0, ry, w, h, rx, ry);
    const options = userNodeOverrides(node, {});
    const outerNode = rc.path(outerPathData, options);
    const innerLine = rc.path(innerPathData, options);
    const innerLineEl = shapeSvg.insert(() => innerLine, ":first-child");
    innerLineEl.attr("class", "line");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD2(0, 0, w, h, rx, ry, outerOffset);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container outer-path").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-y", ry);
  cylinder2.attr("transform", `translate(${-w / 2}, ${-(h / 2 + ry)})`);
  updateNodeBounds(node, cylinder2);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + ry - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point) {
    const pos = intersect_default.rect(node, point);
    const x = pos.x - (node.x ?? 0);
    if (rx != 0 && (Math.abs(x) < (node.width ?? 0) / 2 || Math.abs(x) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
      let y = ry * ry * (1 - x * x / (rx * rx));
      if (y > 0) {
        y = Math.sqrt(y);
      }
      y = ry - y;
      if (point.y - (node.y ?? 0) > 0) {
        y = -y;
      }
      pos.y += y;
    }
    return pos;
  };
  return shapeSvg;
}
__name(linedCylinder, "linedCylinder");
async function linedWaveEdgedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  if (node.width || node.height) {
    const originalWidth = node.width;
    node.width = (originalWidth ?? 0) * 10 / 11 - labelPaddingX * 2;
    if (node.width < 10) {
      node.width = 10;
    }
    node.height = ((node == null ? void 0 : node.height) ?? 0) - labelPaddingY * 2;
    if (node.height < 10) {
      node.height = 10;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + (labelPaddingX ?? 0) * 2;
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + (labelPaddingY ?? 0) * 2;
  const waveAmplitude = node.look === "neo" ? h / 4 : h / 8;
  const finalH = h + waveAmplitude;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 - w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2 - w / 2 * 0.1, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w / 2 - w / 2 * 0.1,
      finalH / 2,
      w / 2 + w / 2 * 0.1,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w / 2 + w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2 - w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2, y: -finalH / 2 },
    { x: -w / 2, y: finalH / 2 * 1.1 },
    { x: -w / 2, y: -finalH / 2 }
  ];
  const poly = rc.polygon(
    points.map((p) => [p.x, p.y]),
    options
  );
  const waveEdgeRect = shapeSvg.insert(() => poly, ":first-child");
  waveEdgeRect.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) + w / 2 * 0.1 / 2 - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - waveAmplitude - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(linedWaveEdgedRect, "linedWaveEdgedRect");
var ACTOR_FIGURE_WIDTH = 56;
var ACTOR_FIGURE_HEIGHT = 72;
var ACTOR_LABEL_GAP = 8;
var STEREOTYPE_LABEL_GAP = 2;
var DEFAULT_ACTOR_PADDING = 8;
var variantClass = {
  normal: "usecase-actor-shape usecase-actor-normal",
  hollow: "usecase-actor-hollow",
  awesome: "usecase-actor-awesome",
  icon: "usecase-actor-icon"
};
var BUSINESS_MARKER_ANGLE = Math.PI / 3;
var BUSINESS_MARKER_OFFSET_RATIO = 0.6;
var businessMarkerPathForCircle = __name((centerY, radius) => {
  const centerOffset = radius * BUSINESS_MARKER_OFFSET_RATIO;
  const halfChord = radius * Math.sqrt(1 - BUSINESS_MARKER_OFFSET_RATIO ** 2);
  const directionX = Math.cos(BUSINESS_MARKER_ANGLE);
  const directionY = -Math.sin(BUSINESS_MARKER_ANGLE);
  const centerX = centerOffset * -directionY;
  const markerCenterY = centerY + centerOffset * directionX;
  const deltaX = halfChord * directionX;
  const deltaY = halfChord * directionY;
  return `M ${centerX - deltaX} ${markerCenterY - deltaY} L ${centerX + deltaX} ${markerCenterY + deltaY}`;
}, "businessMarkerPathForCircle");
var businessMarkerPath = {
  normal: businessMarkerPathForCircle(-24, 12),
  hollow: businessMarkerPathForCircle(-23, 9),
  awesome: businessMarkerPathForCircle(-21, 13),
  icon: "M 12 -8 L 26 -26"
};
var positionLabel = __name((label, bbox, centerY) => {
  const originX = (bbox.x ?? 0) - (bbox.left ?? 0);
  const originY = (bbox.y ?? 0) - (bbox.top ?? 0);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - originX},${centerY - bbox.height / 2 - originY})`
  );
}, "positionLabel");
var appendActorPath = __name((group, node, pathData, className, hollow = false) => {
  if (node.look === "handDrawn") {
    const rc = at.svg(group);
    const path2 = rc.path(pathData, userNodeOverrides(node, hollow ? { fill: "none" } : {}));
    return group.insert(() => path2, ":first-child").attr("class", className);
  }
  const path = group.append("path").attr("class", className).attr("d", pathData);
  if (hollow) {
    path.attr("fill", "none");
  }
  return path;
}, "appendActorPath");
var appendActorCircle = __name((group, node, cx, cy, radius, className, hollow = false) => {
  if (node.look === "handDrawn") {
    const rc = at.svg(group);
    const circle3 = rc.circle(
      cx,
      cy,
      radius * 2,
      userNodeOverrides(node, hollow ? { fill: "none" } : {})
    );
    return group.insert(() => circle3, ":first-child").attr("class", className);
  }
  const circle2 = group.append("circle").attr("class", className).attr("cx", cx).attr("cy", cy).attr("r", radius);
  if (hollow) {
    circle2.attr("fill", "none");
  }
  return circle2;
}, "appendActorCircle");
var appendBusinessActorMarker = __name((group, node, variant) => {
  if (!node.business) {
    return;
  }
  group.append("path").attr("class", "usecase-business-marker usecase-actor-business-marker").attr("d", businessMarkerPath[variant]).attr("fill", "none").attr("style", "stroke: inherit !important; stroke-width: inherit !important");
}, "appendBusinessActorMarker");
async function renderUsecaseActor(parent, node, variant, drawGlyph) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const labelNode = variant === "icon" || node.stereotype !== void 0 ? {
    ...node,
    icon: variant === "icon" ? void 0 : node.icon,
    stereotype: void 0
  } : node;
  const {
    shapeSvg,
    bbox: labelBox,
    label
  } = await labelHelper(
    parent,
    labelNode,
    getNodeClasses(node, `usecase-actor-variant usecase-actor-${variant}`)
  );
  const accessibleName = node.accessibleName ?? node.label;
  if (accessibleName) {
    shapeSvg.attr("role", "img").attr("aria-label", accessibleName);
  }
  label.attr("class", "label actor-label usecase-actor-label");
  const { theme, themeVariables } = getConfig2();
  stampColorSlot(shapeSvg, node.colorIndex, theme, themeVariables.borderColorArray);
  let stereotypeLabel;
  let stereotypeBox;
  if (node.stereotype) {
    const stereotype = await insertLabel(shapeSvg, `«${node.stereotype}»`, {
      labelStyle: labelStyles,
      useHtmlLabels: node.useHtmlLabels,
      padding: 0,
      centerLabel: true,
      width: node.wrappingWidth
    });
    stereotypeLabel = stereotype.label.attr("class", "label usecase-stereotype");
    stereotypeBox = stereotype.bbox;
  }
  const actorGroup = shapeSvg.append("g").attr("class", `usecase-actor-glyph ${variantClass[variant]}`).attr("style", nodeStyles || null);
  await drawGlyph(actorGroup, node);
  appendBusinessActorMarker(actorGroup, node, variant);
  const padding = node.padding ?? DEFAULT_ACTOR_PADDING;
  const stereotypeHeight = (stereotypeBox == null ? void 0 : stereotypeBox.height) ?? 0;
  const contentHeight = ACTOR_FIGURE_HEIGHT + ACTOR_LABEL_GAP + labelBox.height + (stereotypeBox ? stereotypeHeight + STEREOTYPE_LABEL_GAP : 0);
  const totalWidth = Math.max(ACTOR_FIGURE_WIDTH, labelBox.width, (stereotypeBox == null ? void 0 : stereotypeBox.width) ?? 0) + padding * 2;
  const totalHeight = contentHeight + padding * 2;
  const contentTop = -contentHeight / 2;
  actorGroup.attr("transform", `translate(0,${contentTop + ACTOR_FIGURE_HEIGHT / 2})`);
  let nextLabelCenter = contentTop + ACTOR_FIGURE_HEIGHT + ACTOR_LABEL_GAP;
  if (stereotypeLabel && stereotypeBox) {
    nextLabelCenter += stereotypeHeight / 2;
    positionLabel(stereotypeLabel, stereotypeBox, nextLabelCenter);
    nextLabelCenter += stereotypeHeight / 2 + STEREOTYPE_LABEL_GAP;
  }
  positionLabel(label, labelBox, nextLabelCenter + labelBox.height / 2);
  const outline = shapeSvg.insert("rect", ":first-child").attr("class", "usecase-actor-outline").attr("x", -totalWidth / 2).attr("y", -totalHeight / 2).attr("width", totalWidth).attr("height", totalHeight).attr("opacity", 0).attr("aria-hidden", "true");
  updateNodeBounds(node, outline);
  node.intersect = (point) => intersect_default.rect(node, point);
  return shapeSvg;
}
__name(renderUsecaseActor, "renderUsecaseActor");
var STICK_FIGURE_PATH = [
  "M 0 -12",
  "C 6.627 -12 12 -17.373 12 -24",
  "C 12 -30.627 6.627 -36 0 -36",
  "C -6.627 -36 -12 -30.627 -12 -24",
  "C -12 -17.373 -6.627 -12 0 -12 Z",
  "M 0 -12 V 8",
  "M -17 -5 H 17",
  "M 0 8 L -15 28",
  "M 0 8 L 15 28"
].join(" ");
async function usecaseActor(parent, node) {
  return renderUsecaseActor(parent, node, "normal", (group, actorNode) => {
    appendActorPath(group, actorNode, STICK_FIGURE_PATH, "usecase-actor-stick");
  });
}
__name(usecaseActor, "usecaseActor");
var AWESOME_SILHOUETTE_PATH = [
  "M 0 -34",
  "C 7.18 -34 13 -28.18 13 -21",
  "C 13 -13.82 7.18 -8 0 -8",
  "C -7.18 -8 -13 -13.82 -13 -21",
  "C -13 -28.18 -7.18 -34 0 -34 Z",
  "M -24 25",
  "C -24 7 -14 -3 0 -3",
  "C 14 -3 24 7 24 25",
  "C 24 28 21 30 18 30",
  "H -18",
  "C -21 30 -24 28 -24 25 Z"
].join(" ");
async function usecaseActorAwesome(parent, node) {
  return renderUsecaseActor(parent, node, "awesome", (group, actorNode) => {
    appendActorPath(group, actorNode, AWESOME_SILHOUETTE_PATH, "usecase-actor-awesome-silhouette");
  });
}
__name(usecaseActorAwesome, "usecaseActorAwesome");
var HOLLOW_BODY_PATH = [
  "M -22 -10",
  "H 22",
  "V 0",
  "H 6",
  "L 22 17",
  "L 13 28",
  "L 0 13",
  "L -13 28",
  "L -22 17",
  "L -6 0",
  "H -22",
  "Z"
].join(" ");
async function usecaseActorHollow(parent, node) {
  return renderUsecaseActor(parent, node, "hollow", (group, actorNode) => {
    appendActorCircle(group, actorNode, 0, -23, 9, "usecase-actor-hollow-head", true);
    appendActorPath(group, actorNode, HOLLOW_BODY_PATH, "usecase-actor-hollow-body", true);
  });
}
__name(usecaseActorHollow, "usecaseActorHollow");
var ICON_FRAME_SIZE = 52;
var ICON_SIZE = 42;
var ICON_CENTER_Y = -2;
var drawIconActor = __name(async (group, node) => {
  var _a;
  const frameX = -ICON_FRAME_SIZE / 2;
  const frameY = ICON_CENTER_Y - ICON_FRAME_SIZE / 2;
  if (node.look === "handDrawn") {
    const rc = at.svg(group);
    const frame = rc.rectangle(
      frameX,
      frameY,
      ICON_FRAME_SIZE,
      ICON_FRAME_SIZE,
      userNodeOverrides(node, {})
    );
    group.insert(() => frame, ":first-child").attr("class", "usecase-actor-icon-frame");
  } else {
    group.append("rect").attr("class", "usecase-actor-icon-frame").attr("x", frameX).attr("y", frameY).attr("width", ICON_FRAME_SIZE).attr("height", ICON_FRAME_SIZE).attr("rx", 4).attr("ry", 4);
  }
  const iconName = node.icon ?? "";
  const available = await isIconAvailable(iconName.includes(":") ? iconName : `fa:${iconName}`);
  const iconSvg = await getIconSVG(iconName, {
    height: ICON_SIZE,
    width: ICON_SIZE,
    fallbackPrefix: "fa"
  });
  const iconGroup = group.append("g").attr("class", `usecase-actor-icon-symbol${available ? "" : " usecase-actor-icon-fallback"}`).attr("aria-hidden", "true").html(`<g>${iconSvg}</g>`);
  const iconBox = (_a = iconGroup.node()) == null ? void 0 : _a.getBBox();
  if (iconBox) {
    iconGroup.attr(
      "transform",
      `translate(${-iconBox.width / 2 - iconBox.x},${ICON_CENTER_Y - iconBox.height / 2 - iconBox.y})`
    );
  }
}, "drawIconActor");
async function usecaseActorIcon(parent, node) {
  return renderUsecaseActor(parent, node, "icon", drawIconActor);
}
__name(usecaseActorIcon, "usecaseActorIcon");
var positionLabel2 = __name((label, bbox, centerY) => {
  const viewportOffsetX = (bbox.x ?? 0) - (bbox.left ?? 0);
  const viewportOffsetY = (bbox.y ?? 0) - (bbox.top ?? 0);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - viewportOffsetX},${centerY - bbox.height / 2 - viewportOffsetY})`
  );
}, "positionLabel");
async function usecaseBusiness(parent, node) {
  const businessNode = node;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const labelNode = businessNode.stereotype ? { ...node, stereotype: void 0 } : node;
  const {
    shapeSvg,
    bbox: labelBox,
    halfPadding,
    label
  } = await labelHelper(parent, labelNode, getNodeClasses(node, "usecase-business-shape"));
  label.attr("class", "label usecase-label");
  const { theme, themeVariables } = getConfig2();
  stampColorSlot(shapeSvg, node.colorIndex, theme, themeVariables.borderColorArray);
  let stereotypeLabel;
  let stereotypeBox;
  if (businessNode.stereotype) {
    const stereotype = await insertLabel(shapeSvg, `«${businessNode.stereotype}»`, {
      labelStyle: labelStyles,
      useHtmlLabels: node.useHtmlLabels,
      padding: 0,
      centerLabel: true,
      width: node.wrappingWidth
    });
    stereotypeLabel = stereotype.label.attr("class", "label usecase-stereotype");
    stereotypeBox = stereotype.bbox;
  }
  const labelGap = stereotypeBox ? 2 : 0;
  const labelHeight = labelBox.height + ((stereotypeBox == null ? void 0 : stereotypeBox.height) ?? 0) + labelGap;
  const labelWidth = Math.max(labelBox.width, (stereotypeBox == null ? void 0 : stereotypeBox.width) ?? 0);
  const padding = halfPadding ?? 10;
  const radiusX = labelWidth / 2 + padding * 2;
  const radiusY = labelHeight / 2 + padding * 2;
  const markerInset = Math.min(Math.max(padding / 5, 1), padding / 2);
  const markerStartX = labelWidth / 2 + markerInset;
  const markerEndX = radiusX - markerInset;
  const normalizedStartX = markerStartX / radiusX;
  const normalizedEndX = markerEndX / radiusX;
  const markerStartY = radiusY * Math.sqrt(Math.max(0, 1 - normalizedStartX * normalizedStartX));
  const markerEndY = -radiusY * Math.sqrt(Math.max(0, 1 - normalizedEndX * normalizedEndX));
  if (stereotypeLabel && stereotypeBox) {
    positionLabel2(stereotypeLabel, stereotypeBox, -labelHeight / 2 + stereotypeBox.height / 2);
  }
  positionLabel2(label, labelBox, labelHeight / 2 - labelBox.height / 2);
  let ellipseElement;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughEllipse = rc.ellipse(0, 0, radiusX * 2, radiusY * 2, userNodeOverrides(node, {}));
    ellipseElement = shapeSvg.insert(() => roughEllipse, ":first-child").attr("class", "basic label-container usecase-business-ellipse");
  } else {
    ellipseElement = shapeSvg.insert("ellipse", ":first-child").attr("class", "basic label-container usecase-business-ellipse").attr("style", nodeStyles).attr("rx", radiusX).attr("ry", radiusY).attr("cx", 0).attr("cy", 0);
  }
  shapeSvg.append("path").attr("class", "usecase-business-marker").attr("d", `M ${markerStartX} ${markerStartY} L ${markerEndX} ${markerEndY}`).attr("fill", "none").attr("style", nodeStyles || null);
  const accessibleName = businessNode.accessibleName ?? businessNode.label;
  if (accessibleName) {
    shapeSvg.attr("role", "img").attr("aria-label", accessibleName);
  }
  updateNodeBounds(node, ellipseElement);
  node.calcIntersect = (bounds, point) => intersect_default.ellipse(bounds, bounds.width / 2, bounds.height / 2, point);
  node.intersect = (point) => intersect_default.ellipse(node, radiusX, radiusY, point);
  return shapeSvg;
}
__name(usecaseBusiness, "usecaseBusiness");
var CELL_PADDING_X = 8;
var CELL_PADDING_Y = 4;
var DEFAULT_BORDER_WIDTH = 1;
var positionLabel3 = __name((label, bbox, centerX, centerY) => {
  const originX = (bbox.x ?? 0) - (bbox.left ?? 0);
  const originY = (bbox.y ?? 0) - (bbox.top ?? 0);
  label.attr(
    "transform",
    `translate(${centerX - bbox.width / 2 - originX},${centerY - bbox.height / 2 - originY})`
  );
}, "positionLabel");
var numericStrokeWidth = __name((value) => {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_BORDER_WIDTH;
}, "numericStrokeWidth");
async function usecaseJsonTable(parent, node) {
  var _a;
  const tableNode = node;
  const { labelStyles, nodeStyles } = styles2String(node);
  const { stylesMap } = compileStyles(node);
  node.labelStyle = labelStyles;
  const {
    shapeSvg,
    bbox: titleBox,
    label: titleLabel
  } = await labelHelper(parent, node, getNodeClasses(node, "usecase-json-table"));
  shapeSvg.attr("role", "img");
  if (tableNode.accessibleName) {
    shapeSvg.attr("aria-label", tableNode.accessibleName);
  }
  titleLabel.attr("class", "label usecase-json-title");
  const tableGroup = shapeSvg.append("g").attr("class", "usecase-json-table-grid");
  const measuredRows = [];
  for (const row of tableNode.jsonRows ?? []) {
    const key = await insertLabel(tableGroup, row.key, {
      labelStyle: labelStyles,
      useHtmlLabels: node.useHtmlLabels,
      padding: 0,
      centerLabel: true
    });
    const value = await insertLabel(tableGroup, row.value, {
      labelStyle: labelStyles,
      useHtmlLabels: node.useHtmlLabels,
      padding: 0,
      centerLabel: true
    });
    measuredRows.push({
      key: {
        label: key.label.attr("class", "label usecase-json-key"),
        bbox: key.bbox
      },
      value: {
        label: value.label.attr("class", "label usecase-json-value"),
        bbox: value.bbox
      }
    });
  }
  const keyWidth = Math.max(0, ...measuredRows.map(({ key }) => key.bbox.width)) + CELL_PADDING_X * 2;
  const measuredValueWidth = Math.max(0, ...measuredRows.map(({ value }) => value.bbox.width)) + CELL_PADDING_X * 2;
  const titleWidth = titleBox.width + CELL_PADDING_X * 2;
  const innerWidth = Math.max(titleWidth, keyWidth + measuredValueWidth);
  const valueWidth = measuredValueWidth + Math.max(0, innerWidth - keyWidth - measuredValueWidth);
  const titleHeight = titleBox.height + CELL_PADDING_Y * 2;
  const rowHeights = measuredRows.map(
    ({ key, value }) => Math.max(key.bbox.height, value.bbox.height) + CELL_PADDING_Y * 2
  );
  const innerHeight = titleHeight + rowHeights.reduce((sum, height) => sum + height, 0);
  const borderWidth = numericStrokeWidth(stylesMap.get("stroke-width"));
  const totalWidth = innerWidth + borderWidth * 2;
  const totalHeight = innerHeight + borderWidth * 2;
  const left = -innerWidth / 2;
  const top = -innerHeight / 2;
  const roughSvg = node.look === "handDrawn" ? at.svg(shapeSvg) : void 0;
  const roughOptions = roughSvg ? userNodeOverrides(node, {}) : void 0;
  const insertCell = __name((container, className, x, y, width, height) => {
    if (roughSvg && roughOptions) {
      const roughCell = roughSvg.rectangle(x, y, width, height, roughOptions);
      return container.insert(() => roughCell, ":first-child").attr("class", className);
    }
    return container.insert("rect", ":first-child").attr("class", className).attr("x", x).attr("y", y).attr("width", width).attr("height", height).attr("style", nodeStyles);
  }, "insertCell");
  const outerBorder = insertCell(
    shapeSvg,
    "label-container usecase-json-border",
    -totalWidth / 2,
    -totalHeight / 2,
    totalWidth,
    totalHeight
  );
  insertCell(
    tableGroup,
    "usecase-json-cell usecase-json-title-cell",
    left,
    top,
    innerWidth,
    titleHeight
  );
  (_a = tableGroup.node()) == null ? void 0 : _a.append(titleLabel.node());
  positionLabel3(titleLabel, titleBox, 0, top + titleHeight / 2);
  let rowTop = top + titleHeight;
  measuredRows.forEach(({ key, value }, index) => {
    var _a2;
    const rowHeight = rowHeights[index];
    const rowGroup = tableGroup.append("g").attr("class", "usecase-json-row").attr("data-row-index", index).attr("transform", `translate(0,${rowTop})`);
    insertCell(rowGroup, "usecase-json-cell usecase-json-key-cell", left, 0, keyWidth, rowHeight);
    insertCell(
      rowGroup,
      "usecase-json-cell usecase-json-value-cell",
      left + keyWidth,
      0,
      valueWidth,
      rowHeight
    );
    (_a2 = rowGroup.node()) == null ? void 0 : _a2.append(key.label.node(), value.label.node());
    positionLabel3(key.label, key.bbox, left + keyWidth / 2, rowHeight / 2);
    positionLabel3(value.label, value.bbox, left + keyWidth + valueWidth / 2, rowHeight / 2);
    rowTop += rowHeight;
  });
  updateNodeBounds(node, outerBorder);
  node.intersect = (point) => intersect_default.rect(node, point);
  return shapeSvg;
}
__name(usecaseJsonTable, "usecaseJsonTable");
async function multiRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  const rectOffset2 = node.look === "neo" ? 10 : 5;
  if (node.width || node.height) {
    node.width = Math.max(((node == null ? void 0 : node.width) ?? 0) - labelPaddingX * 2 - 2 * rectOffset2, 10);
    node.height = Math.max(((node == null ? void 0 : node.height) ?? 0) - labelPaddingY * 2 - 2 * rectOffset2, 10);
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2 + 2 * rectOffset2;
  const totalHeight = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingY * 2 + 2 * rectOffset2;
  const w = totalWidth - 2 * rectOffset2;
  const h = totalHeight - 2 * rectOffset2;
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const outerPathPoints = [
    { x: x - rectOffset2, y: y + rectOffset2 },
    { x: x - rectOffset2, y: y + h + rectOffset2 },
    { x: x + w - rectOffset2, y: y + h + rectOffset2 },
    { x: x + w - rectOffset2, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y: y + h - rectOffset2 },
    { x: x + w + rectOffset2, y: y + h - rectOffset2 },
    { x: x + w + rectOffset2, y: y - rectOffset2 },
    { x: x + rectOffset2, y: y - rectOffset2 },
    { x: x + rectOffset2, y },
    { x, y },
    { x, y: y + rectOffset2 }
  ];
  const innerPathPoints = [
    { x, y: y + rectOffset2 },
    { x: x + w - rectOffset2, y: y + rectOffset2 },
    { x: x + w - rectOffset2, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y },
    { x, y }
  ];
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const outerPath = createPathFromPoints(outerPathPoints);
  let outerNode = rc.path(outerPath, options);
  const innerPath = createPathFromPoints(innerPathPoints);
  let innerNode = rc.path(innerPath, options);
  if (node.look !== "handDrawn") {
    outerNode = mergePaths(outerNode);
    innerNode = mergePaths(innerNode);
  }
  const multiRect2 = shapeSvg.insert("g", ":first-child");
  multiRect2.insert(() => outerNode);
  multiRect2.insert(() => innerNode);
  multiRect2.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    multiRect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    multiRect2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rectOffset2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, multiRect2);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, outerPathPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(multiRect, "multiRect");
async function multiWaveEdgedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  let adjustFinalHeight = true;
  if (node.width || node.height) {
    adjustFinalHeight = false;
    node.width = ((node == null ? void 0 : node.width) ?? 0) - labelPaddingX * 2;
    node.height = ((node == null ? void 0 : node.height) ?? 0) - labelPaddingY * 3;
  }
  const w = Math.max(bbox.width, (node == null ? void 0 : node.width) ?? 0) + labelPaddingX * 2;
  const h = Math.max(bbox.height, (node == null ? void 0 : node.height) ?? 0) + labelPaddingY * 3;
  const waveAmplitude = node.look === "neo" ? h / 4 : h / 8;
  const finalH = h + (adjustFinalHeight ? waveAmplitude / 2 : -waveAmplitude / 2);
  const x = -w / 2;
  const y = -finalH / 2;
  const rectOffset2 = 10;
  const { cssStyles } = node;
  const wavePoints = generateFullSineWavePoints(
    x - rectOffset2,
    y + finalH + rectOffset2,
    x + w - rectOffset2,
    y + finalH + rectOffset2,
    waveAmplitude,
    0.8
  );
  const lastWavePoint = wavePoints == null ? void 0 : wavePoints[wavePoints.length - 1];
  const outerPathPoints = [
    { x: x - rectOffset2, y: y + rectOffset2 },
    { x: x - rectOffset2, y: y + finalH + rectOffset2 },
    ...wavePoints,
    { x: x + w - rectOffset2, y: lastWavePoint.y - rectOffset2 },
    { x: x + w, y: lastWavePoint.y - rectOffset2 },
    { x: x + w, y: lastWavePoint.y - 2 * rectOffset2 },
    { x: x + w + rectOffset2, y: lastWavePoint.y - 2 * rectOffset2 },
    { x: x + w + rectOffset2, y: y - rectOffset2 },
    { x: x + rectOffset2, y: y - rectOffset2 },
    { x: x + rectOffset2, y },
    { x, y },
    { x, y: y + rectOffset2 }
  ];
  const innerPathPoints = [
    { x, y: y + rectOffset2 },
    { x: x + w - rectOffset2, y: y + rectOffset2 },
    { x: x + w - rectOffset2, y: lastWavePoint.y - rectOffset2 },
    { x: x + w, y: lastWavePoint.y - rectOffset2 },
    { x: x + w, y },
    { x, y }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const outerPath = createPathFromPoints(outerPathPoints);
  const outerNode = rc.path(outerPath, options);
  const innerPath = createPathFromPoints(innerPathPoints);
  const innerNode = rc.path(innerPath, options);
  const shape = shapeSvg.insert(() => outerNode, ":first-child");
  shape.insert(() => innerNode);
  shape.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", nodeStyles);
  }
  shape.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rectOffset2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset2 - waveAmplitude - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, shape);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, outerPathPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(multiWaveEdgedRectangle, "multiWaveEdgedRectangle");
async function note(parent, node, { config: { themeVariables } }) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const useHtmlLabels = node.useHtmlLabels || getEffectiveHtmlLabels(getConfig());
  if (!useHtmlLabels) {
    node.centerLabel = true;
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const totalHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {
    fill: themeVariables.noteBkgColor,
    stroke: themeVariables.noteBorderColor
  });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const noteShapeNode = rc.rectangle(x, y, totalWidth, totalHeight, options);
  const rect = shapeSvg.insert(() => noteShapeNode, ":first-child");
  rect.attr("class", "basic label-container outer-path");
  label.attr("class", "label noteLabel");
  if (cssStyles && node.look !== "handDrawn") {
    rect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    rect.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(note, "note");
var createDecisionBoxPathD = __name((x, y, size) => {
  return [
    `M${x + size / 2},${y}`,
    `L${x + size},${y - size / 2}`,
    `L${x + size / 2},${y - size}`,
    `L${x},${y - size / 2}`,
    "Z"
  ].join(" ");
}, "createDecisionBoxPathD");
async function question(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + (node.padding ?? 0);
  const h = bbox.height + (node.padding ?? 0);
  const s = w + h;
  const adjustment = 0.5;
  const points = [
    { x: s / 2, y: 0 },
    { x: s, y: -s / 2 },
    { x: s / 2, y: -s },
    { x: 0, y: -s / 2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createDecisionBoxPathD(0, 0, s);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-s / 2 + adjustment}, ${s / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, s, s, points);
    polygon.attr("transform", `translate(${-s / 2 + adjustment}, ${s / 2})`);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.calcIntersect = function(bounds, point) {
    const s2 = bounds.width;
    const points2 = [
      { x: s2 / 2, y: 0 },
      { x: s2, y: -s2 / 2 },
      { x: s2 / 2, y: -s2 },
      { x: 0, y: -s2 / 2 }
    ];
    return intersect_default.polygon(bounds, points2, point);
  };
  node.intersect = function(point) {
    return this.calcIntersect(node, point);
  };
  return shapeSvg;
}
__name(question, "question");
async function rect_left_inv_arrow(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 21 : nodePadding ?? 0;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding ?? 0;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const labelWidth = bbox.width + (node.look === "neo" ? labelPaddingX * 2 : labelPaddingX);
  const h = Math.max(
    bbox.height + (node.look === "neo" ? labelPaddingY * 2 : labelPaddingY),
    node.height ?? 0
  );
  const notchWidth = h / 4;
  const w = Math.max(labelWidth, (node.width ?? 0) - notchWidth);
  const x = -w / 2;
  const y = -h / 2;
  const notch = y / 2;
  const points = [
    { x: x + notch, y },
    { x, y: 0 },
    { x: x + notch, y: -y },
    { x: -x, y: -y },
    { x: -x, y }
  ];
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => roughNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-notch / 2},0)`);
  label.attr(
    "transform",
    `translate(${-notch / 2 - bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(rect_left_inv_arrow, "rect_left_inv_arrow");
async function rectWithTitle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  let classes;
  if (!node.cssClasses) {
    classes = "node default";
  } else {
    classes = "node " + node.cssClasses;
  }
  const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId || node.id);
  const g = shapeSvg.insert("g");
  const label = shapeSvg.insert("g").attr("class", "label").attr("style", nodeStyles);
  const description = node.description;
  const title = node.label;
  const text2 = await createLabel_default(label, title, node.labelStyle, true, true);
  let bbox = { width: 0, height: 0 };
  if (getEffectiveHtmlLabels(getConfig2())) {
    const div2 = text2.children[0];
    const dv2 = select_default(text2);
    bbox = div2.getBoundingClientRect();
    dv2.attr("width", bbox.width);
    dv2.attr("height", bbox.height);
  }
  log.info("Text 2", description);
  const textRows = description || [];
  const titleBox = text2.getBBox();
  const descr = await createLabel_default(
    label,
    Array.isArray(textRows) ? textRows.join("<br/>") : textRows,
    node.labelStyle,
    true,
    true
  );
  const div = descr.children[0];
  const dv = select_default(descr);
  bbox = div.getBoundingClientRect();
  dv.attr("width", bbox.width);
  dv.attr("height", bbox.height);
  const halfPadding = (node.padding || 0) / 2;
  select_default(descr).attr(
    "transform",
    "translate( " + (bbox.width > titleBox.width ? 0 : (titleBox.width - bbox.width) / 2) + ", " + (titleBox.height + halfPadding + 5) + ")"
  );
  select_default(text2).attr(
    "transform",
    "translate( " + (bbox.width < titleBox.width ? 0 : -(titleBox.width - bbox.width) / 2) + ", 0)"
  );
  bbox = label.node().getBBox();
  label.attr(
    "transform",
    "translate(" + -bbox.width / 2 + ", " + (-bbox.height / 2 - halfPadding + 3) + ")"
  );
  const totalWidth = bbox.width + (node.padding || 0);
  const totalHeight = bbox.height + (node.padding || 0);
  const x = -bbox.width / 2 - halfPadding;
  const y = -bbox.height / 2 - halfPadding;
  let rect;
  let innerLine;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(
      createRoundedRectPathD(x, y, totalWidth, totalHeight, node.rx || 0),
      options
    );
    const roughLine = rc.line(
      -bbox.width / 2 - halfPadding,
      -bbox.height / 2 - halfPadding + titleBox.height + halfPadding,
      bbox.width / 2 + halfPadding,
      -bbox.height / 2 - halfPadding + titleBox.height + halfPadding,
      options
    );
    innerLine = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughLine;
    }, ":first-child");
    rect = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
  } else {
    rect = g.insert("rect", ":first-child");
    innerLine = g.insert("line");
    rect.attr("class", "outer title-state").attr("style", nodeStyles).attr("x", -bbox.width / 2 - halfPadding).attr("y", -bbox.height / 2 - halfPadding).attr("width", bbox.width + (node.padding || 0)).attr("height", bbox.height + (node.padding || 0));
    innerLine.attr("class", "divider").attr("x1", -bbox.width / 2 - halfPadding).attr("x2", bbox.width / 2 + halfPadding).attr("y1", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding).attr("y2", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding);
  }
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(rectWithTitle, "rectWithTitle");
async function roundedRect(parent, node, { config: { themeVariables } }) {
  const radius = (themeVariables == null ? void 0 : themeVariables.radius) ?? 5;
  const options = {
    rx: radius,
    ry: radius,
    classes: "",
    labelPaddingX: ((node == null ? void 0 : node.padding) ?? 0) * 1,
    labelPaddingY: ((node == null ? void 0 : node.padding) ?? 0) * 1
  };
  return drawRect(parent, node, options);
}
__name(roundedRect, "roundedRect");
var FRAME_WIDTH = 8;
async function shadedProcess(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const paddingX = node.look === "neo" ? 16 : node.padding ?? 0;
  const paddingY = node.look === "neo" ? 12 : node.padding ?? 0;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = ((node == null ? void 0 : node.width) ?? bbox.width) + paddingX * 2 + (node.look === "neo" ? FRAME_WIDTH : FRAME_WIDTH * 2);
  const totalHeight = ((node == null ? void 0 : node.height) ?? bbox.height) + paddingY * 2;
  const w = totalWidth - FRAME_WIDTH;
  const h = totalHeight;
  const x = FRAME_WIDTH - totalWidth / 2;
  const y = -totalHeight / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x, y },
    { x: x + w, y },
    { x: x + w, y: y + h },
    { x: x - FRAME_WIDTH, y: y + h },
    { x: x - FRAME_WIDTH, y },
    { x, y },
    { x, y: y + h }
  ];
  const roughNode = rc.polygon(
    points.map((p) => [p.x, p.y]),
    options
  );
  const rect = shapeSvg.insert(() => roughNode, ":first-child");
  rect.attr("class", "basic label-container outer-path").attr("style", handleUndefinedAttr(cssStyles));
  if (nodeStyles && node.look !== "handDrawn") {
    rect.selectAll("path").attr("style", nodeStyles);
  }
  if (cssStyles && node.look !== "handDrawn") {
    rect.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${FRAME_WIDTH / 2 - bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(shadedProcess, "shadedProcess");
async function slopedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  if (node.width || node.height) {
    node.width = Math.max(((node == null ? void 0 : node.width) ?? 0) - labelPaddingX * 2, 10);
    node.height = Math.max(((node == null ? void 0 : node.height) ?? 0) / 1.5 - labelPaddingY * 2, 10);
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2;
  const totalHeight = (((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingY * 2) * 1.5;
  const w = totalWidth;
  const h = totalHeight / 1.5;
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x, y },
    { x, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y: y - h / 2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container  outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(0, ${h / 4})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))}, ${-h / 4 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(slopedRect, "slopedRect");
async function squareRect(parent, node) {
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding * 2;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  const options = {
    rx: 0,
    ry: 0,
    classes: "",
    labelPaddingX: node.labelPaddingX ?? labelPaddingX,
    labelPaddingY
  };
  const shapeSvg = await drawRect(parent, node, options);
  if (node.colorIndex !== void 0) {
    const { theme, themeVariables } = getConfig2();
    stampColorSlot(shapeSvg, node.colorIndex, theme, themeVariables.borderColorArray);
  }
  return shapeSvg;
}
__name(squareRect, "squareRect");
var arcPointCount = 50;
var stadiumDimensions = __name((bbox, paddingX, paddingY) => {
  const h = bbox.height + paddingY;
  const inscribedDiameter = h * Math.cos(Math.PI / (2 * (arcPointCount - 1)));
  const capWidthAtLabel = Math.sqrt(Math.max(0, inscribedDiameter ** 2 - bbox.height ** 2));
  const w = Math.max(
    bbox.width + h / 4 + paddingX,
    1.5 * h + (h - inscribedDiameter),
    bbox.width + paddingX + h - capWidthAtLabel
  );
  return { w, h };
}, "stadiumDimensions");
async function stadium(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const paddingX = node.look === "neo" ? 40 : nodePadding;
  const paddingY = node.look === "neo" ? 24 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const { w, h } = stadiumDimensions(bbox, paddingX, paddingY);
  const radius = h / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 + radius, y: -h / 2 },
    { x: w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints(-w / 2 + radius, 0, radius, arcPointCount, 90, 270),
    { x: w / 2 - radius, y: h / 2 },
    ...generateCirclePoints(w / 2 - radius, 0, radius, arcPointCount, 270, 450)
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(stadium, "stadium");
async function state(parent, node) {
  const options = {
    rx: node.look === "neo" ? 3 : 5,
    ry: node.look === "neo" ? 3 : 5,
    classes: "flowchart-node"
  };
  return drawRect(parent, node, options);
}
__name(state, "state");
function stateEnd(parent, node, { config: { themeVariables } }) {
  var _a, _b;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { cssStyles } = node;
  const { lineColor, stateBorder, nodeBorder, nodeShadow } = themeVariables;
  if (node.width || node.height) {
    if ((node.width ?? 0) < 14) {
      node.width = 14;
    }
    if ((node.height ?? 0) < 14) {
      node.height = 14;
    }
  }
  if (!node.width) {
    node.width = 14;
  }
  if (!node.height) {
    node.height = 14;
  }
  const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId ?? node.id);
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughNode = rc.circle(0, 0, node.width, {
    ...options,
    stroke: lineColor,
    strokeWidth: 2
  });
  const innerFill = stateBorder ?? nodeBorder;
  const innerNodeRadius = (node.width ?? 0) * 5 / 14;
  const roughInnerNode = rc.circle(0, 0, innerNodeRadius, {
    ...options,
    fill: innerFill,
    stroke: innerFill,
    strokeWidth: 2,
    fillStyle: "solid"
  });
  const circle2 = shapeSvg.insert(() => roughNode, ":first-child");
  circle2.insert(() => roughInnerNode);
  if (node.look !== "handDrawn") {
    circle2.attr("class", "outer-path");
  }
  if (cssStyles) {
    circle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles) {
    circle2.selectAll("path").attr("style", nodeStyles);
  }
  if (node.width < 25 && nodeShadow && node.look !== "handDrawn") {
    const svgId = ((_b = (_a = parent.node()) == null ? void 0 : _a.ownerSVGElement) == null ? void 0 : _b.id) ?? "";
    const filterId = svgId ? `${svgId}-drop-shadow-small` : "drop-shadow-small";
    circle2.attr("style", `filter:url(#${filterId})`);
  }
  updateNodeBounds(node, circle2);
  node.intersect = function(point) {
    return intersect_default.circle(node, (node.width ?? 0) / 2, point);
  };
  return shapeSvg;
}
__name(stateEnd, "stateEnd");
function stateStart(parent, node, { config: { themeVariables } }) {
  var _a, _b;
  const { lineColor, nodeShadow } = themeVariables;
  if (node.width || node.height) {
    if ((node.width ?? 0) < 14) {
      node.width = 14;
    }
    if ((node.height ?? 0) < 14) {
      node.height = 14;
    }
  }
  if (!node.width) {
    node.width = 14;
  }
  if (!node.height) {
    node.height = 14;
  }
  const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
  let circle2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughNode = rc.circle(0, 0, node.width, solidStateFill(lineColor));
    circle2 = shapeSvg.insert(() => roughNode);
    circle2.attr("class", "state-start").attr("r", (node.width ?? 7) / 2).attr("width", node.width ?? 14).attr("height", node.height ?? 14);
  } else {
    circle2 = shapeSvg.insert("circle", ":first-child");
    circle2.attr("class", "state-start").attr("r", (node.width ?? 7) / 2).attr("width", node.width ?? 14).attr("height", node.height ?? 14);
  }
  if (node.width < 25 && nodeShadow && node.look !== "handDrawn") {
    const svgId = ((_b = (_a = parent.node()) == null ? void 0 : _a.ownerSVGElement) == null ? void 0 : _b.id) ?? "";
    const filterId = svgId ? `${svgId}-drop-shadow-small` : "drop-shadow-small";
    circle2.attr("style", `filter:url(#${filterId})`);
  }
  updateNodeBounds(node, circle2);
  node.intersect = function(point) {
    return intersect_default.circle(node, (node.width ?? 7) / 2, point);
  };
  return shapeSvg;
}
__name(stateStart, "stateStart");
var FRAME_WIDTH2 = 8;
async function subroutine(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = (node == null ? void 0 : node.padding) ?? 8;
  const labelPaddingX = node.look === "neo" ? 28 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + 2 * FRAME_WIDTH2 + labelPaddingX, node.width ?? 0);
  const totalHeight = Math.max(bbox.height + labelPaddingY, node.height ?? 0);
  const w = totalWidth - 2 * FRAME_WIDTH2;
  const h = totalHeight;
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: -h },
    { x: 0, y: -h },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: w + 8, y: 0 },
    { x: w + 8, y: -h },
    { x: -8, y: -h },
    { x: -8, y: 0 }
  ];
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.rectangle(x, y, w + 16, h, options);
    const l1 = rc.line(x + FRAME_WIDTH2, y, x + FRAME_WIDTH2, y + h, options);
    const l2 = rc.line(x + FRAME_WIDTH2 + w, y, x + FRAME_WIDTH2 + w, y + h, options);
    shapeSvg.insert(() => l1, ":first-child");
    shapeSvg.insert(() => l2, ":first-child");
    const rect = shapeSvg.insert(() => roughNode, ":first-child");
    const { cssStyles } = node;
    rect.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
    updateNodeBounds(node, rect);
  } else {
    const el = insertPolygonShape(shapeSvg, w, h, points);
    if (nodeStyles) {
      el.attr("style", nodeStyles);
    }
    updateNodeBounds(node, el);
  }
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(subroutine, "subroutine");
var TAG_RATIO = 0.2;
async function taggedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  if (node.width || node.height) {
    node.height = Math.max(((node == null ? void 0 : node.height) ?? 0) - labelPaddingY * 2, 10);
    node.width = Math.max(
      ((node == null ? void 0 : node.width) ?? 0) - labelPaddingX * 2 - TAG_RATIO * (node.height + labelPaddingY * 2),
      10
    );
  }
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalHeight = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingY * 2;
  const tagWidth = TAG_RATIO * totalHeight;
  const tagHeight = TAG_RATIO * totalHeight;
  const totalWidth = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2 + tagWidth;
  const w = totalWidth - tagWidth;
  const h = totalHeight;
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const rectPoints = [
    { x: x - tagWidth / 2, y },
    { x: x + w + tagWidth / 2, y },
    { x: x + w + tagWidth / 2, y: y + h },
    { x: x - tagWidth / 2, y: y + h }
  ];
  const tagPoints = [
    { x: x + w - tagWidth / 2, y: y + h },
    { x: x + w + tagWidth / 2, y: y + h },
    { x: x + w + tagWidth / 2, y: y + h - tagHeight }
  ];
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const rectPath = createPathFromPoints(rectPoints);
  const rectNode = rc.path(rectPath, options);
  const tagPath = createPathFromPoints(tagPoints);
  const tagNode = rc.path(tagPath, { ...options, fillStyle: "solid" });
  const taggedRect2 = shapeSvg.insert(() => tagNode, ":first-child");
  taggedRect2.insert(() => rectNode, ":first-child");
  taggedRect2.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    taggedRect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    taggedRect2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, taggedRect2);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, rectPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(taggedRect, "taggedRect");
async function taggedWaveEdgedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const waveAmplitude = h / 8;
  const tagWidth = 0.2 * w;
  const tagHeight = 0.2 * h;
  const finalH = h + waveAmplitude;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 - w / 2 * 0.1, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w / 2 - w / 2 * 0.1,
      finalH / 2,
      w / 2 + w / 2 * 0.1,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w / 2 + w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2 - w / 2 * 0.1, y: -finalH / 2 }
  ];
  const x = -w / 2 + w / 2 * 0.1;
  const y = -finalH / 2 - tagHeight * 0.4;
  const tagPoints = [
    { x: x + w - tagWidth, y: (y + h) * 1.3 },
    { x: x + w, y: y + h - tagHeight },
    { x: x + w, y: (y + h) * 0.9 },
    ...generateFullSineWavePoints(
      x + w,
      (y + h) * 1.25,
      x + w - tagWidth,
      (y + h) * 1.3,
      -h * 0.02,
      0.5
    )
  ];
  const waveEdgeRectPath = createPathFromPoints(points);
  const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
  const taggedWaveEdgeRectPath = createPathFromPoints(tagPoints);
  const taggedWaveEdgeRectNode = rc.path(taggedWaveEdgeRectPath, {
    ...options,
    fillStyle: "solid"
  });
  const waveEdgeRect = shapeSvg.insert(() => taggedWaveEdgeRectNode, ":first-child");
  waveEdgeRect.insert(() => waveEdgeRectNode, ":first-child");
  waveEdgeRect.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(taggedWaveEdgedRectangle, "taggedWaveEdgedRectangle");
async function text(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + (node.padding ?? 0), (node == null ? void 0 : node.width) || 0);
  const totalHeight = Math.max(bbox.height + (node.padding ?? 0), (node == null ? void 0 : node.height) || 0);
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const rect = shapeSvg.insert("rect", ":first-child");
  rect.attr("class", "text").attr("style", nodeStyles).attr("rx", 0).attr("ry", 0).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight);
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(text, "text");
var createCylinderPathD3 = __name((x, y, width, height, rx, ry) => {
  return `M${x},${y}
    a${rx},${ry} 0,0,1 ${0},${-height}
    l${width},${0}
    a${rx},${ry} 0,0,1 ${0},${height}
    M${width},${-height}
    a${rx},${ry} 0,0,0 ${0},${height}
    l${-width},${0}`;
}, "createCylinderPathD");
var createOuterCylinderPathD3 = __name((x, y, width, height, rx, ry) => {
  return [
    `M${x},${y}`,
    `M${x + width},${y}`,
    `a${rx},${ry} 0,0,0 ${0},${-height}`,
    `l${-width},0`,
    `a${rx},${ry} 0,0,0 ${0},${height}`,
    `l${width},0`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD3 = __name((x, y, width, height, rx, ry) => {
  return [`M${x + width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 0,${height}`].join(" ");
}, "createInnerCylinderPathD");
var MIN_HEIGHT4 = 5;
var MIN_WIDTH5 = 10;
async function tiltedCylinder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPadding = node.look === "neo" ? 12 : nodePadding / 2;
  const originalHeight = node.height ?? 0;
  if (node.height) {
    node.height = node.height - labelPadding;
    if (node.height < MIN_HEIGHT4) {
      node.height = MIN_HEIGHT4;
    }
  }
  if (node.width) {
    const ry2 = originalHeight / 2;
    const rx2 = ry2 / (2.5 + originalHeight / 50);
    node.width = node.width - labelPadding - rx2 * 3;
    if (node.width < MIN_WIDTH5) {
      node.width = MIN_WIDTH5;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const h = Math.max(node.height ?? 0, bbox.height) + labelPadding;
  const ry = h / 2;
  const rx = ry / (2.5 + h / 50);
  const w = Math.max(node.width ?? 0, bbox.width) + rx + labelPadding;
  const { cssStyles } = node;
  let cylinder2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD3(0, 0, w, h, rx, ry);
    const innerPathData = createInnerCylinderPathD3(0, 0, w, h, rx, ry);
    const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
    const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
    cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD3(0, 0, w, h, rx, ry);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
    cylinder2.attr("class", "basic label-container outer-path");
    if (cssStyles) {
      cylinder2.selectAll("path").attr("style", cssStyles);
    }
    if (nodeStyles) {
      cylinder2.selectAll("path").attr("style", nodeStyles);
    }
  }
  cylinder2.attr("label-offset-x", rx);
  cylinder2.attr("transform", `translate(${-w / 2}, ${h / 2} )`);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rx - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, cylinder2);
  node.intersect = function(point) {
    const pos = intersect_default.rect(node, point);
    const y = pos.y - (node.y ?? 0);
    if (ry != 0 && (Math.abs(y) < (node.height ?? 0) / 2 || Math.abs(y) == (node.height ?? 0) / 2 && Math.abs(pos.x - (node.x ?? 0)) > (node.width ?? 0) / 2 - rx)) {
      let x = rx * rx * (1 - y * y / (ry * ry));
      if (x != 0) {
        x = Math.sqrt(Math.abs(x));
      }
      x = rx - x;
      if (point.x - (node.x ?? 0) > 0) {
        x = -x;
      }
      pos.x += x;
    }
    return pos;
  };
  return shapeSvg;
}
__name(tiltedCylinder, "tiltedCylinder");
async function trapezoid(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingY = node.look === "neo" ? nodePadding : nodePadding;
  const labelPaddingX = node.look === "neo" ? nodePadding * 2 : nodePadding;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = Math.max(bbox.height + labelPaddingY, node.height ?? 0);
  const w = Math.max(bbox.width + labelPaddingX, (node.width ?? 0) - h);
  const points = [
    { x: -3 * h / 6, y: 0 },
    { x: w + 3 * h / 6, y: 0 },
    { x: w, y: -h },
    { x: 0, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(trapezoid, "trapezoid");
async function trapezoidalPentagon(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  const minWidth = 15, minHeight = 5;
  if (node.width || node.height) {
    node.height = (node.height ?? 0) - labelPaddingY * 2;
    if (node.height < minHeight) {
      node.height = minHeight;
    }
    node.width = (node.width ?? 0) - labelPaddingX * 2;
    if (node.width < minWidth) {
      node.width = minWidth;
    }
  }
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2;
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingY * 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 * 0.8, y: -h / 2 },
    { x: w / 2 * 0.8, y: -h / 2 },
    { x: w / 2, y: -h / 2 * 0.6 },
    { x: w / 2, y: h / 2 },
    { x: -w / 2, y: h / 2 },
    { x: -w / 2, y: -h / 2 * 0.6 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(trapezoidalPentagon, "trapezoidalPentagon");
var MIN_HEIGHT5 = 10;
var MIN_WIDTH6 = 10;
async function triangle(parent, node) {
  var _a;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? nodePadding * 2 : nodePadding;
  if (node.width || node.height) {
    node.width = (((node == null ? void 0 : node.width) ?? 0) - labelPaddingX) / 2;
    if (node.width < MIN_WIDTH6) {
      node.width = MIN_WIDTH6;
    }
    node.height = (node == null ? void 0 : node.height) ?? 0;
    if (node.height < MIN_HEIGHT5) {
      node.height = MIN_HEIGHT5;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const useHtmlLabels = evaluate((_a = getConfig2().flowchart) == null ? void 0 : _a.htmlLabels);
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX;
  const h = (node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : w + bbox.height;
  const tw = h;
  const points = [
    { x: 0, y: 0 },
    { x: tw, y: 0 },
    { x: tw / 2, y: -h }
  ];
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h / 2}, ${h / 2})`).attr("class", "outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${h / 2 - (bbox.height + (node.padding ?? 0) / (useHtmlLabels ? 2 : 1) - (bbox.y - (bbox.top ?? 0)))})`
  );
  node.intersect = function(point) {
    log.info("Triangle intersect", node, points, point);
    return intersect_default.polygon(node, points, point);
  };
  return shapeSvg;
}
__name(triangle, "triangle");
async function waveEdgedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 12 : nodePadding;
  let adjustFinalHeight = true;
  if (node.width || node.height) {
    adjustFinalHeight = false;
    node.width = ((node == null ? void 0 : node.width) ?? 0) - labelPaddingX * 2;
    if (node.width < 10) {
      node.width = 10;
    }
    node.height = ((node == null ? void 0 : node.height) ?? 0) - labelPaddingY * 2;
    if (node.height < 10) {
      node.height = 10;
    }
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + (labelPaddingX ?? 0) * 2;
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + (labelPaddingY ?? 0) * 2;
  const waveAmplitude = node.look === "neo" ? h / 4 : h / 8;
  const finalH = h + (adjustFinalHeight ? waveAmplitude : -waveAmplitude);
  const { cssStyles } = node;
  const minWidth = 14;
  const widthDif = minWidth - w;
  const extraW = widthDif > 0 ? widthDif / 2 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 - extraW, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w / 2 - extraW,
      finalH / 2,
      w / 2 + extraW,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w / 2 + extraW, y: -finalH / 2 },
    { x: -w / 2 - extraW, y: -finalH / 2 }
  ];
  const waveEdgeRectPath = createPathFromPoints(points);
  const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
  const waveEdgeRect = shapeSvg.insert(() => waveEdgeRectNode, ":first-child");
  waveEdgeRect.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - waveAmplitude - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(waveEdgedRectangle, "waveEdgedRectangle");
async function waveRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const nodePadding = node.padding ?? 0;
  const labelPaddingX = node.look === "neo" ? 16 : nodePadding;
  const labelPaddingY = node.look === "neo" ? 20 : nodePadding;
  if (node.width || node.height) {
    node.width = (node == null ? void 0 : node.width) ?? 0;
    if (node.width < 20) {
      node.width = 20;
    }
    node.height = (node == null ? void 0 : node.height) ?? 0;
    if (node.height < 10) {
      node.height = 10;
    }
    const waveAmplitude2 = Math.min(node.height * 0.2, node.height / 4);
    node.height = Math.ceil(node.height - labelPaddingY - waveAmplitude2 * (20 / 9));
    node.width = node.width - labelPaddingX * 2;
  }
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2;
  const h = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingY;
  const waveAmplitude = h / 8;
  const finalH = h + waveAmplitude * 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2, y: finalH / 2 },
    ...generateFullSineWavePoints(-w / 2, finalH / 2, w / 2, finalH / 2, waveAmplitude, 1),
    { x: w / 2, y: -finalH / 2 },
    ...generateFullSineWavePoints(w / 2, -finalH / 2, -w / 2, -finalH / 2, waveAmplitude, -1)
  ];
  const waveRectPath = createPathFromPoints(points);
  const waveRectNode = rc.path(waveRectPath, options);
  const waveRect = shapeSvg.insert(() => waveRectNode, ":first-child");
  waveRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveRect.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, waveRect);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, points, point);
    return pos;
  };
  return shapeSvg;
}
__name(waveRectangle, "waveRectangle");
var rectOffset = 10;
async function windowPane(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const paddingX = node.look === "neo" ? 16 : node.padding ?? 0;
  const paddingY = node.look === "neo" ? 12 : node.padding ?? 0;
  if (node.width || node.height) {
    node.width = Math.max(((node == null ? void 0 : node.width) ?? 0) - paddingX * 2 - rectOffset, 10);
    node.height = Math.max(((node == null ? void 0 : node.height) ?? 0) - paddingY * 2 - rectOffset, 10);
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + paddingX * 2 + rectOffset;
  const totalHeight = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + paddingY * 2 + rectOffset;
  const w = totalWidth - rectOffset;
  const h = totalHeight - rectOffset;
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const outerPathPoints = [
    { x: x - rectOffset, y: y - rectOffset },
    { x: x - rectOffset, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y: y - rectOffset }
  ];
  const path = `M${x - rectOffset},${y - rectOffset} L${x + w},${y - rectOffset} L${x + w},${y + h} L${x - rectOffset},${y + h} L${x - rectOffset},${y - rectOffset}
                M${x - rectOffset},${y} L${x + w},${y}
                M${x},${y - rectOffset} L${x},${y + h}`;
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const no = rc.path(path, options);
  const windowPane2 = shapeSvg.insert(() => no, ":first-child");
  windowPane2.attr("transform", `translate(${rectOffset / 2}, ${rectOffset / 2})`);
  windowPane2.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    windowPane2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    windowPane2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) + rectOffset / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, windowPane2);
  node.intersect = function(point) {
    const pos = intersect_default.polygon(node, outerPathPoints, point);
    return pos;
  };
  return shapeSvg;
}
__name(windowPane, "windowPane");
var COLOR_THEMES = /* @__PURE__ */ new Set(["redux-color", "redux-dark-color"]);
var REDUX_THEMES = /* @__PURE__ */ new Set(["redux", "redux-dark", "redux-color", "redux-dark-color"]);
async function erBox(parent, node) {
  var _a, _b, _c, _d;
  const entityNode = node;
  if (entityNode.alias) {
    node.label = entityNode.alias;
  }
  const { theme, themeVariables } = getConfig();
  const { rowEven, rowOdd, nodeBorder, borderColorArray } = themeVariables;
  if (node.look === "handDrawn") {
    const { themeVariables: themeVariables2 } = getConfig();
    const { background } = themeVariables2;
    const backgroundNode = {
      ...node,
      id: node.id + "-background",
      domId: (node.domId || node.id) + "-background",
      look: "default",
      cssStyles: ["stroke: none", `fill: ${background}`]
    };
    await erBox(parent, backgroundNode);
  }
  const config = getConfig();
  node.useHtmlLabels = config.htmlLabels;
  let PADDING = ((_a = config.er) == null ? void 0 : _a.diagramPadding) ?? 10;
  let TEXT_PADDING = ((_b = config.er) == null ? void 0 : _b.entityPadding) ?? 6;
  const { cssStyles } = node;
  const { labelStyles, nodeStyles } = styles2String(node);
  if (entityNode.attributes.length === 0 && node.label) {
    const options2 = {
      rx: 0,
      ry: 0,
      labelPaddingX: PADDING,
      labelPaddingY: PADDING * 1.5,
      classes: ""
    };
    if (calculateTextWidth(node.label, config) + options2.labelPaddingX * 2 < config.er.minEntityWidth) {
      node.width = config.er.minEntityWidth;
    }
    const shapeSvg2 = await drawRect(parent, node, options2);
    if (theme != null && COLOR_THEMES.has(theme)) {
      const colorIndex = entityNode.colorIndex ?? 0;
      shapeSvg2.attr("data-color-id", `color-${colorIndex % borderColorArray.length}`);
    }
    if (!evaluate(config.htmlLabels)) {
      const textElement = shapeSvg2.select("text");
      const bbox = (_c = textElement.node()) == null ? void 0 : _c.getBBox();
      textElement.attr("transform", `translate(${-bbox.width / 2}, 0)`);
    }
    return shapeSvg2;
  }
  if (!config.htmlLabels) {
    PADDING *= 1.25;
    TEXT_PADDING *= 1.25;
  }
  let cssClasses = getNodeClasses(node);
  if (!cssClasses) {
    cssClasses = "node default";
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const nameBBox = await addText(shapeSvg, node.label ?? "", config, 0, 0, ["name"], labelStyles);
  nameBBox.height += TEXT_PADDING;
  let yOffset = 0;
  const yOffsets = [];
  const rows = [];
  let maxTypeWidth = 0;
  let maxNameWidth = 0;
  let maxKeysWidth = 0;
  let maxCommentWidth = 0;
  let keysPresent = true;
  let commentPresent = true;
  for (const attribute of entityNode.attributes) {
    const typeBBox = await addText(
      shapeSvg,
      attribute.type,
      config,
      0,
      yOffset,
      ["attribute-type"],
      labelStyles
    );
    maxTypeWidth = Math.max(maxTypeWidth, typeBBox.width + PADDING);
    const nameBBox2 = await addText(
      shapeSvg,
      attribute.name,
      config,
      0,
      yOffset,
      ["attribute-name"],
      labelStyles
    );
    maxNameWidth = Math.max(maxNameWidth, nameBBox2.width + PADDING);
    const keysBBox = await addText(
      shapeSvg,
      attribute.keys.join(),
      config,
      0,
      yOffset,
      ["attribute-keys"],
      labelStyles
    );
    maxKeysWidth = Math.max(maxKeysWidth, keysBBox.width + PADDING);
    const commentBBox = await addText(
      shapeSvg,
      attribute.comment,
      config,
      0,
      yOffset,
      ["attribute-comment"],
      labelStyles
    );
    maxCommentWidth = Math.max(maxCommentWidth, commentBBox.width + PADDING);
    const rowHeight = Math.max(typeBBox.height, nameBBox2.height, keysBBox.height, commentBBox.height) + TEXT_PADDING;
    rows.push({ yOffset, rowHeight });
    yOffset += rowHeight;
  }
  let totalWidthSections = 4;
  if (maxKeysWidth <= PADDING) {
    keysPresent = false;
    maxKeysWidth = 0;
    totalWidthSections--;
  }
  if (maxCommentWidth <= PADDING) {
    commentPresent = false;
    maxCommentWidth = 0;
    totalWidthSections--;
  }
  const shapeBBox = shapeSvg.node().getBBox();
  if (nameBBox.width + PADDING * 2 - (maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth) > 0) {
    const difference = nameBBox.width + PADDING * 2 - (maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth);
    maxTypeWidth += difference / totalWidthSections;
    maxNameWidth += difference / totalWidthSections;
    if (maxKeysWidth > 0) {
      maxKeysWidth += difference / totalWidthSections;
    }
    if (maxCommentWidth > 0) {
      maxCommentWidth += difference / totalWidthSections;
    }
  }
  const maxWidth = maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  let totalShapeBBoxHeight = 0;
  if (rows.length > 0) {
    totalShapeBBoxHeight = rows.reduce((sum, row) => sum + ((row == null ? void 0 : row.rowHeight) ?? 0), 0);
  }
  const w = Math.max(shapeBBox.width + PADDING * 2, (node == null ? void 0 : node.width) || 0, maxWidth);
  const h = Math.max((totalShapeBBoxHeight ?? 0) + nameBBox.height, (node == null ? void 0 : node.height) || 0);
  const x = -w / 2;
  const y = -h / 2;
  shapeSvg.selectAll("g:not(:first-child)").each((_, i, nodes) => {
    const text2 = select_default(nodes[i]);
    const transform = text2.attr("transform");
    let translateX = 0;
    let translateY = 0;
    if (transform) {
      const regex = RegExp(/translate\(([^,]+),([^)]+)\)/);
      const translate = regex.exec(transform);
      if (translate) {
        translateX = parseFloat(translate[1]);
        translateY = parseFloat(translate[2]);
        if (text2.attr("class").includes("attribute-name")) {
          translateX += maxTypeWidth;
        } else if (text2.attr("class").includes("attribute-keys")) {
          translateX += maxTypeWidth + maxNameWidth;
        } else if (text2.attr("class").includes("attribute-comment")) {
          translateX += maxTypeWidth + maxNameWidth + maxKeysWidth;
        }
      }
    }
    text2.attr(
      "transform",
      `translate(${x + PADDING / 2 + translateX}, ${translateY + y + nameBBox.height + TEXT_PADDING / 2})`
    );
  });
  shapeSvg.select(".name").attr("transform", "translate(" + -nameBBox.width / 2 + ", " + (y + TEXT_PADDING / 2) + ")");
  if (theme != null && COLOR_THEMES.has(theme)) {
    const colorIndex = entityNode.colorIndex ?? 0;
    shapeSvg.attr("data-color-id", `color-${colorIndex % borderColorArray.length}`);
  }
  const roughRect = rc.rectangle(x, y, w, h, options);
  const rect = shapeSvg.insert(() => roughRect, ":first-child").attr("class", "outer-path").attr("style", cssStyles.join(""));
  yOffsets.push(0);
  for (const [i, row] of rows.entries()) {
    const contentRowIndex = i + 1;
    const isEven = contentRowIndex % 2 === 0 && row.yOffset !== 0;
    const roughRect2 = rc.rectangle(x, nameBBox.height + y + (row == null ? void 0 : row.yOffset), w, row == null ? void 0 : row.rowHeight, {
      ...options,
      fill: isEven ? rowEven : rowOdd,
      stroke: nodeBorder
    });
    shapeSvg.insert(() => roughRect2, "g.label").attr("style", cssStyles.join("")).attr("class", `row-rect-${isEven ? "even" : "odd"}`);
  }
  const thickness = 1e-4;
  let points = lineToPolygon(x, nameBBox.height + y, w + x, nameBBox.height + y, thickness);
  let roughLine = rc.polygon(
    points.map((p) => [p.x, p.y]),
    options
  );
  shapeSvg.insert(() => roughLine).attr("class", "divider");
  points = lineToPolygon(maxTypeWidth + x, nameBBox.height + y, maxTypeWidth + x, h + y, thickness);
  roughLine = rc.polygon(
    points.map((p) => [p.x, p.y]),
    options
  );
  shapeSvg.insert(() => roughLine).attr("class", "divider");
  if (keysPresent) {
    const xCoord = maxTypeWidth + maxNameWidth + x;
    points = lineToPolygon(xCoord, nameBBox.height + y, xCoord, h + y, thickness);
    roughLine = rc.polygon(
      points.map((p) => [p.x, p.y]),
      options
    );
    shapeSvg.insert(() => roughLine).attr("class", "divider");
  }
  if (commentPresent) {
    const xCoord = maxTypeWidth + maxNameWidth + maxKeysWidth + x;
    points = lineToPolygon(xCoord, nameBBox.height + y, xCoord, h + y, thickness);
    roughLine = rc.polygon(
      points.map((p) => [p.x, p.y]),
      options
    );
    shapeSvg.insert(() => roughLine).attr("class", "divider");
  }
  for (const yOffset2 of yOffsets) {
    const yCoord = nameBBox.height + y + yOffset2;
    points = lineToPolygon(x, yCoord, w + x, yCoord, thickness);
    roughLine = rc.polygon(
      points.map((p) => [p.x, p.y]),
      options
    );
    shapeSvg.insert(() => roughLine).attr("class", "divider");
  }
  updateNodeBounds(node, rect);
  if (nodeStyles && node.look !== "handDrawn") {
    if (theme != null && REDUX_THEMES.has(theme)) {
      shapeSvg.selectAll("path").attr("style", nodeStyles);
    } else {
      const allStyle = nodeStyles.split(";");
      const strokeStyles = (_d = allStyle == null ? void 0 : allStyle.filter((e) => {
        return e.includes("stroke");
      })) == null ? void 0 : _d.map((s) => `${s}`).join("; ");
      shapeSvg.selectAll("path").attr("style", strokeStyles ?? "");
      shapeSvg.selectAll(".row-rect-even path").attr("style", nodeStyles);
    }
  }
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(erBox, "erBox");
async function addText(shapeSvg, labelText, config, translateX = 0, translateY = 0, classes = [], style = "") {
  const label = shapeSvg.insert("g").attr("class", `label ${classes.join(" ")}`).attr("transform", `translate(${translateX}, ${translateY})`).attr("style", style);
  if (labelText !== parseGenericTypes(labelText)) {
    labelText = parseGenericTypes(labelText);
    labelText = labelText.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  const text2 = label.node().appendChild(
    await createText(
      label,
      labelText,
      {
        width: calculateTextWidth(labelText, config) + 100,
        style,
        useHtmlLabels: config.htmlLabels
      },
      config
    )
  );
  if (labelText.includes("&lt;") || labelText.includes("&gt;")) {
    let child = text2.children[0];
    child.textContent = child.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    while (child.childNodes[0]) {
      child = child.childNodes[0];
      child.textContent = child.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    }
  }
  let bbox = text2.getBBox();
  if (evaluate(config.htmlLabels)) {
    const div = text2.children[0];
    div.style.textAlign = "start";
    const dv = select_default(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  return bbox;
}
__name(addText, "addText");
function lineToPolygon(x1, y1, x2, y2, thickness) {
  if (x1 === x2) {
    return [
      { x: x1 - thickness / 2, y: y1 },
      { x: x1 + thickness / 2, y: y1 },
      { x: x2 + thickness / 2, y: y2 },
      { x: x2 - thickness / 2, y: y2 }
    ];
  }
  return [
    { x: x1, y: y1 - thickness / 2 },
    { x: x1, y: y1 + thickness / 2 },
    { x: x2, y: y2 + thickness / 2 },
    { x: x2, y: y2 - thickness / 2 }
  ];
}
__name(lineToPolygon, "lineToPolygon");
async function textHelper(parent, node, config, useHtmlLabels, GAP = config.class.padding ?? 12) {
  const TEXT_PADDING = !useHtmlLabels ? 3 : 0;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId || node.id);
  let annotationGroup = null;
  let labelGroup = null;
  let membersGroup = null;
  let methodsGroup = null;
  let annotationGroupHeight = 0;
  let labelGroupHeight = 0;
  let membersGroupHeight = 0;
  annotationGroup = shapeSvg.insert("g").attr("class", "annotation-group text");
  if (node.annotations.length > 0) {
    const annotation = node.annotations[0];
    await addText2(annotationGroup, { text: `«${annotation}»` }, 0);
    const annotationGroupBBox = annotationGroup.node().getBBox();
    annotationGroupHeight = annotationGroupBBox.height;
  }
  labelGroup = shapeSvg.insert("g").attr("class", "label-group text");
  await addText2(labelGroup, node, 0, ["font-weight: bolder"]);
  const labelGroupBBox = labelGroup.node().getBBox();
  labelGroupHeight = labelGroupBBox.height;
  membersGroup = shapeSvg.insert("g").attr("class", "members-group text");
  let yOffset = 0;
  for (const member of node.members) {
    const height = await addText2(membersGroup, member, yOffset, [member.parseClassifier()]);
    yOffset += height + TEXT_PADDING;
  }
  membersGroupHeight = membersGroup.node().getBBox().height;
  if (membersGroupHeight <= 0) {
    membersGroupHeight = GAP / 2;
  }
  methodsGroup = shapeSvg.insert("g").attr("class", "methods-group text");
  let methodsYOffset = 0;
  for (const method of node.methods) {
    const height = await addText2(methodsGroup, method, methodsYOffset, [method.parseClassifier()]);
    methodsYOffset += height + TEXT_PADDING;
  }
  let bbox = shapeSvg.node().getBBox();
  if (annotationGroup !== null) {
    const annotationGroupBBox = annotationGroup.node().getBBox();
    annotationGroup.attr("transform", `translate(${-annotationGroupBBox.width / 2})`);
  }
  labelGroup.attr("transform", `translate(${-labelGroupBBox.width / 2}, ${annotationGroupHeight})`);
  bbox = shapeSvg.node().getBBox();
  membersGroup.attr(
    "transform",
    `translate(${0}, ${annotationGroupHeight + labelGroupHeight + GAP * 2})`
  );
  bbox = shapeSvg.node().getBBox();
  methodsGroup.attr(
    "transform",
    `translate(${0}, ${annotationGroupHeight + labelGroupHeight + (membersGroupHeight ? membersGroupHeight + GAP * 4 : GAP * 2)})`
  );
  bbox = shapeSvg.node().getBBox();
  return { shapeSvg, bbox };
}
__name(textHelper, "textHelper");
async function addText2(parentGroup, node, yOffset, styles = []) {
  const textEl = parentGroup.insert("g").attr("class", "label").attr("style", styles.join("; "));
  const config = getConfig();
  let useHtmlLabels = "useHtmlLabels" in node ? node.useHtmlLabels : evaluate(config.htmlLabels) ?? true;
  let textContent = "";
  if ("text" in node) {
    textContent = node.text;
  } else {
    textContent = node.label;
  }
  if (!useHtmlLabels && textContent.startsWith("\\")) {
    textContent = textContent.substring(1);
  }
  if (hasKatex(textContent)) {
    useHtmlLabels = true;
  }
  const text2 = await createText(
    textEl,
    sanitizeText3(decodeEntities(textContent)),
    {
      width: calculateTextWidth(textContent, config) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels
    },
    config
  );
  let bbox;
  let numberOfLines = 1;
  if (!useHtmlLabels) {
    if (styles.includes("font-weight: bolder")) {
      select_default(text2).selectAll("tspan").attr("font-weight", "");
    }
    numberOfLines = text2.children.length;
    const textChild = text2.children[0];
    if (text2.textContent === "" || text2.textContent.includes("&gt")) {
      textChild.textContent = textContent[0] + textContent.substring(1).replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim();
      const preserveSpace = textContent[1] === " ";
      if (preserveSpace) {
        textChild.textContent = textChild.textContent[0] + " " + textChild.textContent.substring(1);
      }
    }
    if (textChild.textContent === "undefined") {
      textChild.textContent = "";
    }
    bbox = text2.getBBox();
  } else {
    const div = text2.children[0];
    const dv = select_default(text2);
    numberOfLines = div.innerHTML.split("<br>").length;
    if (div.innerHTML.includes("</math>")) {
      numberOfLines += div.innerHTML.split("<mrow>").length - 1;
    }
    await configureLabelImages(div);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  textEl.attr("transform", "translate(0," + (-bbox.height / (2 * numberOfLines) + yOffset) + ")");
  return bbox.height;
}
__name(addText2, "addText");
async function classBox(parent, node) {
  var _a, _b;
  const config = getConfig2();
  const { theme, themeVariables } = config;
  const { useGradient, borderColorArray } = themeVariables;
  const PADDING = config.class.padding ?? 12;
  const GAP = PADDING;
  const useHtmlLabels = node.useHtmlLabels ?? evaluate(config.htmlLabels) ?? true;
  const classNode = node;
  classNode.annotations = classNode.annotations ?? [];
  classNode.members = classNode.members ?? [];
  classNode.methods = classNode.methods ?? [];
  const { shapeSvg, bbox } = await textHelper(parent, node, config, useHtmlLabels, GAP);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  node.cssStyles = classNode.styles || "";
  const styles = ((_a = classNode.styles) == null ? void 0 : _a.join(";")) || nodeStyles || "";
  if (!node.cssStyles) {
    node.cssStyles = styles.replaceAll("!important", "").split(";");
  }
  const renderExtraBox = classNode.members.length === 0 && classNode.methods.length === 0 && !((_b = config.class) == null ? void 0 : _b.hideEmptyMembersBox);
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const w = Math.max(node.width ?? 0, bbox.width);
  let h = Math.max(node.height ?? 0, bbox.height);
  const nodeHeightGreater = (node.height ?? 0) > bbox.height;
  if (classNode.members.length === 0 && classNode.methods.length === 0) {
    h += GAP;
  } else if (classNode.members.length > 0 && classNode.methods.length === 0) {
    h += GAP * 2;
  }
  const x = -w / 2;
  const y = -h / 2;
  let extraHeight = renderExtraBox ? PADDING * 2 : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING : 0;
  if (nodeHeightGreater) {
    extraHeight = PADDING * 2;
  }
  const roughRect = rc.rectangle(
    x - PADDING,
    y - PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0),
    w + 2 * PADDING,
    h + 2 * PADDING + extraHeight,
    options
  );
  const rect = shapeSvg.insert(() => roughRect, ":first-child");
  rect.attr("class", "basic label-container outer-path");
  const rectBBox = rect.node().getBBox();
  const annotationGroupHeight = shapeSvg.select(".annotation-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
  const labelGroupHeight = shapeSvg.select(".label-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
  const membersGroupHeight = shapeSvg.select(".members-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
  const methodsAreaPlacement = (annotationGroupHeight + labelGroupHeight + y + PADDING - (y - PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0))) / 2;
  shapeSvg.selectAll(".text").each((_, i, nodes) => {
    var _a2, _b2;
    const text2 = select_default(nodes[i]);
    const transform = text2.attr("transform");
    let translateY = 0;
    if (transform) {
      const regex = RegExp(/translate\(([^,]+),([^)]+)\)/);
      const translate = regex.exec(transform);
      if (translate) {
        translateY = parseFloat(translate[2]);
      }
    }
    let newTranslateY = translateY + y + PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0);
    if (text2.attr("class").includes("methods-group")) {
      const membersGroupHeightForMethods = Math.max(membersGroupHeight, GAP / 2);
      if (nodeHeightGreater) {
        newTranslateY = Math.max(
          methodsAreaPlacement,
          annotationGroupHeight + labelGroupHeight + membersGroupHeightForMethods + y + GAP * 2 + PADDING
        ) + GAP * 2;
      } else {
        newTranslateY = annotationGroupHeight + labelGroupHeight + membersGroupHeightForMethods + y + GAP * 4 + PADDING;
      }
    }
    if (classNode.members.length === 0 && classNode.methods.length === 0 && ((_a2 = config.class) == null ? void 0 : _a2.hideEmptyMembersBox)) {
      if (classNode.annotations.length > 0) {
        newTranslateY = translateY - GAP;
      } else {
        newTranslateY = translateY;
      }
    }
    if (!useHtmlLabels) {
      newTranslateY -= 4;
    }
    let newTranslateX = x;
    if (text2.attr("class").includes("label-group") || text2.attr("class").includes("annotation-group")) {
      newTranslateX = -((_b2 = text2.node()) == null ? void 0 : _b2.getBBox().width) / 2 || 0;
      shapeSvg.selectAll("text").each(function(_2, i2, nodes2) {
        if (window.getComputedStyle(nodes2[i2]).textAnchor === "middle") {
          newTranslateX = 0;
        }
      });
    }
    text2.attr("transform", `translate(${newTranslateX}, ${newTranslateY})`);
  });
  if (classNode.members.length > 0 || classNode.methods.length > 0 || renderExtraBox) {
    const firstLineY = annotationGroupHeight + labelGroupHeight + y + PADDING;
    const roughLine = rc.line(
      rectBBox.x,
      firstLineY,
      rectBBox.x + rectBBox.width,
      firstLineY + 1e-3,
      options
    );
    const line = shapeSvg.insert(() => roughLine);
    line.attr("class", `divider${node.look === "neo" && !useGradient ? " neo-line" : ""}`).attr("style", styles);
  }
  if (renderExtraBox || classNode.members.length > 0 || classNode.methods.length > 0) {
    const secondLineY = annotationGroupHeight + labelGroupHeight + membersGroupHeight + y + GAP * 2 + PADDING;
    const roughLine = rc.line(
      rectBBox.x,
      nodeHeightGreater ? Math.max(methodsAreaPlacement, secondLineY) : secondLineY,
      rectBBox.x + rectBBox.width,
      (nodeHeightGreater ? Math.max(methodsAreaPlacement, secondLineY) : secondLineY) + 1e-3,
      options
    );
    const line = shapeSvg.insert(() => roughLine);
    line.attr("class", `divider${node.look === "neo" && !useGradient ? " neo-line" : ""}`).attr("style", styles);
  }
  if (classNode.look !== "handDrawn") {
    shapeSvg.selectAll("path").attr("style", styles);
  }
  rect.select(":nth-child(2)").attr("style", styles);
  shapeSvg.selectAll(".divider").select("path").attr("style", styles);
  if (node.labelStyle) {
    shapeSvg.selectAll("span").attr("style", node.labelStyle);
  } else {
    shapeSvg.selectAll("span").attr("style", styles);
  }
  if (!useHtmlLabels) {
    const colorRegex = RegExp(/color\s*:\s*([^;]*)/);
    const match = colorRegex.exec(styles);
    if (match) {
      const colorStyle = match[0].replace("color", "fill");
      shapeSvg.selectAll("tspan").attr("style", colorStyle);
    } else if (labelStyles) {
      const match2 = colorRegex.exec(labelStyles);
      if (match2) {
        const colorStyle = match2[0].replace("color", "fill");
        shapeSvg.selectAll("tspan").attr("style", colorStyle);
      }
    }
  }
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(classBox, "classBox");
async function requirementBox(parent, node) {
  var _a, _b;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const requirementNode = node;
  const elementNode = node;
  const padding = 20;
  const gap = 20;
  const isRequirementNode = "verifyMethod" in node;
  const classes = getNodeClasses(node);
  const config = getConfig2();
  const { themeVariables } = config;
  const { borderColorArray, requirementEdgeLabelBackground } = themeVariables;
  const bodyTextAlignment = config.layout === "elk" ? "start" : "center";
  const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId ?? node.id);
  let typeHeight;
  if (isRequirementNode) {
    typeHeight = await addText3(
      shapeSvg,
      `&lt;&lt;${requirementNode.type}&gt;&gt;`,
      0,
      node.labelStyle
    );
  } else {
    typeHeight = await addText3(shapeSvg, "&lt;&lt;Element&gt;&gt;", 0, node.labelStyle);
  }
  let accumulativeHeight = typeHeight;
  const nameHeight = await addText3(
    shapeSvg,
    requirementNode.name,
    accumulativeHeight,
    node.labelStyle + "; font-weight: bold;"
  );
  accumulativeHeight += nameHeight + gap;
  if (isRequirementNode) {
    const idHeight = await addText3(
      shapeSvg,
      `${requirementNode.requirementId ? `ID: ${requirementNode.requirementId}` : ""}`,
      accumulativeHeight,
      node.labelStyle,
      bodyTextAlignment
    );
    accumulativeHeight += idHeight;
    const textHeight = await addText3(
      shapeSvg,
      `${requirementNode.text ? `Text: ${requirementNode.text}` : ""}`,
      accumulativeHeight,
      node.labelStyle,
      bodyTextAlignment
    );
    accumulativeHeight += textHeight;
    const riskHeight = await addText3(
      shapeSvg,
      `${requirementNode.risk ? `Risk: ${requirementNode.risk}` : ""}`,
      accumulativeHeight,
      node.labelStyle,
      bodyTextAlignment
    );
    accumulativeHeight += riskHeight;
    await addText3(
      shapeSvg,
      `${requirementNode.verifyMethod ? `Verification: ${requirementNode.verifyMethod}` : ""}`,
      accumulativeHeight,
      node.labelStyle,
      bodyTextAlignment
    );
  } else {
    const typeHeight2 = await addText3(
      shapeSvg,
      `${elementNode.type ? `Type: ${elementNode.type}` : ""}`,
      accumulativeHeight,
      node.labelStyle,
      bodyTextAlignment
    );
    accumulativeHeight += typeHeight2;
    await addText3(
      shapeSvg,
      `${elementNode.docRef ? `Doc Ref: ${elementNode.docRef}` : ""}`,
      accumulativeHeight,
      node.labelStyle,
      bodyTextAlignment
    );
  }
  const totalWidth = (((_a = shapeSvg.node()) == null ? void 0 : _a.getBBox().width) ?? 200) + padding;
  const totalHeight = (((_b = shapeSvg.node()) == null ? void 0 : _b.getBBox().height) ?? 200) + padding;
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughRect = rc.rectangle(x, y, totalWidth, totalHeight, options);
  const rect = shapeSvg.insert(() => roughRect, ":first-child");
  rect.attr("class", "basic label-container outer-path").attr("style", nodeStyles);
  if (borderColorArray == null ? void 0 : borderColorArray.length) {
    const colorIndex = node.colorIndex ?? 0;
    shapeSvg.attr("data-color-id", `color-${colorIndex % borderColorArray.length}`);
  }
  shapeSvg.selectAll(".label").each((_, i, nodes) => {
    const text2 = select_default(nodes[i]);
    const transform = text2.attr("transform");
    let translateX = 0;
    let translateY = 0;
    if (transform) {
      const regex = RegExp(/translate\(([^,]+),([^)]+)\)/);
      const translate = regex.exec(transform);
      if (translate) {
        translateX = parseFloat(translate[1]);
        translateY = parseFloat(translate[2]);
      }
    }
    const newTranslateY = translateY - totalHeight / 2;
    let newTranslateX = x + padding / 2;
    if (i === 0 || i === 1) {
      newTranslateX = translateX;
    }
    text2.attr("transform", `translate(${newTranslateX}, ${newTranslateY + padding})`);
  });
  if (accumulativeHeight > typeHeight + nameHeight + gap) {
    const lineY = y + typeHeight + nameHeight + gap;
    let roughLine;
    if (node.look === "neo") {
      const thickness = 1e-3;
      const polygonPoints = [
        [x, lineY],
        [x + totalWidth, lineY],
        [x + totalWidth, lineY + thickness],
        [x, lineY + thickness]
      ];
      roughLine = rc.polygon(polygonPoints, options);
    } else {
      roughLine = rc.line(x, lineY, x + totalWidth, lineY, options);
    }
    const dividerLine = shapeSvg.insert(() => roughLine);
    dividerLine.attr("class", "divider");
  }
  updateNodeBounds(node, rect);
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  if (nodeStyles && node.look !== "handDrawn" && (requirementEdgeLabelBackground || (borderColorArray == null ? void 0 : borderColorArray.length))) {
    shapeSvg.selectAll("path").attr("style", nodeStyles);
  }
  return shapeSvg;
}
__name(requirementBox, "requirementBox");
async function addText3(parentGroup, inputText, yOffset, style = "", alignment = "center") {
  if (inputText === "") {
    return 0;
  }
  const textEl = parentGroup.insert("g").attr("class", "label").attr("style", style);
  const config = getConfig2();
  const useHtmlLabels = config.htmlLabels ?? true;
  const text2 = await createText(
    textEl,
    sanitizeText3(decodeEntities(inputText)),
    {
      width: calculateTextWidth(inputText, config) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels,
      style
    },
    config
  );
  let bbox;
  if (!useHtmlLabels) {
    const textChild = text2.children[0];
    for (const child of textChild.children) {
      if (style) {
        child.setAttribute("style", style);
      }
    }
    if (alignment === "start") {
      textChild.setAttribute("text-anchor", "start");
      for (const child of textChild.children) {
        child.setAttribute("text-anchor", "start");
      }
    }
    bbox = text2.getBBox();
    bbox.height += 6;
  } else {
    const div = text2.children[0];
    const dv = select_default(text2);
    if (alignment === "start") {
      select_default(div).style("text-align", "left");
    }
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  textEl.attr("transform", `translate(${-bbox.width / 2},${-bbox.height / 2 + yOffset})`);
  return bbox.height;
}
__name(addText3, "addText");
var colorFromPriority = __name((priority) => {
  switch (priority) {
    case "Very High":
      return "red";
    case "High":
      return "orange";
    case "Medium":
      return null;
    case "Low":
      return "blue";
    case "Very Low":
      return "lightblue";
  }
}, "colorFromPriority");
async function kanbanItem(parent, kanbanNode, { config }) {
  var _a, _b;
  const { labelStyles, nodeStyles } = styles2String(kanbanNode);
  kanbanNode.labelStyle = labelStyles || "";
  const labelPaddingX = 10;
  const orgWidth = kanbanNode.width;
  kanbanNode.width = (kanbanNode.width ?? 200) - 10;
  const {
    shapeSvg,
    bbox,
    label: labelElTitle
  } = await labelHelper(parent, kanbanNode, getNodeClasses(kanbanNode));
  const padding = kanbanNode.padding || 10;
  let ticketUrl = "";
  let link;
  if ("ticket" in kanbanNode && kanbanNode.ticket && ((_a = config == null ? void 0 : config.kanban) == null ? void 0 : _a.ticketBaseUrl)) {
    ticketUrl = (_b = config == null ? void 0 : config.kanban) == null ? void 0 : _b.ticketBaseUrl.replace("#TICKET#", kanbanNode.ticket);
    link = shapeSvg.insert("svg:a", ":first-child").attr("class", "kanban-ticket-link").attr("xlink:href", ticketUrl).attr("target", "_blank");
  }
  const options = {
    useHtmlLabels: kanbanNode.useHtmlLabels,
    labelStyle: kanbanNode.labelStyle || "",
    width: kanbanNode.width,
    img: kanbanNode.img,
    padding: kanbanNode.padding || 8,
    centerLabel: false
  };
  let labelEl, bbox2;
  if (link) {
    ({ label: labelEl, bbox: bbox2 } = await insertLabel(
      link,
      "ticket" in kanbanNode && kanbanNode.ticket || "",
      options
    ));
  } else {
    ({ label: labelEl, bbox: bbox2 } = await insertLabel(
      shapeSvg,
      "ticket" in kanbanNode && kanbanNode.ticket || "",
      options
    ));
  }
  const { label: labelElAssigned, bbox: bboxAssigned } = await insertLabel(
    shapeSvg,
    "assigned" in kanbanNode && kanbanNode.assigned || "",
    options
  );
  kanbanNode.width = orgWidth;
  const labelPaddingY = 10;
  const totalWidth = (kanbanNode == null ? void 0 : kanbanNode.width) || 0;
  const heightAdj = Math.max(bbox2.height, bboxAssigned.height) / 2;
  const totalHeight = Math.max(bbox.height + labelPaddingY * 2, (kanbanNode == null ? void 0 : kanbanNode.height) || 0) + heightAdj;
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  labelElTitle.attr(
    "transform",
    "translate(" + (padding - totalWidth / 2) + ", " + (-heightAdj - bbox.height / 2) + ")"
  );
  labelEl.attr(
    "transform",
    "translate(" + (padding - totalWidth / 2) + ", " + (-heightAdj + bbox.height / 2) + ")"
  );
  labelElAssigned.attr(
    "transform",
    "translate(" + (padding + totalWidth / 2 - bboxAssigned.width - 2 * labelPaddingX) + ", " + (-heightAdj + bbox.height / 2) + ")"
  );
  let rect;
  const { rx, ry } = kanbanNode;
  const { cssStyles } = kanbanNode;
  if (kanbanNode.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options2 = userNodeOverrides(kanbanNode, {});
    const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x, y, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x, y, totalWidth, totalHeight, options2);
    rect = shapeSvg.insert(() => roughNode, ":first-child");
    rect.attr("class", "basic label-container").attr("style", cssStyles ? cssStyles : null);
  } else {
    rect = shapeSvg.insert("rect", ":first-child");
    rect.attr("class", "basic label-container __APA__").attr("style", nodeStyles).attr("rx", rx ?? 5).attr("ry", ry ?? 5).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight);
    const priority = "priority" in kanbanNode && kanbanNode.priority;
    if (priority) {
      const line = shapeSvg.append("line");
      const lineX = x + 2;
      const y1 = y + Math.floor((rx ?? 0) / 2);
      const y2 = y + totalHeight - Math.floor((rx ?? 0) / 2);
      line.attr("x1", lineX).attr("y1", y1).attr("x2", lineX).attr("y2", y2).attr("stroke-width", "4").attr("stroke", colorFromPriority(priority));
    }
  }
  updateNodeBounds(kanbanNode, rect);
  kanbanNode.height = totalHeight;
  kanbanNode.intersect = function(point) {
    return intersect_default.rect(kanbanNode, point);
  };
  return shapeSvg;
}
__name(kanbanItem, "kanbanItem");
async function bang(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const w = bbox.width + 10 * halfPadding;
  const h = bbox.height + 8 * halfPadding;
  const r = 0.15 * w;
  const { cssStyles } = node;
  const minWidth = bbox.width + 20;
  const minHeight = bbox.height + 20;
  const effectiveWidth = Math.max(w, minWidth);
  const effectiveHeight = Math.max(h, minHeight);
  label.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2})`);
  let bangElem;
  const path = `M0 0 
    a${r},${r} 1 0,0 ${effectiveWidth * 0.25},${-1 * effectiveHeight * 0.1}
    a${r},${r} 1 0,0 ${effectiveWidth * 0.25},${0}
    a${r},${r} 1 0,0 ${effectiveWidth * 0.25},${0}
    a${r},${r} 1 0,0 ${effectiveWidth * 0.25},${effectiveHeight * 0.1}

    a${r},${r} 1 0,0 ${effectiveWidth * 0.15},${effectiveHeight * 0.33}
    a${r * 0.8},${r * 0.8} 1 0,0 0,${effectiveHeight * 0.34}
    a${r},${r} 1 0,0 ${-1 * effectiveWidth * 0.15},${effectiveHeight * 0.33}

    a${r},${r} 1 0,0 ${-1 * effectiveWidth * 0.25},${effectiveHeight * 0.15}
    a${r},${r} 1 0,0 ${-1 * effectiveWidth * 0.25},0
    a${r},${r} 1 0,0 ${-1 * effectiveWidth * 0.25},0
    a${r},${r} 1 0,0 ${-1 * effectiveWidth * 0.25},${-1 * effectiveHeight * 0.15}

    a${r},${r} 1 0,0 ${-1 * effectiveWidth * 0.1},${-1 * effectiveHeight * 0.33}
    a${r * 0.8},${r * 0.8} 1 0,0 0,${-1 * effectiveHeight * 0.34}
    a${r},${r} 1 0,0 ${effectiveWidth * 0.1},${-1 * effectiveHeight * 0.33}
  H0 V0 Z`;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(path, options);
    bangElem = shapeSvg.insert(() => roughNode, ":first-child");
    bangElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    bangElem = shapeSvg.insert("path", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("d", path);
  }
  bangElem.attr("transform", `translate(${-effectiveWidth / 2}, ${-effectiveHeight / 2})`);
  updateNodeBounds(node, bangElem);
  node.calcIntersect = function(bounds, point) {
    return intersect_default.rect(bounds, point);
  };
  node.intersect = function(point) {
    log.info("Bang intersect", node, point);
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(bang, "bang");
async function cloud(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const w = bbox.width + 2 * halfPadding;
  const h = bbox.height + 2 * halfPadding;
  const r1 = 0.15 * w;
  const r2 = 0.25 * w;
  const r3 = 0.35 * w;
  const r4 = 0.2 * w;
  const { cssStyles } = node;
  let cloudElem;
  const path = `M0 0 
    a${r1},${r1} 0 0,1 ${w * 0.25},${-1 * w * 0.1}
    a${r3},${r3} 1 0,1 ${w * 0.4},${-1 * w * 0.1}
    a${r2},${r2} 1 0,1 ${w * 0.35},${w * 0.2}

    a${r1},${r1} 1 0,1 ${w * 0.15},${h * 0.35}
    a${r4},${r4} 1 0,1 ${-1 * w * 0.15},${h * 0.65}

    a${r2},${r1} 1 0,1 ${-1 * w * 0.25},${w * 0.15}
    a${r3},${r3} 1 0,1 ${-1 * w * 0.5},0
    a${r1},${r1} 1 0,1 ${-1 * w * 0.25},${-1 * w * 0.15}

    a${r1},${r1} 1 0,1 ${-1 * w * 0.1},${-1 * h * 0.35}
    a${r4},${r4} 1 0,1 ${w * 0.1},${-1 * h * 0.65}
  H0 V0 Z`;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(path, options);
    cloudElem = shapeSvg.insert(() => roughNode, ":first-child");
    cloudElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    cloudElem = shapeSvg.insert("path", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("d", path);
  }
  label.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2})`);
  cloudElem.attr("transform", `translate(${-w / 2}, ${-h / 2})`);
  updateNodeBounds(node, cloudElem);
  node.calcIntersect = function(bounds, point) {
    return intersect_default.rect(bounds, point);
  };
  node.intersect = function(point) {
    log.info("Cloud intersect", node, point);
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(cloud, "cloud");
async function defaultMindmapNode(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const w = bbox.width + 8 * halfPadding;
  const h = bbox.height + 2 * halfPadding;
  const rd = 5;
  const rectPath = node.look === "neo" ? `
    M${-w / 2} ${h / 2 - rd}
    v${-h + 2 * rd}
    q0,-${rd} ${rd},-${rd}
    h${w - 2 * rd}
    q${rd},0 ${rd},${rd}
    v${h - rd}
    H${-w / 2}
    Z
  ` : `
    M${-w / 2} ${h / 2 - rd}
    v${-h + 2 * rd}
    q0,-${rd} ${rd},-${rd}
    h${w - 2 * rd}
    q${rd},0 ${rd},${rd}
    v${h - 2 * rd}
    q0,${rd} ${-rd},${rd}
    h${-(w - 2 * rd)}
    q${-rd},0 ${-rd},${-rd}
    Z
  `;
  if (!node.domId) {
    throw new Error(
      `defaultMindmapNode: node "${node.id}" is missing a domId — was render.ts domId prefixing skipped?`
    );
  }
  const bg = shapeSvg.append("path").attr("id", node.domId).attr("class", "node-bkg node-" + node.type).attr("style", nodeStyles).attr("d", rectPath);
  shapeSvg.append("line").attr("class", "node-line-").attr("x1", -w / 2).attr("y1", h / 2).attr("x2", w / 2).attr("y2", h / 2);
  label.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2})`);
  shapeSvg.append(() => label.node());
  updateNodeBounds(node, bg);
  node.calcIntersect = function(bounds, point) {
    return intersect_default.rect(bounds, point);
  };
  node.intersect = function(point) {
    return intersect_default.rect(node, point);
  };
  return shapeSvg;
}
__name(defaultMindmapNode, "defaultMindmapNode");
async function mindmapCircle(parent, node) {
  const options = {
    padding: node.padding ?? 0
  };
  return circle(parent, node, options);
}
__name(mindmapCircle, "mindmapCircle");
var shapesDefs = [
  {
    semanticName: "Process",
    name: "Rectangle",
    shortName: "rect",
    description: "Standard process shape",
    aliases: ["proc", "process", "rectangle"],
    internalAliases: ["squareRect"],
    handler: squareRect
  },
  {
    semanticName: "Event",
    name: "Rounded Rectangle",
    shortName: "rounded",
    description: "Represents an event",
    aliases: ["event"],
    internalAliases: ["roundedRect"],
    handler: roundedRect
  },
  {
    semanticName: "Terminal Point",
    name: "Stadium",
    shortName: "stadium",
    description: "Terminal point",
    aliases: ["terminal", "pill"],
    handler: stadium
  },
  {
    semanticName: "Subprocess",
    name: "Framed Rectangle",
    shortName: "fr-rect",
    description: "Subprocess",
    aliases: ["subprocess", "subproc", "framed-rectangle", "subroutine"],
    handler: subroutine
  },
  {
    semanticName: "Database",
    name: "Cylinder",
    shortName: "cyl",
    description: "Database storage",
    aliases: ["db", "database", "cylinder"],
    handler: cylinder
  },
  {
    semanticName: "Data Store",
    name: "Data Store",
    shortName: "datastore",
    description: "Data flow diagram data store",
    aliases: ["data-store"],
    handler: datastore
  },
  {
    semanticName: "Folder",
    name: "Folder",
    shortName: "folder",
    description: "Folder or directory",
    aliases: ["directory"],
    handler: folder
  },
  {
    semanticName: "Bucket",
    name: "Bucket",
    shortName: "bucket",
    description: "Object storage bucket",
    handler: bucket
  },
  {
    semanticName: "Console",
    name: "Console (terminal window)",
    shortName: "console",
    description: "Terminal or console window",
    handler: consoleWindow
  },
  {
    semanticName: "Browser",
    name: "Browser",
    shortName: "browser",
    description: "Browser window",
    handler: browser
  },
  {
    semanticName: "Person",
    name: "Person",
    shortName: "person",
    description: "Person (circular head above a rounded body)",
    handler: person
  },
  {
    semanticName: "Start",
    name: "Circle",
    shortName: "circle",
    description: "Starting point",
    aliases: ["circ"],
    handler: circle
  },
  {
    semanticName: "Bang",
    name: "Bang",
    shortName: "bang",
    description: "Bang",
    aliases: ["bang"],
    handler: bang
  },
  {
    semanticName: "Cloud",
    name: "Cloud",
    shortName: "cloud",
    description: "cloud",
    aliases: ["cloud"],
    handler: cloud
  },
  {
    semanticName: "Decision",
    name: "Diamond",
    shortName: "diam",
    description: "Decision-making step",
    aliases: ["decision", "diamond", "question"],
    handler: question
  },
  {
    semanticName: "Prepare Conditional",
    name: "Hexagon",
    shortName: "hex",
    description: "Preparation or condition step",
    aliases: ["hexagon", "prepare"],
    handler: hexagon
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Right",
    shortName: "lean-r",
    description: "Represents input or output",
    aliases: ["lean-right", "in-out"],
    internalAliases: ["lean_right"],
    handler: lean_right
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Left",
    shortName: "lean-l",
    description: "Represents output or input",
    aliases: ["lean-left", "out-in"],
    internalAliases: ["lean_left"],
    handler: lean_left
  },
  {
    semanticName: "Priority Action",
    name: "Trapezoid Base Bottom",
    shortName: "trap-b",
    description: "Priority action",
    aliases: ["priority", "trapezoid-bottom", "trapezoid"],
    handler: trapezoid
  },
  {
    semanticName: "Manual Operation",
    name: "Trapezoid Base Top",
    shortName: "trap-t",
    description: "Represents a manual task",
    aliases: ["manual", "trapezoid-top", "inv-trapezoid"],
    internalAliases: ["inv_trapezoid"],
    handler: inv_trapezoid
  },
  {
    semanticName: "Stop",
    name: "Double Circle",
    shortName: "dbl-circ",
    description: "Represents a stop point",
    aliases: ["double-circle"],
    internalAliases: ["doublecircle"],
    handler: doublecircle
  },
  {
    semanticName: "Text Block",
    name: "Text Block",
    shortName: "text",
    description: "Text block",
    handler: text
  },
  {
    semanticName: "Card",
    name: "Notched Rectangle",
    shortName: "notch-rect",
    description: "Represents a card",
    aliases: ["card", "notched-rectangle"],
    handler: card
  },
  {
    semanticName: "Lined/Shaded Process",
    name: "Lined Rectangle",
    shortName: "lin-rect",
    description: "Lined process shape",
    aliases: ["lined-rectangle", "lined-process", "lin-proc", "shaded-process"],
    handler: shadedProcess
  },
  {
    semanticName: "Start",
    name: "Small Circle",
    shortName: "sm-circ",
    description: "Small starting point",
    aliases: ["start", "small-circle"],
    internalAliases: ["stateStart"],
    handler: stateStart
  },
  {
    semanticName: "Stop",
    name: "Framed Circle",
    shortName: "fr-circ",
    description: "Stop point",
    aliases: ["stop", "framed-circle"],
    internalAliases: ["stateEnd"],
    handler: stateEnd
  },
  {
    semanticName: "Fork/Join",
    name: "Filled Rectangle",
    shortName: "fork",
    description: "Fork or join in process flow",
    aliases: ["join"],
    internalAliases: ["forkJoin"],
    handler: forkJoin
  },
  {
    semanticName: "Collate",
    name: "Hourglass",
    shortName: "hourglass",
    description: "Represents a collate operation",
    aliases: ["hourglass", "collate"],
    handler: hourglass
  },
  {
    semanticName: "Comment",
    name: "Curly Brace",
    shortName: "brace",
    description: "Adds a comment",
    aliases: ["comment", "brace-l"],
    handler: curlyBraceLeft
  },
  {
    semanticName: "Comment Right",
    name: "Curly Brace",
    shortName: "brace-r",
    description: "Adds a comment",
    handler: curlyBraceRight
  },
  {
    semanticName: "Comment with braces on both sides",
    name: "Curly Braces",
    shortName: "braces",
    description: "Adds a comment",
    handler: curlyBraces
  },
  {
    semanticName: "Com Link",
    name: "Lightning Bolt",
    shortName: "bolt",
    description: "Communication link",
    aliases: ["com-link", "lightning-bolt"],
    handler: lightningBolt
  },
  {
    semanticName: "Document",
    name: "Document",
    shortName: "doc",
    description: "Represents a document",
    aliases: ["doc", "document"],
    handler: waveEdgedRectangle
  },
  {
    semanticName: "Delay",
    name: "Half-Rounded Rectangle",
    shortName: "delay",
    description: "Represents a delay",
    aliases: ["half-rounded-rectangle"],
    handler: halfRoundedRectangle
  },
  {
    semanticName: "Direct Access Storage",
    name: "Horizontal Cylinder",
    shortName: "h-cyl",
    description: "Direct access storage",
    aliases: ["das", "horizontal-cylinder"],
    handler: tiltedCylinder
  },
  {
    semanticName: "Disk Storage",
    name: "Lined Cylinder",
    shortName: "lin-cyl",
    description: "Disk storage",
    aliases: ["disk", "lined-cylinder"],
    handler: linedCylinder
  },
  {
    semanticName: "Display",
    name: "Curved Trapezoid",
    shortName: "curv-trap",
    description: "Represents a display",
    aliases: ["curved-trapezoid", "display"],
    handler: curvedTrapezoid
  },
  {
    semanticName: "Divided Process",
    name: "Divided Rectangle",
    shortName: "div-rect",
    description: "Divided process shape",
    aliases: ["div-proc", "divided-rectangle", "divided-process"],
    handler: dividedRectangle
  },
  {
    semanticName: "Extract",
    name: "Triangle",
    shortName: "tri",
    description: "Extraction process",
    aliases: ["extract", "triangle"],
    handler: triangle
  },
  {
    semanticName: "Internal Storage",
    name: "Window Pane",
    shortName: "win-pane",
    description: "Internal storage",
    aliases: ["internal-storage", "window-pane"],
    handler: windowPane
  },
  {
    semanticName: "Junction",
    name: "Filled Circle",
    shortName: "f-circ",
    description: "Junction point",
    aliases: ["junction", "filled-circle"],
    handler: filledCircle
  },
  {
    semanticName: "Loop Limit",
    name: "Trapezoidal Pentagon",
    shortName: "notch-pent",
    description: "Loop limit step",
    aliases: ["loop-limit", "notched-pentagon"],
    handler: trapezoidalPentagon
  },
  {
    semanticName: "Manual File",
    name: "Flipped Triangle",
    shortName: "flip-tri",
    description: "Manual file operation",
    aliases: ["manual-file", "flipped-triangle"],
    handler: flippedTriangle
  },
  {
    semanticName: "Manual Input",
    name: "Sloped Rectangle",
    shortName: "sl-rect",
    description: "Manual input step",
    aliases: ["manual-input", "sloped-rectangle"],
    handler: slopedRect
  },
  {
    semanticName: "Multi-Document",
    name: "Stacked Document",
    shortName: "docs",
    description: "Multiple documents",
    aliases: ["documents", "st-doc", "stacked-document"],
    handler: multiWaveEdgedRectangle
  },
  {
    semanticName: "Multi-Process",
    name: "Stacked Rectangle",
    shortName: "st-rect",
    description: "Multiple processes",
    aliases: ["procs", "processes", "stacked-rectangle"],
    handler: multiRect
  },
  {
    semanticName: "Stored Data",
    name: "Bow Tie Rectangle",
    shortName: "bow-rect",
    description: "Stored data",
    aliases: ["stored-data", "bow-tie-rectangle"],
    handler: bowTieRect
  },
  {
    semanticName: "Summary",
    name: "Crossed Circle",
    shortName: "cross-circ",
    description: "Summary",
    aliases: ["summary", "crossed-circle"],
    handler: crossedCircle
  },
  {
    semanticName: "Tagged Document",
    name: "Tagged Document",
    shortName: "tag-doc",
    description: "Tagged document",
    aliases: ["tag-doc", "tagged-document"],
    handler: taggedWaveEdgedRectangle
  },
  {
    semanticName: "Tagged Process",
    name: "Tagged Rectangle",
    shortName: "tag-rect",
    description: "Tagged process",
    aliases: ["tagged-rectangle", "tag-proc", "tagged-process"],
    handler: taggedRect
  },
  {
    semanticName: "Paper Tape",
    name: "Flag",
    shortName: "flag",
    description: "Paper tape",
    aliases: ["paper-tape"],
    handler: waveRectangle
  },
  {
    semanticName: "Odd",
    name: "Odd",
    shortName: "odd",
    description: "Odd shape",
    internalAliases: ["rect_left_inv_arrow"],
    handler: rect_left_inv_arrow
  },
  {
    semanticName: "Lined Document",
    name: "Lined Document",
    shortName: "lin-doc",
    description: "Lined document",
    aliases: ["lined-document"],
    handler: linedWaveEdgedRect
  }
];
var generateShapeMap = __name(() => {
  const undocumentedShapes = {
    // States
    state,
    choice,
    note,
    // Rectangles
    composite,
    rectWithTitle,
    labelRect,
    block_arrow,
    // Collapsed subgraph (flowchart `@{ view: collapsed }`)
    collapsedGroup,
    // Icons
    iconSquare,
    iconCircle,
    icon,
    iconRounded,
    imageSquare,
    anchor,
    // Kanban diagram
    kanbanItem,
    //Mindmap diagram
    mindmapCircle,
    defaultMindmapNode,
    // class diagram
    classBox,
    // er diagram
    erBox,
    // Requirement diagram
    requirementBox,
    // Usecase diagram
    usecaseActor,
    usecaseActorHollow,
    usecaseActorAwesome,
    usecaseActorIcon,
    usecaseBusiness,
    usecaseEllipse,
    usecaseJsonTable
  };
  const entries = [
    ...Object.entries(undocumentedShapes),
    ...shapesDefs.flatMap((shape) => {
      const aliases = [
        shape.shortName,
        ..."aliases" in shape ? shape.aliases : [],
        ..."internalAliases" in shape ? shape.internalAliases : []
      ];
      return aliases.map((alias) => [alias, shape.handler]);
    })
  ];
  return Object.fromEntries(entries);
}, "generateShapeMap");
var shapes = generateShapeMap();
function isValidShape(shape) {
  return shape in shapes;
}
__name(isValidShape, "isValidShape");

export {
  labelHelper,
  updateNodeBounds,
  intersect_rect_default,
  intersect_default,
  createRoundedRectPathD,
  createLabel_default,
  shapes,
  isValidShape
};
//# sourceMappingURL=chunk-H2RFP4YG.js.map
