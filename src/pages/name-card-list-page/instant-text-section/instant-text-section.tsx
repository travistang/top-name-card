import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TextInput } from "../../../components/inputs/text-input";
import { NameCard, WithId } from "../../../domain/name-card";

type Props = {
  onDisplay: (card: WithId<NameCard>) => void;
};
export const InstanceTextSection = ({ onDisplay }: Props) => {
  const [text, setText] = useState("");
  const [isQRCode] = useState(false);
  const [backgroundColor] = useState("");
  const [color] = useState("");
  const onConfirm = () => {
    onDisplay({
      id: window.crypto.randomUUID(),
      text: !isQRCode ? text : "",
      textColor: color,
      backgroundColor,
      title: "",
      category: "other",
      qrCode: isQRCode ? text : "",
    });
  };
  return (
    <div className="py-8 grid grid-cols-6 gap-2">
      <TextInput
        textArea
        className="col-span-5"
        value={text}
        onChange={setText}
        label="Instant text"
        placeholder="What would you like to say?"
      />
      <button
        className="aspect-square self-end bg-green-500 max-w-32 flex-shrink-0 w-16"
        onClick={onConfirm}
        disabled={!text}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </div>
  );
};
