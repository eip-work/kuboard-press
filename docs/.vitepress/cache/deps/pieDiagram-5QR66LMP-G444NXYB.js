import {
  populateCommonDb
} from "./chunk-HC4X6U3Z.js";
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
  cleanAndMerge,
  parseFontSize
} from "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  clear,
  configureSvgSize,
  defaultConfig_default,
  getAccDescription,
  getAccTitle,
  getConfig2,
  getDiagramTitle,
  setAccDescription,
  setAccTitle,
  setDiagramTitle
} from "./chunk-MLEFVBYW.js";
import {
  arc_default,
  log,
  ordinal,
  pie_default
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/pieDiagram-5QR66LMP.mjs
var DEFAULT_PIE_CONFIG = defaultConfig_default.pie;
var DEFAULT_PIE_DB = {
  sections: /* @__PURE__ */ new Map(),
  showData: false,
  config: DEFAULT_PIE_CONFIG
};
var sections = DEFAULT_PIE_DB.sections;
var showData = DEFAULT_PIE_DB.showData;
var config = structuredClone(DEFAULT_PIE_CONFIG);
var getConfig22 = __name(() => structuredClone(config), "getConfig");
var clear2 = __name(() => {
  sections = /* @__PURE__ */ new Map();
  showData = DEFAULT_PIE_DB.showData;
  clear();
}, "clear");
var addSection = __name(({ label, value }) => {
  if (value < 0) {
    throw new Error(
      `"${label}" has invalid value: ${value}. Negative values are not allowed in pie charts. All slice values must be >= 0.`
    );
  }
  if (!sections.has(label)) {
    sections.set(label, value);
    log.debug(`added new section: ${label}, with value: ${value}`);
  }
}, "addSection");
var getSections = __name(() => sections, "getSections");
var setShowData = __name((toggle) => {
  showData = toggle;
}, "setShowData");
var getShowData = __name(() => showData, "getShowData");
var db = {
  getConfig: getConfig22,
  clear: clear2,
  setDiagramTitle,
  getDiagramTitle,
  setAccTitle,
  getAccTitle,
  setAccDescription,
  getAccDescription,
  addSection,
  getSections,
  setShowData,
  getShowData
};
var populateDb = __name((ast, db2) => {
  populateCommonDb(ast, db2);
  db2.setShowData(ast.showData);
  ast.sections.map(db2.addSection);
}, "populateDb");
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("pie", input);
    log.debug(ast);
    populateDb(ast, db);
  }, "parse")
};
var getStyles = __name((options) => `
  .pieCircle{
    stroke: ${options.pieStrokeColor};
    stroke-width : ${options.pieStrokeWidth};
    opacity : ${options.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${options.pieOuterStrokeColor};
    stroke-width: ${options.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${options.pieTitleTextSize};
    fill: ${options.pieTitleTextColor};
    font-family: ${options.fontFamily};
  }
  .slice {
    font-family: ${options.fontFamily};
    fill: ${options.pieSectionTextColor};
    font-size:${options.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${options.pieLegendTextColor};
    font-family: ${options.fontFamily};
    font-size: ${options.pieLegendTextSize};
  }
`, "getStyles");
var pieStyles_default = getStyles;
var createPieArcs = __name((sections2) => {
  const sum = [...sections2.values()].reduce((acc, val) => acc + val, 0);
  const pieData = [...sections2.entries()].map(([label, value]) => ({ label, value })).filter((d) => d.value / sum * 100 >= 1);
  const pie = pie_default().value((d) => d.value).sort(null);
  return pie(pieData);
}, "createPieArcs");
var draw = __name((text, id, _version, diagObj) => {
  var _a;
  log.debug("rendering pie chart\n" + text);
  const db2 = diagObj.db;
  const globalConfig = getConfig2();
  const pieConfig = cleanAndMerge(db2.getConfig(), globalConfig.pie);
  const MARGIN = 40;
  const LEGEND_RECT_SIZE = 18;
  const LEGEND_SPACING = 4;
  const height = 450;
  const pieWidth = height;
  const svg = selectSvgElement(id);
  const group = svg.append("g");
  group.attr("transform", "translate(" + pieWidth / 2 + "," + height / 2 + ")");
  const { themeVariables } = globalConfig;
  let [outerStrokeWidth] = parseFontSize(themeVariables.pieOuterStrokeWidth);
  outerStrokeWidth ?? (outerStrokeWidth = 2);
  const legendPosition = pieConfig.legendPosition;
  const textPosition = pieConfig.textPosition;
  const innerHole = pieConfig.donutHole > 0 && pieConfig.donutHole <= 0.9 ? pieConfig.donutHole : 0;
  const radius = Math.min(pieWidth, height) / 2 - MARGIN;
  const arcGenerator = arc_default().innerRadius(innerHole * radius).outerRadius(radius);
  const labelArcGenerator = arc_default().innerRadius(radius * textPosition).outerRadius(radius * textPosition);
  const pie = group.append("g");
  pie.append("circle").attr("cx", 0).attr("cy", 0).attr("r", radius + outerStrokeWidth / 2).attr("class", "pieOuterCircle");
  const sections2 = db2.getSections();
  const arcs = createPieArcs(sections2);
  const myGeneratedColors = [
    themeVariables.pie1,
    themeVariables.pie2,
    themeVariables.pie3,
    themeVariables.pie4,
    themeVariables.pie5,
    themeVariables.pie6,
    themeVariables.pie7,
    themeVariables.pie8,
    themeVariables.pie9,
    themeVariables.pie10,
    themeVariables.pie11,
    themeVariables.pie12
  ];
  let sum = 0;
  sections2.forEach((section) => {
    sum += section;
  });
  const filteredArcs = arcs.filter((datum) => (datum.data.value / sum * 100).toFixed(0) !== "0");
  const color = ordinal(myGeneratedColors).domain([
    ...sections2.keys()
  ]);
  pie.selectAll("mySlices").data(filteredArcs).enter().append("path").attr("d", arcGenerator).attr("fill", (datum) => {
    return color(datum.data.label);
  }).attr("class", (datum) => {
    let className = "pieCircle";
    if (pieConfig.highlightSlice === "hover") {
      className += " highlightedOnHover";
    } else if (pieConfig.highlightSlice === datum.data.label) {
      className += " highlighted";
    }
    return className;
  });
  pie.selectAll("mySlices").data(filteredArcs).enter().append("text").text((datum) => {
    return (datum.data.value / sum * 100).toFixed(0) + "%";
  }).attr("transform", (datum) => {
    return "translate(" + labelArcGenerator.centroid(datum) + ")";
  }).style("text-anchor", "middle").attr("class", "slice");
  const titleText = group.append("text").text(db2.getDiagramTitle()).attr("x", 0).attr("y", -(height - 50) / 2).attr("class", "pieTitleText");
  const allSectionData = [...sections2.entries()].map(([label, value]) => ({
    label,
    value
  }));
  const legend = group.selectAll(".legend").data(allSectionData).enter().append("g").attr("class", "legend");
  legend.append("rect").attr("width", LEGEND_RECT_SIZE).attr("height", LEGEND_RECT_SIZE).style("fill", (d) => color(d.label)).style("stroke", (d) => color(d.label));
  legend.append("text").attr("x", LEGEND_RECT_SIZE + LEGEND_SPACING).attr("y", LEGEND_RECT_SIZE - LEGEND_SPACING).text((d) => {
    if (db2.getShowData()) {
      return `${d.label} [${d.value}]`;
    }
    return d.label;
  });
  const longestTextWidth = Math.max(
    ...legend.selectAll("text").nodes().map((node) => (node == null ? void 0 : node.getBoundingClientRect().width) ?? 0)
  );
  let chartAndLegendHeight = height;
  let chartAndLegendWidth = pieWidth + MARGIN;
  const legendHeight = LEGEND_RECT_SIZE + LEGEND_SPACING;
  const totalLegendHeight = allSectionData.length * legendHeight;
  switch (legendPosition) {
    case "center":
      legend.attr("transform", (_datum, index) => {
        const offset = legendHeight * allSectionData.length / 2;
        const horizontal = -longestTextWidth / 2 - (LEGEND_RECT_SIZE + LEGEND_SPACING);
        const vertical = index * legendHeight - offset;
        return "translate(" + horizontal + "," + vertical + ")";
      });
      break;
    case "top":
      chartAndLegendHeight += totalLegendHeight;
      legend.attr("transform", (_datum, index) => {
        const offset = radius;
        const horizontal = -longestTextWidth / 2 - (LEGEND_RECT_SIZE + LEGEND_SPACING);
        const vertical = index * legendHeight - offset;
        return `translate(${horizontal}, ${vertical})`;
      });
      pie.attr("transform", () => {
        return `translate(0, ${totalLegendHeight + legendHeight})`;
      });
      break;
    case "bottom":
      chartAndLegendHeight += totalLegendHeight;
      legend.attr("transform", (_datum, index) => {
        const offset = -radius - legendHeight;
        const horizontal = -longestTextWidth / 2 - (LEGEND_RECT_SIZE + LEGEND_SPACING);
        const vertical = index * legendHeight - offset;
        return "translate(" + horizontal + "," + vertical + ")";
      });
      break;
    case "left":
      chartAndLegendWidth += LEGEND_RECT_SIZE + LEGEND_SPACING + longestTextWidth;
      legend.attr("transform", (_datum, index) => {
        const offset = legendHeight * allSectionData.length / 2;
        const horizontal = -radius - (LEGEND_RECT_SIZE + LEGEND_SPACING);
        const vertical = index * legendHeight - offset;
        return "translate(" + horizontal + "," + vertical + ")";
      });
      pie.attr("transform", () => {
        return `translate(${longestTextWidth + LEGEND_RECT_SIZE + LEGEND_SPACING}, 0)`;
      });
      break;
    case "right":
    default:
      chartAndLegendWidth += LEGEND_RECT_SIZE + LEGEND_SPACING + longestTextWidth;
      legend.attr("transform", (_datum, index) => {
        const offset = legendHeight * allSectionData.length / 2;
        const horizontal = 12 * LEGEND_RECT_SIZE;
        const vertical = index * legendHeight - offset;
        return "translate(" + horizontal + "," + vertical + ")";
      });
      break;
  }
  const titleWidth = ((_a = titleText.node()) == null ? void 0 : _a.getBoundingClientRect().width) ?? 0;
  const titleLeft = pieWidth / 2 - titleWidth / 2;
  const titleRight = pieWidth / 2 + titleWidth / 2;
  const viewBoxX = Math.min(0, titleLeft);
  const viewBoxRight = Math.max(chartAndLegendWidth, titleRight);
  const totalWidth = viewBoxRight - viewBoxX;
  svg.attr("viewBox", `${viewBoxX} 0 ${totalWidth} ${chartAndLegendHeight}`);
  configureSvgSize(svg, chartAndLegendHeight, totalWidth, pieConfig.useMaxWidth);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer,
  styles: pieStyles_default
};
export {
  diagram
};
//# sourceMappingURL=pieDiagram-5QR66LMP-G444NXYB.js.map
