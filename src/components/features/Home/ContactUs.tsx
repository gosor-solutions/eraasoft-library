import { Circle } from "@/components/shared/Circle";
import { TextArea } from "@/components/shared/Inputs/TextArea";
import { TextInput } from "@/components/shared/Inputs/TextInput";
import { Button } from "@/components/shared/button";
import { Field } from "@/components/shared/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function ContactSection() {
  return (
    <section className="bg-linear-to-br from-blue-50 to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-linear-to-br from-[#051A3B] to-[#0D47A1] rounded-3xl shadow-2xl overflow-hidden">
          <Circle color="#91B5DC66" size={500} x={-100} y={-100} />
          <Circle color="#91B5DC66" size={400} x={300} y={350} />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12">
            {/* Left Content */}
            <ContactContent />
            {/* Right Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactContent() {
  return (
    <div className="text-white space-y-4">
      <div className="inline-block bg-white text-black bg-opacity-20 px-4 py-1 rounded-lg rounded-bl-none text-sm font-normal mb-2">
        Contact Us
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-8xl font-bold">
        Have a Question?
      </h2>

      <p className="text-white/80 text-base sm:text-lg">
        Send message and we help you contact day
      </p>
    </div>
  );
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  return (
    <form
      id="contact-us-form"
      className="flex flex-col gap-4 justify-center"
      onSubmit={form.handleSubmit(() => {})}
    >
      <TextInput
        control={form.control}
        name="name"
        placeholder="Enter your name"
        inputClassNames="bg-white"
      />
      <TextInput
        control={form.control}
        name="email"
        type="email"
        placeholder="email@example.com"
        inputClassNames="bg-white"
      />
      <TextArea
        control={form.control}
        name="message"
        placeholder="Enter your message"
        inputClassNames="bg-white"
        cols={14}
      />
      <Field orientation="horizontal" className="justify-end">
        <Button
          variant={"secondary"}
          type="submit"
          className="w-full text-xl py-6 mt-4"
        >
          Send Message
        </Button>
      </Field>
    </form>
  );
}
