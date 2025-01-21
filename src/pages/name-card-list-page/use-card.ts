import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import nameCardProvider, { NameCard, WithId } from "../../domain/name-card";

const fetcher = async (): Promise<WithId<NameCard>[]> => {
  return nameCardProvider.allNameCards();
};

const deleter = async (_: string, { arg }: { arg: string }) => {
  return nameCardProvider.remove(arg);
};

const updater = async (
  _: string,
  { arg }: { arg: { id: string; card: NameCard } }
) => {
  return nameCardProvider.edit(arg.id, arg.card);
};

const creater = async (_: string, { arg }: { arg: NameCard }) => {
  return nameCardProvider.create(arg);
};

/**
 * Hooks that provide CRUD methods on top of the name card provider and update the SWR result locally rather than fetching all cards again
 */
export const useCard = () => {
  const { data: cards, mutate, isLoading } = useSWR("name-card", fetcher);

  const { trigger: addCard } = useSWRMutation("name-card-add", creater, {
    onSuccess: (newCard) => {
      mutate([...(cards ?? []), newCard]);
      toast.success("Name card created!");
    },
  });
  const { trigger: updateCard } = useSWRMutation("name-card-update", updater, {
    onSuccess: (newCard) => {
      mutate(
        newCard
          ? cards?.map((card) => (card.id === newCard.id ? newCard : card))
          : cards,
        true
      );
      toast.success("Name card updated!");
    },
  });
  const { trigger: deleteCard } = useSWRMutation("name-card-delete", deleter, {
    onSuccess: (deletedId) => {
      mutate(cards?.filter((card) => card.id !== deletedId));
      toast.success("Name card deleted!");
    },
  });

  return {
    cards,
    addCard,
    deleteCard,
    updateCard,
    isLoading,
  };
};
