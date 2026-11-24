(function () {
  const VERSION = "1.8";
  const UPDATED = "2026年11月24日";
  const KEY = "hean-village-v1";
  const FONT = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "WenQuanYi Micro Hei", sans-serif';
  const WORLD = { w: 2300, h: 1960 };
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
  const SCENARIOS = window.HEAN_SCENARIOS || [];
  const byId = Object.fromEntries(SCENARIOS.map(function (s) { return [s.id, s]; }));

  const BUILDINGS = [
    { name: "我家", zone: "住宅區", x: 160, y: 40, w: 270, h: 280, roof: "#c4a36a", wall: "#fff8ef", kind: "home", art: true, scenarios: [] },
    { name: "鎮民中心", zone: "住宅區", x: 380, y: 1320, w: 250, h: 170, roof: "#c4a36a", wall: "#fffaf3", kind: "office", scenarios: [] },
    { name: "周家", zone: "住宅區", x: 1860, y: 1160, w: 220, h: 160, roof: "#b98362", wall: "#fff8ef", kind: "house", scenarios: [] },
    { name: "吳家", zone: "住宅區", x: 2100, y: 1180, w: 140, h: 130, roof: "#c4896a", wall: "#fff6f0", kind: "house", scenarios: [] },
    { name: "銀行", zone: "商店街", x: 980, y: 90, w: 210, h: 200, roof: "#8d6b45", wall: "#f7f3ea", kind: "bank", scenarios: [] },
    { name: "超商", zone: "商店街", x: 1230, y: 100, w: 200, h: 210, roof: "#d2b48a", wall: "#fffaf3", kind: "stall", scenarios: [] },
    { name: "車行", zone: "商店街", x: 1500, y: 80, w: 230, h: 250, roof: "#c4a36a", wall: "#f3eee6", kind: "garage", scenarios: [] },
    { name: "寵物店", zone: "商店街", x: 970, y: 590, w: 190, h: 210, roof: "#c48a6a", wall: "#fff6ea", kind: "stall", scenarios: ["pet-visit"] },
    { name: "事務所", zone: "商店街", x: 1860, y: 490, w: 250, h: 290, roof: "#b98362", wall: "#f6f1e6", kind: "office", scenarios: ["broker-fee", "broker-commission", "broker-conflict", "broker-scope"] },
    { name: "小鎮公所", zone: "公家機關區", x: 1180, y: 500, w: 380, h: 330, roof: "#c4a36a", wall: "#f7f1e8", kind: "office", scenarios: [] },
    { name: "勞工服務站", zone: "公家機關區", x: 1860, y: 860, w: 240, h: 200, roof: "#c4a36a", wall: "#fffaf3", kind: "office", scenarios: [] },
    { name: "暖禾人壽", zone: "壽險街", x: 975, y: 900, w: 175, h: 165, roof: "#c4896a", wall: "#fff4ea", sign: "#c4896a", theme: "醫療條款", motto: "這裡常把醫療條款和收據對在一起。", kind: "office", scenarios: ["clinic-necessity", "hospital-reimburse", "claim-docs", "face-sign", "no-rebate", "health-blank"] },
    { name: "青畦人壽", zone: "壽險街", x: 1175, y: 900, w: 175, h: 165, roof: "#6e8a58", wall: "#f3f6ee", sign: "#6e8a58", theme: "重疾定義", motto: "這裡常把重疾定義和等待期攤開。", kind: "office", scenarios: ["waiting-period", "critical-name", "disclosure-form"] },
    { name: "拾穗人壽", zone: "壽險街", x: 1380, y: 900, w: 170, h: 165, roof: "#c4a36a", wall: "#fff8ee", sign: "#c4a36a", theme: "契約步驟", motto: "這裡常把契撤、受益人、停效的步驟說完。", kind: "office", scenarios: ["free-look", "beneficiary-update", "lapse-reinstate", "rider-ends"] },
    { name: "暮嵐人壽", zone: "壽險街", x: 1575, y: 900, w: 165, h: 165, roof: "#7f97a4", wall: "#f3f6f8", sign: "#7f97a4", theme: "失能定義", motto: "這裡常把失能和長期照顧的定義讀完。", kind: "office", scenarios: ["disability-define", "care-wait"] },
    { name: "石橋產物", zone: "產險街", x: 975, y: 1165, w: 175, h: 155, roof: "#8d6b45", wall: "#f6f1e6", sign: "#8d6b45", theme: "住宅範圍", motto: "這裡常把住宅火險、地震和水災分開看。", kind: "office", scenarios: ["storm-flood", "home-contents", "no-misstate", "no-guarantee", "no-proxy-sign"] },
    { name: "岸蒲產物", zone: "產險街", x: 1175, y: 1165, w: 175, h: 155, roof: "#5f7d62", wall: "#f2f6f1", sign: "#5f7d62", theme: "車險分項", motto: "這裡常把強制險、任意責任和車體分開。", kind: "office", scenarios: ["compulsory-auto", "garage-voluntary"] },
    { name: "原麓產物", zone: "產險街", x: 1380, y: 1165, w: 170, h: 155, roof: "#a67c52", wall: "#f8f3ea", sign: "#a67c52", theme: "責任範圍", motto: "這裡常先問責任險保的是誰的責任。", kind: "office", scenarios: ["liability-who", "liability-cap"] },
    { name: "澄川產物", zone: "產險街", x: 1575, y: 1165, w: 165, h: 155, roof: "#6d90a0", wall: "#f2f7f8", sign: "#6d90a0", theme: "意外定義", motto: "這裡常把意外和疾病的定義分開。", kind: "office", scenarios: ["exclusion-print", "complaint-path"] },
    { name: "醫院", zone: "醫院", x: 50, y: 1280, w: 290, h: 180, roof: "#d7e4ea", wall: "#f7fbff", kind: "clinic", scenarios: [] },
    { name: "公園亭", zone: "公園", x: 1900, y: 40, w: 200, h: 240, roof: "#7f8f78", wall: "#f7f3ea", kind: "stall", level: 3, scenarios: ["park-walk"] },
    { name: "湖畔亭", zone: "湖畔", x: 150, y: 1630, w: 210, h: 160, roof: "#7aa0b0", wall: "#f7f4ee", kind: "house", level: 5, scenarios: ["lake-rest"] },
    { name: "步道牌", zone: "山上步道", x: 1980, y: 1560, w: 120, h: 200, roof: "#8d6a45", wall: "#f6efe4", kind: "stall", level: 8, scenarios: ["trail-sign"] }
  ];

  const PATHS = [
    { x: 40, y: 360, w: 2100, h: 70 },
    { x: 40, y: 860, w: 2100, h: 70 },
    { x: 40, y: 1088, w: 2100, h: 62 },
    { x: 400, y: 1338, w: 1760, h: 58 },
    { x: 40, y: 1500, w: 2100, h: 64 },
    { x: 240, y: 40, w: 70, h: 1760 },
    { x: 900, y: 40, w: 70, h: 1760 },
    { x: 1760, y: 40, w: 70, h: 1760 }
  ];

  const TREES = [
    { x: 40, y: 80 }, { x: 860, y: 120 }, { x: 1700, y: 80 }, { x: 40, y: 700 },
    { x: 860, y: 760 }, { x: 2100, y: 80 }, { x: 40, y: 1480 }, { x: 900, y: 1480 },
    { x: 2100, y: 1480 }, { x: 2200, y: 400 }, { x: 600, y: 1500 }, { x: 1500, y: 700 }
  ];
  const LAMPS = [
    { x: 280, y: 390 }, { x: 940, y: 390 }, { x: 1500, y: 390 },
    { x: 280, y: 900 }, { x: 1100, y: 900 }, { x: 1460, y: 1118 },
    { x: 1100, y: 1368 }, { x: 1500, y: 1368 }, { x: 300, y: 1540 }
  ];
  const ZONES = [
    { name: "公園", level: 3, x: 1840, y: 40, w: 440, h: 500, back: { x: 1700, y: 390 } },
    { name: "湖畔", level: 5, x: 40, y: 1572, w: 780, h: 360, back: { x: 240, y: 1460 } },
    { name: "山上步道", level: 8, x: 1840, y: 1572, w: 440, h: 360, back: { x: 1600, y: 1460 } }
  ];
  const LEVEL_XP = [0, 20, 40, 80, 120, 160, 200, 260];
  const DAY_MS = 30000;

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

  const SPOTS = [];
  BUILDINGS.forEach(function (b) {
    if (b.motto) return;
    (b.scenarios || []).forEach(function (id, index) {
      const n = b.scenarios.length;
      SPOTS.push({
        id: id,
        x: b.x + b.w / 2 + (index - (n - 1) / 2) * 44,
        y: b.y + b.h + 42
      });
    });
  });
  SPOTS.push({ id: "bank-counter", name: "櫃台", x: 1080, y: 332, facility: "bank" });
  SPOTS.push({ id: "chest-park", name: "寶箱", x: 2060, y: 360, facility: "chest", zone: "公園" });

  const titleScreen = document.getElementById("title-screen");
  const playScreen = document.getElementById("play-screen");
  const canvas = document.getElementById("view");
  const stage = document.getElementById("stage");
  let pen = canvas.getContext("2d");
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
  const player = { x: 400, y: 320, dir: 1, walk: 0, facing: "down" };
  const ROOM = window.HEAN_ROOMS.ROOM;
  const HOME = { w: 720, h: 1280 };
  const PLAZA = { x: 0, y: 0, w: 720, h: 1280 };
  let plazaBits = null;
  let plazaCW = 45;
  let plazaCH = 80;
  let plazaCell = 16;
  fetch("assets/scenes/town-walk.txt").then(function (res) { return res.text(); }).then(function (text) {
    const lines = text.trim().split("\n");
    const head = lines[0].split(" ");
    plazaCW = Number(head[0]);
    plazaCH = Number(head[1]);
    plazaCell = Number(head[2]);
    plazaBits = lines[1];
  }).catch(function () { plazaBits = null; });
  let area = "home";
  let roomKind = "home";
  let roomExit = { x: 1485, y: 450 };
  let roomName = "家";
  let doorLock = 0;
  let townLayer = null;
  let townBakedMode = "";
  let hourOverride = null;
  window.HEAN_ASSETS = window.HEAN_ASSETS || { scenes: { town: null, home: null, map: null }, characters: {} };
  if (!window.HEAN_ASSETS.scenes) window.HEAN_ASSETS.scenes = {};
  if (!("map" in window.HEAN_ASSETS.scenes)) window.HEAN_ASSETS.scenes.map = null;
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
    return {
      sound: false,
      music: false,
      lastRole: null,
      progress: { consumer: {}, agent: {}, broker: {} },
      xp: { consumer: 0, agent: 0, broker: 0 },
      bonus: 0,
      deposits: [],
      opened: {},
      seenBank: false
    };
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
        const fromDone = Object.keys(base.progress[r]).length * 20;
        base.xp[r] = Math.max(fromDone, data.xp && typeof data.xp[r] === "number" ? data.xp[r] : 0);
      });
      base.bonus = typeof data.bonus === "number" ? data.bonus : 0;
      base.deposits = Array.isArray(data.deposits) ? data.deposits : [];
      base.opened = data.opened && typeof data.opened === "object" ? data.opened : {};
      base.seenBank = !!data.seenBank;
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

  function bounds() {
    if (area === "town") return WORLD;
    if (area === "home") return HOME;
    return ROOM;
  }

  function inPlaza(x, y) {
    return x >= PLAZA.x && y >= PLAZA.y && x < PLAZA.x + PLAZA.w && y < PLAZA.y + PLAZA.h;
  }

  function plazaBlocked(x, y) {
    if (!plazaBits) return false;
    const cx = Math.floor((x - PLAZA.x) / plazaCell);
    const cy = Math.floor((y - PLAZA.y) / plazaCell);
    if (cx < 0 || cy < 0 || cx >= plazaCW || cy >= plazaCH) return true;
    return plazaBits[cy * plazaCW + cx] !== "1";
  }

  function solidAt(x, y, rad) {
    const box = bounds();
    if (area !== "town") {
      const m = 30;
      if (x < m + rad || y < m + rad || x > box.w - m - rad) return true;
      const doorHalf = area === "home" ? 90 : 48;
      if (y > box.h - m - rad && Math.abs(x - box.w / 2) > doorHalf) return true;
      const rects = window.HEAN_ROOMS.blocks(area === "home" ? "home" : roomKind);
      for (let i = 0; i < rects.length; i++) {
        const r = rects[i];
        if (x > r.x - rad && x < r.x + r.w + rad && y > r.y - rad && y < r.y + r.h + rad) return true;
      }
      return false;
    }
    if (x < rad + 10 || y < rad + 10 || x > WORLD.w - rad - 10 || y > WORLD.h - rad - 10) return true;
    const mapped = backdropMode() === "map";
    if (mapped) {
      if (y > 1690 && x < 780 && Math.hypot(x - 300, y - 1880) < 340) return true;
    } else if (Math.hypot(x - 460, y - 1780) < 120 + rad) return true;
    if (x > WORLD.w - 70 - rad) return true;
    if (!mapped && Math.hypot(x - 820, y - 640) < 22 + rad) return true;
    for (let i = 0; i < BUILDINGS.length; i++) {
      const b = BUILDINGS[i];
      if (x > b.x - rad && x < b.x + b.w + rad && y > b.y - rad && y < b.y + b.h + rad) return true;
    }
    if (!mapped) {
      for (let t = 0; t < TREES.length; t++) {
        if (Math.hypot(x - TREES[t].x, y - TREES[t].y) < 16 + rad) return true;
      }
    }
    return false;
  }

  function buildNav() {
    const box = bounds();
    cols = Math.ceil(box.w / CS);
    rows = Math.ceil(box.h / CS);
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
    if (area === "town") {
      return SPOTS.filter(function (s) {
        if (s.facility) return true;
        const sc = byId[s.id];
        return sc && sc.roles.indexOf(role) !== -1;
      });
    }
    if (area === "home") return [];
    const b = BUILDINGS.find(function (item) { return item.name === roomName; });
    const ids = b && b.scenarios ? b.scenarios : [];
    return ids.filter(function (id) {
      const sc = byId[id];
      return sc && sc.roles.indexOf(role) !== -1;
    }).map(function (id, index) {
      const top = b.motto ? 560 : 360;
      return { id: id, x: 130 + (index % 2) * 180, y: top + Math.floor(index / 2) * 70 };
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
    const mapPanel = document.getElementById("map-panel");
    const menuPanel = document.getElementById("menu-panel");
    const facility = document.getElementById("facility");
    return !dialog.hidden || !progress.hidden || (mapPanel && !mapPanel.hidden) || (menuPanel && !menuPanel.hidden) || (facility && !facility.hidden);
  }

  function placeChrome() {
    const status = document.getElementById("status");
    const quest = document.getElementById("quest");
    if (!status || !quest) return;
    const top = status.offsetTop + status.offsetHeight + 6;
    quest.style.top = top + "px";
    if (toastEl) toastEl.style.top = (top + quest.offsetHeight + 6) + "px";
  }

  function resize() {
    if (playScreen.hidden) return;
    placeChrome();
    const rect = stage.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    viewW = rect.width;
    viewH = rect.height;
    zoom = area === "town" ? (viewW < 760 ? 0.86 : 1) : roomZoom();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(viewW * dpr);
    canvas.height = Math.round(viewH * dpr);
  }

  function tryMove(dx, dy) {
    if (!solidAt(player.x + dx, player.y, 12)) player.x += dx;
    if (!solidAt(player.x, player.y + dy, 12)) player.y += dy;
    const box = bounds();
    player.x = clamp(player.x, 24, box.w - 24);
    player.y = clamp(player.y, 24, box.h - 24);
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
        if (Math.abs(vy) > Math.abs(vx) && vy) player.facing = vy < 0 ? "up" : "down";
        else if (vx) player.facing = vx < 0 ? "left" : "right";
        player.dir = player.facing === "left" ? -1 : 1;
        if (toastEl && !toastEl.hidden && player.walk > 0.4) hideToast();
      } else {
        player.walk = 0;
      }
    }
    const worldW = viewW / zoom;
    const worldH = viewH / zoom;
    const box = bounds();
    if (area === "town") {
      cam.x = camAxis(player.x, worldW, box.w);
      cam.y = camAxis(player.y, worldH, box.h);
    } else {
      const pad = roomPad();
      const drawnW = box.w * zoom;
      const drawnH = box.h * zoom;
      cam.x = -((viewW - drawnW) / 2) / zoom;
      cam.y = -(pad.top + Math.max(0, viewH - pad.top - pad.bottom - drawnH) / 2) / zoom;
    }
    if (doorLock > 0) doorLock -= dt;
    else tryDoors();
    if (area === "town") {
      holdZones();
      settleDeposits();
    }
    const near = nearestSpot();
    if (!near) {
      nearLabel.hidden = true;
      talkBtn.disabled = true;
      talkBtn.classList.remove("ready");
    } else {
      const sc = byId[near.id];
      nearLabel.hidden = false;
      nearLabel.textContent = (sc ? sc.speaker : near.name) + " · 可以互動";
      talkBtn.disabled = false;
      talkBtn.classList.add("ready");
    }
  }

  function roundRect(x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    pen.beginPath();
    pen.moveTo(x + radius, y);
    pen.arcTo(x + w, y, x + w, y + h, radius);
    pen.arcTo(x + w, y + h, x, y + h, radius);
    pen.arcTo(x, y + h, x, y, radius);
    pen.arcTo(x, y, x + w, y, radius);
    pen.closePath();
  }

  function draw() {
    pen.setTransform(dpr, 0, 0, dpr, 0, 0);
    pen.clearRect(0, 0, viewW, viewH);
    pen.save();
    pen.translate(-cam.x * zoom, -cam.y * zoom);
    pen.scale(zoom, zoom);
    if (area === "town") {
      const mode = backdropMode();
      if (!townLayer || townBakedMode !== mode) {
        townBakedMode = mode;
        townLayer = bakeTown();
      }
      pen.drawImage(townLayer, 0, 0);
      drawLife();
    } else {
      const homeArt = window.HEAN_ASSETS && window.HEAN_ASSETS.scenes && window.HEAN_ASSETS.scenes.home;
      if (area === "home" && homeArt && homeArt.complete && homeArt.naturalWidth) pen.drawImage(homeArt, 0, 0, HOME.w, HOME.h);
      else window.HEAN_ROOMS.paint(pen, area === "home" ? "home" : roomKind, time);
      if (area === "room") drawCompanyBoard();
    }
    const queue = [];
    activeSpots().forEach(function (s, i) {
      queue.push({
        y: s.y,
        draw: function () { drawPerson(s.x, s.y, i, false, s.id); }
      });
    });
    queue.push({
      y: player.y,
      draw: function () { drawPerson(player.x, player.y, 0, true); }
    });
    queue.sort(function (a, b) { return a.y - b.y; });
    queue.forEach(function (item) { item.draw(); });
    drawLabels();
    if (path && path.length && !reduceMotion) {
      const g = path[path.length - 1];
      pen.strokeStyle = "rgba(165, 134, 90, 0.85)";
      pen.lineWidth = 2;
      pen.beginPath();
      pen.arc(g.x, g.y, 8 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      pen.stroke();
    }
    pen.restore();
    drawSky();
    paintTownMap();
  }

  function drawLife() {
    drawDog(1120, 790);
    drawCat(1040, 808);
    const wing = Math.sin(time * 8);
    const bx = 760 + Math.sin(time * 0.6) * 36;
    const by = 300 + Math.sin(time * 1.1) * 8;
    pen.strokeStyle = "#6a5344";
    pen.lineWidth = 1.4;
    pen.beginPath();
    pen.moveTo(bx - 7, by);
    pen.quadraticCurveTo(bx, by - 6 * wing, bx + 7, by);
    pen.stroke();
    pen.fillStyle = "#8d6b45";
    pen.beginPath();
    pen.arc(bx, by, 2.2, 0, Math.PI * 2);
    pen.fill();
  }

  function drawDog(x, y) {
    pen.fillStyle = "rgba(40,28,18,0.2)";
    pen.beginPath();
    pen.ellipse(x, y + 8, 14, 4, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#c4925a";
    pen.beginPath();
    pen.ellipse(x, y, 12, 7, 0, 0, Math.PI * 2);
    pen.arc(x + 10, y - 4, 5, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#5c4636";
    pen.beginPath();
    pen.arc(x + 12, y - 5, 1, 0, Math.PI * 2);
    pen.fill();
  }

  function drawSky() {
    const hour = taipeiHour();
    const dark = hour >= 19 || hour < 5 ? 0.5 : (hour >= 17 || hour < 6 ? 0.22 : 0);
    if (dark > 0 && area === "town") {
      pen.fillStyle = "rgba(16, 22, 48, " + dark + ")";
      pen.fillRect(0, 0, viewW, viewH);
      pen.save();
      pen.translate(-cam.x * zoom, -cam.y * zoom);
      pen.scale(zoom, zoom);
      pen.globalCompositeOperation = "lighter";
      LAMPS.forEach(function (lamp) {
        const glow = pen.createRadialGradient(lamp.x, lamp.y - 10, 4, lamp.x, lamp.y - 10, 70);
        glow.addColorStop(0, "rgba(255, 214, 140, 0.9)");
        glow.addColorStop(1, "rgba(255, 214, 140, 0)");
        pen.fillStyle = glow;
        pen.beginPath();
        pen.arc(lamp.x, lamp.y - 10, 70, 0, Math.PI * 2);
        pen.fill();
      });
      pen.restore();
    }
    const raining = Math.floor((time + 70) / 24) % 8 === 0;
    if (raining && area === "town" && !reduceMotion) {
      pen.strokeStyle = "rgba(180, 200, 220, 0.45)";
      pen.lineWidth = 1.4;
      for (let i = 0; i < 40; i++) {
        const x = (i * 97 + time * 180) % (viewW + 40) - 20;
        const y = (i * 53 + time * 320) % (viewH + 40) - 20;
        pen.beginPath();
        pen.moveTo(x, y);
        pen.lineTo(x - 8, y + 16);
        pen.stroke();
      }
    }
  }

  function taipeiHour() {
    if (hourOverride != null) return hourOverride;
    const text = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Taipei",
      hour: "2-digit",
      hourCycle: "h23"
    }).format(new Date());
    return Number(text);
  }

  function bakeTown() {
    const c = document.createElement("canvas");
    c.width = WORLD.w;
    c.height = WORLD.h;
    const saved = pen;
    const savedCamX = cam.x;
    const savedCamY = cam.y;
    const savedW = viewW;
    const savedH = viewH;
    const savedZ = zoom;
    pen = c.getContext("2d");
    cam.x = 0;
    cam.y = 0;
    viewW = WORLD.w;
    viewH = WORLD.h;
    zoom = 1;
    const mapped = backdropMode() === "map";
    drawTownBackdrop();
    if (mapped) {
      BUILDINGS.forEach(drawPlaceLabel);
    } else {
      drawPaths();
      drawPond();
      drawRiver();
      drawFlowers();
      BUILDINGS.forEach(drawBuilding);
      TREES.forEach(drawTree);
      drawLamps();
      drawStreetSign(930, 1040, "壽險街");
      drawStreetSign(930, 1288, "產險街");
      drawCrate(1220, 340);
      drawWell();
      drawBench();
    }
    pen = saved;
    cam.x = savedCamX;
    cam.y = savedCamY;
    viewW = savedW;
    viewH = savedH;
    zoom = savedZ;
    return c;
  }

  function townImage() {
    const scenes = window.HEAN_ASSETS && window.HEAN_ASSETS.scenes;
    const image = scenes && scenes.town;
    if (image && image.complete && image.naturalWidth) return image;
    return null;
  }

  function coverTown(ctx, image) {
    const scale = Math.max(WORLD.w / image.naturalWidth, WORLD.h / image.naturalHeight);
    const dw = image.naturalWidth * scale;
    const dh = image.naturalHeight * scale;
    ctx.drawImage(image, (WORLD.w - dw) / 2, (WORLD.h - dh) / 2, dw, dh);
  }

  function backdropMode() {
    const scenes = window.HEAN_ASSETS && window.HEAN_ASSETS.scenes;
    if (!scenes) return "";
    const map = scenes.map;
    if (map && map.complete && map.naturalWidth) return "map";
    const town = scenes.town;
    if (town && town.complete && town.naturalWidth) return "town";
    return "";
  }

  function drawTownBackdrop() {
    const scenes = window.HEAN_ASSETS && window.HEAN_ASSETS.scenes;
    const map = scenes && scenes.map;
    if (map && map.complete && map.naturalWidth) {
      pen.drawImage(map, 0, 0, WORLD.w, WORLD.h);
      return;
    }
    const image = townImage();
    if (image) {
      coverTown(pen, image);
      pen.fillStyle = "rgba(236, 224, 204, 0.18)";
      pen.fillRect(0, 0, WORLD.w, WORLD.h);
      return;
    }
    drawGround();
  }

  function drawPlaceLabel(b) {
    const x = b.x + b.w / 2;
    const y = b.y + Math.min(36, b.h * 0.38);
    pen.font = "700 15px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    const tw = pen.measureText(b.name).width + 16;
    roundRect(x - tw / 2, y - 12, tw, 22, 8);
    pen.fillStyle = "rgba(255, 248, 236, 0.92)";
    pen.fill();
    pen.strokeStyle = "rgba(120, 84, 48, 0.35)";
    pen.lineWidth = 1;
    pen.stroke();
    pen.fillStyle = "#4a3828";
    pen.fillText(b.name, x, y);
    if (b.theme) {
      pen.font = "600 12px " + FONT;
      const th = pen.measureText(b.theme).width + 12;
      roundRect(x - th / 2, y + 14, th, 16, 6);
      pen.fillStyle = b.sign || "#8d6b45";
      pen.fill();
      pen.fillStyle = "#fffdf9";
      pen.fillText(b.theme, x, y + 22);
    }
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
        pen.fillStyle = n > 0.55 ? "#e7d7bc" : "#d5c7a4";
        pen.fillRect(x, y, size + 1, size + 1);
        if (n > 0.86) {
          pen.fillStyle = "rgba(168, 140, 90, 0.16)";
          pen.beginPath();
          pen.ellipse(x + 18, y + 26, 7, 3, 0.4, 0, Math.PI * 2);
          pen.fill();
        }
      }
    }
  }

  function drawPaths() {
    pen.fillStyle = "rgba(226, 206, 166, 0.78)";
    PATHS.forEach(function (p) {
      roundRect(p.x, p.y, p.w, p.h, 18);
      pen.fill();
    });
    pen.fillStyle = "rgba(255, 250, 242, 0.45)";
    PATHS.forEach(function (p) {
      if (p.w > p.h) {
        roundRect(p.x + 10, p.y + p.h / 2 - 3, p.w - 20, 6, 3);
      } else {
        roundRect(p.x + p.w / 2 - 3, p.y + 10, 6, p.h - 20, 3);
      }
      pen.fill();
    });
  }

  function drawPond() {
    pen.fillStyle = "#b7d0d4";
    pen.beginPath();
    pen.ellipse(460, 1780, 150, 88, -0.1, 0, Math.PI * 2);
    pen.fill();
    pen.strokeStyle = "rgba(255,255,255,0.55)";
    pen.lineWidth = 2;
    pen.beginPath();
    pen.ellipse(430, 1764, 54, 16, -0.4, 0.2, 2.2);
    pen.stroke();
  }

  function drawRiver() {
    pen.fillStyle = "rgba(150, 176, 122, 0.16)";
    pen.fillRect(1840, 40, 440, 500);
    pen.fillStyle = "rgba(168, 140, 96, 0.14)";
    pen.fillRect(1840, 1572, 440, 360);
    pen.fillStyle = "rgba(120, 160, 170, 0.16)";
    pen.fillRect(40, 1572, 780, 360);
  }

  function drawLamps() {
    LAMPS.forEach(function (lamp) {
      pen.fillStyle = "#6a5344";
      pen.fillRect(lamp.x - 3, lamp.y - 6, 6, 34);
      pen.fillStyle = "#f6e7c0";
      pen.beginPath();
      pen.arc(lamp.x, lamp.y - 10, 7, 0, Math.PI * 2);
      pen.fill();
    });
  }

  function drawCrate(x, y) {
    pen.fillStyle = "#c4923a";
    roundRect(x, y, 22, 16, 3);
    pen.fill();
    pen.fillStyle = "#f3e2c4";
    pen.fillRect(x, y + 6, 22, 3);
  }

  function drawFlowers() {
    FLOWERS.forEach(function (f) {
      if (f.x < cam.x - 20 || f.y < cam.y - 20 || f.x > cam.x + viewW / zoom + 20 || f.y > cam.y + viewH / zoom + 20) return;
      pen.fillStyle = f.color;
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        pen.beginPath();
        pen.arc(f.x + Math.cos(a) * 3, f.y + Math.sin(a) * 3, 2.1, 0, Math.PI * 2);
        pen.fill();
      }
      pen.fillStyle = "#f6e7b2";
      pen.beginPath();
      pen.arc(f.x, f.y, 1.5, 0, Math.PI * 2);
      pen.fill();
    });
  }

  function drawBuilding(b) {
    if (b.art) return;
    const x = b.x;
    const y = b.y;
    const w = b.w;
    const h = b.h;
    const wall = b.wall || "#fffaf3";
    pen.fillStyle = "rgba(62, 42, 24, 0.28)";
    pen.beginPath();
    pen.ellipse(x + w / 2 + 8, y + h + 2, w * 0.5, 16, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#a67c52";
    pen.beginPath();
    pen.moveTo(x + w - 6, y + 46);
    pen.lineTo(x + w + 18, y + 58);
    pen.lineTo(x + w + 18, y + h + 8);
    pen.lineTo(x + w - 6, y + h - 6);
    pen.fill();
    roundRect(x, y + 34, w, h - 30, 8);
    pen.fillStyle = wall;
    pen.fill();
    pen.fillStyle = "rgba(166, 124, 82, 0.2)";
    pen.fill();
    pen.fillStyle = "rgba(120, 78, 46, 0.28)";
    pen.fillRect(x + 4, y + h - 22, w - 8, 12);
    pen.strokeStyle = "rgba(90, 60, 40, 0.28)";
    pen.lineWidth = 2;
    pen.stroke();
    pen.fillStyle = "rgba(214, 190, 156, 0.35)";
    for (let i = 0; i < 3; i++) pen.fillRect(x + 14 + i * 16, y + 48, 5, h - 78);
    pen.fillStyle = b.roof;
    pen.beginPath();
    pen.moveTo(x - 14, y + 48);
    pen.lineTo(x + w * 0.46, y + 4);
    pen.lineTo(x + w + 20, y + 48);
    pen.closePath();
    pen.fill();
    pen.strokeStyle = "rgba(255,255,255,0.28)";
    pen.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      pen.beginPath();
      const yy = y + 12 + i * 7;
      pen.moveTo(x + i * 8, yy);
      pen.lineTo(x + w - i * 6, yy);
      pen.stroke();
    }
    const doorW = 28;
    roundRect(x + w / 2 - doorW / 2, y + h - 46, doorW, 38, 6);
    pen.fillStyle = "#7a4e32";
    pen.fill();
    pen.fillStyle = "#f3e2c4";
    pen.beginPath();
    pen.arc(x + w / 2 + 8, y + h - 26, 2.4, 0, Math.PI * 2);
    pen.fill();
    [-1, 1].forEach(function (side) {
      const wx = x + w / 2 + side * Math.min(52, w * 0.28) - 16;
      if (wx > x + 10 && wx + 30 < x + w - 8) {
        roundRect(wx, y + 58, 30, 24, 4);
        pen.fillStyle = "#9ec8e4";
        pen.fill();
        pen.strokeStyle = "#6a4632";
        pen.lineWidth = 2;
        pen.stroke();
        pen.beginPath();
        pen.moveTo(wx + 15, y + 58);
        pen.lineTo(wx + 15, y + 82);
        pen.moveTo(wx, y + 70);
        pen.lineTo(wx + 30, y + 70);
        pen.stroke();
      }
    });
    pen.fillStyle = "#6f8f62";
    pen.beginPath();
    pen.ellipse(x + 18, y + h - 8, 10, 7, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#c47a4a";
    pen.fillRect(x + 14, y + h - 10, 8, 8);
    pen.font = "600 13px " + FONT;
    const tw = pen.measureText(b.name).width;
    const sw = tw + 18;
    const sx = x + w / 2 - sw / 2;
    const sy = y + 40;
    roundRect(sx, sy, sw, 22, 11);
    pen.fillStyle = "rgba(255, 253, 249, 0.95)";
    pen.fill();
    pen.fillStyle = "#5c4a38";
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    pen.fillText(b.name, x + w / 2, sy + 11);
    if (b.theme) {
      pen.font = "600 11px " + FONT;
      const themeW = pen.measureText(b.theme).width + 14;
      roundRect(x + w / 2 - themeW / 2, y + h - 18, themeW, 16, 8);
      pen.fillStyle = b.sign || b.roof;
      pen.fill();
      pen.fillStyle = "#fffdf9";
      pen.fillText(b.theme, x + w / 2, y + h - 10);
    }
    if (b.name === "茶館") drawCat(b.x + b.w - 36, b.y + 18);
  }

  function drawStreetSign(x, y, text) {
    pen.fillStyle = "#6a5344";
    pen.fillRect(x - 3, y - 28, 6, 36);
    pen.font = "700 14px " + FONT;
    const w = pen.measureText(text).width + 16;
    roundRect(x + 6, y - 36, w, 22, 6);
    pen.fillStyle = "#fff8ee";
    pen.fill();
    pen.strokeStyle = "#8d6b45";
    pen.lineWidth = 1.5;
    pen.stroke();
    pen.fillStyle = "#5c4636";
    pen.textAlign = "left";
    pen.textBaseline = "middle";
    pen.fillText(text, x + 14, y - 25);
  }

  function drawCompanyBoard() {
    const building = BUILDINGS.find(function (item) { return item.name === roomName; });
    if (!building || !building.motto) return;
    const lines = (building.scenarios || []).filter(function (id) {
      const sc = byId[id];
      return sc && role && sc.roles.indexOf(role) !== -1;
    });
    const boardH = 58 + lines.length * 28;
    roundRect(28, 250, ROOM.w - 56, boardH, 12);
    pen.fillStyle = "rgba(255, 248, 238, 0.94)";
    pen.fill();
    pen.strokeStyle = "#c4a36a";
    pen.lineWidth = 2;
    pen.stroke();
    pen.fillStyle = "#6a4632";
    pen.font = "700 14px " + FONT;
    pen.textAlign = "left";
    pen.textBaseline = "middle";
    pen.fillText(building.motto, 44, 272);
    lines.forEach(function (id, index) {
      const sc = byId[id];
      pen.fillStyle = "#3f362e";
      pen.font = "600 13px " + FONT;
      pen.fillText((index + 1) + ". " + sc.speaker + " · " + sc.title, 44, 302 + index * 28);
    });
  }

  function drawCat(x, y) {
    pen.fillStyle = "#d9c2a6";
    pen.beginPath();
    pen.ellipse(x, y + 8, 14, 7, 0, 0, Math.PI * 2);
    pen.fill();
    pen.beginPath();
    pen.arc(x + 10, y + 2, 6, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#f7e7c8";
    pen.beginPath();
    pen.moveTo(x + 6, y - 2);
    pen.lineTo(x + 8, y + 3);
    pen.lineTo(x + 12, y - 1);
    pen.fill();
  }

  function drawTree(t) {
    pen.fillStyle = "#b08968";
    roundRect(t.x - 4, t.y - 8, 8, 16, 3);
    pen.fill();
    pen.fillStyle = "#c5cbb6";
    pen.beginPath();
    pen.arc(t.x, t.y - 20, 16, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#b7c0a8";
    pen.beginPath();
    pen.arc(t.x - 10, t.y - 14, 11, 0, Math.PI * 2);
    pen.fill();
    pen.beginPath();
    pen.arc(t.x + 9, t.y - 12, 10, 0, Math.PI * 2);
    pen.fill();
  }

  function drawWell() {
    pen.fillStyle = "#d7c4a4";
    pen.beginPath();
    pen.ellipse(820, 640, 22, 12, 0, 0, Math.PI * 2);
    pen.fill();
    pen.strokeStyle = "#b08968";
    pen.lineWidth = 3;
    pen.stroke();
    pen.strokeStyle = "#8d6b45";
    pen.beginPath();
    pen.moveTo(804, 632);
    pen.lineTo(804, 612);
    pen.lineTo(836, 612);
    pen.lineTo(836, 632);
    pen.stroke();
  }

  function drawBench() {
    pen.fillStyle = "#c4a36a";
    roundRect(980, 548, 46, 10, 4);
    pen.fill();
    pen.fillRect(986, 556, 4, 10);
    pen.fillRect(1016, 556, 4, 10);
  }

  function drawPerson(x, y, index, isPlayer, scenarioId) {
    if (!isPlayer && scenarioId === "chest-park") {
      drawChest(x, y);
      return;
    }
    const id = isPlayer ? "player-" + role : scenarioId;
    const moving = isPlayer && player.walk > 0.02 && !reduceMotion;
    const facing = isPlayer ? (player.facing || "down") : "down";
    const aiH = area === "town" ? 150 : 108;
    const aiW = aiH * 256 / 320;
    const aiFrame = moving ? Math.floor(player.walk * 8) % 4 : 1;
    pen.save();
    pen.translate(x, y);
    pen.fillStyle = "rgba(48, 32, 20, 0.22)";
    pen.beginPath();
    pen.ellipse(2, 5, 16, 6, 0, 0, Math.PI * 2);
    pen.fill();
    if (window.HEAN_CHARS.drawSheet(pen, id, facing, aiFrame, -aiW / 2, -aiH + 6, aiW, aiH)) {
      pen.restore();
      if (!isPlayer) markSpot(x, y, scenarioId);
      return;
    }
    pen.restore();
    const frame = moving ? Math.floor(((player.walk % 0.56) / 0.56) * 16) % 16 : 0;
    const bob = !moving && !reduceMotion ? Math.sin(time * 1.7 + index) * 1.15 : 0;
    const pack = window.HEAN_CHARS.sheetFor(id);
    if (!pack) return;
    const sw = window.HEAN_CHARS.SW;
    const sh = window.HEAN_CHARS.SH;
    const used = Math.min(frame, pack.frames - 1);
    const scale = window.HEAN_CHARS.SCALE;
    const frameIndex = used;
    pen.save();
    pen.translate(x, y);
    pen.fillStyle = "rgba(48, 32, 20, 0.22)";
    pen.beginPath();
    pen.ellipse(2, 5, isPlayer ? 18 : 16, 6.5, 0, 0, Math.PI * 2);
    pen.fill();
    if (isPlayer) {
      pen.strokeStyle = "rgba(165, 134, 90, 0.8)";
      pen.lineWidth = 1.6;
      pen.beginPath();
      pen.ellipse(0, 3, 16, 6.2, 0, 0, Math.PI * 2);
      pen.stroke();
    }
    pen.translate(0, bob);
    if (isPlayer && player.dir < 0) pen.scale(-1, 1);
    pen.drawImage(pack.canvas, frameIndex * sw * scale, 0, sw * scale, sh * scale, -sw / 2, -(sh - 8), sw, sh);
    if (!isPlayer && nearestSpot() && nearestSpot().id === scenarioId) {
      pen.strokeStyle = "rgba(165, 134, 90, 0.9)";
      pen.lineWidth = 2;
      pen.beginPath();
      pen.ellipse(0, -34, 24, 32, 0, 0, Math.PI * 2);
      pen.stroke();
    }
    pen.restore();
    if (!isPlayer) markSpot(x, y, scenarioId);
  }

  function markSpot(x, y, scenarioId) {
    const quest = currentQuest();
    const bang = quest && quest.spot === scenarioId;
    if (!byId[scenarioId] && scenarioId !== "chest-park" && scenarioId !== "bank-counter") return;
    if (scenarioId !== "chest-park" && scenarioId !== "bank-counter" && recordOf(scenarioId)) {
      drawMark(x, y - 96, recordOf(scenarioId));
      return;
    }
    pen.save();
    pen.translate(x, y - 100);
    pen.fillStyle = bang ? "#e0b15a" : "#fffdf9";
    pen.beginPath();
    pen.arc(0, 0, 8, 0, Math.PI * 2);
    pen.fill();
    pen.strokeStyle = "#8a6230";
    pen.lineWidth = 1.5;
    pen.stroke();
    pen.fillStyle = "#5c3a28";
    pen.font = "700 12px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    pen.fillText("!", 0, 0);
    pen.restore();
  }

  function drawChest(x, y) {
    pen.fillStyle = "rgba(40,28,18,0.2)";
    pen.beginPath();
    pen.ellipse(x, y + 4, 14, 4, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = state.opened["chest-park"] ? "#a89880" : "#c4923a";
    roundRect(x - 12, y - 14, 24, 16, 3);
    pen.fill();
    pen.fillStyle = "#f3e2c4";
    pen.fillRect(x - 12, y - 8, 24, 3);
    if (!state.opened["chest-park"]) markSpot(x, y, "chest-park");
  }

  function drawMark(x, y, rec) {
    pen.beginPath();
    pen.arc(x, y, 7, 0, Math.PI * 2);
    pen.fillStyle = rec === "best" ? "#a5865a" : rec === "seen" ? "#e4d3b4" : "#fffdf9";
    pen.fill();
    pen.strokeStyle = "#a5865a";
    pen.lineWidth = 1.5;
    pen.stroke();
    if (rec === "best") {
      pen.strokeStyle = "#fffdf9";
      pen.lineWidth = 1.6;
      pen.beginPath();
      pen.moveTo(x - 3, y);
      pen.lineTo(x - 1, y + 2.4);
      pen.lineTo(x + 3.4, y - 2.4);
      pen.stroke();
    }
  }

  function drawLabels() {
    const near = nearestSpot();
    pen.font = "600 13px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    activeSpots().forEach(function (s) {
      const dist = Math.hypot(s.x - player.x, s.y - player.y);
      if (dist > 150 && !(near && near.id === s.id)) return;
      const sc = byId[s.id];
      const text = sc ? sc.speaker : (s.name || "這裡");
      const w = pen.measureText(text).width + 16;
      const x = s.x - w / 2;
      const y = s.y - 102;
      roundRect(x, y, w, 20, 10);
      pen.fillStyle = "rgba(255, 253, 249, 0.94)";
      pen.fill();
      pen.fillStyle = "#3f362e";
      pen.fillText(text, s.x, y + 10);
    });
  }

  function hash(x, y) {
    let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function roomPad() {
    const phone = viewW < 760;
    const quest = document.getElementById("quest");
    const below = quest ? quest.offsetTop + quest.offsetHeight + 12 : 0;
    return { top: Math.max(phone ? 128 : 78, below), bottom: phone ? 128 : 28 };
  }

  function roomZoom() {
    const box = bounds();
    const pad = roomPad();
    const availW = Math.max(80, viewW - 12);
    const availH = Math.max(80, viewH - pad.top - pad.bottom);
    return Math.min(availW / box.w, availH / box.h);
  }

  function camAxis(pos, view, size) {
    if (size <= view) return (size - view) / 2;
    return clamp(pos - view / 2, 0, size - view);
  }

  function setArea(next, x, y, kind, exit, name) {
    area = next;
    if (kind) roomKind = kind;
    if (exit) roomExit = exit;
    if (name) roomName = name;
    if (next === "home") roomName = "家";
    player.x = x;
    player.y = y;
    path = null;
    doorLock = 0.85;
    buildNav();
    renderHud();
    if (next === "room" && kind === "bank") openBank();
    if (next === "room" && name === "醫院") openHospital();
    if (next === "room" && name === "車行") openGarageCard();
  }

  function tryDoors() {
    if (area === "town") {
      for (let i = 0; i < BUILDINGS.length; i++) {
        const b = BUILDINGS[i];
        const dx = b.x + b.w / 2;
        const dy = b.y + b.h + 18;
        if (Math.abs(player.x - dx) < 26 && Math.abs(player.y - dy) < 22) {
          if (b.kind === "home") setArea("home", 360, 820);
          else setArea("room", 220, 400, b.kind, { x: dx, y: dy + 50 }, b.name);
          return;
        }
      }
    } else if (player.y > bounds().h - (area === "home" ? 110 : 42) && Math.abs(player.x - bounds().w / 2) < (area === "home" ? 90 : 42)) {
      if (area === "home") setArea("town", 290, 400);
      else setArea("town", roomExit.x, roomExit.y);
    }
  }

  let mapGeom = { x: 0, y: 0, scale: 0.18 };
  let mapDrag = null;
  const mapPts = new Map();
  let mapPinch = null;

  function mapBox() {
    const canvas = document.getElementById("town-map");
    const rect = canvas.getBoundingClientRect();
    return { canvas: canvas, rect: rect, w: rect.width, h: rect.height };
  }

  function mapFitScale() {
    const box = mapBox();
    if (box.w < 2 || box.h < 2) return 0.15;
    return Math.min(box.w / WORLD.w, box.h / WORLD.h) * 0.94;
  }

  function mapFocus(wx, wy, scale) {
    const box = mapBox();
    mapGeom.scale = scale;
    mapGeom.x = wx - box.w / scale / 2;
    mapGeom.y = wy - box.h / scale / 2;
  }

  function mapFit() {
    mapFocus(WORLD.w / 2, WORLD.h / 2, mapFitScale());
  }

  function playerMapPoint() {
    if (area === "town") return { x: player.x, y: player.y };
    if (area === "home") return { x: 290, y: 390 };
    return { x: roomExit.x, y: roomExit.y };
  }

  function mapOnPlayer() {
    const here = playerMapPoint();
    const box = mapBox();
    const scale = Math.max(mapFitScale() * 2.6, (box.w || 320) / 900);
    mapFocus(here.x, here.y, Math.min(scale, 0.85));
  }

  function renderMap() {
    const panel = document.getElementById("map-panel");
    panel.hidden = false;
    document.body.classList.add("ui-busy");
    requestAnimationFrame(function () {
      mapOnPlayer();
      paintTownMap();
    });
  }

  function paintTownMap() {
    const panel = document.getElementById("map-panel");
    const box = mapBox();
    if (!panel || panel.hidden || box.w < 2) return;
    const canvas = box.canvas;
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    const bw = Math.round(box.w * ratio);
    const bh = Math.round(box.h * ratio);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    const g = canvas.getContext("2d");
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
    g.clearRect(0, 0, box.w, box.h);
    const art = window.HEAN_ASSETS && window.HEAN_ASSETS.scenes && window.HEAN_ASSETS.scenes.map;
    g.save();
    g.beginPath();
    g.rect(0, 0, box.w, box.h);
    g.clip();
    g.translate(-mapGeom.x * mapGeom.scale, -mapGeom.y * mapGeom.scale);
    g.scale(mapGeom.scale, mapGeom.scale);
    if (art && art.complete && art.naturalWidth) g.drawImage(art, 0, 0, WORLD.w, WORLD.h);
    else {
      const town = townImage();
      if (town) coverTown(g, town);
      else {
        g.fillStyle = "#e7d7bc";
        g.fillRect(0, 0, WORLD.w, WORLD.h);
      }
      g.fillStyle = "rgba(226, 206, 166, 0.82)";
      PATHS.forEach(function (p) { g.fillRect(p.x, p.y, p.w, p.h); });
      g.fillStyle = "rgba(120, 160, 170, 0.35)";
      g.beginPath();
      g.ellipse(460, 1780, 150, 88, 0, 0, Math.PI * 2);
      g.fill();
    }
    const mapDrawn = art && art.complete && art.naturalWidth;
    if (!mapDrawn) {
      BUILDINGS.forEach(function (b) {
        if (b.art) return;
        g.fillStyle = b.roof || "#c4a36a";
        g.fillRect(b.x, b.y, b.w, b.h);
        g.fillStyle = "rgba(255,253,249,0.92)";
        g.fillRect(b.x + 8, b.y + b.h * 0.35, b.w - 16, b.h * 0.45);
      });
    }
    const level = role ? levelOf() : 1;
    ZONES.forEach(function (zone) {
      if (level >= zone.level) return;
      g.fillStyle = "rgba(63, 54, 46, 0.28)";
      g.fillRect(zone.x, zone.y, zone.w, zone.h);
    });
    g.restore();
    function toScreen(x, y) {
      return {
        x: (x - mapGeom.x) * mapGeom.scale,
        y: (y - mapGeom.y) * mapGeom.scale
      };
    }
    g.font = "700 11px " + FONT;
    g.textAlign = "center";
    g.textBaseline = "middle";
    BUILDINGS.forEach(function (b) {
      const p = toScreen(b.x + b.w / 2, b.y + b.h / 2);
      if (p.x < -40 || p.y < -20 || p.x > box.w + 40 || p.y > box.h + 20) return;
      const label = b.name.replace("人壽", "").replace("產物", "");
      const tw = g.measureText(label).width + 10;
      g.fillStyle = "rgba(255, 248, 236, 0.9)";
      g.fillRect(p.x - tw / 2, p.y - 8, tw, 16);
      g.fillStyle = "#3f362e";
      g.fillText(label, p.x, p.y);
      if (b.level && level < b.level) {
        g.fillStyle = "#8a6230";
        g.fillText("鎖 Lv." + b.level, p.x, p.y + 14);
      }
    });
    ZONES.forEach(function (zone) {
      if (level >= zone.level) return;
      const p = toScreen(zone.x + zone.w / 2, zone.y + 28);
      g.fillStyle = "#fffdf9";
      g.fillText(zone.name + " 鎖 Lv." + zone.level, p.x, p.y);
    });
    const quest = role ? currentQuest() : null;
    if (quest) {
      const target = BUILDINGS.find(function (b) { return b.name === quest.building; });
      if (target) {
        const p = toScreen(target.x + target.w / 2, target.y - 8);
        g.fillStyle = "#c47a2a";
        g.beginPath();
        g.arc(p.x, p.y, 6, 0, Math.PI * 2);
        g.fill();
        g.fillText("目標", p.x, p.y - 12);
      }
    }
    const here = playerMapPoint();
    const pin = toScreen(here.x, here.y);
    const blink = 0.55 + Math.abs(Math.sin(time * 5)) * 0.45;
    g.globalAlpha = blink;
    g.fillStyle = "#c4554a";
    g.beginPath();
    g.arc(pin.x, pin.y, 8, 0, Math.PI * 2);
    g.fill();
    g.globalAlpha = 1;
    g.strokeStyle = "#fffdf9";
    g.lineWidth = 2;
    g.stroke();
    g.fillStyle = "#3f362e";
    g.textAlign = "left";
    g.fillText("你在這裡", pin.x + 12, pin.y);
  }

  function mapWorld(clientX, clientY) {
    const box = mapBox();
    return {
      x: mapGeom.x + (clientX - box.rect.left) / mapGeom.scale,
      y: mapGeom.y + (clientY - box.rect.top) / mapGeom.scale
    };
  }

  function mapClick(clientX, clientY) {
    const world = mapWorld(clientX, clientY);
    const hit = BUILDINGS.find(function (b) {
      return world.x > b.x - 12 && world.x < b.x + b.w + 12 && world.y > b.y - 12 && world.y < b.y + b.h + 12;
    });
    if (hit) guideTo(hit.name);
  }

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

  function xpOf() {
    return (state.xp && state.xp[role]) || 0;
  }

  function levelOf() {
    const xp = xpOf();
    let level = 1;
    LEVEL_XP.forEach(function (need, index) {
      if (xp >= need) level = index + 1;
    });
    return level;
  }

  function cashOf(r) {
    const locked = (state.deposits || []).reduce(function (sum, item) {
      return sum + item.principal;
    }, 0);
    return Math.max(0, scoreOf(r || role) + (state.bonus || 0) - locked);
  }

  function currentQuest() {
    const level = role ? levelOf() : 1;
    const steps = [
      { text: "走出家門，到商店街看看", building: "銀行", spot: "bank-counter", when: function () { return area === "home"; } },
      { text: "到銀行看定存和流動性", building: "銀行", spot: "bank-counter", when: function () { return !state.seenBank; } },
      { text: "到車行分清強制險和任意險", building: "車行", spot: "garage-voluntary", when: function () { return !recordOf("garage-voluntary"); } },
      { text: "到醫院看醫療花費怎麼對條款", building: "醫院", spot: "hospital-reimburse", when: function () { return !recordOf("hospital-reimburse"); } },
      { text: "到 Lv.3 後去公園亭", building: "公園亭", spot: "park-walk", when: function () { return level < 3 || !recordOf("park-walk"); } },
      { text: "到 Lv.5 後去湖畔", building: "湖畔亭", spot: "lake-rest", when: function () { return level < 5 || !recordOf("lake-rest"); } },
      { text: "到 Lv.8 後去山上步道", building: "步道牌", spot: "trail-sign", when: function () { return level < 8 || !recordOf("trail-sign"); } }
    ];
    for (let i = 0; i < steps.length; i++) if (steps[i].when()) return steps[i];
    return { text: "這座小鎮的目標都看過了", building: "鎮民中心", spot: "free-look" };
  }

  function holdZones() {
    const zone = ZONES.find(function (item) {
      return player.x > item.x && player.x < item.x + item.w && player.y > item.y && player.y < item.y + item.h && levelOf() < item.level;
    });
    if (!zone) {
      zoneNote = "";
      return;
    }
    player.x = zone.back.x;
    player.y = zone.back.y;
    path = null;
    if (zoneNote !== zone.name) {
      zoneNote = zone.name;
      showToast(zone.name + "要到 Lv." + zone.level + " 才進得去");
    }
  }

  function settleDeposits() {
    if (!state.deposits || !state.deposits.length) return;
    const now = Date.now();
    const keep = [];
    let interest = 0;
    state.deposits.forEach(function (item) {
      if ((now - item.start) / DAY_MS >= item.days) interest += Math.floor(item.principal * item.rate);
      else keep.push(item);
    });
    if (keep.length === state.deposits.length) return;
    state.deposits = keep;
    state.bonus = (state.bonus || 0) + interest;
    save();
    renderHud();
    showReward("小鎮日到了。練習多給 " + interest + " 枚，已加進小鎮幣。這不是真實利息。");
  }

  function guideTo(name) {
    const building = BUILDINGS.find(function (item) { return item.name === name; });
    if (!building) return;
    if (building.level && levelOf() < building.level) {
      showToast(building.name + "要到 Lv." + building.level);
      return;
    }
    const dest = { x: building.x + building.w / 2, y: building.y + building.h + 28 };
    if (area !== "town") setArea("town", 170, 360);
    path = findPath(player.x, player.y, dest.x, dest.y);
    document.getElementById("map-panel").hidden = true;
    const facility = document.getElementById("facility");
    if (dialog.hidden && progress.hidden && facility.hidden) document.body.classList.remove("ui-busy");
  }

  function walkTo(x, y) {
    if (area === "town") {
      const building = BUILDINGS.find(function (item) {
        return x > item.x - 8 && x < item.x + item.w + 8 && y > item.y - 16 && y < item.y + item.h + 36;
      });
      if (building) {
        guideTo(building.name);
        return;
      }
    }
    path = findPath(player.x, player.y, x, y);
  }

  function showReward(text) {
    const box = document.getElementById("reward");
    document.getElementById("reward-body").textContent = text;
    box.hidden = false;
    clearTimeout(rewardTimer);
    rewardTimer = setTimeout(function () { box.hidden = true; }, 2600);
  }

  let zoneNote = "";
  let rewardTimer = 0;

  function seasonName() {
    const month = new Date().getMonth();
    if (month < 2 || month === 11) return "冬";
    if (month < 5) return "春";
    if (month < 8) return "夏";
    return "秋";
  }

  function placeName() {
    if (area === "home") return "家";
    if (area === "town") return "小鎮";
    return roomName || "室內";
  }

  function renderHud() {
    if (!role) return;
    const total = scenariosFor(role).length;
    const done = Object.keys(state.progress[role] || {}).length;
    const level = levelOf();
    const now = new Date();
    const clock = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Taipei",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).format(now);
    document.getElementById("st-season").textContent = seasonName();
    document.getElementById("st-time").textContent = clock;
    document.getElementById("st-place").textContent = placeName();
    document.getElementById("st-role").textContent = ROLE_NAME[role] + " Lv." + level;
    document.getElementById("st-coin").textContent = "小鎮幣 " + cashOf(role);
    const quest = currentQuest();
    document.getElementById("quest-text").textContent = "目標：" + quest.text;
    placeChrome();
    document.getElementById("st-stam").textContent = "體力 100/100";
    const soundBtn = document.getElementById("btn-sound");
    const musicBtn = document.getElementById("btn-music");
    soundBtn.textContent = state.sound ? "音效開" : "音效關";
    soundBtn.setAttribute("aria-pressed", state.sound ? "true" : "false");
    musicBtn.textContent = state.music ? "音樂開" : "音樂關";
    musicBtn.setAttribute("aria-pressed", state.music ? "true" : "false");
  }

  function paintAvatar() {
    const canvasFace = document.getElementById("avatar-face");
    if (!canvasFace || !role) return;
    const portrait = window.HEAN_ART && window.HEAN_ART.portrait("player-" + role);
    if (portrait && window.HEAN_ART.ready(portrait)) {
      const g = canvasFace.getContext("2d");
      g.clearRect(0, 0, canvasFace.width, canvasFace.height);
      const scale = Math.max(canvasFace.width / portrait.naturalWidth, canvasFace.height / portrait.naturalHeight);
      const w = portrait.naturalWidth * scale;
      const h = portrait.naturalHeight * scale;
      g.drawImage(portrait, (canvasFace.width - w) / 2, (canvasFace.height - h) / 2, w, h);
      return;
    }
    window.HEAN_CHARS.paintAvatar(canvasFace, "player-" + role);
  }

  function paintDialogArt(id) {
    const canvas = document.getElementById("dlg-portrait");
    const bust = document.getElementById("dlg-bust");
    const portrait = window.HEAN_ART && window.HEAN_ART.portrait(id);
    const full = window.HEAN_ART && window.HEAN_ART.full(id);
    if (bust) {
      if (full && full.src) {
        bust.src = full.src;
        bust.hidden = false;
      } else bust.hidden = true;
    }
    function drawPortrait() {
      if (portrait && window.HEAN_ART.ready(portrait)) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / portrait.naturalWidth, canvas.height / portrait.naturalHeight);
        const w = portrait.naturalWidth * scale;
        const h = portrait.naturalHeight * scale;
        ctx.drawImage(portrait, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      } else window.HEAN_CHARS.paintPortrait(canvas, id);
    }
    drawPortrait();
    if (portrait && !window.HEAN_ART.ready(portrait)) portrait.addEventListener("load", drawPortrait, { once: true });
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
    player.walk = 0;
    path = null;
    titleScreen.hidden = true;
    playScreen.hidden = false;
    document.body.classList.remove("ui-busy");
    setArea("home", 360, 820);
    resize();
    paintAvatar();
    renderHud();
    showToast("往下方的門走出去，就是小鎮。靠近人或門口，再按對話。");
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
    paintDialogArt(id);
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
    const first = !rec[currentId];
    if (pendingBest) rec[currentId] = "best";
    else if (rec[currentId] !== "best") rec[currentId] = "seen";
    if (first) {
      state.xp[role] = (state.xp[role] || 0) + 20;
      showReward(pendingBest ? "獲得獎勵：經驗 +20，答對的小鎮幣已計入" : "獲得獎勵：經驗 +20");
    }
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
    if (area !== "town") setArea("town", spot.x, spot.y + 50);
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
    if (near.facility === "bank" || near.id === "bank-counter") {
      openBank();
      return;
    }
    if (near.facility === "chest") {
      openChest(near);
      return;
    }
    openDialog(near.id);
  }

  function openChest(spot) {
    const zone = ZONES.find(function (item) { return item.name === spot.zone; });
    if (zone && levelOf() < zone.level) {
      showToast(spot.zone + "要到 Lv." + zone.level);
      return;
    }
    if (state.opened[spot.id]) {
      showToast("這個寶箱已經打開了");
      return;
    }
    state.opened[spot.id] = true;
    state.bonus = (state.bonus || 0) + 15;
    save();
    renderHud();
    showReward("獲得獎勵：小鎮幣 +15");
  }

  function fillFacility(title, nodes) {
    document.getElementById("facility-title").textContent = title;
    const body = document.getElementById("facility-body");
    body.replaceChildren();
    nodes.forEach(function (node) { body.appendChild(node); });
    document.getElementById("facility").hidden = false;
    document.body.classList.add("ui-busy");
  }

  function para(text) {
    const p = document.createElement("p");
    p.className = "body-copy";
    p.textContent = text;
    return p;
  }

  function openBank() {
    state.seenBank = true;
    save();
    const amount = document.createElement("input");
    amount.type = "number";
    amount.min = "10";
    amount.max = "200";
    amount.value = "50";
    amount.className = "chip";
    amount.setAttribute("aria-label", "存入小鎮幣");
    const put = document.createElement("button");
    put.type = "button";
    put.className = "primary";
    put.textContent = "存 7 個小鎮日（練習利率每 50 枚多 1 枚）";
    put.addEventListener("click", function () { deposit(Number(amount.value), 7, 0.02); });
    const early = document.createElement("button");
    early.type = "button";
    early.className = "ghost";
    early.textContent = "提前結束最早的一筆（只退本金）";
    early.addEventListener("click", withdrawEarly);
    const list = document.createElement("div");
    (state.deposits || []).forEach(function (item, index) {
      const left = Math.max(0, item.days - (Date.now() - item.start) / DAY_MS);
      list.appendChild(para("第 " + (index + 1) + " 筆本金 " + item.principal + "，剩下約 " + left.toFixed(1) + " 個小鎮日"));
    });
    fillFacility("銀行櫃台", [
      para("這裡只用小鎮幣練習，不能換成真實的錢，也不是任何一家銀行的存款。一個小鎮日大約三十秒，只為了讓練習看得到期滿。"),
      para("名義上多出來的枚數如果追不上物價上漲，能買到的東西仍可能變少。定存期間錢拿去不了急用，就是流動性的代價。合計上限 200 枚。提前結束只退本金，練習多給的枚數不算。期滿才把多給的枚數加進小鎮幣，那也不是真實利息。"),
      para("現在拿得到的小鎮幣：" + cashOf(role)),
      amount,
      put,
      early,
      list
    ]);
  }

  function deposit(amount, days, rate) {
    if (!amount || amount < 10) {
      showToast("至少存 10 枚小鎮幣");
      return;
    }
    const locked = (state.deposits || []).reduce(function (sum, item) { return sum + item.principal; }, 0);
    if (locked + amount > 200) {
      showToast("定存合計上限 200 枚");
      return;
    }
    if (cashOf(role) < amount) {
      showToast("拿得到的小鎮幣不夠");
      return;
    }
    state.deposits.push({ principal: amount, days: days, rate: rate, start: Date.now() });
    save();
    renderHud();
    openBank();
  }

  function withdrawEarly() {
    if (!state.deposits.length) {
      showToast("現在沒有定存");
      return;
    }
    state.deposits.shift();
    save();
    renderHud();
    showToast("已退回本金，練習用的多給枚數沒有計入");
    openBank();
  }

  function openHospital() {
    const height = document.createElement("input");
    height.type = "number";
    height.min = "100";
    height.max = "220";
    height.value = "160";
    height.className = "chip";
    height.setAttribute("aria-label", "身高公分");
    const weight = document.createElement("input");
    weight.type = "number";
    weight.min = "30";
    weight.max = "200";
    weight.value = "55";
    weight.className = "chip";
    weight.setAttribute("aria-label", "體重公斤");
    const result = para("輸入身高（公分）和體重（公斤）。");
    const calc = document.createElement("button");
    calc.type = "button";
    calc.className = "primary";
    calc.textContent = "計算 BMI";
    calc.addEventListener("click", function () {
      const meters = Number(height.value) / 100;
      const kilos = Number(weight.value);
      if (!meters || !kilos) return;
      const bmi = kilos / (meters * meters);
      let band = "多半落在常見範圍";
      if (bmi < 18.5) band = "偏低一些";
      else if (bmi >= 24) band = "偏高一些";
      result.textContent = "BMI 約 " + bmi.toFixed(1) + "，" + band + "。這只是身高體重的比值，不是診斷，也不能決定保單賠不賠。";
    });
    const go = document.createElement("button");
    go.type = "button";
    go.className = "ghost";
    go.textContent = "看醫療花費和條款怎麼對";
    go.addEventListener("click", function () {
      document.getElementById("facility").hidden = true;
      openDialog("hospital-reimburse");
    });
    fillFacility("醫院", [
      para("先算一個簡單的身高體重比值，再去看醫療契約怎麼寫花費。這裡不提供就醫建議，也不推薦任何醫療商品。"),
      height,
      weight,
      calc,
      result,
      go
    ]);
  }

  function openGarageCard() {
    const go = document.createElement("button");
    go.type = "button";
    go.className = "primary";
    go.textContent = "看強制險和任意險差在哪";
    go.addEventListener("click", function () {
      document.getElementById("facility").hidden = true;
      openDialog("garage-voluntary");
    });
    fillFacility("車行", [
      para("車行這裡先把類型分開：法定的強制責任保險著重受害人的傷害；另外的責任保險和車體損失才處理車子本身或對方的財物。這不是在推薦你買某一張產險。"),
      go
    ]);
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
    document.getElementById("btn-map").addEventListener("click", function () {
      renderMap();
    });
    document.getElementById("map-fit").addEventListener("click", function () {
      mapFit();
      paintTownMap();
    });
    (function bindTownMap() {
      const canvas = document.getElementById("town-map");
      canvas.addEventListener("pointerdown", function (e) {
        canvas.setPointerCapture(e.pointerId);
        mapPts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        mapDrag = { x: e.clientX, y: e.clientY, moved: false, geom: { x: mapGeom.x, y: mapGeom.y, scale: mapGeom.scale } };
        if (mapPts.size === 2) {
          const pts = Array.from(mapPts.values());
          mapPinch = { dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1, scale: mapGeom.scale };
        }
        e.preventDefault();
      });
      canvas.addEventListener("pointermove", function (e) {
        if (!mapPts.has(e.pointerId)) return;
        mapPts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (mapPts.size >= 2 && mapPinch) {
          const pts = Array.from(mapPts.values());
          const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
          const rect = canvas.getBoundingClientRect();
          const mx = (pts[0].x + pts[1].x) / 2 - rect.left;
          const my = (pts[0].y + pts[1].y) / 2 - rect.top;
          const next = clamp(mapPinch.scale * dist / mapPinch.dist, mapFitScale() * 0.85, 1.1);
          const wx = mapGeom.x + mx / mapGeom.scale;
          const wy = mapGeom.y + my / mapGeom.scale;
          mapGeom.scale = next;
          mapGeom.x = wx - mx / next;
          mapGeom.y = wy - my / next;
          if (mapDrag) mapDrag.moved = true;
        } else if (mapDrag) {
          const dx = e.clientX - mapDrag.x;
          const dy = e.clientY - mapDrag.y;
          if (Math.hypot(dx, dy) > 6) mapDrag.moved = true;
          mapGeom.x = mapDrag.geom.x - dx / mapGeom.scale;
          mapGeom.y = mapDrag.geom.y - dy / mapGeom.scale;
        }
        paintTownMap();
        e.preventDefault();
      });
      function endPtr(e) {
        const click = mapDrag && !mapDrag.moved && mapPts.size === 1;
        mapPts.delete(e.pointerId);
        if (mapPts.size < 2) mapPinch = null;
        if (click) mapClick(e.clientX, e.clientY);
        if (!mapPts.size) mapDrag = null;
      }
      canvas.addEventListener("pointerup", endPtr);
      canvas.addEventListener("pointercancel", endPtr);
      canvas.addEventListener("wheel", function (e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const wx = mapGeom.x + mx / mapGeom.scale;
        const wy = mapGeom.y + my / mapGeom.scale;
        const next = clamp(mapGeom.scale * (e.deltaY > 0 ? 0.9 : 1.1), mapFitScale() * 0.85, 1.1);
        mapGeom.scale = next;
        mapGeom.x = wx - mx / next;
        mapGeom.y = wy - my / next;
        paintTownMap();
      }, { passive: false });
    })();
    document.getElementById("quest-go").addEventListener("click", function () {
      const quest = currentQuest();
      if (quest && quest.building) guideTo(quest.building);
    });
    document.getElementById("facility-close").addEventListener("click", function () {
      document.getElementById("facility").hidden = true;
      if (dialog.hidden && progress.hidden) document.body.classList.remove("ui-busy");
    });
    document.getElementById("map-close").addEventListener("click", function () {
      document.getElementById("map-panel").hidden = true;
      if (dialog.hidden && progress.hidden) document.body.classList.remove("ui-busy");
    });
    document.getElementById("btn-avatar").addEventListener("click", function () {
      document.getElementById("menu-panel").hidden = false;
      document.body.classList.add("ui-busy");
    });
    document.getElementById("menu-close").addEventListener("click", function () {
      document.getElementById("menu-panel").hidden = true;
      if (dialog.hidden && progress.hidden) document.body.classList.remove("ui-busy");
    });
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
        if (!playScreen.hidden && !uiOpen()) {
          e.preventDefault();
          keys.add(k);
        }
        return;
      }
      if (e.key === "Escape") {
        if (!dialog.hidden) closeDialog(true);
        else if (!progress.hidden) closeProgress();
        else if (!document.getElementById("map-panel").hidden) document.getElementById("map-panel").hidden = true;
        else if (!document.getElementById("facility").hidden) {
          document.getElementById("facility").hidden = true;
          if (dialog.hidden && progress.hidden) document.body.classList.remove("ui-busy");
        }
        else if (!document.getElementById("menu-panel").hidden) document.getElementById("menu-panel").hidden = true;
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
      if (uiOpen()) return;
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
      walkTo(world.x, world.y);
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
      const placed = SPOTS.some(function (spot) { return spot.id === s.id; }) || BUILDINGS.some(function (b) {
        return (b.scenarios || []).indexOf(s.id) !== -1;
      });
      if (!placed) console.error("spot", s.id);
    });
  }

  validate();
  area = "town";
  buildNav();
  SPOTS.forEach(function (s) {
    if (solidAt(s.x, s.y, 6)) console.warn("blocked spot", s.id, s.x, s.y);
  });
  area = "home";
  buildNav();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { townLayer = null; });
  }
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
    VERSION: VERSION,
    setArea: setArea,
    cam: function () { return { x: cam.x, y: cam.y }; },
    zoom: function () { return zoom; },
    setHour: function (hour) { hourOverride = hour; },
    pathLen: function () { return path ? path.length : 0; },
    area: function () { return area; }
  };
})();
