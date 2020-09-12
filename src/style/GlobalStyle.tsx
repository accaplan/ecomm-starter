import { createGlobalStyle, css } from "styled-components";
import { scale } from "./theme";

const style = css`
  :root {
    ${scale.cssSizeVars}
  }
`;

const GlobalStyle = createGlobalStyle`
  ${style}
`;

export default GlobalStyle;
