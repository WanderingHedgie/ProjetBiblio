package biblio.dao;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import biblio.model.Auteur;

@DataJpaTest 
public class IDAOAuteurTest {
    
    @Autowired 
    IDAOAuteur daoAuteur;
    
    @Test
    @Sql(scripts =  "classpath:test-bdd/create-auteur.sql")
    void shouldFindAllAuteurNotZero(){
        // given
        
        // when
        List<Auteur> listeAuteurs = this.daoAuteur.findAll();
        
        // then
        Assertions.assertNotEquals(0, listeAuteurs.size());
    }

    @ParameterizedTest 
    @CsvSource({
        "DUMAS, Alexandre, Française",
        "HUGO, Victor, Française"
    })
    @Sql(scripts = "classpath:test-bdd/create-auteur.sql")
    void shouldSaveAuteur(String nom, String prenom, String nationalite){
        // given
        Auteur auteur = new Auteur(null, nom, prenom, nationalite);
        int auteurListSize = this.daoAuteur.findAll().size();
        
        // when
        this.daoAuteur.save(auteur);
        
        // then
        Assertions.assertNotNull(auteur);
        Assertions.assertEquals(auteurListSize+1, this.daoAuteur.findAll().size());
        Assertions.assertEquals(this.daoAuteur.findById(auteur.getId()).get().getId(), auteur.getId());   
    }

    @ParameterizedTest 
    @CsvSource({
        "DUMAS, Alexandre, Française",
        "HUGO, Victor, Française"
    })
    @Sql(scripts = "classpath:test-bdd/create-auteur.sql")
    void shoulDeleteAuteur(String nom, String prenom, String nationalite){
        // given

        Auteur auteur = new Auteur(null, nom, prenom, nationalite);
        int auteurListSizeBefore = this.daoAuteur.findAll().size();
        this.daoAuteur.save(auteur);
        int auteurListSizeAfter = this.daoAuteur.findAll().size();
        
        // when
        this.daoAuteur.deleteById(auteur.getId());
        
        // then
        Assertions.assertNotNull(auteur);
        
        Assertions.assertNotEquals(auteurListSizeBefore, auteurListSizeAfter);
        Assertions.assertEquals(auteurListSizeBefore, this.daoAuteur.findAll().size());        
    }
}
