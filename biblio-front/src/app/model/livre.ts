import { Editeur } from "./editeur";
import { Auteur} from "./auteur";
import { Collection } from "./collection";

export interface Livre {
    id?: number;
    titre: string;
    resume: string;
    date: string;
    auteur: Auteur;
    editeur: Editeur;
    collection?: Collection;
}
