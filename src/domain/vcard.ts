import { parse } from "vcard4";

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
  let result = `BEGIN:VCARD\r\nVERSION:4.0\r\n`;
  if (vcard.firstName) result += `FN:${vcard.firstName}\r\n`;
  if (vcard.lastName || vcard.firstName)
    result += `N:${vcard.lastName};${vcard.firstName};;;;\r\n`;
  if (vcard.phoneNumber) result += `TEL;TYPE=cell:${vcard.phoneNumber}\r\n`;
  if (vcard.url) result += `URL:${vcard.url}\r\n`;
  if (vcard.email) result += `EMAIL:${vcard.email}\r\n`;
  return result + "END:VCARD";
};

export const retrieveVCardFromText = (text: string): VCard => {
  try {
    const retrievedCard = { ...DEFAULT_VCARD };
    const parsedVCard = parse(text);
    if (Array.isArray(parsedVCard)) return retrievedCard;
    const getField = (fieldName: string) =>
      parsedVCard.getProperty(fieldName)?.[0]?.value;
    retrievedCard.firstName =
      (getField("N") as unknown as Record<string, string> | undefined)
        ?.givenNames ?? "";
    retrievedCard.lastName =
      (getField("N") as unknown as Record<string, string> | undefined)
        ?.familyNames ?? "";
    retrievedCard.phoneNumber = getField("TEL") ?? "";
    retrievedCard.url = getField("URL") ?? "";
    retrievedCard.email = getField("EMAIL") ?? "";
    return retrievedCard;
  } catch {
    return DEFAULT_VCARD;
  }
};
