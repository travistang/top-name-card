import classNames from "classnames";

type Props = {
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
  className?: string;
};
export const Tabs = ({ value, options, onChange, className }: Props) => {
  return (
    <div
      className={classNames("rounded-lg border-2 flex items-center", className)}
    >
      {options.map((option) => (
        <span
          key={option.value}
          className={classNames(
            "h-full flex items-center justify-center uppercase text-sm",
            "cursor-pointer first:rounded-l-lg border-x border-x-gray-200 first:border-none last:border-none flex-1 last:rounded-r-lg",
            value === option.value && "bg-purple-500 text-gray-300"
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </span>
      ))}
    </div>
  );
};
