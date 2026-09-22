import {
  selectSvgElement
} from "./chunk-OP7DMO7P.js";
import {
  JSON_SCHEMA,
  load
} from "./chunk-O54FB4XG.js";
import {
  registerLayoutLoaders
} from "./chunk-PHTJAK3Q.js";
import "./chunk-O7QQEWBF.js";
import "./chunk-QIPQ2JAZ.js";
import "./chunk-5ITZU7CU.js";
import "./chunk-33QER2HL.js";
import "./chunk-H2RFP4YG.js";
import "./chunk-B7KO5YQV.js";
import "./chunk-ADFWXOGL.js";
import "./chunk-E7WPOYWJ.js";
import {
  dedent
} from "./chunk-DJ4W7BRS.js";
import {
  registerIconPacks
} from "./chunk-XCU23T57.js";
import {
  cleanAndMerge,
  decodeEntities,
  encodeEntities,
  isDetailedError,
  isEmpty,
  removeDirectives,
  utils_default
} from "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  UnknownDiagramError,
  addDirective,
  assignWithDepth_default,
  configureSvgSize,
  cssStyleSheetToString,
  defaultConfig,
  defaultConfig_default,
  detectType,
  detectors,
  evaluate,
  frontMatterRegex,
  getConfig,
  getDiagram,
  getDiagramLoader,
  getEffectiveHtmlLabels,
  getSiteConfig,
  purify,
  registerDiagram,
  registerLazyLoadedDiagrams,
  reset,
  sanitizeCss,
  saveConfigFromInitialize,
  setConfig,
  setDiagramConfigScope,
  setSiteConfig,
  styles_default,
  themes_default,
  updateSiteConfig
} from "./chunk-MLEFVBYW.js";
import {
  log,
  select_default,
  setLogLevel
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Enum.js
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var MEDIA = "@media";
var IMPORT = "@import";
var SUPPORTS = "@supports";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var SCOPE = "@scope";

// node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
function trim(value) {
  return value.trim();
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}

// node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var parens = 0;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) parens++, characters2 += "(";
        else characters2 += delimit(character2);
        break;
      case 41:
        parens--, characters2 += ")";
        break;
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        if (parens > 0) {
          characters2 += from(character2);
          break;
        }
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, void 0) !== " ") characters2 += " ";
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        if (parens > 0 && character2) {
          characters2 += from(character2);
          break;
        }
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && (strlen(characters2) - length2 || variable === 0))
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else {
                switch (atrule) {
                  case 99:
                    if (charat(characters2, 3) === 110) break;
                  case 108:
                    if (charat(characters2, 2) === 97) break;
                  default:
                    offset = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                else parse(characters2, reference, reference, reference, [""], children, 0, points, children);
              }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            if (parens > 0) break;
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}

// node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case NAMESPACE:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/mermaid.core.mjs
var id = "c4";
var detector = __name((txt) => {
  return /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(txt);
}, "detector");
var loader = __name(async () => {
  const { diagram: diagram2 } = await import("./c4Diagram-YGBWAQC7-JTJUFDQR.js");
  return { id, diagram: diagram2 };
}, "loader");
var plugin = {
  id,
  detector,
  loader
};
var c4Detector_default = plugin;
var id2 = "flowchart-v2";
var detector2 = __name((txt) => /^\s*(graph|flowchart)/.test(txt), "detector");
var loader2 = __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-KWPJA3E3-4ANQJL67.js");
  return { id: id2, diagram: diagram2 };
}, "loader");
var plugin2 = {
  id: id2,
  detector: detector2,
  loader: loader2
};
var flowDetector_v2_default = plugin2;
var id3 = "agentflow";
var detector3 = __name((txt) => {
  return /^\s*agentflow-beta\b/.test(txt);
}, "detector");
var loader3 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-22UHCM2B-XRKDGWNS.js");
  return { id: id3, diagram: diagram2 };
}, "loader");
var plugin3 = {
  id: id3,
  detector: detector3,
  loader: loader3
};
var afDetector_default = plugin3;
var id4 = "swimlane";
var detector4 = __name((txt) => {
  return /^\s*swimlane-beta\b/.test(txt);
}, "detector");
var loader4 = __name(async () => {
  const { diagram: diagram2 } = await import("./swimlanesDiagram-TC7HE7FX-I5YEBVX4.js");
  return { id: id4, diagram: diagram2 };
}, "loader");
var plugin4 = {
  id: id4,
  detector: detector4,
  loader: loader4
};
var detector_default = plugin4;
var id5 = "er";
var detector5 = __name((txt) => {
  return /^\s*erDiagram/.test(txt);
}, "detector");
var loader5 = __name(async () => {
  const { diagram: diagram2 } = await import("./erDiagram-OPXOYQCR-UGVXEGJT.js");
  return { id: id5, diagram: diagram2 };
}, "loader");
var plugin5 = {
  id: id5,
  detector: detector5,
  loader: loader5
};
var erDetector_default = plugin5;
var id6 = "gitGraph";
var detector6 = __name((txt) => {
  return /^\s*gitGraph/.test(txt);
}, "detector");
var loader6 = __name(async () => {
  const { diagram: diagram2 } = await import("./gitGraphDiagram-X574FWY7-G5GUMN45.js");
  return { id: id6, diagram: diagram2 };
}, "loader");
var plugin6 = {
  id: id6,
  detector: detector6,
  loader: loader6
};
var gitGraphDetector_default = plugin6;
var id7 = "gantt";
var detector7 = __name((txt) => {
  return /^\s*gantt/.test(txt);
}, "detector");
var loader7 = __name(async () => {
  const { diagram: diagram2 } = await import("./ganttDiagram-FUAMR5RP-DG7ALBSR.js");
  return { id: id7, diagram: diagram2 };
}, "loader");
var plugin7 = {
  id: id7,
  detector: detector7,
  loader: loader7
};
var ganttDetector_default = plugin7;
var id8 = "info";
var detector8 = __name((txt) => {
  return /^\s*info/.test(txt);
}, "detector");
var loader8 = __name(async () => {
  const { diagram: diagram2 } = await import("./infoDiagram-VRGFBTTK-VS2WSAAC.js");
  return { id: id8, diagram: diagram2 };
}, "loader");
var info = {
  id: id8,
  detector: detector8,
  loader: loader8
};
var id9 = "pie";
var detector9 = __name((txt) => {
  return /^\s*pie/.test(txt);
}, "detector");
var loader9 = __name(async () => {
  const { diagram: diagram2 } = await import("./pieDiagram-5QR66LMP-G444NXYB.js");
  return { id: id9, diagram: diagram2 };
}, "loader");
var pie = {
  id: id9,
  detector: detector9,
  loader: loader9
};
var id10 = "quadrantChart";
var detector10 = __name((txt) => {
  return /^\s*quadrantChart/.test(txt);
}, "detector");
var loader10 = __name(async () => {
  const { diagram: diagram2 } = await import("./quadrantDiagram-O4NWA36T-AQXPFMTI.js");
  return { id: id10, diagram: diagram2 };
}, "loader");
var plugin8 = {
  id: id10,
  detector: detector10,
  loader: loader10
};
var quadrantDetector_default = plugin8;
var id11 = "xychart";
var detector11 = __name((txt) => {
  return /^\s*xychart(-beta)?/.test(txt);
}, "detector");
var loader11 = __name(async () => {
  const { diagram: diagram2 } = await import("./xychartDiagram-PMCCYNJV-PIMNFNI7.js");
  return { id: id11, diagram: diagram2 };
}, "loader");
var plugin9 = {
  id: id11,
  detector: detector11,
  loader: loader11
};
var xychartDetector_default = plugin9;
var id12 = "requirement";
var detector12 = __name((txt) => {
  return /^\s*requirement(Diagram)?/.test(txt);
}, "detector");
var loader12 = __name(async () => {
  const { diagram: diagram2 } = await import("./requirementDiagram-PLB6GJNP-5QOQFLV5.js");
  return { id: id12, diagram: diagram2 };
}, "loader");
var plugin10 = {
  id: id12,
  detector: detector12,
  loader: loader12
};
var requirementDetector_default = plugin10;
var id13 = "sequence";
var detector13 = __name((txt) => {
  return /^\s*sequenceDiagram/.test(txt);
}, "detector");
var loader13 = __name(async () => {
  const { diagram: diagram2 } = await import("./sequenceDiagram-PO4LG4MO-DW7OQ2B5.js");
  return { id: id13, diagram: diagram2 };
}, "loader");
var plugin11 = {
  id: id13,
  detector: detector13,
  loader: loader13
};
var sequenceDetector_default = plugin11;
var id14 = "classDiagram";
var detector14 = __name((txt) => /^\s*classDiagram/.test(txt), "detector");
var loader14 = __name(async () => {
  const { diagram: diagram2 } = await import("./classDiagram-v2-NBCMYWYE-EQQAVJII.js");
  return { id: id14, diagram: diagram2 };
}, "loader");
var plugin12 = {
  id: id14,
  detector: detector14,
  loader: loader14
};
var classDetector_V2_default = plugin12;
var id15 = "stateDiagram";
var detector15 = __name((txt) => /^\s*stateDiagram/.test(txt), "detector");
var loader15 = __name(async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-v2-GCMORJYK-DBMTVY77.js");
  return { id: id15, diagram: diagram2 };
}, "loader");
var plugin13 = {
  id: id15,
  detector: detector15,
  loader: loader15
};
var stateDetector_V2_default = plugin13;
var id16 = "journey";
var detector16 = __name((txt) => {
  return /^\s*journey/.test(txt);
}, "detector");
var loader16 = __name(async () => {
  const { diagram: diagram2 } = await import("./journeyDiagram-ZHPQQLJL-GUW6V4ES.js");
  return { id: id16, diagram: diagram2 };
}, "loader");
var plugin14 = {
  id: id16,
  detector: detector16,
  loader: loader16
};
var journeyDetector_default = plugin14;
var draw = __name((_text, id38, version) => {
  log.debug("rendering svg for syntax error\n");
  const svg = selectSvgElement(id38);
  const g = svg.append("g");
  svg.attr("viewBox", "0 0 2412 512");
  configureSvgSize(svg, 100, 512, true);
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
  );
  g.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text");
  g.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${version}`);
}, "draw");
var renderer = { draw };
var errorRenderer_default = renderer;
var diagram = {
  db: {},
  renderer,
  parser: {
    parse: __name(() => {
      return;
    }, "parse")
  }
};
var errorDiagram_default = diagram;
var id17 = "flowchart-elk";
var detector17 = __name((txt, config = {}) => {
  if (/^\s*flowchart-elk/.test(txt)) {
    config.layout = "elk";
    return true;
  }
  return false;
}, "detector");
var loader17 = __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-KWPJA3E3-4ANQJL67.js");
  return { id: id17, diagram: diagram2 };
}, "loader");
var plugin15 = {
  id: id17,
  detector: detector17,
  loader: loader17
};
var detector_default2 = plugin15;
var id18 = "timeline";
var detector18 = __name((txt) => {
  return /^\s*timeline/.test(txt);
}, "detector");
var loader18 = __name(async () => {
  const { diagram: diagram2 } = await import("./timeline-definition-EJHVYXUP-C6CJ54I6.js");
  return { id: id18, diagram: diagram2 };
}, "loader");
var plugin16 = {
  id: id18,
  detector: detector18,
  loader: loader18
};
var detector_default3 = plugin16;
var id19 = "mindmap";
var detector19 = __name((txt) => {
  return /^\s*mindmap/.test(txt);
}, "detector");
var loader19 = __name(async () => {
  const { diagram: diagram2 } = await import("./mindmap-definition-NLK3R4M7-O3ALBSLO.js");
  return { id: id19, diagram: diagram2 };
}, "loader");
var plugin17 = {
  id: id19,
  detector: detector19,
  loader: loader19
};
var detector_default4 = plugin17;
var id20 = "kanban";
var detector20 = __name((txt) => {
  return /^\s*kanban/.test(txt);
}, "detector");
var loader20 = __name(async () => {
  const { diagram: diagram2 } = await import("./kanban-definition-PNTS6WVX-FFORDEBD.js");
  return { id: id20, diagram: diagram2 };
}, "loader");
var plugin18 = {
  id: id20,
  detector: detector20,
  loader: loader20
};
var detector_default5 = plugin18;
var id21 = "sankey";
var detector21 = __name((txt) => {
  return /^\s*sankey(-beta)?/.test(txt);
}, "detector");
var loader21 = __name(async () => {
  const { diagram: diagram2 } = await import("./sankeyDiagram-IPEJSGJF-G766IE4E.js");
  return { id: id21, diagram: diagram2 };
}, "loader");
var plugin19 = {
  id: id21,
  detector: detector21,
  loader: loader21
};
var sankeyDetector_default = plugin19;
var id22 = "packet";
var detector22 = __name((txt) => {
  return /^\s*packet(-beta)?/.test(txt);
}, "detector");
var loader22 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-MLGK6HIB-CSLGRTNB.js");
  return { id: id22, diagram: diagram2 };
}, "loader");
var packet = {
  id: id22,
  detector: detector22,
  loader: loader22
};
var id23 = "radar";
var detector23 = __name((txt) => {
  return /^\s*radar-beta/.test(txt);
}, "detector");
var loader23 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-MPIPVDR6-HBNBHAV5.js");
  return { id: id23, diagram: diagram2 };
}, "loader");
var radar = {
  id: id23,
  detector: detector23,
  loader: loader23
};
var id24 = "block";
var detector24 = __name((txt) => {
  return /^\s*block(-beta)?/.test(txt);
}, "detector");
var loader24 = __name(async () => {
  const { diagram: diagram2 } = await import("./blockDiagram-BEXU5L5S-DD5YQK6M.js");
  return { id: id24, diagram: diagram2 };
}, "loader");
var plugin20 = {
  id: id24,
  detector: detector24,
  loader: loader24
};
var blockDetector_default = plugin20;
var id25 = "treeView";
var detector25 = __name((txt) => {
  return /^\s*treeView-beta/.test(txt);
}, "detector");
var loader25 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-CDSNMT55-3KBRDB6N.js");
  return { id: id25, diagram: diagram2 };
}, "loader");
var plugin21 = {
  id: id25,
  detector: detector25,
  loader: loader25
};
var detector_default6 = plugin21;
var id26 = "architecture";
var detector26 = __name((txt) => {
  return /^\s*architecture/.test(txt);
}, "detector");
var loader26 = __name(async () => {
  const { diagram: diagram2 } = await import("./architectureDiagram-NJMV4G6O-OCQZI6HT.js");
  return { id: id26, diagram: diagram2 };
}, "loader");
var architecture = {
  id: id26,
  detector: detector26,
  loader: loader26
};
var architectureDetector_default = architecture;
var id27 = "eventmodeling";
var detector27 = __name((txt) => {
  return /^\s*eventmodeling/.test(txt);
}, "detector");
var loader27 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-ATOU4E4O-SCR5PUQL.js");
  return { id: id27, diagram: diagram2 };
}, "loader");
var plugin22 = {
  id: id27,
  detector: detector27,
  loader: loader27
};
var detector_default7 = plugin22;
var id28 = "ishikawa";
var detector28 = __name((txt) => {
  return /^\s*ishikawa(-beta)?\b/i.test(txt);
}, "detector");
var loader28 = __name(async () => {
  const { diagram: diagram2 } = await import("./ishikawaDiagram-OU5B5YK6-RWGR5IMQ.js");
  return { id: id28, diagram: diagram2 };
}, "loader");
var ishikawa = {
  id: id28,
  detector: detector28,
  loader: loader28
};
var id29 = "venn";
var detector29 = __name((txt) => {
  return /^\s*venn-beta/.test(txt);
}, "detector");
var loader29 = __name(async () => {
  const { diagram: diagram2 } = await import("./vennDiagram-UO4OBE2U-FDMNKFRU.js");
  return { id: id29, diagram: diagram2 };
}, "loader");
var plugin23 = {
  id: id29,
  detector: detector29,
  loader: loader29
};
var vennDetector_default = plugin23;
var id30 = "treemap";
var detector30 = __name((txt) => {
  return /^\s*treemap/.test(txt);
}, "detector");
var loader30 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-3UASUU5V-4GQOEJKP.js");
  return { id: id30, diagram: diagram2 };
}, "loader");
var treemap = {
  id: id30,
  detector: detector30,
  loader: loader30
};
var id31 = "usecase";
var detector31 = __name((txt) => {
  return /^\s*usecase-beta(?:\s|$)/.test(txt);
}, "detector");
var loader31 = __name(async () => {
  const { diagram: diagram2 } = await import("./usecaseDiagram-POWQR4AR-5OBWZP3M.js");
  return { id: id31, diagram: diagram2 };
}, "loader");
var usecase = {
  id: id31,
  detector: detector31,
  loader: loader31
};
var id32 = "wardley";
var detector32 = __name((text) => {
  return /^\s*wardley-beta/i.test(text);
}, "detector");
var loader32 = __name(async () => {
  const { diagram: diagram2 } = await import("./wardleyDiagram-VNRHLVJA-QLRGRCUU.js");
  return { id: id32, diagram: diagram2 };
}, "loader");
var plugin24 = {
  id: id32,
  detector: detector32,
  loader: loader32
};
var wardleyDetector_default = plugin24;
var id33 = "cynefin";
var detector33 = __name((txt) => {
  return /^\s*cynefin-beta(?:[\s:]|$)/.test(txt);
}, "detector");
var loader33 = __name(async () => {
  const { diagram: diagram2 } = await import("./cynefinDiagram-VND7K2PF-CF5SOTIL.js");
  return { id: id33, diagram: diagram2 };
}, "loader");
var cynefin = {
  id: id33,
  detector: detector33,
  loader: loader33
};
var id34 = "railroad";
var detector34 = __name((txt) => {
  return /^\s*railroad-beta/i.test(txt);
}, "detector");
var loader34 = __name(async () => {
  const { diagram: diagram2 } = await import("./railroadDiagram-XR7U4H2S-N2JSPOK4.js");
  return { id: id34, diagram: diagram2 };
}, "loader");
var railroad = {
  id: id34,
  detector: detector34,
  loader: loader34
};
var id35 = "railroadEbnf";
var detector35 = __name((txt) => {
  return /^\s*railroad-ebnf-beta/i.test(txt);
}, "detector");
var loader35 = __name(async () => {
  const { diagram: diagram2 } = await import("./ebnfDiagram-ZINNZB2B-KOUFOWN4.js");
  return { id: id35, diagram: diagram2 };
}, "loader");
var railroadEbnf = {
  id: id35,
  detector: detector35,
  loader: loader35
};
var id36 = "railroadAbnf";
var detector36 = __name((txt) => {
  return /^\s*railroad-abnf-beta/i.test(txt);
}, "detector");
var loader36 = __name(async () => {
  const { diagram: diagram2 } = await import("./abnfDiagram-O67JEVCF-MTEWZLCX.js");
  return { id: id36, diagram: diagram2 };
}, "loader");
var railroadAbnf = {
  id: id36,
  detector: detector36,
  loader: loader36
};
var id37 = "railroadPeg";
var detector37 = __name((txt) => {
  return /^\s*railroad-peg-beta/i.test(txt);
}, "detector");
var loader37 = __name(async () => {
  const { diagram: diagram2 } = await import("./pegDiagram-GJSIUBJH-2VU5OQSI.js");
  return { id: id37, diagram: diagram2 };
}, "loader");
var railroadPeg = {
  id: id37,
  detector: detector37,
  loader: loader37
};
var hasLoadedDiagrams = false;
var addDiagrams = __name(() => {
  if (hasLoadedDiagrams) {
    return;
  }
  hasLoadedDiagrams = true;
  registerDiagram("error", errorDiagram_default, (text) => {
    return text.toLowerCase().trim() === "error";
  });
  registerDiagram(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: __name(() => {
        }, "clear")
      },
      styles: {},
      // should never be used
      renderer: {
        draw: __name(() => {
        }, "draw")
      },
      parser: {
        parse: __name(() => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }, "parse")
      },
      init: __name(() => null, "init")
      // no op
    },
    (text) => {
      return text.toLowerCase().trimStart().startsWith("---");
    }
  );
  if (true) {
    registerLazyLoadedDiagrams(detector_default2, detector_default4, architectureDetector_default);
  }
  registerLazyLoadedDiagrams(
    afDetector_default,
    c4Detector_default,
    detector_default5,
    classDetector_V2_default,
    erDetector_default,
    ganttDetector_default,
    info,
    pie,
    requirementDetector_default,
    sequenceDetector_default,
    detector_default,
    flowDetector_v2_default,
    detector_default3,
    gitGraphDetector_default,
    stateDetector_V2_default,
    journeyDetector_default,
    quadrantDetector_default,
    sankeyDetector_default,
    packet,
    xychartDetector_default,
    blockDetector_default,
    detector_default7,
    detector_default6,
    radar,
    ishikawa,
    treemap,
    railroad,
    railroadEbnf,
    railroadAbnf,
    railroadPeg,
    vennDetector_default,
    wardleyDetector_default,
    cynefin,
    usecase
  );
}, "addDiagrams");
var loadRegisteredDiagrams = __name(async () => {
  log.debug(`Loading registered diagrams`);
  const results = await Promise.allSettled(
    Object.entries(detectors).map(async ([key, { detector: detector38, loader: loader38 }]) => {
      if (!loader38) {
        return;
      }
      try {
        getDiagram(key);
      } catch {
        try {
          const { diagram: diagram2, id: id38 } = await loader38();
          registerDiagram(id38, diagram2, detector38);
        } catch (err) {
          log.error(`Failed to load external diagram with key ${key}. Removing from detectors.`);
          delete detectors[key];
          throw err;
        }
      }
    })
  );
  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    log.error(`Failed to load ${failed.length} external diagrams`);
    for (const res of failed) {
      log.error(res);
    }
    throw new Error(`Failed to load ${failed.length} external diagrams`);
  }
}, "loadRegisteredDiagrams");
var SVG_ROLE = "graphics-document document";
function setA11yDiagramInfo(svg, diagramType) {
  svg.attr("role", SVG_ROLE);
  if (diagramType !== "") {
    svg.attr("aria-roledescription", diagramType);
  }
}
__name(setA11yDiagramInfo, "setA11yDiagramInfo");
function addSVGa11yTitleDescription(svg, a11yTitle, a11yDesc, baseId) {
  if (svg.insert === void 0) {
    return;
  }
  if (a11yDesc) {
    const descId = `chart-desc-${baseId}`;
    svg.attr("aria-describedby", descId);
    svg.insert("desc", ":first-child").attr("id", descId).text(a11yDesc);
  }
  if (a11yTitle) {
    const titleId = `chart-title-${baseId}`;
    svg.attr("aria-labelledby", titleId);
    svg.insert("title", ":first-child").attr("id", titleId).text(a11yTitle);
  }
}
__name(addSVGa11yTitleDescription, "addSVGa11yTitleDescription");
var _a;
var Diagram = (_a = class {
  constructor(type, text, db, parser, renderer2) {
    this.type = type;
    this.text = text;
    this.db = db;
    this.parser = parser;
    this.renderer = renderer2;
  }
  static async fromText(codeObjectOrText, metadata = {}) {
    var _a2, _b, _c;
    const code = typeof codeObjectOrText === "string" ? { raw: codeObjectOrText, cleaned: codeObjectOrText } : codeObjectOrText;
    const config = getConfig();
    const type = detectType(code.cleaned, config);
    try {
      getDiagram(type);
    } catch {
      const loader38 = getDiagramLoader(type);
      if (!loader38) {
        throw new UnknownDiagramError(`Diagram ${type} not found.`);
      }
      const { id: id38, diagram: diagram2 } = await loader38();
      registerDiagram(id38, diagram2);
    }
    const { db, parser, renderer: renderer2, init: init2 } = getDiagram(type);
    if (parser.parser) {
      parser.parser.yy = db;
    }
    (_a2 = db.clear) == null ? void 0 : _a2.call(db);
    init2 == null ? void 0 : init2(config);
    if (metadata.title) {
      (_b = db.setDiagramTitle) == null ? void 0 : _b.call(db, metadata.title);
    }
    let source = code.cleaned;
    if (db.preserveCommentsWhenParsing && code.withComments) {
      const maxTextSize = config.maxTextSize ?? defaultConfig_default.maxTextSize;
      if (code.withComments.length > maxTextSize) {
        log.warn(
          `Comment-preserving source exceeds maxTextSize (${code.withComments.length} > ${maxTextSize}); parsing the comment-stripped text instead. Reported source positions will not account for comment lines.`
        );
      } else {
        source = code.withComments;
      }
    }
    const textToParse = encodeEntities(source) + "\n";
    if (code.frontmatterLineOffset) {
      (_c = db.setFrontmatterLineOffset) == null ? void 0 : _c.call(db, code.frontmatterLineOffset);
    }
    await parser.parse(textToParse);
    return new _a(type, textToParse, db, parser, renderer2);
  }
  async render(id38, version) {
    await this.renderer.draw(this.text, id38, version, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}, __name(_a, "Diagram"), _a);
var interactionFunctions = [];
var attachFunctions = __name(() => {
  interactionFunctions.forEach((f) => {
    f();
  });
  interactionFunctions = [];
}, "attachFunctions");
var cleanupComments = __name((text) => {
  return text.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
}, "cleanupComments");
function extractFrontMatter(text) {
  const matches = text.match(frontMatterRegex);
  if (!matches) {
    return {
      text,
      metadata: {}
    };
  }
  const indent = matches[1];
  const yamlBody = indent ? matches[2].split("\n").map((line2) => line2.startsWith(indent) ? line2.slice(indent.length) : line2).join("\n") : matches[2];
  let parsed = load(yamlBody, {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: JSON_SCHEMA
  }) ?? {};
  parsed = typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  const metadata = {};
  if (parsed.displayMode) {
    metadata.displayMode = parsed.displayMode.toString();
  }
  if (parsed.title) {
    metadata.title = parsed.title.toString();
  }
  if (parsed.config) {
    metadata.config = parsed.config;
  }
  return {
    text: text.slice(matches[0].length),
    metadata
  };
}
__name(extractFrontMatter, "extractFrontMatter");
var cleanupText = __name((code) => {
  return code.replace(/\r\n?/g, "\n").replace(
    /<(\w+)([^>]*)>/g,
    (match2, tag, attributes) => "<" + tag + attributes.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
}, "cleanupText");
var processFrontmatter = __name((code) => {
  const { text, metadata } = extractFrontMatter(code);
  const { displayMode, title, config = {} } = metadata;
  if (displayMode) {
    if (!config.gantt) {
      config.gantt = {};
    }
    config.gantt.displayMode = displayMode;
  }
  return { title, config, text };
}, "processFrontmatter");
var processDirectives = __name((code) => {
  const initDirective = utils_default.detectInit(code) ?? {};
  const wrapDirectives = utils_default.detectDirective(code, "wrap");
  if (Array.isArray(wrapDirectives)) {
    initDirective.wrap = wrapDirectives.some(({ type }) => type === "wrap");
  } else if ((wrapDirectives == null ? void 0 : wrapDirectives.type) === "wrap") {
    initDirective.wrap = true;
  }
  return {
    text: removeDirectives(code),
    directive: initDirective
  };
}, "processDirectives");
function preprocessDiagram(code) {
  const rawCode = code;
  const normalizedCode = cleanupText(code);
  const frontMatterResult = processFrontmatter(normalizedCode);
  const directiveResult = processDirectives(frontMatterResult.text);
  const config = cleanAndMerge(frontMatterResult.config, directiveResult.directive);
  const withComments = directiveResult.text;
  const cleanedCode = cleanupComments(withComments);
  const frontmatterLineOffset = normalizedCode.length > frontMatterResult.text.length ? (normalizedCode.substring(0, normalizedCode.length - frontMatterResult.text.length).match(/\n/g) ?? []).length : 0;
  return {
    code: {
      raw: rawCode,
      cleaned: cleanedCode,
      withComments,
      frontmatterLineOffset
    },
    title: frontMatterResult.title,
    config
  };
}
__name(preprocessDiagram, "preprocessDiagram");
function toBase64(str) {
  const utf8Bytes = new TextEncoder().encode(str);
  const utf8Str = Array.from(utf8Bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(utf8Str);
}
__name(toBase64, "toBase64");
var MAX_TEXTLENGTH = 5e4;
var MAX_TEXTLENGTH_EXCEEDED_MSG = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
var SECURITY_LVL_SANDBOX = "sandbox";
var SECURITY_LVL_LOOSE = "loose";
var XMLNS_SVG_STD = "http://www.w3.org/2000/svg";
var XMLNS_XLINK_STD = "http://www.w3.org/1999/xlink";
var XMLNS_XHTML_STD = "http://www.w3.org/1999/xhtml";
var IFRAME_WIDTH = "100%";
var IFRAME_HEIGHT = "100%";
var IFRAME_STYLES = "border:0;margin:0;";
var IFRAME_BODY_STYLE = "margin:0";
var IFRAME_SANDBOX_OPTS = "allow-top-navigation-by-user-activation allow-popups";
var IFRAME_NOT_SUPPORTED_MSG = 'The "iframe" tag is not supported by your browser.';
var DOMPURIFY_TAGS = ["foreignobject"];
var DOMPURIFY_ATTR = ["dominant-baseline"];
function processAndSetConfigs(text) {
  const processed = preprocessDiagram(text);
  reset();
  let diagramType;
  try {
    diagramType = detectType(processed.code.cleaned, getConfig());
  } catch {
    diagramType = void 0;
  }
  setDiagramConfigScope(diagramType);
  addDirective(processed.config ?? {});
  return processed;
}
__name(processAndSetConfigs, "processAndSetConfigs");
async function parse2(text, parseOptions) {
  addDiagrams();
  try {
    const { code, config } = processAndSetConfigs(text);
    const diagram2 = await Diagram.fromText(code);
    return { diagramType: diagram2.type, config };
  } catch (error) {
    if (parseOptions == null ? void 0 : parseOptions.suppressErrors) {
      return false;
    }
    throw error;
  } finally {
    setDiagramConfigScope(void 0);
  }
}
__name(parse2, "parse");
var cssImportantStyles = __name((cssClass, element, cssClasses = []) => {
  const declarationBlock = sanitizeCss(`{ ${cssClasses.join(" !important; ")} !important; }`);
  return `.${cssClass} ${element} ${declarationBlock}`;
}, "cssImportantStyles");
var createCssStyles = __name((config, classDefs = /* @__PURE__ */ new Map()) => {
  const cssStyles = new CSSStyleSheet();
  if (config.fontFamily !== void 0) {
    cssStyles.insertRule(
      `:root { --mermaid-font-family: ${config.fontFamily}}`,
      cssStyles.cssRules.length
    );
  }
  if (config.altFontFamily !== void 0) {
    cssStyles.insertRule(
      `:root { --mermaid-alt-font-family: ${config.altFontFamily}}`,
      cssStyles.cssRules.length
    );
  }
  if (classDefs instanceof Map) {
    const htmlLabels = getEffectiveHtmlLabels(config);
    const cssHtmlElements = ["> *", "span"];
    const cssShapeElements = ["rect", "polygon", "ellipse", "circle", "path"];
    const cssElements = htmlLabels ? cssHtmlElements : cssShapeElements;
    classDefs.forEach((styleClassDef) => {
      if (!isEmpty(styleClassDef.styles)) {
        cssElements.forEach((cssElement) => {
          cssStyles.insertRule(
            cssImportantStyles(styleClassDef.id, cssElement, styleClassDef.styles),
            cssStyles.cssRules.length
          );
        });
      }
      if (!isEmpty(styleClassDef.textStyles)) {
        cssStyles.insertRule(
          cssImportantStyles(
            styleClassDef.id,
            "tspan",
            ((styleClassDef == null ? void 0 : styleClassDef.textStyles) || []).map((s) => s.replace("color", "fill"))
          ),
          cssStyles.cssRules.length
        );
      }
    });
  }
  let cssString = "";
  if (config.themeCSS !== void 0) {
    if (typeof cssStyles.replaceSync === "function") {
      const themeCssStyleSheet = new CSSStyleSheet();
      themeCssStyleSheet.replaceSync(config.themeCSS);
      cssString = cssStyleSheetToString(themeCssStyleSheet) + "\n";
    } else {
      cssString += `${config.themeCSS}
`;
    }
  }
  return cssString + cssStyleSheetToString(cssStyles);
}, "createCssStyles");
var compileCSS = __name((namespace, css) => {
  return serialize(
    compile(`${namespace}{${css}}`),
    middleware([
      __name(function addNamespace(element, _index, _children, _callback) {
        if (element.type === "rule" && Array.isArray(element.props)) {
          if (element.parent && element.parent.type === KEYFRAMES) {
            return;
          }
          element.props = element.props.map((prop) => {
            if (prop === namespace && Array.isArray(element.children) && element.children.every((child) => {
              if (child.type !== "decl") {
                return false;
              }
              const allowedProps = /* @__PURE__ */ new Set([
                "font-family",
                "font-size",
                "fill"
              ]);
              return allowedProps.has(child.props);
            })) {
              return prop;
            }
            const alreadyNamespaced = (
              // If the prop already starts with the namespace followed by a space or >, then it's already namespaced.
              (prop.startsWith(`${namespace} `) || prop.startsWith(`${namespace}>`)) && // Column combinators are not yet widely supported, it's not yet compressed to `${namespace}||`,
              // so we need to add an extra check for that
              !prop.startsWith(`${namespace} ||`)
            );
            if (!alreadyNamespaced) {
              return `${namespace} ${prop}`;
            }
            return prop;
          });
        } else if (element.type.startsWith("@")) {
          const nestedAtRules = [
            MEDIA,
            SUPPORTS,
            LAYER,
            SCOPE,
            "@container",
            "@starting-style"
          ];
          const allowedAtRules = [
            ...nestedAtRules,
            KEYFRAMES
            // needed for Mermaid's animation feature
          ];
          if (!allowedAtRules.includes(element.type)) {
            log.warn(`Removing unsupported at-rule ${element.type} from CSS`);
            element.type = COMMENT;
          }
        }
      }, "addNamespace"),
      stringify
    ])
  );
}, "compileCSS");
var createUserStyles = __name((config, graphType, classDefs, svgId) => {
  const userCSSstyles = createCssStyles(config, classDefs);
  const allStyles = styles_default(
    graphType,
    userCSSstyles,
    { ...config.themeVariables, theme: config.theme, look: config.look },
    svgId
  );
  return compileCSS(svgId, allStyles);
}, "createUserStyles");
var cleanUpSvgCode = __name((svgCode = "", inSandboxMode, useArrowMarkerUrls) => {
  let cleanedUpSvg = svgCode;
  if (!useArrowMarkerUrls && !inSandboxMode) {
    cleanedUpSvg = cleanedUpSvg.replace(
      /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
      'marker-end="url(#'
    );
  }
  cleanedUpSvg = decodeEntities(cleanedUpSvg);
  cleanedUpSvg = cleanedUpSvg.replace(/<br>/g, "<br/>");
  return cleanedUpSvg;
}, "cleanUpSvgCode");
var putIntoIFrame = __name((svgCode = "", svgElement) => {
  var _a2, _b;
  const height = ((_b = (_a2 = svgElement == null ? void 0 : svgElement.viewBox) == null ? void 0 : _a2.baseVal) == null ? void 0 : _b.height) ? svgElement.viewBox.baseVal.height + "px" : IFRAME_HEIGHT;
  const base64encodedSrc = toBase64(`<body style="${IFRAME_BODY_STYLE}">${svgCode}</body>`);
  return `<iframe style="width:${IFRAME_WIDTH};height:${height};${IFRAME_STYLES}" src="data:text/html;charset=UTF-8;base64,${base64encodedSrc}" sandbox="${IFRAME_SANDBOX_OPTS}">
  ${IFRAME_NOT_SUPPORTED_MSG}
</iframe>`;
}, "putIntoIFrame");
var appendDivSvgG = __name((parentRoot, id38, enclosingDivId, divStyle, svgXlink) => {
  const enclosingDiv = parentRoot.append("div");
  enclosingDiv.attr("id", enclosingDivId);
  if (divStyle) {
    enclosingDiv.attr("style", divStyle);
  }
  const svgNode = enclosingDiv.append("svg").attr("id", id38).attr("width", "100%").attr("xmlns", XMLNS_SVG_STD);
  if (svgXlink) {
    svgNode.attr("xmlns:xlink", svgXlink);
  }
  svgNode.append("g");
  return parentRoot;
}, "appendDivSvgG");
function sandboxedIframe(parentNode, iFrameId) {
  return parentNode.append("iframe").attr("id", iFrameId).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
__name(sandboxedIframe, "sandboxedIframe");
var removeExistingElements = __name((doc, id38, divId, iFrameId) => {
  var _a2, _b, _c;
  (_a2 = doc.getElementById(id38)) == null ? void 0 : _a2.remove();
  (_b = doc.getElementById(divId)) == null ? void 0 : _b.remove();
  (_c = doc.getElementById(iFrameId)) == null ? void 0 : _c.remove();
}, "removeExistingElements");
var renderDiagram = __name(async function(id38, text, svgContainingElement) {
  var _a2, _b, _c, _d, _e, _f;
  addDiagrams();
  if (false) {
    profiler.start("render");
  }
  const processed = processAndSetConfigs(text);
  let code = processed.code;
  text = code.cleaned;
  const config = getConfig();
  log.debug(config);
  if (text.length > ((config == null ? void 0 : config.maxTextSize) ?? MAX_TEXTLENGTH)) {
    text = MAX_TEXTLENGTH_EXCEEDED_MSG;
    code = { raw: text, cleaned: text };
  }
  const idSelector = `#${id38}`;
  const iFrameID = "i" + id38;
  const iFrameID_selector = "#" + iFrameID;
  const enclosingDivID = "d" + id38;
  const enclosingDivID_selector = "#" + enclosingDivID;
  const removeTempElements = __name(() => {
    const tmpElementSelector = isSandboxed ? iFrameID_selector : enclosingDivID_selector;
    const node2 = select_default(tmpElementSelector).node();
    if (node2 && "remove" in node2) {
      node2.remove();
    }
  }, "removeTempElements");
  let root = select_default(document.body);
  const isSandboxed = config.securityLevel === SECURITY_LVL_SANDBOX;
  const isLooseSecurityLevel = config.securityLevel === SECURITY_LVL_LOOSE;
  const fontFamily = config.fontFamily;
  if (svgContainingElement !== void 0) {
    if (svgContainingElement) {
      svgContainingElement.innerHTML = "";
    }
    if (isSandboxed) {
      const iframe = sandboxedIframe(select_default(svgContainingElement), iFrameID);
      root = select_default(iframe.nodes()[0].contentDocument.body);
      root.node().style.margin = "0";
    } else {
      root = select_default(svgContainingElement);
    }
    appendDivSvgG(root, id38, enclosingDivID, `font-family: ${fontFamily}`, XMLNS_XLINK_STD);
  } else {
    removeExistingElements(document, id38, enclosingDivID, iFrameID);
    if (isSandboxed) {
      const iframe = sandboxedIframe(select_default(document.body), iFrameID);
      root = select_default(iframe.nodes()[0].contentDocument.body);
      root.node().style.margin = "0";
    } else {
      root = select_default("body");
    }
    appendDivSvgG(root, id38, enclosingDivID);
  }
  let diag;
  let parseEncounteredException;
  try {
    diag = false ? await profiler.span("parse", () => Diagram.fromText(code, { title: processed.title })) : await Diagram.fromText(code, { title: processed.title });
  } catch (error) {
    if (config.suppressErrorRendering) {
      removeTempElements();
      throw error;
    }
    diag = await Diagram.fromText("error");
    parseEncounteredException = error;
  }
  const element = root.select(enclosingDivID_selector).node();
  const diagramType = diag.type;
  const svg = element.firstChild;
  const firstChild = svg.firstChild;
  const diagramClassDefs = (_b = (_a2 = diag.renderer).getClasses) == null ? void 0 : _b.call(_a2, text, diag);
  const rules = createUserStyles(config, diagramType, diagramClassDefs, idSelector);
  const style1 = document.createElement("style");
  style1.innerHTML = rules;
  svg.insertBefore(style1, firstChild);
  try {
    if (false) {
      await profiler.span("draw", () => diag.renderer.draw(text, id38, "12.0.0", diag));
    } else {
      await diag.renderer.draw(text, id38, "12.0.0", diag);
    }
  } catch (e) {
    if (config.suppressErrorRendering) {
      removeTempElements();
    } else {
      errorRenderer_default.draw(text, id38, "12.0.0");
    }
    throw e;
  }
  const svgNode = root.select(`${enclosingDivID_selector} svg`);
  const a11yTitle = (_d = (_c = diag.db).getAccTitle) == null ? void 0 : _d.call(_c);
  const a11yDescr = (_f = (_e = diag.db).getAccDescription) == null ? void 0 : _f.call(_e);
  addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr);
  const serializeSvg = __name(() => {
    root.select(`[id="${id38}"]`).selectAll("foreignobject > *").attr("xmlns", XMLNS_XHTML_STD);
    let code2 = root.select(enclosingDivID_selector).node().innerHTML;
    log.debug("config.arrowMarkerAbsolute", config.arrowMarkerAbsolute);
    code2 = cleanUpSvgCode(code2, isSandboxed, evaluate(config.arrowMarkerAbsolute));
    if (isSandboxed) {
      const svgEl = root.select(enclosingDivID_selector + " svg").node();
      code2 = putIntoIFrame(code2, svgEl);
    } else if (!isLooseSecurityLevel) {
      code2 = purify.sanitize(code2, {
        ADD_TAGS: DOMPURIFY_TAGS,
        ADD_ATTR: DOMPURIFY_ATTR,
        HTML_INTEGRATION_POINTS: { foreignobject: true }
      });
    }
    attachFunctions();
    return code2;
  }, "serializeSvg");
  const svgCode = false ? await profiler.span("serialize", serializeSvg) : serializeSvg();
  if (parseEncounteredException) {
    throw parseEncounteredException;
  }
  removeTempElements();
  if (false) {
    profiler.stop();
  }
  return {
    diagramType,
    svg: svgCode,
    bindFunctions: diag.db.bindFunctions
  };
}, "renderDiagram");
var render = __name(async function(id38, text, svgContainingElement) {
  try {
    return await renderDiagram(id38, text, svgContainingElement);
  } finally {
    setDiagramConfigScope(void 0);
  }
}, "render");
function initialize(userOptions = {}) {
  var _a2;
  const options = assignWithDepth_default({}, userOptions);
  if ((options == null ? void 0 : options.fontFamily) && !((_a2 = options.themeVariables) == null ? void 0 : _a2.fontFamily)) {
    if (!options.themeVariables) {
      options.themeVariables = {};
    }
    options.themeVariables.fontFamily = options.fontFamily;
  }
  saveConfigFromInitialize(options);
  const fallbackTheme = defaultConfig.theme;
  if ((options == null ? void 0 : options.theme) && Object.hasOwn(themes_default, options.theme)) {
    options.themeVariables = themes_default[options.theme].getThemeVariables(
      options.themeVariables
    );
  } else if (options) {
    if (options.theme != null && options.theme !== "null") {
      options.theme = fallbackTheme;
    }
    options.themeVariables = themes_default[fallbackTheme].getThemeVariables(options.themeVariables);
  }
  const config = typeof options === "object" ? setSiteConfig(options) : getSiteConfig();
  setLogLevel(config.logLevel);
  addDiagrams();
}
__name(initialize, "initialize");
var getDiagramFromText = __name((text, metadata = {}) => {
  const { code } = preprocessDiagram(text);
  return Diagram.fromText(code, metadata);
}, "getDiagramFromText");
function addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr) {
  setA11yDiagramInfo(svgNode, diagramType);
  addSVGa11yTitleDescription(svgNode, a11yTitle, a11yDescr, svgNode.attr("id"));
}
__name(addA11yInfo, "addA11yInfo");
var mermaidAPI = Object.freeze({
  render,
  parse: parse2,
  getDiagramFromText,
  initialize,
  getConfig,
  /**
   * @deprecated This function does nothing. It will be overwritten by the next
   *             call to {@link render} or {@link parse}.
   */
  setConfig,
  getSiteConfig,
  updateSiteConfig,
  reset: __name(() => {
    reset();
  }, "reset"),
  globalReset: __name(() => {
    reset(defaultConfig);
  }, "globalReset"),
  defaultConfig
});
setLogLevel(getConfig().logLevel);
reset(getConfig());
var handleError = __name((error, errors, parseError) => {
  log.warn(error);
  if (isDetailedError(error)) {
    if (parseError) {
      parseError(error.str, error.hash);
    }
    errors.push({ ...error, message: error.str, error });
  } else {
    if (parseError) {
      parseError(error);
    }
    if (error instanceof Error) {
      errors.push({
        str: error.message,
        message: error.message,
        hash: error.name,
        error
      });
    }
  }
}, "handleError");
var run = __name(async function(options = {
  querySelector: ".mermaid"
}) {
  try {
    await runThrowsErrors(options);
  } catch (e) {
    if (isDetailedError(e)) {
      log.error(e.str);
    }
    if (mermaid.parseError) {
      mermaid.parseError(e);
    }
    if (!options.suppressErrors) {
      log.error("Use the suppressErrors option to suppress these errors");
      throw e;
    }
  }
}, "run");
var runThrowsErrors = __name(async function({ postRenderCallback, querySelector, nodes } = {
  querySelector: ".mermaid"
}) {
  const conf = mermaidAPI.getConfig();
  log.debug(`${!postRenderCallback ? "No " : ""}Callback function found`);
  let nodesToProcess;
  if (nodes) {
    nodesToProcess = nodes;
  } else if (querySelector) {
    nodesToProcess = document.querySelectorAll(querySelector);
  } else {
    throw new Error("Nodes and querySelector are both undefined");
  }
  log.debug(`Found ${nodesToProcess.length} diagrams`);
  if ((conf == null ? void 0 : conf.startOnLoad) !== void 0) {
    log.debug("Start On Load: " + (conf == null ? void 0 : conf.startOnLoad));
    mermaidAPI.updateSiteConfig({ startOnLoad: conf == null ? void 0 : conf.startOnLoad });
  }
  const idGenerator = new utils_default.InitIDGenerator(conf.deterministicIds, conf.deterministicIDSeed);
  let txt;
  const errors = [];
  for (const element of Array.from(nodesToProcess)) {
    log.info("Rendering diagram: " + element.id);
    if (element.getAttribute("data-processed")) {
      continue;
    }
    element.setAttribute("data-processed", "true");
    const id38 = `mermaid-${idGenerator.next()}`;
    txt = element.innerHTML;
    txt = dedent(utils_default.entityDecode(txt)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const init2 = utils_default.detectInit(txt);
    if (init2) {
      log.debug("Detected early reinit: ", init2);
    }
    try {
      const { svg, bindFunctions } = await render2(id38, txt, element);
      element.innerHTML = svg;
      if (postRenderCallback) {
        await postRenderCallback(id38);
      }
      if (bindFunctions) {
        bindFunctions(element);
      }
    } catch (error) {
      handleError(error, errors, mermaid.parseError);
    }
  }
  if (errors.length > 0) {
    throw errors[0];
  }
}, "runThrowsErrors");
var initialize2 = __name(function(config) {
  mermaidAPI.initialize(config);
}, "initialize");
var init = __name(async function(config, nodes, callback) {
  log.warn("mermaid.init is deprecated. Please use run instead.");
  if (config) {
    initialize2(config);
  }
  const runOptions = { postRenderCallback: callback, querySelector: ".mermaid" };
  if (typeof nodes === "string") {
    runOptions.querySelector = nodes;
  } else if (nodes) {
    if (nodes instanceof HTMLElement) {
      runOptions.nodes = [nodes];
    } else {
      runOptions.nodes = nodes;
    }
  }
  await run(runOptions);
}, "init");
var registerExternalDiagrams = __name(async (diagrams, {
  lazyLoad = true
} = {}) => {
  addDiagrams();
  registerLazyLoadedDiagrams(...diagrams);
  if (lazyLoad === false) {
    await loadRegisteredDiagrams();
  }
}, "registerExternalDiagrams");
var contentLoaded = __name(function() {
  if (mermaid.startOnLoad) {
    const { startOnLoad } = mermaidAPI.getConfig();
    if (startOnLoad) {
      mermaid.run().catch((err) => log.error("Mermaid failed to initialize", err));
    }
  }
}, "contentLoaded");
if (typeof document !== "undefined") {
  window.addEventListener("load", contentLoaded, false);
}
var setParseErrorHandler = __name(function(parseErrorHandler) {
  mermaid.parseError = parseErrorHandler;
}, "setParseErrorHandler");
var executionQueue = [];
var executionQueueRunning = false;
var executeQueue = __name(async () => {
  if (executionQueueRunning) {
    return;
  }
  executionQueueRunning = true;
  while (executionQueue.length > 0) {
    const f = executionQueue.shift();
    if (f) {
      try {
        await f();
      } catch (e) {
        log.error("Error executing queue", e);
      }
    }
  }
  executionQueueRunning = false;
}, "executeQueue");
var parse22 = __name(async (text, parseOptions) => {
  return new Promise((resolve, reject) => {
    const performCall = __name(() => new Promise((res, rej) => {
      mermaidAPI.parse(text, parseOptions).then(
        (r) => {
          res(r);
          resolve(r);
        },
        (e) => {
          var _a2;
          log.error("Error parsing", e);
          (_a2 = mermaid.parseError) == null ? void 0 : _a2.call(mermaid, e);
          rej(e);
          reject(e);
        }
      );
    }), "performCall");
    executionQueue.push(performCall);
    executeQueue().catch(reject);
  });
}, "parse");
var render2 = __name((id38, text, container) => {
  return new Promise((resolve, reject) => {
    const performCall = __name(() => new Promise((res, rej) => {
      mermaidAPI.render(id38, text, container).then(
        (r) => {
          res(r);
          resolve(r);
        },
        (e) => {
          var _a2;
          log.error("Error parsing", e);
          (_a2 = mermaid.parseError) == null ? void 0 : _a2.call(mermaid, e);
          rej(e);
          reject(e);
        }
      );
    }), "performCall");
    executionQueue.push(performCall);
    executeQueue().catch(reject);
  });
}, "render");
var getRegisteredDiagramsMetadata = __name(() => {
  return Object.keys(detectors).map((id38) => ({
    id: id38
  }));
}, "getRegisteredDiagramsMetadata");
var mermaid = {
  startOnLoad: true,
  mermaidAPI,
  parse: parse22,
  render: render2,
  init,
  run,
  registerExternalDiagrams,
  registerLayoutLoaders,
  initialize: initialize2,
  parseError: void 0,
  contentLoaded,
  setParseErrorHandler,
  detectType,
  registerIconPacks,
  getRegisteredDiagramsMetadata
};
var mermaid_default = mermaid;
export {
  mermaid_default as default
};
/*! Bundled license information:

mermaid/dist/mermaid.core.mjs:
  (*! Check if previously processed *)
  (*!
   * Wait for document loaded before starting the execution
   *)
*/
//# sourceMappingURL=mermaid.js.map
