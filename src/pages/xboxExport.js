/* Export pipeline for the Xbox Controller Diagram Maker.
   Rebuilds the diagram as a self-contained SVG (no foreignObject, no
   external refs — required so the file opens anywhere and can be
   rasterized to PNG through a canvas), then bundles SVG + PNG + JSON +
   README into a store-mode ZIP. */

const SANS = "Futura, 'Century Gothic', system-ui, sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

const NAVY_BG = "#0b133a";
const TAG_BG = "#101b4d";
const CYAN = "#97d1d6";
const INK = "#ffffff";
const INK_3 = "rgba(255,255,255,0.48)";
const INK_4 = "rgba(255,255,255,0.28)";
const HAIR = "rgba(255,255,255,0.12)";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const b64 = (text) => btoa(unescape(encodeURIComponent(text)));

/* Bundled asset URL → data URI (CRA may already inline small assets). */
async function toDataUri(url) {
  if (url.startsWith("data:")) return url;
  const res = await fetch(url);
  const text = await res.text();
  return "data:image/svg+xml;base64," + b64(text);
}

/* Greedy word wrap by approximate character budget. */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  words.forEach((w) => {
    if (cur && (cur + " " + w).length > maxChars) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  });
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] =
      kept[maxLines - 1].slice(0, Math.max(0, maxChars - 1)) + "…";
    return kept;
  }
  return lines;
}

const clip = (text, maxChars) =>
  text.length > maxChars ? text.slice(0, maxChars - 1) + "…" : text;

/* ---------------- SVG generation ---------------- */

function tagSvg(item, iconUri) {
  const { rect, side, name, rows, filled, wrap: wrapText } = item;
  const parts = [];

  const iconSize = 46;
  const padX = 14;
  const anchorAttr = side === "left" ? "end" : "start";
  const budget = Math.max(
    6,
    Math.floor((rect.w - iconSize - padX * 3) / 11)
  );

  /* rows: [{ text, arrow?, prefix?, empty? }]. A lone plain value wraps
     to two lines; anything multi-row (tap/hold pairs, d-pad directions)
     renders one line per row under a TAP/HOLD subheading — matching the
     live preview. Tags marked "wrap text" instead run every row over as
     many lines as the text needs. */
  const bigValue =
    rows.length === 1 && !rows[0].arrow && !rows[0].prefix && !rows[0].empty;

  const lineHs = [];
  const rendered = [];
  if (bigValue) {
    wrap(rows[0].text, budget, wrapText ? 12 : 2).forEach((ln) => {
      rendered.push({ text: ln, size: 23 });
      lineHs.push(27);
    });
  } else {
    rows.forEach((r) => {
      if (r.prefix) {
        rendered.push({
          heading: true,
          text: `${r.arrow ? r.arrow + " " : ""}${r.prefix.toUpperCase()}`,
          size: 13,
        });
        lineHs.push(18);
      }
      /* the direction arrow only leads the value when no subheading
         above it already carries it */
      const lead = r.prefix ? null : r.arrow;
      const room = Math.max(4, budget + 2 - (lead ? 2 : 0));
      if (wrapText) {
        wrap(r.text, room, 12).forEach((ln, i) => {
          rendered.push({
            empty: r.empty,
            arrow: i === 0 ? lead : null,
            text: ln,
            size: 20,
          });
          lineHs.push(26);
        });
      } else {
        rendered.push({
          empty: r.empty,
          arrow: lead,
          text: clip(r.text, room),
          size: 20,
        });
        lineHs.push(26);
      }
    });
  }

  const nameH = 22;
  const totalH = nameH + lineHs.reduce((a, b) => a + b, 0);
  /* the preview measures its boxes around the text; grow here too so a
     wrapped label is never taller than the card behind it */
  const boxH = Math.max(rect.h, totalH + 24);

  parts.push(
    `<rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${boxH}"` +
      ` rx="14" fill="${TAG_BG}" stroke="${
        filled ? "rgba(151,209,214,0.45)" : HAIR
      }" stroke-width="1.5"/>`
  );

  const iconX =
    side === "left" ? rect.x + rect.w - padX - iconSize : rect.x + padX;
  const iconY = rect.y + boxH / 2 - iconSize / 2;
  parts.push(
    `<image href="${iconUri}" x="${iconX}" y="${iconY}"` +
      ` width="${iconSize}" height="${iconSize}"/>`
  );

  const textX =
    side === "left" ? iconX - padX : iconX + iconSize + padX;

  let baseline = rect.y + boxH / 2 - totalH / 2 + 14;

  parts.push(
    `<text x="${textX}" y="${baseline}" text-anchor="${anchorAttr}"` +
      ` font-family="${MONO}" font-size="15" letter-spacing="2"` +
      ` fill="${INK_3}">${esc(name.toUpperCase())}</text>`
  );
  baseline += nameH + 5;

  rendered.forEach((r, i) => {
    if (r.heading) {
      parts.push(
        `<text x="${textX}" y="${baseline}" text-anchor="${anchorAttr}"` +
          ` font-family="${MONO}" font-size="13" letter-spacing="1"` +
          ` fill="${CYAN}">${esc(r.text)}</text>`
      );
      baseline += lineHs[i];
      return;
    }
    const fill = r.empty ? INK_4 : INK;
    const style = r.empty ? ` font-style="italic"` : "";
    const arrow = r.arrow
      ? `<tspan fill="${CYAN}">${esc(r.arrow)} </tspan>`
      : "";
    parts.push(
      `<text x="${textX}" y="${baseline}" text-anchor="${anchorAttr}"` +
        ` font-family="${SANS}" font-size="${r.size}" fill="${fill}"${style}>` +
        `${arrow}${esc(r.text)}</text>`
    );
    baseline += lineHs[i];
  });

  return parts.join("\n");
}

function comboBoardSvg(comboGroups, iconUris, startY, totalW) {
  const parts = [];
  const boxW = 360;
  const gapPx = 16;
  let x = 10;
  let y = startY;
  let rowMaxH = 0;

  comboGroups.forEach((g) => {
    const boxH = 50 + g.rows.length * 30 + 8;
    if (x + boxW > totalW - 10 && x > 10) {
      x = 10;
      y += rowMaxH + gapPx;
      rowMaxH = 0;
    }
    rowMaxH = Math.max(rowMaxH, boxH);

    parts.push(
      `<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="14"` +
        ` fill="${TAG_BG}" stroke="${HAIR}" stroke-width="1.5"/>`
    );
    parts.push(
      `<image href="${iconUris[g.hold]}" x="${x + 16}" y="${y + 13}"` +
        ` width="24" height="24"/>`
    );
    parts.push(
      `<text x="${x + 50}" y="${y + 30}" font-family="${MONO}"` +
        ` font-size="13" letter-spacing="2" fill="${CYAN}">` +
        `${esc(g.title.toUpperCase())}</text>`
    );
    parts.push(
      `<line x1="${x + 16}" y1="${y + 44}" x2="${x + boxW - 16}"` +
        ` y2="${y + 44}" stroke="${HAIR}" stroke-width="1"/>`
    );

    g.rows.forEach((r, i) => {
      const rowY = y + 68 + i * 30;
      parts.push(
        `<text x="${x + 16}" y="${rowY}" font-family="${MONO}"` +
          ` font-size="12" letter-spacing="1" fill="${INK_3}">` +
          `${esc(r.press.toUpperCase())}</text>`
      );
      const empty = !r.action;
      parts.push(
        `<text x="${x + 130}" y="${rowY}" font-family="${SANS}"` +
          ` font-size="16" fill="${empty ? INK_4 : INK}"` +
          `${empty ? ' font-style="italic"' : ""}>` +
          `${esc(clip(r.action || "Unassigned", 26))}</text>`
      );
    });

    x += boxW + gapPx;
  });

  return { svg: parts.join("\n"), endY: y + rowMaxH };
}

export async function buildExportSvg(scene) {
  const {
    controllerUrl, iconUrls, items, faceLetters, comboGroups,
    art, pad, viewW, viewH, lineOpacity,
  } = scene;

  const controllerUri = await toDataUri(controllerUrl);
  const iconUris = {};
  await Promise.all(
    Object.keys(iconUrls).map(async (k) => {
      iconUris[k] = await toDataUri(iconUrls[k]);
    })
  );

  const body = [];

  /* leader lines + dots (under the tags) */
  body.push(`<g opacity="${lineOpacity}">`);
  items.forEach((it) => {
    const stroke = it.filled ? CYAN : INK_4;
    body.push(
      `<line x1="${it.lineStart[0]}" y1="${it.lineStart[1]}"` +
        ` x2="${it.anchor[0]}" y2="${it.anchor[1]}"` +
        ` stroke="${stroke}" stroke-width="2"/>`
    );
    body.push(
      `<circle cx="${it.anchor[0]}" cy="${it.anchor[1]}" r="6" fill="${stroke}"/>`
    );
  });
  body.push(`</g>`);

  body.push(
    `<image href="${controllerUri}" x="${art.x}" y="${art.y}"` +
      ` width="${art.w}" height="${art.h}"/>`
  );

  faceLetters.forEach((f) => {
    body.push(
      `<text x="${f.x}" y="${f.y}" text-anchor="middle"` +
        ` dominant-baseline="central" font-family="${SANS}"` +
        ` font-size="32" font-weight="700" fill="${f.color}"` +
        ` opacity="0.9">${f.letter}</text>`
    );
  });

  items.forEach((it) => body.push(tagSvg(it, iconUris[it.iconKey])));

  let totalH = viewH;
  let comboSvg = "";
  if (comboGroups.length) {
    const board = comboBoardSvg(comboGroups, iconUris, viewH + 10, viewW);
    comboSvg = board.svg;
    totalH = board.endY + 16;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${viewW}" height="${totalH}"` +
    ` viewBox="0 0 ${viewW} ${totalH}">\n` +
    `<rect width="${viewW}" height="${totalH}" fill="${NAVY_BG}"/>\n` +
    `<g transform="translate(${pad}, ${pad})">\n${body.join("\n")}\n</g>\n` +
    `${comboSvg}\n</svg>`;

  return { svg, width: viewW, height: totalH };
}

/* ---------------- PNG rasterization ---------------- */

export function svgToPng(svgText, width, height, scale = 2) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
          "image/png"
        );
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("SVG rasterization failed"));
    img.src = "data:image/svg+xml;base64," + b64(svgText);
  });
}

/* ---------------- minimal ZIP (store, no compression) ---------------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(data) {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

/* files: [{ name: string, data: Uint8Array }] */
export function makeZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;

  files.forEach((f) => {
    const nameB = encoder.encode(f.name);
    const crc = crc32(f.data);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true);
    lh.setUint16(6, 0x0800, true); // UTF-8 names
    lh.setUint16(8, 0, true); // stored
    lh.setUint16(10, 0, true);
    lh.setUint16(12, 0x21, true); // 1980-01-01
    lh.setUint32(14, crc, true);
    lh.setUint32(18, f.data.length, true);
    lh.setUint32(22, f.data.length, true);
    lh.setUint16(26, nameB.length, true);
    lh.setUint16(28, 0, true);
    chunks.push(new Uint8Array(lh.buffer), nameB, f.data);
    central.push({ nameB, crc, size: f.data.length, offset });
    offset += 30 + nameB.length + f.data.length;
  });

  const cdStart = offset;
  let cdSize = 0;
  central.forEach((c) => {
    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true);
    cd.setUint16(4, 20, true);
    cd.setUint16(6, 20, true);
    cd.setUint16(8, 0x0800, true);
    cd.setUint16(10, 0, true);
    cd.setUint16(12, 0, true);
    cd.setUint16(14, 0x21, true);
    cd.setUint32(16, c.crc, true);
    cd.setUint32(20, c.size, true);
    cd.setUint32(24, c.size, true);
    cd.setUint16(28, c.nameB.length, true);
    cd.setUint32(42, c.offset, true);
    chunks.push(new Uint8Array(cd.buffer), c.nameB);
    cdSize += 46 + c.nameB.length;
  });

  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true);
  eocd.setUint16(8, files.length, true);
  eocd.setUint16(10, files.length, true);
  eocd.setUint32(12, cdSize, true);
  eocd.setUint32(16, cdStart, true);
  chunks.push(new Uint8Array(eocd.buffer));

  return new Blob(chunks, { type: "application/zip" });
}

export const README_TEXT = `XBOX CONTROLLER DIAGRAM — EXPORT
Made with the free tool at https://dylandalal.com/xbox

WHAT'S IN THIS FOLDER
  diagram.svg  — vector version of your diagram. Scales to any size;
                 opens in browsers and design tools.
  diagram.png  — image version (2x resolution), ready to drop into
                 documents, wikis, or Discord.
  layout.json  — your saved layout: every button label, combo, label
                 position, and display setting.

KEEP layout.json!
The SVG and PNG are final images — they can't be loaded back into the
tool. If you ever want to change your diagram, return to
https://dylandalal.com/xbox, click "Upload JSON", choose layout.json,
make your edits, and export again.
`;
