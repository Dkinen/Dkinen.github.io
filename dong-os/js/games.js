/* =========================================================
   DONG OS 98 — Dong Explorer(내 자기소개 사이트) · 50m 자유형 · 현장 카트 GP
   ========================================================= */
(function () {
  "use strict";

  var EMOJI = '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
  var PIXEL = '"Galmuri11", "Malgun Gothic", sans-serif';
  var load = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var save = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.DONG, $ = D.$, $$ = D.$$;
    var isActive = function (id) { var w = document.getElementById(id); return w.classList.contains("open") && w.classList.contains("active") && !w.classList.contains("minimized"); };

    /* =====================================================
       Dong Explorer: 고급 · 열정 버전 사이트를 창 안에서 보기
       ===================================================== */
    var exFrame = $("#ex-frame"), exUrl = $("#ex-url"), exTitle = $("#ex-title"), exStatus = $("#ex-status"), exHome = null;
    var openSite = function (url, title) {
      exHome = { url: url, title: title };
      exTitle.textContent = "🌐 " + title + " - Dong Explorer";
      exStatus.textContent = "여는 중...";
      exFrame.setAttribute("src", url);
      D.openWin("explorer");
    };
    exFrame.addEventListener("load", function () {
      try {
        exUrl.value = exFrame.contentWindow.location.href;
        var t = exFrame.contentDocument.title;
        if (t) exTitle.textContent = "🌐 " + t + " - Dong Explorer";
      } catch (e) { exUrl.value = exFrame.src; }
      exStatus.textContent = "완료";
    });
    $("#ex-back").addEventListener("click", function () { try { exFrame.contentWindow.history.back(); } catch (e) {} });
    $("#ex-home").addEventListener("click", function () { if (exHome) openSite(exHome.url, exHome.title); });
    $("#ex-pop").addEventListener("click", function () { window.open(exUrl.value || exFrame.src, "_blank", "noopener"); });
    D.closers.explorer = function () { exFrame.removeAttribute("src"); };

    var touch = window.matchMedia("(pointer: coarse)").matches;
    $$("[data-site]").forEach(function (el) {
      var go = function () { openSite(el.dataset.site, el.dataset.siteTitle || "Dong Explorer"); };
      if (el.classList.contains("icon")) {
        el.addEventListener("dblclick", function () { if (!touch) go(); });
        el.addEventListener("click", function () { if (touch) go(); });
        el.addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
      } else {
        el.addEventListener("click", function () {
          $("#start-menu").classList.remove("open");
          $("#start-btn").classList.remove("pressed");
          go();
        });
      }
    });

    /* 화면 버튼(휴대폰용)을 키 입력으로 전달 */
    var bindPad = function (winId, handler) {
      $$("#" + winId + " .pad").forEach(function (b) {
        b.addEventListener("pointerdown", function (e) { e.preventDefault(); handler(b.dataset.key); });
      });
    };

    /* =====================================================
       🏊 50m 자유형
       ===================================================== */
    (function () {
      var cv = $("#swim-canvas"), ctx = cv.getContext("2d");
      var W = cv.width, H = cv.height, X0 = 46, X1 = 606, LEN = 50;
      var LANES = [
        { name: "옆 레인 아저씨", T: 30 },
        { name: "수영 강사", T: 24.5 },
        { name: "김동현", me: true },
        { name: "웨스트브룩 (수영 초보)", T: 38 }
      ];
      var laneH = (H - 40) / LANES.length;
      var st, raf = null, last = 0;
      var reset = function () {
        st = { phase: "ready", t: 0, count: 3, x: 0, v: 0, arm: null, o2: 100, lastBreath: -9, msg: "", msgT: 0, finish: {}, place: 0 };
        LANES.forEach(function (l) { l.x = 0; l.done = null; });
        $("#swim-status").textContent = "Enter 또는 버튼을 눌러 시작";
        var b = parseFloat(load("dongos-swim-best"));
        $("#swim-best").textContent = "최고 기록 " + (b ? b.toFixed(2) + "초" : "-");
      };
      var say = function (m) { st.msg = m; st.msgT = 0.9; };
      var key = function (k) {
        if (st.phase === "ready" || (st.phase === "done" && k === "Enter" && performance.now() - st.doneAt > 1000)) {
          reset(); st.phase = "count"; st.t = 0;
          return;
        }
        if (st.phase === "done") return;
        if (st.phase !== "race") return;
        if (k === "ArrowLeft" || k === "ArrowRight") {
          if (st.arm === k) { st.v *= 0.85; say("첨벙! 같은 팔 연속"); }
          else {
            st.v = Math.min(2.6, st.v + (st.o2 > 0 ? 0.42 : 0.2));   // 초당 6번 저으면 약 21~22초
            st.o2 = Math.max(0, st.o2 - 1.2);
          }
          st.arm = k;
        } else if (k === "Space") {
          if (st.t - st.lastBreath < 0.4) return;
          st.lastBreath = st.t;
          st.o2 = Math.min(100, st.o2 + 45);
          st.v *= 0.75;
          say("푸하~");
        }
      };
      var update = function (dt) {
        if (st.phase === "count") {
          st.t += dt;
          if (st.t >= 3) { st.phase = "race"; st.t = 0; say("삑!"); $("#swim-status").textContent = "역영 중!"; }
          return;
        }
        if (st.phase !== "race") return;
        st.t += dt;
        st.v -= st.v * 0.9 * dt;
        st.o2 = Math.max(0, st.o2 - 6 * dt);
        if (st.o2 === 0 && st.msgT <= 0) say("꼬르륵... 숨 쉬세요!");
        st.x = Math.min(LEN, st.x + st.v * dt);
        st.msgT -= dt;
        LANES.forEach(function (l, i) {
          if (l.me) { l.x = st.x; }
          else { l.x = Math.min(LEN, (st.t / l.T) * LEN * (1 + 0.03 * Math.sin(st.t * 1.7 + i))); }
          if (l.x >= LEN && l.done === null) { l.done = l.me ? st.t : Math.max(st.t, l.T); }
        });
        if (st.x >= LEN) finish();
      };
      var finish = function () {
        st.phase = "done"; st.doneAt = performance.now();
        var me = st.t;
        var place = 1 + LANES.filter(function (l) { return !l.me && l.T < me; }).length;
        st.place = place;
        var best = parseFloat(load("dongos-swim-best"));
        var nb = !best || me < best;
        if (nb) save("dongos-swim-best", me.toFixed(2));
        var lines = ["", "🥇 1위! 옆 레인이 먼저 의식합니다.", "🥈 2위. 수영 강사님이 한 수 위였습니다.", "🥉 3위. 옆 레인 아저씨... 다음엔 이깁니다.", "4위. 웨스트브룩보다 느렸습니다. 농구선수한테..."];
        $("#swim-status").textContent = me.toFixed(2) + "초 · " + place + "위" + (nb ? " · 최고 기록!" : "");
        $("#swim-best").textContent = "최고 기록 " + (nb ? me : best).toFixed(2) + "초";
        D.msg("50m 자유형 결과", me.toFixed(2) + "초 · " + place + "위" + (nb ? " (최고 기록 갱신!)" : "") + "\n" + lines[place] + "\n\n다시 하려면 게임 화면을 누르거나 Enter를 누르세요.", place === 1 ? "🏆" : "🏊");
      };
      var draw = function () {
        // 물
        ctx.fillStyle = "#1b8fd1"; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1;
        for (var gx = 0; gx < W; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
        for (var gy = 0; gy < H; gy += 20) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
        // 출발대 · 도착 벽
        ctx.fillStyle = "#e9e9e9"; ctx.fillRect(0, 0, X0 - 6, H - 40); ctx.fillRect(X1 + 6, 0, W - X1 - 6, H - 40);
        // 25m 표시
        var mid = X0 + (X1 - X0) / 2;
        ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.setLineDash([6, 6]);
        ctx.beginPath(); ctx.moveTo(mid, 0); ctx.lineTo(mid, H - 40); ctx.stroke(); ctx.setLineDash([]);
        // 레인
        LANES.forEach(function (l, i) {
          var y = i * laneH;
          if (i > 0) {
            for (var rx = X0 - 6; rx < X1 + 6; rx += 12) {
              ctx.fillStyle = (Math.floor(rx / 12) % 2) ? "#e33" : "#fff";
              ctx.beginPath(); ctx.arc(rx, y, 3, 0, Math.PI * 2); ctx.fill();
            }
          }
          ctx.fillStyle = l.me ? "#ffeb3b" : "#fff";
          ctx.font = "11px " + PIXEL; ctx.textBaseline = "top";
          ctx.fillText((i + 1) + " " + l.name, X0 + 4, y + 4);
          var px = X0 + (l.x / LEN) * (X1 - X0);
          ctx.font = "26px " + EMOJI; ctx.textBaseline = "middle";
          ctx.save(); ctx.translate(px, y + laneH / 2 + 6); ctx.scale(-1, 1); ctx.fillText("🏊", -16, 0); ctx.restore();
          if (l.me && st.phase === "race" && st.v > 0.5) {
            ctx.fillStyle = "rgba(255,255,255,0.6)";
            for (var k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(px - 22 - k * 9, y + laneH / 2 + 6 + Math.sin(st.t * 12 + k) * 4, 3, 0, Math.PI * 2); ctx.fill(); }
          }
        });
        // 아래 정보줄
        ctx.fillStyle = "#c0c0c0"; ctx.fillRect(0, H - 40, W, 40);
        ctx.fillStyle = "#000"; ctx.font = "13px " + PIXEL; ctx.textBaseline = "middle";
        ctx.fillText("숨", 10, H - 20);
        ctx.fillStyle = "#fff"; ctx.fillRect(32, H - 28, 160, 16);
        ctx.fillStyle = st.o2 > 30 ? "#1e90ff" : "#e33"; ctx.fillRect(32, H - 28, 1.6 * st.o2, 16);
        ctx.strokeStyle = "#000"; ctx.strokeRect(32, H - 28, 160, 16);
        ctx.fillStyle = "#000";
        ctx.fillText("시간 " + st.t.toFixed(2) + "초", 210, H - 20);
        ctx.fillText("남은 거리 " + Math.max(0, LEN - st.x).toFixed(1) + "m", 340, H - 20);
        ctx.fillText("속도 " + st.v.toFixed(2) + "m/s", 500, H - 20);
        // 가운데 안내
        var big = null;
        if (st.phase === "ready") big = "Enter / 버튼으로 출발";
        else if (st.phase === "count") big = String(3 - Math.floor(st.t));
        else if (st.msgT > 0) big = st.msg;
        if (big) {
          ctx.font = "22px " + PIXEL; ctx.textAlign = "center";
          ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(W / 2 - 170, (H - 40) / 2 - 22, 340, 44);
          ctx.fillStyle = "#fff"; ctx.fillText(big, W / 2, (H - 40) / 2);
          ctx.textAlign = "left";
        }
      };
      var loop = function (ts) {
        var dt = last ? Math.max(0, Math.min(0.05, (ts - last) / 1000)) : 0; last = ts;   // 첫 프레임·되감긴 시간은 0
        if (!$("#swim").classList.contains("minimized")) update(dt);
        draw();
        raf = requestAnimationFrame(loop);
      };
      document.addEventListener("keydown", function (e) {
        if (!isActive("swim")) return;
        var k = e.code === "Space" ? "Space" : e.key;
        if (["ArrowLeft", "ArrowRight", "Space", "Enter"].indexOf(k) === -1) return;
        e.preventDefault();
        if (e.repeat) return;
        key(k);
      });
      bindPad("swim", key);
      cv.addEventListener("pointerdown", function () { if (st.phase !== "race") key("Enter"); });
      D.apps.swim = function () { reset(); last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
      D.closers.swim = function () { cancelAnimationFrame(raf); raf = null; };
      reset();
    })();

    /* =====================================================
       🏎️ 현장 카트 GP
       ===================================================== */
    (function () {
      var cv = $("#kart-canvas"), ctx = cv.getContext("2d");
      var W = cv.width, H = cv.height, ROAD0 = 40, ROAD1 = W - 40, NL = 4;
      var laneW = (ROAD1 - ROAD0) / NL;
      var laneX = function (i) { return ROAD0 + laneW * (i + 0.5); };
      var OBST = ["🚧", "🛢️", "🕳️"];
      var st, raf = null, last = 0;
      var reset = function () {
        st = { phase: "ready", lane: 1, x: laneX(1), speed: 230, dist: 0, chicken: 0, lives: 3, hurt: 0, boost: 0, things: [], spawn: 0, road: 0, msg: "", msgT: 0 };
        $("#kart-status").textContent = "Enter 또는 시작 버튼";
        var b = parseInt(load("dongos-kart-best"), 10);
        $("#kart-best").textContent = "최고 기록 " + (b ? b + "점" : "-");
      };
      var score = function () { return Math.floor(st.dist / 10) + st.chicken * 100; };
      var say = function (m) { st.msg = m; st.msgT = 0.8; };
      var key = function (k) {
        if (st.phase !== "race") {
          if (k === "Enter" && !(st.phase === "done" && performance.now() - st.doneAt < 1000)) { reset(); st.phase = "race"; $("#kart-status").textContent = "주행 중"; }
          return;
        }
        if (k === "ArrowLeft") st.lane = Math.max(0, st.lane - 1);
        if (k === "ArrowRight") st.lane = Math.min(NL - 1, st.lane + 1);
      };
      var spawnRow = function () {
        var lanes = [0, 1, 2, 3].sort(function () { return Math.random() - 0.5; });
        var nObs = Math.random() < 0.35 ? 2 : 1;
        for (var i = 0; i < nObs; i++) st.things.push({ lane: lanes[i], y: -30, kind: "obs", e: OBST[Math.floor(Math.random() * OBST.length)] });
        var r = Math.random();
        if (r < 0.28) st.things.push({ lane: lanes[nObs], y: -30, kind: "chicken", e: "🍗" });
        else if (r < 0.36) st.things.push({ lane: lanes[nObs], y: -30, kind: "boost", e: "🧊" });
      };
      var update = function (dt) {
        if (st.phase !== "race") return;
        var sp = st.speed * (st.boost > 0 ? 1.6 : 1);
        st.speed += 7 * dt;
        st.dist += sp * dt;
        st.road = (st.road + sp * dt) % 40;
        st.boost = Math.max(0, st.boost - dt);
        st.hurt = Math.max(0, st.hurt - dt);
        st.msgT -= dt;
        st.x += (laneX(st.lane) - st.x) * Math.min(1, dt * 14);
        st.spawn -= dt;
        if (st.spawn <= 0) { spawnRow(); st.spawn = Math.max(0.42, 230 / st.speed * 0.78); }
        var ky = H - 70;
        st.things.forEach(function (t) {
          t.y += sp * dt;
          if (t.hit) return;
          var tx = laneX(t.lane);
          if (Math.abs(t.y - ky) < 30 && Math.abs(tx - st.x) < laneW * 0.55) {
            t.hit = true;
            if (t.kind === "chicken") { st.chicken++; say("🍗 치킨 +100"); }
            else if (t.kind === "boost") { st.boost = 3; say("🧊 아아 부스터!"); }
            else if (st.boost > 0) { say("부스터로 돌파!"); }
            else if (st.hurt <= 0) {
              st.lives--; st.hurt = 1.2;
              say({ "🚧": "콘 충돌!", "🛢️": "드럼통 충돌!", "🕳️": "구덩이 빠짐!" }[t.e]);
              if (st.lives <= 0) over();
            }
          }
        });
        st.things = st.things.filter(function (t) { return t.y < H + 40 && !(t.hit && t.kind !== "obs"); });
      };
      var over = function () {
        st.phase = "done"; st.doneAt = performance.now();
        var s = score(), best = parseInt(load("dongos-kart-best"), 10) || 0, nb = s > best;
        if (nb) save("dongos-kart-best", s);
        $("#kart-status").textContent = s + "점" + (nb ? " · 최고 기록!" : "");
        $("#kart-best").textContent = "최고 기록 " + Math.max(s, best) + "점";
        D.msg("현장 카트 GP 결과", "주행 " + Math.floor(st.dist / 10) + "m · 🍗 치킨 " + st.chicken + "마리\n점수 " + s + "점" + (nb ? " (최고 기록 갱신!)" : "") + "\n\n산업안전기사 한마디: 현장에서는 서행하세요.\n다시 하려면 게임 화면이나 [시작] 버튼을 누르세요.", "🏁");
      };
      var drawKart = function (x, y) {
        ctx.save(); ctx.translate(x, y);
        ctx.fillStyle = "#111";
        [[-18, -16], [12, -16], [-18, 10], [12, 10]].forEach(function (w) { ctx.fillRect(w[0], w[1], 6, 12); });
        ctx.fillStyle = "#ff6a00"; ctx.fillRect(-13, -22, 26, 44);
        ctx.fillStyle = "#ffd200"; ctx.fillRect(-13, -22, 26, 6);
        ctx.fillStyle = "#222"; ctx.fillRect(-8, -6, 16, 14);
        ctx.font = "16px " + EMOJI; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("👷", 0, 2);
        ctx.restore(); ctx.textAlign = "left";
      };
      var draw = function () {
        // 현장 바깥 (흙 + 안전 줄무늬)
        ctx.fillStyle = "#b98a54"; ctx.fillRect(0, 0, W, H);
        for (var y = -40 + st.road; y < H; y += 40) {
          ctx.fillStyle = "#ffcc00"; ctx.fillRect(ROAD0 - 10, y, 10, 20); ctx.fillRect(ROAD1, y + 20, 10, 20);
          ctx.fillStyle = "#111"; ctx.fillRect(ROAD0 - 10, y + 20, 10, 20); ctx.fillRect(ROAD1, y, 10, 20);
        }
        // 도로
        ctx.fillStyle = "#4a4a4f"; ctx.fillRect(ROAD0, 0, ROAD1 - ROAD0, H);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        for (var l = 1; l < NL; l++) for (var yy = -40 + st.road; yy < H; yy += 40) ctx.fillRect(ROAD0 + laneW * l - 2, yy, 4, 20);
        // 장애물 · 아이템
        ctx.font = "30px " + EMOJI; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        st.things.forEach(function (t) { if (!(t.hit && t.kind === "obs" && st.hurt > 0.9)) ctx.fillText(t.e, laneX(t.lane), t.y); });
        ctx.textAlign = "left";
        // 카트
        if (st.boost > 0) { ctx.fillStyle = "rgba(120,200,255,0.5)"; ctx.fillRect(st.x - 14, H - 46, 28, 30 + Math.random() * 12); }
        if (!(st.hurt > 0 && Math.floor(st.hurt * 10) % 2)) drawKart(st.x, H - 70);
        // 상단 정보
        ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(0, 0, W, 30);
        ctx.fillStyle = "#fff"; ctx.font = "13px " + PIXEL; ctx.textBaseline = "middle";
        ctx.fillText("점수 " + score(), 8, 15);
        ctx.fillText("🍗 " + st.chicken, 130, 15);
        ctx.fillText(Math.round(st.speed * (st.boost > 0 ? 1.6 : 1) / 5) + "km/h", 200, 15);
        ctx.font = "14px " + EMOJI;
        ctx.fillText("💖".repeat(Math.max(0, st.lives)), W - 70, 15);
        // 안내
        var big = st.phase === "ready" ? "Enter / 시작 버튼" : (st.msgT > 0 ? st.msg : null);
        if (big) {
          ctx.font = "18px " + PIXEL; ctx.textAlign = "center";
          ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(30, H / 2 - 60, W - 60, 40);
          ctx.fillStyle = "#fff"; ctx.fillText(big, W / 2, H / 2 - 40);
          ctx.textAlign = "left";
        }
      };
      var loop = function (ts) {
        var dt = last ? Math.max(0, Math.min(0.05, (ts - last) / 1000)) : 0; last = ts;   // 첫 프레임·되감긴 시간은 0
        if (!$("#kart").classList.contains("minimized")) update(dt);
        draw();
        raf = requestAnimationFrame(loop);
      };
      document.addEventListener("keydown", function (e) {
        if (!isActive("kart")) return;
        var k = e.key === "a" || e.key === "A" ? "ArrowLeft" : e.key === "d" || e.key === "D" ? "ArrowRight" : e.key;
        if (["ArrowLeft", "ArrowRight", "Enter"].indexOf(k) === -1) return;
        e.preventDefault();
        key(k);
      });
      bindPad("kart", key);
      cv.addEventListener("pointerdown", function () { if (st.phase !== "race") key("Enter"); });
      D.apps.kart = function () { reset(); last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
      D.closers.kart = function () { cancelAnimationFrame(raf); raf = null; };
      reset();
    })();
  });
})();
