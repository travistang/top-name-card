import { FormSection as InputFormSection } from "../../../../components/form-section";
import { PhoneNumberInput } from "../../../../components/inputs/phone-number-input";
import { TextInput } from "../../../../components/inputs/text-input";
import {
  getVCardText,
  retrieveVCardFromText,
  VCard,
} from "../../../../domain/vcard";
import { FormSection } from "./form-section";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const VCardFormSection = ({ value, onChange }: Props) => {
  const vcard = retrieveVCardFromText(value);

  const onUpdate = (field: keyof VCard) => (value: string) => {
    vcard[field] = value;
    onChange(getVCardText(vcard));
  };
  return (
    <FormSection title="Your contact info">
      <div className="grid grid-cols-4 gap-x-1 gap-y-2">
        <TextInput
          label="First Name"
          value={vcard.firstName}
          onChange={onUpdate("firstName")}
          className="col-span-2"
          inputClassName="bg-slate-dark min-w-0"
        />
        <TextInput
          label="Last Name"
          value={vcard.lastName}
          onChange={onUpdate("lastName")}
          className="col-span-2"
          inputClassName="bg-slate-dark min-w-0"
        />

        <InputFormSection
          className="col-span-full rounded-lg"
          label="Phone number"
        >
          <PhoneNumberInput
            value={vcard.phoneNumber}
            onChange={onUpdate("phoneNumber")}
          />
        </InputFormSection>
      </div>
    </FormSection>
  );
};
