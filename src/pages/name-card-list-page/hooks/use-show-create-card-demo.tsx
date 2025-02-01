import { useTour } from "@reactour/tour";
import { RefObject, useEffect } from "react";
import { TutorialStep } from "../../../domain/tutorial/steps";

/**
 * Hook containing the logic for demonstrating how the user can get back the "create new" card when there are already cards created.
 * This is done by scrolling the card stack a bit to the right to let them see there is still something at the end of it. Then scroll it back to the previous position so that the flow won't get disrupted.
 * @param containerRef
 * @returns
 */
export const useShowCreateCardDemo = (
  containerRef: RefObject<HTMLDivElement>
) => {
  const { currentStep, isOpen: isRunningTutorial } = useTour();
  useEffect(() => {
    if (isRunningTutorial && currentStep === TutorialStep.ShowCreateCard) {
      const timeout = setTimeout(() => {
        containerRef.current?.scrollBy({ left: 10, behavior: "smooth" });
        setTimeout(() => {
          containerRef.current?.scrollBy({ left: -10, behavior: "smooth" });
        }, 1000);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [containerRef, currentStep, isRunningTutorial]);
  return null;
};
