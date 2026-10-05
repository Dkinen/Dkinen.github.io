/* =========================================================
   DONG OS 98 — 토스 연습기 (TOEIC Speaking, 목표 IH~AL)
   실제 시험 형식: 11문항 · 준비 시간 → 삐 → 답변 시간
   녹음과 기록은 이 브라우저 안에만 남습니다.
   ========================================================= */
(function () {
  "use strict";

  var EXAM_DATE = "2026-10-12";   // 시험일
  var GOAL = "IH~AL";

  /* ---------- 문제 은행 (직접 작성한 연습 문제) ---------- */
  var READ = [
    "Thank you for calling Greenfield Community Center. Our facility is open from seven a.m. to ten p.m., Monday through Saturday. To register for swimming lessons, yoga classes, or our new weekend basketball program, please press one. For information about parking, events, and rental fees, press two. If you'd like to speak with a staff member, please stay on the line.",
    "Attention, passengers. The express train to Gwangju, scheduled to depart at three fifteen, has been delayed due to heavy rain. We expect the train to arrive at platform four in approximately twenty minutes. Snacks, drinks, and newspapers are available at the kiosk near the main entrance. We apologize for any inconvenience and thank you for your patience.",
    "Welcome to this week's edition of Business Today. On tonight's program, we'll be talking with Linda Park, the founder of a successful architecture firm. Ms. Park will share her thoughts on sustainable design, smart buildings, and the future of urban housing. Later in the show, we'll answer questions from our listeners, so stay tuned.",
    "Are you looking for a comfortable, affordable place to stay downtown? The Riverside Hotel offers spacious rooms, a rooftop pool, and free breakfast every morning. Our hotel is just a five-minute walk from the convention center, shopping malls, and popular restaurants. Book your room online this month and receive fifteen percent off your entire stay.",
    "Good morning, everyone, and welcome to the safety orientation. Before you enter the construction site, please make sure you are wearing a hard hat, safety boots, and a reflective vest. Heavy equipment, including cranes, excavators, and trucks, will be operating throughout the day. If you notice any hazard, report it to your supervisor immediately.",
    "This is a reminder that the city library will be closed next Monday for building maintenance. During this time, books may be returned using the drop box located next to the front door. Our online services, including e-books, audiobooks, and research databases, will remain available. Regular hours will resume on Tuesday morning."
  ];
  var PICS = [
    { src: "../why-not/images/4-projects.jpg", hint: "basketball game · indoor arena · a player dunking the ball · crowd in the background · players in blue and black uniforms" },
    { src: "../images/project-socmap.jpg", hint: "construction site · tower cranes · excavators · red and orange safety zones · green arrows · a hand holding a smartphone" },
    { src: "../images/project-datacenter.png", hint: "aerial view · large white buildings · round storage tanks · the sea on the right · roads and an industrial area" },
    { src: "../why-not/images/1-hero.jpg", hint: "a basketball player · dribbling the ball · white jersey with the number zero · orange arm sleeves · dark background" },
    { src: "../images/profile.jpg", hint: "a man sleeping · lying under a mint-colored blanket · a green suitcase behind his head · fishing rods on the left" }
  ];
  var RESPOND = [
    { ctx: "Imagine that a Canadian marketing firm is doing research in your country. You have agreed to participate in a telephone interview about coffee shops.",
      q: ["How often do you go to a coffee shop, and who do you usually go with?", "What do you usually order at a coffee shop, and why?", "If a new coffee shop opened in your neighborhood, what would make you visit it regularly? Why?"] },
    { ctx: "Imagine that a fitness company is doing research in your area. You have agreed to participate in a telephone interview about exercise.",
      q: ["How often do you exercise, and where do you usually do it?", "Do you prefer to exercise alone or with other people? Why?", "Which of the following would most encourage you to exercise more: a personal trainer, a gym near your home, or a fitness app? Why?"] },
    { ctx: "Imagine that a technology magazine is writing an article about smartphone apps. You have agreed to participate in a telephone interview.",
      q: ["What kind of app do you use most often, and why?", "How did you find out about the last app you downloaded?", "Would you be willing to pay for an app? Why or why not?"] },
    { ctx: "Imagine that your city is doing research about public transportation. You have agreed to participate in a telephone interview.",
      q: ["How do you usually get to school or work, and how long does it take?", "What is the most inconvenient thing about public transportation in your city?", "If the city could improve one thing about public transportation, what should it be? Why?"] },
    { ctx: "Imagine that an online shopping company is doing research in your country. You have agreed to participate in a telephone interview about online shopping.",
      q: ["When was the last time you bought something online, and what did you buy?", "Do you read reviews before buying something online? Why or why not?", "Some people prefer shopping in stores rather than online. What are the advantages of shopping in stores?"] },
    { ctx: "Imagine that a travel magazine is writing an article about how people spend their weekends. You have agreed to participate in a telephone interview.",
      q: ["What did you do last weekend?", "Do you prefer to stay at home or go out on weekends? Why?", "If you had a three-day weekend, how would you spend it? Why?"] },
    { ctx: "Imagine that a movie company is doing research in your area. You have agreed to participate in a telephone interview about watching movies.",
      q: ["How often do you watch movies, and where do you usually watch them?", "What kind of movies do you enjoy the most, and why?", "Do you think watching movies in a theater is better than watching them at home? Why or why not?"] },
    { ctx: "Imagine that a food delivery company is doing research in your country. You have agreed to participate in a telephone interview about food delivery.",
      q: ["How often do you order food for delivery, and what do you usually order?", "What is most important to you when you choose a restaurant for delivery?", "Do you think food delivery services will become more popular in the future? Why or why not?"] }
  ];
  var INFO = [
    { title: "Construction Technology Conference",
      table: "<b>Construction Technology Conference</b><br>Gwangju Convention Center · Saturday, October 24<br><table><tr><th>Time</th><th>Session</th><th>Speaker</th></tr><tr><td>9:00 – 9:30</td><td>Registration</td><td>-</td></tr><tr><td>9:30 – 10:30</td><td>Keynote: Smart Construction Sites</td><td>Dr. Hana Lee, Chonnam University</td></tr><tr><td>10:45 – 11:45</td><td>Safety Management with Digital Twins</td><td>Minsu Park, Daehan Construction</td></tr><tr><td>12:00 – 1:00</td><td>Lunch (Hall B)</td><td>-</td></tr><tr><td>1:00 – 2:00</td><td>Data-Driven Building Maintenance</td><td>Prof. Jiwon Kim, Seoul University</td></tr><tr><td>2:15 – 3:00</td><td>Panel: The Future of Data Centers</td><td>Industry experts</td></tr></table>",
      intro: "Hi, I'm planning to attend the construction technology conference, but I lost my schedule. I'd like to ask you a few questions.",
      q: ["What time does the conference start, and where is it being held?", "I heard the session on safety management will be held in the afternoon. Is that correct?", "Could you tell me about all the sessions led by speakers from universities?"] },
    { title: "Job Interview Schedule",
      table: "<b>Hanbit Engineering — Interview Schedule</b><br>Monday, November 2 · Conference Room 3<br><table><tr><th>Time</th><th>Applicant</th><th>Position</th><th>Current Company</th></tr><tr><td>9:30 a.m.</td><td>Junho Kwon</td><td>Site Manager</td><td>Jeil Construction</td></tr><tr><td>10:30 a.m.</td><td>Yerin Choi</td><td>Safety Engineer</td><td>Dongbu Engineering</td></tr><tr><td>11:30 a.m.</td><td>Daniel Smith</td><td>Cost Estimator</td><td>Global Build Inc.</td></tr><tr><td>2:00 p.m.</td><td>Sora Han</td><td>Site Manager</td><td>Seoul Housing</td></tr><tr><td colspan=\"4\">* Interviews will be held online if the room is unavailable.</td></tr></table>",
      intro: "Hello, this is Michael from the HR department. I need some information about the interviews scheduled for next Monday.",
      q: ["Where will the interviews take place, and what time is the first interview?", "I heard Yerin Choi is applying for the cost estimator position. Is that right?", "Could you give me the details about the applicants for the site manager position?"] },
    { title: "Business Trip Itinerary",
      table: "<b>Business Trip Itinerary — Mr. Daniel Ahn</b><br>Destination: Singapore<br><table><tr><th>Date</th><th>Time</th><th>Schedule</th></tr><tr><td>Tue, Oct 13</td><td>8:10 a.m.</td><td>Depart Incheon (Flight SQ603)</td></tr><tr><td></td><td>2:00 p.m.</td><td>Arrive Singapore · Hotel check-in (Marina Hotel)</td></tr><tr><td>Wed, Oct 14</td><td>10:00 a.m.</td><td>Site visit: New Data Center Project</td></tr><tr><td></td><td>3:00 p.m.</td><td>Meeting with local contractors</td></tr><tr><td>Thu, Oct 15</td><td>11:00 a.m.</td><td>Presentation: Cooling System Design</td></tr><tr><td></td><td>6:30 p.m.</td><td>Depart Singapore (Flight SQ612)</td></tr></table>",
      intro: "Hi, this is Daniel Ahn. I'm going on a business trip next week, and I'd like to check some details of my schedule.",
      q: ["What time does my flight leave, and which airline am I flying with?", "I'll have a presentation on Wednesday afternoon, right?", "What will I be doing on Wednesday? Please give me all the details."] },
    { title: "Community Center Classes",
      table: "<b>Greenfield Community Center — Fall Classes</b><br>September 7 – November 27 · Registration fee: $20 per class<br><table><tr><th>Class</th><th>Day</th><th>Time</th><th>Instructor</th></tr><tr><td>Beginner Swimming</td><td>Mon / Wed</td><td>7:00 – 8:00 p.m.</td><td>Kevin Lee</td></tr><tr><td>Advanced Swimming</td><td>Tue / Thu</td><td>6:00 – 7:00 a.m.</td><td>Kevin Lee</td></tr><tr><td>Yoga for Beginners</td><td>Saturday</td><td>10:00 – 11:30 a.m.</td><td>Amy Chen</td></tr><tr><td>Basketball Club</td><td>Sunday</td><td>2:00 – 4:00 p.m.</td><td>Mark Davis</td></tr><tr><td>Photography</td><td>Friday</td><td>7:00 – 9:00 p.m.</td><td>Amy Chen <i>(canceled)</i></td></tr></table>",
      intro: "Hi, I'm interested in taking some classes at the community center this fall. Could you help me with a few questions?",
      q: ["When does the fall session start, and how much is the registration fee?", "I heard that I can take a photography class on Friday evenings. Is that right?", "I'm interested in swimming. Can you tell me about all the swimming classes you offer?"] }
  ];
  var OPINION = [
    "Do you agree or disagree with the following statement? It is better to work for a large company than for a small company. Give specific reasons and examples to support your opinion.",
    "Some people prefer to study alone, while others prefer to study in a group. Which do you prefer, and why? Give specific reasons and examples.",
    "Which of the following is the most important quality for a team leader? Communication skills, a sense of responsibility, or technical knowledge. Give specific reasons and examples.",
    "Do you agree or disagree with the following statement? Companies should allow employees to work from home. Give specific reasons and examples.",
    "Do you think it is a good idea for university students to do internships before they graduate? Why or why not? Give specific reasons and examples.",
    "Do you agree or disagree with the following statement? Technology has made people's lives less stressful. Give specific reasons and examples.",
    "Your city has extra money to spend. Should it build more public parks or more parking lots? Give specific reasons and examples.",
    "When choosing a job, which is the most important factor: salary, location, or opportunities for growth? Give specific reasons and examples.",
    "Do you agree or disagree with the following statement? Following safety rules at work is more important than meeting deadlines. Give specific reasons and examples.",
    "Do you agree or disagree with the following statement? People should exercise every day to stay healthy. Give specific reasons and examples."
  ];

  /* ---------- 문항 구성 (실제 시험과 같은 시간) ---------- */
  var TYPES = {
    read:    { name: "Q1-2 지문 읽기", en: "Read a text aloud", prep: 45, resp: 45, dir: "In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud." },
    picture: { name: "Q3-4 사진 묘사", en: "Describe a picture", prep: 45, resp: 30, dir: "In this part of the test, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response. Then you will have 30 seconds to speak about the picture." },
    respond: { name: "Q5-7 질문에 답하기", en: "Respond to questions", prep: 3, dir: "In this part of the test, you will answer three questions. You will have three seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 5 and 6, and 30 seconds to respond to Question 7." },
    info:    { name: "Q8-10 정보 보고 답하기", en: "Respond using information", prep: 3, dir: "In this part of the test, you will answer three questions based on the information provided. You will have 45 seconds to read the information before the questions begin. You will have three seconds to prepare and 15 seconds to respond to Questions 8 and 9. You will hear Question 10 two times. You will have three seconds to prepare and 30 seconds to respond to Question 10." },
    opinion: { name: "Q11 의견 말하기", en: "Express an opinion", prep: 45, resp: 60, dir: "In this part of the test, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak." }
  };

  /* ---------- 표현 노트 (IH~AL 목표) ---------- */
  var NOTES = [
    { t: "공통 · IH~AL로 가는 기준", items: [
      "답변 시간을 끝까지 채우기. 침묵 3초 이상은 감점 요인입니다.",
      "짧은 문장 여러 개보다 접속사로 이은 문장: because, so, which means, while, although",
      "이유만 말하지 말고 <b>구체적인 예시</b>를 붙이기 → AL의 핵심",
      "틀려도 멈추지 말고 자연스럽게 고치기: <i>I mean, ...</i> / <i>What I'm trying to say is ...</i>",
      "음, 어 대신 쓸 연결 표현: <i>Well, let me think.</i> / <i>That's a good question.</i>" ] },
    { t: "Q1-2 지문 읽기", items: [
      "쉼표·마침표에서 끊고, 고유명사·숫자는 또박또박",
      "나열(A, B, and C)은 A↗ B↗ and C↘ 억양",
      "질문문은 끝을 올리고, 강조할 정보(시간·장소·할인율)는 힘주어",
      "준비 45초 동안 입으로 작게 한 번 읽어 보기" ] },
    { t: "Q3-4 사진 묘사 (30초)", items: [
      "<i>This picture was taken at/in ...</i>  (장소)",
      "<i>The first thing I notice is ...</i>  (가장 눈에 띄는 것)",
      "<i>On the left side of the picture, ... / In the background, ...</i>  (위치)",
      "<i>He is wearing ... and seems to be ...</i>  (사람: 옷차림 + 동작)",
      "<i>Overall, it looks like a busy/peaceful ...</i>  (전체 분위기로 마무리)" ] },
    { t: "Q5-7 질문에 답하기 (15/15/30초)", items: [
      "질문의 단어를 그대로 받아 첫 문장 시작: <i>I go to a coffee shop about three times a week.</i>",
      "Q5·6: 답 + 이유 한 줄로 15초 채우기",
      "Q7(30초): 답 → 이유 1 → 예시 → 이유 2 → 정리",
      "선택지 문제는 하나만 고르고 이유를 확실하게" ] },
    { t: "Q8-10 정보 보고 답하기", items: [
      "45초 동안 날짜·시간·장소·<b>취소/변경(*)</b> 표시부터 확인",
      "Q9 정정: <i>I'm sorry, but you have the wrong information. Actually, ...</i>",
      "Q10 요약: <i>There are two sessions ... First, ... at ... Second, ...</i>",
      "표의 말을 문장으로 바꾸기: 9:30 → <i>starts at nine thirty</i>" ] },
    { t: "Q11 의견 말하기 (60초)", items: [
      "<i>I strongly agree that ... There are two main reasons.</i>",
      "<i>First of all, ... For example, when I ...</i>",
      "<i>Second, ... This is because ...</i>",
      "<i>For these reasons, I believe that ...</i>",
      "준비 45초: 의견 1줄 + 이유 2개 + 예시 1개 메모" ] },
    { t: "나만의 만능 에피소드 (Q7·Q11에 그대로 쓰기)", items: [
      "<b>인턴</b>: <i>Last winter, I worked as an intern at a construction company, where I was in charge of site management. I learned that clear communication can prevent accidents.</i>",
      "<b>팀 프로젝트</b>: <i>In my capstone project, my team built a program that shows dangerous areas on a construction site. Working as a team helped me solve problems faster.</i>",
      "<b>수상</b>: <i>Our team won an innovation award at a national construction management competition. We planned a data center that uses cold energy from LNG.</i>",
      "<b>수영</b>: <i>I go swimming to relieve stress. After swimming, I can focus much better.</i>",
      "<b>데이터 연구</b>: <i>I'm doing research on apartment maintenance using public data, so I use technology every day to analyze information.</i>" ] }
  ];
  var FILLERS = ["uh", "um", "er", "ah", "hmm", "like", "you know"];

  /* ---------- 유틸 ---------- */
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var load = function () { try { return JSON.parse(localStorage.getItem("dongos-toeic-log") || "[]"); } catch (e) { return []; } };
  var saveLog = function (l) { try { localStorage.setItem("dongos-toeic-log", JSON.stringify(l.slice(-300))); } catch (e) {} };
  var dayKey = function (d) { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var daysLeft = function () {
    var t = new Date(EXAM_DATE + "T00:00:00"), n = new Date(dayKey() + "T00:00:00");
    return Math.round((t - n) / 86400000);
  };
  var fmt = function (s) { s = Math.max(0, Math.ceil(s)); return "00:" + String(s).padStart(2, "0"); };

  var audioCtx = null;
  var beep = function () {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = 1000; o.connect(g); g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.25, audioCtx.currentTime);
      o.start(); o.stop(audioCtx.currentTime + 0.45);
    } catch (e) {}
  };
  var speak = function (text, done) {
    if (!("speechSynthesis" in window)) { setTimeout(done, 1500); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.95;
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
    var stream = null, rec = null, chunks = [], recog = null, transcript = "", interim = "";
    var timer = null, aborted = false, session = null;

    /* ---------- 마이크 · 음성 인식 ---------- */
    var getMic = function () {
      if (stream || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.resolve(stream);
      body.innerHTML = '<div class="tz-head"><b>준비 중</b></div><p>🎙️ 마이크 권한을 확인하고 있습니다.<br>브라우저 주소창 근처에 뜬 창에서 <b>허용</b>을 눌러 주세요.</p><p class="muted">8초 동안 응답이 없으면 녹음 없이 시작합니다.</p>';
      var ask = navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) { stream = s; return s; }).catch(function () { return null; });
      var wait = new Promise(function (r) { setTimeout(function () { r(null); }, 8000); });   // 권한 창을 무시해도 진행
      return Promise.race([ask, wait]);
    };
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var startCapture = function () {
      transcript = ""; interim = ""; chunks = [];
      if (stream && window.MediaRecorder) {
        try { rec = new MediaRecorder(stream); rec.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); }; rec.start(); } catch (e) { rec = null; }
      }
      if (SR) {
        try {
          recog = new SR(); recog.lang = "en-US"; recog.continuous = true; recog.interimResults = true;
          recog.onresult = function (e) {
            interim = "";
            for (var i = e.resultIndex; i < e.results.length; i++) {
              if (e.results[i].isFinal) transcript += e.results[i][0].transcript + " ";
              else interim += e.results[i][0].transcript;
            }
            var live = $("#tz-live"); if (live) live.textContent = (transcript + interim).trim();
          };
          recog.onend = function () { if (recog && recog._on) { try { recog.start(); } catch (e) {} } };   // 말이 끊겨도 계속 듣기
          recog._on = true; recog.start();
        } catch (e) { recog = null; }
      }
    };
    var stopCapture = function () {
      return new Promise(function (res) {
        if (recog) { recog._on = false; try { recog.stop(); } catch (e) {} }
        var text = (transcript + " " + interim).trim();
        if (rec && rec.state !== "inactive") {
          rec.onstop = function () { res({ text: text, url: chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type })) : null }); };
          rec.stop();
        } else res({ text: text, url: null });
      });
    };
    var analyze = function (text, secs) {
      var t = text.toLowerCase(), words = t.match(/[a-z']+/g) || [];
      var fill = 0;
      FILLERS.forEach(function (f) { var m = t.match(new RegExp("\\b" + f + "\\b", "g")); if (m) fill += m.length; });
      return { words: words.length, wpm: Math.round(words.length / (secs / 60)), fillers: fill };
    };

    /* ---------- 타이머 ---------- */
    var countdown = function (label, secs, kind) {
      return new Promise(function (res) {
        var bar = $("#tz-bar"), lab = $("#tz-label"), left = secs, t0 = performance.now();
        lab.textContent = label + "  " + fmt(left);
        bar.className = "tz-bar " + kind;
        clearInterval(timer);
        timer = setInterval(function () {
          if (aborted) { clearInterval(timer); res(false); return; }
          left = secs - (performance.now() - t0) / 1000;
          lab.textContent = label + "  " + fmt(left);
          bar.style.width = Math.max(0, (left / secs) * 100) + "%";
          if (left <= 0) { clearInterval(timer); res(true); }
        }, 100);
        $("#tz-skip").onclick = function () { t0 = performance.now() - secs * 1000; };
      });
    };

    /* ---------- 문항 하나 실행 ---------- */
    // item: { type, no, content(html), say(질문 음성), prep, resp, readFirst(초), twice }
    var runItem = function (item) {
      var tp = TYPES[item.type];
      body.innerHTML =
        '<div class="tz-head"><b>Question ' + item.no + ' of 11</b> · ' + tp.en + ' <span class="muted">(' + tp.name + ')</span></div>' +
        '<div class="tz-stage">' + item.content + '</div>' +
        '<div class="tz-timer"><div class="tz-bar-wrap"><div class="tz-bar" id="tz-bar"></div></div><div id="tz-label" class="tz-label">준비</div></div>' +
        '<div class="tz-live sunken" id="tz-live"></div>' +
        '<div class="row right"><button id="tz-skip">시간 건너뛰기 ⏭</button><button id="tz-stop">그만하기</button></div>';
      $("#tz-stop").onclick = function () { aborted = true; speechSynthesis && speechSynthesis.cancel(); };
      var p = Promise.resolve(true);
      if (item.readFirst) p = p.then(function () { return countdown("정보 읽기 READING TIME", item.readFirst, "prep"); });
      if (item.say) p = p.then(function (ok) {
        if (!ok) return false;
        $("#tz-label").textContent = "🔊 질문을 듣는 중...";
        return new Promise(function (r) {
          speak(item.say, function () {
            if (!item.twice || aborted) { r(!aborted); return; }
            speak(item.say, function () { r(!aborted); });
          });
        });
      });
      return p.then(function (ok) { return ok && countdown("준비 PREPARATION TIME", item.prep, "prep"); })
        .then(function (ok) {
          if (!ok) return null;
          beep();
          startCapture();
          return countdown("🎙️ 답변 RESPONSE TIME", item.resp, "resp").then(function () {
            beep();
            return stopCapture().then(function (r) {
              var a = analyze(r.text, item.resp);
              var res = { no: item.no, type: item.type, title: tp.name, q: item.say || "", text: r.text, url: r.url, resp: item.resp, words: a.words, wpm: a.wpm, fillers: a.fillers };
              var log = load();
              log.push({ d: dayKey(), type: item.type, words: a.words, wpm: a.wpm, fillers: a.fillers, text: r.text.slice(0, 400) });
              saveLog(log);
              return res;
            });
          });
        });
    };

    /* ---------- 문항 만들기 ---------- */
    var mk = {
      read: function (no) { return { type: "read", no: no, content: '<p class="tz-dir">' + TYPES.read.dir + '</p><div class="tz-passage">' + esc(pick(READ)) + "</div>", prep: 45, resp: 45 }; },
      picture: function (no) { var pc = pick(PICS); return { type: "picture", no: no, hint: pc.hint, content: '<p class="tz-dir">' + TYPES.picture.dir + '</p><img class="tz-pic" src="' + pc.src + '" alt="묘사할 사진">', prep: 45, resp: 30 }; },
      respondSet: function (startNo) {
        var s = pick(RESPOND);
        return s.q.map(function (q, i) {
          return { type: "respond", no: startNo + i, content: '<p class="tz-dir">' + esc(s.ctx) + '</p><div class="tz-q">' + esc(q) + "</div>", say: (i === 0 ? s.ctx + " " : "") + q, prep: 3, resp: i === 2 ? 30 : 15 };
        });
      },
      infoSet: function (startNo) {
        var s = pick(INFO);
        return s.q.map(function (q, i) {
          return { type: "info", no: startNo + i, content: '<div class="tz-info">' + s.table + '</div><div class="tz-q muted">(질문은 음성으로만 나옵니다)</div>',
            readFirst: i === 0 ? 45 : 0, say: (i === 0 ? s.intro + " " : "") + q, twice: i === 2, prep: 3, resp: i === 2 ? 30 : 15, qText: q };
        });
      },
      opinion: function (no) { var q = pick(OPINION); return { type: "opinion", no: no, content: '<p class="tz-dir">' + TYPES.opinion.dir + '</p><div class="tz-q">' + esc(q) + "</div>", say: q, prep: 45, resp: 60 }; }
    };
    var buildMock = function () {
      return [mk.read(1), mk.read(2), mk.picture(3), mk.picture(4)].concat(mk.respondSet(5), mk.infoSet(8), [mk.opinion(11)]);
    };
    var buildType = function (t) {
      if (t === "read") return [mk.read(1), mk.read(2)];
      if (t === "picture") return [mk.picture(3), mk.picture(4)];
      if (t === "respond") return mk.respondSet(5);
      if (t === "info") return mk.infoSet(8);
      return [mk.opinion(11)];
    };

    /* ---------- 실행 · 결과 ---------- */
    var run = function (items, label) {
      aborted = false;
      getMic().then(function (s) {
        if (!s) D.msg("마이크", "마이크를 쓸 수 없어 녹음 없이 진행합니다.\n(브라우저 주소창의 마이크 권한을 확인하세요)", "🎙️");
        var results = [], i = 0;
        var next = function () {
          if (aborted || i >= items.length) { review(results, label); return; }
          var it = items[i++];
          runItem(it).then(function (r) {
            if (r) { r.hint = it.hint; r.q = it.qText || r.q; results.push(r); }
            next();
          });
        };
        next();
      });
    };
    var review = function (results, label) {
      clearInterval(timer);
      if (!results.length) { showTab("home"); return; }
      var html = '<div class="tz-head"><b>' + esc(label) + ' 결과</b> · ' + results.length + '문항</div>';
      if (!SR) html += '<p class="muted">이 브라우저는 음성 인식을 지원하지 않아 말한 내용이 글자로 나오지 않습니다. Chrome이나 Edge를 쓰세요.</p>';
      results.forEach(function (r) {
        var short = r.wpm < 90 && r.type !== "read";
        html += '<fieldset class="tz-res"><legend>Q' + r.no + " · " + esc(r.title) + "</legend>" +
          (r.q ? '<p class="muted">' + esc(r.q) + "</p>" : "") +
          (r.url ? '<audio controls src="' + r.url + '"></audio>' : '<p class="muted">(녹음 없음)</p>') +
          '<div class="tz-stats"><span>단어 <b>' + r.words + "</b></span><span>분당 <b>" + r.wpm + "</b>단어</span><span>군말 <b>" + r.fillers + "</b>회</span>" +
          (short ? '<span class="warn">⚠️ 말이 적어요 (IH 이상은 분당 100단어 이상 권장)</span>' : "") + "</div>" +
          '<div class="tz-text sunken">' + (r.text ? esc(r.text) : '<span class="muted">(인식된 말이 없습니다)</span>') + "</div>" +
          (r.hint ? '<p class="muted">💡 묘사 포인트: ' + esc(r.hint) + "</p>" : "") +
          "</fieldset>";
      });
      html += '<fieldset><legend>스스로 점검 (IH~AL)</legend>' +
        ["답변 시간을 끝까지 채웠다", "3초 이상 멈춘 적이 없다", "이유와 구체적인 예시를 말했다", "접속사로 문장을 이어 말했다", "틀린 부분을 멈추지 않고 고쳐 말했다"].map(function (c, k) {
          return '<div class="field-row"><input type="checkbox" id="tz-c' + k + '"><label for="tz-c' + k + '">' + c + "</label></div>";
        }).join("") + "</fieldset>" +
        '<div class="row right" style="margin-top: 8px;"><button id="tz-again">같은 유형 다시</button><button id="tz-home">처음으로</button></div>';
      body.innerHTML = html;
      $("#tz-home").onclick = function () { showTab("home"); };
      $("#tz-again").onclick = function () { var t = results[0].type; run(label === "실전 모의고사" ? buildMock() : buildType(t), label); };
    };

    /* ---------- 탭 화면 ---------- */
    var homeHtml = function () {
      var left = daysLeft(), log = load(), today = dayKey();
      var days = {}; log.forEach(function (l) { days[l.d] = true; });
      var streak = 0, d = new Date();
      if (!days[today]) d.setDate(d.getDate() - 1);
      while (days[dayKey(d)]) { streak++; d.setDate(d.getDate() - 1); }
      var todayCnt = log.filter(function (l) { return l.d === today; }).length;
      var plan = [
        ["D-7", "진단 모의고사 1회 → 녹음 다시 듣고 약한 유형 체크"],
        ["D-6", "Q1-2 낭독(끊어 읽기·억양) + Q3-4 사진 묘사 틀 외우기"],
        ["D-5", "Q5-7: 15초·30초를 이유+예시로 꽉 채우기"],
        ["D-4", "Q8-10: 표 읽기, Q9 정정 문장, Q10 요약 연습"],
        ["D-3", "Q11: 만능 에피소드 3개를 입에 붙이기"],
        ["D-2", "실전 모의고사 1회 + 약점 유형 집중"],
        ["D-1", "가벼운 모의고사 + 표현 노트 소리 내어 복습 · 일찍 자기 (INTP 주의)"],
        ["D-day", "시험장 일찍 도착 · 낭독 지문 하나로 목 풀기"]
      ];
      var cur = left > 7 ? -1 : 7 - left;
      return '<div class="tz-dday"><div class="big">' + (left > 0 ? "D-" + left : left === 0 ? "D-DAY" : "시험 끝!") + '</div><div>토익 스피킹 · ' + EXAM_DATE.replace(/-/g, ".") + ' · 목표 <b>' + GOAL + '</b></div></div>' +
        '<div class="tz-stats" style="margin: 8px 0;"><span>오늘 푼 문항 <b>' + todayCnt + '</b></span><span>연속 <b>' + streak + '</b>일 🔥</span><span>전체 <b>' + log.length + '</b>문항</span></div>' +
        '<fieldset><legend>7일 완성 계획</legend><table class="tz-plan">' + plan.map(function (p, i) {
          return '<tr class="' + (i === cur ? "now" : i < cur ? "past" : "") + '"><td>' + p[0] + "</td><td>" + p[1] + "</td></tr>";
        }).join("") + "</table></fieldset>" +
        '<div class="tz-start"><button id="tz-mock">🎧 실전 모의고사 (11문항 · 약 20분)</button></div>' +
        '<fieldset><legend>유형별 연습</legend><div class="tz-types">' + Object.keys(TYPES).map(function (k) {
          return '<button data-type="' + k + '">' + TYPES[k].name + "</button>";
        }).join("") + "</div></fieldset>" +
        '<p class="muted">🎙️ 마이크 권한을 허용하면 답변이 녹음되고, Chrome·Edge에서는 말한 내용이 글자로 나옵니다. 녹음은 이 브라우저 밖으로 나가지 않습니다.</p>';
    };
    var notesHtml = function () {
      return NOTES.map(function (n) { return "<fieldset><legend>" + n.t + "</legend><ul class=\"tz-notes\">" + n.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></fieldset>"; }).join("");
    };
    var logHtml = function () {
      var log = load();
      if (!log.length) return '<p class="muted">아직 기록이 없습니다. 한 문항이라도 풀어 보세요.</p>';
      var by = {}; log.forEach(function (l) { (by[l.type] = by[l.type] || []).push(l); });
      var html = '<table class="tz-plan"><tr><th>유형</th><th>문항</th><th>평균 분당 단어</th><th>평균 군말</th></tr>';
      Object.keys(TYPES).forEach(function (k) {
        var a = by[k]; if (!a) return;
        var avg = function (f) { return Math.round(a.reduce(function (s, x) { return s + x[f]; }, 0) / a.length * 10) / 10; };
        html += "<tr><td>" + TYPES[k].name + "</td><td>" + a.length + "</td><td>" + avg("wpm") + "</td><td>" + avg("fillers") + "</td></tr>";
      });
      html += "</table><fieldset><legend>최근 답변</legend>" + log.slice(-8).reverse().map(function (l) {
        return '<p><b>' + l.d + " · " + TYPES[l.type].name + "</b> (" + l.words + "단어)<br><span class=\"muted\">" + esc(l.text || "(인식 없음)") + "</span></p>";
      }).join("") + '</fieldset><div class="row right"><button id="tz-clear">기록 지우기</button></div>';
      return html;
    };
    var showTab = function (name) {
      aborted = true; clearInterval(timer); if ("speechSynthesis" in window) speechSynthesis.cancel();
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t.dataset.tab === name ? "true" : "false"); });
      if (name === "home") {
        body.innerHTML = homeHtml();
        $("#tz-mock").onclick = function () { run(buildMock(), "실전 모의고사"); };
        $$("#toeic-body [data-type]").forEach(function (b) { b.onclick = function () { run(buildType(b.dataset.type), TYPES[b.dataset.type].name + " 연습"); }; });
      } else if (name === "notes") body.innerHTML = notesHtml();
      else {
        body.innerHTML = logHtml();
        var c = $("#tz-clear"); if (c) c.onclick = function () { saveLog([]); showTab("log"); };
      }
      body.scrollTop = 0;
    };
    tabs.forEach(function (t) { t.addEventListener("click", function (e) { e.preventDefault(); showTab(t.dataset.tab); }); });
    D.apps.toeic = function () { showTab("home"); };
    D.closers.toeic = function () {
      aborted = true; clearInterval(timer);
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      if (recog) { recog._on = false; try { recog.stop(); } catch (e) {} }
      if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }   // 마이크 끄기
    };
    window.DONG.toeicDaysLeft = daysLeft;
  });
})();
