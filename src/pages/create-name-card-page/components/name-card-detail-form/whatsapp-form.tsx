import { useState } from "react";
import { TextInput } from "../../../../components/inputs/text-input";
import { NameCard } from "../../../../domain/name-card";

type Props = {
  nameCard: NameCard;
  onChange: (card: NameCard) => void;
};
const computeNewNameCard = (card: NameCard, phoneNumber: string): NameCard => {
  const sanitizedUrl = encodeURIComponent(phoneNumber.trim().replace(/ /g, ""));
  const url = `https://api.whatsapp.com/send?phone=${sanitizedUrl}`;
  return { ...card, qrCode: url, title: phoneNumber };
};

export const WhatsappForm = ({ nameCard, onChange }: Props) => {
  const [handle, setHandle] = useState("");
  const onHandleInput = (text: string) => {
    setHandle(text);
    onChange(computeNewNameCard(nameCard, text));
  };
  return (
    <TextInput
      value={handle}
      label="Whatsapp number (with country code)"
      onChange={onHandleInput}
    />
  );
};
