# Sonder

> **sonder** /ˈsɔn.dər/, _n._ the realization that each random passerby is living a life as vivid and complex as your own—populated with their own ambitions, friends, routines, worries and inherited craziness—an epic story that continues invisibly around you like an anthill sprawling deep underground, with elaborate passageways to thousands of other lives that you’ll never know existed, in which you might appear only once, as an extra sipping coffee in the background, as a blur of traffic passing on the highway, as a lighted window at dusk.
  \
  \
  \- _John Koeing, The Dictionary of Obscure Sorrows, 2012_

**Sonder** is a multi-environment no-framework Webpack starter. It uses/supports the following:

| Tool | Description |
| :--- | :---------- |
| [Yarn](https://yarnpkg.com/en/) | Package manager. |
| [Webpack](https://webpack.js.org/) | Module bundler. |
| [Babel](https://babeljs.io/) | JavaScript transpiler. |
| [SASS](https://sass-lang.com/) | CSS preprocessor. |
| [TypeScript](https://www.typescriptlang.org/) | (Optional) JavaScript type checking superset. |
| [BrowserSync](https://browsersync.io/) | Browser utility tool. |
| [PostCSS](https://postcss.org/) | CSS transformation and optimization. |
| [ESLint](https://eslint.org/) | JavaScript linting tool. |
| [Stylelint](https://github.com/stylelint/stylelint) | CSS/SCSS linting tool. |
| [TSLint](https://palantir.github.io/tslint/) | TypeScript linting tool. |
| ... | Other tools and plugins used by the above. |

The idea is to use one project setup to rule them all. What it means is that you can use one frontend project and dispatch it on different backend systems, other frontend projects, build on different environments, etc.

## Requirements

- [Node.js](https://nodejs.org/en/) >= 8.5.0
- [Yarn](https://yarnpkg.com/en/)

## Structure
```
sonder
├── .eslintrc.js
├── .gitignore
├── .stylelintrc.js
├── babel.config.js
├── package.json
├── README.md
├── sonder.config.js
├── tsconfig.json
├── tslint.json
├── yarn.lock
├── cli/
├── env/
├── node_modules/
├── public/
└── src/
    ├── fonts/
    ├── images/
    ├── scripts/
    ├── styles/
    └── views/
```

## Installation
To install all the dependencies, run:
```bash
yarn
# or
yarn install
```

## Development
Once all the dependencies are installed, you can use the following commands:

| Command | Description |
| :--- | :---------- |
| `yarn serve <env_name>` or `yarn start <env_name>` | Start the development server and compile assets when changes are made for given environment. |
| `yarn build <env_name>` | Compile assets and optimize them for production for given environment. |

## Configuration
Sonder configuration has two parts - **compiler** and **environment** configuration.

> _CWD_ - current working directory. Root directory from where Sonder process is run (where `package.json` is).

## Compiler configuration
Compiler configuration is done through `sonder.config.js` file. It's nothing more than simplified configuration file for Webpack and it's dependencies.

### Options
### `alias`
**Type:** `Object`

**Default:** `{}`

**Webpack:** [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias)

Create aliases to `import` or `require` modules more easily. Every specified alias is resolved from CWD. This allows you to avoid writing a whole bunch of `../`.

Example:
```js
// sonder.config.js
module.exports = {
  // ...
  alias: {
    '@': 'src'
  }
  // ...
}
```
Now, you can use the following syntax:

```js
// src/scripts/router.js
export default function() { /* ... */ };
```
```js
// src/scripts/layout/components/navigation/main/index.js
import Router from '@/scripts/router'; // Instead of '../../../../router'.
```

### `context`
**Type:** `String`

**Default:** `'src'`

**Webpack:** [`context`](https://webpack.js.org/configuration/entry-context/#context)

The base directory, for resolving entry points and loaders from Webpack configuration. It is resolved from CWD.

### `entry`
**Type:** `String|Array|Object|Function`

**Default:**
```
{
  main: [
    './scripts/main.js',
    './styles/main.scss'
  ]
}
```

**Webpack:** [`entry`](https://webpack.js.org/configuration/entry-context/#entry)

The point(s) to enter the application. At this point, application starts executing. By default, it uses two files - one for scripts and one for styles - so that styles don't have to be imported inside JavaScript.

### `env`
**Type:** `Object`

**Default:**
```
{
  defaultEnv: null,
  root: 'env',
  suffix: '.env',
  localSuffix: '.env.local'
}
```

**Webpack:** -

Configuration object for environment settings.

### `env.defaultEnv`
**Type:** `null|String`

**Default:** `null`

**Webpack:** -

Name of the environment to use if no environment given when starting Yarn script.

### `env.localSuffix`
**Type:** `String`

**Default:** `.env.local`

**Webpack:** -

Suffix to add to local environments. Local environments are usually ignored by Git as they are subjective for each user. They **always** take precedence over global environments.

### `env.root`
**Type:** `String`

**Default:** `env`

**Webpack:** -

Name of the folder where environments are. It is always resolved from CWD.

### `env.suffix`
**Type:** `String`

**Default:** `.env`

**Webpack:** -

Suffix used by global environments. For example, for the default setting, `static.js` is an **invalid** environment name. `static.env.js` is the correct one.

### `failOnError`
**Type:** `boolean`

**Default:** `false`

**Webpack:** -

If set to `true`, it will fail if any error while loading configuration or environment happens. If set to `false`, it will use default values.

### `globals`
**Type:** `Object`

**Default:** `{}`

**Webpack:** [`ProvidePlugin`](https://webpack.js.org/plugins/provide-plugin/)

Automatically load modules without need to `import` or `require` them everywhere - make them "global".

Example:
```js
// sonder.config.js
module.exports = {
  // ...
  globals: {
    '$': 'jquery',
    'jQuery': 'jquery'
  }
  // ...
}
```

Now, you can use jQuery throughout your application on a global level.

```js
// src/scripts/main.js
$(document).ready(function() { /* ... */ }); // No need for import.
```

> Note: You still need to install jQuery as a dependency using `yarn add jquery`.

### `includeModules`
**Type:** `Array`

**Default:** `[]`

**Webpack:** [`Rule.exclude`](https://webpack.js.org/configuration/module/#ruleexclude)

When bundling files, Sonder will exclude scripts from `node_modules` folder. However, some libraries require their dependencies to be run through Webpack too. This setting allows for specific modules to be included in the bundling process.

Example:
```js
// sonder.config.js
module.exports = {
  // ...
  includeModules: ['dom7', 'ssr-window', 'swiper']
  // ...
}
```

This will enable Dom7, ssr-window and Swiper to be run through Webpack, since [Swiper](https://idangero.us/swiper/get-started/) requires it.

### `resolve`
**Type:** `Array`

**Default:** `['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx']`

**Webpack:** [`resolve.extensions`](https://webpack.js.org/configuration/resolve/#resolveextensions)

Automatically resolve certain extensions. Allows imports without defining an extension.

### `views`
**Type:** `Object`

**Default:**
```
{
  root: 'src/views',
  ext: 'njk'
}
```

**Webpack:** -

Nunjucks views configuration object.

### `views.ext`
**Type:** `String`

**Default:** `'njk'`

**Webpack:** -

Defines extension for views.

### `views.root`
**Type:** `String`

**Default:** `'src/views'`

**Webpack:** -

Root location of the views.

## Environment configuration

### Options

### `cleanFiles`

**Type:** `Array`

**Default:** `[]`

**Webpack:** -

Specifies the list of files/folders to clean on each Webpack build process. Paths are always resolved from CWD.

Example:
```js
module.exports = {
  // ...
  cleanFiles: ['public/assets']
  // ...
}
```
> Note: When in development mode, only on initial build will folder/file be cleaned.

### `copyFiles`

**Type:** `Array`

**Default:** `[]`

**Webpack:** -

Specifies the list of files/folders to copy on each Webpack build process. Paths are always resolved from CWD.

Example:
```js
module.exports = {
  // ...
  copyFiles: [
    {
      from: 'src/**/*',
      to: 'public/assets'
    }
  ]
  // ...
}
```
> Note: Files will be copied only in production mode. In development mode, they will be served from memory.

### `devServer`
**Type:** `Object`

**Default:**
```
{
  port: 8000,
  bsPort: 3000,
  base: 'public',
  proxy: false
}
```

**Webpack:** -

Configuration object for the development server.

### `devServer.base`

**Type:** `String`

**Default:** `'public'`

**Webpack:** [`devServer.contentBase`](https://webpack.js.org/configuration/dev-server#devservercontentbase)

Tell the server where to serve content from. This is only necessary if you want to serve static files.

### `devServer.bsPort`

**Type:** `Integer`

**Default:** `3000`

**Webpack:** -

Port used by BrowserSync.

### `devServer.port`

**Type:** `Integer`

**Default:** `8000`

**Webpack:** [`devServer.port`](https://webpack.js.org/configuration/dev-server#devserverport)

Port used by Webpack Dev Server.

### `devServer.proxy`

**Type:** `false|String`

**Default:** `false`

**Webpack:** -

Proxies given URL and all it's requests through Webpack Dev Server. Useful for integration with the existing server/backend.

### `output`

**Type:** `Object`

**Default:**
```
{
  filename: 'scripts/[name].js',
  path: 'public/assets',
  publicPath: '/assets/',
  styleFilename: 'styles/[name].css',
  vendorFiles: (path, filename) => `vendor/${path}/${filename}`
}
```

**Webpack:** [`output`](https://webpack.js.org/configuration/output)

Configuration object for output settings.

### `output.filename`

**Type:** `String`

**Default:** `'scripts/[name].js'`

**Webpack:** [`output.filename`](https://webpack.js.org/configuration/output/#outputfilename)

Determines the name of each output bundle. By default, it's set to output into `scripts` folder with the initial name of the file.

### `output.path`

**Type:** `String`

**Default:** `'public/assets'`

**Webpack:** [`output.path`](https://webpack.js.org/configuration/output/#outputpath)

The output directory. It is always resolved from CWD.

### `output.publicPath`

**Type:** `String`

**Default:** `'/assets/'`

**Webpack:** [`output.publicPath`](https://webpack.js.org/configuration/output/#outputpublicpath)

This option specifies the public URL of the output directory when referenced in a browser. The value of the option is prefixed to every URL created by the runtime or loaders. Simple rule: The URL of your `output.path` from the view of the HTML page.

### `output.styleFilename`

**Type:** `String`

**Default:** `'styles/[name].css'`

**Webpack:** -

Determines the name of the output stylesheet. By default, it's set to output into `styles` folder with the initial name of the file.

### `output.vendorFiles`

**Type:** `Function`

**Default:**
```
(path, filename) => `vendor/${path}/${filename}`
```

**Webpack:** -

When Webpack loads dependencies from `node_modules`, they often have some dependencies other than scripts and styles, like fonts, images, etc. This option sets the output path for said assets. By default, it will output into `vendor` folder with each module in it's own subfolder and with initial asset name.

### `output.views`

**Type:** `String`

**Default:** `'public'`

**Webpack:** -

Root location to output compiled Nunjucks pages.
