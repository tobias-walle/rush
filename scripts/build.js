#!/usr/bin/env node
const helpers = require('./utils/helpers');
const path = require('path');
const cp = require('child_process');
const colors = require('colors');

// Config
// - Arguments
const ENVIRONMENTS = ['production', 'development'];

const ARGUMENTS = {
  'ENVIRONMENT': ENVIRONMENTS
};

// - Options
const OPTIONS = {
  target: {
    options: ['client', 'server'],
    description: 'Define the target that should be compiled. If nothing is set both targets will be compiled.'
  },
  watch: {
    options: [true, false],
    description: 'Watches the build and updates on changes.'
  },
  afterFirstRun: {
    description: 'Can be used only in combination of the --watch Option. Command that should be executed after the first compilation.'
  },
};

// - Paths
const WEBPACK_BASE_PATH = './webpack';

// Parses the command line arguments
let { environment, watch, target, afterFirstRun } = require('./utils/ArgumentParser')(ARGUMENTS, OPTIONS);

// Helper to build the webpack config path for a specific target
let buildWebpackConfigPath = (target) => {
  return `${WEBPACK_BASE_PATH}/webpack.${target}.config.${environment}.js`;
};

// Create a logger
let log = (msg) => {
  let date = new Date();
  let logPrefix = (`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] `.bold);
  console.log(`${logPrefix}${msg}`);
};


// Counter for checking how many workers have completed their first run
let numberOfWorker = target ? 1 : OPTIONS.target.options.length;
let numberOfWorkerFinishedFirstRun = 0;

let startWorker = (target, color) => {
  let webpackConfigPath = path.resolve(buildWebpackConfigPath(target));

  let workerConfig = {webpackConfigPath, environment, watch, target, color};
  let worker = cp.fork(__dirname + '/utils/buildWorker');
  worker.on('message', (message) => {
    if (message === 'first-run') {
      if (++numberOfWorkerFinishedFirstRun === numberOfWorker && afterFirstRun) {
        log('Execute: ' + afterFirstRun.blue);
        let words = afterFirstRun.split(' ');

        let command = words[0];
        let args = words.slice(1);

        let firstRunProcess = cp.spawn(command, args, {
          stdio: 'inherit'
        });
        firstRunProcess.on('error', (err) => {
          console.error(err);
        });
      }
    }
  });

  worker.send(JSON.stringify(workerConfig));
  return worker;
};


let workers = [];
if (target) {
  workers.push(startWorker(target, 'yellow'));
} else {
  let logColors = ['yellow', 'cyan', 'red', 'magenta'];
  let i = 0;
  for (let target of OPTIONS.target.options) {
    workers.push(startWorker(target, logColors[i++ % logColors.length]));
  }
}

// Setup clean up of the child processes
let cleanUp = () => {
  log('Clean Up Workers');
  // Cleanup worker
  setTimeout(() => {
    workers.forEach((w) => w.kill('SIGINT'));
  });
};
process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('SIGTERM', cleanUp);
