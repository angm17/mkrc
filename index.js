#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

createComponent = (component, config, done) => {
	if (typeof config === "function") {
		done = config;
	}
	let cssPath, cssDir;
	console.log(config.component);
	const componentDir = !config.folder ? path.join(process.cwd(), config.component) : path.join(process.cwd(),  config.component, component);
	if (config.css) {
		cssDir = !config.folder ? path.join(process.cwd(), config.css) : path.join(process.cwd(), config.css, component);
	}else{
		cssDir = componentDir;
	}
	if (componentDir === cssDir) {
		cssPath = '.';
	}else{
		cssPath = path.relative(componentDir,cssDir);
		cssPath = cssPath.split(path.sep);
		cssPath[0] = cssPath[0] !== '..' ? (cssPath[0] ? `./${cssPath[0]}` : '.'): cssPath[0];
		cssPath = cssPath.join('/');
	}
	if (config.component) {
		mkdirp.sync(componentDir);
	}
	if (config.css && config.css !== config.component) {
		mkdirp.sync(cssDir)
	}
	const componentJs = `import React, { Component } from 'react';
${config.css !== false ? `import '${cssPath}/${component.toLowerCase()}.css';\n\n` : '\n'}class ${component} extends Component {
	render() {
		return (
			<div className="${component.toLowerCase()}">
			<h1>${component}</h1>
			</div>
		);
	}
}

export default ${component};`;
	fs.writeFile(path.join(componentDir, `${component}.js`), componentJs, (err) => {
	  if (err) {
	  	done(err)
	  }
	  if (config.css !== false) {
	  	const componentCss = `.${component.toLowerCase()} h1{
	font-size: 40px;
	color: #0094ff;
}`;
	  	fs.writeFile(path.join(cssDir, `${component.toLowerCase()}.css`), componentCss, (err) => {
		  if (err) {
		  	done(err)
		  }
		  done(null)
		});
	  }else{
	  	done(null)
	  }
	});
	
}

module.exports = createComponent;




