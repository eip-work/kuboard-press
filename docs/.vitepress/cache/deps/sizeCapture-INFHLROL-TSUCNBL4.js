import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/sizeCapture-INFHLROL.mjs
var DDLT_SIZE_CAPTURE_VERSION = 1;
function getCaptureGlobal() {
  if (typeof globalThis === "undefined") {
    return void 0;
  }
  return globalThis;
}
__name(getCaptureGlobal, "getCaptureGlobal");
function shouldCaptureSizes() {
  var _a;
  return Boolean((_a = getCaptureGlobal()) == null ? void 0 : _a.mermaidCaptureSizes);
}
__name(shouldCaptureSizes, "shouldCaptureSizes");
function capturedFromLocation() {
  if (typeof location === "undefined") {
    return "browser-dev";
  }
  return `${location.pathname}${location.search}`;
}
__name(capturedFromLocation, "capturedFromLocation");
function emitCapturedSizes(captured, element) {
  const g = getCaptureGlobal();
  if (!g) {
    return;
  }
  const domNode = element.node();
  const ownerSvg = (domNode && "ownerSVGElement" in domNode ? domNode.ownerSVGElement : null) ?? domNode;
  const svgId = (ownerSvg == null ? void 0 : ownerSvg.id) ?? "(unknown)";
  g.mermaidCapturedSizes ?? (g.mermaidCapturedSizes = []);
  const entry = { svgId, sizes: captured };
  g.mermaidCapturedSizes.push(entry);
  g.mermaidLastCapturedSizes = entry;
}
__name(emitCapturedSizes, "emitCapturedSizes");
function captureNodeSizes(element, data4Layout) {
  const nodes = [];
  for (const node of data4Layout.nodes) {
    if (node.isGroup) {
      continue;
    }
    nodes.push({ id: node.id, width: node.width ?? 0, height: node.height ?? 0 });
  }
  if (nodes.length === 0) {
    return;
  }
  emitCapturedSizes(
    {
      metadata: {
        captureVersion: DDLT_SIZE_CAPTURE_VERSION,
        capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
        capturedFrom: capturedFromLocation()
      },
      nodes
    },
    element
  );
}
__name(captureNodeSizes, "captureNodeSizes");
export {
  captureNodeSizes,
  shouldCaptureSizes
};
//# sourceMappingURL=sizeCapture-INFHLROL-TSUCNBL4.js.map
