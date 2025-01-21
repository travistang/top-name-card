import { Link } from "react-router-dom";
import Logo from "./travis-engineering.svg?react";

import { LargeScreenWarning } from "./large-screen-warning";
import { useLargeScreen } from "./use-large-screen";

export const Header = () => {
  const isLargeScreen = useLargeScreen();

  return (
    <div className="sticky top-0 z-20 h-16 flex-nowrap flex items-center px-2  dark:text-gray-200 gap-2 flex-shrink-0">
      <Logo className="w-10 h-10 text-white fill-white" />
      <div className="flex flex-col leading-3">
        <h3>Name Cards</h3>
        <h6 className="text-xs opacity-40">travis.engineering</h6>
      </div>
      <Link to="/" className="flex items-center gap-2"></Link>
      <LargeScreenWarning isLargeScreen={isLargeScreen} />
    </div>
  );
};
