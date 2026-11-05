package biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import biblio.model.Compte;

public interface IDAOCompte extends JpaRepository<Compte, Integer>{

}
