import Header from "@/components/Header";
import ShaderBackground from "@/components/ui/ShaderBackground";

export default function Corporate() {
  return (
    <div className="relative min-h-screen">
      {/* Shader Background Animation */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>

      {/* Global CSS */}
      <style jsx global>{`
        /* Transition for viewport size changes */
        * {
          transition: all 0.1s ease-out;
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-playfair font-bold text-4xl lg:text-6xl text-white mb-6">
              Corporate
            </h1>
            <p className="font-source text-lg text-white/80 mb-8 max-w-md">
              This page is under construction. Continue prompting to add content for corporate services.
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
