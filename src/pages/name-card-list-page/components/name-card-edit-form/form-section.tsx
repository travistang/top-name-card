import { motion } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
};
export const FormSection = ({ title, children }: Props) => {
  return (
    <motion.div className="snap-start px-4 py-2 rounded-lg flex flex-col gap-2 bg-slate shadow-lg w-full flex-shrink-0">
      <h6 className="text-xs pl-1">{title}</h6>
      {children}
    </motion.div>
  );
};
