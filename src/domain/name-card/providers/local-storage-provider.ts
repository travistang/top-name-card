import { NameCard, WithId } from "..";
import { NameCardProvider } from "./types";

class LocalStorageNameCardProvider implements NameCardProvider {
  readonly storageKey = "@top-name-card/localstorage";
  async allNameCards(): Promise<WithId<NameCard>[]> {
    const data = localStorage.getItem(this.storageKey) || "";
    try {
      return (JSON.parse(data) as WithId<NameCard>[]) || [];
    } catch {
      return [];
    }
  }

  async get(id: string): Promise<WithId<NameCard> | null> {
    const allCards = await this.allNameCards();
    return allCards.find((card) => card.id === id) ?? null;
  }

  async create(data: NameCard): Promise<WithId<NameCard>> {
    const currentList = await this.allNameCards();
    const newCard = { ...data, id: window.crypto.randomUUID() };
    const newList = [...currentList, newCard];
    localStorage.setItem(this.storageKey, JSON.stringify(newList));
    return newCard;
  }

  async edit(
    id: string,
    data: Partial<NameCard>
  ): Promise<WithId<NameCard> | null> {
    const cards = await this.allNameCards();
    const editingCardIndex = cards.findIndex((card) => card.id === id);
    if (editingCardIndex === -1) return null;

    const newCardInfo = { ...cards[editingCardIndex], ...data };
    cards[editingCardIndex] = newCardInfo;
    localStorage.setItem(this.storageKey, JSON.stringify(cards));
    return newCardInfo;
  }

  async remove(id: string): Promise<string | null> {
    const cards = await this.allNameCards();
    const editingCardIndex = cards.findIndex((card) => card.id === id);
    if (editingCardIndex === -1) return null;
    cards.splice(editingCardIndex, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(cards));
    return id;
  }
}

const provider = new LocalStorageNameCardProvider();

export default provider;
