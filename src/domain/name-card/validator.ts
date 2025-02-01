import { NameCard } from ".";

export const isNameCardValid = (card: NameCard) => {
  const { qrCode, title, text, category } = card;
  if (!qrCode) return false;
  if (!title && !!text) return false;

  if (category === "whatsapp" || category === "phone-number") {
    if (qrCode.length < 5) return false;
  }

  return true;
};
