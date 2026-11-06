package biblio.config;

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
        throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }

}
