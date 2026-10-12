import type { Metadata, Viewport } from "next";
import { Anton, Inter, Mrs_Saint_Delafield, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/lib/config";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://forextradertelugu.com"),
  title: {
    default: "Forex Trader Telugu by Chaitanya | FTT Trading Community & Courses",
    template: "%s | Forex Trader Telugu",
  },
  description:
    "Master Forex and Futures trading in Telugu with Chaitanya (Forex Trader Telugu - FTT). Join 50,000+ Telugu traders learning Price Action, Risk Management, NQ/Gold analysis, and Funded Prop Firm strategies. Daily live trading sessions, beginner to advanced courses, and $1M+ in verified payouts.",
  keywords: [
    "Forex Trader Telugu",
    "FTT",
    "Chaitanya Forex Trader Telugu",
    "Forex Trading Telugu",
    "Learn Forex in Telugu",
    "Forex Trading Course in Telugu",
    "Telugu Forex Tutorials",
    "Telugu Trading Community",
    "Telugu Stock Market and Forex",
    "Price Action Telugu",
    "Futures Trading Telugu",
    "Prop Firm Passing Guidance Telugu",
    "Funded Trader Telugu",
    "Daily Live Trading Telugu",
    "Gold Trading Telugu",
    "NQ Futures Telugu",
    "Trading Psychology Telugu",
    "Best Trading Mentorship Telugu",
    "Telugu Day Trading",
  ],
  authors: [{ name: "Chaitanya", url: "https://forextradertelugu.com" }],
  creator: "Chaitanya (Forex Trader Telugu)",
  publisher: "Forex Trader Telugu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://forextradertelugu.com",
    languages: {
      "te-IN": "https://forextradertelugu.com",
      "en-US": "https://forextradertelugu.com",
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/ftt-logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Forex Trader Telugu by Chaitanya | FTT Community & Courses",
    description:
      "Helping Telugu traders turn knowledge into consistent income through practical education, real market experience, daily live trading and a supportive community.",
    url: "https://forextradertelugu.com",
    siteName: "Forex Trader Telugu (FTT)",
    locale: "te_IN",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/images/ftt-logo.jpg",
        width: 1200,
        height: 1200,
        alt: "Forex Trader Telugu - Official Logo",
      },
      {
        url: "/images/hero-bg.png",
        width: 1920,
        height: 1080,
        alt: "Chaitanya - Forex Trader Telugu Mentor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Trader Telugu | Best Telugu Trading Community by Chaitanya",
    description:
      "Learn Forex & Futures trading in Telugu. Daily live trading sessions, price action education, and prop firm passing guidance.",
    images: ["/images/ftt-logo.jpg"],
    creator: "@forex_telugu",
    site: "@forex_telugu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "finance",
};

// Structured JSON-LD Schema for Maximum SEO & Telugu Audience Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://forextradertelugu.com/#website",
      url: "https://forextradertelugu.com",
      name: "Forex Trader Telugu",
      alternateName: ["FTT", "Forex Trader Telugu by Chaitanya", "FTT Community"],
      description:
        "The leading Forex and Futures trading education platform and community for Telugu speakers worldwide.",
      inLanguage: ["te", "en"],
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://forextradertelugu.com/#organization",
      name: "Forex Trader Telugu (FTT)",
      url: "https://forextradertelugu.com",
      logo: "https://forextradertelugu.com/images/ftt-logo.jpg",
      sameAs: [
        SITE.socials.youtube,
        SITE.socials.instagram,
        SITE.socials.telegram,
        SITE.socials.twitter,
      ],
      founder: {
        "@type": "Person",
        name: "Chaitanya",
        jobTitle: "Founder & Lead Trading Mentor",
        description:
          "Full-time trader with 9+ years of experience in Futures and Forex, taking $1M+ in prop firm payouts.",
      },
    },
    {
      "@type": "Course",
      "@id": "https://forextradertelugu.com/#course",
      name: "FTT Community & Trading Course (Telugu)",
      description:
        "Comprehensive Telugu Forex & Futures trading course covering Price Action, Market Trend Identification, Risk Management, Live Trading Sessions, and Prop Firm Passing Guidance.",
      provider: {
        "@id": "https://forextradertelugu.com/#organization",
      },
      inLanguage: "te",
      offers: {
        "@type": "Offer",
        price: "14999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: "https://forextradertelugu.com/#courses",
        category: "Membership",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this trading course taught in Telugu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all daily live trading sessions, courses, market analysis, and community discussions are conducted in Telugu, tailored specifically for Telugu traders.",
          },
        },
        {
          "@type": "Question",
          name: "What markets are traded in the FTT Community?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We trade and analyze Futures (Gold GC, Nasdaq NQ, ES) and major Forex currency pairs with real-time market execution.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide guidance to pass Prop Firm challenges?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, complete guidance is provided to pass prop firm evaluations and manage funded accounts with strict risk management.",
          },
        },
        {
          "@type": "Question",
          name: "What does the ₹14,999 membership include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The 6-month membership includes daily live trading sessions from 11:30 AM to 2:00 PM IST, complete basic to advanced course materials, trade ideas and analysis, Discord community access, live Q&A, and weekend reviews.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${mrsSaintDelafield.variable} ${spaceGrotesk.variable} h-full dark`}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/ftt-logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-white font-body antialiased selection:bg-[#F5B942] selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
