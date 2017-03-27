FROM yarnpkg/node-yarn:node7

# Create app folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependecies
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install --pure-lockfile

# Copy other files
COPY . /usr/src/app/

# Build
RUN npm run build:prod

EXPOSE 3000
CMD ["node", "./dist/server/server.js"]

