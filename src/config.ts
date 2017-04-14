// General Environment
export const DEVELOPMENT: boolean = process.env.NODE_ENV !== 'production';
export const IS_SERVER_SIDE: boolean = process.env.IS_SERVER_SIDE;

// Server Config
export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = process.env.PORT || 3000;

// Webpack dev server config
export const WEBPACK_DEV_HOST = process.env.WEBPACK_HOST || HOST || '127.0.0.1';
export const WEBPACK_DEV_PORT = process.env.WEBPACK_PORT || 3001;

// API Config
export const API_HOST = process.env.API_HOST || HOST || '127.0.0.1';
export const API_PORT = process.env.API_PORT || 3002;

// Other
export const DISABLE_SERVER_SIDE_RENDERING: boolean = false;
// Disable Server Side style rendering in the development environment, so there are no problems with hot reloading
export const DISABLE_SERVER_SIDE_STYLE_RENDERING: boolean = DEVELOPMENT;
