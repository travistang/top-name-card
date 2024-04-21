import { useState } from "react";
import { TextInput } from "../../../../components/inputs/text-input";
import { NameCard } from "../../../../domain/name-card";

type Props = {
  nameCard: NameCard;
  onChange: (card: NameCard) => void;
};
const computeNewNameCard = (card: NameCard, handle: string): NameCard => {
  const url = `https://instagram.com/${handle}`;
  return { ...card, qrCode: url, title: `@${handle}` };
};

export const InstagramForm = ({ nameCard, onChange }: Props) => {
  const [handle, setHandle] = useState("");
  const onHandleInput = (text: string) => {
    setHandle(text);
    onChange(computeNewNameCard(nameCard, text));
  };
  return (
    <TextInput
      value={handle}
      label="Instagram handle"
      onChange={onHandleInput}
    />
  );
};
