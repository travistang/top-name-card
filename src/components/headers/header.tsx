import { faContactCard, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  const location = useLocation();
  if (location.pathname.includes("display")) return null;

  return (
    <div className="sticky top-0 z-20 h-16 flex-nowrap flex items-center px-2 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 gap-2 flex-shrink-0">
      <Link to="/" className="flex items-center gap-2">
        <FontAwesomeIcon icon={faContactCard} />
        <h3>
          <b>Name Card</b>
        </h3>
        <h6 className="font-mono hidden md:block">
          | travis.
          <b className="text-purple-500 dark:text-purple-300">engineering</b>
        </h6>
      </Link>
      <ThemeToggle />
      {!location?.pathname.includes("create") && (
        <div className="flex-1 flex items-center justify-end">
          <Link to="/create">
            <button className="h-12 bg-green-500 px-2">
              <FontAwesomeIcon icon={faPlus} />
              Create
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
