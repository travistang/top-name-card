import { FormSection } from "../../../components/form-section";
import { NameCard as NameCardType, WithId } from "../../../domain/name-card";
import { NameCardPreviewItem } from "./name-card-preview-item";

type Props = {
  listTitle: string;
  itemsPerRow?: number;
  nameCards: WithId<NameCardType>[];
  onSelectCard: (card: WithId<NameCardType>) => void;
  onEditCard: (card: WithId<NameCardType>) => void;
  onDeleteCard: (card: WithId<NameCardType>) => void;
};
export const NameCardList = ({
  listTitle,
  itemsPerRow = 1,
  onEditCard,
  onDeleteCard,
  nameCards,
  onSelectCard,
}: Props) => {
  if (!nameCards.length) return null;
  return (
    <FormSection label={listTitle}>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${itemsPerRow},1fr)` }}
      >
        {nameCards.map((card) => (
          <NameCardPreviewItem
            nameCard={card}
            key={card.id}
            onClick={() => onSelectCard(card)}
            onEdit={() => onEditCard(card)}
            onDelete={() => onDeleteCard(card)}
          />
        ))}
      </div>
    </FormSection>
  );
};
