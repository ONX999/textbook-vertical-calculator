import { buildLongDivision } from './modules/longDivision.js';
import { svgToPngBlob } from './modules/exportSvg.js';

const stepList = document.getElementById('step-list');
const currentLine = document.getElementById('current-line');
const exportSvgBtn = document.getElementById('export-svg');
const exportPngBtn = document.getElementById('export-png');
const clearBtn = document.getElementById('clear');

let buffer = '';
let historySteps = [];

function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function renderSteps(highlightIndex = -1) {
  stepList.innerHTML = historySteps.map((s,i)=> `<div class="step-item ${i===highlightIndex?'highlight':''}">${escapeHtml(s)}</div>`).join('');
  currentLine.textContent = buffer || '0';
}

document.querySelectorAll('button[data-key]').forEach(b=>{
  b.addEventListener('click', ()=> {
    buffer += b.dataset.key;
    renderSteps();
  });
});
document.querySelectorAll('button[data-op]').forEach(b=>{
  b.addEventListener('click', ()=> {
    if(!buffer) return;
    buffer += ` ${b.dataset.op} `;
    renderSteps();
  });
});

document.getElementById('equals').addEventListener('click', ()=>{
  try {
    const safe = buffer.replace(/[^0-9+\-*/().\s]/g,'');
    const result = Function(`"use strict"; return (${safe})`)();
    historySteps.push(`${buffer} = ${result}`);
    buffer = String(result);
    renderSteps();
  } catch (e) {
    historySteps.push('錯誤：無效的表達式');
    buffer = '';
    renderSteps();
  }
});

clearBtn.addEventListener('click', ()=>{
  buffer = '';
  historySteps = [];
  renderSteps();
});

// Example long division usage UI quick demo
// If user input format "dividend / divisor" produce long division SVG
exportSvgBtn.addEventListener('click', async ()=>{
  const parts = (buffer || '').split('/').map(s=>s.trim());
  if (parts.length===2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
    const dividend = parseInt(parts[0],10);
    const divisor = parseInt(parts[1],10);
    const { svg, steps } = buildLongDivision(dividend, divisor, { scale:1, fontSize:18 });
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `longdivision_${dividend}_by_${divisor}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    // render steps into history
    historySteps = historySteps.concat(steps.map(s => s.description));
    renderSteps();
  } else {
    alert('請先在輸入欄輸入 "123 / 3" 形式的整數除法，再點選匯出 SVG');
  }
});

// Export PNG high res from SVG
exportPngBtn.addEventListener('click', async ()=>{
  const parts = (buffer || '').split('/').map(s=>s.trim());
  if (parts.length===2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
    const dividend = parseInt(parts[0],10);
    const divisor = parseInt(parts[1],10);
    const { svg } = buildLongDivision(dividend, divisor, { scale:2, fontSize:24 });
    const blob = await svgToPngBlob(svg, 2);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `longdivision_${dividend}_by_${divisor}@2x.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } else {
    alert('請先在輸入欄輸入 "123 / 3" 形式的整數除法，再點選匯出 PNG');
  }
});

// init
renderSteps();
