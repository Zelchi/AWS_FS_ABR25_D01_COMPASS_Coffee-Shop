import fs from 'fs';
import path from 'path';

const htmlPath = path.join('./', 'index.html');
const cssPath = path.join('styles', 'index.css');
const jsPath = path.join('scripts', 'index.js');
const outputPath = path.join('dist', 'index.html');

const html = fs.readFileSync(htmlPath, 'utf-8');
const css = fs.readFileSync(cssPath, 'utf-8');
const js = fs.readFileSync(jsPath, 'utf-8');

const combined = html
	.replace('</head>', `<style>${css}</style></head>`)
	.replace('</body>', `<script>${js}</script></body>`);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, combined, 'utf-8');

console.log('Build concluído: dist/index.html');
