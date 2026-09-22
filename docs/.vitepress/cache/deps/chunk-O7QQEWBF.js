import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-DUW6YSOI.mjs
var insertLookDefs = __name((svg, config) => {
  const { theme, themeVariables } = config;
  const { useGradient, gradientStart, gradientStop } = themeVariables ?? {};
  const svgId = svg.attr("id");
  const floodColor = (theme == null ? void 0 : theme.includes("dark")) ? "#FFFFFF" : "#000000";
  const dropShadow = __name((id, size, offset) => svg.append("defs").append("filter").attr("id", id).attr("height", size).attr("width", size).append("feDropShadow").attr("dx", offset).attr("dy", offset).attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", floodColor), "dropShadow");
  dropShadow(`${svgId}-drop-shadow`, "130%", "4");
  dropShadow(`${svgId}-drop-shadow-small`, "150%", "2");
  if (!useGradient) {
    return;
  }
  const gradient = svg.append("linearGradient").attr("id", `${svgId}-gradient`).attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
  gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", gradientStart).attr("stop-opacity", 1);
  gradient.append("svg:stop").attr("offset", "100%").attr("stop-color", gradientStop).attr("stop-opacity", 1);
}, "insertLookDefs");

export {
  insertLookDefs
};
//# sourceMappingURL=chunk-O7QQEWBF.js.map
