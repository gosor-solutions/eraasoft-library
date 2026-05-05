import { Button } from "@/components/shared/button";
import { Loading } from "@/components/shared/Loading";
import { MyLink } from "@/components/shared/MyLink";
import { RoundCard } from "@/components/shared/RoundCard";
import { useGetLearning } from "@/hooks/queries/useLearningQueries";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export function AuthedHome() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* <PlacementTestBanner /> */}
        <MyLearning />
        {/* <FreeMaterialBanner /> */}
      </div>
    </div>
  );
}

function FreeMaterialBanner() {
  const navigate = useNavigate();
  return (
    <section className="bg-brand-secondary rounded-3xl p-8 md:p-12 text-black shadow-lg text-center relative overflow-hidden group">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-brand-primary/10 "></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-brand-primary/10 "></div>
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-4">
          Unlock Free Learning Materials
        </h2>
        <p className=" text-lg mb-8 max-w-xl">
          Access high-quality resources, videos, and PDFs to boost your skills
          without spending a dime.
        </p>
        <Button size="lg" onClick={() => navigate("/free-materials")}>
          Explore Free Materials <ArrowRight />
        </Button>
      </div>
    </section>
  );
}

export function MyLearning() {
  const learningQuery = useGetLearning();

  const groups = learningQuery.data?.data?.groups || [];

  let content;

  if (learningQuery.isLoading) {
    content = <Loading fullScreen />;
  } else if (learningQuery.data?.data?.groups.length === 0) {
    content = (
      <div className="text-center p-12 ">
        <div className="text-5xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No courses yet
        </h3>
        <p className="text-gray-500 mb-6">
          You haven't enrolled in any courses.
        </p>
        <MyLink
          to="/courses"
          className="text-brand-primary font-medium hover:underline flex items-center gap-2 mx-auto w-fit"
        >
          Browse Courses <ArrowRight size={18} />
        </MyLink>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {groups.map((round) => (
          <RoundCard
            key={round.id}
            id={round.id}
            title={round.name}
            image={round.course?.image}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="w-2 h-8 bg-brand-primary rounded-full inline-block"></span>
        My Learning
      </h2>
      <div className="flex justify-center items-center text-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {content}
      </div>
    </section>
  );
}

function PlacementTestBanner() {
  const navigate = useNavigate();
  return (
    <section className="bg-brand-primary rounded-2xl p-8 md:p-12 mb-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 "></div>
      <div className="absolute bottom-0 left-1/2 w-40 h-40 rounded-full bg-white/10 "></div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Not sure where to start?
        </h1>
        <p className="text-white/80 text-lg mb-0">
          Take our quick placement test to find the perfect level and courses
          tailored just for you.
        </p>
      </div>
      <Button
        onClick={() => navigate("/placemetn-test")}
        variant="secondary"
        className="text-lg px-4 py-6 relative z-10"
      >
        Take Placement Test
      </Button>
    </section>
  );
}
