import { Logo } from "@/components/shared/Logo";
import { MyLink } from "@/components/shared/MyLink";
import { authHelper } from "@/helpers/authHelper";
import { CourseType, CourseTypeLabels } from "@/types/course";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { FiChevronDown, FiChevronRight, FiChevronsRight, FiLogIn, FiMenu, FiUser, FiUserPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

type NavLink = {
  to?: string;
  label: string;
  children?: { to: string; label: string }[];
};

const guestNavLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/founder", label: "Founder" },
  { to: "/blogs", label: "Blog" },
  {
    label: "Courses",
    to: "/courses",
    children: [
      {
        to: `/courses?type=${CourseType.ONLINE}`,
        label: CourseTypeLabels[CourseType.ONLINE],
      },
      {
        to: `/courses?type=${CourseType.KIDS}`,
        label: CourseTypeLabels[CourseType.KIDS],
      },
      {
        to: `/courses?type=${CourseType.OFFLINE}`,
        label: CourseTypeLabels[CourseType.OFFLINE],
      },
      { to: "/training", label: "Training" },
    ],
  },
  { to: "/contact-us", label: "Contact Us" },
];

const authNavLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/blogs", label: "Blog" },
  { to: "/free-materials", label: "Free Materials" },
  {
    label: "Courses",
    to: "/courses",
    children: [
      {
        to: `/courses?type=${CourseType.ONLINE}`,
        label: CourseTypeLabels[CourseType.ONLINE],
      },
      {
        to: `/courses?type=${CourseType.KIDS}`,
        label: CourseTypeLabels[CourseType.KIDS],
      },
      {
        to: `/courses?type=${CourseType.OFFLINE}`,
        label: CourseTypeLabels[CourseType.OFFLINE],
      },
      { to: "/training", label: "Training" },
    ],
  },
  { to: "/topics", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/founder", label: "Founder" },
  { to: "/contact-us", label: "Contact Us" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropDownOpen, setMobileDropDownOpen] = useState(false);
  const navigate = useNavigate();

  // const logoutMutation = useLogout();

  function handleLogout() {
    // logoutMutation.mutate();
    authHelper.revokeAuth();
    navigate("/");
  }

  const navLinks = authHelper.isAuthenticated() ? authNavLinks : guestNavLinks;

  return (
    <>
      {/* Inline keyframes & styles */}
      <style>{`
        /* Dropdown slide-in */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Dropdown slide-out */
        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-12px);
          }
        }

        /* Staggered mobile link entrance */
        @keyframes fadeslideIn {
          from {
            opacity: 0;
            transform: translateX(-14px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-menu-open {
          animation: slideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .mobile-menu-close {
          animation: slideUp 0.22s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        /* Stagger each link */
        .mobile-link-item {
          opacity: 0;
          animation: fadeslideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .mobile-link-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-link-item:nth-child(2) { animation-delay: 0.10s; }
        .mobile-link-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-link-item:nth-child(4) { animation-delay: 0.20s; }

        /* Desktop link hover underline */
        .nav-link-desktop {
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link-desktop::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 100%;
          height: 2px;
          background: currentColor;
          border-radius: 999px;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center;
        }
        .nav-link-desktop:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* Hamburger icon spin/morph */
        .menu-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.2s ease;
        }
        .menu-icon-open {
          transform: rotate(90deg);
        }

        /* Mobile link hover pill */
        .mobile-nav-link {
          transition: background 0.18s ease, padding-left 0.18s ease, transform 0.18s ease;
          border-radius: 8px;
          padding: 6px 10px;
          display: flex;
        }
        .mobile-nav-link:hover {
          background: rgba(255,255,255,0.15);
          padding-left: 16px;
        }
      `}</style>

      <div className="bg-brand-secondary fixed top-0 w-full z-50 shadow-sm">
        <div className="flex justify-between items-center h-16 py-4 px-6 md:px-12">
          {/* Logo */}
          <Logo className="w-20 mt-0"/>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-8 font-medium items-baseline">
            {navLinks.map(({ to, label, children }) => (
              <li key={label} className="relative group">
                {children ? (
                  <>
                    <MyLink to={to} className="nav-link-desktop cursor-pointer flex items-center gap-1 py-2">
                      {label} <FiChevronDown />
                    </MyLink>
                    <div className="absolute top-[100%] left-0 pt-2 hidden group-hover:block z-50">
                      <div className="flex flex-col bg-white text-gray-800 shadow-lg rounded-lg border border-gray-100 min-w-[160px] py-2">
                        {children.map(child => (
                          <MyLink key={child.label} to={child.to} className="px-4 py-2 hover:bg-gray-100 transition-colors">
                            {child.label}
                          </MyLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <MyLink to={to!} className="nav-link-desktop">
                    {label}
                  </MyLink>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {authHelper.isAuthenticated() ? (
              <>
                <MyLink to="profile">
                  <div className="bg-white rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:shadow-md">
                    <FiUser className="m-2 p-1 size-8" />
                  </div>
                </MyLink>
                <div
                  className="bg-white rounded-lg hover:bg-white/50 transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <LogOut className="m-2 p-1 size-8" />
                </div>
              </>
            ) : (
              <>
                <MyLink
                  to="login"
                  className="px-4 py-2 rounded-lg hover:bg-white/50 transition-colors duration-200 flex items-center gap-2"
                >
                  <FiLogIn /> Login
                </MyLink>
                <MyLink
                  to="register"
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2"
                >
                  <FiUserPlus color="white" /> Register
                </MyLink>
              </>
            )}
          </div>

          {/* Mobile: Auth icon + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {authHelper.isAuthenticated() && (
              <>
                <MyLink to="profile">
                  <div className="bg-white rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105">
                    <FiUser className="m-2 p-1 size-7" />
                  </div>
                </MyLink>
                <div
                  className="px-4 py-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <LogOut />
                </div>
              </>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span
                className={`menu-icon block ${menuOpen ? "menu-icon-open" : ""}`}
              >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-open bg-brand-secondary border-t border-white/20 px-6 py-4 flex flex-col gap-4 shadow-lg">
            <ul className="flex flex-col gap-1 font-medium">
              {navLinks.map(({ to, label, children }, i) => (
                <li
                  key={label}
                  className="mobile-link-item"
                  style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                >
                  {children ? (
                    <div className="flex flex-col">
                      <MyLink to={to} className="mobile-nav-link font-bold opacity-70 flex flex-row items-center gap-1">
                        {label} {!mobileDropDownOpen ? <FiChevronRight onClick={() => { setMobileDropDownOpen(true) }} /> : <FiChevronDown onClick={() => { setMobileDropDownOpen(false) }} />}
                      </MyLink>

                      {mobileDropDownOpen && (
                        <div className="flex flex-col pl-4 border-l border-white/20 ml-2 mt-1 gap-1">
                          {children.map(child => (
                            <MyLink
                              key={child.label}
                              to={child.to}
                            className="mobile-nav-link text-sm"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </MyLink>
                        ))}
                      </div>
                      )}
                    </div>
                  ) : (
                    <MyLink
                      to={to!}
                      className="mobile-nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </MyLink>
                  )}
                </li>
              ))}
            </ul>

            {!authHelper.isAuthenticated() && (
              <div
                className="flex flex-col gap-3 pt-2 border-t border-white/20 mobile-link-item"
                style={{ animationDelay: "0.25s" }}
              >
                <MyLink
                  to="login"
                  className="px-4 py-2 rounded-lg hover:bg-white/50 transition-colors duration-200 flex justify-center items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiLogIn /> Login
                </MyLink>
                <MyLink
                  to="register"
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors duration-200 flex justify-center items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUserPlus color="white" /> Register
                </MyLink>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
