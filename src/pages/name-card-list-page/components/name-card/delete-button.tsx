import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion, MotionValue } from "framer-motion";
import { IconButton } from "../../../../components/inputs/icon-button";

type Props = {
  onClick: () => void;
  scale: MotionValue<number>;
};
export const DeleteButton = ({ onClick, scale }: Props) => {
  return (
    <motion.div
      key="deleteButton"
      style={{
        scale,
        opacity: scale,
      }}
      className="flex justify-center self-center mt-4 mb-8 h-10 w-10"
    >
      <IconButton
        onClick={onClick}
        className=" rounded-full p-4 aspect-square text-white bg-red-500/30 h-full w-full"
        icon={faTrash}
      />
    </motion.div>
  );
};
