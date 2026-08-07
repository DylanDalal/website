import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import "./XboxDiagram.scss";
import { buildExportSvg, svgToPng, makeZip, README_TEXT } from "./xboxExport";

import controllerArt from "../resources/xbox/controller.svg";

import iconA from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-AButton.svg";
import iconB from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-BButton.svg";
import iconX from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-XButton.svg";
import iconY from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-YButton.svg";
import iconLB from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-L1Button.svg";
import iconLT from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-L2Button.svg";
import iconRB from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-R1Button.svg";
import iconRT from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-R2Button.svg";
import iconLS from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-LDirectional.svg";
import iconRS from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-RDirectional.svg";
import iconDpad from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-DirectionalButton.svg";
import iconView from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-Share.svg";
import iconMenu from "../resources/xbox/xbox-one-controller-buttons/XBOXOne-Options.svg";

/* ============================ DATA ============================ */

/* Every editable field. Each holds a tap action and a hold action. */
const FIELDS = [
  { id: "a",          name: "A Button",           short: "A",            icon: iconA },
  { id: "b",          name: "B Button",           short: "B",            icon: iconB },
  { id: "x",          name: "X Button",           short: "X",            icon: iconX },
  { id: "y",          name: "Y Button",           short: "Y",            icon: iconY },
  { id: "lb",         name: "Left Bumper · LB",   short: "LB",           icon: iconLB },
  { id: "rb",         name: "Right Bumper · RB",  short: "RB",           icon: iconRB },
  { id: "lt",         name: "Left Trigger · LT",  short: "LT",           icon: iconLT },
  { id: "rt",         name: "Right Trigger · RT", short: "RT",           icon: iconRT },
  { id: "ls",         name: "Left Stick",         short: "Left Stick",   icon: iconLS },
  { id: "rs",         name: "Right Stick",        short: "Right Stick",  icon: iconRS },
  { id: "dpad_up",    name: "D-Pad Up",           short: "D-Pad ↑",      icon: iconDpad },
  { id: "dpad_down",  name: "D-Pad Down",         short: "D-Pad ↓",      icon: iconDpad },
  { id: "dpad_left",  name: "D-Pad Left",         short: "D-Pad ←",      icon: iconDpad },
  { id: "dpad_right", name: "D-Pad Right",        short: "D-Pad →",      icon: iconDpad },
  { id: "view",       name: "View",               short: "View",         icon: iconView },
  { id: "menu",       name: "Menu",               short: "Menu",         icon: iconMenu },
];

const fieldById = FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f }), {});

const GROUPS = [
  { title: "Face Buttons",       ids: ["a", "b", "x", "y"] },
  { title: "Bumpers & Triggers", ids: ["lb", "rb", "lt", "rt"] },
  { title: "Sticks",             ids: ["ls", "rs"] },
  { title: "D-Pad",              ids: ["dpad_up", "dpad_down", "dpad_left", "dpad_right"] },
  { title: "System",             ids: ["view", "menu"] },
];

/* ======================= STAGE GEOMETRY =======================
   The controller art (860×575) sits inside a stage whose horizontal
   gutters grow/shrink with the label-spacing slider, and the whole
   stage gains `padX` units of workspace on the left/right and `padY`
   on the top/bottom via a translate group (the canvas sliders, which
   move independently so the diagram can take any aspect ratio).
   Anchor x values are relative to the art's left edge; y values
   include the art's fixed y offset of 130. */
const ART_W = 860;
const ART_H = 575;
const ART_Y = 130;
const TAG_W = 300;
const TAG_H = 96;
const VIEW_H = 780;
const ICON_SIZE = 46; // tag icon, stage units — must match .xd-tag__icon
const TAG_PAD_Y = 22; // tag vertical padding + borders

const CALLOUTS = [
  { id: "lb",   fields: ["lb"],   side: "left",  tagY: 112, anchor: [240, 172] },
  { id: "lt",   fields: ["lt"],   side: "left",  tagY: 272, anchor: [134, 192] },
  { id: "ls",   fields: ["ls"],   side: "left",  tagY: 432, anchor: [215.5, 303.3] },
  {
    id: "dpad", fields: ["dpad_up", "dpad_down", "dpad_left", "dpad_right"],
    side: "left", tagY: 556, anchor: [320.5, 442.3],
    name: "D-Pad", icon: iconDpad,
  },
  { id: "view", fields: ["view"], side: "top",   tagX: 170, tagW: 260, anchor: [370.5, 283] },
  { id: "menu", fields: ["menu"], side: "top",   tagX: 445, tagW: 260, anchor: [492.5, 283] },
  { id: "rb",   fields: ["rb"],   side: "right", tagY: 52,  anchor: [620, 172] },
  { id: "rt",   fields: ["rt"],   side: "right", tagY: 152, anchor: [726, 192] },
  { id: "y",    fields: ["y"],    side: "right", tagY: 252, anchor: [649, 247.8] },
  { id: "b",    fields: ["b"],    side: "right", tagY: 352, anchor: [709, 304.8] },
  { id: "x",    fields: ["x"],    side: "right", tagY: 452, anchor: [590, 305.8] },
  { id: "a",    fields: ["a"],    side: "right", tagY: 552, anchor: [649, 361.8] },
  { id: "rs",   fields: ["rs"],   side: "right", tagY: 652, anchor: [540.5, 434.3] },
];

/* The face-button circles in controller.svg are empty — paint the
   letters (x relative to art's left edge). */
const FACE_LETTERS = [
  { letter: "Y", x: 649, y: 247.8, color: "#e8c95c" },
  { letter: "X", x: 590, y: 305.8, color: "#6ea8e8" },
  { letter: "B", x: 709, y: 304.8, color: "#e87a6e" },
  { letter: "A", x: 649, y: 361.8, color: "#7ec98a" },
];

const DIR_ARROWS = { dpad_up: "↑", dpad_down: "↓", dpad_left: "←", dpad_right: "→" };

const EMPTY_FIELD = { tap: "", hold: "" };
const EMPTY_VALUES = FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.id]: { ...EMPTY_FIELD } }),
  {}
);

const GAP_MIN = 0;
const GAP_MAX = 300;
const GAP_DEFAULT = 40;
/* extra workspace added to each side — width and height move
   independently so the canvas can take any aspect ratio */
const PAD_X_MAX = 600;
const PAD_Y_MAX = 900;
const MAX_TEXT = 140;
const MAX_COMBOS = 20;

/* label width: the global slider sets the baseline, and any tag can be
   given its own width from the inspector */
const TAG_W_MIN = 180;
const TAG_W_MAX = 620;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

const SNAP = 14; // snap distance, stage units
const GRID = 20; // grid pitch, stage units
const NUDGE = {
  ArrowLeft:  [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp:    [0, -1],
  ArrowDown:  [0, 1],
};

/* Positions that continue the rhythm of tiles already lined up along an
   axis: one more gap past either end of a pair, or centred inside it.
   peers: [{ start, size }] of the tiles sharing this lane. */
const sequenceCands = (peers, size) => {
  const out = [];
  const sorted = peers.slice().sort((a, b) => a.start - b.start);
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    const gap = b.start - (a.start + a.size);
    if (gap < 0) continue;
    const after = b.start + b.size + gap;
    const before = a.start - size - gap;
    out.push({ value: after, guide: after, kind: "gap" });
    out.push({ value: before, guide: before, kind: "gap" });
    if (gap - size > 4) {
      const mid = a.start + a.size + (gap - size) / 2;
      out.push({ value: mid, guide: mid, kind: "gap" });
    }
  }
  return out;
};

/* Point on the tag's border where the leader line exits, aiming at the
   anchor — works wherever the tag has been dragged. */
const edgePoint = (rect, anchor) => {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  const dx = anchor[0] - cx;
  const dy = anchor[1] - cy;
  const len = Math.hypot(dx, dy);
  if (!len) return [cx, cy];
  const sx = dx !== 0 ? rect.w / 2 / Math.abs(dx) : Infinity;
  const sy = dy !== 0 ? rect.h / 2 / Math.abs(dy) : Infinity;
  const t = Math.min(sx, sy);
  return [cx + dx * t + (dx / len) * 3, cy + dy * t + (dy / len) * 3];
};

/* Which way the tag should lay out, given where its anchor is. */
const tagSide = (rect, anchor) => {
  const dx = anchor[0] - (rect.x + rect.w / 2);
  const dy = anchor[1] - (rect.y + rect.h / 2);
  if (Math.abs(dy) >= Math.abs(dx) * 1.2) return "top";
  return dx > 0 ? "left" : "right";
};

/* Downloads are stamped so a second export never collides with the
   first in the downloads folder — same-named files are easy to mistake
   for the new one. */
const stamp = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
  );
};

/* The anchor has to be in the document for Firefox to honour it, and
   revoking the URL in the same tick can cut the download off before the
   browser has read the blob. */
const downloadUrl = (url, filename) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  downloadUrl(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 30000);
};

/* ============================ PAGE ============================ */

export default function XboxDiagram() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [combos, setCombos] = useState([]);
  const [gap, setGap] = useState(GAP_DEFAULT);
  const [padX, setPadX] = useState(0);
  const [padY, setPadY] = useState(0);
  const [lineOpacity, setLineOpacity] = useState(1);
  const [hideEmpty, setHideEmpty] = useState(true);
  const [gridSnap, setGridSnap] = useState(true);
  const [labelWidth, setLabelWidth] = useState(TAG_W);
  const [tagW, setTagW] = useState({}); // callout id -> width override
  const [wrapIds, setWrapIds] = useState({}); // callout id -> wrap text?
  const [selId, setSelId] = useState(null); // callout id being inspected
  const [tagH, setTagH] = useState({}); // callout id -> measured height
  const [focusedId, setFocusedId] = useState(null);
  const [notice, setNotice] = useState(null); // { kind: "ok" | "error", text }
  const [tagPos, setTagPos] = useState({}); // callout id -> [x, y] override
  const [dragId, setDragId] = useState(null);
  const [guides, setGuides] = useState({ x: null, y: null, xKind: null, yKind: null });
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef(null);
  const uidRef = useRef(0);
  const svgRef = useRef(null);
  const rectsRef = useRef({});
  const roRef = useRef(null);
  const textElsRef = useRef({}); // callout id -> measured element
  const idByElRef = useRef(new Map());
  const refCbRef = useRef({});
  const exportUrlRef = useRef(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Xbox Controller Diagram Maker — Dylan Dalal";
    return () => { document.title = prev; };
  }, []);

  /* With a label selected the arrow keys nudge it by exact amounts,
     bypassing every snap — the way to land somewhere off-grid. */
  useEffect(() => {
    if (!selId) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelId(null);
        return;
      }
      const dir = NUDGE[e.key];
      if (!dir || e.metaKey || e.ctrlKey) return;
      const tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();

      const step = e.shiftKey ? GRID : e.altKey ? 1 : 5;
      const item = rectsRef.current.layout.find((l) => l.c.id === selId);
      if (!item) return;
      const { baseW: bw, padX: pX, padY: pY } = rectsRef.current;
      const { w, h } = item.rect;
      setTagPos((prev) => {
        const cur = prev[selId] || [item.rect.x, item.rect.y];
        return {
          ...prev,
          [selId]: [
            clamp(cur[0] + dir[0] * step, -pX, bw + pX - w),
            clamp(cur[1] + dir[1] * step, -pY, VIEW_H + pY - h),
          ],
        };
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selId]);

  useEffect(
    () => () => {
      if (roRef.current) roRef.current.disconnect();
      if (exportUrlRef.current) URL.revokeObjectURL(exportUrlRef.current);
    },
    []
  );

  /* Tags size themselves around their text, so their boxes are measured
     rather than guessed — wrapping a label makes its box grow. */
  const observer = () => {
    if (roRef.current || typeof ResizeObserver === "undefined") return roRef.current;
    roRef.current = new ResizeObserver((entries) => {
      setTagH((prev) => {
        let next = prev;
        entries.forEach((entry) => {
          const id = idByElRef.current.get(entry.target);
          if (!id) return;
          const h = Math.round(
            Math.max(ICON_SIZE, entry.target.offsetHeight) + TAG_PAD_Y
          );
          if (Math.abs((prev[id] || 0) - h) > 0.5) {
            if (next === prev) next = { ...prev };
            next[id] = h;
          }
        });
        return next;
      });
    });
    return roRef.current;
  };

  /* one stable ref callback per callout, so React only attaches and
     detaches the observer when a tag actually mounts or unmounts */
  const measureRef = (id) => {
    if (!refCbRef.current[id]) {
      refCbRef.current[id] = (el) => {
        const ro = observer();
        const old = textElsRef.current[id];
        if (old && old !== el) {
          if (ro) ro.unobserve(old);
          idByElRef.current.delete(old);
          delete textElsRef.current[id];
        }
        if (el && old !== el) {
          textElsRef.current[id] = el;
          idByElRef.current.set(el, id);
          if (ro) ro.observe(el);
        }
      };
    }
    return refCbRef.current[id];
  };

  /* Display rows for a callout: tap rows are unprefixed unless the same
     button also has a hold action; hold rows always carry the chip. */
  const calloutRows = (c) => {
    const rows = [];
    c.fields.forEach((id) => {
      const tap = values[id].tap.trim();
      const hold = values[id].hold.trim();
      const arrow = DIR_ARROWS[id] || null;
      if (tap) rows.push({ key: `${id}-tap`, arrow, prefix: hold ? "Tap" : null, text: tap });
      if (hold) rows.push({ key: `${id}-hold`, arrow, prefix: "Hold", text: hold });
    });
    return rows;
  };

  /* -------- derived geometry -------- */
  const artX = 10 + labelWidth + gap;
  const rightTagX = artX + ART_W + gap;
  const baseW = rightTagX + labelWidth + 10;
  const viewW = baseW + padX * 2;
  const viewH = VIEW_H + padY * 2;

  /* A tag's width is its own override if it has one, otherwise the global
     label width scaled by however wide that callout is by design. */
  const widthOf = (c) =>
    Math.round(
      tagW[c.id] != null
        ? tagW[c.id]
        : (labelWidth * (c.tagW || TAG_W)) / TAG_W
    );

  /* default + effective rect for every callout tag. Heights come from the
     measured text (see measureRef); the row estimate covers first paint. */
  const layout = CALLOUTS.map((c) => {
    const w = widthOf(c);
    const rows = calloutRows(c);
    const est =
      c.fields.length > 1
        ? Math.max(TAG_H, 64 + rows.length * 26)
        : c.tagH || TAG_H;
    const h = Math.max(TAG_H, tagH[c.id] != null ? tagH[c.id] : est);
    const def =
      c.side === "top"
        ? { x: artX + c.tagX, y: 20 }
        : { x: c.side === "left" ? 10 : rightTagX, y: c.tagY };
    const pos = tagPos[c.id];
    const rect = {
      x: clamp(pos ? pos[0] : def.x, -padX, baseW + padX - w),
      y: clamp(pos ? pos[1] : def.y, -padY, VIEW_H + padY - h),
      w,
      h,
    };
    return {
      c,
      rect,
      def,
      anchor: [artX + c.anchor[0], c.anchor[1]],
      rows,
      wrap: !!wrapIds[c.id],
      filled: rows.length > 0,
    };
  });
  rectsRef.current = { layout, viewW, baseW, padX, padY };

  /* -------- dragging + snapping -------- */
  const toStage = (clientX, clientY) => {
    const r = svgRef.current.getBoundingClientRect();
    const { viewW: vw, padX: px, padY: py } = rectsRef.current;
    return [
      ((clientX - r.left) / r.width) * vw - px,
      ((clientY - r.top) / r.height) * (VIEW_H + py * 2) - py,
    ];
  };

  /* Nearest snap on one axis: named candidates win inside SNAP, and
     anything left over lands on the grid when grid snap is on. */
  const snapAxis = (raw, cands) => {
    let value = raw;
    let guide = null;
    let kind = null;
    let best = SNAP;
    cands.forEach((c) => {
      const d = Math.abs(c.value - raw);
      if (d < best) { best = d; value = c.value; guide = c.guide; kind = c.kind; }
    });
    if (!kind && gridSnap) value = Math.round(raw / GRID) * GRID;
    return { value, guide, kind };
  };

  const startDrag = (e, id) => {
    if (e.button !== undefined && e.button !== 0) return;
    const item = rectsRef.current.layout.find((l) => l.c.id === id);
    if (!item) return;
    e.preventDefault();
    e.stopPropagation();
    const downX = e.clientX;
    const downY = e.clientY;
    let moved = false;

    const { w, h } = item.rect;
    const [px, py] = toStage(e.clientX, e.clientY);
    const offX = px - item.rect.x;
    const offY = py - item.rect.y;

    /* snap candidates: other tags' edges, this tag's home position, the
       canvas center, and positions mirroring another tag across the
       canvas centerlines (equidistant from the middle) */
    const { baseW: bw, padX: pX, padY: pY } = rectsRef.current;
    const midX = bw / 2;
    const midY = VIEW_H / 2;
    const others = rectsRef.current.layout.filter(
      (l) => l.c.id !== id && (!hideEmpty || l.filled)
    );
    const xCands = [];
    const yCands = [];
    others.forEach(({ rect }) => {
      xCands.push({ value: rect.x, guide: rect.x, kind: "edge" });
      xCands.push({ value: rect.x + rect.w - w, guide: rect.x + rect.w, kind: "edge" });
      yCands.push({ value: rect.y, guide: rect.y, kind: "edge" });
      yCands.push({ value: rect.y + rect.h - h, guide: rect.y + rect.h, kind: "edge" });
      xCands.push({ value: 2 * midX - (rect.x + rect.w), guide: midX, kind: "center" });
      yCands.push({ value: 2 * midY - (rect.y + rect.h), guide: midY, kind: "center" });
    });
    xCands.push({ value: midX - w / 2, guide: midX, kind: "center" });
    yCands.push({ value: midY - h / 2, guide: midY, kind: "center" });
    xCands.push({ value: item.def.x, guide: null, kind: "edge" });
    yCands.push({ value: item.def.y, guide: null, kind: "edge" });
    const minX = -pX;
    const maxX = bw + pX - w;
    const minY = -pY;
    const maxY = VIEW_H + pY - h;

    const move = (ev) => {
      if (!moved) {
        /* a press that never travels is a click — it opens the inspector
           instead of nudging the tag */
        if (Math.hypot(ev.clientX - downX, ev.clientY - downY) < 4) return;
        moved = true;
        setDragId(id);
      }
      const [mx, my] = toStage(ev.clientX, ev.clientY);
      const rawX = clamp(mx - offX, minX, maxX);
      const rawY = clamp(my - offY, minY, maxY);

      /* tiles that line up with this one form a sequence; the gap they
         already keep becomes a snap target, so a column or row stays
         evenly spaced as you extend it */
      const column = others
        .filter((o) => o.rect.x < rawX + w && rawX < o.rect.x + o.rect.w)
        .map((o) => ({ start: o.rect.y, size: o.rect.h }));
      const row = others
        .filter((o) => o.rect.y < rawY + h && rawY < o.rect.y + o.rect.h)
        .map((o) => ({ start: o.rect.x, size: o.rect.w }));

      const sx = snapAxis(rawX, xCands.concat(sequenceCands(row, w)));
      const sy = snapAxis(rawY, yCands.concat(sequenceCands(column, h)));

      const nx = clamp(sx.value, minX, maxX);
      const ny = clamp(sy.value, minY, maxY);

      setGuides({ x: sx.guide, y: sy.guide, xKind: sx.kind, yKind: sy.kind });
      setTagPos((prev) => ({ ...prev, [id]: [nx, ny] }));
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (!moved) setSelId((cur) => (cur === id ? null : id));
      setDragId(null);
      setGuides({ x: null, y: null, xKind: null, yKind: null });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const resetTag = (id) =>
    setTagPos((p) => {
      const next = { ...p };
      delete next[id];
      return next;
    });

  /* -------- per-tag width + wrapping -------- */
  const setTagWidth = (id, w) =>
    setTagW((p) => ({ ...p, [id]: clamp(Math.round(w), TAG_W_MIN, TAG_W_MAX) }));

  const toggleWrap = (id, on) =>
    setWrapIds((p) => {
      const next = { ...p };
      if (on) next[id] = true;
      else delete next[id];
      return next;
    });

  const resetTagStyle = (id) => {
    setTagW((p) => {
      const next = { ...p };
      delete next[id];
      return next;
    });
    toggleWrap(id, false);
    resetTag(id);
  };

  const selected = layout.find((l) => l.c.id === selId) || null;
  const selectedName = selected
    ? selected.c.fields.length === 1
      ? fieldById[selected.c.fields[0]].name
      : selected.c.name
    : "";

  /* -------- state helpers -------- */
  const setValue = (id, slot, text) =>
    setValues((v) => ({
      ...v,
      [id]: { ...v[id], [slot]: text.slice(0, MAX_TEXT) },
    }));

  const addCombo = () => {
    if (combos.length >= MAX_COMBOS) return;
    uidRef.current += 1;
    setCombos((c) => [...c, { uid: uidRef.current, hold: "y", press: "dpad_up", action: "" }]);
  };

  const updateCombo = (uid, patch) =>
    setCombos((c) => c.map((cb) => (cb.uid === uid ? { ...cb, ...patch } : cb)));

  const removeCombo = (uid) =>
    setCombos((c) => c.filter((cb) => cb.uid !== uid));

  /* combos grouped by held button, for the preview boxes */
  const comboGroups = [];
  combos.forEach((c) => {
    let g = comboGroups.find((grp) => grp.hold === c.hold);
    if (!g) {
      g = { hold: c.hold, items: [] };
      comboGroups.push(g);
    }
    g.items.push(c);
  });

  /* -------- JSON in / out -------- */
  const buildPayload = (s) => ({
    buttons: FIELDS.reduce(
      (acc, f) => ({
        ...acc,
        [f.id]: { tap: s.values[f.id].tap, hold: s.values[f.id].hold },
      }),
      {}
    ),
    combos: s.combos.map(({ hold, press, action }) => ({ hold, press, action })),
    display: {
      labelSpacing: s.gap,
      canvasPadX: s.padX,
      canvasPadY: s.padY,
      lineOpacity: s.lineOpacity,
      hideEmpty: s.hideEmpty,
      gridSnap: s.gridSnap,
      labelWidth: s.labelWidth,
    },
    positions: s.tagPos,
    widths: s.tagW,
    wrap: Object.keys(s.wrapIds).filter((k) => s.wrapIds[k]),
  });

  const currentState = () => ({
    values, combos, tagPos, gap, padX, padY, lineOpacity, hideEmpty,
    gridSnap, labelWidth, tagW, wrapIds,
  });

  const jsonBlob = (payload) =>
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });

  const downloadJson = () =>
    saveBlob(
      jsonBlob(buildPayload(currentState())),
      `xbox-controller-layout-${stamp()}.json`
    );

  const downloadBlank = () =>
    saveBlob(
      jsonBlob(
        buildPayload({
          values: EMPTY_VALUES,
          combos: [],
          tagPos: {},
          gap: GAP_DEFAULT,
          padX: 0,
          padY: 0,
          lineOpacity: 1,
          hideEmpty: true,
          gridSnap: true,
          labelWidth: TAG_W,
          tagW: {},
          wrapIds: {},
        })
      ),
      "xbox-controller-template.json"
    );

  const onUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (typeof data !== "object" || data === null || Array.isArray(data)) {
          throw new Error("not an object");
        }

        /* current format nests buttons as { tap, hold }; earlier flat and
           plain-string formats are also accepted */
        const flat =
          typeof data.buttons === "object" && data.buttons !== null
            ? data.buttons
            : data;

        const next = FIELDS.reduce(
          (acc, f) => ({ ...acc, [f.id]: { ...EMPTY_FIELD } }),
          {}
        );
        let matched = 0;
        FIELDS.forEach((f) => {
          const v = flat[f.id];
          if (typeof v === "string") {
            next[f.id] = { tap: v.slice(0, MAX_TEXT), hold: "" };
            matched += 1;
          } else if (v && typeof v === "object") {
            next[f.id] = {
              tap: typeof v.tap === "string" ? v.tap.slice(0, MAX_TEXT) : "",
              hold: typeof v.hold === "string" ? v.hold.slice(0, MAX_TEXT) : "",
            };
            matched += 1;
          }
        });

        const nextCombos = [];
        if (Array.isArray(data.combos)) {
          data.combos.forEach((c) => {
            if (
              nextCombos.length < MAX_COMBOS &&
              c && fieldById[c.hold] && fieldById[c.press] &&
              typeof c.action === "string"
            ) {
              uidRef.current += 1;
              nextCombos.push({
                uid: uidRef.current,
                hold: c.hold,
                press: c.press,
                action: c.action.slice(0, MAX_TEXT),
              });
            }
          });
        }

        if (!matched && !nextCombos.length) {
          setNotice({
            kind: "error",
            text: "No button keys found. Download the blank JSON to see the expected format.",
          });
          return;
        }

        setValues(next);
        setCombos(nextCombos);

        const nextPos = {};
        if (data.positions && typeof data.positions === "object") {
          CALLOUTS.forEach((c) => {
            const p = data.positions[c.id];
            if (
              Array.isArray(p) && p.length === 2 &&
              typeof p[0] === "number" && typeof p[1] === "number"
            ) {
              nextPos[c.id] = [
                clamp(p[0], -PAD_X_MAX, 4000),
                clamp(p[1], -PAD_Y_MAX, VIEW_H + PAD_Y_MAX),
              ];
            }
          });
        }
        setTagPos(nextPos);

        const nextWidths = {};
        if (data.widths && typeof data.widths === "object") {
          CALLOUTS.forEach((c) => {
            const w = data.widths[c.id];
            if (typeof w === "number" && isFinite(w)) {
              nextWidths[c.id] = clamp(Math.round(w), TAG_W_MIN, TAG_W_MAX);
            }
          });
        }
        setTagW(nextWidths);

        const nextWrap = {};
        if (Array.isArray(data.wrap)) {
          data.wrap.forEach((id) => {
            if (CALLOUTS.some((c) => c.id === id)) nextWrap[id] = true;
          });
        }
        setWrapIds(nextWrap);
        setSelId(null);
        setTagH({});

        if (data.display && typeof data.display === "object") {
          if (typeof data.display.labelSpacing === "number") {
            setGap(clamp(Math.round(data.display.labelSpacing), GAP_MIN, GAP_MAX));
          }
          /* canvasPadding is the older single-value form */
          const px =
            typeof data.display.canvasPadX === "number"
              ? data.display.canvasPadX
              : data.display.canvasPadding;
          const py =
            typeof data.display.canvasPadY === "number"
              ? data.display.canvasPadY
              : data.display.canvasPadding;
          if (typeof px === "number") {
            setPadX(clamp(Math.round(px), 0, PAD_X_MAX));
          }
          if (typeof py === "number") {
            setPadY(clamp(Math.round(py), 0, PAD_Y_MAX));
          }
          if (typeof data.display.lineOpacity === "number") {
            setLineOpacity(clamp(data.display.lineOpacity, 0, 1));
          }
          if (typeof data.display.hideEmpty === "boolean") {
            setHideEmpty(data.display.hideEmpty);
          }
          if (typeof data.display.gridSnap === "boolean") {
            setGridSnap(data.display.gridSnap);
          }
          if (typeof data.display.labelWidth === "number") {
            setLabelWidth(
              clamp(Math.round(data.display.labelWidth), TAG_W_MIN, TAG_W_MAX)
            );
          }
        }
        setNotice({ kind: "ok", text: `Loaded ${file.name}` });
      } catch {
        setNotice({ kind: "error", text: "That file isn't valid JSON." });
      }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setCombos([]);
    setGap(GAP_DEFAULT);
    setPadX(0);
    setPadY(0);
    setLineOpacity(1);
    setHideEmpty(true);
    setGridSnap(true);
    setLabelWidth(TAG_W);
    setTagW({});
    setWrapIds({});
    setSelId(null);
    setTagH({});
    setTagPos({});
    setNotice(null);
  };

  /* -------- export bundle (SVG + PNG + JSON + README) -------- */
  const exportAll = async () => {
    if (exporting) return;
    setExporting(true);
    setNotice({ kind: "ok", text: "Preparing export…" });
    try {
      const items = layout
        .filter(({ filled }) => !hideEmpty || filled)
        .map(({ c, rect, anchor, rows, wrap }) => {
        const single = c.fields.length === 1;
        return {
          rect,
          anchor,
          lineStart: edgePoint(rect, anchor),
          side: tagSide(rect, anchor),
          iconKey: single ? c.fields[0] : "dpad",
          name: single ? fieldById[c.fields[0]].name : c.name,
          filled: rows.length > 0,
          wrap,
          rows: rows.length ? rows : [{ text: "Unassigned", empty: true }],
        };
      });

      const iconUrls = FIELDS.reduce(
        (acc, f) => ({ ...acc, [f.id]: f.icon }),
        { dpad: iconDpad }
      );

      const scene = {
        controllerUrl: controllerArt,
        iconUrls,
        items,
        faceLetters: FACE_LETTERS.map((f) => ({ ...f, x: artX + f.x })),
        comboGroups: comboGroups.map((g) => ({
          hold: g.hold,
          title: `Hold ${fieldById[g.hold].short}`,
          rows: g.items.map((c) => ({
            press: `+ ${fieldById[c.press].short}`,
            action: c.action.trim(),
          })),
        })),
        art: { x: artX, y: ART_Y, w: ART_W, h: ART_H },
        padX,
        padY,
        baseW,
        viewW,
        viewH,
        lineOpacity,
      };

      const { svg, width, height } = await buildExportSvg(scene);
      /* 2x unless that would push the raster past the ~16MP ceiling
         browsers put on canvases — a tall canvas can get there */
      const scale = Math.min(2, Math.max(1, Math.sqrt(16e6 / (width * height))));
      const png = await svgToPng(svg, width, height, scale);
      const enc = new TextEncoder();
      const tag = stamp();
      const zip = makeZip([
        { name: `diagram-${tag}.svg`, data: enc.encode(svg) },
        {
          name: `diagram-${tag}.png`,
          data: new Uint8Array(await png.arrayBuffer()),
        },
        {
          name: `layout-${tag}.json`,
          data: enc.encode(JSON.stringify(buildPayload(currentState()), null, 2)),
        },
        { name: "README.txt", data: enc.encode(README_TEXT) },
      ]);
      const zipName = `xbox-controller-diagram-${tag}.zip`;

      /* Building the file takes a moment, so this download no longer
         rides the click that started it — browsers treat that as an
         automatic download and often block every one after the first.
         Keep the blob URL alive and offer it as a real link too. */
      const url = URL.createObjectURL(zip);
      if (exportUrlRef.current) URL.revokeObjectURL(exportUrlRef.current);
      exportUrlRef.current = url;
      downloadUrl(url, zipName);
      setNotice({
        kind: "ok",
        text: `Exported ${width} × ${height} — ${zipName}.`,
        href: url,
        name: zipName,
      });
    } catch {
      setNotice({
        kind: "error",
        text: "Export failed. Your layout is safe — try Download JSON instead.",
      });
    }
    setExporting(false);
  };

  /* ============================ RENDER ============================ */

  return (
    <>
    <Helmet>
      {/* Title & Description */}
      <title>Xbox Controller Diagram Maker | Free Control Scheme Tool</title>
      <meta name="description" content="Free online Xbox controller diagram maker. Label every button, drag labels into place, add combos, and export your control scheme as SVG or PNG. No signup." />
      <link rel="canonical" href="https://dylandalal.com/xbox" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content="Xbox Controller Diagram Maker — Free Control Scheme Tool" />
      <meta property="og:description" content="Build and export a labeled Xbox controller layout diagram in your browser. Free, no signup, exports to SVG and PNG." />
      <meta property="og:image" content="https://dylandalal.com/favicon.png" />
      <meta property="og:url" content="https://dylandalal.com/xbox" />
      <meta property="og:type" content="website" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Xbox Controller Diagram Maker — Free Control Scheme Tool" />
      <meta name="twitter:description" content="Build and export a labeled Xbox controller layout diagram in your browser. Free, no signup, exports to SVG and PNG." />
      <meta name="twitter:image" content="https://dylandalal.com/favicon.png" />

      {/* Schema Markup */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Xbox Controller Diagram Maker",
          "url": "https://dylandalal.com/xbox",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Any",
          "browserRequirements": "Requires JavaScript",
          "description": "A free browser tool for building labeled Xbox controller layout diagrams and exporting them as SVG and PNG.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Person",
            "name": "Dylan Dalal",
            "url": "https://dylandalal.com"
          }
        }
        `}
      </script>
    </Helmet>

    <section className="xd">
      <header className="xd__head">
        <span className="xd__eyebrow">Free Tool</span>
        <h1 className="xd__title">Xbox Controller Diagram Maker</h1>
        <p className="xd__sub">
          Type what each button does to add it to the diagram. Drag any label
          to reposition it. Add combos if you'd like. Export as SVG and PNG.
          Pro tip: download the blank JSON and give it to an AI to fill out,
          then upload it.
        </p>
      </header>

      <div className="xd__grid">
        {/* ============ LIVE PREVIEW ============ */}
        <div className="xd__preview">
          <div className="xd__controls">
            <label className="xd__slider">
              <span>Label spacing</span>
              <input
                type="range"
                min={GAP_MIN}
                max={GAP_MAX}
                step="10"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
              />
            </label>
            <label className="xd__slider">
              <span>Label width</span>
              <input
                type="range"
                min={TAG_W_MIN}
                max={TAG_W_MAX}
                step="10"
                value={labelWidth}
                onChange={(e) => setLabelWidth(Number(e.target.value))}
              />
            </label>
            <label className="xd__slider">
              <span>Canvas width</span>
              <input
                type="range"
                min="0"
                max={PAD_X_MAX}
                step="20"
                value={padX}
                onChange={(e) => setPadX(Number(e.target.value))}
              />
            </label>
            <label className="xd__slider">
              <span>Canvas height</span>
              <input
                type="range"
                min="0"
                max={PAD_Y_MAX}
                step="20"
                value={padY}
                onChange={(e) => setPadY(Number(e.target.value))}
              />
            </label>
            <label className="xd__slider">
              <span>Line opacity</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={Math.round(lineOpacity * 100)}
                onChange={(e) => setLineOpacity(Number(e.target.value) / 100)}
              />
            </label>
            <label className="xd__check">
              <input
                type="checkbox"
                checked={hideEmpty}
                onChange={(e) => setHideEmpty(e.target.checked)}
              />
              <span>Hide empty controls</span>
            </label>
            <label className="xd__check">
              <input
                type="checkbox"
                checked={gridSnap}
                onChange={(e) => setGridSnap(e.target.checked)}
              />
              <span>Snap to grid</span>
            </label>
            <span className="xd__ratio" title="Canvas size and aspect ratio">
              {viewW} × {viewH} · {(viewW / viewH).toFixed(2)}:1
            </span>
          </div>

          {selected ? (
            <div className="xd__inspector">
              <span className="xd__inspectorName">{selectedName}</span>
              <label className="xd__slider">
                <span>Width</span>
                <input
                  type="range"
                  min={TAG_W_MIN}
                  max={TAG_W_MAX}
                  step="10"
                  value={selected.rect.w}
                  onChange={(e) => setTagWidth(selected.c.id, Number(e.target.value))}
                />
                <span className="xd__sliderVal">{selected.rect.w}</span>
              </label>
              <label className="xd__check">
                <input
                  type="checkbox"
                  checked={!!wrapIds[selected.c.id]}
                  onChange={(e) => toggleWrap(selected.c.id, e.target.checked)}
                />
                <span>Wrap text</span>
              </label>
              <button
                type="button"
                className="xd__btn xd__btn--ghost xd__btn--mini"
                onClick={() => resetTagStyle(selected.c.id)}
              >
                Reset label
              </button>
              <button
                type="button"
                className="xd__btn xd__btn--ghost xd__btn--mini"
                onClick={() => setSelId(null)}
              >
                Done
              </button>
              <span className="xd__inspectorHint">
                Arrows nudge (shift {GRID}, alt 1)
              </span>
            </div>
          ) : (
            <p className="xd__stageHint">
              Click a label to set its width, wrap its text, or nudge it with
              the arrow keys · drag to move · double-click to send it home.
            </p>
          )}

          {/* the stage box tracks the canvas ratio exactly: a taller
              canvas makes a taller box, a wider one draws the diagram
              smaller inside the same column */}
          <svg
            ref={svgRef}
            className="xd__stage"
            viewBox={`0 0 ${viewW} ${viewH}`}
            style={{
              "--line-opacity": lineOpacity,
              aspectRatio: `${viewW} / ${viewH}`,
            }}
            onPointerDown={() => setSelId(null)}
            role="img"
            aria-label="Xbox controller diagram"
          >
            <g transform={`translate(${padX}, ${padY})`}>
            {dragId && gridSnap && (
              <>
                <defs>
                  <pattern
                    id="xdGrid"
                    width={GRID}
                    height={GRID}
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d={`M ${GRID} 0 L 0 0 0 ${GRID}`}
                      fill="none"
                      className="xd__gridLine"
                    />
                  </pattern>
                </defs>
                <rect
                  x={-padX}
                  y={-padY}
                  width={viewW}
                  height={viewH}
                  fill="url(#xdGrid)"
                  pointerEvents="none"
                />
              </>
            )}
            <image href={controllerArt} x={artX} y={ART_Y} width={ART_W} height={ART_H} />

            {FACE_LETTERS.map((f) => (
              <text
                key={f.letter}
                x={artX + f.x}
                y={f.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="xd__faceLetter"
                fill={f.color}
              >
                {f.letter}
              </text>
            ))}

            {layout.map(({ c, rect, anchor, rows, filled, wrap }) => {
              const focused = c.fields.includes(focusedId);
              const isSel = selId === c.id;
              if (hideEmpty && !filled && !focused && !isSel && dragId !== c.id) {
                return null;
              }
              const cls = [
                "xd__callout",
                filled ? "is-filled" : "",
                focused ? "is-focused" : "",
                isSel ? "is-selected" : "",
                dragId === c.id ? "is-dragging" : "",
              ].join(" ");

              const lineStart = edgePoint(rect, anchor);
              const side = tagSide(rect, anchor);
              const single = c.fields.length === 1;
              const field = single ? fieldById[c.fields[0]] : null;
              const bigValue =
                rows.length === 1 && !rows[0].arrow && !rows[0].prefix;

              return (
                <g key={c.id} className={cls}>
                  <line
                    x1={lineStart[0]}
                    y1={lineStart[1]}
                    x2={anchor[0]}
                    y2={anchor[1]}
                    className="xd__leader"
                  />
                  <circle cx={anchor[0]} cy={anchor[1]} r="6" className="xd__dot" />
                  <foreignObject x={rect.x} y={rect.y} width={rect.w} height={rect.h}>
                    <div
                      className={`xd-tag xd-tag--${side}${
                        wrap ? " xd-tag--wrap" : ""
                      }`}
                      title="Click to edit width & wrapping · drag to reposition · double-click to reset"
                      onPointerDown={(e) => startDrag(e, c.id)}
                      onDoubleClick={() => resetTag(c.id)}
                    >
                      <img
                        src={single ? field.icon : c.icon}
                        alt=""
                        className="xd-tag__icon"
                        draggable="false"
                      />
                      <div className="xd-tag__text" ref={measureRef(c.id)}>
                        <span className="xd-tag__name">
                          {single ? field.name : c.name}
                        </span>
                        {!filled ? (
                          <span className="xd-tag__value">Unassigned</span>
                        ) : bigValue ? (
                          <span className="xd-tag__value">{rows[0].text}</span>
                        ) : (
                          rows.map((r) => (
                            <React.Fragment key={r.key}>
                              {r.prefix && (
                                <span className="xd-tag__prefix">
                                  {r.arrow && (
                                    <span className="xd-tag__dir">{r.arrow}</span>
                                  )}
                                  {r.prefix}
                                </span>
                              )}
                              <span className="xd-tag__value xd-tag__value--row">
                                {r.arrow && !r.prefix && (
                                  <span className="xd-tag__dir">{r.arrow}</span>
                                )}
                                {r.text}
                              </span>
                            </React.Fragment>
                          ))
                        )}
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {guides.x !== null && (
              <line
                x1={guides.x} y1={-padY} x2={guides.x} y2={VIEW_H + padY}
                className={`xd__guide xd__guide--${guides.xKind || "edge"}`}
              />
            )}
            {guides.y !== null && (
              <line
                x1={-padX} y1={guides.y} x2={baseW + padX} y2={guides.y}
                className={`xd__guide xd__guide--${guides.yKind || "edge"}`}
              />
            )}
            </g>
          </svg>

          {comboGroups.length > 0 && (
            <div className="xd__comboBoard">
              {comboGroups.map((grp) => {
                const hold = fieldById[grp.hold];
                return (
                  <div className="xd__comboBox" key={grp.hold}>
                    <div className="xd__comboBoxHead">
                      <img src={hold.icon} alt="" />
                      <span>Hold {hold.short}</span>
                    </div>
                    {grp.items.map((c) => (
                      <div className="xd__comboRow" key={c.uid}>
                        <span className="xd__comboPress">+ {fieldById[c.press].short}</span>
                        <span
                          className={`xd__comboAction ${
                            c.action.trim() ? "" : "is-empty"
                          }`}
                        >
                          {c.action.trim() || "Unassigned"}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============ EDITOR ============ */}
        <aside className="xd__editor">
          <div className="xd__toolbar">
            <button type="button" className="xd__btn" onClick={() => fileRef.current.click()}>
              Upload JSON
            </button>
            <button type="button" className="xd__btn" onClick={downloadJson}>
              Download JSON
            </button>
            <button type="button" className="xd__btn xd__btn--ghost" onClick={downloadBlank}>
              Blank JSON
            </button>
            <button
              type="button"
              className="xd__btn xd__btn--accent"
              onClick={exportAll}
              disabled={exporting}
            >
              {exporting ? "Exporting…" : "Export"}
            </button>
            <button type="button" className="xd__btn xd__btn--ghost" onClick={reset}>
              Reset
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              onChange={onUpload}
              hidden
            />
          </div>
          {notice && (
            <p className={`xd__notice xd__notice--${notice.kind}`}>
              {notice.text}
              {notice.href && (
                <a
                  className="xd__noticeLink"
                  href={notice.href}
                  download={notice.name}
                >
                  Save it again
                </a>
              )}
            </p>
          )}

          {GROUPS.map((group) => (
            <div className="xd__group" key={group.title}>
              <div className="xd__groupRule">
                <span>{group.title}</span>
                <span className="xd__groupLine" />
              </div>
              {group.ids.map((id) => {
                const f = fieldById[id];
                return (
                  <div className="xd__row" key={id}>
                    <img src={f.icon} alt="" className="xd__rowIcon" />
                    <span className="xd__rowName">{f.name}</span>
                    <div className="xd__inputPair">
                      <input
                        type="text"
                        className="xd__input"
                        value={values[id].tap}
                        placeholder="Tap"
                        maxLength={MAX_TEXT}
                        aria-label={`${f.name} tap action`}
                        onChange={(e) => setValue(id, "tap", e.target.value)}
                        onFocus={() => setFocusedId(id)}
                        onBlur={() => setFocusedId(null)}
                      />
                      <input
                        type="text"
                        className="xd__input"
                        value={values[id].hold}
                        placeholder="Hold"
                        maxLength={MAX_TEXT}
                        aria-label={`${f.name} hold action`}
                        onChange={(e) => setValue(id, "hold", e.target.value)}
                        onFocus={() => setFocusedId(id)}
                        onBlur={() => setFocusedId(null)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* ---- combos ---- */}
          <div className="xd__group">
            <div className="xd__groupRule">
              <span>Combos</span>
              <span className="xd__groupLine" />
            </div>
            {combos.map((c) => (
              <div className="xd__combo" key={c.uid}>
                <div className="xd__comboPick">
                  <select
                    className="xd__select"
                    value={c.hold}
                    aria-label="Held button"
                    onChange={(e) => updateCombo(c.uid, { hold: e.target.value })}
                  >
                    {FIELDS.map((f) => (
                      <option key={f.id} value={f.id}>{f.short}</option>
                    ))}
                  </select>
                  <span className="xd__comboPlus">+</span>
                  <select
                    className="xd__select"
                    value={c.press}
                    aria-label="Pressed button"
                    onChange={(e) => updateCombo(c.uid, { press: e.target.value })}
                  >
                    {FIELDS.map((f) => (
                      <option key={f.id} value={f.id}>{f.short}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="xd__comboRemove"
                    aria-label="Remove combo"
                    onClick={() => removeCombo(c.uid)}
                  >
                    ×
                  </button>
                </div>
                <input
                  type="text"
                  className="xd__input"
                  value={c.action}
                  placeholder="Unassigned"
                  maxLength={MAX_TEXT}
                  onChange={(e) =>
                    updateCombo(c.uid, { action: e.target.value.slice(0, MAX_TEXT) })
                  }
                />
              </div>
            ))}
            {combos.length < MAX_COMBOS && (
              <button type="button" className="xd__btn xd__btn--wide" onClick={addCombo}>
                + Add Combo
              </button>
            )}
          </div>

          <p className="xd__hint">
            JSON — buttons: {`{ "a": { "tap", "hold" }, … }`} with keys{" "}
            {FIELDS.map((f) => f.id).join(" · ")}. Combos:{" "}
            {`{ "hold", "press", "action" }`}. Export bundles SVG, PNG, your
            JSON, and a README into one ZIP — keep the JSON to edit this
            diagram later.
          </p>
        </aside>
      </div>
    </section>
    </>
  );
}
