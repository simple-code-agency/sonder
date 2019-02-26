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

**Default:** `{ main: ['./scripts/main.js', './styles/main.scss'] }`

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