import classNames from "classnames";
import { motion } from "framer-motion";

const rangeN = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);
type Props = {
  numPages: number;
  page: number;
  className?: string;
};

type DotProps = {
  index: number;
  isActive?: boolean;
};

const dotVariants = {
  true: { scale: 2, backgroundColor: "#6366f1" },
  false: { scale: 1, backgroundColor: "#ffffff" },
};

const Dot = ({ isActive }: DotProps) => {
  return (
    <motion.div
      variants={dotVariants}
      animate={isActive ? "true" : "false"}
      initial={dotVariants}
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
        <Dot key={page} index={page} isActive={activePage === page} />
      ))}
    </div>
  );
};
