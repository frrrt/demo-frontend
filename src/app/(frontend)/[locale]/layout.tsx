import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { AppBar, Typography, Container } from "@mui/material";
import Menu from "@/components/Menu";
import Link from "next/link";
import type { Locale } from "@/const/locales";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;

  return (
    <html lang={locale.split("-")[0]}>
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
                  href={`/${locale}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Demo Frontend
                </Typography>

                <Menu locale={locale} />
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
