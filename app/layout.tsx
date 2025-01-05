import type { Metadata } from "next";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Lexend } from "next/font/google";
import { MoovizContextWrapper } from "./context";
import "@mantine/core/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mooviz",
  description: "A random movie finder",
};

const lexend = Lexend({ weight: "400", subsets: ["latin"] });
const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={lexend.className} style={{ backgroundColor: "#EBE9E2" }}>
        <MoovizContextWrapper>
          <MantineProvider defaultColorScheme="light" theme={theme}>
            {children}
          </MantineProvider>
        </MoovizContextWrapper>
      </body>
    </html>
  );
}
