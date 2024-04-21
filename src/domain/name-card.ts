import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  IconDefinition,
  faEllipsis,
  faPhone,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";

export type NameCardCategory =
  | "instagram"
  | "whatsapp"
  | "business"
  | "facebook"
  | "phone-number"
  | "other";
export const CONTACT_NAME_CARD_CATEGORIES: NameCardCategory[] = [
  "instagram",
  "whatsapp",
  "facebook",
  "phone-number",
];

export type NameCard = {
  category: NameCardCategory;
  title: string;
  qrCode: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
};

export const NameCardCategoryIcon: Record<NameCardCategory, IconDefinition> = {
  instagram: faInstagram,
  whatsapp: faWhatsapp,
  business: faSuitcase,
  facebook: faFacebook,
  "phone-number": faPhone,
  other: faEllipsis,
};

export type WithId<T> = T & { id: string };

export interface NameCardProvider {
  allNameCards(): Promise<WithId<NameCard>[]>;
  create(data: NameCard): Promise<WithId<NameCard>>;
  edit(id: string, data: Partial<NameCard>): Promise<null | WithId<NameCard>>;
  remove(id: string): Promise<boolean>;
}

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

  async remove(id: string): Promise<boolean> {
    const cards = await this.allNameCards();
    const editingCardIndex = cards.findIndex((card) => card.id === id);
    if (editingCardIndex === -1) return false;
    cards.splice(editingCardIndex, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(cards));
    return true;
  }
}

export default new LocalStorageNameCardProvider();
