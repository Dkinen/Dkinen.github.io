document.addEventListener("DOMContentLoaded", function () {
  // 모바일 메뉴 열기/닫기
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  // 푸터 연도 자동 표시
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // 숫자가 0부터 빠르게 올라가는 효과 (스탯 라인)
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 900, 1);
      el.textContent = Math.round(target * p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // 스크롤 시 등장 효과
  var items = document.querySelectorAll(".reveal, [data-count]");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.hasAttribute("data-count")) countUp(el);
        else el.classList.add("visible");
        observer.unobserve(el);
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) {
      if (el.hasAttribute("data-count")) el.textContent = el.getAttribute("data-count");
      else el.classList.add("visible");
    });
  }
});
