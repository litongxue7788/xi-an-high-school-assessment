// 轻量 PDF 服务：使用 jsPDF（如果页面已引入），否则导出 JSON 文本
export async function generatePDFReport(student, preferences, results=[]) {
  // 如果 jsPDF 可用则生成 PDF
  if (window.jspdf || window.jsPDF) {
    const { jsPDF } = window.jspdf || window.jsPDF;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

    pdf.setFontSize(14);
    pdf.text('西安小升初智能评估报告', 15, 15);
    pdf.setFontSize(10);
    pdf.text(`学生：${student.name || '-'}    年级：${student.grade || '-'}    户籍：${student.hukouType || '-'}`, 15, 22);
    pdf.text(`生成时间：${new Date().toLocaleString()}`, 15, 28);

    let y = 36;
    pdf.setFontSize(11);
    pdf.text('推荐学校：', 15, y);
    y += 6;
    for (const r of results) {
      pdf.setFontSize(10);
      const line = `${r.schoolName} （匹配度 ${r.matchScore}）`;
      pdf.text(line, 15, y);
      y += 6;
      if (y > 270) { pdf.addPage(); y = 20; }
    }
    pdf.save('评估报告.pdf');
    return { ok: true };
  } else {
    // fallback 导出 JSON
    const payload = { student, preferences, results, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'report.json'; a.click();
    URL.revokeObjectURL(url);
    return { ok: true };
  }
}
