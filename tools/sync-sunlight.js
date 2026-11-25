#!/usr/bin/env node
/*
 * 캡스톤 폴더의 "일조 배치 최적화 대결.html"을 sunlight-layout/index.html로 옮깁니다.
 *
 * 원본은 Claude 아티팩트에서 쓰는 조각(fragment)이라 <!doctype>·<html>·<head>·<body>가 없습니다.
 * 아티팩트 화면에서는 claude.ai가 그 틀을 씌워 주지만, 파일을 그대로 웹에 올리면
 * 브라우저가 quirks mode(document.compatMode === "BackCompat")로 읽고,
 * quirks mode에서는 hidden 속성이 먹지 않아 12개 페이지가 한꺼번에 보입니다.
 * 그래서 여기서 표준 문서 틀을 입혀 저장합니다.
 *
 * 사용법: node tools/sync-sunlight.js [원본경로]
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const src = process.argv[2] || path.resolve(root, "../캡스톤/일조 배치 최적화 대결.html");
const dest = path.join(root, "sunlight-layout", "index.html");

const raw = fs.readFileSync(src, "utf8");
if (/<!doctype/i.test(raw)) {
  console.error("원본에 이미 doctype이 있습니다. 이 스크립트를 손봐야 합니다: " + src);
  process.exit(1);
}
const marker = '<div class="shell">';
const cut = raw.indexOf(marker);
if (cut < 0) {
  console.error('원본에서 \'<div class="shell">\'을 찾지 못했습니다. 구조가 바뀐 것 같습니다: ' + src);
  process.exit(1);
}
const headPart = raw.slice(0, cut).trim();   // title · meta · 폰트 link · style
const bodyPart = raw.slice(cut).trim();      // 본문과 스크립트

const out = [
  "<!doctype html>",
  '<html lang="ko">',
  "<head>",
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
  "<!-- 이 파일은 tools/sync-sunlight.js가 만듭니다. 직접 고치지 말고 캡스톤 폴더의 원본을 고친 뒤 다시 돌리세요. -->",
  "<style>[hidden]{display:none!important}</style>",
  "<noscript><style>",
  "/* 스크립트가 막힌 환경(예: HTML 파일을 그대로 올린 노션)에서는 사이드바가 동작하지 못하니 전부 펼쳐 둡니다. */",
  ".page[hidden]{display:grid!important}",
  "</style></noscript>",
  headPart,
  "</head>",
  "<body>",
  bodyPart,
  "</body>",
  "</html>",
  ""
].join("\n");

fs.writeFileSync(dest, out);
console.log("원본 " + raw.length + "B → " + dest + " " + out.length + "B");
