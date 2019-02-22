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
| `yarn serve` or `yarn start` | Start the development server and compile assets when changes are made. |
| `yarn build` | Compile assets and optimize them for production. |