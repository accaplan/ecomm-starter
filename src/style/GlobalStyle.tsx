import { createGlobalStyle, css } from "styled-components";
import { scale } from "./theme";

const style = css`
  :root {
    ${scale.cssSizeVars}
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
  ${style}
`;

export default GlobalStyle;
