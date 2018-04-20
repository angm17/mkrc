#!/usr/bin/env node
const commandLineArgs = require('../node_modules/command-line-args');
const mkrc = require('../index');
const fs = require('fs');
const path = require('path');
const info = `
######################################
mkrc - Make React Component

Usage:

	mkrc Component 
	mkrc Component1 Component2 Component3 ComponentN

Aditional params:
	* Component folder: -c 
	* Css folder: -s
	* Name Folder: -f
	* Create config file: -g
	* -u 


By default, mkrc creates the component in the same folder where you're calling it inside a folder with the same name as your component. However, you can pass the folder(s) you want to use as params:

	command: mkrc ComponentName -c "./components" -s "./css folder" 
	This will create: "./components/ComponentName/ComponentName.js " and "./css folder/ComponentName/componentname.css"

You can create multiple components at the same time:
	// mkrc Component1 Component2 ComponentN -c '/components' -s '/css'

If you don't specify a css folder, mkrc will use the same folder as the component folder:
	command: mkrc ComponentName -c ./components
	This will create: "./components/ComponentName/ComponentName.js" and "./components/ComponentName/componentname.css"

If you don't want mkrc to create a folder with the same name as your component, you can use the name folder param (-f):
	mkrc ComponentName -c "./components" -f
	This will create: "./components/ComponentName.js" and "./components/componentname.css"


Aditional info:

	If you find tiresome typing over and over the aditional params, you can create a config.mkrc.js file adding -g. This will take the current params and save them on a new file, this way, the next time you call mkrc it will take that config and use it to create the new components.
	mkrc ComponentName -c "./components" -g

You can find more info here
https://github.com/angm17/mkrc

######################################`;
const optionDefinitions = [
  { name: 'component', type: String, multiple: true, defaultOption: true },
  { name: 'ComponentFolder', alias: 'c', type: String },
  { name: 'cssFolder', alias: 's', type: String },
  { name: 'nameFolder', alias: 'f', type: Boolean},
  { name: 'configFile', alias: 'g', type: Boolean},
  { name: 'help', alias: 'h', type: Boolean},
  { name: 'update', alias: 'u', type: Boolean}
];

function configFile(configObject){
	return `module.exports = ${JSON.stringify(configObject, null, '\t')}`;
}
const options = commandLineArgs(optionDefinitions)

if (Object.keys(options).length === 0 || (Object.keys(options).length === 1  && options.help === true)) {
	console.log(info);
	process.exit();
}

/*Config*/
let config;
try {
	config = require(path.join(process.cwd(), 'config.mkrc'))
}catch (e) {
	if (e instanceof Error && e.code === "MODULE_NOT_FOUND"){
		config = {};
	}
	else{
		throw e;
	}
}

if ((options.ComponentFolder || options.cssFolder || options.configFile) && !options.update) {
	config = {};
	config.folder = true;
}

//component folder config.
if (typeof config.component === 'undefined' || typeof config.component === 'boolean' || typeof config.component === 'object') {
	if (options.ComponentFolder) {
		config.component = options.ComponentFolder;
	}else{
		config.component = `.${path.sep}`;
	}
}else if(typeof config.component !== 'undefined' && options.ComponentFolder){
	if (options.ComponentFolder) {
		config.component = options.ComponentFolder;
	}else{
		config.component = `.${path.sep}`;
	}
}

//css folder config
if (typeof config.css === 'undefined') {
	if (options.cssFolder) {
		if (options.cssFolder === 'false') {
			config.css = false;
		}else{
			config.css = options.cssFolder;
		}
	}
}else if(typeof config.css !== 'undefined' && options.cssFolder){
	if (options.cssFolder === 'false') {
		config.css = false;
	}else{
		config.css = options.cssFolder;
	}
}


//folder name config
if (typeof config.folder  === 'undefined' || typeof config.folder !== 'boolean') {
	if (typeof options.nameFolder !== 'undefined') {
		config.folder = !options.nameFolder;
	}else{
		config.folder = true;
	}
}else if(typeof config.folder !== 'undefined' && typeof options.nameFolder !== 'undefined'){
	if (options.nameFolder) {
		config.folder = !options.nameFolder;
	}
}



if (typeof options.configFile !== 'undefined' && options.configFile === true ) {
	fs.writeFile(path.join(process.cwd(), `config.mkrc.js`), configFile(config), (err) => {
		if (err) throw err
		console.log('Config.mkrc.js file created.')	
	});
}

if (typeof options.component !== 'undefined') {
	options.component.forEach(component => mkrc(component.replace(/\s+/g, ''), config, err =>{
		if (err) {
			throw err;
		}
		console.log(`Component ${component} succesfully created`)
	}));
}



