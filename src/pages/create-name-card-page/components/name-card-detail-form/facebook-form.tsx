import { useState } from "react";
import { TextInput } from "../../../../components/inputs/text-input";
import { NameCard } from "../../../../domain/name-card";

type Props = {
  nameCard: NameCard;
  onChange: (card: NameCard) => void;
};
const computeNewNameCard = (card: NameCard, id: string): NameCard => {
  const sanitizedUrl = encodeURIComponent(id.trim());
  const url = `https://www.facebook.com/${sanitizedUrl}`;
  return { ...card, qrCode: url, title: id };
};

export const FacebookForm = ({ nameCard, onChange }: Props) => {
  const [handle, setHandle] = useState("");
  const onHandleInput = (text: string) => {
    setHandle(text);
    onChange(computeNewNameCard(nameCard, text));
  };
  return (
    <TextInput value={handle} label="Facebook ID" onChange={onHandleInput} />
  );
};
