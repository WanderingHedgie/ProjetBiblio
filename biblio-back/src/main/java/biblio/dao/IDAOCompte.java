package biblio.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import biblio.model.Compte;



public interface IDAOCompte extends JpaRepository<Compte, Integer>{

    public Optional<Compte> findByUsername(String username);
    
}
