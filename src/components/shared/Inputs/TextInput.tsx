import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shared/field";
import { Input } from "@/components/shared/input";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

export function TextInput<T extends FieldValues>({
  name,
  control,
  placeholder = "",
  title = "",
  type = "text",
  inputClassNames = "",
  labelClassNames = "",
  fieldClassNames = "",
}: {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  title?: string;
  type?: "text" | "email" | "password" | "number";
  inputClassNames?: string;
  labelClassNames?: string;
  fieldClassNames?: string;
}) {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field
            className={cn("gap-2", fieldClassNames)}
            data-invalid={fieldState.invalid}
          >
            {title && (
              <FieldLabel
                className={cn("text-base", labelClassNames)}
                htmlFor={`input-${name}`}
              >
                {title}
              </FieldLabel>
            )}
            <Input
              {...field}
              id={`input-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              type={type}
              className={cn("px-3 py-6", inputClassNames)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
