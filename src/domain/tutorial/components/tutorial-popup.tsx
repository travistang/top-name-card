import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StepType, useTour } from "@reactour/tour";
import { PaginationDots } from "../../../components/pagination-dots";
import { TutorialStep } from "../steps";

const stepsWithButtons: TutorialStep[] = [
  TutorialStep.CongratsCreatingFirstCard,
  TutorialStep.EditFormIntro,
  TutorialStep.ShowSwipeToDeleteAnimation,
  TutorialStep.ShowCreateCard,
  TutorialStep.Congrats,
];

type Props = {
  setCurrentStep: (step: number) => void;
  steps: StepType[];
  currentStep: number;
  onTutorialComplete: () => void;
};

export const TutorialPopup = ({
  setCurrentStep,
  steps,
  currentStep,
  onTutorialComplete,
}: Props) => {
  const { setIsOpen } = useTour();
  const isLastStep = currentStep === steps.length - 1;
  const buttonText = isLastStep ? "Complete" : "Next";
  const onNextStepClick = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      return;
    }
    if (isLastStep) {
      onTutorialComplete();
      setIsOpen(false);
    }
  };
  return (
    <div className="flex justify-between items-center pt-4 pb-2">
      <PaginationDots
        inactiveColor="#cccccc"
        numPages={steps.length}
        page={currentStep}
      />
      {stepsWithButtons.includes(currentStep) && (
        <button
          type="button"
          onClick={onNextStepClick}
          className="bg-indigo-500 text-white px-2 py-1 flex-shrink-0 h-10 flex items-center gap-2"
        >
          {buttonText}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};
