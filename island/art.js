/* 載入原創圖。走路表：列 down/left/right/up，欄為走路格，站立用第 2 格。
   可玩身分各有 m / f 兩套。選男用 _m，選女用 _f。 */
(function () {
  const root = "assets/";
  const pending = [];
  let total = 0;
  let finished = 0;

  function tick() {
    finished += 1;
    const bar = document.getElementById("load-bar");
    const strip = document.getElementById("load-strip");
    if (bar && total) bar.style.width = Math.min(100, Math.round(finished / total * 100)) + "%";
    if (strip && total && finished >= total) strip.hidden = true;
    if (window.HEAN_ART && window.HEAN_ART.onReady) window.HEAN_ART.onReady();
  }

  function make(file) {
    const image = new Image();
    image.decoding = "async";
    image._file = root + file;
    total += 1;
    image.addEventListener("load", tick);
    image.addEventListener("error", tick);
    return image;
  }

  function start(image) {
    if (!image || image.dataset.started) return image;
    image.dataset.started = "1";
    image.src = image._file;
    return image;
  }

  function pump() {
    const image = pending.shift();
    if (!image) return;
    start(image);
    const later = window.requestIdleCallback || function (fn) { setTimeout(fn, 80); };
    later(function () { pump(); }, { timeout: 500 });
  }

  const scenes = {
    home: make("scenes/home.webp"),
    map: make("scenes/map.webp"),
    town: make("scenes/town.webp")
  };
  start(scenes.home);
  start(scenes.map);
  pending.push(scenes.town);

  window.HEAN_ASSETS = window.HEAN_ASSETS || {};
  window.HEAN_ASSETS.scenes = scenes;
  window.HEAN_ASSETS.full = {};
  window.HEAN_ASSETS.portraits = {};

  const sheets = {};
  ["agent", "broker", "client"].forEach(function (role) {
    ["m", "f"].forEach(function (gender) {
      const id = role + "_" + gender;
      sheets[id] = make("sprites/" + id + "_walk.webp");
      window.HEAN_ASSETS.full[id] = make("characters/" + id + ".webp");
      window.HEAN_ASSETS.portraits[id] = make("portraits/" + id + ".webp");
      pending.push(sheets[id], window.HEAN_ASSETS.full[id], window.HEAN_ASSETS.portraits[id]);
    });
    const alias = role === "client" ? "_f" : "_m";
    sheets[role] = sheets[role + alias];
    window.HEAN_ASSETS.full[role] = window.HEAN_ASSETS.full[role + alias];
    window.HEAN_ASSETS.portraits[role] = window.HEAN_ASSETS.portraits[role + alias];
  });
  ["npc_grandma", "npc_mom", "npc_office", "npc_shopkeeper", "npc_grandpa"].forEach(function (id) {
    sheets[id] = make("sprites/" + id + "_walk.webp");
    window.HEAN_ASSETS.full[id] = make("characters/" + id + ".webp");
    window.HEAN_ASSETS.portraits[id] = make("portraits/" + id + ".webp");
    pending.push(sheets[id], window.HEAN_ASSETS.full[id], window.HEAN_ASSETS.portraits[id]);
  });

  const map = {
    "player-consumer": "client",
    "player-agent": "agent",
    "player-broker": "broker",
    "clinic-necessity": "npc_grandma",
    "storm-flood": "npc_grandma",
    "beneficiary-update": "npc_grandma",
    "lake-rest": "npc_grandma",
    "care-wait": "npc_grandma",
    "home-contents": "npc_grandma",
    "free-look": "npc_mom",
    "hospital-reimburse": "npc_mom",
    "claim-docs": "npc_mom",
    "rider-ends": "npc_mom",
    "waiting-period": "npc_mom",
    "face-sign": "npc_mom",
    "no-misstate": "npc_mom",
    "no-guarantee": "npc_mom",
    "broker-scope": "npc_mom",
    "disclosure-form": "npc_grandpa",
    "park-walk": "npc_grandpa",
    "exclusion-print": "npc_grandpa",
    "trail-sign": "npc_grandpa",
    "lapse-reinstate": "npc_grandpa",
    "disability-define": "npc_grandpa",
    "pet-visit": "npc_shopkeeper",
    "garage-voluntary": "npc_shopkeeper",
    "compulsory-auto": "npc_shopkeeper",
    "liability-who": "npc_shopkeeper",
    "no-rebate": "npc_office",
    "health-blank": "npc_office",
    "bank-counter": "npc_office",
    "broker-fee": "npc_office",
    "broker-commission": "npc_office",
    "broker-conflict": "npc_office",
    "no-proxy-sign": "npc_office",
    "critical-name": "npc_office",
    "liability-cap": "npc_office",
    "complaint-path": "npc_office",
    "info-center": "npc_grandpa",
    "info-shop": "npc_shopkeeper",
    "info-zhou": "npc_mom",
    "info-wu": "npc_grandpa",
    "info-office": "npc_mom",
    "walker-1": "npc_mom",
    "walker-2": "npc_grandpa",
    "walker-3": "npc_shopkeeper"
  };

  function baseOf(role) {
    if (role === "agent") return "agent";
    if (role === "broker") return "broker";
    return "client";
  }

  function artKey(role, gender) {
    const base = baseOf(role);
    return base + (gender === "f" ? "_f" : "_m");
  }

  function keyFor(id) {
    if (String(id).indexOf("player-") === 0) {
      const who = id.slice(7);
      const gender = window.HEAN_GENDER ? window.HEAN_GENDER(who) : "m";
      return artKey(who, gender);
    }
    return map[id] || null;
  }

  function applySheets() {
    if (!window.HEAN_CHARS) return;
    Object.keys(map).forEach(function (id) {
      if (sheets[map[id]]) window.HEAN_CHARS.useImageSheet(id, sheets[map[id]]);
    });
  }
  applySheets();

  function ready(image) {
    return !!(image && image.complete && image.naturalWidth);
  }

  window.HEAN_ART = {
    map: map,
    artKey: artKey,
    ensurePlayer: function (role, gender) {
      const key = artKey(role, gender);
      start(sheets[key]);
      start(window.HEAN_ASSETS.full[key]);
      start(window.HEAN_ASSETS.portraits[key]);
      start(scenes.home);
      start(scenes.map);
      const sheet = sheets[key];
      if (window.HEAN_CHARS && sheet) window.HEAN_CHARS.useImageSheet("player-" + role, sheet);
    },
    pump: function () {
      ["client", "agent", "broker"].forEach(function (id) {
        start(window.HEAN_ASSETS.full[id]);
      });
      pump();
    },
    neededReady: function (role, gender) {
      const key = artKey(role, gender);
      return ready(scenes.home) && ready(scenes.map) && ready(sheets[key]);
    },
    artId: function (id) { return map[id] || null; },
    sheet: function (id) { return sheets[keyFor(id)] || null; },
    full: function (id) {
      const key = keyFor(id);
      return key ? window.HEAN_ASSETS.full[key] : null;
    },
    portrait: function (id) {
      const key = keyFor(id);
      return key ? window.HEAN_ASSETS.portraits[key] : null;
    },
    ready: ready,
    onReady: null
  };

  document.querySelectorAll("img[data-art]").forEach(function (img) {
    const key = img.getAttribute("data-art");
    const image = window.HEAN_ASSETS.full[key];
    if (!image) return;
    start(image);
    img.src = image._file;
    img.loading = "lazy";
    img.decoding = "async";
  });
})();
