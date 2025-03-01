"use client";
import { createTheme } from "@mui/material/styles";
import { breakpoints, spacing } from "./styles/consts";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  breakpoints: {
    values: breakpoints,
  },
  spacing,
});

export default theme;
