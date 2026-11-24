/* 載入原創圖。走路表：列 down/left/right/up，欄為走路格，站立用第 2 格。 */
(function () {
  const root = "assets/";
  function load(src) {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    return image;
  }

  const scenes = { town: null, home: null, map: null };
  scenes.home = load(root + "scenes/home.webp");
  scenes.town = load(root + "scenes/town.webp");
  window.HEAN_ASSETS = window.HEAN_ASSETS || {};
  window.HEAN_ASSETS.scenes = Object.assign(scenes, window.HEAN_ASSETS.scenes || {});
  if (!window.HEAN_ASSETS.scenes.home) window.HEAN_ASSETS.scenes.home = scenes.home;
  if (!window.HEAN_ASSETS.scenes.town) window.HEAN_ASSETS.scenes.town = scenes.town;
  if (!("map" in window.HEAN_ASSETS.scenes)) window.HEAN_ASSETS.scenes.map = null;
  window.HEAN_ASSETS.full = {};
  window.HEAN_ASSETS.portraits = {};

  const sheetIds = ["agent", "broker", "client", "npc_grandma", "npc_mom", "npc_office", "npc_shopkeeper", "npc_grandpa"];
  const sheets = {};
  sheetIds.forEach(function (id) {
    sheets[id] = load(root + "sprites/" + id + "_walk.webp");
    window.HEAN_ASSETS.full[id] = load(root + "characters/" + id + ".webp");
  });
  ["agent", "broker", "client", "npc_grandma", "npc_shopkeeper"].forEach(function (id) {
    window.HEAN_ASSETS.portraits[id] = load(root + "portraits/" + id + ".webp");
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
    "face-sign": "npc_office",
    "no-rebate": "npc_office",
    "health-blank": "npc_office",
    "bank-counter": "npc_office",
    "broker-fee": "npc_office",
    "broker-commission": "npc_office",
    "broker-conflict": "npc_office",
    "broker-scope": "npc_office",
    "no-misstate": "npc_office",
    "no-guarantee": "npc_office",
    "no-proxy-sign": "npc_office",
    "critical-name": "npc_office",
    "liability-cap": "npc_office",
    "complaint-path": "npc_office"
  };

  function applySheets() {
    if (!window.HEAN_CHARS) return;
    Object.keys(map).forEach(function (id) {
      window.HEAN_CHARS.useImageSheet(id, sheets[map[id]]);
    });
  }
  applySheets();

  function ready(image) {
    return !!(image && image.complete && image.naturalWidth);
  }

  window.HEAN_ART = {
    map: map,
    artId: function (id) { return map[id] || null; },
    sheet: function (id) { return sheets[map[id]] || null; },
    full: function (id) {
      const key = map[id];
      return key ? window.HEAN_ASSETS.full[key] : null;
    },
    portrait: function (id) {
      const key = map[id];
      return key ? window.HEAN_ASSETS.portraits[key] : null;
    },
    ready: ready
  };

  document.querySelectorAll("img[data-art]").forEach(function (img) {
    const key = img.getAttribute("data-art");
    const image = window.HEAN_ASSETS.full[key];
    if (!image) return;
    img.src = image.src;
    img.loading = "lazy";
    img.decoding = "async";
  });
})();
