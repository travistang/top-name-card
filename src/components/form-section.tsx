import classNames from "classnames";

type Props = {
  label?: string;
  explanation?: string;
  children: React.ReactNode;
  className?: string;
};
export const FormSection = ({
  explanation,
  label,
  children,
  className,
}: Props) => {
  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      {label && <label className="text-xs">{label}</label>}
      {explanation && <h6 className="-mt-1">{explanation}</h6>}
      {children}
    </div>
  );
};
