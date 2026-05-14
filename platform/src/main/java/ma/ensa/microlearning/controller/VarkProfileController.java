package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.entity.VarkProfile;
import ma.ensa.microlearning.enums.VarkStyle;
import ma.ensa.microlearning.repository.VarkProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vark-profiles")
public class VarkProfileController {

    @Autowired
    private VarkProfileRepository varkProfileRepository;

    /**
     * GET /api/vark-profiles/user/{userId}
     * Récupère le profil VARK d'un utilisateur (null si inexistant)
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<VarkProfile> getByUser(@PathVariable Long userId) {
        return varkProfileRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    /**
     * POST /api/vark-profiles/user/{userId}
     * Sauvegarde ou met à jour (UPSERT) le profil VARK d'un utilisateur
     * Body: { "visual": 75, "auditory": 25, "reading": 50, "kinesthetic": 0 }
     */
    @PostMapping("/user/{userId}")
    public ResponseEntity<VarkProfile> saveOrUpdate(
            @PathVariable Long userId,
            @RequestBody Map<String, Integer> scores) {

        // UPSERT : mise à jour si existant, création sinon
        VarkProfile profile = varkProfileRepository.findByUserId(userId)
                .orElse(new VarkProfile());

        profile.setUserId(userId);
        profile.setVisualScore(scores.getOrDefault("visual", 0));
        profile.setAuditoryScore(scores.getOrDefault("auditory", 0));
        profile.setReadingScore(scores.getOrDefault("reading", 0));
        profile.setKinestheticScore(scores.getOrDefault("kinesthetic", 0));

        // Calculer le style dominant automatiquement
        int maxScore = Math.max(Math.max(profile.getVisualScore(), profile.getAuditoryScore()),
                                Math.max(profile.getReadingScore(), profile.getKinestheticScore()));
        if (maxScore == profile.getVisualScore())       profile.setDominantStyle(VarkStyle.VISUEL);
        else if (maxScore == profile.getAuditoryScore()) profile.setDominantStyle(VarkStyle.AUDITIF);
        else if (maxScore == profile.getReadingScore())  profile.setDominantStyle(VarkStyle.LECTURE);
        else                                             profile.setDominantStyle(VarkStyle.KINESTHESIQUE);

        VarkProfile saved = varkProfileRepository.save(profile);
        return ResponseEntity.ok(saved);
    }
}
