package biblio.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.BeforeParameterizedClassInvocation;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import biblio.model.Avis;
import biblio.model.Livre;

@DataJpaTest 
public class IDAOAvisTest {
    
    private final IDAOAvis daoAvis;
    
    IDAOAvisTest(IDAOAvis daoAvis) {
        this.daoAvis = daoAvis;
    }
    
    @Test
    @Sql(scripts = "classpath/test-bdd/create-avis.sql")
    void shouldFindAllAvisNotZero(){
        // given
        
        // when
        List<Avis> listeAvis = this.daoAvis.findAll();
        
        // then
        Assertions.assertNotEquals(0, listeAvis.size());
    }
    
    @Test
    @Sql(scripts = "classpath/test-bdd/create-avis.sql")
    void shouldFindAvisById(){
        // given
        Integer id = 1;
        
        // when
        Optional<Avis> avis = this.daoAvis.findById(id);
        
        // then
        Assertions.assertTrue(avis.isPresent());
        Assertions.assertEquals(id, avis.get().getId());
    }
    
    @ParameterizedTest 
    @CsvSource({
        "4,'Un voyage fascinant dans les profondeurs de la Terre, où Jules Verne parvient à mêler découvertes scientifiques et aventures extraordinaires. Les descriptions des paysages souterrains sont particulièrement immersives.',2026-10-28,4",
        "5,'Une œuvre poétique saisissante dans laquelle Arthur Rimbaud explore les limites du langage et de l''imagination. Chaque poème offre une expérience singulière, entre visions fantastiques et réflexions profondes.',2026-11-03,5"
    })
    @Sql(scripts = "classpath/test-bdd/create-avis.sql")
    void shouldSaveAvis(int note, String commentaire, LocalDate date, Integer livre_id){
        // given
        Livre livre = new Livre();
        livre.setId(livre_id);
        Avis avis = new Avis(null, note, commentaire, date, livre);
        int avisListSize = this.daoAvis.findAll().size();
        
        // when
        this.daoAvis.save(avis);
        
        // then
        Assertions.assertNotNull(avis);
        Assertions.assertEquals(avisListSize+1, this.daoAvis.findAll().size());
        Assertions.assertEquals(this.daoAvis.findById(avis.getId()), avis.getId());
        
        
    }
    
    @ParameterizedTest 
    @CsvSource({
        "4,'Un voyage fascinant dans les profondeurs de la Terre, où Jules Verne parvient à mêler découvertes scientifiques et aventures extraordinaires. Les descriptions des paysages souterrains sont particulièrement immersives.',2026-10-28",
        "5,'Une œuvre poétique saisissante dans laquelle Arthur Rimbaud explore les limites du langage et de l''imagination. Chaque poème offre une expérience singulière, entre visions fantastiques et réflexions profondes.',2026-11-03"
    })
    @Sql(scripts = "classpath/test-bdd/create-avis.sql")
    void shoulDeleteAvis(int note, String commentaire, LocalDate date, Integer livre_id){
        // given
        Livre livre = new Livre();
        livre.setId(livre_id);
        Avis avis = new Avis(null, note, commentaire, date, livre);
        int avisListSizeBefore = this.daoAvis.findAll().size();
        this.daoAvis.save(avis);
        int avisListSizeAfter = this.daoAvis.findAll().size();
        
        // when
        this.daoAvis.deleteById(avis.getId());
        
        // then
        Assertions.assertNotNull(avis);
        Assertions.assertNull(this.daoAvis.findById(avis.getId()));
        
        Assertions.assertNotEquals(avisListSizeBefore, avisListSizeAfter);
        Assertions.assertEquals(avisListSizeBefore, this.daoAvis.findAll().size());        
    }
}
