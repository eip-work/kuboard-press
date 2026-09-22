import {
  getDiagramElement
} from "./chunk-ERF4FMIM.js";
import {
  setupViewPortForSVG
} from "./chunk-GIPUZ2JZ.js";
import {
  getRegisteredLayoutAlgorithm,
  render
} from "./chunk-PHTJAK3Q.js";
import "./chunk-O7QQEWBF.js";
import "./chunk-QIPQ2JAZ.js";
import "./chunk-5ITZU7CU.js";
import "./chunk-33QER2HL.js";
import "./chunk-H2RFP4YG.js";
import "./chunk-B7KO5YQV.js";
import "./chunk-ADFWXOGL.js";
import {
  COLOR_THEMES,
  hasPalette,
  isColorTheme,
  paletteSlotCount,
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
  getAccDescription,
  getAccTitle,
  getConfig2,
  getDiagramTitle,
  rgba_default,
  setAccDescription,
  setAccTitle,
  setDiagramTitle
} from "./chunk-MLEFVBYW.js";
import {
  log,
  select_default
} from "./chunk-3OLEAA6P.js";
import "./chunk-FXFNNUUF.js";
import {
  __export,
  __name
} from "./chunk-55T4Z5NV.js";
import "./chunk-KEXKKQVW.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/erDiagram-OPXOYQCR.mjs
var parser = function() {
  var o = __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [6, 9, 21, 23, 25, 27, 34, 37, 38, 39, 40, 41, 43, 46, 47, 51, 53, 54, 55], $V1 = [2, 2], $V2 = [1, 7], $V3 = [1, 9], $V4 = [1, 10], $V5 = [1, 11], $V6 = [1, 12], $V7 = [1, 30], $V8 = [1, 23], $V9 = [1, 24], $Va = [1, 25], $Vb = [1, 26], $Vc = [1, 27], $Vd = [1, 19], $Ve = [1, 28], $Vf = [1, 29], $Vg = [1, 20], $Vh = [1, 18], $Vi = [1, 21], $Vj = [1, 22], $Vk = [2, 6], $Vl = [6, 9, 21, 23, 25, 27, 33, 34, 37, 38, 39, 40, 41, 43, 46, 47, 51, 53, 54, 55], $Vm = [1, 36], $Vn = [1, 37], $Vo = [1, 38], $Vp = [1, 39], $Vq = [1, 40], $Vr = [6, 9, 12, 14, 16, 19, 20, 21, 23, 25, 27, 33, 34, 37, 38, 39, 40, 41, 43, 46, 47, 50, 51, 53, 54, 55, 69, 70, 71, 72, 73], $Vs = [1, 46], $Vt = [1, 47], $Vu = [1, 57], $Vv = [43, 51, 53, 54, 55, 74, 75], $Vw = [1, 70], $Vx = [1, 68], $Vy = [1, 65], $Vz = [1, 69], $VA = [1, 71], $VB = [6, 9, 12, 16, 21, 23, 25, 27, 33, 34, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 51, 52, 53, 54, 55, 69, 70, 71, 72, 73], $VC = [1, 78], $VD = [1, 77], $VE = [1, 76], $VF = [69, 70, 71, 72, 73], $VG = [1, 91], $VH = [6, 9, 45, 50], $VI = [6, 9, 12, 44, 45, 50, 51, 52], $VJ = [1, 101], $VK = [1, 100], $VL = [1, 99], $VM = [18, 61], $VN = [1, 110], $VO = [1, 109], $VP = [20, 43, 51, 53, 54, 55], $VQ = [18, 61, 64, 66];
  var parser2 = {
    trace: __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "start": 3, "ER_DIAGRAM": 4, "document": 5, "EOF": 6, "line": 7, "statement": 8, "NEWLINE": 9, "entityName": 10, "relSpec": 11, "COLON": 12, "role": 13, "STYLE_SEPARATOR": 14, "idList": 15, "BLOCK_START": 16, "attributes": 17, "BLOCK_STOP": 18, "SQS": 19, "SQE": 20, "title": 21, "title_value": 22, "acc_title": 23, "acc_title_value": 24, "acc_descr": 25, "acc_descr_value": 26, "acc_descr_multiline_value": 27, "direction": 28, "classDefStatement": 29, "classStatement": 30, "styleStatement": 31, "subgraphHeader": 32, "END": 33, "SUBGRAPH": 34, "separator": 35, "subgraphTitle": 36, "direction_tb": 37, "direction_bt": 38, "direction_rl": 39, "direction_lr": 40, "CLASSDEF": 41, "stylesOpt": 42, "UNICODE_TEXT": 43, "STYLE_TEXT": 44, "COMMA": 45, "CLASS": 46, "STYLE": 47, "style": 48, "styleComponent": 49, "SEMI": 50, "NUM": 51, "BRKT": 52, "ENTITY_NAME": 53, "DECIMAL_NUM": 54, "ENTITY_ONE": 55, "attribute": 56, "attributeType": 57, "attributeName": 58, "attributeKeyTypeList": 59, "attributeComment": 60, "ATTRIBUTE_WORD": 61, "?": 62, "attributeKeyType": 63, ",": 64, "ATTRIBUTE_KEY": 65, "COMMENT": 66, "cardinality": 67, "relType": 68, "ZERO_OR_ONE": 69, "ZERO_OR_MORE": 70, "ONE_OR_MORE": 71, "ONLY_ONE": 72, "MD_PARENT": 73, "NON_IDENTIFYING": 74, "IDENTIFYING": 75, "WORD": 76, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 4: "ER_DIAGRAM", 6: "EOF", 9: "NEWLINE", 12: "COLON", 14: "STYLE_SEPARATOR", 16: "BLOCK_START", 18: "BLOCK_STOP", 19: "SQS", 20: "SQE", 21: "title", 22: "title_value", 23: "acc_title", 24: "acc_title_value", 25: "acc_descr", 26: "acc_descr_value", 27: "acc_descr_multiline_value", 33: "END", 34: "SUBGRAPH", 37: "direction_tb", 38: "direction_bt", 39: "direction_rl", 40: "direction_lr", 41: "CLASSDEF", 43: "UNICODE_TEXT", 44: "STYLE_TEXT", 45: "COMMA", 46: "CLASS", 47: "STYLE", 50: "SEMI", 51: "NUM", 52: "BRKT", 53: "ENTITY_NAME", 54: "DECIMAL_NUM", 55: "ENTITY_ONE", 61: "ATTRIBUTE_WORD", 62: "?", 64: ",", 65: "ATTRIBUTE_KEY", 66: "COMMENT", 69: "ZERO_OR_ONE", 70: "ZERO_OR_MORE", 71: "ONE_OR_MORE", 72: "ONLY_ONE", 73: "MD_PARENT", 74: "NON_IDENTIFYING", 75: "IDENTIFYING", 76: "WORD" },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 1], [7, 1], [7, 1], [8, 5], [8, 9], [8, 7], [8, 7], [8, 4], [8, 6], [8, 3], [8, 5], [8, 1], [8, 3], [8, 7], [8, 9], [8, 6], [8, 8], [8, 4], [8, 6], [8, 2], [8, 2], [8, 2], [8, 1], [8, 1], [8, 1], [8, 1], [8, 1], [8, 3], [32, 3], [32, 6], [36, 1], [36, 2], [28, 1], [28, 1], [28, 1], [28, 1], [29, 4], [15, 1], [15, 1], [15, 3], [15, 3], [30, 3], [31, 4], [42, 1], [42, 3], [48, 1], [48, 2], [35, 1], [35, 1], [35, 1], [49, 1], [49, 1], [49, 1], [49, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [17, 1], [17, 2], [56, 2], [56, 3], [56, 3], [56, 4], [57, 1], [57, 2], [58, 1], [59, 1], [59, 3], [63, 1], [60, 1], [11, 3], [67, 1], [67, 1], [67, 1], [67, 1], [67, 1], [68, 1], [68, 1], [13, 1], [13, 1], [13, 1]],
    performAction: __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          break;
        case 2:
          this.$ = [];
          break;
        case 3:
          this.$ = $$[$0 - 1].concat($$[$0]);
          break;
        case 4:
          this.$ = $$[$0];
          break;
        case 5:
        case 6:
          this.$ = [];
          break;
        case 7:
          yy.addEntity($$[$0 - 4]);
          yy.addEntity($$[$0 - 2]);
          yy.addRelationship($$[$0 - 4], $$[$0], $$[$0 - 2], $$[$0 - 3]);
          this.$ = [$$[$0 - 4], $$[$0 - 2]];
          break;
        case 8:
          yy.addEntity($$[$0 - 8]);
          yy.addEntity($$[$0 - 4]);
          yy.addRelationship($$[$0 - 8], $$[$0], $$[$0 - 4], $$[$0 - 5]);
          yy.setClass([$$[$0 - 8]], $$[$0 - 6]);
          yy.setClass([$$[$0 - 4]], $$[$0 - 2]);
          this.$ = [$$[$0 - 8], $$[$0 - 4]];
          break;
        case 9:
          yy.addEntity($$[$0 - 6]);
          yy.addEntity($$[$0 - 2]);
          yy.addRelationship($$[$0 - 6], $$[$0], $$[$0 - 2], $$[$0 - 3]);
          yy.setClass([$$[$0 - 6]], $$[$0 - 4]);
          this.$ = [$$[$0 - 6], $$[$0 - 2]];
          break;
        case 10:
          yy.addEntity($$[$0 - 6]);
          yy.addEntity($$[$0 - 4]);
          yy.addRelationship($$[$0 - 6], $$[$0], $$[$0 - 4], $$[$0 - 5]);
          yy.setClass([$$[$0 - 4]], $$[$0 - 2]);
          this.$ = [$$[$0 - 6], $$[$0 - 4]];
          break;
        case 11:
          yy.addEntity($$[$0 - 3]);
          yy.addAttributes($$[$0 - 3], $$[$0 - 1]);
          this.$ = [$$[$0 - 3]];
          break;
        case 12:
          yy.addEntity($$[$0 - 5]);
          yy.addAttributes($$[$0 - 5], $$[$0 - 1]);
          yy.setClass([$$[$0 - 5]], $$[$0 - 3]);
          this.$ = [$$[$0 - 5]];
          break;
        case 13:
          yy.addEntity($$[$0 - 2]);
          this.$ = [$$[$0 - 2]];
          break;
        case 14:
          yy.addEntity($$[$0 - 4]);
          yy.setClass([$$[$0 - 4]], $$[$0 - 2]);
          this.$ = [$$[$0 - 4]];
          break;
        case 15:
          yy.addEntity($$[$0]);
          this.$ = [$$[$0]];
          break;
        case 16:
          yy.addEntity($$[$0 - 2]);
          yy.setClass([$$[$0 - 2]], $$[$0]);
          this.$ = [$$[$0 - 2]];
          break;
        case 17:
          yy.addEntity($$[$0 - 6], $$[$0 - 4]);
          yy.addAttributes($$[$0 - 6], $$[$0 - 1]);
          this.$ = [$$[$0 - 6]];
          break;
        case 18:
          yy.addEntity($$[$0 - 8], $$[$0 - 6]);
          yy.addAttributes($$[$0 - 8], $$[$0 - 1]);
          yy.setClass([$$[$0 - 8]], $$[$0 - 3]);
          this.$ = [$$[$0 - 8]];
          break;
        case 19:
          yy.addEntity($$[$0 - 5], $$[$0 - 3]);
          this.$ = [$$[$0 - 5]];
          break;
        case 20:
          yy.addEntity($$[$0 - 7], $$[$0 - 5]);
          yy.setClass([$$[$0 - 7]], $$[$0 - 2]);
          this.$ = [$$[$0 - 7]];
          break;
        case 21:
          yy.addEntity($$[$0 - 3], $$[$0 - 1]);
          break;
        case 22:
          yy.addEntity($$[$0 - 5], $$[$0 - 3]);
          yy.setClass([$$[$0 - 5]], $$[$0]);
          break;
        case 23:
        case 24:
          this.$ = $$[$0].trim();
          yy.setAccTitle(this.$);
          break;
        case 25:
        case 26:
          this.$ = $$[$0].trim();
          yy.setAccDescription(this.$);
          break;
        case 27:
          if (!yy.subgraphDepth) {
            yy.setDirection($$[$0].value);
            this.$ = [];
          } else {
            this.$ = $$[$0];
          }
          break;
        case 31:
          yy.subgraphDepth = (yy.subgraphDepth || 1) - 1;
          this.$ = yy.addSubGraph({ text: $$[$0 - 2].id }, $$[$0 - 1], { text: $$[$0 - 2].text });
          break;
        case 32:
          yy.subgraphDepth = (yy.subgraphDepth || 0) + 1;
          this.$ = { id: $$[$0 - 1], text: $$[$0 - 1] };
          break;
        case 33:
          yy.subgraphDepth = (yy.subgraphDepth || 0) + 1;
          this.$ = { id: $$[$0 - 4], text: $$[$0 - 2] };
          break;
        case 34:
        case 59:
        case 60:
        case 61:
        case 62:
        case 86:
          this.$ = $$[$0];
          break;
        case 35:
          this.$ = $$[$0 - 1] + " " + $$[$0];
          break;
        case 36:
          this.$ = { stmt: "dir", value: "TB" };
          break;
        case 37:
          this.$ = { stmt: "dir", value: "BT" };
          break;
        case 38:
          this.$ = { stmt: "dir", value: "RL" };
          break;
        case 39:
          this.$ = { stmt: "dir", value: "LR" };
          break;
        case 40:
          this.$ = $$[$0 - 3];
          yy.addClass($$[$0 - 2], $$[$0 - 1]);
          break;
        case 41:
        case 42:
        case 63:
        case 72:
          this.$ = [$$[$0]];
          break;
        case 43:
        case 44:
          this.$ = $$[$0 - 2].concat([$$[$0]]);
          break;
        case 45:
          this.$ = $$[$0 - 2];
          yy.setClass($$[$0 - 1], $$[$0]);
          break;
        case 46:
          ;
          this.$ = $$[$0 - 3];
          yy.addCssStyles($$[$0 - 2], $$[$0 - 1]);
          break;
        case 47:
          this.$ = [$$[$0]];
          break;
        case 48:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 50:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 58:
        case 84:
        case 85:
          this.$ = $$[$0].replace(/"/g, "");
          break;
        case 64:
          $$[$0].push($$[$0 - 1]);
          this.$ = $$[$0];
          break;
        case 65:
          this.$ = { type: $$[$0 - 1], name: $$[$0] };
          break;
        case 66:
          this.$ = { type: $$[$0 - 2], name: $$[$0 - 1], keys: $$[$0] };
          break;
        case 67:
          this.$ = { type: $$[$0 - 2], name: $$[$0 - 1], comment: $$[$0] };
          break;
        case 68:
          this.$ = { type: $$[$0 - 3], name: $$[$0 - 2], keys: $$[$0 - 1], comment: $$[$0] };
          break;
        case 69:
        case 71:
        case 74:
          this.$ = $$[$0];
          break;
        case 70:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 73:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 75:
          this.$ = $$[$0].replace(/"/g, "");
          break;
        case 76:
          this.$ = { cardA: $$[$0], relType: $$[$0 - 1], cardB: $$[$0 - 2] };
          break;
        case 77:
          this.$ = yy.Cardinality.ZERO_OR_ONE;
          break;
        case 78:
          this.$ = yy.Cardinality.ZERO_OR_MORE;
          break;
        case 79:
          this.$ = yy.Cardinality.ONE_OR_MORE;
          break;
        case 80:
          this.$ = yy.Cardinality.ONLY_ONE;
          break;
        case 81:
          this.$ = yy.Cardinality.MD_PARENT;
          break;
        case 82:
          this.$ = yy.Identification.NON_IDENTIFYING;
          break;
        case 83:
          this.$ = yy.Identification.IDENTIFYING;
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, o($V0, $V1, { 5: 3 }), { 6: [1, 4], 7: 5, 8: 6, 9: $V2, 10: 8, 21: $V3, 23: $V4, 25: $V5, 27: $V6, 28: 13, 29: 14, 30: 15, 31: 16, 32: 17, 34: $V7, 37: $V8, 38: $V9, 39: $Va, 40: $Vb, 41: $Vc, 43: $Vd, 46: $Ve, 47: $Vf, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, o($V0, $Vk, { 1: [2, 1] }), o($Vl, [2, 3]), o($Vl, [2, 4]), o($Vl, [2, 5]), o($Vl, [2, 15], { 11: 31, 67: 35, 14: [1, 32], 16: [1, 33], 19: [1, 34], 69: $Vm, 70: $Vn, 71: $Vo, 72: $Vp, 73: $Vq }), { 22: [1, 41] }, { 24: [1, 42] }, { 26: [1, 43] }, o($Vl, [2, 26]), o($Vl, [2, 27]), o($Vl, [2, 28]), o($Vl, [2, 29]), o($Vl, [2, 30]), o($Vl, $V1, { 5: 44 }), o($Vr, [2, 58]), o($Vr, [2, 59]), o($Vr, [2, 60]), o($Vr, [2, 61]), o($Vr, [2, 62]), o($Vl, [2, 36]), o($Vl, [2, 37]), o($Vl, [2, 38]), o($Vl, [2, 39]), { 15: 45, 43: $Vs, 44: $Vt }, { 15: 48, 43: $Vs, 44: $Vt }, { 15: 49, 43: $Vs, 44: $Vt }, { 10: 50, 43: $Vd, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, { 10: 51, 43: $Vd, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, { 15: 52, 43: $Vs, 44: $Vt }, { 17: 53, 18: [1, 54], 56: 55, 57: 56, 61: $Vu }, { 10: 58, 43: $Vd, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, { 68: 59, 74: [1, 60], 75: [1, 61] }, o($Vv, [2, 77]), o($Vv, [2, 78]), o($Vv, [2, 79]), o($Vv, [2, 80]), o($Vv, [2, 81]), o($Vl, [2, 23]), o($Vl, [2, 24]), o($Vl, [2, 25]), { 6: [1, 63], 7: 5, 8: 6, 9: $V2, 10: 8, 21: $V3, 23: $V4, 25: $V5, 27: $V6, 28: 13, 29: 14, 30: 15, 31: 16, 32: 17, 33: [1, 62], 34: $V7, 37: $V8, 38: $V9, 39: $Va, 40: $Vb, 41: $Vc, 43: $Vd, 46: $Ve, 47: $Vf, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, { 12: $Vw, 42: 64, 44: $Vx, 45: $Vy, 48: 66, 49: 67, 51: $Vz, 52: $VA }, o($VB, [2, 41]), o($VB, [2, 42]), { 15: 72, 43: $Vs, 44: $Vt, 45: $Vy }, { 12: $Vw, 42: 73, 44: $Vx, 45: $Vy, 48: 66, 49: 67, 51: $Vz, 52: $VA }, { 6: $VC, 9: $VD, 19: [1, 75], 35: 74, 50: $VE }, { 12: [1, 79], 14: [1, 80] }, o($Vl, [2, 16], { 67: 35, 11: 81, 16: [1, 82], 45: $Vy, 69: $Vm, 70: $Vn, 71: $Vo, 72: $Vp, 73: $Vq }), { 18: [1, 83] }, o($Vl, [2, 13]), { 17: 84, 18: [2, 63], 56: 55, 57: 56, 61: $Vu }, { 58: 85, 61: [1, 86] }, { 61: [2, 69], 62: [1, 87] }, { 20: [1, 88] }, { 67: 89, 69: $Vm, 70: $Vn, 71: $Vo, 72: $Vp, 73: $Vq }, o($VF, [2, 82]), o($VF, [2, 83]), o($Vl, [2, 31]), o($Vl, $Vk), { 6: $VC, 9: $VD, 35: 90, 45: $VG, 50: $VE }, { 43: [1, 92], 44: [1, 93] }, o($VH, [2, 47], { 49: 94, 12: $Vw, 44: $Vx, 51: $Vz, 52: $VA }), o($VI, [2, 49]), o($VI, [2, 54]), o($VI, [2, 55]), o($VI, [2, 56]), o($VI, [2, 57]), o($Vl, [2, 45], { 45: $Vy }), { 6: $VC, 9: $VD, 35: 95, 45: $VG, 50: $VE }, o($Vl, [2, 32]), { 10: 97, 36: 96, 43: $Vd, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, o($Vl, [2, 51]), o($Vl, [2, 52]), o($Vl, [2, 53]), { 13: 98, 43: $VJ, 53: $VK, 76: $VL }, { 15: 102, 43: $Vs, 44: $Vt }, { 10: 103, 43: $Vd, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, { 17: 104, 18: [1, 105], 56: 55, 57: 56, 61: $Vu }, o($Vl, [2, 11]), { 18: [2, 64] }, o($VM, [2, 65], { 59: 106, 60: 107, 63: 108, 65: $VN, 66: $VO }), o([18, 61, 65, 66], [2, 71]), { 61: [2, 70] }, o($Vl, [2, 21], { 14: [1, 112], 16: [1, 111] }), o([43, 51, 53, 54, 55], [2, 76]), o($Vl, [2, 40]), { 12: $Vw, 44: $Vx, 48: 113, 49: 67, 51: $Vz, 52: $VA }, o($VB, [2, 43]), o($VB, [2, 44]), o($VI, [2, 50]), o($Vl, [2, 46]), { 10: 115, 20: [1, 114], 43: $Vd, 51: $Vg, 53: $Vh, 54: $Vi, 55: $Vj }, o($VP, [2, 34]), o($Vl, [2, 7]), o($Vl, [2, 84]), o($Vl, [2, 85]), o($Vl, [2, 86]), { 12: [1, 116], 45: $Vy }, { 12: [1, 118], 14: [1, 117] }, { 18: [1, 119] }, o($Vl, [2, 14]), o($VM, [2, 66], { 60: 120, 64: [1, 121], 66: $VO }), o($VM, [2, 67]), o($VQ, [2, 72]), o($VM, [2, 75]), o($VQ, [2, 74]), { 17: 122, 18: [1, 123], 56: 55, 57: 56, 61: $Vu }, { 15: 124, 43: $Vs, 44: $Vt }, o($VH, [2, 48], { 49: 94, 12: $Vw, 44: $Vx, 51: $Vz, 52: $VA }), { 6: $VC, 9: $VD, 35: 125, 50: $VE }, o($VP, [2, 35]), { 13: 126, 43: $VJ, 53: $VK, 76: $VL }, { 15: 127, 43: $Vs, 44: $Vt }, { 13: 128, 43: $VJ, 53: $VK, 76: $VL }, o($Vl, [2, 12]), o($VM, [2, 68]), { 63: 129, 65: $VN }, { 18: [1, 130] }, o($Vl, [2, 19]), o($Vl, [2, 22], { 16: [1, 131], 45: $Vy }), o($Vl, [2, 33]), o($Vl, [2, 10]), { 12: [1, 132], 45: $Vy }, o($Vl, [2, 9]), o($VQ, [2, 73]), o($Vl, [2, 17]), { 17: 133, 18: [1, 134], 56: 55, 57: 56, 61: $Vu }, { 13: 135, 43: $VJ, 53: $VK, 76: $VL }, { 18: [1, 136] }, o($Vl, [2, 20]), o($Vl, [2, 8]), o($Vl, [2, 18])],
    defaultActions: { 84: [2, 64], 87: [2, 70] },
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
      options: { "case-insensitive": true },
      performAction: __name(function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            this.begin("acc_title");
            return 23;
            break;
          case 1:
            this.popState();
            return "acc_title_value";
            break;
          case 2:
            this.begin("acc_descr");
            return 25;
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
            return 37;
            break;
          case 8:
            return 38;
            break;
          case 9:
            return 39;
            break;
          case 10:
            return 40;
            break;
          case 11:
            break;
          case 12:
            return 9;
            break;
          case 13:
            return 53;
            break;
          case 14:
            return 76;
            break;
          case 15:
            return 4;
            break;
          case 16:
            this.begin("block");
            return 16;
            break;
          case 17:
            return 52;
            break;
          case 18:
            return 52;
            break;
          case 19:
            return 45;
            break;
          case 20:
            return 14;
            break;
          case 21:
            return 12;
            break;
          case 22:
            break;
          case 23:
            return 65;
            break;
          case 24:
            return 61;
            break;
          case 25:
            return 61;
            break;
          case 26:
            this.begin("block_bq");
            break;
          case 27:
            return 61;
            break;
          case 28:
            this.popState();
            break;
          case 29:
            return 66;
            break;
          case 30:
            break;
          case 31:
            this.popState();
            return 18;
            break;
          case 32:
            return yy_.yytext[0];
            break;
          case 33:
            return 19;
            break;
          case 34:
            return 20;
            break;
          case 35:
            this.begin("style");
            return 47;
            break;
          case 36:
            this.popState();
            return 9;
            break;
          case 37:
            break;
          case 38:
            return 12;
            break;
          case 39:
            return 45;
            break;
          case 40:
            return 52;
            break;
          case 41:
            this.begin("style");
            return 41;
            break;
          case 42:
            return 46;
            break;
          case 43:
            return 34;
            break;
          case 44:
            return 33;
            break;
          case 45:
            return 69;
            break;
          case 46:
            return 71;
            break;
          case 47:
            return 71;
            break;
          case 48:
            return 71;
            break;
          case 49:
            return 69;
            break;
          case 50:
            return 69;
            break;
          case 51:
            return 70;
            break;
          case 52:
            return 70;
            break;
          case 53:
            return 70;
            break;
          case 54:
            return 70;
            break;
          case 55:
            return 70;
            break;
          case 56:
            return 71;
            break;
          case 57:
            return 70;
            break;
          case 58:
            return 71;
            break;
          case 59:
            return 72;
            break;
          case 60:
            return 72;
            break;
          case 61:
            return 54;
            break;
          case 62:
            return 72;
            break;
          case 63:
            return 72;
            break;
          case 64:
            return 72;
            break;
          case 65:
            return 55;
            break;
          case 66:
            return 51;
            break;
          case 67:
            return 72;
            break;
          case 68:
            return 69;
            break;
          case 69:
            return 70;
            break;
          case 70:
            return 71;
            break;
          case 71:
            return 73;
            break;
          case 72:
            return 74;
            break;
          case 73:
            return 75;
            break;
          case 74:
            return 75;
            break;
          case 75:
            return 74;
            break;
          case 76:
            return 74;
            break;
          case 77:
            return 74;
            break;
          case 78:
            return 44;
            break;
          case 79:
            return 50;
            break;
          case 80:
            return 43;
            break;
          case 81:
            return yy_.yytext[0];
            break;
          case 82:
            return 6;
            break;
        }
      }, "anonymous"),
      rules: [/^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:.*direction\s+TB[^\n]*)/i, /^(?:.*direction\s+BT[^\n]*)/i, /^(?:.*direction\s+RL[^\n]*)/i, /^(?:.*direction\s+LR[^\n]*)/i, /^(?:[ \t\r]+)/i, /^(?:[\n]+)/i, /^(?:"[^"%\r\n\v\b\\]+")/i, /^(?:"[^"]*")/i, /^(?:erDiagram\b)/i, /^(?:\{)/i, /^(?:#)/i, /^(?:#)/i, /^(?:,)/i, /^(?::::)/i, /^(?::)/i, /^(?:\s+)/i, /^(?:\b((?:PK)|(?:FK)|(?:UK))\b)/i, /^(?:([^\s]*)[~].*[~]([^\s]*))/i, /^(?:([\*A-Za-z_\u00C0-\uFFFF][A-Za-z0-9\-\_\[\]\(\)\.,\u00C0-\uFFFF\*]*))/i, /^(?:[`])/i, /^(?:[^`]+)/i, /^(?:[`])/i, /^(?:"[^"]*")/i, /^(?:[\n]+)/i, /^(?:\})/i, /^(?:.)/i, /^(?:\[)/i, /^(?:\])/i, /^(?:style\b)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?::)/i, /^(?:,)/i, /^(?:#)/i, /^(?:classDef\b)/i, /^(?:class\b)/i, /^(?:subgraph\b)/i, /^(?:end\b\s*)/i, /^(?:one or zero\b)/i, /^(?:one or more\b)/i, /^(?:one or many\b)/i, /^(?:1\+)/i, /^(?:\|o\b)/i, /^(?:zero or one\b)/i, /^(?:zero or more\b)/i, /^(?:zero or many\b)/i, /^(?:0\+)/i, /^(?:\}o\b)/i, /^(?:many\(0\))/i, /^(?:many\(1\))/i, /^(?:many\b)/i, /^(?:\}\|)/i, /^(?:one\b)/i, /^(?:only one\b)/i, /^(?:[0-9]+\.[0-9]+)/i, /^(?:1(?=\s+[A-Za-z_"']))/i, /^(?:1(?=\s+[0-9]))/i, /^(?:1(?=(--|\.\.|\.-|-\.)))/i, /^(?:1\b)/i, /^(?:[0-9]+)/i, /^(?:\|\|)/i, /^(?:o\|)/i, /^(?:o\{)/i, /^(?:\|\{)/i, /^(?:u(?=[\.\-\|]))/i, /^(?:\.\.)/i, /^(?:--)/i, /^(?:to\b)/i, /^(?:optionally to\b)/i, /^(?:\.-)/i, /^(?:-\.)/i, /^(?:([^\x00-\x7F]|\w|-|\*)+)/i, /^(?:;)/i, /^(?:([^\x00-\x7F]|\w|-|\*|\.)+)/i, /^(?:.)/i, /^(?:$)/i],
      conditions: { "style": { "rules": [36, 37, 38, 39, 40, 78, 79], "inclusive": false }, "acc_descr_multiline": { "rules": [5, 6], "inclusive": false }, "acc_descr": { "rules": [3], "inclusive": false }, "acc_title": { "rules": [1], "inclusive": false }, "block_bq": { "rules": [27, 28], "inclusive": false }, "block": { "rules": [22, 23, 24, 25, 26, 29, 30, 31, 32], "inclusive": false }, "INITIAL": { "rules": [0, 2, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 33, 34, 35, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 80, 81, 82], "inclusive": true } }
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
var erDiagram_default = parser;
var _a;
var ErDB = (_a = class {
  constructor() {
    this.entities = /* @__PURE__ */ new Map();
    this.relationships = [];
    this.classes = /* @__PURE__ */ new Map();
    this.subgraphDepth = 0;
    this.subGraphs = [];
    this.subGraphLookup = /* @__PURE__ */ new Map();
    this.subCount = 0;
    this.direction = "TB";
    this.Cardinality = {
      ZERO_OR_ONE: "ZERO_OR_ONE",
      ZERO_OR_MORE: "ZERO_OR_MORE",
      ONE_OR_MORE: "ONE_OR_MORE",
      ONLY_ONE: "ONLY_ONE",
      MD_PARENT: "MD_PARENT"
    };
    this.Identification = {
      NON_IDENTIFYING: "NON_IDENTIFYING",
      IDENTIFYING: "IDENTIFYING"
    };
    this.setAccTitle = setAccTitle;
    this.getAccTitle = getAccTitle;
    this.setAccDescription = setAccDescription;
    this.getAccDescription = getAccDescription;
    this.setDiagramTitle = setDiagramTitle;
    this.getDiagramTitle = getDiagramTitle;
    this.getConfig = __name(() => getConfig2().er, "getConfig");
    this.clear();
    this.addEntity = this.addEntity.bind(this);
    this.addAttributes = this.addAttributes.bind(this);
    this.addRelationship = this.addRelationship.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.addCssStyles = this.addCssStyles.bind(this);
    this.addClass = this.addClass.bind(this);
    this.setClass = this.setClass.bind(this);
    this.setAccTitle = this.setAccTitle.bind(this);
    this.setAccDescription = this.setAccDescription.bind(this);
    this.addSubGraph = this.addSubGraph.bind(this);
  }
  /**
   * Add entity
   * @param name - The name of the entity
   * @param alias - The alias of the entity
   */
  addEntity(name, alias = "") {
    var _a2;
    if (!this.entities.has(name)) {
      this.entities.set(name, {
        id: `entity-${name}-${this.entities.size}`,
        label: name,
        attributes: [],
        alias,
        shape: "erBox",
        look: getConfig2().look ?? "default",
        cssClasses: "default",
        cssStyles: [],
        labelType: "markdown"
      });
      log.info("Added new entity :", name);
    } else if (!((_a2 = this.entities.get(name)) == null ? void 0 : _a2.alias) && alias) {
      this.entities.get(name).alias = alias;
      log.info(`Add alias '${alias}' to entity '${name}'`);
    }
    return this.entities.get(name);
  }
  getEntity(name) {
    return this.entities.get(name);
  }
  getEntities() {
    return this.entities;
  }
  getClasses() {
    return this.classes;
  }
  addAttributes(entityName, attribs) {
    const entity = this.addEntity(entityName);
    let i;
    for (i = attribs.length - 1; i >= 0; i--) {
      if (!attribs[i].keys) {
        attribs[i].keys = [];
      }
      if (!attribs[i].comment) {
        attribs[i].comment = "";
      }
      entity.attributes.push(attribs[i]);
      log.debug("Added attribute ", attribs[i].name);
    }
  }
  /**
   * Add a relationship
   *
   * @param entA - The first entity in the relationship
   * @param rolA - The role played by the first entity in relation to the second
   * @param entB - The second entity in the relationship
   * @param rSpec - The details of the relationship between the two entities
   */
  addRelationship(entA, rolA, entB, rSpec) {
    let entityAId;
    if (this.subGraphLookup.has(entA)) {
      entityAId = entA;
    } else {
      const entityA = this.addEntity(entA);
      if (!entityA) {
        return;
      }
      entityAId = entityA.id;
    }
    let entityBId;
    if (this.subGraphLookup.has(entB)) {
      entityBId = entB;
    } else {
      const entityB = this.addEntity(entB);
      if (!entityB) {
        return;
      }
      entityBId = entityB.id;
    }
    const rel = {
      entityA: entityAId,
      roleA: rolA,
      entityB: entityBId,
      relSpec: rSpec
    };
    this.relationships.push(rel);
    log.debug("Added new relationship :", rel);
  }
  getRelationships() {
    return this.relationships;
  }
  getDirection() {
    return this.direction;
  }
  setDirection(dir) {
    this.direction = dir;
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
  addCssStyles(ids, styles) {
    for (const id of ids) {
      const entity = this.entities.get(id);
      const subGraph = this.subGraphLookup.get(id);
      if (!styles) {
        continue;
      }
      if (entity) {
        for (const style of styles) {
          entity.cssStyles.push(style);
        }
      }
      if (subGraph) {
        if (!subGraph.cssStyles) {
          subGraph.cssStyles = [];
        }
        for (const style of styles) {
          subGraph.cssStyles.push(style);
        }
      }
    }
  }
  addClass(ids, style) {
    ids.forEach((id) => {
      let classNode = this.classes.get(id);
      if (classNode === void 0) {
        classNode = { id, styles: [], textStyles: [] };
        this.classes.set(id, classNode);
      }
      if (style) {
        style.forEach(function(s) {
          if (/color/.exec(s)) {
            const newStyle = s.replace("fill", "bgFill");
            classNode.textStyles.push(newStyle);
          }
          classNode.styles.push(s);
        });
      }
    });
  }
  addSubGraph(_id, list, _title) {
    let id = _id.text.trim();
    let title = _title.text;
    const uniq = __name((a) => {
      const seen = /* @__PURE__ */ new Set();
      let dir2;
      const nodeList2 = a.filter((item) => {
        if (item == null ? void 0 : item.stmt) {
          if (item.stmt === "dir") {
            dir2 = item.value;
          }
          return false;
        }
        if (typeof item !== "string") {
          return false;
        }
        const trimmed = item.trim();
        if (!trimmed) {
          return false;
        }
        if (seen.has(trimmed)) {
          return false;
        }
        seen.add(trimmed);
        return true;
      });
      return { nodeList: nodeList2, dir: dir2 };
    }, "uniq");
    const result = uniq(list.flat());
    const nodeList = result.nodeList;
    const dir = result.dir;
    id = id ?? "subGraph" + this.subCount;
    title = title || "";
    title = this.sanitizeText(title);
    this.subCount = this.subCount + 1;
    const subGraph = {
      id,
      nodes: nodeList,
      title: title.trim(),
      classes: [],
      cssStyles: [],
      dir,
      labelType: this.sanitizeNodeLabelType(_title == null ? void 0 : _title.type)
    };
    log.info("Adding", subGraph.id, subGraph.nodes, subGraph.dir);
    subGraph.nodes = this.makeUniq(subGraph, this.subGraphs).nodes;
    this.subGraphs.push(subGraph);
    this.subGraphLookup.set(id, subGraph);
    return id;
  }
  getSubGraphs() {
    return this.subGraphs;
  }
  setClass(ids, classNames) {
    for (const id of ids) {
      const entity = this.entities.get(id);
      if (entity) {
        for (const className of classNames) {
          entity.cssClasses += " " + className;
        }
      }
      const subGraph = this.subGraphLookup.get(id);
      if (subGraph) {
        for (const className of classNames) {
          subGraph.classes.push(className);
        }
      }
    }
  }
  /**
   * Build a quick lookup for all node IDs already assigned to existing subgraphs.
   */
  subgraphNodeCache(allSubgraphs) {
    const nodeCache = /* @__PURE__ */ new Set();
    for (const subGraph of allSubgraphs) {
      for (const id of subGraph.nodes) {
        nodeCache.add(id);
      }
    }
    return nodeCache;
  }
  /**
   * Filter out nodes that are already part of another subgraph,
   * keeping subgraph membership unique.
   */
  makeUniq(subGraph, allSubgraphs) {
    const existingNodes = this.subgraphNodeCache(allSubgraphs);
    const res = [];
    subGraph.nodes.forEach((_id, pos) => {
      if (existingNodes.has(_id)) {
        log.warn(`Entity '${_id}' already belongs to another subgraph and will be ignored`);
      } else {
        res.push(subGraph.nodes[pos]);
      }
    });
    return { nodes: res };
  }
  sanitizeText(txt) {
    return common_default.sanitizeText(txt, getConfig2());
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
  clear() {
    this.entities = /* @__PURE__ */ new Map();
    this.classes = /* @__PURE__ */ new Map();
    this.relationships = [];
    this.subGraphs = [];
    this.subGraphLookup = /* @__PURE__ */ new Map();
    this.subCount = 0;
    this.subgraphDepth = 0;
    clear();
  }
  getData() {
    const nodes = [];
    const edges = [];
    const config = getConfig2();
    const subGraphs = this.getSubGraphs();
    const parentDB = /* @__PURE__ */ new Map();
    const subGraphDB = /* @__PURE__ */ new Map();
    for (let i = subGraphs.length - 1; i >= 0; i--) {
      const subGraph = subGraphs[i];
      if (subGraph.nodes.length > 0) {
        subGraphDB.set(subGraph.id, true);
      }
      for (const id of subGraph.nodes) {
        parentDB.set(id, subGraph.id);
      }
    }
    for (let i = subGraphs.length - 1; i >= 0; i--) {
      const subGraph = subGraphs[i];
      nodes.push({
        id: subGraph.id,
        label: subGraph.title,
        labelStyle: "",
        labelType: subGraph.labelType,
        parentId: parentDB.get(subGraph.id),
        padding: 8,
        cssCompiledStyles: this.getCompiledStyles(subGraph.classes),
        cssStyles: subGraph.cssStyles,
        cssClasses: subGraph.classes.join(" "),
        shape: "rect",
        dir: subGraph.dir,
        isGroup: true,
        look: config.look
      });
    }
    const subGraphIds = new Set(subGraphs.map((sg) => sg.id));
    let colorIndex = 0;
    for (const entityKey of this.entities.keys()) {
      if (subGraphIds.has(entityKey)) {
        continue;
      }
      const entityNode = this.entities.get(entityKey);
      if (entityNode) {
        entityNode.cssCompiledStyles = this.getCompiledStyles(entityNode.cssClasses.split(" "));
        entityNode.colorIndex = colorIndex++;
        nodes.push({
          ...entityNode,
          parentId: parentDB.get(entityKey),
          isGroup: false
        });
      }
    }
    let count = 0;
    for (const relationship of this.relationships) {
      const edge = {
        id: getEdgeId(relationship.entityA, relationship.entityB, {
          prefix: "id",
          counter: count++
        }),
        type: "normal",
        curve: "basis",
        start: relationship.entityA,
        end: relationship.entityB,
        label: relationship.roleA,
        labelpos: "c",
        thickness: "normal",
        classes: "relationshipLine",
        arrowTypeStart: relationship.relSpec.cardB.toLowerCase(),
        arrowTypeEnd: relationship.relSpec.cardA.toLowerCase(),
        pattern: relationship.relSpec.relType == "IDENTIFYING" ? "solid" : "dashed",
        look: config.look,
        labelType: "markdown"
      };
      edges.push(edge);
    }
    return { nodes, edges, other: {}, config, direction: this.direction };
  }
}, __name(_a, "ErDB"), _a);
var erRenderer_unified_exports = {};
__export(erRenderer_unified_exports, {
  draw: () => draw
});
var draw = __name(async function(text, id, _version, diag) {
  log.info("REF0:");
  log.info("Drawing er diagram (unified)", id);
  const { securityLevel, er: conf, layout } = getConfig2();
  const data4Layout = diag.db.getData();
  const svg = getDiagramElement(id, securityLevel);
  data4Layout.type = diag.type;
  data4Layout.layoutAlgorithm = getRegisteredLayoutAlgorithm(layout);
  data4Layout.config.flowchart.nodeSpacing = (conf == null ? void 0 : conf.nodeSpacing) || 140;
  data4Layout.config.flowchart.rankSpacing = (conf == null ? void 0 : conf.rankSpacing) || 80;
  data4Layout.direction = diag.db.getDirection();
  const { config } = data4Layout;
  const { look } = config;
  if (look === "neo") {
    data4Layout.markers = [
      "only_one_neo",
      "zero_or_one_neo",
      "one_or_more_neo",
      "zero_or_more_neo"
    ];
  } else {
    data4Layout.markers = ["only_one", "zero_or_one", "one_or_more", "zero_or_more"];
  }
  data4Layout.diagramId = id;
  await render(data4Layout, svg);
  const backgroundNodes = svg.selectAll('[id*="-background"]');
  if (Array.from(backgroundNodes).length > 0) {
    backgroundNodes.each(function() {
      const backgroundNode = select_default(this);
      const backgroundId = backgroundNode.attr("id");
      const nonBackgroundId = backgroundId.replace("-background", "");
      const nonBackgroundNode = svg.select(`#${CSS.escape(nonBackgroundId)}`);
      if (!nonBackgroundNode.empty()) {
        const transform = nonBackgroundNode.attr("transform");
        backgroundNode.attr("transform", transform);
      }
    });
  }
  const padding = 8;
  utils_default.insertTitle(
    svg,
    "erDiagramTitleText",
    (conf == null ? void 0 : conf.titleTopMargin) ?? 25,
    diag.db.getDiagramTitle()
  );
  setupViewPortForSVG(svg, padding, "erDiagram", (conf == null ? void 0 : conf.useMaxWidth) ?? true);
}, "draw");
var fade = __name((color, opacity) => {
  const channel2 = channel_default;
  const r = channel2(color, "r");
  const g = channel2(color, "g");
  const b = channel2(color, "b");
  return rgba_default(r, g, b, opacity);
}, "fade");
var genColor = __name((options) => {
  const { theme, bkgColorArray, borderColorArray } = options;
  if (!isColorTheme(theme, borderColorArray)) {
    return "";
  }
  const look = safeLook(options.look);
  const hasBkgColors = hasPalette(bkgColorArray);
  let sections = "";
  for (let i = 0; i < paletteSlotCount(borderColorArray); i++) {
    const borderColor = borderColorArray[i];
    const fill = hasBkgColors ? `fill: ${bkgColorArray[i % bkgColorArray.length]};` : "";
    sections += `

    [data-look="${look}"][data-color-id="color-${i}"].node path {
    stroke: ${borderColor};
    ${fill}
    }

    [data-look="${look}"][data-color-id="color-${i}"].node  rect {
    stroke: ${borderColor};
    ${fill}
     }
    `;
  }
  return sections;
}, "genColor");
var getStyles = __name((options) => {
  const { look, theme, erEdgeLabelBackground, strokeWidth } = options;
  return `
    ${genColor(options)}
  .entityBox {
    fill: ${options.mainBkg};
    stroke: ${options.nodeBorder};
  }

  .relationshipLabelBox {
    fill: ${options.tertiaryColor};
    opacity: 0.7;
    background-color: ${options.tertiaryColor};
      rect {
        opacity: 0.5;
      }
  }

  .labelBkg {
    background-color: ${COLOR_THEMES.has(theme) && erEdgeLabelBackground ? erEdgeLabelBackground : fade(options.tertiaryColor, 0.5)};
  }

  .edgeLabel {
    background-color: ${COLOR_THEMES.has(theme) && erEdgeLabelBackground ? erEdgeLabelBackground : options.edgeLabelBackground};
  }
  .edgeLabel .label rect {
    fill: ${COLOR_THEMES.has(theme) && erEdgeLabelBackground ? erEdgeLabelBackground : options.edgeLabelBackground};
  }
  .edgeLabel .label text {
    fill: ${options.textColor};
  }

  .edgeLabel .label {
    fill: ${options.nodeBorder};
    font-size: 14px;
  }

  .label {
    font-family: ${options.fontFamily};
    color: ${options.nodeTextColor || options.textColor};
  }

  .edge-pattern-dashed {
    stroke-dasharray: 8,8;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon
  {
    fill: ${options.mainBkg};
    stroke: ${options.nodeBorder};
    stroke-width: ${look === "neo" ? strokeWidth : "1px"};
  }

  .relationshipLine {
    stroke: ${options.lineColor};
    stroke-width: ${look === "neo" ? strokeWidth : "1px"};
    fill: none;
  }

  .marker {
    fill: none !important;
    stroke: ${options.lineColor} !important;
    stroke-width: 1;
  }
  [data-look=neo].labelBkg {
    background-color: ${fade(options.tertiaryColor, 0.5)};
  }

  .cluster rect {
    fill: ${options.clusterBkg ?? options.mainBkg};
    stroke: ${options.clusterBorder ?? options.nodeBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${options.titleColor ?? options.textColor};
  }

  .cluster-label text {
    fill: ${options.titleColor ?? options.textColor};
  }
`;
}, "getStyles");
var styles_default = getStyles;
var diagram = {
  parser: erDiagram_default,
  get db() {
    return new ErDB();
  },
  renderer: erRenderer_unified_exports,
  styles: styles_default
};
export {
  diagram
};
//# sourceMappingURL=erDiagram-OPXOYQCR-UGVXEGJT.js.map
