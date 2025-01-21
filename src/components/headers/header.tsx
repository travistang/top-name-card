import { Link } from "react-router-dom";
import { LargeScreenWarning } from "./large-screen-warning";
import { useLargeScreen } from "./use-large-screen";

export const Header = () => {
  const isLargeScreen = useLargeScreen();

  return (
    <div className="sticky top-0 z-20 h-16 flex-nowrap flex items-center px-2  dark:text-gray-200 gap-2 flex-shrink-0">
      <div className="flex flex-col">
        <h6 className="text-xs leading-3">TOP</h6>
        <h3>Name Cards</h3>
      </div>
      <Link to="/" className="flex items-center gap-2"></Link>
      <LargeScreenWarning isLargeScreen={isLargeScreen} />
    </div>
  );
};
