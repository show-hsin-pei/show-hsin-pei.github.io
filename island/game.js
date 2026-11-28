(function () {
  const VERSION = "4.0";
  const UPDATED = "2026年11月27日";
  const SAVE_VERSION = 2;
  const PEOPLE_KEY = "hean-village-people-v1";
  const AVATAR_ORIGIN = "https://island-avatars.bn-lovestar.workers.dev";
  const AVATAR_KEYS = { agent_m: 1, agent_f: 1, broker_m: 1, broker_f: 1, client_m: 1, client_f: 1 };
  const KEY = "hean-village-v1";
  const FONT = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "WenQuanYi Micro Hei", sans-serif';
  const WORLD = { w: 3180, h: 2640 };
  const OLD_WORLD = { w: 2300, h: 1960 };
  const CS = 20;
  const SPEED = 150;
  const CHEST_WAIT = 3 * 60 * 1000;
  const CHEST_OUT = 700;
  const CHEST_IN = 650;
  const STEP = 12;
  const FOOT_Y = 296;
  const REACH = 82;

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
    { name: "我家", zone: "住宅區", x: 160, y: 40, w: 270, h: 280, roof: "#c4a36a", wall: "#fff8ef", kind: "home", art: true, door: { x: 400, y: 340 }, scenarios: [] },
    { name: "鎮民中心", zone: "住宅區", x: 380, y: 1320, w: 220, h: 150, roof: "#c4a36a", wall: "#fffaf3", kind: "office", card: "center", scenarios: [] },
    { name: "周家", zone: "住宅區", x: 1868, y: 1148, w: 156, h: 132, roof: "#b98362", wall: "#fff8ef", kind: "house", card: "zhou", door: { x: 1946, y: 1362 }, scenarios: [] },
    { name: "吳家", zone: "住宅區", x: 2036, y: 1148, w: 148, h: 132, roof: "#c4896a", wall: "#fff6f0", kind: "house", card: "wu", door: { x: 2110, y: 1362 }, scenarios: [] },
    { name: "銀行", zone: "商店街", x: 980, y: 90, w: 210, h: 200, roof: "#8d6b45", wall: "#f7f3ea", kind: "bank", scenarios: [] },
    { name: "超商", zone: "商店街", x: 1230, y: 100, w: 180, h: 180, roof: "#d2b48a", wall: "#fffaf3", kind: "stall", card: "shop", scenarios: [] },
    { name: "車行", zone: "商店街", x: 1520, y: 70, w: 200, h: 176, roof: "#c4a36a", wall: "#f3eee6", kind: "garage", door: { x: 1620, y: 368 }, scenarios: [] },
    { name: "寵物店", zone: "商店街", x: 970, y: 590, w: 190, h: 210, roof: "#c48a6a", wall: "#fff6ea", kind: "stall", level: 2, scenarios: ["pet-visit"] },
    { name: "小鎮法院", zone: "公家機關區", x: 640, y: 1288, w: 160, h: 110, roof: "#8d6b45", wall: "#f7f1e8", kind: "office", door: { x: 760, y: 1240 }, scenarios: [] },
    { name: "蘆灣港亭", zone: "蘆灣", x: 2000, y: 720, w: 180, h: 130, roof: "#6d90a0", wall: "#f2f7f8", kind: "stall", level: 6, door: { x: 2088, y: 832 }, scenarios: [] },
    { name: "事務所", zone: "商店街", x: 1880, y: 500, w: 176, h: 156, roof: "#b98362", wall: "#f6f1e6", kind: "office", card: "office", door: { x: 1988, y: 832 }, scenarios: ["broker-fee", "broker-commission", "broker-conflict", "broker-scope"] },
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
    { name: "青禾診所", zone: "醫院", x: 500, y: 520, w: 140, h: 100, roof: "#d7e4ea", wall: "#f7fbff", kind: "clinic", scenarios: [] },
    { name: "公園亭", zone: "公園", x: 1900, y: 40, w: 200, h: 240, roof: "#7f8f78", wall: "#f7f3ea", kind: "stall", level: 3, scenarios: ["park-walk"] },
    { name: "湖畔亭", zone: "湖畔", x: 90, y: 1748, w: 130, h: 100, roof: "#7aa0b0", wall: "#f7f4ee", kind: "house", level: 5, door: { x: 282, y: 1836 }, scenarios: ["lake-rest"] },
    { name: "步道牌", zone: "山上步道", x: 1768, y: 1496, w: 52, h: 86, roof: "#8d6a45", wall: "#f6efe4", kind: "stall", level: 8, door: { x: 2010, y: 1724 }, scenarios: ["trail-sign"] },
    { name: "青田穀倉", zone: "農田區", x: 2580, y: 430, w: 150, h: 110, roof: "#b98362", wall: "#fff6ea", kind: "stall", level: 5, door: { x: 2655, y: 560 } },
    { name: "青田農會", zone: "農田區", x: 2860, y: 420, w: 190, h: 120, roof: "#c4a36a", wall: "#fffaf3", kind: "office", level: 5, door: { x: 2955, y: 560 } },
    { name: "杉徑小屋", zone: "山林區", x: 2680, y: 1320, w: 130, h: 100, roof: "#6f8f62", wall: "#f6f1e6", kind: "stall", level: 8, door: { x: 2745, y: 1440 } },
    { name: "漁村棚", zone: "港口漁村", x: 1180, y: 2240, w: 160, h: 100, roof: "#6d90a0", wall: "#f4f7f8", kind: "stall", level: 12, door: { x: 1260, y: 2360 } }
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
    { name: "湖畔", level: 5, x: 40, y: 1572, w: 780, h: 360, back: { x: 560, y: 1532 }, enter: { x: 560, y: 1532 } },
    { name: "山上步道", level: 8, x: 1840, y: 1572, w: 440, h: 360, back: { x: 1600, y: 1460 } },
    { name: "蘆灣", level: 6, x: 1920, y: 640, w: 360, h: 360, back: { x: 1795, y: 700 } },
    { name: "農田區", slug: "farm", level: 5, x: 2360, y: 400, w: 760, h: 560, back: { x: 2100, y: 590 }, enter: { x: 2460, y: 590 } },
    { name: "山林區", slug: "forest", level: 8, x: 2360, y: 1240, w: 760, h: 640, back: { x: 2140, y: 1532 }, enter: { x: 2460, y: 1532 } },
    { name: "港口漁村", slug: "harbor", level: 12, x: 820, y: 2040, w: 900, h: 520, back: { x: 935, y: 1880 }, enter: { x: 1100, y: 2120 } }
  ];
  const LEVEL_XP = [0, 30, 70, 120, 180, 250, 340, 450, 580, 730, 920, 1140];
  const LEVEL_TITLE = ["新鎮民", "認得路", "會看條款", "問得出口", "走得到湖", "蘆灣開放", "客戶簿", "步道熟", "鎮裡熟", "條款熟", "田裡熟", "漁村開"];
  const LEVEL_NOTE = {
    2: "寵物店和打工開了。",
    3: "公園的霧散了。",
    5: "湖畔和農田區可以走進去。",
    6: "蘆灣港口開了，碼頭可以釣魚。",
    7: "業務員和經紀人可以用客戶簿。",
    8: "山上步道和山林區的霧散了。",
    12: "港口漁村開了。颱風日那裡的加釣會休息。"
  };
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
    ["chest-home-a", 560, 395, "住宅區"], ["chest-home-b", 700, 1532, "住宅區"],
    ["chest-shop-a", 1100, 395, "商店街"], ["chest-shop-b", 1480, 395, "商店街"],
    ["chest-civic-a", 1040, 850, "公家機關區"], ["chest-civic-b", 1600, 850, "公家機關區"],
    ["chest-life-a", 1080, 1119, "壽險街"], ["chest-life-b", 1680, 1119, "壽險街"],
    ["chest-prop-a", 1080, 1367, "產險街"], ["chest-prop-b", 1680, 1367, "產險街"],
    ["chest-hosp-a", 400, 1532, "醫院"], ["chest-hosp-b", 760, 1532, "醫院"],
    ["chest-park", 1980, 395, "公園"], ["chest-park-b", 2140, 480, "公園"],
    ["chest-lake", 360, 1532, "湖畔"], ["chest-lake-b", 760, 1532, "湖畔"],
    ["chest-trail", 1680, 1532, "山上步道"], ["chest-trail-b", 1795, 1460, "山上步道"]
  ].forEach(function (item) {
    SPOTS.push({ id: item[0], name: "寶箱", x: item[1], y: item[2], facility: "chest", zone: item[3] });
  });
  SPOTS.push({ id: "hen", name: "小雞", x: 760, y: 500, animal: true, line: "今天啄過手心了。" });
  SPOTS.push({ id: "fish-river", name: "河邊", x: 480, y: 1532, facility: "fish" });
  SPOTS.push({ id: "fish-dock", name: "碼頭", x: 2090, y: 860, facility: "fish", zone: "蘆灣" });
  [
    ["folk-he", "阿禾", 760, 395],
    ["folk-lu", "小路", 1400, 395],
    ["folk-chen", "陳阿姨", 760, 1119],
    ["folk-lin", "林先生", 1400, 1367],
    ["folk-man", "小滿", 560, 1532]
  ].forEach(function (item) {
    SPOTS.push({ id: item[0], name: item[1], x: item[2], y: item[3], facility: "meet" });
  });
  SPOTS.push({ id: "sport-corner", name: "青禾運動角", x: 775, y: 700, facility: "sport" });
  SPOTS.push({ id: "monthly-issue", name: "月刊問答", x: 560, y: 820, facility: "issue" });
  SPOTS.push({ id: "notice-board", name: "公告欄", x: 760, y: 820, facility: "notice" });
  [
    ["chest-farm", 2500, 590, "農田區"],
    ["chest-forest", 2580, 1532, "山林區"],
    ["chest-harbor", 1240, 2140, "港口漁村"]
  ].forEach(function (item) {
    SPOTS.push({ id: item[0], name: "寶箱", x: item[1], y: item[2], facility: "chest", zone: item[3] });
  });
  SPOTS.push({ id: "farm-keeper", name: "田裡阿嬤", x: 2500, y: 680, facility: "zone-talk", zone: "農田區", topic: "farm" });
  SPOTS.push({ id: "farm-clerk", name: "農會窗口", x: 2920, y: 560, facility: "zone-talk", zone: "農田區", topic: "farm2" });
  SPOTS.push({ id: "farm-harvest", name: "田裡", x: 2700, y: 680, facility: "harvest", zone: "農田區" });
  SPOTS.push({ id: "forest-guide", name: "杉徑爺爺", x: 2760, y: 1620, facility: "zone-talk", zone: "山林區", topic: "forest" });
  SPOTS.push({ id: "forest-hike", name: "步道口", x: 2920, y: 1532, facility: "hike", zone: "山林區" });
  SPOTS.push({ id: "harbor-skipper", name: "船頭", x: 1360, y: 2200, facility: "zone-talk", zone: "港口漁村", topic: "harbor" });
  SPOTS.push({ id: "harbor-aunt", name: "漁村阿姨", x: 1080, y: 2200, facility: "zone-talk", zone: "港口漁村", topic: "harbor2" });
  SPOTS.push({ id: "harbor-bonus", name: "加釣", x: 1620, y: 2140, facility: "harbor-fish", zone: "港口漁村" });
  SPOTS.push({ id: "barley-square", name: "麥穗廣場", x: 640, y: 480, facility: "draw" });
  [
    ["hospital", 320, 1460], ["hospital", 640, 1460], ["hospital", 760, 1460], ["hospital", 900, 1460], ["hospital", 1100, 1460],
    ["clinic", 320, 700], ["clinic", 400, 700], ["clinic", 760, 700], ["clinic", 900, 700], ["clinic", 1680, 700],
    ["civic", 480, 820], ["civic", 640, 820], ["civic", 760, 820], ["civic", 900, 820], ["civic", 1100, 820],
    ["life", 900, 1119], ["life", 1280, 1119], ["life", 1400, 1119], ["life", 1500, 1119], ["life", 1900, 1119],
    ["prop", 900, 1367], ["prop", 1280, 1367], ["prop", 1400, 1367], ["prop", 1600, 1367], ["prop", 1900, 1367]
  ].forEach(function (item, index) {
    SPOTS.push({ id: "quiz-" + item[0] + "-" + (index % 5), name: "居民", x: item[1], y: item[2], facility: "quiz", district: item[0], slot: index % 5 });
  });
  const CHEST_POINTS = {
    "住宅區": [{ x: 480, y: 395 }, { x: 640, y: 395 }, { x: 800, y: 395 }, { x: 560, y: 1532 }, { x: 820, y: 1532 }],
    "商店街": [{ x: 1080, y: 395 }, { x: 1280, y: 395 }, { x: 1480, y: 395 }, { x: 1680, y: 395 }],
    "公家機關區": [{ x: 980, y: 850 }, { x: 1100, y: 850 }, { x: 1480, y: 850 }, { x: 1600, y: 850 }],
    "壽險街": [{ x: 1040, y: 1119 }, { x: 1280, y: 1119 }, { x: 1500, y: 1119 }, { x: 1700, y: 1119 }],
    "產險街": [{ x: 1040, y: 1367 }, { x: 1280, y: 1367 }, { x: 1520, y: 1367 }, { x: 1700, y: 1367 }],
    "醫院": [{ x: 320, y: 1532 }, { x: 480, y: 1532 }, { x: 640, y: 1532 }, { x: 1100, y: 1532 }],
    "公園": [{ x: 1900, y: 395 }, { x: 2040, y: 395 }, { x: 2140, y: 480 }, { x: 1880, y: 480 }],
    "湖畔": [{ x: 320, y: 1532 }, { x: 480, y: 1532 }, { x: 700, y: 1532 }, { x: 1100, y: 1532 }],
    "山上步道": [{ x: 1500, y: 1532 }, { x: 1640, y: 1532 }, { x: 1795, y: 1400 }, { x: 1795, y: 1280 }],
    "農田區": [{ x: 2500, y: 590 }, { x: 2780, y: 590 }, { x: 3000, y: 590 }],
    "山林區": [{ x: 2520, y: 1532 }, { x: 2860, y: 1532 }, { x: 3040, y: 1532 }],
    "港口漁村": [{ x: 1000, y: 2140 }, { x: 1280, y: 2140 }, { x: 1500, y: 2140 }]
  };
  const SHOP_HOURS = {
    "超商": { start: 7, end: 23 },
    "車行": { start: 10, end: 19 },
    "寵物店": { start: 11, end: 20 },
    "事務所": { start: 9, end: 18, weekdays: true },
    "暖禾人壽": { start: 9, end: 17.5, weekdays: true },
    "青畦人壽": { start: 9, end: 17.5, weekdays: true },
    "拾穗人壽": { start: 9, end: 17.5, weekdays: true },
    "暮嵐人壽": { start: 9, end: 17.5, weekdays: true },
    "石橋產物": { start: 9, end: 17.5, weekdays: true },
    "岸蒲產物": { start: 9, end: 17.5, weekdays: true },
    "原麓產物": { start: 9, end: 17.5, weekdays: true },
    "澄川產物": { start: 9, end: 17.5, weekdays: true },
    "醫院": { start: 8, end: 17 },
    "青禾診所": { start: 9, end: 12, start2: 14, end2: 17.5, weekdays: true },
    "小鎮公所": { start: 8.5, end: 17.5, weekdays: true },
    "小鎮法院": { start: 9, end: 17, weekdays: true },
    "鎮民中心": { start: 8.5, end: 17, weekdays: true },
    "勞工服務站": { start: 8.5, end: 17, weekdays: true },
    "公園亭": { start: 6, end: 21 },
    "湖畔亭": { start: 8, end: 18 },
    "步道牌": { start: 7, end: 17 }
  };
  // Painted doorway in map pixels (same space as the town backdrop).
  // Interaction points in BUILDINGS.door are walking targets, not these openings.
  // 青禾診所 and 小鎮法院 have no painted door, so they get no shutter.
  const DOOR_RECTS = {
    "銀行": { x: 1048, y: 228, w: 34, h: 50 },
    "超商": { x: 1316, y: 236, w: 42, h: 52 },
    "車行": { x: 1624, y: 208, w: 24, h: 48 },
    "寵物店": { x: 1056, y: 732, w: 30, h: 44 },
    "事務所": { x: 1994, y: 738, w: 72, h: 58 },
    "蘆灣港亭": { x: 1994, y: 738, w: 72, h: 58 },
    "小鎮公所": { x: 1372, y: 724, w: 40, h: 54 },
    "勞工服務站": { x: 2006, y: 928, w: 34, h: 48 },
    "暖禾人壽": { x: 1040, y: 1052, w: 32, h: 44 },
    "青畦人壽": { x: 1242, y: 1052, w: 32, h: 44 },
    "拾穗人壽": { x: 1448, y: 1054, w: 32, h: 44 },
    "暮嵐人壽": { x: 1642, y: 1052, w: 32, h: 44 },
    "石橋產物": { x: 1032, y: 1280, w: 36, h: 52 },
    "岸蒲產物": { x: 1244, y: 1294, w: 32, h: 46 },
    "原麓產物": { x: 1454, y: 1294, w: 30, h: 46 },
    "澄川產物": { x: 1654, y: 1300, w: 32, h: 46 },
    "醫院": { x: 172, y: 1476, w: 76, h: 54 },
    "鎮民中心": { x: 490, y: 1452, w: 34, h: 52 },
    "公園亭": { x: 1988, y: 234, w: 38, h: 54 },
    "湖畔亭": { x: 240, y: 1732, w: 52, h: 52 },
    "步道牌": { x: 2050, y: 1648, w: 42, h: 24 },
    "青田穀倉": { x: 2645, y: 516, w: 20, h: 24 },
    "青田農會": { x: 2945, y: 516, w: 20, h: 24 },
    "杉徑小屋": { x: 2735, y: 1396, w: 20, h: 24 },
    "漁村棚": { x: 1250, y: 2316, w: 20, h: 24 }
  };
  // Painted footprint in map pixels. Nameplates sit above these rects, and
  // town collision uses them instead of the older BUILDINGS boxes.
  // 青禾診所 and 小鎮法院 are not painted, so they have no footprint.
  const FACADE = {
    "我家": { x: 312, y: 78, w: 168, h: 228 },
    "鎮民中心": { x: 408, y: 1328, w: 214, h: 158 },
    "周家": { x: 1884, y: 1188, w: 150, h: 140 },
    "吳家": { x: 2056, y: 1188, w: 136, h: 140 },
    "銀行": { x: 1008, y: 124, w: 160, h: 160 },
    "超商": { x: 1252, y: 132, w: 148, h: 148 },
    "車行": { x: 1552, y: 112, w: 168, h: 148 },
    "寵物店": { x: 992, y: 620, w: 156, h: 168 },
    "事務所": { x: 1936, y: 598, w: 214, h: 208 },
    "蘆灣港亭": { x: 1936, y: 598, w: 214, h: 208 },
    "小鎮公所": { x: 1212, y: 532, w: 288, h: 246 },
    "勞工服務站": { x: 1972, y: 952, w: 144, h: 124 },
    "暖禾人壽": { x: 992, y: 972, w: 144, h: 108 },
    "青畦人壽": { x: 1192, y: 972, w: 144, h: 108 },
    "拾穗人壽": { x: 1398, y: 972, w: 144, h: 108 },
    "暮嵐人壽": { x: 1592, y: 972, w: 144, h: 108 },
    "石橋產物": { x: 992, y: 1192, w: 144, h: 136 },
    "岸蒲產物": { x: 1198, y: 1200, w: 144, h: 128 },
    "原麓產物": { x: 1406, y: 1200, w: 136, h: 128 },
    "澄川產物": { x: 1606, y: 1208, w: 144, h: 120 },
    "醫院": { x: 64, y: 1308, w: 276, h: 176 },
    "公園亭": { x: 1976, y: 100, w: 164, h: 196 },
    "湖畔亭": { x: 172, y: 1664, w: 220, h: 144 },
    "步道牌": { x: 2050, y: 1642, w: 32, h: 164 },
    "青田穀倉": { x: 2580, y: 430, w: 150, h: 110 },
    "青田農會": { x: 2860, y: 420, w: 190, h: 120 },
    "杉徑小屋": { x: 2680, y: 1320, w: 130, h: 100 },
    "漁村棚": { x: 1180, y: 2240, w: 160, h: 100 }
  };
  const CAR_SOLIDS = [
    { x: 1556, y: 318, w: 52, h: 28 },
    { x: 1624, y: 318, w: 52, h: 28 },
    { x: 1692, y: 318, w: 52, h: 28 }
  ];
  const LEVEL_GO = {
    2: ["寵物店"],
    3: ["公園亭"],
    5: ["湖畔亭", "農田區"],
    6: ["蘆灣港亭"],
    8: ["步道牌", "山林區"],
    12: ["港口漁村"]
  };
  const LEVEL_TABLE = [
    { lv: 1, text: "家、商店街、銀行、醫院、公所。銀行練習櫃台整天開著。" },
    { lv: 2, text: "寵物店。業務員和經紀人可以開始客戶簿。" },
    { lv: 3, text: "公園。" },
    { lv: 5, text: "湖畔、農田區。" },
    { lv: 6, text: "蘆灣。颱風日港口會休息。" },
    { lv: 8, text: "山上步道、山林區。" },
    { lv: 12, text: "港口漁村。颱風日加釣休息。" }
  ];
  let townSeen = null;
  let forceTyphoon = null;
  let weekdayOverride = null;

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
  let minuteOverride = 0;
  let dateOverride = null;
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
      chests: {},
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
      tutorialDone: false,
      avatarPublic: false,
      avatarNick: ""
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
      base.avatarPublic = data.avatarPublic === true;
      base.avatarNick = typeof data.avatarNick === "string" ? data.avatarNick.slice(0, 12) : "";
      base.saveVersion = SAVE_VERSION;
      ["consumer", "agent", "broker"].forEach(function (r) {
        const bag = base.byRole[r];
        if (!bag.clients || typeof bag.clients !== "object" || Array.isArray(bag.clients)) bag.clients = {};
        if (!bag.approaches || typeof bag.approaches !== "object" || Array.isArray(bag.approaches)) bag.approaches = {};
        if (!bag.issueDone || typeof bag.issueDone !== "object") bag.issueDone = {};
      });
      mergePeople(base);
      return base;
    } catch (err) {
      return defaultState();
    }
  }

  function peopleSnap(source) {
    const snap = { version: 1, roles: {} };
    ["consumer", "agent", "broker"].forEach(function (r) {
      const bag = source.byRole && source.byRole[r] ? source.byRole[r] : {};
      snap.roles[r] = {
        clients: bag.clients && typeof bag.clients === "object" ? bag.clients : {},
        approaches: bag.approaches && typeof bag.approaches === "object" ? bag.approaches : {}
      };
    });
    return snap;
  }

  function mergePeople(base) {
    try {
      const raw = localStorage.getItem(PEOPLE_KEY);
      if (!raw) return;
      const snap = JSON.parse(raw);
      const roles = snap && snap.roles;
      if (!roles) return;
      ["consumer", "agent", "broker"].forEach(function (r) {
        const kept = roles[r] || {};
        const bag = base.byRole[r];
        Object.keys(kept.clients || {}).forEach(function (id) {
          if (!bag.clients[id]) bag.clients[id] = kept.clients[id];
        });
        Object.keys(kept.approaches || {}).forEach(function (id) {
          if (!bag.approaches[id]) bag.approaches[id] = kept.approaches[id];
        });
      });
    } catch (err) { /* ignore broken sidecar */ }
  }

  function save() {
    try {
      state.saveVersion = SAVE_VERSION;
      localStorage.setItem(KEY, JSON.stringify(state));
      localStorage.setItem(PEOPLE_KEY, JSON.stringify(peopleSnap(state)));
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
      if (waterAt(x, y)) return true;
      if (harborWater(x, y)) return true;
      const faces = facadeList();
      for (let i = 0; i < faces.length; i++) {
        const r = faces[i];
        if (x > r.x - rad && x < r.x + r.w + rad && y > r.y - rad && y < r.y + r.h + rad) return true;
      }
      for (let i = 0; i < CAR_SOLIDS.length; i++) {
        const r = CAR_SOLIDS[i];
        if (x > r.x - rad && x < r.x + r.w + rad && y > r.y - rad && y < r.y + r.h + rad) return true;
      }
      return false;
    }
    if (Math.hypot(x - 460, y - 1780) < 120 + rad) return true;
    if (x > WORLD.w - 70 - rad) return true;
    if (Math.hypot(x - 820, y - 640) < 22 + rad) return true;
    for (let i = 0; i < BUILDINGS.length; i++) {
      const b = BUILDINGS[i];
      if (x > b.x - rad && x < b.x + b.w + rad && y > b.y - rad && y < b.y + b.h + rad) return true;
    }
    for (let t = 0; t < TREES.length; t++) {
      if (Math.hypot(x - TREES[t].x, y - TREES[t].y) < 16 + rad) return true;
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

  let facadeCache = null;
  function facadeList() {
    if (facadeCache) return facadeCache;
    const seen = {};
    const list = [];
    Object.keys(FACADE).forEach(function (name) {
      const r = FACADE[name];
      const key = r.x + ":" + r.y + ":" + r.w + ":" + r.h;
      if (seen[key]) return;
      seen[key] = true;
      list.push(r);
    });
    facadeCache = list;
    return list;
  }

  let waterBits = null;
  let waterCW = 0;
  const WATER_CELL = 8;
  function ensureWater() {
    if (waterBits) return;
    const scenes = window.HEAN_ASSETS && window.HEAN_ASSETS.scenes;
    const map = scenes && scenes.map;
    if (!map || !map.complete || !map.naturalWidth) return;
    const cw = Math.ceil(OLD_WORLD.w / WATER_CELL);
    const ch = Math.ceil(OLD_WORLD.h / WATER_CELL);
    const c = document.createElement("canvas");
    c.width = cw;
    c.height = ch;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(map, 0, 0, cw, ch);
    const data = g.getImageData(0, 0, cw, ch).data;
    const bits = new Uint8Array(cw * ch);
    for (let i = 0; i < bits.length; i++) {
      const y = Math.floor(i / cw) * WATER_CELL;
      const x = (i % cw) * WATER_CELL;
      if (y < 1600 || x > 920) continue;
      const r = data[i * 4];
      const gg = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      if (b > 100 && b > r + 20 && gg > r + 8 && (r + gg + b) / 3 < 170) bits[i] = 1;
    }
    waterBits = bits;
    waterCW = cw;
  }

  function waterAt(x, y) {
    ensureWater();
    if (!waterBits || y < 1600 || x < 0 || x > 920 || y >= OLD_WORLD.h) return false;
    const c = Math.floor(x / WATER_CELL);
    const r = Math.floor(y / WATER_CELL);
    if (c < 0 || r < 0 || c >= waterCW) return false;
    return waterBits[r * waterCW + c] === 1;
  }

  function harborWater(x, y) {
    const hx = (x - 1400) / 240;
    const hy = (y - 2430) / 48;
    return hx * hx + hy * hy < 1;
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
        if (s.zone) {
          const gate = ZONES.find(function (item) { return item.name === s.zone; });
          if (gate && levelOf() < gate.level) return false;
        }
        if (s.facility === "chest") {
          const phase = chestPhase(s.id);
          if (phase.hidden) return false;
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
      return [
        { id: "home-tv", name: "電視", x: screen.x + screen.w / 2, y: screen.y + screen.h + 120, facility: "tv" },
        { id: "home-sleep", name: "床", x: 70, y: 530, facility: "sleep" }
      ];
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
    if (b && isWorkplace(b.name)) spots.push({ id: "punch", name: "打卡", x: 480, y: 400, facility: "punch" });
    if (b && b.name === "超商") spots.push({ id: "shop-shelf", name: "貨架", x: 220, y: 460, facility: "shop" });
    if (b && b.name === "寵物店") spots.push({ id: "pet-shelf", name: "用品", x: 220, y: 460, facility: "pet" });
    const cover = b && coverSoldHere(b.name);
    if (cover) spots.push({ id: "cover-" + cover, name: "練習保單", x: 560, y: 400, facility: "cover", cover: cover });
    if (b && (b.name === "暖禾人壽" || b.name === "石橋產物" || b.name === "澄川產物")) spots.push({ id: "hearing", name: "聽說法", x: 300, y: 520, facility: "hearing" });
    if (b && b.name === "小鎮法院") spots.push({ id: "court", name: "宣判", x: 360, y: 480, facility: "court" });
    return spots;
  }

  function reachFor(spot) {
    if (!spot) return REACH;
    if (spot.facility === "chest") return 118;
    if (spot.facility === "fish" || spot.facility === "bank") return 100;
    return REACH;
  }

  function nearestSpot() {
    const list = activeSpots();
    let best = null;
    let bestD = Infinity;
    for (let i = 0; i < list.length; i++) {
      if (list[i].facility === "chest" && chestWaiting(list[i].id)) continue;
      const limit = reachFor(list[i]);
      const d = Math.hypot(list[i].x - player.x, list[i].y - player.y);
      if (d < limit && d < bestD) {
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
    const finance = document.getElementById("finance");
    return !dialog.hidden || !progress.hidden || (mapPanel && !mapPanel.hidden) || (menuPanel && !menuPanel.hidden) || (facility && !facility.hidden) || (finance && !finance.hidden);
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
      const ease = want > player.vel ? 16 : 28;
      player.vel += (want - player.vel) * Math.min(1, ease * dt);
      if (want === 0 && player.vel < 22) player.vel = 0;
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
    stepGhosts(dt);
    if (area === "town") {
      settleChests();
      holdZones();
      settleDeposits();
      noteZoneVisit();
      refreshDailySpots();
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
    if (!near && area !== "town" && inExitZone()) {
      nearLabel.hidden = true;
      talkBtn.disabled = false;
      talkBtn.textContent = "出門";
      talkBtn.classList.add("ready");
      talkBtn.classList.remove("watch");
    } else if (!near) {
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
      drawShutters();
      drawTownMarks();
      drawLife();
      drawFog();
      if (showSolids) drawSolidOverlay();
    } else {
      window.HEAN_ROOMS.paint(pen, area === "home" ? "home" : roomKind, time);
      if (area === "home") {
        drawHomeTv();
        drawHomeStuff();
      }
      if (area === "room") drawCompanyBoard();
    }
    const queue = [];
    activeSpots().forEach(function (s, i) {
      queue.push({
        y: s.y,
        draw: function () {
          if (s.animal === true && s.id === "dog") drawDog(s.x, s.y);
          else if (s.id === "hen") drawHen(s.x, s.y);
          else if (s.facility === "fish") drawRod(s.x, s.y);
          else if (s.animal) drawCat(s.x, s.y);
          else if (s.facility === "chest") drawChest(s.x, s.y, s.id);
          else if (s.facility === "harvest") drawCrop(s.x, s.y);
          else if (s.facility === "hike") drawRod(s.x, s.y);
          else if (s.facility === "harbor-fish") drawRod(s.x, s.y);
          else drawPerson(s.x, s.y, i, false, s.id);
        }
      });
    });
    queue.push({
      y: player.y,
      draw: function () { drawPerson(player.x, player.y, 0, true); }
    });
    GHOSTS.forEach(function (ghost) {
      queue.push({
        y: ghost.y,
        draw: function () { drawOneGhost(ghost); }
      });
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

  function drawShutters() {
    const seen = {};
    BUILDINGS.forEach(function (b) {
      if (b.name === "銀行" && bankOffHours()) {
        const door = DOOR_RECTS["銀行"];
        pen.fillStyle = "rgba(255, 253, 249, 0.92)";
        pen.font = "700 13px " + FONT;
        pen.textAlign = "center";
        pen.textBaseline = "middle";
        pen.fillText("練習櫃台", door.x + door.w / 2, door.y + door.h + 14);
        return;
      }
      if (isOpen(b.name)) return;
      const rect = DOOR_RECTS[b.name];
      if (!rect) return;
      const key = rect.x + ":" + rect.y + ":" + rect.w + ":" + rect.h;
      if (seen[key]) return;
      seen[key] = true;
      drawDoorShutter(rect);
    });
  }

  function drawDoorShutter(rect) {
    const x = rect.x;
    const y = rect.y;
    const w = rect.w;
    const h = rect.h;
    pen.save();
    pen.fillStyle = "rgba(54, 58, 64, 0.94)";
    pen.fillRect(x, y, w, h);
    pen.fillStyle = "rgba(226, 230, 234, 0.92)";
    pen.fillRect(x, y, 2, h);
    pen.fillRect(x + w - 2, y, 2, h);
    pen.fillRect(x, y, w, 2);
    pen.strokeStyle = "rgba(232, 236, 240, 0.78)";
    pen.lineWidth = 1;
    const rows = Math.max(3, Math.round(h / 6));
    for (let i = 1; i < rows; i++) {
      const yy = y + (h * i) / rows;
      pen.beginPath();
      pen.moveTo(x + 2, yy);
      pen.lineTo(x + w - 2, yy);
      pen.stroke();
    }
    const label = "休息中";
    const size = Math.max(8, Math.min(12, Math.floor(Math.min(w, h) / 2.6)));
    pen.font = "700 " + size + "px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    const tw = Math.min(w - 4, pen.measureText(label).width + 8);
    const th = size + 4;
    const lx = x + w / 2 - tw / 2;
    const ly = y + h / 2 - th / 2;
    pen.fillStyle = "rgba(255, 253, 249, 0.96)";
    roundRect(lx, ly, tw, th, 3);
    pen.fill();
    pen.fillStyle = "#3f362e";
    pen.fillText(label, x + w / 2, y + h / 2);
    pen.restore();
  }

  function drawTownMarks() {
    pen.save();
    pen.fillStyle = "rgba(111, 159, 122, 0.38)";
    pen.fillRect(700, 620, 150, 90);
    pen.strokeStyle = "#fffdf9";
    pen.lineWidth = 2;
    pen.strokeRect(714, 634, 122, 62);
    pen.fillStyle = "#3f362e";
    pen.font = "700 13px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    pen.fillText("青禾運動角", 775, 665);
    pen.fillStyle = "#c4a36a";
    pen.beginPath();
    pen.arc(640, 455, 18, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#fffdf9";
    pen.font = "700 12px " + FONT;
    pen.fillText("麥穗", 640, 455);
    pen.restore();
  }

  const fogSeen = {};

  function fogAlpha(zone) {
    const open = !!(role && levelOf() >= zone.level);
    if (fogSeen[zone.name] == null) fogSeen[zone.name] = open ? 0 : 1;
    const target = open ? 0 : 1;
    fogSeen[zone.name] += (target - fogSeen[zone.name]) * 0.08;
    if (Math.abs(fogSeen[zone.name] - target) < 0.02) fogSeen[zone.name] = target;
    return fogSeen[zone.name];
  }

  function drawFog() {
    if (!role) return;
    pen.save();
    pen.font = "700 15px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    ZONES.forEach(function (zone) {
      const alpha = fogAlpha(zone);
      if (alpha > 0.04) {
        pen.fillStyle = "rgba(226, 228, 222, " + (0.55 * alpha) + ")";
        pen.fillRect(zone.x, zone.y, zone.w, zone.h);
      }
      if (alpha > 0.35 && zone.back) {
        pen.fillStyle = "#fffdf9";
        pen.fillText("Lv." + zone.level + " 解鎖", zone.back.x, zone.back.y - 28);
      }
    });
    pen.restore();
  }

  function drawNewLands(ctx) {
    const g = ctx || pen;
    g.save();
    g.fillStyle = "#d5e2b4";
    g.fillRect(2400, 430, 680, 140);
    g.fillStyle = "#e7d7bc";
    g.fillRect(2100, 560, 1020, 60);
    g.fillRect(2140, 1500, 980, 64);
    g.fillRect(900, 1820, 70, 360);
    g.fillRect(860, 2100, 820, 64);
    g.fillStyle = "#c9d7a4";
    for (let i = 0; i < 6; i++) g.fillRect(2420 + (i % 3) * 180, 440 + Math.floor(i / 3) * 60, 150, 40);
    shed(g, 2580, 430, 150, 110, "#b98362");
    shed(g, 2860, 420, 190, 120, "#c4a36a");
    g.fillStyle = "#6f8f62";
    [[2500, 1360], [2700, 1480], [2920, 1360], [3040, 1600], [2480, 1680]].forEach(function (p) {
      g.beginPath();
      g.arc(p[0], p[1], 28, 0, Math.PI * 2);
      g.fill();
    });
    shed(g, 2680, 1320, 130, 100, "#6f8f62");
    g.fillStyle = "rgba(120, 160, 176, 0.55)";
    g.beginPath();
    g.ellipse(1400, 2360, 280, 90, 0, 0, Math.PI * 2);
    g.fill();
    shed(g, 1180, 2240, 160, 100, "#6d90a0");
    g.fillStyle = "#8d6b45";
    g.fillRect(1320, 2320, 46, 10);
    g.fillRect(1500, 2300, 54, 10);
    g.restore();
  }

  function shed(ctx, x, y, w, h, roof) {
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.moveTo(x - 8, y + h * 0.42);
    ctx.lineTo(x + w * 0.5, y);
    ctx.lineTo(x + w + 8, y + h * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff8ef";
    ctx.fillRect(x, y + h * 0.4, w, h * 0.6);
    ctx.fillStyle = "#7a4e32";
    ctx.fillRect(x + w / 2 - 10, y + h - 24, 20, 24);
  }

  function drawCrop(x, y) {
    pen.fillStyle = "#6f8f62";
    pen.fillRect(x - 8, y - 16, 4, 16);
    pen.fillRect(x + 4, y - 18, 4, 18);
    pen.fillStyle = "#e6c36a";
    pen.beginPath();
    pen.ellipse(x - 6, y - 16, 5, 3, 0, 0, Math.PI * 2);
    pen.ellipse(x + 6, y - 18, 5, 3, 0, 0, Math.PI * 2);
    pen.fill();
  }

  function drawHen(x, y) {
    pen.fillStyle = "rgba(40,28,18,0.2)";
    pen.beginPath();
    pen.ellipse(x, y + 6, 10, 3, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#e6c36a";
    pen.beginPath();
    pen.ellipse(x, y, 9, 7, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#c4554a";
    pen.beginPath();
    pen.moveTo(x + 8, y);
    pen.lineTo(x + 14, y - 2);
    pen.lineTo(x + 8, y + 3);
    pen.fill();
  }

  function drawRod(x, y) {
    pen.strokeStyle = "#8d6b45";
    pen.lineWidth = 2;
    pen.beginPath();
    pen.moveTo(x - 8, y + 6);
    pen.lineTo(x + 10, y - 16);
    pen.stroke();
    pen.fillStyle = "#f7f1e6";
    pen.beginPath();
    pen.arc(x, y + 4, 5, 0, Math.PI * 2);
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

  function taipeiParts() {
    if (hourOverride != null) {
      return { hour: hourOverride, minute: minuteOverride || 0, weekday: weekdayOverride == null ? 3 : weekdayOverride };
    }
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Taipei",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    const pick = function (type) {
      const found = parts.filter(function (part) { return part.type === type; })[0];
      return found ? found.value : "";
    };
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      hour: Number(pick("hour")),
      minute: Number(pick("minute")),
      weekday: days[pick("weekday")] == null ? 0 : days[pick("weekday")]
    };
  }

  function taipeiHour() {
    return taipeiParts().hour;
  }

  function isTyphoon() {
    if (forceTyphoon != null) return !!forceTyphoon;
    const day = taipeiDate();
    let n = 0;
    for (let i = 0; i < day.length; i++) n = (n * 33 + day.charCodeAt(i)) >>> 0;
    return n % 5 === 0;
  }

  function bankOffHours() {
    const clock = taipeiParts();
    if (clock.weekday === 0 || clock.weekday === 6) return true;
    const hour = clock.hour + clock.minute / 60;
    return hour < 9 || hour >= 15.5;
  }

  function isOpen(name) {
    if (name === "銀行" || name === "我家") return true;
    if (name === "蘆灣港亭" && isTyphoon()) return false;
    const rule = SHOP_HOURS[name];
    if (!rule) return true;
    const clock = taipeiParts();
    if (rule.weekdays && (clock.weekday === 0 || clock.weekday === 6)) return false;
    const hour = clock.hour + clock.minute / 60;
    if (hour >= rule.start && hour < rule.end) return true;
    return rule.start2 != null && hour >= rule.start2 && hour < rule.end2;
  }

  function hoursLabel(name) {
    const rule = SHOP_HOURS[name];
    if (!rule) return "";
    const start = String(Math.floor(rule.start)).padStart(2, "0") + ":" + (rule.start % 1 ? "30" : "00");
    const end = String(Math.floor(rule.end)).padStart(2, "0") + ":" + (rule.end % 1 ? "30" : "00");
    const second = rule.start2 == null ? "" : "、" + String(Math.floor(rule.start2)).padStart(2, "0") + ":" + (rule.start2 % 1 ? "30" : "00") + "–" + String(Math.floor(rule.end2)).padStart(2, "0") + ":" + (rule.end2 % 1 ? "30" : "00");
    return (rule.weekdays ? "平日 " : "每天 ") + start + "–" + end + second;
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
    pen.fillStyle = "#e7d3b0";
    pen.fillRect(0, 0, WORLD.w, WORLD.h);
    if (map && map.complete && map.naturalWidth) {
      pen.drawImage(map, 0, 0, OLD_WORLD.w, OLD_WORLD.h);
      drawNewLands(pen);
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

  function labelAnchor(b) {
    const face = FACADE[b.name];
    if (!face) return null;
    const mates = [];
    Object.keys(FACADE).forEach(function (name) {
      const other = FACADE[name];
      if (other.x === face.x && other.y === face.y && other.w === face.w && other.h === face.h) mates.push(name);
    });
    mates.sort();
    const index = Math.max(0, mates.indexOf(b.name));
    return { x: face.x + face.w / 2, y: face.y - 16 - (mates.length - 1 - index) * 26 };
  }

  let showSolids = false;
  function drawSolidOverlay() {
    pen.save();
    pen.globalAlpha = 0.35;
    pen.fillStyle = "#d24b4b";
    facadeList().forEach(function (r) {
      pen.fillRect(r.x, r.y, r.w, r.h);
    });
    pen.fillStyle = "#3d6fd4";
    CAR_SOLIDS.forEach(function (r) {
      pen.fillRect(r.x, r.y, r.w, r.h);
    });
    pen.fillStyle = "#2a9bb5";
    if (waterBits) {
      for (let i = 0; i < waterBits.length; i++) {
        if (!waterBits[i]) continue;
        const x = (i % waterCW) * WATER_CELL;
        const y = Math.floor(i / waterCW) * WATER_CELL;
        pen.fillRect(x, y, WATER_CELL, WATER_CELL);
      }
    }
    const hx = 1400;
    const hy = 2430;
    pen.beginPath();
    pen.ellipse(hx, hy, 240, 48, 0, 0, Math.PI * 2);
    pen.fill();
    pen.restore();
  }

  function drawPlaceLabel(b) {
    const anchor = labelAnchor(b);
    if (!anchor) return;
    const x = anchor.x;
    const y = anchor.y;
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
    if (!isPlayer && scenarioId && String(scenarioId).indexOf("chest") === 0) {
      drawChest(x, y, scenarioId);
      return;
    }
    const id = isPlayer ? "player-" + role : scenarioId;
    const walker = !isPlayer ? walkers.find(function (w) { return w.id === scenarioId; }) : null;
    const moving = !reduceMotion && (isPlayer ? player.moving : !!(walker && walker.moving));
    const facing = isPlayer ? (player.facing || "down") : (walker && walker.facing) || "down";
    const travel = isPlayer ? player.travel : (walker && walker.travel) || 0;
    const body = 130;
    const target = area === "town" ? 110 : 124;
    const aiH = target / ((body / 320) * (zoom || 1));
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
      if (isPlayer && wearingScarf()) drawScarf(aiH);
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
    const isChest = String(scenarioId).indexOf("chest") === 0;
    if (!byId[scenarioId] && !isChest && scenarioId !== "bank-counter" && scenarioId !== "home-tv") return;
    const lift = isChest ? 40 : personTagLift();
    if (!isChest && scenarioId !== "bank-counter" && recordOf(scenarioId)) {
      drawMark(x, y - lift, recordOf(scenarioId));
      return;
    }
    pen.save();
    pen.translate(x, y - lift);
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

  function chestRec(id) {
    const data = bag();
    if (!data.chests || typeof data.chests !== "object") data.chests = {};
    if (!data.chests[id]) data.chests[id] = { until: 0, x: 0, y: 0, placed: false };
    return data.chests[id];
  }

  function chestWaiting(id) {
    if (!role) return false;
    return chestRec(id).until > Date.now();
  }

  function chestPhase(id) {
    if (!role) return { alpha: 1, scale: 1, hidden: false };
    const rec = chestRec(id);
    const now = Date.now();
    if (!rec.until || now >= rec.until) {
      if (!rec.placed) return { alpha: 1, scale: 1, hidden: false };
      const t = (now - rec.until) / CHEST_IN;
      if (t >= 1) return { alpha: 1, scale: 1, hidden: false };
      const bounce = Math.sin(Math.min(1, t) * Math.PI);
      return { alpha: Math.min(1, t * 1.6), scale: 0.7 + 0.38 * bounce, hidden: false };
    }
    const claimed = rec.until - CHEST_WAIT;
    const t = (now - claimed) / CHEST_OUT;
    if (t >= 1) return { alpha: 0, scale: 1, hidden: true };
    return { alpha: Math.max(0, 1 - t), scale: 1, hidden: false };
  }

  function chestPointOk(x, y) {
    if (solidAt(x, y, 16)) return false;
    const stands = [[0, 0], [42, 0], [-42, 0], [0, 42], [0, -42]];
    return stands.some(function (offset) {
      const sx = x + offset[0];
      const sy = y + offset[1];
      if (solidAt(sx, sy, 14)) return false;
      if (!townSeen || area !== "town") return true;
      const c = clamp(Math.round(sx / CS), 0, cols - 1);
      const r = clamp(Math.round(sy / CS), 0, rows - 1);
      return !!townSeen[c + r * cols];
    });
  }

  function pickChestPoint(spot) {
    const pool = (CHEST_POINTS[spot.zone] || [{ x: spot.x, y: spot.y }]).filter(function (p) {
      return chestPointOk(p.x, p.y) && !SPOTS.some(function (other) {
        return other.facility === "chest" && other.id !== spot.id && Math.hypot(other.x - p.x, other.y - p.y) < 70;
      });
    });
    const list = pool.length ? pool : (CHEST_POINTS[spot.zone] || []).filter(function (p) { return chestPointOk(p.x, p.y); });
    if (!list.length) return { x: spot.x, y: spot.y };
    return list[Math.floor(Math.random() * list.length)];
  }

  function settleChests() {
    if (!role) return;
    const now = Date.now();
    SPOTS.forEach(function (s) {
      if (s.facility !== "chest") return;
      const rec = chestRec(s.id);
      if (rec.x && rec.y && chestPointOk(rec.x, rec.y)) {
        s.x = rec.x;
        s.y = rec.y;
      } else if (rec.x || rec.y) {
        rec.x = s.x;
        rec.y = s.y;
        rec.placed = false;
      }
      if (rec.until && now >= rec.until && !rec.placed) {
        const p = pickChestPoint(s);
        rec.x = p.x;
        rec.y = p.y;
        rec.placed = true;
        rec.until = now;
        s.x = p.x;
        s.y = p.y;
        save();
      }
    });
  }

  function drawChest(x, y, id) {
    const phase = chestPhase(id);
    if (phase.hidden || phase.alpha <= 0) return;
    pen.save();
    pen.translate(x, y);
    pen.globalAlpha = phase.alpha;
    pen.scale(phase.scale, phase.scale);
    pen.fillStyle = "rgba(40,28,18,0.2)";
    pen.beginPath();
    pen.ellipse(0, 4, 14, 4, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#c4923a";
    roundRect(-12, -14, 24, 16, 3);
    pen.fill();
    pen.fillStyle = "#f3e2c4";
    pen.fillRect(-12, -8, 24, 3);
    pen.restore();
    if (!chestWaiting(id)) markSpot(x, y, id);
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

  function personTagLift() {
    const target = area === "town" ? 110 : 124;
    const cell = target / ((130 / 320) * (zoom || 1));
    return cell * 146 / 320;
  }

  function tagLift(s) {
    if (!s || s.animal || s.facility === "chest" || s.facility === "fish" || s.facility === "sport" || s.facility === "draw" || s.facility === "tv" || s.facility === "sleep") return 46;
    return personTagLift();
  }

  function drawLabels() {
    const near = nearestSpot();
    pen.font = "600 13px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    activeSpots().forEach(function (s) {
      const sc = byId[s.id];
      if (!sc && !s.facility && !s.name) return;
      const text = sc ? sc.speaker : (s.name || "這裡");
      const w = pen.measureText(text).width + 16;
      const x = s.x - w / 2;
      const y = s.y - tagLift(s);
      if (s.facility === "meet") {
        const tag = manageTag(s.id);
        if (tag) {
          const tw = pen.measureText(tag).width + 14;
          roundRect(s.x - tw / 2, y - 26, tw, 18, 9);
          pen.fillStyle = tag.indexOf("今天") === 0 ? "#e7c98a" : "#f3e6cf";
          pen.fill();
          pen.fillStyle = "#3f362e";
          pen.fillText(tag, s.x, y - 17);
        }
      }
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
    if (next === "home") grantPlaceXp("家");
    if (next === "room" && name) grantPlaceXp(name);
    resize();
    GHOSTS.length = 0;
    pullAvatars();
    queueAvatarPost();
  }

  function townDoor(b) {
    if (b.door) return b.door;
    const face = FACADE[b.name];
    if (face) return { x: face.x + face.w / 2, y: face.y + face.h + 22 };
    return { x: b.x + b.w / 2, y: b.y + b.h + 18 };
  }

  function inTownDoor(b) {
    if (!FACADE[b.name] && b.name !== "小鎮法院") return false;
    const door = townDoor(b);
    return Math.abs(player.x - door.x) < 48 && Math.abs(player.y - door.y) < 42;
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
        closedNote = "";
        return;
      }
      if (!triggerArmed) return;
      if (hit.level && levelOf() < hit.level) return;
      if (!isOpen(hit.name)) {
        if (closedNote !== hit.name) {
          closedNote = hit.name;
          showToast(hit.name + "休息中。" + (hoursLabel(hit.name) || "今天不開門。") + " 遊戲裡的營業時間。");
        }
        triggerArmed = false;
        return;
      }
      closedNote = "";
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
    const levels = document.getElementById("map-levels");
    if (levels) {
      levels.replaceChildren();
      const title = document.createElement("p");
      title.className = "map-level-title";
      title.textContent = "各等級解鎖表";
      levels.appendChild(title);
      LEVEL_TABLE.forEach(function (row) {
        const line = document.createElement("p");
        const here = role && levelOf() >= row.lv;
        line.textContent = "Lv." + row.lv + (here ? " 已開" : "") + "　" + row.text;
        levels.appendChild(line);
      });
    }
    const places = document.getElementById("map-places");
    if (places) {
      places.replaceChildren();
      catalogPlaces().forEach(function (place) {
        places.appendChild(button(place.name + " · 帶我去", "chip", function () {
          walkToPlace(place);
        }));
      });
    }
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
    g.fillStyle = "#e7d3b0";
    g.fillRect(0, 0, WORLD.w, WORLD.h);
    if (art && art.complete && art.naturalWidth) g.drawImage(art, 0, 0, OLD_WORLD.w, OLD_WORLD.h);
    if (art && art.complete && art.naturalWidth) drawNewLands(g);
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
      const alpha = fogAlpha(zone);
      if (alpha < 0.04) return;
      g.fillStyle = "rgba(210, 214, 208, " + (0.72 * alpha) + ")";
      g.fillRect(zone.x, zone.y, zone.w, zone.h);
      g.fillStyle = "#3f362e";
      g.font = "700 18px " + FONT;
      g.textAlign = "center";
      g.fillText(zone.name + "  Lv." + zone.level + " 解鎖", zone.x + zone.w / 2, zone.y + 36);
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
      const anchor = labelAnchor(b);
      if (!anchor) return;
      const p = toScreen(anchor.x, anchor.y);
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
      const face = FACADE[b.name];
      if (!face) return false;
      return world.x > face.x - 12 && world.x < face.x + face.w + 12 && world.y > face.y - 28 && world.y < face.y + face.h + 18;
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

  function lockedOf(who) {
    const data = state.byRole[who] || emptyRole();
    const term = (data.deposits || []).reduce(function (sum, item) {
      return sum + (item.principal || 0);
    }, 0);
    return term + (data.savings || 0);
  }

  function cashOf(r) {
    const who = r || role;
    const data = state.byRole[who] || emptyRole();
    return Math.max(0, scoreOf(who) + (data.bonus || 0) - lockedOf(who));
  }

  function stamina() {
    if (!role) return 100;
    const data = bag();
    if (data.stamina == null) data.stamina = 100;
    return data.stamina;
  }

  function spendStamina(n) {
    if (stamina() < n) {
      showToast("體力不夠。回家睡覺可以補。遊戲數字。");
      return false;
    }
    bag().stamina -= n;
    renderHud();
    return true;
  }

  function dateGap(from, to) {
    const a = new Date(from + "T00:00:00+08:00").getTime();
    const b = new Date(to + "T00:00:00+08:00").getTime();
    return Math.round((b - a) / 86400000);
  }

  function grantPlaceXp(name) {
    if (!role || !name) return;
    const data = bag();
    if (!data.places) data.places = {};
    if (data.places[name]) return;
    data.places[name] = true;
    const before = levelOf();
    state.xp[role] = (state.xp[role] || 0) + 8;
    const after = levelOf();
    save();
    renderHud();
    animateXp(before, after);
    showFloater("第一次來到" + name + "\n+8 EXP");
    if (Object.keys(data.places).length >= 5) earnBadge("places");
    if (after > before) noteLevel();
  }

  function noteLevel() {
    const lv = levelOf();
    const seen = bag().seenLevel || 1;
    if (lv <= seen) return;
    bag().seenLevel = lv;
    save();
    queueAvatarPost();
    const nodes = [
      para("稱號：" + (LEVEL_TITLE[lv - 1] || "鎮民")),
      para(LEVEL_NOTE[lv] || "經驗又多了一些。這是遊戲等級，不是證照。")
    ];
    const dests = LEVEL_GO[lv] ? (Array.isArray(LEVEL_GO[lv]) ? LEVEL_GO[lv] : [LEVEL_GO[lv]]) : [];
    dests.forEach(function (dest) {
      nodes.push(button("帶我去" + dest, "primary", function () {
        document.getElementById("facility").hidden = true;
        document.body.classList.remove("ui-busy");
        guideTo(dest);
      }));
    });
    fillFacility("升到 Lv." + lv, nodes);
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
      showToast(zone.name + " Lv." + zone.level + " 解鎖");
    }
  }

  function settleDeposits() {
    const data = bag();
    let changed = false;
    (data.deposits || []).forEach(function (item) {
      if (item.startDay == null) {
        item.startDay = data.day || 1;
        changed = true;
      }
    });
    if (changed) save();
  }

  function guideTo(name) {
    const zone = ZONES.find(function (item) { return item.name === name; });
    if (zone) {
      if (levelOf() < zone.level) {
        showToast(zone.name + "要到 Lv." + zone.level + " 解鎖");
        const door = zone.enter || zone.back;
        if (area !== "town") setArea("town", door.x, door.y);
        else path = findPath(player.x, player.y, door.x, door.y);
        document.getElementById("map-panel").hidden = true;
        document.body.classList.remove("ui-busy");
        return;
      }
      const dest = zone.enter || zone.back;
      if (area !== "town") setArea("town", zone.back.x, zone.back.y);
      path = findPath(player.x, player.y, dest.x, dest.y);
      document.getElementById("map-panel").hidden = true;
      return;
    }
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
        const face = FACADE[item.name];
        if (!face) return false;
        return x > face.x - 8 && x < face.x + face.w + 8 && y > face.y - 28 && y < face.y + face.h + 36;
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
  let closedNote = "";
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
      ? String(taipeiHour()).padStart(2, "0") + ":" + String(minuteOverride || 0).padStart(2, "0")
      : new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Taipei",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).format(now);
    document.getElementById("st-season").textContent = seasonName();
    document.getElementById("st-time").textContent = clock;
    document.getElementById("st-place").textContent = placeName();
    document.getElementById("st-role").textContent = (LEVEL_TITLE[level - 1] || "鎮民") + " Lv." + level;
    paintXp(false);
    document.getElementById("st-day").textContent = "連續 " + (bag().streak || 1) + " 天";
    document.getElementById("st-coin").textContent = "現金 " + cashOf(role);
    document.getElementById("st-save").textContent = "存款 " + lockedOf(role);
    const quest = currentQuest();
    document.getElementById("quest-text").textContent = "目標：" + quest.text;
    placeChrome();
    document.getElementById("st-stam").textContent = "體力 " + stamina() + "/100";
    const alert = document.getElementById("town-alert");
    if (alert) alert.hidden = !(area === "town" && isTyphoon());
    paintRadio();
    if (role && isTyphoon()) earnBadge("typhoon");
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
    applyLocalLevel();
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
    if (!spendStamina(6)) return;
    if (first) state.xp[role] = (state.xp[role] || 0) + 20;
    bag().answers[currentId] = index;
    save();
    renderHud();
    if (first) noteLevel();
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

  function dailyHeadlines(list) {
    const pack = list || [];
    if (!pack.length) return [];
    const n = dayNumber(taipeiDate());
    const out = [];
    for (let i = 0; i < 3; i++) out.push(pack[(n + i * 3) % pack.length]);
    return out;
  }

  function speakNews(text, rate) {
    try {
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-TW";
      utter.rate = rate || 1;
      const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      const zh = voices.filter(function (voice) { return voice.lang === "zh-TW" || voice.lang.indexOf("zh") === 0; })[0];
      if (zh) utter.voice = zh;
      window.speechSynthesis.speak(utter);
    } catch (err) { /* 沒有朗讀就安靜跳過 */ }
  }

  function openNews() {
    const issue = window.HEAN_ISSUE || {};
    const today = dailyHeadlines(issue.insuranceNews);
    const ideas = dailyHeadlines(issue.financeNews);
    let tab = "today";
    let index = 0;
    let rate = 1;
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
    tabToday.textContent = "保險新聞";
    tabIdeas.textContent = "財經快訊";
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
    const read = document.createElement("button");
    read.type = "button";
    read.className = "ghost";
    read.textContent = "朗讀";
    const speed = document.createElement("select");
    speed.setAttribute("aria-label", "朗讀速度");
    [["慢", "0.85"], ["普通", "1"], ["快", "1.2"]].forEach(function (pair) {
      const opt = document.createElement("option");
      opt.value = pair[1];
      opt.textContent = pair[0];
      if (pair[1] === "1") opt.selected = true;
      speed.appendChild(opt);
    });
    speed.addEventListener("change", function () { rate = Number(speed.value) || 1; });
    read.addEventListener("click", function () {
      const list = currentList();
      const item = list[positiveMod(index, list.length)];
      if (item) speakNews(item.title + "。" + item.body, rate);
    });
    nav.appendChild(read);
    nav.appendChild(speed);
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
      if (!item) return;
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
    if (near.facility === "sleep") return "睡覺";
    if (near.facility === "punch") return "打卡";
    if (near.facility === "shop" || near.facility === "pet") return "購買";
    if (near.facility === "cover") return "投保";
    if (near.facility === "fish") return "釣魚";
    if (near.facility === "court" || near.facility === "hearing") return "聽審";
    if (area !== "town" && inExitZone()) return "出門";
    if (near.facility === "tv") return "看電視";
    if (near.facility === "card" || near.facility === "bank") return "查看";
    if (near.facility === "meet") return (role === "agent" || role === "broker") ? "陌開" : "對話";
    if (near.facility === "sport") return "運動";
    if (near.facility === "draw") return "抽一次";
    if (near.facility === "quiz") return "聽故事";
    if (near.facility === "issue") return "月刊";
    if (near.facility === "notice") return "公告";
    if (near.facility === "harvest") return "收成";
    if (near.facility === "hike") return "走走";
    if (near.facility === "harbor-fish") return "加釣";
    if (near.facility === "zone-talk") return "聽故事";
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
    const data = bag();
    if (!data.pets) data.pets = {};
    if (data.pets[near.id] === today) {
      showToast(near.name + "今天已經摸過了。");
      return;
    }
    data.pets[near.id] = today;
    data.bonus = (data.bonus || 0) + 3;
    noteMoney("in", "摸" + near.name, 3);
    save();
    renderHud();
    showReward("小鎮幣 +3");
    showToast(near.name + "讓你摸了一下。每種一天一次。");
  }

  function talk() {
    if (uiOpen()) return;
    if (area !== "town" && inExitZone() && talkBtn.textContent === "出門") {
      leaveToTown();
      return;
    }
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
    if (near.facility === "sleep") {
      sleepNight();
      return;
    }
    if (near.facility === "punch") {
      openPunch();
      return;
    }
    if (near.facility === "shop") {
      openShop();
      return;
    }
    if (near.facility === "pet") {
      openPetShelf();
      return;
    }
    if (near.facility === "cover") {
      openCover(near.cover);
      return;
    }
    if (near.facility === "fish") {
      openFish();
      return;
    }
    if (near.facility === "hearing") {
      openHearings();
      return;
    }
    if (near.facility === "court") {
      openCourt();
      return;
    }
    if (near.facility === "client") {
      openClientTalk();
      return;
    }
    if (near.facility === "meet") {
      openMeet(near);
      return;
    }
    if (near.facility === "sport") {
      openSport();
      return;
    }
    if (near.facility === "draw") {
      openDraw();
      return;
    }
    if (near.facility === "quiz") {
      openQuiz(near);
      return;
    }
    if (near.facility === "issue") {
      openIssue();
      return;
    }
    if (near.facility === "notice") {
      openNotice();
      return;
    }
    if (near.facility === "zone-talk") {
      openZoneStory(near);
      return;
    }
    if (near.facility === "harvest") {
      openHarvest();
      return;
    }
    if (near.facility === "hike") {
      openHike();
      return;
    }
    if (near.facility === "harbor-fish") {
      openHarborFish();
      return;
    }
    if (talkBtn.textContent === "出門" && area !== "town" && inExitZone()) {
      leaveToTown();
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
    if (chestWaiting(spot.id)) return;
    const todayCount = bag().chestDay === taipeiDate() ? (bag().chestCount || 0) : 0;
    if (todayCount >= 5) {
      showToast("今天的寶箱已經開了 5 個。遊戲規則，明天再來。");
      return;
    }
    bag().chestDay = taipeiDate();
    bag().chestCount = todayCount + 1;
    const rec = chestRec(spot.id);
    rec.until = Date.now() + CHEST_WAIT;
    rec.placed = false;
    rec.x = spot.x;
    rec.y = spot.y;
    bag().bonus = (bag().bonus || 0) + 8;
    noteMoney("in", "寶箱", 8);
    const before = levelOf();
    state.xp[role] = (state.xp[role] || 0) + 20;
    const after = levelOf();
    save();
    renderHud();
    animateXp(before, after);
    showFloater(after > before ? "+20 EXP\nLv." + after : "+20 EXP");
    showReward("小鎮幣 +8。今天還可以開 " + (5 - bag().chestCount) + " 個。");
    if (after > before) noteLevel();
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

  const LIFE_COVERS = {
    medical: { name: "醫療練習", premium: 4, deductible: 6, sellers: ["暖禾人壽", "青畦人壽", "拾穗人壽", "暮嵐人壽"] },
    accident: { name: "意外練習", premium: 3, deductible: 5, sellers: ["澄川產物"] },
    home: { name: "住宅練習", premium: 3, deductible: 8, sellers: ["石橋產物"] },
    auto: { name: "車險練習", premium: 4, deductible: 6, sellers: ["岸蒲產物"] }
  };
  const LIFE_EVENTS = [
    { id: "ill", cover: "medical", title: "有點不舒服", full: 24, line: "看病的花費先自己墊。練習中的醫療約定這次只扣自負額。真實契約還要對條款裡的費用、上限和除外，不是看診就一定回來。" },
    { id: "fall", cover: "accident", title: "路上跌倒", full: 18, line: "意外和疾病的定義常常分開。這次用意外練習來比較自己付和只付自負額。條款沒寫的項目，不會因為發生了就算有。" },
    { id: "storm", cover: "home", title: "颱風打到家", full: 30, line: "住宅火災的約定，不會自動連颱風、淹水一起算。這次練習把住宅收成一筆簡化保費，讓你比較全額和自負額。真實要看那張條款有沒有寫風和雨。" },
    { id: "bump", cover: "auto", title: "巷口小擦撞", full: 26, line: "擦撞先分成人的傷害、別人的車、自己的車。這次練習只處理自己的車這一筆簡化費用。強制險著重人的傷害，不會因為有它，車門就自動算進去。" }
  ];
  const LIFE_GOODS = [
    { id: "plant", name: "窗邊盆栽", price: 16 },
    { id: "clock", name: "圓鐘", price: 18 },
    { id: "cushion", name: "坐墊", price: 14 }
  ];
  const TERM_PAY = { 7: 6, 15: 14, 30: 32 };

  function townDay() {
    return bag().day || 1;
  }

  function isWorkplace(name) {
    if (role === "consumer") return name === "超商";
    if (role === "broker") return name === "事務所";
    if (role === "agent") return name === "事務所" || /人壽$/.test(name);
    return false;
  }

  function coverSoldHere(name) {
    const keys = Object.keys(LIFE_COVERS);
    for (let i = 0; i < keys.length; i++) {
      if (LIFE_COVERS[keys[i]].sellers.indexOf(name) !== -1) return keys[i];
    }
    return "";
  }

  function noteMoney(kind, text, amount) {
    const data = bag();
    if (!data.ledger) data.ledger = [];
    data.ledger.unshift({ day: taipeiDate(), kind: kind, text: text, amount: amount });
    if (data.ledger.length > 40) data.ledger.length = 40;
  }

  function earnCash(amount, text) {
    bag().bonus = (bag().bonus || 0) + amount;
    noteMoney("in", text, amount);
  }

  function payCash(amount, text) {
    if (cashOf(role) < amount) return false;
    bag().bonus = (bag().bonus || 0) - amount;
    noteMoney("out", text, amount);
    return true;
  }

  function policiesOf() {
    const data = bag();
    if (!data.policies) data.policies = {};
    return data.policies;
  }

  function drawHomeStuff() {
    if (!role) return;
    const owned = bag().furniture || {};
    if (owned.plant) {
      pen.fillStyle = "#6f8f62";
      pen.beginPath();
      pen.ellipse(250, 300, 16, 18, 0, 0, Math.PI * 2);
      pen.fill();
      pen.fillStyle = "#c47a4a";
      pen.fillRect(242, 312, 16, 14);
    }
    if (owned.clock) {
      pen.fillStyle = "#f7f1e6";
      pen.beginPath();
      pen.arc(400, 190, 16, 0, Math.PI * 2);
      pen.fill();
      pen.strokeStyle = "#6a4632";
      pen.lineWidth = 2;
      pen.stroke();
    }
    if (owned.cushion) {
      pen.fillStyle = "#d7b07a";
      pen.beginPath();
      pen.ellipse(210, 640, 28, 14, 0, 0, Math.PI * 2);
      pen.fill();
    }
  }

  function button(label, className, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function openBank() {
    bag().seenBank = true;
    save();
    renderHud();
    const data = bag();
    const amount = document.createElement("input");
    amount.type = "number";
    amount.min = "10";
    amount.max = "500";
    amount.value = "50";
    amount.className = "chip";
    amount.setAttribute("aria-label", "金額");
    const rows = document.createElement("div");
    rows.className = "passbook";
    (data.deposits || []).forEach(function (item, index) {
      const left = Math.max(0, item.days - dateGap(item.startDate || taipeiDate(), taipeiDate()));
      const line = document.createElement("p");
      line.className = "body-copy";
      line.textContent = "定存 " + item.days + " 天 · 本金 " + item.principal + " · 還剩 " + left + " 天";
      const early = button("提前解約", "ghost", function () { breakTerm(index); });
      rows.appendChild(line);
      rows.appendChild(early);
    });
    const book = (data.ledger || []).filter(function (item) { return item.text.indexOf("活存") !== -1 || item.text.indexOf("定存") !== -1; }).slice(0, 6);
    book.forEach(function (item) {
      rows.appendChild(para("第 " + item.day + " 天 · " + item.text + " " + (item.kind === "out" ? "-" : "+") + item.amount));
    });
    fillFacility("銀行櫃台", [
      para("遊戲數值，非真實利率。小鎮幣不能換成真實的錢，也不是任何一家銀行的存款。利息若追不上物價，能買到的東西仍可能變少。"),
      para("現金 " + cashOf(role) + " · 活存 " + (data.savings || 0) + " · 定存本金 " + ((data.deposits || []).reduce(function (sum, item) { return sum + item.principal; }, 0))),
      para("活存隨時存提。每個日曆日，每滿 100 枚多 1 枚。定存鎖 7、15 或 30 個真實日，每百枚到期 +6、+14、+32。提前解約只退本金。鎖定的錢不能拿來繳保費。遊戲數值，非真實利率。"),
      amount,
      button("存入活存", "primary", function () { moveSavings(Number(amount.value), true); }),
      button("提出活存", "ghost", function () { moveSavings(Number(amount.value), false); }),
      button("定存 7 天", "primary", function () { lockTerm(Number(amount.value), 7); }),
      button("定存 15 天", "primary", function () { lockTerm(Number(amount.value), 15); }),
      button("定存 30 天", "primary", function () { lockTerm(Number(amount.value), 30); }),
      button("主管機關公告欄", "ghost", openNotice),
      rows
    ]);
  }

  function moveSavings(amount, into) {
    const data = bag();
    if (!amount || amount < 10) {
      showToast("至少 10 枚");
      return;
    }
    if (into) {
      if (cashOf(role) < amount) {
        showToast("現金不夠");
        return;
      }
      data.savings = (data.savings || 0) + amount;
      noteMoney("out", "存入活存", amount);
    } else {
      if ((data.savings || 0) < amount) {
        showToast("活存不夠");
        return;
      }
      data.savings -= amount;
      noteMoney("in", "提出活存", amount);
    }
    save();
    renderHud();
    openBank();
  }

  function lockTerm(amount, days) {
    if (!amount || amount < 10) {
      showToast("至少 10 枚");
      return;
    }
    const data = bag();
    const locked = (data.deposits || []).reduce(function (sum, item) { return sum + item.principal; }, 0);
    if (locked + amount > 500) {
      showToast("定存合計先到 500 枚");
      return;
    }
    if (cashOf(role) < amount) {
      showToast("現金不夠");
      return;
    }
    data.deposits.push({ principal: amount, days: days, startDate: taipeiDate() });
    noteMoney("out", "定存 " + days + " 天", amount);
    save();
    renderHud();
    showToast("鎖到 " + days + " 個日曆日後。期滿每百枚 +" + TERM_PAY[days] + "。遊戲數值，非真實利率。");
    openBank();
  }

  function breakTerm(index) {
    const data = bag();
    const item = (data.deposits || [])[index];
    if (!item) return;
    data.deposits.splice(index, 1);
    noteMoney("in", "定存提前解約，只退本金", item.principal);
    save();
    renderHud();
    showToast("只退本金 " + item.principal + " 枚，利息不算。遊戲數值，非真實利率。");
    openBank();
  }

  function openPunch() {
    if (levelOf() < 2) {
      showToast("打工要到 Lv.2。");
      return;
    }
    const data = bag();
    const pay = role === "agent" ? 18 : role === "broker" ? 16 : 12;
    if (data.workedDay === taipeiDate()) {
      fillFacility("打卡", [para("今天這份工作已經領過了。明天睡醒再來。")]);
      return;
    }
    fillFacility("打卡", [
      para(role === "consumer" ? "超商這班，今天可以領 " + pay + " 枚小鎮幣。" : role === "broker" ? "事務所這天的委託整理，可以領 " + pay + " 枚。" : "壽險街或事務所的班，今天可以領 " + pay + " 枚。"),
      para("這是小鎮的薪水，不是真實的工資，也不代表哪一種工作比較好。"),
      button("領今天的薪水", "primary", function () {
        if (bag().workedDay === taipeiDate()) return;
        if (!spendStamina(10)) return;
        bag().workedDay = taipeiDate();
        earnCash(pay, "工作打卡");
        save();
        renderHud();
        showReward("領到 " + pay + " 枚。明天還可以再打一次卡。");
        document.getElementById("facility").hidden = true;
        document.body.classList.remove("ui-busy");
      })
    ]);
  }

  function openShop() {
    const nodes = [
      para("超商只賣小鎮自己的吃食和幾件能擺回家的東西。"),
      button("飯糰 6 枚 · 放入背包", "primary", function () { buyFood(); })
    ];
    LIFE_GOODS.forEach(function (item) {
      const owned = bag().furniture && bag().furniture[item.id];
      nodes.push(button(item.name + " " + item.price + " 枚" + (owned ? " · 已買" : ""), "ghost", function () { buyGoods(item); }));
    });
    fillFacility("超商貨架", nodes);
  }

  function buyFood() {
    if (!payCash(6, "超商飯糰")) {
      showToast("現金不夠");
      return;
    }
    const data = bag();
    if (!data.pack) data.pack = [];
    const expire = new Date(Date.now() + 2 * 86400000);
    const stamp = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(expire);
    data.pack.push({ name: "飯糰", feed: 25, expire: stamp });
    save();
    renderHud();
    showReward("飯糰放進背包，" + stamp + " 前要吃。體力要吃了才補。");
  }

  function buyGoods(item) {
    const data = bag();
    if (!data.furniture) data.furniture = {};
    if (data.furniture[item.id]) {
      showToast("家裡已經有這件");
      return;
    }
    if (!payCash(item.price, item.name)) {
      showToast("現金不夠");
      return;
    }
    data.furniture[item.id] = true;
    save();
    renderHud();
    showReward(item.name + " 會出現在家裡。");
  }

  function openPetShelf() {
    fillFacility("寵物用品", [
      para("小玩具 10 枚，心情 +6。店裡不代辦寵物保險，也不留電話。"),
      button("買小玩具", "primary", function () {
        if (!payCash(10, "寵物店小玩具")) {
          showToast("現金不夠");
          return;
        }
        bag().mood = Math.min(100, (bag().mood || 80) + 6);
        save();
        renderHud();
        showReward("玩具帶回家了。心情 " + bag().mood + "。");
      })
    ]);
  }

  function openCover(kind) {
    const spec = LIFE_COVERS[kind];
    const on = !!policiesOf()[kind];
    const nodes = [
      para(spec.name + "。每個小鎮日扣 " + spec.premium + " 枚。出事時沒有這張，自己付全額；有的話只付自負額 " + spec.deductible + " 枚。"),
      para("遊戲數值，非真實保費，也不是推薦哪一張真實的保單。實際是否給付，以保單條款為準。")
    ];
    if (on) nodes.push(button("先不續這張", "ghost", function () { policiesOf()[kind] = false; save(); openCover(kind); }));
    else nodes.push(button("參加這個練習", "primary", function () { policiesOf()[kind] = true; noteMoney("out", "參加" + spec.name, 0); save(); openCover(kind); }));
    fillFacility(spec.name, nodes);
  }

  function openFinance() {
    const data = bag();
    document.getElementById("menu-panel").hidden = true;
    const income = document.createElement("div");
    const spend = document.createElement("div");
    (data.ledger || []).forEach(function (item) {
      const line = para("第 " + item.day + " 天 · " + item.text + " " + (item.kind === "out" ? "-" : "+") + item.amount);
      if (item.kind === "out") spend.appendChild(line);
      else income.appendChild(line);
    });
    if (!income.childNodes.length) income.appendChild(para("還沒有收入。"));
    if (!spend.childNodes.length) spend.appendChild(para("還沒有支出。"));
    const covers = document.createElement("div");
    Object.keys(LIFE_COVERS).forEach(function (key) {
      const spec = LIFE_COVERS[key];
      covers.appendChild(para(spec.name + (policiesOf()[key] ? " · 每天 " + spec.premium + " 枚 · 自負額 " + spec.deductible : " · 沒參加")));
    });
    covers.appendChild(para("情境答對累計 " + scoreOf(role) + " 枚，算在現金裡。心情 " + (data.mood || 80) + "。"));
    const panel = document.getElementById("finance");
    const body = document.getElementById("finance-body");
    body.replaceChildren(
      para("現金 " + cashOf(role) + " · 存款 " + lockedOf(role) + " · 第 " + townDay() + " 天"),
      headingEl("收入"),
      income,
      headingEl("支出"),
      spend,
      headingEl("保單"),
      covers
    );
    panel.hidden = false;
    document.body.classList.add("ui-busy");
  }

  function headingEl(text) {
    const h = document.createElement("h3");
    h.className = "finance-h";
    h.textContent = text;
    return h;
  }

  function sleepNight() {
    if (area !== "home") {
      showToast("回床上才能睡。");
      return;
    }
    bag().stamina = 100;
    bag().mood = Math.min(100, (bag().mood || 80) + 8);
    save();
    renderHud();
    showReward("睡了一覺，體力補滿。日子照日曆走，不是睡一晚就換一天。");
  }

  function openEvent(id) {
    const event = LIFE_EVENTS.filter(function (item) { return item.id === id; })[0] || LIFE_EVENTS[0];
    const spec = LIFE_COVERS[event.cover];
    const covered = !!policiesOf()[event.cover];
    const due = covered ? spec.deductible : event.full;
    const paid = Math.min(due, cashOf(role));
    if (paid > 0) payCash(paid, event.title);
    else noteMoney("out", event.title + "，現金不夠", 0);
    save();
    renderHud();
    const compare = document.createElement("div");
    compare.className = "compare";
    compare.innerHTML = "<p><strong>沒有這類練習保單</strong><br>自己付 " + event.full + " 枚</p><p><strong>有這類練習保單</strong><br>只付自負額 " + spec.deductible + " 枚</p>";
    fillFacility(event.title, [
      para(event.line),
      compare,
      para(covered ? "你現在有" + spec.name + "，這次扣 " + paid + " 枚。" : "你現在沒有" + spec.name + "，這次扣 " + paid + " 枚。"),
      para("這是小鎮的練習規則，不是推薦真實商品，也不保證給付。實際是否給付，以保單條款為準。")
    ]);
  }

  function deposit() { openBank(); }
  function withdrawEarly() { openBank(); }

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

  const GHOSTS = [];
  let avatarTimer = 0;
  let avatarNext = 0;
  let avatarPullTimer = 0;

  function avatarClientId() {
    try {
      const current = localStorage.getItem("hean-avatar-client");
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(current || "")) return current;
      const id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : "00000000-0000-4000-8000-000000000000";
      localStorage.setItem("hean-avatar-client", id);
      return id;
    } catch (err) {
      return "";
    }
  }

  function nicknameIssue(name) {
    const text = String(name || "").trim();
    if (text.length < 2 || text.length > 12) return "nickname_length";
    if (/https?:\/\/|www\./i.test(text)) return "nickname_url";
    if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(text) || text.indexOf("@") !== -1) return "nickname_email";
    if (/(?:\+?886|0\d)[\d\-\s]{7,}/.test(text)) return "nickname_phone";
    if (/(?:^|\s)line(?:\s|$)|line\s*(?:id|[:：@])/i.test(text)) return "nickname_line";
    if (/\.[a-z]{2,}\b/i.test(text)) return "nickname_domain";
    if (/[^\u3400-\u9fffA-Za-z0-9 _\-·．]/.test(text)) return "nickname_invalid_chars";
    return "";
  }

  function nicknameMessage(code) {
    const copy = {
      nickname_length: "暱稱要 2 到 12 個字。",
      nickname_url: "暱稱不能放網址。",
      nickname_domain: "暱稱不能放網域。",
      nickname_email: "暱稱不能放電子郵件。",
      nickname_phone: "暱稱不能放電話。",
      nickname_line: "暱稱不能放 LINE ID。",
      nickname_invalid_chars: "暱稱有不能用的字。"
    };
    return copy[code] || "這個暱稱現在不能用。";
  }

  function avatarNote(text) {
    const note = document.getElementById("avatar-note");
    if (!note) return;
    note.hidden = !text;
    note.textContent = text || "";
  }

  function paintAvatarShare() {
    const input = document.getElementById("avatar-nick");
    const button = document.getElementById("btn-avatar-public");
    if (input && document.activeElement !== input) input.value = state.avatarNick || "";
    if (!button) return;
    const on = !!state.avatarPublic;
    button.textContent = "公開我的分身：" + (on ? "開" : "關");
    button.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function currentZoneSlug() {
    if (area === "town") {
      const here = ZONES.find(function (zone) {
        return zone.slug && player.x > zone.x && player.x < zone.x + zone.w && player.y > zone.y && player.y < zone.y + zone.h;
      });
      return here ? here.slug : "town";
    }
    if (area === "home") return "home";
    const slugs = {
      "銀行": "bank", "超商": "shop", "車行": "garage", "寵物店": "pet",
      "小鎮法院": "court", "事務所": "office", "小鎮公所": "hall", "勞工服務站": "labor",
      "暖禾人壽": "life-nuan", "青畦人壽": "life-qing", "拾穗人壽": "life-shi", "暮嵐人壽": "life-mu",
      "石橋產物": "prop-shi", "岸蒲產物": "prop-an", "原麓產物": "prop-yuan", "澄川產物": "prop-cheng",
      "醫院": "hospital", "青禾診所": "clinic", "公園亭": "park", "湖畔亭": "lake",
      "步道牌": "trail", "鎮民中心": "center", "周家": "zhou", "吳家": "wu"
    };
    return slugs[roomName] || "room";
  }

  function avatarAppearance() {
    const key = window.HEAN_ART && window.HEAN_ART.artKey ? window.HEAN_ART.artKey(role, genderOf(role)) : "client_m";
    const character = AVATAR_KEYS[key] ? key : "client_m";
    return { character: character, style: { outfit: character } };
  }

  function ghostLook(appearance) {
    const style = appearance && appearance.style;
    const outfit = style && typeof style.outfit === "string" ? style.outfit : "";
    const character = appearance && typeof appearance.character === "string" ? appearance.character : "";
    if (AVATAR_KEYS[outfit]) return outfit;
    if (AVATAR_KEYS[character]) return character;
    return "client_m";
  }

  function ghostName(raw) {
    return String(raw || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 12);
  }

  function ghostSpotOk(x, y) {
    if (solidAt(x, y, 12)) return false;
    return !SPOTS.some(function (spot) {
      return spot.facility === "chest" && Math.hypot(spot.x - x, spot.y - y) < 40;
    });
  }

  function walkableNear(x, y) {
    const box = bounds();
    if (!isFinite(x) || !isFinite(y)) {
      x = player.x + 70;
      y = player.y + 20;
    }
    x = clamp(x, 24, box.w - 24);
    y = clamp(y, 24, box.h - 24);
    if (ghostSpotOk(x, y)) return { x: x, y: y };
    for (let ring = 24; ring <= 180; ring += 24) {
      for (let step = 0; step < 8; step++) {
        const px = clamp(x + Math.cos(step) * ring, 24, box.w - 24);
        const py = clamp(y + Math.sin(step * 1.2) * ring, 24, box.h - 24);
        if (ghostSpotOk(px, py)) return { x: px, y: py };
      }
    }
    return { x: player.x, y: player.y };
  }

  function queueAvatarPost() {
    if (!state.avatarPublic || !role || playScreen.hidden) return;
    const delay = Math.max(0, avatarNext - Date.now());
    clearTimeout(avatarTimer);
    avatarTimer = setTimeout(postAvatar, delay);
  }

  function postAvatar() {
    if (!state.avatarPublic || !role) return;
    const issue = nicknameIssue(state.avatarNick);
    if (issue) {
      avatarNote(nicknameMessage(issue));
      return;
    }
    const id = avatarClientId();
    if (!id) return;
    avatarNext = Date.now() + 10000;
    const body = {
      id: id,
      nickname: String(state.avatarNick).trim(),
      appearance: avatarAppearance(),
      level: clamp(levelOf(), 1, 99),
      zone: currentZoneSlug()
    };
    const x = Math.round(player.x);
    const y = Math.round(player.y);
    if (x >= -10000 && x <= 10000 && y >= -10000 && y <= 10000) {
      body.x = x;
      body.y = y;
    }
    fetch(AVATAR_ORIGIN + "/avatar", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (res) {
      if (res.status === 429) {
        const retry = Number(res.headers.get("Retry-After")) || 10;
        avatarNext = Date.now() + Math.max(10, retry) * 1000;
        queueAvatarPost();
        return null;
      }
      return res.json().catch(function () { return null; });
    }).then(function (data) {
      if (!data || data.ok !== false) return;
      if (String(data.error || "").indexOf("nickname_") === 0) avatarNote(nicknameMessage(data.error));
    }).catch(function () { /* 後端故障時遊戲照常 */ });
  }

  function forgetAvatar() {
    clearTimeout(avatarTimer);
    const id = avatarClientId();
    if (!id) return;
    fetch(AVATAR_ORIGIN + "/avatar/" + encodeURIComponent(id), { method: "DELETE" }).catch(function () {});
  }

  function pullAvatars() {
    const zone = currentZoneSlug();
    clearTimeout(avatarPullTimer);
    avatarPullTimer = setTimeout(function () {
      fetch(AVATAR_ORIGIN + "/avatars?zone=" + encodeURIComponent(zone) + "&limit=20").then(function (res) {
        if (!res.ok) return null;
        return res.json();
      }).then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.avatars)) return;
        if (currentZoneSlug() !== zone) return;
        const mine = avatarClientId();
        const kept = [];
        data.avatars.forEach(function (raw) {
          if (!raw || raw.id === mine || kept.length >= 8) return;
          const prev = GHOSTS.filter(function (ghost) { return ghost.id === raw.id; })[0];
          const spot = walkableNear(Number(raw.x), Number(raw.y));
          if (prev) {
            prev.nickname = ghostName(raw.nickname);
            prev.level = clamp(Number(raw.level) || 1, 1, 99);
            prev.look = ghostLook(raw.appearance);
            prev.anchor = spot;
            kept.push(prev);
            return;
          }
          kept.push({
            id: String(raw.id),
            nickname: ghostName(raw.nickname),
            level: clamp(Number(raw.level) || 1, 1, 99),
            look: ghostLook(raw.appearance),
            x: spot.x,
            y: spot.y,
            anchor: spot,
            tx: spot.x,
            ty: spot.y,
            facing: "down",
            travel: 0,
            moving: false,
            pause: 0.3
          });
        });
        GHOSTS.length = 0;
        kept.forEach(function (ghost) { GHOSTS.push(ghost); });
      }).catch(function () {});
    }, 40);
  }

  function stepGhosts(dt) {
    GHOSTS.forEach(function (ghost) {
      if (ghost.pause > 0) {
        ghost.pause -= dt;
        ghost.moving = false;
        return;
      }
      const dx = ghost.tx - ghost.x;
      const dy = ghost.ty - ghost.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 8) {
        const ang = hash(Math.floor(ghost.x + ghost.level), Math.floor(time * 2 + ghost.y)) * Math.PI * 2;
        const nx = ghost.anchor.x + Math.cos(ang) * 56;
        const ny = ghost.anchor.y + Math.sin(ang) * 42;
        if (ghostSpotOk(nx, ny) && Math.hypot(nx - player.x, ny - player.y) > 28) {
          ghost.tx = nx;
          ghost.ty = ny;
        }
        ghost.pause = 0.7;
        ghost.moving = false;
        return;
      }
      const step = Math.min(dist, 26 * dt);
      const nx = ghost.x + dx / dist * step;
      const ny = ghost.y + dy / dist * step;
      if (!ghostSpotOk(nx, ny) || Math.hypot(nx - player.x, ny - player.y) < 22) {
        ghost.tx = ghost.x;
        ghost.pause = 0.5;
        ghost.moving = false;
        return;
      }
      ghost.x = nx;
      ghost.y = ny;
      ghost.travel += step;
      ghost.moving = true;
      ghost.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
    });
  }

  function drawOneGhost(ghost) {
    const image = window.HEAN_ART && window.HEAN_ART.walkSheet && window.HEAN_ART.walkSheet(ghost.look);
    if (!image || !window.HEAN_CHARS) return;
    const id = "ghost-" + ghost.look;
    window.HEAN_CHARS.useImageSheet(id, image);
    const target = area === "town" ? 110 : 124;
    const aiH = target / ((130 / 320) * (zoom || 1));
    const aiW = aiH * 256 / 320;
    const frame = ghost.moving ? Math.floor(ghost.travel / STEP) % 4 : 1;
    const foot = -aiH * FOOT_Y / 320;
    pen.save();
    pen.translate(ghost.x, ghost.y);
    pen.globalAlpha = 0.58;
    window.HEAN_CHARS.drawSheet(pen, id, ghost.facing || "down", frame, -aiW / 2, foot, aiW, aiH);
    const label = (ghost.nickname || "分身") + "  Lv." + ghost.level;
    pen.globalAlpha = 0.9;
    pen.font = "600 13px " + FONT;
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    const width = pen.measureText(label).width + 16;
    const lift = personTagLift();
    pen.fillStyle = "rgba(255, 253, 249, 0.9)";
    roundRect(-width / 2, -lift - 10, width, 20, 10);
    pen.fill();
    pen.fillStyle = "#3f362e";
    pen.fillText(label, 0, -lift);
    pen.restore();
  }

  function ghostAt(x, y) {
    let best = null;
    let bestD = 52;
    GHOSTS.forEach(function (ghost) {
      const dist = Math.hypot(ghost.x - x, ghost.y - y);
      if (dist < bestD) {
        bestD = dist;
        best = ghost;
      }
    });
    return best;
  }

  function showGhost(ghost) {
    showToast((ghost.nickname || "分身") + "　Lv." + ghost.level);
  }

  function setAvatarPublic(on) {
    const input = document.getElementById("avatar-nick");
    state.avatarNick = input ? input.value.trim().slice(0, 12) : (state.avatarNick || "");
    if (on) {
      const issue = nicknameIssue(state.avatarNick);
      if (issue) {
        state.avatarPublic = false;
        save();
        paintAvatarShare();
        avatarNote(nicknameMessage(issue));
        return;
      }
      state.avatarPublic = true;
      save();
      avatarNote("");
      paintAvatarShare();
      avatarNext = 0;
      queueAvatarPost();
      return;
    }
    state.avatarPublic = false;
    save();
    paintAvatarShare();
    avatarNote("");
    forgetAvatar();
  }

  function bind() {
    let pendingRole = null;
    document.querySelectorAll("[data-role]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        pendingRole = btn.getAttribute("data-role");
        document.getElementById("gender-role").textContent = ROLE_NAME[pendingRole];
        const base = pendingRole === "agent" ? "agent" : pendingRole === "broker" ? "broker" : "client";
        document.getElementById("gender-art-m").src = "assets/characters/" + base + "_m.webp?v=4.0";
        document.getElementById("gender-art-f").src = "assets/characters/" + base + "_f.webp?v=4.0";
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
      paintAvatarShare();
      document.getElementById("menu-panel").hidden = false;
      document.body.classList.add("ui-busy");
    });
    document.getElementById("avatar-nick").addEventListener("input", function (e) {
      state.avatarNick = e.target.value.slice(0, 12);
      save();
      if (state.avatarPublic) queueAvatarPost();
    });
    document.getElementById("btn-avatar-public").addEventListener("click", function () {
      setAvatarPublic(!state.avatarPublic);
    });
    setInterval(function () {
      if (playScreen.hidden) return;
      pullAvatars();
      if (state.avatarPublic) queueAvatarPost();
    }, 60000);
    document.getElementById("menu-close").addEventListener("click", function () {
      document.getElementById("menu-panel").hidden = true;
      if (dialog.hidden && progress.hidden) document.body.classList.remove("ui-busy");
    });
    document.getElementById("btn-progress").addEventListener("click", openProgress);
    document.getElementById("btn-finance").addEventListener("click", openFinance);
    document.getElementById("btn-tips").addEventListener("click", openTips);
    document.getElementById("btn-pack").addEventListener("click", openPack);
    document.getElementById("btn-clients").addEventListener("click", openClientBook);
    document.getElementById("btn-badges").addEventListener("click", openBadges);
    document.getElementById("btn-guide").addEventListener("click", openGuide);
    document.getElementById("btn-library").addEventListener("click", openLibrary);
    document.getElementById("radio").addEventListener("click", openRadio);
    document.getElementById("finance-close").addEventListener("click", function () {
      document.getElementById("finance").hidden = true;
      if (dialog.hidden && progress.hidden && document.getElementById("facility").hidden) document.body.classList.remove("ui-busy");
    });
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
      const ghost = ghostAt(world.x, world.y);
      if (ghost) {
        showGhost(ghost);
        return;
      }
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
    if (dateOverride) return dateOverride;
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(new Date());
  }

  function grantDaily() {
    const today = taipeiDate();
    const data = bag();
    if (!data.visits) data.visits = [];
    let eventId = "";
    if (data.daily !== today) {
      const prev = data.daily;
      data.daily = today;
      data.chestCount = 0;
      data.casts = 0;
      data.clientSteps = 0;
      data.streak = prev && dateGap(prev, today) === 1 ? (data.streak || 1) + 1 : 1;
      if (data.visits[data.visits.length - 1] !== today) data.visits.push(today);
      const pay = 8 + levelOf() * 4;
      data.bonus = (data.bonus || 0) + pay;
      noteMoney("in", "今日薪水", pay);
      matureTerms(today);
      chargePremiums();
      const list = scenariosFor(role);
      const n = today.split("-").reduce(function (sum, part) { return sum + Number(part); }, 0);
      if (list.length) data.dailyId = list[n % list.length].id;
      eventId = data.forceEvent || (Math.random() < 0.35 ? LIFE_EVENTS[n % LIFE_EVENTS.length].id : "");
      data.forceEvent = "";
      save();
      renderHud();
      showReward("連續到訪 " + data.streak + " 天。今日薪水 " + pay + " 枚。遊戲數字。");
    }
    if (data.greetDay !== today) {
      data.greetDay = today;
      earnCash(20, "今日報到");
      const before = levelOf();
      state.xp[role] = (state.xp[role] || 0) + 5;
      const after = levelOf();
      animateXp(before, after);
      save();
      renderHud();
      openDailyTip();
    }
    if (eventId) setTimeout(function () { if (!uiOpen()) openEvent(eventId); }, 1200);
  }

  function matureTerms(today) {
    const data = bag();
    const keep = [];
    (data.deposits || []).forEach(function (item) {
      if (!item.startDate) item.startDate = today;
      if (item.days !== 7 && item.days !== 15 && item.days !== 30) item.days = item.days >= 14 ? 30 : 15;
      if (dateGap(item.startDate, today) >= item.days) {
        const pay = Math.floor(item.principal / 100) * (TERM_PAY[item.days] || 0);
        if (pay > 0) data.bonus = (data.bonus || 0) + pay;
        noteMoney("in", "定存到期", pay);
      } else keep.push(item);
    });
    data.deposits = keep;
  }

  function openFish() {
    if (isTyphoon()) {
      fillFacility("颱風日", [
        para("今天蘆灣港口和釣魚都休息。這是遊戲裡的天氣，不是氣象預報。"),
        para("住宅火災保險不會自動把颱風、洪水算進去。有沒有風災或水災，要看那張條款有沒有另外寫。"),
        para("上面是觀念說明，不是商品建議，也不保證給付。")
      ]);
      return;
    }
    const data = bag();
    if (data.castDay !== taipeiDate()) {
      data.castDay = taipeiDate();
      data.casts = 0;
    }
    if ((data.casts || 0) >= 5) {
      showToast("今天的 5 竿用完了。");
      return;
    }
    if (!spendStamina(8)) return;
    data.casts += 1;
    const event = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)];
    save();
    renderHud();
    fillFacility("第 " + data.casts + " 竿", [
      para("河邊晃了一下。這不是真的漁獲。"),
      para(event.title + "：" + event.line),
      para("今天還剩 " + (5 - data.casts) + " 竿。遊戲數字。")
    ]);
  }

  function openPack() {
    document.getElementById("menu-panel").hidden = true;
    const data = bag();
    const today = taipeiDate();
    data.pack = (data.pack || []).filter(function (item) { return item.expire >= today; });
    const nodes = [para("食物有保存期限。過期的已經收掉。")];
    if (!data.pack.length) nodes.push(para("背包是空的。"));
    data.pack.forEach(function (item, index) {
      nodes.push(button(item.name + " · 體力 +" + item.feed + " · " + item.expire + " 前", "primary", function () { eatPack(index); }));
    });
    fillFacility("背包", nodes);
  }

  function eatPack(index) {
    const data = bag();
    const item = (data.pack || [])[index];
    if (!item) return;
    data.pack.splice(index, 1);
    data.stamina = Math.min(100, stamina() + item.feed);
    save();
    renderHud();
    showReward("吃了" + item.name + "。體力 " + data.stamina + "。");
    openPack();
  }

  const COURT_CASES = [
    { id: "c1", title: "收據對不上費用定義", holder: "保戶說看診花了錢，收據都在。", firm: "公司說條款只列特定費用，這張收據的項目不在裡面。", evidence: "條款給付表沒有這項，收據金額高於表上的上限。", verdict: "firm", reason: "有收據不代表項目落在給付定義裡。", agent: "說明時要把費用定義和上限一起講，不要說花多少領多少。" },
    { id: "c2", title: "等待期內住進醫院", holder: "保戶說生病了就該理賠。", firm: "公司說契約寫了等待期，發病在這段裡面。", evidence: "契約生效日和診斷日對起來，還在等待期。", verdict: "firm", reason: "等待期內發生的約定事故，通常不在這張契約的給付裡。", agent: "等待期要在說明時講完，不要等申請才說。" },
    { id: "c3", title: "只有火災約定，家裡進了雨水", holder: "保戶說颱風把水灌進來，房子壞了。", firm: "公司說這張只有火災和條款列出的項目，沒有風和雨。", evidence: "保單沒有颱風、洪水或水漬的欄。", verdict: "firm", reason: "沒寫進契約的事故，不會因為發生了就變成有。", agent: "住宅火災和風水要分開說，不要用一句有保險帶過。" },
    { id: "c4", title: "契撤期內送出書面", holder: "保戶說收到保單的第十天寄出撤銷信。", firm: "公司說電話講過不算，但書面寄出日還在期限內。", evidence: "郵戳在收到保單翌日起第十天。", verdict: "holder", reason: "期限內的書面撤銷，應該依契約把這段做完。", agent: "契撤要講期限和書面，不要說口頭一句就完成。" },
    { id: "c5", title: "健康問卷漏了正在吃的藥", holder: "保戶說時間久了，當初沒寫應該沒關係。", firm: "公司說書面詢問的藥，問卷上是空白。", evidence: "病歷有長期用藥，要保書該欄沒勾。", verdict: "split", reason: "已經發生、和漏寫無關的項目可以再對；和漏寫直接有關的部分，公司可以主張不負這一段。", agent: "健康欄要本人照實寫，不要代填，也不要說以後就不會被問。" },
    { id: "c6", title: "強制險和自己的車門", holder: "保戶說有強制險，車門刮到也該賠。", firm: "公司說強制險著重人的傷害，車體要看有沒有另外的約定。", evidence: "只有強制汽車責任保險的證，沒有車體損失的契約。", verdict: "split", reason: "人的傷害依強制險的項目看；自己的車門不在那張裡面。", agent: "把人、別人的車、自己的車分成三句，不要說有保險就什麼都算。" },
    { id: "c7", title: "受益人欄還是舊名字", holder: "保戶說已經離婚，保險金不該給前任。", firm: "公司說變更沒有書面辦完，欄位仍是原來的人。", evidence: "沒有受益人變更的申請文件。", verdict: "firm", reason: "契約上的受益人，不會因為家裡的事自己改掉。", agent: "變更受益人要講向公司辦，不要說離婚就自動換人。" },
    { id: "c8", title: "口頭說一定賠", holder: "保戶說業務員當時保證一定下來。", firm: "公司說給付看條款，口頭沒寫進契約。", evidence: "契約沒有那句保證，也沒有對應的批註。", verdict: "firm", reason: "沒進契約的話，不能變成給付約定。", agent: "不要用一定賠或保證報酬來說明。" }
  ];

  function openHearings() {
    const nodes = [para("先聽雙方。可以看證據，也可以直接判斷。這是虛構案例，不是真實判決。")];
    COURT_CASES.forEach(function (item) {
      nodes.push(button(item.title, "ghost", function () { openCase(item, false); }));
    });
    fillFacility("聽雙方說法", nodes);
  }

  function openCase(item, showEvidence) {
    const nodes = [
      para("保戶：" + item.holder),
      para("公司：" + item.firm)
    ];
    if (showEvidence) nodes.push(para("證據：" + item.evidence));
    else nodes.push(button("先看證據", "ghost", function () { openCase(item, true); }));
    nodes.push(button("保戶贏", "primary", function () { judgeCase(item, "holder"); }));
    nodes.push(button("保險公司贏", "primary", function () { judgeCase(item, "firm"); }));
    nodes.push(button("各贏一部分", "primary", function () { judgeCase(item, "split"); }));
    fillFacility(item.title, nodes);
  }

  function judgeCase(item, pick) {
    bag().lastCase = { id: item.id, pick: pick };
    save();
    const name = { holder: "保戶贏", firm: "保險公司贏", split: "各贏一部分" };
    fillFacility("你的判斷", [
      para("你選了" + name[pick] + "。到小鎮法院聽宣判。"),
      button("帶我去法院", "primary", function () {
        document.getElementById("facility").hidden = true;
        document.body.classList.remove("ui-busy");
        guideTo("小鎮法院");
      })
    ]);
  }

  function openCourt() {
    const last = bag().lastCase;
    const nodes = [para("這裡只宣判小鎮自己寫的虛構案例。不是法院的真實裁判，也不引用真實公司。")];
    if (!last) {
      nodes.push(para("還沒有判斷。可以先到暖禾人壽、石橋產物或澄川產物聽說法。"));
      fillFacility("小鎮法院", nodes);
      return;
    }
    const item = COURT_CASES.filter(function (c) { return c.id === last.id; })[0];
    if (!item) {
      fillFacility("小鎮法院", nodes);
      return;
    }
    const name = { holder: "保戶贏", firm: "保險公司贏", split: "各贏一部分" };
    nodes.push(para("結論：" + name[item.verdict] + "。"));
    nodes.push(para("理由：" + item.reason));
    nodes.push(para("給業務員的提醒：" + item.agent));
    nodes.push(para(last.pick === item.verdict ? "你的判斷和這份宣判一樣。" : "你當時選的是" + name[last.pick] + "。可以再對一次條款。"));
    fillFacility(item.title, nodes);
  }

  const CLIENTS = [
    { id: "he", name: "阿禾" },
    { id: "lin", name: "小林" },
    { id: "zhou", name: "周先生" },
    { id: "wu", name: "吳小姐" }
  ];
  const CLIENT_STEPS = [
    { name: "破冰", q: "第一次開口，哪一句比較穩？", options: ["你這樣很危險，快買。", "先問最近在煩什麼，不談商品。", "保證報酬比較高。"], best: 1, why: ["用害怕推銷，是誤導。", "先問近況，不談特定商品。", "保證報酬，而且催促。"] },
    { name: "留聯絡", q: "對方願意再聊，怎麼留？", options: ["先講下次只對條款，不推銷特定商品。", "留下就代表一定要成交。", "說不留會吃虧。"], best: 0, why: ["聯絡不是成交承諾。", "把留資料說成必須購買。", "用吃虧威脅。"] },
    { name: "約見面", q: "約見面時先說什麼？", options: ["見面一定要簽名。", "時間、地點，還有這次只整理需求和條款範圍。", "不見面就不服務。"], best: 1, why: ["把見面說成必須簽名。", "先約好看什麼，不預設成交。", "用拒絕服務施壓。"] },
    { name: "了解需求", q: "要先弄清楚什麼？", options: ["預算、已經有的契約、在意的事故。", "先選一家真實公司。", "先算能節多少稅。"], best: 0, why: ["先弄清需求、既有契約和在意的風險。", "這座小鎮不點名、也不比較真實公司。", "把保險說成節稅工具，是誤導。"] },
    { name: "提出建議", q: "建議要怎麼講？", options: ["這張一定賠。", "用類型說明差異，並說實際給付看條款。", "報酬保證寫進口頭。"], best: 1, why: ["保證給付。", "只用類型說明，並把決定權留在條款。", "口頭保證報酬。"] },
    { name: "處理異議", q: "對方說太貴，怎麼接？", options: ["嘲諷別家。", "把保費、自負額和沒有這項時要自己付的情況分開。", "說不買以後不能理賠。"], best: 1, why: ["貶低別的選擇。", "把費用結構分開講，不恐嚇。", "把沒有購買說成以後都不能申請，是誤導。"] },
    { name: "成交", q: "要簽名時先確認什麼？", options: ["本人親簽，健康欄自己寫，沒有代填。", "趕時間可以代簽。", "空白處以後再補。"], best: 0, why: ["本人看過、自己填、自己簽。", "代簽不能代替本人的意思。", "空白補填會讓說明不可靠。"] },
    { name: "售後", q: "成交後還要做什麼？", options: ["契約放好，變更和申請的步驟說完。", "說以後不用再看條款。", "保證明年一定領得到。"], best: 0, why: ["把文件和以後的程序說清楚。", "條款之後仍然要能對。", "保證未來給付。"] }
  ];

  function clientBook() {
    const data = bag();
    if (!data.clients) data.clients = {};
    return data.clients;
  }

  function openClientTalk() {
    if (role !== "agent" && role !== "broker") {
      showToast("這個身分先把條款看熟。");
      return;
    }
    if (levelOf() < 2) {
      showToast("客戶簿要到 Lv.2。");
      return;
    }
    const data = bag();
    if (data.clientDay !== taipeiDate()) {
      data.clientDay = taipeiDate();
      data.clientSteps = 0;
    }
    if ((data.clientSteps || 0) >= 5) {
      showToast("今天的 5 次談完了。");
      return;
    }
    const nodes = [para("一天最多推進 5 步。同一位一天只走一步，而且要隔天。答錯會冷兩天。不推薦真實商品，不保證報酬。")];
    recruitedPeople().forEach(function (person) {
      const rec = clientBook()[person.id] || { step: 0, day: "", cold: "" };
      nodes.push(button(person.name + " · " + (CLIENT_STEPS[rec.step] ? CLIENT_STEPS[rec.step].name : "談完了"), "ghost", function () { askClient(person); }));
    });
    fillFacility("路上遇到的人", nodes);
  }

  function askClient(person) {
    const today = taipeiDate();
    const rec = clientBook()[person.id] || { step: 0, day: "", cold: "" };
    clientBook()[person.id] = rec;
    if (rec.step >= CLIENT_STEPS.length) {
      showToast(person.name + "這段已經談完。");
      return;
    }
    if (rec.day === today) {
      showToast(person.name + "今天已經談過一步。");
      return;
    }
    if (rec.cold && rec.cold > today) {
      showToast(person.name + "這兩天不想談。");
      return;
    }
    if (!spendStamina(6)) return;
    const step = CLIENT_STEPS[rec.step];
    const nodes = [para(person.name + " · " + step.name), para(step.q)];
    step.options.forEach(function (text, index) {
      nodes.push(button(text, "option", function () { answerClient(person, index); }));
    });
    fillFacility(step.name, nodes);
  }

  function answerClient(person, index) {
    const rec = clientBook()[person.id];
    const step = CLIENT_STEPS[rec.step];
    const today = taipeiDate();
    bag().clientSteps = (bag().clientSteps || 0) + 1;
    rec.day = today;
    const good = index === step.best;
    if (good) {
      rec.step += 1;
      rec.cold = "";
      earnCash(4, "和" + person.name + "談完一步");
    } else {
      rec.cold = shiftDate(today, 2);
    }
    save();
    renderHud();
    fillFacility("教練", [
      para(good ? "這句可以用。" : "這句先不要用。"),
      para(step.why ? step.why[index] : ""),
      para(good ? person.name + "明天才能進行下一步。遊戲金幣 4 枚，不是佣金。" : person.name + "會冷掉 2 天。遊戲日曆。"),
      para("這是練習講評，不是話術模板，也不構成招攬。")
    ]);
  }

  function lifeData() {
    return window.HEAN_LIFE || { quizzes: [], radio: [], approach: [], sports: [], cards: [], badges: [] };
  }

  function shiftDate(day, count) {
    const when = new Date(day + "T12:00:00+08:00").getTime() + count * 86400000;
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(new Date(when));
  }

  function dayNumber(day) {
    return String(day).split("-").reduce(function (sum, part) { return sum + Number(part); }, 0);
  }

  function approachBook() {
    const data = bag();
    if (!data.approaches) data.approaches = {};
    return data.approaches;
  }

  function approachLimit() {
    return 5 + ((bag().sportStreak || 0) >= 3 ? 1 : 0);
  }

  function earnBadge(id) {
    const spec = lifeData().badges.filter(function (item) { return item.id === id; })[0];
    if (!spec) return;
    const data = bag();
    if (!data.badges) data.badges = {};
    if (data.badges[id]) return;
    data.badges[id] = taipeiDate();
    save();
    showFloater("徽章\n" + spec.name);
  }

  function refreshDailySpots() {
    const pack = lifeData().quizzes;
    if (!pack.length) return;
    const n = dayNumber(taipeiDate());
    SPOTS.forEach(function (spot) {
      if (spot.facility !== "quiz") return;
      const pool = pack.filter(function (item) { return item.district === spot.district; });
      if (!pool.length) return;
      const quiz = pool[(n + spot.slot) % pool.length];
      spot.name = quiz.speaker;
      spot.quizId = quiz.id;
    });
  }

  function openMeet(near) {
    if (role !== "agent" && role !== "broker") {
      showToast(near.name + "在路邊。陌開練習是業務員和經紀人的遊戲流程。");
      return;
    }
    const today = taipeiDate();
    const data = bag();
    if (data.approachDay !== today) {
      data.approachDay = today;
      data.approachCount = 0;
    }
    const rec = approachBook()[near.id] || { stage: 0, day: "", cold: "" };
    approachBook()[near.id] = rec;
    if (rec.stage >= 2) {
      showToast(near.name + "已經在客戶簿。下一步要等到隔天。");
      openClientBook();
      return;
    }
    if (rec.cold && rec.cold > today) {
      showToast(near.name + "這兩天不想談。冷到 " + rec.cold + "。");
      return;
    }
    if (rec.day === today) {
      showToast("今天這一步談過了。明天再進行下一步。");
      return;
    }
    if ((data.approachCount || 0) >= approachLimit()) {
      showToast("今天的陌開次數用完了。遊戲規則，一天 " + approachLimit() + " 次。");
      return;
    }
    const step = lifeData().approach[rec.stage];
    const nodes = [para(near.name + " · " + step.name), para(step.q), para("一天 " + approachLimit() + " 次。這是遊戲次數。")];
    step.options.forEach(function (option, index) {
      nodes.push(button(option.text, "option", function () { answerMeet(near, index); }));
    });
    fillFacility("陌開 · " + step.name, nodes);
  }

  function answerMeet(near, index) {
    const rec = approachBook()[near.id];
    const step = lifeData().approach[rec.stage];
    const today = taipeiDate();
    const option = step.options[index];
    const good = index === step.best;
    bag().approachCount = (bag().approachCount || 0) + 1;
    rec.day = today;
    if (good) {
      rec.stage += 1;
      rec.cold = "";
      if (rec.stage === 1) earnBadge("approach");
      if (rec.stage >= 2) {
        clientBook()[near.id] = { step: 2, day: today, cold: "", name: near.name };
        earnBadge("booked");
      }
      grantSeason();
    } else {
      rec.cold = shiftDate(today, 2);
    }
    save();
    renderHud();
    fillFacility("教練", [
      para(good ? "這句可以用。" : "這句先不要用。"),
      para(option.why),
      para(good ? (rec.stage >= 2 ? near.name + "進了客戶簿。約見面要等到明天。" : "破冰完成。留聯絡要等到明天。") : near.name + "會冷掉 2 天。"),
      para("重視需求、不誤導、不保證報酬、不推薦特定商品。這是練習講評。")
    ]);
  }

  function openSport() {
    const today = taipeiDate();
    const data = bag();
    if (data.sportDay === today) {
      showToast("今天已經運動過了。連續 " + (data.sportStreak || 0) + " 天。遊戲紀錄。");
      return;
    }
    const nodes = [para("一天選一項。有機會拉傷，遊戲裡會比較有沒有意外或醫療練習保單。")];
    lifeData().sports.forEach(function (item, index) {
      nodes.push(button(item.name, "option", function () { playSport(index); }));
    });
    fillFacility("青禾運動角", nodes);
  }

  function playSport(index) {
    const item = lifeData().sports[index];
    const today = taipeiDate();
    const data = bag();
    const yesterday = shiftDate(today, -1);
    data.sportStreak = data.sportDay === yesterday ? (data.sportStreak || 1) + 1 : 1;
    data.sportDay = today;
    if (data.sportStreak >= 3) earnBadge("sport3");
    const roll = hash(dayNumber(today), index + 3);
    const hurt = roll < 0.3;
    const nodes = [para(item.line)];
    if (!hurt) {
      save();
      renderHud();
      grantSeason();
      nodes.push(para("今天沒有受傷。連續 " + data.sportStreak + " 天。滿 3 天，當天陌開多 1 次。"));
      nodes.push(para("若拉傷：沒有意外或醫療練習保單自己付 18 枚；有對應保單只付自負額。遊戲數值，不是保費試算。"));
      fillFacility(item.name, nodes);
      return;
    }
    const medical = policiesOf().medical ? LIFE_COVERS.medical.deductible : 0;
    const accident = policiesOf().accident ? LIFE_COVERS.accident.deductible : 0;
    const covered = !!(policiesOf().medical || policiesOf().accident);
    const due = covered ? Math.min.apply(null, [medical, accident].filter(Boolean)) : 18;
    const paid = Math.min(due, cashOf(role));
    if (paid > 0) payCash(paid, "運動拉傷");
    grantSeason();
    save();
    renderHud();
    const compare = document.createElement("div");
    compare.className = "compare";
    compare.innerHTML = "<p><strong>沒有意外或醫療練習保單</strong><br>自己付 18 枚</p><p><strong>有對應練習保單</strong><br>只付自負額</p>";
    nodes.push(para("拉傷了。這是遊戲事件。這次" + (covered ? "有對應練習保單，付 " + due + " 枚。" : "沒有對應練習保單，自己付 " + due + " 枚。")));
    nodes.push(compare);
    nodes.push(para("數字是遊戲數值，不是保費試算，也不保證真實給付。連續 " + data.sportStreak + " 天。"));
    fillFacility("運動拉傷", nodes);
  }

  function openDraw() {
    const today = taipeiDate();
    const data = bag();
    if (data.drawDay === today) {
      showToast("今天的麥穗已經抽過了。");
      return;
    }
    const deck = lifeData().cards;
    const card = deck[dayNumber(today) % deck.length];
    data.drawDay = today;
    earnBadge("draw");
    grantSeason();
    if (card.kind === "coin") earnCash(card.amount, "麥穗廣場");
    if (card.kind === "xp") {
      const before = levelOf();
      state.xp[role] = (state.xp[role] || 0) + card.amount;
      const after = levelOf();
      animateXp(before, after);
      if (after > before) noteLevel();
    }
    if (card.kind === "item") {
      if (!data.pack) data.pack = [];
      data.pack.push({ name: card.name, feed: card.feed, expire: shiftDate(today, 2) });
    }
    save();
    renderHud();
    showFloater(card.name);
    fillFacility("麥穗廣場", [
      para(card.line),
      para("一天一次。遊戲獎勵，不是抽獎廣告，也沒有真實獎金。")
    ]);
  }

  function manageTag(id) {
    if (!role || (role !== "agent" && role !== "broker")) return "";
    const approach = approachBook()[id];
    const rec = clientBook()[id];
    if ((!approach || (approach.stage || 0) < 1) && !rec) return "";
    return clientNext(id);
  }

  function clientNext(id) {
    const today = taipeiDate();
    const approach = approachBook()[id];
    const rec = clientBook()[id];
    if (rec && rec.cold && rec.cold > today) return "冷到 " + rec.cold;
    if ((rec && rec.day === today) || (approach && approach.day === today)) return "明天可經營";
    if (rec && rec.step >= CLIENT_STEPS.length) return "這段談完";
    if (rec && CLIENT_STEPS[rec.step]) {
      const name = CLIENT_STEPS[rec.step].name;
      if (name === "破冰") return "初次拜訪";
      if (name === "留聯絡" || name === "約見面") return name;
      return "答題 · " + name;
    }
    if (approach && approach.stage === 1) return "留聯絡";
    if (approach && (approach.stage || 0) >= 2) return "約見面";
    return "初次拜訪";
  }

  function personSpot(person) {
    const byIdSpot = SPOTS.filter(function (s) { return s.id === person.id; })[0];
    if (byIdSpot) return byIdSpot;
    return SPOTS.filter(function (s) { return s.name === person.name && s.facility; })[0];
  }

  function walkToPlace(place) {
    const facility = document.getElementById("facility");
    const menu = document.getElementById("menu-panel");
    const map = document.getElementById("map-panel");
    if (facility) facility.hidden = true;
    if (menu) menu.hidden = true;
    if (map) map.hidden = true;
    document.body.classList.remove("ui-busy");
    if (place.zone) {
      const zone = ZONES.find(function (item) { return item.name === place.zone; });
      if (zone && levelOf() < zone.level) {
        showToast(zone.name + "要到 Lv." + zone.level + " 解鎖");
        const dest = zone.enter || zone.back;
        if (area !== "town") setArea("town", dest.x, dest.y);
        else path = findPath(player.x, player.y, dest.x, dest.y);
        return;
      }
    }
    guideToPoint(place.x, place.y);
  }

  function catalogPlaces() {
    const list = [];
    const seen = {};
    BUILDINGS.forEach(function (b) {
      if (!FACADE[b.name]) return;
      const door = townDoor(b);
      list.push({ name: b.name, x: door.x, y: door.y, zone: "" });
    });
    SPOTS.forEach(function (s) {
      if (!s.facility || !s.name) return;
      const key = s.facility + ":" + s.name + ":" + Math.round(s.x) + ":" + Math.round(s.y);
      if (seen[key]) return;
      seen[key] = true;
      list.push({ name: s.name, x: s.x, y: s.y, zone: s.zone || "" });
    });
    return list;
  }

  function openDailyTip() {
    const pack = learnPack();
    const tip = pack.tips[pack.tipIndex(taipeiDate())] || "";
    fillFacility("今日小技巧", [
      para(tip),
      para("今日報到：遊戲金幣 +20、遊戲經驗 +5。數字是遊戲值，不能換成錢。"),
      para("依台北時間換日。不推薦商品，不承諾報酬，也不教節稅。")
    ]);
  }

  let libraryRank = 0;
  function openLibrary() {
    const menu = document.getElementById("menu-panel");
    if (menu) menu.hidden = true;
    const pack = learnPack();
    const suggest = pack.suggestRank(role ? levelOf() : 1);
    const names = ["", "入門", "基礎", "進階", "專業"];
    const nodes = [para("以你現在的等級，建議先看「" + names[suggest] + "」。難度對應新人訓練：第一週、第一個月、三個月、半年。")];
    const filters = document.createElement("div");
    filters.className = "rank-filters";
    [0, 1, 2, 3, 4].forEach(function (rank) {
      const chip = button(rank ? names[rank] : "全部", "chip", function () {
        libraryRank = rank;
        openLibrary();
      });
      if (libraryRank === rank) chip.setAttribute("aria-pressed", "true");
      filters.appendChild(chip);
    });
    nodes.push(filters);
    const read = (bag().readArticles) || {};
    pack.articles.filter(function (item) {
      return !libraryRank || item.rank === libraryRank;
    }).sort(function (a, b) {
      return (a.rank === suggest ? 0 : 1) - (b.rank === suggest ? 0 : 1) || a.rank - b.rank;
    }).forEach(function (item) {
      nodes.push(button((read[item.id] ? "讀過 · " : "") + item.rankName + " · " + item.stage + " · " + item.title, "ghost", function () {
        openArticle(item.id);
      }));
    });
    fillFacility("圖書館", nodes);
  }

  function wearingScarf() {
    if (!role) return false;
    const today = taipeiDate();
    if (today.slice(5, 7) !== "12") return false;
    return bag().scarf === today.slice(0, 7);
  }

  function grantSeason() {
    const today = taipeiDate();
    if (today.slice(5, 7) !== "12") return;
    const month = today.slice(0, 7);
    if (bag().scarf === month) return;
    bag().scarf = month;
    save();
    showFloater("聖誕圍巾\n12 月限定");
  }

  function drawScarf(aiH) {
    const neck = -aiH * 62 / 320;
    pen.fillStyle = "#b23a3a";
    pen.beginPath();
    pen.ellipse(0, neck, aiH * 0.07, aiH * 0.018, 0, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#f4f7f2";
    pen.fillRect(-aiH * 0.012, neck, aiH * 0.024, aiH * 0.045);
  }

  function issuePack() {
    return (window.HEAN_ISSUE && window.HEAN_ISSUE.questions) || [];
  }

  function issueUnlocked() {
    const day = Number(taipeiDate().slice(8, 10)) || 1;
    const count = Math.min(issuePack().length, 8 + (day - 1) * 2);
    return issuePack().slice(0, count);
  }

  function issueState() {
    const data = bag();
    if (!data.issueDone || typeof data.issueDone !== "object") data.issueDone = {};
    const today = taipeiDate();
    if (data.issueDay !== today) {
      data.issueDay = today;
      data.issueCount = 0;
    }
    return data;
  }

  function openIssue() {
    const data = issueState();
    const month = taipeiDate().slice(0, 7);
    const list = issueUnlocked();
    const nodes = [para(month + " 月刊。1 日先開 8 題，其後每天再解鎖 2 題，最多 " + issuePack().length + " 題。今天解鎖 " + list.length + " 題。遊戲值，不是證照。")];
    nodes.push(para("今天還可答 " + Math.max(0, 5 - (data.issueCount || 0)) + " 題。答過的會留在存檔。"));
    list.forEach(function (item) {
      const key = month + ":" + item.id;
      const mark = data.issueDone[key];
      const again = mark === "no" || knowTry()["issue:" + key] === "miss" || knowTry()["issue:" + key] === "read";
      const label = (mark === "ok" ? "已答 · " : again ? "可重答 · " : "") + item.cat + " · " + item.title;
      nodes.push(button(label, mark === "ok" ? "ghost" : "option", function () { askIssue(item); }));
    });
    fillFacility("月刊問答", nodes);
  }

  function askIssue(item) {
    const data = issueState();
    const month = taipeiDate().slice(0, 7);
    const key = month + ":" + item.id;
    const stateKey = "issue:" + key;
    if (data.issueDone[key] === "ok" || knowTry()[stateKey] === "ok") {
      fillFacility(item.title, [para("這題這個月答過了。"), para(item.why), para(item.source), para("遊戲說明，不是法律意見。")]);
      return;
    }
    if (data.issueDone[key] === "no") knowTry()[stateKey] = knowTry()[stateKey] || "miss";
    if (knowTry()[stateKey] === "miss") {
      fillFacility(item.title, [
        para("這題上次沒答對。先讀文章再重答。重答答對的遊戲金幣和經驗減半。"),
        para(item.why),
        button("去看文章", "primary", function () {
          openArticle(learnPack().articleFor(item.id), {
            mark: function () { knowTry()[stateKey] = "read"; },
            back: function () { askIssue(item); }
          });
        })
      ]);
      return;
    }
    if ((data.issueCount || 0) >= 5 && knowTry()[stateKey] !== "read") {
      showToast("今天的 5 題月刊用完了。遊戲規則。");
      return;
    }
    const nodes = [para(item.cat), para(item.q)];
    if (knowTry()[stateKey] === "read") nodes.push(para("這是重答。答對的遊戲金幣和經驗減半。"));
    item.options.forEach(function (text, index) {
      nodes.push(button(text, "option", function () { answerIssue(item, index); }));
    });
    fillFacility(item.cat + " · " + item.title, nodes);
  }

  function answerIssue(item, index) {
    const data = issueState();
    const month = taipeiDate().slice(0, 7);
    const key = month + ":" + item.id;
    const stateKey = "issue:" + key;
    if (data.issueDone[key] === "ok" || knowTry()[stateKey] === "ok") return;
    const good = index === item.best;
    const retry = knowTry()[stateKey] === "read" || data.issueDone[key] === "no";
    if (!good) {
      knowTry()[stateKey] = "miss";
      data.issueDone[key] = "no";
      save();
      fillFacility("教練", [
        para("這次沒有金幣，也沒有經驗。讀完文章可以重答，重答答對只給一半。"),
        para(item.why),
        para(item.source),
        button("去看文章", "primary", function () {
          openArticle(learnPack().articleFor(item.id), {
            mark: function () { knowTry()[stateKey] = "read"; },
            back: function () { askIssue(item); }
          });
        }),
        para("教學說明，不推薦商品，也不構成法律或稅務意見。")
      ]);
      return;
    }
    if (!retry) data.issueCount = (data.issueCount || 0) + 1;
    data.issueDone[key] = "ok";
    knowTry()[stateKey] = "ok";
    const gain = retry ? 3 : 6;
    earnCash(gain, "月刊問答");
    const before = levelOf();
    state.xp[role] = (state.xp[role] || 0) + gain;
    const after = levelOf();
    animateXp(before, after);
    grantSeason();
    if (after > before) noteLevel();
    save();
    renderHud();
    fillFacility("答對了", [
      para((retry ? "重答答對。遊戲金幣 " : "遊戲金幣 ") + gain + "、經驗 " + gain + (retry ? "（減半）。" : "。") + "數字是遊戲值。"),
      para(item.why),
      para(item.source),
      para("教學說明，不推薦商品，也不構成法律或稅務意見。")
    ]);
  }

  const ZONE_STORIES = {
    farm: { title: "田裡的風", q: "農作物被風打壞，住宅火災保險會自動賠嗎？", options: ["會，都是損失。", "不會。作物和農業設施要看有沒有另外的約定。", "只要是颱風就一定賠。"], best: 1, why: "火災、作物、設施常常是不同約定。沒寫的災害不會因為發生了就進來。", source: "參考：契約條款常見結構。遊戲說明，不推薦商品。" },
    farm2: { title: "田裡工作", q: "在田裡做事受傷，一定同時有職災和意外給付嗎？", options: ["一定兩邊一起領。", "職災和商業意外契約要分開看，沒有寫的不會自動出現。", "農會一句話就等於條款。"], best: 1, why: "職業災害和意外險是兩套規則。這裡的農會是虛構的，不代賣任何商品。", source: "參考：社會保險與商業契約應分開看。" },
    forest: { title: "山徑骨折", q: "登山摔傷住院，遊戲裡該怎麼看？", options: ["有走路就算全程保證。", "先分意外、住院日額和責任。沒有的項目就還沒有約定。", "骨折一定全額。"], best: 1, why: "意外、住院、活動責任常常分開。數字如果出現，也只是遊戲值。", source: "參考：契約條款常見結構。" },
    harbor: { title: "船和颱風", q: "颱風停航那天，漁船損失會自動算進火災保險嗎？", options: ["會。", "不會。船舶責任和颱風停航要看有沒有另外寫。", "停航就一定有補償。"], best: 1, why: "停航是風險管理，不是自動給付。這座漁村是虛構的。", source: "參考：主管機關公開資料的一般觀念，這裡不寫條號。" },
    harbor2: { title: "海上意外", q: "船上有人受傷，和船體損壞是同一筆嗎？", options: ["是。", "常常要分開：人的傷害、船的責任、船體本身。", "人沒關係，只看船。"], best: 1, why: "人、責任、船體不要疊成一句「有保險」。", source: "參考：契約條款常見結構。" }
  };

  function harvestLeft() {
    const data = bag();
    if (data.harvestDay !== taipeiDate()) return 5;
    return Math.max(0, 5 - (data.harvestCount || 0));
  }

  function hikeLeft() {
    const data = bag();
    if (data.hikeDay !== taipeiDate()) return 3;
    return Math.max(0, 3 - (data.hikeCount || 0));
  }

  function harborLeft() {
    const data = bag();
    if (data.harborDay !== taipeiDate()) return 3;
    return Math.max(0, 3 - (data.harborCasts || 0));
  }

  function openZoneStory(near) {
    const item = ZONE_STORIES[near.topic];
    if (!item) return;
    const data = bag();
    if (!data.zoneQuiz) data.zoneQuiz = {};
    const key = near.topic;
    const stateKey = "zone:" + key;
    if (data.zoneQuiz[key] === "ok" || knowTry()[stateKey] === "ok") {
      fillFacility(item.title, [para("這則記過了。"), para(item.why), para(item.source)]);
      return;
    }
    if (data.zoneQuiz[key] === "no") knowTry()[stateKey] = knowTry()[stateKey] || "miss";
    if (knowTry()[stateKey] === "miss") {
      fillFacility(item.title, [
        para("上次沒答對。先讀文章再重答。重答答對的遊戲獎勵減半。"),
        para(item.why),
        button("去看文章", "primary", function () {
          openArticle(learnPack().articleFor(key), {
            mark: function () { knowTry()[stateKey] = "read"; },
            back: function () { openZoneStory(near); }
          });
        })
      ]);
      return;
    }
    const nodes = [para(item.q)];
    if (knowTry()[stateKey] === "read") nodes.push(para("這是重答。答對的遊戲金幣和經驗減半。"));
    item.options.forEach(function (text, index) {
      nodes.push(button(text, "option", function () {
        const retry = knowTry()[stateKey] === "read";
        if (index !== item.best) {
          data.zoneQuiz[key] = "no";
          knowTry()[stateKey] = "miss";
          save();
          fillFacility("教練", [
            para("這次沒有金幣，也沒有經驗。讀完可以重答，重答答對只給一半。"),
            para(item.why),
            para(item.source),
            button("去看文章", "primary", function () {
              openArticle(learnPack().articleFor(key), {
                mark: function () { knowTry()[stateKey] = "read"; },
                back: function () { openZoneStory(near); }
              });
            })
          ]);
          return;
        }
        data.zoneQuiz[key] = "ok";
        knowTry()[stateKey] = "ok";
        const gain = retry ? 2 : 4;
        earnCash(gain, near.zone + "故事");
        state.xp[role] = (state.xp[role] || 0) + gain;
        save();
        renderHud();
        fillFacility("答對了", [
          para("遊戲金幣 " + gain + "、經驗 " + gain + (retry ? "（減半）。" : "。") + "數字是遊戲值。"),
          para(item.why),
          para(item.source)
        ]);
      }));
    });
    fillFacility(item.title, nodes);
  }

  function openHarvest() {
    if (harvestLeft() <= 0) {
      showToast("今天的 5 次收成用完了。遊戲次數。");
      return;
    }
    const data = bag();
    if (data.harvestDay !== taipeiDate()) {
      data.harvestDay = taipeiDate();
      data.harvestCount = 0;
    }
    data.harvestCount += 1;
    earnCash(4, "農田收成");
    state.xp[role] = (state.xp[role] || 0) + 3;
    const storm = hash(dayNumber(taipeiDate()), data.harvestCount) < 0.28;
    save();
    renderHud();
    if (!storm) {
      showReward("收成。遊戲金幣 4、經驗 3。今天還可 " + harvestLeft() + " 次。");
      return;
    }
    const covered = !!policiesOf().home;
    const due = covered ? LIFE_COVERS.home.deductible : 20;
    const paid = Math.min(due, cashOf(role));
    if (paid) payCash(paid, "田裡風雨");
    save();
    fillFacility("田裡風雨", [
      para("這次用遊戲值比較。有住宅練習時付自負額 " + LIFE_COVERS.home.deductible + "，沒有就自己付 20。作物和設施不會自動含在火災裡。"),
      para("你這次" + (covered ? "有住宅練習，付 " + due : "沒有住宅練習，自己付 " + due) + "。都是遊戲值，不是保費，也不推薦商品。"),
      para("今天還可收成 " + harvestLeft() + " 次。")
    ]);
  }

  function openHike() {
    if (hikeLeft() <= 0) {
      showToast("今天的 3 次山徑用完了。遊戲次數。");
      return;
    }
    const data = bag();
    if (data.hikeDay !== taipeiDate()) {
      data.hikeDay = taipeiDate();
      data.hikeCount = 0;
    }
    data.hikeCount += 1;
    state.xp[role] = (state.xp[role] || 0) + 4;
    const hurt = hash(dayNumber(taipeiDate()), data.hikeCount + 9) < 0.3;
    if (!hurt) {
      earnCash(3, "山徑走走");
      save();
      renderHud();
      showReward("走完一段。遊戲金幣 3、經驗 4。還可 " + hikeLeft() + " 次。");
      return;
    }
    const covered = !!policiesOf().accident;
    const due = covered ? LIFE_COVERS.accident.deductible : 18;
    const paid = Math.min(due, cashOf(role));
    if (paid) payCash(paid, "山徑扭傷");
    save();
    renderHud();
    fillFacility("山徑扭傷", [
      para("遊戲值：有意外練習只付自負額 " + LIFE_COVERS.accident.deductible + "，沒有就自己付 18。骨折住院還要另看醫療約定，不會自動附帶。"),
      para("你這次" + (covered ? "有意外練習，付 " + due : "沒有意外練習，自己付 " + due) + "。不是商品建議。"),
      para("今天還可 " + hikeLeft() + " 次。")
    ]);
  }

  function openHarborFish() {
    if (isTyphoon()) {
      fillFacility("颱風停航", [
        para("今天港口漁村的加釣休息，和蘆灣一樣。這是遊戲天氣。"),
        para("漁船、船舶責任和颱風停航不會自動算進火災保險。有沒有另外約定，要看條款。不推薦商品。")
      ]);
      return;
    }
    if (harborLeft() <= 0) {
      showToast("今天的 3 次加釣用完了。遊戲次數。");
      return;
    }
    const data = bag();
    if (data.harborDay !== taipeiDate()) {
      data.harborDay = taipeiDate();
      data.harborCasts = 0;
    }
    data.harborCasts += 1;
    earnCash(5, "漁村加釣");
    state.xp[role] = (state.xp[role] || 0) + 3;
    save();
    renderHud();
    showReward("加釣。遊戲金幣 5、經驗 3。還可 " + harborLeft() + " 次。海上意外和船體要分開看。");
  }

  function applyLocalLevel() {
    const host = location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") return;
    const lv = Number(new URLSearchParams(location.search).get("lv"));
    if (!lv || !role) return;
    const need = LEVEL_XP[lv - 1];
    if (need == null) return;
    state.xp[role] = Math.max(xpOf(), need);
  }

  function openNotice() {
    const pack = (window.HEAN_ISSUE && window.HEAN_ISSUE.notices) || [];
    const nodes = [para("這裡的公司和罰鍰都是虛構的遊戲值。不點名真實公司，也不留電話。")];
    pack.forEach(function (item) {
      nodes.push(para(item.title + " · " + item.line));
      nodes.push(para(item.lesson));
    });
    nodes.push(para("申訴櫃檯：先向自己的保險公司書面說明不同意的地方，保留回覆。仍不服，再依當時公開的評議程序。訴訟不是第一步。本遊戲不代寫、不代送、不留電話。"));
    fillFacility("主管機關公告欄", nodes);
  }

  function openGuide() {
    document.getElementById("menu-panel").hidden = true;
    const data = bag();
    const today = taipeiDate();
    issueState();
    if (data.clientDay !== today) data.clientSteps = 0;
    if (data.approachDay !== today) data.approachCount = 0;
    const nodes = [para("遊戲規則。帶我去會改走目前這條路。數字都是遊戲值。")];
    LEVEL_TABLE.forEach(function (row) {
      nodes.push(para("Lv." + row.lv + (levelOf() >= row.lv ? " 已開" : "") + "　" + row.text));
    });
    nodes.push(para("陌開還可 " + Math.max(0, approachLimit() - (data.approachCount || 0)) + " / " + approachLimit()));
    nodes.push(para("運動 " + (data.sportDay === today ? "今天做過" : "今天還可 1 次")));
    nodes.push(para("麥穗抽籤 " + (data.drawDay === today ? "今天抽過" : "今天還可 1 次")));
    nodes.push(para("月刊問答還可 " + Math.max(0, 5 - (data.issueCount || 0)) + " / 5，本月已解鎖 " + issueUnlocked().length + " 題"));
    nodes.push(para("寶箱還可 " + Math.max(0, 5 - (data.chestDay === today ? (data.chestCount || 0) : 0)) + " / 5"));
    nodes.push(para("釣魚還可 " + Math.max(0, 5 - (data.castDay === today ? (data.casts || 0) : 0)) + " / 5"));
    nodes.push(para("客戶步驟還可 " + Math.max(0, 5 - (data.clientSteps || 0)) + " / 5"));
    nodes.push(para("農田收成還可 " + harvestLeft() + " / 5"));
    nodes.push(para("山林走走還可 " + hikeLeft() + " / 3"));
    nodes.push(para("漁村加釣 " + (isTyphoon() ? "颱風日休息" : "還可 " + harborLeft() + " / 3")));
    nodes.push(para(today.slice(5, 7) === "12" ? "12 月限定圍巾：" + (wearingScarf() ? "已戴上" : "完成一項今日任務可取得") : "聖誕圍巾只在台北時間 12/1–12/31 出現。"));
    nodes.push(button("去月刊問答", "primary", function () { closeTips(); guideToPoint(560, 820); }));
    nodes.push(button("去公告欄", "ghost", function () { closeTips(); guideToPoint(760, 820); }));
    nodes.push(button("去運動角", "ghost", function () { closeTips(); guideToPoint(775, 760); }));
    nodes.push(button("去麥穗廣場", "ghost", function () { closeTips(); guideToPoint(640, 520); }));
    nodes.push(button("去銀行", "ghost", function () { closeTips(); guideTo("銀行"); }));
    nodes.push(button("去農田區", "ghost", function () { closeTips(); guideTo("農田區"); }));
    nodes.push(button("去山林區", "ghost", function () { closeTips(); guideTo("山林區"); }));
    nodes.push(button("去港口漁村", "ghost", function () { closeTips(); guideTo("港口漁村"); }));
    fillFacility("小鎮攻略", nodes);
  }

  function learnPack() {
    return window.HEAN_LEARN || { articles: [], tips: [], articleFor: function () { return "clause"; }, article: function () { return null; }, tipIndex: function () { return 0; }, suggestRank: function () { return 1; } };
  }

  function knowTry() {
    const data = bag();
    if (!data.knowTry || typeof data.knowTry !== "object" || Array.isArray(data.knowTry)) data.knowTry = {};
    return data.knowTry;
  }

  function openArticle(id, resume) {
    const spec = learnPack().article(id);
    if (!spec) return;
    const data = bag();
    if (!data.readArticles || typeof data.readArticles !== "object") data.readArticles = {};
    const nodes = [para(spec.rankName + " · 新人訓練" + spec.stage)];
    spec.body.forEach(function (line) { nodes.push(para(line)); });
    nodes.push(para("教學文章。不推薦商品，不承諾報酬，也不教節稅。"));
    nodes.push(button("讀完了", "primary", function () {
      data.readArticles[id] = taipeiDate();
      if (resume && resume.mark) resume.mark();
      save();
      if (resume && resume.back) resume.back();
      else openLibrary();
    }));
    nodes.push(button("回圖書館", "ghost", openLibrary));
    fillFacility(spec.title, nodes);
  }

  function openQuiz(near) {
    refreshDailySpots();
    const quiz = lifeData().quizzes.filter(function (item) { return item.id === near.quizId; })[0];
    if (!quiz) return;
    const today = taipeiDate();
    const data = bag();
    if (!data.quizDone) data.quizDone = {};
    const stateKey = "quiz:" + quiz.id;
    if (data.quizDone[quiz.id] === today || knowTry()[stateKey] === "ok") {
      showToast("這則今天聽過了。明天會換一批。");
      return;
    }
    if (knowTry()[stateKey] === "miss") {
      fillFacility(quiz.title, [
        para("這題上次沒答對。先讀對應的文章，再回來重答。"),
        para("重答答對的遊戲經驗減半。"),
        para(quiz.why),
        button("去看文章", "primary", function () {
          openArticle(learnPack().articleFor(quiz.id), {
            mark: function () { knowTry()[stateKey] = "read"; },
            back: function () { openQuiz(near); }
          });
        })
      ]);
      return;
    }
    const nodes = [para(quiz.story), para(quiz.q)];
    if (knowTry()[stateKey] === "read") nodes.push(para("這是重答。答對只給一半遊戲經驗。"));
    quiz.options.forEach(function (text, index) {
      nodes.push(button(text, "option", function () { answerQuiz(near, quiz, index); }));
    });
    nodes.push(para("虛構情境。不點名真實公司。"));
    fillFacility(quiz.title, nodes);
  }

  function answerQuiz(near, quiz, index) {
    const today = taipeiDate();
    const good = index === quiz.best;
    const data = bag();
    if (!data.quizDone) data.quizDone = {};
    const stateKey = "quiz:" + quiz.id;
    const retry = knowTry()[stateKey] === "read";
    if (!good) {
      knowTry()[stateKey] = "miss";
      save();
      fillFacility("再看一次", [
        para("這次沒有遊戲經驗。讀完文章可以重答，重答答對只給一半。"),
        para(quiz.why),
        para(quiz.source),
        button("去看文章", "primary", function () {
          openArticle(learnPack().articleFor(quiz.id), {
            mark: function () { knowTry()[stateKey] = "read"; },
            back: function () { openQuiz(near); }
          });
        }),
        para("教學說明，不是法律意見，也不保證給付。")
      ]);
      return;
    }
    data.quizDone[quiz.id] = today;
    knowTry()[stateKey] = "ok";
    data.quizRight = (data.quizRight || 0) + 1;
    const gain = retry ? 3 : 6;
    const before = levelOf();
    state.xp[role] = (state.xp[role] || 0) + gain;
    const after = levelOf();
    animateXp(before, after);
    if (data.quizRight >= 10) earnBadge("quiz10");
    if (after > before) noteLevel();
    save();
    renderHud();
    fillFacility("答對了", [
      para(retry ? "重答答對。遊戲經驗 " + gain + "（減半）。這是遊戲值。" : "這則記下了。遊戲經驗 " + gain + "。這是遊戲值。"),
      para(quiz.why),
      para(quiz.source),
      para("教學說明，不是法律意見，也不保證給付。")
    ]);
  }

  function openBadges() {
    document.getElementById("menu-panel").hidden = true;
    const owned = bag().badges || {};
    const nodes = [para("徽章是遊戲收集，不是證照，也沒有真實獎勵。")];
    lifeData().badges.forEach(function (item) {
      nodes.push(para((owned[item.id] ? "已收集 · " : "未收集 · ") + item.name + " — " + item.hint));
    });
    fillFacility("徽章", nodes);
  }

  function openRadio() {
    const list = lifeData().radio;
    if (!list.length) return;
    const index = radioIndex();
    const item = list[index];
    earnBadge("radio");
    fillFacility("正在播 · " + item.title, [
      para(item.body),
      para("下一檔：" + list[(index + 1) % list.length].title),
      para("依台北時間每 30 分鐘換一則。遊戲短文，不推薦商品。")
    ]);
  }

  function radioIndex() {
    const list = lifeData().radio;
    if (!list.length) return 0;
    const clock = taipeiParts();
    return Math.floor((clock.hour * 60 + clock.minute) / 30) % list.length;
  }

  function paintRadio() {
    const box = document.getElementById("radio");
    const now = document.getElementById("radio-now");
    const next = document.getElementById("radio-next");
    const list = lifeData().radio;
    if (!box || !now || !next || !list.length || !role) return;
    const index = radioIndex();
    now.textContent = "正在播 " + list[index].title;
    next.textContent = "下一檔 " + list[(index + 1) % list.length].title;
  }

  function recruitedPeople() {
    const seen = {};
    const people = [];
    function add(id, name) {
      if (!id || seen[id]) return;
      seen[id] = true;
      people.push({ id: id, name: name || id });
    }
    Object.keys(approachBook()).forEach(function (id) {
      if ((approachBook()[id].stage || 0) < 2) return;
      const spot = SPOTS.filter(function (item) { return item.id === id; })[0];
      add(id, spot && spot.name);
    });
    Object.keys(clientBook()).forEach(function (id) {
      const known = CLIENTS.filter(function (item) { return item.id === id; })[0];
      const spot = SPOTS.filter(function (item) { return item.id === id; })[0];
      add(id, (spot && spot.name) || (known && known.name));
    });
    return people;
  }

  function openClientBook() {
    if (role !== "agent" && role !== "broker") {
      showToast("客戶、消費者這個身分沒有客戶簿。");
      return;
    }
    document.getElementById("menu-panel").hidden = true;
    const nodes = [para("按下一個人，會自動走過去。跨區若還沒解鎖，會走到入口並提示。一天最多 5 步，每一步要隔天。")];
    const people = recruitedPeople();
    Object.keys(approachBook()).forEach(function (id) {
      if ((approachBook()[id].stage || 0) < 1) return;
      if (people.some(function (person) { return person.id === id; })) return;
      const spot = SPOTS.filter(function (item) { return item.id === id; })[0];
      people.push({ id: id, name: (spot && spot.name) || id });
    });
    if (!people.length) nodes.push(para("還沒有人留下聯絡。先在路上完成破冰。"));
    people.forEach(function (person) {
      const spot = personSpot(person);
      nodes.push(button(person.name + " · 下一步：" + clientNext(person.id), "ghost", function () {
        if (!spot) {
          showToast("地圖上還沒有這一位的位置。");
          return;
        }
        walkToPlace({ x: spot.x, y: spot.y, zone: spot.zone || "" });
      }));
    });
    nodes.push(para("今天已用 " + (bag().clientSteps || 0) + " / 5。"));
    fillFacility("客戶簿", nodes);
  }

  function openTips() {
    document.getElementById("menu-panel").hidden = true;
    const data = bag();
    const today = taipeiDate();
    if (data.castDay !== today) data.casts = 0;
    const chestLeft = Math.max(0, 5 - (data.chestDay === today ? (data.chestCount || 0) : 0));
    const fishLeft = Math.max(0, 5 - (data.castDay === today ? (data.casts || 0) : 0));
    const pets = data.pets || {};
    document.getElementById("menu-panel").hidden = true;
    const nodes = [
      para("遊戲裡的次數。帶我去會取消原本的走路。"),
      para("今日薪水：" + (data.daily === today ? "已領" : "進鎮時領")),
      para("寶箱還可開 " + chestLeft + " 個。"),
      para("釣魚還有 " + fishLeft + " 竿。"),
      para("小狗：" + (pets.dog === today ? "今天摸過" : "還沒") + " · 小貓：" + (pets.cat === today ? "今天摸過" : "還沒") + " · 小雞：" + (pets.hen === today ? "今天摸過" : "還沒")),
      button("去河邊", "primary", function () { closeTips(); guideToPoint(480, 1532); }),
      button("去超商打工或買東西", "ghost", function () { closeTips(); guideTo("超商"); }),
      button("去銀行", "ghost", function () { closeTips(); guideTo("銀行"); })
    ];
    if (role === "agent" || role === "broker") nodes.push(button("去找鎮民", "ghost", function () { closeTips(); guideToPoint(820, 430); }));
    fillFacility("賺錢小秘籍", nodes);
  }

  function closeTips() {
    document.getElementById("facility").hidden = true;
    document.body.classList.remove("ui-busy");
  }

  function guideToPoint(x, y) {
    if (area !== "town") setArea("town", 170, 360);
    path = findPath(player.x, player.y, x, y);
  }

  function chargePremiums() {
    Object.keys(LIFE_COVERS).forEach(function (key) {
      if (!policiesOf()[key]) return;
      const spec = LIFE_COVERS[key];
      if (payCash(spec.premium, spec.name + "本日保費")) return;
      policiesOf()[key] = false;
      noteMoney("out", spec.name + "停效，現金不夠", 0);
    });
  }

  function noteZoneVisit() {
    ZONES.forEach(function (zone) {
      if (player.x > zone.x && player.x < zone.x + zone.w && player.y > zone.y && player.y < zone.y + zone.h && levelOf() >= zone.level) {
        if (!bag().zones[zone.name]) grantPlaceXp(zone.name);
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
    const spawn = { x: 295, y: 434 };
    const startC = clamp(Math.round(spawn.x / CS), 0, cols - 1);
    const startR = clamp(Math.round(spawn.y / CS), 0, rows - 1);
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
    townSeen = seen;
    const chestAudit = auditChests(seen);
    chestAudit.forEach(function (item) {
      console.error("chest unreachable", item.id, item.x, item.y, item.reasons.join(","));
    });
    area = prev;
    buildNav();
  }

  function auditChests(seen) {
    const fails = [];
    function check(id, x, y) {
      const reasons = [];
      if (solidAt(x, y, 16)) reasons.push("inside-solid");
      const stands = [[0, 0], [42, 0], [-42, 0], [0, 42], [0, -42]];
      const ok = stands.some(function (offset) {
        const sx = x + offset[0];
        const sy = y + offset[1];
        if (solidAt(sx, sy, 14)) return false;
        const c = clamp(Math.round(sx / CS), 0, cols - 1);
        const r = clamp(Math.round(sy / CS), 0, rows - 1);
        return !!(seen && seen[c + r * cols]);
      });
      if (!ok) reasons.push("no-path-from-spawn");
      if (reasons.length) fails.push({ id: id, x: x, y: y, reasons: reasons });
    }
    SPOTS.forEach(function (s) {
      if (s.facility === "chest") check(s.id, s.x, s.y);
    });
    Object.keys(CHEST_POINTS).forEach(function (zone) {
      CHEST_POINTS[zone].forEach(function (p, index) {
        check(zone + "#" + index, p.x, p.y);
      });
    });
    return fails;
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
      if (!waterBits && backdropMode() === "map") {
        ensureWater();
        if (area === "town") buildNav();
        townLayer = null;
      }
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
    setHour: function (hour, minute) { hourOverride = hour; minuteOverride = minute || 0; townLayer = null; },
    setWeekday: function (day) { weekdayOverride = day; townLayer = null; },
    setTyphoon: function (on) { forceTyphoon = on; },
    showSolids: function (on) { showSolids = on !== false; },
    facadeOf: function (name) { return FACADE[name] || null; },
    stops: function () {
      const doors = BUILDINGS.filter(function (b) { return FACADE[b.name] || b.name === "小鎮法院"; }).map(function (b) {
        const door = townDoor(b);
        return { name: b.name, x: door.x, y: door.y, solid: solidAt(door.x, door.y, 12) };
      });
      const zones = ZONES.map(function (zone) {
        const dest = zone.enter || zone.back;
        return { name: zone.name, x: dest.x, y: dest.y, solid: solidAt(dest.x, dest.y, 12) };
      });
      return { doors: doors, zones: zones };
    },
    reach: function (x, y) {
      const prev = area;
      area = "town";
      buildNav();
      const route = findPath(player.x, player.y, x, y);
      area = prev;
      if (prev !== "town") buildNav();
      if (!route || !route.length) return { ok: false, len: 0 };
      const end = route[route.length - 1];
      return { ok: Math.hypot(end.x - x, end.y - y) < 48, len: route.length, x: end.x, y: end.y };
    },
    setDate: function (day) { dateOverride = day || null; },
    auditChests: function () {
      const prev = area;
      area = "town";
      buildNav();
      const report = auditChests(townSeen);
      area = prev;
      buildNav();
      return report;
    },
    isOpen: isOpen,
    openLibrary: openLibrary,
    openClientBook: openClientBook,
    openDailyTip: openDailyTip,
    previewWrong: function () {
      refreshDailySpots();
      const near = SPOTS.filter(function (s) { return s.facility === "quiz"; })[0];
      if (!near) return "no-quiz";
      knowTry()["quiz:" + near.quizId] = "miss";
      openQuiz(near);
      return near.quizId;
    },
    isTyphoon: isTyphoon,
    pathLen: function () { return path ? path.length : 0; },
    area: function () { return area; },
    sleep: sleepNight,
    forceEvent: function (id) { bag().forceEvent = id; },
    ghosts: function () {
      return GHOSTS.map(function (ghost) {
        return { nickname: ghost.nickname, level: ghost.level, x: ghost.x, y: ghost.y };
      });
    }
  };
})();
