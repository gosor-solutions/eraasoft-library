import { MyLink } from "@/components/shared/MyLink";
import { authHelper } from "@/helpers/authHelper";
import { useLogout } from "@/hooks/mutations/useAuthMutations";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router";
import { Button } from "../shared/button";

export function AuthedNavbar() {
  const navigate = useNavigate();

  const logoutMutation = useLogout();

  function handleLogout() {
    logoutMutation.mutate();
    authHelper.revokeAuth();
    navigate("/");
  }

  return (
    <div className="flex justify-between items-center py-4 px-4 bg-brand-secondary h-16 fixed top-0 w-full z-1">
      <img
        src="/englivision-logo-color.png"
        alt="logo"
        className="w-24 -mt-4 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <ul className="flex gap-8 font-medium items-baseline">
        <MyLink to="/">Home</MyLink>
        <MyLink to="free-materials">Free Materials</MyLink>
        <MyLink to="courses">Courses</MyLink>
        <MyLink to="topics">Topics</MyLink>
        <MyLink to="contact-us">Contact Us</MyLink>
      </ul>
      <div className="flex items-center gap-4">
        <Button
          onClick={handleLogout}
          className="px-4 py-2 hover:bg-red-500/10 hover:text-red-500"
        >
          Logout
        </Button>
        <MyLink to="profile">
          <div className="bg-white rounded-lg flex items-center justify-center hover:bg-brand-primary/10 transition-colors">
            <FiUser className="m-2 p-1 size-8" />
          </div>
        </MyLink>
      </div>
    </div>
  );
}
