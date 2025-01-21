import { NameCard, WithId } from "..";

export interface NameCardProvider {
  allNameCards(): Promise<WithId<NameCard>[]>;
  create(data: NameCard): Promise<WithId<NameCard>>;
  edit(id: string, data: Partial<NameCard>): Promise<null | WithId<NameCard>>;
  remove(id: string): Promise<string | null>;
}
