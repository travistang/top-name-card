import { useTour } from "@reactour/tour";
import { useCallback } from "react";

export const useTutorialNextStep = () => {
  const { setCurrentStep, isOpen: isRunningTutorial } = useTour();
  return useCallback(
    (callback: () => void, delay = 0) =>
      async () => {
        await callback();
        if (!isRunningTutorial) return;
        setTimeout(() => {
          setCurrentStep((step) => step + 1);
        }, delay);
      },
    [setCurrentStep, isRunningTutorial]
  );
};
