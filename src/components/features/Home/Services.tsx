// Main Services Component
export function ServicesSection() {
  return (
    <section className="relative bg-linear-to-br from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <DecorativeElements />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader />

        {/* Services Grid */}
        <ServicesGrid />
      </div>
    </section>
  );
}

// Decorative Background Elements
function DecorativeElements() {
  return (
    <>
      {/* Top left curved lines */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <div className="absolute top-8 left-8 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute top-12 left-12 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute top-16 left-16 w-32 h-32 border-4 border-white rounded-full"></div>
      </div>

      {/* Top right circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>

      {/* Bottom left triangle */}
      <div className="absolute bottom-0 left-0 w-0 h-0 border-l-200 border-l-transparent border-b-200 border-b-white opacity-30"></div>
    </>
  );
}

// Section Header Component
function SectionHeader() {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
        Our Services.
      </h2>
      <p className="text-brand-gray font-base text-lg max-w-2xl mx-auto">
        Expert-led English programs and premium recorded resources designed to
        bridge the gap between local talent and global opportunities.
      </p>
    </div>
  );
}

// Services Grid Component
function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <div className="group relative rounded-tl-3xl rounded-br-3xl rounded-tr-[78px] rounded-bl-[78px] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Background Image */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute bg-linear-to-t from-black via-black/50 to-transparent h-1/2 bottom-0 w-full opacity-80"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        {/* Icon */}
        <div className="bg-white rounded-xl rounded-bl-none p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
          <span className="text-2xl">{service.icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white text-sm sm:text-base opacity-90">
          {service.description}
        </p>
      </div>
    </div>
  );
}

const services = [
  {
    id: 1,
    title: "Nasr City Academy",
    description: "Premium, in-person learning at our flagship Cairo hub.",
    image: "/adult-course.jpg",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Kids Courses",
    description: "Engaging, foundational programs built for young learners.",
    image: "/kids-course.jpg",
    icon: "👦",
  },
  {
    id: 3,
    title: "Adult Courses",
    description: "Professional-grade curriculum designed for career growth.",
    image: "/adult-course.jpg",
    icon: "👨",
  },
];
