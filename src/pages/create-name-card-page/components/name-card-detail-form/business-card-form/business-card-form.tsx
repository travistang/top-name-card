import { useState } from "react";

import { TextInput } from "../../../../../components/inputs/text-input";
import { NameCard } from "../../../../../domain/name-card";
import {
  VCard,
  getVCardText,
  retrieveVCardFromNameCard,
} from "../../../../../domain/vcard";
import { VCardContentForm } from "../../vcard-content-form";

type Props = {
  nameCard: NameCard;
  onChange: (card: NameCard) => void;
};

const computeNewNameCard = (card: NameCard, vcard: VCard): NameCard => {
  return { ...card, qrCode: getVCardText(vcard) };
};

export const BusinessCardForm = ({ nameCard, onChange }: Props) => {
  const [vcard, setVCard] = useState<VCard>(
    retrieveVCardFromNameCard(nameCard)
  );
  const onHandleInput = (vcard: VCard) => {
    setVCard(vcard);
    onChange(computeNewNameCard(nameCard, vcard));
  };
  return (
    <div className="grid grid-cols-6 gap-2">
      <TextInput
        className="col-span-full pb-4 mb-2 border-b border-gray-500/70"
        value={nameCard.title}
        label="Title"
        onChange={(title) => onChange({ ...nameCard, title })}
      />
      <VCardContentForm vCard={vcard} onChange={onHandleInput} />
    </div>
  );
};
