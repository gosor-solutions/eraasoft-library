import { FaApple, FaGooglePlay } from "react-icons/fa";

export function AppShowcaseSection() {
  return (
    <section className="relative bg-[#e9f2fb] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <AppContent />

          {/* App Screenshots */}
          <AppScreenshots />
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  return (
    <div className="space-y-6 text-center lg:text-left">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
        Englivision App
      </h2>

      <p className="text-brand-gray text-base sm:text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
        libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus,
        suscipit risus eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus
        eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet, consectetur
        adipiscing elit adipiscing elit. Nullam vitae
      </p>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <a
          href="#"
          className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <FaGooglePlay color="white" />
          <div className="text-left">
            <div className="text-xs">GET IT ON</div>
            <div className="text-sm font-semibold">Google Play</div>
          </div>
        </a>

        <a
          href="#"
          className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <FaApple color="white" size={30} />
          <div className="text-left">
            <div className="text-xs">Download on the</div>
            <div className="text-sm font-semibold">Apple Store</div>
          </div>
        </a>
      </div>
    </div>
  );
}

function AppScreenshots() {
  return (
    <div className="relative flex justify-center items-center">
      {/* Decorative blobs — hidden on mobile to avoid overflow */}
      <div
        className="hidden sm:block absolute w-36 h-16 bg-[#66BEFF] rounded-[50%] z-0"
        style={{
          top: 170,
          left: "50%",
          transform: `translateX(-50%) rotate(-14deg) scale(6)`,
        }}
      />
      <div
        className="hidden sm:block absolute w-36 h-16 bg-gradient-to-t from-[#90d1ff] via-[#C6E7FF] to-white rounded-[50%] z-0"
        style={{
          top: 170,
          left: "50%",
          transform: `translateX(-50%) rotate(30deg) scale(6)`,
        }}
      />

      <img
        src="/app-showcase.png"
        alt="app-showcase"
        className="relative z-10 w-48 sm:w-64 md:w-72 lg:w-auto max-w-xs lg:max-w-sm xl:max-w-md"
      />
    </div>
  );
}
