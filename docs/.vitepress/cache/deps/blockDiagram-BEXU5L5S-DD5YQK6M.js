import {
  getIconStyles
} from "./chunk-YMGGJXI6.js";
import {
  insertLookDefs
} from "./chunk-O7QQEWBF.js";
import {
  Graph
} from "./chunk-YFW7T2XG.js";
import {
  insertEdge,
  insertEdgeLabel,
  markers_default,
  positionEdgeLabel
} from "./chunk-QIPQ2JAZ.js";
import {
  insertNode,
  positionNode
} from "./chunk-33QER2HL.js";
import "./chunk-H2RFP4YG.js";
import "./chunk-B7KO5YQV.js";
import "./chunk-ADFWXOGL.js";
import {
  colorSlotCount,
  hasPalette,
  isColorTheme,
  safeLook,
  stampColorSlot
} from "./chunk-E7WPOYWJ.js";
import "./chunk-DJ4W7BRS.js";
import "./chunk-XCU23T57.js";
import {
  clone,
  getStylesFromArray
} from "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  channel_default,
  clear,
  common_default,
  configureSvgSize,
  getConfig,
  getConfig2,
  rgba_default
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

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/blockDiagram-BEXU5L5S.mjs
var parser = function() {
  var o = __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [1, 15], $V1 = [1, 7], $V2 = [1, 13], $V3 = [1, 14], $V4 = [1, 19], $V5 = [1, 16], $V6 = [1, 17], $V7 = [1, 18], $V8 = [8, 30], $V9 = [8, 10, 21, 28, 29, 30, 31, 39, 43, 46], $Va = [1, 23], $Vb = [1, 24], $Vc = [8, 10, 15, 16, 21, 28, 29, 30, 31, 39, 43, 46], $Vd = [8, 10, 15, 16, 21, 27, 28, 29, 30, 31, 39, 43, 46], $Ve = [1, 49];
  var parser2 = {
    trace: __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "spaceLines": 3, "SPACELINE": 4, "NL": 5, "separator": 6, "SPACE": 7, "EOF": 8, "start": 9, "BLOCK_DIAGRAM_KEY": 10, "document": 11, "stop": 12, "statement": 13, "link": 14, "LINK": 15, "START_LINK": 16, "LINK_LABEL": 17, "STR": 18, "nodeStatement": 19, "columnsStatement": 20, "SPACE_BLOCK": 21, "blockStatement": 22, "classDefStatement": 23, "cssClassStatement": 24, "styleStatement": 25, "node": 26, "SIZE": 27, "COLUMNS": 28, "id-block": 29, "end": 30, "NODE_ID": 31, "nodeShapeNLabel": 32, "dirList": 33, "DIR": 34, "NODE_DSTART": 35, "NODE_DEND": 36, "BLOCK_ARROW_START": 37, "BLOCK_ARROW_END": 38, "classDef": 39, "CLASSDEF_ID": 40, "CLASSDEF_STYLEOPTS": 41, "DEFAULT": 42, "class": 43, "CLASSENTITY_IDS": 44, "STYLECLASS": 45, "style": 46, "STYLE_ENTITY_IDS": 47, "STYLE_DEFINITION_DATA": 48, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 4: "SPACELINE", 5: "NL", 7: "SPACE", 8: "EOF", 10: "BLOCK_DIAGRAM_KEY", 15: "LINK", 16: "START_LINK", 17: "LINK_LABEL", 18: "STR", 21: "SPACE_BLOCK", 27: "SIZE", 28: "COLUMNS", 29: "id-block", 30: "end", 31: "NODE_ID", 34: "DIR", 35: "NODE_DSTART", 36: "NODE_DEND", 37: "BLOCK_ARROW_START", 38: "BLOCK_ARROW_END", 39: "classDef", 40: "CLASSDEF_ID", 41: "CLASSDEF_STYLEOPTS", 42: "DEFAULT", 43: "class", 44: "CLASSENTITY_IDS", 45: "STYLECLASS", 46: "style", 47: "STYLE_ENTITY_IDS", 48: "STYLE_DEFINITION_DATA" },
    productions_: [0, [3, 1], [3, 2], [3, 2], [6, 1], [6, 1], [6, 1], [9, 3], [12, 1], [12, 1], [12, 2], [12, 2], [11, 1], [11, 2], [14, 1], [14, 4], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [19, 3], [19, 2], [19, 1], [20, 1], [22, 4], [22, 3], [26, 1], [26, 2], [33, 1], [33, 2], [32, 3], [32, 4], [23, 3], [23, 3], [24, 3], [25, 3]],
    performAction: __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 4:
          yy.getLogger().debug("Rule: separator (NL) ");
          break;
        case 5:
          yy.getLogger().debug("Rule: separator (Space) ");
          break;
        case 6:
          yy.getLogger().debug("Rule: separator (EOF) ");
          break;
        case 7:
          yy.getLogger().debug("Rule: hierarchy: ", $$[$0 - 1]);
          yy.setHierarchy($$[$0 - 1]);
          break;
        case 8:
          yy.getLogger().debug("Stop NL ");
          break;
        case 9:
          yy.getLogger().debug("Stop EOF ");
          break;
        case 10:
          yy.getLogger().debug("Stop NL2 ");
          break;
        case 11:
          yy.getLogger().debug("Stop EOF2 ");
          break;
        case 12:
          yy.getLogger().debug("Rule: statement: ", $$[$0]);
          typeof $$[$0].length === "number" ? this.$ = $$[$0] : this.$ = [$$[$0]];
          break;
        case 13:
          yy.getLogger().debug("Rule: statement #2: ", $$[$0 - 1]);
          this.$ = [$$[$0 - 1]].concat($$[$0]);
          break;
        case 14:
          yy.getLogger().debug("Rule: link: ", $$[$0], yytext);
          this.$ = { edgeTypeStr: $$[$0], label: "" };
          break;
        case 15:
          yy.getLogger().debug("Rule: LABEL link: ", $$[$0 - 3], $$[$0 - 1], $$[$0]);
          this.$ = { edgeTypeStr: $$[$0], label: $$[$0 - 1] };
          break;
        case 18:
          const num = parseInt($$[$0]);
          const spaceId = yy.generateId();
          this.$ = { id: spaceId, type: "space", label: "", width: num, children: [] };
          break;
        case 23:
          yy.getLogger().debug("Rule: (nodeStatement link node) ", $$[$0 - 2], $$[$0 - 1], $$[$0], " typestr: ", $$[$0 - 1].edgeTypeStr);
          const edgeData = yy.edgeStrToEdgeData($$[$0 - 1].edgeTypeStr);
          const startEdgeData = yy.edgeStrToEdgeStartData($$[$0 - 1].edgeTypeStr);
          const lineThickness = yy.edgeStrToThickness($$[$0 - 1].edgeTypeStr);
          const linePattern = yy.edgeStrToPattern($$[$0 - 1].edgeTypeStr);
          this.$ = [
            { id: $$[$0 - 2].id, label: $$[$0 - 2].label, type: $$[$0 - 2].type, directions: $$[$0 - 2].directions },
            { id: $$[$0 - 2].id + "-" + $$[$0].id, start: $$[$0 - 2].id, end: $$[$0].id, label: $$[$0 - 1].label, type: "edge", thickness: lineThickness, pattern: linePattern, directions: $$[$0].directions, arrowTypeEnd: edgeData, arrowTypeStart: startEdgeData },
            { id: $$[$0].id, label: $$[$0].label, type: yy.typeStr2Type($$[$0].typeStr), directions: $$[$0].directions }
          ];
          break;
        case 24:
          yy.getLogger().debug("Rule: nodeStatement (abc88 node size) ", $$[$0 - 1], $$[$0]);
          this.$ = { id: $$[$0 - 1].id, label: $$[$0 - 1].label, type: yy.typeStr2Type($$[$0 - 1].typeStr), directions: $$[$0 - 1].directions, widthInColumns: parseInt($$[$0], 10) };
          break;
        case 25:
          yy.getLogger().debug("Rule: nodeStatement (node) ", $$[$0]);
          this.$ = { id: $$[$0].id, label: $$[$0].label, type: yy.typeStr2Type($$[$0].typeStr), directions: $$[$0].directions, widthInColumns: 1 };
          break;
        case 26:
          yy.getLogger().debug("APA123", this ? this : "na");
          yy.getLogger().debug("COLUMNS: ", $$[$0]);
          this.$ = { type: "column-setting", columns: $$[$0] === "auto" ? -1 : parseInt($$[$0]) };
          break;
        case 27:
          yy.getLogger().debug("Rule: id-block statement : ", $$[$0 - 2], $$[$0 - 1]);
          const id2 = yy.generateId();
          this.$ = { ...$$[$0 - 2], type: "composite", children: $$[$0 - 1] };
          break;
        case 28:
          yy.getLogger().debug("Rule: blockStatement : ", $$[$0 - 2], $$[$0 - 1], $$[$0]);
          const id = yy.generateId();
          this.$ = { id, type: "composite", label: "", children: $$[$0 - 1] };
          break;
        case 29:
          yy.getLogger().debug("Rule: node (NODE_ID separator): ", $$[$0]);
          this.$ = { id: $$[$0] };
          break;
        case 30:
          yy.getLogger().debug("Rule: node (NODE_ID nodeShapeNLabel separator): ", $$[$0 - 1], $$[$0]);
          this.$ = { id: $$[$0 - 1], label: $$[$0].label, typeStr: $$[$0].typeStr, directions: $$[$0].directions };
          break;
        case 31:
          yy.getLogger().debug("Rule: dirList: ", $$[$0]);
          this.$ = [$$[$0]];
          break;
        case 32:
          yy.getLogger().debug("Rule: dirList: ", $$[$0 - 1], $$[$0]);
          this.$ = [$$[$0 - 1]].concat($$[$0]);
          break;
        case 33:
          yy.getLogger().debug("Rule: nodeShapeNLabel: ", $$[$0 - 2], $$[$0 - 1], $$[$0]);
          this.$ = { typeStr: $$[$0 - 2] + $$[$0], label: $$[$0 - 1] };
          break;
        case 34:
          yy.getLogger().debug("Rule: BLOCK_ARROW nodeShapeNLabel: ", $$[$0 - 3], $$[$0 - 2], " #3:", $$[$0 - 1], $$[$0]);
          this.$ = { typeStr: $$[$0 - 3] + $$[$0], label: $$[$0 - 2], directions: $$[$0 - 1] };
          break;
        case 35:
        case 36:
          this.$ = { type: "classDef", id: $$[$0 - 1].trim(), css: $$[$0].trim() };
          break;
        case 37:
          this.$ = { type: "applyClass", id: $$[$0 - 1].trim(), styleClass: $$[$0].trim() };
          break;
        case 38:
          this.$ = { type: "applyStyles", id: $$[$0 - 1].trim(), stylesStr: $$[$0].trim() };
          break;
      }
    }, "anonymous"),
    table: [{ 9: 1, 10: [1, 2] }, { 1: [3] }, { 10: $V0, 11: 3, 13: 4, 19: 5, 20: 6, 21: $V1, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 28: $V2, 29: $V3, 31: $V4, 39: $V5, 43: $V6, 46: $V7 }, { 8: [1, 20] }, o($V8, [2, 12], { 13: 4, 19: 5, 20: 6, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 11: 21, 10: $V0, 21: $V1, 28: $V2, 29: $V3, 31: $V4, 39: $V5, 43: $V6, 46: $V7 }), o($V9, [2, 16], { 14: 22, 15: $Va, 16: $Vb }), o($V9, [2, 17]), o($V9, [2, 18]), o($V9, [2, 19]), o($V9, [2, 20]), o($V9, [2, 21]), o($V9, [2, 22]), o($Vc, [2, 25], { 27: [1, 25] }), o($V9, [2, 26]), { 19: 26, 26: 12, 31: $V4 }, { 10: $V0, 11: 27, 13: 4, 19: 5, 20: 6, 21: $V1, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 28: $V2, 29: $V3, 31: $V4, 39: $V5, 43: $V6, 46: $V7 }, { 40: [1, 28], 42: [1, 29] }, { 44: [1, 30] }, { 47: [1, 31] }, o($Vd, [2, 29], { 32: 32, 35: [1, 33], 37: [1, 34] }), { 1: [2, 7] }, o($V8, [2, 13]), { 26: 35, 31: $V4 }, { 31: [2, 14] }, { 17: [1, 36] }, o($Vc, [2, 24]), { 10: $V0, 11: 37, 13: 4, 14: 22, 15: $Va, 16: $Vb, 19: 5, 20: 6, 21: $V1, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 28: $V2, 29: $V3, 31: $V4, 39: $V5, 43: $V6, 46: $V7 }, { 30: [1, 38] }, { 41: [1, 39] }, { 41: [1, 40] }, { 45: [1, 41] }, { 48: [1, 42] }, o($Vd, [2, 30]), { 18: [1, 43] }, { 18: [1, 44] }, o($Vc, [2, 23]), { 18: [1, 45] }, { 30: [1, 46] }, o($V9, [2, 28]), o($V9, [2, 35]), o($V9, [2, 36]), o($V9, [2, 37]), o($V9, [2, 38]), { 36: [1, 47] }, { 33: 48, 34: $Ve }, { 15: [1, 50] }, o($V9, [2, 27]), o($Vd, [2, 33]), { 38: [1, 51] }, { 33: 52, 34: $Ve, 38: [2, 31] }, { 31: [2, 15] }, o($Vd, [2, 34]), { 38: [2, 32] }],
    defaultActions: { 20: [2, 7], 23: [2, 14], 50: [2, 15], 52: [2, 32] },
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
            yy.getLogger().debug("Found block-beta");
            return 10;
            break;
          case 1:
            yy.getLogger().debug("Found id-block");
            return 29;
            break;
          case 2:
            yy.getLogger().debug("Found block");
            return 10;
            break;
          case 3:
            yy.getLogger().debug(".", yy_.yytext);
            break;
          case 4:
            yy.getLogger().debug("_", yy_.yytext);
            break;
          case 5:
            return 5;
            break;
          case 6:
            yy_.yytext = -1;
            return 28;
            break;
          case 7:
            yy_.yytext = yy_.yytext.replace(/columns\s+/, "");
            yy.getLogger().debug("COLUMNS (LEX)", yy_.yytext);
            return 28;
            break;
          case 8:
            this.pushState("md_string");
            break;
          case 9:
            return "MD_STR";
            break;
          case 10:
            this.popState();
            break;
          case 11:
            this.pushState("string");
            break;
          case 12:
            yy.getLogger().debug("LEX: POPPING STR:", yy_.yytext);
            this.popState();
            break;
          case 13:
            yy.getLogger().debug("LEX: STR end:", yy_.yytext);
            return "STR";
            break;
          case 14:
            yy_.yytext = yy_.yytext.replace(/space\:/, "");
            yy.getLogger().debug("SPACE NUM (LEX)", yy_.yytext);
            return 21;
            break;
          case 15:
            yy_.yytext = "1";
            yy.getLogger().debug("COLUMNS (LEX)", yy_.yytext);
            return 21;
            break;
          case 16:
            return 42;
            break;
          case 17:
            return "LINKSTYLE";
            break;
          case 18:
            return "INTERPOLATE";
            break;
          case 19:
            this.pushState("CLASSDEF");
            return 39;
            break;
          case 20:
            this.popState();
            this.pushState("CLASSDEFID");
            return "DEFAULT_CLASSDEF_ID";
            break;
          case 21:
            this.popState();
            this.pushState("CLASSDEFID");
            return 40;
            break;
          case 22:
            this.popState();
            return 41;
            break;
          case 23:
            this.pushState("CLASS");
            return 43;
            break;
          case 24:
            this.popState();
            this.pushState("CLASS_STYLE");
            return 44;
            break;
          case 25:
            this.popState();
            return 45;
            break;
          case 26:
            this.pushState("STYLE_STMNT");
            return 46;
            break;
          case 27:
            this.popState();
            this.pushState("STYLE_DEFINITION");
            return 47;
            break;
          case 28:
            this.popState();
            return 48;
            break;
          case 29:
            this.pushState("acc_title");
            return "acc_title";
            break;
          case 30:
            this.popState();
            return "acc_title_value";
            break;
          case 31:
            this.pushState("acc_descr");
            return "acc_descr";
            break;
          case 32:
            this.popState();
            return "acc_descr_value";
            break;
          case 33:
            this.pushState("acc_descr_multiline");
            break;
          case 34:
            this.popState();
            break;
          case 35:
            return "acc_descr_multiline_value";
            break;
          case 36:
            return 30;
            break;
          case 37:
            this.popState();
            yy.getLogger().debug("Lex: ((");
            return "NODE_DEND";
            break;
          case 38:
            this.popState();
            yy.getLogger().debug("Lex: ((");
            return "NODE_DEND";
            break;
          case 39:
            this.popState();
            yy.getLogger().debug("Lex: ))");
            return "NODE_DEND";
            break;
          case 40:
            this.popState();
            yy.getLogger().debug("Lex: ((");
            return "NODE_DEND";
            break;
          case 41:
            this.popState();
            yy.getLogger().debug("Lex: ((");
            return "NODE_DEND";
            break;
          case 42:
            this.popState();
            yy.getLogger().debug("Lex: (-");
            return "NODE_DEND";
            break;
          case 43:
            this.popState();
            yy.getLogger().debug("Lex: -)");
            return "NODE_DEND";
            break;
          case 44:
            this.popState();
            yy.getLogger().debug("Lex: ((");
            return "NODE_DEND";
            break;
          case 45:
            this.popState();
            yy.getLogger().debug("Lex: ]]");
            return "NODE_DEND";
            break;
          case 46:
            this.popState();
            yy.getLogger().debug("Lex: (");
            return "NODE_DEND";
            break;
          case 47:
            this.popState();
            yy.getLogger().debug("Lex: ])");
            return "NODE_DEND";
            break;
          case 48:
            this.popState();
            yy.getLogger().debug("Lex: /]");
            return "NODE_DEND";
            break;
          case 49:
            this.popState();
            yy.getLogger().debug("Lex: /]");
            return "NODE_DEND";
            break;
          case 50:
            this.popState();
            yy.getLogger().debug("Lex: )]");
            return "NODE_DEND";
            break;
          case 51:
            this.popState();
            yy.getLogger().debug("Lex: )");
            return "NODE_DEND";
            break;
          case 52:
            this.popState();
            yy.getLogger().debug("Lex: ]>");
            return "NODE_DEND";
            break;
          case 53:
            this.popState();
            yy.getLogger().debug("Lex: ]");
            return "NODE_DEND";
            break;
          case 54:
            yy.getLogger().debug("Lexa: -)");
            this.pushState("NODE");
            return 35;
            break;
          case 55:
            yy.getLogger().debug("Lexa: (-");
            this.pushState("NODE");
            return 35;
            break;
          case 56:
            yy.getLogger().debug("Lexa: ))");
            this.pushState("NODE");
            return 35;
            break;
          case 57:
            yy.getLogger().debug("Lexa: )");
            this.pushState("NODE");
            return 35;
            break;
          case 58:
            yy.getLogger().debug("Lex: (((");
            this.pushState("NODE");
            return 35;
            break;
          case 59:
            yy.getLogger().debug("Lexa: )");
            this.pushState("NODE");
            return 35;
            break;
          case 60:
            yy.getLogger().debug("Lexa: )");
            this.pushState("NODE");
            return 35;
            break;
          case 61:
            yy.getLogger().debug("Lexa: )");
            this.pushState("NODE");
            return 35;
            break;
          case 62:
            yy.getLogger().debug("Lexc: >");
            this.pushState("NODE");
            return 35;
            break;
          case 63:
            yy.getLogger().debug("Lexa: ([");
            this.pushState("NODE");
            return 35;
            break;
          case 64:
            yy.getLogger().debug("Lexa: )");
            this.pushState("NODE");
            return 35;
            break;
          case 65:
            this.pushState("NODE");
            return 35;
            break;
          case 66:
            this.pushState("NODE");
            return 35;
            break;
          case 67:
            this.pushState("NODE");
            return 35;
            break;
          case 68:
            this.pushState("NODE");
            return 35;
            break;
          case 69:
            this.pushState("NODE");
            return 35;
            break;
          case 70:
            this.pushState("NODE");
            return 35;
            break;
          case 71:
            this.pushState("NODE");
            return 35;
            break;
          case 72:
            yy.getLogger().debug("Lexa: [");
            this.pushState("NODE");
            return 35;
            break;
          case 73:
            this.pushState("BLOCK_ARROW");
            yy.getLogger().debug("LEX ARR START");
            return 37;
            break;
          case 74:
            yy.getLogger().debug("Lex: NODE_ID", yy_.yytext);
            return 31;
            break;
          case 75:
            yy.getLogger().debug("Lex: EOF", yy_.yytext);
            return 8;
            break;
          case 76:
            this.pushState("md_string");
            break;
          case 77:
            this.pushState("md_string");
            break;
          case 78:
            return "NODE_DESCR";
            break;
          case 79:
            this.popState();
            break;
          case 80:
            yy.getLogger().debug("Lex: Starting string");
            this.pushState("string");
            break;
          case 81:
            yy.getLogger().debug("LEX ARR: Starting string");
            this.pushState("string");
            break;
          case 82:
            yy.getLogger().debug("LEX: NODE_DESCR:", yy_.yytext);
            return "NODE_DESCR";
            break;
          case 83:
            yy.getLogger().debug("LEX POPPING");
            this.popState();
            break;
          case 84:
            yy.getLogger().debug("Lex: =>BAE");
            this.pushState("ARROW_DIR");
            break;
          case 85:
            yy_.yytext = yy_.yytext.replace(/^,\s*/, "");
            yy.getLogger().debug("Lex (right): dir:", yy_.yytext);
            return "DIR";
            break;
          case 86:
            yy_.yytext = yy_.yytext.replace(/^,\s*/, "");
            yy.getLogger().debug("Lex (left):", yy_.yytext);
            return "DIR";
            break;
          case 87:
            yy_.yytext = yy_.yytext.replace(/^,\s*/, "");
            yy.getLogger().debug("Lex (x):", yy_.yytext);
            return "DIR";
            break;
          case 88:
            yy_.yytext = yy_.yytext.replace(/^,\s*/, "");
            yy.getLogger().debug("Lex (y):", yy_.yytext);
            return "DIR";
            break;
          case 89:
            yy_.yytext = yy_.yytext.replace(/^,\s*/, "");
            yy.getLogger().debug("Lex (up):", yy_.yytext);
            return "DIR";
            break;
          case 90:
            yy_.yytext = yy_.yytext.replace(/^,\s*/, "");
            yy.getLogger().debug("Lex (down):", yy_.yytext);
            return "DIR";
            break;
          case 91:
            yy_.yytext = "]>";
            yy.getLogger().debug("Lex (ARROW_DIR end):", yy_.yytext);
            this.popState();
            this.popState();
            return "BLOCK_ARROW_END";
            break;
          case 92:
            yy.getLogger().debug("Lex: LINK", "#" + yy_.yytext + "#");
            return 15;
            break;
          case 93:
            yy.getLogger().debug("Lex: LINK", yy_.yytext);
            return 15;
            break;
          case 94:
            yy.getLogger().debug("Lex: LINK", yy_.yytext);
            return 15;
            break;
          case 95:
            yy.getLogger().debug("Lex: LINK", yy_.yytext);
            return 15;
            break;
          case 96:
            yy.getLogger().debug("Lex: START_LINK", yy_.yytext);
            this.pushState("LLABEL");
            return 16;
            break;
          case 97:
            yy.getLogger().debug("Lex: START_LINK", yy_.yytext);
            this.pushState("LLABEL");
            return 16;
            break;
          case 98:
            yy.getLogger().debug("Lex: START_LINK", yy_.yytext);
            this.pushState("LLABEL");
            return 16;
            break;
          case 99:
            this.pushState("md_string");
            break;
          case 100:
            yy.getLogger().debug("Lex: Starting string");
            this.pushState("string");
            return "LINK_LABEL";
            break;
          case 101:
            this.popState();
            yy.getLogger().debug("Lex: LINK", "#" + yy_.yytext + "#");
            return 15;
            break;
          case 102:
            this.popState();
            yy.getLogger().debug("Lex: LINK", yy_.yytext);
            return 15;
            break;
          case 103:
            this.popState();
            yy.getLogger().debug("Lex: LINK", yy_.yytext);
            return 15;
            break;
          case 104:
            yy.getLogger().debug("Lex: COLON", yy_.yytext);
            yy_.yytext = yy_.yytext.slice(1);
            return 27;
            break;
        }
      }, "anonymous"),
      rules: [/^(?:block-beta\b)/, /^(?:block:)/, /^(?:block\b)/, /^(?:[\s]+)/, /^(?:[\n]+)/, /^(?:((\u000D\u000A)|(\u000A)))/, /^(?:columns\s+auto\b)/, /^(?:columns\s+[\d]+)/, /^(?:["][`])/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:space[:]\d+)/, /^(?:space\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\s+)/, /^(?:DEFAULT\s+)/, /^(?:\w+\s+)/, /^(?:[^\n]*)/, /^(?:class\s+)/, /^(?:(\w+)+((,\s*\w+)*))/, /^(?:[^\n]*)/, /^(?:style\s+)/, /^(?:(\w+)+((,\s*\w+)*))/, /^(?:[^\n]*)/, /^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:end\b\s*)/, /^(?:\(\(\()/, /^(?:\)\)\))/, /^(?:[\)]\))/, /^(?:\}\})/, /^(?:\})/, /^(?:\(-)/, /^(?:-\))/, /^(?:\(\()/, /^(?:\]\])/, /^(?:\()/, /^(?:\]\))/, /^(?:\\\])/, /^(?:\/\])/, /^(?:\)\])/, /^(?:[\)])/, /^(?:\]>)/, /^(?:[\]])/, /^(?:-\))/, /^(?:\(-)/, /^(?:\)\))/, /^(?:\))/, /^(?:\(\(\()/, /^(?:\(\()/, /^(?:\{\{)/, /^(?:\{)/, /^(?:>)/, /^(?:\(\[)/, /^(?:\()/, /^(?:\[\[)/, /^(?:\[\|)/, /^(?:\[\()/, /^(?:\)\)\))/, /^(?:\[\\)/, /^(?:\[\/)/, /^(?:\[\\)/, /^(?:\[)/, /^(?:<\[)/, /^(?:[^\(\[\n\-\)\{\}\s\<\>:=]+)/, /^(?:$)/, /^(?:["][`])/, /^(?:["][`])/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["])/, /^(?:["])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:\]>\s*\()/, /^(?:,?\s*right\s*)/, /^(?:,?\s*left\s*)/, /^(?:,?\s*x\s*)/, /^(?:,?\s*y\s*)/, /^(?:,?\s*up\s*)/, /^(?:,?\s*down\s*)/, /^(?:\)\s*)/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?:\s*~~[\~]+\s*)/, /^(?:\s*[xo<]?--\s*)/, /^(?:\s*[xo<]?==\s*)/, /^(?:\s*[xo<]?-\.\s*)/, /^(?:["][`])/, /^(?:["])/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?::\d+)/],
      conditions: { "STYLE_DEFINITION": { "rules": [28], "inclusive": false }, "STYLE_STMNT": { "rules": [27], "inclusive": false }, "CLASSDEFID": { "rules": [22], "inclusive": false }, "CLASSDEF": { "rules": [20, 21], "inclusive": false }, "CLASS_STYLE": { "rules": [25], "inclusive": false }, "CLASS": { "rules": [24], "inclusive": false }, "LLABEL": { "rules": [99, 100, 101, 102, 103], "inclusive": false }, "ARROW_DIR": { "rules": [85, 86, 87, 88, 89, 90, 91], "inclusive": false }, "BLOCK_ARROW": { "rules": [76, 81, 84], "inclusive": false }, "NODE": { "rules": [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 77, 80], "inclusive": false }, "md_string": { "rules": [9, 10, 78, 79], "inclusive": false }, "space": { "rules": [], "inclusive": false }, "string": { "rules": [12, 13, 82, 83], "inclusive": false }, "acc_descr_multiline": { "rules": [34, 35], "inclusive": false }, "acc_descr": { "rules": [32], "inclusive": false }, "acc_title": { "rules": [30], "inclusive": false }, "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 14, 15, 16, 17, 18, 19, 23, 26, 29, 31, 33, 36, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 92, 93, 94, 95, 96, 97, 98, 104], "inclusive": true } }
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
var block_default = parser;
var blockDatabase = /* @__PURE__ */ new Map();
var edgeList = [];
var edgeCount = /* @__PURE__ */ new Map();
var COLOR_KEYWORD = "color";
var FILL_KEYWORD = "fill";
var BG_FILL = "bgFill";
var STYLECLASS_SEP = ",";
var classes = /* @__PURE__ */ new Map();
var diagramId = "";
var sanitizeText = __name((txt) => common_default.sanitizeText(txt, getConfig2()), "sanitizeText");
var addStyleClass = __name(function(id, styleAttributes = "") {
  let foundClass = classes.get(id);
  if (!foundClass) {
    foundClass = { id, styles: [], textStyles: [] };
    classes.set(id, foundClass);
  }
  if (styleAttributes !== void 0 && styleAttributes !== null) {
    styleAttributes.split(STYLECLASS_SEP).forEach((attrib) => {
      const fixedAttrib = attrib.replace(/([^;]*);/, "$1").trim();
      if (RegExp(COLOR_KEYWORD).exec(attrib)) {
        const newStyle1 = fixedAttrib.replace(FILL_KEYWORD, BG_FILL);
        const newStyle2 = newStyle1.replace(COLOR_KEYWORD, FILL_KEYWORD);
        foundClass.textStyles.push(newStyle2);
      }
      foundClass.styles.push(fixedAttrib);
    });
  }
}, "addStyleClass");
var addStyle2Node = __name(function(id, styles = "") {
  const foundBlock = blockDatabase.get(id);
  if (styles !== void 0 && styles !== null) {
    foundBlock.styles = styles.split(STYLECLASS_SEP);
  }
}, "addStyle2Node");
var setCssClass = __name(function(itemIds, cssClassName) {
  itemIds.split(",").forEach(function(id) {
    let foundBlock = blockDatabase.get(id);
    if (foundBlock === void 0) {
      const trimmedId = id.trim();
      foundBlock = { id: trimmedId, type: "na", children: [] };
      blockDatabase.set(trimmedId, foundBlock);
    }
    if (!foundBlock.classes) {
      foundBlock.classes = [];
    }
    foundBlock.classes.push(cssClassName);
  });
}, "setCssClass");
var nextColorIndex = 0;
var populateBlockDatabase = __name((_blockList, parent) => {
  const blockList = _blockList.flat();
  const children = [];
  const columnSettingBlock = blockList.find((b) => (b == null ? void 0 : b.type) === "column-setting");
  const column = (columnSettingBlock == null ? void 0 : columnSettingBlock.columns) ?? -1;
  for (const block of blockList) {
    if (typeof column === "number" && column > 0 && block.type !== "column-setting" && typeof block.widthInColumns === "number" && block.widthInColumns > column) {
      log.warn(
        `Block ${block.id} width ${block.widthInColumns} exceeds configured column width ${column}`
      );
    }
    if (block.label) {
      block.label = sanitizeText(block.label);
    }
    if (block.type === "classDef") {
      addStyleClass(block.id, block.css);
      continue;
    }
    if (block.type === "applyClass") {
      setCssClass(block.id, (block == null ? void 0 : block.styleClass) ?? "");
      continue;
    }
    if (block.type === "applyStyles") {
      if (block == null ? void 0 : block.stylesStr) {
        addStyle2Node(block.id, block == null ? void 0 : block.stylesStr);
      }
      continue;
    }
    if (block.type === "column-setting") {
      parent.columns = block.columns ?? -1;
    } else if (block.type === "edge") {
      const count = (edgeCount.get(block.id) ?? 0) + 1;
      edgeCount.set(block.id, count);
      block.id = count + "-" + block.id;
      edgeList.push(block);
    } else {
      if (!block.label) {
        if (block.type === "composite") {
          block.label = "";
        } else {
          block.label = block.id;
        }
      }
      const existingBlock = blockDatabase.get(block.id);
      if (existingBlock === void 0) {
        if (block.type === "composite") {
          block.colorIndex = nextColorIndex++;
        }
        blockDatabase.set(block.id, block);
      } else {
        if (block.type !== "na") {
          existingBlock.type = block.type;
        }
        if (block.label !== block.id) {
          existingBlock.label = block.label;
        }
      }
      if (block.children) {
        populateBlockDatabase(block.children, block);
      }
      if (block.type === "space") {
        const w = block.width ?? 1;
        for (let j = 0; j < w; j++) {
          const newBlock = clone(block);
          newBlock.id = newBlock.id + "-" + j;
          blockDatabase.set(newBlock.id, newBlock);
          children.push(newBlock);
        }
      } else if (existingBlock === void 0) {
        children.push(block);
      }
    }
  }
  parent.children = children;
}, "populateBlockDatabase");
var blocks = [];
var rootBlock = { id: "root", type: "composite", children: [], columns: -1 };
var clear2 = __name(() => {
  log.debug("Clear called");
  clear();
  rootBlock = { id: "root", type: "composite", children: [], columns: -1 };
  blockDatabase = /* @__PURE__ */ new Map([["root", rootBlock]]);
  blocks = [];
  classes = /* @__PURE__ */ new Map();
  edgeList = [];
  edgeCount = /* @__PURE__ */ new Map();
  diagramId = "";
  nextColorIndex = 0;
}, "clear");
function typeStr2Type(typeStr) {
  log.debug("typeStr2Type", typeStr);
  switch (typeStr) {
    case "[]":
      return "square";
    case "()":
      log.debug("we have a round");
      return "round";
    case "(())":
      return "circle";
    case ">]":
      return "rect_left_inv_arrow";
    case "{}":
      return "diamond";
    case "{{}}":
      return "hexagon";
    case "([])":
      return "stadium";
    case "[[]]":
      return "subroutine";
    case "[()]":
      return "cylinder";
    case "((()))":
      return "doublecircle";
    case "[//]":
      return "lean_right";
    case "[\\\\]":
      return "lean_left";
    case "[/\\]":
      return "trapezoid";
    case "[\\/]":
      return "inv_trapezoid";
    case "<[]>":
      return "block_arrow";
    default:
      return "na";
  }
}
__name(typeStr2Type, "typeStr2Type");
function edgeTypeStr2Type(typeStr) {
  log.debug("typeStr2Type", typeStr);
  switch (typeStr) {
    case "==":
      return "thick";
    default:
      return "normal";
  }
}
__name(edgeTypeStr2Type, "edgeTypeStr2Type");
function edgeStrToEdgeData(typeStr) {
  const lastChar = typeStr.trim().slice(-1);
  switch (lastChar) {
    case "x":
      return "arrow_cross";
    case "o":
      return "arrow_circle";
    case ">":
      return "arrow_point";
    default:
      return "";
  }
}
__name(edgeStrToEdgeData, "edgeStrToEdgeData");
function edgeStrToEdgeStartData(typeStr) {
  const firstChar = typeStr.trim().charAt(0);
  switch (firstChar) {
    case "x":
      return "arrow_cross";
    case "o":
      return "arrow_circle";
    case "<":
      return "arrow_point";
    default:
      return "arrow_open";
  }
}
__name(edgeStrToEdgeStartData, "edgeStrToEdgeStartData");
function edgeStrToThickness(typeStr) {
  return typeStr.includes("==") ? "thick" : "normal";
}
__name(edgeStrToThickness, "edgeStrToThickness");
function edgeStrToPattern(typeStr) {
  if (typeStr.includes(".-")) {
    return "dotted";
  }
  return "solid";
}
__name(edgeStrToPattern, "edgeStrToPattern");
var cnt = 0;
var generateId = __name(() => {
  cnt++;
  return "id-" + Math.random().toString(36).substr(2, 12) + "-" + cnt;
}, "generateId");
var setHierarchy = __name((block) => {
  rootBlock.children = block;
  populateBlockDatabase(block, rootBlock);
  blocks = rootBlock.children;
}, "setHierarchy");
var getColumns = __name((blockId) => {
  const block = blockDatabase.get(blockId);
  if (!block) {
    return -1;
  }
  if (block.columns) {
    return block.columns;
  }
  if (!block.children) {
    return -1;
  }
  return block.children.length;
}, "getColumns");
var getBlocksFlat = __name(() => {
  return [...blockDatabase.values()];
}, "getBlocksFlat");
var getBlocks = __name(() => {
  return blocks || [];
}, "getBlocks");
var getEdges = __name(() => {
  return edgeList;
}, "getEdges");
var getBlock = __name((id) => {
  return blockDatabase.get(id);
}, "getBlock");
var setBlock = __name((block) => {
  blockDatabase.set(block.id, block);
}, "setBlock");
var setDiagramId = __name((id) => {
  diagramId = id;
}, "setDiagramId");
var getDiagramId = __name(() => diagramId, "getDiagramId");
var getLogger = __name(() => log, "getLogger");
var getClasses = __name(function() {
  return classes;
}, "getClasses");
var db = {
  getConfig: __name(() => getConfig().block, "getConfig"),
  typeStr2Type,
  edgeTypeStr2Type,
  edgeStrToEdgeData,
  edgeStrToEdgeStartData,
  edgeStrToThickness,
  edgeStrToPattern,
  getLogger,
  getBlocksFlat,
  getBlocks,
  getEdges,
  setHierarchy,
  getBlock,
  setBlock,
  getColumns,
  getClasses,
  clear: clear2,
  generateId,
  setDiagramId,
  getDiagramId
};
var blockDB_default = db;
var genColor = __name((options) => {
  const { theme, bkgColorArray, borderColorArray } = options;
  if (!isColorTheme(theme, borderColorArray)) {
    return "";
  }
  const look = safeLook(options.look);
  const hasBkgColors = hasPalette(bkgColorArray);
  let sections = "";
  for (let i = 0; i < colorSlotCount(options.THEME_COLOR_LIMIT, borderColorArray); i++) {
    const borderColor = borderColorArray[i % borderColorArray.length];
    const fill = hasBkgColors ? `fill: ${bkgColorArray[i % bkgColorArray.length]};` : "";
    const slot = `[data-look="${look}"][data-color-id="color-${i}"]`;
    sections += `

    ${slot}.node rect.composite {
      stroke: ${borderColor};
      ${fill}
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
    /* From the theme, as every other diagram does. Pinned at 1px here, so block drew a
       thinner border than an identical flowchart node under any theme asking for more --
       the neo theme asks for 2. Nothing downstream corrected it: the neo rules set stroke
       and filter, never stroke-width. */
    stroke-width: ${options.strokeWidth ?? 1}px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${options.arrowheadColor};
  }

  .edgePaths .path {
    stroke: ${options.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${options.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${options.edgeLabelBackground};
    /*
     * This is for backward compatibility with existing code that didn't
     * add a \`<p>\` around edge labels.
     *
     * TODO: We should probably remove this in a future release.
     */
    p {
      margin: 0;
      padding: 0;
      display: inline;
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
    background-color: ${options.edgeLabelBackground};
  }

  .node .cluster {
    // fill: ${fade(options.mainBkg, 0.5)};
    fill: ${fade(options.clusterBkg, 0.5)};
    stroke: ${fade(options.clusterBorder, 0.2)};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    stroke-width: 1px;
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

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${options.textColor};
  }
  ${getIconStyles()}
`, "getStyles");
var styles_default = getStyles;
function calculateBlockPosition(columns, position) {
  if (columns === 0 || !Number.isInteger(columns)) {
    throw new Error("Columns must be an integer !== 0.");
  }
  if (position < 0 || !Number.isInteger(position)) {
    throw new Error("Position must be a non-negative integer." + position);
  }
  if (columns < 0) {
    return { px: position, py: 0 };
  }
  if (columns === 1) {
    return { px: 0, py: position };
  }
  const px = position % columns;
  const py = Math.floor(position / columns);
  return { px, py };
}
__name(calculateBlockPosition, "calculateBlockPosition");
var getMaxChildSize = __name((block) => {
  let maxWidth = 0;
  let maxHeight = 0;
  for (const child of block.children) {
    const { width, height, x, y } = child.size ?? { width: 0, height: 0, x: 0, y: 0 };
    log.debug(
      "getMaxChildSize abc95 child:",
      child.id,
      "width:",
      width,
      "height:",
      height,
      "x:",
      x,
      "y:",
      y,
      child.type
    );
    if (child.type === "space") {
      continue;
    }
    const normalizedWidth = width / (child.widthInColumns ?? 1);
    if (normalizedWidth > maxWidth) {
      maxWidth = normalizedWidth;
    }
    if (height > maxHeight) {
      maxHeight = height;
    }
  }
  return { width: maxWidth, height: maxHeight };
}, "getMaxChildSize");
function setBlockSizes(block, db2, siblingWidth = 0, siblingHeight = 0, padding = 8) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  log.debug(
    "setBlockSizes abc95 (start)",
    block.id,
    (_a = block == null ? void 0 : block.size) == null ? void 0 : _a.x,
    "block width =",
    block == null ? void 0 : block.size,
    "siblingWidth",
    siblingWidth
  );
  if (!((_b = block == null ? void 0 : block.size) == null ? void 0 : _b.width)) {
    block.size = {
      width: siblingWidth,
      height: siblingHeight,
      x: 0,
      y: 0
    };
  }
  let maxWidth = 0;
  let maxHeight = 0;
  if (((_c = block.children) == null ? void 0 : _c.length) > 0) {
    for (const child of block.children) {
      setBlockSizes(child, db2, 0, 0, padding);
    }
    const childSize = getMaxChildSize(block);
    maxWidth = childSize.width;
    maxHeight = childSize.height;
    log.debug("setBlockSizes abc95 maxWidth of", block.id, ":s children is ", maxWidth, maxHeight);
    for (const child of block.children) {
      if (child.size) {
        log.debug(
          `abc95 Setting size of children of ${block.id} id=${child.id} ${maxWidth} ${maxHeight} ${JSON.stringify(child.size)}`
        );
        child.size.width = maxWidth * (child.widthInColumns ?? 1) + padding * ((child.widthInColumns ?? 1) - 1);
        child.size.height = maxHeight;
        child.size.x = 0;
        child.size.y = 0;
        log.debug(
          `abc95 updating size of ${block.id} children child:${child.id} maxWidth:${maxWidth} maxHeight:${maxHeight}`
        );
      }
    }
    for (const child of block.children) {
      setBlockSizes(child, db2, maxWidth, maxHeight, padding);
    }
    const columns = block.columns ?? -1;
    let numItems = 0;
    for (const child of block.children) {
      numItems += child.widthInColumns ?? 1;
    }
    let xSize = block.children.length;
    if (columns > 0 && columns < numItems) {
      xSize = columns;
    }
    const ySize = Math.ceil(numItems / xSize);
    let width = xSize * (maxWidth + padding) + padding;
    let height = ySize * (maxHeight + padding) + padding;
    if (width < siblingWidth) {
      log.debug(
        `Detected to small sibling: abc95 ${block.id} siblingWidth ${siblingWidth} siblingHeight ${siblingHeight} width ${width}`
      );
      width = siblingWidth;
      height = siblingHeight;
      const childWidth = (siblingWidth - xSize * padding - padding) / xSize;
      const childHeight = (siblingHeight - ySize * padding - padding) / ySize;
      log.debug("Size indata abc88", block.id, "childWidth", childWidth, "maxWidth", maxWidth);
      log.debug("Size indata abc88", block.id, "childHeight", childHeight, "maxHeight", maxHeight);
      log.debug("Size indata abc88 xSize", xSize, "padding", padding);
      for (const child of block.children) {
        if (child.size) {
          child.size.width = childWidth;
          child.size.height = childHeight;
          child.size.x = 0;
          child.size.y = 0;
        }
      }
    }
    log.debug(
      `abc95 (finale calc) ${block.id} xSize ${xSize} ySize ${ySize} columns ${columns}${block.children.length} width=${Math.max(width, ((_d = block.size) == null ? void 0 : _d.width) || 0)}`
    );
    if (width < (((_e = block == null ? void 0 : block.size) == null ? void 0 : _e.width) || 0)) {
      width = ((_f = block == null ? void 0 : block.size) == null ? void 0 : _f.width) || 0;
      const num = columns > 0 ? Math.min(block.children.length, columns) : block.children.length;
      if (num > 0) {
        const childWidth = (width - num * padding - padding) / num;
        log.debug("abc95 (growing to fit) width", block.id, width, (_g = block.size) == null ? void 0 : _g.width, childWidth);
        for (const child of block.children) {
          if (child.size) {
            child.size.width = childWidth;
          }
        }
      }
    }
    block.size = {
      width,
      height,
      x: 0,
      y: 0
    };
  }
  log.debug(
    "setBlockSizes abc94 (done)",
    block.id,
    (_h = block == null ? void 0 : block.size) == null ? void 0 : _h.x,
    (_i = block == null ? void 0 : block.size) == null ? void 0 : _i.width,
    (_j = block == null ? void 0 : block.size) == null ? void 0 : _j.y,
    (_k = block == null ? void 0 : block.size) == null ? void 0 : _k.height
  );
}
__name(setBlockSizes, "setBlockSizes");
function layoutBlocks(block, db2, padding = 8) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  log.debug(
    `abc85 layout blocks (=>layoutBlocks) ${block.id} x: ${(_a = block == null ? void 0 : block.size) == null ? void 0 : _a.x} y: ${(_b = block == null ? void 0 : block.size) == null ? void 0 : _b.y} width: ${(_c = block == null ? void 0 : block.size) == null ? void 0 : _c.width}`
  );
  const columns = block.columns ?? -1;
  log.debug("layoutBlocks columns abc95", block.id, "=>", columns, block);
  if (block.children && // find max width of children
  block.children.length > 0) {
    const width = ((_e = (_d = block == null ? void 0 : block.children[0]) == null ? void 0 : _d.size) == null ? void 0 : _e.width) ?? 0;
    const widthOfChildren = block.children.length * width + (block.children.length - 1) * padding;
    log.debug("widthOfChildren 88", widthOfChildren, "posX");
    const rowHeights = /* @__PURE__ */ new Map();
    {
      let colPos = 0;
      for (const child of block.children) {
        if (!child.size) {
          continue;
        }
        const { py } = calculateBlockPosition(columns, colPos);
        const currentMax = rowHeights.get(py) ?? 0;
        if (child.size.height > currentMax) {
          rowHeights.set(py, child.size.height);
        }
        let filled = (child == null ? void 0 : child.widthInColumns) ?? 1;
        if (columns > 0) {
          filled = Math.min(filled, columns - colPos % columns);
        }
        colPos += filled;
      }
    }
    const rowYOffsets = /* @__PURE__ */ new Map();
    {
      let offset = 0;
      const rows = [...rowHeights.keys()].sort((a, b) => a - b);
      for (const row of rows) {
        rowYOffsets.set(row, offset);
        offset += (rowHeights.get(row) ?? 0) + padding;
      }
    }
    let columnPos = 0;
    log.debug("abc91 block?.size?.x", block.id, (_f = block == null ? void 0 : block.size) == null ? void 0 : _f.x);
    let startingPosX = ((_g = block == null ? void 0 : block.size) == null ? void 0 : _g.x) ? ((_h = block == null ? void 0 : block.size) == null ? void 0 : _h.x) + (-((_i = block == null ? void 0 : block.size) == null ? void 0 : _i.width) / 2 || 0) : -padding;
    let rowPos = 0;
    for (const child of block.children) {
      const parent = block;
      if (!child.size) {
        continue;
      }
      const { width: width2, height } = child.size;
      const { px, py } = calculateBlockPosition(columns, columnPos);
      if (py != rowPos) {
        rowPos = py;
        startingPosX = ((_j = block == null ? void 0 : block.size) == null ? void 0 : _j.x) ? ((_k = block == null ? void 0 : block.size) == null ? void 0 : _k.x) + (-((_l = block == null ? void 0 : block.size) == null ? void 0 : _l.width) / 2 || 0) : -padding;
        log.debug("New row in layout for block", block.id, " and child ", child.id, rowPos);
      }
      log.debug(
        `abc89 layout blocks (child) id: ${child.id} Pos: ${columnPos} (px, py) ${px},${py} (${(_m = parent == null ? void 0 : parent.size) == null ? void 0 : _m.x},${(_n = parent == null ? void 0 : parent.size) == null ? void 0 : _n.y}) parent: ${parent.id} width: ${width2}${padding}`
      );
      if (parent.size) {
        const halfWidth = width2 / 2;
        child.size.x = startingPosX + padding + halfWidth;
        log.debug(
          `abc91 layout blocks (calc) px, pyid:${child.id} startingPos=X${startingPosX} new startingPosX${child.size.x} ${halfWidth} padding=${padding} width=${width2} halfWidth=${halfWidth} => x:${child.size.x} y:${child.size.y} ${child.widthInColumns} (width * (child?.w || 1)) / 2 ${width2 * ((child == null ? void 0 : child.widthInColumns) ?? 1) / 2}`
        );
        startingPosX = child.size.x + halfWidth;
        const rowYOffset = rowYOffsets.get(py) ?? 0;
        const rowHeight = rowHeights.get(py) ?? height;
        child.size.y = parent.size.y - parent.size.height / 2 + rowYOffset + rowHeight / 2 + padding;
        log.debug(
          `abc88 layout blocks (calc) px, pyid:${child.id}startingPosX${startingPosX}${padding}${halfWidth}=>x:${child.size.x}y:${child.size.y}${child.widthInColumns}(width * (child?.w || 1)) / 2${width2 * ((child == null ? void 0 : child.widthInColumns) ?? 1) / 2}`
        );
      }
      if (child.children) {
        layoutBlocks(child, db2, padding);
      }
      let columnsFilled = (child == null ? void 0 : child.widthInColumns) ?? 1;
      if (columns > 0) {
        columnsFilled = Math.min(columnsFilled, columns - columnPos % columns);
      }
      columnPos += columnsFilled;
      log.debug("abc88 columnsPos", child, columnPos);
    }
  }
  log.debug(
    `layout blocks (<==layoutBlocks) ${block.id} x: ${(_o = block == null ? void 0 : block.size) == null ? void 0 : _o.x} y: ${(_p = block == null ? void 0 : block.size) == null ? void 0 : _p.y} width: ${(_q = block == null ? void 0 : block.size) == null ? void 0 : _q.width}`
  );
}
__name(layoutBlocks, "layoutBlocks");
function findBounds(block, { minX, minY, maxX, maxY } = { minX: 0, minY: 0, maxX: 0, maxY: 0 }) {
  if (block.size && block.id !== "root") {
    const { x, y, width, height } = block.size;
    if (x - width / 2 < minX) {
      minX = x - width / 2;
    }
    if (y - height / 2 < minY) {
      minY = y - height / 2;
    }
    if (x + width / 2 > maxX) {
      maxX = x + width / 2;
    }
    if (y + height / 2 > maxY) {
      maxY = y + height / 2;
    }
  }
  if (block.children) {
    for (const child of block.children) {
      ({ minX, minY, maxX, maxY } = findBounds(child, { minX, minY, maxX, maxY }));
    }
  }
  return { minX, minY, maxX, maxY };
}
__name(findBounds, "findBounds");
function layout(db2) {
  var _a, _b;
  const root = db2.getBlock("root");
  if (!root) {
    return;
  }
  const padding = ((_b = (_a = getConfig2()) == null ? void 0 : _a.block) == null ? void 0 : _b.padding) ?? 8;
  setBlockSizes(root, db2, 0, 0, padding);
  layoutBlocks(root, db2, padding);
  log.debug("getBlocks", JSON.stringify(root, null, 2));
  const { minX, minY, maxX, maxY } = findBounds(root);
  const height = maxY - minY;
  const width = maxX - minX;
  return { x: minX, y: minY, width, height };
}
__name(layout, "layout");
function getNodeFromBlock(block, db2, positioned = false) {
  var _a, _b, _c;
  const vertex = block;
  let classStr = "default";
  if ((((_a = vertex == null ? void 0 : vertex.classes) == null ? void 0 : _a.length) || 0) > 0) {
    classStr = ((vertex == null ? void 0 : vertex.classes) ?? []).join(" ");
  }
  classStr = classStr + " flowchart-label";
  const cssCompiledStyles = ((vertex == null ? void 0 : vertex.classes) ?? []).flatMap(
    (className) => {
      var _a2;
      return ((_a2 = db2.getClasses().get(className)) == null ? void 0 : _a2.styles) ?? [];
    }
  );
  let radius = 0;
  let shape = "rect";
  let padding;
  switch (vertex.type) {
    case "round":
      radius = 5;
      shape = "rect";
      break;
    case "composite":
      radius = 0;
      shape = "composite";
      padding = 0;
      break;
    case "square":
      shape = "rect";
      break;
    case "diamond":
      shape = "question";
      break;
    case "hexagon":
      shape = "hexagon";
      break;
    case "block_arrow":
      shape = "block_arrow";
      break;
    case "odd":
      shape = "rect_left_inv_arrow";
      break;
    case "lean_right":
      shape = "lean_right";
      break;
    case "lean_left":
      shape = "lean_left";
      break;
    case "trapezoid":
      shape = "trapezoid";
      break;
    case "inv_trapezoid":
      shape = "inv_trapezoid";
      break;
    case "rect_left_inv_arrow":
      shape = "rect_left_inv_arrow";
      break;
    case "circle":
      shape = "circle";
      break;
    case "ellipse":
      shape = "ellipse";
      break;
    case "stadium":
      shape = "stadium";
      break;
    case "subroutine":
      shape = "subroutine";
      break;
    case "cylinder":
      shape = "cylinder";
      break;
    case "group":
      shape = "rect";
      break;
    case "doublecircle":
      shape = "doublecircle";
      break;
    default:
      shape = "rect";
  }
  const styles = getStylesFromArray((vertex == null ? void 0 : vertex.styles) ?? []);
  const vertexText = vertex.label;
  const bounds = vertex.size ?? { width: 0, height: 0, x: 0, y: 0 };
  const dbDiagramId = db2.getDiagramId();
  const node = {
    labelStyle: styles.labelStyle,
    shape,
    label: vertexText,
    labelText: vertexText,
    rx: radius,
    ry: radius,
    class: classStr,
    cssClasses: classStr,
    cssStyles: (vertex == null ? void 0 : vertex.styles) ?? [],
    cssCompiledStyles,
    style: styles.style,
    id: vertex.id,
    domId: dbDiagramId ? `${dbDiagramId}-${vertex.id}` : vertex.id,
    isGroup: false,
    directions: vertex.directions,
    width: bounds.width || void 0,
    height: bounds.height || void 0,
    wrappingWidth: bounds.width || Number.POSITIVE_INFINITY,
    x: bounds.x,
    y: bounds.y,
    positioned,
    intersect: void 0,
    padding: padding ?? ((_c = (_b = getConfig()) == null ? void 0 : _b.block) == null ? void 0 : _c.padding) ?? 0,
    widthInColumns: vertex.widthInColumns ?? 1,
    colorIndex: vertex.colorIndex,
    look: getConfig().look
  };
  return node;
}
__name(getNodeFromBlock, "getNodeFromBlock");
async function calculateBlockSize(elem, block, db2) {
  var _a;
  const node = getNodeFromBlock(block, db2, false);
  if (block.type === "group") {
    return;
  }
  const config = getConfig();
  const nodeEl = await insertNode(elem, node, { config });
  const boundingBox = ((_a = nodeEl.node()) == null ? void 0 : _a.getBBox()) ?? { width: 0, height: 0 };
  const obj = db2.getBlock(node.id);
  obj.size = { width: boundingBox.width, height: boundingBox.height, x: 0, y: 0, node: nodeEl };
  db2.setBlock(obj);
  nodeEl.remove();
}
__name(calculateBlockSize, "calculateBlockSize");
async function insertBlockPositioned(elem, block, db2) {
  var _a;
  const node = getNodeFromBlock(block, db2, true);
  const obj = db2.getBlock(node.id);
  if (obj.type !== "space") {
    const config = getConfig();
    const el = await insertNode(elem, node, { config });
    if (node.colorIndex !== void 0) {
      stampColorSlot(
        // `insertNode` returns an anchor instead of a group when the node carries a
        // link, and both are `SVGGraphicsElement`s -- but the union of the two selections
        // is not assignable to one instantiation of the generic, so it is narrowed here.
        el,
        node.colorIndex,
        config.theme,
        (_a = config.themeVariables) == null ? void 0 : _a.borderColorArray
      );
    }
    block.intersect = node == null ? void 0 : node.intersect;
    positionNode(node);
  }
}
__name(insertBlockPositioned, "insertBlockPositioned");
async function performOperations(elem, blocks2, db2, operation) {
  for (const block of blocks2) {
    await operation(elem, block, db2);
    if (block.children) {
      await performOperations(elem, block.children, db2, operation);
    }
  }
}
__name(performOperations, "performOperations");
async function calculateBlockSizes(elem, blocks2, db2) {
  await performOperations(elem, blocks2, db2, calculateBlockSize);
}
__name(calculateBlockSizes, "calculateBlockSizes");
async function insertBlocks(elem, blocks2, db2) {
  await performOperations(elem, blocks2, db2, insertBlockPositioned);
}
__name(insertBlocks, "insertBlocks");
async function insertEdges(elem, edges, blocks2, db2, id) {
  const g = new Graph({
    multigraph: true,
    compound: true
  });
  g.setGraph({
    rankdir: "TB",
    nodesep: 10,
    ranksep: 10,
    marginx: 8,
    marginy: 8
  });
  for (const block of blocks2) {
    if (block.size) {
      g.setNode(block.id, {
        width: block.size.width,
        height: block.size.height,
        intersect: block.intersect
      });
    }
  }
  for (const edge of edges) {
    if (edge.start && edge.end) {
      const startBlock = db2.getBlock(edge.start);
      const endBlock = db2.getBlock(edge.end);
      if ((startBlock == null ? void 0 : startBlock.size) && (endBlock == null ? void 0 : endBlock.size)) {
        const start = startBlock.size;
        const end = endBlock.size;
        const points = [
          { x: start.x, y: start.y },
          { x: start.x + (end.x - start.x) / 2, y: start.y + (end.y - start.y) / 2 },
          { x: end.x, y: end.y }
        ];
        const prefixedEdgeId = id ? `${id}-${edge.id}` : edge.id;
        const thicknessClass = edge.thickness === "thick" ? "edge-thickness-thick" : "edge-thickness-normal";
        const patternClass = edge.pattern === "dotted" ? "edge-pattern-dotted" : "edge-pattern-solid";
        const dynamicClasses = `${thicknessClass} ${patternClass} flowchart-link LS-a1 LE-b1`;
        insertEdge(
          elem,
          {
            ...edge,
            id: prefixedEdgeId,
            arrowTypeEnd: edge.arrowTypeEnd,
            arrowTypeStart: edge.arrowTypeStart,
            points,
            classes: dynamicClasses
          },
          {},
          "block",
          g.node(edge.start),
          g.node(edge.end),
          id
        );
        if (edge.label) {
          await insertEdgeLabel(elem, {
            ...edge,
            label: edge.label,
            labelStyle: "stroke: #333; stroke-width: 1.5px;fill:none;",
            arrowTypeEnd: edge.arrowTypeEnd,
            arrowTypeStart: edge.arrowTypeStart,
            points,
            classes: dynamicClasses
          });
          positionEdgeLabel(
            { ...edge, x: points[1].x, y: points[1].y },
            {
              originalPath: points
            }
          );
        }
      }
    }
  }
}
__name(insertEdges, "insertEdges");
var getClasses2 = __name(function(text, diagObj) {
  return diagObj.db.getClasses();
}, "getClasses");
var draw = __name(async function(text, id, _version, diagObj) {
  var _a;
  const { securityLevel, block: conf } = getConfig();
  const db2 = diagObj.db;
  db2.setDiagramId(id);
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select_default("#i" + id);
  }
  const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
  const svg = securityLevel === "sandbox" ? root.select(`[id="${id}"]`) : select_default(`[id="${id}"]`);
  insertLookDefs(svg, getConfig());
  const markers = ["point", "circle", "cross"];
  markers_default(svg, markers, diagObj.type, id);
  const bl = db2.getBlocks();
  const blArr = db2.getBlocksFlat();
  const edges = db2.getEdges();
  const nodes = svg.insert("g").attr("class", "block");
  await calculateBlockSizes(nodes, bl, db2);
  const bounds = layout(db2);
  await insertBlocks(nodes, bl, db2);
  await insertEdges(nodes, edges, blArr, db2, id);
  const renderedBounds = (_a = nodes.node()) == null ? void 0 : _a.getBBox();
  const bounds2 = renderedBounds && Number.isFinite(renderedBounds.width) && Number.isFinite(renderedBounds.height) ? renderedBounds : bounds;
  if (bounds2) {
    const magicFactor = Math.max(1, Math.round(0.125 * (bounds2.width / bounds2.height)));
    const height = bounds2.height + magicFactor + 10;
    const width = bounds2.width + 10;
    const { useMaxWidth } = conf;
    configureSvgSize(svg, height, width, !!useMaxWidth);
    log.debug("Here Bounds", bounds, bounds2);
    svg.attr(
      "viewBox",
      `${bounds2.x - 5} ${bounds2.y - 5} ${bounds2.width + 10} ${bounds2.height + 10}`
    );
  }
}, "draw");
var blockRenderer_default = {
  draw,
  getClasses: getClasses2
};
var diagram = {
  parser: block_default,
  db: blockDB_default,
  renderer: blockRenderer_default,
  styles: styles_default
};
export {
  diagram
};
//# sourceMappingURL=blockDiagram-BEXU5L5S-DD5YQK6M.js.map
