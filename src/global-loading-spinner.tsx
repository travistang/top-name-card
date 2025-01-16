import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigation } from "react-router-dom";

export const GlobalLoadingSpinner = () => {
  const navigation = useNavigation();
  if (navigation.state !== "loading") return null;
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="rounded-lg flex items-center justify-center p-8">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  );
};
