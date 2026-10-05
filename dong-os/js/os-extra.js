/* =========================================================
   DONG OS 98 — 추가 프로그램
   이력서 · 방명록 · 안전사고 찾기 · 제어판 · 미디어 플레이어 · 블루스크린
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 미디어 플레이어: 유튜브 재생목록 연동 ----------
     유튜브 앱에서 이 재생목록에 영상을 넣고 빼면 플레이어에 자동 반영됩니다.
     API 키는 Google Cloud에서 dkinen.github.io 에서만 쓰이도록 제한되어 있습니다. */
  var YT_KEY = "AIzaSyBqJugUq-Mq2d7cnJV4pAb4hAa2LQDUv7U";
  var YT_PLAYLIST = "PLfFM25R6rvWA";
  var PLAYLIST = [];   // 재생목록에서 불러온 { title, id }

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.DONG, $ = D.$, $$ = D.$$;

    /* ---------- 이력서 ---------- */
    var rf = $("#resume-frame");
    D.apps.resume = function () { if (!rf.getAttribute("src")) rf.setAttribute("src", rf.dataset.src); };
    $("#resume-print").addEventListener("click", function () {
      try { rf.contentWindow.focus(); rf.contentWindow.print(); }
      catch (e) { window.open("resume.html", "_blank", "noopener"); }
    });

    /* ---------- 방명록 (giscus · GitHub Discussions) ---------- */
    var gbLoaded = false;
    D.apps.guestbook = function () {
      if (gbLoaded) return;
      gbLoaded = true;
      var box = $("#giscus-box");
      box.innerHTML = "";
      var sc = document.createElement("script");
      var attrs = {
        "src": "https://giscus.app/client.js",
        "data-repo": "Dkinen/Dkinen.github.io",
        "data-repo-id": "R_kgDOU7Eilw",
        "data-category": "Announcements",
        "data-category-id": "DIC_kwDOU7Eil84DHDsO",
        "data-mapping": "specific",
        "data-term": "DONG OS 98 방명록",
        "data-strict": "1",
        "data-reactions-enabled": "1",
        "data-emit-metadata": "0",
        "data-input-position": "top",
        "data-theme": "light",
        "data-lang": "ko",
        "crossorigin": "anonymous"
      };
      Object.keys(attrs).forEach(function (k) { sc.setAttribute(k, attrs[k]); });
      sc.async = true;
      box.appendChild(sc);
    };

    /* ---------- 안전사고 찾기 (지뢰찾기) ---------- */
    var HAZARDS = [
      ["🕳️", "개구부 추락"], ["⚡", "감전"], ["🏗️", "크레인 낙하물"],
      ["🔥", "화재"], ["🧱", "자재 낙하"], ["🚜", "굴착기 협착"]
    ];
    var grid = $("#mines-grid"), face = $("#mines-face"), leftEl = $("#mines-left"), timeEl = $("#mines-time"), statusEl = $("#mines-status");
    var W, H, N, cells, opened, flags, over, started, tick, secs;
    var pad3 = function (n) { return String(Math.max(0, Math.min(999, n))).padStart(3, "0"); };
    var around = function (i) {
      var x = i % W, y = Math.floor(i / W), out = [];
      for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        var nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < W && ny < H) out.push(ny * W + nx);
      }
      return out;
    };
    var newGame = function () {
      var v = $("#mines-level").value.split(",").map(Number);
      W = v[0]; H = v[1]; N = v[2];
      cells = []; opened = 0; flags = 0; over = false; started = false; secs = 0;
      clearInterval(tick);
      face.textContent = "👷";
      leftEl.textContent = pad3(N);
      timeEl.textContent = "000";
      statusEl.textContent = "위험 요소 " + N + "개를 모두 찾아 통제하세요.";
      grid.style.gridTemplateColumns = "repeat(" + W + ", auto)";
      grid.innerHTML = "";
      for (var i = 0; i < W * H; i++) {
        var b = document.createElement("button");
        b.className = "cell";
        b.dataset.i = i;
        grid.appendChild(b);
        cells.push({ mine: false, hz: null, n: 0, open: false, flag: false, el: b });
      }
    };
    var plant = function (safe) {   // 첫 클릭 칸과 주변은 안전하게
      var ban = around(safe).concat([safe]), placed = 0;
      while (placed < N) {
        var r = Math.floor(Math.random() * W * H);
        if (cells[r].mine || ban.indexOf(r) !== -1) continue;
        cells[r].mine = true;
        cells[r].hz = HAZARDS[Math.floor(Math.random() * HAZARDS.length)];
        placed++;
      }
      cells.forEach(function (c, i) { c.n = around(i).filter(function (j) { return cells[j].mine; }).length; });
    };
    var reveal = function (i) {
      var c = cells[i];
      if (c.open || c.flag) return;
      c.open = true; opened++;
      c.el.classList.add("open");
      if (c.n) { c.el.textContent = c.n; c.el.classList.add("n" + c.n); }
      else around(i).forEach(reveal);
    };
    var lose = function (i) {
      over = true; clearInterval(tick);
      face.textContent = "😵";
      cells.forEach(function (c) { if (c.mine) { c.el.classList.add("open"); c.el.innerHTML = '<span class="e">' + c.hz[0] + "</span>"; } });
      cells[i].el.classList.add("boom");
      statusEl.textContent = "안전사고 발생: " + cells[i].hz[1];
      D.msg("안전사고 발생", "원인: " + cells[i].hz[1] + "\n점검 전 안전모 착용 여부를 확인하십시오.\n(산업안전기사의 현장에서는 있을 수 없는 일입니다)", "🚨");
    };
    var checkWin = function () {
      if (opened === W * H - N && !over) {
        over = true; clearInterval(tick);
        face.textContent = "😎";
        cells.forEach(function (c) { if (c.mine && !c.flag) { c.flag = true; c.el.innerHTML = '<span class="e">🚧</span>'; } });
        leftEl.textContent = "000";
        statusEl.textContent = "무재해 " + secs + "초 달성!";
        D.msg("무재해 달성", "모든 위험 요소를 통제했습니다. (" + secs + "초)\n산업안전기사 김동현이 인정합니다. 🦺", "🏆");
      }
    };
    var open = function (i) {
      if (over) return;
      if (!started) {
        started = true; plant(i);
        tick = setInterval(function () { secs++; timeEl.textContent = pad3(secs); }, 1000);
      }
      var c = cells[i];
      if (c.flag) return;
      if (c.mine) { lose(i); return; }
      if (c.open && c.n) {   // 숫자 칸을 누르면 주변 한꺼번에 열기 (통제 수가 맞을 때)
        var nb = around(i), f = nb.filter(function (j) { return cells[j].flag; }).length;
        if (f === c.n) nb.forEach(function (j) { if (!cells[j].flag && !cells[j].open) { if (cells[j].mine) lose(j); else reveal(j); } });
      } else reveal(i);
      if (!over) checkWin();
    };
    var flag = function (i) {
      if (over || !started) return;
      var c = cells[i];
      if (c.open) return;
      c.flag = !c.flag;
      c.el.innerHTML = c.flag ? '<span class="e">🚧</span>' : "";
      flags += c.flag ? 1 : -1;
      leftEl.textContent = pad3(N - flags);
    };
    grid.addEventListener("click", function (e) { var b = e.target.closest(".cell"); if (b) open(+b.dataset.i); });
    grid.addEventListener("contextmenu", function (e) { e.preventDefault(); var b = e.target.closest(".cell"); if (b) flag(+b.dataset.i); });
    var press = null;   // 휴대폰: 길게 누르면 통제
    grid.addEventListener("touchstart", function (e) {
      var b = e.target.closest(".cell"); if (!b) return;
      press = setTimeout(function () { press = "done"; flag(+b.dataset.i); }, 450);
    }, { passive: true });
    grid.addEventListener("touchend", function (e) {
      if (press === "done") { e.preventDefault(); } else clearTimeout(press);
      press = null;
    });
    face.addEventListener("click", newGame);
    $("#mines-level").addEventListener("change", newGame);
    D.apps.mines = newGame;
    D.closers.mines = function () { clearInterval(tick); };

    /* ---------- 제어판: 바탕화면 ---------- */
    var WPS = ["teal", "blueprint", "court", "bar", "pool"];
    var setWp = function (name, save) {
      WPS.forEach(function (w) { document.body.classList.remove("wp-" + w); });
      document.body.classList.add("wp-" + name);
      if (save) { try { localStorage.setItem("dongos-wallpaper", name); } catch (e) {} }
    };
    var preview = function (name) { $("#wp-preview").className = "monitor-screen wp-" + name; };
    var saved = "teal";
    try { saved = localStorage.getItem("dongos-wallpaper") || "teal"; } catch (e) {}
    if (WPS.indexOf(saved) === -1) saved = "teal";
    setWp(saved, false);
    $$('input[name="wp"]').forEach(function (r) {
      r.addEventListener("change", function () { preview(r.value); });
    });
    var current = function () { var r = $('input[name="wp"]:checked'); return r ? r.value : "teal"; };
    $("#wp-apply").addEventListener("click", function () { setWp(current(), true); });
    $('#control [data-close]').addEventListener("click", function () { setWp(current(), true); });
    D.apps.control = function () {
      var now = WPS.filter(function (w) { return document.body.classList.contains("wp-" + w); })[0] || "teal";
      $("#wp-" + now).checked = true;
      preview(now);
    };

    /* ---------- 미디어 플레이어 ---------- */
    var list = $("#media-list"), screen = $("#media-screen"), now = $("#media-now"), cur = -1;
    var play = function (i) {
      if (!PLAYLIST.length) return;
      cur = (i + PLAYLIST.length) % PLAYLIST.length;
      $$("button", list).forEach(function (b, j) { b.classList.toggle("on", j === cur); });
      screen.innerHTML = "";
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(PLAYLIST[cur].id) + "?autoplay=1&rel=0";
      f.allow = "autoplay; encrypted-media; picture-in-picture";
      f.allowFullscreen = true;
      f.title = PLAYLIST[cur].title;
      screen.appendChild(f);
      now.textContent = "재생 중: " + PLAYLIST[cur].title;
    };
    var loaded = false, failed = false;
    var stop = function () {
      if (failed) return;
      screen.innerHTML = PLAYLIST.length ? "<p>재생할 항목을 고르세요.</p>" : "<p>재생목록 불러오는 중...</p>";
      now.textContent = "정지됨";
      cur = -1;
      $$("button", list).forEach(function (b) { b.classList.remove("on"); });
    };
    var renderList = function () {
      list.innerHTML = "";
      PLAYLIST.forEach(function (t, i) {
        var b = document.createElement("button");
        b.textContent = (i + 1) + ". " + t.title;
        b.addEventListener("click", function () { play(i); });
        list.appendChild(b);
      });
      if (!PLAYLIST.length) list.innerHTML = '<p class="muted" style="padding: 8px; margin: 0;">(비어 있음)</p>';
    };
    // API가 막히면 유튜브 기본 재생목록 플레이어로 대신 보여 줌
    var fallback = function () {
      failed = true;
      list.innerHTML = '<p class="muted" style="padding: 8px; margin: 0;">목록을 불러오지 못해 유튜브 기본 재생목록으로 보여 줍니다.</p>';
      screen.innerHTML = "";
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/videoseries?list=" + encodeURIComponent(YT_PLAYLIST);
      f.allow = "encrypted-media; picture-in-picture";
      f.allowFullscreen = true;
      f.title = "재생목록";
      screen.appendChild(f);
      now.textContent = "유튜브 재생목록";
    };
    var api = function (path) {
      return fetch("https://www.googleapis.com/youtube/v3/" + path + "&key=" + YT_KEY).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      });
    };
    var loadPlaylist = function () {
      if (loaded) return;
      loaded = true;
      api("playlists?part=snippet&id=" + YT_PLAYLIST).then(function (d) {
        if (d.items && d.items[0]) $("#media .title-bar-text").textContent = "🎵 " + d.items[0].snippet.title + " - DONG 미디어 플레이어";
      }).catch(function () {});
      var all = [];
      var page = function (tok) {
        return api("playlistItems?part=snippet,status&maxResults=50&playlistId=" + YT_PLAYLIST + (tok ? "&pageToken=" + tok : "")).then(function (d) {
          d.items.forEach(function (it) {
            if (it.status && it.status.privacyStatus === "private") return;   // 비공개·삭제 영상은 건너뜀
            var t = it.snippet.title;
            if (t === "Deleted video" || t === "Private video") return;
            all.push({ title: t, id: it.snippet.resourceId.videoId });
          });
          if (d.nextPageToken && all.length < 200) return page(d.nextPageToken);
        });
      };
      page("").then(function () {
        PLAYLIST = all;
        renderList();
        stop();
      }).catch(fallback);
    };
    renderList();
    $("#media-prev").addEventListener("click", function () { play(cur - 1); });
    $("#media-next").addEventListener("click", function () { play(cur + 1); });
    D.apps.media = function () { stop(); loadPlaylist(); };
    D.closers.media = function () {   // 창을 닫으면 소리도 끔
      screen.innerHTML = "";
      if (failed) { loaded = false; failed = false; }
      cur = -1;
      now.textContent = "정지됨";
    };

    /* ---------- 블루스크린 ---------- */
    var bsod = $("#bsod");
    var hideBsod = function () { bsod.classList.remove("show"); document.removeEventListener("keydown", hideBsod); };
    D.bsod = function () {
      bsod.classList.add("show");
      setTimeout(function () { document.addEventListener("keydown", hideBsod); }, 300);
    };
    bsod.addEventListener("click", hideBsod);
    // 휴지통의 2월졸업_확정.docx를 5번 열어도 블루스크린
    var gradClicks = 0;
    $$('#trash .icon').forEach(function (ic) {
      if ((ic.dataset.msg || "").indexOf("2월졸업") !== 0) return;
      ic.addEventListener("click", function () { if (++gradClicks >= 5) { gradClicks = 0; D.bsod(); } });
    });
  });
})();
