import classNames from "classnames";
import { motion } from "framer-motion";

const rangeN = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);
type Props = {
  numPages: number;
  page: number;
  inactiveColor?: string;
  activeColor?: string;
  className?: string;
};

type DotProps = {
  index: number;
  inactiveColor?: string;
  activeColor?: string;
  isActive?: boolean;
};

const dotVariants = ({
  inactiveColor,
  activeColor,
}: {
  inactiveColor: string;
  activeColor: string;
}) => ({
  true: { scale: 2, backgroundColor: activeColor },
  false: { scale: 1, backgroundColor: inactiveColor },
});

const Dot = ({
  isActive,
  inactiveColor = "#ffffff",
  activeColor = "#6366f1",
}: DotProps) => {
  const variants = dotVariants({ inactiveColor, activeColor });
  return (
    <motion.div
      variants={variants}
      animate={isActive ? "true" : "false"}
      initial={variants}
      className="rounded-full w-1 h-1 mx-0.5"
      transition={{
        duration: 0.3,
      }}
    />
  );
};
export const PaginationDots = ({
  numPages,
  page: activePage,
  inactiveColor,
  activeColor,
  className,
}: Props) => {
  if (!numPages) return null;
  return (
    <div
      className={classNames(
        "flex gap-1 flex-nowrap items-center justify-center",
        className
      )}
    >
      {rangeN(numPages).map((page) => (
        <Dot
          key={page}
          index={page}
          inactiveColor={inactiveColor}
          activeColor={activeColor}
          isActive={activePage === page}
        />
      ))}
    </div>
  );
};
