import { TextArea } from "@/components/shared/Inputs/TextArea";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { Button } from "@/components/shared/button";
import { Field } from "@/components/shared/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export function ContactUsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // TODO: change this
  function onSubmit(/*data: z.infer<typeof formSchema>*/) {
    toast.success("Message sent successfully", {
      position: "bottom-right",
    });

    // TODO: make this a utility function
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // });
  }

  return (
    <form
      id="contact-us-form"
      className="flex flex-col gap-4 justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
      <TextInput
        control={form.control}
        name="phone"
        title="Phone"
        placeholder="Enter your phone number"
      />
      <TextArea
        control={form.control}
        name="message"
        title="Message"
        placeholder="Enter your message"
        cols={20}
      />
      <Field orientation="horizontal" className="justify-end">
        <Button type="submit" className="w-1/2 text-xl py-6 mt-4">
          Send Message
        </Button>
      </Field>
    </form>
  );
}
