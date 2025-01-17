import { TextInput } from "../../../../components/inputs/text-input";
import { FormSection } from "./form-section";

type Props = {
  placeholder?: string;
  value: string;
  prefix?: string;
  onChange: (value: string) => void;
  title: string;
};
export const TextInputFormSection = ({
  placeholder,
  value,
  prefix,
  onChange,
  title,
}: Props) => {
  return (
    <FormSection title={title}>
      <TextInput
        placeholder={placeholder}
        prefix={prefix}
        onChange={onChange}
        inputClassName="text-sm bg-slate-dark"
        className="flex-1"
        value={value}
      />
    </FormSection>
  );
};
