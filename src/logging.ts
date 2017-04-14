import {
  DateFormat, DateFormatEnum, LFService, LogFormat, LoggerFactoryOptions, LogGroupRule,
  LogLevel
} from 'typescript-logging';
import { DEVELOPMENT } from './config';

// Define the log format
const logFormat = new LogFormat(
  new DateFormat(DateFormatEnum.YearDayMonthTime, '-'),
  true,
  true
);

// Set log level
const logLevelServer = DEVELOPMENT ? LogLevel.Debug : LogLevel.Info;
const logLevel = DEVELOPMENT ? LogLevel.Debug : LogLevel.Error;

// Define the log rules
const options = new LoggerFactoryOptions()
  .addLogGroupRule(new LogGroupRule(new RegExp('server.+'), logLevelServer, logFormat))
  .addLogGroupRule(new LogGroupRule(new RegExp('.+'), logLevel, logFormat));

export const loggerFactory = LFService.createNamedLoggerFactory('LoggerFactory', options);
