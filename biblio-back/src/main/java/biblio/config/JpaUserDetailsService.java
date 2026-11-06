package biblio.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import biblio.dao.IDAOCompte;

@Service 
public class JpaUserDetailsService implements UserDetailsService {

   private final IDAOCompte dao;

       public JpaUserDetailsService(IDAOCompte dao) {
        this.dao = dao;
    }
    
   @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.dao
            // Recherche de l'utilisateur par son username
            .findByUsername(username)

            // Transformation de Utilisateur en UserDetails
            .map(compte -> User
                .withUsername(username)
                .password(compte.getPassword())
                .build()
            )

            // Si l'utilisateur n'existe pas, on jète l'exception UsernameNotFoundException
            .orElseThrow(() -> new UsernameNotFoundException("Compte not found"))
        ;
    }

}
