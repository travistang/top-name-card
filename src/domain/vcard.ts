export type VCard = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  url: string;
};

const DEFAULT_VCARD: VCard = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  url: "",
};
export const getVCardText = (vcard: VCard): string => {
  let result = `
  BEGIN:VCARD
  VERSION:4.0
  `;
  if (vcard.firstName) result += `FN:${vcard.firstName}\n`;
  if (vcard.lastName || vcard.firstName)
    result += `N:${vcard.lastName};${vcard.firstName};;;;\n`;
  if (vcard.phoneNumber) result += `TEL;TYPE=cell:${vcard.phoneNumber}\n`;
  if (vcard.url) result += `URL:${vcard.url}\n`;
  return result + "\nEND:VCARD";
};

export const vcardFromString = (str: string): VCard => {
  try {
    const cardObject = JSON.parse(str);
    const result = { ...DEFAULT_VCARD };
    Object.keys(DEFAULT_VCARD).forEach((vCardKey) => {
      if (cardObject[vCardKey])
        result[vCardKey as keyof typeof result] =
          cardObject[vCardKey].toString();
    });
    return result;
  } catch {
    return DEFAULT_VCARD;
  }
};
