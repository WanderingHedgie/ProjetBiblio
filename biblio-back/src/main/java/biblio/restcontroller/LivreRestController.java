package biblio.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import biblio.dao.IDAOLivre;
import biblio.model.Editeur;
import biblio.model.Livre;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
@RequestMapping("/api/livre")
public class LivreRestController {

    @Autowired 
    IDAOLivre daoLivre;

    @GetMapping
    public List<Livre> afficherTous()
    {
        return daoLivre.findAll();
    }

    @GetMapping("/{id}")
    public Livre afficherParId(@PathVariable Integer id)
    {
        return daoLivre.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id)
    {
        daoLivre.deleteById(id);
    }

    @PostMapping
    public Livre ajouter(@RequestBody Livre livre)
    {
        return daoLivre.save(livre);
    }

    @PutMapping("/{id}")
    public Livre modifier(@PathVariable Integer id, @RequestBody Livre livre)
    {
        livre.setId(id);
        daoLivre.save(livre);
        return livre;
    }
    
}
