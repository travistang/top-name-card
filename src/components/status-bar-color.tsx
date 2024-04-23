import { Helmet } from "react-helmet-async";

type Props = {
  color?: string;
};
export const StatusBarColor = ({ color }: Props) => {
  if (!color) return null;
  return (
    <Helmet>
      <meta name="theme-color" content={color}></meta>
    </Helmet>
  );
};
