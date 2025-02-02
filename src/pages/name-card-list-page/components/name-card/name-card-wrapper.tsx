import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, useMemo, useState } from "react";
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
  testId?: string;
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
    y: -150,
  },
  deleting: {
    y: -10000,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  idle: {
    scale: 1,
    y: 0,
  },
};

export const NameCardWrapper = ({
  testId,
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
  const [deleting, setDeleting] = useState(false);

  const requestDelete = () => {
    if (!onDelete || deleting) return;
    setDeleting(true);
    setTimeout(() => {
      onDelete?.();
    }, 500);
  };
  const variantName = useMemo(() => {
    if (deleting) return "deleting";
    if (editing) return "editing";
    return "idle";
  }, [deleting, editing]);
  return (
    <motion.div
      layout
      data-testid={testId}
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
          duration: 0.3,
          delayChildren: 0.5,
          staggerChildren: 0.5,
          ease: "easeInOut",
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
      {onDelete && !editing && !deleting && (
        <DeleteButton onClick={requestDelete} scale={deleteButtonScale} />
      )}
      <AnimatePresence>
        {editing && (
          <motion.div
            data-testid="name-card-edit-form-group"
            initial={{ opacity: 0, translateY: 1000 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 1000 }}
            transition={{
              duration: 0.3,
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
