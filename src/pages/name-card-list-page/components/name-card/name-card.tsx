import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { HTMLMotionProps, motion, MotionValue } from "framer-motion";
import { RefObject, useRef } from "react";
import QRCode from "react-qr-code";
import { IconButton } from "../../../../components/inputs/icon-button";
import {
  NameCardCategoryColors,
  NameCardCategoryIcon,
  NameCardInputSettings,
  NameCard as NameCardType,
  WithId,
} from "../../../../domain/name-card";
import { useAnimation } from "./use-animation";

type NameCardProps = {
  container: RefObject<HTMLElement>;
  card: WithId<NameCardType>;
  index: number;
  dragY?: MotionValue<number>;
  dragProps?: Partial<HTMLMotionProps<"div">>;
  onRequestEdit: () => void;
};
export const NameCard = ({
  card,
  index,
  dragY,
  onRequestEdit,
  dragProps,
  container,
}: NameCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { background, text: color } = NameCardCategoryColors[card.category];
  const { computeQRCodeValue = (value: string) => value } =
    NameCardInputSettings[card.category] ?? {};
  const { scale, opacity } = useAnimation(container, cardRef);
  return (
    <motion.div
      ref={cardRef}
      key={card.id}
      {...dragProps}
      initial={{ opacity: 0, y: 1000 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={classNames(
        "rounded-xl flex items-stretch flex-shrink-0 flex-col p-8 max-w-[70vw] aspect-[9_/_16] self-center overflow-hidden"
      )}
      style={{
        scale,
        opacity,
        y: dragY,
        background,
        color,
      }}
    >
      <IconButton
        key="edit-button"
        className="h-8 w-8 -mt-4 -ml-2 mb-2 z-10"
        onClick={onRequestEdit}
        icon={faEllipsis}
        style={{ color }}
      />
      <div
        className={classNames(
          "aspect-square flex-shrink rounded-lg flex items-center justify-center w-auto max-w-full"
        )}
      >
        <QRCode
          value={computeQRCodeValue(card.qrCode)}
          bgColor="transparent"
          fgColor={color}
        />
      </div>
      <div className="flex flex-col flex-1 pt-4 flex-shrink-0">
        <div style={{ color }} className="flex-1">
          <b className="text-ellipsis line-clamp-1">{card.title}</b>
          <h4 className="text-ellipsis line-clamp-2 text-xs">{card.text}</h4>
        </div>
        <div className="self-end">
          <FontAwesomeIcon
            className="h-8 w-8"
            icon={NameCardCategoryIcon[card.category]}
            style={{ color }}
          />
        </div>
      </div>
    </motion.div>
  );
};
