import { TextArea } from "@/components/shared/Inputs/TextArea";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { Button } from "@/components/shared/button";
import { Field } from "@/components/shared/field";
import { useSubmitTrainingRequest } from "@/hooks/mutations/useTrainingMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  company_name: z.string().min(2, "Company name is required"),
  number_of_employees: z.string().min(1, "Number of employees must be at least 1"),
  whatsapp_number: z.string().regex(/^01[0125]{1}[0-9]{8}$/, "Invalid WhatsApp number"),
  email: z.email("Invalid email address"),
  notes: z.string(),
});

type TrainingFormValues = z.infer<typeof formSchema>;

export function TrainingForm() {
  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company_name: "",
      number_of_employees: "0",
      whatsapp_number: "",
      email: "",
      notes: "",
    },
  });

  const { mutate, isPending } = useSubmitTrainingRequest();

  function onSubmit(data: TrainingFormValues) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Training request sent successfully", {
          position: "bottom-right",
        });
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send training request", {
          position: "bottom-right",
        });
      },
    });
  }

  return (
    <form
      id="training-request-form"
      className="flex flex-col gap-4 justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <TextInput
        control={form.control}
        name="name"
        title="Full Name"
        placeholder="Enter your full name"
      />
      <TextInput
        control={form.control}
        name="company_name"
        title="Company Name"
        placeholder="Enter company name"
      />
      <TextInput
        control={form.control}
        name="number_of_employees"
        title="Number of Employees"
        type="number"
        placeholder="e.g. 50"
      />
      <TextInput
        control={form.control}
        name="whatsapp_number"
        title="WhatsApp Number"
        placeholder="01012345678"
      />
      <TextInput
        control={form.control}
        name="email"
        title="Email Address"
        type="email"
        placeholder="email@example.com"
      />
      <TextArea
        control={form.control}
        name="notes"
        title="Additional Notes"
        placeholder="Any specific requirements or notes"
        cols={20}
      />
      <Field orientation="horizontal" className="justify-end">
        <Button
          type="submit"
          className="w-full sm:w-1/2 text-xl py-6 mt-4"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Submit Request"}
        </Button>
      </Field>
    </form>
  );
}
