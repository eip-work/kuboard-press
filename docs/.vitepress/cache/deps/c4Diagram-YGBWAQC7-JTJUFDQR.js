import {
  drawRect
} from "./chunk-S6JDT6I4.js";
import {
  intersect_default,
  shapes
} from "./chunk-H2RFP4YG.js";
import "./chunk-B7KO5YQV.js";
import "./chunk-ADFWXOGL.js";
import "./chunk-E7WPOYWJ.js";
import "./chunk-DJ4W7BRS.js";
import "./chunk-XCU23T57.js";
import {
  calculateTextHeight,
  calculateTextWidth,
  wrapLabel
} from "./chunk-OD7WKAUD.js";
import "./chunk-OV74MRCE.js";
import {
  assignWithDepth_default,
  common_default,
  configureSvgSize,
  getAccDescription,
  getAccTitle,
  getConfig2,
  sanitizeText,
  setAccDescription,
  setAccTitle
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

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/c4Diagram-YGBWAQC7.mjs
var parser = function() {
  var o = __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [1, 24], $V1 = [1, 25], $V2 = [1, 26], $V3 = [1, 27], $V4 = [1, 28], $V5 = [1, 63], $V6 = [1, 64], $V7 = [1, 65], $V8 = [1, 66], $V9 = [1, 67], $Va = [1, 68], $Vb = [1, 69], $Vc = [1, 29], $Vd = [1, 30], $Ve = [1, 31], $Vf = [1, 32], $Vg = [1, 33], $Vh = [1, 34], $Vi = [1, 35], $Vj = [1, 36], $Vk = [1, 37], $Vl = [1, 38], $Vm = [1, 39], $Vn = [1, 40], $Vo = [1, 41], $Vp = [1, 42], $Vq = [1, 43], $Vr = [1, 44], $Vs = [1, 45], $Vt = [1, 46], $Vu = [1, 47], $Vv = [1, 48], $Vw = [1, 50], $Vx = [1, 51], $Vy = [1, 52], $Vz = [1, 53], $VA = [1, 54], $VB = [1, 55], $VC = [1, 56], $VD = [1, 57], $VE = [1, 58], $VF = [1, 59], $VG = [1, 60], $VH = [14, 42], $VI = [14, 34, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], $VJ = [12, 14, 34, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], $VK = [1, 82], $VL = [1, 83], $VM = [1, 84], $VN = [1, 85], $VO = [12, 14, 42], $VP = [12, 14, 33, 42], $VQ = [12, 14, 33, 42, 76, 77, 79, 80], $VR = [12, 33], $VS = [34, 36, 37, 38, 39, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74];
  var parser2 = {
    trace: __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "start": 3, "mermaidDoc": 4, "direction": 5, "direction_tb": 6, "direction_bt": 7, "direction_rl": 8, "direction_lr": 9, "graphConfig": 10, "C4_CONTEXT": 11, "NEWLINE": 12, "statements": 13, "EOF": 14, "C4_CONTAINER": 15, "C4_COMPONENT": 16, "C4_DYNAMIC": 17, "C4_DEPLOYMENT": 18, "otherStatements": 19, "diagramStatements": 20, "otherStatement": 21, "title": 22, "accDescription": 23, "acc_title": 24, "acc_title_value": 25, "acc_descr": 26, "acc_descr_value": 27, "acc_descr_multiline_value": 28, "boundaryStatement": 29, "boundaryStartStatement": 30, "boundaryStopStatement": 31, "boundaryStart": 32, "LBRACE": 33, "ENTERPRISE_BOUNDARY": 34, "attributes": 35, "SYSTEM_BOUNDARY": 36, "BOUNDARY": 37, "CONTAINER_BOUNDARY": 38, "NODE": 39, "NODE_L": 40, "NODE_R": 41, "RBRACE": 42, "diagramStatement": 43, "PERSON": 44, "PERSON_EXT": 45, "SYSTEM": 46, "SYSTEM_DB": 47, "SYSTEM_QUEUE": 48, "SYSTEM_EXT": 49, "SYSTEM_EXT_DB": 50, "SYSTEM_EXT_QUEUE": 51, "CONTAINER": 52, "CONTAINER_DB": 53, "CONTAINER_QUEUE": 54, "CONTAINER_EXT": 55, "CONTAINER_EXT_DB": 56, "CONTAINER_EXT_QUEUE": 57, "COMPONENT": 58, "COMPONENT_DB": 59, "COMPONENT_QUEUE": 60, "COMPONENT_EXT": 61, "COMPONENT_EXT_DB": 62, "COMPONENT_EXT_QUEUE": 63, "REL": 64, "BIREL": 65, "REL_U": 66, "REL_D": 67, "REL_L": 68, "REL_R": 69, "REL_B": 70, "REL_INDEX": 71, "UPDATE_EL_STYLE": 72, "UPDATE_REL_STYLE": 73, "UPDATE_LAYOUT_CONFIG": 74, "attribute": 75, "STR": 76, "STR_KEY": 77, "STR_VALUE": 78, "ATTRIBUTE": 79, "ATTRIBUTE_EMPTY": 80, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 6: "direction_tb", 7: "direction_bt", 8: "direction_rl", 9: "direction_lr", 11: "C4_CONTEXT", 12: "NEWLINE", 14: "EOF", 15: "C4_CONTAINER", 16: "C4_COMPONENT", 17: "C4_DYNAMIC", 18: "C4_DEPLOYMENT", 22: "title", 23: "accDescription", 24: "acc_title", 25: "acc_title_value", 26: "acc_descr", 27: "acc_descr_value", 28: "acc_descr_multiline_value", 33: "LBRACE", 34: "ENTERPRISE_BOUNDARY", 36: "SYSTEM_BOUNDARY", 37: "BOUNDARY", 38: "CONTAINER_BOUNDARY", 39: "NODE", 40: "NODE_L", 41: "NODE_R", 42: "RBRACE", 44: "PERSON", 45: "PERSON_EXT", 46: "SYSTEM", 47: "SYSTEM_DB", 48: "SYSTEM_QUEUE", 49: "SYSTEM_EXT", 50: "SYSTEM_EXT_DB", 51: "SYSTEM_EXT_QUEUE", 52: "CONTAINER", 53: "CONTAINER_DB", 54: "CONTAINER_QUEUE", 55: "CONTAINER_EXT", 56: "CONTAINER_EXT_DB", 57: "CONTAINER_EXT_QUEUE", 58: "COMPONENT", 59: "COMPONENT_DB", 60: "COMPONENT_QUEUE", 61: "COMPONENT_EXT", 62: "COMPONENT_EXT_DB", 63: "COMPONENT_EXT_QUEUE", 64: "REL", 65: "BIREL", 66: "REL_U", 67: "REL_D", 68: "REL_L", 69: "REL_R", 70: "REL_B", 71: "REL_INDEX", 72: "UPDATE_EL_STYLE", 73: "UPDATE_REL_STYLE", 74: "UPDATE_LAYOUT_CONFIG", 76: "STR", 77: "STR_KEY", 78: "STR_VALUE", 79: "ATTRIBUTE", 80: "ATTRIBUTE_EMPTY" },
    productions_: [0, [3, 1], [3, 1], [5, 1], [5, 1], [5, 1], [5, 1], [4, 1], [10, 4], [10, 4], [10, 4], [10, 4], [10, 4], [13, 1], [13, 1], [13, 2], [19, 1], [19, 2], [19, 3], [21, 1], [21, 1], [21, 2], [21, 2], [21, 1], [29, 3], [30, 3], [30, 3], [30, 4], [32, 2], [32, 2], [32, 2], [32, 2], [32, 2], [32, 2], [32, 2], [31, 1], [20, 1], [20, 2], [20, 3], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 1], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [43, 2], [35, 1], [35, 2], [75, 1], [75, 2], [75, 1], [75, 1]],
    performAction: __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 3:
          yy.setDirection("TB");
          break;
        case 4:
          yy.setDirection("BT");
          break;
        case 5:
          yy.setDirection("RL");
          break;
        case 6:
          yy.setDirection("LR");
          break;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
          yy.setC4Type($$[$0 - 3]);
          break;
        case 19:
          yy.setTitle($$[$0].substring(6));
          this.$ = $$[$0].substring(6);
          break;
        case 20:
          yy.setAccDescription($$[$0].substring(15));
          this.$ = $$[$0].substring(15);
          break;
        case 21:
          this.$ = $$[$0].trim();
          yy.setTitle(this.$);
          break;
        case 22:
        case 23:
          this.$ = $$[$0].trim();
          yy.setAccDescription(this.$);
          break;
        case 28:
          $$[$0].splice(2, 0, "ENTERPRISE");
          yy.addPersonOrSystemBoundary(...$$[$0]);
          this.$ = $$[$0];
          break;
        case 29:
          $$[$0].splice(2, 0, "SYSTEM");
          yy.addPersonOrSystemBoundary(...$$[$0]);
          this.$ = $$[$0];
          break;
        case 30:
          yy.addPersonOrSystemBoundary(...$$[$0]);
          this.$ = $$[$0];
          break;
        case 31:
          $$[$0].splice(2, 0, "CONTAINER");
          yy.addContainerBoundary(...$$[$0]);
          this.$ = $$[$0];
          break;
        case 32:
          yy.addDeploymentNode("node", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 33:
          yy.addDeploymentNode("nodeL", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 34:
          yy.addDeploymentNode("nodeR", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 35:
          yy.popBoundaryParseStack();
          break;
        case 39:
          yy.addPersonOrSystem("person", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 40:
          yy.addPersonOrSystem("external_person", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 41:
          yy.addPersonOrSystem("system", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 42:
          yy.addPersonOrSystem("system_db", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 43:
          yy.addPersonOrSystem("system_queue", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 44:
          yy.addPersonOrSystem("external_system", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 45:
          yy.addPersonOrSystem("external_system_db", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 46:
          yy.addPersonOrSystem("external_system_queue", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 47:
          yy.addContainer("container", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 48:
          yy.addContainer("container_db", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 49:
          yy.addContainer("container_queue", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 50:
          yy.addContainer("external_container", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 51:
          yy.addContainer("external_container_db", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 52:
          yy.addContainer("external_container_queue", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 53:
          yy.addComponent("component", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 54:
          yy.addComponent("component_db", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 55:
          yy.addComponent("component_queue", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 56:
          yy.addComponent("external_component", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 57:
          yy.addComponent("external_component_db", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 58:
          yy.addComponent("external_component_queue", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 60:
          yy.addRel("rel", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 61:
          yy.addRel("birel", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 62:
          yy.addRel("rel_u", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 63:
          yy.addRel("rel_d", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 64:
          yy.addRel("rel_l", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 65:
          yy.addRel("rel_r", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 66:
          yy.addRel("rel_b", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 67:
          $$[$0].splice(0, 1);
          yy.addRel("rel", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 68:
          yy.updateElStyle("update_el_style", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 69:
          yy.updateRelStyle("update_rel_style", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 70:
          yy.updateLayoutConfig("update_layout_config", ...$$[$0]);
          this.$ = $$[$0];
          break;
        case 71:
          this.$ = [$$[$0]];
          break;
        case 72:
          $$[$0].unshift($$[$0 - 1]);
          this.$ = $$[$0];
          break;
        case 73:
        case 75:
          this.$ = $$[$0].trim();
          break;
        case 74:
          let kv = {};
          kv[$$[$0 - 1].trim()] = $$[$0].trim();
          this.$ = kv;
          break;
        case 76:
          this.$ = "";
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 7: [1, 6], 8: [1, 7], 9: [1, 8], 10: 4, 11: [1, 9], 15: [1, 10], 16: [1, 11], 17: [1, 12], 18: [1, 13] }, { 1: [3] }, { 1: [2, 1] }, { 1: [2, 2] }, { 1: [2, 7] }, { 1: [2, 3] }, { 1: [2, 4] }, { 1: [2, 5] }, { 1: [2, 6] }, { 12: [1, 14] }, { 12: [1, 15] }, { 12: [1, 16] }, { 12: [1, 17] }, { 12: [1, 18] }, { 13: 19, 19: 20, 20: 21, 21: 22, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4, 29: 49, 30: 61, 32: 62, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 43: 23, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }, { 13: 70, 19: 20, 20: 21, 21: 22, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4, 29: 49, 30: 61, 32: 62, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 43: 23, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }, { 13: 71, 19: 20, 20: 21, 21: 22, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4, 29: 49, 30: 61, 32: 62, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 43: 23, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }, { 13: 72, 19: 20, 20: 21, 21: 22, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4, 29: 49, 30: 61, 32: 62, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 43: 23, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }, { 13: 73, 19: 20, 20: 21, 21: 22, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4, 29: 49, 30: 61, 32: 62, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 43: 23, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }, { 14: [1, 74] }, o($VH, [2, 13], { 43: 23, 29: 49, 30: 61, 32: 62, 20: 75, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }), o($VH, [2, 14]), o($VI, [2, 16], { 12: [1, 76] }), o($VH, [2, 36], { 12: [1, 77] }), o($VJ, [2, 19]), o($VJ, [2, 20]), { 25: [1, 78] }, { 27: [1, 79] }, o($VJ, [2, 23]), { 35: 80, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 86, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 87, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 88, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 89, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 90, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 91, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 92, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 93, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 94, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 95, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 96, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 97, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 98, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 99, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 100, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 101, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 102, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 103, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 104, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, o($VO, [2, 59]), { 35: 105, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 106, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 107, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 108, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 109, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 110, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 111, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 112, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 113, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 114, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 115, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 20: 116, 29: 49, 30: 61, 32: 62, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 43: 23, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }, { 12: [1, 118], 33: [1, 117] }, { 35: 119, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 120, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 121, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 122, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 123, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 124, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 35: 125, 75: 81, 76: $VK, 77: $VL, 79: $VM, 80: $VN }, { 14: [1, 126] }, { 14: [1, 127] }, { 14: [1, 128] }, { 14: [1, 129] }, { 1: [2, 8] }, o($VH, [2, 15]), o($VI, [2, 17], { 21: 22, 19: 130, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4 }), o($VH, [2, 37], { 19: 20, 20: 21, 21: 22, 43: 23, 29: 49, 30: 61, 32: 62, 13: 131, 22: $V0, 23: $V1, 24: $V2, 26: $V3, 28: $V4, 34: $V5, 36: $V6, 37: $V7, 38: $V8, 39: $V9, 40: $Va, 41: $Vb, 44: $Vc, 45: $Vd, 46: $Ve, 47: $Vf, 48: $Vg, 49: $Vh, 50: $Vi, 51: $Vj, 52: $Vk, 53: $Vl, 54: $Vm, 55: $Vn, 56: $Vo, 57: $Vp, 58: $Vq, 59: $Vr, 60: $Vs, 61: $Vt, 62: $Vu, 63: $Vv, 64: $Vw, 65: $Vx, 66: $Vy, 67: $Vz, 68: $VA, 69: $VB, 70: $VC, 71: $VD, 72: $VE, 73: $VF, 74: $VG }), o($VJ, [2, 21]), o($VJ, [2, 22]), o($VO, [2, 39]), o($VP, [2, 71], { 75: 81, 35: 132, 76: $VK, 77: $VL, 79: $VM, 80: $VN }), o($VQ, [2, 73]), { 78: [1, 133] }, o($VQ, [2, 75]), o($VQ, [2, 76]), o($VO, [2, 40]), o($VO, [2, 41]), o($VO, [2, 42]), o($VO, [2, 43]), o($VO, [2, 44]), o($VO, [2, 45]), o($VO, [2, 46]), o($VO, [2, 47]), o($VO, [2, 48]), o($VO, [2, 49]), o($VO, [2, 50]), o($VO, [2, 51]), o($VO, [2, 52]), o($VO, [2, 53]), o($VO, [2, 54]), o($VO, [2, 55]), o($VO, [2, 56]), o($VO, [2, 57]), o($VO, [2, 58]), o($VO, [2, 60]), o($VO, [2, 61]), o($VO, [2, 62]), o($VO, [2, 63]), o($VO, [2, 64]), o($VO, [2, 65]), o($VO, [2, 66]), o($VO, [2, 67]), o($VO, [2, 68]), o($VO, [2, 69]), o($VO, [2, 70]), { 31: 134, 42: [1, 135] }, { 12: [1, 136] }, { 33: [1, 137] }, o($VR, [2, 28]), o($VR, [2, 29]), o($VR, [2, 30]), o($VR, [2, 31]), o($VR, [2, 32]), o($VR, [2, 33]), o($VR, [2, 34]), { 1: [2, 9] }, { 1: [2, 10] }, { 1: [2, 11] }, { 1: [2, 12] }, o($VI, [2, 18]), o($VH, [2, 38]), o($VP, [2, 72]), o($VQ, [2, 74]), o($VO, [2, 24]), o($VO, [2, 35]), o($VS, [2, 25]), o($VS, [2, 26], { 12: [1, 138] }), o($VS, [2, 27])],
    defaultActions: { 2: [2, 1], 3: [2, 2], 4: [2, 7], 5: [2, 3], 6: [2, 4], 7: [2, 5], 8: [2, 6], 74: [2, 8], 126: [2, 9], 127: [2, 10], 128: [2, 11], 129: [2, 12] },
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
        var c2 = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c2 + "^";
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
            return 6;
            break;
          case 1:
            return 7;
            break;
          case 2:
            return 8;
            break;
          case 3:
            return 9;
            break;
          case 4:
            return 22;
            break;
          case 5:
            return 23;
            break;
          case 6:
            this.begin("acc_title");
            return 24;
            break;
          case 7:
            this.popState();
            return "acc_title_value";
            break;
          case 8:
            this.begin("acc_descr");
            return 26;
            break;
          case 9:
            this.popState();
            return "acc_descr_value";
            break;
          case 10:
            this.begin("acc_descr_multiline");
            break;
          case 11:
            this.popState();
            break;
          case 12:
            return "acc_descr_multiline_value";
            break;
          case 13:
            break;
          case 14:
            c;
            break;
          case 15:
            return 12;
            break;
          case 16:
            break;
          case 17:
            return 11;
            break;
          case 18:
            return 15;
            break;
          case 19:
            return 16;
            break;
          case 20:
            return 17;
            break;
          case 21:
            return 18;
            break;
          case 22:
            this.begin("person_ext");
            return 45;
            break;
          case 23:
            this.begin("person");
            return 44;
            break;
          case 24:
            this.begin("system_ext_queue");
            return 51;
            break;
          case 25:
            this.begin("system_ext_db");
            return 50;
            break;
          case 26:
            this.begin("system_ext");
            return 49;
            break;
          case 27:
            this.begin("system_queue");
            return 48;
            break;
          case 28:
            this.begin("system_db");
            return 47;
            break;
          case 29:
            this.begin("system");
            return 46;
            break;
          case 30:
            this.begin("boundary");
            return 37;
            break;
          case 31:
            this.begin("enterprise_boundary");
            return 34;
            break;
          case 32:
            this.begin("system_boundary");
            return 36;
            break;
          case 33:
            this.begin("container_ext_queue");
            return 57;
            break;
          case 34:
            this.begin("container_ext_db");
            return 56;
            break;
          case 35:
            this.begin("container_ext");
            return 55;
            break;
          case 36:
            this.begin("container_queue");
            return 54;
            break;
          case 37:
            this.begin("container_db");
            return 53;
            break;
          case 38:
            this.begin("container");
            return 52;
            break;
          case 39:
            this.begin("container_boundary");
            return 38;
            break;
          case 40:
            this.begin("component_ext_queue");
            return 63;
            break;
          case 41:
            this.begin("component_ext_db");
            return 62;
            break;
          case 42:
            this.begin("component_ext");
            return 61;
            break;
          case 43:
            this.begin("component_queue");
            return 60;
            break;
          case 44:
            this.begin("component_db");
            return 59;
            break;
          case 45:
            this.begin("component");
            return 58;
            break;
          case 46:
            this.begin("node");
            return 39;
            break;
          case 47:
            this.begin("node");
            return 39;
            break;
          case 48:
            this.begin("node_l");
            return 40;
            break;
          case 49:
            this.begin("node_r");
            return 41;
            break;
          case 50:
            this.begin("rel");
            return 64;
            break;
          case 51:
            this.begin("birel");
            return 65;
            break;
          case 52:
            this.begin("rel_u");
            return 66;
            break;
          case 53:
            this.begin("rel_u");
            return 66;
            break;
          case 54:
            this.begin("rel_d");
            return 67;
            break;
          case 55:
            this.begin("rel_d");
            return 67;
            break;
          case 56:
            this.begin("rel_l");
            return 68;
            break;
          case 57:
            this.begin("rel_l");
            return 68;
            break;
          case 58:
            this.begin("rel_r");
            return 69;
            break;
          case 59:
            this.begin("rel_r");
            return 69;
            break;
          case 60:
            this.begin("rel_b");
            return 70;
            break;
          case 61:
            this.begin("rel_index");
            return 71;
            break;
          case 62:
            this.begin("update_el_style");
            return 72;
            break;
          case 63:
            this.begin("update_rel_style");
            return 73;
            break;
          case 64:
            this.begin("update_layout_config");
            return 74;
            break;
          case 65:
            return "EOF_IN_STRUCT";
            break;
          case 66:
            this.begin("attribute");
            return "ATTRIBUTE_EMPTY";
            break;
          case 67:
            this.begin("attribute");
            break;
          case 68:
            this.popState();
            this.popState();
            break;
          case 69:
            return 80;
            break;
          case 70:
            break;
          case 71:
            return 80;
            break;
          case 72:
            this.begin("string");
            break;
          case 73:
            this.popState();
            break;
          case 74:
            return "STR";
            break;
          case 75:
            this.begin("string_kv");
            break;
          case 76:
            this.begin("string_kv_key");
            return "STR_KEY";
            break;
          case 77:
            this.popState();
            this.begin("string_kv_value");
            break;
          case 78:
            return "STR_VALUE";
            break;
          case 79:
            this.popState();
            this.popState();
            break;
          case 80:
            return "STR";
            break;
          case 81:
            return "LBRACE";
            break;
          case 82:
            return "RBRACE";
            break;
          case 83:
            return "SPACE";
            break;
          case 84:
            return "EOL";
            break;
          case 85:
            return 14;
            break;
        }
      }, "anonymous"),
      rules: [/^(?:.*direction\s+TB[^\n]*)/, /^(?:.*direction\s+BT[^\n]*)/, /^(?:.*direction\s+RL[^\n]*)/, /^(?:.*direction\s+LR[^\n]*)/, /^(?:title\s[^#\n;]+)/, /^(?:accDescription\s[^#\n;]+)/, /^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:%%(?!\{)*[^\n]*(\r?\n?)+)/, /^(?:%%[^\n]*(\r?\n)*)/, /^(?:\s*(\r?\n)+)/, /^(?:\s+)/, /^(?:C4Context\b)/, /^(?:C4Container\b)/, /^(?:C4Component\b)/, /^(?:C4Dynamic\b)/, /^(?:C4Deployment\b)/, /^(?:Person_Ext\b)/, /^(?:Person\b)/, /^(?:SystemQueue_Ext\b)/, /^(?:SystemDb_Ext\b)/, /^(?:System_Ext\b)/, /^(?:SystemQueue\b)/, /^(?:SystemDb\b)/, /^(?:System\b)/, /^(?:Boundary\b)/, /^(?:Enterprise_Boundary\b)/, /^(?:System_Boundary\b)/, /^(?:ContainerQueue_Ext\b)/, /^(?:ContainerDb_Ext\b)/, /^(?:Container_Ext\b)/, /^(?:ContainerQueue\b)/, /^(?:ContainerDb\b)/, /^(?:Container\b)/, /^(?:Container_Boundary\b)/, /^(?:ComponentQueue_Ext\b)/, /^(?:ComponentDb_Ext\b)/, /^(?:Component_Ext\b)/, /^(?:ComponentQueue\b)/, /^(?:ComponentDb\b)/, /^(?:Component\b)/, /^(?:Deployment_Node\b)/, /^(?:Node\b)/, /^(?:Node_L\b)/, /^(?:Node_R\b)/, /^(?:Rel\b)/, /^(?:BiRel\b)/, /^(?:Rel_Up\b)/, /^(?:Rel_U\b)/, /^(?:Rel_Down\b)/, /^(?:Rel_D\b)/, /^(?:Rel_Left\b)/, /^(?:Rel_L\b)/, /^(?:Rel_Right\b)/, /^(?:Rel_R\b)/, /^(?:Rel_Back\b)/, /^(?:RelIndex\b)/, /^(?:UpdateElementStyle\b)/, /^(?:UpdateRelStyle\b)/, /^(?:UpdateLayoutConfig\b)/, /^(?:$)/, /^(?:[(][ ]*[,])/, /^(?:[(])/, /^(?:[)])/, /^(?:,,)/, /^(?:,)/, /^(?:[ ]*["]["])/, /^(?:[ ]*["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:[ ]*[\$])/, /^(?:[^=]*)/, /^(?:[=][ ]*["])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:[^,]+)/, /^(?:\{)/, /^(?:\})/, /^(?:[\s]+)/, /^(?:[\n\r]+)/, /^(?:$)/],
      conditions: { "acc_descr_multiline": { "rules": [11, 12], "inclusive": false }, "acc_descr": { "rules": [9], "inclusive": false }, "acc_title": { "rules": [7], "inclusive": false }, "string_kv_value": { "rules": [78, 79], "inclusive": false }, "string_kv_key": { "rules": [77], "inclusive": false }, "string_kv": { "rules": [76], "inclusive": false }, "string": { "rules": [73, 74], "inclusive": false }, "attribute": { "rules": [68, 69, 70, 71, 72, 75, 80], "inclusive": false }, "update_layout_config": { "rules": [65, 66, 67, 68], "inclusive": false }, "update_rel_style": { "rules": [65, 66, 67, 68], "inclusive": false }, "update_el_style": { "rules": [65, 66, 67, 68], "inclusive": false }, "rel_b": { "rules": [65, 66, 67, 68], "inclusive": false }, "rel_r": { "rules": [65, 66, 67, 68], "inclusive": false }, "rel_l": { "rules": [65, 66, 67, 68], "inclusive": false }, "rel_d": { "rules": [65, 66, 67, 68], "inclusive": false }, "rel_u": { "rules": [65, 66, 67, 68], "inclusive": false }, "rel_bi": { "rules": [], "inclusive": false }, "rel": { "rules": [65, 66, 67, 68], "inclusive": false }, "node_r": { "rules": [65, 66, 67, 68], "inclusive": false }, "node_l": { "rules": [65, 66, 67, 68], "inclusive": false }, "node": { "rules": [65, 66, 67, 68], "inclusive": false }, "index": { "rules": [], "inclusive": false }, "rel_index": { "rules": [65, 66, 67, 68], "inclusive": false }, "component_ext_queue": { "rules": [65, 66, 67, 68], "inclusive": false }, "component_ext_db": { "rules": [65, 66, 67, 68], "inclusive": false }, "component_ext": { "rules": [65, 66, 67, 68], "inclusive": false }, "component_queue": { "rules": [65, 66, 67, 68], "inclusive": false }, "component_db": { "rules": [65, 66, 67, 68], "inclusive": false }, "component": { "rules": [65, 66, 67, 68], "inclusive": false }, "container_boundary": { "rules": [65, 66, 67, 68], "inclusive": false }, "container_ext_queue": { "rules": [65, 66, 67, 68], "inclusive": false }, "container_ext_db": { "rules": [65, 66, 67, 68], "inclusive": false }, "container_ext": { "rules": [65, 66, 67, 68], "inclusive": false }, "container_queue": { "rules": [65, 66, 67, 68], "inclusive": false }, "container_db": { "rules": [65, 66, 67, 68], "inclusive": false }, "container": { "rules": [65, 66, 67, 68], "inclusive": false }, "birel": { "rules": [65, 66, 67, 68], "inclusive": false }, "system_boundary": { "rules": [65, 66, 67, 68], "inclusive": false }, "enterprise_boundary": { "rules": [65, 66, 67, 68], "inclusive": false }, "boundary": { "rules": [65, 66, 67, 68], "inclusive": false }, "system_ext_queue": { "rules": [65, 66, 67, 68], "inclusive": false }, "system_ext_db": { "rules": [65, 66, 67, 68], "inclusive": false }, "system_ext": { "rules": [65, 66, 67, 68], "inclusive": false }, "system_queue": { "rules": [65, 66, 67, 68], "inclusive": false }, "system_db": { "rules": [65, 66, 67, 68], "inclusive": false }, "system": { "rules": [65, 66, 67, 68], "inclusive": false }, "person_ext": { "rules": [65, 66, 67, 68], "inclusive": false }, "person": { "rules": [65, 66, 67, 68], "inclusive": false }, "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 8, 10, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 81, 82, 83, 84, 85], "inclusive": true } }
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
var c4Diagram_default = parser;
var getRequiredConfig = __name((section) => getConfig2()[section], "getRequiredConfig");
var TEXT_FIELDS = /* @__PURE__ */ new Set(["label", "descr", "techn", "type"]);
var assignAttributes = __name((bag, attrs) => {
  for (const [field, value] of Object.entries(attrs)) {
    if (value === void 0) {
      continue;
    }
    if (typeof value === "object") {
      const [key, val] = Object.entries(value)[0];
      bag[key] = TEXT_FIELDS.has(key) ? { text: val } : val;
    } else {
      bag[field] = value;
    }
  }
}, "assignAttributes");
var createGlobalBoundary = __name(() => ({
  alias: "global",
  label: { text: "global" },
  type: { text: "global" },
  tags: null,
  link: null,
  parentBoundary: ""
  // The layout fields are populated later by the renderer.
}), "createGlobalBoundary");
var c4ShapeArray = [];
var boundaryParseStack = [""];
var currentBoundaryParse = "global";
var parentBoundaryParse = "";
var boundaries = [createGlobalBoundary()];
var rels = [];
var title = "";
var wrapEnabled = false;
var c4ShapeInRow = 4;
var c4BoundaryInRow = 2;
var c4Type;
var getC4Type = __name(function() {
  return c4Type;
}, "getC4Type");
var setC4Type = __name(function(c4TypeParam) {
  const sanitizedText = sanitizeText(c4TypeParam, getConfig2());
  c4Type = sanitizedText;
}, "setC4Type");
var addRel = __name(function(type, from, to, label, techn, descr, sprite, tags, link) {
  if (type === void 0 || type === null || from === void 0 || from === null || to === void 0 || to === null || label === void 0 || label === null) {
    return;
  }
  let rel = {};
  const old = rels.find((rel2) => rel2.from === from && rel2.to === to);
  if (old) {
    rel = old;
  } else {
    rels.push(rel);
  }
  rel.type = type;
  rel.from = from;
  rel.to = to;
  rel.label = { text: label };
  if (techn === void 0 || techn === null) {
    rel.techn ?? (rel.techn = { text: "" });
  } else {
    if (typeof techn === "object") {
      const [key, value] = Object.entries(techn)[0];
      rel[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      rel.techn = { text: techn };
    }
  }
  if (descr === void 0 || descr === null) {
    rel.descr ?? (rel.descr = { text: "" });
  } else {
    if (typeof descr === "object") {
      const [key, value] = Object.entries(descr)[0];
      rel[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      rel.descr = { text: descr };
    }
  }
  assignAttributes(rel, { sprite, tags, link });
  rel.wrap = autoWrap();
}, "addRel");
var addPersonOrSystem = __name(function(typeC4Shape, alias, label, descr, sprite, tags, link) {
  if (alias === null || label === null) {
    return;
  }
  let personOrSystem = {};
  const old = c4ShapeArray.find((personOrSystem2) => personOrSystem2.alias === alias);
  if (old && alias === old.alias) {
    personOrSystem = old;
  } else {
    personOrSystem.alias = alias;
    c4ShapeArray.push(personOrSystem);
  }
  if (label === void 0 || label === null) {
    personOrSystem.label = { text: "" };
  } else {
    personOrSystem.label = { text: label };
  }
  if (descr === void 0 || descr === null) {
    personOrSystem.descr ?? (personOrSystem.descr = { text: "" });
  } else {
    if (typeof descr === "object") {
      const [key, value] = Object.entries(descr)[0];
      personOrSystem[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      personOrSystem.descr = { text: descr };
    }
  }
  assignAttributes(personOrSystem, { sprite, tags, link });
  personOrSystem.typeC4Shape = { text: typeC4Shape };
  personOrSystem.parentBoundary = currentBoundaryParse;
  personOrSystem.wrap = autoWrap();
}, "addPersonOrSystem");
var addContainer = __name(function(typeC4Shape, alias, label, techn, descr, sprite, tags, link) {
  if (alias === null || label === null) {
    return;
  }
  let container = {};
  const old = c4ShapeArray.find((container2) => container2.alias === alias);
  if (old && alias === old.alias) {
    container = old;
  } else {
    container.alias = alias;
    c4ShapeArray.push(container);
  }
  if (label === void 0 || label === null) {
    container.label = { text: "" };
  } else {
    container.label = { text: label };
  }
  if (techn === void 0 || techn === null) {
    container.techn ?? (container.techn = { text: "" });
  } else {
    if (typeof techn === "object") {
      const [key, value] = Object.entries(techn)[0];
      container[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      container.techn = { text: techn };
    }
  }
  if (descr === void 0 || descr === null) {
    container.descr ?? (container.descr = { text: "" });
  } else {
    if (typeof descr === "object") {
      const [key, value] = Object.entries(descr)[0];
      container[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      container.descr = { text: descr };
    }
  }
  assignAttributes(container, { sprite, tags, link });
  container.wrap = autoWrap();
  container.typeC4Shape = { text: typeC4Shape };
  container.parentBoundary = currentBoundaryParse;
}, "addContainer");
var addComponent = __name(function(typeC4Shape, alias, label, techn, descr, sprite, tags, link) {
  if (alias === null || label === null) {
    return;
  }
  let component = {};
  const old = c4ShapeArray.find((component2) => component2.alias === alias);
  if (old && alias === old.alias) {
    component = old;
  } else {
    component.alias = alias;
    c4ShapeArray.push(component);
  }
  if (label === void 0 || label === null) {
    component.label = { text: "" };
  } else {
    component.label = { text: label };
  }
  if (techn === void 0 || techn === null) {
    component.techn ?? (component.techn = { text: "" });
  } else {
    if (typeof techn === "object") {
      const [key, value] = Object.entries(techn)[0];
      component[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      component.techn = { text: techn };
    }
  }
  if (descr === void 0 || descr === null) {
    component.descr ?? (component.descr = { text: "" });
  } else {
    if (typeof descr === "object") {
      const [key, value] = Object.entries(descr)[0];
      component[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      component.descr = { text: descr };
    }
  }
  assignAttributes(component, { sprite, tags, link });
  component.wrap = autoWrap();
  component.typeC4Shape = { text: typeC4Shape };
  component.parentBoundary = currentBoundaryParse;
}, "addComponent");
var addPersonOrSystemBoundary = __name(function(alias, label, type, tags, link) {
  if (alias === null || label === null) {
    return;
  }
  let boundary = {};
  const old = boundaries.find((boundary2) => boundary2.alias === alias);
  if (old && alias === old.alias) {
    boundary = old;
  } else {
    boundary.alias = alias;
    boundaries.push(boundary);
  }
  if (label === void 0 || label === null) {
    boundary.label = { text: "" };
  } else {
    boundary.label = { text: label };
  }
  if (type === void 0 || type === null) {
    boundary.type = { text: "system" };
  } else {
    if (typeof type === "object") {
      const [key, value] = Object.entries(type)[0];
      boundary[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      boundary.type = { text: type };
    }
  }
  assignAttributes(boundary, { tags, link });
  boundary.parentBoundary = currentBoundaryParse;
  boundary.wrap = autoWrap();
  parentBoundaryParse = currentBoundaryParse;
  currentBoundaryParse = alias;
  boundaryParseStack.push(parentBoundaryParse);
}, "addPersonOrSystemBoundary");
var addContainerBoundary = __name(function(alias, label, type, tags, link) {
  if (alias === null || label === null) {
    return;
  }
  let boundary = {};
  const old = boundaries.find((boundary2) => boundary2.alias === alias);
  if (old && alias === old.alias) {
    boundary = old;
  } else {
    boundary.alias = alias;
    boundaries.push(boundary);
  }
  if (label === void 0 || label === null) {
    boundary.label = { text: "" };
  } else {
    boundary.label = { text: label };
  }
  if (type === void 0 || type === null) {
    boundary.type = { text: "container" };
  } else {
    if (typeof type === "object") {
      const [key, value] = Object.entries(type)[0];
      boundary[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      boundary.type = { text: type };
    }
  }
  assignAttributes(boundary, { tags, link });
  boundary.parentBoundary = currentBoundaryParse;
  boundary.wrap = autoWrap();
  parentBoundaryParse = currentBoundaryParse;
  currentBoundaryParse = alias;
  boundaryParseStack.push(parentBoundaryParse);
}, "addContainerBoundary");
var addDeploymentNode = __name(function(nodeType, alias, label, type, descr, sprite, tags, link) {
  if (alias === null || label === null) {
    return;
  }
  let boundary = {};
  const old = boundaries.find((boundary2) => boundary2.alias === alias);
  if (old && alias === old.alias) {
    boundary = old;
  } else {
    boundary.alias = alias;
    boundaries.push(boundary);
  }
  if (label === void 0 || label === null) {
    boundary.label = { text: "" };
  } else {
    boundary.label = { text: label };
  }
  if (type === void 0 || type === null) {
    boundary.type = { text: "node" };
  } else {
    if (typeof type === "object") {
      const [key, value] = Object.entries(type)[0];
      boundary[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      boundary.type = { text: type };
    }
  }
  if (descr === void 0 || descr === null) {
    boundary.descr ?? (boundary.descr = { text: "" });
  } else {
    if (typeof descr === "object") {
      const [key, value] = Object.entries(descr)[0];
      boundary[key] = TEXT_FIELDS.has(key) ? { text: value } : value;
    } else {
      boundary.descr = { text: descr };
    }
  }
  assignAttributes(boundary, { tags, link });
  boundary.nodeType = nodeType;
  boundary.parentBoundary = currentBoundaryParse;
  boundary.wrap = autoWrap();
  parentBoundaryParse = currentBoundaryParse;
  currentBoundaryParse = alias;
  boundaryParseStack.push(parentBoundaryParse);
}, "addDeploymentNode");
var popBoundaryParseStack = __name(function() {
  currentBoundaryParse = parentBoundaryParse;
  boundaryParseStack.pop();
  parentBoundaryParse = boundaryParseStack.pop();
  boundaryParseStack.push(parentBoundaryParse);
}, "popBoundaryParseStack");
var updateElStyle = __name(function(typeC4Shape, elementName, bgColor, fontColor, borderColor, shadowing, shape, sprite, techn, legendText, legendSprite) {
  let old = c4ShapeArray.find(
    (element) => element.alias === elementName
  );
  if (old === void 0) {
    old = boundaries.find((element) => element.alias === elementName);
    if (old === void 0) {
      return;
    }
  }
  if (bgColor !== void 0 && bgColor !== null) {
    if (typeof bgColor === "object") {
      const [key, value] = Object.entries(bgColor)[0];
      old[key] = value;
    } else {
      old.bgColor = bgColor;
    }
  }
  if (fontColor !== void 0 && fontColor !== null) {
    if (typeof fontColor === "object") {
      const [key, value] = Object.entries(fontColor)[0];
      old[key] = value;
    } else {
      old.fontColor = fontColor;
    }
  }
  if (borderColor !== void 0 && borderColor !== null) {
    if (typeof borderColor === "object") {
      const [key, value] = Object.entries(borderColor)[0];
      old[key] = value;
    } else {
      old.borderColor = borderColor;
    }
  }
  if (shadowing !== void 0 && shadowing !== null) {
    if (typeof shadowing === "object") {
      const [key, value] = Object.entries(shadowing)[0];
      old[key] = value;
    } else {
      old.shadowing = shadowing;
    }
  }
  if (shape !== void 0 && shape !== null) {
    if (typeof shape === "object") {
      const [key, value] = Object.entries(shape)[0];
      old[key] = value;
    } else {
      old.shape = shape;
    }
  }
  if (sprite !== void 0 && sprite !== null) {
    if (typeof sprite === "object") {
      const [key, value] = Object.entries(sprite)[0];
      old[key] = value;
    } else {
      old.sprite = sprite;
    }
  }
  if (techn !== void 0 && techn !== null) {
    if (typeof techn === "object") {
      const [key, value] = Object.entries(techn)[0];
      old[key] = value;
    } else {
      old.techn = techn;
    }
  }
  if (legendText !== void 0 && legendText !== null) {
    if (typeof legendText === "object") {
      const [key, value] = Object.entries(legendText)[0];
      old[key] = value;
    } else {
      old.legendText = legendText;
    }
  }
  if (legendSprite !== void 0 && legendSprite !== null) {
    if (typeof legendSprite === "object") {
      const [key, value] = Object.entries(legendSprite)[0];
      old[key] = value;
    } else {
      old.legendSprite = legendSprite;
    }
  }
}, "updateElStyle");
var updateRelStyle = __name(function(typeC4Shape, from, to, textColor, lineColor, offsetX, offsetY) {
  const old = rels.find((rel) => rel.from === from && rel.to === to);
  if (old === void 0) {
    return;
  }
  if (textColor !== void 0 && textColor !== null) {
    if (typeof textColor === "object") {
      const [key, value] = Object.entries(textColor)[0];
      old[key] = value;
    } else {
      old.textColor = textColor;
    }
  }
  if (lineColor !== void 0 && lineColor !== null) {
    if (typeof lineColor === "object") {
      const [key, value] = Object.entries(lineColor)[0];
      old[key] = value;
    } else {
      old.lineColor = lineColor;
    }
  }
  if (offsetX !== void 0 && offsetX !== null) {
    if (typeof offsetX === "object") {
      const [key, value] = Object.entries(offsetX)[0];
      old[key] = parseInt(value);
    } else {
      old.offsetX = parseInt(offsetX);
    }
  }
  if (offsetY !== void 0 && offsetY !== null) {
    if (typeof offsetY === "object") {
      const [key, value] = Object.entries(offsetY)[0];
      old[key] = parseInt(value);
    } else {
      old.offsetY = parseInt(offsetY);
    }
  }
}, "updateRelStyle");
var updateLayoutConfig = __name(function(typeC4Shape, c4ShapeInRowParam, c4BoundaryInRowParam) {
  let c4ShapeInRowValue = c4ShapeInRow;
  let c4BoundaryInRowValue = c4BoundaryInRow;
  if (typeof c4ShapeInRowParam === "object") {
    const value = Object.values(c4ShapeInRowParam)[0];
    c4ShapeInRowValue = parseInt(value);
  } else {
    c4ShapeInRowValue = parseInt(c4ShapeInRowParam);
  }
  if (typeof c4BoundaryInRowParam === "object") {
    const value = Object.values(c4BoundaryInRowParam)[0];
    c4BoundaryInRowValue = parseInt(value);
  } else {
    c4BoundaryInRowValue = parseInt(c4BoundaryInRowParam);
  }
  if (c4ShapeInRowValue >= 1) {
    c4ShapeInRow = c4ShapeInRowValue;
  }
  if (c4BoundaryInRowValue >= 1) {
    c4BoundaryInRow = c4BoundaryInRowValue;
  }
}, "updateLayoutConfig");
var getC4ShapeInRow = __name(function() {
  return c4ShapeInRow;
}, "getC4ShapeInRow");
var getC4BoundaryInRow = __name(function() {
  return c4BoundaryInRow;
}, "getC4BoundaryInRow");
var getCurrentBoundaryParse = __name(function() {
  return currentBoundaryParse;
}, "getCurrentBoundaryParse");
var getParentBoundaryParse = __name(function() {
  return parentBoundaryParse;
}, "getParentBoundaryParse");
var getC4ShapeArray = __name(function(parentBoundary) {
  if (parentBoundary === void 0 || parentBoundary === null) {
    return c4ShapeArray;
  } else {
    return c4ShapeArray.filter((personOrSystem) => {
      return personOrSystem.parentBoundary === parentBoundary;
    });
  }
}, "getC4ShapeArray");
var getC4Shape = __name(function(alias) {
  return c4ShapeArray.find((personOrSystem) => personOrSystem.alias === alias) ?? boundaries.find((boundary) => boundary.alias === alias);
}, "getC4Shape");
var getC4ShapeKeys = __name(function(parentBoundary) {
  return Object.keys(getC4ShapeArray(parentBoundary));
}, "getC4ShapeKeys");
var getBoundaries = __name(function(parentBoundary) {
  if (parentBoundary === void 0 || parentBoundary === null) {
    return boundaries;
  } else {
    return boundaries.filter((boundary) => boundary.parentBoundary === parentBoundary);
  }
}, "getBoundaries");
var getBoundarys = getBoundaries;
var getRels = __name(function() {
  return rels;
}, "getRels");
var getTitle = __name(function() {
  return title;
}, "getTitle");
var setWrap = __name(function(wrapSetting) {
  wrapEnabled = wrapSetting;
}, "setWrap");
var autoWrap = __name(function() {
  return wrapEnabled;
}, "autoWrap");
var clear = __name(function() {
  c4ShapeArray = [];
  boundaries = [createGlobalBoundary()];
  parentBoundaryParse = "";
  currentBoundaryParse = "global";
  boundaryParseStack = [""];
  rels = [];
  boundaryParseStack = [""];
  title = "";
  wrapEnabled = false;
  c4ShapeInRow = 4;
  c4BoundaryInRow = 2;
}, "clear");
var LINETYPE = {
  SOLID: 0,
  DOTTED: 1,
  NOTE: 2,
  SOLID_CROSS: 3,
  DOTTED_CROSS: 4,
  SOLID_OPEN: 5,
  DOTTED_OPEN: 6,
  LOOP_START: 10,
  LOOP_END: 11,
  ALT_START: 12,
  ALT_ELSE: 13,
  ALT_END: 14,
  OPT_START: 15,
  OPT_END: 16,
  ACTIVE_START: 17,
  ACTIVE_END: 18,
  PAR_START: 19,
  PAR_AND: 20,
  PAR_END: 21,
  RECT_START: 22,
  RECT_END: 23,
  SOLID_POINT: 24,
  DOTTED_POINT: 25
};
var ARROWTYPE = {
  FILLED: 0,
  OPEN: 1
};
var PLACEMENT = {
  LEFTOF: 0,
  RIGHTOF: 1,
  OVER: 2
};
var setTitle = __name(function(txt) {
  const sanitizedText = sanitizeText(txt, getConfig2());
  title = sanitizedText;
}, "setTitle");
var c4Db_default = {
  addPersonOrSystem,
  addPersonOrSystemBoundary,
  addContainer,
  addContainerBoundary,
  addComponent,
  addDeploymentNode,
  popBoundaryParseStack,
  addRel,
  updateElStyle,
  updateRelStyle,
  updateLayoutConfig,
  autoWrap,
  setWrap,
  getC4ShapeArray,
  getC4Shape,
  getC4ShapeKeys,
  getBoundaries,
  getBoundarys,
  getCurrentBoundaryParse,
  getParentBoundaryParse,
  getRels,
  getTitle,
  getC4Type,
  getC4ShapeInRow,
  getC4BoundaryInRow,
  setAccTitle,
  getAccTitle,
  getAccDescription,
  setAccDescription,
  getConfig: __name(() => getRequiredConfig("c4"), "getConfig"),
  clear,
  LINETYPE,
  ARROWTYPE,
  PLACEMENT,
  setTitle,
  setC4Type
  // apply,
};
var drawRect2 = __name(function(elem, rectData) {
  return drawRect(elem, rectData);
}, "drawRect");
var drawRels = __name((elem, rels2, conf2, diagramId) => {
  const relsElem = elem.append("g");
  let i = 0;
  for (const rel of rels2) {
    const textColor = rel.textColor ? rel.textColor : "#444444";
    const strokeColor = rel.lineColor ? rel.lineColor : "#444444";
    const offsetX = rel.offsetX ? parseInt(String(rel.offsetX)) : 0;
    const offsetY = rel.offsetY ? parseInt(String(rel.offsetY)) : 0;
    const url = "";
    if (i === 0) {
      const line = relsElem.append("line");
      line.attr("x1", rel.startPoint.x);
      line.attr("y1", rel.startPoint.y);
      line.attr("x2", rel.endPoint.x);
      line.attr("y2", rel.endPoint.y);
      line.attr("stroke-width", "1");
      line.attr("stroke", strokeColor);
      line.style("fill", "none");
      if (rel.type !== "rel_b") {
        line.attr("marker-end", "url(" + url + "#" + diagramId + "-arrowhead)");
      }
      if (rel.type === "birel" || rel.type === "rel_b") {
        line.attr("marker-start", "url(" + url + "#" + diagramId + "-arrowend)");
      }
      i = -1;
    } else {
      const line = relsElem.append("path");
      line.attr("fill", "none").attr("stroke-width", "1").attr("stroke", strokeColor).attr(
        "d",
        "Mstartx,starty Qcontrolx,controly stopx,stopy ".replaceAll("startx", rel.startPoint.x).replaceAll("starty", rel.startPoint.y).replaceAll(
          "controlx",
          rel.startPoint.x + (rel.endPoint.x - rel.startPoint.x) / 2 - (rel.endPoint.x - rel.startPoint.x) / 4
        ).replaceAll(
          "controly",
          rel.startPoint.y + (rel.endPoint.y - rel.startPoint.y) / 2
        ).replaceAll("stopx", rel.endPoint.x).replaceAll("stopy", rel.endPoint.y)
      );
      if (rel.type !== "rel_b") {
        line.attr("marker-end", "url(" + url + "#" + diagramId + "-arrowhead)");
      }
      if (rel.type === "birel" || rel.type === "rel_b") {
        line.attr("marker-start", "url(" + url + "#" + diagramId + "-arrowend)");
      }
    }
    const labelWidth = rel.label.width;
    let messageConf = conf2.messageFont();
    _drawTextCandidateFunc(conf2)(
      rel.label.text,
      relsElem,
      Math.min(rel.startPoint.x, rel.endPoint.x) + Math.abs(rel.endPoint.x - rel.startPoint.x) / 2 + offsetX,
      Math.min(rel.startPoint.y, rel.endPoint.y) + Math.abs(rel.endPoint.y - rel.startPoint.y) / 2 + offsetY,
      labelWidth,
      rel.label.height,
      { fill: textColor },
      messageConf
    );
    if (rel.techn && rel.techn.text !== "") {
      messageConf = conf2.messageFont();
      _drawTextCandidateFunc(conf2)(
        "[" + rel.techn.text + "]",
        relsElem,
        Math.min(rel.startPoint.x, rel.endPoint.x) + Math.abs(rel.endPoint.x - rel.startPoint.x) / 2 + offsetX,
        Math.min(rel.startPoint.y, rel.endPoint.y) + Math.abs(rel.endPoint.y - rel.startPoint.y) / 2 + conf2.messageFontSize + 5 + offsetY,
        Math.max(labelWidth, rel.techn.width),
        rel.techn.height,
        { fill: textColor, "font-style": "italic" },
        messageConf
      );
    }
  }
}, "drawRels");
var drawBoundary = __name(function(elem, boundary, conf2) {
  const boundaryElem = elem.append("g");
  const fillColor = boundary.bgColor ? boundary.bgColor : "none";
  const strokeColor = boundary.borderColor ? boundary.borderColor : "#444444";
  const fontColor = boundary.fontColor ? boundary.fontColor : "black";
  let attrsValue = {
    "stroke-width": 1,
    "stroke-dasharray": "7.0,7.0"
  };
  if (boundary.nodeType) {
    attrsValue = { "stroke-width": 1 };
  }
  const rectData = {
    x: boundary.x,
    y: boundary.y,
    fill: fillColor,
    stroke: strokeColor,
    width: boundary.width,
    height: boundary.height,
    rx: 2.5,
    ry: 2.5,
    attrs: attrsValue
  };
  drawRect2(boundaryElem, rectData);
  let boundaryConf = conf2.boundaryFont();
  boundaryConf.fontWeight = "bold";
  boundaryConf.fontSize = boundaryConf.fontSize + 2;
  boundaryConf.fontColor = fontColor;
  _drawTextCandidateFunc(conf2)(
    boundary.label.text,
    boundaryElem,
    boundary.x,
    boundary.y + boundary.label.Y,
    boundary.width,
    boundary.height,
    { fill: "#444444" },
    boundaryConf
  );
  if (boundary.type && boundary.type.text !== "") {
    boundaryConf = conf2.boundaryFont();
    boundaryConf.fontColor = fontColor;
    _drawTextCandidateFunc(conf2)(
      boundary.type.text,
      boundaryElem,
      boundary.x,
      boundary.y + boundary.type.Y,
      boundary.width,
      boundary.height,
      { fill: "#444444" },
      boundaryConf
    );
  }
  if (boundary.descr && boundary.descr.text !== "") {
    boundaryConf = conf2.boundaryFont();
    boundaryConf.fontSize = boundaryConf.fontSize - 2;
    boundaryConf.fontColor = fontColor;
    _drawTextCandidateFunc(conf2)(
      boundary.descr.text,
      boundaryElem,
      boundary.x,
      boundary.y + boundary.descr.Y,
      boundary.width,
      boundary.height,
      { fill: "#444444" },
      boundaryConf
    );
  }
}, "drawBoundary");
var insertDatabaseIcon = __name(function(elem, id) {
  elem.append("defs").append("symbol").attr("id", id + "-database").attr("fill-rule", "evenodd").attr("clip-rule", "evenodd").append("path").attr("transform", "scale(.5)").attr(
    "d",
    "M12.258.001l.256.004.255.005.253.008.251.01.249.012.247.015.246.016.242.019.241.02.239.023.236.024.233.027.231.028.229.031.225.032.223.034.22.036.217.038.214.04.211.041.208.043.205.045.201.046.198.048.194.05.191.051.187.053.183.054.18.056.175.057.172.059.168.06.163.061.16.063.155.064.15.066.074.033.073.033.071.034.07.034.069.035.068.035.067.035.066.035.064.036.064.036.062.036.06.036.06.037.058.037.058.037.055.038.055.038.053.038.052.038.051.039.05.039.048.039.047.039.045.04.044.04.043.04.041.04.04.041.039.041.037.041.036.041.034.041.033.042.032.042.03.042.029.042.027.042.026.043.024.043.023.043.021.043.02.043.018.044.017.043.015.044.013.044.012.044.011.045.009.044.007.045.006.045.004.045.002.045.001.045v17l-.001.045-.002.045-.004.045-.006.045-.007.045-.009.044-.011.045-.012.044-.013.044-.015.044-.017.043-.018.044-.02.043-.021.043-.023.043-.024.043-.026.043-.027.042-.029.042-.03.042-.032.042-.033.042-.034.041-.036.041-.037.041-.039.041-.04.041-.041.04-.043.04-.044.04-.045.04-.047.039-.048.039-.05.039-.051.039-.052.038-.053.038-.055.038-.055.038-.058.037-.058.037-.06.037-.06.036-.062.036-.064.036-.064.036-.066.035-.067.035-.068.035-.069.035-.07.034-.071.034-.073.033-.074.033-.15.066-.155.064-.16.063-.163.061-.168.06-.172.059-.175.057-.18.056-.183.054-.187.053-.191.051-.194.05-.198.048-.201.046-.205.045-.208.043-.211.041-.214.04-.217.038-.22.036-.223.034-.225.032-.229.031-.231.028-.233.027-.236.024-.239.023-.241.02-.242.019-.246.016-.247.015-.249.012-.251.01-.253.008-.255.005-.256.004-.258.001-.258-.001-.256-.004-.255-.005-.253-.008-.251-.01-.249-.012-.247-.015-.245-.016-.243-.019-.241-.02-.238-.023-.236-.024-.234-.027-.231-.028-.228-.031-.226-.032-.223-.034-.22-.036-.217-.038-.214-.04-.211-.041-.208-.043-.204-.045-.201-.046-.198-.048-.195-.05-.19-.051-.187-.053-.184-.054-.179-.056-.176-.057-.172-.059-.167-.06-.164-.061-.159-.063-.155-.064-.151-.066-.074-.033-.072-.033-.072-.034-.07-.034-.069-.035-.068-.035-.067-.035-.066-.035-.064-.036-.063-.036-.062-.036-.061-.036-.06-.037-.058-.037-.057-.037-.056-.038-.055-.038-.053-.038-.052-.038-.051-.039-.049-.039-.049-.039-.046-.039-.046-.04-.044-.04-.043-.04-.041-.04-.04-.041-.039-.041-.037-.041-.036-.041-.034-.041-.033-.042-.032-.042-.03-.042-.029-.042-.027-.042-.026-.043-.024-.043-.023-.043-.021-.043-.02-.043-.018-.044-.017-.043-.015-.044-.013-.044-.012-.044-.011-.045-.009-.044-.007-.045-.006-.045-.004-.045-.002-.045-.001-.045v-17l.001-.045.002-.045.004-.045.006-.045.007-.045.009-.044.011-.045.012-.044.013-.044.015-.044.017-.043.018-.044.02-.043.021-.043.023-.043.024-.043.026-.043.027-.042.029-.042.03-.042.032-.042.033-.042.034-.041.036-.041.037-.041.039-.041.04-.041.041-.04.043-.04.044-.04.046-.04.046-.039.049-.039.049-.039.051-.039.052-.038.053-.038.055-.038.056-.038.057-.037.058-.037.06-.037.061-.036.062-.036.063-.036.064-.036.066-.035.067-.035.068-.035.069-.035.07-.034.072-.034.072-.033.074-.033.151-.066.155-.064.159-.063.164-.061.167-.06.172-.059.176-.057.179-.056.184-.054.187-.053.19-.051.195-.05.198-.048.201-.046.204-.045.208-.043.211-.041.214-.04.217-.038.22-.036.223-.034.226-.032.228-.031.231-.028.234-.027.236-.024.238-.023.241-.02.243-.019.245-.016.247-.015.249-.012.251-.01.253-.008.255-.005.256-.004.258-.001.258.001zm-9.258 20.499v.01l.001.021.003.021.004.022.005.021.006.022.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.023.018.024.019.024.021.024.022.025.023.024.024.025.052.049.056.05.061.051.066.051.07.051.075.051.079.052.084.052.088.052.092.052.097.052.102.051.105.052.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.048.144.049.147.047.152.047.155.047.16.045.163.045.167.043.171.043.176.041.178.041.183.039.187.039.19.037.194.035.197.035.202.033.204.031.209.03.212.029.216.027.219.025.222.024.226.021.23.02.233.018.236.016.24.015.243.012.246.01.249.008.253.005.256.004.259.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.021.224-.024.22-.026.216-.027.212-.028.21-.031.205-.031.202-.034.198-.034.194-.036.191-.037.187-.039.183-.04.179-.04.175-.042.172-.043.168-.044.163-.045.16-.046.155-.046.152-.047.148-.048.143-.049.139-.049.136-.05.131-.05.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.053.083-.051.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.05.023-.024.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.023.01-.022.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.127l-.077.055-.08.053-.083.054-.085.053-.087.052-.09.052-.093.051-.095.05-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.045-.118.044-.12.043-.122.042-.124.042-.126.041-.128.04-.13.04-.132.038-.134.038-.135.037-.138.037-.139.035-.142.035-.143.034-.144.033-.147.032-.148.031-.15.03-.151.03-.153.029-.154.027-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.01-.179.008-.179.008-.181.006-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.006-.179-.008-.179-.008-.178-.01-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.027-.153-.029-.151-.03-.15-.03-.148-.031-.146-.032-.145-.033-.143-.034-.141-.035-.14-.035-.137-.037-.136-.037-.134-.038-.132-.038-.13-.04-.128-.04-.126-.041-.124-.042-.122-.042-.12-.044-.117-.043-.116-.045-.113-.045-.112-.046-.109-.047-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.05-.093-.052-.09-.051-.087-.052-.085-.053-.083-.054-.08-.054-.077-.054v4.127zm0-5.654v.011l.001.021.003.021.004.021.005.022.006.022.007.022.009.022.01.022.011.023.012.023.013.023.015.024.016.023.017.024.018.024.019.024.021.024.022.024.023.025.024.024.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.052.11.051.114.051.119.052.123.05.127.051.131.05.135.049.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.044.171.042.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.022.23.02.233.018.236.016.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.012.241-.015.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.048.139-.05.136-.049.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.051.051-.049.023-.025.023-.024.021-.025.02-.024.019-.024.018-.024.017-.024.015-.023.014-.023.013-.024.012-.022.01-.023.01-.023.008-.022.006-.022.006-.022.004-.021.004-.022.001-.021.001-.021v-4.139l-.077.054-.08.054-.083.054-.085.052-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.044-.118.044-.12.044-.122.042-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.035-.143.033-.144.033-.147.033-.148.031-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.009-.179.009-.179.007-.181.007-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.007-.179-.007-.179-.009-.178-.009-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.031-.146-.033-.145-.033-.143-.033-.141-.035-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.04-.126-.041-.124-.042-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.051-.093-.051-.09-.051-.087-.053-.085-.052-.083-.054-.08-.054-.077-.054v4.139zm0-5.666v.011l.001.02.003.022.004.021.005.022.006.021.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.024.018.023.019.024.021.025.022.024.023.024.024.025.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.051.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.043.171.043.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.021.23.02.233.018.236.017.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.013.241-.014.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.049.139-.049.136-.049.131-.051.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.049.023-.025.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.022.01-.023.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.153l-.077.054-.08.054-.083.053-.085.053-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.048-.105.048-.106.048-.109.046-.111.046-.114.046-.115.044-.118.044-.12.043-.122.043-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.034-.143.034-.144.033-.147.032-.148.032-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.024-.161.024-.162.023-.163.023-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.01-.178.01-.179.009-.179.007-.181.006-.182.006-.182.004-.184.003-.184.001-.185.001-.185-.001-.184-.001-.184-.003-.182-.004-.182-.006-.181-.006-.179-.007-.179-.009-.178-.01-.176-.01-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.023-.162-.023-.161-.024-.159-.024-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.032-.146-.032-.145-.033-.143-.034-.141-.034-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.041-.126-.041-.124-.041-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.048-.105-.048-.102-.048-.1-.05-.097-.049-.095-.051-.093-.051-.09-.052-.087-.052-.085-.053-.083-.053-.08-.054-.077-.054v4.153zm8.74-8.179l-.257.004-.254.005-.25.008-.247.011-.244.012-.241.014-.237.016-.233.018-.231.021-.226.022-.224.023-.22.026-.216.027-.212.028-.21.031-.205.032-.202.033-.198.034-.194.036-.191.038-.187.038-.183.04-.179.041-.175.042-.172.043-.168.043-.163.045-.16.046-.155.046-.152.048-.148.048-.143.048-.139.049-.136.05-.131.05-.126.051-.123.051-.118.051-.114.052-.11.052-.106.052-.101.052-.096.052-.092.052-.088.052-.083.052-.079.052-.074.051-.07.052-.065.051-.06.05-.056.05-.051.05-.023.025-.023.024-.021.024-.02.025-.019.024-.018.024-.017.023-.015.024-.014.023-.013.023-.012.023-.01.023-.01.022-.008.022-.006.023-.006.021-.004.022-.004.021-.001.021-.001.021.001.021.001.021.004.021.004.022.006.021.006.023.008.022.01.022.01.023.012.023.013.023.014.023.015.024.017.023.018.024.019.024.02.025.021.024.023.024.023.025.051.05.056.05.06.05.065.051.07.052.074.051.079.052.083.052.088.052.092.052.096.052.101.052.106.052.11.052.114.052.118.051.123.051.126.051.131.05.136.05.139.049.143.048.148.048.152.048.155.046.16.046.163.045.168.043.172.043.175.042.179.041.183.04.187.038.191.038.194.036.198.034.202.033.205.032.21.031.212.028.216.027.22.026.224.023.226.022.231.021.233.018.237.016.241.014.244.012.247.011.25.008.254.005.257.004.26.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.022.224-.023.22-.026.216-.027.212-.028.21-.031.205-.032.202-.033.198-.034.194-.036.191-.038.187-.038.183-.04.179-.041.175-.042.172-.043.168-.043.163-.045.16-.046.155-.046.152-.048.148-.048.143-.048.139-.049.136-.05.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.05.051-.05.023-.025.023-.024.021-.024.02-.025.019-.024.018-.024.017-.023.015-.024.014-.023.013-.023.012-.023.01-.023.01-.022.008-.022.006-.023.006-.021.004-.022.004-.021.001-.021.001-.021-.001-.021-.001-.021-.004-.021-.004-.022-.006-.021-.006-.023-.008-.022-.01-.022-.01-.023-.012-.023-.013-.023-.014-.023-.015-.024-.017-.023-.018-.024-.019-.024-.02-.025-.021-.024-.023-.024-.023-.025-.051-.05-.056-.05-.06-.05-.065-.051-.07-.052-.074-.051-.079-.052-.083-.052-.088-.052-.092-.052-.096-.052-.101-.052-.106-.052-.11-.052-.114-.052-.118-.051-.123-.051-.126-.051-.131-.05-.136-.05-.139-.049-.143-.048-.148-.048-.152-.048-.155-.046-.16-.046-.163-.045-.168-.043-.172-.043-.175-.042-.179-.041-.183-.04-.187-.038-.191-.038-.194-.036-.198-.034-.202-.033-.205-.032-.21-.031-.212-.028-.216-.027-.22-.026-.224-.023-.226-.022-.231-.021-.233-.018-.237-.016-.241-.014-.244-.012-.247-.011-.25-.008-.254-.005-.257-.004-.26-.001-.26.001z"
  );
}, "insertDatabaseIcon");
var insertComputerIcon = __name(function(elem, id) {
  elem.append("defs").append("symbol").attr("id", id + "-computer").attr("width", "24").attr("height", "24").append("path").attr("transform", "scale(.5)").attr(
    "d",
    "M2 2v13h20v-13h-20zm18 11h-16v-9h16v9zm-10.228 6l.466-1h3.524l.467 1h-4.457zm14.228 3h-24l2-6h2.104l-1.33 4h18.45l-1.297-4h2.073l2 6zm-5-10h-14v-7h14v7z"
  );
}, "insertComputerIcon");
var insertClockIcon = __name(function(elem, id) {
  elem.append("defs").append("symbol").attr("id", id + "-clock").attr("width", "24").attr("height", "24").append("path").attr("transform", "scale(.5)").attr(
    "d",
    "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"
  );
}, "insertClockIcon");
var insertArrowHead = __name(function(elem, id) {
  elem.append("defs").append("marker").attr("id", id + "-arrowhead").attr("refX", 9).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z");
}, "insertArrowHead");
var insertArrowEnd = __name(function(elem, id) {
  elem.append("defs").append("marker").attr("id", id + "-arrowend").attr("refX", 1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 10 0 L 0 5 L 10 10 z");
}, "insertArrowEnd");
var insertArrowFilledHead = __name(function(elem, id) {
  elem.append("defs").append("marker").attr("id", id + "-filled-head").attr("refX", 18).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, "insertArrowFilledHead");
var insertArrowCrossHead = __name(function(elem, id) {
  const defs = elem.append("defs");
  const marker = defs.append("marker").attr("id", id + "-crosshead").attr("markerWidth", 15).attr("markerHeight", 8).attr("orient", "auto").attr("refX", 16).attr("refY", 4);
  marker.append("path").attr("fill", "black").attr("stroke", "#000000").style("stroke-dasharray", "0, 0").attr("stroke-width", "1px").attr("d", "M 9,2 V 6 L16,4 Z");
  marker.append("path").attr("fill", "none").attr("stroke", "#000000").style("stroke-dasharray", "0, 0").attr("stroke-width", "1px").attr("d", "M 0,1 L 6,7 M 6,1 L 0,7");
}, "insertArrowCrossHead");
var _drawTextCandidateFunc = function() {
  function byText(content, g, x, y, width, height, textAttrs) {
    const text = g.append("text").attr("x", x + width / 2).attr("y", y + height / 2 + 5).style("text-anchor", "middle").text(content);
    _setTextAttrs(text, textAttrs);
  }
  __name(byText, "byText");
  function byTspan(content, g, x, y, width, height, textAttrs, conf2) {
    const { fontSize, fontFamily, fontWeight } = conf2;
    const lines = content.split(common_default.lineBreakRegex);
    for (let i = 0; i < lines.length; i++) {
      const dy = i * fontSize - fontSize * (lines.length - 1) / 2;
      const text = g.append("text").attr("x", x + width / 2).attr("y", y).style("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", fontSize).style("font-weight", fontWeight).style("font-family", fontFamily);
      text.append("tspan").attr("dy", dy).text(lines[i]).attr("alignment-baseline", "mathematical");
      _setTextAttrs(text, textAttrs);
    }
  }
  __name(byTspan, "byTspan");
  function byFo(content, g, x, y, width, height, textAttrs, conf2) {
    const s = g.append("switch");
    const f = s.append("foreignObject").attr("x", x).attr("y", y).attr("width", width).attr("height", height);
    const text = f.append("xhtml:div").style("display", "table").style("height", "100%").style("width", "100%");
    text.append("div").style("display", "table-cell").style("text-align", "center").style("vertical-align", "middle").text(content);
    byTspan(content, s, x, y, width, height, textAttrs, conf2);
    _setTextAttrs(text, textAttrs);
  }
  __name(byFo, "byFo");
  function _setTextAttrs(toText, fromTextAttrsDict) {
    for (const key in fromTextAttrsDict) {
      if (fromTextAttrsDict.hasOwnProperty(key)) {
        toText.attr(key, fromTextAttrsDict[key]);
      }
    }
  }
  __name(_setTextAttrs, "_setTextAttrs");
  return function(conf2) {
    return conf2.textPlacement === "fo" ? byFo : conf2.textPlacement === "old" ? byText : byTspan;
  };
}();
var svgDraw_default = {
  drawRect: drawRect2,
  drawBoundary,
  drawRels,
  insertArrowHead,
  insertArrowEnd,
  insertArrowFilledHead,
  insertArrowCrossHead,
  insertDatabaseIcon,
  insertComputerIcon,
  insertClockIcon
};
var getDiagramRoot = __name((id, securityLevel) => {
  var _a3;
  if (securityLevel === "sandbox") {
    const sandboxElement = select_default("#i" + id);
    const doc = (_a3 = sandboxElement.node()) == null ? void 0 : _a3.contentDocument;
    if (!doc) {
      throw new Error(`Sandbox iframe #i${id} is missing its content document`);
    }
    return { root: select_default(doc.body), doc };
  }
  return { root: select_default("body"), doc: document };
}, "getDiagramRoot");
var QUEUE_SHAPES = /* @__PURE__ */ new Set([
  "system_queue",
  "external_system_queue",
  "container_queue",
  "external_container_queue",
  "component_queue",
  "external_component_queue"
]);
var DB_SHAPES = /* @__PURE__ */ new Set([
  "system_db",
  "external_system_db",
  "container_db",
  "external_container_db",
  "component_db",
  "external_component_db"
]);
var SHAPE_KEYWORDS = {
  person: "person",
  box: "rounded",
  rounded: "rounded",
  cylinder: "cylinder",
  database: "cylinder",
  db: "cylinder",
  queue: "h-cyl",
  pipe: "h-cyl",
  component: "fr-rect"
};
var keywordShape = __name((value) => value ? SHAPE_KEYWORDS[value.toLowerCase()] : void 0, "keywordShape");
var resolveNodeShape = __name((shape) => {
  const explicit = keywordShape(shape.shape) ?? keywordShape(shape.sprite);
  if (explicit) {
    return explicit;
  }
  if (shape.tags) {
    for (const tag of shape.tags.split(",")) {
      const tagged = keywordShape(tag.trim());
      if (tagged) {
        return tagged;
      }
    }
  }
  const typeC4Shape = shape.typeC4Shape.text;
  if (typeC4Shape === "person" || typeC4Shape === "external_person") {
    return "person";
  }
  if (DB_SHAPES.has(typeC4Shape)) {
    return "cylinder";
  }
  if (QUEUE_SHAPES.has(typeC4Shape)) {
    return "h-cyl";
  }
  return "rounded";
}, "resolveNodeShape");
var STEREOTYPE_NAMES = {
  person: "Person",
  system: "Software System",
  container: "Container",
  component: "Component"
};
var stereotypeLabel = __name((typeC4Shape) => {
  const base = typeC4Shape.replace(/^external_/, "").replace(/_(db|queue)$/, "");
  return STEREOTYPE_NAMES[base] ?? base.replace(/_/g, " ");
}, "stereotypeLabel");
var isExternal = __name((typeC4Shape) => typeC4Shape.startsWith("external_"), "isExternal");
var stereotypeText = __name((shape) => {
  var _a3;
  const stereotype = stereotypeLabel(shape.typeC4Shape.text);
  return ((_a3 = shape.techn) == null ? void 0 : _a3.text) ? `[${stereotype}: ${shape.techn.text}]` : `[${stereotype}]`;
}, "stereotypeText");
var C4_ELEMENT_TYPES = [
  "person",
  "system",
  "system_db",
  "system_queue",
  "container",
  "container_db",
  "container_queue",
  "component",
  "component_db",
  "component_queue"
].flatMap((type) => [type, `external_${type}`]);
var C4_ELEMENT_TYPE_SET = new Set(C4_ELEMENT_TYPES);
var isC4ElementType = __name((value) => C4_ELEMENT_TYPE_SET.has(value), "isC4ElementType");
var elementCssStyles = __name((shape, config) => {
  const elementType = shape.typeC4Shape.text;
  const fill = shape.bgColor ?? (isC4ElementType(elementType) && config[`${elementType}_bg_color`]);
  const stroke = shape.borderColor ?? (isC4ElementType(elementType) && config[`${elementType}_border_color`]);
  const styles = [];
  if (fill) {
    styles.push(`fill:${fill}`);
  }
  if (stroke) {
    styles.push(`stroke:${stroke}`);
  }
  styles.push(`color:${shape.fontColor ?? "#FFFFFF"}`);
  return styles;
}, "elementCssStyles");
var buildC4Node = __name((shape, config, padding, look, elementWidth) => {
  var _a3;
  const typeC4Shape = shape.typeC4Shape.text;
  const cssClasses = ["c4-shape", `c4-${typeC4Shape}`];
  if (isExternal(typeC4Shape)) {
    cssClasses.push("c4-external");
  }
  const nodeShape = resolveNodeShape(shape);
  const cssStyles = elementCssStyles(shape, config);
  if (nodeShape === "rounded" || nodeShape === "fr-rect") {
    cssStyles.push("rx:12px", "ry:12px");
  }
  return {
    id: shape.alias,
    label: shape.label.text,
    stereotype: stereotypeText(shape),
    description: ((_a3 = shape.descr) == null ? void 0 : _a3.text) ? [shape.descr.text] : void 0,
    labelType: "string",
    isGroup: false,
    shape: nodeShape,
    cssClasses: cssClasses.join(" "),
    cssStyles,
    padding,
    look,
    useHtmlLabels: false,
    width: elementWidth
  };
}, "buildC4Node");
var globalBoundaryMaxX = 0;
var globalBoundaryMaxY = 0;
var c4ShapeInRow2 = 4;
var c4BoundaryInRow2 = 2;
parser.yy = c4Db_default;
var conf = {};
var _a;
var Bounds = (_a = class {
  constructor(diagObj) {
    this.name = "";
    this.data = {};
    this.data.startx = void 0;
    this.data.stopx = void 0;
    this.data.starty = void 0;
    this.data.stopy = void 0;
    this.data.widthLimit = void 0;
    this.nextData = {};
    this.nextData.startx = void 0;
    this.nextData.stopx = void 0;
    this.nextData.starty = void 0;
    this.nextData.stopy = void 0;
    this.nextData.cnt = 0;
    setConf(diagObj.db.getConfig());
  }
  setData(startx, stopx, starty, stopy) {
    this.nextData.startx = this.data.startx = startx;
    this.nextData.stopx = this.data.stopx = stopx;
    this.nextData.starty = this.data.starty = starty;
    this.nextData.stopy = this.data.stopy = stopy;
  }
  updateVal(obj, key, val, fun) {
    if (obj[key] === void 0) {
      obj[key] = val;
    } else {
      obj[key] = fun(val, obj[key]);
    }
  }
  insert(c4Shape) {
    this.nextData.cnt = this.nextData.cnt + 1;
    const nextStopx = this.nextData.stopx;
    const widthLimit = this.data.widthLimit;
    let _startx = this.nextData.startx === this.nextData.stopx ? nextStopx + c4Shape.margin : nextStopx + c4Shape.margin * 2;
    let _stopx = _startx + c4Shape.width;
    let _starty = this.nextData.starty + c4Shape.margin * 2;
    let _stopy = _starty + c4Shape.height;
    if (_startx >= widthLimit || _stopx >= widthLimit || this.nextData.cnt > c4ShapeInRow2) {
      _startx = this.nextData.startx + c4Shape.margin + conf.nextLinePaddingX;
      _starty = this.nextData.stopy + c4Shape.margin * 2;
      this.nextData.stopx = _stopx = _startx + c4Shape.width;
      this.nextData.starty = this.nextData.stopy;
      this.nextData.stopy = _stopy = _starty + c4Shape.height;
      this.nextData.cnt = 1;
    }
    c4Shape.x = _startx;
    c4Shape.y = _starty;
    this.updateVal(this.data, "startx", _startx, Math.min);
    this.updateVal(this.data, "starty", _starty, Math.min);
    this.updateVal(this.data, "stopx", _stopx, Math.max);
    this.updateVal(this.data, "stopy", _stopy, Math.max);
    this.updateVal(this.nextData, "startx", _startx, Math.min);
    this.updateVal(this.nextData, "starty", _starty, Math.min);
    this.updateVal(this.nextData, "stopx", _stopx, Math.max);
    this.updateVal(this.nextData, "stopy", _stopy, Math.max);
  }
  init(diagObj) {
    this.name = "";
    this.data = {
      startx: void 0,
      stopx: void 0,
      starty: void 0,
      stopy: void 0,
      widthLimit: void 0
    };
    this.nextData = {
      startx: void 0,
      stopx: void 0,
      starty: void 0,
      stopy: void 0,
      cnt: 0
    };
    setConf(diagObj.db.getConfig());
  }
  bumpLastMargin(margin) {
    this.data.stopx += margin;
    this.data.stopy += margin;
  }
}, __name(_a, "Bounds"), _a);
var setConf = __name(function(cnf) {
  assignWithDepth_default(conf, cnf);
  if (cnf == null ? void 0 : cnf.fontFamily) {
    conf.personFontFamily = conf.systemFontFamily = conf.messageFontFamily = cnf.fontFamily;
  }
  if (cnf == null ? void 0 : cnf.fontSize) {
    conf.personFontSize = conf.systemFontSize = conf.messageFontSize = cnf.fontSize;
  }
  if (cnf == null ? void 0 : cnf.fontWeight) {
    conf.personFontWeight = conf.systemFontWeight = conf.messageFontWeight = cnf.fontWeight;
  }
}, "setConf");
var boundaryFont = __name((cnf) => {
  return {
    fontFamily: cnf.boundaryFontFamily,
    fontSize: cnf.boundaryFontSize,
    fontWeight: cnf.boundaryFontWeight
  };
}, "boundaryFont");
var messageFont = __name((cnf) => {
  return {
    fontFamily: cnf.messageFontFamily,
    fontSize: cnf.messageFontSize,
    fontWeight: cnf.messageFontWeight
  };
}, "messageFont");
function calcC4ShapeTextWH(textType, c4Shape, c4ShapeTextWrap, textConf, textLimitWidth) {
  const textElement = c4Shape[textType];
  if (!textElement.width) {
    if (c4ShapeTextWrap) {
      textElement.text = wrapLabel(
        textElement.text,
        textLimitWidth,
        textConf
      );
      textElement.textLines = textElement.text.split(common_default.lineBreakRegex).length;
      textElement.width = textLimitWidth;
      textElement.height = calculateTextHeight(textElement.text, textConf);
    } else {
      const lines = textElement.text.split(common_default.lineBreakRegex);
      textElement.textLines = lines.length;
      let lineHeight = 0;
      textElement.height = 0;
      textElement.width = 0;
      for (const line of lines) {
        textElement.width = Math.max(
          calculateTextWidth(line, textConf),
          textElement.width
        );
        lineHeight = calculateTextHeight(line, textConf);
        textElement.height = textElement.height + lineHeight;
      }
    }
  }
  return textElement;
}
__name(calcC4ShapeTextWH, "calcC4ShapeTextWH");
var drawBoundary2 = __name(function(diagram2, boundary, bounds) {
  const startx = bounds.data.startx;
  const starty = bounds.data.starty;
  boundary.x = startx;
  boundary.y = starty;
  boundary.width = bounds.data.stopx - startx;
  boundary.height = bounds.data.stopy - starty;
  boundary.intersect = (point) => intersect_default.rect(
    {
      x: boundary.x + boundary.width / 2,
      y: boundary.y + boundary.height / 2,
      width: boundary.width,
      height: boundary.height
    },
    point
  );
  boundary.label.y = conf.c4ShapeMargin - 35;
  const boundaryTextWrap = boundary.wrap && conf.wrap;
  const boundaryLabelConf = boundaryFont(conf);
  boundaryLabelConf.fontSize = boundaryLabelConf.fontSize + 2;
  boundaryLabelConf.fontWeight = "bold";
  const textLimitWidth = calculateTextWidth(
    boundary.label.text,
    boundaryLabelConf
  );
  calcC4ShapeTextWH("label", boundary, boundaryTextWrap, boundaryLabelConf, textLimitWidth);
  svgDraw_default.drawBoundary(diagram2, boundary, conf);
}, "drawBoundary");
var drawC4ShapeArray = __name(async function(currentBounds, diagram2, c4ShapeArray2, c4ShapeKeys) {
  const mermaidConfig = getConfig2();
  const look = mermaidConfig.look ?? "classic";
  const renderOptions = { config: mermaidConfig };
  const diagramId = diagram2.attr("id") ?? "";
  const c4Shapes = c4ShapeKeys.map((key) => c4ShapeArray2[Number(key)]);
  const shapeHandlerFor = __name((node) => {
    const handler = node.shape ? shapes[node.shape] : void 0;
    if (!handler) {
      throw new Error(`C4: no shape handler for "${node.shape}"`);
    }
    return handler;
  }, "shapeHandlerFor");
  await Promise.all(
    c4Shapes.map(async (c4Shape) => {
      const node = buildC4Node(c4Shape, conf, conf.c4ShapePadding, look, conf.width);
      node.domId = `${diagramId}-${node.id}`;
      const measured = await shapeHandlerFor(node)(diagram2, node, renderOptions);
      c4Shape.width = node.width ?? conf.width;
      c4Shape.height = node.height ?? conf.height;
      c4Shape.margin = conf.c4ShapeMargin;
      measured.remove();
    })
  );
  for (const c4Shape of c4Shapes) {
    currentBounds.insert(c4Shape);
  }
  await Promise.all(
    c4Shapes.map(async (c4Shape) => {
      const node = buildC4Node(c4Shape, conf, conf.c4ShapePadding, look, conf.width);
      node.domId = `${diagramId}-${node.id}`;
      node.x = c4Shape.x + c4Shape.width / 2;
      node.y = c4Shape.y + c4Shape.height / 2;
      const positioned = diagram2.append("g").attr(
        "transform",
        `translate(${c4Shape.x + c4Shape.width / 2}, ${c4Shape.y + c4Shape.height / 2})`
      );
      await shapeHandlerFor(node)(positioned, node, renderOptions);
      c4Shape.intersect = node.intersect;
    })
  );
  currentBounds.bumpLastMargin(conf.c4ShapeMargin);
}, "drawC4ShapeArray");
var _a2;
var Point = (_a2 = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}, __name(_a2, "Point"), _a2);
var getIntersectPoint = __name(function(fromNode, endPoint) {
  if (!fromNode.intersect) {
    throw new Error(
      `C4 element "${fromNode.alias}" has no intersect function. Please report this to https://github.com/mermaid-js/mermaid/issues`
    );
  }
  const { x, y } = fromNode.intersect(endPoint);
  return new Point(x, y);
}, "getIntersectPoint");
var getIntersectPoints = __name(function(fromNode, endNode) {
  const endIntersectPoint = { x: 0, y: 0 };
  endIntersectPoint.x = endNode.x + endNode.width / 2;
  endIntersectPoint.y = endNode.y + endNode.height / 2;
  const startPoint = getIntersectPoint(fromNode, endIntersectPoint);
  endIntersectPoint.x = fromNode.x + fromNode.width / 2;
  endIntersectPoint.y = fromNode.y + fromNode.height / 2;
  const endPoint = getIntersectPoint(endNode, endIntersectPoint);
  return { startPoint, endPoint };
}, "getIntersectPoints");
var drawRels2 = __name(function(diagram2, rels2, getC4ShapeObj, diagObj, diagramId) {
  const diagramType = diagObj.db.getC4Type();
  let i = 0;
  for (const rel of rels2) {
    i = i + 1;
    const relTextWrap = rel.wrap && conf.wrap;
    const relConf = messageFont(conf);
    if (diagramType === "C4Dynamic") {
      rel.label.text = i + ": " + rel.label.text;
    }
    let textLimitWidth = calculateTextWidth(rel.label.text, relConf);
    calcC4ShapeTextWH("label", rel, relTextWrap, relConf, textLimitWidth);
    if (rel.techn && rel.techn.text !== "") {
      textLimitWidth = calculateTextWidth(rel.techn.text, relConf);
      calcC4ShapeTextWH("techn", rel, relTextWrap, relConf, textLimitWidth);
    }
    if (rel.descr && rel.descr.text !== "") {
      textLimitWidth = calculateTextWidth(rel.descr.text, relConf);
      calcC4ShapeTextWH("descr", rel, relTextWrap, relConf, textLimitWidth);
    }
    const fromNode = getC4ShapeObj(rel.from);
    const endNode = getC4ShapeObj(rel.to);
    if (!fromNode || !endNode) {
      throw new Error(
        `C4 rel "${rel.from}" -> "${rel.to}" references an unknown shape or boundary`
      );
    }
    const points = getIntersectPoints(fromNode, endNode);
    if (!points.startPoint || !points.endPoint) {
      throw new Error(
        `Could not calculate intersection points for rel "${rel.from}" -> "${rel.to}"`
      );
    }
    rel.startPoint = points.startPoint;
    rel.endPoint = points.endPoint;
  }
  svgDraw_default.drawRels(diagram2, rels2, conf, diagramId);
}, "drawRels");
async function drawInsideBoundary(diagram2, parentBoundaryAlias, parentBounds, currentBoundaries, diagObj) {
  const db = diagObj.db;
  const currentBounds = new Bounds(diagObj);
  currentBounds.data.widthLimit = parentBounds.data.widthLimit / Math.min(c4BoundaryInRow2, currentBoundaries.length);
  for (const [i, currentBoundary] of currentBoundaries.entries()) {
    let Y = 0;
    currentBoundary.image = { width: 0, height: 0, Y: 0 };
    if (currentBoundary.sprite) {
      currentBoundary.image.width = 48;
      currentBoundary.image.height = 48;
      currentBoundary.image.Y = Y;
      Y = currentBoundary.image.Y + currentBoundary.image.height;
    }
    const currentBoundaryTextWrap = currentBoundary.wrap && conf.wrap;
    const currentBoundaryLabelConf = boundaryFont(conf);
    currentBoundaryLabelConf.fontSize = currentBoundaryLabelConf.fontSize + 2;
    currentBoundaryLabelConf.fontWeight = "bold";
    const label = calcC4ShapeTextWH(
      "label",
      currentBoundary,
      currentBoundaryTextWrap,
      currentBoundaryLabelConf,
      currentBounds.data.widthLimit
    );
    label.Y = Y + 8;
    Y = label.Y + label.height;
    if (currentBoundary.type && currentBoundary.type.text !== "") {
      currentBoundary.type.text = "[" + currentBoundary.type.text + "]";
      const currentBoundaryTypeConf = boundaryFont(conf);
      const type = calcC4ShapeTextWH(
        "type",
        currentBoundary,
        currentBoundaryTextWrap,
        currentBoundaryTypeConf,
        currentBounds.data.widthLimit
      );
      type.Y = Y + 5;
      Y = type.Y + type.height;
    }
    if (currentBoundary.descr && currentBoundary.descr.text !== "") {
      const currentBoundaryDescrConf = boundaryFont(conf);
      currentBoundaryDescrConf.fontSize = currentBoundaryDescrConf.fontSize - 2;
      const descr = calcC4ShapeTextWH(
        "descr",
        currentBoundary,
        currentBoundaryTextWrap,
        currentBoundaryDescrConf,
        currentBounds.data.widthLimit
      );
      descr.Y = Y + 20;
      Y = descr.Y + descr.height;
    }
    if (i == 0 || i % c4BoundaryInRow2 === 0) {
      const _x = parentBounds.data.startx + conf.diagramMarginX;
      const _y = parentBounds.data.stopy + conf.diagramMarginY + Y;
      currentBounds.setData(_x, _x, _y, _y);
    } else {
      const _x = currentBounds.data.stopx !== currentBounds.data.startx ? currentBounds.data.stopx + conf.diagramMarginX : currentBounds.data.startx;
      const _y = currentBounds.data.starty;
      currentBounds.setData(_x, _x, _y, _y);
    }
    currentBounds.name = currentBoundary.alias;
    const currentPersonOrSystemArray = db.getC4ShapeArray(currentBoundary.alias);
    const currentPersonOrSystemKeys = db.getC4ShapeKeys(currentBoundary.alias);
    if (currentPersonOrSystemKeys.length > 0) {
      await drawC4ShapeArray(
        currentBounds,
        diagram2,
        currentPersonOrSystemArray,
        currentPersonOrSystemKeys
      );
    }
    parentBoundaryAlias = currentBoundary.alias;
    const nextCurrentBoundaries = db.getBoundaries(parentBoundaryAlias);
    if (nextCurrentBoundaries.length > 0) {
      await drawInsideBoundary(
        diagram2,
        parentBoundaryAlias,
        currentBounds,
        nextCurrentBoundaries,
        diagObj
      );
    }
    if (currentBoundary.alias !== "global") {
      drawBoundary2(diagram2, currentBoundary, currentBounds);
    }
    parentBounds.data.stopy = Math.max(
      currentBounds.data.stopy + conf.c4ShapeMargin,
      parentBounds.data.stopy
    );
    parentBounds.data.stopx = Math.max(
      currentBounds.data.stopx + conf.c4ShapeMargin,
      parentBounds.data.stopx
    );
    globalBoundaryMaxX = Math.max(globalBoundaryMaxX, parentBounds.data.stopx);
    globalBoundaryMaxY = Math.max(globalBoundaryMaxY, parentBounds.data.stopy);
  }
}
__name(drawInsideBoundary, "drawInsideBoundary");
var draw = __name(async function(_text, id, _version, diagObj) {
  conf = getRequiredConfig("c4");
  const securityLevel = getConfig2().securityLevel;
  const { root } = getDiagramRoot(id, securityLevel);
  const db = diagObj.db;
  db.setWrap(conf.wrap);
  c4ShapeInRow2 = db.getC4ShapeInRow();
  c4BoundaryInRow2 = db.getC4BoundaryInRow();
  log.debug(`C:${JSON.stringify(conf, null, 2)}`);
  const diagram2 = root.select(`[id="${id}"]`);
  svgDraw_default.insertComputerIcon(diagram2, id);
  svgDraw_default.insertDatabaseIcon(diagram2, id);
  svgDraw_default.insertClockIcon(diagram2, id);
  const screenBounds = new Bounds(diagObj);
  screenBounds.setData(
    conf.diagramMarginX,
    conf.diagramMarginX,
    conf.diagramMarginY,
    conf.diagramMarginY
  );
  screenBounds.data.widthLimit = screen.availWidth;
  globalBoundaryMaxX = conf.diagramMarginX;
  globalBoundaryMaxY = conf.diagramMarginY;
  const title2 = db.getTitle();
  const currentBoundaries = db.getBoundaries("");
  await drawInsideBoundary(diagram2, "", screenBounds, currentBoundaries, diagObj);
  svgDraw_default.insertArrowHead(diagram2, id);
  svgDraw_default.insertArrowEnd(diagram2, id);
  svgDraw_default.insertArrowCrossHead(diagram2, id);
  svgDraw_default.insertArrowFilledHead(diagram2, id);
  drawRels2(diagram2, db.getRels(), db.getC4Shape, diagObj, id);
  screenBounds.data.stopx = globalBoundaryMaxX;
  screenBounds.data.stopy = globalBoundaryMaxY;
  const box = screenBounds.data;
  const boxStartx = box.startx;
  const boxStarty = box.starty;
  const boxHeight = globalBoundaryMaxY - boxStarty;
  const height = boxHeight + 2 * conf.diagramMarginY;
  const boxWidth = globalBoundaryMaxX - boxStartx;
  const width = boxWidth + 2 * conf.diagramMarginX;
  if (title2) {
    diagram2.append("text").text(title2).attr("x", boxWidth / 2 - 4 * conf.diagramMarginX).attr("y", boxStarty + conf.diagramMarginY);
  }
  configureSvgSize(diagram2, height, width, conf.useMaxWidth);
  const extraVertForTitle = title2 ? 60 : 0;
  diagram2.attr(
    "viewBox",
    boxStartx - conf.diagramMarginX + " -" + (conf.diagramMarginY + extraVertForTitle) + " " + width + " " + (height + extraVertForTitle)
  );
  log.debug(`models:`, box);
}, "draw");
var c4Renderer_default = {
  drawPersonOrSystemArray: drawC4ShapeArray,
  drawBoundary: drawBoundary2,
  setConf,
  draw
};
var elementFontStyles = __name(() => {
  const c4 = getConfig2().c4 ?? {};
  const sheet = new CSSStyleSheet();
  for (const type of C4_ELEMENT_TYPES) {
    const rule = sheet.cssRules[sheet.insertRule(`.c4-shape.c4-${type} .label {}`, sheet.cssRules.length)];
    const fontFamily = c4[`${type}FontFamily`];
    const fontSize = c4[`${type}FontSize`];
    const fontWeight = c4[`${type}FontWeight`];
    if (fontFamily) {
      rule.style.setProperty("font-family", fontFamily);
    }
    if (fontSize) {
      rule.style.setProperty(
        "font-size",
        typeof fontSize === "number" ? `${fontSize}px` : fontSize
      );
    }
    if (fontWeight) {
      rule.style.setProperty("font-weight", String(fontWeight));
    }
  }
  return [...sheet.cssRules].filter((rule) => rule.style.length > 0).map((rule) => `  ${rule.cssText}`).join("\n");
}, "elementFontStyles");
var getStyles = __name((options) => `.person {
    stroke: ${options.personBorder};
    fill: ${options.personBkg};
  }
${elementFontStyles()}

  /* The element font colour is set inline per element (default white); the
     label text takes it via currentColor. */
  .c4-shape .label,
  .c4-shape .label text {
    color: inherit;
    fill: currentColor;
  }
  /* Structurizr typography: bold name, smaller stereotype/type and description lines. */
  .c4-shape .label .c4-name {
    font-weight: bold;
  }
  .c4-shape .label .c4-type {
    font-size: 0.75em;
  }
  .c4-shape .label .c4-descr {
    font-size: 0.82em;
  }
  .c4-shape .basic,
  .c4-shape rect,
  .c4-shape path,
  .c4-shape circle,
  .c4-shape ellipse,
  .c4-shape line {
    stroke-width: 2px;
  }
`, "getStyles");
var styles_default = getStyles;
var diagram = {
  parser: c4Diagram_default,
  db: c4Db_default,
  renderer: c4Renderer_default,
  styles: styles_default,
  init: __name(({ c4, wrap }) => {
    c4Renderer_default.setConf(c4);
    c4Db_default.setWrap(wrap);
  }, "init")
};
export {
  diagram
};
//# sourceMappingURL=c4Diagram-YGBWAQC7-JTJUFDQR.js.map
