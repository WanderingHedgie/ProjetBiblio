package biblio.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import biblio.dao.IDAOCompte;
import biblio.model.Compte;

@RestController 
@RequestMapping ("/api/compte")
public class CompteRestController {
   
   private final IDAOCompte daoCompte;

    CompteRestController(IDAOCompte daoCompte) {
        this.daoCompte = daoCompte;
    }

    @GetMapping
    public List<Compte> afficherTous()
    {
        return daoCompte.findAll();
    }

    @GetMapping("/{id}")
    public Compte afficherParId(@PathVariable Integer id)
    {
        return daoCompte.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id)
    {
        daoCompte.deleteById(id);
    }

    @PostMapping
    public Compte ajouter(@RequestBody Compte compte)
    {
        return daoCompte.save(compte);
    }

    @PutMapping("/{id}")
    public Compte modifier(@PathVariable Integer id, @RequestBody Compte compte)
    {
        compte.setId(id);
        daoCompte.save(compte);
        return compte;
    }
}
