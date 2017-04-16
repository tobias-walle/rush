#!/usr/bin/env node
const spawn = require('child_process').spawn;
const yoCommand = 'yo';
const firstArgument = process.argv[2];
const isFirstArgumentAnOption = firstArgument[0] === '-';
const subGenerator = firstArgument && !isFirstArgumentAnOption ? firstArgument : 'app';
const generatorName = `rush:${subGenerator}`;
const parameterStart = isFirstArgumentAnOption ? 2 : 3;
const arguments = [generatorName].concat(process.argv.slice(parameterStart));

spawn(yoCommand, arguments, {stdio: 'inherit'});

