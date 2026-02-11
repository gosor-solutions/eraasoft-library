import { TextInput } from "@/components/shared/Inputs/TextInput";
import { Button } from "@/components/shared/Button";
import { Label } from "@/components/shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters long"),
  lastName: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
});

export function PersonalDataTab() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="rounded-lg bg-white p-6 border-2 md:p-8">
      <h2 className="mb-6 text-xl font-bold">Personal Information</h2>

      <form className="space-y-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TextInput
            control={form.control}
            name="firstName"
            title="First Name"
            placeholder="Enter your first name"
          />
          <TextInput
            control={form.control}
            name="lastName"
            title="Last Name"
            placeholder="Enter your last name"
          />
        </div>
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
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button size="lg">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
