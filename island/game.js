(function () {
  const VERSION = "1.0";
  const UPDATED = "2026年11月24日";
  const KEY = "hean-village-v1";
  const FONT = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "WenQuanYi Micro Hei", sans-serif';
  const WORLD = { w: 1720, h: 1500 };
  const CS = 20;
  const SPEED = 176;
  const REACH = 64;

  const ROLE_NAME = {
    consumer: "客戶（消費者）",
    agent: "業務員",
    broker: "經紀人"
  };
  const TIP_LABEL = {
    consumer: "給客戶的提醒",
    agent: "給業務員的提醒",
    broker: "給經紀人的提醒"
  };
  const ROLE_COAT = {
    consumer: "#c4a36a",
    agent: "#b98362",
    broker: "#7f8f78"
  };

  const SCENARIOS = window.HEAN_SCENARIOS || [];
  const byId = Object.fromEntries(SCENARIOS.map(function (s) { return [s.id, s]; }));

  const BUILDINGS = [
    { name: "衛生室", x: 70, y: 70, w: 210, h: 145, roof: "#c4896a" },
    { name: "村辦公室", x: 620, y: 60, w: 250, h: 155, roof: "#c4a36a" },
    { name: "茶館", x: 1160, y: 70, w: 220, h: 145, roof: "#b98362" },
    { name: "周家", x: 70, y: 390, w: 210, h: 145, roof: "#c4a36a" },
    { name: "書報攤", x: 420, y: 420, w: 160, h: 115, roof: "#d2b48a" },
    { name: "申訴亭", x: 1230, y: 400, w: 200, h: 135, roof: "#c4896a" },
    { name: "繳費亭", x: 70, y: 750, w: 190, h: 140, roof: "#c4a36a" },
    { name: "吳家", x: 470, y: 740, w: 220, h: 150, roof: "#b98362" },
    { name: "車行", x: 980, y: 730, w: 240, h: 160, roof: "#c4a36a" },
    { name: "河岸住家", x: 1360, y: 745, w: 210, h: 145, roof: "#c4896a" },
    { name: "郵務角", x: 230, y: 1088, w: 160, h: 112, roof: "#d2b48a" },
    { name: "招攬角", x: 500, y: 1076, w: 300, h: 118, roof: "#c4a36a" },
    { name: "事務所", x: 1180, y: 1070, w: 320, h: 120, roof: "#b98362" }
  ];

  const PATHS = [
    { x: 40, y: 228, w: 1560, h: 54 },
    { x: 40, y: 548, w: 1560, h: 54 },
    { x: 40, y: 900, w: 1560, h: 56 },
    { x: 200, y: 1204, w: 1360, h: 50 },
    { x: 200, y: 1364, w: 1360, h: 48 },
    { x: 888, y: 40, w: 58, h: 1420 },
    { x: 150, y: 40, w: 54, h: 1040 }
  ];

  const TREES = [
    { x: 48, y: 48 }, { x: 400, y: 96 }, { x: 1060, y: 86 }, { x: 1560, y: 70 },
    { x: 1688, y: 180 }, { x: 36, y: 320 }, { x: 1040, y: 340 }, { x: 1688, y: 420 },
    { x: 360, y: 690 }, { x: 1688, y: 690 }, { x: 36, y: 980 }, { x: 900, y: 1020 },
    { x: 1688, y: 1040 }, { x: 48, y: 1280 }, { x: 1680, y: 1320 }, { x: 700, y: 1472 },
    { x: 1500, y: 1460 }, { x: 1100, y: 500 }
  ];

  const FLOWERS = [];
  (function seedFlowers() {
    let a = 20261124;
    function rnd() {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    const colors = ["#e7b7ae", "#f0d7a2", "#d7c4e0", "#f3c9b0"];
    for (let i = 0; i < 70; i++) {
      const p = PATHS[i % PATHS.length];
      const side = rnd() > 0.5 ? -1 : 1;
      const along = rnd();
      const horizontal = p.w > p.h;
      const x = horizontal ? p.x + along * p.w : p.x + p.w / 2 + side * (p.w / 2 + 14);
      const y = horizontal ? p.y + p.h / 2 + side * (p.h / 2 + 14) : p.y + along * p.h;
      FLOWERS.push({ x: x, y: y, color: colors[i % colors.length] });
    }
  })();

  const SPOTS = [
    { id: "clinic-necessity", x: 175, y: 258, coat: "#c46b5a" },
    { id: "free-look", x: 745, y: 258, coat: "#d08a62" },
    { id: "waiting-period", x: 1270, y: 258, coat: "#c47a8a" },
    { id: "disclosure-form", x: 175, y: 578, coat: "#8d6b45" },
    { id: "exclusion-print", x: 500, y: 578, coat: "#6e7d64" },
    { id: "rider-ends", x: 1040, y: 560, coat: "#5f7f8a" },
    { id: "complaint-path", x: 1330, y: 578, coat: "#a36b4a" },
    { id: "lapse-reinstate", x: 165, y: 934, coat: "#9a7048" },
    { id: "beneficiary-update", x: 580, y: 934, coat: "#b56b78" },
    { id: "compulsory-auto", x: 1100, y: 934, coat: "#4f6d78" },
    { id: "storm-flood", x: 1465, y: 934, coat: "#7d8f72" },
    { id: "claim-docs", x: 310, y: 1244, coat: "#c48a6a" },
    { id: "face-sign", x: 560, y: 1244, coat: "#a67c52" },
    { id: "no-rebate", x: 760, y: 1244, coat: "#8a623e" },
    { id: "no-proxy-sign", x: 990, y: 1244, coat: "#6d5a48" },
    { id: "broker-fee", x: 1260, y: 1244, coat: "#6e8468" },
    { id: "broker-commission", x: 1460, y: 1244, coat: "#5f6e62" },
    { id: "health-blank", x: 560, y: 1404, coat: "#9c5c48" },
    { id: "no-misstate", x: 760, y: 1404, coat: "#7a5a68" },
    { id: "no-guarantee", x: 990, y: 1404, coat: "#86604a" },
    { id: "broker-conflict", x: 1260, y: 1404, coat: "#4f6a58" },
    { id: "broker-scope", x: 1460, y: 1404, coat: "#6a7050" }
  ];

  const titleScreen = document.getElementById("title-screen");
  const playScreen = document.getElementById("play-screen");
  const canvas = document.getElementById("view");
  const stage = document.getElementById("stage");
  const ctx = canvas.getContext("2d");
  const nearLabel = document.getElementById("near-label");
  const talkBtn = document.getElementById("talk-btn");
  const toastEl = document.getElementById("toast");
  const dialog = document.getElementById("dialog");
  const progress = document.getElementById("progress");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchQuery = window.matchMedia("(pointer: coarse), (max-width: 900px)");

  const state = load();
  let role = null;
  let viewW = 1;
  let viewH = 1;
  let zoom = 1;
  let dpr = 1;
  const cam = { x: 0, y: 0 };
  const player = { x: 860, y: 800, dir: 1, walk: 0 };
  let path = null;
  let time = 0;
  let currentId = null;
  let pendingBest = null;
  let loopStarted = false;
  let toastTimer = 0;

  const keys = new Set();
  const joy = { active: false, dx: 0, dy: 0, id: null };

  const audio = { ctx: null, timer: null, next: 0, step: 0, on: false };
  const NOTES = [196, 220, 246.94, 293.66, 329.63, 293.66, 246.94, 220];

  let cols = 0;
  let rows = 0;
  let blocked = null;

  function defaultState() {
    return { sound: false, music: false, lastRole: null, progress: { consumer: {}, agent: {}, broker: {} } };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const data = JSON.parse(raw);
      const base = defaultState();
      base.sound = !!data.sound;
      base.music = !!data.music;
      base.lastRole = data.lastRole || null;
      ["consumer", "agent", "broker"].forEach(function (r) {
        const src = data.progress && data.progress[r];
        if (src && typeof src === "object") base.progress[r] = src;
      });
      return base;
    } catch (err) {
      return defaultState();
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) { /* private mode */ }
  }

  function scenariosFor(r) {
    return SCENARIOS.filter(function (s) { return s.roles.indexOf(r) !== -1; });
  }

  function recordOf(id) {
    return (state.progress[role] || {})[id] || null;
  }

  function scoreOf(r) {
    const rec = state.progress[r] || {};
    return Object.keys(rec).reduce(function (sum, id) {
      return sum + (rec[id] === "best" ? 10 : 0);
    }, 0);
  }

  function solidAt(x, y, rad) {
    if (x < rad + 10 || y < rad + 10 || x > WORLD.w - rad - 10 || y > WORLD.h - rad - 10) return true;
    if (Math.hypot(x - 190, y - 1368) < 86 + rad) return true;
    if (x > 1636 - rad) return true;
    if (Math.hypot(x - 820, y - 640) < 22 + rad) return true;
    for (let i = 0; i < BUILDINGS.length; i++) {
      const b = BUILDINGS[i];
      if (x > b.x - rad && x < b.x + b.w + rad && y > b.y - rad && y < b.y + b.h + rad) return true;
    }
    for (let t = 0; t < TREES.length; t++) {
      if (Math.hypot(x - TREES[t].x, y - TREES[t].y) < 16 + rad) return true;
    }
    return false;
  }

  function buildNav() {
    cols = Math.ceil(WORLD.w / CS);
    rows = Math.ceil(WORLD.h / CS);
    blocked = new Uint8Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CS + CS / 2;
        const y = r * CS + CS / 2;
        if (solidAt(x, y, 11)) blocked[r * cols + c] = 1;
      }
    }
  }

  function cellKey(c, r) { return r * cols + c; }

  function nearestOpen(c, r) {
    for (let rad = 1; rad <= 8; rad++) {
      for (let dy = -rad; dy <= rad; dy++) {
        for (let dx = -rad; dx <= rad; dx++) {
          const nc = c + dx;
          const nr = r + dy;
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
          if (!blocked[cellKey(nc, nr)]) return { c: nc, r: nr };
        }
      }
    }
    return null;
  }

  function MinHeap() { this.a = []; }
  MinHeap.prototype.push = function (pri, c, r) {
    const a = this.a;
    a.push({ pri: pri, c: c, r: r });
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].pri <= a[i].pri) break;
      const tmp = a[p];
      a[p] = a[i];
      a[i] = tmp;
      i = p;
    }
  };
  MinHeap.prototype.pop = function () {
    const a = this.a;
    if (!a.length) return null;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && a[l].pri < a[m].pri) m = l;
        if (r < a.length && a[r].pri < a[m].pri) m = r;
        if (m === i) break;
        const tmp = a[m];
        a[m] = a[i];
        a[i] = tmp;
        i = m;
      }
    }
    return top;
  };

  function findPath(sx, sy, tx, ty) {
    let sc = clamp(Math.round(sx / CS), 0, cols - 1);
    let sr = clamp(Math.round(sy / CS), 0, rows - 1);
    let gc = clamp(Math.round(tx / CS), 0, cols - 1);
    let gr = clamp(Math.round(ty / CS), 0, rows - 1);
    if (blocked[cellKey(sc, sr)]) {
      const n = nearestOpen(sc, sr);
      if (!n) return null;
      sc = n.c;
      sr = n.r;
    }
    const goalBlocked = !!blocked[cellKey(gc, gr)];
    if (goalBlocked) {
      const n = nearestOpen(gc, gr);
      if (!n) return null;
      gc = n.c;
      gr = n.r;
    }
    const startK = cellKey(sc, sr);
    const goalK = cellKey(gc, gr);
    if (startK === goalK) return [{ x: tx, y: ty }];
    const open = new MinHeap();
    const gScore = new Map();
    const parent = new Map();
    const seen = new Uint8Array(cols * rows);
    gScore.set(startK, 0);
    open.push(0, sc, sr);
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    let guard = 0;
    while (open.a.length && guard++ < 9000) {
      const cur = open.pop();
      const ck = cellKey(cur.c, cur.r);
      if (seen[ck]) continue;
      seen[ck] = 1;
      if (ck === goalK) {
        const cells = [];
        let k = ck;
        const walked = new Set();
        while (k !== undefined && !walked.has(k)) {
          walked.add(k);
          const cc = k % cols;
          const rr = (k - cc) / cols;
          cells.push({ x: cc * CS + CS / 2, y: rr * CS + CS / 2 });
          if (k === startK) break;
          k = parent.get(k);
        }
        cells.reverse();
        if (cells.length) cells.shift();
        if (!goalBlocked && cells.length) cells[cells.length - 1] = { x: tx, y: ty };
        return cells;
      }
      for (let d = 0; d < dirs.length; d++) {
        const dc = dirs[d][0];
        const dr = dirs[d][1];
        const nc = cur.c + dc;
        const nr = cur.r + dr;
        if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
        const nk = cellKey(nc, nr);
        if (blocked[nk]) continue;
        if (dc && dr && (blocked[cellKey(cur.c + dc, cur.r)] || blocked[cellKey(cur.c, cur.r + dr)])) continue;
        const step = dc && dr ? 1.414 : 1;
        const ng = gScore.get(ck) + step;
        if (ng < (gScore.has(nk) ? gScore.get(nk) : Infinity)) {
          gScore.set(nk, ng);
          parent.set(nk, ck);
          open.push(ng + Math.hypot(nc - gc, nr - gr), nc, nr);
        }
      }
    }
    return null;
  }

  function activeSpots() {
    if (!role) return [];
    return SPOTS.filter(function (s) {
      const sc = byId[s.id];
      return sc && sc.roles.indexOf(role) !== -1;
    });
  }

  function nearestSpot() {
    const list = activeSpots();
    let best = null;
    let bestD = REACH;
    for (let i = 0; i < list.length; i++) {
      const d = Math.hypot(list[i].x - player.x, list[i].y - player.y);
      if (d < bestD) {
        bestD = d;
        best = list[i];
      }
    }
    return best;
  }

  function uiOpen() {
    return !dialog.hidden || !progress.hidden;
  }

  function resize() {
    if (playScreen.hidden) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    viewW = rect.width;
    viewH = rect.height;
    zoom = viewW < 760 ? 0.86 : 1;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(viewW * dpr);
    canvas.height = Math.round(viewH * dpr);
  }

  function tryMove(dx, dy) {
    if (!solidAt(player.x + dx, player.y, 12)) player.x += dx;
    if (!solidAt(player.x, player.y + dy, 12)) player.y += dy;
    player.x = clamp(player.x, 24, WORLD.w - 24);
    player.y = clamp(player.y, 24, WORLD.h - 24);
  }

  function update(dt) {
    time += dt;
    if (!uiOpen()) {
      let vx = 0;
      let vy = 0;
      let scale = 1;
      const usingJoy = joy.active && (joy.dx || joy.dy);
      if (usingJoy) {
        scale = Math.min(1, Math.hypot(joy.dx, joy.dy));
        vx = joy.dx / (scale || 1);
        vy = joy.dy / (scale || 1);
        path = null;
      } else if (keys.size) {
        if (keys.has("arrowleft") || keys.has("a")) vx -= 1;
        if (keys.has("arrowright") || keys.has("d")) vx += 1;
        if (keys.has("arrowup") || keys.has("w")) vy -= 1;
        if (keys.has("arrowdown") || keys.has("s")) vy += 1;
        path = null;
      } else if (path && path.length) {
        const p = path[0];
        const dx = p.x - player.x;
        const dy = p.y - player.y;
        const len = Math.hypot(dx, dy);
        if (len < 8) path.shift();
        else {
          vx = dx / len;
          vy = dy / len;
        }
      }
      const len = Math.hypot(vx, vy);
      if (len > 0) {
        vx /= len;
        vy /= len;
        tryMove(vx * SPEED * scale * dt, vy * SPEED * scale * dt);
        player.walk += dt;
        player.dir = vx < -0.05 ? -1 : vx > 0.05 ? 1 : player.dir;
        if (toastEl && !toastEl.hidden && player.walk > 0.4) hideToast();
      } else {
        player.walk = 0;
      }
    }
    const worldW = viewW / zoom;
    const worldH = viewH / zoom;
    cam.x = clamp(player.x - worldW / 2, 0, Math.max(0, WORLD.w - worldW));
    cam.y = clamp(player.y - worldH / 2, 0, Math.max(0, WORLD.h - worldH));
    const near = nearestSpot();
    if (!near) {
      nearLabel.hidden = true;
      talkBtn.disabled = true;
      talkBtn.classList.remove("ready");
    } else {
      const sc = byId[near.id];
      nearLabel.hidden = false;
      nearLabel.textContent = sc.speaker + " · 可以對話";
      talkBtn.disabled = false;
      talkBtn.classList.add("ready");
    }
  }

  function roundRect(x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, viewW, viewH);
    ctx.save();
    ctx.translate(-cam.x * zoom, -cam.y * zoom);
    ctx.scale(zoom, zoom);
    drawGround();
    drawPaths();
    drawPond();
    drawRiver();
    drawFlowers();
    const queue = [];
    BUILDINGS.forEach(function (b) {
      queue.push({ y: b.y + b.h, draw: function () { drawBuilding(b); } });
    });
    TREES.forEach(function (t) {
      queue.push({ y: t.y, draw: function () { drawTree(t); } });
    });
    queue.push({ y: 640, draw: drawWell });
    queue.push({ y: 520, draw: drawBench });
    activeSpots().forEach(function (s, i) {
      queue.push({
        y: s.y,
        draw: function () { drawPerson(s.x, s.y, s.coat, "#3e342c", i, false, s.id); }
      });
    });
    queue.push({
      y: player.y,
      draw: function () { drawPerson(player.x, player.y, ROLE_COAT[role] || "#c4a36a", "#3e342c", 0, true); }
    });
    queue.sort(function (a, b) { return a.y - b.y; });
    queue.forEach(function (item) { item.draw(); });
    drawLabels();
    if (path && path.length && !reduceMotion) {
      const g = path[path.length - 1];
      ctx.strokeStyle = "rgba(165, 134, 90, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(g.x, g.y, 8 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGround() {
    const size = 48;
    const x0 = Math.floor(cam.x / size) * size - size;
    const y0 = Math.floor(cam.y / size) * size - size;
    const x1 = cam.x + viewW / zoom + size;
    const y1 = cam.y + viewH / zoom + size;
    for (let y = y0; y < y1; y += size) {
      for (let x = x0; x < x1; x += size) {
        const n = hash(x, y);
        ctx.fillStyle = n > 0.55 ? "#efe6d6" : "#e7decc";
        ctx.fillRect(x, y, size + 1, size + 1);
        if (n > 0.86) {
          ctx.fillStyle = "rgba(168, 140, 90, 0.16)";
          ctx.beginPath();
          ctx.ellipse(x + 18, y + 26, 7, 3, 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function drawPaths() {
    ctx.fillStyle = "#e7d3b0";
    PATHS.forEach(function (p) {
      roundRect(p.x, p.y, p.w, p.h, 18);
      ctx.fill();
    });
    ctx.fillStyle = "rgba(255, 250, 242, 0.45)";
    PATHS.forEach(function (p) {
      if (p.w > p.h) {
        roundRect(p.x + 10, p.y + p.h / 2 - 3, p.w - 20, 6, 3);
      } else {
        roundRect(p.x + p.w / 2 - 3, p.y + 10, 6, p.h - 20, 3);
      }
      ctx.fill();
    });
  }

  function drawPond() {
    ctx.fillStyle = "#d5ddd8";
    ctx.beginPath();
    ctx.ellipse(190, 1368, 108, 72, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(176, 1356, 46, 16, -0.4, 0.2, 2.2);
    ctx.stroke();
  }

  function drawRiver() {
    const shift = reduceMotion ? 0 : Math.sin(time * 0.8) * 4;
    ctx.fillStyle = "#d3ddd8";
    ctx.fillRect(1636, 0, WORLD.w - 1636, WORLD.h);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(1668, 0);
    ctx.bezierCurveTo(1652 + shift, 360, 1690 - shift, 780, 1664, WORLD.h);
    ctx.stroke();
  }

  function drawFlowers() {
    FLOWERS.forEach(function (f) {
      if (f.x < cam.x - 20 || f.y < cam.y - 20 || f.x > cam.x + viewW / zoom + 20 || f.y > cam.y + viewH / zoom + 20) return;
      ctx.fillStyle = f.color;
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.arc(f.x + Math.cos(a) * 3, f.y + Math.sin(a) * 3, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#f6e7b2";
      ctx.beginPath();
      ctx.arc(f.x, f.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawBuilding(b) {
    ctx.fillStyle = "rgba(120, 90, 50, 0.12)";
    ctx.beginPath();
    ctx.ellipse(b.x + b.w / 2, b.y + b.h - 2, b.w * 0.4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    roundRect(b.x, b.y + 26, b.w, b.h - 26, 16);
    ctx.fillStyle = "#fffdf8";
    ctx.fill();
    ctx.strokeStyle = "rgba(90, 70, 40, 0.18)";
    ctx.lineWidth = 2;
    ctx.stroke();
    roundRect(b.x - 8, b.y, b.w + 16, 42, 14);
    ctx.fillStyle = b.roof;
    ctx.fill();
    const doorW = 26;
    const doorH = Math.min(40, b.h * 0.28);
    roundRect(b.x + b.w / 2 - doorW / 2, b.y + b.h - doorH - 8, doorW, doorH, 8);
    ctx.fillStyle = "#8d6b45";
    ctx.fill();
    ctx.fillStyle = "rgba(255, 236, 210, 0.9)";
    [-1, 1].forEach(function (side) {
      const wx = b.x + b.w / 2 + side * Math.min(48, b.w * 0.28) - 13;
      if (wx > b.x + 8 && wx + 26 < b.x + b.w - 8) {
        roundRect(wx, b.y + 52, 26, 20, 6);
        ctx.fill();
      }
    });
    ctx.font = "600 13px " + FONT;
    const tw = ctx.measureText(b.name).width;
    const sw = tw + 18;
    const sx = b.x + b.w / 2 - sw / 2;
    const sy = b.y + 30;
    roundRect(sx, sy, sw, 22, 11);
    ctx.fillStyle = "rgba(255, 253, 249, 0.95)";
    ctx.fill();
    ctx.fillStyle = "#5c4a38";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(b.name, b.x + b.w / 2, sy + 11);
    if (b.name === "茶館") drawCat(b.x + b.w - 36, b.y + 18);
  }

  function drawCat(x, y) {
    ctx.fillStyle = "#d9c2a6";
    ctx.beginPath();
    ctx.ellipse(x, y + 8, 14, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 10, y + 2, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f7e7c8";
    ctx.beginPath();
    ctx.moveTo(x + 6, y - 2);
    ctx.lineTo(x + 8, y + 3);
    ctx.lineTo(x + 12, y - 1);
    ctx.fill();
  }

  function drawTree(t) {
    ctx.fillStyle = "#b08968";
    roundRect(t.x - 4, t.y - 8, 8, 16, 3);
    ctx.fill();
    ctx.fillStyle = "#c5cbb6";
    ctx.beginPath();
    ctx.arc(t.x, t.y - 20, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#b7c0a8";
    ctx.beginPath();
    ctx.arc(t.x - 10, t.y - 14, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(t.x + 9, t.y - 12, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawWell() {
    ctx.fillStyle = "#d7c4a4";
    ctx.beginPath();
    ctx.ellipse(820, 640, 22, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#b08968";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = "#8d6b45";
    ctx.beginPath();
    ctx.moveTo(804, 632);
    ctx.lineTo(804, 612);
    ctx.lineTo(836, 612);
    ctx.lineTo(836, 632);
    ctx.stroke();
  }

  function drawBench() {
    ctx.fillStyle = "#c4a36a";
    roundRect(980, 548, 46, 10, 4);
    ctx.fill();
    ctx.fillRect(986, 556, 4, 10);
    ctx.fillRect(1016, 556, 4, 10);
  }

  function drawPerson(x, y, coat, hair, index, isPlayer, scenarioId) {
    const bob = reduceMotion ? 0 : Math.sin(time * 2 + index) * 1.1;
    const sway = isPlayer ? Math.sin(player.walk * 10) * 3.2 : Math.sin(time * 2 + index) * 0.6;
    ctx.save();
    ctx.translate(x, y + bob);
    if (isPlayer && player.dir < 0) ctx.scale(-1, 1);
    ctx.fillStyle = "rgba(80, 60, 40, 0.16)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 13, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();
    if (isPlayer) {
      ctx.strokeStyle = "rgba(165, 134, 90, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 7, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = "#5c4a3a";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-4, -8);
    ctx.lineTo(-4 - sway, 2);
    ctx.moveTo(4, -8);
    ctx.lineTo(4 + sway, 2);
    ctx.stroke();
    roundRect(-11, -28, 22, 20, 8);
    ctx.fillStyle = coat;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -34, 9, 0, Math.PI * 2);
    ctx.fillStyle = "#f2d0b4";
    ctx.fill();
    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.arc(0, -37, 9, Math.PI * 1.05, Math.PI * 1.95);
    ctx.fill();
    if (!isPlayer && nearestSpot() && nearestSpot().id === scenarioId) {
      ctx.strokeStyle = "#a5865a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -18, 26, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    if (!isPlayer) drawMark(x, y - 52, recordOf(scenarioId));
  }

  function drawMark(x, y, rec) {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = rec === "best" ? "#a5865a" : rec === "seen" ? "#e4d3b4" : "#fffdf9";
    ctx.fill();
    ctx.strokeStyle = "#a5865a";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    if (rec === "best") {
      ctx.strokeStyle = "#fffdf9";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x - 3, y);
      ctx.lineTo(x - 1, y + 2.4);
      ctx.lineTo(x + 3.4, y - 2.4);
      ctx.stroke();
    }
  }

  function drawLabels() {
    const near = nearestSpot();
    ctx.font = "600 13px " + FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    activeSpots().forEach(function (s) {
      const dist = Math.hypot(s.x - player.x, s.y - player.y);
      if (dist > 150 && !(near && near.id === s.id)) return;
      const sc = byId[s.id];
      const text = sc.speaker;
      const w = ctx.measureText(text).width + 16;
      const x = s.x - w / 2;
      const y = s.y - 70;
      roundRect(x, y, w, 20, 10);
      ctx.fillStyle = "rgba(255, 253, 249, 0.94)";
      ctx.fill();
      ctx.fillStyle = "#3f362e";
      ctx.fillText(text, s.x, y + 10);
    });
  }

  function hash(x, y) {
    let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function renderTitle() {
    document.getElementById("version-line").textContent = "版本 " + VERSION + " · " + UPDATED + "更新";
    ["consumer", "agent", "broker"].forEach(function (r) {
      const total = scenariosFor(r).length;
      const rec = state.progress[r] || {};
      const done = Object.keys(rec).length;
      const best = Object.keys(rec).filter(function (id) { return rec[id] === "best"; }).length;
      document.getElementById("count-" + r).textContent = total + " 則情境";
      const prog = document.getElementById("prog-" + r);
      prog.textContent = done ? "已完成 " + done + "／" + total + " · 答對 " + best : "還沒開始";
      if (state.lastRole === r) prog.textContent += " · 上次";
    });
  }

  function renderHud() {
    const total = scenariosFor(role).length;
    const rec = state.progress[role] || {};
    const done = Object.keys(rec).length;
    document.getElementById("hud-role").textContent = ROLE_NAME[role];
    document.getElementById("hud-stat").textContent = "完成 " + done + "／" + total + " · 分數 " + scoreOf(role);
    const soundBtn = document.getElementById("btn-sound");
    const musicBtn = document.getElementById("btn-music");
    soundBtn.textContent = state.sound ? "音效開" : "音效關";
    soundBtn.setAttribute("aria-pressed", state.sound ? "true" : "false");
    musicBtn.textContent = state.music ? "音樂開" : "音樂關";
    musicBtn.setAttribute("aria-pressed", state.music ? "true" : "false");
  }

  function showToast(text) {
    toastEl.hidden = false;
    toastEl.textContent = text;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6800);
  }

  function hideToast() {
    toastEl.hidden = true;
    clearTimeout(toastTimer);
  }

  function startRole(next) {
    role = next;
    state.lastRole = next;
    save();
    player.x = 860;
    player.y = 800;
    player.walk = 0;
    path = null;
    titleScreen.hidden = true;
    playScreen.hidden = false;
    document.body.classList.remove("ui-busy");
    resize();
    renderHud();
    showToast(touchQuery.matches ? "用左下角搖桿移動，靠近村民後按對話。" : "點地面走到村民身邊，按 E 或空白鍵對話。");
    if (state.music) startMusic();
    if (!loopStarted) {
      loopStarted = true;
      let last = performance.now();
      const frame = function (now) {
        const dt = Math.min(0.034, (now - last) / 1000);
        last = now;
        update(dt);
        draw();
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
  }

  function backToTitle() {
    closeDialog(false);
    closeProgress();
    playScreen.hidden = true;
    titleScreen.hidden = false;
    document.body.classList.remove("ui-busy");
    renderTitle();
  }

  function openDialog(id) {
    const sc = byId[id];
    if (!sc || sc.roles.indexOf(role) === -1) return;
    currentId = id;
    pendingBest = null;
    path = null;
    document.getElementById("dlg-place").textContent = sc.place;
    document.getElementById("dlg-title").textContent = sc.title;
    document.getElementById("dlg-speaker").textContent = sc.speaker;
    document.getElementById("dlg-body").textContent = sc.body;
    const options = document.getElementById("dlg-options");
    options.replaceChildren();
    sc.options.forEach(function (opt, index) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.textContent = opt.text;
      btn.addEventListener("click", function () { choose(index); });
      options.appendChild(btn);
    });
    options.hidden = false;
    document.getElementById("dlg-feedback").hidden = true;
    dialog.hidden = false;
    document.body.classList.add("ui-busy");
    playSfx("talk");
    dialog.querySelector(".sheet").focus();
  }

  function choose(index) {
    const sc = byId[currentId];
    if (!sc || !dialog.hidden && document.getElementById("dlg-feedback").hidden === false) return;
    const opt = sc.options[index];
    if (!opt) return;
    pendingBest = !!opt.best;
    const rec = state.progress[role];
    if (pendingBest) rec[currentId] = "best";
    else if (rec[currentId] !== "best") rec[currentId] = "seen";
    save();
    renderHud();
    document.getElementById("dlg-options").hidden = true;
    document.getElementById("dlg-feedback").hidden = false;
    const verdict = document.getElementById("dlg-verdict");
    verdict.textContent = pendingBest ? "這個看法比較完整" : "先把條款和事實對上";
    verdict.className = "verdict " + (pendingBest ? "best" : "miss");
    const best = sc.options.find(function (item) { return item.best; });
    document.getElementById("dlg-best").textContent = "比較站得住的方向：" + best.text;
    document.getElementById("dlg-explain").textContent = sc.explain;
    document.getElementById("dlg-tip-label").textContent = TIP_LABEL[role];
    document.getElementById("dlg-tip-body").textContent = sc.tips[role] || "";
    document.getElementById("dlg-retry").hidden = !!pendingBest;
    playSfx(pendingBest ? "ok" : "no");
    document.getElementById("dlg-save").focus();
  }

  function closeDialog(saved) {
    if (dialog.hidden) return;
    if (saved === false && pendingBest !== null) {
      /* closing after feedback still keeps the saved record */
    }
    dialog.hidden = true;
    currentId = null;
    pendingBest = null;
    if (progress.hidden) document.body.classList.remove("ui-busy");
  }

  function retryChoice() {
    pendingBest = null;
    document.getElementById("dlg-feedback").hidden = true;
    document.getElementById("dlg-options").hidden = false;
    const first = document.querySelector("#dlg-options .option");
    if (first) first.focus();
  }

  function renderProgress() {
    const list = scenariosFor(role);
    const done = Object.keys(state.progress[role] || {}).length;
    document.getElementById("progress-summary").textContent =
      ROLE_NAME[role] + " · 完成 " + done + "／" + list.length + " · 分數 " + scoreOf(role) + "（答對一則 10 分）";
    document.getElementById("progress-version").textContent = "版本 " + VERSION + " · " + UPDATED + "更新";
    const ul = document.getElementById("progress-list");
    ul.replaceChildren();
    list.forEach(function (sc) {
      const li = document.createElement("li");
      li.className = "progress-item";
      const div = document.createElement("div");
      const title = document.createElement("strong");
      const rec = recordOf(sc.id);
      const badge = document.createElement("span");
      badge.className = "badge" + (rec ? " " + rec : "");
      badge.textContent = rec === "best" ? "答對" : rec === "seen" ? "已看過" : "未完成";
      title.appendChild(badge);
      title.appendChild(document.createTextNode(sc.title));
      const meta = document.createElement("p");
      meta.textContent = sc.place + " · " + sc.speaker;
      div.appendChild(title);
      div.appendChild(meta);
      const go = document.createElement("button");
      go.type = "button";
      go.className = "tiny";
      go.textContent = "前往";
      go.addEventListener("click", function () { goTo(sc.id); });
      li.appendChild(div);
      li.appendChild(go);
      ul.appendChild(li);
    });
  }

  function openProgress() {
    renderProgress();
    progress.hidden = false;
    document.body.classList.add("ui-busy");
    progress.querySelector(".sheet").focus();
  }

  function closeProgress() {
    progress.hidden = true;
    if (dialog.hidden) document.body.classList.remove("ui-busy");
  }

  function goTo(id) {
    const spot = SPOTS.find(function (s) { return s.id === id; });
    closeProgress();
    if (!spot) return;
    const candidates = [
      { x: spot.x, y: spot.y + 46 },
      { x: spot.x, y: spot.y - 46 },
      { x: spot.x + 46, y: spot.y },
      { x: spot.x - 46, y: spot.y },
      { x: spot.x, y: spot.y }
    ];
    const spotFree = candidates.find(function (p) { return !solidAt(p.x, p.y, 12); }) || candidates[4];
    player.x = spotFree.x;
    player.y = spotFree.y;
    path = null;
    openDialog(id);
  }

  function talk() {
    if (uiOpen()) return;
    const near = nearestSpot();
    if (!near) {
      showToast("再靠近門口或村民一點。");
      return;
    }
    openDialog(near.id);
  }

  function screenToWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / zoom + cam.x,
      y: (clientY - rect.top) / zoom + cam.y
    };
  }

  function ensureAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audio.ctx) audio.ctx = new AC();
    if (audio.ctx.state === "suspended") audio.ctx.resume();
    return audio.ctx;
  }

  function tone(freq, when, dur, type, gainValue) {
    const ac = audio.ctx;
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type || "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(gainValue, when + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  }

  function startMusic() {
    const ac = ensureAudio();
    if (!ac) return;
    audio.on = true;
    if (audio.timer) return;
    audio.next = ac.currentTime + 0.08;
    audio.timer = setInterval(scheduleMusic, 240);
    scheduleMusic();
  }

  function stopMusic() {
    audio.on = false;
    if (audio.timer) clearInterval(audio.timer);
    audio.timer = null;
  }

  function scheduleMusic() {
    if (!audio.on || !audio.ctx) return;
    const ac = audio.ctx;
    while (audio.next < ac.currentTime + 0.7) {
      tone(NOTES[audio.step % NOTES.length], audio.next, 0.5, "triangle", 0.02);
      if (audio.step % 8 === 0) tone(98, audio.next, 1.4, "sine", 0.012);
      audio.next += 0.62;
      audio.step++;
    }
  }

  function playSfx(kind) {
    if (!state.sound) return;
    const ac = ensureAudio();
    if (!ac) return;
    const t = ac.currentTime;
    if (kind === "ok") {
      tone(659.25, t, 0.12, "triangle", 0.04);
      tone(987.77, t + 0.1, 0.16, "triangle", 0.04);
    } else if (kind === "no") {
      tone(311.13, t, 0.16, "sine", 0.035);
    } else {
      tone(523.25, t, 0.07, "sine", 0.03);
    }
  }

  function bind() {
    document.querySelectorAll(".role-card").forEach(function (btn) {
      btn.addEventListener("click", function () { startRole(btn.getAttribute("data-role")); });
    });
    document.getElementById("btn-role").addEventListener("click", backToTitle);
    document.getElementById("btn-progress").addEventListener("click", openProgress);
    document.getElementById("progress-close").addEventListener("click", closeProgress);
    document.getElementById("progress-clear").addEventListener("click", function () {
      if (!window.confirm("要清除這個身分的完成紀錄與分數嗎？")) return;
      state.progress[role] = {};
      save();
      renderHud();
      renderProgress();
    });
    document.getElementById("btn-sound").addEventListener("click", function () {
      state.sound = !state.sound;
      save();
      renderHud();
      if (state.sound) {
        ensureAudio();
        playSfx("talk");
      }
    });
    document.getElementById("btn-music").addEventListener("click", function () {
      state.music = !state.music;
      save();
      renderHud();
      if (state.music) startMusic();
      else stopMusic();
    });
    talkBtn.addEventListener("click", talk);
    document.getElementById("dlg-close").addEventListener("click", function () { closeDialog(true); });
    document.getElementById("dlg-save").addEventListener("click", function () { closeDialog(true); });
    document.getElementById("dlg-retry").addEventListener("click", retryChoice);
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog(true);
    });
    progress.addEventListener("click", function (e) {
      if (e.target === progress) closeProgress();
    });

    window.addEventListener("keydown", function (e) {
      const k = e.key.toLowerCase();
      const move = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].indexOf(k) !== -1;
      if (move) {
        if (!playScreen.hidden && dialog.hidden && progress.hidden) {
          e.preventDefault();
          keys.add(k);
        }
        return;
      }
      if (e.key === "Escape") {
        if (!dialog.hidden) closeDialog(true);
        else if (!progress.hidden) closeProgress();
        return;
      }
      if (playScreen.hidden) return;
      if (!dialog.hidden) {
        if (document.getElementById("dlg-feedback").hidden && ["1", "2", "3"].indexOf(e.key) !== -1) {
          choose(Number(e.key) - 1);
        }
        if (e.key === " " || e.code === "Space") e.preventDefault();
        return;
      }
      if (!progress.hidden) return;
      if (e.key === "e" || e.key === "E" || e.key === " " || e.code === "Space") {
        e.preventDefault();
        talk();
      }
    });
    window.addEventListener("keyup", function (e) { keys.delete(e.key.toLowerCase()); });
    window.addEventListener("blur", function () { keys.clear(); });

    canvas.addEventListener("pointerdown", function (e) {
      if (uiOpen() || playScreen.hidden) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const world = screenToWorld(e.clientX, e.clientY);
      path = findPath(player.x, player.y, world.x, world.y);
    });
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    const base = document.getElementById("joystick");
    const knob = base.querySelector(".knob");
    const radius = 36;
    function setJoy(clientX, clientY) {
      const rect = base.getBoundingClientRect();
      let dx = clientX - (rect.left + rect.width / 2);
      let dy = clientY - (rect.top + rect.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      const scale = Math.min(radius, len) / len;
      knob.style.transform = "translate(" + (dx * scale) + "px," + (dy * scale) + "px)";
      joy.dx = (dx * scale) / radius;
      joy.dy = (dy * scale) / radius;
      if (Math.hypot(joy.dx, joy.dy) < 0.18) {
        joy.dx = 0;
        joy.dy = 0;
      }
    }
    base.addEventListener("pointerdown", function (e) {
      joy.active = true;
      joy.id = e.pointerId;
      base.setPointerCapture(e.pointerId);
      path = null;
      setJoy(e.clientX, e.clientY);
      e.preventDefault();
    });
    base.addEventListener("pointermove", function (e) {
      if (!joy.active || e.pointerId !== joy.id) return;
      setJoy(e.clientX, e.clientY);
    });
    function endJoy(e) {
      if (e.pointerId !== joy.id) return;
      joy.active = false;
      joy.dx = 0;
      joy.dy = 0;
      joy.id = null;
      knob.style.transform = "translate(0px,0px)";
    }
    base.addEventListener("pointerup", endJoy);
    base.addEventListener("pointercancel", endJoy);

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(function () { resize(); });
      observer.observe(stage);
    } else {
      window.addEventListener("resize", resize);
    }
  }

  function validate() {
    const seen = {};
    SCENARIOS.forEach(function (s) {
      if (seen[s.id]) console.error("duplicate", s.id);
      seen[s.id] = true;
      const best = s.options.filter(function (o) { return o.best; }).length;
      if (best !== 1) console.error("best", s.id, best);
      s.roles.forEach(function (r) {
        if (!s.tips[r]) console.error("tip", s.id, r);
      });
      if (!SPOTS.some(function (spot) { return spot.id === s.id; })) console.error("spot", s.id);
    });
  }

  validate();
  buildNav();
  SPOTS.forEach(function (s) {
    if (solidAt(s.x, s.y, 6)) console.warn("blocked spot", s.id, s.x, s.y);
  });
  bind();
  renderTitle();
  renderHudSafe();

  function renderHudSafe() {
    const soundBtn = document.getElementById("btn-sound");
    const musicBtn = document.getElementById("btn-music");
    soundBtn.textContent = state.sound ? "音效開" : "音效關";
    soundBtn.setAttribute("aria-pressed", state.sound ? "true" : "false");
    musicBtn.textContent = state.music ? "音樂開" : "音樂關";
    musicBtn.setAttribute("aria-pressed", state.music ? "true" : "false");
  }

  window.__hean = {
    player: player,
    state: state,
    startRole: startRole,
    openDialog: openDialog,
    spot: function (id) { return SPOTS.find(function (s) { return s.id === id; }); },
    solidAt: solidAt,
    scenariosFor: scenariosFor,
    VERSION: VERSION
  };
})();
