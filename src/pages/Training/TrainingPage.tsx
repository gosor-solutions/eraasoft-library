import { TrainingForm } from "@/components/features/Training/TrainingForm";
import { Banner } from "@/components/shared/Banner";

export function TrainingPage() {
  return (
    <>
      <Banner title="Professional Training" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 lg:px-12 py-10 lg:py-0 gap-8 lg:gap-12">
        {/* Visual Element — hidden on mobile, shows on lg+ */}
        <div className="hidden lg:flex items-center justify-center py-16 xl:py-24">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src="/training.png"
              alt="training"
              className="relative w-full max-w-md xl:max-w-lg h-auto object-contain rounded-2xl"
              onError={(e) => {
                // If the user doesn't have a training.png, hide it or use placeholder
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center py-10 sm:py-16 lg:py-24 lg:px-8 xl:px-16">
          <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl shadow-brand-secondary/10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Training</h2>
              <p className="text-gray-500">Transform your workforce with our world-class training programs. Fill out the form and we'll get back to you with a customized proposal.</p>
            </div>
            <TrainingForm />
          </div>
        </div>
      </div>
    </>
  );
}
