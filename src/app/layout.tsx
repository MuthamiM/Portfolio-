import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provder";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const nunito = localFont({
  src: "./fonts/Nunito/Nunito-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nunito",
});

const thasadith = localFont({
  src: [
    {
      path: "./fonts/Thasadith/Thasadith-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Thasadith/Thasadith-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Thasadith/Thasadith-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Thasadith/Thasadith-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-thasadith",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://musamuthami1-github-io.pages.dev"),
  title: "Musa Mwange | Cybersecurity Specialist & Frontend Developer",
  description: "Hey! I'm Musa Mwange, Cybersecurity Specialist & Frontend Developer Portfolio",
  keywords: [
    "Musa Mwange",
    "Cybersecurity Specialist",
    "Frontend Developer",
    "Penetration Testing",
    "Vulnerability Assessment",
    "React Developer",
    "Next.js Developer",
    "USSD Development",
    "JavaScript",
    "TypeScript",
    "Dart",
    "Swift",
    "Web Developer",
    "Portfolio",
    "M-Pesa Integration",
  ],
  authors: [
    {
      name: "Musa Mwange",
      url: "https://github.com/MusaMuthami1",
    },
  ],
  creator: "Musa Mwange",
  publisher: "Musa Mwange",

  openGraph: {
    title: "Musa Mwange | Cybersecurity Specialist & Frontend Developer Portfolio",
    description: "Musa Mwange - Cybersecurity Specialist & Frontend Developer",
    url: "https://musamuthami1-github-io.pages.dev",
    siteName: "Musa Mwange",
    images: [
      {
        url: "https://musamuthami1-github-io.pages.dev/images/profile.JPG",
        width: 1200,
        height: 630,
        alt: "Musa Mwange Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Musa Mwange | Cybersecurity Specialist & Frontend Developer Portfolio",
    description: "Musa Mwange - Cybersecurity Specialist & Frontend Developer",
    images: ["https://musamuthami1-github-io.pages.dev/images/profile.JPG"],
    creator: "@SkiNnyWallk",
  },

  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${thasadith.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
