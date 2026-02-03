import { Circle } from "@/components/shared/Circle";
// Main AboutUs Component
export function AboutUs() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AboutContent />
          <AboutImage />
        </div>
      </div>
    </section>
  );
}

// Content Component
function AboutContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold text-gray-900">About Us</h1>
      <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nullam vitae libero
          cursus, suscipit risus eget, pretium nulla. Quisqu
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nullam vitae
        </p>
      </div>
    </div>
  );
}

// Image Component
function AboutImage() {
  return (
    <div className="relative">
      <Circle size={300} x={550} y={-150} color="#D2ECFF" />
      <div className="relative rounded-3xl overflow-hidden">
        <img
          src="/about-us.jpg"
          alt="Workspace with laptop and notebook"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
