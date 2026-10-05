/* =========================================================
   DONG OS 98 — D-day · 명함 · 할 일 · 트리플더블 챌린지 · 타자연습
                · 오늘 뭐 마시지? · 화면 보호기 · INTP 오늘의 운세
   ========================================================= */
(function () {
  "use strict";

  /* ---------- D-day 기본 목록 (날짜가 정해지면 여기 수정) ---------- */
  var DDAYS = [
    { name: "토익 스피킹", date: "2026-10-12", icon: "🎤" },
    { name: "졸업 (2월이라면)", date: "2027-02-20", icon: "🎓", note: "날짜 추정" },
    { name: "졸업 (8월이라면)", date: "2027-08-20", icon: "🎓", note: "날짜 추정 · 아마도" }
  ];

  /* ---------- 술로그 사본 (서버가 이 사이트를 허용하면 실시간 목록 사용) ---------- */
  var SOOL_API = "https://sool-log.onrender.com/api/drinks";
  var DRINKS = [
    { name: "라프로익 10년", en: "Laphroaig 10", cat: "위스키 · 싱글몰트", where: "아일라, 스코틀랜드" },
    { name: "글렌드로낙 12년", en: "GlenDronach 12", cat: "위스키 · 싱글몰트", where: "하이랜드, 스코틀랜드" },
    { name: "버팔로 트레이스", en: "Buffalo Trace", cat: "위스키 · 버번", where: "켄터키, 미국" },
    { name: "서진성 25년", en: "Jinseong Seo 25 years", cat: "위스키 · 재패니즈(?)", where: "전남광주, 대한민국" },
    { name: "헨드릭스 진", en: "Hendrick's Gin", cat: "스피릿 · 진", where: "거번, 스코틀랜드" },
    { name: "화요 25", en: "Hwayo 25", cat: "전통주 · 증류식 소주", where: "경기 여주, 대한민국" },
    { name: "복순도가 손막걸리", en: "", cat: "전통주 · 막걸리", where: "울산 울주, 대한민국" },
    { name: "기네스 드래프트", en: "Guinness Draught", cat: "맥주 · 스타우트", where: "더블린, 아일랜드" },
    { name: "구스 아일랜드 IPA", en: "Goose Island IPA", cat: "맥주 · IPA", where: "시카고, 미국" },
    { name: "샤토 라그랑주", en: "Château Lagrange", cat: "와인 · 레드", where: "보르도 생쥘리앙, 프랑스" },
    { name: "클라우디 베이 소비뇽 블랑", en: "Cloudy Bay Sauvignon Blanc", cat: "와인 · 화이트", where: "말보로, 뉴질랜드" }
  ];
  var CAT_KO = { WHISKY: "위스키", WINE: "와인", BEER: "맥주", KOREAN: "전통주", SPIRITS: "스피릿" };

  /* ---------- INTP 오늘의 운세 ---------- */
  var FORTUNES = [
    "오늘은 생각을 3개만 하세요. 4개부터는 과부하입니다.",
    "미뤄 둔 일 하나를 끝내면 하루가 가벼워집니다. 단, 계획표는 만들지 마세요.",
    "갑자기 떠오른 아이디어를 메모하세요. 내일의 당신이 고마워합니다.",
    "단톡방 답장은 오늘 안에 보내세요. 3일 숙고는 너무 깁니다.",
    "'왜?'라고 묻고 싶을 때 한 번은 'Why not?'으로 바꿔 보세요.",
    "수영장 물이 당신을 부르고 있습니다. 벽 찍고 오면 머리가 맑아집니다.",
    "오늘의 논쟁은 이기지 않아도 됩니다. 이미 머릿속에서 이겼습니다.",
    "새로운 걸 배우기 좋은 날입니다. 다만 위키 문서 3단계 이상은 들어가지 마세요.",
    "누군가 당신의 설명을 이해 못 해도 괜찮습니다. 비유를 하나만 바꿔 보세요.",
    "오늘은 치킨이 옳습니다. 후라이드라면 더욱.",
    "집중력이 최고조인 날입니다. 알림을 끄세요.",
    "작은 실수는 버그가 아니라 기능입니다. 고치고 넘어가세요.",
    "오늘 만난 사람에게 먼저 질문해 보세요. 의외의 데이터를 얻습니다.",
    "완벽한 답을 기다리지 말고 70%에서 출발하세요.",
    "현장에서도 마음에서도 안전 제일. 오늘은 무리하지 마세요.",
    "영어로 혼잣말 1분 해 보세요. 토익 스피킹 신이 보고 있습니다.",
    "아침형 인간의 기운이 좋습니다. 일찍 자면 내일도 이깁니다.",
    "오늘은 위스키보다 물이 몸에 맞는 날입니다. 내일을 기약하세요.",
    "오래 고민한 결정, 오늘 정하면 맞습니다.",
    "INTP 특: 이 운세가 왜 맞는지 분석하고 있음. 그냥 믿으세요."
  ];
  var LUCKY = ["🍗 후라이드 치킨", "🧊 아이스 아메리카노", "🏀 농구공", "🥃 라프로익 10년", "🏊 수경", "🦺 안전조끼", "🍓 딸기 탕후루", "📐 삼각자", "🎧 하이라이트 영상", "🍲 국밥"];

  /* ---------- 타자연습 문장 ---------- */
  var TYPING = {
    toeic: [
      "This picture was taken at a busy construction site.",
      "The first thing I notice is a tall crane in the middle of the picture.",
      "I go swimming about three times a week because it helps me relieve stress.",
      "I'm sorry, but you have the wrong information. The session starts at nine thirty.",
      "There are two main reasons why I agree with this statement.",
      "For example, when I worked as an intern at a construction company, I learned a lot.",
      "For these reasons, I believe that safety is more important than speed.",
      "In my opinion, it is better to work for a large company.",
      "Overall, it looks like a busy and energetic place.",
      "That's a good question. Let me think about it for a second."
    ],
    arch: [
      "철근콘크리트 구조는 압축에 강한 콘크리트와 인장에 강한 철근을 함께 쓴다.",
      "거푸집을 해체하기 전에 콘크리트 강도를 반드시 확인한다.",
      "장기수선계획은 공동주택의 주요 시설을 언제 교체할지 정하는 계획이다.",
      "공정표는 공사의 순서와 기간을 한눈에 보여 준다.",
      "타워크레인 작업 반경 안에는 관계자 외 출입을 금지한다.",
      "안전모와 안전화는 현장 출입의 기본이다.",
      "슬래브 타설 전에 슬리브 위치를 도면과 대조한다.",
      "CM은 발주자를 대신해 설계부터 시공까지 사업을 관리한다."
    ],
    me: [
      "도면은 정확하게, 위스키는 천천히.",
      "왜 안 돼? 일단 부딪혀 본다.",
      "물에서는 조용히 빠릅니다. 옆 레인이 먼저 의식하더군요.",
      "졸업은 2월입니다. 아마도. 8월일지도.",
      "치킨은 후라이드, 커피는 한겨울에도 아아.",
      "쓸데없는 생각이 CPU의 87퍼센트를 쓰고 있습니다."
    ]
  };

  var load = function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  var save = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var today = function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var dleft = function (s) { return Math.round((new Date(s + "T00:00:00") - new Date(today() + "T00:00:00")) / 86400000); };
  var dlabel = function (n) { return n > 0 ? "D-" + n : n === 0 ? "D-DAY" : "D+" + (-n); };

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.DONG, $ = D.$, $$ = D.$$;

    /* =========================== D-day =========================== */
    var renderDday = function () {
      var mine = load("dongos-ddays", []);
      var all = DDAYS.map(function (x) { x.fixed = true; return x; }).concat(mine);
      all.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      $("#dday-list").innerHTML = all.map(function (x) {
        var n = dleft(x.date);
        return '<div class="dday-row' + (n < 0 ? " past" : "") + '"><span class="dd-icon e">' + esc(x.icon || "📌") + '</span><span class="dd-name">' + esc(x.name) +
          '<small>' + x.date.replace(/-/g, ".") + (x.note ? " · " + esc(x.note) : "") + '</small></span><span class="dd-n">' + dlabel(n) + "</span>" +
          (x.fixed ? "" : '<button class="dd-del" data-id="' + esc(x.id) + '" title="지우기">✕</button>') + "</div>";
      }).join("");
      $$("#dday-list .dd-del").forEach(function (b) {
        b.onclick = function () { save("dongos-ddays", load("dongos-ddays", []).filter(function (x) { return x.id !== b.dataset.id; })); renderDday(); };
      });
    };
    $("#dday-add").onclick = function () {
      var name = $("#dday-name").value.trim(), date = $("#dday-date").value;
      if (!name || !date) { D.msg("D-day", "이름과 날짜를 모두 넣어 주세요.", "📅"); return; }
      var l = load("dongos-ddays", []); l.push({ id: String(Date.now()), name: name, date: date, icon: "📌" });
      save("dongos-ddays", l); $("#dday-name").value = ""; renderDday();
    };
    D.apps.dday = renderDday;
    // 작업 표시줄에 토스 D-day
    var tray = $("#tray-dday");
    if (tray) { var n0 = dleft(DDAYS[0].date); tray.textContent = "🎤 토스 " + dlabel(n0); tray.style.display = n0 < 0 ? "none" : ""; tray.onclick = function () { D.openWin("toeic"); }; }

    /* =========================== 명함 (vCard) =========================== */
    $("#card-save").onclick = function () {
      var v = ["BEGIN:VCARD", "VERSION:3.0", "N:김;동현;;;", "FN:김동현", "ORG:전남대학교;건축공학전공", "TITLE:건축공학전공 4학년",
        "TEL;TYPE=CELL:010-4180-5088", "EMAIL;TYPE=INTERNET:kimdonghyun4180@gmail.com",
        "URL:https://dkinen.github.io", "NOTE:Why not?", "END:VCARD"].join("\r\n");
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard;charset=utf-8" }));
      a.download = "김동현.vcf";
      document.body.appendChild(a); a.click(); a.remove();
    };

    /* =========================== 할 일 =========================== */
    var renderTodo = function () {
      var l = load("dongos-todo", []);
      $("#todo-list").innerHTML = l.length ? l.map(function (t, i) {
        return '<div class="field-row todo-row"><input type="checkbox" id="td' + i + '"' + (t.done ? " checked" : "") + '><label for="td' + i + '" class="' + (t.done ? "done" : "") + '">' + esc(t.text) + '</label><button class="td-del" data-i="' + i + '">✕</button></div>';
      }).join("") : '<p class="muted">할 일이 없습니다. INTP에게는 드문 일입니다.</p>';
      $$("#todo-list input").forEach(function (c, i) { c.onchange = function () { var l2 = load("dongos-todo", []); l2[i].done = c.checked; save("dongos-todo", l2); renderTodo(); }; });
      $$("#todo-list .td-del").forEach(function (b) { b.onclick = function () { var l2 = load("dongos-todo", []); l2.splice(+b.dataset.i, 1); save("dongos-todo", l2); renderTodo(); }; });
      var left = l.filter(function (t) { return !t.done; }).length;
      $("#todo-status").textContent = "남은 일 " + left + "개";
    };
    var addTodo = function () {
      var v = $("#todo-input").value.trim(); if (!v) return;
      var l = load("dongos-todo", []); l.push({ text: v, done: false }); save("dongos-todo", l);
      $("#todo-input").value = ""; renderTodo();
    };
    $("#todo-add").onclick = addTodo;
    $("#todo-input").addEventListener("keydown", function (e) { if (e.key === "Enter") addTodo(); });
    D.apps.todo = renderTodo;

    /* =========================== INTP 운세 =========================== */
    D.apps.fortune = function () {
      var s = today(), h = 0;
      for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;   // 날짜마다 같은 운세
      $("#fortune-date").textContent = s.replace(/-/g, ".");
      $("#fortune-text").textContent = FORTUNES[h % FORTUNES.length];
      $("#fortune-lucky").textContent = LUCKY[(h >> 5) % LUCKY.length];
      $("#fortune-num").textContent = "0";   // 웨스트브룩 등번호
      $("#fortune-score").textContent = "★".repeat(3 + (h >> 9) % 3) + "☆".repeat(2 - (h >> 9) % 3);
    };

    /* =========================== 오늘 뭐 마시지? =========================== */
    var rouletteBusy = false;
    var fetchDrinks = function () {
      return fetch(SOOL_API).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
        var items = Array.isArray(d) ? d : d.items;
        var list = items.map(function (x) { return { name: x.name, en: x.nameEn || "", cat: (CAT_KO[x.category] || x.category), where: [x.region, x.country].filter(Boolean).join(", ") }; });
        if (list.length) { DRINKS = list; $("#roul-src").textContent = "술로그 실시간 목록 · " + list.length + "종"; }
      }).catch(function () { $("#roul-src").textContent = "술로그 저장본 · " + DRINKS.length + "종"; });
    };
    $("#roul-spin").onclick = function () {
      if (rouletteBusy) return;
      rouletteBusy = true;
      var box = $("#roul-name"), n = 0, total = 18 + Math.floor(Math.random() * 10), delay = 50;
      $("#roul-detail").textContent = "";
      var step = function () {
        var d = DRINKS[Math.floor(Math.random() * DRINKS.length)];
        box.textContent = d.name;
        if (++n < total) { delay *= 1.12; setTimeout(step, delay); return; }
        $("#roul-detail").textContent = d.cat + " · " + d.where + (d.en ? " · " + d.en : "");
        rouletteBusy = false;
      };
      step();
    };
    D.apps.roulette = function () { $("#roul-name").textContent = "?"; $("#roul-detail").textContent = ""; fetchDrinks(); };

    /* =========================== 타자연습 =========================== */
    var ty = { list: [], i: 0, start: 0, typed: 0, errs: 0 };
    var tyNext = function () {
      var line = ty.list[ty.i % ty.list.length];
      $("#ty-target").textContent = line;
      $("#ty-input").value = "";
      $("#ty-input").focus();
      ty.start = 0;
    };
    var tyMode = function () {
      var m = $("#ty-mode").value;
      ty.list = TYPING[m].slice().sort(function () { return Math.random() - 0.5; });
      ty.i = 0; ty.typed = 0; ty.errs = 0;
      $("#ty-speed").textContent = "0"; $("#ty-acc").textContent = "100"; $("#ty-count").textContent = "0";
      tyNext();
    };
    $("#ty-mode").onchange = tyMode;
    $("#ty-input").addEventListener("input", function () {
      if (!ty.start) ty.start = performance.now();
      var target = $("#ty-target").textContent, v = $("#ty-input").value;
      var html = "";
      for (var i = 0; i < target.length; i++) {
        var c = esc(target[i]);
        html += i < v.length ? (v[i] === target[i] ? '<span class="ok">' + c + "</span>" : '<span class="bad">' + c + "</span>") : c;
      }
      $("#ty-target").innerHTML = html;
    });
    $("#ty-input").addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      var target = $("#ty-target").textContent, v = $("#ty-input").value;
      if (!v) return;
      var errs = 0;
      for (var i = 0; i < target.length; i++) if (v[i] !== target[i]) errs++;
      var secs = Math.max(1, (performance.now() - (ty.start || performance.now())) / 1000);
      ty.typed += target.length; ty.errs += errs;
      var spm = Math.round(v.length / secs * 60);   // 분당 글자 수(타)
      $("#ty-speed").textContent = spm;
      $("#ty-acc").textContent = Math.max(0, Math.round((1 - ty.errs / ty.typed) * 100));
      $("#ty-count").textContent = ++ty.i;
      var best = load("dongos-typing-best", 0);
      if (errs === 0 && spm > best) { save("dongos-typing-best", spm); $("#ty-best").textContent = spm; }
      tyNext();
    });
    D.apps.typing = function () { $("#ty-best").textContent = load("dongos-typing-best", 0); tyMode(); };

    /* =========================== 트리플더블 챌린지 =========================== */
    (function () {
      var cv = $("#td-canvas"), ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
      var EMOJI = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif', PIXEL = '"Galmuri11","Malgun Gothic",sans-serif';
      var st, raf = null, last = 0;
      var KINDS = { shot: "🏀 슛! 초록 구간에서 멈추세요", reb: "🙌 리바운드! 공이 손에 올 때 잡으세요", ast: "🤝 어시스트! 비어 있는 동료에게 패스" };
      var reset = function () {
        st = { phase: "ready", t: 60, pts: 0, reb: 0, ast: 0, task: null, msg: "", msgT: 0 };
        var b = load("dongos-td-best", null);
        $("#td-best").textContent = b ? "최고 " + b.pts + "점 " + b.reb + "리 " + b.ast + "어시" : "최고 기록 -";
        $("#td-status").textContent = "시작 버튼 또는 Space";
      };
      var newTask = function () {
        var r = Math.random(), k = r < 0.45 ? "shot" : r < 0.75 ? "reb" : "ast";
        var t = { kind: k, p: 0, dir: 1, speed: 1.2 + Math.random() * 0.9 + (60 - st.t) / 60 };
        if (k === "shot") { t.zone = [0.42 + Math.random() * 0.25, 0]; t.zone[1] = t.zone[0] + 0.12; }
        if (k === "reb") { t.zone = [0.78, 0.92]; }
        if (k === "ast") { t.open = Math.floor(Math.random() * 3); t.left = 1.3; }
        st.task = t;
      };
      var say = function (m) { st.msg = m; st.msgT = 0.7; };
      var act = function (choice) {
        if (st.phase === "ready" || st.phase === "done") {
          if (st.phase === "done" && performance.now() - st.doneAt < 1000) return;
          reset(); st.phase = "play"; newTask(); $("#td-status").textContent = "경기 중"; return;
        }
        var t = st.task; if (!t) return;
        if (t.kind === "ast") {
          if (choice === undefined) return;
          if (choice === t.open) { st.ast++; st.pts += Math.random() < 0.5 ? 2 : 0; say("어시스트! 🤝"); } else say("패스 미스...");
        } else {
          var ok = t.p >= t.zone[0] && t.p <= t.zone[1];
          if (t.kind === "shot") { if (ok) { var three = Math.random() < 0.3; st.pts += three ? 3 : 2; say(three ? "3점슛! 🔥" : "득점! 🏀"); } else say("에어볼..."); }
          else { if (ok) { st.reb++; say("리바운드! 🙌"); } else say("놓쳤다..."); }
        }
        newTask();
      };
      var finish = function () {
        st.phase = "done"; st.doneAt = performance.now();
        var td = st.pts >= 10 && st.reb >= 10 && st.ast >= 10;
        var cats = [st.pts >= 10, st.reb >= 10, st.ast >= 10].filter(Boolean).length;
        var title = td ? "🏆 트리플더블! 웨스트브룩 인증" : cats === 2 ? "더블더블. 웨스트브룩까지 한 걸음" : "평범한 하루. Why not 한 판 더?";
        var b = load("dongos-td-best", null), score = st.pts + st.reb * 2 + st.ast * 2;
        if (!b || score > b.pts + b.reb * 2 + b.ast * 2) save("dongos-td-best", { pts: st.pts, reb: st.reb, ast: st.ast });
        $("#td-status").textContent = st.pts + "점 " + st.reb + "리바운드 " + st.ast + "어시스트";
        D.msg("트리플더블 챌린지", st.pts + "점 · " + st.reb + "리바운드 · " + st.ast + "어시스트\n" + title + "\n\n다시 하려면 게임 화면이나 [시작]을 누르세요.", td ? "🏆" : "🏀");
      };
      var update = function (dt) {
        if (st.phase !== "play") return;
        st.t -= dt; st.msgT -= dt;
        if (st.t <= 0) { st.t = 0; finish(); return; }
        var t = st.task;
        if (t.kind === "ast") { t.left -= dt; if (t.left <= 0) { say("턴오버..."); newTask(); } }
        else { t.p += t.dir * t.speed * dt; if (t.p > 1) { t.p = 1; t.dir = -1; } if (t.p < 0) { t.p = 0; t.dir = 1; } }
      };
      var draw = function () {
        ctx.fillStyle = "#c8833f"; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(W / 2, 40, 150, 0, Math.PI); ctx.stroke();
        ctx.strokeRect(W / 2 - 60, 0, 120, 150);
        // 골대: 백보드 + 림 + 그물
        ctx.fillStyle = "#fff"; ctx.fillRect(W / 2 - 40, 6, 80, 6);
        ctx.strokeStyle = "#ff5a00"; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.ellipse(W / 2, 26, 18, 6, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1;
        for (var nx = -15; nx <= 15; nx += 6) { ctx.beginPath(); ctx.moveTo(W / 2 + nx, 30); ctx.lineTo(W / 2 + nx * 0.6, 50); ctx.stroke(); }
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        // 점수판
        ctx.fillStyle = "rgba(0,0,0,0.75)"; ctx.fillRect(0, H - 50, W, 50);
        ctx.font = "16px " + PIXEL; ctx.fillStyle = "#fff";
        var cell = function (label, v, x) { ctx.fillStyle = v >= 10 ? "#7CFC00" : "#fff"; ctx.fillText(label + " " + v, x, H - 25); };
        cell("득점", st.pts, W * 0.17); cell("리바운드", st.reb, W * 0.43); cell("어시스트", st.ast, W * 0.7);
        ctx.fillStyle = "#ff0"; ctx.fillText("⏱ " + Math.ceil(st.t), W * 0.92, H - 25);
        var t = st.task;
        if (st.phase === "play" && t) {
          ctx.font = "15px " + PIXEL; ctx.fillStyle = "#fff"; ctx.fillText(KINDS[t.kind], W / 2, 190);
          if (t.kind === "ast") {
            for (var i = 0; i < 3; i++) {
              var x = W * (0.2 + i * 0.3);
              ctx.font = "40px " + EMOJI; ctx.fillText(i === t.open ? "🙋" : "🙅", x, 270);
              ctx.font = "13px " + PIXEL; ctx.fillStyle = "#fff"; ctx.fillText(["1", "2", "3"][i] + "번", x, 310);
            }
            ctx.fillStyle = "#fff"; ctx.fillRect(W * 0.2, 335, W * 0.6 * Math.max(0, t.left / 1.3), 8);
          } else {
            var bx = 40, bw = W - 80, by = 250;
            ctx.fillStyle = "#222"; ctx.fillRect(bx, by, bw, 26);
            ctx.fillStyle = "#3c3"; ctx.fillRect(bx + bw * t.zone[0], by, bw * (t.zone[1] - t.zone[0]), 26);
            ctx.font = "26px " + EMOJI; ctx.fillText(t.kind === "shot" ? "🏀" : "🙌", bx + bw * t.p, by + 13);
          }
        }
        var big = st.phase === "ready" ? "시작 버튼 / Space · 60초 안에 10-10-10!" : st.msgT > 0 ? st.msg : null;
        if (big) {
          ctx.font = "18px " + PIXEL; ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(20, 370, W - 40, 40);
          ctx.fillStyle = "#fff"; ctx.fillText(big, W / 2, 390);
        }
        ctx.textAlign = "left";
      };
      var loop = function (ts) {
        var dt = last ? Math.max(0, Math.min(0.05, (ts - last) / 1000)) : 0; last = ts;
        if (!$("#triple").classList.contains("minimized")) update(dt);
        draw(); raf = requestAnimationFrame(loop);
      };
      document.addEventListener("keydown", function (e) {
        var w = $("#triple"); if (!(w.classList.contains("open") && w.classList.contains("active"))) return;
        if (e.code === "Space") { e.preventDefault(); act(); }
        else if (["1", "2", "3"].indexOf(e.key) !== -1) { e.preventDefault(); act(+e.key - 1); }
      });
      cv.addEventListener("pointerdown", function (e) {
        var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
        if (st.phase === "play" && st.task && st.task.kind === "ast") act(x < 0.35 ? 0 : x < 0.65 ? 1 : 2);
        else act();
      });
      $$("#triple .pad").forEach(function (b) {
        b.addEventListener("pointerdown", function (e) { e.preventDefault(); var k = b.dataset.key; if (k === "act") act(); else act(+k); });
      });
      D.apps.triple = function () { reset(); last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
      D.closers.triple = function () { cancelAnimationFrame(raf); raf = null; };
      reset();
    })();

    /* =========================== 화면 보호기 =========================== */
    (function () {
      var saver = $("#saver"), cv = $("#saver-canvas"), ctx = cv.getContext("2d");
      var cfg = load("dongos-saver", { on: true, wait: 60 });
      var idle = 0, raf = null, items = [];
      var WORDS = ["생각 중...", "🥃", "Why not?", "🏀", "졸업은 2월? 8월?", "🍗", "🏊", "INTP", "🦺", "왜 15년이지?"];
      var startSaver = function () {
        if (saver.classList.contains("show")) return;
        saver.classList.add("show");
        cv.width = window.innerWidth; cv.height = window.innerHeight;
        items = WORDS.map(function (w) {
          return { w: w, x: Math.random() * cv.width, y: Math.random() * cv.height, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, h: Math.random() * 360 };
        });
        var draw = function () {
          ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(0, 0, cv.width, cv.height);
          items.forEach(function (it) {
            it.x += it.vx; it.y += it.vy; it.h = (it.h + 1) % 360;
            if (it.x < 0 || it.x > cv.width - 80) it.vx *= -1;
            if (it.y < 30 || it.y > cv.height - 10) it.vy *= -1;
            ctx.font = '28px "Galmuri11","Segoe UI Emoji",sans-serif';
            ctx.fillStyle = "hsl(" + it.h + ",90%,60%)";
            ctx.fillText(it.w, it.x, it.y);
          });
          raf = requestAnimationFrame(draw);
        };
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, cv.width, cv.height);
        draw();
      };
      var stopSaver = function () { idle = 0; if (!saver.classList.contains("show")) return; saver.classList.remove("show"); cancelAnimationFrame(raf); };
      ["mousemove", "keydown", "pointerdown", "touchstart", "wheel"].forEach(function (ev) { document.addEventListener(ev, stopSaver, { passive: true }); });
      setInterval(function () {
        idle++;
        var playing = $$(".app.open.active").some(function (w) { return ["toeic", "media", "swim", "kart", "triple"].indexOf(w.id) !== -1; });
        if (cfg.on && idle >= cfg.wait && !playing && !document.hidden) startSaver();
      }, 1000);
      // 제어판 설정
      var on = $("#saver-on"), wait = $("#saver-wait");
      on.checked = cfg.on; wait.value = String(cfg.wait);
      var apply = function () { cfg = { on: on.checked, wait: +wait.value }; save("dongos-saver", cfg); };
      on.onchange = apply; wait.onchange = apply;
      $("#saver-test").onclick = function () { setTimeout(startSaver, 300); };
    })();
  });
})();
