import {
  getSubGraphTitleMargins
} from "./chunk-33QER2HL.js";
import {
  createLabel_default,
  createRoundedRectPathD,
  intersect_rect_default
} from "./chunk-H2RFP4YG.js";
import {
  at
} from "./chunk-B7KO5YQV.js";
import {
  compileStyles,
  styles2String,
  userNodeOverrides
} from "./chunk-ADFWXOGL.js";
import {
  stampColorSlot
} from "./chunk-E7WPOYWJ.js";
import {
  createText
} from "./chunk-DJ4W7BRS.js";
import {
  evaluate,
  getConfig2,
  getEffectiveHtmlLabels
} from "./chunk-MLEFVBYW.js";
import {
  log,
  select_default
} from "./chunk-3OLEAA6P.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-UA2S7LBM.mjs
var swimlane = __name(async (parent, node) => {
  const siteConfig = getConfig2();
  const { theme, themeVariables, handDrawnSeed } = siteConfig;
  const { clusterBkg, clusterBorder, borderColorArray } = themeVariables;
  const laneStroke = clusterBorder;
  const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster swimlane " + (node.cssClasses || "")).attr("id", node.id).attr("data-id", node.id).attr("data-et", "cluster").attr("data-look", node.look);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const useHtmlLabels = evaluate(siteConfig.flowchart.htmlLabels);
  const isLR = node.direction === "LR";
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label swimlane-label");
  const text = await createText(labelEl, node.label, {
    style: node.labelStyle,
    useHtmlLabels,
    isNode: true,
    width: node.width
  });
  let bbox = text.getBBox();
  if (useHtmlLabels) {
    const div = text.children[0];
    const dv = select_default(text);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const padding = node.padding ?? 0;
  const width = node.width <= bbox.width + padding ? bbox.width + padding : node.width;
  if (node.width <= bbox.width + padding) {
    node.diff = (width - node.width) / 2 - padding;
  } else {
    node.diff = -padding;
  }
  const height = node.height;
  const laneTop = node.y - height / 2;
  const laneBottom = node.y + height / 2;
  const laneLeft = node.x - width / 2;
  const contentTop = node.swimlaneContentTop !== void 0 ? node.swimlaneContentTop : laneTop + height / 3;
  const titlePaddingY = isLR ? 4 : 0;
  const desiredTitleSize = bbox.height + 2 * titlePaddingY;
  let titleRect;
  let bodyRect;
  if (isLR) {
    const titleWidth = Math.max(desiredTitleSize, bbox.height + 2 * titlePaddingY);
    const bodyX = laneLeft + titleWidth;
    const bodyWidth = Math.max(0, width - titleWidth);
    if (node.look === "handDrawn") {
      const rc = at.svg(shapeSvg);
      const titleOptions = userNodeOverrides(node, {
        roughness: 0.7,
        fill: clusterBkg,
        stroke: laneStroke,
        // fillWeight: 3,
        seed: handDrawnSeed
      });
      const bodyOptions = userNodeOverrides(node, {
        roughness: 0.7,
        fill: "none",
        stroke: laneStroke,
        seed: handDrawnSeed
      });
      const roughTitle = rc.rectangle(laneLeft, laneTop, titleWidth, height, titleOptions);
      titleRect = shapeSvg.insert(() => roughTitle, ":first-child").attr("class", "swimlane-title");
      const roughBody = rc.rectangle(bodyX, laneTop, bodyWidth, height, bodyOptions);
      bodyRect = shapeSvg.insert(() => roughBody, ":first-child").attr("class", "swimlane-body");
      titleRect.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
      titleRect.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
    } else {
      titleRect = shapeSvg.insert("rect", ":first-child");
      bodyRect = shapeSvg.insert("rect", ":first-child");
      titleRect.attr("class", "swimlane-title").attr("style", nodeStyles).attr("x", laneLeft).attr("y", laneTop).attr("width", titleWidth).attr("height", height).attr("fill", clusterBkg).attr("stroke", laneStroke);
      bodyRect.attr("class", "swimlane-body").attr("style", nodeStyles).attr("x", bodyX).attr("y", laneTop).attr("width", bodyWidth).attr("height", height).attr("fill", "none").attr("stroke", laneStroke);
    }
    const labelCenterX = laneLeft + titleWidth / 2;
    const labelCenterY = node.y;
    labelEl.attr(
      "transform",
      `translate(${labelCenterX}, ${labelCenterY}) rotate(-90) translate(${-bbox.width / 2}, ${-bbox.height / 2})`
    );
  } else {
    const headerMaxHeight = Math.max(0, contentTop - laneTop);
    const titleHeight = Math.min(desiredTitleSize, headerMaxHeight);
    const bodyY = laneTop + titleHeight;
    const contentHeight = Math.max(0, laneBottom - bodyY);
    const x = node.x - width / 2;
    if (node.look === "handDrawn") {
      const rc = at.svg(shapeSvg);
      const titleOptions = userNodeOverrides(node, {
        roughness: 0.7,
        fill: clusterBkg,
        stroke: laneStroke,
        fillWeight: 3,
        seed: handDrawnSeed
      });
      const bodyOptions = userNodeOverrides(node, {
        roughness: 0.7,
        fill: "none",
        stroke: laneStroke,
        seed: handDrawnSeed
      });
      const roughTitle = rc.rectangle(x, laneTop, width, titleHeight, titleOptions);
      titleRect = shapeSvg.insert(() => roughTitle, ":first-child").attr("class", "swimlane-title");
      const roughBody = rc.rectangle(x, bodyY, width, contentHeight, bodyOptions);
      bodyRect = shapeSvg.insert(() => roughBody, ":first-child").attr("class", "swimlane-body");
      titleRect.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
      titleRect.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
    } else {
      titleRect = shapeSvg.insert("rect", ":first-child");
      bodyRect = shapeSvg.insert("rect", ":first-child");
      titleRect.attr("class", "swimlane-title").attr("style", nodeStyles).attr("x", x).attr("y", laneTop).attr("width", width).attr("height", titleHeight).attr("fill", clusterBkg).attr("stroke", laneStroke);
      bodyRect.attr("class", "swimlane-body").attr("style", nodeStyles).attr("x", x).attr("y", bodyY).attr("width", width).attr("height", contentHeight).attr("fill", "none").attr("stroke", laneStroke);
    }
    const labelX = node.x - bbox.width / 2;
    const labelY = laneTop + (titleHeight - bbox.height) / 2;
    labelEl.attr("transform", `translate(${labelX}, ${labelY})`);
  }
  log.trace("Swimlane data ", node, JSON.stringify(node));
  if (labelStyles) {
    const span = labelEl.select("span");
    if (span) {
      span.attr("style", labelStyles);
    }
  }
  node.offsetX = 0;
  node.width = width;
  node.height = height;
  node.offsetY = bbox.height - padding / 2;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "swimlane");
var rect = __name(async (parent, node) => {
  log.info("Creating subgraph rect for ", node.id, node);
  const siteConfig = getConfig2();
  const { theme, themeVariables, handDrawnSeed } = siteConfig;
  const { clusterBkg, clusterBorder, borderColorArray } = themeVariables;
  const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.domId).attr("data-look", node.look);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const useHtmlLabels = getEffectiveHtmlLabels(siteConfig);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
  let text;
  if (node.labelType === "markdown") {
    text = await createText(labelEl, node.label, {
      style: node.labelStyle,
      useHtmlLabels,
      isNode: true,
      width: node.width
    });
  } else {
    text = await createLabel_default(labelEl, node.label, node.labelStyle || "", false, true);
  }
  let bbox = text.getBBox();
  if (getEffectiveHtmlLabels(siteConfig)) {
    const div = text.children[0];
    const dv = select_default(text);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  log.trace("Data ", node, JSON.stringify(node));
  let rect2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {
      roughness: 0.7,
      fill: clusterBkg,
      // fill: 'red',
      stroke: clusterBorder,
      fillWeight: 3,
      seed: handDrawnSeed
    });
    const roughNode = rc.path(createRoundedRectPathD(x, y, width, height, 0), options);
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
    rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
    rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x).attr("y", y).attr("width", width).attr("height", height);
  }
  const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
  labelEl.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`
  );
  if (labelStyles) {
    const span = labelEl.select("span");
    if (span) {
      span.attr("style", labelStyles);
    }
  }
  const rectBox = rect2.node().getBBox();
  node.offsetX = 0;
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.offsetY = bbox.height - node.padding / 2;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "rect");
var noteGroup = __name((parent, node) => {
  const shapeSvg = parent.insert("g").attr("class", "note-cluster").attr("id", node.domId);
  const rect2 = shapeSvg.insert("rect", ":first-child");
  const padding = 0 * node.padding;
  const halfPadding = padding / 2;
  rect2.attr("rx", node.rx).attr("ry", node.ry).attr("x", node.x - node.width / 2 - halfPadding).attr("y", node.y - node.height / 2 - halfPadding).attr("width", node.width + padding).attr("height", node.height + padding).attr("fill", "none");
  const rectBox = rect2.node().getBBox();
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: { width: 0, height: 0 } };
}, "noteGroup");
var roundedWithTitle = __name(async (parent, node) => {
  const siteConfig = getConfig2();
  const { theme, themeVariables, handDrawnSeed } = siteConfig;
  const {
    altBackground,
    borderColorArray,
    compositeBackground,
    compositeTitleBackground,
    nodeBorder
  } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.domId).attr("data-id", node.id).attr("data-look", node.look);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const outerRectG = shapeSvg.insert("g", ":first-child");
  const label = shapeSvg.insert("g").attr("class", "cluster-label");
  let innerRect = shapeSvg.append("rect");
  const text = await createLabel_default(label, node.label, node.labelStyle, void 0, true);
  let bbox = text.getBBox();
  if (getEffectiveHtmlLabels(siteConfig)) {
    const div = text.children[0];
    const dv = select_default(text);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const padding = 0 * node.padding;
  const halfPadding = padding / 2;
  const width = (node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width) + padding;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height + padding;
  const innerHeight = node.height + padding - bbox.height - 6;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  node.width = width;
  const innerY = node.y - node.height / 2 - halfPadding + bbox.height + 2;
  let rect2;
  if (node.look === "handDrawn") {
    const isAlt = node.cssClasses.includes("statediagram-cluster-alt");
    const rc = at.svg(shapeSvg);
    const roughOuterNode = node.rx || node.ry ? rc.path(createRoundedRectPathD(x, y, width, height, 10), {
      roughness: 0.7,
      fill: compositeTitleBackground,
      fillStyle: "solid",
      stroke: nodeBorder,
      seed: handDrawnSeed
    }) : rc.rectangle(x, y, width, height, { seed: handDrawnSeed });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
    const roughInnerNode = rc.rectangle(x, innerY, width, innerHeight, {
      fill: isAlt ? altBackground : compositeBackground,
      fillStyle: isAlt ? "hachure" : "solid",
      stroke: nodeBorder,
      seed: handDrawnSeed
    });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
    innerRect = shapeSvg.insert(() => roughInnerNode);
    rect2.attr("class", "outer");
    innerRect.attr("class", "inner");
  } else {
    rect2 = outerRectG.insert("rect", ":first-child");
    const outerRectClass = "outer";
    rect2.attr("class", outerRectClass).attr("x", x).attr("y", y).attr("width", width).attr("height", height).attr("data-look", node.look);
    innerRect.attr("class", "inner").attr("x", x).attr("y", innerY).attr("width", width).attr("height", innerHeight);
  }
  label.attr(
    "transform",
    `translate(${node.x - bbox.width / 2}, ${y + 1 - (getEffectiveHtmlLabels(siteConfig) ? 0 : 3)})`
  );
  const rectBox = rect2.node().getBBox();
  node.height = rectBox.height;
  node.offsetX = 0;
  node.offsetY = bbox.height - node.padding / 2;
  node.labelBBox = bbox;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "roundedWithTitle");
var kanbanSection = __name(async (parent, node) => {
  log.info("Creating subgraph rect for ", node.id, node);
  const siteConfig = getConfig2();
  const { themeVariables, handDrawnSeed } = siteConfig;
  const { clusterBkg, clusterBorder } = themeVariables;
  const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.domId).attr("data-look", node.look);
  const useHtmlLabels = getEffectiveHtmlLabels(siteConfig);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
  const text = await createText(labelEl, node.label, {
    style: node.labelStyle,
    useHtmlLabels,
    isNode: true,
    width: node.width
  });
  let bbox = text.getBBox();
  if (getEffectiveHtmlLabels(siteConfig)) {
    const div = text.children[0];
    const dv = select_default(text);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  log.trace("Data ", node, JSON.stringify(node));
  let rect2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {
      roughness: 0.7,
      fill: clusterBkg,
      // fill: 'red',
      stroke: clusterBorder,
      fillWeight: 4,
      seed: handDrawnSeed
    });
    const roughNode = rc.path(createRoundedRectPathD(x, y, width, height, node.rx), options);
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
    rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
    rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x).attr("y", y).attr("width", width).attr("height", height);
  }
  const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
  labelEl.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`
  );
  if (labelStyles) {
    const span = labelEl.select("span");
    if (span) {
      span.attr("style", labelStyles);
    }
  }
  const rectBox = rect2.node().getBBox();
  node.offsetX = 0;
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.offsetY = bbox.height - node.padding / 2;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "kanbanSection");
var divider = __name((parent, node) => {
  const siteConfig = getConfig2();
  const { theme, themeVariables, handDrawnSeed } = siteConfig;
  const { altBackground, nodeBorder, borderColorArray } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.domId).attr("data-look", node.look);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const outerRectG = shapeSvg.insert("g", ":first-child");
  const padding = 0 * node.padding;
  const width = node.width + padding;
  node.diff = -node.padding;
  const height = node.height + padding;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  node.width = width;
  let rect2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughOuterNode = rc.rectangle(x, y, width, height, {
      // The theme's own value, matching what `rect.divider` gets from CSS under the other
      // looks -- and the same fallback. It was hardcoded `lightgrey`, which no dark theme
      // ever asked for; that stayed tolerable only while the fill was sparse hatching, and
      // turns into a bright block on a dark canvas once it is solid.
      fill: altBackground ?? "#efefef",
      // Solid rather than roughjs's default hachure. A hachure fill is drawn as *stroked*
      // lines, so both of the group's paths come out with `fill="none"` and a stylesheet
      // cannot tell the fill from the outline -- which is the same trap documented on
      // `roundedWithTitle`'s inner shape in `state/styles.js`. Solid splits them the way
      // the composite's outer shape already does, so a region can take the palette's tint
      // and border without its hatching being repainted. `roundedWithTitle` fills solid
      // too, except for its deliberately hatched alt variant.
      fillStyle: "solid",
      roughness: 0.5,
      strokeLineDash: [5],
      stroke: nodeBorder,
      seed: handDrawnSeed
    });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child").attr("class", "divider");
  } else {
    rect2 = outerRectG.insert("rect", ":first-child");
    let outerRectClass = "outer";
    if (node.look === "neo") {
      outerRectClass = "divider";
    } else {
      outerRectClass = "divider";
    }
    rect2.attr("class", outerRectClass).attr("x", x).attr("y", y).attr("width", width).attr("height", height).attr("data-look", node.look);
  }
  const rectBox = rect2.node().getBBox();
  node.height = rectBox.height;
  node.offsetX = 0;
  node.offsetY = 0;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: {} };
}, "divider");
var createContainerGroup = __name(async (parent, node, opts) => {
  var _a;
  log.info(`Creating ${opts.cssClass} for `, node.id, node);
  const siteConfig = getConfig2();
  const { theme, themeVariables, handDrawnSeed } = siteConfig;
  const { borderColorArray } = themeVariables;
  const { labelStyles, borderStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster " + opts.cssClass + " " + node.cssClasses).attr("id", node.domId ?? node.id).attr("data-look", node.look);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const useHtmlLabels = getEffectiveHtmlLabels(siteConfig);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label");
  let bbox = { width: 0, height: 0 };
  const hasLabel = (_a = node.label) == null ? void 0 : _a.trim();
  if (hasLabel) {
    let text;
    if (node.labelType === "markdown") {
      text = await createText(labelEl, node.label, {
        style: node.labelStyle,
        useHtmlLabels,
        isNode: true,
        width: node.width
      });
    } else {
      text = await createLabel_default(labelEl, node.label, node.labelStyle || "", false, true);
    }
    bbox = text.getBBox();
    if (useHtmlLabels) {
      const div = text.children[0];
      const dv = select_default(text);
      bbox = div.getBoundingClientRect();
      dv.attr("width", bbox.width);
      dv.attr("height", bbox.height);
    }
  }
  const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  let rectEl;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughOpts = userNodeOverrides(node, {
      roughness: opts.roughness,
      fill: opts.fill,
      stroke: opts.stroke,
      strokeWidth: opts.strokeWidth,
      seed: handDrawnSeed,
      ...opts.fill === "none" ? { fillWeight: 0 } : { fillStyle: "solid" },
      ...opts.strokeDash ? { strokeLineDash: opts.strokeDash } : {}
    });
    const roughNode = rc.path(createRoundedRectPathD(x, y, width, height, opts.rx), roughOpts);
    rectEl = shapeSvg.insert(() => roughNode, ":first-child");
    rectEl.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
  } else {
    rectEl = shapeSvg.insert("rect", ":first-child");
    rectEl.attr("rx", opts.rx).attr("ry", opts.rx).attr("x", x).attr("y", y).attr("width", width).attr("height", height).attr("fill", opts.fill).attr("stroke", opts.stroke).attr("stroke-width", opts.strokeWidth + "px");
    if (opts.strokeDash) {
      rectEl.attr("stroke-dasharray", opts.strokeDash.join(", "));
    }
  }
  if (hasLabel) {
    const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
    labelEl.attr(
      "transform",
      `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`
    );
    if (labelStyles) {
      const span = labelEl.select("span");
      if (span) {
        span.attr("style", labelStyles);
      }
    }
  }
  const rectBox = rectEl.node().getBBox();
  node.offsetX = 0;
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.offsetY = bbox.height - node.padding / 2;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "createContainerGroup");
var flowGroup = __name(async (parent, node) => {
  const { themeVariables } = getConfig2();
  const stroke = themeVariables.flowContainerStroke || themeVariables.secondaryBorderColor;
  return createContainerGroup(parent, node, {
    cssClass: "flow-cluster",
    rx: 10,
    fill: "none",
    stroke,
    strokeWidth: 0.75,
    roughness: 0.7
  });
}, "flowGroup");
var getUsecaseSystemBoundaryGeometry = __name((node, labelBBox) => {
  const boundaryType = node.boundaryType || "rect";
  const horizontalLabelPadding = boundaryType === "package" ? 20 : node.padding;
  const tabHeight = boundaryType === "package" ? labelBBox.height + 10 : 0;
  const width = Math.max(node.width, labelBBox.width + horizontalLabelPadding);
  const height = boundaryType === "package" ? Math.max(node.height, tabHeight + node.padding * 2) : node.height;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  return {
    boundaryType,
    width,
    height,
    x,
    y,
    bodyY: y + tabHeight,
    bodyHeight: height - tabHeight,
    tabHeight,
    tabWidth: boundaryType === "package" ? Math.min(width, Math.max(80, labelBBox.width + 20)) : 0
  };
}, "getUsecaseSystemBoundaryGeometry");
var usecaseSystemBoundary = __name(async (parent, node) => {
  var _a;
  log.info("Creating usecase system boundary for ", node.id, node);
  const siteConfig = getConfig2();
  const { theme, themeVariables, handDrawnSeed } = siteConfig;
  const { clusterBkg, clusterBorder, borderColorArray } = themeVariables;
  const { labelStyles, nodeStyles } = styles2String(node);
  const { stylesMap } = compileStyles(node);
  const boundaryType = node.boundaryType || "rect";
  const shapeSvg = parent.insert("g").attr(
    "class",
    `cluster usecase-system-boundary usecase-system-boundary-${boundaryType} ${node.cssClasses}`
  ).attr("id", typeof node.domId === "string" ? node.domId : node.id).attr("data-boundary-type", boundaryType).attr("data-look", node.look);
  stampColorSlot(shapeSvg, node.colorIndex, theme, borderColorArray);
  const useHtmlLabels = getEffectiveHtmlLabels(siteConfig);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label system-boundary-title");
  const text = await createText(labelEl, node.label, {
    style: labelStyles,
    useHtmlLabels,
    isNode: true
  });
  let bbox = text.getBBox();
  if (useHtmlLabels) {
    const div = text.children[0];
    const dv = select_default(text);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const geometry = getUsecaseSystemBoundaryGeometry(node, bbox);
  const { width, height, x, y, bodyY, bodyHeight, tabHeight, tabWidth } = geometry;
  node.diff = node.width <= bbox.width + node.padding ? (width - node.width) / 2 - node.padding : -node.padding;
  const roughOptions = userNodeOverrides(node, {
    fill: stylesMap.get("fill") || clusterBkg,
    stroke: stylesMap.get("stroke") || clusterBorder,
    strokeWidth: ((_a = stylesMap.get("stroke-width")) == null ? void 0 : _a.replace("px", "")) || 1,
    seed: handDrawnSeed
  });
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughBody = rc.rectangle(x, bodyY, width, bodyHeight, roughOptions);
    shapeSvg.insert(() => roughBody, ":first-child").attr("class", "boundary-body label-container");
    if (boundaryType === "package") {
      const roughTab = rc.rectangle(x, y, tabWidth, tabHeight, roughOptions);
      shapeSvg.insert(() => roughTab, ":first-child").attr("class", "boundary-tab system-boundary-package-tab label-container");
    }
  } else {
    shapeSvg.insert("rect", ":first-child").attr("class", "boundary-body label-container").attr("style", nodeStyles).attr("x", x).attr("y", bodyY).attr("width", width).attr("height", bodyHeight);
    if (boundaryType === "package") {
      shapeSvg.insert("rect", ":first-child").attr("class", "boundary-tab system-boundary-package-tab label-container").attr("style", nodeStyles).attr("x", x).attr("y", y).attr("width", tabWidth).attr("height", tabHeight);
    }
  }
  const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
  if (boundaryType === "package") {
    labelEl.attr(
      "transform",
      `translate(${x + (tabWidth - bbox.width) / 2}, ${y + (tabHeight - bbox.height) / 2})`
    );
  } else {
    labelEl.attr(
      "transform",
      `translate(${node.x - bbox.width / 2}, ${y + subGraphTitleTopMargin})`
    );
  }
  if (labelStyles) {
    labelEl.attr("style", labelStyles);
    labelEl.select("span").attr("style", labelStyles);
  }
  node.offsetX = 0;
  node.width = width;
  node.height = height;
  node.offsetY = bbox.height - node.padding / 2;
  node.labelBBox = bbox;
  node.intersect = function(point) {
    return intersect_rect_default(node, point);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "usecaseSystemBoundary");
var squareRect = rect;
var shapes = {
  rect,
  squareRect,
  roundedWithTitle,
  noteGroup,
  divider,
  kanbanSection,
  flowGroup,
  usecaseSystemBoundary,
  swimlane
};
var UNTITLED_CLUSTER_SHAPES = /* @__PURE__ */ new Set(["noteGroup", "divider"]);
var clusterPaintsTitle = __name((shape) => !UNTITLED_CLUSTER_SHAPES.has(shape ?? "rect"), "clusterPaintsTitle");
var clusterElems = /* @__PURE__ */ new Map();
var insertCluster = __name(async (elem, node) => {
  const shape = node.shape || "rect";
  const cluster = await shapes[shape](elem, node);
  clusterElems.set(node.id, cluster);
  return cluster;
}, "insertCluster");
var clear = __name(() => {
  clusterElems = /* @__PURE__ */ new Map();
}, "clear");

export {
  clusterPaintsTitle,
  insertCluster,
  clear
};
//# sourceMappingURL=chunk-5ITZU7CU.js.map
