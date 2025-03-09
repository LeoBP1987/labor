import { createGlobalStyle } from "styled-components";

const EstilosGlobais = createGlobalStyle`
    :root {
        --cor-fonte-primaria: #001F3F;
        --cor-fonte-secundaria: #FFF;
        --cor-primaria: #644FE8;
        --cor-secundaria: #001F3F;
        --cor-terciaria: #93B6F0;
        --cor-quaternaria: #4F6BE8;
        --cor-quintenaria: #228BE6;
        --cor-sextenaria: #4FE8D2;
        --cor-setimaria: #4F9BE8;

        --gradiente-primario: linear-gradient(
            to right,
          rgba(100, 79, 232, 1) 10%,  
          rgba(100, 79, 232, 0.5) 22%,
          rgba(100, 79, 232, 1) 70%, 
          rgba(100, 79, 232, 0.5) 100%
        );
        --gradiente-secundario: linear-gradient(
            to bottom ,
            rgba(100, 79, 232, 0.9) 0%,  
            rgba(204, 204, 204, 0.9) 100%
        );
        --gradiente-terciario: linear-gradient(
            to top,
            rgba(100, 79, 232, 0.9) 0%,  
            rgba(204, 204, 204, 0.9) 100%
        );

        --gradiente-quaternario:  linear-gradient(
            to bottom,
          rgba(100, 79, 232, 1) 0%,  
          rgba(100, 79, 232, 0.5) 25%,
          rgba(100, 79, 232, 1) 50%, 
          rgba(100, 79, 232, 0.5) 100%
        );

        --gradiente-botao-primario: linear-gradient(
            to right,
          rgba(217, 217, 217, 1) 0%,  
          rgba(100, 79, 232, 1) 50%, 
          rgba(100, 79, 232, 1) 100%
        );

        --gradiente-botao-secundario: linear-gradient(
            to left,
          rgba(217, 217, 217, 1) 0%,  
          rgba(100, 79, 232, 1) 50%, 
          rgba(100, 79, 232, 1) 100%
        );

        --gradiente-botao-terciario: linear-gradient(
          to bottom ,
          rgba(247, 234, 0, 1) 0%,
          rgba(247, 234, 0, 0.3) 100%
        );

        --fonte-primaria: "Inter";
    }
    html {
    line-height: 1.15; 
    -webkit-text-size-adjust: 100%; 
    font-family: "Inter", sans-serif;
    font-size: 20px;
    }
    body {
    margin: 0;
    min-height: 100vh;
    }
    main {
    display: block;
    }
    h1 {
    font-size: 2em;
    margin: 0.67em 0;
    }
    hr {
    box-sizing: content-box; 
    height: 0; 
    overflow: visible; 
    }
    a {
    background-color: transparent;
    }
    abbr[title] {
    border-bottom: none; 
    text-decoration: underline; 
    text-decoration: underline dotted; 
    }
    b,
    strong {
    font-weight: bolder;
    }
    code,
    kbd,
    samp {
    font-family: monospace, monospace; 
    font-size: 1em; 
    }
    small {
    font-size: 80%;
    }
    sub,
    sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
    }
    sub {
    bottom: -0.25em;
    }
    sup {
    top: -0.5em;
    }
    img {
    border-style: none;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
    font-family: inherit; 
    font-size: 100%; 
    line-height: 1.15; 
    margin: 0; 
    }
    button,
    input { 
    overflow: visible;
    }
    button,
    select { 
    text-transform: none;
    }
    button,
    [type="button"],
    [type="reset"],
    [type="submit"]
    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
    }
    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
    }
    fieldset {
    padding: 0.35em 0.75em 0.625em;
    }
    legend {
    box-sizing: border-box; 
    color: inherit; 
    display: table; 
    max-width: 100%; 
    padding: 0; 
    white-space: normal; 
    }
    progress {
    vertical-align: baseline;
    }
    textarea {
    overflow: auto;
    }
    [type="checkbox"],
    [type="radio"] {
    box-sizing: border-box; 
    padding: 0; 
    }
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
    height: auto;
    }
    [type="search"] {
    outline-offset: -2px; 
    }
    [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
    }
    ::-webkit-file-upload-button {
    -webkit-appearance: button; 
    font: inherit; 
    }
    details {
    display: block;
    }
    summary {
    display: list-item;
    }
    template {
    display: none;
    }
    [hidden] {
    display: none;
    }
`;

export default EstilosGlobais;
