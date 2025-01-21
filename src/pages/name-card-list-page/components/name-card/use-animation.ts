import { useScroll, useTransform } from "framer-motion";
import { ForwardedRef, RefObject } from "react";

const horizontalTriggerPortion = 0.4;
const inactiveScale = 0.9;

export const useAnimation = (
  container: RefObject<HTMLElement>,
  card: RefObject<HTMLDivElement> | ForwardedRef<HTMLDivElement>
) => {
  const { scrollXProgress } = useScroll({
    container,
    target: card as RefObject<HTMLElement>,
    offset: ["center start", "center end"],
    axis: "x",
  });
  const scale = useTransform(scrollXProgress, (progress) => {
    if (progress <= horizontalTriggerPortion) {
      return (
        inactiveScale +
        (1 - inactiveScale) * (progress / horizontalTriggerPortion)
      );
    }
    if (
      progress > horizontalTriggerPortion &&
      progress <= 1 - horizontalTriggerPortion
    )
      return 1;
    return (
      inactiveScale +
      ((1 - inactiveScale) * (1 - progress)) / horizontalTriggerPortion
    );
  });
  const opacity = useTransform(scale, (scale) =>
    scale > 0.8 ? 1 : 0.6 + (scale - 0.8) / 0.8
  );

  return { scale, opacity };
};
