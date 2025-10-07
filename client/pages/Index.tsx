import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ParallaxSection from "@/components/ParallaxSection";
import MeetOurDoctors from "@/components/MeetOurDoctors";
import BlogsAndNews from "@/components/BlogsAndNews";
import CelebrityTestimonials from "@/components/CelebrityTestimonials";
import ClientReviews from "@/components/ClientReviews";
import ContactFooter from "@/components/ContactFooter";
import ShaderBackground from "@/components/ui/ShaderBackground";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  function handleFreeCheckup(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    navigate("/freehealthcheckup");
  }

  return (
    <div className="relative">
      {/* Shader Background Animation */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>
      
      {/* Floating Free Health Checkup Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleFreeCheckup}
          className="px-6 py-3 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black to-green-600 hover:from-green-700 hover:to-black animate-pulse"
        >
           Free Health Checkup
        </button>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <ParallaxSection />
        <MeetOurDoctors />
        <BlogsAndNews />
        <CelebrityTestimonials />
        <ClientReviews />
        <ContactFooter />
      </div>
    </div>
  );
}