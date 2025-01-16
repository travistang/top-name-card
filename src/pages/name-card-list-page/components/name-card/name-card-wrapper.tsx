import classNames from "classnames";
import { motion } from "framer-motion";
import { RefObject } from "react";
import { NameCard as NameCardType, WithId } from "../../../../domain/name-card";
import { NameCardEditForm } from "../name-card-edit-form/name-card-edit-form";
import { DeleteButton } from "./delete-button";
import { NameCard } from "./name-card";
import { useDragUp } from "./use-drag-up";
type Props = {
  container: RefObject<HTMLElement>;
  index: number;
  card: WithId<NameCardType>;
  editing: boolean;
  onToggleEdit: () => void;
};

export const NameCardWrapper = ({
  card,
  index,
  container,
  editing,
  onToggleEdit,
}: Props) => {
  const { dragProps, dragY, deleteButtonScale } = useDragUp(editing);
  return (
    <motion.div
      layout
      className={classNames(
        "flex flex-col flex-shrink-0 justify-center items-stretch snap-center",
        editing ? "bg-slate-dark w-screen" : ""
      )}
      animate={{
        width: editing ? "100vw" : "80vw",
        z: editing ? 20 : 0,
      }}
    >
      <motion.div
        layout
        animate={{ scale: editing ? 0.75 : 1 }}
        transition={{
          delay: 0.2,
          duration: 0.1,
        }}
        className="w-full h-[60vh] origin-top"
      >
        <NameCard
          dragY={dragY}
          index={index}
          dragProps={dragProps}
          card={card}
          container={container}
          editing={editing}
          onRequestEdit={onToggleEdit}
        />
      </motion.div>
      <NameCardEditForm
        card={card}
        editing={editing}
        onToggleEdit={onToggleEdit}
      />
      <DeleteButton onClick={() => {}} scale={deleteButtonScale} />
    </motion.div>
  );
};
