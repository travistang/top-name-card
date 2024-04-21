import { useState } from "react";
import { useNavigate } from "react-router-dom";
import nameCard, { NameCard, WithId } from "../../domain/name-card";
import { NameCardDetailForm } from "./components/name-card-detail-form/name-card-detail-form";
import { ConfirmButtonRow } from "./confirm-button-row";
import { NameCardCategoryPicker } from "./name-card-category-picker";

const DEFAULT_FORM_VALUE: NameCard = {
  title: "",
  category: "business",
  qrCode: "",
  text: "",
};
type Props = {
  defaultValue?: WithId<NameCard>;
};
export const CreateNameCardPage = ({ defaultValue }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [formValue, setFormValue] = useState<NameCard>(
    defaultValue ?? DEFAULT_FORM_VALUE
  );
  const navigate = useNavigate();
  const onSubmit = async () => {
    setSubmitting(true);
    const triggerAction = defaultValue
      ? nameCard.edit(defaultValue.id, formValue)
      : nameCard.create(formValue);
    return triggerAction
      .then(() => setFormValue(DEFAULT_FORM_VALUE))
      .then(() => navigate(-1))
      .finally(() => setSubmitting(false));
  };
  return (
    <div className="flex flex-col items-stretch gap-4 p-2 w-full h-full">
      <NameCardCategoryPicker
        category={formValue.category}
        onChange={(category) =>
          setFormValue((form) => ({ ...form, category, text: "" }))
        }
      />
      <div className="flex-1">
        <NameCardDetailForm nameCard={formValue} onChange={setFormValue} />
      </div>
      <ConfirmButtonRow submitting={submitting} onSubmit={onSubmit} />
    </div>
  );
};
