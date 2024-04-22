import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QRCode from "react-qr-code";
import { NameCard } from "../../domain/name-card";
import {
  computeNameCardColor,
  computeNameCardDisplayType,
} from "../../domain/name-card-display";

type Props = {
  nameCard: NameCard;
  onClose: () => void;
};
export const NameCardDisplayPage = ({ onClose, nameCard }: Props) => {
  const displayType = computeNameCardDisplayType(nameCard);
  const {
    background,
    backgroundColor,
    color,
    qrColor,
    qrBackgroundColor,
    qrPaddingColor,
    qrIcon,
    qrIconColor,
    qrIconBackgroundColor,
  } = computeNameCardColor(nameCard);
  const { qrCode, text } = nameCard;
  if (displayType === "text") {
    return (
      <div
        onClick={onClose}
        style={{ backgroundColor }}
        className="p-4 fixed inset-0 z-50 flex flex-col items-center justify-center"
      >
        <span
          style={{ color }}
          className="text-center antialiased [writing-mode:vertical-rl] text-7xl whitespace-pre-wrap font-bold text-black"
        >
          {nameCard.text}
        </span>
      </div>
    );
  }
  return (
    <div
      id="name-card-display"
      onClick={onClose}
      style={{ background, backgroundColor }}
      className="p-4 fixed inset-0 z-50 flex flex-col items-center justify-center gap-16"
    >
      <div className="flex items-center justify-center relative w-full aspect-square rounded-lg bg-transparent">
        <QRCode
          fgColor={qrColor}
          bgColor={qrBackgroundColor}
          value={qrCode}
          style={{ outline: `${qrPaddingColor} solid 32px` }}
          className="w-full h-full"
        />
        {qrIcon && (
          <div
            style={{
              background,
              backgroundColor: qrIconBackgroundColor,
            }}
            className="absolute p-4 rounded-lg aspect-square z-20 flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={qrIcon}
              className="w-12 h-12 bg-transparent"
              style={{
                color: qrIconColor,
              }}
            />
          </div>
        )}
      </div>
      {text && (
        <span style={{ color }} className="text-7xl whitespace-pre-line">
          {text}
        </span>
      )}
    </div>
  );
};
