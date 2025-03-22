"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      light: "#6573c3",
      main: "#3f51b5",
      dark: "#2c387e",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#f6a5c0",
      main: "#f48fb1",
      dark: "#aa647b",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    htmlFontSize: 14,
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
          wordWrap: "break-word",
          hyphens: "auto",
        },
      },
    },
  },
  spacing: 8,
});

theme.typography.h1 = {
  fontSize: "2.75rem",
  fontWeight: 400,
  lineHeight: 1.2,
};

theme.typography.h2 = {
  fontSize: "2.25rem",
  fontWeight: 400,
  lineHeight: 1.3,
};

theme.typography.h3 = {
  fontSize: "2rem",
  fontWeight: 400,
  lineHeight: 1.3,
};

theme.typography.h4 = {
  fontSize: "1.5rem",
  fontWeight: 400,
  lineHeight: 1.4,
};

theme.typography.subtitle2 = {
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: 1.4,
};

export default theme;
