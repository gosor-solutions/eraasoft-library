import Image from "next/image";

export function HeroSection() {
  return (
    <section className="h-[1000px] relative bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          width={1500}
          height={1000}
          src="/hero.png"
          alt="Student with books"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gray-900/50 bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        <HeroContent />
      </div>
    </section>
  );
}

// Hero Content Component
function HeroContent() {
  return (
    <div className="space-y-8 py-12 sm:py-16 lg:py-20">
      <Logo />

      <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        Welcome to Englivision
      </h1>

      <CTAButtons />
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex justify-center">
      <div className=" rounded-lg p-4 inline-block">
        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
          <Image
            width={320}
            height={320}
            className="w-80"
            src="/englivision-logo.svg"
            alt="gosor-logo"
          />
          {/* <span className="block text-xs text-gray-600 mt-1">
            LEARNING HAS NO LIMITS
          </span> */}
        </div>
      </div>
    </div>
  );
}

// CTA Buttons Component
function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button className="w-full sm:w-auto px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
        Start learn now
      </button>
      <button className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg">
        Join with us
      </button>
    </div>
  );
}
