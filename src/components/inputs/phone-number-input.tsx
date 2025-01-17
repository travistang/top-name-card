import { PhoneInput } from "react-international-phone";

type Props = {
  className?: string;
  onChange: (phone: string) => void;
  value: string;
};
export const PhoneNumberInput = ({ className, onChange, value }: Props) => {
  return (
    <PhoneInput
      hideDropdown
      defaultCountry="de"
      inputClassName="w-full"
      countrySelectorStyleProps={{ buttonClassName: "pl-2" }}
      onChange={onChange}
      className={className}
      value={value}
    />
  );
};
