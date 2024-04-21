import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import colors from "tailwindcss/colors";
import { IconButton } from "../../../components/inputs/icon-button";
import {
  NameCard,
  NameCardCategoryIcon,
  WithId,
} from "../../../domain/name-card";

type Props = {
  nameCard: WithId<NameCard>;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

const computePreviewStyle = (nameCard: NameCard) => {
  switch (nameCard.category) {
    case "whatsapp":
      return { backgroundColor: "#25D366", color: colors.gray[500] };
    case "facebook":
      return { backgroundColor: "#4267B2" };
    case "instagram":
      return {
        background: `radial-gradient(circle at right, #405DE6, #E1306C), radial-gradient(circle at top right, #FFDC80 0%, #F56040 50%, #833AB4 100%)`,
      };
    default:
      return { backgroundColor: colors.gray[500] };
  }
};
export const NameCardPreviewItem = ({
  onClick,
  nameCard,
  className,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div
      onClick={onClick}
      style={computePreviewStyle(nameCard)}
      className={classNames(
        "overflow-hidden flex items-center rounded-lg h-16 p-4 gap-2 text-white",
        className
      )}
    >
      <FontAwesomeIcon icon={NameCardCategoryIcon[nameCard.category]} />
      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
        {nameCard.title}
      </span>
      <div className="flex-1 flex items-center justify-end bg-transparent h-full">
        <div className="flex items-center gap-4 bg-transparent">
          {onEdit && (
            <IconButton onClick={onEdit} icon={faPen} className="text-white" />
          )}
          {onDelete && (
            <IconButton
              onClick={onDelete}
              icon={faTrash}
              className="text-red-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};
