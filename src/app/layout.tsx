import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { AppBar, Typography, Container } from "@mui/material";
import Menu from "@/components/Menu";
import Link from "next/link";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AppBar
              position="sticky"
              sx={{
                height: 64,
                bgcolor: "background.default",
                color: "text.primary",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Container
                maxWidth="md"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  component={Link}
                  href="/"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Demo Frontend
                </Typography>

                <Menu />
              </Container>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 2 }}>
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
