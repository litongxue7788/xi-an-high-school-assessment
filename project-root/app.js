// app.js - 入口（浏览器 ES Module 版本）
import { loadSchoolData } from './core/schoolLoaderInline.js'; // 我们将提供一个内联 loader 以避免构建复杂性
import { calculateMatchScores } from './core/recommendationEngine.js';
import { renderResults, clearResults } from './ui/renderer.js';
import { generatePDFReport } from './services/pdfService.js';
import { runAIRecommendation } from './services/aiService.js';

let schoolData = [];

async function init() {
  // load schools.json from /data
  try {
    const resp = await fetch('/data/schools.json', {cache:'no-store'});
    if (resp.ok) {
      schoolData = await resp.json();
    } else {
      schoolData = [];
    }
  } catch (e) {
    console.warn('load schools error', e);
    schoolData = [];
  }
  console.log('Loaded schools count:', schoolData.length);
}

function collectStudentInput() {
  return {
    name: document.getElementById('studentName').value.trim(),
    hukouType: document.getElementById('hukouType').value,
    district: document.getElementById('studentDistrict').value.trim(),
    street: document.getElementById('studentStreet').value.trim(),
    highlights: document.getElementById('studentHighlights').value.trim(),
    grade: document.getElementById('studentGrade').value
  };
}

function collectPreferences() {
  return {
    type: document.getElementById('schoolTypePreference').value,
    budget: document.getElementById('budget').value.trim(),
    boarding: document.getElementById('boarding').value,
    featurePriority: document.getElementById('featurePriority').value.trim()
  };
}

async function onRecommendClicked() {
  clearResults();
  const student = collectStudentInput();
  const preferences = collectPreferences();
  const useAI = document.getElementById('useAI').checked;
  if (!student.name || !student.district) {
    alert('请完整填写学生姓名与所在区');
    return;
  }
  let results = [];
  if (useAI) {
    // call AI service
    const aiRes = await runAIRecommendation(student, preferences, schoolData);
    if (aiRes && aiRes.error) {
      alert('AI 服务出错：' + aiRes.error + '，已回退到本地逻辑。');
      results = calculateMatchScores(student, preferences, schoolData);
    } else {
      results = aiRes;
    }
  } else {
    results = calculateMatchScores(student, preferences, schoolData);
  }
  renderResults(results, student);
  // 保存最近一次结果到 localStorage
  try { localStorage.setItem('last_result', JSON.stringify({ student, preferences, results })); } catch(e){}
}

async function onGeneratePdfClicked() {
  const last = JSON.parse(localStorage.getItem('last_result') || 'null');
  if (!last) {
    alert('请先生成推荐结果');
    return;
  }
  await generatePDFReport(last.student, last.preferences, last.results);
}

document.addEventListener('DOMContentLoaded', async () => {
  await init();
  document.getElementById('recommendBtn').addEventListener('click', onRecommendClicked);
  document.getElementById('generatePdfBtn').addEventListener('click', onGeneratePdfClicked);
});
