import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useRef } from "react";
import { PaginationDots } from "../../../../components/pagination-dots";
import {
  NameCard,
  NameCardCategory,
  NameCardInputSettings,
} from "../../../../domain/name-card";
import { isNameCardValid } from "../../../../domain/name-card/validator";
import { useScrollPage } from "../../../../hooks/use-scroll-page";
import { NameCardCategoryPicker } from "./name-card-category-picker";
import { PhoneNumberFormSection } from "./phone-number-form-section";
import { TextInputFormSection } from "./text-input-form-section";
import { VCardFormSection } from "./vcard-form-section";

type Props = {
  card: NameCard;
  onChange: (cardInfo: NameCard) => void;
  onConfirmUpdate: () => void;
  onToggleEdit: () => void;
  confirmFormText?: string;
};

const PHONE_NUMBER_CATEGORIES: NameCardCategory[] = [
  "phone-number",
  "whatsapp",
];

export const NameCardEditForm = ({
  card,
  onToggleEdit,
  confirmFormText = "Update",
  onConfirmUpdate,
  onChange,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPage = useScrollPage(containerRef);
  const { qrCodeInputPrefix, qrCodeInputTitle = "QR Code" } =
    NameCardInputSettings[card.category] ?? {};

  const onCategoryChange = (category: NameCardCategory) => {
    onChange({ ...card, category, qrCode: "" });
  };

  const shouldDisableSubmitButton = !isNameCardValid(card);
  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-row flex-nowrap snap-x snap-mandatory overflow-x-auto gap-4 w-full no-scrollbar pb-2"
      >
        <NameCardCategoryPicker
          category={card.category}
          onChange={onCategoryChange}
        />
        {!PHONE_NUMBER_CATEGORIES.includes(card.category) && (
          <TextInputFormSection
            data-index={1}
            title={qrCodeInputTitle}
            prefix={qrCodeInputPrefix}
            onChange={(qrCode) => onChange({ ...card, qrCode })}
            value={card.qrCode}
          />
        )}
        {card.category === "whatsapp" && (
          <PhoneNumberFormSection
            onChange={(qrCode) => onChange({ ...card, qrCode })}
            value={card.qrCode}
          />
        )}
        {card.category === "phone-number" && (
          <VCardFormSection
            onChange={(qrCode) => onChange({ ...card, qrCode })}
            value={card.qrCode}
          />
        )}
        <TextInputFormSection
          title="Card title"
          placeholder="Title of the card?"
          onChange={(title) => onChange({ ...card, title })}
          value={card.title}
        />
        <TextInputFormSection
          title="Card description"
          placeholder="Keep it short!"
          onChange={(text) => onChange({ ...card, text })}
          value={card.text}
        />
      </div>
      <PaginationDots page={currentPage} numPages={4} />
      <div className="flex items-center justify-between py-4">
        <button type="button" className="text-sm" onClick={onToggleEdit}>
          <FontAwesomeIcon icon={faTimes} />
          Cancel
        </button>
        <button
          type="submit"
          disabled={shouldDisableSubmitButton}
          onClick={onConfirmUpdate}
          className={classNames(
            "text-sm text-green-500",
            shouldDisableSubmitButton && "cursor-not-allowed opacity-70"
          )}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          {confirmFormText}
        </button>
      </div>
    </>
  );
};
