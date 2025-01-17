import { FormSection } from "./form-section";

import "react-international-phone/style.css";
import { PhoneNumberInput } from "../../../../components/inputs/phone-number-input";
type Props = {
  value: string;
  onChange: (value: string) => void;
};
export const PhoneNumberFormSection = ({ value, onChange }: Props) => {
  return (
    <FormSection title="Phone number">
      <PhoneNumberInput onChange={onChange} value={value} />
    </FormSection>
  );
};
