# <%- name %>
<% if (description) { -%>
> <%- description %>
<% } -%>

## Get Started
Run `yarn install` to download the dependencies. You can also install the dependencies via npm, but yarn is recommended.

Run `yarn start` to start the development server. Then visit [http://localhost:3000](http://localhost:3000) to see the 
application. This project uses [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) on 
the client and the server side, so code changes will be loaded automatically.

## Code Scaffolding
The project uses [Rush](https://github.com/TobiasWalle/rush) for scaffolding.

For a list of the available commands and other features please refer to the 
[Rush Documentation](https://github.com/TobiasWalle/rush).

## Build
Run `yarn run build:prod` to build the production code. This generates a `client`, `server` and `api` folder under
`dist`. To start the production server open `dist/server/server.js` and `dist/api/api.js`.

## Docker
Run `docker-compose up` to start the web server and the api server in a docker container. For more details, please refer to the 
[Docker Documentation](https://docs.docker.com/engine/getstarted/step_four/#step-2-build-an-image-from-your-dockerfile)
and the [Docker Compose Documentation](https://docs.docker.com/compose/).

## Unit Testing
Run `yarn test` to start the unit tests with [Karma](https://karma-runner.github.io/1.0/index.html).

## E2E Testing
Run `yarn run webdriver:update` first to update the webdriver. 
Run `yarn run webdriver:start` to start the webdriver.

Run `yarn run test:e2e` to execute the end-to-end tests with [protractor](http://www.protractortest.org).
It is required that the webdriver and the web server are running.
For more details, please refer
to the [protractor documentation](http://www.protractortest.org/#/tutorial).

## Further help
For more information about the available features and best practices of [Rush](https://github.com/TobiasWalle/rush)
check out the [Documentation](https://github.com/TobiasWalle/rush).

## License
<%- license ? license + ' ' : '' -%>© <%- author %>
