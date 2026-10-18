"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, MessageSquare } from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

interface FAQItem {
  id: string;
  category: "general" | "mentorship" | "live" | "propfirms" | "payouts" | "risk";
  question: string;
  answer: string;
}

const FAQ_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "mentorship", label: "Mentorship & Curriculum" },
  { id: "live", label: "Live Trading Room" },
  { id: "propfirms", label: "Prop Firm Funding" },
  { id: "payouts", label: "Payouts & Capital" },
  { id: "risk", label: "Risk & Psychology" },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  // --- GENERAL ---
  {
    id: "faq-01",
    category: "general",
    question: "What is Forex Trader Telugu (FTT) and who is it designed for?",
    answer:
      "Forex Trader Telugu (FTT) is the premier trading academy and mentorship ecosystem founded by Chaitanya for Telugu-speaking traders globally. We specialize in simple price action, support and resistance execution across US Futures (Nasdaq, S&P 500, Gold) and Forex. Whether you are a beginner looking for structured education or an experienced trader struggling with consistency, FTT gives you a proven blueprint to get funded and stay profitable.",
  },
  {
    id: "faq-02",
    category: "general",
    question: "Who is mentor Chaitanya and what is his trading track record?",
    answer:
      "Chaitanya is a full-time professional futures and forex trader with over 9 years of hands-on market experience. He has documented over $1,000,000+ in verified prop firm payouts from premier global firms like MyFundedFutures and Lucid Trading. Unlike theoretical educators, Chaitanya trades live on stream in front of the community every trading day.",
  },
  {
    id: "faq-03",
    category: "general",
    question: "Why focus on US Futures & Forex instead of Indian stock options?",
    answer:
      "US Futures and Forex markets offer 24-hour liquidity, tight institutional spreads without sudden theta option decay, and direct access to global prop firms that provide $50,000 to $300,000+ in funded capital. This enables Telugu traders to earn substantial income in US Dollars without risking their personal life savings.",
  },
  {
    id: "faq-04",
    category: "general",
    question: "Do I need a finance degree or advanced math to succeed in FTT?",
    answer:
      "No prior financial background is necessary. All concepts are broken down step-by-step in native Telugu using visual chart structures, repeatable entry checklists, and live screen demonstrations. If you have discipline and can follow a strict risk management framework, you can excel.",
  },

  // --- MENTORSHIP & CURRICULUM ---
  {
    id: "faq-05",
    category: "mentorship",
    question: "Is the entire masterclass and mentorship taught in native Telugu?",
    answer:
      "Yes! 100% of our masterclass academy videos, live trading commentary, Discord study groups, and documentation are provided in clear, authentic Telugu. We demystify institutional Wall Street terminology so every Telugu trader can understand without language barriers.",
  },
  {
    id: "faq-06",
    category: "mentorship",
    question: "What core concepts are covered inside the FTT mentorship curriculum?",
    answer:
      "The curriculum focuses exclusively on simple price action, support and resistance, key market levels, trend identification, breakout and retest setups, strict risk management, position sizing, prop firm passing rules, and trade journaling.",
  },
  {
    id: "faq-07",
    category: "mentorship",
    question: "How long do I retain access to the course content and community?",
    answer:
      "Enrolling in FTT grants you lifetime access to the recorded academy video library, all future curriculum upgrades, and the private Discord & Telegram community channels, including weekly post-market simulation debriefs.",
  },

  // --- LIVE TRADING ROOM ---
  {
    id: "faq-08",
    category: "live",
    question: "What are the exact timings of the daily Live Trading sessions?",
    answer:
      "Our live trading streams run every trading day during the high-volatility New York market opening, starting from 7:30 PM IST onwards. You watch live charts, market trend preparation, key support and resistance levels, and real-time execution.",
  },
  {
    id: "faq-09",
    category: "live",
    question: "Can I ask questions and clear doubts during the live market stream?",
    answer:
      "Yes. Live interactive chat and Q&A are open during every stream. Chaitanya actively reviews student questions, verifies community chart markups, and explains the rationale behind each trade entry or invalidation.",
  },
  {
    id: "faq-10",
    category: "live",
    question: "What if I miss a live session due to my work or college schedule?",
    answer:
      "Every live trading session is recorded in HD and uploaded to the private student portal within hours, accompanied by detailed trade debrief notes and chart screenshots for your review.",
  },

  // --- PROP FIRM FUNDING ---
  {
    id: "faq-11",
    category: "propfirms",
    question: "What is a prop firm and how does evaluation funding work?",
    answer:
      "A proprietary trading firm (prop firm) offers simulated evaluation accounts to test a trader's discipline and risk management. Upon hitting a realistic profit target without violating maximum or trailing drawdown rules, you are granted a funded account trading real capital with an 80% to 90% profit share.",
  },
  {
    id: "faq-12",
    category: "propfirms",
    question: "Which prop firms does FTT trade with and recommend?",
    answer:
      "We focus on premier, reputable firms with prompt payouts: MyFundedFutures and Lucid Trading for CME futures (NQ, ES, Gold), alongside Exness and JustMarkets for forex. We also provide our exclusive discount codes and challenge guidelines.",
  },
  {
    id: "faq-13",
    category: "propfirms",
    question: "What specific strategy does FTT teach to pass evaluation challenges?",
    answer:
      "We teach our mechanical 'Rule of 1-2': maximum 1-2 high-conviction trades per day, strictly 1% risk per trade, and minimum 2R to 4R reward setups. This protects your drawdown while hitting evaluation targets smoothly without reckless gambling.",
  },

  // --- PAYOUTS & CAPITAL ---
  {
    id: "faq-14",
    category: "payouts",
    question: "How do prop firm payouts work and how do I receive funds in India?",
    answer:
      "Prop firms disburse payouts directly through international bank wires, cryptocurrency (USDT), or fintech cards (Rise, Deel, RedotPay). Payouts reach your Indian bank account smoothly and legally as foreign inward remittance for professional services.",
  },
  {
    id: "faq-15",
    category: "payouts",
    question: "How much personal capital do I need to start trading with FTT?",
    answer:
      "You do not need lakhs of personal trading capital. A $50,000 prop firm challenge typically costs only ₹3,000 to ₹7,000 one-time. Your personal financial risk is strictly capped at the evaluation fee, while your upside is in thousands of dollars.",
  },
  {
    id: "faq-16",
    category: "payouts",
    question: "How frequently can I request payouts once I am funded?",
    answer:
      "Most top futures prop firms allow payout requests on a 14-day cycle, with several firms offering weekly or on-demand payouts once minimum consistent trading days are completed.",
  },

  // --- RISK & PSYCHOLOGY ---
  {
    id: "faq-17",
    category: "risk",
    question: "What is FTT's golden rule for account capital preservation?",
    answer:
      "Protect your downside first. Never risk more than 1% of account equity on a single position, and enforce a daily hard loss limit of 2.5% to 3%. If you reach your daily limit, you close the screens immediately. Small edges compound into big accounts.",
  },
  {
    id: "faq-18",
    category: "risk",
    question: "How does FTT help overcome revenge trading and emotional tilt?",
    answer:
      "We provide our proprietary automated position size calculator and an objective 5-point execution checklist. A trade is only triggered when all 5 points check out. Plus, our community debriefs ensure peer accountability to eliminate impulsive overtrading.",
  },
  {
    id: "faq-19",
    category: "risk",
    question: "What are Weekend Simulation Replays and why are they vital?",
    answer:
      "Every Saturday, we run blind market replay simulations where historical price action is played candle-by-candle. Members practice trade entries, study common traps, review their trading journals, and build intuition without financial pressure.",
  },
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [openId, setOpenId] = useState<string | null>("faq-01");

  const filteredFaqs = FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionShell id="faq" titleId="faq-heading" glowSide="left">
      {/* Centered Heading exactly matching reference format */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#F5B942]/30 text-[#F5B942] text-[11px] font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_12px_rgba(245,185,66,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#F5B942]" />
            <span>GOT QUESTIONS?</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="faq-heading"
            className="font-heading uppercase tracking-[0.5px] text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] text-white leading-[0.98] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            FREQUENTLY ASKED <span className="text-gold-gradient">QUESTIONS</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed mt-3 max-w-xl mx-auto font-body">
            Everything you need to know about Forex Trader Telugu mentorship, daily live trading,
            prop firm funding, and payouts.
          </p>
        </Reveal>
      </div>

      {/* Filter Pills matching reference screenshot layout */}
      <Reveal delay={0.15} className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300 select-none ${
                  isActive
                    ? "bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black shadow-[0_0_16px_rgba(245,185,66,0.35)] scale-[1.03] font-bold"
                    : "bg-[#0E0E0E] text-[#A8A8A8] hover:text-white hover:bg-[#161616] border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Accordion FAQ Cards matching reference format */}
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                isOpen
                  ? "bg-[#0E0E0E] border-[#F5B942]/60 shadow-[0_4px_25px_rgba(245,185,66,0.08)]"
                  : "bg-[#0A0A0A]/90 border-white/10 hover:border-white/20 hover:bg-[#0D0D0D]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={isOpen}
                className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
              >
                <span
                  className={`text-[15px] sm:text-[16.5px] font-medium leading-snug transition-colors ${
                    isOpen ? "text-[#F5B942] font-semibold" : "text-white group-hover:text-[#F5B942]"
                  }`}
                >
                  {faq.question}
                </span>

                {/* Plus Icon that rotates on open */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "bg-[#F5B942] text-black rotate-45 shadow-[0_0_10px_rgba(245,185,66,0.3)]"
                      : "bg-white/5 text-[#F5B942] group-hover:bg-[#F5B942]/20 group-hover:rotate-90"
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-[13.5px] sm:text-[14.5px] text-[#CFCFCF] leading-[1.7] border-t border-white/5 font-body">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <Reveal delay={0.2} className="mt-10 sm:mt-12 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 px-6 rounded-2xl bg-[#0D0D0D] border border-white/10 text-xs sm:text-sm text-[#A8A8A8]">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#F5B942]" />
            Have a question that isn&apos;t answered here?
          </span>
          <a
            href="https://t.me/forextradertelugu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5B942] hover:underline font-bold inline-flex items-center gap-1"
          >
            Chat with our team on Telegram &rarr;
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default FAQSection;
