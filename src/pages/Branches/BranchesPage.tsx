import { Banner } from "@/components/shared/Banner";
import { MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetBranches } from "@/hooks/queries/useBranchQueries";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";

export default function BranchesPage() {
  const { data: branches, isLoading } = useGetBranches();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Banner title="Our Branches" />
        <div className="flex justify-center items-center h-[50vh]">
          <Loading />
        </div>
      </div>
    );
  }

  if (!branches || branches.length === 0) {
    return <NoData data={"Branches"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Banner title="Our Branches" />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Us Today
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are closer than you think. Find the nearest branch to you and start your learning journey with us.
          </p>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row group border border-gray-100 cursor-pointer">
                {/* Content Section */}
                <div className="px-14 py-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-primary transition-colors duration-300">
                      {branch.name}
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="shrink-0 text-brand-primary w-5 h-5 mt-1" />
                        <span className="text-base leading-relaxed">{branch.address}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="shrink-0 text-brand-primary w-5 h-5" />
                        <span className="text-base font-medium">{branch.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
