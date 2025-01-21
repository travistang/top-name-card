import { useState } from "react";
import { DEFAULT_NAME_CARD, NameCard, WithId } from "../../../domain/name-card";

type UseCardMutationResult = {
  state: "editing" | "adding" | "idle";
  toggleEdit: (card: WithId<NameCard>) => void;
  stopEdit: () => void;
  mutate: (card: NameCard) => void;
  add: () => void;
  mutatingCard: WithId<NameCard> | null;
};
const newCardId = "__new_card__";

const computeState = (
  mutatingCard: WithId<NameCard> | null
): UseCardMutationResult["state"] => {
  if (!mutatingCard) return "idle";
  if (mutatingCard.id === newCardId) return "adding";
  return "editing";
};
export const useCardMutation = (): UseCardMutationResult => {
  const [mutatingCard, setMutatingCard] = useState<WithId<NameCard> | null>(
    null
  );

  const add = () => {
    setMutatingCard({ ...DEFAULT_NAME_CARD, id: newCardId });
  };

  const stopEdit = () => setMutatingCard(null);

  const toggleEdit = (card: WithId<NameCard>) => {
    if (mutatingCard?.id === card.id) {
      stopEdit();
      return;
    }
    setMutatingCard(card);
  };

  const mutate = (card: NameCard) => {
    setMutatingCard((mutatingCard) => {
      if (!mutatingCard) return null;
      return { ...card, id: mutatingCard.id };
    });
  };
  return {
    add,
    stopEdit,
    toggleEdit,
    mutate,
    mutatingCard,
    state: computeState(mutatingCard),
  };
};
