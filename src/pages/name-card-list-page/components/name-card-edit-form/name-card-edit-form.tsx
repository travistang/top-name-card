import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TextInput } from "../../../../components/inputs/text-input";
import { NameCard } from "../../../../domain/name-card";
import { FormSection } from "./form-section";

type Props = {
  card: NameCard;
  editing: boolean;
  onToggleEdit: () => void;
};
export const NameCardEditForm = ({ card, editing, onToggleEdit }: Props) => {
  const [formValue, setFormValue] = useState(card);

  useEffect(() => {
    setFormValue(card);
  }, [card]);

  return (
    <AnimatePresence>
      {editing && (
        <motion.div
          initial={{ opacity: 0, translateY: 1000 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, y: 1000, translateY: 1000 }}
          transition={{
            delay: 0.2,
            duration: 0.3,
          }}
          className="flex-1 flex-shrink-0 min-h-[60vh] gap-2 bg-slate-dark sticky bottom-0 px-4"
        >
          <div className="flex flex-row flex-nowrap snap-x snap-mandatory overflow-x-auto gap-4 no-scrollbar pb-2">
            <FormSection title="Card title">
              <TextInput
                onChange={(title) =>
                  setFormValue((form) => ({ ...form, title }))
                }
                className="col-span-3"
                inputClassName="text-sm bg-slate-dark"
                value={formValue.title}
              />
            </FormSection>
            <FormSection title="QR Code">
              <TextInput
                onChange={(qrCode) =>
                  setFormValue((form) => ({ ...form, qrCode }))
                }
                className="col-span-3"
                inputClassName="text-sm bg-slate-dark"
                value={formValue.qrCode}
              />
            </FormSection>
          </div>
          <div className="flex items-center justify-between py-4">
            <button type="button" className="text-sm" onClick={onToggleEdit}>
              <FontAwesomeIcon icon={faTimes} />
              Cancel
            </button>
            <button type="button" className="text-sm">
              <FontAwesomeIcon icon={faCheckCircle} />
              Update
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
