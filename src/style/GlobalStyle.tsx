import { createGlobalStyle, css } from "styled-components";
import { scale, size } from "./theme";
import reset from "styled-reset";

const TEMPORARY_STYLES_TO_DELETE = css`
  html,
  body {
    font-family: helvetica, arial, sans-serif;
  }
  h5 {
    font-size: ${size[0]};
  }
  h4 {
    font-size: ${size[1]};
  }
  h3 {
    font-size: ${size[2]};
  }
  h2 {
    font-size: ${size[3]};
  }
  h1 {
    font-size: ${size[4]};
  }
`;

const style = css`
  :root {
    ${scale.cssSizeVars}
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
    appearance: none;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${style}
  ${TEMPORARY_STYLES_TO_DELETE}
`;

export default GlobalStyle;
