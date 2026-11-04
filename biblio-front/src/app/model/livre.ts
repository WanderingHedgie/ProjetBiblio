import { Auteur} from "./auteur";


export interface Livre {
    titre: string;
    resume: string;
    annee: number;
    auteur: Auteur;
    collection?: Collection;
}
