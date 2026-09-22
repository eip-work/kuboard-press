import {
  markerOffsets
} from "./chunk-QIPQ2JAZ.js";
import {
  __name
} from "./chunk-55T4Z5NV.js";

// node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-NETBCI7D.mjs
var ROUNDED_CORNER_RADIUS = 5;
var CORNER_EPSILON = 1e-5;
var CORNER_JUMP_CLEARANCE = 2;
var MIN_USEFUL_RADIUS_RATIO = 0.6;
var ENDPOINT_EPSILON = 1e-6;
function buildSegmentList(points) {
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    segments.push({ a: points[i], b: points[i + 1] });
  }
  return segments;
}
__name(buildSegmentList, "buildSegmentList");
function segmentIntersection(a1, a2, b1, b2) {
  const dxA = a2.x - a1.x;
  const dyA = a2.y - a1.y;
  const dxB = b2.x - b1.x;
  const dyB = b2.y - b1.y;
  const denom = dxA * dyB - dyA * dxB;
  if (denom === 0) {
    return null;
  }
  const dx = b1.x - a1.x;
  const dy = b1.y - a1.y;
  const tA = (dx * dyB - dy * dxB) / denom;
  const tB = (dx * dyA - dy * dxA) / denom;
  if (tA <= ENDPOINT_EPSILON || tA >= 1 - ENDPOINT_EPSILON || tB <= ENDPOINT_EPSILON || tB >= 1 - ENDPOINT_EPSILON) {
    return null;
  }
  return {
    point: { x: a1.x + tA * dxA, y: a1.y + tA * dyA },
    tA,
    tB
  };
}
__name(segmentIntersection, "segmentIntersection");
function isHorizontalSeg(seg) {
  return Math.abs(seg.b.x - seg.a.x) >= Math.abs(seg.b.y - seg.a.y);
}
__name(isHorizontalSeg, "isHorizontalSeg");
function crossingSitsInRoundedCorner(edge, segIndex, t) {
  if (edge.curve !== "rounded") {
    return false;
  }
  const pts = edge.points;
  const a = pts[segIndex];
  const b = pts[segIndex + 1];
  if (!a || !b) {
    return false;
  }
  const segLen = Math.hypot(b.x - a.x, b.y - a.y);
  const d = t * segLen;
  const entering = segIndex > 0 ? computeRoundedCorner(pts[segIndex - 1], a, b, ROUNDED_CORNER_RADIUS) : null;
  if (entering && d < entering.cutLen) {
    return true;
  }
  const leaving = segIndex + 2 < pts.length ? computeRoundedCorner(a, b, pts[segIndex + 2], ROUNDED_CORNER_RADIUS) : null;
  return leaving !== null && segLen - d < leaving.cutLen;
}
__name(crossingSitsInRoundedCorner, "crossingSitsInRoundedCorner");
function findEdgeIntersections(edges) {
  const crossings = [];
  for (let i = 0; i < edges.length; i++) {
    const edgeA = edges[i];
    const segmentsA = buildSegmentList(edgeA.points);
    for (let j = i + 1; j < edges.length; j++) {
      const edgeB = edges[j];
      const segmentsB = buildSegmentList(edgeB.points);
      for (const [si, segA] of segmentsA.entries()) {
        for (const [sj, segB] of segmentsB.entries()) {
          const hit = segmentIntersection(segA.a, segA.b, segB.a, segB.b);
          if (!hit) {
            continue;
          }
          if (crossingSitsInRoundedCorner(edgeA, si, hit.tA) || crossingSitsInRoundedCorner(edgeB, sj, hit.tB)) {
            continue;
          }
          const aHoriz = isHorizontalSeg(segA);
          const bHoriz = isHorizontalSeg(segB);
          const orthogonalPair = aHoriz !== bHoriz;
          const jumpOnA = orthogonalPair ? aHoriz : false;
          if (jumpOnA) {
            crossings.push({
              jumpEdgeId: edgeA.id,
              otherEdgeId: edgeB.id,
              segIndex: si,
              t: hit.tA,
              point: hit.point
            });
          } else {
            crossings.push({
              jumpEdgeId: edgeB.id,
              otherEdgeId: edgeA.id,
              segIndex: sj,
              t: hit.tB,
              point: hit.point
            });
          }
        }
      }
    }
  }
  return crossings;
}
__name(findEdgeIntersections, "findEdgeIntersections");
function fmt(n) {
  const rounded = Math.round(n * 1e3) / 1e3;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`;
}
__name(fmt, "fmt");
function pointToString(p) {
  return `${fmt(p.x)},${fmt(p.y)}`;
}
__name(pointToString, "pointToString");
function getArcSweepFlag(seg) {
  const dx = seg.b.x - seg.a.x;
  const dy = seg.b.y - seg.a.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? 1 : 0;
  }
  return dy >= 0 ? 1 : 0;
}
__name(getArcSweepFlag, "getArcSweepFlag");
function applyMarkerOffsets(points, edge) {
  if (points.length < 2) {
    return points.map((p) => ({ ...p }));
  }
  const out = points.map((p) => ({ ...p }));
  const startOff = edge.arrowTypeStart && markerOffsets[edge.arrowTypeStart];
  if (startOff) {
    const a = points[0];
    const b = points[1];
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    out[0].x = a.x + startOff * Math.cos(ang);
    out[0].y = a.y + startOff * Math.sin(ang);
  }
  const endOff = edge.arrowTypeEnd && markerOffsets[edge.arrowTypeEnd];
  if (endOff) {
    const n = points.length;
    const a = points[n - 2];
    const b = points[n - 1];
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    out[n - 1].x = b.x - endOff * Math.cos(ang);
    out[n - 1].y = b.y - endOff * Math.sin(ang);
  }
  return out;
}
__name(applyMarkerOffsets, "applyMarkerOffsets");
function emitJump(jump, ux, uy, sweep, style) {
  const cx = jump.point.x;
  const cy = jump.point.y;
  const pre = { x: cx - ux * jump.r, y: cy - uy * jump.r };
  const post = { x: cx + ux * jump.r, y: cy + uy * jump.r };
  const out = [`L${pointToString(pre)}`];
  if (style === "arc") {
    out.push(`A${fmt(jump.r)},${fmt(jump.r)} 0 0 ${sweep} ${pointToString(post)}`);
  } else {
    out.push(`M${pointToString(post)}`);
  }
  return out;
}
__name(emitJump, "emitJump");
function computeRoundedCorner(prev, curr, next, radius) {
  const dx1 = curr.x - prev.x;
  const dy1 = curr.y - prev.y;
  const dx2 = next.x - curr.x;
  const dy2 = next.y - curr.y;
  const len1 = Math.hypot(dx1, dy1);
  const len2 = Math.hypot(dx2, dy2);
  if (len1 < CORNER_EPSILON || len2 < CORNER_EPSILON) {
    return null;
  }
  const nx1 = dx1 / len1;
  const ny1 = dy1 / len1;
  const nx2 = dx2 / len2;
  const ny2 = dy2 / len2;
  const dot = nx1 * nx2 + ny1 * ny2;
  const clamped = Math.max(-1, Math.min(1, dot));
  const angle = Math.acos(clamped);
  if (angle < CORNER_EPSILON || Math.abs(Math.PI - angle) < CORNER_EPSILON) {
    return null;
  }
  const cutLen = Math.min(radius / Math.sin(angle / 2), len1 / 2, len2 / 2);
  return {
    startX: curr.x - nx1 * cutLen,
    startY: curr.y - ny1 * cutLen,
    endX: curr.x + nx2 * cutLen,
    endY: curr.y + ny2 * cutLen,
    ctrlX: curr.x,
    ctrlY: curr.y,
    cutLen
  };
}
__name(computeRoundedCorner, "computeRoundedCorner");
function rewriteEdgePath(edge, jumps, config) {
  const rawPoints = edge.points;
  if (rawPoints.length < 2) {
    return "";
  }
  const points = applyMarkerOffsets(rawPoints, edge);
  const rounded = edge.curve === "rounded";
  const segments = buildSegmentList(points);
  const bySeg = /* @__PURE__ */ new Map();
  for (const j of jumps) {
    const seg = segments[j.segIndex];
    if (!seg) {
      continue;
    }
    const segLen = Math.hypot(seg.b.x - seg.a.x, seg.b.y - seg.a.y);
    const list = bySeg.get(j.segIndex) ?? [];
    list.push({
      t: j.t,
      point: j.point,
      d: j.t * segLen,
      r: config.jumpRadius
    });
    bySeg.set(j.segIndex, list);
  }
  const parts = [`M${pointToString(points[0])}`];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const segLen = Math.hypot(seg.b.x - seg.a.x, seg.b.y - seg.a.y);
    const ux = segLen === 0 ? 0 : (seg.b.x - seg.a.x) / segLen;
    const uy = segLen === 0 ? 0 : (seg.b.y - seg.a.y) / segLen;
    const sweep = getArcSweepFlag(seg);
    let segStartConsumed = 0;
    if (rounded && i > 0) {
      const corner = computeRoundedCorner(
        points[i - 1],
        points[i],
        points[i + 1] ?? points[i],
        ROUNDED_CORNER_RADIUS
      );
      if (corner) {
        segStartConsumed = corner.cutLen;
      }
    }
    let segEndStop = segLen;
    let upcomingCorner = null;
    if (rounded && i < segments.length - 1) {
      upcomingCorner = computeRoundedCorner(
        points[i],
        points[i + 1],
        points[i + 2] ?? points[i + 1],
        ROUNDED_CORNER_RADIUS
      );
      if (upcomingCorner) {
        segEndStop = segLen - upcomingCorner.cutLen;
      }
    }
    const minUsefulRadius = config.jumpRadius * MIN_USEFUL_RADIUS_RATIO;
    const segJumps = [...bySeg.get(i) ?? []].sort((a, b) => a.t - b.t).filter((j) => {
      const room = Math.min(j.d - segStartConsumed, segEndStop - j.d) - CORNER_JUMP_CLEARANCE;
      j.r = Math.min(j.r, room);
      return j.r >= minUsefulRadius;
    });
    for (let k = 0; k < segJumps.length - 1; k++) {
      const gap = segJumps[k + 1].d - segJumps[k].d;
      if (segJumps[k].r + segJumps[k + 1].r > gap) {
        const half = gap / 2;
        segJumps[k].r = Math.min(segJumps[k].r, half);
        segJumps[k + 1].r = Math.min(segJumps[k + 1].r, half);
      }
    }
    for (const j of segJumps) {
      if (j.r < minUsefulRadius) {
        continue;
      }
      parts.push(...emitJump(j, ux, uy, sweep, config.jumpStyle));
    }
    if (rounded && upcomingCorner) {
      parts.push(`L${fmt(upcomingCorner.startX)},${fmt(upcomingCorner.startY)}`);
      parts.push(
        `Q${fmt(upcomingCorner.ctrlX)},${fmt(upcomingCorner.ctrlY)} ${fmt(upcomingCorner.endX)},${fmt(upcomingCorner.endY)}`
      );
    } else {
      parts.push(`L${pointToString(seg.b)}`);
    }
  }
  return parts.join(" ");
}
__name(rewriteEdgePath, "rewriteEdgePath");
function isStraightPath(d) {
  return /^[\d\s+,.LMelm-]*$/.test(d);
}
__name(isStraightPath, "isStraightPath");
function curveSupportsLineHops(curve) {
  if (!curve) {
    return true;
  }
  return curve === "linear" || curve === "rounded" || curve === "step" || curve === "stepBefore" || curve === "stepAfter";
}
__name(curveSupportsLineHops, "curveSupportsLineHops");
function decodeDataPoints(raw) {
  if (!raw) {
    return null;
  }
  try {
    const json = typeof atob === "function" ? atob(raw) : Buffer.from(raw, "base64").toString();
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return null;
    }
    const pts = [];
    for (const p of parsed) {
      if (p && typeof p.x === "number" && typeof p.y === "number") {
        pts.push({ x: p.x, y: p.y });
      }
    }
    return pts.length >= 2 ? pts : null;
  } catch {
    return null;
  }
}
__name(decodeDataPoints, "decodeDataPoints");
function applyLineJumpsToSvg(edgePathsGroup, edges, config) {
  if (!config.enabled) {
    return;
  }
  const groupNode = edgePathsGroup.node();
  if (!groupNode) {
    return;
  }
  const edgeMeta = /* @__PURE__ */ new Map();
  for (const e of edges) {
    edgeMeta.set(e.id, e);
  }
  const pathByDataId = /* @__PURE__ */ new Map();
  for (const el of groupNode.querySelectorAll("path[data-id]")) {
    const id = el.getAttribute("data-id");
    if (id !== null && !pathByDataId.has(id)) {
      pathByDataId.set(id, el);
    }
  }
  const renderedEdges = [];
  for (const e of edges) {
    const pathEl = pathByDataId.get(e.id);
    if (!pathEl) {
      continue;
    }
    const decoded = decodeDataPoints(pathEl.getAttribute("data-points"));
    const points = decoded ?? e.points;
    renderedEdges.push({ ...e, points });
  }
  const crossings = findEdgeIntersections(renderedEdges);
  if (crossings.length === 0) {
    return;
  }
  const jumpsByEdge = /* @__PURE__ */ new Map();
  for (const c of crossings) {
    const list = jumpsByEdge.get(c.jumpEdgeId) ?? [];
    list.push(c);
    jumpsByEdge.set(c.jumpEdgeId, list);
  }
  for (const renderedEdge of renderedEdges) {
    const jumps = jumpsByEdge.get(renderedEdge.id);
    if (!jumps || jumps.length === 0) {
      continue;
    }
    const meta = edgeMeta.get(renderedEdge.id);
    const curveHint = meta == null ? void 0 : meta.curve;
    if (curveHint !== void 0 && !curveSupportsLineHops(curveHint)) {
      continue;
    }
    const pathEl = pathByDataId.get(renderedEdge.id);
    if (!pathEl) {
      continue;
    }
    if (curveHint === void 0) {
      const currentD = pathEl.getAttribute("d") ?? "";
      if (!isStraightPath(currentD)) {
        continue;
      }
    }
    const originalStyle = pathEl.getAttribute("style") ?? "";
    const dasharrayMatch = /stroke-dasharray\s*:\s*0\s+([\d.]+)\s+[\d.]+\s+([\d.]+)/.exec(
      originalStyle
    );
    const preservedOValueS = dasharrayMatch ? Number.parseFloat(dasharrayMatch[1]) : null;
    const preservedOValueE = dasharrayMatch ? Number.parseFloat(dasharrayMatch[2]) : null;
    const newD = rewriteEdgePath(renderedEdge, jumps, config);
    pathEl.setAttribute("d", newD);
    if (preservedOValueS !== null && preservedOValueE !== null && typeof pathEl.getTotalLength === "function") {
      const newLen = pathEl.getTotalLength();
      const onLen = Math.max(0, newLen - preservedOValueS - preservedOValueE);
      const newDasharray = `0 ${preservedOValueS} ${onLen} ${preservedOValueE}`;
      const cleaned = originalStyle.replace(/stroke-dasharray\s*:[^;]*;?/g, `stroke-dasharray: ${newDasharray};`).replace(/;\s*;+/g, ";");
      pathEl.setAttribute("style", cleaned);
    }
  }
}
__name(applyLineJumpsToSvg, "applyLineJumpsToSvg");

export {
  applyLineJumpsToSvg
};
//# sourceMappingURL=chunk-7J5MCM5B.js.map
