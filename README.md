# mkrc - Make React Component

Small command line tool written in JavaScript/NodeJs, helps you saving time by creating ReactJs components using the basic boilerplate from the create-react-app cli.

## Instalation

```bash
> npm install -g https://github.com/angm17/mkrc.git
```

## Usage

```bash
> mkrc Component
```

or multiples components at the same time
```bash
> mkrc Component1 Component2 Component3 ComponentN
```

## Aditional params:
* Component folder: -c
* Css folder: -s
* Name Folder: -f
* Create config file: -g
* -u 


By default, mkrc creates the component in the same folder where you're calling it inside a folder with the same name as your component. However, you can pass the folder you want to use as params:
	
```bash
> mkrc ComponentName -c "./components" -s "./css folder" 
```
*This will create: **"./components/ComponentName/ComponentName.js " and "./css folder/ComponentName/componentname.css"***

**You can create multiple components at the same time**
```bash
> mkrc Component1 Component2 ComponentN -c '/components' -s '/css'
```

**If you don't specify a css folder, mkrc will use the same folder as the component folder:**

```bash
> mkrc ComponentName -c ./components
```
*This will create: **"./components/ComponentName/ComponentName.js"** and **"./components/ComponentName/componentname.css"***

Css Folder (-s) can take false as a option, by doing this no css file will be created nor imported in the component.

```bash
> mkrc ComponentName -c "/components" -s false
```
*This will create: **"./components/ComponentName/ComponentName.js"***

If you don't want mkrc to create a folder with the same name as your component, you can use the name folder param (-f):
```bash
> mkrc ComponentName -c "./components" -f
```

*This will create: **"./components/ComponentName.js"** and **"./components/componentname.css"***


## Aditional info:

If you find tiresome typing over and over the aditional params, you can create a config.mkrc.js file manually or adding -g. This will take the current params and save them on a new file, this way, the next time you call mkrc it will take that config and use it to create the new components.
```bash
> mkrc ComponentName -c "./components" -g
```


config.mkrc.js

```javascript
module.exports = {
	"folder": true,
	"component": "./components",
	"css":"./css"
}
```


**CLI params take priority over config.mkrc.js file, but if you add the flag -u it will take the config file an and cli at the same time, overwriting anything saved in the config file**

*Let's assume you have a config.mkrc.js file with the same content as the one above:*

```bash
> mkrc Profile -s false -u
```
*This will create: **"./components/ComponentName/ComponentName.js"*** taking the component folder from the config file and the css false from the command line.

**You can also save that if you want:**
```bash
> mkrc Profile -s false -u -g
```

*That will overwrite the config.mkrc.js file with your new data.*
