import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTour } from "@reactour/tour";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { PaginationDots } from "../../../../components/pagination-dots";
import {
  NameCard,
  NameCardCategory,
  NameCardInputSettings,
} from "../../../../domain/name-card";
import { isNameCardValid } from "../../../../domain/name-card/validator";
import { TutorialStep } from "../../../../domain/tutorial/steps";

import { IconButton } from "../../../../components/inputs/icon-button";
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
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    containerRef.current?.children[currentPage]?.scrollIntoView({
      block: "end",
      inline: "start",
    });
  }, [currentPage]);
  const { currentStep, setCurrentStep, isOpen: isRunningTutorial } = useTour();

  const { qrCodeInputPrefix, qrCodeInputTitle = "QR Code" } =
    NameCardInputSettings[card.category] ?? {};

  const onCategoryChange = (category: NameCardCategory) => {
    onChange({ ...card, category, qrCode: "" });
    if (
      isRunningTutorial &&
      currentStep === TutorialStep.SelectBusinessCategory
    ) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSectionAppear = (nextStep: number) => () => {
    if (!isRunningTutorial) return;
    setCurrentStep(nextStep);
  };

  const toNextSession = (direction: "left" | "right") => () => {
    const nextPage = direction === "left" ? currentPage - 1 : currentPage + 1;
    const clampedNextPage = Math.max(0, Math.min(nextPage, 3));
    setCurrentPage(clampedNextPage);
    if (isRunningTutorial && currentStep === TutorialStep.ClickNextButton) {
      setCurrentStep(currentStep + 1);
    }
  };
  const shouldDisableSubmitButton = !isNameCardValid(card);
  return (
    <>
      {/* Control items and pagination */}
      <div className="flex justify-between px-4 z-10 pointer-events-auto">
        <IconButton
          disabled={currentPage === 0 || isRunningTutorial}
          onClick={toNextSession("left")}
          testId="edit-form-arrow-left"
          icon={faArrowLeft}
          className="w-12 z-10 h-8"
        />
        <PaginationDots page={currentPage} numPages={4} />
        <IconButton
          disabled={currentPage === 3}
          onClick={toNextSession("right")}
          testId="edit-form-arrow-right"
          icon={faArrowRight}
          className="w-12 z-10 h-8"
        />
      </div>
      <div
        ref={containerRef}
        data-testid="create-edit-form"
        className="flex flex-row flex-nowrap snap-x snap-mandatory overflow-x-hidden gap-4 w-full no-scrollbar pb-2"
      >
        <NameCardCategoryPicker
          category={card.category}
          onChange={onCategoryChange}
        />
        {!PHONE_NUMBER_CATEGORIES.includes(card.category) && (
          <TextInputFormSection
            testId="qr-input"
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
          onAppear={handleSectionAppear(TutorialStep.EnterTitle)}
          title="Card title"
          placeholder="Title of the card?"
          onChange={(title) => onChange({ ...card, title })}
          value={card.title}
        />
        <TextInputFormSection
          onAppear={handleSectionAppear(TutorialStep.EnterDetailsAndConfirm)}
          title="Card description"
          placeholder="Keep it short!"
          onChange={(text) => onChange({ ...card, text })}
          value={card.text}
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <button
          data-testid="name-card-edit-form-cancel"
          type="button"
          className="text-sm"
          onClick={onToggleEdit}
        >
          <FontAwesomeIcon icon={faTimes} />
          Cancel
        </button>
        <button
          type="submit"
          data-testid="create-edit-submit-button"
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
