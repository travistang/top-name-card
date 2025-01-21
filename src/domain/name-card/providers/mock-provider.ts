import { NameCard, WithId } from "..";
import { NameCardProvider } from "./types";

class MockProvider implements NameCardProvider {
  private cards: WithId<NameCard>[] = [
    {
      id: "1",
      category: "instagram",
      title: "John's Instagram",
      qrCode: "https://example.com/qr/john-instagram",
      text: "Follow me on Instagram!",
      backgroundColor: "#E1306C",
      textColor: "#FFFFFF",
    },
    {
      id: "2",
      category: "whatsapp",
      title: "John's WhatsApp",
      qrCode: "https://example.com/qr/john-whatsapp",
      text: "Chat with me on WhatsApp!",
      backgroundColor: "#25D366",
      textColor: "#FFFFFF",
    },
    {
      id: "3",
      category: "facebook",
      title: "John's Facebook",
      qrCode: "https://example.com/qr/john-facebook",
      text: "Connect with me on Facebook!",
      backgroundColor: "#3b5998",
      textColor: "#FFFFFF",
    },
    {
      id: "4",
      category: "phone-number",
      title: "John's Phone",
      qrCode: "tel:+1234567890",
      text: "Call me directly!",
      backgroundColor: "#FFD700",
      textColor: "#000000",
    },
    {
      id: "5",
      category: "business",
      title: "John's Business",
      qrCode: "https://example.com/qr/john-business",
      text: "Visit my business website!",
      backgroundColor: "#000000",
      textColor: "#FFFFFF",
    },
    {
      id: "6",
      category: "other",
      title: "Custom Link",
      qrCode: "https://example.com/qr/custom",
      text: "Check out this link!",
      backgroundColor: "#8A2BE2",
      textColor: "#FFFFFF",
    },
  ];
  async create(data: NameCard): Promise<WithId<NameCard>> {
    const card = { ...data, id: Date.now().toString() };
    this.cards.push(card);
    return card;
  }
  async edit(
    id: string,
    data: Partial<NameCard>
  ): Promise<null | WithId<NameCard>> {
    const currentCard = await this.get(id);
    if (!currentCard) return null;
    const newCard = {
      ...currentCard,
      ...data,
    };

    this.cards = this.cards.map((card) => {
      if (card.id !== id) return card;
      return newCard;
    });
    return newCard;
  }

  async allNameCards(): Promise<WithId<NameCard>[]> {
    return this.cards;
  }

  async get(id: string) {
    return this.cards.find((card) => card.id === id);
  }
  async remove(id: string) {
    this.cards = this.cards.filter((card) => card.id !== id);
    return id;
  }
}

const provider = new MockProvider();
export default provider;
