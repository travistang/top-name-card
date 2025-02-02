import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { CSSProperties } from "react";

type Props = {
  testId?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  icon: IconDefinition;
  onClick?: () => void;
};
export const IconButton = ({
  icon,
  style,
  className,
  disabled,
  onClick,
  testId,
}: Props) => {
  return (
    <button
      disabled={disabled}
      data-testid={testId}
      onClick={onClick}
      style={style}
      className={classNames(
        "aspect-square rounded-full flex items-center justify-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
