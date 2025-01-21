import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEllipsis,
  faPhone,
  faSuitcase,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export const NAME_CARD_CATEGORIES = [
  "instagram",
  "whatsapp",
  "business",
  "facebook",
  "phone-number",
  "linkedin",
  "x",
  "other",
] as const;

export type NameCardCategory = (typeof NAME_CARD_CATEGORIES)[number];

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
  linkedin: faLinkedin,
  "phone-number": faPhone,
  other: faEllipsis,
  x: faXTwitter,
};

export const NameCardCategoryColors: Record<
  NameCardCategory,
  {
    background: string;
    text: string;
  }
> = {
  instagram: {
    background: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)",
    text: "#FFFFFF",
  },
  facebook: {
    background: "#3b5998",
    text: "#FFFFFF",
  },
  whatsapp: { background: "#25D366", text: "#FFFFFF" },
  "phone-number": {
    background: "#FFD700",
    text: "#000000",
  },
  business: {
    background: "rgb(154, 122, 75)",
    text: "#000000",
  },
  linkedin: {
    background: "#0A66C2",
    text: "#FFFFFF",
  },
  other: {
    background: "#000000",
    text: "#FFFFFF",
  },
  x: {
    background: "#000000",
    text: "#FFFFFF",
  },
};

type InputSettings = {
  qrCodeInputTitle?: string;
  qrCodeInputPrefix?: string;
  computeQRCodeValue?: (originalCode: string) => string;
};
export const NameCardInputSettings: Partial<
  Record<NameCardCategory, InputSettings>
> = {
  instagram: {
    qrCodeInputPrefix: "@",
    qrCodeInputTitle: "Instagram handle",
    computeQRCodeValue: (handle) => `https://www.instagram.com/${handle}`,
  },
  whatsapp: {
    qrCodeInputTitle: "Your phone number",
    computeQRCodeValue: (phoneNumber) =>
      `whatsapp://send/?phone=${phoneNumber
        .replace(/\D/g, "")
        .replace(/^0+/, "")}`,
  },
  facebook: {
    qrCodeInputTitle: "Facebook username",
    computeQRCodeValue: (username) => `https://www.facebook.com/${username}`,
  },
  linkedin: {
    qrCodeInputTitle: "Linkedin username",
    qrCodeInputPrefix: "in/",
    computeQRCodeValue: (username) => `https://www.linkedin.com/in/${username}`,
  },
  x: {
    qrCodeInputTitle: "X username",
    computeQRCodeValue: (username) => `https://x.com/${username}`,
  },
  "phone-number": {
    qrCodeInputTitle: "Your contact info",
  },
};
export type WithId<T> = T & { id: string };

export const DEFAULT_NAME_CARD: NameCard = {
  category: "instagram",
  title: "",
  qrCode: "",
  text: "",
};

import Provider from "./providers";

export default Provider;
