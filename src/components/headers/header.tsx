import Logo from "./travis-engineering.svg?react";

import { LargeScreenWarning } from "./large-screen-warning";
import { useLargeScreen } from "./use-large-screen";

export const Header = () => {
  const isLargeScreen = useLargeScreen();

  return (
    <div className="sticky top-0 z-20 h-16 flex-nowrap flex items-center px-4  dark:text-gray-200 gap-2 flex-shrink-0">
      <Logo className="w-6 h-6 text-white fill-white" />
      <div className="flex flex-col leading-3 text-xs">
        <h3>Name Cards</h3>
      </div>
      <LargeScreenWarning isLargeScreen={isLargeScreen} />
    </div>
  );
};
