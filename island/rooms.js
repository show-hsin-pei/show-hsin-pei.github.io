/* 藝世錄保險小鎮的家與室內。全部是這支程式自己畫的，沒有外來圖片。 */
(function () {
  const ROOM = { w: 800, h: 560 };
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
        { x: 48, y: 86, w: 200, h: 118 },
        { x: 530, y: 78, w: 220, h: 128 },
        { x: 300, y: 248, w: 160, h: 78 },
        { x: 64, y: 270, w: 54, h: 54 }
      ];
    }
    if (kind === "clinic") {
      return [
        { x: 70, y: 90, w: 180, h: 90 },
        { x: 520, y: 96, w: 200, h: 110 },
        { x: 300, y: 250, w: 140, h: 70 }
      ];
    }
    if (kind === "tea") {
      return [
        { x: 80, y: 120, w: 150, h: 80 },
        { x: 520, y: 120, w: 150, h: 80 },
        { x: 300, y: 250, w: 160, h: 80 }
      ];
    }
    if (kind === "garage") {
      return [
        { x: 60, y: 90, w: 220, h: 100 },
        { x: 520, y: 100, w: 200, h: 120 }
      ];
    }
    if (kind === "stall") {
      return [
        { x: 80, y: 100, w: 200, h: 80 },
        { x: 500, y: 110, w: 180, h: 90 }
      ];
    }
    return [
      { x: 70, y: 96, w: 180, h: 100 },
      { x: 530, y: 90, w: 190, h: 110 },
      { x: 320, y: 250, w: 140, h: 64 }
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
    roundRect(ctx, x, y, 150, 70, 10);
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

  function door(ctx, x, y) {
    roundRect(ctx, x, y, 86, 70, 8);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    roundRect(ctx, x + 8, y + 8, 70, 54, 6);
    ctx.fillStyle = "#c4895a";
    ctx.fill();
    ctx.fillStyle = "#f3e2c4";
    ctx.beginPath();
    ctx.arc(x + 62, y + 36, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5c3a28";
    ctx.font = "600 14px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("出門", x + 43, y - 8);
  }

  function paintHome(ctx, now) {
    const w = ROOM.w;
    const h = ROOM.h;
    frame(ctx, w, h);
    woodFloor(ctx, 22, 22, w - 44, h - 44);
    wallpaper(ctx, 28, 28, w - 56, 150);
    windowView(ctx, 250, 46, 150, 86);
    bed(ctx, 48, 78);
    tv(ctx, 540, 70);
    rug(ctx, 250, 300, 280, 130);
    table(ctx, 300, 248);
    plant(ctx, 64, 250);
    cushion(ctx, 620, 340);
    door(ctx, 357, h - 86);
    const shift = reduceShift(now);
    ctx.save();
    roundRect(ctx, 576, 78, 124, 46, 4);
    ctx.clip();
    ctx.fillStyle = "#d7f0c8";
    ctx.font = "600 16px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const line = TIPS.join("    ·    ") + "    ·    ";
    const width = ctx.measureText(line).width;
    const x0 = 576 - (shift % width);
    ctx.fillText(line, x0, 100);
    ctx.fillText(line, x0 + width, 100);
    ctx.restore();
  }

  function reduceShift(now) {
    return now * 36;
  }

  function paintInterior(ctx, kind) {
    const w = ROOM.w;
    const h = ROOM.h;
    frame(ctx, w, h);
    woodFloor(ctx, 22, 22, w - 44, h - 44);
    wallpaper(ctx, 28, 28, w - 56, 160);
    windowView(ctx, 300, 42, 170, 96);
    if (kind === "clinic") {
      counter(ctx, 70, 110, "#f7f3ea", "藥櫃");
      bed(ctx, 500, 90);
      plant(ctx, 250, 250);
    } else if (kind === "tea") {
      table(ctx, 80, 140);
      table(ctx, 520, 140);
      plant(ctx, 360, 200);
    } else if (kind === "garage") {
      counter(ctx, 60, 110, "#d7d2c8", "工具");
      ctx.fillStyle = "#4a4a4a";
      ctx.beginPath();
      ctx.ellipse(620, 160, 36, 36, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c4a36a";
      ctx.lineWidth = 6;
      ctx.stroke();
    } else if (kind === "stall") {
      counter(ctx, 80, 120, "#f3e6cf", "文件");
      plant(ctx, 540, 140);
    } else {
      counter(ctx, 70, 110, "#f6f1e6", "桌子");
      plant(ctx, 560, 120);
      rug(ctx, 260, 300, 240, 100);
    }
    door(ctx, 357, h - 86);
    ctx.fillStyle = "#5c3a28";
    ctx.font = "600 14px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("回小鎮", 400, h - 98);
  }

  function counter(ctx, x, y, color, label) {
    roundRect(ctx, x, y, 190, 70, 8);
    ctx.fillStyle = "#8d5a3a";
    ctx.fill();
    roundRect(ctx, x + 8, y + 8, 174, 40, 6);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "#5c4636";
    ctx.font = "600 14px \"Noto Sans TC\", \"Microsoft JhengHei\", \"WenQuanYi Micro Hei\", sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x + 95, y + 32);
  }

  function paint(ctx, kind, now) {
    if (kind === "home") paintHome(ctx, now || 0);
    else paintInterior(ctx, kind);
  }

  window.HEAN_ROOMS = { ROOM: ROOM, blocks: blocks, paint: paint };
})();
