import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FormSection } from "../../components/form-section";
import { NameCardCategory, NameCardCategoryIcon } from "../../domain/name-card";

type Props = {
  category: NameCardCategory;
  onChange: (category: NameCardCategory) => void;
};
export const NameCardCategoryPicker = ({
  category: selected,
  onChange,
}: Props) => {
  return (
    <FormSection label="Category">
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {(Object.keys(NameCardCategoryIcon) as NameCardCategory[]).map(
          (category) => (
            <button
              onClick={() => onChange(category)}
              key={category}
              className={classNames(
                "aspect-square self-center w-12 h-12",
                selected !== category ? "outlined" : "bg-purple-500"
              )}
            >
              <FontAwesomeIcon icon={NameCardCategoryIcon[category]} />
            </button>
          )
        )}
      </div>
    </FormSection>
  );
};
