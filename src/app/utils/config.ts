export const DEVELOPMENT: boolean = process.env.NODE_ENV !== 'production';
export const IS_SERVER_SIDE: boolean = process.env.IS_SERVER_SIDE;

export const DISABLE_SERVER_SIDE_RENDERING: boolean = false;
export const RENDER_CSS_ON_CLIENT: boolean = DEVELOPMENT;
