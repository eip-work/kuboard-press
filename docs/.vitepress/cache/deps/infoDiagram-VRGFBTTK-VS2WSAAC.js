import {
  parse
} from "./chunk-CVCV7O6O.js";
import "./chunk-L7LPYUY6.js";
import "./chunk-DHFMRP3C.js";
import "./chunk-Y2ZOYXR2.js";
import "./chunk-UOGIUCQE.js";
import "./chunk-WLIKZ6MH.js";
import "./chunk-PFRXTE3Q.js";
import "./chunk-FHC33HMR.js";
import "./chunk-ZDGHBF5R.js";
import "./chunk-US6HXUBI.js";
import "./chunk-X7SIY3NY.js";
import "./chunk-6GR474LH.js";
import "./chunk-Q6PDWQRS.js";
import "./chunk-75PA7KHD.js";
import "./chunk-V4W6VESI.js";
import "./chunk-PEPNT5DJ.js";
import "./chunk-NF4SJSTG.js";
import {
  selectSvgElement
} from "./chunk-OP7DMO7P.js";
import {
  configureSvgSize
} from "./chunk-MLEFVBYW.js";
import {
  log
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-VRGFBTTK.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "12.0.0" + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-VRGFBTTK-VS2WSAAC.js.map
