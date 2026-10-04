// 모바일 메뉴 열기/닫기
document.addEventListener("DOMContentLoaded", function () {
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
});
