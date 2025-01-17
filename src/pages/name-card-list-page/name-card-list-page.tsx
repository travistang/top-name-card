import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import nameCard, { NameCard, WithId } from "../../domain/name-card";
import { NameCardList } from "./components/name-card-list";

const fetcher = async (): Promise<WithId<NameCard>[]> => {
  return nameCard.allNameCards();
};

const deleter = async (_: string, { arg }: { arg: string }) => {
  return nameCard.remove(arg);
};

const updater = async (
  _: string,
  { arg }: { arg: { id: string; card: NameCard } }
) => {
  return nameCard.edit(arg.id, arg.card);
};

export const NameCardListPage = () => {
  const { data: cards, mutate } = useSWR("name-card", fetcher);
  const { trigger: updateCard } = useSWRMutation("name-card-update", updater, {
    onSuccess: (newCard) =>
      mutate(
        newCard
          ? cards?.map((card) => (card.id === newCard.id ? newCard : card))
          : cards,
        true
      ),
  });
  const { trigger: deleteCard } = useSWRMutation("name-card-delete", deleter);

  return (
    <NameCardList
      nameCards={cards ?? []}
      onUpdate={(id, card) => updateCard({ id, card })}
      onDelete={deleteCard}
    />
  );
};
