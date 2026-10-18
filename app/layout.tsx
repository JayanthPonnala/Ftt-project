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
      { url: "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg", type: "image/jpeg" },
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
    title: "Forex Trader Telugu | Best Telugu Trading Community by Chaitanya",
    description:
      "Learn Forex & Futures trading in Telugu. Daily live trading sessions, price action education, and prop firm passing guidance.",
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
      name: "FTT Community & Trading Course (Telugu)",
      description:
        "Comprehensive Telugu Forex & Futures trading course covering Simple Price Action, Support and Resistance, Key Market Levels, Risk Management, Daily Live Trading Sessions, and Prop Firm Passing Guidance.",
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Forex Trader Telugu (FTT) and who is it designed for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Forex Trader Telugu (FTT) is the premier trading academy and mentorship ecosystem founded by Chaitanya for Telugu-speaking traders globally. We specialize in simple price action, support and resistance execution across US Futures (Nasdaq, S&P 500, Gold) and Forex. Whether you are a beginner looking for structured education or an experienced trader struggling with consistency, FTT gives you a proven blueprint to get funded and stay profitable.",
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
          name: "Is the entire masterclass and mentorship taught in native Telugu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! 100% of our masterclass academy videos, live trading commentary, Discord study groups, and documentation are provided in clear, authentic Telugu. We demystify institutional Wall Street terminology so every Telugu trader can understand without language barriers.",
          },
        },
        {
          "@type": "Question",
          name: "What core concepts are covered inside the FTT mentorship curriculum?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The curriculum focuses exclusively on simple price action, support and resistance, key market levels, trend identification, breakout and retest setups, strict risk management, position sizing, prop firm passing rules, and trade journaling.",
          },
        },
        {
          "@type": "Question",
          name: "What are the exact timings of the daily Live Trading sessions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our live trading streams run every trading day during the high-volatility New York market opening, starting from 7:30 PM IST onwards. You watch live charts, market trend preparation, key support and resistance levels, and real-time execution.",
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
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-white font-body antialiased selection:bg-[#F5B942] selection:text-black">
        <SmoothScroll>
          <IntroOverlay />
          <BlogAccessModal />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
