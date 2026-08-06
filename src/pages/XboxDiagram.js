import React, { useEffect, useRef, useState } from "react";
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
   stage gains `pad` units of workspace on every side via a translate
   group (canvas-size slider). Anchor x values are relative to the
   art's left edge; y values include the art's fixed y offset of 130. */
const ART_W = 860;
const ART_H = 575;
const ART_Y = 130;
const TAG_W = 300;
const TAG_H = 96;
const VIEW_H = 780;

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
const PAD_MAX = 400;
const MAX_TEXT = 140;
const MAX_COMBOS = 20;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

const SNAP = 14; // snap distance, stage units

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

const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/* ============================ PAGE ============================ */

export default function XboxDiagram() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [combos, setCombos] = useState([]);
  const [gap, setGap] = useState(GAP_DEFAULT);
  const [pad, setPad] = useState(0);
  const [lineOpacity, setLineOpacity] = useState(1);
  const [hideEmpty, setHideEmpty] = useState(true);
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

  useEffect(() => {
    const prev = document.title;
    document.title = "Xbox Controller Diagram Maker — Dylan Dalal";
    return () => { document.title = prev; };
  }, []);

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
  const artX = 10 + TAG_W + gap;
  const rightTagX = artX + ART_W + gap;
  const baseW = rightTagX + TAG_W + 10;
  const viewW = baseW + pad * 2;
  const viewH = VIEW_H + pad * 2;

  /* default + effective rect for every callout tag. Multi-field boxes
     (d-pad) match the standard height until their rows outgrow it. */
  const layout = CALLOUTS.map((c) => {
    const w = c.tagW || TAG_W;
    const rows = calloutRows(c);
    const h =
      c.fields.length > 1
        ? Math.max(TAG_H, 64 + rows.length * 26)
        : c.tagH || TAG_H;
    const def =
      c.side === "top"
        ? { x: artX + c.tagX, y: 20 }
        : { x: c.side === "left" ? 10 : rightTagX, y: c.tagY };
    const pos = tagPos[c.id];
    const rect = {
      x: clamp(pos ? pos[0] : def.x, -pad, baseW + pad - w),
      y: clamp(pos ? pos[1] : def.y, -pad, VIEW_H + pad - h),
      w,
      h,
    };
    return {
      c,
      rect,
      def,
      anchor: [artX + c.anchor[0], c.anchor[1]],
      rows,
      filled: rows.length > 0,
    };
  });
  rectsRef.current = { layout, viewW, baseW, pad };

  /* -------- dragging + snapping -------- */
  const toStage = (clientX, clientY) => {
    const r = svgRef.current.getBoundingClientRect();
    const { viewW: vw, pad: p } = rectsRef.current;
    return [
      ((clientX - r.left) / r.width) * vw - p,
      ((clientY - r.top) / r.height) * (VIEW_H + p * 2) - p,
    ];
  };

  const startDrag = (e, id) => {
    if (e.button !== undefined && e.button !== 0) return;
    const item = rectsRef.current.layout.find((l) => l.c.id === id);
    if (!item) return;
    e.preventDefault();

    const { w, h } = item.rect;
    const [px, py] = toStage(e.clientX, e.clientY);
    const offX = px - item.rect.x;
    const offY = py - item.rect.y;

    /* snap candidates: other tags' edges, this tag's home position, the
       canvas center, and positions mirroring another tag across the
       canvas centerlines (equidistant from the middle) */
    const { baseW: bw, pad: p } = rectsRef.current;
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
    const minX = -p;
    const maxX = bw + p - w;
    const minY = -p;
    const maxY = VIEW_H + p - h;

    setDragId(id);

    const move = (ev) => {
      const [mx, my] = toStage(ev.clientX, ev.clientY);
      let nx = clamp(mx - offX, minX, maxX);
      let ny = clamp(my - offY, minY, maxY);

      let gx = null;
      let gy = null;
      let gxKind = null;
      let gyKind = null;
      let best = SNAP;
      xCands.forEach((cand) => {
        const d = Math.abs(cand.value - nx);
        if (d < best) { best = d; nx = cand.value; gx = cand.guide; gxKind = cand.kind; }
      });
      best = SNAP;
      yCands.forEach((cand) => {
        const d = Math.abs(cand.value - ny);
        if (d < best) { best = d; ny = cand.value; gy = cand.guide; gyKind = cand.kind; }
      });
      nx = clamp(nx, minX, maxX);
      ny = clamp(ny, minY, maxY);

      setGuides({ x: gx, y: gy, xKind: gxKind, yKind: gyKind });
      setTagPos((prev) => ({ ...prev, [id]: [nx, ny] }));
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
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
  const buildPayload = (vals, cbs, pos, g, cp, lo, he) => ({
    buttons: FIELDS.reduce(
      (acc, f) => ({
        ...acc,
        [f.id]: { tap: vals[f.id].tap, hold: vals[f.id].hold },
      }),
      {}
    ),
    combos: cbs.map(({ hold, press, action }) => ({ hold, press, action })),
    display: {
      labelSpacing: g,
      canvasPadding: cp,
      lineOpacity: lo,
      hideEmpty: he,
    },
    positions: pos,
  });

  const jsonBlob = (payload) =>
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });

  const downloadJson = () =>
    saveBlob(
      jsonBlob(buildPayload(values, combos, tagPos, gap, pad, lineOpacity, hideEmpty)),
      "xbox-controller-layout.json"
    );

  const downloadBlank = () =>
    saveBlob(
      jsonBlob(buildPayload(EMPTY_VALUES, [], {}, GAP_DEFAULT, 0, 1, true)),
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
                clamp(p[0], -PAD_MAX, 4000),
                clamp(p[1], -PAD_MAX, VIEW_H + PAD_MAX),
              ];
            }
          });
        }
        setTagPos(nextPos);

        if (data.display && typeof data.display === "object") {
          if (typeof data.display.labelSpacing === "number") {
            setGap(clamp(Math.round(data.display.labelSpacing), GAP_MIN, GAP_MAX));
          }
          if (typeof data.display.canvasPadding === "number") {
            setPad(clamp(Math.round(data.display.canvasPadding), 0, PAD_MAX));
          }
          if (typeof data.display.lineOpacity === "number") {
            setLineOpacity(clamp(data.display.lineOpacity, 0, 1));
          }
          if (typeof data.display.hideEmpty === "boolean") {
            setHideEmpty(data.display.hideEmpty);
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
    setPad(0);
    setLineOpacity(1);
    setHideEmpty(true);
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
        .map(({ c, rect, anchor, rows }) => {
        const single = c.fields.length === 1;
        return {
          rect,
          anchor,
          lineStart: edgePoint(rect, anchor),
          side: tagSide(rect, anchor),
          iconKey: single ? c.fields[0] : "dpad",
          name: single ? fieldById[c.fields[0]].name : c.name,
          filled: rows.length > 0,
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
        pad,
        baseW,
        viewW,
        viewH,
        lineOpacity,
      };

      const { svg, width, height } = await buildExportSvg(scene);
      const png = await svgToPng(svg, width, height, 2);
      const enc = new TextEncoder();
      const zip = makeZip([
        { name: "diagram.svg", data: enc.encode(svg) },
        { name: "diagram.png", data: new Uint8Array(await png.arrayBuffer()) },
        {
          name: "layout.json",
          data: enc.encode(
            JSON.stringify(
              buildPayload(values, combos, tagPos, gap, pad, lineOpacity, hideEmpty),
              null,
              2
            )
          ),
        },
        { name: "README.txt", data: enc.encode(README_TEXT) },
      ]);
      saveBlob(zip, "xbox-controller-diagram.zip");
      setNotice({
        kind: "ok",
        text: "Export downloaded — SVG, PNG, JSON, and README in one ZIP.",
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
              <span>Canvas size</span>
              <input
                type="range"
                min="0"
                max={PAD_MAX}
                step="20"
                value={pad}
                onChange={(e) => setPad(Number(e.target.value))}
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
          </div>

          <svg
            ref={svgRef}
            className="xd__stage"
            viewBox={`0 0 ${viewW} ${viewH}`}
            style={{ "--line-opacity": lineOpacity }}
            role="img"
            aria-label="Xbox controller diagram"
          >
            <g transform={`translate(${pad}, ${pad})`}>
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

            {layout.map(({ c, rect, anchor, rows, filled }) => {
              const focused = c.fields.includes(focusedId);
              if (hideEmpty && !filled && !focused && dragId !== c.id) {
                return null;
              }
              const cls = [
                "xd__callout",
                filled ? "is-filled" : "",
                focused ? "is-focused" : "",
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
                      className={`xd-tag xd-tag--${side}`}
                      title="Drag to reposition · double-click to reset"
                      onPointerDown={(e) => startDrag(e, c.id)}
                      onDoubleClick={() => resetTag(c.id)}
                    >
                      <img
                        src={single ? field.icon : c.icon}
                        alt=""
                        className="xd-tag__icon"
                        draggable="false"
                      />
                      <div className="xd-tag__text">
                        <span className="xd-tag__name">
                          {single ? field.name : c.name}
                        </span>
                        {!filled ? (
                          <span className="xd-tag__value">Unassigned</span>
                        ) : bigValue ? (
                          <span className="xd-tag__value">{rows[0].text}</span>
                        ) : (
                          rows.map((r) => (
                            <span
                              key={r.key}
                              className="xd-tag__value xd-tag__value--row"
                            >
                              {r.arrow && (
                                <span className="xd-tag__dir">{r.arrow}</span>
                              )}
                              {r.prefix && (
                                <span className="xd-tag__prefix">{r.prefix}</span>
                              )}
                              {r.text}
                            </span>
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
                x1={guides.x} y1={-pad} x2={guides.x} y2={VIEW_H + pad}
                className={`xd__guide ${
                  guides.xKind === "center" ? "xd__guide--center" : ""
                }`}
              />
            )}
            {guides.y !== null && (
              <line
                x1={-pad} y1={guides.y} x2={baseW + pad} y2={guides.y}
                className={`xd__guide ${
                  guides.yKind === "center" ? "xd__guide--center" : ""
                }`}
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
            <p className={`xd__notice xd__notice--${notice.kind}`}>{notice.text}</p>
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
  );
}
