import {
  faCheckCircle,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAME_CARD_LIST } from "../../routes/routes";

type Props = {
  editing?: boolean;
  submitting?: boolean;
  onSubmit: () => void;
};
export const ConfirmButtonRow = ({ editing, submitting, onSubmit }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 pb-4 px-4 grid grid-cols-2 gap-4">
      <button
        className="outlined h-16 uppercase"
        onClick={() => navigate(ROUTE_NAME_CARD_LIST)}
      >
        <FontAwesomeIcon icon={faTimes} />
        cancel
      </button>
      <button
        disabled={submitting}
        onClick={onSubmit}
        className="bg-green-500 h-16 flex-1 uppercase"
      >
        <FontAwesomeIcon icon={submitting ? faSpinner : faCheckCircle} />
        {editing ? "update" : "create"}
      </button>
    </div>
  );
};
