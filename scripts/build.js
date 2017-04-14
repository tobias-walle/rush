#!/usr/bin/env node
const helpers = require('./utils/helpers');
const path = require('path');
const cp = require('child_process');
const colors = require('colors');
const Logger = require('./utils/logger');

// Config
// - Arguments
const ENVIRONMENTS = ['production', 'development'];

const ARGUMENTS = {
  'ENVIRONMENT': ENVIRONMENTS
};

// - Options
const OPTIONS = {
  target: {
    options: ['client', 'server', 'api'],
    multiple: true,
    description: 'Define one or several target that should be compiled. The different targets are separated by a comma.' +
    ' If nothing is set, all targets will be compiled.'
  },
  watch: {
    options: [true, false],
    description: 'Watches the build and updates on changes.'
  },
  callback: {
    description: 'Can be used only in combination of the --watch Option. Command that should be executed after the compilation.' +
    'If the process ends the callback will be called again after the next build.'
  },
  forceRestart: {
    description: 'Can be used in combination with the --callback Option. If the option is set, the callback will be ' +
    'executed again after every new build. If the previous callback is still running it will be terminated.'
  },
};

// - Paths
const WEBPACK_BASE_PATH = './webpack';

// Parses the command line arguments
let {environment, watch, target = OPTIONS.target.options, callback, forceRestart} = require('./utils/ArgumentParser')(ARGUMENTS, OPTIONS);

// Helper to build the webpack config path for a specific target
let buildWebpackConfigPath = (target) => {
  return `${WEBPACK_BASE_PATH}/webpack.${target}.config.${environment}.js`;
};

// Create a logger
const logger = new Logger(false, false, true);
let log = (msg) => {
  logger.log(msg);
};


// Counter for checking how many workers have completed their first run
let numberOfWorker = target.length;
let numberOfWorkerFinishedBuilding = 0;

let callbackProcess = null;
let startWorker = (target, color) => {
  let webpackConfigPath = path.resolve(buildWebpackConfigPath(target));

  let workerConfig = {webpackConfigPath, environment, watch, target, color};
  let worker = cp.fork(__dirname + '/utils/buildWorker');
  worker.on('message', (message) => {
    if (message === 'compiled') {
      if (++numberOfWorkerFinishedBuilding === numberOfWorker && callback) {
        const executeCommand = () => {
          log('Execute: ' + callback.blue);
          let words = callback.split(' ');

          let command = words[0];
          let args = words.slice(1);

          callbackProcess = cp.spawn(command, args, {
            stdio: 'inherit'
          });
          if (forceRestart) {
            numberOfWorkerFinishedBuilding = 0;
          }
          callbackProcess.on('close', (code) => {
            // Reset number of worker
            numberOfWorkerFinishedBuilding = 0;
            callbackProcess = null;
          });
        };

        if (callbackProcess !== null) {
          // Kill old process if it exists
          log('Close old process...');
          helpers.onProcessClosed(callbackProcess, () => {
            callbackProcess = null;
            executeCommand();
          });
          callbackProcess.kill('SIGINT');
        } else {
          executeCommand();
        }
      }
    }
  });

  worker.send(JSON.stringify(workerConfig));
  return worker;
};


let workers = [];
let logColors = {
  'client': 'cyan',
  'server': 'yellow',
  'api': 'green',
  'default': 'magenta'
};
for (let t of target) {
  const color = logColors[t] || logColors['default'];
  workers.push(startWorker(t, color));
}

// Setup clean up of the child processes
let cleanUp = () => {
  // Cleanup worker
  setTimeout(() => {
    workers.forEach((w) => {
      let killed = false;
      w.kill('SIGINT', () => {
        killed = true;
      });
      setTimeout(() => {
        if (!killed) {
          // Force kill if SIGINT takes to much time
          w.kill('SIGKILL');
        }
      }, 500)
    });
  });
};
helpers.onProcessClosed(process, cleanUp);

