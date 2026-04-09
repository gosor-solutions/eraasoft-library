import { Banner } from "@/components/shared/Banner";

export function TermsAndConditions() {
  return (
    <>
      <Banner title="Terms and Conditions" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 text-gray-800 leading-relaxed">
        <h2 className="text-2xl font-bold mb-4 text-brand-primary">1. Introduction</h2>
        <p className="mb-8">
          Welcome to Engli-Vision. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">2. Use of Site</h2>
        <p className="mb-8">
          You may use our site for lawful purposes only. You must not use our site in any way that breaches any applicable local, national, or international law or regulation.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">3. Intellectual Property</h2>
        <p className="mb-8">
          All content on this site, including text, graphics, logos, and images, is the property of Engli-Vision and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">4. Limitation of Liability</h2>
        <p className="mb-8">
          Engli-Vision shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use our site or services.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-brand-primary">5. Changes to Terms</h2>
        <p className="mb-8">
          We reserve the right to modify these terms at any time. Your continued use of the site after any changes indicates your acceptance of the new terms.
        </p>
      </div>
    </>
  );
}
