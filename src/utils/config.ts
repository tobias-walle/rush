export const DEVELOPMENT: boolean = process.env.NODE_ENV !== 'production';

// Activate client side rendering in the development environment, in order to get hot reloading to work
export const RENDER_CSS_ON_CLIENT: boolean = DEVELOPMENT;
