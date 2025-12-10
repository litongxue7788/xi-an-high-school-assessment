export function renderResults(results, student) {
  const container = document.getElementById('resultContainer');
  const list = document.getElementById('resultList');
  container.style.display = 'block';
  list.innerHTML = '';

  if (!results || results.length === 0) {
    list.innerHTML = `<div>未找到匹配结果，请检查输入或导入更多学校数据。</div>`;
    return;
  }

  results.forEach((r, idx) => {
    const el = document.createElement('div');
    el.className = 'school-card';
    const features = (r.school && r.school.features) ? r.school.features.join('、') : '—';
    const warnings = (r.warnings && r.warnings.length) ? `<div style="color:#d65">⚠ ${r.warnings.join('；')}</div>` : '';
    el.innerHTML = `
      <div class="school-title">${idx+1}. ${r.schoolName}</div>
      <div>匹配度：<strong>${r.matchScore}</strong></div>
      <div class="score-bar"><div class="score-fill" style="width:${r.matchScore}%"></div></div>
      <div>类型：${r.school && r.school.type || '-' } &nbsp; 学费：${(r.school && ((r.school.fees && r.school.fees.tuition) || r.school.fees_number)) || '未标注'}</div>
      <div>特点：${features}</div>
      ${warnings}
    `;
    list.appendChild(el);
  });
}

export function clearResults() {
  const list = document.getElementById('resultList');
  if (list) list.innerHTML = '';
  const container = document.getElementById('resultContainer');
  if (container) container.style.display = 'none';
}
