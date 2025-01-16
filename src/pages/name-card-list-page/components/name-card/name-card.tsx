import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionValue,
} from "framer-motion";
import { RefObject, useRef } from "react";
import QRCode from "react-qr-code";
import { IconButton } from "../../../../components/inputs/icon-button";
import {
  NameCardCategoryIcon,
  NameCard as NameCardType,
  WithId,
} from "../../../../domain/name-card";
import { useAnimation } from "./use-animation";

type NameCardProps = {
  container: RefObject<HTMLElement>;
  card: WithId<NameCardType>;
  index: number;
  dragY?: MotionValue<number>;
  editing?: boolean;
  dragProps?: Partial<HTMLMotionProps<"div">>;
  onRequestEdit: () => void;
};
export const NameCard = ({
  card,
  index,
  dragY,
  editing,
  onRequestEdit,
  dragProps,
  container,
}: NameCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
        "rounded-xl flex items-stretch self-stretch flex-shrink-0 w-full flex-col p-8"
      )}
      style={{
        scale,
        opacity,
        y: dragY,
        background: card.backgroundColor ?? "#bbbbbb",
      }}
    >
      <AnimatePresence>
        {!editing && (
          <motion.div initial={false}>
            <IconButton
              key="edit-button"
              className="h-8 w-8 -mt-4 -ml-2 mb-2"
              onClick={onRequestEdit}
              icon={faEllipsis}
              style={{ color: card.textColor }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={classNames(
          "aspect-square flex-shrink-0 rounded-lg flex items-center justify-center mr-4 w-full"
        )}
      >
        <QRCode
          value={card.qrCode}
          bgColor={card.backgroundColor}
          fgColor={card.textColor}
        />
      </div>
      <div className="flex flex-col pt-8">
        <div style={{ color: card.textColor }} className="flex-1">
          <b style={{ color: card.textColor }}>{card.title}</b>
          <h4>{card.text}</h4>
        </div>
        <div className="self-end">
          <FontAwesomeIcon
            className="h-8 w-8"
            icon={NameCardCategoryIcon[card.category]}
            style={{ color: card.textColor }}
          />
        </div>
      </div>
    </motion.div>
  );
};
