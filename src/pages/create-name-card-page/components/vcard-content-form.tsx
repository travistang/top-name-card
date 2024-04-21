import { TextInput } from "../../../components/inputs/text-input";
import { VCard } from "../../../domain/vcard";

type Props = {
  vCard: VCard;
  onChange: (vCard: VCard) => void;
};

export const VCardContentForm = ({ vCard, onChange }: Props) => {
  const onChangeField =
    <T extends keyof VCard>(key: T) =>
    (value: VCard[T]) => {
      onChange({ ...vCard, [key]: value });
    };

  return (
    <>
      <TextInput
        className="col-span-3"
        label="First name"
        value={vCard.firstName}
        onChange={onChangeField("firstName")}
      />
      <TextInput
        className="col-span-3"
        label="Last name"
        value={vCard.lastName}
        onChange={onChangeField("lastName")}
      />
      <TextInput
        className="col-span-full"
        label="URL"
        value={vCard.url}
        onChange={onChangeField("url")}
      />
      <TextInput
        className="col-span-4"
        label="Phone number"
        value={vCard.phoneNumber}
        type="tel"
        onChange={onChangeField("phoneNumber")}
      />
    </>
  );
};
