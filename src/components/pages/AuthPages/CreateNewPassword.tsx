"use client";

import { Button } from "@/components/shared/Button";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation Schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();``
  const token = searchParams?.get("token"); // Get token from URL

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log("Form data:", data);

      // API call to reset password
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (response.ok) {
        alert("Password reset successfully!");
        router.push("/login");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/englivision-logo-color.png"
              alt="Enjoli Vision"
              className="h-12"
            />
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Create a New Password
            </h1>
            <p className="text-sm text-gray-500">
              Enter your new password below to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <TextInput
              control={form.control}
              name="password"
              title="Create new password"
              placeholder="Min 8 characters"
              type="password"
            />

            {/* Confirm Password */}
            <TextInput
              control={form.control}
              name="confirmPassword"
              title="Confirm password"
              placeholder="Min 8 characters"
              type="password"
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                {...form.register("rememberMe")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 rounded-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Resetting..." : "Reset password"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, #08080866, #08080866),
              url('/bg-auth.jpg')
            `,
          }}
        />
      </div>
    </div>
  );
}
