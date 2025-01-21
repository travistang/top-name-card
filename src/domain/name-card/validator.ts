import { NameCard } from ".";

export const isNameCardValid = (card: NameCard) => {
  const { qrCode, title, text } = card;
  if (!qrCode) return false;
  if (!title && !!text) return false;

  return true;
};
