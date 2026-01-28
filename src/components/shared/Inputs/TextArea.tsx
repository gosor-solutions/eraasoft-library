import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shared/field";
import { Textarea } from "@/components/shared/textarea";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

export function TextArea<T extends FieldValues>({
  name,
  control,
  placeholder = "",
  title = "",
  cols = 20,
}: {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  title?: string;
  cols?: number;
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
            <Textarea
              {...field}
              id={`input-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className={`px-3 py-6`}
              style={{
                height: `${cols * 10}px`,
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
