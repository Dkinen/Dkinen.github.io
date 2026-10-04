/* =========================================================
   DONG OS 98 — 창 관리자 + 프로그램들
   ========================================================= */
(function () {
  "use strict";

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var isMobile = function () { return window.matchMedia("(max-width: 700px)").matches; };
  var isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* ---------- 부팅 ---------- */
  var bootLines = [
    ["DONG BIOS v2002 · 메모리 검사 ... ", "쓸데없는 지식 무제한", "ok"],
    ["성실함.dll 로드 ... ", "OK", "ok"],
    ["굳건함.sys 로드 ... ", "OK", "ok"],
    ["다재다능.drv 로드 ... ", "OK", "ok"],
    ["졸업일자.cfg 확인 ... ", "실패 (2월? 8월?)", "fail"],
    ["INTP 사고 엔진 시작 ... ", "CPU 87% 사용 중", "ok"],
    ["Why_not.exe 실행 ... ", "OK", "ok"],
    ["바탕화면을 불러오는 중", "...", "ok"]
  ];
  function boot() {
    var box = $("#boot"), log = $("#boot-log"), i = 0, timer;
    var done = function () {
      clearInterval(timer);
      box.style.display = "none";
      try { sessionStorage.setItem("dongos-booted", "1"); } catch (e) {}
    };
    var already = false;
    try { already = sessionStorage.getItem("dongos-booted") === "1"; } catch (e) {}
    if (already) { done(); return; }
    box.addEventListener("click", done);
    timer = setInterval(function () {
      if (i >= bootLines.length) { setTimeout(done, 500); clearInterval(timer); return; }
      var l = bootLines[i++];
      var div = document.createElement("div");
      div.innerHTML = l[0] + '<span class="' + l[2] + '">' + l[1] + "</span>";
      log.appendChild(div);
    }, 260);
  }

  /* ---------- 창 관리 ---------- */
  var z = 100, openCount = 0;
  var apps = {};       // 열릴 때 실행할 함수
  var closers = {};    // 닫힐 때 실행할 함수

  function taskBtn(id) { return $('#tasks button[data-task="' + id + '"]'); }

  function focusWin(win) {
    $$(".app.active").forEach(function (w) { w.classList.remove("active"); });
    $$("#tasks button.active").forEach(function (b) { b.classList.remove("active"); });
    win.classList.add("active");
    win.style.zIndex = ++z;
    var b = taskBtn(win.id);
    if (b) b.classList.add("active");
  }

  function openWin(id) {
    var win = document.getElementById(id);
    if (!win) return;
    closeStart();
    if (!win.classList.contains("open")) {
      win.classList.add("open");
      if (!isMobile()) {
        var w = win.offsetWidth, h = win.offsetHeight;
        var x = 210 + (openCount % 8) * 30, y = 20 + (openCount % 8) * 26;
        x = Math.max(4, Math.min(x, window.innerWidth - w - 8));
        y = Math.max(4, Math.min(y, window.innerHeight - h - 44));
        win.style.left = x + "px";
        win.style.top = y + "px";
      }
      openCount++;
      var b = document.createElement("button");
      b.dataset.task = id;
      b.textContent = win.dataset.title || id;
      b.addEventListener("click", function () {
        if (win.classList.contains("minimized")) { win.classList.remove("minimized"); focusWin(win); }
        else if (win.classList.contains("active")) { win.classList.add("minimized"); win.classList.remove("active"); b.classList.remove("active"); }
        else focusWin(win);
      });
      $("#tasks").appendChild(b);
      if (apps[id]) apps[id]();
    }
    win.classList.remove("minimized");
    focusWin(win);
  }

  function closeWin(win) {
    win.classList.remove("open", "active", "minimized", "maximized");
    var b = taskBtn(win.id);
    if (b) b.remove();
    if (closers[win.id]) closers[win.id]();
  }

  function initWindows() {
    $$(".app").forEach(function (win) {
      win.addEventListener("pointerdown", function () { focusWin(win); });
      var bar = $(".title-bar", win);
      $$(".title-bar-controls button", win).forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          var a = btn.getAttribute("aria-label");
          if (a === "Close") closeWin(win);
          else if (a === "Minimize") { win.classList.add("minimized"); win.classList.remove("active"); var b = taskBtn(win.id); if (b) b.classList.remove("active"); }
          else if (a === "Maximize") win.classList.toggle("maximized");
        });
      });
      $$("[data-close]", win).forEach(function (btn) {
        btn.addEventListener("click", function () { closeWin(win); });
      });
      // 제목 표시줄 끌어서 이동
      bar.addEventListener("pointerdown", function (e) {
        if (isMobile() || win.classList.contains("maximized") || e.target.closest(".title-bar-controls")) return;
        var sx = e.clientX - win.offsetLeft, sy = e.clientY - win.offsetTop;
        bar.setPointerCapture(e.pointerId);
        var move = function (ev) {
          var x = Math.max(-win.offsetWidth + 80, Math.min(ev.clientX - sx, window.innerWidth - 80));
          var y = Math.max(0, Math.min(ev.clientY - sy, window.innerHeight - 70));
          win.style.left = x + "px";
          win.style.top = y + "px";
        };
        var up = function () {
          bar.removeEventListener("pointermove", move);
          bar.removeEventListener("pointerup", up);
        };
        bar.addEventListener("pointermove", move);
        bar.addEventListener("pointerup", up);
      });
      bar.addEventListener("dblclick", function (e) {
        if (!e.target.closest(".title-bar-controls") && $('[aria-label="Maximize"]', win)) win.classList.toggle("maximized");
      });
    });
  }

  /* ---------- 아이콘 ---------- */
  function initIcons() {
    $$(".icon").forEach(function (icon) {
      var act = function () {
        if (icon.dataset.open) openWin(icon.dataset.open);
        else if (icon.dataset.msg) {
          var p = icon.dataset.msg.split("|");
          msg(p[0], p[1].replace(/\\n/g, "\n"), "🗑️");
        }
      };
      icon.addEventListener("click", function (e) {
        e.stopPropagation();
        $$(".icon.selected").forEach(function (i) { i.classList.remove("selected"); });
        icon.classList.add("selected");
        if (isTouch) act();
      });
      icon.addEventListener("dblclick", function () { if (!isTouch) act(); });
      icon.addEventListener("keydown", function (e) { if (e.key === "Enter") act(); });
    });
    $$("button[data-open]:not(.icon)").forEach(function (b) {
      b.addEventListener("click", function () { openWin(b.dataset.open); });
    });
    $("#desktop").addEventListener("click", function () {
      $$(".icon.selected").forEach(function (i) { i.classList.remove("selected"); });
      closeStart();
    });
  }

  /* ---------- 메시지 상자 ---------- */
  function msg(title, text, icon) {
    $("#msg-title").textContent = title;
    $("#msg-text").textContent = text;
    $("#msg-icon").textContent = icon || "⚠️";
    var win = $("#msgbox");
    if (win.classList.contains("open")) closeWin(win);
    openWin("msgbox");
    if (!isMobile()) {
      win.style.left = Math.max(8, (window.innerWidth - win.offsetWidth) / 2) + "px";
      win.style.top = Math.max(8, (window.innerHeight - win.offsetHeight) / 2 - 40) + "px";
    }
  }

  /* ---------- 시작 메뉴 / 종료 / 시계 / 알림 ---------- */
  function closeStart() { $("#start-menu").classList.remove("open"); $("#start-btn").classList.remove("pressed"); }
  function initShell() {
    $("#start-btn").addEventListener("click", function (e) {
      e.stopPropagation();
      var m = $("#start-menu");
      m.classList.toggle("open");
      this.classList.toggle("pressed", m.classList.contains("open"));
    });
    $("#start-menu").addEventListener("click", function (e) { e.stopPropagation(); });
    $("#btn-shutdown").addEventListener("click", function () {
      closeStart();
      $("#shutdown").classList.add("show");
    });
    $("#shutdown").addEventListener("click", function () {
      this.classList.remove("show");
      $$(".app.open").forEach(closeWin);
      try { sessionStorage.removeItem("dongos-booted"); } catch (e) {}
      $("#boot-log").innerHTML = "";
      $("#boot").style.display = "block";
      boot();
    });

    var tick = function () {
      var d = new Date();
      $("#clock").textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
      $("#tray-cpu").textContent = 80 + Math.floor(Math.random() * 20);
    };
    tick();
    setInterval(tick, 5000);

    var tips = [
      ["수영 알림", "수영 갈 시간입니다. 벽 찍고 다시 오세요."],
      ["INTP 경고", "생각이 너무 많습니다. 정리하시겠습니까? (정리 기능 없음)"],
      ["Why not?", "안 될 이유가 감지되지 않았습니다. 일단 해 보세요."],
      ["졸업일자.cfg", "졸업일 확인 중... 아직도 2월인지 8월인지 모릅니다."],
      ["위스키 저장소", "W: 드라이브가 당신을 기다리고 있습니다. (만 19세 이상)"],
      ["시스템", "김동현 맞추기.exe를 실행해 보셨나요? 찐친 인증서가 걸려 있습니다."],
      ["안전 알림", "산업안전기사 보유 시스템입니다. 안전모 착용을 권장합니다. 🦺"]
    ];
    var bal = $("#balloon");
    var show = function () {
      var t = tips[Math.floor(Math.random() * tips.length)];
      $("#balloon-title").textContent = t[0];
      $("#balloon-text").textContent = t[1];
      bal.classList.add("show");
      setTimeout(function () { bal.classList.remove("show"); }, 7000);
    };
    $(".x", bal).addEventListener("click", function () { bal.classList.remove("show"); });
    setTimeout(show, 15000);
    setInterval(show, 50000);
  }

  /* ---------- MBTI 마법사 ---------- */
  function initMbti() {
    var step = 0, scanTimer = null;
    var steps = $$("#mbti .step");
    var prev = $("#mbti-prev"), next = $("#mbti-next");
    var scanLines = [
      "> 내향성 측정: 단톡방 '읽음' 후 답장까지 3시간 ... I",
      "> 직관 측정: '만약에...' 생각 1초당 4건 ... N",
      "> 사고 측정: 위로 요청 → 해결책 3개 출력 ... T",
      "> 인식 측정: 계획_최종_진짜최종(3).hwp 발견 ... P",
      "> 모순 감지: 하루 종일 '왜?' 생각 / 좌우명 'Why not?'",
      "> 모순 해결 실패. 그냥 설치를 계속합니다."
    ];
    var show = function (n) {
      step = n;
      steps.forEach(function (s, i) { s.classList.toggle("on", i === n); });
      prev.disabled = n === 0 || n === 1;
      next.textContent = n === 2 ? "마침" : "다음 >";
    };
    var scan = function () {
      var bar = $("#mbti-bar"), log = $("#mbti-log"), i = 0;
      log.innerHTML = "";
      bar.style.width = "0%";
      next.disabled = true;
      scanTimer = setInterval(function () {
        if (i < scanLines.length) {
          var d = document.createElement("div");
          d.textContent = scanLines[i];
          log.appendChild(d);
          log.scrollTop = log.scrollHeight;
        }
        i++;
        bar.style.width = Math.min(100, Math.round((i / (scanLines.length + 1)) * 100)) + "%";
        if (i > scanLines.length) { clearInterval(scanTimer); next.disabled = false; }
      }, 550);
    };
    next.addEventListener("click", function () {
      if (step === 0) { show(1); scan(); }
      else if (step === 1) show(2);
      else closeWin($("#mbti"));
    });
    prev.addEventListener("click", function () { if (step === 2) show(0); });
    apps.mbti = function () { clearInterval(scanTimer); next.disabled = false; show(0); };
    closers.mbti = function () { clearInterval(scanTimer); };
  }

  /* ---------- 김동현 맞추기 ---------- */
  // answer: 0 = 왼쪽, 1 = 오른쪽, 2 = 둘 다 정답
  var QUIZ = [
    { q: "김동현의 최애 농구선수는?", a: ["러셀 웨스트브룩", "스테판 커리"], answer: 0, c: "Why not? 당연히 웨스트브룩." },
    { q: "치킨 vs 피자, 김동현의 선택은?", a: ["🍕 피자", "🍗 치킨"], answer: 1, c: "치킨. 고민하는 사이에 이미 주문했습니다." },
    { q: "김동현의 MBTI는?", a: ["INTP", "ESTJ"], answer: 0, c: "논리적인 사색가. 계획표보다 생각이 먼저입니다." },
    { q: "오늘 한잔한다면?", a: ["🥃 위스키", "🍺 맥주"], answer: 0, c: "위스키. W: 드라이브가 괜히 있는 게 아닙니다." },
    { q: "김동현의 좌우명은?", a: ["\"Why?\"", "\"Why not?\""], answer: 1, c: "INTP인데 좌우명은 Why not. 본인도 이 모순을 설명하지 못합니다." },
    { q: "치킨을 시킨다면?", a: ["양념", "후라이드"], answer: 1, c: "후라이드. 본연의 맛을 분석하는 INTP의 선택." },
    { q: "2023년 탕후루 알바 시절 직급은?", a: ["견습생", "마스터"], answer: 1, c: "시럽 온도와 코팅 두께를 모두 정복했습니다. 탕후루마스터.exe로 검증해 보세요." },
    { q: "탕후루 마스터가 고르는 과일은?", a: ["샤인머스캣", "🍓 딸기"], answer: 1, c: "딸기. 마스터는 기본에 충실합니다." },
    { q: "김동현은 몇 시에 살아 있을까?", a: ["🌙 새벽형", "🌅 아침형"], answer: 1, c: "의외로 아침형. INTP라고 다 밤새지는 않습니다." },
    { q: "김동현이 진심인 운동은?", a: ["수영", "골프"], answer: 0, c: "물에서는 조용히 빠릅니다." },
    { q: "수영 끝나고 먹는 건?", a: ["🍲 국밥", "🍜 라면"], answer: 0, c: "국밥. 벽 찍고 나와서 뜨끈하게 한 그릇." },
    { q: "김동현이 가진 자격증은?", a: ["건축기사", "정보처리기사"], answer: 0, c: "건축기사에 산업안전기사까지. 정보처리기사는 없습니다." },
    { q: "한겨울, 카페에서 주문하는 건?", a: ["🧊 아이스 아메리카노", "☕ 뜨거운 아메리카노"], answer: 0, c: "한겨울에도 아아. 얼죽아 인증 완료." },
    { q: "CM·시공 경진대회에서 받은 상은?", a: ["혁신상", "인기상"], answer: 0, c: "광양 데이터센터 프로젝트로 혁신상을 받았습니다." },
    { q: "농구는 어떻게 볼까?", a: ["🏟️ 직관", "🛋️ 하이라이트 몰아보기"], answer: 1, c: "하이라이트 몰아보기. 단, 돈이 있으면 무조건 직관입니다." },
    { q: "김동현의 졸업 시기는?", a: ["2027년 2월", "2027년 8월"], answer: 2, c: "본인도 모릅니다. 둘 다 정답 처리합니다." }
  ];
  function initQuiz() {
    var body = $("#quiz-body"), idx = 0, score = 0;
    var status = function () {
      $("#quiz-status").textContent = idx < QUIZ.length ? "문제 " + (idx + 1) + " / " + QUIZ.length : "결과";
      $("#quiz-score").textContent = "점수 " + score;
    };
    var start = function () {
      body.innerHTML = '<p class="quiz-q">김동현을 얼마나 아시나요?<br><span class="muted">둘 중 하나를 고르는 ' + QUIZ.length + '문제입니다. 다 맞히면 찐친 인증서를 드립니다.</span></p><div class="row right"><button id="quiz-go">시작</button></div>';
      idx = 0; score = 0; status();
      $("#quiz-go").addEventListener("click", ask);
    };
    var ask = function () {
      var item = QUIZ[idx];
      status();
      body.innerHTML = '<p class="muted">Q' + (idx + 1) + '.</p><p class="quiz-q"></p><div class="quiz-choices"><button data-i="0"></button><button data-i="1"></button></div><div class="quiz-feedback"></div><div class="row right"><button id="quiz-next" disabled>다음 &gt;</button></div>';
      $(".quiz-q", body).textContent = item.q;
      var btns = $$(".quiz-choices button", body);
      btns.forEach(function (b, i) {
        b.textContent = item.a[i];
        b.addEventListener("click", function () {
          var ok = item.answer === 2 || item.answer === i;
          if (ok) score++;
          btns.forEach(function (x, j) {
            x.disabled = true;
            if (item.answer === 2 || item.answer === j) x.classList.add("right-ans");
            else if (j === i) x.classList.add("wrong-ans");
          });
          $(".quiz-feedback", body).textContent = (ok ? "⭕ 정답! " : "❌ 땡! ") + item.c;
          $("#quiz-next").disabled = false;
          status();
        });
      });
      $("#quiz-next").addEventListener("click", function () {
        idx++;
        if (idx < QUIZ.length) ask(); else result();
      });
    };
    var result = function () {
      status();
      var n = QUIZ.length, rank, desc;
      if (score === n) { rank = "🏅 찐친 인증"; desc = "김동현을 김동현보다 잘 아십니다. 위스키 저장소 접근 권한을 신청해 보세요."; }
      else if (score >= n - 3) { rank = "🤝 꽤 친한 사이"; desc = "거의 다 왔습니다. 후라이드 한 마리 같이 먹으면 만점입니다."; }
      else if (score >= Math.ceil(n / 2)) { rank = "👋 아는 사람"; desc = "내 컴퓨터와 프로젝트 폴더를 열어 보고 다시 도전하세요."; }
      else { rank = "🙇 처음 뵙겠습니다"; desc = "반갑습니다. 김동현입니다. 바탕화면부터 천천히 둘러보세요."; }
      body.innerHTML = '<p class="muted">결과</p><p class="quiz-rank"></p><p><b>' + score + " / " + n + '</b> 정답</p><p class="desc"></p><div class="row right"><button id="quiz-retry">다시 하기</button></div>';
      $(".quiz-rank", body).textContent = rank;
      $(".desc", body).textContent = desc;
      $("#quiz-retry").addEventListener("click", start);
    };
    apps.quiz = start;
  }

  /* ---------- 수상내역.zip ---------- */
  function initAwards() {
    var body = $("#awards-body");
    apps.awards = function () {
      body.innerHTML = '<div class="explorer" style="min-height: 90px;"><div class="icon"><span class="glyph">📜</span><span class="name">혁신상.cert</span></div><div class="icon"><span class="glyph">📜</span><span class="name">최우수상.cert</span></div></div><div class="progress-indicator segmented" style="visibility: hidden;"><span class="progress-indicator-bar" style="width: 0%"></span></div><div class="row right"><button id="unzip">📂 압축 풀기</button></div>';
      $("#unzip").addEventListener("click", function () {
        var btn = this, pi = $(".progress-indicator", body), bar = $(".progress-indicator-bar", body), p = 0;
        btn.disabled = true;
        btn.textContent = "자랑할 준비 중...";
        pi.style.visibility = "visible";
        var t = setInterval(function () {
          p += 7 + Math.random() * 12;
          bar.style.width = Math.min(p, 100) + "%";
          if (p >= 100) {
            clearInterval(t);
            body.innerHTML = '<div class="certs">' +
              '<div class="cert"><div>2026</div><div class="t">혁 신 상</div><div>제11회 전국대학생<br>CM·시공 경진대회</div><div class="muted" style="margin-top: 6px;">광양 동호안 LNG 냉열 데이터센터</div></div>' +
              '<div class="cert"><div>2025</div><div class="t">최우수상</div><div>한국건설관리학회<br>전국대학생 학술발표대회</div><div class="muted" style="margin-top: 6px;">경진대회 부문 (원가관리)</div></div>' +
              '</div><p style="margin-top: 10px;" class="muted">압축 해제 완료. 겸손.dll은 압축 파일에 포함되어 있지 않습니다.</p>';
          }
        }, 120);
      });
    };
  }

  /* ---------- 탕후루마스터 ---------- */
  function initTanghulu() {
    var MIN = 20, MAX = 200, LOW = 150, HIGH = 155;
    var temp = MIN, timer = null, round = 0, wins = 0;
    var fill = $("#th-fill"), zone = $("#th-zone"), tEl = $("#th-temp"), log = $("#th-log");
    var startBtn = $("#th-start"), dipBtn = $("#th-dip");
    var pct = function (t) { return ((t - MIN) / (MAX - MIN)) * 100; };
    zone.style.bottom = pct(LOW) + "%";
    zone.style.height = (pct(HIGH) - pct(LOW)) + "%";
    var draw = function () { fill.style.height = pct(temp) + "%"; tEl.textContent = Math.round(temp) + "℃"; };
    var rankOf = function (w) { return ["설탕만 녹임", "견습생", "알바생", "마스터 🏅"][w]; };
    var status = function () {
      $("#th-round").textContent = "도전 " + round + "/3";
      $("#th-rank").textContent = "직급: " + (round === 3 ? rankOf(wins) : "수습 중");
    };
    var stop = function () { clearInterval(timer); timer = null; startBtn.disabled = round >= 3; dipBtn.disabled = true; };
    var judge = function (burnt) {
      stop();
      round++;
      var t = Math.round(temp), line;
      if (!burnt && t >= LOW && t <= HIGH) { wins++; line = "✅ " + t + "℃ 완벽! 바삭하게 코팅됐습니다."; }
      else if (!burnt && t < LOW) line = "❌ " + t + "℃ 덜 끓었습니다. 이로 깨물면 끈적...";
      else line = "🔥 " + t + "℃ 탔습니다. 가게에 탄내가 납니다.";
      log.textContent = line;
      if (round >= 3) {
        log.textContent += "\n결과: " + wins + "/3 성공 → 직급 [" + rankOf(wins) + "]";
        startBtn.textContent = "다시 하기";
        startBtn.disabled = false;
      }
      status();
    };
    startBtn.addEventListener("click", function () {
      if (round >= 3) { round = 0; wins = 0; startBtn.textContent = "불 켜기"; }
      temp = MIN; draw();
      log.textContent = "보글보글... 지금이다 싶을 때 담그세요.";
      startBtn.disabled = true;
      dipBtn.disabled = false;
      var speed = 1.6 + Math.random() * 1.4;
      timer = setInterval(function () {
        temp += speed + temp / 160;
        if (temp >= MAX) { temp = MAX; draw(); judge(true); return; }
        draw();
      }, 40);
      status();
    });
    dipBtn.addEventListener("click", function () { if (timer) judge(false); });
    apps.tanghulu = function () {
      stop(); round = 0; wins = 0; temp = MIN; draw();
      startBtn.textContent = "불 켜기"; startBtn.disabled = false;
      log.textContent = "불을 켜면 시럽이 끓기 시작합니다.";
      status();
    };
    closers.tanghulu = stop;
  }

  /* ---------- 작업 관리자 ---------- */
  function initTaskmgr() {
    var procs = [
      { n: "쓸데없는_생각.exe", base: 38 },
      { n: "왜15년이지_생존분석.exe", base: 14 },
      { n: "다음엔_뭐마시지.exe", base: 9 },
      { n: "수영가야하는데.exe", base: 6 },
      { n: "웨스트브룩_하이라이트.exe", base: 7 },
      { n: "졸업날짜_계산.exe", base: 0, hang: true },
      { n: "탕후루_시럽온도.exe", base: 1 },
      { n: "단톡방_답장_숙고.exe", base: 5 }
    ];
    var timer = null, history = [], sel = null;
    var tbody = $("#proc-list"), graph = $("#cpu-graph");
    var render = function () {
      var total = 0;
      tbody.innerHTML = "";
      procs.forEach(function (p, i) {
        var cpu = p.hang ? 0 : Math.max(0, Math.round(p.base + (Math.random() - 0.5) * p.base * 0.8));
        total += cpu;
        var tr = document.createElement("tr");
        if (sel === i) tr.className = "sel";
        tr.innerHTML = "<td></td><td>" + cpu + "%</td><td" + (p.hang ? ' class="hang">응답 없음' : ">실행 중") + "</td>";
        tr.firstChild.textContent = p.n;
        tr.addEventListener("click", function () { sel = i; render(); });
        tbody.appendChild(tr);
      });
      total = Math.min(99, total);
      history.push(total);
      if (history.length > 30) history.shift();
      graph.innerHTML = history.map(function (v) { return '<i style="height:' + v + '%"></i>'; }).join("");
      $("#proc-count").textContent = "프로세스: " + procs.length;
      $("#cpu-total").textContent = "CPU 사용: " + total + "%";
    };
    $("#kill-btn").addEventListener("click", function () {
      if (sel === null) { msg("작업 관리자", "끝낼 작업을 먼저 선택하세요.", "ℹ️"); return; }
      var p = procs[sel];
      if (p.hang) msg("작업 끝내기", "'" + p.n + "'을(를) 끝낼 수 없습니다.\n학사 일정 서버의 응답을 기다리는 중입니다.", "⏳");
      else msg("작업 끝내기", "'" + p.n + "'을(를) 끝낼 수 없습니다.\nINTP 핵심 프로세스입니다.", "⛔");
    });
    apps.taskmgr = function () { history = []; render(); timer = setInterval(render, 1000); };
    closers.taskmgr = function () { clearInterval(timer); };
  }

  /* ---------- 휴지통 ---------- */
  function initTrash() {
    $("#empty-trash").addEventListener("click", function () {
      msg("휴지통", "휴지통을 비울 수 없습니다.\n아직 미련이 남아 있습니다.", "🗑️");
    });
  }

  /* ---------- 일기장 ---------- */
  var REPO = "Dkinen/Dkinen.github.io", BRANCH = "main", POST_DIR = "dong-os/_posts";
  function initDiary() {
    var list = $("#diary-list"), view = $("#diary-view"), posts = [];
    var showPost = function (i) {
      var p = posts[i];
      $$("button", list).forEach(function (b, j) { b.classList.toggle("on", i === j); });
      view.innerHTML = '<h3></h3><div class="meta"></div><div class="content"></div>';
      $("h3", view).textContent = p.title || "(제목 없음)";
      $(".meta", view).textContent = p.date + "  ·  기분 " + (p.mood || "-") + "  ·  날씨 " + (p.weather || "-");
      $(".content", view).innerHTML = p.content;   // 주인장이 Commit한 글만 들어옴
      view.scrollTop = 0;
    };
    var load = function () {
      list.innerHTML = '<p class="muted" style="padding: 8px;">불러오는 중...</p>';
      fetch("diary/posts.json?t=" + Date.now(), { cache: "no-store" })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (data) {
          posts = data;
          list.innerHTML = "";
          $("#diary-count").textContent = "일기 " + posts.length + "편";
          if (!posts.length) { list.innerHTML = '<p class="muted" style="padding: 8px;">아직 일기가 없습니다.</p>'; return; }
          posts.forEach(function (p, i) {
            var b = document.createElement("button");
            b.innerHTML = "<span></span><small></small>";
            b.firstChild.textContent = (p.mood ? p.mood.split(" ")[0] + " " : "") + (p.title || "(제목 없음)");
            b.lastChild.textContent = p.date;
            b.addEventListener("click", function () { showPost(i); });
            list.appendChild(b);
          });
          showPost(0);
        })
        .catch(function () {
          list.innerHTML = "";
          $("#diary-count").textContent = "";
          view.innerHTML = '<p>일기를 불러오지 못했습니다.</p><p class="muted">GitHub Pages에 올라간 사이트에서만 일기가 보입니다. 내 컴퓨터에서 파일을 직접 연 경우에는 보이지 않습니다.</p>';
        });
    };
    $("#diary-reload").addEventListener("click", load);
    apps.diary = load;

    // 새 일기 → GitHub 새 파일 화면 (내용 미리 채움)
    $("#c-save").addEventListener("click", function () {
      var title = $("#c-title").value.trim();
      var body = $("#c-body").value.replace(/\r/g, "").trim();
      if (!title || !body) { msg("새 일기", "제목과 본문을 모두 써 주세요.", "✏️"); return; }
      var d = new Date(), pad = function (n) { return String(n).padStart(2, "0"); };
      var off = -d.getTimezoneOffset(), sign = off >= 0 ? "+" : "-";
      off = Math.abs(off);
      var ymd = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
      var hm = pad(d.getHours()) + pad(d.getMinutes());
      var stamp = ymd + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":00 " + sign + pad(Math.floor(off / 60)) + pad(off % 60);
      var content = "---\n" +
        "title: " + JSON.stringify(title) + "\n" +
        "date: " + stamp + "\n" +
        "mood: " + JSON.stringify($("#c-mood").value) + "\n" +
        "weather: " + JSON.stringify($("#c-weather").value) + "\n" +
        "---\n\n" +
        body.split("\n").join("  \n") + "\n";
      var url = "https://github.com/" + REPO + "/new/" + BRANCH + "/" + POST_DIR +
        "?filename=" + encodeURIComponent(ymd + "-" + hm + ".md") +
        "&value=" + encodeURIComponent(content);
      window.open(url, "_blank", "noopener");
      msg("새 일기", "GitHub 창에서 초록색 [Commit changes]를 누르면 저장됩니다.\n1~2분 뒤 일기장에서 [새로고침]을 눌러 보세요.", "💾");
    });
  }

  /* ---------- 시작 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initWindows();
    initIcons();
    initShell();
    initMbti();
    initQuiz();
    initAwards();
    initTanghulu();
    initTaskmgr();
    initTrash();
    initDiary();
    boot();
    // 처음 방문하면 내 컴퓨터를 열어 둠
    setTimeout(function () { if (!$(".app.open")) openWin("mycomputer"); }, 2800);
  });
})();
