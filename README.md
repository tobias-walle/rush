# ![logo](https://cdn.rawgit.com/TobiasWalle/rush/731a4434/media/logo.svg)

[![Build Status](https://travis-ci.org/TobiasWalle/typed-react-base.svg?branch=master)](https://travis-ci.org/TobiasWalle/typed-react-base)

Start developing modern Web Applications with React, Typescript, Webpack and a lot more!
Rush gives you all the tools you want, but still leaves you with all the freedom you need!

## Features
### Modular [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) with [Typescript](https://www.typescriptlang.org/)
  Scale your application by using the power of React and Redux, in combination with Typescript.
  Rush provides you with an extreme modular architecture, which allows you to add features without sacrificing
  control.
### SSO you Single Page Application with Server Side Rendering
  Combine the speed of Single Page Applications with the advantages of classic Websites. Rush renders everything
  on the server and after it reaches the client, it becomes a single page application. This allows you to do search
  engine optimization, while providing the best possible experience for the user!
### Never restart again! [Hot Reload](https://webpack.js.org/concepts/hot-module-replacement/#components/sidebar/sidebar.jsx) client and server
  Development speed is important! That's why we hot reload everything. With the help of webpack, we automatically 
  update the server, client and the api server while you are writing code!
### Feel the power of [Webpack](https://webpack.js.org/)
  Webpack is amazing. But it can be pretty overwhelming, especially at the beginning. Rush already sets up everything 
  for you so you can immediately start coding! But you also have all the freedom to customize everything later.
### Concentrate on important stuff! [Generate](http://yeoman.io/) everything
  Generate new modules, components, containers and redux stores with your command line! Rush comes with a lot of
  subgenerators to make your life as easy as possible.
### Be prepared for production with [code splitting](https://webpack.js.org/guides/code-splitting/#components/sidebar/sidebar.jsx), minimizing and [tree shaking](https://webpack.js.org/guides/tree-shaking/)
  We already prepared the production builds for you! Just run the command and your application is ready to be 
  deployed!
### Make it beautiful with [SCSS](http://sass-lang.com/) and auto prefixing
  Define your styles with the full power SCSS. For every component, Rush automatically generates a scss for you.
  Because of auto prefixing, you can completely forget about '-webkit', '-moz' and co.
### An a lot more...
  * Keep your code clean with [TsLint]()
  * Unit testing with [Karma]()
  * E2E testing with [protractor]()
  * Dependency management with [yarn]()
  * Prepared [Docker](https://www.docker.com/) and [DockerCompose](https://docs.docker.com/compose/) config files

## Get Started
Install [yeoman](http://yeoman.io/), generator-rush and yarn from npm:
```bash
$ npm install -g yo generator-rush yarn
```

To generate a new project run:
```bash
$ yo rush
```
Navigate into the project folder:
```bash
$ cd <project-folder>
```
Run `yarn start` and open [http://localhost:3000/](http://localhost:3000/) in your favorite browser.

Everything is setup and you can start developing!

## Scripts
### NPM Scripts
The newly generated project comes with the following npm scripts:

| Script               | Description                                                                                                                        | 
|----------------------|------------------------------------------------------------------------------------------------------------------------------------| 
| start                | Shortcut for `start:dev`                                                                                                           | 
| start:dev            | Build and start the ui server and the api server                                                                                   | 
| start:prod           | Build and start the ui server and the api server for production                                                                    | 
| start:server:dev     | Build and start the ui server                                                                                                      | 
| start:api:dev        | Build and start the api server                                                                                                     | 
| start:server:prod    | Build and start the ui server for production                                                                                       | 
| start:api:prod       | Build and start the api server for production                                                                                      | 
| run:server           | Start the ui server. This commands assumes the server is already build.                                                            | 
| run:api              | Start the api server. This commands assumes the server is already build.                                                           | 
| build:dev            | Build the ui server, api server and client.                                                                                        | 
| build:prod           | Build the ui server, api server and client for production.                                                                         | 
| build:`<target>`:`<env>` | Build for a specific target and environment (Replace `<target>` with `client`, `server` or `api` and `<env>` with `dev` or `prod`) | 
| test                 | Shortcut for `test:dev`                                                                                                            | 
| test:dev             | Run the unit tests with the development build                                                                                      | 
| test:prod            | Run the unit tests with the production build                                                                                       | 
| test:e2e             | Run the protractor e2e tests. Please make sure you run `webdriver:update` and `webdriver:start` before                             | 
| webdriver:update     | Update the selenium webdriver for protractor                                                                                       | 
| webdriver:start      | Start the selenium webdriver for protractor                                                                                        | 
| lint                 | Run tslint to check the project files for errors                                                                                   | 
| lint:fix             | Run tslint and fix errors that can be fixed                                                                                        | 
| check                | Run tslint and the unit tests                                                                                                      | 

### Build Script
All the build processes are handled by an build script, which is located in the `scripts` folder. As an alternative
to the npm scripts, you can use the build script directly:

```bash
./scripts/build.js <enviroment> <options>
```

Run `./scripts/build.js` without any arguments to see the available arguments and options.

_Parameters:_

  _`enviroment`_ The target environment for the build. Possible values are `production` and `development`. 
  
_Options:_

  `--target` The target of the build. Possible values are `client`, `server` or `api`. There are also multiple values
  possible if there are separated by a comma. For example `client,server` will select `client` and `server` as a target.

  `--watch` If this flag is enabled, the builder will watch the build and update the server on changes.
  
  `--callback` Callback that will be executed after the builds are finished. If the callback process ends, the callback
  will be restarted on the next build.
  
  `--force-restart` This option can only be used in combination with the `callback` option. If set, this forces the
  callback to restart on every new build, even if the process is still running.

## Generators
The following generators are available:

  * [rush | rush:app](#app)
  * [rush:module](#module)
  * [rush:component](#component)
  * [rush:container](#container)
  * [rush:duck](#duck)
  
### App
```bash
$ yo rush <arguments> <option>
```
or
```bash
$ yo rush:app <arguments> <option>
```
Setups the app and generates all the boilerplate for you.

_Options:_

  `-h --help` Print the generator's options and usage
  
  `--skip-install` Do not automatically install dependencies
  
  `--upgrade` If true, the generator tries to find an existing generator 
  configuration and just regenerates the project. Set this flag if you want to update an existing project. 
  You have to be in the project folder so yeoman can find the configuration. The default is `false`.

### Module
```bash
$ yo rush:module <arguments> <option>
```
Generates a new module under `./src/app/modules`. A module is a self contained unit which can contain several components
containers and a redux state. It is also a reference point for other generators.

_Arguments:_

  `<name>` The name of the module

_Options:_

  `-h --help` Print the generator's options and usage
 
### Component
```bash
$ yo rush:component <arguments> <option>
```
Generates a new react component in the specific module or under a specific path. This command will also
generate the test and style files for the component.
The default path output is 
`./src/app/modules/<module-name>/components/<component-name>`.

_Arguments:_

  `<name>` The name of the component. It is also possible to prepend a path in front of the name.
  This will create a folder relative to destination of the component. 
  For example `yo trb:component my-folder/my-component` will generate the component in the folder `my-folder`.

_Options:_

  `-h --help` Print the generator's options and usage
  
  `-m --module` The target module the component should generated in. If you are already in a module folder you don't
  need to set this option. In this case, the generator can find the module name automatically.
  
  `-d --destination` Set's the destination folder of the component relative to the current folder. You don't need
  to set this if the `module` option is already defined. But sometimes you want to generate component outside of your
  modules.
  
  `-f --flat` Generates the component files directly into the destination folder, without generating a subfolder
  with the component name. The default is `false`.
 
  `-s --stateless` Generates a stateless component instead of a stateful one. This also means there will be no 
  styles generated for this component. The default is `false`.
 
### Container
```bash
$ yo rush:container <arguments> <option>
```
Generates a new react-redux container for a specific component. For more information checkout their 
[documenation](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
Per default the container will be generated into
`./src/app/modules/<module-name>/containers/<container-name>`.

_Arguments:_

  `<name>` The name of the container. Like in the component generator, it is also possible to prepend a path in 
  front of the name.

_Options:_

  `-h --help` Print the generator's options and usage
  
  `--componentName` Set the name of the component which the container should connect to the store. Per
  default, the component has the same name as the container. The generator assumes that the component is saved
  under `./src/app/modules/<module-name>/components/<component-name>`. If this is not the case, the imports need 
  to be adjusted accordingly.
  
  `-m --module` The target module the container should generated in. If you are already in a module folder you don't
  need to set this option. In this case, the generator can find the module name automatically.
  
  `-d --destination` Set's the destination folder of the container relative to the current folder. You don't need
  to set this if the `module` option is already defined.
 
### Duck
```bash
$ yo rush:duck <arguments> <option>
```
Rush is intended to be used with the [redux modular duck pattern](https://github.com/erikras/ducks-modular-redux).
To reduce the boilerplate code the library [https://github.com/mhoyer/redux-typed-ducks](redux-typed-ducks) is used.
The duck generator can automatically generate a basic duck file for you.

_Arguments:_

  `<name>` The name of the duck. If you want to create the duck into a subfolder, it is possible to prepend a
  path in front of the name.
  
  `<elements>` What actions should the duck have (lowercase, separated by a space)? 
  For example `"get get-all delete"` will create the actions `app/<duck-name>/GET`, `app/<duck-name>/GET_ALL` and `app/<duck-name>/DELETE` 
  and the associated action creators and reducers.

  
_Options:_

  `-h --help` Print the generator's options and usage
 
  `-m --module` The target module the duck should generated in. If you are already in a module folder you don't
  need to set this option. In this case, the generator can find the module name automatically.
  
  `-d --destination` Set's the destination folder of the duck relative to the current folder. You don't need
  to set this if the `module` option is already defined.
 

