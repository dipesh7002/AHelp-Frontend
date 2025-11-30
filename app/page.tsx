"use client";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SlidingBoxes from "./components/ImageBoxes";
import ImageContents from "./components/ImageContent";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import DualCTA from "./components/DualCTA";
import CTASection from "./components/CTASection";

// Sample images
import Flower from "@/public/images/flower-8625039.png";
import Kindle from "@/public/images/pexels-kindelmedia-7054782.jpg";
import Circles from "@/public/images/circles-1609456.jpg";
import Lee from "@/public/images/pexels-jy-lee-438370-1137752.jpg";
import Mht from "@/public/images/pexels-mht01001-13138598.jpg";

const expertiseAreas: [string, string][] = [
  [Flower.src, "Mathematics & Statistics"],
  [Kindle.src, "Computer Science & Programming"],
  [Circles.src, "Business & Economics"],
  [Lee.src, "Literature & Writing"],
  [Mht.src, "Science & Engineering"],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Grid */}
      <Features />

      {/* Subjects Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Every Subject Covered
          </h2>
          <p className="text-lg text-slate-600">
            From math to literature, find expert help in any field
          </p>
        </div>
        <SlidingBoxes image_list={{ values: expertiseAreas }} />
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Trust Indicators with Images */}
      <ImageContents 
        image_src={Kindle.src} 
        content="Work with verified experts who understand your academic needs and deliver quality results on time."
        imageOnRight={true}
      />

      <ImageContents 
        image_src={Lee.src} 
        content="Track progress in real-time, communicate directly, and get exactly what you need through our secure platform."
        imageOnRight={false}
      />

      {/* Stats Section */}
      <Stats />

      {/* Dual CTA Section */}
      <DualCTA />

      {/* Final CTA */}
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of students achieving academic success with expert help"
        primaryCTA={{
          text: "Get Help Now",
          href: "/post-assignment"
        }}
        secondaryCTA={{
          text: "Learn More",
          href: "/about"
        }}
        variant="default"
      />
    </div>
  );
}