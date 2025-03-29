# Demo Frontend

This is a demo project to show some cool features of NextJS and MUI and how it is connected to a headless CMS (Payload CMS).

## Notable features include:

- **App router**: see `src/app/`
- **CMS sync scripts (AI generated):** see `scripts/`
- **Page component usage for home, catch all and preview:** see `src/app/(frontend)/[locale]/page.tsx`, `src/app/(frontend)/[locale]/[slug]/page.tsx` and `src/app/(frontend)/[locale]/page-preview/page.tsx`,
- **Data fetching from the CMS:** see `src/fetch/`
- **Payload CMS Live Preview Integration:** see `src/app/(frontend)/[locale]/page-preview/page.tsx` and `src/components/page/LivePreviewPage.tsx`
- **Page Revalidation:** see `src/app/api/revalidate/route.ts`
- **Server Component Example:** see `src/components/page/Page.tsx` and `src/components/Menu.tsx`
- **Mixed Component (used as RSC and Client Component):** see `src/components/page/PageContent.tsx`
- **Maping Rich Text to MUI components:** see `src/components/convertToRichText.tsx`
- **Responsive Image Component:** see `src/components/ResponsiveImage.tsx`
- **i18n Integration:** see `src/components/ToggleLanguageButton.tsx` and `src/app/(frontend)/[locale]/`
- **MUI Theme Customization:** see `src/theme.ts`
- **Integrated CMS query utilities:** see `src/fetch/query.ts` and usage: `src/fetch/fetchPage.ts`
- **E2E Types with structural typing magic:** see `src/components/Menu.tsx`
