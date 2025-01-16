import useSWR from "swr";
import nameCard, { NameCard, WithId } from "../../domain/name-card";
import { NameCardList } from "./components/name-card-list";

const fetcher = (): WithId<NameCard>[] => {
  return [
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
    // {
    //   id: "4",
    //   category: "phone-number",
    //   title: "John's Phone",
    //   qrCode: "tel:+1234567890",
    //   text: "Call me directly!",
    //   backgroundColor: "#FFD700",
    //   textColor: "#000000",
    // },
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
};

const deleter = async (_: string, { arg }: { arg: WithId<NameCard> }) => {
  return nameCard.remove(arg.id);
};

export const NameCardListPage = () => {
  const { data: cards } = useSWR("name-card", fetcher);

  return <NameCardList nameCards={cards ?? []} />;
};
