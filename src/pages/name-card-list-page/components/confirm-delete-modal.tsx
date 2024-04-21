import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../../../components/modal/modal";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};
export const ConfirmDeleteModal = ({ onClose, onConfirm }: Props) => {
  return (
    <Modal onClose={onClose} title="Delete name card?">
      <div className="flex flex-col items-stretch gap-2">
        <span className="text-lg">Are you sure?</span>
        <button
          onClick={onConfirm}
          className="bg-red-500 w-min h-12 px-2 self-end text-white"
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
    </Modal>
  );
};
