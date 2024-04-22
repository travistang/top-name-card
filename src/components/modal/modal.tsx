import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { IconButton } from "../inputs/icon-button";

type Props = {
  onClose?: () => void;
  className?: string;
  title?: string;
  children?: React.ReactNode;
};
export const Modal = ({ onClose, className, title, children }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-stretch justify-end bg-blue-700/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          "rounded-t-xl min-h-32 p-4 flex flex-col gap-2",
          className
        )}
      >
        <span className="flex items-center justify-between font-bold uppercase">
          {title}
          <IconButton icon={faTimes} onClick={onClose} />
        </span>
        {children}
      </div>
    </div>
  );
};
