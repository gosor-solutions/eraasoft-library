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

import { useGetSettings } from "@/hooks/queries/useSettingsQueries";

// Content Component
function AboutContent() {
  const { data: settings } = useGetSettings();

  console.log(settings);

  const defaultText = `Englivision is Egypt’s premier gateway to English mastery, blending
world-class pedagogical standards with a deep understanding of the
local learner's journey. We provide a sophisticated learning ecosystem
that combines high-fidelity recorded materials with structured,
results-oriented coursework. By focusing on measurable fluency and
professional confidence, we empower our students to excel in global
academic and corporate environments.

Our methodology is built on years of collective expertise in language
acquisition and digital education. We bridge the gap between basic
understanding and native-level proficiency through a rigorous,
technology-driven curriculum designed for the modern professional. At
Englivision, we don't just teach a language; we provide the linguistic
precision necessary to unlock a lifetime of international
opportunities.`;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold text-gray-900">About Us</h1>
      <div className="space-y-4 text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
        {formatText(settings?.about || defaultText)}
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

function formatText(text: string) {
  return text.split("\r\n\r\n").map((line, i) => <p key={i}>{line}</p>);
}
