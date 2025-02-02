import { useTour } from "@reactour/tour";
import { animate, MotionValue } from "framer-motion";
import { useEffect } from "react";
import { TutorialStep } from "../../../../domain/tutorial/steps";

type Props = {
  dragY?: MotionValue<number>;
};
export const useDeleteTutorial = ({ dragY }: Props) => {
  const { currentStep, isOpen: isRunningTutorial } = useTour();
  useEffect(() => {
    if (
      !isRunningTutorial ||
      currentStep !== TutorialStep.ShowSwipeToDeleteAnimation
    )
      return;
    setTimeout(() => {
      if (!dragY) return;
      animate(dragY, [0, -100, -100, -100, 0], {
        duration: 1.5,
        ease: "easeOut",
      });
    }, 800);
  }, [dragY, currentStep, isRunningTutorial]);
};
