import { useRef } from "react";
import { PhoneInput, PhoneInputRefType } from "react-international-phone";

type Props = {
  className?: string;
  onChange: (phone: string) => void;
  value: string;
};
export const PhoneNumberInput = ({ className, onChange, value }: Props) => {
  const inputRef = useRef<PhoneInputRefType>(null);

  return (
    <PhoneInput
      hideDropdown
      ref={inputRef}
      defaultCountry="de"
      inputClassName="w-full"
      countrySelectorStyleProps={{ buttonClassName: "pl-2" }}
      onChange={onChange}
      className={className}
      value={value}
    />
  );
};
