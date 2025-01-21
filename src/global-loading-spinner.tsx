import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GlobalLoadingSpinner = () => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="rounded-lg flex items-center justify-center p-8 bg-slate">
        <FontAwesomeIcon icon={faSpinner} className="text-white animate-spin" />
      </div>
    </div>
  );
};
