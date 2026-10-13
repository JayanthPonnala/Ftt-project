import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/sections/AboutSection";
import CommunityOverviewSection from "@/components/sections/CommunityOverviewSection";
import MethodSection from "@/components/sections/MethodSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import MembershipSection from "@/components/sections/MembershipSection";
import TheRouteSection from "@/components/sections/TheRouteSection";
import JoinCommunitySection from "@/components/sections/JoinCommunitySection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative selection:bg-[#F5B942] selection:text-black">
      {/* 1. Fixed Top Navbar */}
      <Navbar />

      {/* Main Content: Sections in Exact Specified Order */}
      <main className="flex-1 w-full">
        {/* Section 1: Hero (id="home") */}
        <Hero />

        {/* Section 2: Meet Your Mentor (id="about") */}
        <AboutSection />

        {/* Section 3: Community Overview (id="community") */}
        <CommunityOverviewSection />

        {/* Section 4: Method (id="method") */}
        <MethodSection />

        {/* Section 5: Real Trader Testimonials & Reviews (id="testimonials") */}
        <TestimonialsSection />

        {/* Section 7: Membership (id="courses") */}
        <MembershipSection />

        {/* Section 8: The Route (id="partners") */}
        <TheRouteSection />

        {/* Section 9: The FTT Community (id="join") */}
        <JoinCommunitySection />

        {/* Section 10: Frequently Asked Questions (id="faq") */}
        <FAQSection />
      </main>

      {/* Section 9: Footer & Contact (id="contact") */}
      <Footer />

      {/* Floating Back To Top Button */}
      <BackToTop />
    </div>
  );
}
