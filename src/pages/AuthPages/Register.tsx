import { Button } from "@/components/shared/button";
import { Field } from "@/components/shared/field";
import { MyLink } from "@/components/shared/MyLink";
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useState } from "react";
// import { BiLogoFacebookCircle } from "react-icons/bi";
// import { FcGoogle } from "react-icons/fc";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from "react-router";
import "./Register.css";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch {
    return false;
  }
};

export default function Register() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  const phoneValid = isPhoneValid(phone);
  const nameValid = name.trim().length > 0;
  const canSubmit = phoneValid && nameValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);

    register(
      { phone, name },
      {
        onSuccess: () => {
          navigate("/otp", { state: { phone } });
        },
        onError: () => {
          setError("Registration failed. Please try again.");
        },
      },
    );
  };

  return (
    <div className="relative min-h-screen ">
      <div className="absolute logo-circle">
        <img src="/englivision-logo-color.png" alt="Logo" />
      </div>
      <div className="bottom-left-circle"></div>
      <div className="small-circle"></div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex items-center justify-center p-8 lg:p-40">
            <form
              id="contact-us-form"
              className="flex flex-col gap-4 w-full max-w-md"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-medium text-center">
                Create Account
              </h2>
              <p className="text-[14px] text-[#12121280] text-center">
                Fill in the fields below to create your account.
              </p>

              <label htmlFor="name" className="font-bold">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {!nameValid && name && (
                <div className="text-red-500 text-sm">Name is required</div>
              )}

              <label htmlFor="phone" className="font-bold">
                Mobile number
              </label>
              <PhoneInput
                defaultCountry="eg"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />

              {!phoneValid && phone && (
                <div className="text-red-500 text-sm">Phone is not valid</div>
              )}

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <Field orientation="horizontal" className="w-full">
                <Button
                  type="submit"
                  className="text-xl py-5 w-full"
                  disabled={!canSubmit || isPending}
                  isLoading={isPending}
                >
                  Sign Up
                </Button>
              </Field>
              <div className="flex justify-center text-sm">
                <MyLink
                  to="/login"
                  className="text-brand-primary hover:underline"
                >
                  Already have an account? Login
                </MyLink>
              </div>

              {/* <div className="flex gap-2 items-center">
                <div className="flex-1 h-[1px] bg-[#0000001A]"></div>
                <p className="text-[#12121280]">OR</p>
                <div className="flex-1 h-[1px] bg-[#0000001A]"></div>
              </div>

              <Field orientation="horizontal" className="w-full shadow-lg">
                <Button
                  type="button"
                  className="text-base font-medium py-6 cursor-pointer w-full bg-white border border-[#0000000D] text-black hover:bg-gray-50"
                >
                  <FcGoogle className="text-xl" />
                  Sign Up with Google
                </Button>
              </Field>

              <Field orientation="horizontal" className="w-full shadow-lg">
                <Button
                  type="button"
                  className="text-base font-medium py-6 cursor-pointer w-full bg-white border border-[#0000000D] text-black hover:bg-gray-50"
                >
                  <BiLogoFacebookCircle className="text-xl text-blue-600" />
                  Sign Up with Facebook
                </Button>
              </Field> */}
            </form>
          </div>

          {/* Image Section - Hidden on mobile/tablet, visible on desktop */}
          <div className="hidden lg:block relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/bg-auth.jpg')` }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "#08080866" }}
            />

            <div className="relative z-10 flex items-end justify-start h-full p-12">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">
                  Welcome to Enjoli Vision
                </h2>
                <p className="text-gray-200">
                  Start your journey with us today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
