// 通用工具函数
export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2,9)}`;
}

export function clamp(v, a=0, b=100) {
  return Math.max(a, Math.min(b, v));
}

export function safeParseNumber(s) {
  if (s === null || s === undefined) return null;
  if (typeof s === "number") return s;
  const t = String(s).replace(/[,，\s]/g,"").trim();
  const wan = t.match(/(\d+(?:\.\d+)?)\s*万/);
  if (wan) return Number(wan[1]) * 10000;
  const num = t.match(/(\d+(?:\.\d+)?)/);
  if (num) return Number(num[1]);
  return null;
}

export function includesIgnoreCase(str = "", keyword = "") {
  if (!str || !keyword) return false;
  return String(str).toLowerCase().includes(String(keyword).toLowerCase());
}
