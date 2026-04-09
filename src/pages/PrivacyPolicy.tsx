import { Banner } from "@/components/shared/Banner";

export function PrivacyPolicy() {
  return (
    <>
      <Banner title="Privacy Policy" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 text-gray-800 leading-relaxed">
        <h2 className="text-2xl font-bold mb-4 text-brand-primary">1. Information We Collect</h2>
        <p className="mb-8">
          We may collect personal information such as your name, email address, phone number, and other relevant details when you interact with our website or use our services.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">2. How We Use Your Information</h2>
        <p className="mb-8">
          The information we collect may be used to personalize your experience, improve our website, process transactions, and send periodic emails regarding updates or other services.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">3. Data Protection</h2>
        <p className="mb-8">
          We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">4. Cookies</h2>
        <p className="mb-8">
          Our site may use "cookies" to enhance user experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">5. Contact Us</h2>
        <p className="mb-8">
          If you have any questions regarding this privacy policy, you may contact us using the information on our website.
        </p>
      </div>
    </>
  );
}
