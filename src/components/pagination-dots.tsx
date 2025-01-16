import classNames from "classnames";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useState } from "react";

const rangeN = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);
type Props = {
  numPages: number;
  progress: MotionValue<number>;
  className?: string;
};

type DotProps = {
  index: number;
  interpolatedPage: MotionValue<number>;
};
const inView = (index: number, interpolatedIndex: number) => {
  return index === Math.floor(interpolatedIndex);
};
const dotVariants = {
  true: { scale: 2, backgroundColor: "#6366f1" },
  false: { scale: 1, backgroundColor: "#ffffff" },
};
const Dot = ({ index, interpolatedPage }: DotProps) => {
  const [isInView, setIsInView] = useState(
    inView(index, interpolatedPage.get())
  );

  useMotionValueEvent(interpolatedPage, "change", (interpolatedPage) =>
    setIsInView(inView(index, interpolatedPage))
  );

  return (
    <motion.div
      variants={dotVariants}
      animate={isInView ? "true" : "false"}
      initial={dotVariants}
      className="rounded-full w-1 h-1 mx-0.5"
      transition={{
        duration: 0.3,
      }}
    />
  );
};
export const PaginationDots = ({ numPages, progress, className }: Props) => {
  const interpolatedPage = useTransform(progress, (progress) => {
    return progress * numPages;
  });

  if (!numPages) return null;
  return (
    <div
      className={classNames(
        "flex gap-1 flex-nowrap items-center justify-center",
        className
      )}
    >
      {rangeN(numPages).map((page) => (
        <Dot key={page} index={page} interpolatedPage={interpolatedPage} />
      ))}
    </div>
  );
};
