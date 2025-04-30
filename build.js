import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');
const assetsSrc = path.join(srcDir, 'assets');
const assetsDist = path.join(distDir, 'assets');
const dataSrc = path.join(srcDir, 'data');
const dataDist = path.join(distDir, 'data');
const indexSrc = path.join(__dirname, 'index.html');
const indexDist = path.join(distDir, 'index.html');

function cleanDist() {
	if (fs.existsSync(distDir)) {
		fs.readdirSync(distDir).forEach((file) => {
			const filePath = path.join(distDir, file);
			if (fs.lstatSync(filePath).isDirectory()) {
				fs.rmSync(filePath, { recursive: true, force: true });
			} else {
				fs.unlinkSync(filePath);
			}
		});
	}
}

function copyFolderSync(from, to) {
	fs.mkdirSync(to, { recursive: true });
	fs.readdirSync(from).forEach((element) => {
		const fromPath = path.join(from, element);
		const toPath = path.join(to, element);
		if (fs.lstatSync(fromPath).isFile()) {
			fs.copyFileSync(fromPath, toPath);
		} else {
			copyFolderSync(fromPath, toPath);
		}
	});
}

function buildScripts() {
	const scriptsPath = path.join(srcDir, 'scripts');
	const scriptFiles = fs.readdirSync(scriptsPath).filter((file) => file.endsWith('.js'));
	let concatenatedScripts = '';
	scriptFiles.forEach((file) => {
		const filePath = path.join(scriptsPath, file);
		let scriptContent = fs.readFileSync(filePath, 'utf-8');
		scriptContent = scriptContent.replace(/import .*? from .*?;/g, '');
		scriptContent = scriptContent.replace(/export (default )?/g, '');
		scriptContent = scriptContent.replace(/['"]\/?src\/(.*?)['"]/g, '"./$1"');
		concatenatedScripts += `\n${scriptContent}`;
	});
	return concatenatedScripts;
}

function buildIndex() {
	let html = fs.readFileSync(indexSrc, 'utf-8');
	const inlinedScripts = buildScripts();
	html = html.replace(/<script.*?src="\/?src\/scripts\/(.*?)".*?><\/script>/g, '');
	html = html.replace(/<link rel="stylesheet" href="\/src\/styles\/(.*?)" \/>/g, (match, cssFile) => {
		const cssPath = path.join(srcDir, 'styles', cssFile);
		let cssContent = fs.readFileSync(cssPath, 'utf-8');
		cssContent = cssContent.replace(/url\(['"]?\.\.\/assets\/(.*?)['"]?\)/g, 'url(./assets/$1)');
		return `<style>${cssContent}</style>`;
	});
	html = html.replace(/<link rel="icon" href="\/src\/assets\/(.*?)" \/>/g, '<link rel="icon" href="./assets/$1" />');
	html = html.replace(/src="\/src\/data\/(.*?)"/g, 'src="./data/$1"');
	html = html.replace(/<img\s+src="\/src\/assets\/(.*?)"/g, '<img src="./assets/$1"');
	const styles = html.match(/<style>[\s\S]*?<\/style>/g) || [];
	html = html.replace(/<style>[\s\S]*?<\/style>/g, '');
	const bodyCloseTagIndex = html.lastIndexOf('</body>');
	html =
		html.slice(0, bodyCloseTagIndex) +
		`\n<script>\n${inlinedScripts}\n</script>\n${styles.join('\n')}\n` +
		html.slice(bodyCloseTagIndex);
	fs.writeFileSync(indexDist, html, 'utf-8');
}

function buildProject() {
	cleanDist();
	fs.mkdirSync(distDir, { recursive: true });
	copyFolderSync(assetsSrc, assetsDist);
	copyFolderSync(dataSrc, dataDist);
	buildIndex();
	console.log('Build completed successfully!');
}

buildProject();
