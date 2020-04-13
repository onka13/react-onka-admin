const fs = require('fs');
const path = require('path');
var baseDir = './src/modules/';

var modules = fs.readdirSync(baseDir); //.filter(x => extensions.indexOf(path.parse(x).ext) >= 0);

const routes = {};

for (let i = 0; i < modules.length; i++) {
	const m = path.parse(modules[i]);
	//console.log('m', m.base);
	if (m.ext) continue;
	var moduleFiles = fs.readdirSync(path.join(baseDir, m.base, 'pages'));
	//console.log('files', moduleFiles);
	for (let j = 0; j < moduleFiles.length; j++) {
		var pageConfigJs;
		try {
			pageConfigJs = fs.readFileSync(path.join(baseDir, m.base, 'pages', moduleFiles[j], 'pageConfig.js'), {});
		} catch (error) {
			console.log('err', error.message);
			continue;
		}

		var found = new RegExp(/route: '(.*?)'/, 'gi').exec(pageConfigJs);
		if (!found) continue;
		//console.log('found', found[1]);
		routes[found[1]] = `./${m.base}/pages/${moduleFiles[j]}/pageConfig.js`;
	}
}

var output =
    '// Auto generated file! run `node scriptModulesAll.js`\n' +
    'export default {\n' +
	Object.keys(routes)
		.map(x => {
			return `"${x}": import("${routes[x]}"),`;
		})
		.join('\n') +
	'\n}';
console.log(output);
fs.writeFileSync(path.join(baseDir, 'pageConfigList.js'), output);
