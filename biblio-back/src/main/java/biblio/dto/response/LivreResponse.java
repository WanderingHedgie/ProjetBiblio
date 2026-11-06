package biblio.dto.response;

import java.time.LocalDate;

import biblio.model.Auteur;
import biblio.model.Livre;

public record LivreResponse (
    Integer id,
    String titre,
    Integer auteurId,
    String auteurNom,
    String auteurPrenom
) {
    public static LivreResponse convert(Livre livre) {
        
        Integer auteurId = null;
        String auteurNom = null;
        String auteurPrenom = null;


        if (livre.getAuteur() != null) {
            auteurId = livre.getAuteur().getId();
            auteurNom = livre.getAuteur().getNom();
            auteurPrenom = livre.getAuteur().getPrenom();
        }

        return new LivreResponse(
            livre.getId(),
            livre.getTitre(),
            auteurId,
            auteurNom,
            auteurPrenom
        );
    }
}
