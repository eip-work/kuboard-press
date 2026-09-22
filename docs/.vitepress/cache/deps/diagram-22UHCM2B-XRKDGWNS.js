import {
  getIconStyles
} from "./chunk-YMGGJXI6.js";
import {
  createTooltip
} from "./chunk-S6JDT6I4.js";
import {
  getDiagramElement
} from "./chunk-ERF4FMIM.js";
import {
  setupViewPortForSVG
} from "./chunk-GIPUZ2JZ.js";
import {
  JSON_SCHEMA,
  load
} from "./chunk-O54FB4XG.js";
import {
  getRegisteredLayoutAlgorithm,
  render
} from "./chunk-PHTJAK3Q.js";
import "./chunk-O7QQEWBF.js";
import "./chunk-QIPQ2JAZ.js";
import "./chunk-5ITZU7CU.js";
import "./chunk-33QER2HL.js";
import {
  isValidShape
} from "./chunk-H2RFP4YG.js";
import "./chunk-B7KO5YQV.js";
import "./chunk-ADFWXOGL.js";
import {
  colorSlotCount,
  hasPalette,
  isColorTheme,
  safeLook
} from "./chunk-E7WPOYWJ.js";
import "./chunk-DJ4W7BRS.js";
import "./chunk-XCU23T57.js";
import {
  getEdgeId,
  utils_default
} from "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  channel_default,
  clear,
  common_default,
  defaultConfig2,
  getAccDescription,
  getAccTitle,
  getConfig2,
  getDiagramTitle,
  purify,
  rgba_default,
  setAccDescription,
  setAccTitle,
  setConfig2,
  setDiagramTitle
} from "./chunk-MLEFVBYW.js";
import {
  log,
  select_default
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-22UHCM2B.mjs
var AgentflowWarning = {
  /**
   * Shape annotation that v0.8.1 does *not* remove explicitly but the
   * renderer doesn't recognise. The renderer falls back to roundedRect.
   * Distinct from `SHAPE_REMOVED`, which is a hard error.
   */
  SHAPE_UNSUPPORTED: "SHAPE_UNSUPPORTED",
  /**
   * Shape explicitly removed in v0.8.1 (§4.3.3): `doc`, `stadium`,
   * `terminal`, `circle`, `trapezoid`/`inv-trapezoid`, `double-circle`,
   * `typeDeclaration`, `procs`, the five per-kind instance shapes, plus
   * `cylinder`, `ellipse`, `odd`, `lean_left`. Hard error.
   */
  SHAPE_REMOVED: "SHAPE_REMOVED",
  /**
   * Edge operator removed in v0.8.1 (§5.1): `==>`, `~~`, `-.->`, plus
   * marker variants of `--` (`<-->`, `o--o`, `--o`, `-->>`). Hard error.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  EDGE_OPERATOR_UNSUPPORTED: "EDGE_OPERATOR_UNSUPPORTED",
  /**
   * A label was authored on a `-.-` reference edge. Per §5.2 reference
   * edges carry no parameter/channel meaning so a label "would not mean
   * anything"; the label is ignored. Warn tier.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  REFERENCE_EDGE_LABEL_REJECTED: "REFERENCE_EDGE_LABEL_REJECTED",
  /**
   * A `connectorRef` value's prefix (or whole bare-id form) doesn't
   * resolve to a declared `connector`. Per §8.1. Warn-only pre-1.0;
   * error from v1.0.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  CONNECTOR_REF_UNRESOLVED: "CONNECTOR_REF_UNRESOLVED",
  /**
   * A `connectorRef` value resolves to an id that exists but isn't a
   * connector declaration (it's a vertex, flow, etc.). Per §8.1
   * connectors must be declared with the `connector` keyword. Warn pre-
   * 1.0; error from v1.0.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  CONNECTOR_REF_NOT_A_CONNECTOR: "CONNECTOR_REF_NOT_A_CONNECTOR",
  /**
   * A known domain metadata key appears on an element kind it isn't
   * declared for per the §10 applicability table (e.g. `params` on a
   * `refdoc`, or `protocol` on a `flow`). Universal keys (`description`,
   * `instruction`, plus structural and presentation controls) are
   * excluded. Warn pre-1.0; error from v1.0.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  METADATA_KEY_MISAPPLIED: "METADATA_KEY_MISAPPLIED",
  /**
   * Two declarations in the node-or-container namespace (§9) share an
   * id — e.g. two `a["..."]` vertex declarations, or a vertex and a
   * container with the same id. Implicit vertices created by edge
   * resolution do not count as declarations. Warn-only pre-1.0; error
   * from v1.0 behind `agentflow.strictIds`.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  DUPLICATE_ID_NODE: "DUPLICATE_ID_NODE",
  /**
   * An author declared an id reserved for synthetic renderer output.
   * v0.8.1 keeps `connectors` reserved through pre-1.0 even though the
   * real `connector` keyword removes the synthesised group; reservation
   * stays for forward compat. Warn-only.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  RESERVED_SYNTHETIC_ID: "RESERVED_SYNTHETIC_ID",
  /**
   * A container's child violates the §3.3 containment matrix. In v0.8.1
   * the matrix is trivial — only `flow` is a container, and it accepts
   * nested `flow` plus any node. Warn-only pre-1.0; error from v1.0
   * behind `agentflow.strictContainment`.
   */
  CONTAINMENT_VIOLATION: "CONTAINMENT_VIOLATION",
  /**
   * An edge's §5.1 semantic is incompatible with the kinds of its
   * endpoints. v0.8.1 covers two cases:
   *
   * - A `-.-` reference edge has no `refdoc`-shape endpoint (the only
   *   meaningful target for §16.2 reference-document attachment).
   * - A `--x` failure edge originates from a non-flow endpoint.
   *
   * Warn-only pre-1.0; error from v1.0 behind the future
   * `agentflow.strictEdgeSemantics` flag.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  EDGE_SEMANTIC_CONTRADICTION: "EDGE_SEMANTIC_CONTRADICTION",
  /**
   * A `flow` container's tree contains no input node (`shape: input`,
   * canonical `lean-right`). Per §10.2 a flow must declare its required
   * inputs; the runtime / editor prompts the user for any missing
   * values. Warn pre-1.0; error from v1.0.
   *
   * Reserved — emitted by the semantics module, never by this package.
   */
  FLOW_NO_INPUT: "FLOW_NO_INPUT"
};
var PARSER_EMITTED_DIAGNOSTICS = /* @__PURE__ */ new Set([
  AgentflowWarning.SHAPE_UNSUPPORTED,
  AgentflowWarning.SHAPE_REMOVED,
  AgentflowWarning.CONTAINMENT_VIOLATION
]);
var RESERVED_DIAGNOSTICS = new Set(
  Object.values(AgentflowWarning).filter(
    (id) => !PARSER_EMITTED_DIAGNOSTICS.has(id)
  )
);
var SHAPE_ALIASES = /* @__PURE__ */ new Map([
  ["task", "roundedRect"],
  ["tool", "subroutine"],
  ["input", "lean-right"],
  ["decision", "diamond"],
  ["refdoc", "lin-doc"],
  ["action", "hexagon"],
  ["round", "rect"]
]);
var REMOVED_SHAPES = /* @__PURE__ */ new Set([
  "doc",
  "stadium",
  "terminal",
  "circle",
  "trapezoid",
  "inv_trapezoid",
  "inv-trapezoid",
  "doublecircle",
  "double-circle",
  "typeDeclaration",
  "procs",
  "lean_left",
  "lean-left",
  "in-out",
  "cylinder",
  "ellipse",
  "odd",
  // Instance shapes — instancing mechanism removed entirely.
  "tag-rect",
  "tagged-rectangle",
  "delay",
  "half-rounded-rectangle",
  "lin-rect",
  "lined-rectangle",
  "win-pane",
  "window-pane",
  "curv-trap",
  "curved-trapezoid"
]);
var ALLOWED_SHAPES = /* @__PURE__ */ new Set([
  "roundedRect",
  "subroutine",
  "subprocess",
  "subproc",
  "framed-rectangle",
  "lean-right",
  "diamond",
  "lin-doc",
  "lined-document",
  "hexagon",
  "hex",
  "connector",
  // Collapsed flow container
  "collapsedGroup"
]);
var DEFAULT_SHAPE = "roundedRect";
function resolveShapeAlias(shape) {
  if (!shape) {
    return shape;
  }
  return SHAPE_ALIASES.get(shape) ?? shape;
}
__name(resolveShapeAlias, "resolveShapeAlias");
function normaliseNodeShapes(nodes, sink) {
  for (const node of nodes) {
    if (node.isGroup) {
      continue;
    }
    if (!node.shape || node.shape === "squareRect" || node.shape === "rect") {
      node.shape = DEFAULT_SHAPE;
    }
    if (REMOVED_SHAPES.has(node.shape)) {
      const msg = `shape "${node.shape}" was removed in v0.8.1, using "${DEFAULT_SHAPE}"`;
      if (sink == null ? void 0 : sink.emitError) {
        sink.emitError("SHAPE_REMOVED", msg, { nodeId: node.id });
      } else {
        log.warn(`agentflow: ${msg}`);
      }
      node.shape = DEFAULT_SHAPE;
      continue;
    }
    if (!ALLOWED_SHAPES.has(node.shape)) {
      const msg = `shape "${node.shape}" is not supported, using "${DEFAULT_SHAPE}"`;
      if (sink == null ? void 0 : sink.emitWarning) {
        sink.emitWarning("SHAPE_UNSUPPORTED", msg, { nodeId: node.id });
      } else {
        log.warn(`agentflow: ${msg}`);
      }
      node.shape = DEFAULT_SHAPE;
    }
  }
}
__name(normaliseNodeShapes, "normaliseNodeShapes");
var KIND_SLOT = /* @__PURE__ */ new Map([
  ["tool", 0],
  ["task", 1],
  ["decision", 2],
  ["input", 3],
  ["refdoc", 4],
  ["connector", 5],
  ["action", 6]
]);
var KIND_COUNT = KIND_SLOT.size;
var kindClass = __name((kind) => `af-kind-${kind}`, "kindClass");
var KINDS = [...KIND_SLOT.keys()];
var containerSlotCount = __name((paletteLength) => Math.max(1, paletteLength - KIND_COUNT), "containerSlotCount");
var containerSlot = __name((n, paletteLength) => {
  const slot = KIND_COUNT + n % containerSlotCount(paletteLength);
  return paletteLength > 0 ? slot % paletteLength : slot;
}, "containerSlot");
function assignColorSlots(nodes, kindOf, containerOrder) {
  var _a2;
  const palette = (_a2 = getConfig2().themeVariables) == null ? void 0 : _a2.borderColorArray;
  const paletteLength = Array.isArray(palette) ? palette.length : 0;
  let fallbackOrdinal = containerOrder.size;
  for (const node of nodes ?? []) {
    if (node.isGroup || node.shape === "collapsedGroup") {
      const n = containerOrder.get(String(node.id)) ?? fallbackOrdinal++;
      node.colorIndex = containerSlot(n, paletteLength);
      continue;
    }
    const kind = kindOf(String(node.id));
    if (kind && KIND_SLOT.has(kind)) {
      node.cssClasses = `${node.cssClasses ?? ""} ${kindClass(kind)}`.replace(/\s+/g, " ").trim();
    }
  }
}
__name(assignColorSlots, "assignColorSlots");
var MERMAID_DOM_ID_PREFIX = "agentflow-";
var SEMANTIC_METADATA_SKIP_KEYS = /* @__PURE__ */ new Set([
  "shape",
  "view",
  "icon",
  "img",
  "form",
  "pos",
  "w",
  "h",
  "class",
  "style",
  "labelType"
]);
var SUBROUTINE_ALIASES = /* @__PURE__ */ new Set([
  "subroutine",
  "subprocess",
  "subproc",
  "framed-rectangle",
  "tool"
]);
var SUBGRAPH_TYPE_TO_SHAPE = {
  flow: "flowGroup"
};
function stripPrototypeKeys(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => stripPrototypeKeys(entry));
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  const clean = {};
  for (const key of Object.keys(value)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    clean[key] = stripPrototypeKeys(value[key]);
  }
  return clean;
}
__name(stripPrototypeKeys, "stripPrototypeKeys");
function stripLineTrailingCommas(body) {
  let inSingle = false;
  let inDouble = false;
  let flowDepth = 0;
  let blockScalarIndent;
  const out = [];
  for (const line of body.split("\n")) {
    if (blockScalarIndent !== void 0) {
      const indent = line.length - line.trimStart().length;
      if (line.trim() === "" || indent > blockScalarIndent) {
        out.push(line);
        continue;
      }
      blockScalarIndent = void 0;
    }
    let commentStart = -1;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inDouble) {
        if (ch === "\\") {
          i++;
        } else if (ch === '"') {
          inDouble = false;
        }
      } else if (inSingle) {
        if (ch === "'") {
          inSingle = false;
        }
      } else if (ch === '"') {
        inDouble = true;
      } else if (ch === "'") {
        inSingle = true;
      } else if (ch === "#" && (i === 0 || line[i - 1] === " " || line[i - 1] === "	")) {
        commentStart = i;
        break;
      } else if (ch === "[" || ch === "{") {
        flowDepth++;
      } else if (ch === "]" || ch === "}") {
        flowDepth = Math.max(0, flowDepth - 1);
      }
    }
    if (inSingle || inDouble || flowDepth > 0) {
      out.push(line);
      continue;
    }
    const code = commentStart >= 0 ? line.slice(0, commentStart) : line;
    const comment = commentStart >= 0 ? line.slice(commentStart) : "";
    if (/:\s*[>|][\d+-]*\s*$/.test(code)) {
      blockScalarIndent = line.length - line.trimStart().length;
      out.push(line);
      continue;
    }
    out.push(code.replace(/,([\t ]*)$/, "$1") + comment);
  }
  return out.join("\n");
}
__name(stripLineTrailingCommas, "stripLineTrailingCommas");
var _a;
var AgentFlowDB = (_a = class {
  // cspell:ignore funs
  constructor() {
    this.vertexCounter = 0;
    this.config = getConfig2();
    this.vertices = /* @__PURE__ */ new Map();
    this.edges = [];
    this.classes = /* @__PURE__ */ new Map();
    this.subGraphs = [];
    this.subGraphLookup = /* @__PURE__ */ new Map();
    this.globalNodes = /* @__PURE__ */ new Set();
    this.connectors = /* @__PURE__ */ new Map();
    this.tooltips = /* @__PURE__ */ new Map();
    this.subCount = 0;
    this.firstGraphFlag = true;
    this.secCount = -1;
    this.posCrossRef = [];
    this.diagramId = "";
    this.preserveCommentsWhenParsing = true;
    this.frontmatterLineOffset = 0;
    this.elementMappings = [];
    this.bareVertexMappings = /* @__PURE__ */ new WeakSet();
    this.diagnostics = [];
    this.postParseValidationRun = false;
    this.funs = [];
    this.setAccTitle = setAccTitle;
    this.setAccDescription = setAccDescription;
    this.setDiagramTitle = setDiagramTitle;
    this.getAccTitle = getAccTitle;
    this.getAccDescription = getAccDescription;
    this.getDiagramTitle = getDiagramTitle;
    this.funs.push(this.setupToolTips.bind(this));
    this.addVertex = this.addVertex.bind(this);
    this.firstGraph = this.firstGraph.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.addSubGraph = this.addSubGraph.bind(this);
    this.addGlobal = this.addGlobal.bind(this);
    this.addConnector = this.addConnector.bind(this);
    this.addConnectorMapping = this.addConnectorMapping.bind(this);
    this.addLink = this.addLink.bind(this);
    this.setLink = this.setLink.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.addClass = this.addClass.bind(this);
    this.setClass = this.setClass.bind(this);
    this.destructLink = this.destructLink.bind(this);
    this.setClickEvent = this.setClickEvent.bind(this);
    this.setTooltip = this.setTooltip.bind(this);
    this.updateLinkInterpolate = this.updateLinkInterpolate.bind(this);
    this.setClickFun = this.setClickFun.bind(this);
    this.bindFunctions = this.bindFunctions.bind(this);
    this.setFrontmatterLineOffset = this.setFrontmatterLineOffset.bind(this);
    this.addVertexMapping = this.addVertexMapping.bind(this);
    this.extendVertexMapping = this.extendVertexMapping.bind(this);
    this.addEdgeMapping = this.addEdgeMapping.bind(this);
    this.addSubgraphMapping = this.addSubgraphMapping.bind(this);
    this.emitWarning = this.emitWarning.bind(this);
    this.emitError = this.emitError.bind(this);
    this.getDiagnostics = this.getDiagnostics.bind(this);
    this.lex = {
      firstGraph: this.firstGraph.bind(this)
    };
    this.clear();
    this.setGen("gen-2");
  }
  sanitizeText(txt) {
    return common_default.sanitizeText(txt, this.config);
  }
  sanitizeNodeLabelType(labelType) {
    switch (labelType) {
      case "markdown":
      case "string":
      case "text":
        return labelType;
      default:
        return "markdown";
    }
  }
  /**
   * Sets the diagram's SVG element ID, used to prefix domIds for uniqueness
   * across multiple diagrams on the same page.
   */
  setDiagramId(svgElementId) {
    this.diagramId = svgElementId;
  }
  /**
   * Function to lookup domId from id in the graph definition.
   * When diagramId is set, returns the prefixed version for DOM uniqueness.
   *
   * @param id - id of the node
   */
  lookUpDomId(id) {
    for (const vertex of this.vertices.values()) {
      if (vertex.id === id) {
        return this.diagramId ? `${this.diagramId}-${vertex.domId}` : vertex.domId;
      }
    }
    return this.diagramId ? `${this.diagramId}-${id}` : id;
  }
  /**
   * Function called by parser when a node definition has been found
   */
  addVertex(id, textObj, type, style, classes, dir, props = {}, metadata, metadataLoc) {
    if (!id || id.trim().length === 0) {
      return;
    }
    let doc;
    if (metadata !== void 0) {
      let yamlData;
      if (!metadata.includes("\n")) {
        yamlData = "{\n" + metadata + "\n}";
      } else {
        yamlData = metadata + "\n";
      }
      try {
        doc = load(yamlData, { schema: JSON_SCHEMA }) ?? {};
      } catch (err) {
        const stripped = metadata.includes("\n") ? stripLineTrailingCommas(metadata) : metadata;
        if (stripped !== metadata) {
          try {
            doc = load(stripped + "\n", { schema: JSON_SCHEMA }) ?? {};
          } catch {
            this.rethrowMetadataYamlError(err, metadata, metadataLoc);
          }
        } else {
          this.rethrowMetadataYamlError(err, metadata, metadataLoc);
        }
      }
      doc = stripPrototypeKeys(doc);
    }
    let authoredShape;
    if (doc && typeof doc.shape === "string") {
      const docRec = doc;
      authoredShape = docRec.shape;
      const resolved = resolveShapeAlias(authoredShape);
      if (resolved && resolved !== authoredShape) {
        docRec.shape = resolved;
      }
    }
    const subGraph = this.subGraphLookup.get(id);
    if (subGraph && doc) {
      subGraph.metadata = { ...subGraph.metadata, ...doc };
      return;
    }
    const connector = this.connectors.get(id);
    if (connector && doc) {
      connector.metadata = {
        ...connector.metadata,
        ...doc
      };
      return;
    }
    if (id === "connectors") {
      return;
    }
    const edge = this.edges.find((e) => e.id === id);
    if (edge) {
      const edgeDoc = doc;
      if ((edgeDoc == null ? void 0 : edgeDoc.animate) !== void 0) {
        edge.animate = edgeDoc.animate;
      }
      if ((edgeDoc == null ? void 0 : edgeDoc.animation) !== void 0) {
        edge.animation = edgeDoc.animation;
      }
      if ((edgeDoc == null ? void 0 : edgeDoc.curve) !== void 0) {
        edge.interpolate = edgeDoc.curve;
      }
      if (doc) {
        edge.metadata = { ...edge.metadata, ...doc };
      }
      return;
    }
    let txt;
    let vertex = this.vertices.get(id);
    if (vertex === void 0) {
      vertex = {
        id,
        labelType: "text",
        domId: MERMAID_DOM_ID_PREFIX + id + "-" + this.vertexCounter,
        styles: [],
        classes: []
      };
      this.vertices.set(id, vertex);
    }
    this.vertexCounter++;
    if (textObj !== void 0) {
      this.config = getConfig2();
      txt = this.sanitizeText(textObj.text.trim());
      vertex.labelType = textObj.type;
      if (txt.startsWith('"') && txt.endsWith('"')) {
        txt = txt.substring(1, txt.length - 1);
      }
      vertex.text = txt;
    } else {
      if (vertex.text === void 0) {
        vertex.text = id;
      }
    }
    if (type !== void 0) {
      vertex.type = type;
    }
    if (style !== void 0 && style !== null) {
      style.forEach((s) => {
        vertex.styles.push(s);
      });
    }
    if (classes !== void 0 && classes !== null) {
      classes.forEach((s) => {
        vertex.classes.push(s);
      });
    }
    if (dir !== void 0) {
      vertex.dir = dir;
    }
    if (vertex.props === void 0) {
      vertex.props = props;
    } else if (props !== void 0) {
      Object.assign(vertex.props, props);
    }
    if (doc) {
      vertex.metadata = { ...vertex.metadata, ...doc };
      if (doc.shape) {
        const authored = authoredShape ?? doc.shape;
        if (typeof authored !== "string") {
          throw this.positionedShapeError(
            `No such shape: ${JSON.stringify(authored)}.`,
            metadataLoc
          );
        }
        if (authored !== authored.toLowerCase() || authored.includes("_")) {
          throw this.positionedShapeError(
            `No such shape: ${authored}. Shape names should be lowercase.`,
            metadataLoc
          );
        } else if (!isValidShape(doc.shape)) {
          throw this.positionedShapeError(`No such shape: ${doc.shape}.`, metadataLoc);
        }
        vertex.type = doc == null ? void 0 : doc.shape;
      }
      if (doc == null ? void 0 : doc.label) {
        vertex.text = this.sanitizeText(doc.label);
        vertex.labelType = this.sanitizeNodeLabelType(doc == null ? void 0 : doc.labelType);
      }
    }
  }
  /**
   * Translate a js-yaml failure raised while parsing an `<id>@{ ... }` block
   * from block-relative coordinates into absolute source coordinates, then
   * rethrow (issue #56 part 2).
   *
   * js-yaml's `mark.line` / `mark.column` (and the `(R:C)` reference plus the
   * `N |` excerpt prefixes baked into `message`) count from the start of the
   * block buffer the DB hands it — either the synthetic `{\n … \n}` wrapper
   * (single-line `@{ … }`) or the verbatim multi-line body. Neither matches
   * the line the user sees. Using the `shapeData` symbol's JISON location
   * (`@{`'s position) plus the frontmatter offset, we map the reported
   * coordinate back to source space, rewrite the message's `(R:C)` and excerpt
   * prefixes, update `mark`, and attach a JISON-style `hash.loc` so downstream
   * tooling can read source coordinates structurally instead of re-deriving
   * them from the buffer.
   *
   * Defensive: if the error isn't a positioned js-yaml exception, or we lack
   * the block location, the original error propagates untouched — translation
   * never makes a failure harder to read than it already was.
   */
  /**
   * Build a shape error carrying a JISON-shaped `hash.loc`, so the position is
   * readable structurally rather than only as prose. Mirrors what
   * `rethrowMetadataYamlError` attaches for YAML failures.
   */
  positionedShapeError(message, metadataLoc) {
    const error = new Error(message);
    if (!metadataLoc) {
      return error;
    }
    const line = metadataLoc.first_line + this.frontmatterLineOffset;
    Object.assign(error, {
      hash: {
        text: "",
        token: null,
        line: line - 1,
        loc: {
          first_line: line,
          last_line: metadataLoc.last_line + this.frontmatterLineOffset,
          first_column: metadataLoc.first_column,
          last_column: metadataLoc.last_column
        },
        expected: []
      }
    });
    return error;
  }
  rethrowMetadataYamlError(err, metadata, metadataLoc) {
    const ex = err;
    if (!ex || ex.name !== "YAMLException" || !ex.mark || !metadataLoc) {
      throw err;
    }
    let translation;
    try {
      const isInline = !metadata.includes("\n");
      const buffer = isInline ? "{\n" + metadata + "\n}" : metadata + "\n";
      const blockLine = metadataLoc.first_line + this.frontmatterLineOffset;
      const contentColumn = metadataLoc.first_column + 2;
      const toSource = __name((line, column) => {
        if (isInline) {
          return { line: blockLine, column: contentColumn + (line === 1 ? column : 0) };
        }
        return {
          line: blockLine + line,
          column: line === 0 ? contentColumn + column : column
        };
      }, "toSource");
      const src = toSource(ex.mark.line, ex.mark.column);
      const reason = ex.reason ?? (ex.message ?? "").split("\n")[0].replace(/\s*\(\d+:\d+\)\s*$/, "");
      const bufferLines = buffer.split("\n");
      const display = [];
      if (isInline) {
        display.push(1);
      } else {
        for (let i = ex.mark.line - 1; i <= ex.mark.line + 1; i++) {
          if (i < 0 || i >= bufferLines.length) {
            continue;
          }
          if (i === bufferLines.length - 1 && bufferLines[i] === "" && i !== ex.mark.line) {
            continue;
          }
          display.push(i);
        }
      }
      const gutterWidth = Math.max(...display.map((i) => String(toSource(i, 0).line).length));
      const snippet = [];
      for (const i of display) {
        const lineNo = toSource(i, 0).line;
        const prefix = ` ${String(lineNo).padStart(gutterWidth)} | `;
        snippet.push(prefix + bufferLines[i].replace(/\t/g, "→"));
        if (i === ex.mark.line) {
          snippet.push("-".repeat(prefix.length + ex.mark.column) + "^");
        }
      }
      translation = {
        message: `${reason} (${src.line}:${src.column + 1})

${snippet.join("\n")}`,
        markLine: src.line - 1,
        markColumn: src.column,
        // JISON-style hash so editors can consume source coordinates directly.
        hash: {
          text: "",
          token: null,
          line: src.line - 1,
          loc: {
            first_line: src.line,
            last_line: src.line,
            first_column: src.column,
            last_column: src.column + 1
          },
          expected: []
        }
      };
    } catch {
    }
    if (translation) {
      ex.message = translation.message;
      ex.mark.line = translation.markLine;
      ex.mark.column = translation.markColumn;
      ex.hash = translation.hash;
    }
    throw ex;
  }
  /**
   * Function called by parser when a link/edge definition has been found
   *
   */
  addSingleLink(_start, _end, type, id) {
    const start = _start;
    const end = _end;
    const edge = {
      start,
      end,
      type: void 0,
      text: "",
      labelType: "text",
      classes: [],
      isUserDefinedId: false,
      interpolate: this.edges.defaultInterpolate
    };
    log.info("abc78 Got edge...", edge);
    const linkTextObj = type.text;
    if (linkTextObj !== void 0) {
      edge.text = this.sanitizeText(linkTextObj.text.trim());
      if (edge.text.startsWith('"') && edge.text.endsWith('"')) {
        edge.text = edge.text.substring(1, edge.text.length - 1);
      }
      edge.labelType = this.sanitizeNodeLabelType(linkTextObj.type);
    }
    if (type !== void 0) {
      edge.type = type.type;
      edge.stroke = type.stroke;
      edge.length = type.length > 10 ? 10 : type.length;
      if (type.edgeSemantic) {
        edge.edgeSemantic = type.edgeSemantic;
      }
    }
    if (id && !this.edges.some((e) => e.id === id)) {
      edge.id = id;
      edge.isUserDefinedId = true;
    } else {
      const existingLinks = this.edges.filter((e) => e.start === edge.start && e.end === edge.end);
      if (existingLinks.length === 0) {
        edge.id = getEdgeId(edge.start, edge.end, { counter: 0, prefix: "L" });
      } else {
        edge.id = getEdgeId(edge.start, edge.end, {
          counter: existingLinks.length + 1,
          prefix: "L"
        });
      }
    }
    if (this.edges.length < (this.config.maxEdges ?? 500)) {
      log.info("Pushing edge...");
      this.edges.push(edge);
    } else {
      throw new Error(
        `Edge limit exceeded. ${this.edges.length} edges found, but the limit is ${this.config.maxEdges}.

Initialize mermaid with maxEdges set to a higher number to allow more edges.
You cannot set this config via configuration inside the diagram as it is a secure config.
You have to call mermaid.initialize.`
      );
    }
  }
  isLinkData(value) {
    return value !== null && typeof value === "object" && "id" in value && typeof value.id === "string";
  }
  addLink(_start, _end, linkData) {
    const id = this.isLinkData(linkData) ? linkData.id.replace("@", "") : void 0;
    log.info("addLink", _start, _end, id);
    for (const start of _start) {
      for (const end of _end) {
        const isLastStart = start === _start[_start.length - 1];
        const isFirstEnd = end === _end[0];
        if (isLastStart && isFirstEnd) {
          this.addSingleLink(start, end, linkData, id);
        } else {
          this.addSingleLink(start, end, linkData, void 0);
        }
      }
    }
  }
  /**
   * Updates a link's line interpolation algorithm
   */
  updateLinkInterpolate(positions, interpolate) {
    positions.forEach((pos) => {
      if (pos === "default") {
        this.edges.defaultInterpolate = interpolate;
        return;
      }
      if (typeof pos === "number" && pos >= this.edges.length) {
        throw new Error(
          `The index ${pos} for linkStyle is out of bounds. Valid indices for linkStyle are between 0 and ${this.edges.length - 1}. (Help: Ensure that the index is within the range of existing edges.)`
        );
      }
      this.edges[pos].interpolate = interpolate;
    });
  }
  /**
   * Updates a link with a style
   *
   */
  updateLink(positions, style) {
    positions.forEach((pos) => {
      var _a2, _b, _c, _d, _e, _f;
      if (typeof pos === "number" && pos >= this.edges.length) {
        throw new Error(
          `The index ${pos} for linkStyle is out of bounds. Valid indices for linkStyle are between 0 and ${this.edges.length - 1}. (Help: Ensure that the index is within the range of existing edges.)`
        );
      }
      if (pos === "default") {
        this.edges.defaultStyle = style;
      } else {
        this.edges[pos].style = style;
        if ((((_b = (_a2 = this.edges[pos]) == null ? void 0 : _a2.style) == null ? void 0 : _b.length) ?? 0) > 0 && !((_d = (_c = this.edges[pos]) == null ? void 0 : _c.style) == null ? void 0 : _d.some((s) => s == null ? void 0 : s.startsWith("fill")))) {
          (_f = (_e = this.edges[pos]) == null ? void 0 : _e.style) == null ? void 0 : _f.push("fill:none");
        }
      }
    });
  }
  addClass(ids, _style) {
    const style = _style.join().replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    ids.split(",").forEach((id) => {
      let classNode = this.classes.get(id);
      if (classNode === void 0) {
        classNode = { id, styles: [], textStyles: [] };
        this.classes.set(id, classNode);
      }
      if (style !== void 0 && style !== null) {
        style.forEach((s) => {
          if (/color/.exec(s)) {
            const newStyle = s.replace("fill", "bgFill");
            classNode.textStyles.push(newStyle);
          }
          classNode.styles.push(s);
        });
      }
    });
  }
  /**
   * Called by parser when a graph definition is found, stores the direction of the chart.
   *
   */
  setDirection(dir) {
    this.direction = dir.trim();
    if (/.*</.exec(this.direction)) {
      this.direction = "RL";
    }
    if (/.*\^/.exec(this.direction)) {
      this.direction = "BT";
    }
    if (/.*>/.exec(this.direction)) {
      this.direction = "LR";
    }
    if (/.*v/.exec(this.direction)) {
      this.direction = "TB";
    }
    if (this.direction === "TD") {
      this.direction = "TB";
    }
  }
  /**
   * Called by parser when a special node is found, e.g. a clickable element.
   *
   * @param ids - Comma separated list of ids
   * @param className - Class to add
   */
  setClass(ids, className) {
    for (const id of ids.split(",")) {
      const vertex = this.vertices.get(id);
      if (vertex) {
        vertex.classes.push(className);
      }
      const edge = this.edges.find((e) => e.id === id);
      if (edge) {
        edge.classes.push(className);
      }
      const subGraph = this.subGraphLookup.get(id);
      if (subGraph) {
        subGraph.classes.push(className);
      }
    }
  }
  setTooltip(ids, tooltip) {
    if (tooltip === void 0) {
      return;
    }
    tooltip = this.sanitizeText(tooltip);
    for (const id of ids.split(",")) {
      this.tooltips.set(this.version === "gen-1" ? this.lookUpDomId(id) : id, tooltip);
    }
  }
  setClickFun(id, functionName, functionArgs) {
    if (getConfig2().securityLevel !== "loose") {
      return;
    }
    if (functionName === void 0) {
      return;
    }
    let argList = [];
    if (typeof functionArgs === "string") {
      argList = functionArgs.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      for (let i = 0; i < argList.length; i++) {
        let item = argList[i].trim();
        if (item.startsWith('"') && item.endsWith('"')) {
          item = item.substr(1, item.length - 2);
        }
        argList[i] = item;
      }
    }
    if (argList.length === 0) {
      argList.push(id);
    }
    const vertex = this.vertices.get(id);
    if (vertex) {
      vertex.haveCallback = true;
      this.funs.push(() => {
        const domId = this.lookUpDomId(id);
        const elem = document.querySelector(`[id="${domId}"]`);
        if (elem !== null) {
          elem.addEventListener(
            "click",
            () => {
              utils_default.runFunc(functionName, ...argList);
            },
            false
          );
        }
      });
    }
  }
  /**
   * Called by parser when a link is found. Adds the URL to the vertex data.
   *
   * @param ids - Comma separated list of ids
   * @param linkStr - URL to create a link for
   * @param target - Target attribute for the link
   */
  setLink(ids, linkStr, target) {
    ids.split(",").forEach((id) => {
      const vertex = this.vertices.get(id);
      if (vertex !== void 0) {
        vertex.link = utils_default.formatUrl(linkStr, this.config);
        vertex.linkTarget = target;
      }
    });
    this.setClass(ids, "clickable");
  }
  getTooltip(id) {
    return this.tooltips.get(id);
  }
  /**
   * Called by parser when a click definition is found. Registers an event handler.
   *
   * @param ids - Comma separated list of ids
   * @param functionName - Function to be called on click
   * @param functionArgs - Arguments to be passed to the function
   */
  setClickEvent(ids, functionName, functionArgs) {
    ids.split(",").forEach((id) => {
      this.setClickFun(id, functionName, functionArgs);
    });
    this.setClass(ids, "clickable");
  }
  bindFunctions(element) {
    this.funs.forEach((fun) => {
      fun(element);
    });
  }
  getDirection() {
    var _a2;
    return (_a2 = this.direction) == null ? void 0 : _a2.trim();
  }
  /**
   * Retrieval function for fetching the found nodes after parsing has completed.
   *
   */
  getVertices() {
    return this.vertices;
  }
  /**
   * Retrieval function for fetching the found links after parsing has completed.
   *
   */
  getEdges() {
    return this.edges;
  }
  /**
   * Returns true when `vertex` is a **tool definition** per
   * the agentflow syntax specification §8 — its resolved shape is `subroutine` or one
   * of the accepted aliases (`subprocess`, `subproc`, `framed-rectangle`).
   *
   * This is the source of truth for "is this a tool?" — there is no
   * separate kind tag stored on the vertex; tool-ness is derived from
   * shape on every check. Downstream consumers reading the semantic model
   * see this surfaced as `vertexKind: 'tool'` (see `getSemanticModel`).
   */
  isToolDefinition(vertex) {
    return SUBROUTINE_ALIASES.has(vertex.type);
  }
  /**
   * Returns every vertex that is a tool definition (per `isToolDefinition`).
   * Derived view; not cached.
   */
  getTools() {
    const tools = [];
    for (const vertex of this.vertices.values()) {
      if (this.isToolDefinition(vertex)) {
        tools.push(vertex);
      }
    }
    return tools;
  }
  /**
   * Retrieval function for fetching the found class definitions after parsing has completed.
   *
   */
  getClasses() {
    return this.classes;
  }
  setupToolTips(element) {
    const tooltipElem = createTooltip();
    const svg = select_default(element).select("svg");
    const nodes = svg.selectAll("g.node");
    nodes.on("mouseover", (e) => {
      var _a2;
      const el = select_default(e.currentTarget);
      const title = el.attr("title");
      if (title === null) {
        return;
      }
      const rect = (_a2 = e.currentTarget) == null ? void 0 : _a2.getBoundingClientRect();
      tooltipElem.transition().duration(200).style("opacity", ".9");
      tooltipElem.text(el.attr("title")).style("left", window.scrollX + rect.left + (rect.right - rect.left) / 2 + "px").style("top", window.scrollY + rect.bottom + "px");
      tooltipElem.html(purify.sanitize(title));
      el.classed("hover", true);
    }).on("mouseout", (e) => {
      tooltipElem.transition().duration(500).style("opacity", 0);
      const el = select_default(e.currentTarget);
      el.classed("hover", false);
    });
  }
  /**
   * Clears the internal graph db so that a new graph can be parsed.
   *
   */
  clear(ver = "gen-2") {
    this.vertices = /* @__PURE__ */ new Map();
    this.classes = /* @__PURE__ */ new Map();
    this.edges = [];
    this.funs = [this.setupToolTips.bind(this)];
    this.subGraphs = [];
    this.subGraphLookup = /* @__PURE__ */ new Map();
    this.globalNodes = /* @__PURE__ */ new Set();
    this.connectors = /* @__PURE__ */ new Map();
    this.subCount = 0;
    this.tooltips = /* @__PURE__ */ new Map();
    this.firstGraphFlag = true;
    this.version = ver;
    this.config = getConfig2();
    this.diagramId = "";
    this.vertexCounter = 0;
    this.direction = void 0;
    this.secCount = -1;
    this.posCrossRef = [];
    this.frontmatterLineOffset = 0;
    this.elementMappings = [];
    this.bareVertexMappings = /* @__PURE__ */ new WeakSet();
    this.diagnostics = [];
    this.postParseValidationRun = false;
    clear();
  }
  setGen(ver) {
    this.version = ver || "gen-2";
  }
  /**
   * Legacy `linkStyle default` colours, byte-identical to `flowDb`. Hardcoded
   * rather than theme-derived on purpose: nothing in the repo calls this, and
   * changing the values would diverge from flowchart for no visible gain.
   */
  defaultStyle() {
    return "fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;";
  }
  addSubGraph(_id, list, _title, type) {
    var _a2;
    let id = (_a2 = _id == null ? void 0 : _id.text) == null ? void 0 : _a2.trim();
    let title = _title == null ? void 0 : _title.text;
    if (_id === _title && (_title == null ? void 0 : _title.text) && /\s/.exec(_title.text)) {
      id = void 0;
    }
    const uniq = __name((a) => {
      const prims = { boolean: {}, number: {}, string: {} };
      const objs = [];
      let dir2;
      const nodeList2 = a.filter(function(item) {
        const type2 = typeof item;
        if (item.stmt && item.stmt === "dir") {
          dir2 = item.value;
          return false;
        }
        if (item.trim() === "") {
          return false;
        }
        if (type2 in prims) {
          return prims[type2].hasOwnProperty(item) ? false : prims[type2][item] = true;
        } else {
          return objs.includes(item) ? false : objs.push(item);
        }
      });
      return { nodeList: nodeList2, dir: dir2 };
    }, "uniq");
    const result = uniq(list.flat());
    const nodeList = result.nodeList;
    let dir = result.dir;
    const flowchartConfig = getConfig2().flowchart ?? {};
    dir = dir ?? (flowchartConfig.inheritDir ? this.getDirection() ?? getConfig2().direction ?? void 0 : void 0);
    if (this.version === "gen-1") {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i] = this.lookUpDomId(nodeList[i]);
      }
    }
    id = id ?? "subGraph" + this.subCount;
    title = title || "";
    title = this.sanitizeText(title);
    this.subCount = this.subCount + 1;
    const subGraph = {
      id,
      // A subgraph is never a member of itself. In-block edge endpoints are
      // folded into the member list, so `a --> myFlow` written inside
      // `flow myFlow … end` would otherwise make the flow its own member and
      // self-parent, crashing the renderer with graphlib's "would create a
      // cycle" (issue #70). Globally scoped nodes (`global … end`, issue #80)
      // are exempt from membership the same way — referencing one inside a
      // flow must not adopt it.
      nodes: nodeList.filter((nodeId) => nodeId !== id && !this.globalNodes.has(nodeId)),
      title: title.trim(),
      classes: [],
      dir,
      labelType: this.sanitizeNodeLabelType(_title == null ? void 0 : _title.type),
      type: type ?? "flow"
    };
    log.info("Adding", subGraph.id, subGraph.nodes, subGraph.dir);
    subGraph.nodes = this.makeUniq(subGraph, this.subGraphs).nodes;
    const existingPos = this.getPosForId(id);
    if (existingPos !== -1) {
      const existing = this.subGraphs[existingPos];
      for (const nodeId of subGraph.nodes) {
        if (!existing.nodes.includes(nodeId)) {
          existing.nodes.push(nodeId);
        }
      }
      if (subGraph.title) {
        existing.title = subGraph.title;
      }
      if (subGraph.dir) {
        existing.dir = subGraph.dir;
      }
      if (subGraph.type) {
        existing.type = subGraph.type;
      }
      this.subGraphLookup.set(id, existing);
    } else {
      this.subGraphs.push(subGraph);
      this.subGraphLookup.set(id, subGraph);
    }
    return id;
  }
  /**
   * Registers every node id that appears inside a `global … end` block as
   * globally scoped (issue #80): the node keeps no parent even when it is
   * referenced inside a `flow … end` block, opting out of the textual
   * membership rule that would otherwise pull it in. Edges declared inside
   * the block are ordinary top-level edges — only the membership exemption
   * is recorded here, and no container is emitted for the block.
   */
  addGlobal(list) {
    for (const item of list.flat()) {
      if (typeof item !== "string") {
        continue;
      }
      const id = item.trim();
      if (id !== "") {
        this.globalNodes.add(id);
      }
    }
    for (const subGraph of this.subGraphs) {
      subGraph.nodes = subGraph.nodes.filter((nodeId) => !this.globalNodes.has(nodeId));
    }
  }
  getPosForId(id) {
    for (const [i, subGraph] of this.subGraphs.entries()) {
      if (subGraph.id === id) {
        return i;
      }
    }
    return -1;
  }
  indexNodes2(id, pos) {
    const nodes = this.subGraphs[pos].nodes;
    this.secCount = this.secCount + 1;
    if (this.secCount > 2e3) {
      return {
        result: false,
        count: 0
      };
    }
    this.posCrossRef[this.secCount] = pos;
    if (this.subGraphs[pos].id === id) {
      return {
        result: true,
        count: 0
      };
    }
    let count = 0;
    let posCount = 1;
    while (count < nodes.length) {
      const childPos = this.getPosForId(nodes[count]);
      if (childPos >= 0) {
        const res = this.indexNodes2(id, childPos);
        if (res.result) {
          return {
            result: true,
            count: posCount + res.count
          };
        } else {
          posCount = posCount + res.count;
        }
      }
      count = count + 1;
    }
    return {
      result: false,
      count: posCount
    };
  }
  getDepthFirstPos(pos) {
    return this.posCrossRef[pos];
  }
  indexNodes() {
    this.secCount = -1;
    if (this.subGraphs.length > 0) {
      this.indexNodes2("none", this.subGraphs.length - 1);
    }
  }
  /**
   * Called by parser when a `connector <id>["Title"]` declaration is
   * encountered (§8). Stores the connector as a FlowVertex with
   * `isConnector: true` so the connector flows through the renderer
   * alongside vertices, while keeping a separate index for connector-
   * specific lookups (e.g. `connectorRef` resolution).
   */
  addConnector(textObj, titleObj) {
    var _a2, _b;
    const id = (_a2 = textObj == null ? void 0 : textObj.text) == null ? void 0 : _a2.trim();
    if (!id) {
      return "";
    }
    const title = ((_b = titleObj == null ? void 0 : titleObj.text) == null ? void 0 : _b.trim()) ?? "";
    const resolvedTitle = title.length > 0 ? this.sanitizeText(title) : id;
    let connector = this.connectors.get(id);
    if (!connector) {
      connector = {
        id,
        labelType: "text",
        domId: MERMAID_DOM_ID_PREFIX + id + "-" + this.vertexCounter,
        styles: [],
        classes: [],
        isConnector: true,
        text: resolvedTitle
      };
      this.connectors.set(id, connector);
      this.vertices.set(id, connector);
      this.vertexCounter++;
    } else if (title.length > 0) {
      connector.text = resolvedTitle;
    }
    return id;
  }
  /**
   * Live array. `getData()` and the JISON actions read it on the hot path and a
   * per-call copy would be wasted work; unlike `getDiagnostics()` this is not an
   * accessor built for external consumers. Same for `getVertices()` /
   * `getEdges()`, whose `defaultStyle` / `defaultInterpolate` side-properties a
   * copy would drop.
   */
  getSubGraphs() {
    return this.subGraphs;
  }
  /** Returns connectors declared via the `connector` keyword (§8). */
  getConnectors() {
    return [...this.connectors.values()];
  }
  firstGraph() {
    if (this.firstGraphFlag) {
      this.firstGraphFlag = false;
      return true;
    }
    return false;
  }
  /**
   * Maps the post-`destructLink` `(type, stroke)` pair onto the canonical
   * `edgeSemantic` value defined by the agentflow syntax specification §5.1 (v0.8.1).
   * The three-way table:
   *   - `-->` → arrow_point + normal → sequence
   *   - `-.-` → arrow_open  + dotted → reference
   *   - `--x` → arrow_cross + normal → failure
   * Returns `undefined` for combinations the spec no longer permits.
   */
  computeEdgeSemantic(type, stroke) {
    if (type === "arrow_point" && stroke === "normal") {
      return "sequence";
    }
    if (type === "arrow_cross" && stroke === "normal") {
      return "failure";
    }
    if (type === "arrow_open" && stroke === "dotted") {
      return "reference";
    }
    return void 0;
  }
  destructStartLink(_str) {
    const str = _str.trim();
    const type = "arrow_open";
    let stroke = "normal";
    if (str.includes(".")) {
      stroke = "dotted";
    }
    return { type, stroke };
  }
  countChar(char, str) {
    const length = str.length;
    let count = 0;
    for (let i = 0; i < length; ++i) {
      if (str[i] === char) {
        ++count;
      }
    }
    return count;
  }
  destructEndLink(_str) {
    const str = _str.trim();
    let line = str.slice(0, -1);
    let type = "arrow_open";
    switch (str.slice(-1)) {
      case "x":
        type = "arrow_cross";
        break;
      case ">":
        type = "arrow_point";
        break;
      case "-":
      case ".":
        type = "arrow_open";
        line = str;
        break;
    }
    let stroke = "normal";
    let length = line.length - 1;
    const dots = this.countChar(".", line);
    if (dots > 0) {
      stroke = "dotted";
      length = dots;
    }
    return { type, stroke, length };
  }
  destructLink(_str, _startStr) {
    const info = this.destructEndLink(_str);
    let startInfo;
    if (_startStr) {
      startInfo = this.destructStartLink(_startStr);
      if (startInfo.stroke !== info.stroke) {
        return { type: "INVALID", stroke: "INVALID" };
      }
      startInfo.type = info.type;
      startInfo.length = info.length;
      return {
        ...startInfo,
        edgeSemantic: this.computeEdgeSemantic(
          startInfo.type,
          startInfo.stroke
        )
      };
    }
    return {
      ...info,
      edgeSemantic: this.computeEdgeSemantic(info.type, info.stroke)
    };
  }
  // Todo optimizer this by caching existing nodes
  exists(allSgs, _id) {
    for (const sg of allSgs) {
      if (sg.nodes.includes(_id)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Deletes an id from all subgraphs
   *
   */
  makeUniq(sg, allSubgraphs) {
    const res = [];
    sg.nodes.forEach((_id, pos) => {
      if (!this.exists(allSubgraphs, _id)) {
        res.push(sg.nodes[pos]);
      }
    });
    return { nodes: res };
  }
  getTypeFromVertex(vertex) {
    const resolved = typeof vertex.type === "string" ? resolveShapeAlias(vertex.type) : vertex.type;
    switch (resolved) {
      case "square":
      case void 0:
        return "squareRect";
      case "round":
        return "roundedRect";
      case "ellipse":
        return "ellipse";
      default:
        return resolved;
    }
  }
  findNode(nodes, id) {
    return nodes.find((node) => node.id === id);
  }
  destructEdgeType(type) {
    let arrowTypeStart = "none";
    let arrowTypeEnd = "arrow_point";
    switch (type) {
      case "arrow_point":
      case "arrow_circle":
      case "arrow_cross":
      case "arrow_hierarchy":
        arrowTypeEnd = type;
        break;
      case "double_arrow_point":
      case "double_arrow_circle":
      case "double_arrow_cross":
        arrowTypeStart = type.replace("double_", "");
        arrowTypeEnd = arrowTypeStart;
        break;
    }
    return { arrowTypeStart, arrowTypeEnd };
  }
  addNodeFromVertex(vertex, nodes, parentDB, subGraphDB, config, look) {
    var _a2, _b, _c;
    const parentId = parentDB.get(vertex.id);
    const isGroup = subGraphDB.get(vertex.id) ?? false;
    const node = this.findNode(nodes, vertex.id);
    if (node) {
      node.cssStyles = vertex.styles;
      node.cssCompiledStyles = this.getCompiledStyles(vertex.classes);
      node.cssClasses = vertex.classes.join(" ");
    } else {
      const baseNode = {
        id: vertex.id,
        label: vertex.text,
        labelType: vertex.labelType,
        labelStyle: "",
        parentId,
        padding: ((_a2 = config.flowchart) == null ? void 0 : _a2.padding) || 8,
        cssStyles: vertex.styles,
        cssCompiledStyles: this.getCompiledStyles(["default", "node", ...vertex.classes]),
        cssClasses: "default " + vertex.classes.join(" "),
        dir: vertex.dir,
        domId: vertex.domId,
        look,
        link: vertex.link,
        linkTarget: vertex.linkTarget,
        tooltip: this.getTooltip(vertex.id),
        metadata: vertex.metadata
      };
      if (isGroup) {
        nodes.push({
          ...baseNode,
          isGroup: true,
          shape: "rect"
        });
      } else {
        nodes.push({
          ...baseNode,
          isGroup: false,
          shape: this.getTypeFromVertex(vertex),
          wrappingWidth: (_b = config.agentflow) == null ? void 0 : _b.wrappingWidth,
          minWidth: (_c = config.agentflow) == null ? void 0 : _c.minNodeWidth
        });
      }
    }
  }
  getCompiledStyles(classDefs) {
    let compiledStyles = [];
    for (const customClass of classDefs) {
      const cssClass = this.classes.get(customClass);
      if (cssClass == null ? void 0 : cssClass.styles) {
        compiledStyles = [...compiledStyles, ...cssClass.styles ?? []].map((s) => s.trim());
      }
      if (cssClass == null ? void 0 : cssClass.textStyles) {
        compiledStyles = [...compiledStyles, ...cssClass.textStyles ?? []].map((s) => s.trim());
      }
    }
    return compiledStyles;
  }
  /**
   * Post-parse hook. Property-level metadata validation and semantic checks
   * (§10 applicability, connector-ref resolution, §3.3 containment, edge
   * endpoint kinds, flow input, identifier namespace) were removed from the
   * parser in v0.8.2 (issue #64) — they are semantic concerns owned by the
   * semantics module. The parser keeps only structural parsing plus `shape`
   * (unknown-shape errors, see `transformData`) and `view` handling. This hook
   * remains as a no-op so downstream callers and the run-once guard are intact.
   */
  runPostParseValidators() {
    if (this.postParseValidationRun) {
      return;
    }
    this.postParseValidationRun = true;
  }
  getData() {
    var _a2, _b;
    this.runPostParseValidators();
    const config = getConfig2();
    const nodes = [];
    const edges = [];
    const subGraphs = this.getSubGraphs();
    const parentDB = /* @__PURE__ */ new Map();
    const subGraphDB = /* @__PURE__ */ new Map();
    const hiddenIds = /* @__PURE__ */ new Set();
    const collapsedAncestorMap = /* @__PURE__ */ new Map();
    const collectDescendants = __name((sgId, ancestor, seen = /* @__PURE__ */ new Set()) => {
      if (seen.has(sgId)) {
        return;
      }
      seen.add(sgId);
      const sg = this.subGraphLookup.get(sgId);
      if (!sg) {
        return;
      }
      for (const childId of sg.nodes) {
        if (childId === ancestor || seen.has(childId)) {
          continue;
        }
        hiddenIds.add(childId);
        collapsedAncestorMap.set(childId, ancestor);
        collectDescendants(childId, ancestor, seen);
      }
    }, "collectDescendants");
    for (const sg of subGraphs) {
      if (((_a2 = sg.metadata) == null ? void 0 : _a2.view) === "collapsed" && !hiddenIds.has(sg.id)) {
        collectDescendants(sg.id, sg.id);
      }
    }
    const wouldCloseContainmentCycle = __name((childId, parentId) => {
      const seen = /* @__PURE__ */ new Set();
      let current = parentId;
      while (current !== void 0 && !seen.has(current)) {
        if (current === childId) {
          return true;
        }
        seen.add(current);
        current = parentDB.get(current);
      }
      return false;
    }, "wouldCloseContainmentCycle");
    for (let i = subGraphs.length - 1; i >= 0; i--) {
      const subGraph = subGraphs[i];
      if (hiddenIds.has(subGraph.id)) {
        continue;
      }
      if (subGraph.nodes.length > 0) {
        subGraphDB.set(subGraph.id, true);
      }
      for (const id of subGraph.nodes) {
        if (wouldCloseContainmentCycle(id, subGraph.id)) {
          this.emitWarning(
            AgentflowWarning.CONTAINMENT_VIOLATION,
            `Container "${subGraph.id}" cannot contain "${id}" because "${id}" already contains it. The nesting that would close the loop is dropped.`,
            { nodeId: id }
          );
          continue;
        }
        parentDB.set(id, subGraph.id);
      }
    }
    for (let i = subGraphs.length - 1; i >= 0; i--) {
      const subGraph = subGraphs[i];
      if (hiddenIds.has(subGraph.id)) {
        continue;
      }
      const isCollapsed = ((_b = subGraph.metadata) == null ? void 0 : _b.view) === "collapsed";
      if (isCollapsed) {
        const collapsedMetadata = {
          ...subGraph.metadata,
          containerType: subGraph.type
        };
        nodes.push({
          id: subGraph.id,
          label: subGraph.title,
          labelStyle: "",
          labelType: subGraph.labelType,
          parentId: parentDB.get(subGraph.id),
          padding: 8,
          cssCompiledStyles: this.getCompiledStyles(subGraph.classes),
          cssClasses: subGraph.classes.join(" "),
          shape: "collapsedGroup",
          dir: subGraph.dir,
          isGroup: false,
          look: config.look,
          metadata: collapsedMetadata
        });
      } else {
        nodes.push({
          id: subGraph.id,
          label: subGraph.title,
          labelStyle: "",
          labelType: subGraph.labelType,
          parentId: parentDB.get(subGraph.id),
          padding: 8,
          cssCompiledStyles: this.getCompiledStyles(subGraph.classes),
          cssClasses: subGraph.classes.join(" "),
          shape: SUBGRAPH_TYPE_TO_SHAPE[subGraph.type ?? "flow"],
          dir: subGraph.dir,
          isGroup: true,
          look: config.look,
          metadata: subGraph.metadata
        });
      }
    }
    const n = this.getVertices();
    n.forEach((vertex) => {
      if (hiddenIds.has(vertex.id)) {
        return;
      }
      this.addNodeFromVertex(vertex, nodes, parentDB, subGraphDB, config, config.look || "classic");
    });
    const e = this.getEdges();
    e.forEach((rawEdge, index) => {
      var _a3;
      const startId = collapsedAncestorMap.get(rawEdge.start) ?? rawEdge.start;
      const endId = collapsedAncestorMap.get(rawEdge.end) ?? rawEdge.end;
      if (startId === endId && rawEdge.start !== rawEdge.end) {
        return;
      }
      const { arrowTypeStart, arrowTypeEnd } = this.destructEdgeType(rawEdge.type);
      const styles = [...e.defaultStyle ?? []];
      if (rawEdge.style) {
        styles.push(...rawEdge.style);
      }
      const edge = {
        id: getEdgeId(startId, endId, { counter: index, prefix: "L" }, rawEdge.id),
        isUserDefinedId: rawEdge.isUserDefinedId,
        start: startId,
        end: endId,
        type: rawEdge.type ?? "normal",
        label: rawEdge.text,
        labelType: rawEdge.labelType,
        labelpos: "c",
        thickness: rawEdge.stroke,
        minlen: rawEdge.length,
        classes: (rawEdge == null ? void 0 : rawEdge.stroke) === "invisible" ? "" : "edge-thickness-normal edge-pattern-solid flowchart-link",
        arrowTypeStart: (rawEdge == null ? void 0 : rawEdge.stroke) === "invisible" || (rawEdge == null ? void 0 : rawEdge.type) === "arrow_open" ? "none" : arrowTypeStart,
        arrowTypeEnd: (rawEdge == null ? void 0 : rawEdge.stroke) === "invisible" || (rawEdge == null ? void 0 : rawEdge.type) === "arrow_open" ? "none" : arrowTypeEnd,
        // Inert: `Edge.arrowheadStyle` is declared but never read by the
        // renderer. Kept at flowchart parity rather than theme-derived.
        arrowheadStyle: "fill: #333",
        cssCompiledStyles: this.getCompiledStyles(rawEdge.classes),
        labelStyle: styles,
        style: styles,
        pattern: rawEdge.stroke,
        look: config.look,
        animate: rawEdge.animate,
        animation: rawEdge.animation,
        curve: rawEdge.interpolate || this.edges.defaultInterpolate || ((_a3 = config.flowchart) == null ? void 0 : _a3.curve),
        // §5.3 edge metadata (e.g. `instruction`) — carried to the IR so
        // downstream tooling (dispatch compile) can read it (issue #62).
        metadata: rawEdge.metadata
      };
      edges.push(edge);
    });
    normaliseNodeShapes(nodes, this);
    const containerOrder = /* @__PURE__ */ new Map();
    const childContainers = /* @__PURE__ */ new Map();
    for (const sg of subGraphs) {
      const parent = parentDB.get(sg.id);
      if (parent !== void 0) {
        childContainers.set(parent, [...childContainers.get(parent) ?? [], sg.id]);
      }
    }
    let nextContainer = 0;
    const walkContainers = __name((id) => {
      if (containerOrder.has(id)) {
        return;
      }
      containerOrder.set(id, nextContainer++);
      for (const child of childContainers.get(id) ?? []) {
        walkContainers(child);
      }
    }, "walkContainers");
    for (const sg of subGraphs) {
      if (parentDB.get(sg.id) === void 0) {
        walkContainers(sg.id);
      }
    }
    const connectorIds = new Set(this.getConnectors().map((c) => c.id));
    assignColorSlots(
      nodes,
      (id) => {
        if (connectorIds.has(id)) {
          return "connector";
        }
        const v = this.vertices.get(id);
        return v ? this.deriveVertexKind(v, resolveShapeAlias(v.type)) : void 0;
      },
      containerOrder
    );
    return {
      nodes,
      edges,
      other: {},
      config,
      connectors: this.getConnectors()
    };
  }
  defaultConfig() {
    return defaultConfig2.flowchart;
  }
  // ── Semantic-model projection (PR 3) ─────────────────────────────────
  //
  // `getSemanticModel()` returns a presentation-stripped view of the
  // diagram state for downstream tooling. Per the agentflow syntax specification §13
  // `view`, `classDef` / `class` / `style` / `linkStyle`, `icon`, `img`,
  // `w`, `h`, collapsed/expanded state, element mappings, and interactivity
  // bindings are presentation-only and MUST NOT influence semantic
  // interpretation — so none of them appear in the returned model. Fields
  // that carry meaning (ids, labels, shape, domain metadata, edge
  // arrow/stroke/label, subgraph membership, type/template declarations,
  // diagnostics) are kept.
  /**
   * The v0.8.1 §4 vertex kind for a parsed vertex.
   *
   * Extracted so the semantic model and `getData()`'s palette slots read the same rules
   * from one place. Kind is NOT recoverable from the resolved shape alone — a tool and a
   * task can both land on `roundedRect` — which is why this takes the vertex and not just
   * its shape.
   */
  deriveVertexKind(v, resolvedShape) {
    if (this.isToolDefinition(v)) {
      return "tool";
    }
    if (resolvedShape === "hexagon" || resolvedShape === "hex") {
      return "action";
    }
    if (resolvedShape === "lean-right" || resolvedShape === "lean_right") {
      return "input";
    }
    if (resolvedShape === "lin-doc" || resolvedShape === "lined-document") {
      return "refdoc";
    }
    if (resolvedShape === "diamond") {
      return "decision";
    }
    return "task";
  }
  getSemanticModel() {
    this.runPostParseValidators();
    const subGraphIds = new Set(this.subGraphs.map((sg) => sg.id));
    const vertices = [];
    const connectors = [];
    for (const [id, v] of this.vertices) {
      if (subGraphIds.has(id)) {
        continue;
      }
      if (v.isConnector) {
        const connector = { id };
        if (v.text !== void 0 && v.text !== id) {
          connector.title = v.text;
        }
        if (v.metadata && Object.keys(v.metadata).length > 0) {
          const meta = {};
          for (const [key, value] of Object.entries(v.metadata)) {
            if (SEMANTIC_METADATA_SKIP_KEYS.has(key)) {
              continue;
            }
            meta[key] = value;
          }
          if (Object.keys(meta).length > 0) {
            connector.metadata = meta;
          }
        }
        connectors.push(connector);
        continue;
      }
      const vertex = { id };
      if (v.text !== void 0) {
        vertex.label = v.text;
      }
      const resolvedShape = typeof v.type === "string" ? resolveShapeAlias(v.type) : v.type;
      if (resolvedShape !== void 0) {
        vertex.shape = resolvedShape;
      }
      vertex.vertexKind = this.deriveVertexKind(v, resolvedShape);
      if (v.metadata && Object.keys(v.metadata).length > 0) {
        const meta = {};
        for (const [key, value] of Object.entries(v.metadata)) {
          if (SEMANTIC_METADATA_SKIP_KEYS.has(key)) {
            continue;
          }
          meta[key] = value;
        }
        if (Object.keys(meta).length > 0) {
          vertex.metadata = meta;
        }
      }
      vertices.push(vertex);
    }
    const edges = this.edges.map((e) => {
      const edge = { start: e.start, end: e.end };
      if (e.id !== void 0) {
        edge.id = e.id;
      }
      if (typeof e.text === "string" && e.text.length > 0) {
        edge.label = e.text;
      }
      if (e.type !== void 0) {
        edge.type = e.type;
      }
      if (e.stroke !== void 0) {
        edge.stroke = e.stroke;
      }
      if (e.edgeSemantic !== void 0) {
        edge.edgeSemantic = e.edgeSemantic;
      }
      if (e.length !== void 0) {
        edge.length = e.length;
      }
      if (e.metadata && Object.keys(e.metadata).length > 0) {
        edge.metadata = { ...e.metadata };
      }
      return edge;
    });
    const subGraphs = this.subGraphs.map((sg) => {
      const out = {
        id: sg.id,
        nodes: [...sg.nodes]
      };
      if (sg.type !== void 0) {
        out.type = sg.type;
      }
      if (sg.title !== void 0) {
        out.title = sg.title;
      }
      if (sg.dir !== void 0) {
        out.direction = sg.dir;
      }
      if (sg.metadata && Object.keys(sg.metadata).length > 0) {
        const meta = {};
        for (const [key, value] of Object.entries(sg.metadata)) {
          if (SEMANTIC_METADATA_SKIP_KEYS.has(key)) {
            continue;
          }
          meta[key] = value;
        }
        if (Object.keys(meta).length > 0) {
          out.metadata = meta;
        }
      }
      return out;
    });
    const model = {
      vertices,
      edges,
      subGraphs,
      connectors,
      diagnostics: this.diagnostics
    };
    if (this.direction !== void 0) {
      model.direction = this.direction;
    }
    return model;
  }
  // ── Element-mapping infrastructure (PR 2a) ────────────────────────────
  //
  // JISON action blocks call the `add*Mapping` methods alongside the
  // structural `add*` methods; see `agentflow.jison`. When a diagram DB
  // does not expose these methods the JISON guard `if (yy.addVertexMapping)`
  // simply skips them, so the mapping layer is opt-in and has no effect on
  // diagrams that don't consume positions.
  setFrontmatterLineOffset(offset) {
    this.frontmatterLineOffset = offset ?? 0;
  }
  toElementPosition(loc) {
    const first_line = (loc == null ? void 0 : loc.first_line) ?? 0;
    const first_column = (loc == null ? void 0 : loc.first_column) ?? 0;
    const last_line = (loc == null ? void 0 : loc.last_line) ?? first_line;
    const last_column = (loc == null ? void 0 : loc.last_column) ?? first_column;
    const [startIndex, endIndex] = (loc == null ? void 0 : loc.range) ?? [0, 0];
    return {
      startLine: first_line + this.frontmatterLineOffset,
      startColumn: first_column,
      endLine: last_line + this.frontmatterLineOffset,
      endColumn: last_column,
      startIndex,
      endIndex
    };
  }
  pushMapping(id, type, loc) {
    if (!id) {
      return void 0;
    }
    const mapping = {
      id,
      type,
      position: this.toElementPosition(loc)
    };
    this.elementMappings.push(mapping);
    return mapping;
  }
  addVertexMapping(id, _text, shape, loc) {
    const mapping = this.pushMapping(id, "vertex", loc);
    if (mapping && shape == null) {
      this.bareVertexMappings.add(mapping);
    }
  }
  /**
   * Extend a vertex's mapping end to cover a trailing inline metadata block
   * (`id["..."]@{ ... }`). The node declaration already pushed a mapping
   * spanning just the declaration; when the `@{ ... }` block reduces we widen
   * that mapping's end to the block's closing `}` so editor cursors inside the
   * block resolve to the node rather than the containing flow (issue #60).
   * `loc` is the `shapeData` symbol's location, so only the end moves — the
   * declaration start is preserved. Falls back to a fresh mapping if the node
   * has none yet.
   *
   * When the mapping being widened came from a bare `id` reference (no
   * label/shape brackets), the statement is a standalone attachment
   * (`id@{ ... }`) annotating an element declared elsewhere — retype it to
   * 'attachment' so consumers can tell it apart from a declaration
   * (issue #75).
   */
  extendVertexMapping(id, loc) {
    if (!id || !loc) {
      return;
    }
    const end = this.toElementPosition(loc);
    for (let i = this.elementMappings.length - 1; i >= 0; i--) {
      const m = this.elementMappings[i];
      if (m.type === "vertex" && m.id === id) {
        if (this.bareVertexMappings.has(m)) {
          m.type = "attachment";
          this.bareVertexMappings.delete(m);
        }
        const extendsPastEnd = end.endLine > m.position.endLine || end.endLine === m.position.endLine && end.endColumn > m.position.endColumn;
        if (extendsPastEnd) {
          m.position.endLine = end.endLine;
          m.position.endColumn = end.endColumn;
          m.position.endIndex = end.endIndex;
        }
        return;
      }
    }
    this.pushMapping(id, "attachment", loc);
  }
  addEdgeMapping(_fromStmt, toNodes, _link, loc) {
    const ids = Array.isArray(toNodes) ? toNodes.map((n) => typeof n === "string" ? n : (n == null ? void 0 : n.id) ?? "").filter(Boolean) : [];
    const edgeId = ids.length > 0 ? ids.join(">") : "edge";
    this.pushMapping(edgeId, "edge", loc);
  }
  addSubgraphMapping(_id, _title, startLoc, endLoc) {
    const id = (typeof _id === "string" ? _id : _id == null ? void 0 : _id.text) ?? "";
    const start = this.toElementPosition(startLoc);
    const end = endLoc ? this.toElementPosition(endLoc) : start;
    if (!id) {
      return;
    }
    this.elementMappings.push({
      id,
      type: "subgraph",
      // Range spans from the container keyword to its `end` — startLine from
      // the opener, endLine from the closer.
      position: {
        startLine: start.startLine,
        startColumn: start.startColumn,
        endLine: end.endLine,
        endColumn: end.endColumn,
        startIndex: start.startIndex,
        endIndex: end.endIndex
      }
    });
  }
  addConnectorMapping(textObj, _titleObj, startLoc, endLoc) {
    var _a2;
    const id = ((_a2 = textObj == null ? void 0 : textObj.text) == null ? void 0 : _a2.trim()) ?? "";
    if (!id) {
      return;
    }
    const start = this.toElementPosition(startLoc);
    const end = endLoc ? this.toElementPosition(endLoc) : start;
    this.elementMappings.push({
      id,
      type: "connector",
      position: {
        startLine: start.startLine,
        startColumn: start.startColumn,
        endLine: end.endLine,
        endColumn: end.endColumn,
        startIndex: start.startIndex,
        endIndex: end.endIndex
      }
    });
  }
  getElementMappings() {
    return [...this.elementMappings];
  }
  getElementById(id) {
    return this.elementMappings.find((m) => m.id === id);
  }
  getElementsOnLine(line) {
    return this.elementMappings.filter(
      (m) => line >= m.position.startLine && line <= m.position.endLine
    );
  }
  getElementAtPosition(line, column) {
    const candidates = this.elementMappings.filter((m) => {
      const { startLine, startColumn, endLine, endColumn } = m.position;
      if (line < startLine || line > endLine) {
        return false;
      }
      if (line === startLine && column < startColumn) {
        return false;
      }
      if (line === endLine && column > endColumn) {
        return false;
      }
      return true;
    });
    if (candidates.length === 0) {
      return void 0;
    }
    const span = __name(({ position }) => [
      position.endLine - position.startLine,
      position.endColumn - position.startColumn
    ], "span");
    return candidates.reduce((smallest, cur) => {
      const [smallLines, smallColumns] = span(smallest);
      const [curLines, curColumns] = span(cur);
      if (curLines !== smallLines) {
        return curLines < smallLines ? cur : smallest;
      }
      return curColumns < smallColumns ? cur : smallest;
    });
  }
  getMappingStats() {
    let vertices = 0;
    let edges = 0;
    let subgraphs = 0;
    let connectors = 0;
    let attachments = 0;
    for (const m of this.elementMappings) {
      if (m.type === "vertex") {
        vertices++;
      } else if (m.type === "edge") {
        edges++;
      } else if (m.type === "subgraph") {
        subgraphs++;
      } else if (m.type === "connector") {
        connectors++;
      } else if (m.type === "attachment") {
        attachments++;
      }
    }
    return {
      vertices,
      edges,
      subgraphs,
      connectors,
      attachments,
      totalElements: this.elementMappings.length
    };
  }
  // ── Diagnostics (PR 2b) ────────────────────────────────────────────────
  //
  // `emitWarning` (and its error-severity counterpart `emitError`) record a
  // structured diagnostic and also fire `log.warn` so humans see the
  // message in the console. When the caller supplies a `nodeId` or
  // `edgeId`, the position is looked up through the element-mapping layer
  // added in PR 2a — so the diagnostic carries enough context for an
  // editor to highlight the offending element.
  emitDiagnostic(id, severity, message, ctx) {
    const anchorId = (ctx == null ? void 0 : ctx.nodeId) ?? (ctx == null ? void 0 : ctx.edgeId);
    const mapping = anchorId ? this.getElementById(anchorId) : void 0;
    const diagnostic = {
      id,
      severity,
      message,
      ...(ctx == null ? void 0 : ctx.nodeId) ? { nodeId: ctx.nodeId } : {},
      ...(ctx == null ? void 0 : ctx.edgeId) && !(ctx == null ? void 0 : ctx.nodeId) ? { edgeId: ctx.edgeId } : {},
      ...mapping ? { position: mapping.position } : {}
    };
    const alreadyRecorded = this.diagnostics.some(
      (existing) => existing.id === diagnostic.id && existing.severity === diagnostic.severity && existing.message === diagnostic.message && existing.nodeId === diagnostic.nodeId && existing.edgeId === diagnostic.edgeId
    );
    if (alreadyRecorded) {
      return;
    }
    this.diagnostics.push(diagnostic);
    const formatted = `agentflow[${id}]: ${message}`;
    if (severity === "error") {
      log.error(formatted);
    } else {
      log.warn(formatted);
    }
  }
  emitWarning(id, message, ctx) {
    this.emitDiagnostic(id, "warning", message, ctx);
  }
  emitError(id, message, ctx) {
    this.emitDiagnostic(id, "error", message, ctx);
  }
  /**
   * `readonly` is erased at runtime, so hand back a copy — this is a
   * consumer-facing accessor and a caller sorting the result in place would
   * otherwise reorder the DB's own list.
   */
  getDiagnostics() {
    return [...this.diagnostics];
  }
}, __name(_a, "AgentFlowDB"), _a);
var getClasses = __name(function(text, diagramObj) {
  return diagramObj.db.getClasses();
}, "getClasses");
var draw = __name(async function(text, id, _version, diag) {
  log.debug("Drawing agentflow diagram", id);
  const { securityLevel, agentflow: conf, layout } = getConfig2();
  diag.db.setDiagramId(id);
  log.debug("Before getData: ");
  const data4Layout = diag.db.getData();
  log.debug("Data: ", data4Layout);
  const svg = getDiagramElement(id, securityLevel);
  const direction = diag.db.getDirection();
  data4Layout.type = diag.type;
  data4Layout.layoutAlgorithm = getRegisteredLayoutAlgorithm(layout);
  if (data4Layout.layoutAlgorithm === "dagre" && layout === "elk") {
    log.warn(
      "flowchart-elk was moved to an external package in Mermaid v11. Please refer [release notes](https://github.com/mermaid-js/mermaid/releases/tag/v11.0.0) for more details. This diagram will be rendered using `dagre` layout as a fallback."
    );
  }
  data4Layout.direction = direction;
  data4Layout.nodeSpacing = (conf == null ? void 0 : conf.nodeSpacing) || 50;
  data4Layout.rankSpacing = (conf == null ? void 0 : conf.rankSpacing) || 50;
  data4Layout.markers = ["point", "circle", "cross", "hierarchy"];
  data4Layout.diagramId = id;
  log.debug("REF1:", data4Layout);
  await render(data4Layout, svg);
  const padding = (conf == null ? void 0 : conf.diagramPadding) ?? 8;
  utils_default.insertTitle(
    svg,
    "agentflowTitleText",
    (conf == null ? void 0 : conf.titleTopMargin) ?? 0,
    diag.db.getDiagramTitle()
  );
  setupViewPortForSVG(svg, padding, "agentflow", (conf == null ? void 0 : conf.useMaxWidth) ?? true);
}, "draw");
var renderer_default = {
  getClasses,
  draw
};
var parser = function() {
  var o = __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [1, 5], $V1 = [1, 4], $V2 = [1, 3], $V3 = [1, 6], $V4 = [1, 8, 9, 10, 11, 12, 28, 35, 36, 38, 40, 42, 47, 63, 87, 88, 89, 90, 91, 92, 105, 108, 109, 112, 114, 117, 118, 119, 124, 125, 126, 127, 128], $V5 = [2, 2], $V6 = [1, 15], $V7 = [1, 16], $V8 = [1, 17], $V9 = [1, 18], $Va = [1, 19], $Vb = [1, 26], $Vc = [1, 27], $Vd = [1, 28], $Ve = [1, 30], $Vf = [1, 31], $Vg = [1, 32], $Vh = [1, 55], $Vi = [1, 54], $Vj = [1, 34], $Vk = [1, 35], $Vl = [1, 36], $Vm = [1, 37], $Vn = [1, 38], $Vo = [1, 50], $Vp = [1, 52], $Vq = [1, 48], $Vr = [1, 53], $Vs = [1, 49], $Vt = [1, 56], $Vu = [1, 51], $Vv = [1, 57], $Vw = [1, 58], $Vx = [1, 39], $Vy = [1, 40], $Vz = [1, 41], $VA = [1, 42], $VB = [1, 43], $VC = [1, 64], $VD = [1, 8, 9, 10, 11, 12, 28, 33, 35, 36, 38, 40, 42, 47, 63, 87, 88, 89, 90, 91, 92, 105, 108, 109, 112, 114, 117, 118, 119, 124, 125, 126, 127, 128], $VE = [1, 70], $VF = [1, 68], $VG = [1, 67], $VH = [1, 69], $VI = [8, 9, 10, 12, 78, 80, 81], $VJ = [1, 88], $VK = [1, 101], $VL = [1, 106], $VM = [1, 105], $VN = [1, 102], $VO = [1, 98], $VP = [1, 104], $VQ = [1, 100], $VR = [1, 107], $VS = [1, 103], $VT = [1, 108], $VU = [1, 99], $VV = [8, 9, 10, 11, 12, 43, 78, 80, 81], $VW = [8, 9, 10, 11, 12, 43, 49, 78, 80, 81], $VX = [8, 9, 10, 11, 12, 30, 43, 47, 49, 51, 53, 55, 57, 59, 61, 63, 66, 68, 70, 71, 73, 78, 80, 81, 92, 105, 108, 109, 112, 114, 117, 118, 119], $VY = [8, 9, 10, 12, 47, 63, 78, 80, 81, 92, 105, 108, 109, 112, 114, 117, 118, 119], $VZ = [47, 63, 92, 105, 108, 109, 112, 114, 117, 118, 119], $V_ = [1, 131], $V$ = [1, 132], $V01 = [1, 134], $V11 = [1, 133], $V21 = [47, 63, 65, 77, 92, 105, 108, 109, 112, 114, 117, 118, 119], $V31 = [1, 143], $V41 = [1, 157], $V51 = [1, 158], $V61 = [1, 159], $V71 = [1, 162], $V81 = [1, 161], $V91 = [1, 160], $Va1 = [1, 145], $Vb1 = [1, 147], $Vc1 = [1, 151], $Vd1 = [1, 139], $Ve1 = [1, 140], $Vf1 = [1, 152], $Vg1 = [1, 153], $Vh1 = [1, 154], $Vi1 = [1, 155], $Vj1 = [1, 156], $Vk1 = [1, 163], $Vl1 = [1, 164], $Vm1 = [1, 141], $Vn1 = [1, 142], $Vo1 = [1, 149], $Vp1 = [1, 144], $Vq1 = [1, 148], $Vr1 = [1, 146], $Vs1 = [8, 9, 10, 11, 12, 28, 33, 35, 36, 38, 40, 42, 47, 63, 87, 88, 89, 90, 91, 92, 105, 108, 109, 112, 114, 117, 118, 119, 124, 125, 126, 127, 128], $Vt1 = [1, 168], $Vu1 = [1, 170], $Vv1 = [8, 9, 10, 12], $Vw1 = [8, 9, 10, 11, 12, 15, 47, 63, 92, 108, 109, 112, 114, 117, 118, 119], $Vx1 = [1, 190], $Vy1 = [1, 186], $Vz1 = [1, 187], $VA1 = [1, 191], $VB1 = [1, 188], $VC1 = [1, 189], $VD1 = [80, 119, 122], $VE1 = [8, 9, 10, 11, 12, 13, 15, 28, 30, 33, 35, 36, 43, 47, 63, 78, 87, 88, 89, 90, 91, 92, 93, 108, 112, 114, 117, 118, 119], $VF1 = [11, 109], $VG1 = [32, 52, 54, 56, 58, 60, 65, 67, 69, 70, 72, 74, 119, 120, 121], $VH1 = [1, 269], $VI1 = [1, 267], $VJ1 = [1, 271], $VK1 = [1, 265], $VL1 = [1, 266], $VM1 = [1, 268], $VN1 = [1, 270], $VO1 = [1, 272], $VP1 = [1, 292], $VQ1 = [8, 9, 10, 12, 109], $VR1 = [8, 9, 10, 11, 12, 63, 87, 108, 109, 112, 113, 114, 115];
  var parser2 = {
    trace: __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "start": 3, "graphConfig": 4, "document": 5, "line": 6, "statement": 7, "COMMENT": 8, "SEMI": 9, "NEWLINE": 10, "SPACE": 11, "EOF": 12, "GRAPH": 13, "NODIR": 14, "DIR": 15, "FirstStmtSeparator": 16, "ending": 17, "endToken": 18, "spaceList": 19, "spaceListNewline": 20, "vertexStatement": 21, "separator": 22, "styleStatement": 23, "linkStyleStatement": 24, "classDefStatement": 25, "classStatement": 26, "clickStatement": 27, "flow": 28, "textNoTags": 29, "SQS": 30, "text": 31, "SQE": 32, "end": 33, "shapeData": 34, "global": 35, "connector": 36, "direction": 37, "acc_title": 38, "acc_title_value": 39, "acc_descr": 40, "acc_descr_value": 41, "acc_descr_multiline_value": 42, "SHAPE_DATA": 43, "link": 44, "node": 45, "styledVertex": 46, "AMP": 47, "vertex": 48, "STYLE_SEPARATOR": 49, "idString": 50, "DOUBLECIRCLESTART": 51, "DOUBLECIRCLEEND": 52, "PS": 53, "PE": 54, "(-": 55, "-)": 56, "STADIUMSTART": 57, "STADIUMEND": 58, "SUBROUTINESTART": 59, "SUBROUTINEEND": 60, "VERTEX_WITH_PROPS_START": 61, "NODE_STRING[field]": 62, "COLON": 63, "NODE_STRING[value]": 64, "PIPE": 65, "CYLINDERSTART": 66, "CYLINDEREND": 67, "DIAMOND_START": 68, "DIAMOND_STOP": 69, "TAGEND": 70, "TRAPSTART": 71, "TRAPEND": 72, "INVTRAPSTART": 73, "INVTRAPEND": 74, "linkStatement": 75, "arrowText": 76, "TESTSTR": 77, "START_LINK": 78, "edgeText": 79, "LINK": 80, "LINK_ID": 81, "edgeTextToken": 82, "STR": 83, "MD_STR": 84, "textToken": 85, "keywords": 86, "STYLE": 87, "LINKSTYLE": 88, "CLASSDEF": 89, "CLASS": 90, "CLICK": 91, "DOWN": 92, "UP": 93, "textNoTagsToken": 94, "stylesOpt": 95, "idString[vertex]": 96, "idString[class]": 97, "CALLBACKNAME": 98, "CALLBACKARGS": 99, "HREF": 100, "LINK_TARGET": 101, "STR[link]": 102, "STR[tooltip]": 103, "alphaNum": 104, "DEFAULT": 105, "numList": 106, "INTERPOLATE": 107, "NUM": 108, "COMMA": 109, "style": 110, "styleComponent": 111, "NODE_STRING": 112, "UNIT": 113, "BRKT": 114, "PCT": 115, "idStringToken": 116, "MINUS": 117, "MULT": 118, "UNICODE_TEXT": 119, "TEXT": 120, "TAGSTART": 121, "EDGE_TEXT": 122, "alphaNumToken": 123, "direction_tb": 124, "direction_bt": 125, "direction_rl": 126, "direction_lr": 127, "direction_td": 128, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 8: "COMMENT", 9: "SEMI", 10: "NEWLINE", 11: "SPACE", 12: "EOF", 13: "GRAPH", 14: "NODIR", 15: "DIR", 28: "flow", 30: "SQS", 32: "SQE", 33: "end", 35: "global", 36: "connector", 38: "acc_title", 39: "acc_title_value", 40: "acc_descr", 41: "acc_descr_value", 42: "acc_descr_multiline_value", 43: "SHAPE_DATA", 47: "AMP", 49: "STYLE_SEPARATOR", 51: "DOUBLECIRCLESTART", 52: "DOUBLECIRCLEEND", 53: "PS", 54: "PE", 55: "(-", 56: "-)", 57: "STADIUMSTART", 58: "STADIUMEND", 59: "SUBROUTINESTART", 60: "SUBROUTINEEND", 61: "VERTEX_WITH_PROPS_START", 62: "NODE_STRING[field]", 63: "COLON", 64: "NODE_STRING[value]", 65: "PIPE", 66: "CYLINDERSTART", 67: "CYLINDEREND", 68: "DIAMOND_START", 69: "DIAMOND_STOP", 70: "TAGEND", 71: "TRAPSTART", 72: "TRAPEND", 73: "INVTRAPSTART", 74: "INVTRAPEND", 77: "TESTSTR", 78: "START_LINK", 80: "LINK", 81: "LINK_ID", 83: "STR", 84: "MD_STR", 87: "STYLE", 88: "LINKSTYLE", 89: "CLASSDEF", 90: "CLASS", 91: "CLICK", 92: "DOWN", 93: "UP", 96: "idString[vertex]", 97: "idString[class]", 98: "CALLBACKNAME", 99: "CALLBACKARGS", 100: "HREF", 101: "LINK_TARGET", 102: "STR[link]", 103: "STR[tooltip]", 105: "DEFAULT", 107: "INTERPOLATE", 108: "NUM", 109: "COMMA", 112: "NODE_STRING", 113: "UNIT", 114: "BRKT", 115: "PCT", 117: "MINUS", 118: "MULT", 119: "UNICODE_TEXT", 120: "TEXT", 121: "TAGSTART", 122: "EDGE_TEXT", 124: "direction_tb", 125: "direction_bt", 126: "direction_rl", 127: "direction_lr", 128: "direction_td" },
    productions_: [0, [3, 2], [5, 0], [5, 2], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [4, 2], [4, 2], [4, 2], [4, 2], [4, 3], [17, 2], [17, 1], [18, 1], [18, 1], [18, 1], [16, 1], [16, 1], [16, 2], [16, 1], [20, 2], [20, 2], [20, 2], [20, 1], [20, 1], [20, 1], [19, 2], [19, 1], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 9], [7, 10], [7, 6], [7, 7], [7, 4], [7, 4], [7, 7], [7, 8], [7, 4], [7, 5], [7, 1], [7, 2], [7, 2], [7, 1], [22, 1], [22, 1], [22, 1], [22, 1], [34, 2], [34, 1], [21, 4], [21, 3], [21, 4], [21, 2], [21, 2], [21, 1], [45, 1], [45, 6], [45, 5], [46, 1], [46, 3], [48, 4], [48, 4], [48, 6], [48, 4], [48, 4], [48, 4], [48, 8], [48, 4], [48, 4], [48, 4], [48, 6], [48, 4], [48, 4], [48, 4], [48, 4], [48, 4], [48, 1], [44, 2], [44, 3], [44, 3], [44, 1], [44, 3], [44, 4], [79, 1], [79, 2], [79, 1], [79, 1], [75, 1], [75, 2], [76, 3], [31, 1], [31, 2], [31, 1], [31, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [86, 1], [29, 1], [29, 2], [29, 1], [29, 1], [25, 5], [26, 5], [27, 2], [27, 4], [27, 3], [27, 5], [27, 3], [27, 5], [27, 5], [27, 7], [27, 2], [27, 4], [27, 2], [27, 4], [27, 4], [27, 6], [23, 5], [24, 5], [24, 5], [24, 9], [24, 9], [24, 7], [24, 7], [106, 1], [106, 3], [95, 1], [95, 3], [110, 1], [110, 2], [111, 1], [111, 1], [111, 1], [111, 1], [111, 1], [111, 1], [111, 1], [111, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [85, 1], [85, 1], [85, 1], [85, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [94, 1], [82, 1], [82, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [123, 1], [50, 1], [50, 2], [104, 1], [104, 2], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1]],
    performAction: __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 2:
          this.$ = [];
          break;
        case 3:
          if (!Array.isArray($$[$0]) || $$[$0].length > 0) {
            $$[$0 - 1].push($$[$0]);
          }
          this.$ = $$[$0 - 1];
          break;
        case 4:
        case 198:
          this.$ = $$[$0];
          break;
        case 5:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
          this.$ = [];
          break;
        case 13:
          yy.setDirection("TB");
          this.$ = "TB";
          break;
        case 14:
          yy.setDirection($$[$0 - 1]);
          this.$ = $$[$0 - 1];
          break;
        case 32:
          this.$ = $$[$0 - 1].nodes;
          break;
        case 38:
          this.$ = yy.addSubGraph($$[$0 - 6], $$[$0 - 1], $$[$0 - 4], "flow");
          if (yy.addSubgraphMapping) {
            yy.addSubgraphMapping($$[$0 - 6], $$[$0 - 4], _$[$0 - 8], _$[$0]);
          }
          break;
        case 39:
          this.$ = yy.addSubGraph($$[$0 - 7], $$[$0 - 1], $$[$0 - 5], "flow");
          yy.addVertex(this.$, void 0, void 0, void 0, void 0, void 0, void 0, $$[$0 - 3], _$[$0 - 3]);
          if (yy.addSubgraphMapping) {
            yy.addSubgraphMapping($$[$0 - 7], $$[$0 - 5], _$[$0 - 9], _$[$0]);
          }
          break;
        case 40:
          this.$ = yy.addSubGraph($$[$0 - 3], $$[$0 - 1], { text: "", type: "text" }, "flow");
          if (yy.addSubgraphMapping) {
            yy.addSubgraphMapping($$[$0 - 3], { text: "", type: "text" }, _$[$0 - 5], _$[$0]);
          }
          break;
        case 41:
          this.$ = yy.addSubGraph($$[$0 - 4], $$[$0 - 1], { text: "", type: "text" }, "flow");
          yy.addVertex(this.$, void 0, void 0, void 0, void 0, void 0, void 0, $$[$0 - 3], _$[$0 - 3]);
          if (yy.addSubgraphMapping) {
            yy.addSubgraphMapping($$[$0 - 4], { text: "", type: "text" }, _$[$0 - 6], _$[$0]);
          }
          break;
        case 42:
          this.$ = yy.addSubGraph(void 0, $$[$0 - 1], void 0, "flow");
          if (yy.addSubgraphMapping) {
            yy.addSubgraphMapping(void 0, void 0, _$[$0 - 3], _$[$0]);
          }
          break;
        case 43:
          yy.addGlobal($$[$0 - 1]);
          this.$ = [];
          break;
        case 44:
          this.$ = yy.addConnector($$[$0 - 4], $$[$0 - 2]);
          if (yy.addConnectorMapping) {
            yy.addConnectorMapping($$[$0 - 4], $$[$0 - 2], _$[$0 - 6], _$[$0]);
          }
          break;
        case 45:
          this.$ = yy.addConnector($$[$0 - 5], $$[$0 - 3]);
          yy.addVertex(this.$, void 0, void 0, void 0, void 0, void 0, void 0, $$[$0 - 1], _$[$0 - 1]);
          if (yy.addConnectorMapping) {
            yy.addConnectorMapping($$[$0 - 5], $$[$0 - 3], _$[$0 - 7], _$[$0]);
          }
          break;
        case 46:
          this.$ = yy.addConnector($$[$0 - 1], { text: "", type: "text" });
          if (yy.addConnectorMapping) {
            yy.addConnectorMapping($$[$0 - 1], { text: "", type: "text" }, _$[$0 - 3], _$[$0]);
          }
          break;
        case 47:
          this.$ = yy.addConnector($$[$0 - 2], { text: "", type: "text" });
          yy.addVertex(this.$, void 0, void 0, void 0, void 0, void 0, void 0, $$[$0 - 1], _$[$0 - 1]);
          if (yy.addConnectorMapping) {
            yy.addConnectorMapping($$[$0 - 2], { text: "", type: "text" }, _$[$0 - 4], _$[$0]);
          }
          break;
        case 49:
          this.$ = $$[$0].trim();
          yy.setAccTitle(this.$);
          break;
        case 50:
        case 51:
          this.$ = $$[$0].trim();
          yy.setAccDescription(this.$);
          break;
        case 56:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 57:
          this.$ = $$[$0];
          break;
        case 58:
          yy.addVertex($$[$0 - 1][$$[$0 - 1].length - 1], void 0, void 0, void 0, void 0, void 0, void 0, $$[$0], _$[$0]);
          if (yy.extendVertexMapping) {
            yy.extendVertexMapping($$[$0 - 1][$$[$0 - 1].length - 1], _$[$0]);
          }
          yy.addLink($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2]);
          if (yy.addEdgeMapping) {
            yy.addEdgeMapping($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2], this._$);
          }
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1].concat($$[$0 - 3].nodes) };
          break;
        case 59:
          yy.addLink($$[$0 - 2].stmt, $$[$0], $$[$0 - 1]);
          if (yy.addEdgeMapping) {
            yy.addEdgeMapping($$[$0 - 2].stmt, $$[$0], $$[$0 - 1], this._$);
          }
          this.$ = { stmt: $$[$0], nodes: $$[$0].concat($$[$0 - 2].nodes) };
          break;
        case 60:
          yy.addLink($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2]);
          if (yy.addEdgeMapping) {
            yy.addEdgeMapping($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2], this._$);
          }
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1].concat($$[$0 - 3].nodes) };
          break;
        case 61:
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1] };
          break;
        case 62:
          yy.addVertex($$[$0 - 1][$$[$0 - 1].length - 1], void 0, void 0, void 0, void 0, void 0, void 0, $$[$0], _$[$0]);
          if (yy.extendVertexMapping) {
            yy.extendVertexMapping($$[$0 - 1][$$[$0 - 1].length - 1], _$[$0]);
          }
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1], shapeData: $$[$0] };
          break;
        case 63:
          this.$ = { stmt: $$[$0], nodes: $$[$0] };
          break;
        case 64:
          this.$ = [$$[$0]];
          break;
        case 65:
          yy.addVertex($$[$0 - 5][$$[$0 - 5].length - 1], void 0, void 0, void 0, void 0, void 0, void 0, $$[$0 - 4], _$[$0 - 4]);
          if (yy.extendVertexMapping) {
            yy.extendVertexMapping($$[$0 - 5][$$[$0 - 5].length - 1], _$[$0 - 4]);
          }
          this.$ = $$[$0 - 5].concat($$[$0]);
          break;
        case 66:
          this.$ = $$[$0 - 4].concat($$[$0]);
          break;
        case 67:
          this.$ = $$[$0];
          break;
        case 68:
          this.$ = $$[$0 - 2];
          yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 69:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "square");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "square", this._$);
          }
          break;
        case 70:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "doublecircle");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "doublecircle", this._$);
          }
          break;
        case 71:
          this.$ = $$[$0 - 5];
          yy.addVertex($$[$0 - 5], $$[$0 - 2], "circle");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 5], $$[$0 - 2], "circle", this._$);
          }
          break;
        case 72:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "ellipse");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "ellipse", this._$);
          }
          break;
        case 73:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "stadium");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "stadium", this._$);
          }
          break;
        case 74:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "subroutine");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "subroutine", this._$);
          }
          break;
        case 75:
          this.$ = $$[$0 - 7];
          yy.addVertex($$[$0 - 7], $$[$0 - 1], "rect", void 0, void 0, void 0, Object.fromEntries([[$$[$0 - 5], $$[$0 - 3]]]));
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 7], $$[$0 - 1], "rect", this._$);
          }
          break;
        case 76:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "cylinder");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "cylinder", this._$);
          }
          break;
        case 77:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "round");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "round", this._$);
          }
          break;
        case 78:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "diamond");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "diamond", this._$);
          }
          break;
        case 79:
          this.$ = $$[$0 - 5];
          yy.addVertex($$[$0 - 5], $$[$0 - 2], "hexagon");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 5], $$[$0 - 2], "hexagon", this._$);
          }
          break;
        case 80:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "odd");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "odd", this._$);
          }
          break;
        case 81:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "trapezoid");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "trapezoid", this._$);
          }
          break;
        case 82:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "inv_trapezoid");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "inv_trapezoid", this._$);
          }
          break;
        case 83:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "lean_right");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "lean_right", this._$);
          }
          break;
        case 84:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "lean_left");
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0 - 3], $$[$0 - 1], "lean_left", this._$);
          }
          break;
        case 85:
          this.$ = $$[$0];
          yy.addVertex($$[$0]);
          if (yy.addVertexMapping) {
            yy.addVertexMapping($$[$0], void 0, void 0, this._$);
          }
          break;
        case 86:
          $$[$0 - 1].text = $$[$0];
          this.$ = $$[$0 - 1];
          break;
        case 87:
        case 88:
          $$[$0 - 2].text = $$[$0 - 1];
          this.$ = $$[$0 - 2];
          break;
        case 89:
          this.$ = $$[$0];
          break;
        case 90:
          var inf = yy.destructLink($$[$0], $$[$0 - 2]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length, "edgeSemantic": inf.edgeSemantic, "text": $$[$0 - 1] };
          break;
        case 91:
          var inf = yy.destructLink($$[$0], $$[$0 - 2]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length, "edgeSemantic": inf.edgeSemantic, "text": $$[$0 - 1], "id": $$[$0 - 3] };
          break;
        case 92:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 93:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 94:
          this.$ = { text: $$[$0], type: "string" };
          break;
        case 95:
          this.$ = { text: $$[$0], type: "markdown" };
          break;
        case 96:
          var inf = yy.destructLink($$[$0]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length, "edgeSemantic": inf.edgeSemantic };
          break;
        case 97:
          var inf = yy.destructLink($$[$0]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length, "edgeSemantic": inf.edgeSemantic, "id": $$[$0 - 1] };
          break;
        case 98:
          this.$ = $$[$0 - 1];
          break;
        case 99:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 100:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 101:
          this.$ = { text: $$[$0], type: "string" };
          break;
        case 102:
        case 119:
          this.$ = { text: $$[$0], type: "markdown" };
          break;
        case 116:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 117:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 118:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 120:
          this.$ = $$[$0 - 4];
          yy.addClass($$[$0 - 2], $$[$0]);
          break;
        case 121:
          this.$ = $$[$0 - 4];
          yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 122:
        case 130:
          this.$ = $$[$0 - 1];
          yy.setClickEvent($$[$0 - 1], $$[$0]);
          break;
        case 123:
        case 131:
          this.$ = $$[$0 - 3];
          yy.setClickEvent($$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 3], $$[$0]);
          break;
        case 124:
          this.$ = $$[$0 - 2];
          yy.setClickEvent($$[$0 - 2], $$[$0 - 1], $$[$0]);
          break;
        case 125:
          this.$ = $$[$0 - 4];
          yy.setClickEvent($$[$0 - 4], $$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 4], $$[$0]);
          break;
        case 126:
          this.$ = $$[$0 - 2];
          yy.setLink($$[$0 - 2], $$[$0]);
          break;
        case 127:
          this.$ = $$[$0 - 4];
          yy.setLink($$[$0 - 4], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 4], $$[$0]);
          break;
        case 128:
          this.$ = $$[$0 - 4];
          yy.setLink($$[$0 - 4], $$[$0 - 2], $$[$0]);
          break;
        case 129:
          this.$ = $$[$0 - 6];
          yy.setLink($$[$0 - 6], $$[$0 - 4], $$[$0]);
          yy.setTooltip($$[$0 - 6], $$[$0 - 2]);
          break;
        case 132:
          this.$ = $$[$0 - 1];
          yy.setLink($$[$0 - 1], $$[$0]);
          break;
        case 133:
          this.$ = $$[$0 - 3];
          yy.setLink($$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 3], $$[$0]);
          break;
        case 134:
          this.$ = $$[$0 - 3];
          yy.setLink($$[$0 - 3], $$[$0 - 2], $$[$0]);
          break;
        case 135:
          this.$ = $$[$0 - 5];
          yy.setLink($$[$0 - 5], $$[$0 - 4], $$[$0]);
          yy.setTooltip($$[$0 - 5], $$[$0 - 2]);
          break;
        case 136:
          this.$ = $$[$0 - 4];
          yy.addVertex($$[$0 - 2], void 0, void 0, $$[$0]);
          break;
        case 137:
          this.$ = $$[$0 - 4];
          yy.updateLink([$$[$0 - 2]], $$[$0]);
          break;
        case 138:
          this.$ = $$[$0 - 4];
          yy.updateLink($$[$0 - 2], $$[$0]);
          break;
        case 139:
          this.$ = $$[$0 - 8];
          yy.updateLinkInterpolate([$$[$0 - 6]], $$[$0 - 2]);
          yy.updateLink([$$[$0 - 6]], $$[$0]);
          break;
        case 140:
          this.$ = $$[$0 - 8];
          yy.updateLinkInterpolate($$[$0 - 6], $$[$0 - 2]);
          yy.updateLink($$[$0 - 6], $$[$0]);
          break;
        case 141:
          this.$ = $$[$0 - 6];
          yy.updateLinkInterpolate([$$[$0 - 4]], $$[$0]);
          break;
        case 142:
          this.$ = $$[$0 - 6];
          yy.updateLinkInterpolate($$[$0 - 4], $$[$0]);
          break;
        case 143:
        case 145:
          this.$ = [$$[$0]];
          break;
        case 144:
        case 146:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 148:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 196:
          this.$ = $$[$0];
          break;
        case 197:
          this.$ = $$[$0 - 1] + "" + $$[$0];
          break;
        case 199:
          this.$ = $$[$0 - 1] + "" + $$[$0];
          break;
        case 200:
          this.$ = { stmt: "dir", value: "TB" };
          break;
        case 201:
          this.$ = { stmt: "dir", value: "BT" };
          break;
        case 202:
          this.$ = { stmt: "dir", value: "RL" };
          break;
        case 203:
          this.$ = { stmt: "dir", value: "LR" };
          break;
        case 204:
          this.$ = { stmt: "dir", value: "TD" };
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 8: $V0, 10: $V1, 11: $V2, 13: $V3 }, { 1: [3] }, o($V4, $V5, { 5: 7 }), { 4: 8, 8: $V0, 10: $V1, 11: $V2, 13: $V3 }, { 4: 9, 8: $V0, 10: $V1, 11: $V2, 13: $V3 }, { 4: 10, 8: $V0, 10: $V1, 11: $V2, 13: $V3 }, { 14: [1, 11], 15: [1, 12] }, { 1: [2, 1], 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, o($V4, [2, 10]), o($V4, [2, 11]), o($V4, [2, 12]), o($V4, [2, 13]), { 8: [1, 63], 9: [1, 60], 10: [1, 61], 11: $VC, 16: 59, 19: 62 }, o($VD, [2, 3]), o($VD, [2, 4]), o($VD, [2, 5]), o($VD, [2, 6]), o($VD, [2, 7]), o($VD, [2, 8]), o($VD, [2, 9]), { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 65, 44: 66, 75: 71, 78: [1, 72], 80: [1, 74], 81: [1, 73] }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 75 }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 76 }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 77 }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 78 }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 79 }, { 8: $VE, 9: $VF, 10: $VG, 11: [1, 80], 12: $VH, 22: 81 }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 82 }, { 11: [1, 83] }, o($VD, [2, 48]), { 39: [1, 84] }, { 41: [1, 85] }, o($VD, [2, 51]), o($VI, [2, 63], { 19: 86, 34: 87, 11: $VC, 43: $VJ }), { 11: [1, 89] }, { 11: [1, 90] }, { 11: [1, 91] }, { 11: [1, 92] }, { 15: $VK, 47: $VL, 63: $VM, 83: [1, 96], 92: $VN, 98: [1, 93], 100: [1, 94], 104: 95, 108: $VO, 109: $VP, 112: $VQ, 114: $VR, 117: $VS, 118: $VT, 119: $VU, 123: 97 }, o($VD, [2, 200]), o($VD, [2, 201]), o($VD, [2, 202]), o($VD, [2, 203]), o($VD, [2, 204]), o($VV, [2, 64]), o($VV, [2, 67], { 49: [1, 109] }), o($VW, [2, 85], { 116: 122, 30: [1, 110], 47: $Vh, 51: [1, 111], 53: [1, 112], 55: [1, 113], 57: [1, 114], 59: [1, 115], 61: [1, 116], 63: $Vi, 66: [1, 117], 68: [1, 118], 70: [1, 119], 71: [1, 120], 73: [1, 121], 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 117: $Vu, 118: $Vv, 119: $Vw }), o($VX, [2, 196]), o($VX, [2, 157]), o($VX, [2, 158]), o($VX, [2, 159]), o($VX, [2, 160]), o($VX, [2, 161]), o($VX, [2, 162]), o($VX, [2, 163]), o($VX, [2, 164]), o($VX, [2, 165]), o($VX, [2, 166]), o($VX, [2, 167]), o($V4, [2, 14]), o($V4, [2, 20]), o($V4, [2, 21]), { 10: [1, 123] }, o($V4, [2, 23]), o($VY, [2, 31], { 19: 124, 11: $VC }), o($VD, [2, 32]), { 45: 125, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, o($VD, [2, 52]), o($VD, [2, 53]), o($VD, [2, 54]), o($VD, [2, 55]), o($VZ, [2, 89], { 76: 126, 65: [1, 128], 77: [1, 127] }), { 79: 129, 82: 130, 83: $V_, 84: $V$, 119: $V01, 122: $V11 }, { 78: [1, 135], 80: [1, 136] }, o($V21, [2, 96]), o($VD, [2, 33]), o($VD, [2, 34]), o($VD, [2, 35]), o($VD, [2, 36]), o($VD, [2, 37]), { 11: $V31, 13: $V41, 15: $V51, 28: $V61, 29: 137, 33: $V71, 35: $V81, 36: $V91, 47: $Va1, 63: $Vb1, 78: $Vc1, 83: $Vd1, 84: $Ve1, 86: 150, 87: $Vf1, 88: $Vg1, 89: $Vh1, 90: $Vi1, 91: $Vj1, 92: $Vk1, 93: $Vl1, 94: 138, 108: $Vm1, 112: $Vn1, 114: $Vo1, 117: $Vp1, 118: $Vq1, 119: $Vr1 }, o($Vs1, $V5, { 5: 165 }), o($Vs1, $V5, { 5: 166 }), { 11: $V31, 13: $V41, 15: $V51, 28: $V61, 29: 167, 33: $V71, 35: $V81, 36: $V91, 47: $Va1, 63: $Vb1, 78: $Vc1, 83: $Vd1, 84: $Ve1, 86: 150, 87: $Vf1, 88: $Vg1, 89: $Vh1, 90: $Vi1, 91: $Vj1, 92: $Vk1, 93: $Vl1, 94: 138, 108: $Vm1, 112: $Vn1, 114: $Vo1, 117: $Vp1, 118: $Vq1, 119: $Vr1 }, o($VD, [2, 49]), o($VD, [2, 50]), o($VI, [2, 61], { 47: $Vt1 }), o($VI, [2, 62], { 19: 169, 11: $VC, 43: $Vu1 }), o($VV, [2, 57]), { 47: $Vh, 50: 171, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, { 105: [1, 172], 106: 173, 108: [1, 174] }, { 47: $Vh, 50: 175, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, { 47: $Vh, 50: 176, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, o($Vv1, [2, 122], { 11: [1, 177], 99: [1, 178] }), { 83: [1, 179] }, o($Vv1, [2, 130], { 123: 181, 11: [1, 180], 15: $VK, 47: $VL, 63: $VM, 92: $VN, 108: $VO, 109: $VP, 112: $VQ, 114: $VR, 117: $VS, 118: $VT, 119: $VU }), o($Vv1, [2, 132], { 11: [1, 182] }), o($Vw1, [2, 198]), o($Vw1, [2, 185]), o($Vw1, [2, 186]), o($Vw1, [2, 187]), o($Vw1, [2, 188]), o($Vw1, [2, 189]), o($Vw1, [2, 190]), o($Vw1, [2, 191]), o($Vw1, [2, 192]), o($Vw1, [2, 193]), o($Vw1, [2, 194]), o($Vw1, [2, 195]), { 47: $Vh, 50: 183, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, { 31: 184, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 192, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 194, 53: [1, 193], 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 195, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 196, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 197, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 112: [1, 198] }, { 31: 199, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 200, 68: [1, 201], 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 202, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 203, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 204, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VX, [2, 197]), o($V4, [2, 22]), o($VY, [2, 30]), o($VI, [2, 59], { 34: 205, 19: 206, 11: $VC, 43: $VJ }), o($VZ, [2, 86], { 11: [1, 207] }), { 11: [1, 208] }, { 31: 209, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 80: [1, 210], 82: 211, 119: $V01, 122: $V11 }, o($VD1, [2, 92]), o($VD1, [2, 94]), o($VD1, [2, 95]), o($VD1, [2, 183]), o($VD1, [2, 184]), { 79: 212, 82: 130, 83: $V_, 84: $V$, 119: $V01, 122: $V11 }, o($V21, [2, 97]), { 8: $VE, 9: $VF, 10: $VG, 11: $V31, 12: $VH, 13: $V41, 15: $V51, 22: 214, 28: $V61, 30: [1, 213], 33: $V71, 34: 215, 35: $V81, 36: $V91, 43: $VJ, 47: $Va1, 63: $Vb1, 78: $Vc1, 86: 150, 87: $Vf1, 88: $Vg1, 89: $Vh1, 90: $Vi1, 91: $Vj1, 92: $Vk1, 93: $Vl1, 94: 216, 108: $Vm1, 112: $Vn1, 114: $Vo1, 117: $Vp1, 118: $Vq1, 119: $Vr1 }, o($VE1, [2, 116]), o($VE1, [2, 118]), o($VE1, [2, 119]), o($VE1, [2, 172]), o($VE1, [2, 173]), o($VE1, [2, 174]), o($VE1, [2, 175]), o($VE1, [2, 176]), o($VE1, [2, 177]), o($VE1, [2, 178]), o($VE1, [2, 179]), o($VE1, [2, 180]), o($VE1, [2, 181]), o($VE1, [2, 182]), o($VE1, [2, 103]), o($VE1, [2, 104]), o($VE1, [2, 105]), o($VE1, [2, 106]), o($VE1, [2, 107]), o($VE1, [2, 108]), o($VE1, [2, 109]), o($VE1, [2, 110]), o($VE1, [2, 111]), o($VE1, [2, 112]), o($VE1, [2, 113]), o($VE1, [2, 114]), o($VE1, [2, 115]), { 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 33: [1, 217], 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, { 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 33: [1, 218], 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, { 8: $VE, 9: $VF, 10: $VG, 11: $V31, 12: $VH, 13: $V41, 15: $V51, 22: 220, 28: $V61, 30: [1, 219], 33: $V71, 34: 221, 35: $V81, 36: $V91, 43: $VJ, 47: $Va1, 63: $Vb1, 78: $Vc1, 86: 150, 87: $Vf1, 88: $Vg1, 89: $Vh1, 90: $Vi1, 91: $Vj1, 92: $Vk1, 93: $Vl1, 94: 216, 108: $Vm1, 112: $Vn1, 114: $Vo1, 117: $Vp1, 118: $Vq1, 119: $Vr1 }, { 11: $VC, 19: 222 }, { 47: [1, 223] }, o($VV, [2, 56]), { 11: [1, 224], 47: $Vh, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 122, 117: $Vu, 118: $Vv, 119: $Vw }, { 11: [1, 225] }, { 11: [1, 226], 109: [1, 227] }, o($VF1, [2, 143]), { 11: [1, 228], 47: $Vh, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 122, 117: $Vu, 118: $Vv, 119: $Vw }, { 11: [1, 229], 47: $Vh, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 122, 117: $Vu, 118: $Vv, 119: $Vw }, { 83: [1, 230] }, o($Vv1, [2, 124], { 11: [1, 231] }), o($Vv1, [2, 126], { 11: [1, 232] }), { 83: [1, 233] }, o($Vw1, [2, 199]), { 83: [1, 234], 101: [1, 235] }, o($VV, [2, 68], { 116: 122, 47: $Vh, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 117: $Vu, 118: $Vv, 119: $Vw }), { 32: [1, 236], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VG1, [2, 99]), o($VG1, [2, 101]), o($VG1, [2, 102]), o($VG1, [2, 168]), o($VG1, [2, 169]), o($VG1, [2, 170]), o($VG1, [2, 171]), { 52: [1, 238], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 239, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 54: [1, 240], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 56: [1, 241], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 58: [1, 242], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 60: [1, 243], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 63: [1, 244] }, { 67: [1, 245], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 69: [1, 246], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 31: 247, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, { 32: [1, 248], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 70: $Vx1, 72: [1, 249], 74: [1, 250], 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 70: $Vx1, 72: [1, 252], 74: [1, 251], 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VI, [2, 58], { 19: 169, 11: $VC, 43: $Vu1 }), o($VI, [2, 60], { 47: $Vt1 }), o($VZ, [2, 88]), o($VZ, [2, 87]), { 65: [1, 253], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VZ, [2, 90]), o($VD1, [2, 93]), { 80: [1, 254], 82: 211, 119: $V01, 122: $V11 }, { 31: 255, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, o($Vs1, $V5, { 5: 256 }), { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 257, 43: $Vu1 }, o($VE1, [2, 117]), o($VD, [2, 42]), o($VD, [2, 43]), { 31: 258, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VD, [2, 46]), { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 259, 43: $Vu1 }, { 46: 260, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, { 11: $VC, 19: 261 }, { 11: $VH1, 63: $VI1, 87: $VJ1, 95: 262, 108: $VK1, 110: 263, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, { 11: $VH1, 63: $VI1, 87: $VJ1, 95: 273, 107: [1, 274], 108: $VK1, 110: 263, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, { 11: $VH1, 63: $VI1, 87: $VJ1, 95: 275, 107: [1, 276], 108: $VK1, 110: 263, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, { 108: [1, 277] }, { 11: $VH1, 63: $VI1, 87: $VJ1, 95: 278, 108: $VK1, 110: 263, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, { 47: $Vh, 50: 279, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, o($Vv1, [2, 123]), { 83: [1, 280] }, { 83: [1, 281], 101: [1, 282] }, o($Vv1, [2, 131]), o($Vv1, [2, 133], { 11: [1, 283] }), o($Vv1, [2, 134]), o($VW, [2, 69]), o($VG1, [2, 100]), o($VW, [2, 70]), { 54: [1, 284], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VW, [2, 77]), o($VW, [2, 72]), o($VW, [2, 73]), o($VW, [2, 74]), { 112: [1, 285] }, o($VW, [2, 76]), o($VW, [2, 78]), { 69: [1, 286], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VW, [2, 80]), o($VW, [2, 81]), o($VW, [2, 83]), o($VW, [2, 82]), o($VW, [2, 84]), o([11, 47, 63, 92, 105, 108, 109, 112, 114, 117, 118, 119], [2, 98]), o($VZ, [2, 91]), { 32: [1, 287], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 33: [1, 288], 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, o($Vs1, $V5, { 5: 289 }), { 32: [1, 290], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VD, [2, 47]), o($VV, [2, 66]), { 46: 291, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw }, o($Vv1, [2, 136], { 109: $VP1 }), o($VQ1, [2, 145], { 111: 293, 11: $VH1, 63: $VI1, 87: $VJ1, 108: $VK1, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }), o($VR1, [2, 147]), o($VR1, [2, 149]), o($VR1, [2, 150]), o($VR1, [2, 151]), o($VR1, [2, 152]), o($VR1, [2, 153]), o($VR1, [2, 154]), o($VR1, [2, 155]), o($VR1, [2, 156]), o($Vv1, [2, 137], { 109: $VP1 }), { 11: [1, 294] }, o($Vv1, [2, 138], { 109: $VP1 }), { 11: [1, 295] }, o($VF1, [2, 144]), o($Vv1, [2, 120], { 109: $VP1 }), o($Vv1, [2, 121], { 116: 122, 47: $Vh, 63: $Vi, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 117: $Vu, 118: $Vv, 119: $Vw }), o($Vv1, [2, 125]), o($Vv1, [2, 127], { 11: [1, 296] }), o($Vv1, [2, 128]), { 101: [1, 297] }, { 54: [1, 298] }, { 65: [1, 299] }, { 69: [1, 300] }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 301, 34: 302, 43: $VJ }, o($VD, [2, 40]), { 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 33: [1, 303], 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 304, 34: 305, 43: $VJ }, o($VV, [2, 65]), { 11: $VH1, 63: $VI1, 87: $VJ1, 108: $VK1, 110: 306, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, o($VR1, [2, 148]), { 15: $VK, 47: $VL, 63: $VM, 92: $VN, 104: 307, 108: $VO, 109: $VP, 112: $VQ, 114: $VR, 117: $VS, 118: $VT, 119: $VU, 123: 97 }, { 15: $VK, 47: $VL, 63: $VM, 92: $VN, 104: 308, 108: $VO, 109: $VP, 112: $VQ, 114: $VR, 117: $VS, 118: $VT, 119: $VU, 123: 97 }, { 101: [1, 309] }, o($Vv1, [2, 135]), o($VW, [2, 71]), { 31: 310, 70: $Vx1, 83: $Vy1, 84: $Vz1, 85: 185, 119: $VA1, 120: $VB1, 121: $VC1 }, o($VW, [2, 79]), o($Vs1, $V5, { 5: 311 }), { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 312, 43: $Vu1 }, o($VD, [2, 41]), o($VD, [2, 44]), { 8: $VE, 9: $VF, 10: $VG, 12: $VH, 22: 313, 43: $Vu1 }, o($VQ1, [2, 146], { 111: 293, 11: $VH1, 63: $VI1, 87: $VJ1, 108: $VK1, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }), o($Vv1, [2, 141], { 123: 181, 11: [1, 314], 15: $VK, 47: $VL, 63: $VM, 92: $VN, 108: $VO, 109: $VP, 112: $VQ, 114: $VR, 117: $VS, 118: $VT, 119: $VU }), o($Vv1, [2, 142], { 123: 181, 11: [1, 315], 15: $VK, 47: $VL, 63: $VM, 92: $VN, 108: $VO, 109: $VP, 112: $VQ, 114: $VR, 117: $VS, 118: $VT, 119: $VU }), o($Vv1, [2, 129]), { 32: [1, 316], 70: $Vx1, 85: 237, 119: $VA1, 120: $VB1, 121: $VC1 }, { 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 33: [1, 317], 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, o($Vs1, $V5, { 5: 318 }), o($VD, [2, 45]), { 11: $VH1, 63: $VI1, 87: $VJ1, 95: 319, 108: $VK1, 110: 263, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, { 11: $VH1, 63: $VI1, 87: $VJ1, 95: 320, 108: $VK1, 110: 263, 111: 264, 112: $VL1, 113: $VM1, 114: $VN1, 115: $VO1 }, o($VW, [2, 75]), o($VD, [2, 38]), { 6: 13, 7: 14, 8: $V6, 9: $V7, 10: $V8, 11: $V9, 12: $Va, 21: 20, 23: 21, 24: 22, 25: 23, 26: 24, 27: 25, 28: $Vb, 33: [1, 321], 35: $Vc, 36: $Vd, 37: 29, 38: $Ve, 40: $Vf, 42: $Vg, 45: 33, 46: 44, 47: $Vh, 48: 45, 50: 46, 63: $Vi, 87: $Vj, 88: $Vk, 89: $Vl, 90: $Vm, 91: $Vn, 92: $Vo, 105: $Vp, 108: $Vq, 109: $Vr, 112: $Vs, 114: $Vt, 116: 47, 117: $Vu, 118: $Vv, 119: $Vw, 124: $Vx, 125: $Vy, 126: $Vz, 127: $VA, 128: $VB }, o($Vv1, [2, 139], { 109: $VP1 }), o($Vv1, [2, 140], { 109: $VP1 }), o($VD, [2, 39])],
    defaultActions: {},
    parseError: __name(function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    }, "parseError"),
    parse: __name(function parse(input) {
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
      options: {},
      performAction: __name(function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            this.begin("acc_title");
            return 38;
            break;
          case 1:
            this.popState();
            return "acc_title_value";
            break;
          case 2:
            this.begin("acc_descr");
            return 40;
            break;
          case 3:
            this.popState();
            return "acc_descr_value";
            break;
          case 4:
            this.begin("acc_descr_multiline");
            break;
          case 5:
            this.popState();
            break;
          case 6:
            return "acc_descr_multiline_value";
            break;
          case 7:
            this.pushState("shapeData");
            yy_.yytext = "";
            return 43;
            break;
          case 8:
            this.pushState("shapeDataStr");
            return 43;
            break;
          case 9:
            this.popState();
            return 43;
            break;
          case 10:
            const re = /\n\s*/g;
            yy_.yytext = yy_.yytext.replace(re, "<br/>");
            return 43;
            break;
          case 11:
            return 43;
            break;
          case 12:
            this.popState();
            break;
          case 13:
            this.begin("callbackname");
            break;
          case 14:
            this.popState();
            break;
          case 15:
            this.popState();
            this.begin("callbackargs");
            break;
          case 16:
            return 98;
            break;
          case 17:
            this.popState();
            break;
          case 18:
            return 99;
            break;
          case 19:
            return "MD_STR";
            break;
          case 20:
            this.popState();
            break;
          case 21:
            this.begin("md_string");
            break;
          case 22:
            return "STR";
            break;
          case 23:
            this.popState();
            break;
          case 24:
            this.pushState("string");
            break;
          case 25:
            return 87;
            break;
          case 26:
            return 105;
            break;
          case 27:
            return 88;
            break;
          case 28:
            return 107;
            break;
          case 29:
            return 89;
            break;
          case 30:
            return 90;
            break;
          case 31:
            return 100;
            break;
          case 32:
            this.begin("click");
            break;
          case 33:
            this.popState();
            break;
          case 34:
            return 91;
            break;
          case 35:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 13;
            break;
          case 36:
            return 28;
            break;
          case 37:
            return 36;
            break;
          case 38:
            return 35;
            break;
          case 39:
            return 33;
            break;
          case 40:
            return 101;
            break;
          case 41:
            return 101;
            break;
          case 42:
            return 101;
            break;
          case 43:
            return 101;
            break;
          case 44:
            this.popState();
            return 14;
            break;
          case 45:
            this.popState();
            return 15;
            break;
          case 46:
            this.popState();
            return 15;
            break;
          case 47:
            this.popState();
            return 15;
            break;
          case 48:
            this.popState();
            return 15;
            break;
          case 49:
            this.popState();
            return 15;
            break;
          case 50:
            this.popState();
            return 15;
            break;
          case 51:
            this.popState();
            return 15;
            break;
          case 52:
            this.popState();
            return 15;
            break;
          case 53:
            this.popState();
            return 15;
            break;
          case 54:
            this.popState();
            return 15;
            break;
          case 55:
            return 124;
            break;
          case 56:
            return 125;
            break;
          case 57:
            return 126;
            break;
          case 58:
            return 127;
            break;
          case 59:
            return 128;
            break;
          case 60:
            return 81;
            break;
          case 61:
            return 108;
            break;
          case 62:
            return 114;
            break;
          case 63:
            return 49;
            break;
          case 64:
            return 63;
            break;
          case 65:
            return 47;
            break;
          case 66:
            return 9;
            break;
          case 67:
            return 109;
            break;
          case 68:
            return 118;
            break;
          case 69:
            this.popState();
            return 80;
            break;
          case 70:
            this.pushState("edgeText");
            return 78;
            break;
          case 71:
            return 122;
            break;
          case 72:
            return 80;
            break;
          case 73:
            break;
          case 74:
            this.popState();
            return 56;
            break;
          case 75:
            return "TEXT";
            break;
          case 76:
            this.pushState("ellipseText");
            return 55;
            break;
          case 77:
            this.popState();
            return 58;
            break;
          case 78:
            this.pushState("text");
            return 57;
            break;
          case 79:
            this.popState();
            return 60;
            break;
          case 80:
            this.pushState("text");
            return 59;
            break;
          case 81:
            return 61;
            break;
          case 82:
            this.pushState("text");
            return 70;
            break;
          case 83:
            this.popState();
            return 67;
            break;
          case 84:
            this.pushState("text");
            return 66;
            break;
          case 85:
            this.popState();
            return 52;
            break;
          case 86:
            this.pushState("text");
            return 51;
            break;
          case 87:
            break;
          case 88:
            this.popState();
            return 72;
            break;
          case 89:
            this.popState();
            return 74;
            break;
          case 90:
            return 120;
            break;
          case 91:
            this.pushState("trapText");
            return 71;
            break;
          case 92:
            this.pushState("trapText");
            return 73;
            break;
          case 93:
            return 121;
            break;
          case 94:
            return 70;
            break;
          case 95:
            return 93;
            break;
          case 96:
            return "SEP";
            break;
          case 97:
            return 92;
            break;
          case 98:
            return 118;
            break;
          case 99:
            return 114;
            break;
          case 100:
            return 47;
            break;
          case 101:
            return 8;
            break;
          case 102:
            return 112;
            break;
          case 103:
            return 117;
            break;
          case 104:
            return 119;
            break;
          case 105:
            this.popState();
            return 65;
            break;
          case 106:
            this.pushState("text");
            return 65;
            break;
          case 107:
            this.popState();
            return 54;
            break;
          case 108:
            this.pushState("text");
            return 53;
            break;
          case 109:
            this.popState();
            return 32;
            break;
          case 110:
            this.pushState("text");
            return 30;
            break;
          case 111:
            this.popState();
            return 69;
            break;
          case 112:
            this.pushState("text");
            return 68;
            break;
          case 113:
            break;
          case 114:
            return "TEXT";
            break;
          case 115:
            return "QUOTE";
            break;
          case 116:
            return 10;
            break;
          case 117:
            return 11;
            break;
          case 118:
            return 12;
            break;
        }
      }, "anonymous"),
      rules: [/^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:@\{)/, /^(?:["])/, /^(?:["])/, /^(?:[^\"]+)/, /^(?:[^}^"]+)/, /^(?:\})/, /^(?:call[\s]+)/, /^(?:\([\s]*\))/, /^(?:\()/, /^(?:[^(]*)/, /^(?:\))/, /^(?:[^)]*)/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["][`])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:["])/, /^(?:style\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:href[\s])/, /^(?:click[\s]+)/, /^(?:[\s\n])/, /^(?:[^\s\n]*)/, /^(?:agentflow-beta\b)/, /^(?:flow\b)/, /^(?:connector\b)/, /^(?:global\b[ \t]*)/, /^(?:end\b[ \t]*)/, /^(?:_self\b)/, /^(?:_blank\b)/, /^(?:_parent\b)/, /^(?:_top\b)/, /^(?:(\r?\n)*\s*\n)/, /^(?:\s*LR\b)/, /^(?:\s*RL\b)/, /^(?:\s*TB\b)/, /^(?:\s*BT\b)/, /^(?:\s*TD\b)/, /^(?:\s*BR\b)/, /^(?:\s*<)/, /^(?:\s*>)/, /^(?:\s*\^)/, /^(?:\s*v\b)/, /^(?:.*direction\s+TB[^\n]*)/, /^(?:.*direction\s+BT[^\n]*)/, /^(?:.*direction\s+RL[^\n]*)/, /^(?:.*direction\s+LR[^\n]*)/, /^(?:.*direction\s+TD[^\n]*)/, /^(?:[^\s\"]+@(?=[^\{\"]))/, /^(?:[0-9]+)/, /^(?:#)/, /^(?::::)/, /^(?::)/, /^(?:&)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:\s*--+[x>]\s*)/, /^(?:\s*--\s*)/, /^(?:[^-]|-(?!-)+)/, /^(?:\s*-\.+-\s*)/, /^(?:%%(?!\{)[^\n]*)/, /^(?:[-/\)][\)])/, /^(?:[^\(\)\[\]\{\}]|!\)+)/, /^(?:\(-)/, /^(?:\]\))/, /^(?:\(\[)/, /^(?:\]\])/, /^(?:\[\[)/, /^(?:\[\|)/, /^(?:>)/, /^(?:\)\])/, /^(?:\[\()/, /^(?:\)\)\))/, /^(?:\(\(\()/, /^(?:%%(?!\{)[^\n]*)/, /^(?:[\\(?=\])][\]])/, /^(?:\/(?=\])\])/, /^(?:\/(?!\])|\\(?!\])|(?:[^\\\[\]\(\)\{\}\/%]+|(?!))+)/, /^(?:\[\/)/, /^(?:\[\\)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\\\|)/, /^(?:v\b)/, /^(?:\*)/, /^(?:#)/, /^(?:&)/, /^(?:[ \t]*%%(?!\{)[^\n]*)/, /^(?:([A-Za-z0-9!"\#$%&'*+\.`?\\_\/]|-(?=[^\>\-\.])|(?!))+)/, /^(?:-)/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\|)/, /^(?:\|)/, /^(?:\))/, /^(?:\()/, /^(?:\])/, /^(?:\[)/, /^(?:(\}))/, /^(?:\{)/, /^(?:%%(?!\{)[^\n]*)/, /^(?:(?:[^\[\]\(\)\{\}\|\"%]+|(?!))+)/, /^(?:")/, /^(?:(\r?\n)+)/, /^(?:\s)/, /^(?:$)/],
      conditions: { "shapeDataEndBracket": { "rules": [21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "shapeDataStr": { "rules": [9, 10, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "shapeData": { "rules": [8, 11, 12, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "callbackargs": { "rules": [17, 18, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "callbackname": { "rules": [14, 15, 16, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "href": { "rules": [21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "click": { "rules": [21, 24, 33, 34, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "edgeText": { "rules": [21, 24, 69, 71, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "trapText": { "rules": [21, 24, 76, 78, 80, 84, 86, 87, 88, 89, 90, 91, 92, 106, 108, 110, 112], "inclusive": false }, "ellipseText": { "rules": [21, 24, 73, 74, 75, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "text": { "rules": [21, 24, 76, 77, 78, 79, 80, 83, 84, 85, 86, 91, 92, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114], "inclusive": false }, "vertex": { "rules": [21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "dir": { "rules": [21, 24, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "acc_descr_multiline": { "rules": [5, 6, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "acc_descr": { "rules": [3, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "acc_title": { "rules": [1, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "md_string": { "rules": [19, 20, 21, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "string": { "rules": [21, 22, 23, 24, 76, 78, 80, 84, 86, 91, 92, 106, 108, 110, 112], "inclusive": false }, "INITIAL": { "rules": [0, 2, 4, 7, 13, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 76, 78, 80, 81, 82, 84, 86, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 106, 108, 110, 112, 115, 116, 117, 118], "inclusive": true } }
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
var agentflow_default = parser;
var newParser = Object.assign({}, agentflow_default);
newParser.parse = (src) => {
  const newSrc = src.replace(/}[^\S\n]*\n/g, "}\n");
  return agentflow_default.parse(newSrc);
};
var agentflowParser_default = newParser;
var genColor = __name((options) => {
  const { theme, bkgColorArray, borderColorArray } = options;
  if (!isColorTheme(theme, borderColorArray)) {
    return "";
  }
  const look = safeLook(options.look);
  const hasBkgColors = hasPalette(bkgColorArray);
  const paletteLength = colorSlotCount(options.THEME_COLOR_LIMIT, borderColorArray);
  const border = __name((slot) => borderColorArray[slot % borderColorArray.length], "border");
  const fill = __name((slot) => hasBkgColors ? `fill: ${bkgColorArray[slot % bkgColorArray.length]};` : "", "fill");
  let sections = "";
  for (const kind of KINDS) {
    const slot = KIND_SLOT.get(kind);
    const sel = `[data-look="${look}"].node.${kindClass(kind)}`;
    sections += `

    ${sel} rect,
    ${sel} path,
    ${sel} polygon {
      stroke: ${border(slot)};
      ${fill(slot)}
    }
`;
  }
  for (let i = 0; i < containerSlotCount(paletteLength); i++) {
    const slot = containerSlot(i, paletteLength);
    const expanded = `[data-look="${look}"][data-color-id="color-${slot}"].cluster`;
    const collapsed = `[data-look="${look}"][data-color-id="color-${slot}"].node`;
    const rule = __name((suffix) => `${expanded} ${suffix}, ${collapsed} ${suffix}`, "rule");
    sections += `

    ${rule("rect")},
    ${rule("path")} {
      stroke: ${border(slot)};
      ${fill(slot)}
    }
`;
  }
  return sections;
}, "genColor");
var fade = __name((color, opacity) => {
  const channel2 = channel_default;
  const r = channel2(color, "r");
  const g = channel2(color, "g");
  const b = channel2(color, "b");
  return rgba_default(r, g, b, opacity);
}, "fade");
var getStyles = __name((options) => `${genColor(options)}
  .label {
    font-family: ${options.fontFamily};
    color: ${options.nodeTextColor || options.textColor};
  }
  .cluster-label text {
    fill: ${options.titleColor};
  }
  .cluster-label span {
    color: ${options.titleColor};
  }
  .cluster-label span p {
    background-color: transparent;
  }

  .label text,span {
    fill: ${options.nodeTextColor || options.textColor};
    color: ${options.nodeTextColor || options.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${options.mainBkg};
    stroke: ${options.nodeBorder};
    stroke-width: ${options.strokeWidth ?? 1}px;
  }
  .rough-node .label text , .node .label text, .image-shape .label, .icon-shape .label {
    text-anchor: middle;
  }
  .node .katex path {
    fill: ${options.nodeTextColor || options.textColor};
    stroke: ${options.nodeTextColor || options.textColor};
    stroke-width: 1px;
  }

  .rough-node .label,.node .label, .image-shape .label, .icon-shape .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }


  .root .anchor path {
    fill: ${options.lineColor} !important;
    stroke-width: 0;
    stroke: ${options.lineColor};
  }

  .arrowheadPath {
    fill: ${options.arrowheadColor};
  }

  .edgePaths .path {
    stroke: ${options.lineColor};
    stroke-width: ${options.strokeWidth ?? 2}px;
  }

  .flowchart-link {
    stroke: ${options.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${options.edgeLabelBackground};
    p {
      background-color: ${options.edgeLabelBackground};
    }
    rect {
      opacity: 0.5;
      background-color: ${options.edgeLabelBackground};
      fill: ${options.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${fade(options.edgeLabelBackground, 0.5)};
  }

  .cluster rect {
    fill: ${options.clusterBkg};
    stroke: ${options.clusterBorder};
    stroke-width: 1px;
  }

  .flow-cluster rect {
    fill: none;
    stroke: ${options.clusterBorder};
    stroke-width: 0.75px;
  }

  .node .collapsed-indicator {
    fill: ${options.nodeBorder};
    stroke: none;
    stroke-width: 0;
    opacity: 0.5;
  }

  .node .collapsed-separator {
    stroke-width: 0.75px;
  }

  .cluster text {
    fill: ${options.titleColor};
  }

  .cluster span {
    color: ${options.titleColor};
  }
  /* .cluster div {
    color: ${options.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${options.fontFamily};
    font-size: 12px;
    background: ${options.tertiaryColor};
    border: 1px solid ${options.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .agentflowTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${options.textColor};
  }

  rect.text {
    fill: none;
    stroke-width: 0;
  }

  .icon-shape, .image-shape {
    background-color: ${options.edgeLabelBackground};
    p {
      background-color: ${options.edgeLabelBackground};
      padding: 2px;
    }
    .label rect {
      opacity: 0.5;
      background-color: ${options.edgeLabelBackground};
      fill: ${options.edgeLabelBackground};
    }
    text-align: center;
  }
  ${getIconStyles()}
`, "getStyles");
var styles_default = getStyles;
var diagram = {
  parser: agentflowParser_default,
  get db() {
    return new AgentFlowDB();
  },
  renderer: renderer_default,
  styles: styles_default,
  init: __name((cnf) => {
    cnf.agentflow ?? (cnf.agentflow = {});
    if (cnf.layout) {
      setConfig2({ layout: cnf.layout });
    }
    cnf.flowchart ?? (cnf.flowchart = {});
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig2({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
  }, "init")
};
export {
  diagram
};
//# sourceMappingURL=diagram-22UHCM2B-XRKDGWNS.js.map
