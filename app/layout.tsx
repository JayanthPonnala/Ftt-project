import type { Metadata, Viewport } from "next";
import { Anton, Inter, Mrs_Saint_Delafield, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import IntroOverlay from "@/components/ui/IntroOverlay";
import BlogAccessModal from "@/components/blog/BlogAccessModal";
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
    default: "Forex Trader Telugu by Chaitanya | Forex in Telugu, Gold & Telugu Trading Course",
    template: "%s | Forex Trader Telugu",
  },
  description:
    "Forex Trader Telugu (forextradertelugu) by mentor Chaitanya — India's premier community to master Forex in Telugu and Gold in Telugu. Join our high-conviction Telugu trading course with daily Telugu trading live execution, institutional price action setups, and funded prop firm blueprints.",
  keywords: [
    "forextradertelugu",
    "forex in telugu",
    "gold in telugu",
    "telugu trading course",
    "telugu trading live",
    "Forex Trader Telugu",
    "forex trading in telugu",
    "gold trading in telugu",
    "xauusd in telugu",
    "telugu trading community",
    "best telugu trading course",
    "telugu trading live stream",
    "Chaitanya Forex Trader Telugu",
    "FTT forex trader telugu",
    "price action in telugu",
    "funded trader telugu",
    "prop firm passing telugu",
    "telugu stock market and forex",
    "learn forex in telugu",
    "daily live trading telugu",
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
      { url: "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Forex Trader Telugu | Best Forex in Telugu, Gold in Telugu & Trading Course",
    description:
      "Master Forex in Telugu and Gold in Telugu with mentor Chaitanya (forextradertelugu). Daily Telugu trading live sessions, comprehensive Telugu trading course, and $1M+ in verified payouts.",
    url: "https://forextradertelugu.com",
    siteName: "Forex Trader Telugu (FTT)",
    locale: "te_IN",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg",
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
    title: "Forex Trader Telugu | Best Forex in Telugu, Gold in Telugu & Trading Course",
    description:
      "Learn Forex in Telugu and Gold in Telugu with mentor Chaitanya. Daily Telugu trading live market execution and institutional Telugu trading course.",
    images: ["https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg"],
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
      name: "Forex Trader Telugu (forextradertelugu)",
      alternateName: [
        "forextradertelugu",
        "Forex in Telugu",
        "Gold in Telugu",
        "Telugu Trading Course",
        "Telugu Trading Live",
        "FTT",
        "Forex Trader Telugu by Chaitanya",
      ],
      description:
        "India's premier community to master Forex in Telugu and Gold in Telugu with mentor Chaitanya. Comprehensive Telugu trading course and daily Telugu trading live streams.",
      inLanguage: ["te", "en"],
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://forextradertelugu.com/#organization",
      name: "Forex Trader Telugu (FTT)",
      url: "https://forextradertelugu.com",
      logo: "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg",
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
      name: "Comprehensive Telugu Trading Course — Forex in Telugu & Gold in Telugu Masterclass",
      description:
        "India's premier Telugu trading course covering simple price action, Forex in Telugu, Gold in Telugu (XAUUSD), US Futures, daily Telugu trading live streams, and prop firm passing guidance.",
      provider: {
        "@id": "https://forextradertelugu.com/#organization",
      },
      inLanguage: "te",
      educationalLevel: "Beginner to Advanced",
      courseMode: "Online with Daily Live Trading Sessions",
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
      "@type": "BroadcastEvent",
      "@id": "https://forextradertelugu.com/#livetrading",
      name: "Daily Telugu Trading Live Execution Stream",
      description:
        "Daily Telugu trading live market execution during the New York market opening, covering Gold in Telugu (XAUUSD), US Futures, and Forex setups from 7:30 PM IST.",
      isLiveBroadcast: true,
      inLanguage: "te",
      videoFormat: "HD",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where can I learn Forex in Telugu and Gold in Telugu from scratch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Forex Trader Telugu (forextradertelugu) by Chaitanya is the premier platform to master Forex in Telugu and Gold in Telugu. We provide step-by-step mechanical price action, key market levels, and institutional concepts in authentic Telugu without complex jargon.",
          },
        },
        {
          "@type": "Question",
          name: "What is included inside the Telugu Trading Course by forextradertelugu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Telugu trading course covers pure price action, support and resistance, institutional liquidity concepts (SMC), Gold in Telugu (XAUUSD), US Futures (NQ/ES), strict 1% risk management, prop firm passing strategies, and trade journaling.",
          },
        },
        {
          "@type": "Question",
          name: "When does the daily Telugu Trading Live stream take place?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our Telugu trading live streams run every trading day during the high-volatility New York market opening from 7:30 PM IST onwards. You watch live charts, market trend preparation, key support/resistance levels, and real-time execution in Telugu.",
          },
        },
        {
          "@type": "Question",
          name: "Who is mentor Chaitanya and what is his trading track record?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Chaitanya is a full-time professional futures and forex trader with over 9 years of hands-on market experience. He has documented over $1,000,000+ in verified prop firm payouts from premier global firms like MyFundedFutures and Lucid Trading. Unlike theoretical educators, Chaitanya trades live on stream in front of the community every trading day.",
          },
        },
        {
          "@type": "Question",
          name: "What specific strategy does FTT teach to pass evaluation challenges?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We teach our mechanical 'Rule of 1-2': maximum 1-2 high-conviction trades per day, strictly 1% risk per trade, and minimum 2R to 4R reward setups. This protects your drawdown while hitting evaluation targets smoothly without reckless gambling.",
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
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-[#050505] text-white font-body antialiased selection:bg-[#F5B942] selection:text-black"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <IntroOverlay />
          <BlogAccessModal />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
