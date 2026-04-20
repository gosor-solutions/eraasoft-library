import { useGetOwnerSettings } from "@/hooks/queries/useSettingsQueries";
import { Loading } from "@/components/shared/Loading";
import DOMPurify from "dompurify";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export function FounderPage() {
  const { data: owner, isLoading } = useGetOwnerSettings();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!owner) {
    return null;
  }

  const socialLinks = [
    { icon: FaFacebookF, url: owner.owner_facebook, color: "hover:bg-blue-600" },
    { icon: FaTwitter, url: owner.owner_twitter, color: "hover:bg-sky-500" },
    { icon: FaInstagram, url: owner.owner_instagram, color: "hover:bg-pink-600" },
    { icon: FaLinkedin, url: owner.owner_linkedin, color: "hover:bg-blue-700" },
    { icon: FaYoutube, url: owner.owner_youtube, color: "hover:bg-red-600" },
    { icon: FaTelegramPlane, url: owner.owner_telegram, color: "hover:bg-blue-400" },
  ].filter((link) => link.url);

  return (
    <div className="bg-white min-h-screen pt-24 pb-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Image - Now at the Top */}
        <div className="relative mb-12" data-aos="fade-down">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-2xl transform hover:scale-[1.01] transition-transform duration-500">
            <img
              src={owner.owner_image || "/user-placeholder.png"}
              alt="Founder"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-brand-secondary rounded-full -z-0 opacity-40 blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full -z-0 opacity-40 blur-3xl"></div>
        </div>

        {/* Text Content - Below Image */}
        <div className="space-y-8 text-center" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 bg-brand-secondary text-brand-primary rounded-full text-sm font-bold tracking-wider uppercase">
            Founder & CEO
          </div>
          
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed owner-bio text-left"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(owner.owner_bio || "") 
            }}
          />

          {/* Socials - At the Bottom */}
          {socialLinks.length > 0 && (
            <div className="pt-10 border-t border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                Connect with me
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all duration-300 hover:text-white ${link.color} shadow-sm hover:shadow-md hover:-translate-y-1`}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
