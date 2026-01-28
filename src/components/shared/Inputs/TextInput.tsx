import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shared/field";
import { Input } from "@/components/shared/input";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

export function TextInput<T extends FieldValues>({
  name,
  control,
  placeholder = "",
  title = "",
  type = "text",
}: {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  title?: string;
  type?: "text" | "email" | "password" | "number";
}) {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-2" data-invalid={fieldState.invalid}>
            {title && (
              <FieldLabel className="text-base" htmlFor={`input-${name}`}>
                {title}
              </FieldLabel>
            )}
            <Input
              {...field}
              id={`input-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              type={type}
              className="px-3 py-6"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
