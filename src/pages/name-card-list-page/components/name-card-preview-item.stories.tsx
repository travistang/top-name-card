import { Meta, StoryObj } from "@storybook/react";
import { NameCardPreviewItem } from "./name-card-preview-item";

const meta = {
  title: "NameCardListPage/NameCardPreviewItem",
  component: NameCardPreviewItem,
} satisfies Meta<typeof NameCardPreviewItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    nameCard: {
      category: "phone-number",
      id: "123",
      title: "Phone number with intro",
      text: "Write me! +49 0123 456 789",
      qrCode: "",
    },
  },
};

export const LongName: Story = {
  args: {
    nameCard: {
      category: "phone-number",
      id: "123",
      title: "A name card with a verrrrrryyyyyyyyyy looooooooonnnnnnng name",
      text: "Write me! +49 0123 456 789",
      qrCode: "",
    },
  },
};
