import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  IconDefinition,
  faContactBook,
} from "@fortawesome/free-solid-svg-icons";
import colors from "tailwindcss/colors";
import { NameCard } from "./name-card";

export type NameCardDisplayType = "qr" | "qr-text" | "text";

export const computeNameCardDisplayType = (
  nameCard: NameCard
): NameCardDisplayType => {
  if (nameCard.qrCode && nameCard.text) {
    return "qr-text";
  }

  return nameCard.qrCode ? "qr" : "text";
};

export const computeNameCardColor = (
  nameCard: NameCard
): {
  background?: string;
  backgroundColor?: string;
  qrColor: string;
  qrBackgroundColor: string;
  qrPaddingColor: string;
  color: string;
  qrIcon?: IconDefinition;
  qrIconColor?: string;
} => {
  switch (nameCard.category) {
    case "facebook":
      return {
        qrColor: "white",
        color: "white",
        qrBackgroundColor: "transparent",
        qrPaddingColor: "transparent",
        backgroundColor: "#4267B2",
        qrIcon: faFacebook,
        qrIconColor: "#4267B2",
      };
    case "whatsapp":
      return {
        backgroundColor: "#25D366",
        qrColor: "white",
        qrBackgroundColor: "transparent",
        qrPaddingColor: "transparent",
        color: "white",
        qrIcon: faWhatsapp,
        qrIconColor: "#25D366",
      };
    case "instagram":
      return {
        qrIcon: faInstagram,
        background: `radial-gradient(circle at top left, #405DE6, #E1306C), radial-gradient(circle at top right, #FFDC80 0%, #F56040 50%, #833AB4 100%)`,
        qrColor: "white",
        qrBackgroundColor: "transparent",
        qrPaddingColor: "transparent",
        qrIconColor: "#E1306C",
        color: "white",
      };
    case "business":
    case "phone-number":
      return {
        qrIcon: faContactBook,
        backgroundColor: "rgb(154, 122, 75)",
        color: "black",
        qrBackgroundColor: "transparent",
        qrPaddingColor: "transparent",
        qrColor: "white",
        qrIconColor: "rgb(154, 122, 75)",
      };
    default:
      return {
        qrColor: nameCard.textColor ?? colors.gray[900],
        color: nameCard.textColor ?? colors.gray[900],
        qrBackgroundColor: nameCard.backgroundColor || "white",
        qrPaddingColor: nameCard.backgroundColor || "white",
        backgroundColor: nameCard.backgroundColor || "white",
      };
  }
};
