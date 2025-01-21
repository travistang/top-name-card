import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
};
export const CreateNameCard = ({ onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-4 snap-center text-slate-light border-2 border-dashed border-slate-light rounded-xl p-8 flex-shrink-0 w-[70vw] aspect-[9_/_16] self-center overflow-hidden mb-20"
    >
      <FontAwesomeIcon icon={faPlus} />
      <span>Create new...</span>
    </motion.div>
  );
};
