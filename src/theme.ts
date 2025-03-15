"use client";
import { createTheme } from "@mui/material/styles";
import { breakpoints, spacing } from "./styles/consts";

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
  },
  breakpoints: {
    values: breakpoints,
  },
  spacing,
});

export default theme;
