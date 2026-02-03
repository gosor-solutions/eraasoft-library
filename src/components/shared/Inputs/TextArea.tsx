import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shared/field";
import { Textarea } from "@/components/shared/textarea";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

export function TextArea<T extends FieldValues>({
  name,
  control,
  placeholder = "",
  title = "",
  cols = 20,
  inputClassNames = "",
  labelClassNames = "",
  fieldClassNames = "",
  resize = "none",
}: {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  title?: string;
  cols?: number;
  inputClassNames?: string;
  labelClassNames?: string;
  fieldClassNames?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
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
            <Textarea
              {...field}
              id={`input-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className={cn("px-3 py-6", inputClassNames)}
              style={{
                height: `${cols * 10}px`,
                resize,
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
