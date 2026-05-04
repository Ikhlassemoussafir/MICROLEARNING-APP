package ma.ensa.microlearning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ma.ensa.microlearning.repository.UserRepository;
import ma.ensa.microlearning.entity.User;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "API fonctionne correctement");
        return response;
    }
    
    @GetMapping("/hello")
    public String hello() {
        return "Bienvenue sur la plateforme de Micro-Learning !";
    }
    
    @GetMapping("/fix-passwords")
    public String fixPasswords() {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            u.setPasswordHash(passwordEncoder.encode("123456"));
            userRepository.save(u);
        }
        return "Mots de passe réinitialisés à '123456' pour tous les utilisateurs.";
    }
}
