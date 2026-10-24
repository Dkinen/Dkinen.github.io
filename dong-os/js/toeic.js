/* =========================================================
   DONG OS 98 — 토익 연습기 (TOEIC LC · RC)
   토스는 IH 취득 (2026.10.16) → 이제 토익
   Part 1·2 는 브라우저 음성(영어)으로 듣고, Part 5·7 은 읽고 푼다.
   기록과 오답은 이 브라우저 안에만 남습니다.
   ========================================================= */
(function () {
  "use strict";

  var SPEAKING = { grade: "IH", date: "2026.10.16" };   // 토익 스피킹 결과

  /* ---------- 문제 은행 (직접 작성한 연습 문제) ---------- */
  // Part 1 사진 묘사: a[0] 이 정답 (보기 순서는 매번 섞는다)
  var P1 = [
    { src: "../why-not/images/4-projects.jpg", a: ["A player is dunking the ball.", "The spectators are leaving the arena.", "Some people are sweeping the court.", "A net is being replaced."] },
    { src: "../images/project-socmap.jpg", a: ["A device is being held in someone's hand.", "Workers are pouring concrete.", "A phone has been left on a table.", "Some cranes are being taken apart."] },
    { src: "../images/project-datacenter.png", a: ["Several buildings are located near the water.", "People are swimming in the sea.", "A bridge is being constructed.", "Trees are being planted along the shore."] },
    { src: "../why-not/images/1-hero.jpg", a: ["A man is dribbling a basketball.", "A man is tying his shoes.", "A man is holding a trophy.", "Some players are sitting on a bench."] },
    { src: "../images/profile.jpg", a: ["A man is lying under a blanket.", "A man is packing a suitcase.", "A man is fishing by a lake.", "Some fishing rods are being repaired."] }
  ];
  // Part 2 질의응답: a[0] 이 정답, why = 해설
  var P2 = [
    { q: "When will the new office building be completed?", a: ["By the end of next month.", "On the third floor.", "Yes, it's complete."], why: "When → 시점으로 답한다. 'complete'를 반복한 (C)는 소리 함정." },
    { q: "Who's in charge of the safety inspection?", a: ["Ms. Park from the site office.", "It was inspected carefully.", "Yes, I'm sure."], why: "Who → 사람 이름·직책. 의문사 질문에 Yes/No는 바로 오답." },
    { q: "Where should I put these blueprints?", a: ["On my desk, please.", "Print them in blue.", "Around two o'clock."], why: "Where → 장소. 'blue'는 blueprints의 소리 함정." },
    { q: "Why was the meeting postponed?", a: ["The manager is out sick today.", "In the conference room.", "Yes, it was a long meeting."], why: "Why → 이유. because 없이 이유만 말하는 답이 자주 정답." },
    { q: "Would you like to join us for lunch?", a: ["Sure, I'd love to.", "I had a launch party.", "It was delicious, thanks."], why: "제안·권유 → 수락/거절. 'launch'는 lunch의 소리 함정, (C)는 시제가 안 맞음." },
    { q: "How long does it take to get to the airport?", a: ["About forty minutes by taxi.", "It's a long runway.", "Two tickets, please."], why: "How long → 걸리는 시간. 'long', 'airport' 연상 단어 함정 주의." },
    { q: "Haven't you sent the invoice yet?", a: ["I'll do it right after this call.", "The voice was clear.", "It's very expensive."], why: "부정 의문문은 그냥 '보냈어?'로 해석. '곧 하겠다'는 우회 답변이 정답." },
    { q: "Should we order the materials today or tomorrow?", a: ["Today would be better.", "Yes, in that order.", "They're made of steel."], why: "선택 의문문 → 둘 중 하나를 고른다. Yes/No와 'order' 반복은 함정." },
    { q: "Can you help me move these boxes?", a: ["Of course, where do they go?", "I moved here last year.", "They're full of paper."], why: "부탁 → 수락/거절. 'move'를 반복한 (B)는 소리 함정." },
    { q: "The elevator is out of service again.", a: ["Then let's take the stairs.", "It serves breakfast.", "Yes, again and again."], why: "평서문 → 문제에 대한 대응·해결책이 정답. 'service/serves' 함정." },
    { q: "What time does the training session begin?", a: ["It starts at nine thirty.", "A two-day session.", "Yes, the train is late."], why: "What time → 시각. 'train'은 training의 소리 함정." },
    { q: "Which contractor did you choose?", a: ["The one that offered the lowest price.", "Choose any color you like.", "The contract was signed."], why: "Which → 'the one ~'으로 답하는 경우가 많다. 'contract'는 contractor 함정." },
    { q: "Isn't the report due on Friday?", a: ["It was moved to Monday.", "I reported it to the police.", "They're due for a raise."], why: "부정 의문문 → 사실 확인. 일정이 바뀌었다는 답이 자연스럽다." },
    { q: "Do you know where the parking garage is?", a: ["It's behind the main building.", "For about two hours.", "Yes, it was a garage sale."], why: "Do you know + where → 결국 '어디?'를 묻는 질문. 장소로 답한다." },
    { q: "Why don't we hire a few more workers for the project?", a: ["That's a good idea.", "Because it's higher.", "About fifty pages."], why: "Why don't we ~? 는 이유가 아니라 제안. Because로 시작하는 답은 함정." }
  ];
  // Part 5 단문 빈칸: c = 정답 번호
  var P5 = [
    { q: "The construction of the new library is expected to be ------- by next spring.", o: ["complete", "completed", "completion", "completing"], c: 1, why: "be expected to be + p.p. (완공되다)" },
    { q: "Ms. Kim will review the proposal ------- she returns from the conference.", o: ["during", "when", "despite", "because of"], c: 1, why: "뒤에 주어+동사(절)가 오므로 접속사 when. during·despite·because of는 전치사." },
    { q: "All employees must wear hard hats ------- entering the site.", o: ["when", "during", "so", "or"], c: 0, why: "when + -ing (분사구문). during 뒤에는 명사만 온다." },
    { q: "The manager asked the team to submit their reports -------.", o: ["prompt", "promptly", "prompted", "promptness"], c: 1, why: "동사 submit을 꾸미는 부사 자리." },
    { q: "Neither the architect ------- the engineer attended the meeting.", o: ["or", "and", "nor", "but"], c: 2, why: "neither A nor B (짝 접속사)." },
    { q: "The company has decided to ------- its office to a larger building downtown.", o: ["relocate", "relocation", "relocated", "relocating"], c: 0, why: "to 부정사 → 동사원형." },
    { q: "Applications for the internship must be submitted no later ------- October 30.", o: ["to", "than", "by", "for"], c: 1, why: "no later than ~ (늦어도 ~까지)." },
    { q: "Of the three proposals, Mr. Lee's was the most -------.", o: ["impress", "impression", "impressive", "impressively"], c: 2, why: "be동사 뒤 보어 자리 + the most → 형용사." },
    { q: "The safety inspection was postponed ------- the heavy rain.", o: ["because", "due to", "although", "so that"], c: 1, why: "뒤에 명사구(the heavy rain) → 전치사 due to." },
    { q: "Please contact the front desk if you ------- any further assistance.", o: ["require", "requires", "requiring", "to require"], c: 0, why: "주어 you + 현재시제 동사 원형." },
    { q: "The new software allows users to analyze data more ------- than before.", o: ["efficient", "efficiency", "efficiently", "most efficient"], c: 2, why: "동사 analyze를 꾸미는 부사 (more + 부사 + than)." },
    { q: "Mr. Park, ------- has worked here for ten years, will lead the project.", o: ["who", "which", "whose", "whom"], c: 0, why: "선행사가 사람, 뒤에 주어가 빠짐 → 주격 관계대명사 who." },
    { q: "The budget report ------- by the finance team last week.", o: ["reviewed", "was reviewed", "has reviewed", "reviewing"], c: 1, why: "by + 행위자, last week → 과거 수동태." },
    { q: "Visitors are ------- to sign in at the security desk.", o: ["required", "requiring", "requirement", "require"], c: 0, why: "be required to do (~해야 한다)." },
    { q: "By the time the client arrived, the presentation ------- already started.", o: ["has", "had", "have", "having"], c: 1, why: "과거(arrived)보다 먼저 → 과거완료 had p.p." },
    { q: "The hotel offers a free shuttle ------- the airport and the convention center.", o: ["among", "between", "across", "through"], c: 1, why: "between A and B." },
    { q: "Ms. Choi is ------- qualified for the position because of her experience.", o: ["high", "highly", "higher", "height"], c: 1, why: "형용사 qualified를 꾸미는 부사. highly qualified는 토익 단골 표현." },
    { q: "The workshop was so ------- that many participants asked for another session.", o: ["inform", "informative", "information", "informatively"], c: 1, why: "so + 형용사 + that." },
    { q: "If the materials ------- earlier, we would have finished on schedule.", o: ["arrive", "arrived", "had arrived", "have arrived"], c: 2, why: "가정법 과거완료: If + had p.p., would have p.p." },
    { q: "Each team member ------- responsible for checking the equipment.", o: ["are", "is", "be", "being"], c: 1, why: "each + 단수 명사 → 단수 동사." }
  ];
  // Part 7 독해: 지문 하나에 문항 여러 개
  var P7 = [
    { title: "Notice", text: "<b>To:</b> All Residents<br><b>From:</b> Building Management<br><b>Subject:</b> Elevator Maintenance<br><br>Please be advised that the elevators in Building B will be out of service on Tuesday, November 10, from 9 a.m. to 3 p.m. for scheduled maintenance. During this time, residents are asked to use the stairs or the elevators in Building A, which is connected to Building B on the second floor. Deliveries scheduled for that day should be rescheduled if possible. We apologize for the inconvenience. If you have any questions, please call the management office at 062-555-0147.",
      qs: [
        { q: "What is the purpose of the notice?", o: ["To announce scheduled work", "To introduce a new manager", "To request a payment", "To advertise a new building"], c: 0, why: "for scheduled maintenance → 예정된 작업 안내." },
        { q: "How can residents reach Building A?", o: ["Through the parking lot", "On the second floor", "By shuttle bus", "Through the basement"], c: 1, why: "which is connected to Building B on the second floor." },
        { q: "What are residents asked to do?", o: ["Call the office before 9 a.m.", "Move to Building A", "Reschedule deliveries if possible", "Repair the stairs"], c: 2, why: "Deliveries ... should be rescheduled if possible." }
      ] },
    { title: "Job Advertisement", text: "<b>Hanbit Engineering</b> is seeking a <b>Site Manager</b> for its new data center project in Gwangju. Responsibilities include managing daily schedules, coordinating subcontractors, and ensuring safety on site. Applicants must hold an engineering license and have at least two years of field experience. Experience with BIM software is preferred but not required. To apply, send a résumé and cover letter to the HR department by December 1. Only selected candidates will be contacted for an interview.",
      qs: [
        { q: "What is NOT mentioned as a responsibility of the position?", o: ["Managing daily schedules", "Coordinating subcontractors", "Designing the building", "Ensuring safety on site"], c: 2, why: "NOT 문제: 지문의 세 가지 업무에 '설계'는 없다." },
        { q: "What is indicated about BIM experience?", o: ["It is required.", "It is preferred but not required.", "It will be taught on the job.", "It is not useful for the position."], c: 1, why: "preferred but not required (우대 사항)." },
        { q: "What should applicants submit?", o: ["A design portfolio", "A résumé and cover letter", "An application fee", "Three references"], c: 1, why: "send a résumé and cover letter." }
      ] },
    { title: "Text Message Chain", text: "<b>Minji Seo [10:12]</b> Hi, Daniel. Are you still at the site?<br><b>Daniel Ahn [10:13]</b> Yes, I'm checking the concrete delivery. Why?<br><b>Minji Seo [10:15]</b> The client wants to move tomorrow's meeting to 2 p.m. Can you make it?<br><b>Daniel Ahn [10:16]</b> That should be fine. I'll be back at the office by noon.<br><b>Minji Seo [10:17]</b> Great. I'll let them know. Could you bring the updated schedule?<br><b>Daniel Ahn [10:18]</b> Sure thing.",
      qs: [
        { q: "Where most likely is Mr. Ahn?", o: ["At a construction site", "At the airport", "In a meeting room", "At a restaurant"], c: 0, why: "still at the site, checking the concrete delivery." },
        { q: "At 10:16, what does Mr. Ahn mean when he writes, \"That should be fine\"?", o: ["The concrete is good quality.", "He can attend the meeting at 2 p.m.", "The client is satisfied.", "He will finish work at noon."], c: 1, why: "의도 파악: 바로 앞 질문 'Can you make it?'(2시 회의 가능?)에 대한 답." },
        { q: "What will Mr. Ahn bring to the meeting?", o: ["A contract", "Concrete samples", "An updated schedule", "A new blueprint"], c: 2, why: "Could you bring the updated schedule? → Sure thing." }
      ] }
  ];

  var TYPES = {
    p1: { name: "Part 1 사진 묘사", lc: true },
    p2: { name: "Part 2 질의응답", lc: true },
    p5: { name: "Part 5 단문 빈칸", lc: false },
    p7: { name: "Part 7 독해", lc: false }
  };

  /* ---------- 공략 노트 ---------- */
  var NOTES = [
    { t: "시험 구성 (총 200문항 · 990점)", items: [
      "LC 100문항 · 약 45분: Part 1 사진(6) · Part 2 질의응답(25) · Part 3 대화(39) · Part 4 담화(30)",
      "RC 100문항 · 75분: Part 5 단문 빈칸(30) · Part 6 장문 빈칸(16) · Part 7 독해(54)",
      "RC 시간 배분: Part 5 약 10분 → Part 6 약 8분 → Part 7 나머지 전부",
      "모르는 문제는 찍고 넘어가기. 오답 감점이 없으니 빈칸은 절대 남기지 않기" ] },
    { t: "Part 1 사진 묘사", items: [
      "사람이 있으면 <b>동작</b>, 없으면 <b>사물의 위치·상태</b>를 본다",
      "<i>is being + p.p.</i> 는 '지금 누가 하고 있는 중' → 사람이 안 보이면 대부분 오답",
      "사진에 없는 단어가 들리면 바로 지우기" ] },
    { t: "Part 2 질의응답", items: [
      "첫 단어(의문사)만 확실히 들어도 반은 맞힌다: When / Where / Who / Why / How",
      "의문사 질문에 <i>Yes / No</i> 로 시작하는 답은 오답",
      "질문 단어를 그대로 반복하거나 소리가 비슷한 단어(lunch/launch)는 함정",
      "'잘 모르겠다 / 확인해 볼게' 같은 우회 답변이 정답인 경우가 많다" ] },
    { t: "Part 3·4 대화·담화", items: [
      "음성이 나오기 전에 문제 3개를 먼저 읽고 키워드 표시",
      "문제 순서 = 대화 순서. 첫 문제 답은 앞부분에서 나온다",
      "의도 파악 문제: 그 문장 <b>바로 앞뒤</b>의 흐름으로 판단" ] },
    { t: "Part 5·6 빈칸", items: [
      "보기가 같은 단어의 품사 변형이면 → 해석하지 말고 빈칸 자리부터 (명사·형용사·부사)",
      "동사 자리: 수 일치 → 태(능동/수동) → 시제 순서로 확인",
      "전치사 vs 접속사: 뒤에 명사면 전치사(during, despite, due to), 절이면 접속사(when, although, because)",
      "Part 6은 문맥 문제(문장 넣기)가 있으니 앞뒤 문장을 꼭 읽기" ] },
    { t: "Part 7 독해", items: [
      "문제 먼저 → 지문에서 키워드 찾기 (지문을 처음부터 다 읽지 않기)",
      "NOT 문제: 보기를 하나씩 지문과 대조해서 지우기",
      "지문의 단어를 그대로 쓴 보기보다 <b>바꿔 말한(paraphrase)</b> 보기가 정답일 때가 많다",
      "이중·삼중 지문은 두 지문의 정보를 합쳐야 풀리는 문제가 꼭 있다" ] },
    { t: "토익 단골 어휘 (현장 버전)", items: [
      "<i>contractor</i> 시공업체 · <i>subcontractor</i> 하도급업체 · <i>estimate / quote</i> 견적",
      "<i>postpone / delay</i> 연기 · <i>reschedule</i> 일정 변경 · <i>out of service</i> 운행 중지",
      "<i>inspection</i> 점검 · <i>maintenance</i> 유지보수 · <i>renovation</i> 개보수",
      "<i>be required to</i> ~해야 한다 · <i>no later than</i> 늦어도 ~까지 · <i>highly qualified</i> 충분한 자격",
      "<i>invoice</i> 청구서 · <i>budget</i> 예산 · <i>expense</i> 비용 · <i>reimburse</i> 환급하다" ] }
  ];

  /* ---------- 유틸 ---------- */
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var store = function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  var put = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var load = function () { return store("dongos-toeic-lr-log", []); };
  var saveLog = function (l) { put("dongos-toeic-lr-log", l.slice(-500)); };
  var dayKey = function (d) { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var examDate = function () { return store("dongos-toeic-exam", ""); };
  var goal = function () { return store("dongos-toeic-goal", ""); };
  var daysLeft = function () {
    var e = examDate(); if (!e) return null;
    return Math.round((new Date(e + "T00:00:00") - new Date(dayKey() + "T00:00:00")) / 86400000);
  };
  var L = "ABCD";

  var speak = function (text, done) {
    if (!("speechSynthesis" in window)) { setTimeout(done, 800); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.92;
    var v = speechSynthesis.getVoices().filter(function (x) { return /en-US/.test(x.lang); })[0];
    if (v) u.voice = v;
    var finished = false, fin = function () { if (!finished) { finished = true; done(); } };
    u.onend = fin; u.onerror = fin;
    setTimeout(fin, 4000 + text.length * 90);   // 음성이 멈춰도 진행되도록
    speechSynthesis.speak(u);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.DONG, $ = D.$, $$ = D.$$;
    var body = $("#toeic-body"), tabs = $$("#toeic .tz-tab");
    var clock = null, aborted = false;

    /* ---------- 작업 표시줄 D-day ---------- */
    var updTray = function () {
      var tray = $("#tray-dday"); if (!tray) return;
      var n = daysLeft();
      tray.textContent = n === null || n < 0 ? "" : "📝 토익 " + (n === 0 ? "D-DAY" : "D-" + n);
      tray.onclick = function () { D.openWin("toeic"); };
    };

    /* ---------- 문항 만들기 ---------- */
    // item: { type, id, html, say, opts(보기 글자), c(정답 번호), why, showOpts }
    var mk = {
      p1: function (i) {
        var s = P1[i], o = shuffle(s.a);
        return { type: "p1", id: "p1-" + i, opts: o, c: o.indexOf(s.a[0]), showOpts: false,
          html: '<img class="tz-pic" src="' + s.src + '" alt="Part 1 사진">',
          say: "Look at the picture. " + o.map(function (x, k) { return L[k] + ". " + x; }).join(" "),
          why: "사진 속 동작·상태와 맞는 문장. 사진에 없는 사물·동작이 들리면 바로 지우기." };
      },
      p2: function (i) {
        var s = P2[i], o = shuffle(s.a);
        return { type: "p2", id: "p2-" + i, opts: o, c: o.indexOf(s.a[0]), showOpts: false,
          html: '<div class="tz-q muted">(질문과 보기는 음성으로만 나옵니다. 받아 적지 말고 들으면서 지우기)</div>',
          say: s.q + " " + o.map(function (x, k) { return L[k] + ". " + x; }).join(" "),
          script: s.q, why: s.why };
      },
      p5: function (i) {
        var s = P5[i];
        return { type: "p5", id: "p5-" + i, opts: s.o, c: s.c, showOpts: true, html: '<div class="tz-passage">' + esc(s.q) + "</div>", why: s.why };
      },
      p7: function (i) {
        var s = P7[i];
        return s.qs.map(function (q, k) {
          return { type: "p7", id: "p7-" + i + "-" + k, opts: q.o, c: q.c, showOpts: true,
            html: '<div class="tz-info"><b>' + esc(s.title) + '</b><div class="tz-doc">' + s.text + '</div></div><div class="tz-q"><b>' + (k + 1) + ".</b> " + esc(q.q) + "</div>", why: q.why };
        });
      }
    };
    var idx = function (n) { return Array.apply(null, Array(n)).map(function (_, i) { return i; }); };
    var some = function (arr, n) { return shuffle(idx(arr.length)).slice(0, n); };
    var buildType = function (t) {
      if (t === "p7") return some(P7, 1).map(mk.p7)[0];
      var n = { p1: 3, p2: 6, p5: 10 }[t];
      return some({ p1: P1, p2: P2, p5: P5 }[t], n).map(mk[t]);
    };
    var buildMock = function () {
      return some(P1, 2).map(mk.p1).concat(some(P2, 5).map(mk.p2), some(P5, 8).map(mk.p5), mk.p7(some(P7, 1)[0]));
    };
    var byId = function (id) {
      var p = id.split("-"), t = p[0], i = +p[1];
      if (t === "p7") return mk.p7(i)[+p[2]];
      return mk[t](i);
    };

    /* ---------- 실행 ---------- */
    // mode: "mock" = 끝나고 채점, "practice" = 바로 해설
    var run = function (items, label, mode) {
      aborted = false;
      var answers = [], i = 0, t0 = Date.now();
      clearInterval(clock);
      var show = function () {
        if (aborted) return;
        if (i >= items.length) { finish(); return; }
        var it = items[i], tp = TYPES[it.type];
        body.innerHTML =
          '<div class="tz-head"><b>' + esc(label) + "</b> · " + (i + 1) + " / " + items.length + ' <span class="muted">(' + tp.name + ')</span><span class="tz-clock" id="tz-clock"></span></div>' +
          '<div class="tz-stage">' + it.html + "</div>" +
          '<div class="tz-opts" id="tz-opts">' + it.opts.map(function (o, k) {
            return '<button data-k="' + k + '"><b>(' + L[k] + ")</b> " + (it.showOpts ? esc(o) : "") + "</button>";
          }).join("") + "</div>" +
          '<div id="tz-fb"></div>' +
          '<div class="row right">' + (tp.lc && mode === "practice" ? '<button id="tz-replay">🔊 다시 듣기</button>' : "") + '<button id="tz-stop">그만하기</button></div>';
        tick();
        $("#tz-stop").onclick = function () { aborted = true; if ("speechSynthesis" in window) speechSynthesis.cancel(); finish(); };
        var rp = $("#tz-replay"); if (rp) rp.onclick = function () { speak(it.say, function () {}); };
        if (tp.lc) speak(it.say, function () {});
        $$("#tz-opts button").forEach(function (b) {
          b.onclick = function () {
            var k = +b.dataset.k, ok = k === it.c;
            if ("speechSynthesis" in window) speechSynthesis.cancel();
            answers.push({ it: it, k: k, ok: ok });
            if (mode === "mock") { i++; show(); return; }
            $$("#tz-opts button").forEach(function (x, j) {
              x.disabled = true;
              if (!it.showOpts) x.innerHTML = "<b>(" + L[j] + ")</b> " + esc(it.opts[j]);
              if (j === it.c) x.classList.add("ok"); else if (j === k) x.classList.add("bad");
            });
            $("#tz-fb").innerHTML = '<div class="tz-why ' + (ok ? "ok" : "bad") + '">' + (ok ? "⭕ 정답!" : "❌ 오답 · 정답 (" + L[it.c] + ")") + " — " + esc(it.why) + '</div><div class="row right"><button id="tz-next">' + (i + 1 < items.length ? "다음 ▶" : "결과 보기") + "</button></div>";
            $("#tz-next").onclick = function () { i++; show(); };
          };
        });
      };
      var tick = function () {
        clearInterval(clock);
        clock = setInterval(function () {
          var c = $("#tz-clock"); if (!c) { clearInterval(clock); return; }
          var s = Math.floor((Date.now() - t0) / 1000);
          c.textContent = "⏱ " + String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
        }, 500);
      };
      var finish = function () {
        clearInterval(clock);
        if (!answers.length) { showTab("home"); return; }
        var log = load(), wrong = store("dongos-toeic-wrong", []), today = dayKey();
        answers.forEach(function (a) {
          log.push({ d: today, type: a.it.type, id: a.it.id, ok: a.ok });
          var w = wrong.indexOf(a.it.id);
          if (!a.ok && w < 0) wrong.push(a.it.id);
          if (a.ok && w >= 0) wrong.splice(w, 1);   // 다시 맞히면 오답 노트에서 뺀다
        });
        saveLog(log); put("dongos-toeic-wrong", wrong);
        review(answers, label, Math.floor((Date.now() - t0) / 1000), items, mode);
      };
      show();
    };

    var review = function (answers, label, secs, items, mode) {
      var right = answers.filter(function (a) { return a.ok; }).length;
      var html = '<div class="tz-dday"><div class="big">' + right + " / " + answers.length + '</div><div>' + esc(label) + " · 정답률 " + Math.round(right / answers.length * 100) + "% · " + Math.floor(secs / 60) + "분 " + (secs % 60) + "초</div></div>";
      html += '<table class="tz-plan" style="margin-top: 8px;"><tr><th>#</th><th>파트</th><th>내 답</th><th>정답</th><th>해설</th></tr>' + answers.map(function (a, n) {
        return '<tr><td>' + (n + 1) + "</td><td>" + TYPES[a.it.type].name.split(" ").slice(0, 2).join(" ") + '</td><td class="' + (a.ok ? "" : "warn") + '">' + L[a.k] + (a.ok ? " ⭕" : " ❌") + "</td><td>" + L[a.it.c] + "</td><td>" +
          (a.it.script ? '<i class="en">' + esc(a.it.script) + "</i><br>" : "") + (a.it.showOpts ? "" : '<span class="en">' + esc(a.it.opts[a.it.c]) + "</span><br>") + esc(a.it.why) + "</td></tr>";
      }).join("") + "</table>";
      html += '<div class="row right" style="margin-top: 8px;"><button id="tz-again">한 번 더</button><button id="tz-home">처음으로</button></div>';
      body.innerHTML = html; body.scrollTop = 0;
      $("#tz-home").onclick = function () { showTab("home"); };
      $("#tz-again").onclick = function () {
        if (label === "미니 모의고사") run(buildMock(), label, "mock");
        else if (label === "오답 다시 풀기") runWrong();
        else run(buildType(items[0].type), label, mode);
      };
    };
    var runWrong = function () {
      var w = store("dongos-toeic-wrong", []);
      if (!w.length) { D.msg("오답 노트", "다시 풀 오답이 없습니다. 🎉", "📝"); showTab("log"); return; }
      run(shuffle(w).slice(0, 15).map(byId), "오답 다시 풀기", "practice");
    };

    /* ---------- 탭 화면 ---------- */
    var homeHtml = function () {
      var left = daysLeft(), log = load(), today = dayKey(), ex = examDate(), g = goal();
      var days = {}; log.forEach(function (l) { days[l.d] = true; });
      var streak = 0, d = new Date();
      if (!days[today]) d.setDate(d.getDate() - 1);
      while (days[dayKey(d)]) { streak++; d.setDate(d.getDate() - 1); }
      var todayLog = log.filter(function (l) { return l.d === today; });
      var acc = log.length ? Math.round(log.filter(function (l) { return l.ok; }).length / log.length * 100) + "%" : "-";
      var plan = [
        ["1주차", "실전 모의고사 1회로 현재 점수 확인 · LC/RC 약한 파트 찾기"],
        ["2주차", "Part 2 의문사 듣기 + Part 5 품사·동사 문법 매일 30문제"],
        ["3주차", "Part 3·4 문제 먼저 읽기 연습 · Part 7 단일 지문 시간 재고 풀기"],
        ["4주차", "실전 모의고사 2회 (시간 지키기) · 오답 노트 반복 · 시험 전날 일찍 자기 (INTP 주의)"]
      ];
      var cur = left === null || left > 28 ? -1 : left < 0 ? 4 : 3 - Math.floor(left / 7);
      return '<div class="tz-dday"><div class="big">' + (left === null ? "D-?" : left > 0 ? "D-" + left : left === 0 ? "D-DAY" : "시험 끝!") + '</div><div>토익 · ' + (ex ? ex.replace(/-/g, ".") : "시험일 미정") + " · 목표 <b>" + (g ? esc(g) : "?") + "</b></div></div>" +
        '<div class="tz-badge">🎤 토익 스피킹 <b>' + SPEAKING.grade + "</b> 취득 (" + SPEAKING.date + ") ✅ 다음 퀘스트: 토익</div>" +
        '<fieldset><legend>시험 정보</legend><div class="row"><label for="tz-exam">시험일</label><input type="date" id="tz-exam" value="' + esc(ex) + '"><label for="tz-goal">목표 점수</label><input type="text" id="tz-goal" size="6" placeholder="예: 850" value="' + esc(g) + '"><button id="tz-save">저장</button></div></fieldset>' +
        '<div class="tz-stats" style="margin: 8px 0;"><span>오늘 푼 문항 <b>' + todayLog.length + '</b></span><span>연속 <b>' + streak + '</b>일 🔥</span><span>전체 <b>' + log.length + "</b>문항 · 정답률 <b>" + acc + "</b></span></div>" +
        '<fieldset><legend>4주 완성 계획</legend><table class="tz-plan">' + plan.map(function (p, i) {
          return '<tr class="' + (i === cur ? "now" : i < cur ? "past" : "") + '"><td>' + p[0] + "</td><td>" + p[1] + "</td></tr>";
        }).join("") + "</table></fieldset>" +
        '<div class="tz-start"><button id="tz-mock">📝 미니 모의고사 (LC 7 + RC 11문항)</button></div>' +
        '<fieldset><legend>파트별 연습 (바로 해설)</legend><div class="tz-types">' + Object.keys(TYPES).map(function (k) {
          return '<button data-type="' + k + '">' + (TYPES[k].lc ? "🎧 " : "📖 ") + TYPES[k].name + "</button>";
        }).join("") + "</div></fieldset>" +
        '<p class="muted">🎧 LC 문제는 브라우저의 영어 음성으로 읽어 줍니다. 소리를 켜 두세요. 문제는 직접 만든 연습용이라 실제 시험보다 쉬울 수 있습니다.</p>';
    };
    var notesHtml = function () {
      return NOTES.map(function (n) { return "<fieldset><legend>" + n.t + "</legend><ul class=\"tz-notes\">" + n.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></fieldset>"; }).join("");
    };
    var logHtml = function () {
      var log = load(), wrong = store("dongos-toeic-wrong", []);
      if (!log.length) return '<p class="muted">아직 기록이 없습니다. 한 문제라도 풀어 보세요.</p>';
      var html = '<table class="tz-plan"><tr><th>파트</th><th>푼 문항</th><th>정답률</th></tr>';
      Object.keys(TYPES).forEach(function (k) {
        var a = log.filter(function (l) { return l.type === k; }); if (!a.length) return;
        var r = Math.round(a.filter(function (l) { return l.ok; }).length / a.length * 100);
        html += "<tr><td>" + TYPES[k].name + "</td><td>" + a.length + '</td><td class="' + (r < 70 ? "warn" : "") + '">' + r + "%</td></tr>";
      });
      html += '</table><fieldset><legend>오답 노트 (' + wrong.length + "문항 · 다시 맞히면 빠집니다)</legend>" +
        (wrong.length ? wrong.slice(-10).reverse().map(function (id) {
          var it = byId(id);
          return "<p><b>" + TYPES[it.type].name + "</b> · " + (it.script ? '<span class="en">' + esc(it.script) + "</span> → " : "") + '<span class="en">' + esc(it.opts[it.c]) + '</span><br><span class="muted">' + esc(it.why) + "</span></p>";
        }).join("") : '<p class="muted">오답이 없습니다.</p>') +
        '</fieldset><div class="row right"><button id="tz-wrong"' + (wrong.length ? "" : " disabled") + '>오답 다시 풀기</button><button id="tz-clear">기록 지우기</button></div>';
      return html;
    };
    var showTab = function (name) {
      aborted = true; clearInterval(clock); if ("speechSynthesis" in window) speechSynthesis.cancel();
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t.dataset.tab === name ? "true" : "false"); });
      if (name === "home") {
        body.innerHTML = homeHtml();
        $("#tz-save").onclick = function () { put("dongos-toeic-exam", $("#tz-exam").value); put("dongos-toeic-goal", $("#tz-goal").value.trim()); updTray(); showTab("home"); };
        $("#tz-mock").onclick = function () { run(buildMock(), "미니 모의고사", "mock"); };
        $$("#toeic-body [data-type]").forEach(function (b) { b.onclick = function () { run(buildType(b.dataset.type), TYPES[b.dataset.type].name + " 연습", "practice"); }; });
      } else if (name === "notes") body.innerHTML = notesHtml();
      else {
        body.innerHTML = logHtml();
        var c = $("#tz-clear"); if (c) c.onclick = function () { saveLog([]); put("dongos-toeic-wrong", []); showTab("log"); };
        var w = $("#tz-wrong"); if (w) w.onclick = runWrong;
      }
      body.scrollTop = 0;
    };
    tabs.forEach(function (t) { t.addEventListener("click", function (e) { e.preventDefault(); showTab(t.dataset.tab); }); });
    D.apps.toeic = function () { showTab("home"); };
    D.closers.toeic = function () {
      aborted = true; clearInterval(clock);
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    };
    updTray();
    window.DONG.toeicDaysLeft = daysLeft;
  });
})();
