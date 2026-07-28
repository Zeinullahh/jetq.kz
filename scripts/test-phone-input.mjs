// Verification for lib/phone.ts — run with: node scripts/test-phone-input.mjs
import {
  applyPhoneInput,
  formatPhoneInput,
  normalizePhone,
  validatePhone,
} from "../lib/phone.ts";

let fail = 0;
function check(label, ok, detail) {
  if (!ok) fail++;
  console.log((ok ? "PASS" : "FAIL") + " " + label + (detail !== undefined ? " -> " + detail : ""));
}

// --- Live formatting (as-you-type, per-country spacing) ---
const formatCases = [
  ["+77771234567", "+7 777 123 4567"],
  ["+380671234567", "+380 67 123 4567"],
  ["+971501234567", "+971 50 123 4567"],
  ["+12025550123", "+1 202 555 0123"],
  ["+998901234567", "+998 90 123 45 67"],
  ["+442071234567", "+44 20 7123 4567"],
  ["87771234567", "8 (777) 123 4567"], // local KZ national format
  ["7771234567", "777 123 4567"], // local KZ without trunk prefix
  ["+7", "+7"],
  ["7", "7"],
];
for (const [input, expected] of formatCases) {
  const got = formatPhoneInput(input);
  check("format(" + JSON.stringify(input) + ")", got === expected, JSON.stringify(got));
}

// --- Simulated keystroke-by-keystroke typing (regression: no cascading digits) ---
function typeIn(str) {
  let v = "";
  for (const ch of str) v = formatPhoneInput(v + ch);
  return v;
}
check("typing KZ +77771234567", typeIn("+77771234567") === "+7 777 123 4567", typeIn("+77771234567"));
check("typing UA +380671234567", typeIn("+380671234567") === "+380 67 123 4567", typeIn("+380671234567"));
check("typing UAE +971501234567", typeIn("+971501234567") === "+971 50 123 4567", typeIn("+971501234567"));
check("typing local 87771234567", typeIn("87771234567") === "8 (777) 123 4567", typeIn("87771234567"));

// --- Deletion: backspacing must always make progress (no "stuck" chars) ---
function backspaceAll(start) {
  let v = start;
  const steps = [v];
  for (let i = 0; i < 50 && v; i++) {
    const next = applyPhoneInput(v, v.slice(0, -1)); // backspace at end
    if (next === v) return { stuck: v, steps };
    v = next;
    steps.push(v);
  }
  return { stuck: null, steps };
}
for (const start of [
  "+7 777 123 4567",
  "+380 67 123 4567",
  "+971 50 123 4567",
  "8 (777) 123 4567", // the reported stuck case
  "+1 202 555 0123",
  "+44 20 7123 4567",
]) {
  const { stuck, steps } = backspaceAll(start);
  check("backspace-to-empty " + JSON.stringify(start), stuck === null,
    stuck === null ? steps.length + " steps" : "STUCK at " + JSON.stringify(stuck));
}

// Typing a separator by hand must NOT delete digits.
{
  const prev = "8 (777)";
  const afterSpace = applyPhoneInput(prev, prev + " ");
  check("typing a space keeps digits", afterSpace.replace(/\D/g, "") === "8777", JSON.stringify(afterSpace));
}

// --- Post-Soviet countries + Turkey: per-country typing style, validity, E.164 ---
const postSovietAndTurkey = [
  ["Kazakhstan",   "+77011234567",  "+7 701 123 4567"],
  ["Russia",       "+79211234567",  "+7 921 123 45 67"],
  ["Ukraine",      "+380671234567", "+380 67 123 4567"],
  ["Belarus",      "+375291234567", "+375 29 123 45 67"],
  ["Moldova",      "+37369123456",  "+373 691 23 456"],
  ["Georgia",      "+995555123456", "+995 555 12 34 56"],
  ["Armenia",      "+37491234567",  "+374 91 234567"],
  ["Azerbaijan",   "+994501234567", "+994 50 123 45 67"],
  ["Uzbekistan",   "+998901234567", "+998 90 123 45 67"],
  ["Turkmenistan", "+99365123456",  "+993 65 123456"],
  ["Kyrgyzstan",   "+996555123456", "+996 555 123 456"],
  ["Tajikistan",   "+992931234567", "+992 93 123 4567"],
  ["Estonia",      "+37251234567",  "+372 5123 4567"],
  ["Latvia",       "+37121234567",  "+371 21 234 567"],
  ["Lithuania",    "+37061234567",  "+370 612 34567"],
  ["Turkey",       "+905321234567", "+90 532 123 45 67"],
];
for (const [name, rawDigits, expectedFormat] of postSovietAndTurkey) {
  const fmt = typeIn(rawDigits); // simulate keystroke-by-keystroke typing
  check(name + " format", fmt === expectedFormat, JSON.stringify(fmt));
  check(name + " valid", validatePhone(fmt) === "");
  check(name + " e164", normalizePhone(fmt) === rawDigits, String(normalizePhone(fmt)));
  const { stuck } = backspaceAll(fmt);
  check(name + " deletable", stuck === null, stuck ? "STUCK at " + JSON.stringify(stuck) : "");
}

// --- Normalization to E.164 ---
const normalizeCases = [
  ["+7 777 123-45-67", "+77771234567"],
  ["7771234567", "+77771234567"],
  ["8 777 123-45-67", "+77771234567"],
  ["+380 67 123-45-67", "+380671234567"],
  ["+971 50 123 4567", "+971501234567"],
  ["+1 202-555-0123", "+12025550123"],
  ["+7", null],
  ["+77", null],
  ["123", null],
  ["+7 777 123", null], // incomplete
  ["+380 67 123", null], // incomplete
  ["", null],
];
for (const [input, expected] of normalizeCases) {
  const got = normalizePhone(input);
  check("normalize(" + JSON.stringify(input) + ")", got === expected, String(got));
}

// --- Validation messages ---
check("validate empty shows error", validatePhone("") !== "");
check("validate short shows error", validatePhone("+12") !== "");
check("validate KZ ok", validatePhone("+7 777 123-45-67") === "");
check("validate UA ok", validatePhone("+380 67 123-45-67") === "");
check("validate UAE ok", validatePhone("+971 50 123 4567") === "");
check("validate local 8... ok", validatePhone("8 777 123-45-67") === "");

process.exit(fail ? 1 : 0);
