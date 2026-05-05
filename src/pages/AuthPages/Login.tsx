import { Button } from "@/components/shared/button";
import { Field } from "@/components/shared/field";
import { MyLink } from "@/components/shared/MyLink";
import { useLogin } from "@/hooks/mutations/useAuthMutations";
import { Logo } from "@/components/shared/Logo";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { authHelper } from "@/helpers/authHelper";
import { FieldError } from "@/components/shared/field";
import "./Register.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: (response) => {
        if (response?.data?.token) {
          authHelper.setAuth(response.data.token);
          navigate("/");
        }
      },
      onError: () => {
        setError("root", { message: "Invalid email or password" });
      },
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute logo-circle cursor-pointer" onClick={() => navigate("/")}>
        <Logo />
      </div>
      <div className="bottom-left-circle"></div>
      <div className="small-circle"></div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex items-center justify-center p-8 lg:p-40">
            <form
              id="contact-us-form"
              className="flex flex-col gap-4 w-full max-w-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-2xl font-medium text-center">
                Welcome Back!
              </h2>
              <p className="text-[14px] text-[#12121280] text-center">
                Enter your email and password to access your account.
              </p>

              <TextInput
                name="email"
                control={control}
                title="Email Address"
                placeholder="Enter your email"
                type="email"
              />

              <TextInput
                name="password"
                control={control}
                title="Password"
                placeholder="Enter your password"
                type="password"
              />

              {errors.root && (
                <FieldError className="text-center" errors={[errors.root]} />
              )}

              <Field orientation="horizontal" className="w-full">
                <Button
                  type="submit"
                  className="text-xl py-5 w-full"
                  disabled={isPending}
                  isLoading={isPending}
                >
                  Login
                </Button>
              </Field>
              <div className="flex justify-between items-center text-sm">
                <MyLink
                  to="/forget-password"
                  className="text-brand-primary hover:underline"
                >
                  Forgot Password?
                </MyLink>
                <MyLink
                  to="/register"
                  className="text-brand-primary hover:underline"
                >
                  Don't have an account? Register
                </MyLink>
              </div>
            </form>
          </div>

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
                  Welcome to Engli-Vision
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

