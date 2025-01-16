import { animate, PanInfo, useMotionValue, useTransform } from "framer-motion";

const yOffsetWhenActive = -100;
const dragYThreshold = -20;

export const useDragUp = (editing?: boolean) => {
  const dragY = useMotionValue(0);
  const deleteButtonScale = useTransform(dragY, [0, -100], [0, 1]);
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < dragYThreshold) {
      animate(dragY, -100, {
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
    } else {
      animate(dragY, 0, { type: "spring", stiffness: 300, damping: 20 });
    }
  };
  return {
    dragProps: {
      drag: editing ? false : ("y" as const),
      dragElastic: 0.2,
      dragConstraints: { top: yOffsetWhenActive, right: 0, bottom: 0 },
      dragMomentum: false,
      dragSnapToOrigin: true,
      onDragEnd: handleDragEnd,
    },
    dragY,
    deleteButtonScale,
  };
};
