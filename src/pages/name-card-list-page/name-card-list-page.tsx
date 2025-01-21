import { NameCardList } from "./components/name-card-list";
import { useCard } from "./use-card";
export const NameCardListPage = () => {
  const { cards, addCard, deleteCard, updateCard } = useCard();

  return (
    <NameCardList
      onAdd={addCard}
      nameCards={cards ?? []}
      onUpdate={(id, card) => updateCard({ id, card })}
      onDelete={deleteCard}
    />
  );
};
