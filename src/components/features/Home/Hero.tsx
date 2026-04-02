import { Button } from "@/components/shared/button";
import { MyLink } from "@/components/shared/MyLink";

// Main Hero Component
export function HeroSection() {
  return (
    <section className="min-h-[80vh] relative py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Student with books"
          className="w-full h-full object-cover object-top sm:object-[center_-80px] lg:object-[0px_-130px]"
        />
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <HeroContent />
      </div>
    </section>
  );
}

// Hero Content Component
function HeroContent() {
  return (
    <div className="space-y-6 sm:space-y-8 py-10 sm:py-14 lg:py-20">
      <Logo />

      <h1 className="font-inter text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
        Welcome to Engli-Vision
      </h1>

      <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
        Your journey to mastering English starts here. Learn smarter, not
        harder.
      </p>

      <CTAButtons />
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex justify-center">
      <img
        className="w-48 sm:w-64 md:w-72 lg:w-80"
        src="/englivision-logo.svg"
        alt="Engli-Vision-logo"
      />
    </div>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-6 sm:px-0">
      <Button
        variant="secondary"
        className="w-full sm:w-auto px-8 sm:px-12 py-6 shadow-lg text-sm sm:text-base cursor-pointer"
        size="lg"
      >
        <MyLink to="/courses">Start learn now</MyLink>
      </Button>
      <Button
        className="w-full sm:w-auto px-8 sm:px-12 py-6 shadow-lg text-sm sm:text-base cursor-pointer"
        size="lg"
      >
        <MyLink to="/register">Join with us</MyLink>
      </Button>
    </div>
  );
}
