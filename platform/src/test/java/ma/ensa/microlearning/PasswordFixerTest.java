package ma.ensa.microlearning;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import ma.ensa.microlearning.repository.UserRepository;
import ma.ensa.microlearning.entity.User;
import java.util.List;

@SpringBootTest
class PasswordFixerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void fixPasswords() {
        System.out.println("--- DÉBUT DE LA RÉINITIALISATION DES MOTS DE PASSE ---");
        List<User> users = userRepository.findAll();
        for (User u : users) {
            u.setPasswordHash(passwordEncoder.encode("123456"));
            userRepository.save(u);
            System.out.println("Mot de passe mis à jour pour : " + u.getEmail());
        }
        System.out.println("--- FIN ---");
    }
}
