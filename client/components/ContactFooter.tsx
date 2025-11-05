import { useState } from "react";
import { Text3D } from "@/components/Text3D";

export default function ContactFooter() {
  const handleMapClick = () => {
    window.open("https://maps.google.com?q=Andheri+(W),+Bandra,+Colaba,+Pune,+Delhi,+Bengaluru,+Mumbai,+Maharashtra,+India", "_blank");
  };

  const handleEmailUs = () => {
    const to = "team@flexriteworld.org";
    const subject = "Get in Touch - FlexRite World";
    const body = "Hello FlexRite World team,\n\nI would like to get in touch with you regarding:\n\n\n\nBest regards,\n[Your Name]";

    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink; // opens default mail client immediately
  };



  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919757090909", "_blank");
  };

  // Precompute mailto link so it can be used by both the click handler and the anchor fallback
  const mailtoSubject = "Get in Touch - FlexRite World";
  const mailtoBody = "Hello FlexRite World team,\n\nI would like to get in touch with you regarding:\n\n\n\nBest regards,\n[Your Name]";
  const mailtoLink = `mailto:team@flexriteworld.org?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <footer
      className="w-full text-white py-4 px-0 relative z-50 overflow-hidden"
      style={{
        background: "rgba(90, 206, 128, 0.05)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(1.7px)",
        WebkitBackdropFilter: "blur(1.7px)",
        border: "1px solid rgba(90, 206, 128, 0.6)",
      }}
    >
      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row mb-4 items-stretch w-full gap-4 px-4 md:px-8">
          <div className="w-full lg:w-1/2 flex">
            <div className="flex flex-col gap-2 rounded-xl p-4 w-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-1">Get in Touch</h3>
              <p className="text-white/80 text-sm mb-2">
                Ready to start your journey with FlexRite World? We're here to help you achieve your goals and create exceptional solutions together.
              </p>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                {/* Official Landline */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-2 rounded-lg bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-3.211 2.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l2.860-3.210a.997.997 0 0 0-.085-1.391z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Official Landline</p>
                    <a href="tel:02244506234" className="text-sm font-semibold hover:text-white/80 transition-colors">
                      022 - 44 506 234
                    </a>
                  </div>
                </div>

                {/* Official WhatsApp */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-2 rounded-lg bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.464" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Official WhatsApp</p>
                    <button
                      onClick={handleWhatsAppClick}
                      className="text-sm font-semibold hover:text-white/80 transition-colors text-left"
                    >
                      +91-9757 09 09 09
                    </button>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-2 rounded-lg bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M17.5 2h-11C5.12 2 4 3.12 4 4.5v15C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5v-15C20 3.12 18.88 2 17.5 2zm-7 17c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7-4.5h-14V4.5c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v10.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Mobile</p>
                    <a href="tel:7358245244" className="text-sm font-semibold hover:text-white/80 transition-colors">
                      7358245244
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-2 rounded-lg bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Email</p>
                    <a href="mailto:team@flexriteworld.org" className="text-sm font-semibold hover:text-white/80 transition-colors">
                      team@flexriteworld.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-2 relative z-[9999]">
  <button
    type="button"
    onClick={handleEmailUs}
    className="w-full px-4 py-3 text-white font-semibold bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-md hover:bg-white/20 transition-all duration-300 text-base hover:scale-105"
    style={{ cursor: "pointer" }}
  >
    Email us
  </button>
</div>

            </div>
          </div>

          <div className="w-full lg:w-1/2 flex">
            <div
              className="w-full h-full rounded-xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm min-h-[180px] cursor-pointer relative"
              onClick={handleMapClick}
              title="Click to view locations on Google Maps"
            >
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-center p-3">
                  <p className="text-white font-semibold text-base mb-1">Our Office Locations</p>
                  <p className="text-white/90 text-xs">
                    Andheri (W), Bandra, Colaba, Pune, Delhi, Bengaluru, Mumbai, Maharashtra, India (Bharat, भारत)
                  </p>
                  <p className="text-white/80 text-xs mt-1">Click to view on Google Maps</p>
                </div>
              </div>
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609826074!2d72.7410992!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ minHeight: "180px", border: 0, borderRadius: "0.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Text3D Component with minimized gap and zoom */}
        <div className="w-full px-4 md:px-8 mb-2">
          <div className="footer-3d-wrap">
            <Text3D />
          </div>
        </div>

        <div className="w-full px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-3">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/flexriteworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.4 2 2 4.4 2 7.75v8.5C2 19.6 4.4 22 7.75 22h8.5C19.6 22 22 19.6 22 16.25v-8.5C22 4.4 19.6 2 16.25 2h-8.5zm0 1.5h8.5c2.2 0 3.75 1.55 3.75 3.75v8.5c0 2.2-1.55 3.75-3.75 3.75h-8.5c-2.2 0-3.75-1.55-3.75-3.75v-8.5c0-2.2 1.55-3.75 3.75-3.75zm4.25 3.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 1 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/flexriteworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/flexriteworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.370-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.920-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://twitter.com/flexriteworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Website */}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
                title="Visit our website"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>

            {/* Copyright and additional info */}
            <div className="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-white/80 transition-colors"
              >
                www.flexriteworld
              </a>
              <p className="text-xs text-white/60">
                © {new Date().getFullYear()} FlexRite World. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}