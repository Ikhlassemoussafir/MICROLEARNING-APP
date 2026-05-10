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
import java.time.LocalDateTime;
import ma.ensa.microlearning.entity.LearnerProgress;
import ma.ensa.microlearning.entity.Grain;
import ma.ensa.microlearning.repository.LearnerProgressRepository;
import ma.ensa.microlearning.repository.GrainRepository;

@RestController
@RequestMapping("/api")
public class TestController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LearnerProgressRepository learnerProgressRepository;

    @Autowired
    private GrainRepository grainRepository;
    
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

    @GetMapping("/generate-progress")
    public String generateProgress() {
        // Supprimer toutes les anciennes données de progression pour avoir un état propre
        learnerProgressRepository.deleteAll();

        List<User> apprenants = userRepository.findAll().stream()
                .filter(u -> "APPRENANT".equals(u.getRole().name()))
                .toList();
        List<Grain> grains = grainRepository.findAll();
        
        int count = 0;
        for (User u : apprenants) {
            for (Grain g : grains) {
                // On ne valide que les grains 1, 2 et 3
                if (g.getGrainId() == 1L || g.getGrainId() == 2L || g.getGrainId() == 3L) {
                    LearnerProgress p = new LearnerProgress();
                    p.setUser(u);
                    p.setGrain(g);
                    p.setStatus("COMPLETE");
                    p.setBestScore(85 + (int)(Math.random() * 10)); // Score entre 85 et 94
                    p.setAttemptsCount(1);
                    p.setTimeSpent(300 + (int)(Math.random() * 60));
                    p.setStartedAt(LocalDateTime.now().minusDays(2));
                    p.setCompletedAt(LocalDateTime.now().minusDays(1));
                    
                    learnerProgressRepository.save(p);
                    count++;
                }
            }
        }
        return "Généré " + count + " enregistrements de progression (Grains 1, 2 et 3 validés uniquement) !";
    }
}
