FROM node:alpine

RUN node -v

# Create app folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependecies
COPY package.json /usr/src/app
RUN npm install

# Build
COPY . /usr/src/app/
RUN npm run build:prod

EXPOSE 3000
CMD ["node", "./dist/server/server.js"]

