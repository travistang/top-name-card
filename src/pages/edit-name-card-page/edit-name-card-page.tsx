import { useParams } from "react-router-dom";
import useSWR from "swr";
import nameCardProvider from "../../domain/name-card";
import { CreateNameCardPage } from "../create-name-card-page/create-name-card-page";

const fetcher = async (id: string) => {
  return nameCardProvider.get(id);
};

export const EditNameCardPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useSWR(id, fetcher);
  if (isLoading || !data) return null;
  console.log({ data });
  return <CreateNameCardPage defaultValue={data} />;
};
