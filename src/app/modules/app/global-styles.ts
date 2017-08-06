import { injectGlobal } from 'styled-components';
const Roboto = require('@app/assets/fonts/roboto-v15-latin-regular.woff');

export const loadGlobalStyles = () => {
  //language=PostCSS
  injectGlobal`
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      src: local('Roboto'), local('Roboto-Regular'), url('${Roboto}'), format('woff');
    }

    body {
      font-family: 'Roboto', Sans-Serif;
    }
  `;
};