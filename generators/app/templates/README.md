# <%- name %>
<% if (description) { -%>
> <%- description %>
<% } -%>

## Get Started
Run `yarn install` to download the dependencies. You can also install the dependencies via npm, but yarn is recommended.

Run `yarn start` to start the development server. Then visit http://localhost:3000 to see the application. This project 
uses [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) on the client
and the server side so code changes will be loaded automatically.

## Code Scaffolding
The project uses [yoeman](http://yeoman.io/) in combination with the 
[Typed React Base Generator](https://www.npmjs.com/package/generator-trb).
This allows the Generation of code snippets.

Run `yo trb:module <name>` to generate a new module.

Run `yo trb:component <name>` to generate a new component.

Run `yo trb:duck <name>` to generate a new [redux duck file](https://github.com/erikras/ducks-modular-redux).

For more details about the available commands please refer to the 
[Typed React Base Documentation](https://github.com/TobiasWalle/typed-react-base).

## Build
Run `npm run build:prod` to build the production code. This generates a `client` and `server` folder under
`dist`. To start the production server open `dist/server/server.js`.

## Docker
Run `docker build` to build a docker image of the project. For more details, please refer to the 
[Docker Documentation](https://docs.docker.com/engine/getstarted/step_four/#step-2-build-an-image-from-your-dockerfile).

## Unit Testing
Run `npm test` to start the unit tests with [Karma](https://karma-runner.github.io/1.0/index.html).

## E2E Testing
Run `npm test:e2e` to execute the end-to-end tests with [protractor](http://www.protractortest.org).
You need to have a selenium server and the application running. For more details, please refer
to the [protractor documentation](http://www.protractortest.org/#/tutorial).

## Further help
For more documentation about the Features of the [Typed React Base](https://github.com/TobiasWalle/typed-react-base)
and the available features and best practices, check out the 
[Documentation](https://github.com/TobiasWalle/typed-react-base).

## License
<%- license ? license + ' ' : '' -%>© <%- author %>
