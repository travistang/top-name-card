import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import nameCard, {
  CONTACT_NAME_CARD_CATEGORIES,
  NameCard,
  WithId,
} from "../../domain/name-card";
import { NameCardDisplayPage } from "../name-card-display-page/name-card-display-page";
import { ConfirmDeleteModal } from "./components/confirm-delete-modal";
import { NameCardList } from "./components/name-card-list";
import { InstanceTextSection } from "./instant-text-section/instant-text-section";

const groupCardsByCategories = (
  nameCards: WithId<NameCard>[]
): Record<string, WithId<NameCard>[]> => {
  const groups: Record<string, WithId<NameCard>[]> = {};
  nameCards.forEach((card) => {
    if (CONTACT_NAME_CARD_CATEGORIES.includes(card.category)) {
      groups.contacts = [...(groups.contacts || []), card];
    } else {
      groups[card.category] = [...(groups[card.category] || []), card];
    }
  });
  return groups;
};

const fetcher = () => {
  return nameCard.allNameCards().then(groupCardsByCategories);
};

const deleter = async (_: string, { arg }: { arg: WithId<NameCard> }) => {
  return nameCard.remove(arg.id);
};

export const NameCardListPage = () => {
  const {
    data: nameCardsByCategories,
    isLoading,
    mutate: refetch,
  } = useSWR("name-card", fetcher);
  console.log({ nameCardsByCategories });
  const { trigger: deleteCard, isMutating: isDeleting } = useSWRMutation(
    "delete-name-card",
    deleter,
    { onSuccess: () => refetch() }
  );
  const navigate = useNavigate();
  const [pendingDeleteCard, setPendingDeleteCard] =
    useState<WithId<NameCard> | null>(null);
  const [selectedCard, setSelectedCard] = useState<NameCard | null>(null);
  const onSelectCard = (card: WithId<NameCard>) => setSelectedCard(card);
  const onCloseCard = () => setSelectedCard(null);
  const editCard = (card: WithId<NameCard>) => navigate(`/edit/${card.id}`);
  const onConfirmDeleteCard = () => {
    if (!pendingDeleteCard) return;
    deleteCard(pendingDeleteCard)
      .then(() => setPendingDeleteCard(null))
      .then(() => refetch());
  };
  const showLoadingSpinner = isLoading || isDeleting;
  return (
    <div className="p-4 overflow-y-auto">
      {showLoadingSpinner && (
        <div className="self-center w-48 h-48 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8" />
        </div>
      )}
      <InstanceTextSection onDisplay={onSelectCard} />
      <div className="flex flex-col gap-4 items-stretch overflow-x-hidden">
        {Object.entries(nameCardsByCategories ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([groupName, cards]) => (
            <NameCardList
              itemsPerRow={groupName === "contacts" ? 2 : 1}
              listTitle={groupName}
              onEditCard={editCard}
              onDeleteCard={(card) => setPendingDeleteCard(card)}
              nameCards={cards}
              onSelectCard={onSelectCard}
              key={groupName}
            />
          ))}
      </div>
      {pendingDeleteCard && (
        <ConfirmDeleteModal
          onClose={() => setPendingDeleteCard(null)}
          onConfirm={onConfirmDeleteCard}
        />
      )}
      {selectedCard && (
        <NameCardDisplayPage nameCard={selectedCard} onClose={onCloseCard} />
      )}
    </div>
  );
};
