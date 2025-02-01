import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StepType } from "@reactour/tour";
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
};

export const TutorialPopup = ({
  setCurrentStep,
  steps,
  currentStep,
}: Props) => {
  const buttonText =
    currentStep === TutorialStep.Congrats ? "Complete" : "Next";
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
          onClick={() => setCurrentStep(currentStep + 1)}
          className="bg-indigo-500 text-white px-2 py-1 flex-shrink-0 h-10 flex items-center gap-2"
        >
          {buttonText}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};
