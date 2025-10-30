export function buildLongDivision(dividend, divisor, options = {}) {
  const scale = options.scale || 1;
  const fontSize = options.fontSize || 18;
  const padding = 8 * scale;
  const lineHeight = fontSize * 1.25 * scale;

  // compute steps: basic long division algorithm producing step objects
  const steps = [];
  let remainder = 0;
  const digits = String(dividend).split('').map(d=>parseInt(d,10));
  let current = 0;
  let quotientStr = '';

  for (let i = 0; i < digits.length; i++) {
    current = current * 10 + digits[i];
    const q = Math.floor(current / divisor);
    const product = q * divisor;
    const stepDesc = `bring ${digits[i]}, current ${current}, q=${q}, product=${product}, rem=${current - product}`;
    steps.push({ index: i, current, q, product, remainder: current - product, description: stepDesc });
    quotientStr += String(q);
    current = current - product;
  }
  remainder = current;
  const quotient = parseInt(quotientStr.replace(/^0+/,'') || '0', 10);

  // Build a simple SVG rendering each step vertically
  const width = Math.max(200, String(dividend).length * fontSize * 0.8) * scale;
  const height = (steps.length + 4) * lineHeight + padding * 2;
  let y = padding + lineHeight;

  function svgText(x, yVal, txt, cls='') {
    return `<text x="${x}" y="${yVal}" class="${cls}" font-family="monospace" font-size="${fontSize*scale}px">${txt}</text>`;
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
  svg += `<rect width="100%" height="100%" fill="#ffffff"/>`;

  // header line with dividend ÷ divisor = quotient
  svg += svgText(padding, y, ` ${dividend} ÷ ${divisor} = ${quotient}`);
  y += lineHeight;

  // draw each step
  steps.forEach((s, idx) => {
    svg += svgText(padding, y, `Step ${idx+1}: bring ${s.current} -> q=${s.q} product=${s.product}`);
    y += lineHeight;
  });

  svg += svgText(padding, y, `Remainder: ${remainder}`);
  svg += `</svg>`;

  return { svg, steps, quotient, remainder };
}
