import { MyLink } from "@/components/shared/MyLink";
import { isAuthenticated } from "@/lib/auth";
import { logger } from "@/lib/logger";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { Button } from "../shared/Button";

export async function NavBar() {
  const isAuthed = await isAuthenticated();
  logger.logData("auth status", isAuthed);

  return (
    <div className="flex justify-between items-center py-4 px-4 bg-brand-secondary h-16 fixed top-0 w-full z-1">
      <Image
        src="/englivision-logo-color.png"
        alt="logo"
        width={100}
        height={100}
        className="w-24 -mt-4"
      />
      <ul className="flex gap-8 font-medium  items-baseline">
        <MyLink to="/">Home</MyLink>
        <MyLink to="courses">Courses</MyLink>
        <MyLink to="contact-us">Contact Us</MyLink>
      </ul>
      <div>
        {isAuthed ? (
          <MyLink to="profile">
            <div className="bg-white rounded-lg flex items-center justify-center">
              <FiUser className="m-2 p-1 size-8 text-2xl text-brand-primary" />
            </div>
          </MyLink>
        ) : (
          <div className="flex gap-2">
            <MyLink to="register">
              <Button className="px-6">Register</Button>
            </MyLink>
            <MyLink to="login">
              <Button className="px-6" variant={"secondary"}>
                Login
              </Button>
            </MyLink>
          </div>
        )}
      </div>
    </div>
  );
}
