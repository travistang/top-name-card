import classNames from "classnames";
import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { PaginationDots } from "../../../components/pagination-dots";
import {
  NameCard,
  NameCard as NameCardType,
  WithId,
} from "../../../domain/name-card";
import { NameCardWrapper } from "./name-card/name-card-wrapper";

type Props = {
  nameCards: WithId<NameCardType>[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: NameCard) => void;
};

const paginationDotVariants = {
  editing: {
    translateY: 1000,
    opacity: 0,
  },
  idle: {
    translateY: 0,
    opacity: 1,
  },
};
export const NameCardList = ({ nameCards, onDelete, onUpdate }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editingCard, setEditingCard] = useState<
    (NameCard & { id?: string }) | null
  >(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const isEditing = !!editingCard?.id;

  const onToggleEdit = (card: WithId<NameCard>) => () => {
    const isEditingCard = editingCard?.id === card.id;
    setEditingCard(isEditingCard ? null : card);
  };

  const getCardInfo = (card: WithId<NameCard>) => {
    const isEditingCard = editingCard?.id === card.id;
    if (!isEditingCard) {
      return card;
    }
    return editingCard as WithId<NameCard>;
  };

  const onCardEditInput = (card: WithId<NameCard>) => {
    if (editingCard?.id !== card.id) return;
    setEditingCard(card);
  };

  const onConfirmUpdate = async () => {
    if (!isEditing) return;
    await onUpdate(editingCard.id!, editingCard);
    setEditingCard(null);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={classNames(
          "relative flex flex-row flex-nowrap  snap-x snap-mandatory scroll-smooth flex-1 items-stretch no-scrollbar touch-pan-x",
          isEditing ? "overflow-x-hidden" : "overflow-x-auto"
        )}
      >
        {nameCards.map((card, index) => (
          <NameCardWrapper
            key={card.id}
            index={index}
            card={getCardInfo(card)}
            editing={editingCard?.id === card.id}
            onToggleEdit={onToggleEdit(card)}
            onChange={onCardEditInput}
            onDelete={() => onDelete(card.id)}
            onConfirmUpdate={onConfirmUpdate}
            container={containerRef}
          />
        ))}
      </div>
      <motion.div
        animate={isEditing ? "editing" : "idle"}
        variants={paginationDotVariants}
        transition={{ duration: 0.2, type: "spring" }}
        className="flex items-center justify-center"
      >
        <PaginationDots
          progress={scrollXProgress}
          numPages={nameCards.length}
          className="w-[33vw] self-center mb-8"
        />
      </motion.div>
    </>
  );
};
