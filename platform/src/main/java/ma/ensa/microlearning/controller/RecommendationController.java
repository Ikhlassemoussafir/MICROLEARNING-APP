package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.entity.Recommendation;
import ma.ensa.microlearning.entity.User;
import ma.ensa.microlearning.entity.Grain;
import ma.ensa.microlearning.service.RecommendationService;
import ma.ensa.microlearning.repository.UserRepository;
import ma.ensa.microlearning.repository.GrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")

public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GrainRepository grainRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Recommendation>> getRecommendations(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationService.getActiveRecommendations(userId));
    }

    @PostMapping("/generate")
    public ResponseEntity<Recommendation> generateRecommendation(
            @RequestParam Long userId,
            @RequestParam Long grainId,
            @RequestParam int score) {
        
        User user = userRepository.findById(userId).orElseThrow();
        Grain grain = grainRepository.findById(grainId).orElseThrow();
        
        return ResponseEntity.ok(recommendationService.generateRecommendation(user, grain, score));
    }
}
