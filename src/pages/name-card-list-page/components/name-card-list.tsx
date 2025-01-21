import classNames from "classnames";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { PaginationDots } from "../../../components/pagination-dots";
import {
  NameCard,
  NameCard as NameCardType,
  WithId,
} from "../../../domain/name-card";
import { CreateNameCard } from "./create-name-card/create-name-card";
import { NameCardWrapper } from "./name-card/name-card-wrapper";
import { useCardMutation } from "./use-card-mutation";

type Props = {
  nameCards: WithId<NameCardType>[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: NameCard) => void;
  onAdd: (card: NameCard) => void;
};

const paginationDotVariants = {
  active: {
    translateY: 1000,
    opacity: 0,
  },
  idle: {
    translateY: 0,
    opacity: 1,
  },
};
export const NameCardList = ({
  nameCards,
  onDelete,
  onUpdate,
  onAdd,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, stopEdit, toggleEdit, add, mutatingCard, mutate } =
    useCardMutation();
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const getCardInfo = (card: WithId<NameCard>) => {
    return mutatingCard?.id === card.id ? mutatingCard : card;
  };

  const onConfirmUpdate = async () => {
    if (!mutatingCard) return;
    if (state === "adding") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...cardInfo } = mutatingCard;
      await onAdd(cardInfo);
      stopEdit();
      return;
    }
    await onUpdate(mutatingCard.id!, mutatingCard);
    stopEdit();
  };

  return (
    <>
      <div
        ref={containerRef}
        className={classNames(
          "relative flex flex-row flex-nowrap snap-x snap-mandatory scroll-smooth flex-1 items-stretch no-scrollbar touch-pan-x pr-24",
          state !== "idle" ? "overflow-x-hidden" : "overflow-x-auto"
        )}
      >
        {nameCards.map((card, index) => (
          <NameCardWrapper
            key={card.id}
            index={index}
            card={getCardInfo(card)}
            editing={mutatingCard?.id === card.id}
            onToggleEdit={() => toggleEdit(card)}
            onChange={mutate}
            onDelete={() => onDelete(card.id)}
            onConfirmUpdate={onConfirmUpdate}
            container={containerRef}
          />
        ))}
        <AnimatePresence>
          {state === "adding" && mutatingCard && (
            <NameCardWrapper
              confirmFormText="Add card"
              card={mutatingCard}
              onChange={mutate}
              container={containerRef}
              index={0}
              editing
              onConfirmUpdate={onConfirmUpdate}
              onToggleEdit={stopEdit}
            />
          )}
        </AnimatePresence>
        {state !== "adding" && <CreateNameCard onClick={add} />}
      </div>
      <motion.div
        animate={state !== "idle" ? "active" : "idle"}
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
