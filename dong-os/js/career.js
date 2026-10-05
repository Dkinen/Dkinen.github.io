/* =========================================================
   DONG OS 98 — 면접 연습기 · 건설 시사 용어 사전 · 경험 정리 노트(STAR) · 지원 현황 보드
   녹음·메모·지원 현황은 이 브라우저에만 저장됩니다.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 면접 질문 (t: 답변 시간 초, tip: 답변 포인트, use: 쓸 만한 내 경험) ---------- */
  var INTERVIEW = {
    "인성": [
      { q: "1분 동안 자기소개를 해 주세요.", t: 60, tip: "이름 → 핵심 키워드 1개 → 그 키워드를 증명하는 경험 1~2개 → 회사에서 하고 싶은 일. 학력·자격증 나열은 짧게.", use: ["SOC-MAP", "CM 혁신상", "인턴"] },
      { q: "우리 회사에 지원한 동기는 무엇인가요?", t: 60, tip: "회사의 사업(최근 수주·기술·현장)과 나의 경험을 연결. '배우고 싶다'보다 '기여할 수 있다'로.", use: ["인턴", "CM 혁신상"] },
      { q: "본인의 장점과 단점을 말해 주세요.", t: 60, tip: "장점은 사례로 증명, 단점은 실제 단점 + 고치고 있는 방법. 직무에 치명적인 단점은 피하기.", use: ["학생회", "장기수선 연구"] },
      { q: "실패하거나 어려움을 겪은 경험과 극복 과정을 말해 주세요.", t: 90, tip: "STAR로: 상황 → 내 역할 → 구체적인 행동 → 결과와 배운 점. 남 탓 금지.", use: ["SOC-MAP", "장기수선 연구"] },
      { q: "팀원과 갈등이 있었던 경험과 해결 방법을 말해 주세요.", t: 90, tip: "갈등 원인을 객관적으로 → 내가 먼저 한 행동(대화·데이터·역할 조정) → 결과.", use: ["SOC-MAP", "CM 혁신상"] },
      { q: "리더십을 발휘한 경험이 있나요?", t: 90, tip: "직함보다 행동: 목표 설정, 역할 분배, 동기 부여, 결과.", use: ["학생회", "CM 혁신상"] },
      { q: "스트레스는 어떻게 관리하나요?", t: 45, tip: "구체적인 습관 + 업무에 미치는 긍정적 효과.", use: ["수영"] },
      { q: "입사 후 10년 뒤 어떤 모습이 되고 싶나요?", t: 60, tip: "단계별로: 현장 실무 숙련 → 공정·원가·안전 통합 관리 → 현장을 책임지는 관리자.", use: ["인턴"] },
      { q: "마지막으로 하고 싶은 말이 있나요?", t: 45, tip: "준비한 한 문장 + 면접에서 부족했던 답 보완. 길게 말하지 않기.", use: [] }
    ],
    "직무": [
      { q: "건설 현장관리자(시공관리)의 역할은 무엇이라고 생각하나요?", t: 60, tip: "공정·원가·품질·안전(+환경)을 조율해 계획대로 완공하는 사람. 인턴 때 본 장면 하나를 근거로.", use: ["인턴"] },
      { q: "공정·원가·품질·안전 중 가장 중요한 것은 무엇이고 왜인가요?", t: 60, tip: "대부분 '안전'이 정답에 가깝다. 안전이 무너지면 나머지도 무너진다는 논리 + 근거.", use: ["SOC-MAP", "산업안전기사"] },
      { q: "중대재해처벌법에 대해 아는 대로 말해 주세요.", t: 60, tip: "중대재해 발생 시 안전보건 확보 의무를 다하지 않은 경영책임자 처벌. 2022년 시행, 2024년 50인 미만 사업장까지 확대. 현장에서 할 일과 연결.", use: ["산업안전기사", "SOC-MAP"] },
      { q: "BIM이나 스마트 건설 기술을 현장에서 어떻게 활용할 수 있을까요?", t: 60, tip: "간섭 검토, 물량 산출, 공정 시뮬레이션, 디지털 트윈 안전관리 등 구체적 사례 1~2개.", use: ["SOC-MAP", "Revit"] },
      { q: "데이터센터 프로젝트에서 가장 어려웠던 점은 무엇인가요?", t: 90, tip: "초연약지반·냉각·공기 중 하나를 골라 문제 → 팀의 해결안 → 내 기여 → 결과(혁신상).", use: ["CM 혁신상"] },
      { q: "진행 중인 연구(장기수선 생존분석)를 비전공자도 이해하게 설명해 주세요.", t: 60, tip: "전구 비유: 아직 안 꺼진 전구도 '최소 이만큼 버텼다'로 계산에 넣는다 → 실제 교체 주기 추정 → 충당금 부족 진단.", use: ["장기수선 연구"] },
      { q: "공기가 지연되고 있다면 현장관리자로서 어떻게 대응하겠습니까?", t: 60, tip: "원인 파악(주공정선 확인) → 돌관·병렬 작업·자원 재배치 → 안전 저하 없는지 확인 → 보고·공유.", use: ["CM 혁신상"] },
      { q: "인턴 경험에서 배운 점은 무엇인가요?", t: 60, tip: "현장에서 직접 본 장면 1개 + 그래서 바뀐 생각 + 입사 후 적용.", use: ["인턴"] }
    ],
    "상황": [
      { q: "상사가 공기를 맞추기 위해 안전 절차를 생략하라고 지시하면 어떻게 하겠습니까?", t: 60, tip: "무조건 거부보다: 위험성 설명 → 안전을 지키면서 공기를 맞출 대안 제시 → 필요하면 상위 보고.", use: ["산업안전기사"] },
      { q: "비 예보가 있는 날 콘크리트 타설 일정이 잡혀 있다면?", t: 60, tip: "강우량·시점 확인 → 품질 위험(물-시멘트비 변화) 판단 → 일정 조정 또는 보양 대책 → 관계자 공유.", use: ["건축기사"] },
      { q: "지방 현장이나 해외 현장 근무도 가능한가요?", t: 30, tip: "가능하다면 짧고 확실하게 + 이유(현장 경험이 성장의 지름길).", use: [] },
      { q: "협력업체 소장과 의견이 맞지 않으면 어떻게 하겠습니까?", t: 60, tip: "상대 경험 존중 → 도면·시방서·데이터 근거로 대화 → 합의점 → 기록.", use: ["인턴", "SOC-MAP"] }
    ]
  };
  var FILLERS_KO = ["음", "어", "그니까", "약간", "뭔가", "이제", "막"];

  /* ---------- 건설 시사 용어 (면접 대비) ---------- */
  var TERMS = [
    { k: "BIM", d: "건물 정보를 3D 모델에 담아 설계·시공·유지관리까지 공유하는 방식. 간섭 검토, 물량 산출, 공정 시뮬레이션에 쓴다.", m: "Revit을 다룰 줄 알아 BIM 기반 간섭 검토에 바로 참여할 수 있습니다." },
    { k: "스마트 건설", d: "BIM, 드론, IoT 센서, 로봇, AI 등 디지털 기술로 건설 생산성과 안전을 높이는 흐름.", m: "SOC-MAP처럼 데이터로 위험을 미리 보는 기술이 스마트 건설의 핵심이라고 생각합니다." },
    { k: "디지털 트윈", d: "현실의 현장·건물을 가상 공간에 똑같이 만들어 실시간 데이터로 모니터링·시뮬레이션하는 기술.", m: "캡스톤에서 현장 위험도를 디지털 트윈으로 시각화해 본 경험이 있습니다." },
    { k: "OSC (탈현장 건설)", d: "부재·모듈을 공장에서 만들어 현장에서 조립하는 방식. 모듈러, PC가 대표적이다. 공기 단축·품질 균일·안전 향상.", m: "데이터센터 프로젝트에서 PC 모듈러 병렬 시공으로 공기 단축 계획을 세웠습니다." },
    { k: "모듈러 건축", d: "방 단위 박스(모듈)를 공장에서 70~80% 완성해 현장에서 쌓는 공법. 공기 단축과 인력난 대응에 유리하다.", m: "" },
    { k: "PC (프리캐스트 콘크리트)", d: "공장에서 미리 만든 콘크리트 부재를 현장에서 조립하는 방식. 품질 관리와 공기 단축에 유리하다.", m: "" },
    { k: "중대재해처벌법", d: "중대재해 발생 시 안전보건 확보 의무를 다하지 않은 경영책임자 등을 처벌하는 법. 2022년 1월 시행, 2024년 1월부터 50인 미만 사업장에도 적용.", m: "산업안전기사로서 서류보다 현장의 실질적인 위험 제거가 중요하다고 생각합니다." },
    { k: "위험성 평가", d: "산업안전보건법에 따라 사업장의 유해·위험 요인을 찾아 위험 정도를 평가하고 감소 대책을 세우는 절차.", m: "SOC-MAP의 장비별 위험 구역 점수화가 위험성 평가를 정량화한 시도였습니다." },
    { k: "TBM (Tool Box Meeting)", d: "작업 전 작업자들이 모여 그날 작업의 위험 요인과 안전 수칙을 공유하는 짧은 회의.", m: "" },
    { k: "무량판 구조 · 전단보강근", d: "보 없이 기둥이 슬래브를 직접 받치는 구조. 기둥 주변 뚫림 전단을 막는 전단보강근이 핵심이며, 2023년 아파트 지하주차장 붕괴·철근 누락 문제로 사회적 이슈가 됐다.", m: "설계대로 시공됐는지 확인하는 품질관리와 감리의 중요성을 보여 준 사례라고 생각합니다." },
    { k: "CM (건설사업관리)", d: "발주자를 대신해 기획·설계·시공·유지관리 전 단계에서 공정·원가·품질·안전을 관리하는 서비스.", m: "전국대학생 CM 경진대회에서 전 주기 CM 계획으로 혁신상을 받았습니다." },
    { k: "CM at Risk", d: "CM 사업자가 시공 위험까지 부담하고 공사비 상한(GMP) 안에서 책임지는 방식.", m: "" },
    { k: "턴키 (설계·시공 일괄)", d: "한 사업자가 설계와 시공을 함께 맡는 발주 방식. 책임이 일원화되고 공기 단축에 유리하다.", m: "" },
    { k: "VE (가치공학)", d: "기능은 유지·향상하면서 비용을 줄이는 기법. V = F / C.", m: "" },
    { k: "PF (프로젝트 파이낸싱)", d: "사업의 미래 수익을 담보로 자금을 조달하는 방식. 부동산 경기 악화 시 PF 부실이 건설사 위기로 번질 수 있다.", m: "데이터센터 프로젝트에서 장기 선임대로 PF 조달 근거를 마련하는 구조를 공부했습니다." },
    { k: "공사비 상승", d: "원자재(철근·시멘트)·인건비 상승으로 공사비가 크게 오른 현상. 공사비 분쟁, 사업 지연의 원인이 된다.", m: "" },
    { k: "ESG 경영", d: "환경(Environment)·사회(Social)·지배구조(Governance)를 고려하는 경영. 건설업은 탄소 감축과 안전이 핵심.", m: "" },
    { k: "탄소중립 · 제로에너지건축물(ZEB)", d: "에너지 소비를 줄이고 신재생에너지로 채워 에너지 자립도를 높인 건축물. 인증 의무화가 공공부문부터 단계적으로 확대되고 있다.", m: "" },
    { k: "리모델링 vs 재건축", d: "리모델링은 기존 골조를 살려 증축·개선, 재건축은 철거 후 새로 짓는 것. 안전진단·용적률·사업성이 판단 기준.", m: "장기수선 연구를 하며 '고칠까 부술까'의 판단 근거에 관심을 갖게 됐습니다." },
    { k: "노후계획도시 특별법", d: "1기 신도시 등 노후 계획도시의 재건축·정비를 지원하는 특별법. 2024년 4월 시행.", m: "" },
    { k: "장기수선계획 · 장기수선충당금", d: "공동주택 주요 시설의 교체·보수 시기와 비용 계획, 그리고 이를 위해 관리비로 적립하는 돈.", m: "법령 수선주기를 실제 데이터로 검증하는 연구를 진행 중입니다." },
    { k: "하이퍼스케일 데이터센터", d: "수만 대 이상의 서버를 운영하는 초대형 데이터센터. AI 수요로 급증하며 전력·냉각이 핵심 과제다.", m: "300MW급 AI 데이터센터 CM 계획을 수립해 본 경험이 있습니다." },
    { k: "PUE (전력효율지수)", d: "데이터센터 총 전력 ÷ IT 장비 전력. 1에 가까울수록 효율적이다.", m: "LNG 냉열과 해수 냉각으로 목표 PUE 1.1 이하를 계획했습니다." },
    { k: "주공정선 (Critical Path)", d: "공정표에서 여유가 없는 가장 긴 경로. 이 작업이 늦으면 전체 공기가 늦어진다.", m: "" },
    { k: "하자담보책임", d: "준공 후 일정 기간 시공 결함을 보수할 책임. 공종별로 기간이 다르다.", m: "" }
  ];

  /* ---------- 경험 정리 노트 기본값 (확인된 사실만, 나머지는 직접 채우기) ---------- */
  var STAR_DEFAULT = [
    { id: "intern", title: "🏗️ 제일건설 현장관리 인턴", when: "2026.01 – 02", tags: "현장 이해 · 직무 경험 · 지원동기",
      S: "2026년 겨울, 제일건설 건설 현장에서 현장관리 인턴으로 근무", T: "", A: "", R: "" },
    { id: "socmap", title: "🦺 SOC-MAP (캡스톤 디자인 1)", when: "2026.03 – 07 · 3인", tags: "협업 · 문제해결 · 안전 · 기술 활용",
      S: "건설장비 사고가 구두 중심 소통과 위험구역 인지 부족에서 자주 발생", T: "장비 위치와 작업 가변성을 반영한 실시간 위험도 평가·안전 경로 안내 플랫폼 개발", A: "", R: "KOSHA 지침 기반 5종 장비 위험 구역 정량화, 장비 배치·3D 모델링·안전 경로 추천 기능 완성" },
    { id: "cm", title: "🏆 CM·시공 경진대회 혁신상", when: "2026.07 – 08 · 4인", tags: "팀워크 · 창의성 · 리더십 · CM",
      S: "제11회 전국대학생 CM·시공 경진대회 CM 부문 참가 (팀 잼민아이)", T: "광양 동호안 300MW급 LNG 냉열 데이터센터의 전 주기 CM 계획 수립", A: "", R: "LNG 냉열·해수 냉각(목표 PUE 1.1), 제강슬래그 지반 개량, 3-Track 병렬 시공 제안 → 혁신상 수상" },
    { id: "cost", title: "🥇 원가관리 경진대회 최우수상", when: "2025", tags: "분석력 · 원가 · 성과",
      S: "한국건설관리학회 전국대학생 학술발표대회 경진대회 부문(원가관리) 참가", T: "", A: "", R: "최우수상 수상" },
    { id: "research", title: "📈 장기수선 생존분석 연구", when: "2026.09 – 진행 중 · 개인", tags: "주도성 · 데이터 분석 · 끈기",
      S: "공동주택 장기수선계획이 법령 수선주기를 그대로 쓰지만 실제와 맞는지 검증된 적이 거의 없음", T: "전국 유지관리 이력으로 부위별 실제 교체 주기를 추정하고 법령과 비교", A: "공공데이터 API로 전국 1만 3천여 단지 이력 수집 → 공사종별 매핑·전면교체 판정 규칙 작성 → Python으로 Kaplan–Meier 생존분석", R: "중간 분석: 승강기 기계장치 추정 중위 교체 시점 약 22년 (법령 15년)" },
    { id: "council", title: "🙋 학생회 운영부장", when: "2026", tags: "리더십 · 조직 운영 · 소통",
      S: "", T: "", A: "", R: "" }
  ];
  var PROMPT = { S: "상황: 언제, 어디서, 어떤 문제가 있었나?", T: "과제: 내가 맡은 역할과 목표는?", A: "행동: 내가 구체적으로 한 일은? (가장 중요! 숫자·도구·방법)", R: "결과: 무엇이 바뀌었나? 배운 점은?" };

  /* ---------- 지원 현황 보드 ---------- */
  var COLS = [["want", "⭐ 관심"], ["doc", "📄 서류"], ["test", "📝 인적성·필기"], ["itv", "🎤 면접"], ["pass", "🎉 최종 합격"], ["fail", "🗂️ 불합격"]];

  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var load = function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  var save = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var today = function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var dleft = function (s) { return Math.round((new Date(s + "T00:00:00") - new Date(today() + "T00:00:00")) / 86400000); };

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.DONG, $ = D.$, $$ = D.$$;

    /* =========================== 면접 연습기 =========================== */
    (function () {
      var body = $("#interview-body"), stream = null, rec = null, chunks = [], recog = null, text = "", interim = "", timer = null, aborted = false;
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      var getMic = function () {
        if (stream || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.resolve(stream);
        var ask = navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) { stream = s; return s; }).catch(function () { return null; });
        return Promise.race([ask, new Promise(function (r) { setTimeout(function () { r(null); }, 8000); })]);
      };
      var home = function () {
        clearInterval(timer); aborted = true;
        var hist = load("dongos-interview-hist", []);
        body.innerHTML = '<div class="cbt-title">🎤 면접 연습기 · 대기업·공기업 인성/직무/상황 면접</div>' +
          '<fieldset><legend>연습 방식</legend><div class="cbt-menu">' +
          '<button data-m="random">🎲 랜덤 질문 5개<br><small>인성·직무·상황 섞기</small></button>' +
          '<button data-m="intro">⏱️ 1분 자기소개<br><small>가장 많이 나오는 질문</small></button></div>' +
          '<div class="cbt-subs">' + Object.keys(INTERVIEW).map(function (c) { return '<button data-c="' + c + '">' + c + " 면접 <small>(" + INTERVIEW[c].length + ")</small></button>"; }).join("") + "</div></fieldset>" +
          '<fieldset><legend>최근 연습</legend>' + (hist.length ? hist.slice(-6).reverse().map(function (h) {
            return "<p><b>" + esc(h.d) + "</b> " + esc(h.q) + '<br><span class="muted">' + h.secs + "초 · 군말 " + h.fill + "회 · " + esc((h.text || "(인식 없음)").slice(0, 80)) + "</span></p>";
          }).join("") : '<p class="muted">아직 기록이 없습니다.</p>') + "</fieldset>" +
          '<p class="muted">🎙️ 마이크를 허용하면 답변이 녹음되고, Chrome·Edge에서는 말한 내용이 글자로 나옵니다. 질문마다 생각할 시간 10초가 주어집니다. 경험 정리 노트를 먼저 채우면 답이 훨씬 쉬워집니다.</p>';
        body.querySelector('[data-m="random"]').onclick = function () {
          var all = []; Object.keys(INTERVIEW).forEach(function (c) { INTERVIEW[c].forEach(function (q) { all.push(q); }); });
          run(all.sort(function () { return Math.random() - 0.5; }).slice(0, 5));
        };
        body.querySelector('[data-m="intro"]').onclick = function () { run([INTERVIEW["인성"][0]]); };
        $$("#interview-body [data-c]").forEach(function (b) { b.onclick = function () { run(INTERVIEW[b.dataset.c].slice().sort(function () { return Math.random() - 0.5; })); }; });
      };
      var count = function (label, secs, cls) {
        return new Promise(function (res) {
          var t0 = performance.now();
          clearInterval(timer);
          timer = setInterval(function () {
            if (aborted) { clearInterval(timer); res(false); return; }
            var left = secs - (performance.now() - t0) / 1000;
            var lab = $("#iv-label"), bar = $("#iv-bar");
            if (lab) lab.textContent = label + " " + Math.max(0, Math.ceil(left)) + "초";
            if (bar) { bar.className = "tz-bar " + cls; bar.style.width = Math.max(0, left / secs * 100) + "%"; }
            if (left <= 0) { clearInterval(timer); res(true); }
          }, 100);
          var sk = $("#iv-skip"); if (sk) sk.onclick = function () { t0 = performance.now() - secs * 1000; };
        });
      };
      var startRec = function () {
        text = ""; interim = ""; chunks = [];
        if (stream && window.MediaRecorder) { try { rec = new MediaRecorder(stream); rec.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); }; rec.start(); } catch (e) { rec = null; } }
        if (SR) {
          try {
            recog = new SR(); recog.lang = "ko-KR"; recog.continuous = true; recog.interimResults = true;
            recog.onresult = function (e) { interim = ""; for (var i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) text += e.results[i][0].transcript + " "; else interim += e.results[i][0].transcript; } var l = $("#iv-live"); if (l) l.textContent = (text + interim).trim(); };
            recog.onend = function () { if (recog && recog._on) { try { recog.start(); } catch (e) {} } };
            recog._on = true; recog.start();
          } catch (e) { recog = null; }
        }
      };
      var stopRec = function () {
        return new Promise(function (res) {
          if (recog) { recog._on = false; try { recog.stop(); } catch (e) {} }
          var t = (text + " " + interim).trim();
          if (rec && rec.state !== "inactive") { rec.onstop = function () { res({ text: t, url: chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type })) : null }); }; rec.stop(); }
          else res({ text: t, url: null });
        });
      };
      var run = function (qs) {
        aborted = false;
        body.innerHTML = '<div class="cbt-title">준비 중</div><p>🎙️ 마이크 권한을 확인하고 있습니다. 브라우저 창에서 <b>허용</b>을 눌러 주세요. (8초 뒤 녹음 없이 시작)</p>';
        getMic().then(function () {
          var results = [], k = 0;
          var next = function () {
            if (aborted || k >= qs.length) { review(results); return; }
            var it = qs[k++];
            body.innerHTML = '<div class="cbt-bar"><span>면접관 질문 ' + k + " / " + qs.length + '</span><span>답변 ' + it.t + '초</span></div>' +
              '<div class="iv-q"><span class="e">🧑‍💼</span> "' + esc(it.q) + '"</div>' +
              '<details class="iv-tip"><summary>💡 답변 포인트 보기 (실전처럼 하려면 열지 마세요)</summary><p>' + esc(it.tip) + "</p>" + (it.use.length ? "<p>쓸 만한 내 경험: <b>" + it.use.map(esc).join(", ") + "</b></p>" : "") + "</details>" +
              '<div class="tz-timer"><div class="tz-bar-wrap"><div class="tz-bar" id="iv-bar"></div></div><div id="iv-label" class="tz-label">생각할 시간</div></div>' +
              '<div class="tz-live sunken" id="iv-live"></div><div class="row right"><button id="iv-skip">⏭ 건너뛰기</button><button id="iv-stop">그만하기</button></div>';
            $("#iv-stop").onclick = function () { aborted = true; };
            count("💭 생각할 시간", 10, "prep").then(function (ok) {
              if (!ok) { next(); return; }
              startRec();
              var t0 = performance.now();
              count("🎙️ 답변 중", it.t, "resp").then(function () {
                var secs = Math.round((performance.now() - t0) / 1000);
                stopRec().then(function (r) {
                  var fill = 0;
                  (r.text.split(/\s+/)).forEach(function (w) { if (FILLERS_KO.indexOf(w.replace(/[.,!?]/g, "")) !== -1) fill++; });
                  var res = { q: it.q, t: it.t, secs: secs, text: r.text, url: r.url, fill: fill, chars: r.text.replace(/\s/g, "").length, tip: it.tip };
                  results.push(res);
                  var h = load("dongos-interview-hist", []);
                  var d = new Date();
                  h.push({ d: (d.getMonth() + 1) + "/" + d.getDate(), q: it.q, secs: secs, fill: fill, text: r.text.slice(0, 300) });
                  save("dongos-interview-hist", h.slice(-100));
                  next();
                });
              });
            });
          };
          next();
        });
      };
      var review = function (results) {
        clearInterval(timer);
        if (!results.length) { home(); return; }
        body.innerHTML = '<div class="cbt-title">면접 연습 결과 · ' + results.length + "문항</div>" + (SR ? "" : '<p class="muted">이 브라우저는 음성 인식을 지원하지 않아 글자 변환이 없습니다. Chrome이나 Edge를 쓰세요.</p>') +
          results.map(function (r, i) {
            var cps = r.secs ? Math.round(r.chars / r.secs * 60) : 0;
            var warn = [];
            if (r.secs < r.t * 0.6) warn.push("답변이 짧아요 (권장 " + r.t + "초의 60% 이상)");
            if (cps && cps < 250) warn.push("말이 느리거나 멈춤이 많아요");
            if (cps > 450) warn.push("말이 빨라요. 천천히, 또박또박");
            if (r.fill >= 3) warn.push("군말(음·어·약간 등) " + r.fill + "회");
            return '<fieldset class="tz-res"><legend>Q' + (i + 1) + "</legend><p><b>" + esc(r.q) + "</b></p>" +
              (r.url ? '<audio controls src="' + r.url + '"></audio>' : '<p class="muted">(녹음 없음)</p>') +
              '<div class="tz-stats"><span>답변 <b>' + r.secs + "</b>초</span><span>분당 <b>" + cps + "</b>자</span><span>군말 <b>" + r.fill + "</b>회</span></div>" +
              (warn.length ? '<p class="warn">⚠️ ' + warn.join(" · ") + "</p>" : '<p style="color:#2a8a2a">👍 길이·속도 좋아요</p>') +
              '<div class="tz-text sunken">' + (r.text ? esc(r.text) : '<span class="muted">(인식된 말이 없습니다)</span>') + "</div>" +
              '<p class="muted">💡 ' + esc(r.tip) + "</p></fieldset>";
          }).join("") +
          '<fieldset><legend>스스로 점검</legend>' + ["결론부터 말했다", "구체적인 경험(숫자·행동)을 넣었다", "회사·직무와 연결했다", "말끝을 흐리지 않았다", "시선과 표정을 신경 썼다 (거울·카메라로 확인)"].map(function (c, k) {
            return '<div class="field-row"><input type="checkbox" id="iv-c' + k + '"><label for="iv-c' + k + '">' + c + "</label></div>";
          }).join("") + '</fieldset><div class="row right"><button id="iv-home">처음으로</button></div>';
        $("#iv-home").onclick = home;
        body.scrollTop = 0;
      };
      D.apps.interview = home;
      D.closers.interview = function () {
        aborted = true; clearInterval(timer);
        if (recog) { recog._on = false; try { recog.stop(); } catch (e) {} }
        if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
      };
    })();

    /* =========================== 건설 시사 용어 사전 =========================== */
    (function () {
      var body = $("#terms-body"), mode = "list", idx = 0, flipped = false;
      var known = function () { return load("dongos-terms-known", []); };
      var render = function () {
        var kn = known(), q = ($("#terms-q") && $("#terms-q").value || "").trim();
        if (mode === "list") {
          var list = TERMS.filter(function (t) { return !q || (t.k + t.d).indexOf(q) !== -1; });
          body.innerHTML = '<div class="cbt-title">📖 건설 시사 용어 사전 · ' + kn.length + " / " + TERMS.length + " 외움</div>" +
            '<div class="row" style="margin-bottom: 8px; flex-wrap: nowrap;"><input type="text" id="terms-q" placeholder="검색 (예: 안전, BIM)" value="' + esc(q) + '" style="flex: 1;"><button id="terms-card">🃏 카드로 외우기</button></div>' +
            list.map(function (t) {
              var i = TERMS.indexOf(t), k = kn.indexOf(i) !== -1;
              return '<div class="term' + (k ? " known" : "") + '"><div class="term-k">' + (k ? "✅ " : "") + esc(t.k) + '</div><div>' + esc(t.d) + "</div>" + (t.m ? '<div class="term-m">🎤 면접 한 줄: ' + esc(t.m) + "</div>" : "") +
                '<button class="term-toggle" data-i="' + i + '">' + (k ? "다시 외우기" : "외웠어요") + "</button></div>";
            }).join("") + (list.length ? "" : '<p class="muted">검색 결과가 없습니다.</p>') +
            '<p class="muted">용어 설명은 면접 대비용 요약입니다. 수치·시행일 등은 최신 뉴스로 한 번 더 확인하세요.</p>';
          var inp = $("#terms-q"); inp.oninput = function () { var pos = inp.selectionStart; render(); var n = $("#terms-q"); n.focus(); n.setSelectionRange(pos, pos); };
          $("#terms-card").onclick = function () { mode = "card"; idx = 0; flipped = false; render(); };
          $$("#terms-body .term-toggle").forEach(function (b) { b.onclick = function () { var l = known(), i = +b.dataset.i, p = l.indexOf(i); if (p === -1) l.push(i); else l.splice(p, 1); save("dongos-terms-known", l); render(); }; });
        } else {
          var pool = TERMS.map(function (_, i) { return i; }).filter(function (i) { return kn.indexOf(i) === -1; });
          if (!pool.length) { body.innerHTML = '<div class="cbt-title">🃏 카드 외우기</div><p>🎉 모든 용어를 외웠습니다!</p><div class="row"><button id="terms-back">목록으로</button></div>'; $("#terms-back").onclick = function () { mode = "list"; render(); }; return; }
          var t = TERMS[pool[idx % pool.length]];
          body.innerHTML = '<div class="cbt-title">🃏 카드 외우기 · 남은 ' + pool.length + "개</div>" +
            '<div class="flash" id="flash">' + (flipped ? "<div>" + esc(t.d) + "</div>" + (t.m ? '<div class="term-m">🎤 ' + esc(t.m) + "</div>" : "") : '<div class="flash-k">' + esc(t.k) + '</div><div class="muted">눌러서 뜻 보기 · 먼저 소리 내어 설명해 보세요</div>') + "</div>" +
            '<div class="row" style="justify-content: center; margin-top: 8px;"><button id="f-next">모르겠어요 (다음)</button><button id="f-know">✅ 알아요</button><button id="terms-back">목록으로</button></div>';
          $("#flash").onclick = function () { flipped = !flipped; render(); };
          $("#f-next").onclick = function () { idx++; flipped = false; render(); };
          $("#f-know").onclick = function () { var l = known(); l.push(pool[idx % pool.length]); save("dongos-terms-known", l); flipped = false; render(); };
          $("#terms-back").onclick = function () { mode = "list"; render(); };
        }
      };
      D.apps.terms = function () { mode = "list"; render(); };
    })();

    /* =========================== 경험 정리 노트 (STAR) =========================== */
    (function () {
      var body = $("#star-body");
      var get = function () { return load("dongos-star", null) || JSON.parse(JSON.stringify(STAR_DEFAULT)); };
      var render = function () {
        var notes = get();
        body.innerHTML = '<div class="cbt-title">🗂️ 경험 정리 노트 · STAR (자소서·면접 소재)</div>' +
          '<p class="muted" style="margin-top: 0;">확인된 사실만 미리 채워 두었습니다. 빈 칸(특히 <b>A: 내가 한 행동</b>)을 직접 채우면 면접 답변이 됩니다. 입력하면 자동 저장되며, 이 브라우저에만 남습니다.</p>' +
          notes.map(function (n, i) {
            return '<fieldset class="star"><legend>' + esc(n.title) + ' <small class="muted">' + esc(n.when) + '</small></legend><div class="star-tags">🏷️ ' + esc(n.tags) + "</div>" +
              ["S", "T", "A", "R"].map(function (f) {
                return '<label class="star-row"><b>' + f + '</b><textarea data-i="' + i + '" data-f="' + f + '" placeholder="' + esc(PROMPT[f]) + '">' + esc(n[f]) + "</textarea></label>";
              }).join("") + "</fieldset>";
          }).join("") +
          '<div class="row right"><button id="star-copy">📋 전체 복사 (자소서용)</button><button id="star-reset">기본값으로 되돌리기</button></div><span id="star-msg" class="muted"></span>';
        $$("#star-body textarea").forEach(function (ta) {
          ta.oninput = function () { var l = get(); l[+ta.dataset.i][ta.dataset.f] = ta.value; save("dongos-star", l); $("#star-msg").textContent = "저장됨 ✓"; };
        });
        $("#star-copy").onclick = function () {
          var txt = get().map(function (n) { return "■ " + n.title + " (" + n.when + ")\nS: " + n.S + "\nT: " + n.T + "\nA: " + n.A + "\nR: " + n.R; }).join("\n\n");
          var done = function () { $("#star-msg").textContent = "클립보드에 복사했습니다 ✓"; };
          if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { D.msg("복사", txt.slice(0, 400) + "...", "📋"); });
        };
        $("#star-reset").onclick = function () { save("dongos-star", null); try { localStorage.removeItem("dongos-star"); } catch (e) {} render(); };
      };
      D.apps.star = render;
    })();

    /* =========================== 지원 현황 보드 =========================== */
    (function () {
      var body = $("#apply-body");
      var get = function () { return load("dongos-apply", []); };
      var put = function (l) { save("dongos-apply", l); };
      var render = function () {
        var list = get();
        var upcoming = list.filter(function (c) { return c.due && c.col !== "pass" && c.col !== "fail" && dleft(c.due) >= 0; }).sort(function (a, b) { return a.due < b.due ? -1 : 1; }).slice(0, 4);
        body.innerHTML = '<div class="cbt-title">📋 지원 현황 보드 · ' + list.length + "곳</div>" +
          '<fieldset><legend>회사 추가</legend><div class="row"><input type="text" id="ap-co" placeholder="회사 (예: ○○건설)" style="flex: 1 1 140px;"><input type="text" id="ap-job" placeholder="직무 (예: 건축 시공)" style="flex: 1 1 120px;"><label>마감</label><input type="date" id="ap-due"><button id="ap-add">추가</button></div></fieldset>' +
          (upcoming.length ? '<div class="ap-due">⏰ 다가오는 마감: ' + upcoming.map(function (c) { var n = dleft(c.due); return "<b>" + esc(c.co) + "</b> " + (n === 0 ? "D-DAY" : "D-" + n); }).join(" · ") + "</div>" : "") +
          '<div class="kanban">' + COLS.map(function (col) {
            var cards = list.filter(function (c) { return c.col === col[0]; });
            return '<div class="kcol" data-col="' + col[0] + '"><div class="khead">' + col[1] + " <small>(" + cards.length + ")</small></div>" +
              cards.map(function (c) {
                var n = c.due ? dleft(c.due) : null;
                return '<div class="kcard" draggable="true" data-id="' + c.id + '"><b>' + esc(c.co) + "</b><div>" + esc(c.job) + "</div>" +
                  (c.due ? '<div class="kdue' + (n !== null && n <= 3 && n >= 0 ? " soon" : "") + '">마감 ' + c.due.slice(5).replace("-", "/") + (n !== null && n >= 0 ? " · D-" + n : "") + "</div>" : "") +
                  (c.memo ? '<div class="kmemo">' + esc(c.memo) + "</div>" : "") +
                  '<div class="kbtns"><button data-mv="-1" title="이전 단계">◀</button><button data-memo title="메모">📝</button><button data-del title="삭제">✕</button><button data-mv="1" title="다음 단계">▶</button></div></div>';
              }).join("") + "</div>";
          }).join("") + "</div>" +
          '<p class="muted">카드를 끌어서 옮기거나 ◀ ▶로 단계를 바꾸세요. 이 브라우저에만 저장됩니다 (다른 기기와 공유되지 않음).</p>' +
          '<div class="row right"><button id="ap-export">💾 백업 파일 받기</button><label class="ap-import"><input type="file" id="ap-file" accept=".json" hidden>📂 백업 불러오기</label></div>';
        $("#ap-add").onclick = function () {
          var co = $("#ap-co").value.trim(); if (!co) { D.msg("지원 현황", "회사 이름을 넣어 주세요.", "📋"); return; }
          var l = get(); l.push({ id: String(Date.now()), co: co, job: $("#ap-job").value.trim(), due: $("#ap-due").value, col: "want", memo: "" }); put(l); render();
        };
        var find = function (el) { return el.closest(".kcard").dataset.id; };
        var update = function (id, fn) { var l = get(); var c = l.filter(function (x) { return x.id === id; })[0]; if (c) { fn(c, l); put(l); render(); } };
        $$("#apply-body [data-mv]").forEach(function (b) { b.onclick = function () { update(find(b), function (c) { var i = COLS.map(function (x) { return x[0]; }).indexOf(c.col) + (+b.dataset.mv); if (i >= 0 && i < COLS.length) c.col = COLS[i][0]; }); }; });
        $$("#apply-body [data-del]").forEach(function (b) { b.onclick = function () { var id = find(b); put(get().filter(function (x) { return x.id !== id; })); render(); }; });
        $$("#apply-body [data-memo]").forEach(function (b) {
          b.onclick = function () {
            var card = b.closest(".kcard"), id = card.dataset.id, c = get().filter(function (x) { return x.id === id; })[0];
            if (card.querySelector("textarea")) return;
            var ta = document.createElement("textarea"); ta.className = "kmemo-edit"; ta.value = c.memo || ""; ta.placeholder = "메모 (전형 일정, 준비할 것)";
            var ok = document.createElement("button"); ok.textContent = "저장";
            ok.onclick = function () { update(id, function (x) { x.memo = ta.value; }); };
            card.appendChild(ta); card.appendChild(ok); ta.focus();
          };
        });
        $$("#apply-body .kcard").forEach(function (c) { c.ondragstart = function (e) { e.dataTransfer.setData("text/plain", c.dataset.id); }; });
        $$("#apply-body .kcol").forEach(function (col) {
          col.ondragover = function (e) { e.preventDefault(); col.classList.add("over"); };
          col.ondragleave = function () { col.classList.remove("over"); };
          col.ondrop = function (e) { e.preventDefault(); var id = e.dataTransfer.getData("text/plain"); update(id, function (c) { c.col = col.dataset.col; }); };
        });
        $("#ap-export").onclick = function () {
          var a = document.createElement("a");
          a.href = URL.createObjectURL(new Blob([JSON.stringify(get(), null, 2)], { type: "application/json" }));
          a.download = "지원현황_" + today() + ".json"; document.body.appendChild(a); a.click(); a.remove();
        };
        $("#ap-file").onchange = function (e) {
          var f = e.target.files[0]; if (!f) return;
          f.text().then(function (t) { try { var l = JSON.parse(t); if (Array.isArray(l)) { put(l); render(); } } catch (err) { D.msg("불러오기", "백업 파일 형식이 아닙니다.", "📂"); } });
        };
      };
      D.apps.apply = render;
    })();
  });
})();
