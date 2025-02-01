import {
  faCheckCircle,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StepType } from "@reactour/tour";
import Confetti from "react-confetti";
import { createPortal } from "react-dom";

const bottomOfScreen: (
  _: unknown,
  rect: { height: number }
) => [number, number] = (_, rect) => {
  return [0, window.innerHeight - rect.height];
};
const topOfScreen: (
  _: unknown,
  rect: { height: number }
) => [number, number] = () => {
  return [0, 0];
};

export enum TutorialStep {
  Welcome = 0,
  SelectBusinessCategory,
  ClickNextButton,
  EnterQRCodeAndSwipeRight,
  EnterTitle,
  EnterDetailsAndConfirm,
  CongratsCreatingFirstCard,
  ClickEditButton,
  EditFormIntro,
  SeeEditFormAndCancel,
  ShowSwipeToDeleteAnimation,
  ShowCreateCard,
  Congrats,
}
export const steps: StepType[] = [
  {
    // Welcome
    selector: '[data-testid="create-name-card"]',
    position: bottomOfScreen,
    disableActions: true,
    content: (
      <span className="text-slate-800 text-justify">
        Hi there! Thanks for using TOP Name Card! Let's go through how you can
        use this app!
        <p>
          First{" "}
          <b>
            click the <FontAwesomeIcon icon={faPlus} /> above.
          </b>
        </p>
      </span>
    ),
  },
  {
    selector: '[data-testid="category-option-business"]',
    position: "top",
    disableActions: true,
    content: (
      <span className="text-slate-800 text-justify">
        Click here to choose the <i>business</i> category.
      </span>
    ),
  },
  {
    selector: '[data-testid="edit-form-arrow-right"]',
    position: "top",
    disableActions: true,
    content: (
      <span className="text-slate-800 text-justify">
        Click this to continue filling out the form.
      </span>
    ),
  },
  {
    selector: '[data-testid="edit-form-arrow-right"]',
    position: "bottom",
    stepInteraction: true,
    disableActions: true,
    highlightedSelectors: [
      '[data-testid="edit-form-arrow-right"]',
      '[data-testid="create-edit-form"]',
    ],
    content: (
      <div className="text-slate-800 text-justify">
        Now write down what would you like the QR Code of this new card to
        contain. Once you're done, click the arrow to see the next page
      </div>
    ),
  },
  {
    selector: '[data-testid="edit-form-arrow-right"]',
    position: "top",
    stepInteraction: true,
    disableActions: true,
    highlightedSelectors: [
      '[data-testid="edit-form-arrow-right"]',
      '[data-testid="create-edit-form"]',
    ],
    content: (
      <div className="text-slate-800 text-justify">
        Good! Now give this card a title!
      </div>
    ),
  },
  {
    selector: '[data-testid="name-card-edit-form-group"]',
    position: "top",
    stepInteraction: true,
    disableActions: true,

    content: (
      <div className="text-slate-800 text-justify">
        You can write this card an optional description. Once you're done click{" "}
        <span className="text-green-500">
          <FontAwesomeIcon icon={faCheckCircle} /> Add card
        </span>{" "}
        to create a new name card.
      </div>
    ),
  },
  {
    selector: "[data-testid='app']",
    stepInteraction: false,
    disableActions: false,
    position: bottomOfScreen,
    content: (
      <div className="text-slate-800 text-justify">
        <p>Congratulations on creating your first name card 🎉</p>
      </div>
    ),
  },
  {
    // ClickEditButton
    selector:
      '[data-testid="name-card"]:last-of-type [data-testid="name-card-edit"]',
    disableActions: true,
    content: (
      <div className="text-slate-800 text-justify">
        <p>
          If you want to <b>Edit</b> this name card later on, simply click here:
        </p>
      </div>
    ),
  },
  {
    // EditFormIntro
    selector: '[data-testid="name-card-edit-form-group"]',
    position: "top",
    disableActions: false,
    stepInteraction: false,
    content: (
      <div className="text-slate-800 text-justify">
        <p>
          And then you see the same form again! Just fill it in as you like and
          save the changes afterwards.
        </p>
      </div>
    ),
  },
  {
    //  SeeEditFormAndCancel
    selector: '[data-testid="name-card-edit-form-cancel"]',
    stepInteraction: true,
    disableActions: true,
    content: (
      <div className="text-slate-800 text-justify">
        For now, let's click on{" "}
        <span className="px-2 py-1 rounded-lg bg-slate-600 text-white mx-1 ">
          <FontAwesomeIcon icon={faTimes} /> Cancel{" "}
        </span>{" "}
        to exit the form.
      </div>
    ),
  },
  {
    // ShowSwipeToDeleteAnimation
    selector: '[data-testid="name-card-list"]',
    stepInteraction: false,
    disableActions: false,
    position: topOfScreen,
    content: (
      <div className="text-slate-800 text-justify">
        To <b>delete</b> this card, simply <b>swipe it up</b> to reveal the
        delete button. And click{" "}
        <FontAwesomeIcon icon={faTrash} className="text-red-500 mx-1" /> to
        delete it.
      </div>
    ),
  },
  {
    // ShowCreateCard
    selector: '[data-testid="name-card-list"]',
    stepInteraction: true,
    disableActions: false,
    position: bottomOfScreen,
    content: (
      <div className="text-slate-800 text-justify">
        To add another card, swipe to the <b>right most</b> to see the "create
        new" card and do the same trick again!
      </div>
    ),
  },
  {
    // Congrats
    selector: '[data-testid="app"]',
    stepInteraction: true,
    disableActions: false,
    position: bottomOfScreen,
    actionAfter: () => (
      <button className="outline-none bg-indigo-500 text-white flex items-center justify-center">
        <FontAwesomeIcon icon={faCheckCircle} />
        Complete tutorial
      </button>
    ),
    content: (
      <>
        {createPortal(<Confetti run />, document.getElementById("root")!)}
        <div className="text-slate-800 text-justify">
          Congratulations! You have completed the tutorial 🎉 Now show your name
          card to some new people!
        </div>
      </>
    ),
  },
];
