import { MyLink } from "@/components/shared/MyLink";
import { FiUser } from "react-icons/fi";

export function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-4 bg-brand-secondary h-16 fixed top-0 w-full z-1">
      <img
        src="/englivision-logo-color.png"
        alt="logo"
        className="w-24 -mt-4"
      />
      <ul className="flex gap-8 font-medium  items-baseline">
        <MyLink to="/">Home</MyLink>
        <MyLink to="courses">Courses</MyLink>
        <MyLink to="contact-us">Contact Us</MyLink>
      </ul>
      <div className="flex items-center gap-4">
        <MyLink
          to="login"
          className="px-4 py-2 rounded-lg hover:bg-white/50 transition-colors"
        >
          Login
        </MyLink>
        <MyLink
          to="register"
          className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          Register
        </MyLink>
        <MyLink to="profile">
          <div className="bg-white rounded-lg flex items-center justify-center">
            <FiUser className="m-2 p-1 size-8" />
          </div>
        </MyLink>
      </div>
    </div>
  );
}
