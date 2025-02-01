import { TextInput } from "../../../../components/inputs/text-input";
import { FormSection } from "./form-section";

type Props = {
  placeholder?: string;
  testId?: string;
  value: string;
  prefix?: string;
  onChange: (value: string) => void;
  title: string;
  onAppear?: () => void;
};
export const TextInputFormSection = ({
  placeholder,
  testId,
  value,
  prefix,
  onChange,
  title,
  onAppear,
}: Props) => {
  return (
    <FormSection testId={testId} onAppear={onAppear} title={title}>
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
