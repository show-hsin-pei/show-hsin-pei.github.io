/* 藝世錄保險小鎮的家與室內。全部是這支程式自己畫的，沒有外來圖片。 */
(function () {
  const ROOM = { w: 720, h: 920 };
  const HOME = { w: 720, h: 920 };
  const homeTv = { x: 500, y: 146, w: 164, h: 96 };
  const TIPS = [
    "先把每個月一定要花的錢寫下來",
    "緊急用的錢，放在取得方便的地方",
    "借錢之前，先算每個月還得起多少",
    "契約怎麼寫，比口頭記得的更算數",
    "報酬越高，通常要自己承擔的風險也越高",
    "把支出分成需要和想要，比較不容易超支",
    "保單要整份看，不要只看封面那一行"
  ];

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function blocks(kind) {
    if (kind === "home") {
      return [
        { x: 8, y: 300, w: 100, h: 200 },
        { x: 478, y: 232, w: 196, h: 48 },
        { x: 40, y: 648, w: 160, h: 58 }
      ];
    }
    return [
      { x: 36, y: 228, w: 230, h: 64 }
    ];
  }

  function woodFloor(ctx, x, y, w, h) {
    ctx.fillStyle = "#f4e3c6";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(150, 110, 64, 0.28)";
    ctx.lineWidth = 1;
    for (let row = 0; row < h; row += 32) {
      const offset = ((row / 32) | 0) % 2 === 0 ? 0 : 54;
      ctx.beginPath();
      ctx.moveTo(x, y + row);
      ctx.lineTo(x + w, y + row);
      ctx.stroke();
      for (let col = -54 + offset; col < w; col += 108) {
        ctx.beginPath();
        ctx.moveTo(x + col, y + row);
        ctx.lineTo(x + col, Math.min(y + h, y + row + 32));
        ctx.stroke();
        ctx.strokeStyle = "rgba(176, 136, 86, 0.2)";
        ctx.beginPath();
        ctx.moveTo(x + col + 10, y + row + 10);
        ctx.quadraticCurveTo(x + col + 50, y + row + 14, x + col + 90, y + row + 9);
        ctx.stroke();
        ctx.strokeStyle = "rgba(150, 110, 64, 0.28)";
      }
    }
  }

  function wallpaper(ctx, x, y, w, h) {
    ctx.fillStyle = "#f4ead8";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "rgba(214, 190, 156, 0.55)";
    for (let i = 0; i < w; i += 18) ctx.fillRect(x + i, y, 7, h);
    ctx.strokeStyle = "rgba(120, 86, 52, 0.15)";
    ctx.strokeRect(x, y, w, h);
  }

  function frame(ctx, w, h) {
    ctx.fillStyle = "#6a4632";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#8a5e42";
    ctx.fillRect(8, 8, w - 16, h - 16);
    ctx.fillStyle = "#5a3a28";
    ctx.fillRect(0, 0, w, 14);
    ctx.fillRect(0, h - 14, w, 14);
    ctx.fillRect(0, 0, 14, h);
    ctx.fillRect(w - 14, 0, 14, h);
  }

  function windowView(ctx, x, y, w, h) {
    roundRect(ctx, x - 8, y - 8, w + 16, h + 16, 6);
    ctx.fillStyle = "#6a4632";
    ctx.fill();
    const sky = ctx.createLinearGradient(x, y, x, y + h);
    sky.addColorStop(0, "#8ec4e6");
    sky.addColorStop(1, "#d7eef8");
    ctx.fillStyle = sky;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(x + w * 0.3, y + 16, 16, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(x + w * 0.48, y + 18, 20, 9, 0, 0, Math.PI * 2);
    ctx.ellipse(x + w * 0.7, y + 14, 14, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#6a4632";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y + h);
    ctx.moveTo(x, y + h / 2);
    ctx.lineTo(x + w, y + h / 2);
    ctx.stroke();
    ctx.fillStyle = "#f7efe2";
    ctx.fillRect(x - 10, y, 12, h);
    ctx.fillRect(x + w - 2, y, 12, h);
    ctx.fillStyle = "rgba(214, 186, 150, 0.55)";
    ctx.fillRect(x - 6, y + 8, 6, h - 16);
    ctx.fillRect(x + w, y + 8, 6, h - 16);
  }

  function bed(ctx, x, y) {
    roundRect(ctx, x, y + 16, 190, 100, 10);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    roundRect(ctx, x + 8, y + 28, 174, 78, 8);
    ctx.fillStyle = "#8aa0b0";
    ctx.fill();
    ctx.fillStyle = "#d5e2ea";
    ctx.fillRect(x + 16, y + 36, 70, 18);
    roundRect(ctx, x + 18, y, 70, 36, 8);
    ctx.fillStyle = "#f4efe6";
    ctx.fill();
    ctx.fillStyle = "#e7d3c0";
    ctx.fillRect(x + 28, y + 8, 48, 16);
  }

  function tv(ctx, x, y) {
    roundRect(ctx, x, y + 52, 200, 46, 6);
    ctx.fillStyle = "#8a5a3c";
    ctx.fill();
    ctx.fillStyle = "#c4a36a";
    ctx.fillRect(x + 16, y + 64, 36, 8);
    ctx.fillRect(x + 70, y + 64, 50, 8);
    roundRect(ctx, x + 28, y, 140, 64, 6);
    ctx.fillStyle = "#5a4034";
    ctx.fill();
    roundRect(ctx, x + 36, y + 8, 124, 46, 4);
    ctx.fillStyle = "#1c4a34";
    ctx.fill();
  }

  function rug(ctx, x, y, w, h) {
    roundRect(ctx, x, y, w, h, 18);
    ctx.fillStyle = "#a84848";
    ctx.fill();
    ctx.strokeStyle = "#f0d2b0";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 236, 214, 0.7)";
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.ellipse(x + 30 + i * 28, y + h / 2, 8, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function table(ctx, x, y) {
    roundRect(ctx, x, y, 176, 88, 10);
    ctx.fillStyle = "#c4925a";
    ctx.fill();
    ctx.fillStyle = "#e7c99a";
    roundRect(ctx, x + 10, y + 10, 56, 36, 4);
    ctx.fill();
    ctx.fillStyle = "#f7f1e6";
    ctx.fillRect(x + 16, y + 16, 40, 8);
    ctx.fillRect(x + 16, y + 28, 28, 6);
    ctx.fillStyle = "#6f8f62";
    ctx.beginPath();
    ctx.ellipse(x + 112, y + 28, 16, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3e6a48";
    ctx.fillRect(x + 110, y + 18, 4, 16);
  }

  function plant(ctx, x, y) {
    ctx.fillStyle = "#c47a4a";
    ctx.beginPath();
    ctx.moveTo(x, y + 28);
    ctx.lineTo(x + 28, y + 28);
    ctx.lineTo(x + 24, y + 8);
    ctx.lineTo(x + 4, y + 8);
    ctx.fill();
    ctx.fillStyle = "#6f8f62";
    ctx.beginPath();
    ctx.ellipse(x + 14, y + 6, 16, 12, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 4, y + 12, 10, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 24, y + 12, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function cushion(ctx, x, y) {
    ctx.fillStyle = "#d7b07a";
    ctx.beginPath();
    ctx.ellipse(x, y, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(120, 80, 40, 0.25)";
    ctx.stroke();
  }

  function door(ctx, x, y, label) {
    roundRect(ctx, x, y, 96, 84, 8);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    roundRect(ctx, x + 8, y + 8, 80, 66, 6);
    ctx.fillStyle = "#c4895a";
    ctx.fill();
    ctx.fillStyle = "#f3e2c4";
    ctx.beginPath();
    ctx.arc(x + 70, y + 42, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5c3a28";
    ctx.font = "600 14px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "center";
    if (label) ctx.fillText(label, x + 43, y - 10);
  }

  function clock(ctx, x, y) {
    ctx.fillStyle = "#f7f1e6";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#6a4632";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 12);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 8, y + 2);
    ctx.stroke();
  }

  function curtains(ctx, x, y, w, h) {
    windowView(ctx, x + 18, y + 8, w - 36, h - 16);
    ctx.fillStyle = "#c4896a";
    ctx.fillRect(x, y, 22, h);
    ctx.fillRect(x + w - 22, y, 22, h);
    ctx.fillStyle = "#a86b52";
    ctx.fillRect(x, y, w, 10);
  }

  function frontalTv(ctx, screen) {
    roundRect(ctx, screen.x - 18, screen.y + screen.h - 4, screen.w + 36, 42, 6);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    ctx.fillStyle = "#c4a36a";
    ctx.fillRect(screen.x + 8, screen.y + screen.h + 10, 36, 6);
    ctx.fillRect(screen.x + screen.w - 28, screen.y + screen.h + 10, 28, 6);
    roundRect(ctx, screen.x - 8, screen.y - 8, screen.w + 16, screen.h + 16, 6);
    ctx.fillStyle = "#3f342c";
    ctx.fill();
    roundRect(ctx, screen.x, screen.y, screen.w, screen.h, 3);
    ctx.fillStyle = "#16382c";
    ctx.fill();
  }

  function lowTable(ctx, x, y) {
    roundRect(ctx, x, y, 150, 48, 8);
    ctx.fillStyle = "#c4925a";
    ctx.fill();
    ctx.fillStyle = "#e7d3b0";
    ctx.fillRect(x + 16, y + 12, 36, 8);
    ctx.fillRect(x + 22, y + 22, 28, 6);
    ctx.fillStyle = "#f7f1e6";
    ctx.fillRect(x + 70, y + 14, 42, 18);
  }

  function doormat(ctx, x, y) {
    roundRect(ctx, x, y, 92, 52, 6);
    ctx.fillStyle = "#c4a36a";
    ctx.fill();
    ctx.strokeStyle = "#8d6b45";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function euroRug(ctx, x, y, w, h) {
    roundRect(ctx, x, y, w, h, 8);
    ctx.fillStyle = "#9a3d3d";
    ctx.fill();
    ctx.strokeStyle = "#f0d7b4";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 236, 214, 0.55)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 4; i++) {
      ctx.strokeRect(x + 18 + i * ((w - 36) / 4), y + 16, (w - 52) / 4, h - 32);
    }
  }

  function paintShell(ctx, w, h) {
    ctx.fillStyle = "#6a4632";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#8a5e42";
    ctx.fillRect(16, 16, w - 32, 150);
    wallpaper(ctx, 28, 156, w - 56, 96);
    woodFloor(ctx, 28, 252, w - 56, h - 252 - 78);
    ctx.fillStyle = "#6a4632";
    ctx.fillRect(0, h - 78, w, 78);
    ctx.fillRect(0, 0, 18, h);
    ctx.fillRect(w - 18, 0, 18, h);
  }

  function paintHome(ctx, now) {
    const w = HOME.w;
    const h = HOME.h;
    paintShell(ctx, w, h);
    curtains(ctx, 46, 164, 150, 74);
    clock(ctx, 280, 196);
    roundRect(ctx, 8, 300, 108, 200, 8);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    roundRect(ctx, 20, 318, 84, 166, 6);
    ctx.fillStyle = "#d5e4ee";
    ctx.fill();
    ctx.fillStyle = "#f7f1e6";
    ctx.fillRect(30, 328, 46, 22);
    euroRug(ctx, 188, 400, 340, 150);
    lowTable(ctx, 42, 650);
    frontalTv(ctx, homeTv);
    doormat(ctx, (w - 92) / 2, h - 132);
    const shift = reduceShift(now);
    const screen = homeTv;
    ctx.save();
    roundRect(ctx, screen.x, screen.y, screen.w, screen.h, 3);
    ctx.clip();
    ctx.fillStyle = "#d7f0c8";
    ctx.font = "600 13px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const line = TIPS.join("    ·    ") + "    ·    ";
    const width = ctx.measureText(line).width;
    const x0 = screen.x + 8 - (shift % width);
    ctx.fillText(line, x0, screen.y + screen.h / 2);
    ctx.fillText(line, x0 + width, screen.y + screen.h / 2);
    ctx.restore();
  }

  function reduceShift(now) {
    return now * 36;
  }

  function paintInterior(ctx, kind) {
    const w = ROOM.w;
    const h = ROOM.h;
    const look = {
      clinic: ["#f7f3ea", "藥櫃"],
      tea: ["#f3e6cf", "茶桌"],
      garage: ["#d7d2c8", "工具"],
      stall: ["#f3e6cf", "文件"]
    }[kind] || ["#f6f1e6", "桌子"];
    paintShell(ctx, w, h);
    curtains(ctx, 46, 164, 150, 74);
    clock(ctx, 620, 198);
    counter(ctx, 40, 236, look[0], look[1]);
    euroRug(ctx, 210, 420, 300, 130);
    stool(ctx, 150, 330);
    doormat(ctx, (w - 92) / 2, h - 132);
  }

  function counter(ctx, x, y, color, label) {
    roundRect(ctx, x, y, 220, 52, 8);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    roundRect(ctx, x + 8, y + 8, 204, 28, 6);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "#5c4636";
    ctx.font = "600 15px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x + 110, y + 28);
  }

  function stool(ctx, x, y) {
    ctx.fillStyle = "#a87444";
    ctx.beginPath();
    ctx.ellipse(x, y, 22, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6a4632";
    ctx.fillRect(x - 14, y + 4, 5, 16);
    ctx.fillRect(x + 9, y + 4, 5, 16);
  }

  function paint(ctx, kind, now) {
    if (kind === "home") paintHome(ctx, now || 0);
    else paintInterior(ctx, kind);
  }

  window.HEAN_ROOMS = { ROOM: ROOM, HOME: HOME, homeTv: homeTv, blocks: blocks, paint: paint };
})();
