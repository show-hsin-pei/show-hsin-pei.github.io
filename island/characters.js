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
    look.blush = look.blush || "rgba(226, 118, 108, 0.55)";
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
    "player-consumer": { skin: "#f6d3b6", hair: "#241c1a", hairStyle: "bob", coat: "#c4a36a", shirt: "#fff6ea", pants: "#4a3a32", shoes: "#2a2422", mouth: "smile", eyes: "bright", extra: "scarf", extraColor: "#f0d5b4" },
    "player-agent": { skin: "#f3d0b2", hair: "#1c1614", hairStyle: "side", coat: "#3a4558", coatLight: "#546278", coatDeep: "#2a3344", shirt: "#f7f5f0", pants: "#242a32", shoes: "#161412", mouth: "calm", eyes: "bright", extra: "tie", extraColor: "#8d3434" },
    "player-broker": { skin: "#f2cdb0", hair: "#1c1614", hairStyle: "short", coat: "#3d5348", coatLight: "#5d7568", coatDeep: "#2c3d34", shirt: "#f7f4ee", pants: "#24302c", shoes: "#161412", mouth: "calm", eyes: "bright", extra: "glasses" },
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
    "broker-scope": { skin: "#f2cdb0", hair: "#4a342e", hairStyle: "long", coat: "#b9916a", shirt: "#fff8f1", mouth: "calm", eyes: "kind", extra: "glasses" },
    "garage-voluntary": { skin: "#e8c2a4", hair: "#2a221c", hairStyle: "crop", coat: "#8a623e", shirt: "#f6f0e6", pants: "#3a342e", mouth: "calm", eyes: "kind", extra: "cap", extraColor: "#5c4636" },
    "hospital-reimburse": { skin: "#f6d0b8", hair: "#241c1a", hairStyle: "ponytail", coat: "#d7e4ea", shirt: "#fff", pants: "#5c6a72", mouth: "smile", eyes: "bright" },
    "pet-visit": { skin: "#f3c9aa", hair: "#5c3828", hairStyle: "short", coat: "#d7a05a", shirt: "#fff6ea", mouth: "bright", eyes: "bright", extra: "apron", extraColor: "#f4e7cf" },
    "park-walk": { skin: "#e7c3a4", hair: "#3a3028", hairStyle: "side", coat: "#6e8a62", shirt: "#f7f3ea", pants: "#3e4638", mouth: "calm", eyes: "kind" },
    "lake-rest": { skin: "#f0c6aa", hair: "#6a5348", hairStyle: "bob", coat: "#7aa0b0", shirt: "#f7f4ee", mouth: "soft", eyes: "kind" },
    "trail-sign": { skin: "#e4bc98", hair: "#2c241e", hairStyle: "crop", coat: "#8d6a45", shirt: "#f6efe4", pants: "#3e342c", mouth: "calm", eyes: "narrow", extra: "cap", extraColor: "#6a4e34" },
    "bank-counter": { skin: "#f4d0b4", hair: "#241c1a", hairStyle: "short", coat: "#3e5348", shirt: "#f7f5f0", pants: "#2c3330", mouth: "calm", eyes: "kind", extra: "tie", extraColor: "#8d5a3c" },
    "critical-name": { skin: "#f0c8a8", hair: "#3a2c28", hairStyle: "side", coat: "#6e8a58", shirt: "#f4f7ef", mouth: "worried", eyes: "kind" },
    "disability-define": { skin: "#e4bc98", hair: "#6a5348", hairStyle: "crop", coat: "#7f97a4", shirt: "#f4f7f8", mouth: "calm", eyes: "narrow", age: "elder" },
    "care-wait": { skin: "#f3c9aa", hair: "#5c4038", hairStyle: "bob", coat: "#8aa0b0", shirt: "#f7f4ee", mouth: "soft", eyes: "kind" },
    "home-contents": { skin: "#e8c2a4", hair: "#8a8078", hairStyle: "side", coat: "#8d6b45", shirt: "#f6f1e6", mouth: "worried", eyes: "kind", age: "elder" },
    "liability-who": { skin: "#e7c3a4", hair: "#2c241e", hairStyle: "crop", coat: "#a67c52", shirt: "#f8f3ea", mouth: "calm", eyes: "kind" },
    "liability-cap": { skin: "#f0c6aa", hair: "#3a3028", hairStyle: "short", coat: "#a67c52", shirt: "#fff8ef", mouth: "worried", eyes: "narrow" }
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
    if (look.build === "broad") return 24;
    if (look.build === "slim") return 18;
    return 21;
  }

  function paintSprite(ctx, look, phase) {
    const swing = Math.sin(phase * Math.PI * 2);
    const bob = -Math.abs(Math.sin(phase * Math.PI * 2)) * 1.6;
    ctx.save();
    ctx.translate(swing * 0.6, bob);
    arm(ctx, 1, phase, look);
    leg(ctx, -1, phase, look);
    leg(ctx, 1, phase, look);
    torso(ctx, look);
    arm(ctx, -1, phase, look);
    neck(ctx, look);
    hairBack(ctx, look);
    head(ctx, look);
    ears(ctx, look);
    bangs(ctx, look);
    face(ctx, look);
    hairShine(ctx, look);
    if (look.hairStyle === "cap" || look.extra === "cap") drawCap(ctx, look);
    extras(ctx, look);
    ctx.restore();
  }

  function leg(ctx, side, phase, look) {
    const ang = (phase + (side < 0 ? 0.5 : 0)) * Math.PI * 2;
    const x = Math.sin(ang) * 5.2;
    const lift = Math.max(0, Math.sin(ang)) * 3.4;
    const hip = side * 3.2;
    const footX = side * 2.4 + x;
    const footY = -1.4 - lift;
    ctx.strokeStyle = look.pants;
    ctx.lineWidth = look.build === "broad" ? 5.2 : 4.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(hip, -16);
    ctx.quadraticCurveTo(hip + x * 0.25, -9, footX, footY);
    ctx.stroke();
    ctx.strokeStyle = shade(look.pants, 28);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(hip + side * 0.4, -15);
    ctx.quadraticCurveTo(hip + x * 0.25, -9, footX - side * 0.3, footY + 0.4);
    ctx.stroke();
    ctx.fillStyle = look.shoes;
    ctx.beginPath();
    ctx.ellipse(footX + 1.2, footY + 0.6, 5.1, 2.35, side * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.ellipse(footX - 0.2, footY - 0.1, 1.7, 0.7, -0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  function arm(ctx, side, phase, look) {
    const ang = (phase + (side < 0 ? 0 : 0.5)) * Math.PI * 2;
    const x = Math.sin(ang) * 4.6;
    const y = Math.cos(ang) * 1.2;
    const shoulder = torsoWidth(look) / 2 - 1;
    const handX = side * (shoulder + 1) + x;
    const handY = -15 + y;
    ctx.strokeStyle = look.coat;
    ctx.lineWidth = 4.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(side * shoulder, -30);
    ctx.quadraticCurveTo(side * (shoulder + 3), -23 + y * 0.4, handX, handY + 1);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(side * shoulder, -29);
    ctx.quadraticCurveTo(side * (shoulder + 2), -23, handX - side, handY + 1);
    ctx.stroke();
    ctx.fillStyle = look.shirt;
    roundRect(ctx, handX - 2.2, handY - 1.2, 4.4, 3.2, 1);
    ctx.fill();
    ctx.fillStyle = look.skin;
    ctx.beginPath();
    ctx.arc(handX, handY + 1.6, 2.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(120, 70, 50, 0.25)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  function torso(ctx, look) {
    const w = torsoWidth(look);
    const suited = look.extra === "tie" || look.extra2 === "tie";
    const g = ctx.createLinearGradient(-w / 2, -34, w / 2, -14);
    g.addColorStop(0, look.coatLight);
    g.addColorStop(0.48, look.coat);
    g.addColorStop(1, look.coatDeep);
    roundRect(ctx, -w / 2, -33, w, 18, 7);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "rgba(70, 48, 36, 0.28)";
    ctx.lineWidth = 0.9;
    ctx.stroke();
    ctx.fillStyle = look.shirt;
    ctx.beginPath();
    ctx.moveTo(-4.6, -33);
    ctx.lineTo(0, -24);
    ctx.lineTo(4.6, -33);
    ctx.closePath();
    ctx.fill();
    if (suited) {
      ctx.fillStyle = look.coatDeep;
      ctx.beginPath();
      ctx.moveTo(-4.4, -33);
      ctx.lineTo(-0.6, -24);
      ctx.lineTo(-5.4, -22);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(4.4, -33);
      ctx.lineTo(0.6, -24);
      ctx.lineTo(5.4, -22);
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 2.5, -28);
    ctx.quadraticCurveTo(-2, -31, 1, -27);
    ctx.stroke();
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
    const g = ctx.createRadialGradient(-5, -56, 2, 1, -48, 16);
    g.addColorStop(0, look.skinLight);
    g.addColorStop(0.55, look.skin);
    g.addColorStop(1, look.skinDeep);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, -48, 15.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(150, 96, 78, 0.28)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  function ears(ctx, look) {
    ctx.fillStyle = look.skin;
    ctx.beginPath();
    ctx.ellipse(-14.2, -48, 2.5, 3.3, 0, 0, Math.PI * 2);
    ctx.ellipse(14.2, -48, 2.5, 3.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(196, 120, 104, 0.35)";
    ctx.beginPath();
    ctx.ellipse(-14.3, -48, 1.1, 1.8, 0, 0, Math.PI * 2);
    ctx.ellipse(14.3, -48, 1.1, 1.8, 0, 0, Math.PI * 2);
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

  function bangs(ctx, look) {
    const style = look.hairStyle;
    ctx.fillStyle = look.hair;
    if (style === "balding") {
      ctx.beginPath();
      ctx.ellipse(-9, -50, 5, 7, 0.35, 0, Math.PI * 2);
      ctx.ellipse(9, -50, 5, 7, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-8, -58);
      ctx.quadraticCurveTo(0, -64, 8, -58);
      ctx.quadraticCurveTo(0, -60, -8, -58);
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(-13, -52);
    ctx.quadraticCurveTo(-10, -66, 0, -65.5);
    ctx.quadraticCurveTo(11, -66, 13, -52);
    ctx.quadraticCurveTo(7, -55.5, 0, -54.5);
    ctx.quadraticCurveTo(-7, -55.5, -13, -52);
    ctx.fill();
    if (style === "side") {
      ctx.beginPath();
      ctx.moveTo(-12, -54);
      ctx.quadraticCurveTo(-4, -50, 2, -56);
      ctx.quadraticCurveTo(-4, -58, -12, -54);
      ctx.fill();
    }
    ctx.strokeStyle = shade(look.hair, 18);
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(-6, -60);
    ctx.quadraticCurveTo(-2, -56, -5, -53);
    ctx.moveTo(2, -62);
    ctx.quadraticCurveTo(5, -57, 3, -54);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function hairShine(ctx, look) {
    if (look.hairStyle === "balding") return;
    ctx.fillStyle = look.hairLight;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.ellipse(-4, -61, 4.2, 2.1, -0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.ellipse(3, -59, 2.2, 1.1, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
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
    const worried = look.mouth === "worried";
    const smile = look.mouth === "smile" || look.mouth === "bright";
    [-1, 1].forEach(function (side) {
      const ex = side * 5.1;
      ctx.fillStyle = "#fffdfb";
      ctx.beginPath();
      ctx.ellipse(ex, eyeY, narrow ? 3.1 : 4.15, narrow ? 2.5 : 4.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3a2a24";
      ctx.beginPath();
      ctx.arc(ex, eyeY + 0.45, narrow ? 1.55 : 2.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1a120f";
      ctx.beginPath();
      ctx.arc(ex, eyeY + 0.7, narrow ? 0.75 : 1.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(ex - 0.85, eyeY - 0.55, 0.85, 0, Math.PI * 2);
      ctx.arc(ex + 0.7, eyeY + 0.85, 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = look.hair;
      ctx.lineWidth = 1.35;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(ex - 3.6, eyeY - 1.2);
      ctx.quadraticCurveTo(ex, eyeY - 5.4, ex + 3.8, eyeY - 1.4);
      ctx.stroke();
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(ex + 3.2, eyeY + 1.6);
      ctx.quadraticCurveTo(ex + 4.2, eyeY + 2.6, ex + 3.4, eyeY + 3.2);
      ctx.stroke();
      const browLift = worried ? -1.3 : smile ? 0.4 : 0;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(ex - 3.2, eyeY - 5.2 + (worried ? browLift * side : 0));
      ctx.quadraticCurveTo(ex, eyeY - 6.6 + browLift, ex + 3.4, eyeY - 5.1);
      ctx.stroke();
    });
    if (look.age === "elder") {
      ctx.strokeStyle = "rgba(150, 100, 84, 0.4)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-8, eyeY + 2);
      ctx.lineTo(-6.2, eyeY + 2.6);
      ctx.moveTo(8, eyeY + 2);
      ctx.lineTo(6.2, eyeY + 2.6);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(196, 132, 112, 0.55)";
    ctx.beginPath();
    ctx.ellipse(0.4, -44.6, 0.7, 0.95, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#c96b66";
    ctx.lineWidth = smile ? 1.35 : 1.15;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (worried) {
      ctx.moveTo(-2.2, -40.6);
      ctx.quadraticCurveTo(0, -42.2, 2.2, -40.6);
    } else if (smile) {
      ctx.moveTo(-3.1, -41.2);
      ctx.quadraticCurveTo(0, -38.6, 3.1, -41.2);
    } else {
      ctx.moveTo(-2.1, -40.8);
      ctx.quadraticCurveTo(0, -39.8, 2.1, -40.8);
    }
    ctx.stroke();
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
    if (look.extra === "tie" || look.extra2 === "tie") {
      ctx.fillStyle = look.extraColor;
      ctx.beginPath();
      ctx.moveTo(0, -31.5);
      ctx.lineTo(-2.3, -28.2);
      ctx.lineTo(0, -26.6);
      ctx.lineTo(2.3, -28.2);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-1.7, -27.2);
      ctx.lineTo(0, -17.5);
      ctx.lineTo(1.7, -27.2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(-0.35, -26, 0.9, 7);
    }
    const items = [look.extra, look.extra2];
    items.forEach(function (item) {
      if (item === "tie") return;
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

  const SW = 92;
  const SH = 118;
  const SCALE = 2;
  const PLAYER_FRAMES = 16;
  const sheets = {};
  const imageSheets = {};

  /*
   * 之後若要換成圖：列的順序固定為 down, left, right, up，每一欄是一格走路。
   * HEAN_CHARS.useImageSheet(id, image) 
   * image 需已載入，寬度可被欄數整除、高度可被 4 整除。
   * 場景底圖則指定 HEAN_ASSETS.scenes.town / .home（已載入的圖），會蓋過程式繪製。
   */
  function useImageSheet(id, image) {
    imageSheets[id] = image;
  }

  function drawSheet(ctx, id, facing, frame, dx, dy, dw, dh) {
    const image = imageSheets[id];
    if (!image || !image.complete || !image.naturalWidth) return false;
    const rowName = { down: 0, left: 1, right: 2, up: 3 };
    const row = rowName[facing] == null ? 0 : rowName[facing];
    const rows = 4;
    const fh = image.naturalHeight / rows;
    const cols = Math.max(1, Math.round(image.naturalWidth / 256) === 4 ? 4 : Math.round(image.naturalWidth / (fh * 256 / 320)));
    const fw = image.naturalWidth / cols;
    const col = Math.abs(Math.floor(frame)) % cols;
    const prevSmooth = ctx.imageSmoothingEnabled;
    const prevQuality = ctx.imageSmoothingQuality;
    if (image._smooth) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
    ctx.drawImage(image, col * fw, row * fh, fw, fh, dx, dy, dw, dh);
    ctx.imageSmoothingEnabled = prevSmooth;
    if (prevQuality) ctx.imageSmoothingQuality = prevQuality;
    return true;
  }

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
    ctx.translate(w * 0.5, h * 1.05);
    ctx.scale(4.35, 4.35);
    paintSprite(ctx, look, 0);
    ctx.restore();
    ctx.strokeStyle = "rgba(165, 134, 90, 0.35)";
    ctx.lineWidth = 2;
    roundRect(ctx, 1, 1, w - 2, h - 2, 36);
    ctx.stroke();
  }

  Object.keys(LOOKS).forEach(function (id) { sheetFor(id); });

  window.HEAN_LOOKS = LOOKS;
  function paintAvatar(canvas, id) {
    const look = LOOKS[id];
    if (!look) return;
    const g = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    g.clearRect(0, 0, w, h);
    g.fillStyle = "#f3e6d0";
    g.fillRect(0, 0, w, h);
    g.save();
    g.translate(w / 2, h * 0.98);
    g.scale(1.45, 1.45);
    paintSprite(g, look, 0);
    g.restore();
  }

  window.HEAN_CHARS = {
    SW: SW,
    SH: SH,
    SCALE: SCALE,
    sheetFor: sheetFor,
    paintPortrait: paintPortrait,
    paintAvatar: paintAvatar,
    useImageSheet: useImageSheet,
    drawSheet: drawSheet
  };
})();
