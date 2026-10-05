/* =========================================================
   DONG OS 98 — 공부 앱: 전공 필기 CBT · 전공 실기 · NCS
   기록·오답노트는 이 브라우저에만 저장됩니다.
   ========================================================= */
(function () {
  "use strict";

  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }).replace(/\n/g, "<br>"); };
  var load = function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  var save = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var mmss = function (s) { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };

  /* =====================================================
     CBT 엔진 (필기 · NCS 공용)
     cfg: { id, bank, key, title, perQ(초), pass(fn), passText }
     ===================================================== */
  function makeCBT(cfg) {
    var D = window.DONG, $ = D.$;
    var body = $("#" + cfg.id + "-body"), timer = null;
    var all = function () {
      var out = [];
      Object.keys(cfg.bank).forEach(function (s) { cfg.bank[s].forEach(function (q, i) { out.push({ s: s, i: i, id: s + "#" + i, q: q }); }); });
      return out;
    };
    var wrongKey = "dongos-" + cfg.key + "-wrong", histKey = "dongos-" + cfg.key + "-hist";
    // 빠른 모의고사: 과목마다 같은 수만큼 골라 약 20문항
    var per = function () { return Math.max(1, Math.ceil(20 / Object.keys(cfg.bank).length)); };
    var quickCount = function () { return Object.keys(cfg.bank).reduce(function (n, s) { return n + Math.min(per(), cfg.bank[s].length); }, 0); };
    var quickSet = function () {
      var out = [];
      Object.keys(cfg.bank).forEach(function (s) { out = out.concat(shuffle(all().filter(function (x) { return x.s === s; })).slice(0, per())); });
      return out;
    };

    var home = function () {
      clearInterval(timer);
      var wrong = load(wrongKey, []), hist = load(histKey, []);
      var subs = Object.keys(cfg.bank);
      var last = hist.slice(-5).reverse();
      body.innerHTML =
        '<div class="cbt-title">' + cfg.title + '</div>' +
        '<fieldset><legend>시험 보기</legend>' +
        '<div class="cbt-menu"><button data-m="all">📝 전 과목 모의고사<br><small>' + all().length + '문항 · ' + Math.round(all().length * cfg.perQ / 60) + '분</small></button>' +
        (all().length > 30 ? '<button data-m="quick">⚡ 빠른 모의고사<br><small>과목별 고르게 ' + quickCount() + '문항 · ' + Math.round(quickCount() * cfg.perQ / 60) + '분</small></button>' : "") +
        '<button data-m="wrong"' + (wrong.length ? "" : " disabled") + '>❌ 오답노트 다시 풀기<br><small>' + wrong.length + '문항</small></button></div>' +
        '<div class="cbt-subs">' + subs.map(function (s) { return '<button data-s="' + esc(s) + '">' + esc(s) + ' <small>(' + cfg.bank[s].length + ')</small></button>'; }).join("") + '</div></fieldset>' +
        '<fieldset><legend>최근 기록</legend>' + (last.length ? '<table class="tz-plan"><tr><th>날짜</th><th>구분</th><th>점수</th><th>결과</th></tr>' + last.map(function (h) {
          return "<tr><td>" + h.d + "</td><td>" + esc(h.mode) + "</td><td>" + h.score + "점</td><td>" + esc(h.res) + "</td></tr>";
        }).join("") + "</table>" : '<p class="muted">아직 기록이 없습니다.</p>') + "</fieldset>" +
        '<p class="muted">' + cfg.passText + '</p>';
      body.querySelector('[data-m="all"]').onclick = function () { start(shuffle(all()), "전 과목 모의고사"); };
      var qb = body.querySelector('[data-m="quick"]');
      if (qb) qb.onclick = function () { start(shuffle(quickSet()), "빠른 모의고사"); };
      body.querySelector('[data-m="wrong"]').onclick = function () {
        var ids = load(wrongKey, []);
        start(shuffle(all().filter(function (x) { return ids.indexOf(x.id) !== -1; })), "오답노트");
      };
      Array.prototype.forEach.call(body.querySelectorAll("[data-s]"), function (b) {
        b.onclick = function () { start(shuffle(all().filter(function (x) { return x.s === b.dataset.s; })), b.dataset.s); };
      });
    };

    var start = function (qs, mode) {
      if (!qs.length) return;
      var st = { qs: qs.map(function (x) { var order = shuffle([0, 1, 2, 3]); return { x: x, order: order, pick: null }; }), i: 0, mode: mode, left: qs.length * cfg.perQ };
      var render = function () {
        var it = st.qs[st.i], q = it.x.q;
        body.innerHTML =
          '<div class="cbt-bar"><span>' + esc(st.mode) + ' · <b>' + esc(it.x.s) + '</b></span><span>문제 ' + (st.i + 1) + ' / ' + st.qs.length + '</span><span class="cbt-time" id="' + cfg.id + '-time">⏱ ' + mmss(st.left) + '</span></div>' +
          '<div class="cbt-wrap"><div class="cbt-q">' +
          '<p class="cbt-qtext"><b>' + (st.i + 1) + '.</b> ' + esc(q.q) + '</p>' +
          it.order.map(function (oi, k) {
            return '<div class="field-row cbt-opt"><input type="radio" name="' + cfg.id + '-o" id="' + cfg.id + '-o' + k + '" value="' + k + '"' + (it.pick === k ? " checked" : "") + '><label for="' + cfg.id + '-o' + k + '">' + "①②③④"[k] + " " + esc(q.o[oi]) + "</label></div>";
          }).join("") +
          '<div class="row" style="margin-top: 12px;"><button id="' + cfg.id + '-prev"' + (st.i ? "" : " disabled") + '>◀ 이전</button><button id="' + cfg.id + '-next">' + (st.i < st.qs.length - 1 ? "다음 ▶" : "마지막 문제") + '</button><span style="flex: 1;"></span><button id="' + cfg.id + '-submit">📤 답안 제출</button></div>' +
          '</div><div class="cbt-omr"><div class="muted">답안표기란</div>' + st.qs.map(function (x, k) {
            return '<button class="omr' + (x.pick !== null ? " done" : "") + (k === st.i ? " cur" : "") + '" data-k="' + k + '">' + (k + 1) + (x.pick !== null ? " " + "①②③④"[x.pick] : "") + "</button>";
          }).join("") + "</div></div>";
        Array.prototype.forEach.call(body.querySelectorAll('input[name="' + cfg.id + '-o"]'), function (r) {
          r.onchange = function () { it.pick = +r.value; var b = body.querySelector('.omr[data-k="' + st.i + '"]'); b.classList.add("done"); b.textContent = (st.i + 1) + " " + "①②③④"[it.pick]; };
        });
        $("#" + cfg.id + "-prev").onclick = function () { st.i--; render(); };
        $("#" + cfg.id + "-next").onclick = function () { if (st.i < st.qs.length - 1) { st.i++; render(); } };
        $("#" + cfg.id + "-submit").onclick = function () {
          var blank = st.qs.filter(function (x) { return x.pick === null; }).length;
          if (blank && !confirmBlank) { confirmBlank = true; D.msg("답안 제출", "안 푼 문제가 " + blank + "개 있습니다.\n그래도 제출하려면 [답안 제출]을 한 번 더 누르세요.", "📝"); return; }
          finish();
        };
        Array.prototype.forEach.call(body.querySelectorAll(".omr"), function (b) { b.onclick = function () { st.i = +b.dataset.k; render(); }; });
      };
      var confirmBlank = false;
      var finish = function (timeout) {
        clearInterval(timer);
        var by = {}, wrong = load(wrongKey, []), correct = 0;
        st.qs.forEach(function (x) {
          var ok = x.pick !== null && x.order[x.pick] === x.x.q.a;
          x.ok = ok;
          by[x.x.s] = by[x.x.s] || { n: 0, c: 0 };
          by[x.x.s].n++; if (ok) { by[x.x.s].c++; correct++; }
          var w = wrong.indexOf(x.x.id);
          if (!ok && w === -1) wrong.push(x.x.id);
          if (ok && w !== -1) wrong.splice(w, 1);   // 맞히면 오답노트에서 빠짐
        });
        save(wrongKey, wrong);
        var total = Math.round(correct / st.qs.length * 100);
        var verdict = cfg.pass(by, total);
        var h = load(histKey, []);
        var now = new Date();
        h.push({ d: (now.getMonth() + 1) + "/" + now.getDate(), mode: st.mode, score: total, res: verdict.short });
        save(histKey, h.slice(-50));
        body.innerHTML =
          '<div class="cbt-title">' + (timeout ? "⏰ 시간 종료 · " : "") + esc(st.mode) + ' 결과</div>' +
          '<div class="cbt-result ' + (verdict.ok ? "pass" : "fail") + '"><div class="big">' + total + '점</div><div>' + esc(verdict.text) + "</div></div>" +
          '<table class="tz-plan"><tr><th>과목·영역</th><th>정답</th><th>점수</th></tr>' + Object.keys(by).map(function (s) {
            var sc = Math.round(by[s].c / by[s].n * 100);
            return "<tr><td>" + esc(s) + "</td><td>" + by[s].c + " / " + by[s].n + '</td><td class="' + (sc < 40 ? "warn" : "") + '">' + sc + "점" + (cfg.cutoff && sc < 40 ? " (과락)" : "") + "</td></tr>";
          }).join("") + "</table>" +
          '<fieldset><legend>해설</legend>' + st.qs.map(function (x, k) {
            var q = x.x.q;
            return '<div class="cbt-exp ' + (x.ok ? "ok" : "no") + '"><b>' + (x.ok ? "⭕" : "❌") + " " + (k + 1) + ". " + esc(q.q) + '</b><br>정답: ' + esc(q.o[q.a]) +
              (x.ok ? "" : ' · 내 답: ' + (x.pick === null ? "미응답" : esc(q.o[x.order[x.pick]]))) + '<br><span class="muted">💡 ' + esc(q.x) + "</span></div>";
          }).join("") + "</fieldset>" +
          '<div class="row right"><button id="' + cfg.id + '-home">처음으로</button></div>';
        $("#" + cfg.id + "-home").onclick = home;
        body.scrollTop = 0;
      };
      clearInterval(timer);
      timer = setInterval(function () {
        st.left--;
        var t = $("#" + cfg.id + "-time"); if (t) t.textContent = "⏱ " + mmss(st.left);
        if (st.left <= 0) finish(true);
      }, 1000);
      render();
    };

    D.apps[cfg.id] = home;
    D.closers[cfg.id] = function () { clearInterval(timer); };
  }

  /* =====================================================
     전공 실기
     ===================================================== */
  function makeSilgi() {
    var D = window.DONG, $ = D.$, $$ = D.$$;
    var data = window.STUDY_DATA.silgi, body = $("#silgi-body");
    var gradeKey = "dongos-silgi-grade";
    var home = function () {
      var g = load(gradeKey, {});
      var cats = {}; data.forEach(function (p) { cats[p.cat] = true; });
      var done = Object.keys(g).length, ok = Object.keys(g).filter(function (k) { return g[k] === "O"; }).length;
      body.innerHTML =
        '<div class="cbt-title">✍️ 전공 실기 · 건축기사 실기 스타일</div>' +
        '<div class="tz-stats" style="margin-bottom: 8px;"><span>푼 문제 <b>' + done + " / " + data.length + '</b></span><span>완벽(O) <b>' + ok + '</b></span></div>' +
        '<div class="row" style="margin-bottom: 8px;"><button id="silgi-random">🎲 랜덤 10문제</button><button id="silgi-hard">★ 고난도만</button><button id="silgi-retry">🔁 O 아닌 문제만</button>' +
        Object.keys(cats).map(function (c) { return '<button data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>" +
        '<table class="tz-plan"><tr><th>#</th><th>분야</th><th>유형</th><th>문제</th><th>채점</th></tr>' + data.map(function (p, i) {
          return '<tr class="silgi-row" data-i="' + i + '"><td>' + (i + 1) + "</td><td>" + esc(p.cat) + "</td><td>" + (p.type === "calc" ? "계산" : "서술") + '</td><td class="silgi-q">' + (p.hard ? '<b class="hard">★</b> ' : "") + esc(p.q.split("\n")[0]) + "</td><td>" + (g[i] || "-") + "</td></tr>";
        }).join("") + "</table>" +
        '<p class="muted">서술형은 직접 쓰고 모범답안과 비교해 O/△/X로 스스로 채점합니다. 계산형은 숫자만 넣으면 자동 채점됩니다 (오차 1% 허용). 실제 시험처럼 풀이 과정도 꼭 손으로 써 보세요.</p>';
      $$("#silgi-body .silgi-row").forEach(function (r) { r.onclick = function () { run([+r.dataset.i]); }; });
      $("#silgi-hard").onclick = function () { run(shuffle(data.map(function (_, i) { return i; }).filter(function (i) { return data[i].hard; }))); };
      $("#silgi-random").onclick = function () { run(shuffle(data.map(function (_, i) { return i; })).slice(0, 10)); };
      $("#silgi-retry").onclick = function () { var g2 = load(gradeKey, {}); var l = data.map(function (_, i) { return i; }).filter(function (i) { return g2[i] !== "O"; }); if (l.length) run(shuffle(l)); };
      $$("#silgi-body [data-c]").forEach(function (b) { b.onclick = function () { run(data.map(function (_, i) { return i; }).filter(function (i) { return data[i].cat === b.dataset.c; })); }; });
    };
    var run = function (list) {
      var k = 0;
      var show = function () {
        var i = list[k], p = data[i];
        body.innerHTML =
          '<div class="cbt-bar"><span>' + (p.hard ? "★ 고난도 · " : "") + esc(p.cat) + " · " + (p.type === "calc" ? "계산형" : "서술형") + '</span><span>' + (k + 1) + " / " + list.length + '</span><span>문제 ' + (i + 1) + "</span></div>" +
          '<div class="silgi-paper"><p class="cbt-qtext">' + esc(p.q) + "</p>" +
          (p.type === "calc"
            ? '<div class="row"><label>답</label><input type="number" step="any" id="silgi-num" style="width: 160px;"><span>' + esc(p.unit) + '</span><button id="silgi-check">채점</button></div>'
            : '<textarea id="silgi-text" class="silgi-text" placeholder="답안을 써 보세요 (키워드 위주로)"></textarea><div class="row"><button id="silgi-check">모범답안 보기</button></div>') +
          '<div id="silgi-ans"></div></div>' +
          '<div class="row right" style="margin-top: 8px;"><button id="silgi-home">목록</button><button id="silgi-next">' + (k < list.length - 1 ? "다음 ▶" : "끝") + "</button></div>";
        $("#silgi-home").onclick = home;
        $("#silgi-next").onclick = function () { if (k < list.length - 1) { k++; show(); } else home(); };
        var grade = function (v) { var g = load(gradeKey, {}); g[i] = v; save(gradeKey, g); };
        $("#silgi-check").onclick = function () {
          var out = $("#silgi-ans");
          if (p.type === "calc") {
            var v = parseFloat($("#silgi-num").value);
            var ok = !isNaN(v) && Math.abs(v - p.answer) <= Math.abs(p.answer) * 0.01;
            grade(ok ? "O" : "X");
            out.innerHTML = '<div class="cbt-result ' + (ok ? "pass" : "fail") + '">' + (ok ? "⭕ 정답" : "❌ 오답") + " · 정답 " + p.answer + " " + esc(p.unit) + '</div><div class="silgi-model"><b>풀이</b><br>' + esc(p.a) + "</div>";
          } else {
            out.innerHTML = '<div class="silgi-model"><b>모범답안</b><br>' + esc(p.a) + '</div><p class="muted">채점 포인트: ' + p.keys.map(esc).join(" · ") + '</p><div class="row"><span>스스로 채점:</span><button data-g="O">⭕ 완벽</button><button data-g="△">🔺 부분</button><button data-g="X">❌ 다시</button><span id="silgi-g" class="muted"></span></div>';
            $$("#silgi-ans [data-g]").forEach(function (b) { b.onclick = function () { grade(b.dataset.g); $("#silgi-g").textContent = "저장됨: " + b.dataset.g; }; });
          }
        };
      };
      show();
    };
    D.apps.silgi = home;
  }

  window.DONG_makeCBT = makeCBT;   // 인적성 연습에서 재사용

  document.addEventListener("DOMContentLoaded", function () {
    var S = window.STUDY_DATA;
    makeCBT({
      id: "pilgi", key: "pilgi", bank: S.pilgi, perQ: 90, cutoff: true,
      title: "🏗️ 전공 필기 CBT · 건축기사 필기 스타일 (5과목)",
      passText: "합격 기준(건축기사 필기 방식): 과목별 40점 이상 + 전 과목 평균 60점 이상. 문제당 1분 30초. 연습용 자체 제작 문제이며, 법규는 최신 법령을 꼭 확인하세요.",
      pass: function (by, total) {
        var fail = Object.keys(by).filter(function (s) { return by[s].c / by[s].n < 0.4; });
        if (fail.length) return { ok: false, short: "과락", text: "불합격 · 과락 과목: " + fail.join(", ") };
        if (total < 60) return { ok: false, short: "불합격", text: "불합격 · 평균 60점 미만" };
        return { ok: true, short: "합격", text: "합격 기준 통과! (과목별 40점 이상 · 평균 60점 이상)" };
      }
    });
    makeCBT({
      id: "ncs", key: "ncs", bank: S.ncs, perQ: 60, cutoff: false,
      title: "🏢 NCS 직업기초능력 · 공기업 필기 스타일",
      passText: "문제당 1분. '기관형' 영역은 한전·한수원·발전사·부동산원 업무 소재로 만든 PSAT형 연습 세트입니다. 지문 속 수치는 문제용 가정값이며, 기관마다 출제 영역·유형이 해마다 바뀌니 채용 공고를 꼭 확인하세요.",
      pass: function (by, total) {
        return total >= 80 ? { ok: true, short: "안정권", text: "안정권! 실전에서는 속도를 더 올려 보세요." }
          : total >= 60 ? { ok: true, short: "보통", text: "보통 · 틀린 영역의 해설을 다시 보세요." }
          : { ok: false, short: "보완", text: "보완 필요 · 오답노트로 다시 풀어 보세요." };
      }
    });
    makeSilgi();
    makeCBT({
      id: "apt", key: "apt", bank: S.apt, perQ: 45, cutoff: false,
      title: "🧮 인적성 연습 · GSAT·HMAT 스타일 (수리·자료해석·추리)",
      passText: "문제당 45초. 대기업 인적성은 정확도만큼 속도가 중요합니다. 손으로 계산하지 말고 어림셈으로 보기를 지워 보세요.",
      pass: function (by, total) {
        return total >= 85 ? { ok: true, short: "상위권", text: "상위권 페이스! 시간을 더 줄여 보세요." }
          : total >= 65 ? { ok: true, short: "합격권", text: "합격권 · 틀린 유형만 다시 보세요." }
          : { ok: false, short: "보완", text: "보완 필요 · 오답노트로 다시 풀어 보세요." };
      }
    });
  });
})();
