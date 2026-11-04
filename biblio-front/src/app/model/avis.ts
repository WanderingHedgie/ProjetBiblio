import { Livre } from "./livre";

export interface Avis {
    note: number;
    comment: string;
    date: string;
    livre: Livre;
}
