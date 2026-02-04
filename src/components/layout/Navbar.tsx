import { MyLink } from "@/components/shared/MyLink";
import { FiUser } from "react-icons/fi";

export function NavBar() {
  return (
    <div className="flex justify-between items-center pb-4 px-4 bg-brand-secondary h-20">
      <img src="/englivision-logo-color.png" alt="logo" className="w-24" />
      <ul className="flex gap-8 font-medium items-baseline mt-4">
        <MyLink to="/">Home</MyLink>
        <MyLink to="courses">Courses</MyLink>
      </ul>
      <div>
        <MyLink to="profile">
          <div className="bg-white rounded-lg flex items-center justify-center mt-4">
            <FiUser className="m-2 p-1 size-8" />
          </div>
        </MyLink>
      </div>
    </div>
  );
}
