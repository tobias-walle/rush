import './polyfills';
declare const __karma__: any;

// Prevent karma from running
__karma__.loaded = function () {};

// Find tests
const context = (require as any).context('./', true, /\.spec\.tsx?$/);
// Load modules
context.keys().map(context);
__karma__.start();
