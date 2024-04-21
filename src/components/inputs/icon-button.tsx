import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  className?: string;
  icon: IconDefinition;
  onClick?: () => void;
};
export const IconButton = ({ icon, className, onClick }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={classNames("aspect-square rounded-full", className)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
