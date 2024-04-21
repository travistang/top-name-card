import { FormSection } from "../../../../components/form-section";
import { TextInput } from "../../../../components/inputs/text-input";
import { NameCard } from "../../../../domain/name-card";

type Props = {
  nameCard: NameCard;
  onChange: (card: NameCard) => void;
};

export const ArbitraryNameCardForm = ({ nameCard, onChange }: Props) => {
  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-4">
      <FormSection className="col-span-full h-min" label="Title">
        <input
          className="h-12 px-2"
          value={nameCard.title}
          onChange={(e) => onChange({ ...nameCard, title: e.target.value })}
        />
      </FormSection>
      <TextInput
        className="col-span-full"
        placeholder="Text that the QR Code contains (e.g. URL)"
        label="QR Code content"
        value={nameCard.qrCode}
        onChange={(qrCode) => onChange({ ...nameCard, qrCode })}
      />
      <TextInput
        textArea
        label="Large text"
        explanation="if a QR Code present, this text will be shown below it. Otherwise it will be a large text showing on screen."
        className="col-span-full"
        value={nameCard.text}
        onChange={(text) => onChange({ ...nameCard, text })}
        placeholder="Text to be shown in large"
      />
    </div>
  );
};
