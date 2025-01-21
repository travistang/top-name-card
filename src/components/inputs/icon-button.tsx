import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { CSSProperties } from "react";

type Props = {
  style?: CSSProperties;
  className?: string;
  icon: IconDefinition;
  onClick?: () => void;
};
export const IconButton = ({ icon, style, className, onClick }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      style={style}
      className={classNames("aspect-square rounded-full", className)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
