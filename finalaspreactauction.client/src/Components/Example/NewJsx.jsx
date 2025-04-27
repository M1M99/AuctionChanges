import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    margin: 0;
    font-family: Arial, sans-serif;
  }
  button {
    background-color: ${(props) => props.theme.buttonBackground};
    color: ${(props) => props.theme.color};
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    opacity: 0.8;
  }
  .container {
    background-color: ${(props) => props.theme.containerBackground};
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    margin: auto;
  }
`;

const App111= () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <GlobalStyle />
            <div>
                <h1>Theme Switcher</h1>
                <div className="container">
                    <p>Bu, tema deðiþtirebileceðiniz bir uygulamadýr.</p>
                    <button onClick={toggleTheme}>
                        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
                    </button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App111;