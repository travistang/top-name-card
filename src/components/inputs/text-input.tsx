import { HTMLInputTypeAttribute } from "react";
import { FormSection } from "../form-section";

type Props = {
  label?: string;
  explanation?: string;
  textArea?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange: (text: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
};
export const TextInput = ({
  label,
  explanation,
  textArea,
  type,
  onChange,
  value,
  placeholder,
  className,
}: Props) => {
  return (
    <FormSection
      explanation={explanation}
      label={label ?? ""}
      className={className}
    >
      {!textArea ? (
        <input
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 px-2"
        />
      ) : (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-36 p-2"
        />
      )}
    </FormSection>
  );
};
