import classNames from "classnames";
import { useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { PaginationDots } from "../../../components/pagination-dots";
import { NameCard as NameCardType, WithId } from "../../../domain/name-card";
import { NameCardWrapper } from "./name-card/name-card-wrapper";

type Props = {
  nameCards: WithId<NameCardType>[];
};

export const NameCardList = ({ nameCards }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const onToggleEdit = (id: string) => () => {
    setEditingCardId(editingCardId === id ? null : id);
  };
  return (
    <>
      <div
        ref={containerRef}
        className={classNames(
          "relative flex flex-row flex-nowrap  snap-x snap-mandatory scroll-smooth flex-1 items-stretch no-scrollbar px-[35vw] touch-pan-x",
          editingCardId ? "overflow-x-hidden" : "overflow-x-auto"
        )}
      >
        {nameCards.map((card, index) => (
          <NameCardWrapper
            key={card.id}
            index={index}
            card={card}
            editing={editingCardId === card.id}
            onToggleEdit={onToggleEdit(card.id)}
            container={containerRef}
          />
        ))}
      </div>
      <PaginationDots
        progress={scrollXProgress}
        numPages={nameCards.length}
        className="w-[33vw] self-center mb-8"
      />
    </>
  );
};
