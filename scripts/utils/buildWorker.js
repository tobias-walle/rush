#!/usr/bin/env node
/*
 This is s worker, that is responsible for the webpack building process. To start it, you have to "fork" the file and send
 a message with the arguments as a json. The following arguments are possible:
 webpackConfigPath: The path to the webpack config file, which is used for the build.
 environment: The environment to build ("development" or "production").
 target: The target to build for ("client" or "server").
 watch?: Should the webpack be watching after the build is completed. The default is false.
 color?: Override the prefix color of the log. This can help to differentiate between different workers.
 */

const Rx = require('rxjs');
const webpack = require('webpack');
const colors = require('colors');
const rimraf = require('rimraf');

let watcher;

function cleanup(folder) {
  return Rx.Observable.create((observer) => {
    console.log('Cleanup "' + folder + '"...');
    rimraf(folder, {}, () => {
      observer.next();
      observer.complete();
    });
  });
}

process.on('message', (message) => {
  let {webpackConfigPath, environment, watch, target, color} = JSON.parse(message);

  let webpackConfig = require(webpackConfigPath);
  cleanup(webpackConfig.output.path).subscribe(() => {
    // Setup Logging
    let log = (msg) => {
      let date = new Date();
      let logPrefix = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${environment}|${target}] `[color];
      console.log(`${logPrefix}${msg}`);
    };

    let callback = (err, stats) => {
      if (err) {
        console.error(`Compile Error:${err}`.red);
        log(stats.toString('normal'));
      } else {
        let {startTime, endTime} = stats;
        log(`Bundled in ${endTime - startTime} ms`);
        log(stats.toString('normal'));
        if (watch) {
          // Send a message to the parent process that the first run is completed
          process.send('compiled');
          log('Watching for changes...');
        } else {
          process.exit(0);
        }
      }
    };

    // Setup Compiler
    let compiler = webpack(webpackConfig);

    compiler.plugin('compilation', () => {
      log(`Start bundling`);
    });

    if (watch) {
      watcher = compiler.watch({
        aggregatedTimeout: 1000,
        poll: 1000,

      }, callback);
    } else {
      compiler.run(callback);
    }
  })
});

process.on('exit', () => {
  if (watcher) {
    watcher.unwatch();
  }
});
