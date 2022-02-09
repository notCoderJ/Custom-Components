import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    overflow-x: hidden;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
