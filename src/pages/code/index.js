import { Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import React, { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { generateCustomTheme } from "theme";

const genTheme = ({
  baseColor,
  secondaryColor,
  tertiaryColor,
  customComponents,
  fontFamily,
  borderRadius,
}) => {
  const {
    designTokens: designTokensLight,
    themedComponents: themedComponentsLight,
  } = generateCustomTheme({
    mode: "light",
    baseColor,
    secondaryColor,
    tertiaryColor,
    customComponents,
    customization: { fontFamily, borderRadius },
  });
  const {
    designTokens: designTokensDark,
    themedComponents: themedComponentsDark,
  } = generateCustomTheme({
    mode: "dark",
    baseColor,
    secondaryColor,
    tertiaryColor,
    customComponents,
    customization: { fontFamily, borderRadius },
  });
  return {
    designTokensLight,
    designTokensDark,
    themedComponentsLight,
    themedComponentsDark,
  };
};

const ThemeCodePage = () => {
  const themeState = useSelector((state) => state.theme);
  const {
    designTokensLight,
    designTokensDark,
    themedComponentsLight,
    themedComponentsDark,
  } = useMemo(
    () =>
      genTheme({
        baseColor: themeState.baseColor,
        secondaryColor: themeState.secondaryColor,
        tertiaryColor: themeState.tertiaryColor,
        customComponents: themeState.customComponents,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        borderRadius: 16,
      }),
    [themeState]
  );

  const markdown = `
  ### Create MUI Theme
  - \`src/App.js\`
  ~~~js
  import { useMemo, useState } from "react";
  import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
  import { deepmerge } from "@mui/utils";
  import {
    designTokensLight,
    designTokensDark,
    themedComponentsLight,
    themedComponentsDark,
  } from "./theme-utils";

  const generateTheme = (mode) => {
    const designTokens = mode === 'light'? designTokensLight : designTokensDark;
    const themedComponents = mode === 'light'? themedComponentsLight : themedComponentsDark;

    let theme = createTheme(designTokens);
    theme = deepmerge(theme, themedComponents);
    
    return theme;
  }

  function App() {
    const [mode,setMode] = useState('light');

    const theme = useMemo(
      () => generateTheme(mode),
      [mode]
    );
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <>
          AppContents
        </>
      </ThemeProvider>
    );
  }
  
  export default App;
  
  ~~~

  ### Palette with required Colors
  - \`src/theme-utils.js\`
  ~~~js
  export const designTokensLight = ${JSON.stringify(
    designTokensLight,
    null,
    "\t"
  )};
  ~~~

  ~~~js
  export const designTokensDark = ${JSON.stringify(
    designTokensDark,
    null,
    "\t"
  )};
  ~~~

  ### Themed Mui Components
  - \`src/theme-utils.js\`
  ~~~js
  export const themedComponentsLight = ${JSON.stringify(
    themedComponentsLight,
    null,
    "\t"
  )};
  ~~~

  ~~~js
  export const themedComponentsDark = ${JSON.stringify(
    themedComponentsDark,
    null,
    "\t"
  )};
  ~~~
  `;

  return (
    <Box
      margin={{ xs: "1rem 2rem", lg: "0" }}
      sx={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <FlexBetween>
        <Header title="Theme Code" subtitle="Theme Code based on Settings" />
      </FlexBetween>
      <>
        <ReactMarkdown
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          children={markdown}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={dark}
                  showLineNumbers={true}
                  showInlineLineNumbers={true}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </>
    </Box>
  );
};

export default ThemeCodePage;
