import classNames from "classnames";
import { HTMLInputTypeAttribute } from "react";
import { FormSection } from "../form-section";

type Props = {
  label?: string;
  testId?: string;
  explanation?: string;
  textArea?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange: (text: string) => void;
  value: string;
  prefix?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};
export const TextInput = ({
  label,
  testId,
  explanation,
  textArea,
  type,
  onChange,
  value,
  prefix,
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
        <div className="flex flex-row flex-nowrap rounded-lg">
          {prefix && (
            <span className="h-auto rounded-l-lg px-2 py-1 bg-slate-light/50 text-xs flex items-center justify-center">
              {prefix}
            </span>
          )}
          <input
            data-testid={testId}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={classNames(
              "h-10 px-2 flex-1",
              prefix ? "rounded-l-none rounded-r-lg" : "rounded-lg",
              inputClassName
            )}
          />
        </div>
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
