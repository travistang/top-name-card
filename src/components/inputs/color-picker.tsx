import { HexColorPicker } from "react-colorful";

type Props = {
  value: string;
  className?: string;
  onChange: (color: string) => void;
};
export const ColorPicker = ({ value, onChange, className }: Props) => {
  return (
    <HexColorPicker className={className} color={value} onChange={onChange} />
  );
};
