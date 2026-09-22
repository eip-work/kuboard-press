import {
  shapes
} from "./chunk-H2RFP4YG.js";
import {
  handleUndefinedAttr
} from "./chunk-OD7WKAUD.js";
import {
  log
} from "./chunk-3OLEAA6P.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-5DYCD2WN.mjs
var getSubGraphTitleMargins = __name(({
  flowchart
}) => {
  var _a, _b;
  const subGraphTitleTopMargin = ((_a = flowchart == null ? void 0 : flowchart.subGraphTitleMargin) == null ? void 0 : _a.top) ?? 0;
  const subGraphTitleBottomMargin = ((_b = flowchart == null ? void 0 : flowchart.subGraphTitleMargin) == null ? void 0 : _b.bottom) ?? 0;
  const subGraphTitleTotalMargin = subGraphTitleTopMargin + subGraphTitleBottomMargin;
  return {
    subGraphTitleTopMargin,
    subGraphTitleBottomMargin,
    subGraphTitleTotalMargin
  };
}, "getSubGraphTitleMargins");
var nodeElems = /* @__PURE__ */ new Map();
async function insertNode(elem, node, renderOptions) {
  let newEl;
  let el;
  if (node.shape === "rect") {
    if (node.rx && node.ry) {
      node.shape = "roundedRect";
    } else {
      node.shape = "squareRect";
    }
  }
  const shapeHandler = node.shape ? shapes[node.shape] : void 0;
  if (!shapeHandler) {
    throw new Error(`No such shape: ${node.shape}. Please check your syntax.`);
  }
  if (node.link) {
    let target;
    if (renderOptions.config.securityLevel === "sandbox") {
      target = "_top";
    } else if (node.linkTarget) {
      target = node.linkTarget || "_blank";
    }
    newEl = elem.insert("svg:a").attr("xlink:href", node.link).attr("target", target ?? null);
    el = await shapeHandler(newEl, node, renderOptions);
  } else {
    el = await shapeHandler(elem, node, renderOptions);
    newEl = el;
  }
  newEl.attr("data-look", handleUndefinedAttr(node.look));
  if (node.tooltip) {
    el.attr("title", node.tooltip);
  }
  nodeElems.set(node.id, newEl);
  if (node.haveCallback) {
    newEl.attr("class", newEl.attr("class") + " clickable");
  }
  return newEl;
}
__name(insertNode, "insertNode");
var setNodeElem = __name((elem, node) => {
  nodeElems.set(node.id, elem);
}, "setNodeElem");
var clear = __name(() => {
  nodeElems.clear();
}, "clear");
var positionNode = __name((node) => {
  const el = nodeElems.get(node.id);
  log.trace(
    "Transforming node",
    node.diff,
    node,
    "translate(" + (node.x - node.width / 2 - 5) + ", " + node.width / 2 + ")"
  );
  const padding = 8;
  const diff = node.diff || 0;
  if (node.clusterNode) {
    el.attr(
      "transform",
      "translate(" + (node.x + diff - node.width / 2) + ", " + (node.y - node.height / 2 - padding) + ")"
    );
  } else {
    el.attr("transform", "translate(" + node.x + ", " + node.y + ")");
  }
  return diff;
}, "positionNode");

export {
  getSubGraphTitleMargins,
  insertNode,
  setNodeElem,
  clear,
  positionNode
};
//# sourceMappingURL=chunk-33QER2HL.js.map
