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
  title: "Musa Muthami | Software Developer & Cybersecurity Enthusiast",
  description: "Hey! I'm Musa Muthami — Software Developer & Cybersecurity Enthusiast building secure, production-grade systems in Nairobi, Kenya.",
  keywords: [
    "Musa Muthami",
    "Musa Mwange",
    "Software Developer",
    "Cybersecurity Enthusiast",
    "Full-Stack Developer",
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
      name: "Musa Muthami",
      url: "https://github.com/MuthamiM",
    },
  ],
  creator: "Musa Muthami",
  publisher: "Musa Muthami",

  openGraph: {
    title: "Musa Muthami | Software Developer & Cybersecurity Enthusiast",
    description: "Musa Muthami — Software Developer & Cybersecurity Enthusiast building secure systems in Nairobi, Kenya.",
    url: "https://musamuthami1-github-io.pages.dev",
    siteName: "Musa Muthami",
    images: [
      {
        url: "https://musamuthami1-github-io.pages.dev/images/profile.JPG",
        width: 1200,
        height: 630,
        alt: "Musa Muthami Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Musa Muthami | Software Developer & Cybersecurity Enthusiast",
    description: "Musa Muthami — Software Developer & Cybersecurity Enthusiast building secure systems in Nairobi, Kenya.",
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
