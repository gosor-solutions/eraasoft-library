import { TextInput } from "@/components/shared/Inputs/TextInput";
import { Button } from "@/components/shared/button";
import { Label } from "@/components/shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { useUpdateUserProfile } from "@/hooks/mutations/useUserMutations";
import { useGetUserProfile } from "@/hooks/queries/useUserProfileQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

export function PersonalDataTab() {
  const { data } = useGetUserProfile();

  const user = data?.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      password: "",
    },
    values: user,
  });

  const { mutate, isPending } = useUpdateUserProfile();

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully", {
          position: "bottom-right",
        });
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send message", {
          position: "bottom-right",
        });
      },
    });
  }

  return (
    <div className="rounded-lg bg-white p-6 border-2 md:p-8">
      <h2 className="mb-6 text-xl font-bold">Personal Information</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          control={form.control}
          name="name"
          title="Name"
          placeholder="Enter your name"
        />
        <TextInput
          control={form.control}
          name="email"
          title="Email"
          type="email"
          placeholder="email@example.com"
        />
        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-base font-medium">
            Mobile number
          </Label>
          <div className="flex gap-3">
            <Select defaultValue="+20">
              <SelectTrigger className="w-24 py-6">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+20">🇪🇬 +20</SelectItem>
                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                <SelectItem value="+971">🇦🇪 +971</SelectItem>
              </SelectContent>
            </Select>
            <TextInput
              control={form.control}
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <TextInput
            control={form.control}
            name="password"
            title="Password"
            type="password"
            placeholder="********"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button size="lg" disabled={isPending} isLoading={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
