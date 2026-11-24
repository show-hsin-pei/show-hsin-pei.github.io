/* 藝世錄保險小鎮的人物。同一套暖色，每人髮型、五官、衣服層次不同。 */
(function () {
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const ch = function (v) { return Math.max(0, Math.min(255, v)); };
    const r = ch((n >> 16) + amt);
    const g = ch(((n >> 8) & 255) + amt);
    const b = ch((n & 255) + amt);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function finish(look) {
    look.skinLight = look.skinLight || shade(look.skin, 24);
    look.skinDeep = look.skinDeep || shade(look.skin, -26);
    look.coatLight = look.coatLight || shade(look.coat, 32);
    look.coatDeep = look.coatDeep || shade(look.coat, -34);
    look.hairLight = look.hairLight || shade(look.hair, 40);
    look.blush = look.blush || "rgba(206, 124, 110, 0.42)";
    look.shirt = look.shirt || "#fff8ef";
    look.pants = look.pants || "#5c4638";
    look.shoes = look.shoes || "#46362c";
    look.build = look.build || "average";
    look.mouth = look.mouth || "soft";
    look.eyes = look.eyes || "round";
    look.extra = look.extra || "none";
    look.extra2 = look.extra2 || "none";
    look.extraColor = look.extraColor || "#f3e2c8";
    return look;
  }

  const RAW = {
    "player-consumer": { skin: "#f4d2b4", hair: "#5a4034", hairStyle: "bob", coat: "#c4a36a", shirt: "#fff6ea", pants: "#6a5142", mouth: "smile", eyes: "kind", extra: "scarf", extraColor: "#f0d5b4" },
    "player-agent": { skin: "#f0c8a6", hair: "#3a2e28", hairStyle: "side", coat: "#b98362", shirt: "#fffdf8", pants: "#4a3c34", mouth: "calm", eyes: "round", extra: "tie", extraColor: "#8d5a42", extra2: "clipboard" },
    "player-broker": { skin: "#efc9aa", hair: "#4a3a32", hairStyle: "short", coat: "#7f8f78", shirt: "#f7f3ea", pants: "#3f4a42", mouth: "calm", eyes: "kind", extra: "glasses" },
    "clinic-necessity": { skin: "#f0c6a4", hair: "#4a342c", hairStyle: "bun", coat: "#c46b5a", shirt: "#fff3ea", mouth: "worried", eyes: "kind", extra: "shawl", extraColor: "#f0c8bc", age: "mid" },
    "free-look": { skin: "#f6d6ba", hair: "#6a4634", hairStyle: "ponytail", coat: "#e0a070", shirt: "#fffaf3", mouth: "bright", eyes: "bright", extra: "bag", extraColor: "#f4e1c4", age: "young" },
    "waiting-period": { skin: "#f3cdb0", hair: "#5c382e", hairStyle: "wavy", coat: "#c47a8a", shirt: "#fff5f0", mouth: "smile", eyes: "kind", extra: "apron", extraColor: "#f6ead8" },
    "disclosure-form": { skin: "#e4bc9a", hair: "#8d8178", hairStyle: "balding", coat: "#8d6b45", shirt: "#f7f1e6", pants: "#4a3c34", mouth: "worried", eyes: "narrow", extra: "glasses", age: "elder" },
    "exclusion-print": { skin: "#e8c0a0", hair: "#3e322c", hairStyle: "crop", coat: "#6e7d64", shirt: "#f4efe4", mouth: "calm", eyes: "round", extra: "cap", extraColor: "#5e6b58", extra2: "vest", build: "average" },
    "rider-ends": { skin: "#f5d4b6", hair: "#3a2c26", hairStyle: "crop", coat: "#6d8a86", shirt: "#f7f4ee", pants: "#3e4a48", mouth: "bright", eyes: "bright", extra: "bag", extraColor: "#d7c4a4", age: "young", build: "slim" },
    "complaint-path": { skin: "#eec6a6", hair: "#332824", hairStyle: "short", coat: "#a36b4a", shirt: "#fff8f2", mouth: "worried", eyes: "narrow", extra: "clipboard" },
    "lapse-reinstate": { skin: "#ecc4a4", hair: "#4a382e", hairStyle: "side", coat: "#9a7048", shirt: "#fff6ec", mouth: "worried", eyes: "kind" },
    "beneficiary-update": { skin: "#e6bea0", hair: "#9a8e86", hairStyle: "graybun", coat: "#b56b78", shirt: "#fff4ee", mouth: "soft", eyes: "kind", extra: "shawl", extraColor: "#f3d5cc", age: "elder" },
    "compulsory-auto": { skin: "#e8c2a2", hair: "#2e2622", hairStyle: "crop", coat: "#5f6e6a", shirt: "#f3eee6", pants: "#3a403c", mouth: "calm", eyes: "narrow", extra: "cap", extraColor: "#4d5c58", extra2: "vest", build: "broad" },
    "storm-flood": { skin: "#e7c0a2", hair: "#7a6a62", hairStyle: "bob", coat: "#7d8f72", shirt: "#f6f3ea", mouth: "worried", eyes: "kind", age: "elder" },
    "claim-docs": { skin: "#f3d0b2", hair: "#5a3c32", hairStyle: "bob", coat: "#c48a6a", shirt: "#fff8f1", mouth: "soft", eyes: "round", extra: "bag", extraColor: "#edd7bc" },
    "face-sign": { skin: "#f1c9ac", hair: "#3c2c28", hairStyle: "long", coat: "#c9a36e", shirt: "#fffaf4", mouth: "calm", eyes: "kind" },
    "no-rebate": { skin: "#f0c8a8", hair: "#2c2420", hairStyle: "crop", coat: "#8a623e", shirt: "#fff6ee", mouth: "smile", eyes: "bright", build: "slim" },
    "no-proxy-sign": { skin: "#ecc6a6", hair: "#3a302c", hairStyle: "side", coat: "#6d5a48", shirt: "#f7f2ea", mouth: "worried", eyes: "narrow" },
    "broker-fee": { skin: "#e4bc9c", hair: "#8a8078", hairStyle: "side", coat: "#6e8468", shirt: "#f6f3ea", pants: "#3e4840", mouth: "calm", eyes: "kind", extra: "glasses", age: "elder" },
    "broker-commission": { skin: "#efc9aa", hair: "#342c28", hairStyle: "short", coat: "#5f6e62", shirt: "#f8f5ee", mouth: "calm", eyes: "round", extra: "tie", extraColor: "#7a5a42" },
    "health-blank": { skin: "#f0c8a8", hair: "#4a342c", hairStyle: "crop", coat: "#9c5c48", shirt: "#fff5ee", mouth: "worried", eyes: "round" },
    "no-misstate": { skin: "#f6d4b8", hair: "#5c3030", hairStyle: "wavy", coat: "#a86a78", shirt: "#fff6f4", mouth: "worried", eyes: "bright", age: "young" },
    "no-guarantee": { skin: "#efc8aa", hair: "#4a3430", hairStyle: "bun", coat: "#c4926a", shirt: "#fff7f0", mouth: "worried", eyes: "kind", extra: "shawl", extraColor: "#f1d2bc" },
    "broker-conflict": { skin: "#e6c0a2", hair: "#6e6660", hairStyle: "side", coat: "#5d6e5c", shirt: "#f5f2ea", mouth: "calm", eyes: "narrow", age: "elder" },
    "broker-scope": { skin: "#f2cdb0", hair: "#4a342e", hairStyle: "long", coat: "#b9916a", shirt: "#fff8f1", mouth: "calm", eyes: "kind", extra: "glasses" }
  };

  const LOOKS = {};
  Object.keys(RAW).forEach(function (id) { LOOKS[id] = finish(RAW[id]); });

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function torsoWidth(look) {
    if (look.build === "broad") return 26;
    if (look.build === "slim") return 20;
    return 23;
  }

  function paintSprite(ctx, look, phase) {
    const swing = Math.sin(phase * Math.PI * 2);
    const bob = -Math.abs(Math.sin(phase * Math.PI * 2)) * 1.35;
    ctx.save();
    ctx.translate(0, bob);

    arm(ctx, 1, phase, look);
    leg(ctx, -1, phase, look);
    leg(ctx, 1, phase, look);
    torso(ctx, look);
    arm(ctx, -1, phase, look);
    neck(ctx, look);
    hairBack(ctx, look);
    head(ctx, look);
    ears(ctx, look);
    hairFront(ctx, look, swing);
    face(ctx, look);
    if (look.hairStyle === "cap" || look.extra === "cap") drawCap(ctx, look);
    extras(ctx, look, phase);
    ctx.restore();
  }

  function leg(ctx, side, phase, look) {
    const ang = (phase + (side < 0 ? 0.5 : 0)) * Math.PI * 2;
    const x = Math.sin(ang) * 4.4;
    const lift = Math.max(0, Math.sin(ang)) * 3.1;
    ctx.strokeStyle = look.pants;
    ctx.lineWidth = look.build === "broad" ? 4.8 : 4.1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(side * 3.8, -15);
    ctx.quadraticCurveTo(side * 3.4 + x * 0.35, -8, side * 3.1 + x, -2.2 - lift);
    ctx.stroke();
    ctx.fillStyle = shade(look.pants, 18);
    ctx.beginPath();
    ctx.ellipse(side * 3.1 + x, -1.1 - lift, 4.3, 2.05, side * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = look.shoes;
    ctx.beginPath();
    ctx.ellipse(side * 3.3 + x, -0.7 - lift, 4.5, 2.15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade(look.shoes, 28);
    ctx.beginPath();
    ctx.ellipse(side * 2.4 + x, -1.3 - lift, 1.6, 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function arm(ctx, side, phase, look) {
    const ang = (phase + (side < 0 ? 0 : 0.5)) * Math.PI * 2;
    const x = Math.sin(ang) * 3.8;
    const y = Math.cos(ang) * 1.4;
    const shoulder = torsoWidth(look) / 2 - 1;
    ctx.strokeStyle = look.coatDeep;
    ctx.lineWidth = 3.7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(side * shoulder, -31);
    ctx.quadraticCurveTo(side * (shoulder + 4), -24 + y, side * (shoulder + 1) + x, -15 + y);
    ctx.stroke();
    ctx.strokeStyle = look.coatLight;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(side * shoulder, -30);
    ctx.quadraticCurveTo(side * (shoulder + 3), -23 + y, side * shoulder + x, -16 + y);
    ctx.stroke();
    ctx.fillStyle = look.skin;
    ctx.beginPath();
    ctx.arc(side * (shoulder + 1) + x, -14.2 + y, 2.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = look.skinDeep;
    ctx.beginPath();
    ctx.arc(side * (shoulder + 1.4) + x, -13.6 + y, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  function torso(ctx, look) {
    const w = torsoWidth(look);
    const g = ctx.createLinearGradient(-w / 2, -38, w / 2, -14);
    g.addColorStop(0, look.coatLight);
    g.addColorStop(0.42, look.coat);
    g.addColorStop(1, look.coatDeep);
    roundRect(ctx, -w / 2, -36, w, 22, 8);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "rgba(90, 60, 40, 0.16)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = look.shirt;
    ctx.beginPath();
    ctx.moveTo(-4.2, -36);
    ctx.lineTo(0, -29.5);
    ctx.lineTo(4.2, -36);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 3, -30);
    ctx.quadraticCurveTo(0, -33, w / 2 - 4, -28);
    ctx.stroke();
    ctx.fillStyle = shade(look.coatLight, 10);
    ctx.beginPath();
    ctx.arc(0, -25.5, 0.95, 0, Math.PI * 2);
    ctx.arc(0, -21.2, 0.95, 0, Math.PI * 2);
    ctx.fill();
  }

  function neck(ctx, look) {
    ctx.fillStyle = look.skinDeep;
    roundRect(ctx, -3.3, -39.2, 6.6, 6, 2);
    ctx.fill();
    ctx.fillStyle = look.skin;
    roundRect(ctx, -2.6, -39.4, 4.2, 5, 2);
    ctx.fill();
  }

  function head(ctx, look) {
    const g = ctx.createRadialGradient(-4, -56, 2, 0, -49, 14);
    g.addColorStop(0, look.skinLight);
    g.addColorStop(0.62, look.skin);
    g.addColorStop(1, look.skinDeep);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, -49, 12.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function ears(ctx, look) {
    ctx.fillStyle = look.skin;
    ctx.beginPath();
    ctx.ellipse(-11.6, -49, 2.3, 3.1, 0, 0, Math.PI * 2);
    ctx.ellipse(11.6, -49, 2.3, 3.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(196, 120, 104, 0.35)";
    ctx.beginPath();
    ctx.ellipse(-11.7, -49, 1.05, 1.7, 0, 0, Math.PI * 2);
    ctx.ellipse(11.7, -49, 1.05, 1.7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function hairBack(ctx, look) {
    ctx.fillStyle = look.hair;
    const style = look.hairStyle;
    if (style === "long" || style === "wavy" || style === "bob" || style === "ponytail") {
      const len = style === "long" ? 26 : style === "wavy" ? 22 : style === "bob" ? 16 : 12;
      roundRect(ctx, -16, -48, 7, len, 4);
      ctx.fill();
      roundRect(ctx, 9, -48, 7, len, 4);
      ctx.fill();
    }
    if (style === "wavy") {
      ctx.beginPath();
      ctx.ellipse(-13, -32, 4.2, 6, 0.4, 0, Math.PI * 2);
      ctx.ellipse(13, -30, 4.2, 6.5, -0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    if (style === "ponytail") {
      ctx.beginPath();
      ctx.ellipse(14, -40, 4, 8.5, 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.extraColor || "#f0d5b4";
      ctx.beginPath();
      ctx.arc(10, -46, 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.hair;
    } else if (style === "bun" || style === "graybun") {
      ctx.beginPath();
      ctx.arc(0, -63.5, 5.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.hairLight;
      ctx.beginPath();
      ctx.arc(-1.4, -65, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.hair;
    }
  }

  function hairFront(ctx, look, swing) {
    const style = look.hairStyle;
    ctx.fillStyle = look.hair;
    if (style === "balding") {
      ctx.beginPath();
      ctx.ellipse(-8.2, -52, 4.6, 7.2, 0.3, 0, Math.PI * 2);
      ctx.ellipse(8.2, -52, 4.6, 7.2, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -58.5, 7.5, 3.2, 0, Math.PI, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, -50.2, 12.4, Math.PI, Math.PI * 2);
      ctx.fill();
      if (style === "side") {
        ctx.beginPath();
        ctx.ellipse(-6.5 + swing * 0.3, -57.5, 6, 2.8, -0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (style === "bob" || style === "long" || style === "wavy" || style === "ponytail") {
        roundRect(ctx, -13.5, -56, 4.6, 8, 2.4);
        ctx.fill();
        roundRect(ctx, 8.9, -56, 4.6, 8, 2.4);
        ctx.fill();
      }
    }
    if (style !== "balding") {
      ctx.fillStyle = look.hairLight;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(-3.5, -59, 4.6, 2.4, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawCap(ctx, look) {
    ctx.fillStyle = look.extra === "cap" ? look.extraColor : look.coatDeep;
    roundRect(ctx, -11, -62, 22, 8, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -56.5, 13, 3.4, 0, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = shade(look.extra === "cap" ? look.extraColor : look.coatDeep, 24);
    ctx.fillRect(-6, -61, 8, 2);
  }

  function face(ctx, look) {
    const eyeY = -49.2;
    const narrow = look.eyes === "narrow";
    const bright = look.eyes === "bright";
    const worried = look.mouth === "worried";
    [-1, 1].forEach(function (side) {
      ctx.fillStyle = "#fffdfb";
      ctx.beginPath();
      ctx.ellipse(side * 4.3, eyeY, bright ? 2.55 : 2.25, narrow ? 1.45 : 2.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4a342c";
      ctx.beginPath();
      ctx.arc(side * 4.35, eyeY + 0.25, bright ? 1.45 : 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2a211c";
      ctx.beginPath();
      ctx.arc(side * 4.35, eyeY + 0.35, 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(side * 3.9, eyeY - 0.45, 0.48, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = look.hair;
      ctx.lineWidth = look.age === "elder" ? 1.15 : 1.25;
      ctx.lineCap = "round";
      ctx.beginPath();
      const inner = worried ? -1.15 : 0.2;
      ctx.moveTo(side * 2.1, eyeY - 3.6 + inner);
      ctx.quadraticCurveTo(side * 4.3, eyeY - 5.3, side * 6.6, eyeY - 3.7);
      ctx.stroke();
      if (look.age === "elder") {
        ctx.strokeStyle = "rgba(150, 100, 84, 0.45)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(side * 6.8, eyeY + 1.6);
        ctx.lineTo(side * 8.2, eyeY + 2.2);
        ctx.moveTo(side * 6.6, eyeY + 3);
        ctx.lineTo(side * 8, eyeY + 3.3);
        ctx.stroke();
      }
    });
    ctx.strokeStyle = "rgba(176, 116, 98, 0.55)";
    ctx.lineWidth = 0.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0.2, -46.6);
    ctx.quadraticCurveTo(1.5, -45.1, 0.3, -44.2);
    ctx.stroke();
    ctx.strokeStyle = "#c57d78";
    ctx.fillStyle = "#e7a29c";
    ctx.lineWidth = 1.15;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (look.mouth === "worried") {
      ctx.moveTo(-2.6, -41.6);
      ctx.quadraticCurveTo(0, -43.2, 2.6, -41.6);
      ctx.stroke();
    } else if (look.mouth === "smile" || look.mouth === "bright") {
      ctx.moveTo(-3.3, -42.2);
      ctx.quadraticCurveTo(0, -39.4, 3.3, -42.2);
      ctx.stroke();
      if (look.mouth === "bright") {
        ctx.fillStyle = "rgba(196, 120, 114, 0.35)";
        ctx.beginPath();
        ctx.ellipse(0, -41.2, 2.2, 1.1, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (look.mouth === "calm") {
      ctx.moveTo(-2.5, -42);
      ctx.quadraticCurveTo(0, -40.8, 2.5, -42);
      ctx.stroke();
    } else {
      ctx.moveTo(-2.3, -42);
      ctx.quadraticCurveTo(0, -40.9, 2.3, -42);
      ctx.stroke();
    }
    ctx.fillStyle = look.blush;
    ctx.beginPath();
    ctx.ellipse(-6.4, -45.6, 2.4, 1.35, 0, 0, Math.PI * 2);
    ctx.ellipse(6.4, -45.6, 2.4, 1.35, 0, 0, Math.PI * 2);
    ctx.fill();
    if (look.extra === "glasses" || look.extra2 === "glasses") {
      ctx.strokeStyle = "#6b5344";
      ctx.lineWidth = 0.95;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(-7.4, eyeY - 2.5, 6.4, 5, 1.4) : ctx.rect(-7.4, eyeY - 2.5, 6.4, 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(1, eyeY - 2.5, 6.4, 5, 1.4) : ctx.rect(1, eyeY - 2.5, 6.4, 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-1, eyeY);
      ctx.lineTo(1, eyeY);
      ctx.moveTo(-7.4, eyeY);
      ctx.lineTo(-10.2, eyeY - 0.4);
      ctx.moveTo(7.4, eyeY);
      ctx.lineTo(10.2, eyeY - 0.4);
      ctx.stroke();
    }
  }

  function extras(ctx, look) {
    const items = [look.extra, look.extra2];
    items.forEach(function (item) {
      if (item === "scarf") {
        ctx.strokeStyle = look.extraColor;
        ctx.lineWidth = 3.3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-9, -35);
        ctx.quadraticCurveTo(0, -29.5, 9, -35);
        ctx.stroke();
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(5, -33);
        ctx.quadraticCurveTo(9, -26, 6, -18);
        ctx.stroke();
      } else if (item === "shawl") {
        ctx.strokeStyle = look.extraColor;
        ctx.lineWidth = 4.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-12, -32);
        ctx.quadraticCurveTo(0, -24, 12, -32);
        ctx.stroke();
      } else if (item === "tie") {
        ctx.fillStyle = look.extraColor;
        ctx.beginPath();
        ctx.moveTo(0, -34);
        ctx.lineTo(-2.1, -28);
        ctx.lineTo(0, -18);
        ctx.lineTo(2.1, -28);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = shade(look.extraColor, 30);
        ctx.fillRect(-0.6, -30, 1.2, 8);
      } else if (item === "apron") {
        ctx.fillStyle = look.extraColor;
        roundRect(ctx, -7, -30, 14, 15, 4);
        ctx.fill();
        ctx.strokeStyle = shade(look.extraColor, -20);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(0, -16);
        ctx.stroke();
      } else if (item === "vest") {
        ctx.fillStyle = shade(look.coat, -18);
        roundRect(ctx, -7, -34, 14, 18, 4);
        ctx.fill();
        ctx.fillStyle = look.shirt;
        ctx.fillRect(-1.4, -33, 2.8, 14);
      } else if (item === "bag") {
        ctx.fillStyle = look.extraColor;
        roundRect(ctx, 8, -24, 8, 7, 2);
        ctx.fill();
        ctx.strokeStyle = shade(look.extraColor, -30);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(9.5, -24);
        ctx.quadraticCurveTo(12, -28, 14.5, -24);
        ctx.stroke();
      } else if (item === "clipboard") {
        ctx.fillStyle = "#f7f1e4";
        roundRect(ctx, -16, -22, 7, 9, 1.4);
        ctx.fill();
        ctx.strokeStyle = "#b08968";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = "#e7d3b4";
        ctx.fillRect(-15, -21.2, 5, 1);
        ctx.fillRect(-15, -18.8, 4, 1);
      }
    });
  }

  const SW = 78;
  const SH = 96;
  const SCALE = 2;
  const PLAYER_FRAMES = 16;
  const sheets = {};

  function buildSheet(id, frames) {
    const look = LOOKS[id];
    if (!look) return null;
    const canvas = document.createElement("canvas");
    canvas.width = SW * SCALE * frames;
    canvas.height = SH * SCALE;
    const g = canvas.getContext("2d");
    g.scale(SCALE, SCALE);
    for (let i = 0; i < frames; i++) {
      g.save();
      g.translate(i * SW + SW / 2, SH - 8);
      paintSprite(g, look, frames === 1 ? 0 : i / frames);
      g.restore();
    }
    sheets[id] = { canvas: canvas, frames: frames };
    return sheets[id];
  }

  function sheetFor(id) {
    if (sheets[id]) return sheets[id];
    const frames = id.indexOf("player-") === 0 ? PLAYER_FRAMES : 1;
    return buildSheet(id, frames);
  }

  function paintPortrait(canvas, id) {
    const look = LOOKS[id];
    if (!look) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#fbf7f1");
    bg.addColorStop(1, "#f0e4d0");
    roundRect(ctx, 1, 1, w - 2, h - 2, 36);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, 1, 1, w - 2, h - 2, 36);
    ctx.clip();
    ctx.translate(w * 0.5, h * 1.22);
    ctx.scale(5.1, 5.1);
    paintSprite(ctx, look, 0);
    ctx.restore();
    ctx.strokeStyle = "rgba(165, 134, 90, 0.35)";
    ctx.lineWidth = 2;
    roundRect(ctx, 1, 1, w - 2, h - 2, 36);
    ctx.stroke();
  }

  Object.keys(LOOKS).forEach(function (id) { sheetFor(id); });

  window.HEAN_LOOKS = LOOKS;
  window.HEAN_CHARS = {
    SW: SW,
    SH: SH,
    SCALE: SCALE,
    sheetFor: sheetFor,
    paintPortrait: paintPortrait
  };
})();
