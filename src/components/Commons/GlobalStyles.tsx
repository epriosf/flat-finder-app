import { createGlobalStyle } from 'styled-components';
import BackgroundImage from './Login-signup.jpg';
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  padding: 0;
  background: url(${BackgroundImage}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  }
`;

export default GlobalStyles;
