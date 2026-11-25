(function () {
  const VERSION = "2.9";
  const UPDATED = "2026年11月25日";
  const KEY = "hean-village-v1";
  const FONT = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "WenQuanYi Micro Hei", sans-serif';
  const WORLD = { w: 2300, h: 1960 };
  const CS = 20;
  const SPEED = 100;
  const STEP = 12;
  const FOOT_Y = 296;
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
    { name: "鎮民中心", zone: "住宅區", x: 380, y: 1320, w: 220, h: 150, roof: "#c4a36a", wall: "#fffaf3", kind: "office", card: "center", scenarios: [] },
    { name: "周家", zone: "住宅區", x: 1868, y: 1148, w: 156, h: 132, roof: "#b98362", wall: "#fff8ef", kind: "house", card: "zhou", door: { x: 1946, y: 1330 }, scenarios: [] },
    { name: "吳家", zone: "住宅區", x: 2036, y: 1148, w: 148, h: 132, roof: "#c4896a", wall: "#fff6f0", kind: "house", card: "wu", door: { x: 2110, y: 1330 }, scenarios: [] },
    { name: "銀行", zone: "商店街", x: 980, y: 90, w: 210, h: 200, roof: "#8d6b45", wall: "#f7f3ea", kind: "bank", scenarios: [] },
    { name: "超商", zone: "商店街", x: 1230, y: 100, w: 180, h: 180, roof: "#d2b48a", wall: "#fffaf3", kind: "stall", card: "shop", scenarios: [] },
    { name: "車行", zone: "商店街", x: 1520, y: 70, w: 200, h: 176, roof: "#c4a36a", wall: "#f3eee6", kind: "garage", door: { x: 1620, y: 368 }, scenarios: [] },
    { name: "寵物店", zone: "商店街", x: 970, y: 590, w: 190, h: 210, roof: "#c48a6a", wall: "#fff6ea", kind: "stall", scenarios: ["pet-visit"] },
    { name: "事務所", zone: "商店街", x: 1880, y: 500, w: 176, h: 156, roof: "#b98362", wall: "#f6f1e6", kind: "office", card: "office", scenarios: ["broker-fee", "broker-commission", "broker-conflict", "broker-scope"] },
    { name: "小鎮公所", zone: "公家機關區", x: 1180, y: 500, w: 340, h: 280, roof: "#c4a36a", wall: "#f7f1e8", kind: "office", card: "hall", scenarios: [] },
    { name: "勞工服務站", zone: "公家機關區", x: 1880, y: 860, w: 176, h: 140, roof: "#c4a36a", wall: "#fffaf3", kind: "office", card: "labor", scenarios: [] },
    { name: "暖禾人壽", zone: "壽險街", x: 975, y: 900, w: 175, h: 165, roof: "#c4896a", wall: "#fff4ea", sign: "#c4896a", theme: "醫療條款", motto: "這裡常把醫療條款和收據對在一起。", kind: "office", scenarios: ["clinic-necessity", "hospital-reimburse", "claim-docs", "face-sign", "no-rebate", "health-blank"] },
    { name: "青畦人壽", zone: "壽險街", x: 1175, y: 900, w: 175, h: 165, roof: "#6e8a58", wall: "#f3f6ee", sign: "#6e8a58", theme: "重疾定義", motto: "這裡常把重疾定義和等待期攤開。", kind: "office", scenarios: ["waiting-period", "critical-name", "disclosure-form"] },
    { name: "拾穗人壽", zone: "壽險街", x: 1380, y: 900, w: 170, h: 165, roof: "#c4a36a", wall: "#fff8ee", sign: "#c4a36a", theme: "契約步驟", motto: "這裡常把契撤、受益人、停效的步驟說完。", kind: "office", scenarios: ["free-look", "beneficiary-update", "lapse-reinstate", "rider-ends"] },
    { name: "暮嵐人壽", zone: "壽險街", x: 1575, y: 900, w: 165, h: 165, roof: "#7f97a4", wall: "#f3f6f8", sign: "#7f97a4", theme: "失能定義", motto: "這裡常把失能和長期照顧的定義讀完。", kind: "office", scenarios: ["disability-define", "care-wait"] },
    { name: "石橋產物", zone: "產險街", x: 975, y: 1165, w: 175, h: 155, roof: "#8d6b45", wall: "#f6f1e6", sign: "#8d6b45", theme: "住宅範圍", motto: "這裡常把住宅火險、地震和水災分開看。", kind: "office", scenarios: ["storm-flood", "home-contents", "no-misstate", "no-guarantee", "no-proxy-sign"] },
    { name: "岸蒲產物", zone: "產險街", x: 1175, y: 1165, w: 175, h: 155, roof: "#5f7d62", wall: "#f2f6f1", sign: "#5f7d62", theme: "車險分項", motto: "這裡常把強制險、任意責任和車體分開。", kind: "office", scenarios: ["compulsory-auto", "garage-voluntary"] },
    { name: "原麓產物", zone: "產險街", x: 1380, y: 1165, w: 170, h: 155, roof: "#a67c52", wall: "#f8f3ea", sign: "#a67c52", theme: "責任範圍", motto: "這裡常先問責任險保的是誰的責任。", kind: "office", scenarios: ["liability-who", "liability-cap"] },
    { name: "澄川產物", zone: "產險街", x: 1575, y: 1165, w: 165, h: 155, roof: "#6d90a0", wall: "#f2f7f8", sign: "#6d90a0", theme: "意外定義", motto: "這裡常把意外和疾病的定義分開。", kind: "office", scenarios: ["exclusion-print", "complaint-path"] },
    { name: "醫院", zone: "醫院", x: 48, y: 1296, w: 168, h: 156, roof: "#d7e4ea", wall: "#f7fbff", kind: "clinic", scenarios: [] },
    { name: "公園亭", zone: "公園", x: 1900, y: 40, w: 200, h: 240, roof: "#7f8f78", wall: "#f7f3ea", kind: "stall", level: 3, scenarios: ["park-walk"] },
    { name: "湖畔亭", zone: "湖畔", x: 90, y: 1748, w: 130, h: 100, roof: "#7aa0b0", wall: "#f7f4ee", kind: "house", level: 5, door: { x: 420, y: 1608 }, scenarios: ["lake-rest"] },
    { name: "步道牌", zone: "山上步道", x: 1768, y: 1496, w: 52, h: 86, roof: "#8d6a45", wall: "#f6efe4", kind: "stall", level: 8, door: { x: 1660, y: 1508 }, scenarios: ["trail-sign"] }
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
  const SOLIDS = [
    { x: 1556, y: 318, w: 52, h: 28 },
    { x: 1624, y: 318, w: 52, h: 28 },
    { x: 1692, y: 318, w: 52, h: 28 },
    { x: 2060, y: 1680, w: 240, h: 280 },
    { x: 120, y: 80, w: 210, h: 16 },
    { x: 120, y: 80, w: 16, h: 160 }
  ];
  const TREE_HITS = [
    { x: 80, y: 160, r: 22 }, { x: 820, y: 180, r: 20 }, { x: 2140, y: 160, r: 22 },
    { x: 70, y: 760, r: 20 }, { x: 820, y: 820, r: 18 }, { x: 2140, y: 720, r: 20 },
    { x: 80, y: 1500, r: 20 }, { x: 860, y: 1500, r: 18 }, { x: 520, y: 1560, r: 16 },
    { x: 1680, y: 1680, r: 22 }, { x: 1860, y: 1760, r: 20 }, { x: 1500, y: 780, r: 16 }
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
    (b.scenarios || []).forEach(function (id) {
      const door = b.door || { x: b.x + b.w / 2, y: b.y + b.h + 36 };
      SPOTS.push({ id: id, x: door.x, y: door.y });
    });
  });
  SPOTS.push({ id: "bank-counter", name: "櫃台", x: 1080, y: 332, facility: "bank" });
  [
    ["chest-home-a", 520, 470, "住宅區"], ["chest-home-b", 640, 1460, "住宅區"],
    ["chest-shop-a", 1100, 470, "商店街"], ["chest-shop-b", 1400, 470, "商店街"],
    ["chest-civic-a", 1040, 820, "公家機關區"], ["chest-civic-b", 1500, 820, "公家機關區"],
    ["chest-life-a", 900, 980, "壽險街"], ["chest-life-b", 1760, 980, "壽險街"],
    ["chest-prop-a", 900, 1240, "產險街"], ["chest-prop-b", 1760, 1240, "產險街"],
    ["chest-hosp-a", 360, 1520, "醫院"], ["chest-hosp-b", 720, 1520, "醫院"],
    ["chest-park", 2060, 300, "公園"], ["chest-park-b", 1980, 220, "公園"],
    ["chest-lake", 520, 1608, "湖畔"], ["chest-lake-b", 620, 1608, "湖畔"],
    ["chest-trail", 1600, 1508, "山上步道"], ["chest-trail-b", 1540, 1460, "山上步道"]
  ].forEach(function (item) {
    SPOTS.push({ id: item[0], name: "寶箱", x: item[1], y: item[2], facility: "chest", zone: item[3] });
  });

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
  const player = { x: 400, y: 320, dir: 1, walk: 0, travel: 0, moving: false, facing: "down", vel: 0, aimX: 0, aimY: 0 };
  const walkers = [
    { id: "walker-1", name: "路人", x: 640, y: 410, min: 460, max: 860, axis: "x", dir: 1, speed: 86, travel: 0, moving: false, facing: "right", pause: 0.4, walkFor: 1.5, line: "收據先留著。實支實付還要對得上條款裡的費用，不是花多少領多少。" },
    { id: "walker-2", name: "路人", x: 1200, y: 940, min: 1000, max: 1500, axis: "x", dir: -1, speed: 80, travel: 0, moving: false, facing: "left", pause: 1.1, walkFor: 1.8, line: "強制險著重人的傷害。車子本身要看另外的契約有沒有寫。" },
    { id: "walker-3", name: "路人", x: 1300, y: 1420, min: 1100, max: 1680, axis: "x", dir: 1, speed: 84, travel: 0, moving: false, facing: "right", pause: 0.2, walkFor: 1.3, line: "受益人不會因為家裡的事自己改掉，要向公司辦變更。" },
    { id: "dog", name: "小狗", x: 1120, y: 800, min: 1000, max: 1320, axis: "x", dir: 1, speed: 34, animal: true, line: "今天摸一下就好，明天還可以再摸。" },
    { id: "cat", name: "小貓", x: 1040, y: 1120, min: 980, max: 1240, axis: "x", dir: -1, speed: 18, animal: true, line: "明天再來摸一次。" }
  ];
  const ROOM = window.HEAN_ROOMS.ROOM;
  const HOME = window.HEAN_ROOMS.HOME;
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
  let triggerArmed = false;
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

  function emptyRole() {
    return {
      bonus: 50,
      deposits: [],
      opened: {},
      seenBank: false,
      answers: {},
      petDay: "",
      daily: "",
      visits: [],
      stamps: {},
      zones: {},
      tutorial: 0
    };
  }

  function defaultState() {
    return {
      sound: false,
      music: false,
      font: "md",
      lastRole: null,
      gender: { consumer: "m", agent: "m", broker: "m" },
      progress: { consumer: {}, agent: {}, broker: {} },
      xp: { consumer: 0, agent: 0, broker: 0 },
      byRole: { consumer: emptyRole(), agent: emptyRole(), broker: emptyRole() },
      tutorialDone: false
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
        if (data.gender && (data.gender[r] === "m" || data.gender[r] === "f")) base.gender[r] = data.gender[r];
        const bag = data.byRole && data.byRole[r];
        if (bag && typeof bag === "object") base.byRole[r] = Object.assign(emptyRole(), bag);
      });
      const heir = data.lastRole && base.byRole[data.lastRole] ? data.lastRole : "consumer";
      if (typeof data.bonus === "number") base.byRole[heir].bonus = data.bonus;
      if (Array.isArray(data.deposits)) base.byRole[heir].deposits = data.deposits;
      if (data.opened && typeof data.opened === "object" && !data.opened.consumer) base.byRole[heir].opened = data.opened;
      if (typeof data.seenBank === "boolean") base.byRole[heir].seenBank = data.seenBank;
      if (data.font === "lg" || data.font === "xl" || data.font === "md") base.font = data.font;
      base.tutorialDone = !!data.tutorialDone;
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

  function bag() {
    if (!state.byRole[role]) state.byRole[role] = emptyRole();
    return state.byRole[role];
  }

  function genderOf(r) {
    const g = state.gender && state.gender[r || role];
    return g === "f" ? "f" : "m";
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
      const dx = (x - 250) / 300;
      const dy = (y - 1888) / 130;
      if (y > 1740 && x < 680 && dx * dx + dy * dy < 1) return true;
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
    for (let i = 0; i < SOLIDS.length; i++) {
      const r = SOLIDS[i];
      if (x > r.x - rad && x < r.x + r.w + rad && y > r.y - rad && y < r.y + r.h + rad) return true;
    }
    for (let t = 0; t < TREE_HITS.length; t++) {
      if (Math.hypot(x - TREE_HITS[t].x, y - TREE_HITS[t].y) < TREE_HITS[t].r + rad) return true;
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
        if (solidAt(x, y, 12)) blocked[r * cols + c] = 1;
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
      const list = SPOTS.filter(function (s) {
        if (s.facility === "chest") {
          const zone = ZONES.find(function (item) { return item.name === s.zone; });
          return !zone || levelOf() >= zone.level;
        }
        if (s.facility) return true;
        const sc = byId[s.id];
        return sc && sc.roles.indexOf(role) !== -1;
      });
      walkers.forEach(function (w) { list.push(w); });
      return list;
    }
    if (area === "home") {
      const screen = window.HEAN_ROOMS.homeTv;
      return [{ id: "home-tv", name: "電視", x: screen.x + screen.w / 2, y: screen.y + screen.h + 120, facility: "tv" }];
    }
    const b = BUILDINGS.find(function (item) { return item.name === roomName; });
    const ids = (b && b.scenarios ? b.scenarios : []).filter(function (id) {
      const sc = byId[id];
      return sc && sc.roles.indexOf(role) !== -1;
    });
    const spots = ids.map(function (id, index) {
      return { id: id, x: 160 + (index % 3) * 160, y: 480 + Math.floor(index / 3) * 120 };
    });
    if (b && b.card === "office" && !ids.length) spots.push({ id: "info-office", name: "櫃台", x: 150, y: 340, facility: "card" });
    if (b && b.card && b.card !== "office") spots.push({ id: "info-" + (b.card === "center" ? "center" : b.card === "shop" ? "shop" : b.card === "zhou" ? "zhou" : b.card === "wu" ? "wu" : "center"), name: "說明", x: 150, y: 340, facility: "card" });
    return spots;
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
    const landscape = viewW > viewH + 24;
    document.body.classList.toggle("landscape", landscape);
    const rotate = document.getElementById("rotate-hint");
    if (rotate) rotate.hidden = !landscape;
    zoom = area === "town" ? (landscape ? 1.05 : (viewW < 760 ? 0.82 : 0.94)) : roomZoom();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(viewW * dpr);
    canvas.height = Math.round(viewH * dpr);
  }

  function facingFromVelocity(vx, vy) {
    const ax = Math.abs(vx);
    const ay = Math.abs(vy);
    const current = player.facing || "down";
    const vertical = current === "up" || current === "down";
    if (!ax && !ay) return current;
    if (vertical && ay * 1.2 >= ax) return vy < 0 ? "up" : "down";
    if (!vertical && ax * 1.2 >= ay) return vx < 0 ? "left" : "right";
    if (ay >= ax && vy) return vy < 0 ? "up" : "down";
    if (vx) return vx < 0 ? "left" : "right";
    return current;
  }

  function gaitFrame(travel, moving) {
    if (!moving) return 1;
    return Math.floor(travel / STEP) % 4;
  }

  function tryMove(dx, dy) {
    if (!solidAt(player.x + dx, player.y, 12)) player.x += dx;
    if (!solidAt(player.x, player.y + dy, 12)) player.y += dy;
    const box = bounds();
    player.x = clamp(player.x, 24, box.w - 24);
    player.y = clamp(player.y, 24, box.h - 24);
  }

  function update(dt) {
    if (!isFinite(dt) || dt < 0) dt = 0;
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
        player.aimX = vx;
        player.aimY = vy;
      }
      const want = len > 0 ? SPEED * scale : 0;
      const ease = want > player.vel ? 8.5 : 16;
      player.vel += (want - player.vel) * Math.min(1, ease * dt);
      if (want === 0 && player.vel < 12) player.vel = 0;
      if (player.vel > 0 && (player.aimX || player.aimY)) {
        const beforeX = player.x;
        const beforeY = player.y;
        tryMove((player.aimX || 0) * player.vel * dt, (player.aimY || 0) * player.vel * dt);
        const moved = Math.hypot(player.x - beforeX, player.y - beforeY);
        player.moving = moved > 0.2;
        if (player.moving) {
          player.travel += moved;
          player.walk += dt;
          player.facing = facingFromVelocity(player.aimX || 0, player.aimY || 0);
          player.dir = player.facing === "left" ? -1 : 1;
        }
        if (player.walk > 0.35) markTutorial(0);
        if (toastEl && !toastEl.hidden && player.walk > 0.4) hideToast();
      } else {
        player.walk = 0;
        player.moving = false;
      }
    }
    const worldW = viewW / zoom;
    const worldH = viewH / zoom;
    const box = bounds();
    const pad = playPad();
    const focusX = viewW / 2;
    const focusY = pad.top + Math.max(80, viewH - pad.top - pad.bottom) / 2;
    if (area === "town") {
      cam.x = camFocus(player.x, focusX, viewW, box.w);
      cam.y = camFocus(player.y, focusY, viewH, box.h);
    } else if ((area === "home" || area === "room") && viewW < 760) {
      const pad = roomPad();
      const drawnH = box.h * zoom;
      const pinned = viewH - pad.bottom - drawnH;
      if (pinned >= pad.top) {
        cam.x = 0;
        cam.y = -pinned / zoom;
      } else {
        const focus = (pad.top + viewH - pad.bottom) / 2;
        let cy = player.y - focus / zoom;
        const minCam = -pad.top / zoom;
        const maxCam = box.h - (viewH - pad.bottom) / zoom;
        cy = minCam <= maxCam ? clamp(cy, minCam, maxCam) : clamp(cy, maxCam, minCam);
        cam.x = 0;
        cam.y = cy;
      }
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
      noteZoneVisit();
      walkers.forEach(function (w) {
        const sheet = window.HEAN_ART && window.HEAN_ART.sheet(w.id);
        if (w.animal || !sheet || !sheet.complete || !sheet.naturalWidth) {
          w.moving = false;
          return;
        }
        if (w.pause > 0) {
          w.pause -= dt;
          w.moving = false;
          return;
        }
        const before = w[w.axis];
        w[w.axis] += w.dir * w.speed * dt;
        let turned = false;
        if (w[w.axis] < w.min || w[w.axis] > w.max) {
          w.dir *= -1;
          w[w.axis] = clamp(w[w.axis], w.min, w.max);
          turned = true;
        }
        const moved = Math.abs(w[w.axis] - before);
        w.travel += moved;
        w.moving = moved > 0.2;
        w.facing = w.axis === "y" ? (w.dir < 0 ? "up" : "down") : (w.dir < 0 ? "left" : "right");
        w.walkFor -= dt;
        if (w.walkFor <= 0 || turned) {
          w.pause = 0.7 + hash(Math.floor(time * 4), Math.floor(w.x + w.y)) * 1.5;
          w.walkFor = 0.9 + hash(Math.floor(w.y), Math.floor(time + w.x)) * 1.4;
          if (hash(Math.floor(w.x), Math.floor(time * 3)) > 0.62) w.dir *= -1;
        }
      });
    }
    const near = nearestSpot();
    if (!near) {
      nearLabel.hidden = true;
      talkBtn.disabled = true;
      talkBtn.textContent = "對話";
      talkBtn.classList.remove("ready");
      talkBtn.classList.remove("watch");
    } else {
      const sc = byId[near.id];
      const watching = near.facility === "tv";
      nearLabel.hidden = watching;
      if (!watching) nearLabel.textContent = (sc ? sc.speaker : near.name) + " · 可以互動";
      talkBtn.disabled = false;
      talkBtn.textContent = talkVerb(near);
      talkBtn.classList.toggle("ready", !watching);
      talkBtn.classList.toggle("watch", watching);
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
      window.HEAN_ROOMS.paint(pen, area === "home" ? "home" : roomKind, time);
      if (area === "home") drawHomeTv();
      if (area === "room") drawCompanyBoard();
    }
    const queue = [];
    activeSpots().forEach(function (s, i) {
      queue.push({
        y: s.y,
        draw: function () {
          if (s.animal === true && s.id === "dog") drawDog(s.x, s.y);
          else if (s.animal) drawCat(s.x, s.y);
          else if (s.facility === "chest") drawChest(s.x, s.y);
          else drawPerson(s.x, s.y, i, false, s.id);
        }
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
    if (dark > 0 && (area === "town" || area === "home")) {
      pen.fillStyle = "rgba(16, 22, 48, " + dark + ")";
      pen.fillRect(0, 0, viewW, viewH);
      pen.save();
      pen.translate(-cam.x * zoom, -cam.y * zoom);
      pen.scale(zoom, zoom);
      pen.globalCompositeOperation = "lighter";
      if (area === "town") {
        LAMPS.forEach(function (lamp) {
          const glow = pen.createRadialGradient(lamp.x, lamp.y - 10, 4, lamp.x, lamp.y - 10, 70);
          glow.addColorStop(0, "rgba(255, 214, 140, 0.9)");
          glow.addColorStop(1, "rgba(255, 214, 140, 0)");
          pen.fillStyle = glow;
          pen.beginPath();
          pen.arc(lamp.x, lamp.y - 10, 70, 0, Math.PI * 2);
          pen.fill();
        });
      } else {
        const glow = pen.createRadialGradient(610, 250, 8, 610, 250, 160);
        glow.addColorStop(0, "rgba(255, 220, 160, 0.45)");
        glow.addColorStop(1, "rgba(255, 220, 160, 0)");
        pen.fillStyle = glow;
        pen.beginPath();
        pen.arc(610, 250, 160, 0, Math.PI * 2);
        pen.fill();
      }
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
    roundRect(24, 28, ROOM.w - 48, 46, 12);
    pen.fillStyle = "rgba(255, 248, 238, 0.94)";
    pen.fill();
    pen.strokeStyle = "#c4a36a";
    pen.lineWidth = 2;
    pen.stroke();
    pen.fillStyle = "#6a4632";
    pen.font = "700 13px " + FONT;
    pen.textAlign = "left";
    pen.textBaseline = "middle";
    const motto = building.motto.length > 22 ? building.motto.slice(0, 22) + "…" : building.motto;
    pen.fillText(motto, 36, 51);
    if (lines.length) pen.fillText(lines.length + " 位可以對話", 36, 68);
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
    const walker = !isPlayer ? walkers.find(function (w) { return w.id === scenarioId; }) : null;
    const moving = !reduceMotion && (isPlayer ? player.moving : !!(walker && walker.moving));
    const facing = isPlayer ? (player.facing || "down") : (walker && walker.facing) || "down";
    const travel = isPlayer ? player.travel : (walker && walker.travel) || 0;
    const aiH = area === "town" ? 176 : 236;
    const aiW = aiH * 256 / 320;
    const aiFrame = gaitFrame(travel, moving);
    const foot = -aiH * FOOT_Y / 320;
    pen.save();
    pen.translate(x, y);
    pen.fillStyle = "rgba(48, 32, 20, 0.24)";
    pen.beginPath();
    pen.ellipse(0, 2, aiW * 0.18, 4, 0, 0, Math.PI * 2);
    pen.fill();
    if (window.HEAN_CHARS.drawSheet(pen, id, facing, aiFrame, -aiW / 2, foot, aiW, aiH)) {
      pen.restore();
      if (!isPlayer) markSpot(x, y, scenarioId);
      return;
    }
    pen.restore();
    const frame = moving ? Math.floor(travel / STEP) % 16 : 0;
    const bob = 0;
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
    if (!byId[scenarioId] && scenarioId !== "chest-park" && scenarioId !== "bank-counter" && scenarioId !== "home-tv") return;
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
    pen.fillStyle = role && bag().opened["chest-park"] ? "#a89880" : "#c4923a";
    roundRect(x - 12, y - 14, 24, 16, 3);
    pen.fill();
    pen.fillStyle = "#f3e2c4";
    pen.fillRect(x - 12, y - 8, 24, 3);
    if (!(role && bag().opened["chest-park"])) markSpot(x, y, "chest-park");
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
    const contain = Math.min(availW / box.w, availH / box.h);
    if (viewW < 760 && (area === "home" || area === "room")) return Math.min(viewW / box.w, availH / box.h);
    return contain;
  }

  function camAxis(pos, view, size) {
    if (size <= view) return (size - view) / 2;
    return clamp(pos - view / 2, 0, size - view);
  }

  function playPad() {
    const status = document.getElementById("status");
    const quest = document.getElementById("quest");
    let top = 96;
    if (status) top = Math.max(top, status.offsetTop + status.offsetHeight + 8);
    if (quest) top = Math.max(top, quest.offsetTop + quest.offsetHeight + 8);
    return { top: top, bottom: 158 };
  }

  function camFocus(pos, focus, view, size) {
    const span = view / zoom;
    let c = pos - focus / zoom;
    const minC = 0;
    const maxC = Math.max(0, size - span);
    if (minC <= maxC) return clamp(c, minC, maxC);
    return (size - span) / 2;
  }

  function clearMove() {
    keys.clear();
    joy.active = false;
    joy.dx = 0;
    joy.dy = 0;
    joy.id = null;
    player.moving = false;
    player.vel = 0;
    player.aimX = 0;
    player.aimY = 0;
    path = null;
    const knob = document.querySelector("#joystick .knob");
    if (knob) knob.style.transform = "translate(0px,0px)";
  }

  function setArea(next, x, y, kind, exit, name) {
    hideToast();
    clearMove();
    area = next;
    if (kind) roomKind = kind;
    if (exit) roomExit = exit;
    if (name) roomName = name;
    if (next === "home") roomName = "家";
    if (next === "town") roomName = "小鎮";
    player.x = x;
    player.y = y;
    triggerArmed = false;
    doorLock = 0.4;
    buildNav();
    renderHud();
    if (next === "room" && kind === "bank") openBank();
    if (next === "room" && name === "醫院") openHospital();
    if (next === "room" && name === "車行") openGarageCard();
    if (next === "room" && kind !== "bank" && name !== "醫院" && name !== "車行") maybeRoomCard(name);
    if (next === "room" || next === "home") markTutorial(1);
  }

  function townDoor(b) {
    return b.door || { x: b.x + b.w / 2, y: b.y + b.h + 18 };
  }

  function inTownDoor(b) {
    const door = townDoor(b);
    return Math.abs(player.x - door.x) < 28 && Math.abs(player.y - door.y) < 24;
  }

  function inExitZone() {
    if (area === "home") return player.y > 840 && Math.abs(player.x - HOME.w / 2) < 70;
    if (area === "room") return player.y > bounds().h - 48 && Math.abs(player.x - bounds().w / 2) < 46;
    return false;
  }

  function leaveToTown() {
    const home = BUILDINGS.find(function (b) { return b.kind === "home"; });
    const door = area === "home" && home ? townDoor(home) : roomExit;
    const x = door && door.x ? door.x : 290;
    const y = door && door.y ? door.y + 78 : 420;
    setArea("town", x, y);
  }

  function tryDoors() {
    if (area === "town") {
      const hit = BUILDINGS.find(inTownDoor);
      if (!hit) {
        triggerArmed = true;
        return;
      }
      if (!triggerArmed) return;
      if (hit.level && levelOf() < hit.level) return;
      const door = townDoor(hit);
      const goal = path && path.length ? path[path.length - 1] : null;
      const ledHere = goal && Math.hypot(goal.x - door.x, goal.y - door.y) < 48;
      if (path && path.length && !ledHere) return;
      if ((!path || !path.length) && player.moving) return;
      triggerArmed = false;
      if (hit.kind === "home") setArea("home", 582, 400);
      else setArea("room", 480, 520, hit.kind, { x: door.x, y: door.y + 78 }, hit.name);
      return;
    }
    if (!inExitZone()) {
      triggerArmed = true;
      return;
    }
    if (!triggerArmed) return;
    triggerArmed = false;
    leaveToTown();
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
    clampMap();
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
    markTutorial(3);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        const box = mapBox();
        if (box.w < 2) return;
        mapOnPlayer();
        clampMap();
        paintTownMap();
      });
    });
  }

  function clampMap() {
    const box = mapBox();
    if (box.w < 2 || mapGeom.scale <= 0) return;
    const viewWorldW = box.w / mapGeom.scale;
    const viewWorldH = box.h / mapGeom.scale;
    if (WORLD.w > viewWorldW) mapGeom.x = clamp(mapGeom.x, 0, WORLD.w - viewWorldW);
    else mapGeom.x = (WORLD.w - viewWorldW) / 2;
    if (WORLD.h > viewWorldH) mapGeom.y = clamp(mapGeom.y, 0, WORLD.h - viewWorldH);
    else mapGeom.y = (WORLD.h - viewWorldH) / 2;
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
    const labelPts = [];
    const showNames = mapGeom.scale >= 0.28;
    BUILDINGS.forEach(function (b) {
      const p = toScreen(b.x + b.w / 2, b.y + b.h / 2);
      if (p.x < -40 || p.y < -20 || p.x > box.w + 40 || p.y > box.h + 20) return;
      if (!showNames) return;
      if (labelPts.some(function (q) { return Math.hypot(q.x - p.x, q.y - p.y) < 36; })) return;
      labelPts.push(p);
      const label = b.name.replace("人壽", "").replace("產物", "");
      const tw = g.measureText(label).width + 10;
      g.fillStyle = "rgba(255, 248, 236, 0.9)";
      g.fillRect(p.x - tw / 2, p.y - 8, tw, 16);
      g.fillStyle = "#3f362e";
      g.fillText(label, p.x, p.y);
      if (b.level && level < b.level) {
        g.fillStyle = "#8a6230";
        g.fillText("Lv." + b.level + " 開放", p.x, p.y + 16);
      }
    });
    ZONES.forEach(function (zone) {
      if (level >= zone.level) return;
      const p = toScreen(zone.x + zone.w / 2, zone.y + 28);
      g.fillStyle = "#fffdf9";
      if (mapGeom.scale < 0.34) return;
      g.fillText(zone.name + " Lv." + zone.level + " 開放", p.x, p.y + 22);
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

  function xpRatio() {
    const xp = xpOf();
    let prev = 0;
    let next = LEVEL_XP[1] || 20;
    LEVEL_XP.forEach(function (need, index) {
      if (xp >= need) {
        prev = need;
        next = LEVEL_XP[index + 1] != null ? LEVEL_XP[index + 1] : need + 40;
      }
    });
    return Math.max(0, Math.min(1, (xp - prev) / (next - prev)));
  }

  function paintXp(animate) {
    const fill = document.getElementById("xp-fill");
    if (!fill) return;
    if (!animate) fill.style.transition = "none";
    fill.style.width = (xpRatio() * 100) + "%";
    if (!animate) {
      void fill.offsetWidth;
      fill.style.transition = "";
    }
  }

  function animateXp(before, after) {
    const fill = document.getElementById("xp-fill");
    if (!fill) return;
    if (after > before) {
      fill.style.width = "100%";
      setTimeout(function () {
        fill.style.transition = "none";
        fill.style.width = "0%";
        void fill.offsetWidth;
        fill.style.transition = "";
        fill.style.width = (xpRatio() * 100) + "%";
      }, 620);
      return;
    }
    paintXp(true);
  }

  function showFloater(text) {
    const el = document.getElementById("floater");
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  }

  function cashOf(r) {
    const who = r || role;
    const data = state.byRole[who] || emptyRole();
    const locked = (data.deposits || []).reduce(function (sum, item) {
      return sum + item.principal;
    }, 0);
    return Math.max(0, scoreOf(who) + (data.bonus || 0) - locked);
  }

  function currentQuest() {
    const level = role ? levelOf() : 1;
    const steps = [
      { text: "走出家門，到商店街看看", building: "銀行", spot: "bank-counter", when: function () { return area === "home"; } },
      { text: "到銀行看定存和流動性", building: "銀行", spot: "bank-counter", when: function () { return role && !bag().seenBank; } },
      { text: "到車行分清強制險和任意險", building: "車行", spot: "garage-voluntary", when: function () { return !recordOf("garage-voluntary"); } },
      { text: "到醫院看醫療花費怎麼對條款", building: "醫院", spot: "hospital-reimburse", when: function () { return !recordOf("hospital-reimburse"); } },
      { text: "到 Lv.3 後去公園亭", building: "公園亭", spot: "park-walk", when: function () { return level < 3 || !recordOf("park-walk"); } },
      { text: "到 Lv.5 後去湖畔", building: "湖畔亭", spot: "lake-rest", when: function () { return level < 5 || !recordOf("lake-rest"); } },
      { text: "到 Lv.8 後去山上步道", building: "步道牌", spot: "trail-sign", when: function () { return level < 8 || !recordOf("trail-sign"); } }
    ];
    for (let i = 0; i < steps.length; i++) if (steps[i].when()) return steps[i];
    const again = scenariosFor(role).find(function (sc) { return recordOf(sc.id) === "seen"; });
    if (again) {
      const home = BUILDINGS.find(function (b) { return (b.scenarios || []).indexOf(again.id) !== -1; });
      return { text: "再想一次：" + again.title, building: home ? home.name : "鎮民中心", spot: again.id, again: again.id };
    }
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
    const data = bag();
    if (!data.deposits || !data.deposits.length) return;
    const now = Date.now();
    const keep = [];
    let interest = 0;
    data.deposits.forEach(function (item) {
      if ((now - item.start) / DAY_MS >= item.days) interest += Math.floor(item.principal / 50);
      else keep.push(item);
    });
    if (keep.length === data.deposits.length) return;
    data.deposits = keep;
    if (interest > 0) data.bonus = (data.bonus || 0) + interest;
    save();
    renderHud();
    showReward(interest > 0 ? "練習多給 " + interest + " 枚，已加進這個身分的小鎮幣。這不是真實利息。" : "這筆未滿 50 枚，期滿沒有多給，本金已解鎖。");
  }

  function guideTo(name) {
    const building = BUILDINGS.find(function (item) { return item.name === name; });
    if (!building) return;
    if (building.level && levelOf() < building.level) {
      showToast(building.name + "要到 Lv." + building.level);
      return;
    }
    const dest = building.door || { x: building.x + building.w / 2, y: building.y + building.h + 28 };
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
    const clock = hourOverride != null
      ? String(taipeiHour()).padStart(2, "0") + ":00"
      : new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Taipei",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).format(now);
    document.getElementById("st-season").textContent = seasonName();
    document.getElementById("st-time").textContent = clock;
    document.getElementById("st-place").textContent = placeName();
    document.getElementById("st-role").textContent = ROLE_NAME[role] + " Lv." + level;
    paintXp(false);
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
    if (window.HEAN_ART && window.HEAN_ART.ensurePlayer) window.HEAN_ART.ensurePlayer(next, genderOf(next));
    const strip = document.getElementById("load-strip");
    if (strip) strip.hidden = false;
    const started = performance.now();
    (function waitArt() {
      const ready = !window.HEAN_ART || !window.HEAN_ART.neededReady || window.HEAN_ART.neededReady(next, genderOf(next));
      if (ready || performance.now() - started > 2500) enterPlay();
      else requestAnimationFrame(waitArt);
    })();
    function enterPlay() {
    if (strip) strip.hidden = true;
    save();
    player.walk = 0;
    path = null;
    titleScreen.hidden = true;
    document.getElementById("gender-pick").hidden = true;
    playScreen.hidden = false;
    document.body.classList.remove("ui-busy");
    applyFont();
    setArea("home", 582, 400);
    resize();
    paintAvatar();
    renderHud();
    paintCoach();
    showToast("往下方的門走出去，就是小鎮。這句進了小鎮就會收起來。");
    grantDaily();
    if (state.music) startMusic();
    if (window.HEAN_ART && window.HEAN_ART.pump) window.HEAN_ART.pump();
    if (!loopStarted) {
      loopStarted = true;
      let last = performance.now();
      const frame = function (now) {
        let dt = (now - last) / 1000;
        last = now;
        if (!isFinite(dt) || dt < 0) dt = 0;
        dt = Math.min(0.034, dt);
        try {
          update(dt);
          draw();
        } catch (err) {
          console.error(err);
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
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

  function talkLines(sc) {
    const sentences = String(sc.body || "").split(/(?<=。)/).map(function (s) { return s.trim(); }).filter(Boolean);
    const first = sentences[0] || sc.body;
    const rest = sentences.slice(1);
    return [{ speaker: sc.speaker, text: first }]
      .concat([{ speaker: "櫃台", text: "我在" + sc.place + "。先聽" + sc.speaker + "說完，再對條款，不先講結果。" }])
      .concat(rest.map(function (text) { return { speaker: sc.speaker, text: text }; }));
  }

  let lineList = [];
  let lineAt = 0;
  let placeOverride = "";

  function showLine() {
    const line = lineList[lineAt];
    if (!line) return;
    document.getElementById("dlg-speaker").textContent = line.speaker;
    document.getElementById("dlg-body").textContent = line.text;
    document.getElementById("dlg-prev").disabled = lineAt === 0;
    const next = document.getElementById("dlg-next");
    const last = lineAt >= lineList.length - 1;
    next.hidden = false;
    next.textContent = last ? "看看法" : "下一句";
    document.getElementById("dlg-options").hidden = !last;
  }

  function openDialog(id, placeName) {
    const sc = byId[id];
    if (!sc || sc.roles.indexOf(role) === -1) return;
    currentId = id;
    pendingBest = null;
    placeOverride = placeName || "";
    path = null;
    document.getElementById("dlg-place").textContent = placeOverride || sc.place;
    document.getElementById("dlg-title").textContent = sc.title;
    paintDialogArt(id);
    lineList = talkLines(sc);
    lineAt = 0;
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
    document.getElementById("dlg-feedback").hidden = true;
    document.getElementById("dlg-nav").hidden = false;
    showLine();
    dialog.hidden = false;
    dialog.classList.add("dock");
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
    if (first) state.xp[role] = (state.xp[role] || 0) + 20;
    bag().answers[currentId] = index;
    save();
    renderHud();
    noteStamps();
    markTutorial(2);
    document.getElementById("dlg-options").hidden = true;
    document.getElementById("dlg-nav").hidden = true;
    document.getElementById("dlg-feedback").hidden = false;
    const verdict = document.getElementById("dlg-verdict");
    verdict.textContent = pendingBest ? "這個看法比較完整" : "先把條款和事實對上";
    verdict.className = "verdict " + (pendingBest ? "best" : "miss");
    const best = sc.options.find(function (item) { return item.best; });
    document.getElementById("dlg-best").textContent = "比較站得住的方向：" + best.text;
    document.getElementById("dlg-explain").textContent = sc.explain;
    const prior = document.getElementById("dlg-prior");
    if (prior) prior.textContent = "你選過的答案：" + opt.text + (first ? "。這次記下經驗 +20。" : "。");
    const basis = document.getElementById("dlg-basis");
    if (basis) basis.textContent = basisText(sc.id);
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
    dialog.classList.remove("dock");
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
    const rolesLine = ["consumer", "agent", "broker"].map(function (r) {
      const total = scenariosFor(r).length;
      const got = Object.keys(state.progress[r] || {}).length;
      return ROLE_NAME[r].split("（")[0] + " " + got + "／" + total;
    }).join(" · ");
    document.getElementById("progress-summary").textContent =
      ROLE_NAME[role] + " · 完成 " + done + "／" + list.length + " · 分數 " + scoreOf(role) + "（答對一則 10 分）\n" + rolesLine;
    document.getElementById("progress-version").textContent = "版本 " + VERSION + " · " + UPDATED + "更新";
    const ul = document.getElementById("progress-list");
    ul.replaceChildren();
    const pass = document.createElement("li");
    pass.className = "progress-item";
    const passText = document.createElement("div");
    const stamps = bag().stamps || {};
    const stampNames = Object.keys(stamps);
    passText.textContent = stampNames.length ? "護照章：" + stampNames.join("、") : "護照章：完成一家公司的情境就蓋一章。";
    pass.appendChild(passText);
    ul.appendChild(pass);
    const groups = {};
    list.forEach(function (sc) {
      const key = sc.place || "其他";
      if (!groups[key]) groups[key] = [];
      groups[key].push(sc);
    });
    Object.keys(groups).forEach(function (place) {
      const items = groups[place];
      const head = document.createElement("li");
      head.className = "progress-item";
      const headText = document.createElement("div");
      const got = items.filter(function (sc) { return recordOf(sc.id); }).length;
      headText.textContent = place + " " + got + "／" + items.length;
      const goPlace = document.createElement("button");
      goPlace.type = "button";
      goPlace.className = "tiny";
      goPlace.textContent = "前往";
      goPlace.addEventListener("click", function () { goTo(items[0].id); });
      head.appendChild(headText);
      head.appendChild(goPlace);
      ul.appendChild(head);
      items.forEach(function (sc) { addProgressItem(ul, sc); });
    });
  }

  function addProgressItem(ul, sc) {
      const li = document.createElement("li");
      li.className = "progress-item";
      const div = document.createElement("div");
      const title = document.createElement("strong");
      const rec = recordOf(sc.id);
      const badge = document.createElement("span");
      badge.className = "badge" + (rec ? " " + rec : "");
      badge.textContent = rec === "best" ? "答對" : rec === "seen" ? "再想一次" : "未完成";
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
  }

  function openProgress() {
    markTutorial(4);
    renderProgress();
    progress.hidden = false;
    document.body.classList.add("ui-busy");
    progress.querySelector(".sheet").focus();
  }

  function closeProgress() {
    progress.hidden = true;
    if (dialog.hidden) document.body.classList.remove("ui-busy");
  }

  function buildingOf(id) {
    return BUILDINGS.find(function (b) { return (b.scenarios || []).indexOf(id) !== -1; });
  }

  function goTo(id) {
    const building = buildingOf(id);
    closeProgress();
    if (building) {
      guideTo(building.name);
      return;
    }
    const spot = SPOTS.find(function (s) { return s.id === id; });
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

  const TOWN_NEWS = [
    { title: "強制險先保人，不保你的車門", body: "法定強制責任保險著重交通事故裡受害人的傷害、失能和死亡，有項目和金額上限。對方的車、自己的車體，要各自看有沒有另外的契約。這則只把類型分開，不是在推薦某一張產險。" },
    { title: "任意責任和車體損失是另外兩件事", body: "任意責任看的是對別人的賠償責任。車體損失看的是自己的車子。兩者都不會因為已經有強制險就自動附帶。沒寫進契約的項目，就還沒有那一項約定。" },
    { title: "收到保單後，通常有十天可以撤銷", body: "人身保險契約多半給要保人一段時間重讀條款。這段期間一般從收到保單的翌日起算十天。要在期限內用書面辦，不是傳一句話就算完成。過了期限，就要看解約的約定，拿回的錢通常不一樣。" },
    { title: "文件齊了，給付期限才開始算", body: "申請保險金時，公司一般要在文件齊全後的一定天數內給付，實務上常見的是十五天。缺診斷、收據或事故說明的那段時間，通常不計入。先把缺的清單補齊，比一直催一句「怎麼還沒下來」有用。" },
    { title: "可以請求的時候起，兩年不要放著", body: "保險金的請求權有時效。從可以請求的時候起算，兩年沒有行使，權利可能消滅。日期以契約和當時法令為準。手邊有拒絕通知時，先把日期標下來。" },
    { title: "住宅火險不會自動連淹水一起保", body: "住宅火災保險保的是條款列出的火災和其他約定事故。颱風灌進家裡的水，要另外看有沒有寫颱風、洪水或水漬。沒有寫，就不要當成已經有。" },
    { title: "地震基本保險有額度，不是照市價重建", body: "住宅地震基本保險處理的是地震引起的特定住宅損失，有法令規定的金額上限，通常還有臨時住宿等分項。它不會照房屋市價整棟重置，也不處理和地震無關的淹水。" },
    { title: "實支實付先對收據，不是花多少領多少", body: "依實際花費補償的醫療契約，常有金額上限、就醫方式和除外項目。收據用來證明花了什麼，還要對得上條款裡的費用定義。對不上或超過上限的部分，不會因為有一張收據就自動給付。" },
    { title: "住院日額看的是住得符不符合定義", body: "日額通常不是把收據加總。它看這次有沒有符合條款對住院的定義，以及住了幾天。可以在門診做完的檢查，公司可能主張不算。醫師的醫囑和病歷要一起對。" },
    { title: "告知要照實寫，時間久了也不會自動消失", body: "要保時問過的病和正在吃的藥，勾了沒有，之後申請時仍可能被拿出來看。不要以為過了幾年，當初沒寫的事就不再算數。先把問卷和病歷對一下。" },
    { title: "受益人不會因為離婚就自動改掉", body: "身故受益人寫的是誰，就要向公司辦變更才會改。離婚、再婚都不會讓欄位自己換人。指定好受益人，也不等於稅的事情就不用再管。" },
    { title: "除外寫在後面，沒翻到仍然算數", body: "條款通常先寫保什麼，再寫不保什麼。沒有出現在給付範圍裡的項目，不會因為沒有逐條寫「這也不賠」就變成要賠。看的時候把定義、給付和除外放在一起。" },
    { when: "day", title: "白天出門，先記得保單放在哪裡", body: "真的要申請時，最常缺的是保單號碼和當時的條款。今天先看一眼放在哪個抽屜。這則只是整理文件的提醒，不叫你加保什麼。" },
    { when: "night", title: "夜路看腳邊，條款也看沒翻到的那頁", body: "晚上視線差，容易忽略地上的東西。保單也一樣：沒讀到的除外，不會因為天黑就消失。明天白天再把那一頁補上。" },
    { when: "rain", title: "下雨路滑，沒寫進契約的事故不會跟著變有", body: "今天小鎮在下雨。路滑要自己留神。契約沒有約定的事故，也不會因為下過雨就變成已經有保障。" },
    { title: "小鎮銀行的定存只是練習", body: "小鎮幣不能換成真實的錢。定存有上限，提前結束只退本金，期滿多給的枚數也不是真實利息。名義上多一點，若物價漲得更快，買得到的東西仍可能變少。" },
    { title: "外圍三處還沒全開", body: "公園要到 Lv.3，湖畔要到 Lv.5，山上步道要到 Lv.8。等級來自第一次完成情境。鎖住的地方，地圖上會標等級。" },
    { roles: ["consumer"], title: "給客戶：先分成人的傷害、別人的車、自己的車", body: "三件事可能對應三種契約。問的時候分開問，不要用「我有保險」一句話帶過。沒有投保的那一項，可能要自己負擔。" },
    { roles: ["agent"], title: "給業務員：除外要在說明時講出來", body: "不要用「一定賠」或貶低別家來促成。親晤和親簽沒完成，筆就停下來。健康欄由本人勾，不要代填。" },
    { roles: ["broker"], title: "給經紀人：比較條款前先說會不會拿佣金", body: "報酬怎麼算，要在服務做完之前講清楚。委託範圍不含結果保證。對不上的項目留在「條款沒寫到」那一欄，不要填成已經有。" }
  ];

  function newsPool() {
    const hour = taipeiHour();
    const night = hour >= 19 || hour < 5;
    const rain = Math.floor((time + 70) / 24) % 8 === 0;
    const list = TOWN_NEWS.filter(function (item) {
      if (item.roles && role && item.roles.indexOf(role) === -1) return false;
      if (item.when === "night" && !night) return false;
      if (item.when === "day" && night) return false;
      if (item.when === "rain" && !rain) return false;
      return true;
    });
    return list.length ? list : TOWN_NEWS.filter(function (item) { return !item.when && !item.roles; });
  }

  function positiveMod(n, m) {
    if (!m) return 0;
    const r = n % m;
    return r < 0 ? r + m : r;
  }

  function newsIndex() {
    const list = newsPool();
    if (!list.length) return 0;
    return positiveMod(Math.floor(Math.max(0, time) / 6), list.length);
  }

  function drawHomeTv() {
    const screen = window.HEAN_ROOMS.homeTv;
    const x = screen.x;
    const y = screen.y;
    const w = screen.w;
    const h = screen.h;
    const list = newsPool();
    const item = list[newsIndex()] || list[0];
    if (!item || !item.title) return;
    pen.save();
    pen.beginPath();
    pen.rect(x, y, w, h);
    pen.clip();
    const glow = 0.82 + Math.sin(time * 7) * 0.08;
    pen.fillStyle = "rgba(16, 42, 32, " + glow + ")";
    pen.fillRect(x, y, w, h);
    pen.strokeStyle = "rgba(190, 255, 210, 0.09)";
    pen.lineWidth = 1;
    for (let i = 3; i < h; i += 4) {
      pen.beginPath();
      pen.moveTo(x, y + i);
      pen.lineTo(x + w, y + i);
      pen.stroke();
    }
    pen.fillStyle = "rgba(214, 255, 220, 0.95)";
    pen.font = "700 11px " + FONT;
    pen.textAlign = "left";
    pen.textBaseline = "middle";
    pen.fillText("小鎮新聞", x + 8, y + 18);
    const line = item.title + "    ·    ";
    const shift = reduceMotion ? 0 : (time * 28) % 400;
    pen.font = "600 12px " + FONT;
    pen.fillText(line, x + 8 - shift, y + 52);
    pen.fillText(line, x + 8 - shift + pen.measureText(line).width, y + 52);
    pen.restore();
    pen.strokeStyle = "rgba(214, 255, 210, 0.35)";
    pen.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }

  function openNews() {
    const today = newsPool().filter(function (item) { return !item.roles; });
    const ideas = newsPool().filter(function (item) { return item.roles || !item.when; });
    let tab = "today";
    let index = newsIndex() % Math.max(1, today.length);
    const wrap = document.createElement("div");
    wrap.className = "news-card";
    const top = document.createElement("div");
    top.className = "news-top";
    const anchor = document.createElement("canvas");
    anchor.width = 96;
    anchor.height = 120;
    anchor.className = "news-anchor";
    paintAnchor(anchor);
    const intro = document.createElement("div");
    const live = document.createElement("span");
    live.className = "news-live";
    live.textContent = "直播";
    const lead = document.createElement("p");
    lead.className = "body-copy";
    lead.textContent = "今天的導語：這些字是小鎮自己寫的觀念提醒，不是廣告，也不保證給付。實際是否給付，以保單條款為準。";
    intro.appendChild(live);
    intro.appendChild(lead);
    top.appendChild(anchor);
    top.appendChild(intro);
    const tabs = document.createElement("div");
    tabs.className = "news-tabs";
    const tabToday = document.createElement("button");
    const tabIdeas = document.createElement("button");
    tabToday.type = "button";
    tabIdeas.type = "button";
    tabToday.textContent = "今日";
    tabIdeas.textContent = "觀念";
    tabs.appendChild(tabToday);
    tabs.appendChild(tabIdeas);
    const nav = document.createElement("div");
    nav.className = "news-nav";
    const prev = document.createElement("button");
    const next = document.createElement("button");
    const page = document.createElement("span");
    prev.type = "button";
    next.type = "button";
    prev.className = "ghost";
    next.className = "ghost";
    prev.textContent = "上一則";
    next.textContent = "下一則";
    nav.appendChild(prev);
    nav.appendChild(page);
    nav.appendChild(next);
    const listEl = document.createElement("div");
    listEl.className = "news-list";
    const detail = document.createElement("p");
    detail.className = "body-copy";
    function currentList() {
      const list = tab === "today" ? today : ideas;
      return list.length ? list : today;
    }
    function paint() {
      const list = currentList();
      index = positiveMod(index, list.length);
      const item = list[index];
      tabToday.className = tab === "today" ? "news-tab on" : "news-tab";
      tabIdeas.className = tab === "ideas" ? "news-tab on" : "news-tab";
      page.textContent = (index + 1) + " / " + list.length;
      detail.textContent = item.body;
      listEl.replaceChildren();
      list.forEach(function (entry, entryIndex) {
        const row = document.createElement("button");
        row.type = "button";
        row.className = entryIndex === index ? "news-row on" : "news-row";
        row.textContent = entry.title;
        row.addEventListener("click", function () {
          index = entryIndex;
          paint();
        });
        listEl.appendChild(row);
      });
    }
    tabToday.addEventListener("click", function () { tab = "today"; index = 0; paint(); });
    tabIdeas.addEventListener("click", function () { tab = "ideas"; index = 0; paint(); });
    prev.addEventListener("click", function () { index -= 1; paint(); });
    next.addEventListener("click", function () { index += 1; paint(); });
    paint();
    wrap.appendChild(top);
    wrap.appendChild(tabs);
    wrap.appendChild(nav);
    wrap.appendChild(detail);
    wrap.appendChild(listEl);
    fillFacility("小鎮新聞", [wrap], "關電視");
  }

  function paintAnchor(canvas) {
    const g = canvas.getContext("2d");
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = "#f3e6cf";
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = "#3f342c";
    g.beginPath();
    g.arc(48, 36, 16, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#8d5a3a";
    g.fillRect(30, 56, 36, 40);
    g.fillStyle = "#f7f1e6";
    g.fillRect(40, 64, 16, 22);
  }

  function basisText(id) {
    const known = {
      "disclosure-form": "依據：保險法第 64 條。訂約時，對保險人的書面詢問要據實說明。",
      "health-blank": "依據：保險法第 64 條。書面詢問要由本人據實勾寫。",
      "complaint-path": "依據：先向保險公司申訴，仍不服可看金融消費評議中心公開說明（https://www.foi.org.tw/）。法院不是第一步。"
    };
    if (id === "compulsory-auto" || id === "garage-voluntary") {
      return "依據：強制汽車責任保險法。強制險著重受害人的傷害、失能和死亡，有法定項目和上限。不確定的細節寫成：參考強制汽車責任保險法相關規定。";
    }
    return known[id] || "依據：參考保險法相關規定。上面的白話只幫你對條款，不代替條文。";
  }

  function talkVerb(near) {
    if (!near) return "對話";
    if (near.animal) return "摸摸";
    if (near.facility === "chest") return "查看";
    if (near.facility === "tv") return "看電視";
    if (near.facility === "card" || near.facility === "bank") return "查看";
    const building = BUILDINGS.find(function (b) {
      const door = b.door || { x: b.x + b.w / 2, y: b.y + b.h + 18 };
      return Math.hypot(door.x - player.x, door.y - player.y) < 36 && Math.hypot(near.x - door.x, near.y - door.y) < 48;
    });
    if (building && !byId[near.id]) return "進去";
    return "對話";
  }

  function maybeRoomCard(name) {
    const building = BUILDINGS.find(function (b) { return b.name === name; });
    if (!building || !building.card) return;
    if (building.card === "office" && building.scenarios.some(function (id) {
      const sc = byId[id];
      return sc && sc.roles.indexOf(role) !== -1;
    })) return;
    openRoomCard(building);
  }

  function openRoomCard(building) {
    if (building.card === "hall") return openDispute();
    if (building.card === "labor") return openLabor();
    const copy = {
      center: ["鎮民中心布告", "保單放在找得到的地方。受益人要自己向公司辦變更，家裡的事情不會自動改欄位。這裡不代辦、也不留電話。"],
      shop: ["超商櫃台", "收據先留著。依實際花費補償的契約，還要對得上條款裡的費用和上限，不是花多少領多少。"],
      zhou: ["周家", "家裡如果只有住宅火災保險，淹水不會自動算進去。有沒有颱風或洪水的約定，要看那張條款。"],
      wu: ["吳家", "要保時問到的病和正在吃的藥，要照實寫。時間久了，也不代表當初沒寫的事就不算數。"],
      office: ["事務所櫃台", "這裡談的是委託範圍和報酬怎麼算。你現在這個身分先把條款爭議帶到壽險街或產險街。經紀人收不收費，要在做事之前講清楚。"]
    };
    const item = copy[building.card] || ["說明", "這裡是小鎮自己的說明，不是哪一家公司的服務。"];
    fillFacility(item[0], [para(item[1]), para("實際是否給付，以保單條款為準。")]);
  }

  function openLabor() {
    const a = document.createElement("a");
    a.href = "https://www.bli.gov.tw/";
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "勞工保險局網站";
    const b = document.createElement("a");
    b.href = "https://www.nhi.gov.tw/";
    b.target = "_blank";
    b.rel = "noopener";
    b.textContent = "中央健康保險署網站";
    fillFacility("勞工服務站", [
      para("勞工保險有老年給付這類項目，年資和投保薪資會影響能領的方式。金額和資格會調整，以勞工保險局當時的說明為準，這裡不寫會過時的數字。"),
      a,
      para("健保就醫依身分會有部分負擔。金額以衛生福利部中央健康保險署公告為準，這裡不寫死一個數字。"),
      b,
      para("這兩張卡片是制度通則，不是投保建議，也不是給付承諾。")
    ]);
  }

  function openDispute() {
    let step = 0;
    const note = para("公司拒絕之後，先把順序走對。");
    function paint(text) { note.textContent = text; }
    function button(label, pick) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.textContent = label;
      btn.addEventListener("click", function () {
        if (pick === step) {
          step += 1;
          if (step === 1) paint("已向公司申訴。還沒有結果之前，先等書面答復，再決定下一步。");
          else if (step === 2) paint("仍不服，才向金融消費評議中心申請評議。看中心當時公開的說明：https://www.foi.org.tw/");
          else paint("訴訟不是第一步。前面兩步走完仍不服，才考慮法院。這不是法律意見。");
        } else paint("先不要跳這一步。順序是：向公司申訴，再申請評議，最後才考慮訴訟。");
      });
      return btn;
    }
    fillFacility("拒賠之後怎麼走", [
      para("這是小鎮公所的練習。不代寫狀紙，也不保證結果。"),
      note,
      button("向保險公司申訴", 0),
      button("申請評議", 1),
      button("考慮訴訟", 2)
    ]);
  }

  function petAnimal(near) {
    const today = taipeiDate();
    if (bag().petDay === today) {
      showToast(near.line + "今天已經摸過了。");
      return;
    }
    bag().petDay = today;
    bag().bonus = (bag().bonus || 0) + 3;
    save();
    renderHud();
    showReward("小鎮幣 +3");
    showToast(near.name + "讓你摸了一下。明天還可以再來。");
  }

  function talk() {
    if (uiOpen()) return;
    const near = nearestSpot();
    if (!near) {
      showToast("再靠近門口、電視或村民一點。");
      return;
    }
    if (near.animal) {
      petAnimal(near);
      return;
    }
    if (near.line && !byId[near.id]) {
      showToast(near.line);
      return;
    }
    if (near.facility === "card") {
      const building = BUILDINGS.find(function (b) { return b.name === roomName; });
      if (building) openRoomCard(building);
      return;
    }
    if (near.facility === "tv") {
      openNews();
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
    if (bag().opened[spot.id]) {
      showToast("這個寶箱已經打開了");
      return;
    }
    bag().opened[spot.id] = true;
    bag().bonus = (bag().bonus || 0) + 8;
    const before = levelOf();
    state.xp[role] = (state.xp[role] || 0) + 20;
    const after = levelOf();
    save();
    renderHud();
    animateXp(before, after);
    showFloater(after > before ? "+20 EXP\nLv." + after : "+20 EXP");
    showReward("小鎮幣 +8");
  }

  function fillFacility(title, nodes, closeLabel) {
    document.getElementById("facility-title").textContent = title;
    const body = document.getElementById("facility-body");
    body.replaceChildren();
    nodes.forEach(function (node) { body.appendChild(node); });
    const close = document.getElementById("facility-close");
    close.textContent = closeLabel || "×";
    close.setAttribute("aria-label", closeLabel || "關閉");
    close.classList.toggle("text-close", !!closeLabel);
    document.getElementById("facility").classList.toggle("news-open", !!closeLabel);
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
    bag().seenBank = true;
    save();
    renderHud();
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
    (bag().deposits || []).forEach(function (item, index) {
      const left = Math.max(0, item.days - (Date.now() - item.start) / DAY_MS);
      list.appendChild(para("第 " + (index + 1) + " 筆本金 " + item.principal + "，剩下約 " + left.toFixed(1) + " 個小鎮日"));
    });
    fillFacility("銀行櫃台", [
      para("這裡只用小鎮幣練習，不能換成真實的錢，也不是任何一家銀行的存款。一個小鎮日大約三十秒，只為了讓練習看得到期滿。"),
      para("名義上多出來的枚數如果追不上物價上漲，能買到的東西仍可能變少。定存期間錢不能拿去急用，就是流動性的代價。每滿 50 枚，期滿多給 1 枚練習幣；未滿 50 枚不會多給。合計上限 200 枚。提前結束只退本金。那不是真實利息。"),
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
    const data = bag();
    const locked = (data.deposits || []).reduce(function (sum, item) { return sum + item.principal; }, 0);
    if (locked + amount > 200) {
      showToast("定存合計上限 200 枚");
      return;
    }
    if (cashOf(role) < amount) {
      showToast("拿得到的小鎮幣不夠");
      return;
    }
    const extra = Math.floor(amount / 50);
    data.deposits.push({ principal: amount, days: days, rate: rate, start: Date.now() });
    save();
    renderHud();
    showToast(extra > 0 ? "期滿練習多給 " + extra + " 枚。這不是真實利息。" : "未滿 50 枚，期滿不會多給，只是把錢鎖住練習。");
    openBank();
  }

  function withdrawEarly() {
    const data = bag();
    if (!data.deposits.length) {
      showToast("現在沒有定存");
      return;
    }
    data.deposits.shift();
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
      const cm = Number(height.value);
      const kilos = Number(weight.value);
      if (!height.value || !weight.value || !isFinite(cm) || !isFinite(kilos)) {
        result.textContent = "請填身高和體重。";
        return;
      }
      if (cm < 100 || cm > 220 || kilos < 30 || kilos > 200) {
        result.textContent = "身高請填 100–220 公分，體重請填 30–200 公斤。";
        return;
      }
      const meters = cm / 100;
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
      const medical = ["hospital-reimburse", "clinic-necessity", "claim-docs"].filter(function (id) {
        return byId[id] && byId[id].roles.indexOf(role) !== -1;
      });
      const n = taipeiDate().split("-").reduce(function (sum, part) { return sum + Number(part); }, 0);
      openDialog(medical[n % medical.length] || "hospital-reimburse");
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
      openDialog("garage-voluntary", "車行");
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
    let pendingRole = null;
    document.querySelectorAll("[data-role]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        pendingRole = btn.getAttribute("data-role");
        document.getElementById("gender-role").textContent = ROLE_NAME[pendingRole];
        const base = pendingRole === "agent" ? "agent" : pendingRole === "broker" ? "broker" : "client";
        document.getElementById("gender-art-m").src = "assets/characters/" + base + "_m.webp?v=2.9";
        document.getElementById("gender-art-f").src = "assets/characters/" + base + "_f.webp?v=2.9";
        document.getElementById("gender-pick").hidden = false;
      });
    });
    document.querySelectorAll("[data-gender]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!pendingRole) return;
        state.gender[pendingRole] = btn.getAttribute("data-gender") === "f" ? "f" : "m";
        save();
        startRole(pendingRole);
      });
    });
    document.getElementById("btn-role").addEventListener("click", backToTitle);
    document.getElementById("btn-map").addEventListener("click", function () {
      renderMap();
    });
    document.getElementById("map-fit").addEventListener("click", function () {
      mapFit();
      paintTownMap();
    });
    document.getElementById("map-in").addEventListener("click", function () {
      mapGeom.scale = Math.min(1.1, mapGeom.scale * 1.2);
      clampMap();
      paintTownMap();
    });
    document.getElementById("map-out").addEventListener("click", function () {
      mapGeom.scale = Math.max(mapFitScale() * 0.85, mapGeom.scale / 1.2);
      clampMap();
      paintTownMap();
    });
    document.getElementById("dlg-prev").addEventListener("click", function () {
      if (lineAt > 0) lineAt -= 1;
      showLine();
    });
    document.getElementById("dlg-next").addEventListener("click", function () {
      if (lineAt < lineList.length - 1) {
        lineAt += 1;
        showLine();
      } else {
        document.getElementById("dlg-options").hidden = false;
        const first = document.querySelector("#dlg-options .option");
        if (first) first.focus();
      }
    });
    document.getElementById("coach-skip").addEventListener("click", function () {
      state.tutorialDone = true;
      save();
      paintCoach();
    });
    document.querySelectorAll("[data-font]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.font = btn.getAttribute("data-font");
        save();
        applyFont();
      });
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
      document.getElementById("facility").classList.remove("news-open");
      if (dialog.hidden && progress.hidden) document.body.classList.remove("ui-busy");
      renderHud();
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
      state.xp[role] = 0;
      state.byRole[role] = emptyRole();
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

  function taipeiDate() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(new Date());
  }

  function grantDaily() {
    const today = taipeiDate();
    const data = bag();
    if (data.daily !== today) {
      data.daily = today;
      data.bonus = (data.bonus || 0) + 20;
      data.visits = data.visits || [];
      if (data.visits[data.visits.length - 1] !== today) data.visits.push(today);
      const list = scenariosFor(role);
      const n = today.split("-").reduce(function (sum, part) { return sum + Number(part); }, 0);
      if (list.length) data.dailyId = list[n % list.length].id;
      save();
      showToast("今天第一次進來，這個身分的小鎮幣 +20。這不是真實的錢。");
    }
  }

  function noteZoneVisit() {
    ZONES.forEach(function (zone) {
      if (player.x > zone.x && player.x < zone.x + zone.w && player.y > zone.y && player.y < zone.y + zone.h && levelOf() >= zone.level) {
        bag().zones[zone.name] = true;
      }
    });
  }

  function noteStamps() {
    BUILDINGS.forEach(function (b) {
      const ids = (b.scenarios || []).filter(function (id) {
        return byId[id] && byId[id].roles.indexOf(role) !== -1;
      });
      if (ids.length && ids.every(function (id) { return recordOf(id); })) bag().stamps[b.name] = true;
    });
    const visits = bag().visits || [];
    let streak = visits.length ? 1 : 0;
    for (let i = visits.length - 1; i > 0; i--) {
      const a = new Date(visits[i - 1] + "T00:00:00+08:00").getTime();
      const b = new Date(visits[i] + "T00:00:00+08:00").getTime();
      if (Math.round((b - a) / 86400000) === 1) streak += 1;
      else break;
    }
    if (streak >= 2) bag().stamps["連續來訪"] = true;
    if (ZONES.every(function (zone) { return bag().zones[zone.name]; })) bag().stamps["外圍都走過"] = true;
  }

  function paintCoach() {
    const box = document.getElementById("coach");
    if (!box) return;
    if (state.tutorialDone) {
      box.hidden = true;
      return;
    }
    const steps = [
      "先走兩步。搖桿、方向鍵或點地面都可以。",
      "走到一扇門前面，按「進去」。",
      "聽完兩個人說話，選一個看法。",
      "打開右上角的地圖。",
      "打開頭像，看這個身分的進度。"
    ];
    const step = bag().tutorial || 0;
    if (step >= steps.length) {
      state.tutorialDone = true;
      box.hidden = true;
      save();
      return;
    }
    box.hidden = false;
    document.getElementById("coach-text").textContent = "教學 " + (step + 1) + "/5　" + steps[step];
  }

  function markTutorial(step) {
    if (state.tutorialDone || !role) return;
    if ((bag().tutorial || 0) !== step) return;
    bag().tutorial = step + 1;
    if (bag().tutorial >= 5) state.tutorialDone = true;
    save();
    paintCoach();
  }

  function applyFont() {
    document.body.classList.remove("font-lg", "font-xl");
    if (state.font === "lg") document.body.classList.add("font-lg");
    if (state.font === "xl") document.body.classList.add("font-xl");
  }

  function healSpots() {
    const prev = area;
    area = "town";
    buildNav();
    const startC = clamp(Math.round(500 / CS), 0, cols - 1);
    const startR = clamp(Math.round(400 / CS), 0, rows - 1);
    const seen = new Uint8Array(cols * rows);
    const queue = [startC + startR * cols];
    if (!blocked[queue[0]]) seen[queue[0]] = 1;
    else {
      const n = nearestOpen(startC, startR);
      if (n) {
        seen[n.c + n.r * cols] = 1;
        queue[0] = n.c + n.r * cols;
      }
    }
    for (let i = 0; i < queue.length; i++) {
      const k = queue[i];
      const c = k % cols;
      const r = (k - c) / cols;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        const nc = c + d[0];
        const nr = r + d[1];
        if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) return;
        const nk = nc + nr * cols;
        if (seen[nk] || blocked[nk]) return;
        seen[nk] = 1;
        queue.push(nk);
      });
    }
    SPOTS.forEach(function (s) {
      let c = clamp(Math.round(s.x / CS), 0, cols - 1);
      let r = clamp(Math.round(s.y / CS), 0, rows - 1);
      if (blocked[c + r * cols] || !seen[c + r * cols]) {
        let best = null;
        let bestD = Infinity;
        for (let i = 0; i < seen.length; i++) {
          if (!seen[i]) continue;
          const cc = i % cols;
          const rr = (i - cc) / cols;
          const d = Math.hypot(cc * CS - s.x, rr * CS - s.y);
          if (d < bestD) {
            bestD = d;
            best = { x: cc * CS + CS / 2, y: rr * CS + CS / 2 };
          }
        }
        if (best && bestD < 220) {
          console.warn("moved spot", s.id, s.x, s.y, best.x, best.y);
          s.x = best.x;
          s.y = best.y;
        } else console.warn("unreachable spot", s.id, s.x, s.y);
      }
    });
    area = prev;
    buildNav();
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
  healSpots();
  applyFont();
  if (window.HEAN_ART) {
    window.HEAN_ART.onReady = function () {
      if (!role) return;
      paintAvatar();
      if (currentId && dialog && !dialog.hidden) paintDialogArt(currentId);
    };
  }
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

  window.HEAN_GENDER = function (who) { return genderOf(who); };
  const debugMode = /(?:\?|&)debug(?:=|&|$)/.test(location.search);
  if (debugMode) window.__hean = {
    player: player,
    state: state,
    startRole: startRole,
    openDialog: openDialog,
    spot: function (id) { return SPOTS.find(function (s) { return s.id === id; }); },
    solidAt: solidAt,
    scenariosFor: scenariosFor,
    VERSION: VERSION,
    setArea: setArea,
    guideTo: guideTo,
    names: function () { return BUILDINGS.map(function (b) { return b.name; }); },
    place: function () { return roomName; },
    cam: function () { return { x: cam.x, y: cam.y }; },
    zoom: function () { return zoom; },
    setHour: function (hour) { hourOverride = hour; },
    pathLen: function () { return path ? path.length : 0; },
    area: function () { return area; }
  };
})();
