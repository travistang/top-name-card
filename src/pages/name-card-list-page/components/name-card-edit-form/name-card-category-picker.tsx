import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { CSSProperties } from "react";
import {
  NAME_CARD_CATEGORIES,
  NameCardCategory,
  NameCardCategoryColors,
  NameCardCategoryIcon,
} from "../../../../domain/name-card";
import { FormSection } from "./form-section";

type Props = {
  category: NameCardCategory;
  onChange: (category: NameCardCategory) => void;
};

const getCategoryItemStyle = (
  category: NameCardCategory,
  selected: boolean
): CSSProperties => {
  const { background, text } = NameCardCategoryColors[category];
  if (!selected) {
    return {
      background: `linear-gradient(#393d3f, #393d3f) padding-box, ${background} border-box`,
      border: "2px solid transparent",
      color: "#FFF",
    };
  }

  return {
    background,
    color: text,
  };
};
export const NameCardCategoryPicker = ({
  category: selectedCategory,
  onChange,
}: Props) => {
  return (
    <FormSection testId="name-card-category" title="Card category">
      <div className="grid grid-cols-4 gap-4 place-items-center">
        {NAME_CARD_CATEGORIES.map((category) => (
          <div
            data-testid={`category-option-${category}`}
            onClick={() => onChange(category)}
            key={category}
            className={classNames(
              "rounded-lg aspect-square p-2 flex items-center justify-center overflow-hidden h-10 w-10",
              category === selectedCategory && ""
            )}
            style={getCategoryItemStyle(
              category,
              category === selectedCategory
            )}
          >
            <FontAwesomeIcon
              icon={NameCardCategoryIcon[category]}
              className=""
            />
          </div>
        ))}
      </div>
    </FormSection>
  );
};
