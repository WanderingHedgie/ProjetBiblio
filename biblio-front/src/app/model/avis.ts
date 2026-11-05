import { Livre } from "./livre";

export interface Avis {
  id?: number;
  note: number;
  comment: string;
  date: string;
  livre: Pick<Livre, 'auteur' | 'titre'>
}
