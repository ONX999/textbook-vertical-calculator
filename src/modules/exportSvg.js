// Convert SVG string to PNG Blob at requested scale
export async function svgToPngBlob(svgString, scale = 1) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.documentElement;
  const width = parseFloat(svgEl.getAttribute('width')) || 800;
  const height = parseFloat(svgEl.getAttribute('height')) || 600;

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.src = url;

  await new Promise((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error('SVG load error'));
  });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(url);
  return await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.92));
}
