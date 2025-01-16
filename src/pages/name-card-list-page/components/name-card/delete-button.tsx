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
      className="flex justify-center self-center h-10 w-10 mt-4"
    >
      <IconButton
        onClick={onClick}
        className="rounded-full p-4 aspect-square h-full w-full text-white bg-red-500/30"
        icon={faTrash}
      />
    </motion.div>
  );
};
