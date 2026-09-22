import {
  configureSvgSize
} from "./chunk-MLEFVBYW.js";
import {
  log
} from "./chunk-3OLEAA6P.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-WEXAMYUT.mjs
var setupViewPortForSVG = __name((svg, padding, cssDiagram, useMaxWidth) => {
  svg.attr("class", cssDiagram);
  const { width, height, x, y } = calculateDimensionsWithPadding(svg, padding);
  configureSvgSize(svg, height, width, useMaxWidth);
  const viewBox = createViewBox(x, y, width, height, padding);
  svg.attr("viewBox", viewBox);
  log.debug(`viewBox configured: ${viewBox} with padding: ${padding}`);
}, "setupViewPortForSVG");
var calculateDimensionsWithPadding = __name((svg, padding) => {
  var _a;
  const bounds = ((_a = svg.node()) == null ? void 0 : _a.getBBox()) || { width: 0, height: 0, x: 0, y: 0 };
  return {
    width: bounds.width + padding * 2,
    height: bounds.height + padding * 2,
    x: bounds.x,
    y: bounds.y
  };
}, "calculateDimensionsWithPadding");
var createViewBox = __name((x, y, width, height, padding) => {
  return `${x - padding} ${y - padding} ${width} ${height}`;
}, "createViewBox");

export {
  setupViewPortForSVG
};
//# sourceMappingURL=chunk-GIPUZ2JZ.js.map
