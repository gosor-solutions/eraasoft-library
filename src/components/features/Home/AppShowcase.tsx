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
    <div className="space-y-6">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
        Englivision App
      </h2>

      <p className="text-brand-gray text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
        libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus,
        suscipit risus eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus
        eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet, consectetur
        adipiscing elit adipiscing elit. Nullam vitae
      </p>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
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
    <div className="relative flex justify-center items-center gap-4 lg:gap-6 translate-x-40">
      <img src="/app-showcase.png" alt="app-showcase" className="z-50" />
      <div
        style={{
          top: 170,
          left: 300,
          transform: `rotate(${-14}deg) scale(${6})`,
        }}
        className="absolute w-36 h-16 bg-[#66BEFF] rounded-[50%] z-n1"
      ></div>
      <div
        style={{
          top: 170,
          left: 300,
          transform: `rotate(${30}deg) scale(${6})`,
        }}
        className="absolute w-36 h-16 bg-linear-to-t from-[#90d1ff] via-[#C6E7FF] to-white rounded-[50%] z-n1"
      ></div>
    </div>
  );
}
