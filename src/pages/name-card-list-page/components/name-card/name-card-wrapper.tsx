import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
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
  className?: string;
  onToggleEdit: () => void;
  onDelete?: () => void;
  onConfirmUpdate: () => void;
  confirmFormText?: string;
  onChange: (card: WithId<NameCardType>) => void;
};

const cardVariants = {
  editing: {
    scale: 0.7,
    y: -100,
  },
  idle: {
    scale: 1,
    y: 0,
  },
};

export const NameCardWrapper = ({
  card,
  index,
  className,
  container,
  editing,
  onToggleEdit,
  onConfirmUpdate,
  onChange,
  confirmFormText,
  onDelete,
}: Props) => {
  const { dragProps, dragY, deleteButtonScale } = useDragUp(editing);

  const variantName = editing ? "editing" : "idle";
  return (
    <motion.div
      layout
      key={card.id ?? "adding"}
      className={classNames(
        "flex flex-col flex-shrink-0 flex-grow-0 justify-center items-center snap-center w-screen overflow-x-hidden no-scrollbar relative",
        className
      )}
    >
      <motion.div
        layout
        animate={variantName}
        variants={cardVariants}
        transition={{
          duration: 0.1,
          delayChildren: 0.5,
          staggerChildren: 0.5,
          ease: "easeInOut",
          damping: 12,
          stiffness: 300,
          type: "spring",
        }}
        className="flex-1 flex-shrink-0 flex items-center justify-center origin-center"
      >
        <NameCard
          dragY={dragY}
          index={index}
          dragProps={dragProps}
          card={card}
          container={container}
          onRequestEdit={onToggleEdit}
        />
      </motion.div>
      {onDelete && (
        <DeleteButton onClick={onDelete} scale={deleteButtonScale} />
      )}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0, translateY: 1000 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 1000 }}
            transition={{
              duration: 0.3,
              type: "spring",
            }}
            className="flex-1 flex-shrink-0 gap-2 bg-slate-dark w-full px-4 justify-end flex flex-col items-stretch absolute bottom-0 left-0"
          >
            <NameCardEditForm
              card={card}
              confirmFormText={confirmFormText}
              onToggleEdit={onToggleEdit}
              onConfirmUpdate={onConfirmUpdate}
              onChange={(newCard) => onChange({ ...newCard, id: card.id })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
