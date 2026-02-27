import { Button } from "@/components/shared/Button";
import { Field } from "@/components/shared/field";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { MyLink } from "@/components/shared/MyLink";
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Controller, useForm } from "react-hook-form";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from "react-router";
import { z } from "zod";
import "./Register.css";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch {
    return false;
  }
};

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().refine(isPhoneValid, {
    message: "Phone is not valid",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(
      { name: data.name, phone: data.phone },
      {
        onSuccess: () => {
          navigate("/otp", { state: { phone: data.phone } });
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
              onSubmit={handleSubmit(onSubmit)}
              id="contact-us-form"
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <h2 className="text-2xl font-medium text-center">
                Create Account
              </h2>
              <p className="text-[14px] text-[#12121280] text-center">
                Fill in the fields below to create your account.
              </p>

              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <TextInput control={control} name="name" placeholder="Name" />

              <label htmlFor="phone" className="font-bold">
                Mobile number
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    defaultCountry="eg"
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={errors.phone ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.phone && (
                <div className="text-red-500 text-sm">
                  {errors.phone.message}
                </div>
              )}

              <Field orientation="horizontal" className="w-full">
                <Button
                  type="submit"
                  className="text-xl py-5 w-full"
                  disabled={!isValid || registerMutation.isPending}
                  isLoading={registerMutation.isPending}
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

              <div className="flex gap-2 items-center">
                <div className="flex-1 h-px bg-[#0000001A]"></div>
                <p className="text-[#12121280]">OR</p>
                <div className="flex-1 h-px bg-[#0000001A]"></div>
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
              </Field>
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
