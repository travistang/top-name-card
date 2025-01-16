import classNames from "classnames";
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
  inputClassName?: string;
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
  inputClassName,
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
          className={classNames("h-10 px-2", inputClassName)}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={classNames("h-36 p-2", inputClassName)}
        />
      )}
    </FormSection>
  );
};
