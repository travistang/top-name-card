import { NameCard } from "../../../../domain/name-card";
import { ArbitraryNameCardForm } from "./arbitrary-name-card-form";
import { BusinessCardForm } from "./business-card-form/business-card-form";
import { FacebookForm } from "./facebook-form";
import { InstagramForm } from "./instagram-form";
import { WhatsappForm } from "./whatsapp-form";

type Props = {
  nameCard: NameCard;
  onChange: (nameCard: NameCard) => void;
};
export const NameCardDetailForm = ({ nameCard, onChange }: Props) => {
  switch (nameCard.category) {
    case "instagram":
      return <InstagramForm nameCard={nameCard} onChange={onChange} />;
    case "whatsapp":
      return <WhatsappForm nameCard={nameCard} onChange={onChange} />;
    case "facebook":
      return <FacebookForm nameCard={nameCard} onChange={onChange} />;
    case "business":
      return <BusinessCardForm nameCard={nameCard} onChange={onChange} />;
    default:
      return <ArbitraryNameCardForm nameCard={nameCard} onChange={onChange} />;
  }
};
