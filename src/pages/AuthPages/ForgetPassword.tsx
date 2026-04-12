import { Button } from "@/components/shared/button";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { MyLink } from "@/components/shared/MyLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation Schema
const forgetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPassword() {
  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (/*data: ForgetPasswordFormData*/) => {
    //console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Forgot Password?
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email and we'll send you a reset link
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            control={form.control}
            name="email"
            title="Email Address"
            placeholder="Enter your email"
            type="email"
          />

          <Button
            type="submit"
            className="w-full py-6 cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
          <div className="flex justify-center text-sm">
            <MyLink to="/login" className="text-brand-primary hover:underline">
              Back to Login
            </MyLink>
          </div>
        </form>
      </div>
    </div>
  );
}
