import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
};
export const CreateNameCard = ({ onClick }: Props) => {
  return (
    <div className="w-screen flex-shrink-0 flex items-center justify-center">
      <motion.div
        data-testid="create-name-card"
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-4 snap-center text-slate-light border-2 border-dashed border-slate-light rounded-xl p-8 aspect-[9_/_16] self-center overflow-hidden mb-20 flex-grow w-96 max-w-[70vw] max-h-[80vh] text-center"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Create new...</span>
      </motion.div>
    </div>
  );
};
