const fs = require('fs');
const path = require('path');

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

function buildIndex() {
    let html = fs.readFileSync(indexSrc, 'utf-8');

    html = html.replace(
        /<link rel="stylesheet" href="\/src\/styles\/(.*?)" \/>/g,
        (match, cssFile) => {
            const cssPath = path.join(srcDir, 'styles', cssFile);
            let cssContent = fs.readFileSync(cssPath, 'utf-8');

            cssContent = cssContent.replace(
                /url\(['"]?\.\.\/assets\/(.*?)['"]?\)/g,
                'url(./assets/$1)'
            );

            return `<style>${cssContent}</style>`;
        }
    );

    html = html.replace(
        /<script.*?src="\/?src\/scripts\/(.*?)".*?><\/script>/g,
        () => {
            const scriptsPath = path.join(srcDir, 'scripts');
            const scriptFiles = fs
                .readdirSync(scriptsPath)
                .filter((file) => file.endsWith('.js'));
            const scriptsContent = scriptFiles
                .map((file) => {
                    const filePath = path.join(scriptsPath, file);
                    let scriptContent = fs.readFileSync(filePath, 'utf-8');

                    scriptContent = scriptContent.replace(
                        /(['"])src\/data\/(.*?)\1/g,
                        '$1./data/$2$1'
                    );

                    return scriptContent;
                })
                .join('\n');
            return `<script type="module">${scriptsContent}</script>`;
        }
    );

    html = html.replace(
        /<link rel="icon" href="\/src\/assets\/(.*?)" \/>/g,
        '<link rel="icon" href="./assets/$1" />'
    );

    html = html.replace(/src="\/src\/data\/(.*?)"/g, 'src="./data/$1"');

    html = html.replace(/<img\s+src="\/src\/assets\/(.*?)"/g, '<img src="./assets/$1"');

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
