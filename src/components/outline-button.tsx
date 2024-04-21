import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import colors from "tailwindcss/colors";

type Props = {
  onClick?: () => void;
  className?: string;
  color: string;
  selected?: boolean;
  icon: IconDefinition;
};
export const OutlineButton = ({
  selected,
  color,
  onClick,
  className,
  icon,
}: Props) => {
  return (
    <button
      onClick={onClick}
      style={
        selected
          ? { backgroundColor: color, color: colors.gray[300] }
          : { borderColor: color, color }
      }
      className={classNames("aspect-square rounded-lg p-2 border-2", className)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
