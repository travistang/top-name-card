import { TourProvider, useTour } from "@reactour/tour";

import { useEffect } from "react";
import provider from "../../name-card/providers/local-storage-provider";
import { TutorialPopup } from "../components/tutorial-popup";
import { steps } from "../steps";

type Props = {
  children: React.ReactNode;
};

const localStorageKey = "@top-name-card/tutorial-seen";

const hasSeenTutorial = () => {
  return localStorage.getItem(localStorageKey) === "true";
};

const setTutorialSeen = () => {
  return localStorage.setItem(localStorageKey, "true");
};

const useTourInitializer = () => {
  const { setIsOpen } = useTour();
  useEffect(() => {
    const checkAndLaunchTutorial = async () => {
      const tutorialSeen = hasSeenTutorial();
      if (tutorialSeen) return;

      const hasCards = (await provider.allNameCards()).length > 0;
      if (hasCards) {
        // if the user has made cards, they should know how to use the app. No tutorials for them even if they haven't seen the tutorial in this case.
        setTutorialSeen();
        return;
      }

      // if we reach here, the user really should see the tutorial.
      // now make sure the create card is in the view (which is the first step of the tutorial), then start the tutorial after delaying for a second so that the user understands what's going on (it also looks nicer visually)
      return setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    };

    checkAndLaunchTutorial();
  }, [setIsOpen]);
};

const TutorialInitializer = () => {
  useTourInitializer();
  return null;
};
export const TutorialContextProvider = ({ children }: Props) => {
  const onCloseTutorial = ({
    setIsOpen,
  }: {
    setIsOpen: (open: boolean) => void;
  }) => {
    setTutorialSeen();
    setIsOpen(false);
  };
  return (
    <TourProvider
      prevButton={() => null}
      disableDotsNavigation
      disableKeyboardNavigation
      onClickClose={onCloseTutorial}
      components={{
        Navigation: (navigationProps) => (
          <TutorialPopup
            {...navigationProps}
            onTutorialComplete={setTutorialSeen}
          />
        ),
      }}
      styles={{
        popover: (styles) => ({
          ...styles,
          background: "#ffffff",
          maxWidth: window.innerWidth,
          width: window.innerWidth,
          minWidth: window.innerWidth,
        }),
      }}
      steps={steps}
      onClickMask={onCloseTutorial}
      showBadge={false}
      scrollSmooth
    >
      <TutorialInitializer />
      {children}
    </TourProvider>
  );
};
